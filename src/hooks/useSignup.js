// hooks/useSignup.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const validateForm = () => {
    if (!username.trim()) {
      return 'Username cannot be empty';
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return 'Username must be alphanumeric';
    } else if (!password.trim()) {
      return 'Password cannot be empty';
    } else if (password.length < 6) {
      return 'Password must be at least 6 characters';
    } else if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const formError = validateForm();
    if (formError) {
      setError(formError);
      setSuccess('');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.4.174:5000/signup', {
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
