import React, { useState } from 'react';
import axios from 'axios';
import useUser from "../hooks/useUser"; // Import the custom hook
const FinanceForm = () => {
  const [month, setMonth] = useState('');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');
  const [message, setMessage] = useState('');
  const {username} = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const financeData = {
      username,
      month,
      income: parseFloat(income),
      expenses: parseFloat(expenses),
      savings: parseFloat(savings)
    };

    try {
      const response = await axios.post('http://localhost:5000/add-finance', financeData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error submitting data.');
    }
  };

  return (
    <div>
      <h2>Monthly Finance Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Month:</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)} required>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            {/* Add more months */}
          </select>
        </div>
        <div>
          <label>Income:</label>
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} required />
        </div>
        <div>
          <label>Expenses:</label>
          <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} required />
        </div>
        <div>
          <label>Savings:</label>
          <input type="number" value={savings} onChange={(e) => setSavings(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FinanceForm;
