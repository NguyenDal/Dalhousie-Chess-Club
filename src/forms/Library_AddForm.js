import React, { useState } from 'react';
import '../styles/AddForms.css';
import { BASE_URL } from '../config';

function LibraryAddForm() {
  const [libraryImage, setLibraryImage] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [available, setAvailable] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        title,
        author,
        image: libraryImage,
        available,
        description,
      };
      const response = await fetch(BASE_URL + '/api/library/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to add book:', errorText);
        setSuccessMessage(''); 
        return;
      }
      const result = await response.json();
      if (result) {
        console.log(result);
        setSuccessMessage('Book added successfully!'); 
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage(''); 
    }
  };
  return (
    <div className="add-form-container">
      <div className="header-info">
        <h2 id="main-header">Library Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "Library" page.</p>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="form-combined">
        <div className="form-element">
          <label>Title</label>
          <input
            className="text-form"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>Author</label>
          <input
            className="text-form"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>Image</label>
          <input
            className="text-form"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0].name;
              const filepath = "./images/" + file;
              if (filepath) {
                setLibraryImage(filepath);
              }
            }}
            required
          />
        </div>
        <div className="form-element">
          <label>Available</label>
          <input
            className="text-form"
            type="number"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            required
            min="0"
          />
        </div>
        <div className="form-element">
          <label>Description</label>
          <textarea
            className="text-form"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default LibraryAddForm;