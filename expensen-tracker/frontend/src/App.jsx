import React from "react";
import AddExpense from "./AddExpense.jsx";
import "./style.css"

function App() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Expense Tracker</h1>
        </header>
        <main>
          <AddExpense />
        </main>
      </div>
    );
}
  
export default App;

