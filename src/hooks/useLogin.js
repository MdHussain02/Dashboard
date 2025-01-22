import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../atoms/authAtom';
const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSplash, setShowSplash] = useState(false);
  const navigate = useNavigate();
  const [logged, setLogged] = useRecoilState(isLoggedInState);

  useEffect(() => {
    if (logged === true) {
      setShowSplash(true);
      setTimeout(() => navigate('/home/dashboard'), 100);
    } else {
      setShowSplash(false);
    }
  }, [logged, navigate]);

  const validateForm = () => {
    if (!username.trim()) {
      return 'Username cannot be empty';
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return 'Username must be alphanumeric';
    } else if (!password.trim()) {
      return 'Password cannot be empty';
    } else if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return null; 
  };


  const handleSignup = () =>{

    setShowSplash(true);
    navigate('/signup')

  }
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const formError = validateForm();
    if (formError) {
      setError(formError);
      return;
    }
  
    try {
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
        setShowSplash(true);
        setLogged(true);
        setTimeout(() => navigate('/home/dashboard'), 1000);
      } else {
        setError(data.error || 'Login failed');
        setLogged(false);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Something went wrong. Please try again later.');
    }
  };
  return {
    username,
    password,
    error,
    showSplash,
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    handleSignup
};
}
export default useLogin;
