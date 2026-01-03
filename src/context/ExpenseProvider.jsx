import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  // Expenses
  const [expenses, setExpenses] = useState(() => {
    try {
      const data = localStorage.getItem("expenses");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // Incomes
  const [incomes, setIncomes] = useState(() => {
    try {
      const data = localStorage.getItem("incomes");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        incomes,
        setIncomes
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
