import React from 'react'
import './styles/trainerPopUp.css'

function trainerPopUp({ name, image, description, onClose}) {
    return (
        <div className="trainer-popup-background" onClick={onClose}>
            <div className="trainer-popup-content" onClick = {e => e.stopPropagation()}>
                {}
                <h1>{name}</h1>
                <p>{description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default trainerPopUp