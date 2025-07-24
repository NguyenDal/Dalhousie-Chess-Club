// ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../config";
import '../styles/forgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessage(data.message);

      // Redirect to resetPassword page if email check is successful
      if (data.success) {
        navigate('/resetPassword');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="forgotPassword-container">
      <div className="forgotPassword-header">
        <h1 id="main-header">Forgot Password</h1>
        <p>Please input your email address, and we will check if it matches our records.</p>
      </div>

      <div className="emailFormDiv">
        <form className="form-element" onSubmit={handleSubmit}>
          <label>Email Address:</label>
          <input
            className="emailText-form"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="reset-submit-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      {message && <div className='message'>{message}</div>}
    </div>
  );
}

export default ForgotPassword;
