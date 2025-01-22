import useSWR from 'swr';
import axios from 'axios';

// Fetch function for SWR
const fetchFinanceData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const useFinanceData = (username, year) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const { data, error } = useSWR(
    username ? `http://192.168.4.174:5000/getfinancedata?username=${username}&year=${year}` : null,
    fetchFinanceData
  );

  const chartData = data && data.length > 0
    ? {
        labels: months,
        datasets: [
          {
            label: 'Income',
            data: months.map(month => {
              const monthData = data.find(d => d.month === month);
              return monthData ? monthData.income : 0;
            }),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
          {
            label: 'Expenses',
            data: months.map(month => {
              const monthData = data.find(d => d.month === month);
              return monthData ? monthData.expenses : 0;
            }),
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
          },
          {
            label: 'Savings',
            data: months.map(month => {
              const monthData = data.find(d => d.month === month);
              return monthData ? monthData.savings : 0;
            }),
            fill: false,
            borderColor: 'rgb(54, 162, 235)',
            tension: 0.1,
          },
        ],
      }
    : null;

  return { chartData, error };
};

export default useFinanceData;
