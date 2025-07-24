import React, { useState } from 'react';
import '../styles/AddForms.css';
import { BASE_URL } from '../config';

function TournamentsAddForm() {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentDescrip, setTournamentDescrip] = useState('');
  const [cost, setCost] = useState('');
  const [tournamentImage, setTournamentImage] = useState();
  const [registrationLink, setRegistrationLink] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numofParticipents, setNumofParticipents] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');
  const [prizes, setPrizes] = useState('');
  const [tournamentTypeID, setTournamentTypeID] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [cfcRequired, setCfcRequired] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', tournamentName);
      formData.append('description', tournamentDescrip);
      formData.append('cost', cost);
      formData.append('tournamentImage', tournamentImage);
      formData.append('registration_link', registrationLink);
      formData.append('start_date', startDate);
      formData.append('end_date', endDate);
      formData.append('num_of_participants', numofParticipents);
      formData.append('location', location);
      formData.append('requirements', requirements);
      formData.append('prizes', prizes);
      formData.append('tournament_typeID', tournamentTypeID);
      formData.append('registration_deadline', registrationDeadline);
      formData.append('cfc_required', +Boolean(cfcRequired));
  
      const response = await fetch(`${BASE_URL}/api/tournaments/add`, { 
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
          console.log(result);
      } else {
          console.error('Failed to add tournament:', result);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div className="add-form-container">
      <div className="header-info">
        <h2 id="main-header">Tournaments Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "Tournaments" page.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-A">
        <div className="form-element">
          <label>Tournament Name</label>
          <input 
            className="text-form" 
            type="text" 
            value={tournamentName} 
            onChange={(e) => setTournamentName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>Tournament Image</label>
          <input 
            className="file-form" 
            type="file" 
            accept='image/*' 
            name='tournamentImage'
            onChange={(e) => setTournamentImage(e.target.files[0])} 
            required 
          />
        </div>
        <div className="form-element">
          <label>Tournament Description</label>
          <input 
            className="text-form" 
            type="text" 
            value={tournamentDescrip} 
            onChange={(e) => setTournamentDescrip(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>Cost</label>
          <input 
            className="text-form" 
            type="number" 
            value={cost} 
            onChange={(e) => setCost(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>Registration Link</label>
          <input 
            className="text-form" 
            type="link" 
            value={registrationLink} 
            onChange={(e) => setRegistrationLink(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>Start Date</label>
          <input 
            className="text-form" 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>End Date</label>
          <input 
            className="text-form" 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>Number of Participents</label>
          <input 
            className="text-form" 
            type="number" 
            value={numofParticipents} 
            onChange={(e) => setNumofParticipents(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>Location </label>
          <input 
            className="text-form" 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>Requirements</label>
          <input 
            className="text-form" 
            type="text" 
            value={requirements} 
            onChange={(e) => setRequirements(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>Prizes</label>
          <input 
            className="text-form" 
            type="text" 
            value={prizes} 
            onChange={(e) => setPrizes(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>Tournament type ID</label>
          <input 
            className="text-form" 
            type="number" 
            value={tournamentTypeID} 
            onChange={(e) => setTournamentTypeID(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>Registration Deadline</label>
          <input 
            className="text-form" 
            type="date" 
            value={registrationDeadline} 
            onChange={(e) => setRegistrationDeadline(e.target.value)} 
            required 
          />
        </div>
        <div className="form-element">
          <label>CFC Required</label>
          <input 
            className="checkbox-form" 
            type="checkbox" 
            checked={cfcRequired === 1} 
            onChange={(e) => setCfcRequired(e.target.checked? 1 : 0)} 
          />
        </div>
        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default TournamentsAddForm;