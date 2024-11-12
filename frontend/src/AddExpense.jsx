import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css'; // Import the CSS file

function AddExpense() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Function to add an expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/expenses/", {
        date,
        amount,
        category,
        description
      });
      console.log(response);
      if (response.status === 200) {
        setMessage("Expense added successfully.");
        // Clear the form
        setDate("");
        setAmount("");
        setCategory("");
        setDescription("");
      } else {
        setMessage("Failed to add expense.");
      }
    } catch (error) {
      
      setMessage("Error adding expense.");
    }
  };

  return (
    <div className="add-expense">
      
      <form onSubmit={handleAddExpense} className="card">
        <h3 className="card-title">Add Expense</h3>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit">Add Expense</button><br/>
        <button onClick={() => navigate("/expense-history")} className="expense-history-button">
            Expense History
          </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default AddExpense;
