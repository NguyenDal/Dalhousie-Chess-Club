import React, { useState, useEffect } from 'react';
import '../styles/AddForms.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

function AboutUsEditForm({ memberItem, onCancel, onUpdate }) {
  const navigate = useNavigate();
  const [executiveName, setExecutiveName] = useState(memberItem.name);
  const [memberImage, setMemberImage] = useState(memberItem.people_imageID);
  const [memberDescription, setMemberDescription] = useState(memberItem.bio);
  const [altText, setAltText] = useState('');
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(memberItem.positionID);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch(BASE_URL + '/api/positions');
        const data = await response.json();
        setPositions(data);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    fetchPositions();
  }, []);

  const handleEdit = async (event) => {
    event.preventDefault();
    const formData = {
      name: executiveName,
      positionID: selectedPosition,
      bio: memberDescription,
      people_imageID: memberImage,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/members/update/${memberItem.memberID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to update member:', errorText);
        setSuccessMessage('');
        return;
      }

      const result = await response.json();
      if (result) {
        setSuccessMessage('Member updated successfully!');
        onUpdate();
        navigate('/editAbout');
      } else {
        console.error('Failed to update member');
      }
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  return (
    <div className="add-form-container">
      <div className="header-info">
        <h2 id="main-header">About Us Page Edit Form</h2>
        <p>This is the page where you, the admin, can edit existing content in the "About Us" page.</p>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleEdit} className="form-combined">
        <div className="form-element">
          <label>Executive's Name</label>
          <input
            className="text-form"
            type="text"
            value={executiveName}
            onChange={(e) => setExecutiveName(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>Member Image</label>
          <input
            className="text-form"
            type="file"
            accept="image/*"
            onChange={(e) => setMemberImage(e.target.value)}
            required
          />
          </div>

        <div className="form-element">
          <label>Alternative Text For Image</label>
          <input
            className="text-form"
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </div>
        <div className="form-element">
          <label>Member Description</label>
          <textarea
            className="text-form"
            value={memberDescription}
            onChange={(e) => setMemberDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>Position</label>
          <select
            className="text-form"
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            required
          >
            <option value="">Select a position</option>
            {positions.map((position) => (
              <option key={position.positionID} value={position.positionID}>
                {position.description}
              </option>
            ))}
          </select>
        </div>
        <div className="submit-button-container">
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AboutUsEditForm;
