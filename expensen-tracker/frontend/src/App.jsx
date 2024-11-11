import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import necessary components from react-router-dom
import AddExpense from "./AddExpense.jsx";
import ExpenseHistory from "./ExpenseHistory.jsx";
import "./style.css";  // Import the CSS file

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Expense Tracker</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<ExpenseHistory />} />
          <Route path="/add-expense" element={<AddExpense />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

