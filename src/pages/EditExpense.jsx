import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseProvider";

const EditExpense = () => {

  const {expenses,setExpenses}=useContext(ExpenseContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const expenseToEdit = expenses.find(
    (ele) => ele.id === Number(id)
  );

  const [formData, setFormData] = useState({
    id: "",
    amount: "",
    category: "Food",
    date: "",
    note: ""
  });

  const [errors, setErrors] = useState({});

  // preload data
  useEffect(() => {
    if (expenseToEdit) {
      setFormData(expenseToEdit);
    }
  }, [expenseToEdit]);

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // update expense
  const handleUpdateExpense = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.date) newErrors.date = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedExpenses = expenses.map((item) =>
      item.id === formData.id ? formData : item
    );

    setExpenses(updatedExpenses);
      
    localStorage.setItem("expenses",expenses);

    navigate("/expenseslist");
  };

  // if invalid id
  if (!expenseToEdit) {
    return (
      <p className="text-center text-red-500 mt-10">
        Expense not found ❌
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-900">
          ✏️ Edit Expense
        </h2>

        <form onSubmit={handleUpdateExpense} className="space-y-4">

          {/* Amount */}
          <div>
            <label className="text-sm font-medium">Amount *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-600"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-600"
            >
              <option>Food</option>
              <option>Travel</option>
              <option>Bills</option>
              <option>Others</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-600"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="text-sm font-medium">Note</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-600"
              placeholder="Optional note"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-900 text-white py-2 rounded-md font-semibold
                       hover:bg-yellow-700 transition active:scale-95"
          >
            Update Expense
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditExpense;
