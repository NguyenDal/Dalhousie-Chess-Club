import React, { useState, useEffect } from 'react';
import '../styles/AddForms.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

function FaqEditForm({ faq, onCancel, onUpdate }) {
  const navigate = useNavigate();
  const [FAQQuestion, setFAQQuestion] = useState(faq.question);
  const [FAQAnswer, setFAQAnswer] = useState(faq.answer);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEdit = async (event) => {
    event.preventDefault();
    const formData = { question: FAQQuestion, answer: FAQAnswer };
    try {
      const response = await fetch(`${BASE_URL}/api/faq/update/${faq.faqID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to update FAQ:', errorText);
        setSuccessMessage('');
        return;
      }

      const result = await response.json();
      if (result) {
        console.log(result);
        setSuccessMessage('FAQ updated successfully!');
        onUpdate(); 
        navigate('/editFaq'); 
      } else {
        console.error('Failed to update FAQ');
      }
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  return (
    <div className="add-form-container">
      <div className="header-info">
        <h2 id="main-header">FAQ Page Edit Form</h2>
        <p>This is the page where you, the admin, can edit existing content in the "FAQ" page.</p>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleEdit} className="form-combined">
        <div className="form-element">
          <label>Question</label>
          <input
            className="text-form"
            type="text"
            value={FAQQuestion}
            onChange={(e) => setFAQQuestion(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>Answer</label>
          <input
            className="text-form"
            type="text"
            value={FAQAnswer}
            onChange={(e) => setFAQAnswer(e.target.value)}
            required
          />
        </div>
        <div className="submit-button-container">
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default FaqEditForm;
