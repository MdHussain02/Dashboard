import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Import the custom useAuth hook

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSplash, setShowSplash] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { isLoggedIn, logIn } = useAuth(); // Use the useAuth hook

  useEffect(() => {
    if (isLoggedIn) {
      setShowSplash(true);
      setTimeout(() => navigate('/home/dashboard'), 100);
    } else {
      setShowSplash(false);
    }
  }, [isLoggedIn, navigate]);

  const handleSignup = () => {
    setShowSplash(true);
    navigate('/signup');
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Directly check if username and password are provided
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
  
    try {
      setLoading(true); // Set loading to true when the login process starts
      setShowSplash(true); // Show splash screen while loading

      console.log('Sending request to backend...');
      const response = await fetch('http://192.168.4.174:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (response.ok) {
        // Save the JWT token in localStorage or cookies for future authentication
        localStorage.setItem('authToken', data.token);
        logIn(); // Log the user in using the custom hook
        setShowSplash(true);
        navigate('/home/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state after request
      setShowSplash(false); // Hide splash screen after loading is complete
    }
  };

  return {
    username,
    password,
    error,
    showSplash,
    loading, // Return loading state
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    handleSignup
  };
};

export default useLogin;
