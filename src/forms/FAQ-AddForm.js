import React, { useState } from 'react';
import '../styles/AddForms.css';
import { BASE_URL } from '../config';

function FAQAddForm() {
 const [FAQQuestion, setFAQQuestion] = useState('');
 const [FAQAnswer, setFAQAnswer] = useState('');
 const [successMessage, setSuccessMessage] = useState('');

 const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const formData = {
      question: FAQQuestion,
      answer: FAQAnswer
    };


    const response = await fetch(BASE_URL + '/api/faq/add', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to add FAQ:', errorText);
      setSuccessMessage(''); 
      return;
    }


    const result = await response.json();
    if (result) {
      console.log(result);
      setSuccessMessage('FAQ added successfully!');
    } else {
      console.error('Failed to add member');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">FAQ Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "FAQ" page.</p>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="form-combined">
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
        </div>
      </form>

    </div>
  )
}

export default FAQAddForm;