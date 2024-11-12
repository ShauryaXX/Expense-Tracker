import React, { useState } from "react";
import axios from "axios";
import './style.css'; // Import the CSS file

function DeleteExpense() {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  // Function to delete an expense
  const handleDeleteExpense = async () => {
    try {
      const response = await axios.delete("http://localhost:8000/expenses/", {
        data: { category, date, amount }
      });
      if (response.data.success) {
        setMessage("Expense deleted successfully.");
      } else {
        setMessage("Record does not exist.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      setMessage("Error deleting expense.");
    }
  };

  return (
    <div className="delete-expense">
      <form onSubmit={(e) => { e.preventDefault(); handleDeleteExpense(); }}>
        <h3>Delete Expense</h3>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <button type="submit">Delete Expense</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default DeleteExpense;
