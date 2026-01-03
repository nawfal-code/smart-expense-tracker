import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseProvider";
import { PlusCircle } from "lucide-react";

const IncomeForm = () => {
  const { incomes, setIncomes } = useContext(ExpenseContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: Date.now(),
    amount: "",
    date: "",
    note: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleAddIncome = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.date) newErrors.date = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIncomes([...incomes, formData]);
    setFormData({ id: Date.now(), amount: "", date: "", note: "" });
    navigate("/incomeslist");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Add Income
      </h2>

      <form onSubmit={handleAddIncome} className="space-y-5">

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
            placeholder="Enter amount"
            className={`w-full border rounded-md px-3 py-2 
              focus:outline-none focus:ring-2
              ${errors.amount
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-green-500"
              }`}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
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
              ${errors.date
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
            placeholder="Optional note"
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-green-900 text-white py-2 rounded-md 
                     hover:bg-green-700 active:scale-95 transition"
        >
          <PlusCircle size={18} /> Add Income
        </button>

      </form>
    </div>
  );
};

export default IncomeForm;
