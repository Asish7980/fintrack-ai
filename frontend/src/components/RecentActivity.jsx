import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function RecentActivity({ transactions = [] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Recent Activity
      </h2>

      <div className="space-y-6">
        {transactions.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="
flex
items-center
justify-between
gap-3
flex-nowrap
overflow-x-auto
"
          >
            {/* LEFT */}
            <div
              className="
flex
items-center
gap-3
min-w-0
"
            >
              <div
                className={`p-4 rounded-full ${
                  item.type === "income"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {item.type === "income" ? <FaArrowUp /> : <FaArrowDown />}
              </div>

              <div>
                <h3
                  className="
font-semibold
text-base
sm:text-lg
dark:text-white
truncate
"
                >
                  {item.category}
                </h3>

                <p
                  className="
text-gray-500
dark:text-gray-400
text-sm
truncate
"
                >
                  {item.description}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right">
              <p
                className={`text-xl font-bold ${
                  item.type === "income" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.type === "income" ? "+" : "-"}₹ {item.amount}
              </p>

              <div
                className="
  text-gray-500
  text-xs
  sm:text-sm
  flex
  flex-col
  items-end
"
              >
                <p>📅 {new Date(item.created_at).toLocaleDateString()}</p>

                <p>
                  🕒{" "}
                  {new Date(item.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
