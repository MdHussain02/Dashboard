// src/components/RadarChart.js
import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import useFinanceData from "../../hooks/useFinanceDatas";

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

const RadarChart = () => {
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
    ],
  };

  return (
    <div>
      <div style={{width:"500px"}} >
        <Radar data={chartData} />
        <p className="text-center text-muted">Income vs Expenses</p>
      </div>
    </div>
  );
};

export default RadarChart;
