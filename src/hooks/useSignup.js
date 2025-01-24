// hooks/useSignup.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../utils/validation'; // Import the common validation function

const useSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reuse the common validation function
    const formError = validateForm(username, password);
    if (formError) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
      } else {
        setError(formError);
      }
      setSuccess('');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('User registered successfully! Redirecting to login...');
        setError('');
        setTimeout(() => navigate('/'), 1000);
      } else {
        setError(data.error || 'Signup failed');
        setSuccess('');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    showPassword,
    togglePasswordVisibility,
    handleSignup,
    loading,
  };
};

export default useSignup;
