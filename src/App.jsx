import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExpenseForm from "./pages/ExpenseForm";
import ExpenseList from "./pages/ExpenseList";
import IncomeForm from "./pages/IncomeForm";
import IncomeList from "./pages/IncomeList";
import EditExpense from "./pages/EditExpense";
import EditIncome from "./pages/EditIncome";
import NavBar from "./components/NavBar";
import ExpenseProvider from "./context/ExpenseProvider";
import Footer from "./components/Footer";

const App = () => {
  return (
    <ExpenseProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addexpense" element={<ExpenseForm />} />
          <Route path="/expenseslist" element={<ExpenseList />} />
          <Route path="/addincome" element={<IncomeForm />} />
          <Route path="/incomeslist" element={<IncomeList />} />
          <Route path="/edit/expense/:id" element={<EditExpense />} />
          <Route path="/edit/income/:id" element={<EditIncome />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ExpenseProvider>
  );
};

export default App;
