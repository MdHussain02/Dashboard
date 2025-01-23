import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useFinanceData from "../../hooks/useFinanceDatas";

ChartJS.register(ArcElement, Tooltip, Legend);

const FinancePieChart = () => {
  const { financeData, error } = useFinanceData();

  // Calculate totals for income, expenses, and savings
  const totals = financeData
    ? Object.values(financeData).reduce(
        (acc, { income, expenses, savings }) => {
          acc.income += income;
          acc.expenses += expenses;
          acc.savings += savings;
          return acc;
        },
        { income: 0, expenses: 0, savings: 0 }
      )
    : { income: 0, expenses: 0, savings: 0 };

  const pieData = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
      {
        data: [totals.income, totals.expenses, totals.savings],
        backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='mt-5' style={{ width: '100%', maxWidth: '300px', margin: 'auto' }}>
      {error ? (
        <div className="text-danger">{`Error: ${error.message}`}</div>
      ) : !financeData ? (
        <div>No Data</div>
      ) : (
        <Pie
          data={pieData}
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
                position: 'top',
              },
            },
          }}
        />
      )}
      <p className='text-center text-muted'>Expenses : {totals.expenses.toLocaleString()} </p>
    </div>
  );
};

export default FinancePieChart;