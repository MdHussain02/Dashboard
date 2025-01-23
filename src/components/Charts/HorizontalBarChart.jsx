// src/components/HorizontalBarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import useFinanceData from "../../hooks/useFinanceDatas";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const HorizontalBarChart = () => {
  const { financeData, error } = useFinanceData();

  if (error) {
    return <div>Error loading finance data.</div>;
  }

  if (!financeData) {
    return <div>Loading...</div>;
  }

  // Prepare chart data
  const months = Object.keys(financeData);
  const savingsData = months.map((month) => financeData[month].savings);

  const minSavings = Math.min(...savingsData);
  const maxSavings = Math.max(...savingsData);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Savings",
        data: savingsData,
        backgroundColor: savingsData.map((savings) =>
          savings === minSavings
            ? "rgba(255, 99, 132, 0.5)"
            : savings === maxSavings
            ? "rgba(75, 192, 192, 0.5)"
            : "rgba(54, 162, 235, 0.5)"
        ),
        borderColor: savingsData.map((savings) =>
          savings === minSavings
            ? "rgba(255, 99, 132, 1)"
            : savings === maxSavings
            ? "rgba(75, 192, 192, 1)"
            : "rgba(54, 162, 235, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Display bars horizontally
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div>
      <div style={{width:"500px"}} >
        <Bar data={chartData} options={options} />
        <p className="text-center text-muted">Minimu and maximum savings</p>
      </div>
    </div>
  );
};

export default HorizontalBarChart;