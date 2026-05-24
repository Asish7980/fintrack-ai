import { useState } from 'react';
import axios from 'axios';

function AddTransaction({ refreshDashboard }) {

  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: ''
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:5000/api/transactions',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Transaction Added');

      refreshDashboard();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-10 transition-all">

      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <select
            name="type"
            onChange={handleChange}
            className="p-4 rounded-lg border dark:bg-gray-700 dark:text-white"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            onChange={handleChange}
            className="p-4 rounded-lg border dark:bg-gray-700 dark:text-white"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="p-4 rounded-lg border dark:bg-gray-700 dark:text-white"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="p-4 rounded-lg border dark:bg-gray-700 dark:text-white"
          />

        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Add Transaction
        </button>

      </form>

    </div>

  );

}

export default AddTransaction;