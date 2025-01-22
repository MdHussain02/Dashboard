import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import useUser from "../hooks/useUser"; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FinanceChart = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Initialize with empty arrays
    datasets: []
  });
  const {username} = useUser();
  useEffect(() => {
    const fetchData = async () => {
        try {
          const username = 'admin123
          '; // Replace this with the actual username you want to fetch data for
          const response = await axios.get(`http://localhost:5000/getfinancedata?username=${username}`);
          const userFinanceData = response.data;
      
          console.table(userFinanceData);
      
          if (userFinanceData && userFinanceData.length > 0) {
            const months = userFinanceData.map(data => data.month);
            const incomes = userFinanceData.map(data => data.income);
            const expenses = userFinanceData.map(data => data.expenses);
            const savings = userFinanceData.map(data => data.savings);
      
            setChartData({
              labels: months,
              datasets: [
                {
                  label: 'Income',
                  data: incomes,
                  borderColor: 'green',
                  backgroundColor: 'rgba(0, 255, 0, 0.1)',
                  fill: true,
                },
                {
                  label: 'Expenses',
                  data: expenses,
                  borderColor: 'red',
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  fill: true,
                },
                {
                  label: 'Savings',
                  data: savings,
                  borderColor: 'blue',
                  backgroundColor: 'rgba(0, 0, 255, 0.1)',
                  fill: true,
                },
              ],
            });
          } else {
            console.log("No finance data found");
          }
        } catch (error) {
          console.error('Error fetching finance data:', error);
        }
      };      

    fetchData();
  }, []);

  return (
    <div>
      <h2>Monthly Finance Overview</h2>
      <Line data={chartData} />
    </div>
  );
};

export default FinanceChart;
