// src/components/DoughnutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useFinanceData from "../../hooks/useFinanceDatas";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { financeData, error } = useFinanceData();

  if (error) {
    return <div>Error loading finance data.</div>;
  }

  if (!financeData) {
    return <div>Loading...</div>;
  }

  // Prepare chart data
  const months = Object.keys(financeData);
  const incomeData = months.map((month) => financeData[month].income);
  const expenseData = months.map((month) => financeData[month].expenses);
  const savingsData = months.map((month) => financeData[month].savings);

  // Summing up the data for the doughnut chart
  const totalIncome = incomeData.reduce((acc, val) => acc + val, 0);
  const totalExpenses = expenseData.reduce((acc, val) => acc + val, 0);
  const totalSavings = savingsData.reduce((acc, val) => acc + val, 0);

  const chartData = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        data: [totalIncome, totalExpenses, totalSavings], // Use summed totals for the doughnut segments
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)", // Income color
          "rgba(255, 99, 132, 0.7)", // Expenses color
          "rgba(75, 192, 192, 0.7)", // Savings color
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)", // Income border
          "rgba(255, 99, 132, 1)", // Expenses border
          "rgba(75, 192, 192, 1)", // Savings border
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div style={{ width: "500px" }}>
        <Doughnut data={chartData} />
        <p className="text-center text-muted">Income vs Expenses vs Savings</p>
      </div>
    </div>
  );
};

export default DoughnutChart;
