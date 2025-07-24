import React from 'react';
import './styles/libraryPopUp.css';

function LibraryPopUp({ name, image, author, description, onClose }) {
  return (
    <div className="library-popup-background" onClick={onClose}>
      <div className="library-popup-content" onClick={e => e.stopPropagation()}>
        <img className="library-image" src={image} alt="No image" />
        <h3>{name}</h3>
        <p>{author}</p>
        <p>{description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default LibraryPopUp;