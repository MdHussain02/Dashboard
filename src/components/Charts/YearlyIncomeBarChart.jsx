import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import useFinanceData from "../../hooks/useFinanceDatas";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const YearlyIncomeBarChart = () => {
  const { financeData, error } = useFinanceData();

  // Extract income data for the bar chart
  const barData = financeData
    ? {
        labels: Object.keys(financeData), // Months as labels
        datasets: [
          {
            label: 'Yearly Income',
            data: Object.values(financeData).map(({ income }) => income),
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
          },
        ],
      }
    : null;

  return (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <h4 className="text-muted text-center mb-4">Yearly Income Overview</h4>
      {error ? (
        <div className="text-danger text-center">{`Error: ${error.message}`}</div>
      ) : !financeData ? (
        <div className="text-center">No income data available</div>
      ) : (
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `$${tooltipItem.raw.toLocaleString()}`;
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
