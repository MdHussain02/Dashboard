import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import useFinanceData from "../../hooks/useFinanceDatas";
import '../../styles/Chart.css'
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const FinanceChart = () => {
  const { financeData, error } = useFinanceData();

  // Prepare data for the Line chart
  const chartData = financeData
    ? {
        labels: Object.keys(financeData), // Months as labels
        datasets: [
          {
            label: 'Income',
            data: Object.values(financeData).map(({ income }) => income),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.4,
          },
          {
            label: 'Expenses',
            data: Object.values(financeData).map(({ expenses }) => expenses),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.4,
          },
          {
            label: 'Savings',
            data: Object.values(financeData).map(({ savings }) => savings),
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            tension: 0.4,
          },
        ],
      }
    : null;

  return (
    <div style={{ width: '100%', maxWidth: '100%' }}>
      <h4 className="text-muted text-center mb-4">Monthly Financial Overview</h4>
      {error ? (
        <div className="text-danger text-center">{`Error: ${error.message}`}</div>
      ) : !financeData ? (
        <div className="text-center">No financial data available</div>
      ) : (
        <div className='horizontal-chart'>   
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
        </div>
      )}
    </div>
  );
};

export default FinanceChart;