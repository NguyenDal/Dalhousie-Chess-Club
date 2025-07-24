import React, { useState, useEffect } from 'react';
import '../styles/AddForms.css';
import { BASE_URL } from '../config';

function AddFormAboutUs() {
  const [executiveName, setExecutiveName] = useState('');
  const [memberImage, setMemberImage] = useState('');
  const [memberDescription, setMemberDescription] = useState('');
  const [altText, setAltText] = useState('');
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        speakerImage: memberImage,
        alt_text: altText,
      };

      const imageResponse = await fetch(BASE_URL + '/api/people_images/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!imageResponse.ok) {
        const errorText = await imageResponse.text();
        console.error('Failed to add People image:', errorText);
        setSuccessMessage('');
        return;
      }

      const imageResult = await imageResponse.json();
      const peopleImageID = imageResult.people_imageID;

      const memberData = {
        name: executiveName,
        positionID: selectedPosition,
        bio: memberDescription,
        people_imageID: peopleImageID,
        status: 1,
      };

      await fetch(`${BASE_URL}/api/members/updateStatus/${selectedPosition}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 0 }),
      });

      const memberResponse = await fetch(BASE_URL + '/api/members/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });

      if (!memberResponse.ok) {
        const errorText = await memberResponse.text();
        console.error('Failed to add member:', errorText);
        setSuccessMessage('');
        return;
      }

      const memberResult = await memberResponse.json();

      if (memberResult) {
        console.log(memberResult);
        setSuccessMessage('Member added successfully!');
      } else {
        console.error('Failed to add Member');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="add-form-container">
      <div className="header-info">
        <h2 id="main-header">About Us Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "About Us" page.</p>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="form-combined">
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
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const filepath = "/src/images/" + file.name;
                setMemberImage(filepath);
              }
            }}
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
            required
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
        </div>
      </form>
    </div>
  );
}

export default AddFormAboutUs;
