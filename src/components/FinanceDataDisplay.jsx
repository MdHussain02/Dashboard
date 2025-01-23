// src/components/FinanceDataDisplay.js
import React from 'react';
import useFinanceData from '../hooks/useFinanceDatas';

const FinanceDataDisplay = ({ username, year }) => {
  const { financeData, error } = useFinanceData(username, year);

  if (error) {
    return <div>Error fetching finance data.</div>;
  }

  if (!financeData) {
    return <div>No finance data available for {username} in {year}.</div>;
  }

  return (
    <div>
      <h3>Finance Data for {username} - {year}</h3>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Income</th>
            <th>Expenses</th>
            <th>Savings</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(financeData).map(([month, { income, expenses, savings }]) => (
            <tr key={month}>
              <td>{month}</td>
              <td>{income}</td>
              <td>{expenses}</td>
              <td>{savings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceDataDisplay;
