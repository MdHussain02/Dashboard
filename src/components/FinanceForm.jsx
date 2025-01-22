import React, { useState } from 'react';
import axios from 'axios';
import useUser from "../hooks/useUser"; // Import the custom hook

const FinanceForm = () => {
  const [month, setMonth] = useState('');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');
  const [message, setMessage] = useState('');
  const { username } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the input is a valid number before submitting
    if (isNaN(income) || isNaN(expenses) || isNaN(savings)) {
      setMessage('Please enter valid numeric values for income, expenses, and savings.');
      return;
    }

    const financeData = {
      username,
      month,
      income: parseFloat(income),
      expenses: parseFloat(expenses),
      savings: parseFloat(savings),
    };

    try {
      const response = await axios.post('http://192.168.4.174:5000/add-finance', financeData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error submitting data.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Monthly Finance Form</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="month" className="form-label">Month:</label>
          <select
            id="month"
            className="form-select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="income" className="form-label">Income:</label>
          <input
            type="text"  // Using text input for numbers
            id="income"
            className="form-control"
            value={income}
            onChange={(e) => setIncome(e.target.value)} // Allow typing numbers
            required
            placeholder="Enter Income"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="expenses" className="form-label">Expenses:</label>
          <input
            type="text"  // Using text input for numbers
            id="expenses"
            className="form-control"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)} // Allow typing numbers
            required
            placeholder="Enter Expenses"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="savings" className="form-label">Savings:</label>
          <input
            type="text"  // Using text input for numbers
            id="savings"
            className="form-control"
            value={savings}
            onChange={(e) => setSavings(e.target.value)} // Allow typing numbers
            required
            placeholder="Enter Savings"
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

      {message && <p className="mt-3 text-center text-info">{message}</p>}
    </div>
  );
};

export default FinanceForm;
