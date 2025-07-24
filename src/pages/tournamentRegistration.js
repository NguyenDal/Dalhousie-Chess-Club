import React, { useState, useEffect } from 'react';
import '../styles/tournamentRegistration.css';
import { BASE_URL } from '../config';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cfcId: '',
    cfcRating: '',
    hasCfcId: 'no',
    cfcExpiryDate: '',
    halfPointByes: [],
    paymentMethod: ''
  });

  const [tournamentsID, setTournamentsID] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('tournamentsID');
    setTournamentsID(id);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    setFormData(prevState => {
      const newByes = checked ? [...prevState.halfPointByes, value] : prevState.halfPointByes.filter(bye => bye !== value);
      return { ...prevState, halfPointByes: newByes };
    });
  };

  const sendAutomatedEmail = async (email) => {
    try {
        const response = await fetch(`${BASE_URL}/api/send-automated-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: email,
                subject: 'Tournament Registration Confirmation',
                text: 'Thank you for registering for the tournament!'
            })
        });

        if (!response.ok) {
            console.error('Failed to send confirmation email');
        }
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};


  const handleSubmit = async (event) => {
    event.preventDefault();

    const mailformat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    
    if (!formData.email.match(mailformat)) {
      alert("Invalid email address!");
      return;
    }

    const dataToSend = {
      fullname: formData.name,
      email: formData.email,
      entry_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      tournamentsID: tournamentsID,
      paymentMethod: formData.paymentMethod,
      halfPointByes: formData.halfPointByes.join(', '),
      cfcExpiryDate: formData.cfcExpiryDate || null
    };

    if (formData.hasCfcId === 'yes') {
      dataToSend.cfcID = formData.cfcId;
      dataToSend.cfcRating = formData.cfcRating;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/registration/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        alert('Registration submitted successfully!');
        // Send the automated email after successful registration
        sendAutomatedEmail(formData.email);
      } else {
        alert('Failed to submit registration');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit registration');
    }
  };

  return (
    <div className="forgotPassword-container">
      <div className="forgotPassword-header">
        <h1>Register for the Tournament</h1>
        <p>Please fill out this form if you are interested in participating in the upcoming tournament.</p>
        <p>The survey will take approximately 5 minutes or less to complete.</p>
      </div>
      <div className="emailFormDiv">
        <form className="form-element" onSubmit={handleSubmit}>
          <input 
            name="name" 
            className="emailText-form" 
            placeholder="What is your name?" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            name="email" 
            className="emailText-form" 
            placeholder="What is your email address?" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />
          <div className="emailText-form">
            {tournamentsID === '3' ? (
              <>
                <label>Do you have an active (non-expired) CFC membership? You MUST have one to play in the tournament. If you are not a member, please purchase a membership online at the CFC website, in this link: <a href="https://www.chess.ca/en/players/membership-join/">https://www.chess.ca/en/players/membership-join/</a></label>
                <input type="radio" name="hasCfcId" value="yes" checked={formData.hasCfcId === 'yes'} onChange={handleInputChange} /> Yes
                <input type="radio" name="hasCfcId" value="no" checked={formData.hasCfcId === 'no'} onChange={handleInputChange} /> No
              </>
            ) : (
              <>
                <label>Do you have a CFC ID?</label>
                <input type="radio" name="hasCfcId" value="yes" checked={formData.hasCfcId === 'yes'} onChange={handleInputChange} /> Yes
                <input type="radio" name="hasCfcId" value="no" checked={formData.hasCfcId === 'no'} onChange={handleInputChange} /> No
              </>
            )}
          </div>
          {formData.hasCfcId === 'yes' && (
            <>
              <input name="cfcId" className="emailText-form" placeholder="Please state your CFC ID" value={formData.cfcId} onChange={handleInputChange} />
              <input name="cfcRating" className="emailText-form" placeholder="Please state your CFC regular rating" value={formData.cfcRating} onChange={handleInputChange} />
              <label htmlFor="cfcExpiryDate">What is your CFC membership expiry date?</label>
              <input name="cfcExpiryDate" type="date" className="emailText-form" value={formData.cfcExpiryDate} onChange={handleInputChange} />
            </>
          )}
          {tournamentsID === '3' && (
            <div className="emailText-form">
              <label>Half-point byes request:</label>
              {['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'].map((round, idx) => (
                <div key={idx}>
                  <input type="checkbox" value={round} onChange={handleCheckboxChange} /> {round} {idx === 4 ? '(0 point bye)' : ''}
                </div>
              ))}
            </div>
          )}
          <div className="emailText-form">
            <label>Payment method:</label>
            <input type="radio" name="paymentMethod" value="E-transfer to chess@dal.ca" onChange={handleInputChange} /> E-transfer to chess@dal.ca
            <input type="radio" name="paymentMethod" value="Pay with cash during registration confirmation" onChange={handleInputChange} /> Pay with cash during registration confirmation
          </div>
          <div className="reset-submit-container">
            <button type="submit">Register</button>
            <button type="button" onClick={() => window.history.back()}>Cancel</button>
          </div>
        </form>
      </div>
      <div className="subscriptionMessage-container">
        <p>Want news about tournaments, events, socials or open positions?</p>
        <p>Subscribe to our mailing list!</p>
      </div>
      <div className="subscribe-button-container">
        <a href="mailingList">
          <button>Subscribe</button>
        </a>
      </div>
    </div>
  );
}

export default RegistrationForm;

