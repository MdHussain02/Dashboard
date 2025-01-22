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
    <div style={{width:"1000px", height : "700px"}}>
      <div className="">
        <h2 className=" text-muted">{username} - Monthly Financial Overview - {currentYear}</h2>
      </div>

      {error ? (
        <div className="">{`Error: ${error.message}`}</div>
      ) : !chartData ? (
        <div className="">No chart Availabe for {username}</div>
      ) : (
        <div className="">
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
