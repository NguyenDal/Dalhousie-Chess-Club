import React, { useState, useEffect } from 'react';
import '../styles/AddForms.css';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from "../config";

const tournaments = [
  "Dalhousie Chess Championship",
  "Dalhousie Open",
  "Summer Rapid Open",
  "Summer Blitz Battle",
  "Owen Maitzen Rapid Open",
  "Fall Blitz Battle",
  "Winter Rapid Open",
  "Winter Blitz Battle"
];

function ChampionsEditForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('id');
  console.log(itemId);
  const [successMessage, setSuccessMessage] = useState('');
  const [championName, setChampionName] = useState('');
  const [championYear, setChampionYear] = useState(new Date().toISOString().split('T')[0]);
  const [tournament, setTournament] = useState(tournaments[0]);

  useEffect(() => {
    const fetchChampion = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/champions/${itemId}`);
        if(!response.ok) {
          console.log('error');
        }
        const result = await response.json();
        console.log(result);
        if (result) {
          setChampionName(result[0].name);
          const formattedYear = result[0].year.toString().split('T')[0];
          setChampionYear(formattedYear);
          setTournament(result[0].tournament);
          setSuccessMessage(result[0].message);
        }
      } catch (error) {
        console.error('Error fetching champion:', error);
      }
    };

    fetchChampion();
  }, [itemId]);

  const handleEdit = async () => {
    const formData = { name: championName, year: championYear, tournament: tournament };
    console.log(formData);
    try {
      const response = await fetch(`${BASE_URL}/api/champions/edit/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result) {
        console.log(result);
        setSuccessMessage("Champion updated successfully");
      } else {
        console.error('Failed to update champion');
        setSuccessMessage('Failed to update champion');
      }
    } catch (error) {
      console.error('Error updating champion:', error);
    }
  };

  return (
    <div className="add-form-container">
      <div className="header-info">
        <h2 id="main-header">Champions Page Edit Form</h2>
        <p>This is the page where you, the admin, can edit existing champions in the "Champions" page.</p>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="form-A">
        <div className="form-element">
          <label>Champion Name</label>
          <input 
            className="text-form" 
            type="text" 
            value={championName} 
            onChange={(e) => setChampionName(e.target.value)} 
            required 
          />
        </div>
      </div>

      <div className="form-B">
        <div className="form-element">
          <label>Year</label>
          <input 
            className="date-form" 
            type="date"
            value={championYear} 
            onChange={(e) => setChampionYear(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>Tournament</label>
          <select
            className="dropdown-form"
            value={tournament}
            onChange={(e) => setTournament(e.target.value)}
            required
          >
            {tournaments.map((tournament, index) => (
              <option key={index} value={tournament}>{tournament}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="submit-button-container">
        <button onClick={handleEdit} type="submit">Submit</button>
      </div>
    </div>
  );
}

export default ChampionsEditForm;