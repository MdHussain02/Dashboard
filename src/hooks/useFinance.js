import { useState,useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import useUser from "../hooks/useUser"; // Import the custom hook

// Define the fetcher function for SWR
const fetcher = (url) => axios.get(url).then((res) => res.data);

const useFinance = () => {
  const { username } = useUser(); // Custom hook to get the username
  const [message, setMessage] = useState(""); // Message for success/error
  const [financeData, setFinanceData] = useState([]); // Local state for finance data

  // Available months to select from
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  // Use SWR for data fetching
  const { data, error, mutate } = useSWR(
    `http://localhost:5000/getfinancedata?username=${username}`,
    fetcher
  );

  // Set the data when fetched
  useEffect(() => {
    if (data) {
      setFinanceData(data);
    }
  }, [data]);

  // Handle input changes in the form fields
  const handleInputChange = (index, field, value) => {
    const updatedData = [...financeData];
    updatedData[index][field] = value;
    setFinanceData(updatedData); // Update the local state
  };

  // Handle adding a new row
  const handleAddRow = () => {
    setFinanceData([
      ...financeData,
      { month: "", income: 0, expenses: 0, savings: 0, isNew: true },
    ]); // Add a new row to local state
  };

  // Handle saving a row (either adding or updating)
  const handleSaveRow = async (index) => {
    const row = financeData[index];

    // Check if month is already present in the finance data (excluding the current row being edited)
    const monthExists = financeData.some((existingRow, i) => existingRow.month === row.month && i !== index);

    if (!row.month || isNaN(row.income) || isNaN(row.expenses) || isNaN(row.savings)) {
      setMessage("Please fill out all fields with valid values.");
      return;
    }

    // Show message if the month already exists
    if (monthExists) {
      setMessage("This month already exists.");
      return;
    }

    try {
      if (row.isNew) {
        await axios.post("http://localhost:5000/add-finance", {
          username,
          ...row,
        });
      } else {
        await axios.put("http://localhost:5000/update-finance", {
          username,
          ...row,
        });
      }

      // Mutate SWR to refresh the data after save
      mutate();
      setMessage("Data saved successfully.");
    } catch (error) {
      setMessage("Error saving data.");
    }
  };

  // Handle deleting a row
  const handleDeleteRow = async (index) => {
    const row = financeData[index];

    if (row.isNew) {
      const updatedData = financeData.filter((_, i) => i !== index);
      setFinanceData(updatedData); // Remove the row optimistically
      return;
    }

    try {
      await axios.delete("http://localhost:5000/delete-finance", {
        data: { username, month: row.month },
      });

      // Mutate SWR to refresh the data after deletion
      mutate();
      setMessage("Data deleted successfully.");
    } catch (error) {
      setMessage("Error deleting data.");
    }
  };

  // Error handling for SWR
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
