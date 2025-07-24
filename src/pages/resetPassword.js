import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../config";
import "../styles/resetPassword.css"

function ResetPassword() {
  const [tempPass, setTempPass] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tempPass, newPassword, confirmPassword }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (!response.ok) {
        setMessage(data.message);
      }

      if (response.ok) {
        navigate('/adminLogin');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="resetPassword-container">
      <div className="resetPassword-header">
        <h1 id="main-header">Reset Password</h1>
        <p>Enter the temporary password and your new password below.</p>
      </div>

      <div className="resetFormDiv">
        <form className="form-element" onSubmit={handleSubmit}>
          <label>Temporary Password:</label>
          <input className="element-box"
            type="password"
            required
            value={tempPass}
            onChange={(e) => setTempPass(e.target.value)}
          />
          <label>New Password:</label>
          <input className="element-box"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label>Confirm New Password:</label>
          <input className="element-box"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="reset-submit-container">
            <button type="submit">Reset Password</button>
          </div>
        </form>
      </div>

      {message && <div className='message'>{message}</div>}
    </div>
  );
}

export default ResetPassword;
