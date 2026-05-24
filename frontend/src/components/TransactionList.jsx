import { useEffect, useState } from "react";
import axios from "axios";

import ExportExcel from "./ExportExcel";
import toast from 'react-hot-toast';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  const [search, setSearch] = useState("");

  const [filterType, setFilterType] = useState("all");

  const [editing, setEditing] = useState(null);

  const [editData, setEditData] = useState({
    amount: "",
    category: "",
    description: "",
    type: "expense",
  });

  // =====================================
  // FETCH TRANSACTIONS
  // =====================================
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // DELETE TRANSACTION
  // =====================================
 const deleteTransaction = async (id) => {

  try {

    const token =
      localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/transactions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // SUCCESS TOAST
    toast.success(
      "Transaction Deleted"
    );

    fetchTransactions();

  } catch (error) {

    console.log(error);

    toast.error(
      "Something went wrong"
    );

  }

};

  // =====================================
  // FILTER TRANSACTIONS
  // =====================================
  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      item.category?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === "all" ? true : item.type === filterType;

    return matchesSearch && matchesType;
  });
  const handleEdit = (item) => {
    setEditing(item.id);

    setEditData({
      amount: item.amount,
      category: item.category,
      description: item.description,
      type: item.type,
    });
  };

  const updateTransaction = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/transactions/${editing}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditing(null);

      fetchTransactions();

      toast.success(
  'Transaction Updated'
);
    } catch (error) {
      console.log(error);
      toast.error(
  'Something went wrong'
);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div
        className="
        flex
        flex-col
        lg:flex-row
        justify-between
        lg:items-center
        gap-6
        mb-8
      "
      >
        <h2
          className="
          text-3xl
          sm:text-4xl
          font-bold
          dark:text-white
        "
        >
          Transactions
        </h2>

        {/* EXPORT BUTTON */}
        <ExportExcel transactions={transactions} />
      </div>

      {/* SEARCH + FILTER */}
      <div
        className="
        flex
        flex-col
        md:flex-row
        gap-4
        mb-8
      "
      >
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1
            p-4
            rounded-2xl
            border
            border-gray-300
            dark:border-gray-600
            dark:bg-gray-700
            dark:text-white
            outline-none
          "
        />

        {/* FILTER */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="
            p-4
            rounded-2xl
            border
            border-gray-300
            dark:border-gray-600
            dark:bg-gray-700
            dark:text-white
            outline-none
          "
        >
          <option value="all">All</option>

          <option value="income">Income</option>

          <option value="expense">Expense</option>
        </select>
      </div>

      {/* TRANSACTION LIST */}
      <div className="space-y-5">
        {filteredTransactions.length === 0 && (
          <div
            className="
            bg-gray-100
            dark:bg-gray-700
            rounded-2xl
            p-8
            text-center
          "
          >
            <p
              className="
              text-gray-500
              dark:text-gray-300
              text-lg
            "
            >
              No transactions found
            </p>
          </div>
        )}

        {filteredTransactions.map((item) => (
          <div
            key={item.id}
            className="
              bg-white
              dark:bg-gray-700
              border
              border-gray-200
              dark:border-gray-600
              p-5
              rounded-3xl
              shadow-lg

              flex
              flex-col
              md:flex-row
              justify-between
              md:items-center

              gap-5
            "
          >
            {/* LEFT */}
            <div>
              {/* CATEGORY */}
              <h3
                className="
    text-xl
    font-semibold
    dark:text-white
  "
              >
                {item.category}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
    text-gray-500
    dark:text-gray-300
    mt-1
  "
              >
                {item.description}
              </p>

              {/* DATE + TIME */}
              <div
                className="
    flex
    flex-wrap
    items-center
    gap-4
    mt-3
    text-sm
    text-gray-400
  "
              >
                <p>📅 {new Date(item.created_at).toLocaleDateString()}</p>

                <p>🕒 {new Date(item.created_at).toLocaleTimeString()}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div
              className="
              flex
              items-center
              justify-between
              md:justify-end
              gap-6
            "
            >
              <p
                className={`
                  text-2xl
                  font-bold

                  ${item.type === "income" ? "text-green-600" : "text-red-500"}
                `}
              >
                {item.type === "income" ? "+" : "-"}₹ {item.amount}
              </p>

              <button
                onClick={() => handleEdit(item)}
                className="
    bg-blue-500
    hover:bg-blue-600
    text-white
    px-5
    py-2
    rounded-xl
    transition-all
  "
              >
                Edit
              </button>

              <button
                onClick={() => deleteTransaction(item.id)}
                className="
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-5
                  py-2
                  rounded-xl
                  transition-all
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {editing && (

  <div className="
    fixed
    inset-0
    bg-black/50
    flex
    items-center
    justify-center
    z-50
  ">

    <div className="
      bg-white
      dark:bg-gray-800
      p-8
      rounded-3xl
      w-[90%]
      max-w-md
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-6
        dark:text-white
      ">

        Edit Transaction

      </h2>


      <div className="space-y-4">

        <input
          type="number"
          placeholder="Amount"
          value={editData.amount}
          onChange={(e) =>
            setEditData({
              ...editData,
              amount: e.target.value
            })
          }
          className="
            w-full
            p-4
            rounded-xl
            border
            dark:bg-gray-700
            dark:text-white
          "
        />


        <input
          type="text"
          placeholder="Category"
          value={editData.category}
          onChange={(e) =>
            setEditData({
              ...editData,
              category: e.target.value
            })
          }
          className="
            w-full
            p-4
            rounded-xl
            border
            dark:bg-gray-700
            dark:text-white
          "
        />


        <textarea
          placeholder="Description"
          value={editData.description}
          onChange={(e) =>
            setEditData({
              ...editData,
              description:
                e.target.value
            })
          }
          className="
            w-full
            p-4
            rounded-xl
            border
            dark:bg-gray-700
            dark:text-white
          "
        />


        <select
          value={editData.type}
          onChange={(e) =>
            setEditData({
              ...editData,
              type: e.target.value
            })
          }
          className="
            w-full
            p-4
            rounded-xl
            border
            dark:bg-gray-700
            dark:text-white
          "
        >

          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>

        </select>

      </div>


      <div className="
        flex
        justify-end
        gap-4
        mt-6
      ">

        <button
          onClick={() =>
            setEditing(null)
          }
          className="
            px-5
            py-2
            rounded-xl
            bg-gray-300
          "
        >

          Cancel

        </button>


        <button
          onClick={updateTransaction}
          className="
            px-5
            py-2
            rounded-xl
            bg-blue-600
            text-white
          "
        >

          Save

        </button>

      </div>

    </div>

  </div>

)}
    </div>
  );
}

export default TransactionList;
