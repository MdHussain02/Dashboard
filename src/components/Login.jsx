import React, { useState } from 'react';
import { User, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import SplashScreen from './SplashScreen';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const {
    username,
    password,
    error,
    showSplash,
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    handleSignup
  } = useLogin();


  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container vh-100 d-flex align-items-center justify-content-center">
      {showSplash ? (
        <div className="splash-screen">
          <SplashScreen />
        </div>
      ) : (
        <div className="login-card card border-0 shadow-lg">
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <div className="icon-circle d-inline-flex align-items-center justify-content-center rounded-circle mb-3">
                <LogIn size={24} className="text-primary" />
              </div>
              <h2 className="fw-bold">Welcome back</h2>
              <p className="text-muted">Please sign in to your account</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text border-end-0 bg-transparent">
                    <User size={18} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className={`form-control border-start-0 ps-0 ${error ? 'is-invalid' : ''}`}
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text border-end-0 bg-transparent">
                    <Lock size={18} className="text-muted" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control border-start-0 ps-0 ${error ? 'is-invalid' : ''}`}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <span className="input-group-text m-2 " onClick={togglePasswordVisibility}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
              </div>

              {error && <div className="invalid-feedback d-block">{error}</div>} {/* Global error display */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Login
                </button>
              </div>
            </form>
            <p> dont have an account yet ? <span><button className='btn btn-link text-primary  ' onClick={handleSignup}>signup now</button></span> </p> 
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
