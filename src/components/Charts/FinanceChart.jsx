import React from 'react';
import { Line } from 'react-chartjs-2';
import useUser from "../../hooks/useUser";
import useFinanceData from "./hooks/useFinanceData";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const FinanceChart = () => {
  const { username } = useUser();
  const currentYear = new Date().getFullYear();
  const { chartData, error } = useFinanceData(username, currentYear);

  return (
    <div style={{ width: '100%', maxWidth: '100%' }}>
      <h4 className="text-muted text-center mb-4">{`${username} - Monthly Financial Overview - ${currentYear}`}</h4>
      {error ? (
        <div className="text-danger text-center">{`Error: ${error.message}`}</div>
      ) : !chartData ? (
        <div className="text-center">No chart available for {username}</div>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Monthly Financial Overview',
                font: {
                  size: 16,
                  weight: 'bold',
                },
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${tooltipItem.dataset.label}: $${tooltipItem.raw.toLocaleString()}`;
                  },
                },
              },
              legend: {
                position: 'top',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Month',
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Amount ($)',
                },
                beginAtZero: true,
                ticks: {
                  callback: (value) => `$${value.toLocaleString()}`,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default FinanceChart;
