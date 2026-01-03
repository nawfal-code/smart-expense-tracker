import React, { useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ExpenseContext } from "../context/ExpenseProvider";

const COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b"];
const ICONS = { Food: "🍔", Travel: "✈️", Bills: "🏠", Others: "💼" };

const Home = () => {
  const { expenses, incomes } = useContext(ExpenseContext);

  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
  const netBalance = totalIncome - totalExpense;

  const categoryData = expenses.reduce((acc, item) => {
    const found = acc.find((c) => c.name === item.category);
    if (found) found.value += Number(item.amount);
    else acc.push({ name: item.category, value: Number(item.amount) });
    return acc;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10 space-y-10">

      {/* ===== Top Summary Section ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Income */}
        <div className="bg-blue-50 p-6 rounded-xl shadow flex flex-col items-center">
          <span className="text-3xl text-blue-600 mb-2">₹</span>
          <h3 className="text-gray-500 text-sm mb-1">Total Income</h3>
          <p className="text-2xl font-bold text-blue-600">{totalIncome}</p>
        </div>

        {/* Total Expense */}
        <div className="bg-red-50 p-6 rounded-xl shadow flex flex-col items-center">
          <span className="text-3xl text-red-600 mb-2">₹</span>
          <h3 className="text-gray-500 text-sm mb-1">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">{totalExpense}</p>
        </div>

        {/* Net Balance */}
        <div
          className={`p-6 rounded-xl shadow flex flex-col items-center ${
            netBalance >= 0 ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <span className={`text-3xl mb-2 ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>₹</span>
          <h3 className="text-gray-500 text-sm mb-1">Net Balance</h3>
          <p className={`text-2xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
            {netBalance}
          </p>
        </div>
      </div>

      {/* ===== Middle Section: Expense by Category Amount ===== */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Expense by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {["Food", "Travel", "Bills", "Others"].map((cat) => {
            const total = expenses
              .filter((e) => e.category === cat)
              .reduce((sum, e) => sum + Number(e.amount), 0);
            return (
              <div key={cat} className="bg-white p-6 rounded-xl shadow flex items-center gap-3">
                <span className="text-2xl">{ICONS[cat]}</span>
                <div>
                  <h3 className="text-gray-500 text-sm">{cat}</h3>
                  <p className="text-xl font-semibold mt-1">₹ {total}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Bottom Section: Expense by Category Pie Chart ===== */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Expenses Distribution (Pie Chart)</h2>
        <div className="bg-white p-6 rounded-xl shadow">
          {categoryData.length === 0 ? (
            <p className="text-gray-500 text-center py-20">No data to display</p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹ ${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
