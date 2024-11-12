import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExpenseHistory from "./ExpenseHistory";
import AddExpense from "./AddExpense";
import DeleteExpense from "./deleteExpense";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/expense-history" element={<ExpenseHistory />} />
          <Route path="/delete-expense" element={<DeleteExpense />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Welcome to the Expense Tracker</h2>;
}

export default App;

