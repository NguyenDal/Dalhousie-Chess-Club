import React from 'react';
import '../styles/Constitutions.css'; // Create a CSS file for styling if needed


function Constitutions() {
    return (
        <div className="constitution-page">
            <h1>Constitution</h1>
            <p>Welcome to the Constitution page. Below, you’ll find a link to the full document for our organization's constitution and bylaws. Please review it to understand our principles, mission, and guiding rules.</p>
            
            <div className="pdf-placeholder">
            <p>The Constitution document is not yet available. Please check back later.</p>
            </div>
        </div>
    );
}

export default Constitutions;