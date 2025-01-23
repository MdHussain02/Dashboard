import { useState,useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import useUser from "./useUser"; 


const fetcher = (url) => axios.get(url).then((res) => res.data);

const useFinance = () => {
  const { username } = useUser();
  const [message, setMessage] = useState(""); 
  const [financeData, setFinanceData] = useState([]); 


  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const { data, error, mutate } = useSWR(
    `http://192.168.4.174:5000/getfinancedata?username=${username}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setFinanceData(data);
    }
  }, [data]);


  const handleInputChange = (index, field, value) => {
    const updatedData = [...financeData];
    updatedData[index][field] = value;
    setFinanceData(updatedData); 
  };


  const handleAddRow = () => {
    setFinanceData([
      ...financeData,
      { month: "", income: 0, expenses: 0, savings: 0, isNew: true },
    ]); 
  };


  const handleSaveRow = async (index) => {
    const row = financeData[index];

    const monthExists = financeData.some((existingRow, i) => existingRow.month === row.month && i !== index);

    if (!row.month || isNaN(row.income) || isNaN(row.expenses) || isNaN(row.savings)) {
      setMessage("Please fill out all fields with valid values.");
      return;
    }

    if (monthExists) {
      setMessage("This month already exists.");
      return;
    }

    try {
      if (row.isNew) {
        await axios.post("http://192.168.4.174:5000/add-finance", {
          username,
          ...row,
        });
      } else {
        await axios.put("http://192.168.4.174:5000/update-finance", {
          username,
          ...row,
        });
      }

      mutate();
      setMessage("Data saved successfully.");
    } catch (error) {
      setMessage("Error saving data.");
    }
  };

  const handleDeleteRow = async (index) => {
    const row = financeData[index];

    if (row.isNew) {
      const updatedData = financeData.filter((_, i) => i !== index);
      setFinanceData(updatedData); 
      return;
    }

    try {
      await axios.delete("http://192.168.4.174:5000/delete-finance", {
        data: { username, month: row.month },
      });

      mutate();
      setMessage("Data deleted successfully.");
    } catch (error) {
      setMessage("Error deleting data.");
    }
  };

  if (error) {
    return { financeData: [], message: "Error loading data." };
  }

  if (!data) {
    return { financeData: [], message: "Loading..." };
  }

  return {
    financeData,
    message,
    months,
    handleInputChange,
    handleAddRow,
    handleSaveRow,
    handleDeleteRow,
  };
};

export default useFinance;
