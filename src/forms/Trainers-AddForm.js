import React, { useState } from 'react';
import '../styles/AddForms.css';
import { BASE_URL } from '../config';

function TrainersAddForm() {
  const [speakerName, setSpeakerName] = useState('');
  const [speakerImage, setSpeakerImage] = useState('');
  const [speakerBio, setSpeakerBio] = useState('');
  const [altText, setAltText] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        speakerImage: speakerImage, 
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

      const speakerData = {
        name: speakerName,
        specialty: specialty,
        bio: speakerBio,
        people_imageID: peopleImageID,
      };

      const speakerResponse = await fetch(BASE_URL + '/api/speaker/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(speakerData),
      });

      if (!speakerResponse.ok) {
        const errorText = await speakerResponse.text();
        console.error('Failed to add news:', errorText);
        setSuccessMessage('');
        return;
      }

      const speakerResult = await speakerResponse.json();

      if (speakerResult) {
        console.log(speakerResult);
        setSuccessMessage('Speaker added successfully!');
      } else {
        console.error('Failed to add Speaker');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">Speaker Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "Speakers" page.</p>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="form-combined">
        <div className="form-element">
          <label>Speaker's Name</label>
          <input
            className="text-form"
            type="text"
            value={speakerName}
            onChange={(e) => setSpeakerName(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>Speaker's Specialty</label>
          <input
            className="text-form"
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>Speaker's Image</label>
          <input
            className="text-form"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0].name;
              const filepath = "/src/images/" + file;
              if (filepath) {
                setSpeakerImage(filepath);
              }}
            }
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
          <label>Speaker's Biography</label>
          <textarea
            className="text-form"
            value={speakerBio}
            onChange={(e) => setSpeakerBio(e.target.value)}
            required
          />
        </div>
        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>

    </div>
  )
}

export default TrainersAddForm;