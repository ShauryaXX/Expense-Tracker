import React, { useState, useEffect } from "react";
import { sumExpensesForDate } from "./sumExpenses";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import DeleteExpense from "./DeleteExpense"; // Import the DeleteExpense component
import './style.css'; // Import the CSS file

function ExpenseHistory() {
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [date, setDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSumExpenses = async () => {
    const total = await sumExpensesForDate(date);
    setTotalAmount(total);
  };

  // useNavigate hook to handle page navigation
  const navigate = useNavigate();

  // Function to fetch expenses with date filter
  const fetchExpenses = async () => {
    const params = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    try {
      const response = await axios.get("http://localhost:8000/expenses/", { params });
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Fetch expenses when the component mounts
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="expense-history">
      <div className="header">
        <h2>Expense History</h2>
        <div className="button-group">
          <button onClick={() => navigate("/add-expense")} className="add-expense-button">
            Add Expense
          </button>
          <button onClick={() => navigate("/delete-expense")} className="delete-expense-button">
            Delete Expense
          </button>
        </div>
      </div>
      <div className="filter-section">
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button onClick={fetchExpenses}>Filter</button>
      </div>
      <div className="filter-section">
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <button onClick={handleSumExpenses}>Calculate Total</button>
      </div>
      <div className="total-amount">
        <h3>Total Amount for {date}: ${totalAmount}</h3>
      </div>
      
      {expenses.length > 0 ? (
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>${expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No expenses found for the selected date range.</p>
      )}
    </div>
  );
}

export default ExpenseHistory;
