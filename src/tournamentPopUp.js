import React from 'react';
import './styles/TournamentPopUp.css'; 
import { Close } from '@mui/icons-material';
import { BASE_URL } from './config.js';

function TournamentPopUp({ participant1, participant2, result, winner, resultURL, tournamentName, onClose }) {
  // Check for draw by comparing the winner to "Draw"
  const isDraw = winner === 'Draw';
  // Set border colors based on the winner string
  const whiteBorderColor = isDraw ? 'yellow' : winner === participant1 ? 'green' : 'red';
  const blackBorderColor = isDraw ? 'yellow' : winner === participant2 ? 'green' : 'red';

  // Set result text based on winner (draw or specific winner)
  const resultText = isDraw
    ? '1/2 - 1/2'
    : winner === participant1
    ? '1 - 0' // White (participant1) won
    : '0 - 1'; // Black (participant2) won

  const handleViewAnalysis = () => {
    if (resultURL) {
      window.open(resultURL, '_blank', 'noopener,noreferrer');
    } else {
      console.error('No URL provided for analysis');
    }
  };

  return (
    <div className="tournament-popup-background" onClick={onClose}>
      <div className="tournament-popup-content" onClick={e => e.stopPropagation()}>
        <h2 className="tournament-title">{tournamentName}</h2>
        <button className="analysis-button" onClick={handleViewAnalysis}>View Analysis</button>
        <div className="tournament-participants">
          <div className="tournament-participant" style={{ borderColor: whiteBorderColor }}>
            <h2>White</h2>
            <p className="participant-name">{participant1}</p>
            <img src={`${BASE_URL}/src/images/white.png`} alt="Participant 1" className="participant-image"/>
          </div>
          <div className="tournament-result">{resultText}</div> {/* Display the correct result */}
          <div className="tournament-participant" style={{ borderColor: blackBorderColor }}>
            <h2>Black</h2>
            <p className="participant-name">{participant2}</p>
            <img src={`${BASE_URL}/src/images/black.png`} alt="Participant 2" className="participant-image"/>
          </div>
        </div>
        <button className="close-button" onClick={onClose}><Close /></button>
      </div>
    </div>
  );
}

export default TournamentPopUp;
