import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseProvider";
import { Trash2, Edit2, PlusCircle } from "lucide-react";

const ExpenseList = () => {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(10000);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  /* =========================
     Initial Sort (Recent)
  ========================= */
  useEffect(() => {
    const sorted = [...expenses].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setFilteredExpenses(sorted);
  }, [expenses]);

  /* =========================
     Apply Filters
  ========================= */
  const applyFilters = () => {
    let result = [...expenses];

    if (category) result = result.filter(e => e.category === category);
    result = result.filter(e => Number(e.amount) >= Number(minAmount));
    result = result.filter(e => Number(e.amount) <= Number(maxAmount));

    if (fromDate)
      result = result.filter(e => new Date(e.date) >= new Date(fromDate));

    if (toDate)
      result = result.filter(e => new Date(e.date) <= new Date(toDate));

    if (sortBy === "recent") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      result.sort((a, b) => b.amount - a.amount);
    }

    setFilteredExpenses(result);
  };

  /* =========================
     Clear Filters
  ========================= */
  const clearFilters = () => {
    setCategory("");
    setMinAmount(0);
    setMaxAmount(10000);
    setFromDate("");
    setToDate("");
    setSortBy("recent");

    const sorted = [...expenses].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setFilteredExpenses(sorted);
  };

  /* =========================
     Delete Expense
  ========================= */
  const handleDelete = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  /* =========================
     Category Totals
  ========================= */
  const categoryTotals = filteredExpenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">

      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Expenses</h1>
          <p className="text-gray-500 text-sm mt-1">
            View, filter and manage your expenses
          </p>
        </div>

        <button
          onClick={() => navigate("/addexpense")}
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 
                     rounded-lg hover:bg-red-500 transition active:scale-95"
        >
          <PlusCircle size={18} />
          Add Expense
        </button>
      </div>

      {/* ===== Filters ===== */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Filter Expenses
          </h2>
          <p className="text-sm text-gray-500">
            Narrow down expenses by category, amount, or date
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Bills</option>
            <option>Others</option>
          </select>

          <input
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            placeholder="Min Amount"
            className="border p-2 rounded"
          />

          <input
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            placeholder="Max Amount"
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2 rounded"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="recent">Most Recent</option>
            <option value="amount">Highest Amount</option>
          </select>

          <button
            onClick={applyFilters}
            className="bg-red-600 text-white rounded p-2 hover:bg-red-500 transition"
          >
            Apply Filters
          </button>

          <button
            onClick={clearFilters}
            className="border rounded p-2"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* ===== Category Totals ===== */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-3 text-gray-800">
          Expense by Category
        </h3>

        {Object.keys(categoryTotals).length === 0 ? (
          <p className="text-sm text-gray-500">No data available</p>
        ) : (
          <div className="flex gap-3 flex-wrap">
            {Object.keys(categoryTotals).map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm"
              >
                {cat}: ₹ {categoryTotals[cat]}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ===== Expense List ===== */}
      {filteredExpenses.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No expenses found
        </p>
      ) : (
        filteredExpenses.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow mb-3
                       flex flex-col sm:flex-row justify-between
                       items-start sm:items-center gap-3"
          >
            <div>
              <p className="font-semibold text-red-600 text-lg">
                ₹ {item.amount}
              </p>
              <p className="text-sm text-gray-500">
                {item.note || "No note"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm bg-blue-100 text-blue-600 
                               px-3 py-1 rounded-full">
                {item.category}
              </span>

              <span className="text-sm text-gray-400">
                {item.date}
              </span>

              <button
                onClick={() => navigate(`/edit/expense/${item.id}`)}
                className="hover:text-blue-600 transition"
              >
                <Edit2 size={18} />
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="hover:text-red-600 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;
