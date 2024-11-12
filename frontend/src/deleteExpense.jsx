import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css'; // Import the CSS file
function DeleteExpense() {
  const [recordId, setRecordId] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // Function to delete an expense
  const handleDeleteExpense = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (!recordId || !category || !amount) {
      setMessage("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.delete("http://127.0.0.1:8000/expenses/", {
        data: { record_id: parseInt(recordId), category, amount: parseFloat(amount) }
      });
      if (response.status === 200) {
        setMessage("Expense deleted successfully.");
      } else {
        setMessage(response.data.message || "Failed to delete expense.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      setMessage("Error deleting expense.");
    }
  };
  return (
    <div className="delete-expense">
      <form onSubmit={handleDeleteExpense} className="card">
        <label>
          Record ID:
          <input type="number" value={recordId} onChange={(e) => setRecordId(e.target.value)} required />
        </label>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </label>
        <button type="submit">Delete Expense</button>
        <br />
        <button onClick={() => navigate("/expense-history")} className="expense-history-button">
          Expense History
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
export default DeleteExpense;