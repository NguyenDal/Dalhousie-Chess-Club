import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import '../styles/editPage.css';

function AddScore() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    resultID: '',
    tournamentTitle: '',
    participant1: '',
    participant2: '',
    winnerID: '',
    gameDate: '',
    resultURL: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate Tournament Title
      const tournamentResponse = await axios.get(`${BASE_URL}/api/tournaments/validate?title=${formData.tournamentTitle}`);
      if (tournamentResponse.data.length === 0) {
        alert('Tournament title not found. Please check the title.');
        return;
      }
      const tournamentsID = tournamentResponse.data[0].tournamentsID;

      // Check if resultID is already in use
      const resultCheckResponse = await axios.get(`${BASE_URL}/api/tournaments/results/${formData.resultID}`);
      if (resultCheckResponse.data.length > 0) {
        alert('Result ID is already in use. Please use a unique result ID.');
        return;
      }

      // Determine the winner ID: 1 for White, 2 for Black, and null for Draw
      const winnerID = formData.winnerID === "1" ? 1 : formData.winnerID === "2" ? 2 : null;

      const newResultData = {
        resultID: formData.resultID,
        tournamentsID: tournamentsID,
        userName1: formData.participant1,
        userName2: formData.participant2,
        winnerID: winnerID,  // 1 for White, 2 for Black, null for Draw
        gameDate: formData.gameDate,
        resultURL: formData.resultURL
      };

      console.log("Submitting new result:", newResultData);  // For debugging

      await axios.post(`${BASE_URL}/api/tournaments/results/add`, newResultData);
      alert("Result added successfully!");
      navigate('/score-editForm');
    } catch (error) {
      console.error('Failed to add the result:', error);
      alert('Tournament title not found. Please check the title.');
    }
  };

  return (
    <div className="gp-form-page-container">
      <h1 className="gp-header-title">Add Tournament Result</h1>
      <div className="gp-form-container">
        <form className="gp-add-form-container" onSubmit={handleSubmit}>
          <div className="gp-form-element">
            <label>Result ID:</label>
            <input
              type="text"
              name="resultID"
              value={formData.resultID}
              onChange={handleChange}
              required
              className="gp-text-form"
            />
          </div>
          <div className="gp-form-element">
            <label>Tournament Title:</label>
            <input
              type="text"
              name="tournamentTitle"
              value={formData.tournamentTitle}
              onChange={handleChange}
              required
              className="gp-text-form"
            />
          </div>
          <div className="gp-form-element">
            <label>White:</label>
            <input
              type="text"
              name="participant1"
              value={formData.participant1}
              onChange={handleChange}
              required
              className="gp-text-form"
            />
          </div>
          <div className="gp-form-element">
            <label>Black:</label>
            <input
              type="text"
              name="participant2"
              value={formData.participant2}
              onChange={handleChange}
              required
              className="gp-text-form"
            />
          </div>
          <div className="gp-form-element">
            <label>Winner:</label>
            <select
              name="winnerID"
              value={formData.winnerID}
              onChange={handleChange}
              className="gp-text-form"
            >
              <option value="">Draw</option>  
              <option value="1">White - {formData.participant1}</option>
              <option value="2">Black - {formData.participant2}</option>
            </select>
          </div>
          <div className="gp-form-element">
            <label>Game Date:</label>
            <input
              type="datetime-local"
              name="gameDate"
              value={formData.gameDate}
              onChange={handleChange}
              required
              className="gp-text-form"
            />
          </div>
          <div className="gp-form-element">
            <label>Result URL:</label>
            <input
              type="text"
              name="resultURL"
              value={formData.resultURL}
              onChange={handleChange}
              required
              className="gp-text-form"
            />
          </div>
          <div className="gp-submit-button-container">
            <button type="button" className="cancel-button" onClick={() => navigate('/score-editForm')}>Cancel</button>
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddScore;
