import React from "react";
import AddExpense from "./AddExpense.jsx";
import ExpenseHistory from "./ExpenseHistory.jsx";
import "./style.css"

function App() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Expense Tracker</h1>
        </header>
        <main>
          <AddExpense />
          <ExpenseHistory />
        </main>
      </div>
    );
}
  
export default App;

