import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/tournamentRegistration.css';
import { BASE_URL } from './config.js';

function EventItem({ eventsID, name, image, date, time, endTime, participantsNo, price, description, registrationLink }) {
  const navigate = useNavigate();
  const [participantCount, setParticipantCount] = useState(0);

  useEffect(() => {
    console.log('Event ID:', eventsID); // Debug log
    // Fetch the number of participants for this tournament
    if (eventsID) {
      fetch(`${BASE_URL}/api/events/${eventsID}/participants`)
        .then(response => response.json())
        .then(data => setParticipantCount(data.participantCount))
        .catch(error => console.error('Error fetching participant count:', error));
    }
  }, [eventsID]);

  const handleTournamentClick = (e) => {
    e.preventDefault();  // Prevents the popup from opening when the button is clicked
    navigate(`/eventInfo?itemId=${eventsID}`); // Navigate to the tournament info
  }
  
  return (
    <div className="tournamentItem" onClick={handleTournamentClick}>
      <h1>{name}</h1>
      <img src={image} alt={name} />
      <p>{date} | {time} - {endTime} | {price}</p>
      <p>Number of Participants: {participantCount}</p>
    </div>
  );
}

export default EventItem;