import axios from "axios";
import React from "react";

// Function to fetch expenses for a particular date and sum the total amount
export const sumExpensesForDate = async (date) => {
  try {
    const params = { start_date: date, end_date: date };
    const response = await axios.get("http://localhost:8000/expenses/", { params });
    const expenses = response.data;

    // Calculate the total amount
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return totalAmount;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return 0;
  }
};
