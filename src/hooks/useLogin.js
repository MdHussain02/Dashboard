import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSplash, setShowSplash] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const {  logIn } = useAuth(); 
  const handleSignup = () => {
    setShowSplash(true);
    navigate('/signup');
  };
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleLogin = async (e) => {
    e.preventDefault();    
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
    try {
      setLoading(true); 
      setShowSplash(true); 
      console.log('Sending request to backend...');
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        logIn(); 
        setShowSplash(true);
        navigate('/home/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); 
      setShowSplash(false); 
    }
  };

  return {
    username,
    password,
    error,
    showSplash,
    loading, 
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    handleSignup
  };
};

export default useLogin;
