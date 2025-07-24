import React from 'react'
import './styles/eventPopUp.css'

function eventPopUp({ name, image, date, description, onClose}) {
    return (
        <div className="event-popup-background" onClick={onClose}>
            <div className="event-popup-content" onClick = {e => e.stopPropagation()}>
                <h1>{name}</h1>
                <p>{date}</p>
                <p>{description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default eventPopUp