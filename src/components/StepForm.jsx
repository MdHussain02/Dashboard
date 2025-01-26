import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseForm = ({ user, month, expenseId, setExpenses }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Populate fields if editing an existing expense
  useEffect(() => {
    if (expenseId) {
      setIsEditing(true);
      // Fetch the existing expense details from the backend
      axios
        .get(`http://localhost:5000/get-expense/${user}/${month}/${expenseId}`)
        .then((res) => {
          const expense = res.data;
          setCategory(expense.category);
          setDescription(expense.description);
          setAmount(expense.amount);
        })
        .catch((err) => console.log(err));
    } else {
      // Reset the form if not editing
      setCategory('');
      setDescription('');
      setAmount('');
      setReceipt(null);
      setIsEditing(false);
    }
  }, [expenseId, user, month]);

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', user);
    formData.append('month', month);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('amount', amount);
    if (receipt) formData.append('receipt', receipt);

    const url = isEditing
      ? `http://localhost:5000/update-expense/${expenseId}`
      : 'http://localhost:5000/add-expense';
    const method = isEditing ? 'put' : 'post';

    axios[method](url, formData)
      .then((response) => {
        console.log(response.data);
        // Update the expenses list with the updated data
        setExpenses(response.data.expenses);
        // Reset form state after submission
        setCategory('');
        setDescription('');
        setAmount('');
        setReceipt(null);
        setIsEditing(false);
      })
      .catch((error) => console.error('Error occurred during the API request:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Receipt (optional)</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button type="submit">{isEditing ? 'Update Expense' : 'Add Expense'}</button>
    </form>
  );
};

export default ExpenseForm;
