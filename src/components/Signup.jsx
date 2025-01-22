import React from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Signup.css';
import useSignup from '../hooks/useSignup';
const Signup = () => {
  const {
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
  } = useSignup();
  
  return (
    <div className="signup-container vh-100 d-flex align-items-center justify-content-center">
      <div className="signup-card card border-0 shadow-lg">
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div className="icon-circle d-inline-flex align-items-center justify-content-center rounded-circle mb-3">
              <User size={24} className="text-primary" />
            </div>
            <h2 className="fw-bold">Create an Account</h2>
            <p className="text-muted">Please fill in the details to sign up</p>
          </div>

          <form onSubmit={handleSignup}>
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
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="input-group-text" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
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
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="input-group-text" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>

            {error && <div className="invalid-feedback d-block">{error}</div>}
            {success && <div className="text-success d-block mb-3">{success}</div>}

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
