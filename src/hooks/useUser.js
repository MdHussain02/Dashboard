import { useState, useEffect } from 'react';

const useUser = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Check if user data exists in localStorage or fetch from global state
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Assuming the username is stored in the JWT token
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the JWT token
      setUsername(decodedToken.username);  // Set the username
    } else {
      setUsername(null);
    }
  }, []);

  return { username };
};

export default useUser;
