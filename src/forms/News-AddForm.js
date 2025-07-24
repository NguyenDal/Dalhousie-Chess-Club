import React, { useState } from 'react';
import '../styles/AddForms.css';
import { BASE_URL } from '../config';

function NewsAddForm() {
  const [newsTitle, setNewsTitle] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [altText, setAltText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // First, add the event image to the event_images table
      const imageData = {
        image: newsImage,
        alt_text: altText,
      };

      const imageResponse = await fetch(BASE_URL + '/api/event_images/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData),
      });

      if (!imageResponse.ok) {
        const errorText = await imageResponse.text();
        console.error('Failed to add event image:', errorText);
        setSuccessMessage('');
        return;
      }

      const imageResult = await imageResponse.json();
      const eventImageID = imageResult.event_imageID;

      // Now, create the news record with the event_imageID
      const newsData = {
        title: newsTitle,
        text: newsContent,
        event_imageID: eventImageID,
      };

      const newsResponse = await fetch(BASE_URL + '/api/news/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      });

      if (!newsResponse.ok) {
        const errorText = await newsResponse.text();
        console.error('Failed to add news:', errorText);
        setSuccessMessage('');
        return;
      }

      const newsResult = await newsResponse.json();
      if (newsResult) {
        console.log(newsResult);
        setSuccessMessage('News added successfully!');
      } else {
        console.error('Failed to add news');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage('');
    }
  };

  return (
    <div className="add-form-container">
      <div className="header-info">
        <h2 id="main-header">News Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "News" page.</p>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="form-combined">
        <div className="form-element">
          <label>News Title</label>
          <input
            className="text-form"
            type="text"
            value={newsTitle}
            onChange={(e) => setNewsTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>News Image Path</label>
          <input
            className="text-form"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0].name;
              const filepath = "/src/images/" + file;
              if (filepath) {
                setNewsImage(filepath);
              }}
            }
            required
          />
        </div>
        <div className="form-element">
          <label>Alt Text</label>
          <input
            className="text-form"
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>News Content</label>
          <textarea
            className="text-form"
            value={newsContent}
            onChange={(e) => setNewsContent(e.target.value)}
            required
          />
        </div>
        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default NewsAddForm;
