import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import useFinanceData from "../../hooks/useFinanceDatas";
import PolarAreaChart from '../Charts/PolarAreaChart';
import RadarChart from "../Charts/RadarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const { financeData, error } = useFinanceData();

  if (error) return <div>Failed to load data: {error.message}</div>;
  if (!financeData) return <div>Loading...</div>;

  // Prepare chart data
  const lineData = {
    labels: Object.keys(financeData),
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
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)'
        }
      }
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      // maxWidth: '800px', 
      margin: '0 auto'
    }}>
      <h2>Financial Analytics</h2>
      <Line data={lineData} options={options} />
      <div className='mt-2 d-flex'>
        <PolarAreaChart />
        <RadarChart />
      </div>
    </div>
  );
};

export default Analytics;