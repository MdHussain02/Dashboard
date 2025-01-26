import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import useUser from "./useUser"; 
// Fetcher function for SWR
const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const useStepForm = () => {
  const { username } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    month: '',
    dataType: '',
    incomeType: '',
    expenseType: '',
    amount: '',
    customExpense: ''
  });
  const [errors, setErrors] = useState({
    month: false,
    dataType: false,
    incomeType: false,
    expenseType: false,
    amount: false,
    customExpense: false
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Move to next step
  const handleNextStep = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Step 1 Validations
    if (step === 1) {
      if (!formData.month) {
        newErrors.month = 'Please select a month.';
        isValid = false;
      } else {
        newErrors.month = false;
      }

      if (!formData.dataType) {
        newErrors.dataType = 'Please select a data type.';
        isValid = false;
      } else {
        newErrors.dataType = false;
      }
    }

    // Step 2 Validations
    if (step === 2) {
      if (formData.dataType === 'income' && !formData.incomeType) {
        newErrors.incomeType = 'Please select an income type.';
        isValid = false;
      } else {
        newErrors.incomeType = false;
      }

      if (formData.dataType === 'expense') {
        if (!formData.expenseType) {
          newErrors.expenseType = 'Please select an expense type.';
          isValid = false;
        } else {
          newErrors.expenseType = false;
        }

        if (formData.expenseType === 'other' && !formData.customExpense) {
          newErrors.customExpense = 'Please provide a custom expense.';
          isValid = false;
        } else {
          newErrors.customExpense = false;
        }
      }

      // Amount validation
      if (!formData.amount || formData.amount <= 0) {
        newErrors.amount = 'Please enter a valid amount greater than 0.';
        isValid = false;
      } else {
        newErrors.amount = false;
      }
    }

    if (isValid) {
      setErrors({ month: false, dataType: false, incomeType: false, expenseType: false, amount: false, customExpense: false });
      setStep((prevStep) => prevStep + 1);
    } else {
      setErrors(newErrors);
    }
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Submit the form
  const handleSubmit = async () => {
    // Step 2 validation before submission
    let isValid = true;
    const newErrors = { ...errors };
  
    // Ensure that all fields are filled
    if (!formData.month || !formData.dataType) {
      isValid = false;
      newErrors.month = 'Please select a month.';
      newErrors.dataType = 'Please select a data type.';
    }
  
    if (formData.dataType === 'income' && !formData.incomeType) {
      isValid = false;
      newErrors.incomeType = 'Please select an income type.';
    }
  
    if (formData.dataType === 'expense') {
      if (!formData.expenseType) {
        isValid = false;
        newErrors.expenseType = 'Please select an expense type.';
      }
  
      if (formData.expenseType === 'other' && !formData.customExpense) {
        isValid = false;
        newErrors.customExpense = 'Please provide a custom expense.';
      }
    }
  
    // Validate amount
    if (!formData.amount || formData.amount <= 0) {
      isValid = false;
      newErrors.amount = 'Please enter a valid amount greater than 0.';
    }
  
    if (isValid) {
      try {
        // Prepare the data to be posted
        const postData = {
          username: username, // Replace with actual username (you can get it from the logged-in user's state or context)
          month: formData.month,
          income: formData.dataType === 'income' ? formData.amount : 0,
          expenses: formData.dataType === 'expense' ? formData.amount : 0,
          savings: formData.dataType === 'income' ? formData.amount : formData.dataType === 'expense' ? 0 : formData.amount // Adjust based on your logic
        };

        // Send the request to the backend using Axios
        const response = await axios.post('http://localhost:5000/add-finance', postData, {
          headers: {
            'Content-Type': 'application/json',
            // If authentication is required, add token here
            // 'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          alert(response.data.message);
          setFormData({
            month: '',
            dataType: '',
            incomeType: '',
            expenseType: '',
            amount: '',
            customExpense: ''
          });
          setStep(1); // Reset to step 1 after submission
        } else {
          alert(response.data.error || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Internal server error. Please try again later.');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return {
    step,
    formData,
    errors,
    handleInputChange,
    handleNextStep,
    handlePreviousStep,
    handleSubmit
  };
};

export default useStepForm;
