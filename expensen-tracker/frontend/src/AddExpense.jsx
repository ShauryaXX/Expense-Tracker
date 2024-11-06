import React, { useState } from "react";
import axios from "axios";
function AddExpense() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = { date, amount: parseFloat(amount), category, description };
      await axios.post("http://127.0.0.1:8000/expenses/", expenseData);
      alert("Expense added successfully!");
      // Reset form fields
      setDate("");
      setAmount("");
      setCategory("");
      setDescription("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };
  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </label>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}
export default AddExpense;