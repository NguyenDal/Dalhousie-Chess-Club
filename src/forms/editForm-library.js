import React, { useState } from 'react';
import '../styles/AddForms.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

function LibraryEditForm({ libraryItem, onCancel, onUpdate }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(libraryItem.title);
  const [author, setAuthor] = useState(libraryItem.author);
  const [image, setImage] = useState(libraryItem.image);
  const [available, setAvailable] = useState(libraryItem.available);
  const [description, setDescription] = useState(libraryItem.description);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEdit = async (event) => {
    event.preventDefault();
    const formData = { title, author, image, available, description };
    try {
      const response = await fetch(`${BASE_URL}/api/library/update/${libraryItem.booksID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to update library item:', errorText);
        setSuccessMessage('');
        return;
      }

      const result = await response.json();
      if (result) {
        console.log(result);
        setSuccessMessage('Library item updated successfully!');
        onUpdate(); 
        navigate('/editLibrary'); 
      } else {
        console.error('Failed to update library item');
      }
    } catch (error) {
      console.error('Error updating library item:', error);
    }
  };

  return (
    <div className="add-form-container">
      <div className="header-info">
        <h2 id="main-header">Library Page Edit Form</h2>
        <p>This is the page where you, the admin, can edit existing content in the "Library/Books" page.</p>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleEdit} className="form-combined">
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
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>Available</label>
          <input
            className="text-form"
            type="text"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>Description</label>
          <input
            className="text-form"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default LibraryEditForm;
