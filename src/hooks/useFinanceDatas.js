// src/hooks/useFinanceData.js
import useSWR from "swr";
import axios from "axios";
import useUser from "../hooks/useUser";
// Fetch function for SWR
const fetchFinanceData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const useFinanceData = () => {
  const { username } = useUser();
  const { data, error } = useSWR(
    username
      ? `http://localhost:5000/getfinancedata?username=${username}`
      : null,
    fetchFinanceData
  );

  // Convert the fetched data into an object (month as key)
  const financeData =
    data && data.length > 0
      ? data.reduce((acc, current) => {
          acc[current.month] = {
            income: current.income,
            expenses: current.expenses,
            savings: current.savings,
          };
          return acc;
        }, {})
      : null;

  return { financeData, error };
};

export default useFinanceData;
