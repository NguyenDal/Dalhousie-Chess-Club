import React from "react";
import "./styles/tournaments.css";

function EventInfoItem({ eventID, name, image, date, time, endTime, participantsNo, price, description, registrationLink, participants }) {

  return (
    <div className="tpopup-background">
      <div className="tpopup-content" onClick={e => e.stopPropagation()}>
        <div className="ttournament-info">
          <img className="ttournament-image" src={image} alt={name} />
          <div>
          <h1 className="ttitle">{name}</h1>
          </div>
          <div className="ttournament-details">
            <p> Cost: {price} </p>
            <p> Date: {date} </p>
            <p> Time: {time} - {endTime}</p>
            <p> Number of Participants: {participantsNo} </p>
            <p> {description} </p>
            
            <h2>Registered Participants:</h2>
            
            <ul>
              {participants.map(participant => (
                <li key={participant.id}>{participant.fullname}</li>
              ))}
            </ul>
          </div>
        </div>

        {registrationLink && (
          <a href={registrationLink} target="_blank" rel="noopener noreferrer">
            <button className="tregisterButton">Register</button>
          </a>
        )}
      </div>
      <h1 className="speakers">Speakers</h1>
    </div>
  );
}

export default EventInfoItem;
