import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BubbleController, Title, Tooltip, Legend } from 'chart.js';
import useFinanceData from "../../hooks/useFinanceDatas";
import RadarChart from "../Charts/RadarChart";
import HorizontalBarChart from '../Charts/HorizontalBarChart';
import DoughnutChart from '../Charts/DoughnutChart';
import '../../styles/Chart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BubbleController,  // Register BubbleController
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const { financeData, error } = useFinanceData();

  if (error) return <div>Failed to load data: {error.message}</div>;
  if (!financeData) return <div>Loading...</div>;

  // Log the bubble data to verify it
  const bubbleData = {
    labels: Object.keys(financeData),
    datasets: [
      {
        label: 'Income',
        data: Object.values(financeData).map(({ income }, index) => ({
          x: index,  // Use index as x-axis
          y: income,  // y-axis value for income
          r: Math.max(income / 200, 10)  // Ensure radius is large enough (minimum radius is 10)
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',  // Bubble color
      },
      {
        label: 'Expenses',
        data: Object.values(financeData).map(({ expenses }, index) => ({
          x: index,  // Use index as x-axis
          y: expenses,  // y-axis value for expenses
          r: Math.max(expenses / 200, 10)  // Ensure radius is large enough
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',  // Bubble color
      },
      {
        label: 'Savings',
        data: Object.values(financeData).map(({ savings }, index) => ({
          x: index,  // Use index as x-axis
          y: savings,  // y-axis value for savings
          r: Math.max(savings / 200, 10)  // Ensure radius is large enough
        })),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',  // Bubble color
      },
    ],
  };

  // Log to check bubbleData structure
  console.log(bubbleData);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.raw.y.toLocaleString()} (Bubble size: ${context.raw.r})`,
        },
      },
    },
    scales: {
      x: {
        type: 'category',  // Use category axis for x
        title: {
          display: true,
          text: 'Time/Category',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
        },
      },
    },
  };

  return (
    <div style={{ 
      maxwidth: '100%', 
    }}>
      <h2>Financial Analytics</h2>
      <div style={{minHeight:"100%"}}className='mt-2 bubble-chart-container'>
      <Bubble data={bubbleData} options={options} />
      </div>
      <div className='mt-2 chart-container'>
        <div className='horizontal-chart'>
        <DoughnutChart/>
        </div>
        <div className='radar-chart'>
        <RadarChart />
        </div>
        <div className='horizontal-chart'>
        <HorizontalBarChart/>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
