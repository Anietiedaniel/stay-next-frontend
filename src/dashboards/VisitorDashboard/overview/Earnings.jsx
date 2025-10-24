import React, { useEffect, useState } from 'react';

const Expenses = () => {
  const [loading, setLoading] = useState(true);
  const [expensesData, setExpensesData] = useState([]);

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setExpensesData([
        { month: 'Jan', expense: 12000 },
        { month: 'Feb', expense: 15000 },
        { month: 'Mar', expense: 10000 },
        { month: 'Apr', expense: 18000 },
        { month: 'May', expense: 20000 },
        { month: 'Jun', expense: 17000 },
        { month: 'Jul', expense: 22000 },
        { month: 'Aug', expense: 14000 },
        { month: 'Sept', expense: 16000 },
        { month: 'Oct', expense: 19000 },
        { month: 'Nov', expense: 21000 },
        { month: 'Dec', expense: 23000 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading expenses data...
      </div>
    );
  }

  const maxExpense = Math.max(...expensesData.map((e) => e.expense));
  const totalExpenses = expensesData.reduce((sum, entry) => sum + entry.expense, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Expenses Breakdown
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Total Expenses
        </h2>
        <p className="text-3xl font-bold text-red-600 dark:text-red-400">
          ₦{totalExpenses.toLocaleString()}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Monthly Overview
        </h2>

        <div className="flex items-end gap-4 h-60 overflow-x-auto scrollbar-hide">
          {expensesData.map((data, idx) => {
            const height = (data.expense / maxExpense) * 100;

            return (
              <div key={idx} className="flex flex-col items-center w-16 h-full">
                <div className="flex items-end h-full">
                  <div
                    className="w-8 rounded-t bg-red-500 transition-all duration-700 ease-out"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <span className="text-xs mt-2 text-gray-700 dark:text-gray-300">{data.month}</span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  ₦{data.expense.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
