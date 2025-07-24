import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/addTips.css'; 
import { BASE_URL } from '../config.js';

function AddTips() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_link: '',
    type: 'Opening',
  });
  const [imageFile, setImageFile] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      try {
        const response = await fetch(`${BASE_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          imageUrl = `/src/images/tips/${data.filename}`;
        } else {
          alert('Error uploading image');
          console.error('Error uploading image');
        }
      } catch (error) {
        alert('Error uploading image');
        console.error('Error uploading image', error);
      }
    }

    const tipData = {
      ...formData,
      image_link: imageUrl,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/tips/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipData),
      });
      if (response.ok) {
        alert('Tip added successfully');
        navigate('/tips-editForm'); 
      } else {
        alert('Error adding tip');
        console.error('Error adding tip');
      }
    } catch (error) {
      alert('Error adding tip');
      console.error('Error adding tip', error);
    }
  };

  return (
    <div className="edit-form-container">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h1>Add Tips</h1> {/* Add heading */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="image_link">Image Link:</label>
        <input
          type="file"
          id="image_link"
          name="image_link"
          onChange={handleImageChange}
        />
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="Opening">Opening</option>
          <option value="Middle Game">Middle Game</option>
          <option value="Endgame">Endgame</option>
        </select>
        <div className="button-container">
          <button type="button" onClick={() => navigate('/tips-editForm')}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddTips;


