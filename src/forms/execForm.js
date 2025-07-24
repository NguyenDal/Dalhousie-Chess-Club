import React, { useState, useRef } from 'react';
import '../styles/ExecVolunteerForm.css';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

function ExecVolunteerAddForm() {
  const [b00Number, setB00Number] = useState('');
  const [resume, setResume] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [experience, setExperience] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [positionInterest, setPositionInterest] = useState([]);
  const [comments, setComments] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Ensure this line is correctly included

  const resumeInputRef = useRef(null);

  const navigate = useNavigate();

  const resetEverything = () => {
    setB00Number('');
    setResume(null);
    setAdditionalNotes('');
    setExperience('');
    setHoursPerWeek('');
    setPositionInterest([]);
    setComments('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if the resume is not uploaded
    if (!resume) {
      alert('Please upload a resume in PDF format.');
      return; // Stop the form submission if no resume
    }
  
    try {
      const formData = new FormData();
      formData.append('b00Num', b00Number);
      formData.append('resume', resume); // It is now guaranteed that resume is not null
      formData.append('additionalNotes', additionalNotes);
      formData.append('experience', experience);
      formData.append('hoursPerWeek', hoursPerWeek);
      formData.append('positionInterest', positionInterest.join(', '));
      formData.append('comments', comments);

      const response = await fetch(`${BASE_URL}/api/executiveTeam/add`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to submit registration:', errorText);
        setSuccessMessage('Failed to submit registration. Please try again!'); // Set failure message
        alert('Failed to submit registration. Please try again!'); // Display an error alert
        return;
      }

      resetEverything();
      resumeInputRef.current.value = "";
      setSuccessMessage('Registration submitted successfully!'); // Set success message
      alert('Registration submitted successfully!'); // Display a success alert
      // navigate('/chess-for-wellness'); // Navigate on success
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage('An error occurred. Please try again!'); // Set error message
      alert('An error occurred. Please try again!'); // Display an error alert
    }
  };

  const handlePositionChange = (event) => {
    const { value, checked } = event.target;
    setPositionInterest(prev => 
      checked ? [...prev, value] : prev.filter(pos => pos !== value)
    );
  };

  return (
    <div className="add-form-container">
      <div className="header-info">
        <h2 id="main-header">Executive Volunteer Registration Form</h2>
        <p>Please fill out this form to apply for an executive position at the Dalhousie Chess Club.</p>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="form-combined">
        <div className="form-element">
          <label>B00 Number</label>
          <input
            className="text-form"
            type="text"
            value={b00Number}
            onChange={(e) => setB00Number(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>Upload Resume (PDF)</label>
          <input
            className="text-form"
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              setResume(e.target.files[0])
            }}
            ref={resumeInputRef}
          />
        </div>
        <div className="form-element">
        <label>Is there anything else we should know about you that was not described in your resume? (other than chess)</label>
          <textarea
            className="text-form"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
        <label>Chess history/experience? (playing, watching, studying, etc.). Please elaborate</label>
          <textarea
            className="text-form"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
        <label>Hours per week you can commit to your role as a Dalhousie Chess Club Executive member?</label>
          <input
            className="text-form"
            type="number"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>Positions Interested In</label>
          <div className="checkbox-group">
            {[
              'Tournament Director',
              'Seminar Director',
              'Weekly Socials Meet Director',
              'Treasurer',
              'Secretary',
              'Web Developer',
              'Social Media Director',
              'Marketing Events Coordinator',
              'Discord Moderator',
              'Graphic Designer',
              'Sponsorship Coordinator',
              'Community Relations',
            ].map((position) => (
              <div key={position}>
                <input
                  type="checkbox"
                  value={position}
                  checked={positionInterest.includes(position)}
                  onChange={handlePositionChange}
                />
                <label>{position}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-element">
        <label>Additional Comments/Questions</label>
          <textarea
            className="text-form"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ExecVolunteerAddForm;

