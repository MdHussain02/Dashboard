import React, { useState } from 'react';
import useUser from '../../hooks/useUser';
import usePasswordChange from '../../hooks/usePasswordChange'; // Import the custom hook
import { Eye, EyeOff } from 'lucide-react'; // Import icons
import './Profile.css'; // Import the CSS file

function Profile() {
  const { username, email, name, profilePic } = useUser(); // Destructure more user details if available
  const [isPasswordFormVisible, setIsPasswordFormVisible] = useState(false); // State to toggle password form visibility

  // Use the custom hook to handle the password update logic
  const {
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
  } = usePasswordChange(username);

  const toggleFormVisibility = () => {
    setIsPasswordFormVisible((prevState) => !prevState); // Toggle form visibility
  };

  return (
    <div className="profile-container shadow-sm rounded p-4 bg-light">
      <h6 className="text-center text-primary mb-4">Welcome {username}</h6>

      {/* Profile Picture Section */}
      <div className="text-center mb-4">
        <img
          src={profilePic || 'default-profile-pic.png'}
          alt="Profile"
          className="profile-pic"
        />
      </div>

      {/* User Details Section */}
      <div style={{fontSize:"14px"}}>
        <p>Name: {name || 'N/A'}</p>
        <p>Email: {email || 'N/A'}</p>
      </div>

      {/* Button to toggle password change form */}
      <button
        onClick={toggleFormVisibility}
        className="btn btn-outline-primary w-100 mb-4"
      >
        {isPasswordFormVisible ? 'Cancel' : 'Change Password'}
      </button>

      {/* Show Password Change Form if visible */}
      {isPasswordFormVisible && (
        <form onSubmit={handlePasswordChange} className="password-change-form">
          <div className="form-group mb-3 position-relative">
            <label htmlFor="oldPassword" className="form-label">Old Password</label>
            <input
              type={oldPasswordVisible ? 'text' : 'password'}
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="form-control"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('old')}
              className="btn btn-link position-absolute end-0 top-50 mt-3 translate-middle-y"
            >
              {oldPasswordVisible ? <EyeOff/> : <Eye />}
            </button>
          </div>

          <div className="form-group mb-3 position-relative">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type={newPasswordVisible ? 'text' : 'password'}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="form-control"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="btn btn-link position-absolute end-0 top-50 mt-3 translate-middle-y"
            >
              {newPasswordVisible ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="form-group mb-3 position-relative">
            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-control"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="btn btn-link position-absolute end-0 top-50 mt-3 translate-middle-y "
            >
              {confirmPasswordVisible ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Change Password
          </button>

          {message && <p className="message text-center text-danger mt-3">{message}</p>}
        </form>
      )}
    </div>
  );
}

export default Profile;
