import { useEffect, useState } from "react";

function BudgetCard({ summary }) {
  const [budget, setBudget] = useState("");
  const [savedBudget, setSavedBudget] = useState(null);

  const spent = Number(summary.total_expense || 0);

  useEffect(() => {
    const storedBudget = localStorage.getItem("monthlyBudget");

    if (storedBudget) {
      setSavedBudget(Number(storedBudget));
    }
  }, []);

  const saveBudget = () => {
    if (!budget) return;

    localStorage.setItem("monthlyBudget", budget);

    setSavedBudget(Number(budget));

    setBudget("");
  };

  const remaining = savedBudget ? savedBudget - spent : 0;

  const percentage = savedBudget ? (spent / savedBudget) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Monthly Budget
      </h2>

      {/* INPUT SECTION */}
      {!savedBudget && (
        <div className="flex gap-4 mb-6">
          <input
            type="number"
            placeholder="Enter Monthly Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="flex-1 p-4 rounded-lg border dark:bg-gray-700 dark:text-white"
          />

          <button
            onClick={saveBudget}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Save
          </button>
        </div>
      )}

      {/* SHOW ONLY IF BUDGET EXISTS */}
      {savedBudget && (
        <>
          {/* PROGRESS BAR */}
          <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
            <div
              className={`h-6 ${
                percentage > 100 ? "bg-red-500" : "bg-green-500"
              }`}
              style={{
                width: `${Math.min(percentage, 100)}%`,
              }}
            ></div>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-lg dark:text-gray-200">
              Budget:
              <span className="font-bold ml-2">₹ {savedBudget}</span>
            </p>

            <p className="text-lg dark:text-gray-200">
              Spent:
              <span className="font-bold ml-2 text-red-500">₹ {spent}</span>
            </p>

            <p className="text-lg dark:text-gray-200">
              Remaining:
              <span className="font-bold ml-2 text-green-500">
                ₹ {remaining}
              </span>
            </p>
          </div>

          {/* ALERT */}
          {spent > savedBudget && (
            <div className="mt-6 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-lg">
              ⚠ You exceeded your monthly budget!
            </div>
          )}

          {/* REMOVE BUDGET */}
          <button
            onClick={() => {
              localStorage.removeItem("monthlyBudget");

              setSavedBudget(null);
            }}
            className="mt-6 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Remove Budget
          </button>
        </>
      )}
    </div>
  );
}

export default BudgetCard;
