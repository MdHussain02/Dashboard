export const validateForm = (username, password) => {
  // Username validation
  if (!username.trim()) {
    return 'Username cannot be empty';
  } else if (username.length < 3 || username.length > 20) {
    return 'Username must be between 3 and 20 characters';
  } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return 'Username must be alphanumeric';
  }
  
  // Password validation
  if (!password.trim()) {
    return 'Password cannot be empty';
  } else if (password.length < 6) {
    return 'Password must be at least 6 characters';
  } else if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  } else if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  } else if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character';
  } else if (['password123', '123456', 'qwerty', 'letmein', '123qwe'].includes(password)) {
    return 'Password is too weak (common password)';
  }

  return null;
};
