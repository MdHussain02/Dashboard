import React from 'react';
import { Line } from 'react-chartjs-2';  
import useUser from "../hooks/useUser"; 
import useFinanceData from "../hooks/useFinanceData";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const FinanceChart = () => {
  const { username } = useUser();
  const currentYear = new Date().getFullYear();
  const { chartData, error } = useFinanceData(username, currentYear);

  return (
    <div className="chart-container">
      <style>
        {`
          .chart-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .chart-header {
            margin-bottom: 20px;
          }

          .chart-title {
            font-size: 24px;
            font-weight: bold;
            color: #333;
          }

          .chart-content {
            height: 400px;
            position: relative;
          }

          .loading, .error {
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
          }

          .error {
            color: #dc2626;
          }

          .loading {
            color: #666;
          }
        `}
      </style>

      <div className="chart-header">
        <h2 className="chart-title text-muted">{username} - Monthly Financial Overview - {currentYear}</h2>
      </div>

      {error ? (
        <div className="error">{`Error: ${error.message}`}</div>
      ) : !chartData ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="chart-content">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                title: {
                  display: true,
                  font: {
                    size: 18,
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
        </div>
      )}
    </div>
  );
};

export default FinanceChart;
