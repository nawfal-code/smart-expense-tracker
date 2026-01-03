import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseProvider";

const ExpenseForm = () => {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: Date.now(),
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.date) newErrors.date = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setExpenses([
      ...expenses,
      { ...formData, amount: Number(formData.amount) },
    ]);

    setFormData({
      id: Date.now(),
      amount: "",
      category: "Food",
      date: "",
      note: "",
    });

    navigate("/expenseslist");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add Expense
      </h2>

      <form onSubmit={handleAddExpense} className="space-y-5">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Amount <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 
              focus:outline-none focus:ring-2
              ${
                errors.amount
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-green-500"
              }`}
            placeholder="Enter amount"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Category <span className="text-red-600">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="Food">🍔 Food</option>
            <option value="Travel">✈️ Travel</option>
            <option value="Bills">🏠 Bills</option>
            <option value="Others">💼 Others</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Date <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 
              focus:outline-none focus:ring-2
              ${
                errors.date
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-green-500"
              }`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium mb-1">Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
            placeholder="Optional note"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 active:scale-95 transition transform duration-150"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
