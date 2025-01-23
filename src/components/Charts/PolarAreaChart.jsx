// src/components/PolarAreaChart.js
import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import useFinanceData from "../../hooks/useFinanceDatas";

// Register Chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = () => {
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

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Savings",
        data: savingsData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Finance Overview</h3>
      <PolarArea data={chartData} />
    </div>
  );
};

export default PolarAreaChart;

