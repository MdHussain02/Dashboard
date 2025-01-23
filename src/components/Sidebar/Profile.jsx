import React from 'react';
import useUser  from '../../hooks/useUser';
import usePasswordChange from '../../hooks/usePasswordChange'; // Import the custom hook
import './Profile.css'; // Import the CSS file

function Profile() {
  const { username, email, name, profilePic } = useUser (); // Destructure more user details if available

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

  return (
    <div className="profile-container">
      <h1>Welcome {username}</h1>

      {/* Profile Picture Section */}
      <div className="profile-pic-container">
        <img src={profilePic || 'default-profile-pic.png'} alt="Profile" className="profile-pic" />
      </div>

      {/* User Details Section */}
      <div className="user-details">
        <h2>User Details</h2>
        <p>Name: {name || 'N/A'}</p>
        <p>Email: {email || 'N/A'}</p>
      </div>

      <p>Please update your password if you want to make any changes to your account security.</p>

      {/* Password Change Form */}
      <form onSubmit={handlePasswordChange} className="password-change-form">
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type={oldPasswordVisible ? 'text' : 'password'}
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => togglePasswordVisibility('old')}>
            {oldPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type={newPasswordVisible ? 'text' : 'password'}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => togglePasswordVisibility('new')}>
            {newPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => togglePasswordVisibility('confirm')}>
            {confirmPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>

        <button type="submit" className="change-password-button">Change Password</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Profile;