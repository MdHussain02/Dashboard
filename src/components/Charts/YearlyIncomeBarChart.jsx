import React from 'react';
import { Bar } from 'react-chartjs-2';
import useUser from "../../hooks/useUser";
import useFinanceData from "./hooks/useFinanceData";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const YearlyIncomeBarChart = () => {
  const { username } = useUser();
  const currentYear = new Date().getFullYear();
  const { chartData, error } = useFinanceData(username, currentYear);

  const incomeData = chartData
    ? chartData.datasets
        .find((dataset) => dataset.label.toLowerCase() === 'income')
        ?.data || []
    : [];

  const barData = {
    labels: chartData?.labels || [],
    datasets: [
      {
        label: 'Yearly Income',
        data: incomeData,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', }}>
      {error ? (
        <div className="text-danger">{`Error: ${error.message}`}</div>
      ) : !chartData ? (
        <div>No Data</div>
      ) : (
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${tooltipItem.label}: $${tooltipItem.raw.toLocaleString()}`;
                  },
                },
              },
              legend: {
                display: true,
                position: 'top',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Months',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Income ($)',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default YearlyIncomeBarChart;
