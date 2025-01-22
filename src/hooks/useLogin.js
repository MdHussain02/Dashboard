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
      setTimeout(() => navigate('/home/page1'), 100);
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
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = (e) => {
    e.preventDefault();

    const formError = validateForm();
    if (formError) {
      setError(formError);
      return;
    }
    if (username === 'admin' && password === 'admin123') {
      setShowSplash(true);
      setLogged(true);
      setTimeout(() => navigate('/home/page1'), 1000);
    } else {
      setError('Invalid username or password');
      setLogged(false); 
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
  };
};
export default useLogin;
