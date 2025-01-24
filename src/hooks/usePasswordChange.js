// hooks/usePasswordChange.js
import { useState } from 'react';
import axios from 'axios';
import { mutate } from 'swr';

const usePasswordChange = (username) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // API endpoint for password update
  const passwordUpdateAPI = 'http://localhost:5000/update-password';

  // Function to toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === 'old') {
      setOldPasswordVisible((prev) => !prev);
    } else if (field === 'new') {
      setNewPasswordVisible((prev) => !prev);
    } else if (field === 'confirm') {
      setConfirmPasswordVisible((prev) => !prev);
    }
  };

  // Function to handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match!');
      return;
    }

    try {
      // Send password change request using axios
      const response = await axios.put(passwordUpdateAPI, {
        username,
        oldPassword,
        newPassword,
      });

      // If successful, update the SWR cache (mutate)
      mutate(passwordUpdateAPI);

      setMessage(response.data.message);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong!');
    }
  };

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    handlePasswordChange,
    togglePasswordVisibility,
    oldPasswordVisible,
    newPasswordVisible,
    confirmPasswordVisible,
  };
};

export default usePasswordChange;
