import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseProvider";
// Correct lucide-react imports for Vite
import { Trash2, Edit2, PlusCircle } from "lucide-react";

const IncomeList = () => {
  const { incomes, setIncomes } = useContext(ExpenseContext);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/income/${id}`);
  };

  const handleDelete = (id) => {
    const filteredArr = incomes.filter((ele) => ele.id !== id);
    setIncomes(filteredArr);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* ===== Page Header ===== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Incomes
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track all your income sources
          </p>
        </div>

        {/* Add Income Button */}
        <button
          onClick={() => navigate("/addincome")}
          className="flex items-center gap-2 bg-green-800 text-white 
                     px-5 py-2.5 rounded-lg shadow
                     hover:bg-green-700 transition active:scale-95"
        >
          <PlusCircle size={18} />
          Add Income
        </button>
      </div>

      {/* ===== Income List ===== */}
      {incomes.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center text-gray-500">
          No income added yet
        </div>
      ) : (
        <div className="space-y-4">
          {incomes.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl shadow-sm 
                         p-4 flex flex-col gap-4
                         sm:flex-row sm:items-center sm:justify-between
                         hover:shadow-md transition"
            >
              {/* Amount + Note */}
              <div className="flex-1">
                <p className="text-lg font-semibold text-green-600">
                  ₹ {item.amount}
                </p>
                <p className="text-sm text-gray-500 truncate max-w-xs">
                  {item.note || "No note"}
                </p>
              </div>

              {/* Date */}
              <p className="text-sm text-gray-400">
                {item.date}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="p-2 rounded-full hover:bg-gray-100 
                             transition active:scale-95"
                >
                  <Edit2 size={18} />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-full hover:bg-red-100 
                             text-red-600 transition active:scale-95"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncomeList;
