import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/editTips.css'; 
import { BASE_URL } from '../config.js';

function TipsEditForm({ tip, onCancel, onUpdate }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_link: '',
    type: 'Opening'
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (tip) {
      setFormData({
        title: tip.title,
        description: tip.description,
        image_link: tip.image_link,
        type: tip.type
      });
    }
  }, [tip]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedFilePath = formData.image_link;
      
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const uploadResponse = await fetch(`${BASE_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          uploadedFilePath = `/src/images/tips/${uploadData.filename}`;
        } else {
          alert('Error uploading image');
          return;
        }
      }

      const response = await fetch(`${BASE_URL}/api/tips/edit/${tip.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, image_link: uploadedFilePath }),
      });

      if (response.ok) {
        alert('Tip updated successfully');
        onUpdate();
      } else {
        alert('Error updating tip');
        console.error('Error updating tip');
      }
    } catch (error) {
      alert('Error updating tip');
      console.error('Error updating tip', error);
    }
  };

  return (
    <div className="edit-form-container">
      <form className="edit-form" onSubmit={handleSubmit}>
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
        
        <label htmlFor="file">Upload New Image:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
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
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

const EditTips = () => {
  const [tips, setTips] = useState([]);
  const [editingTip, setEditingTip] = useState(null);

  const fetchTips = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tips`);
      const data = await response.json();
      setTips(data);
    } catch (error) {
      console.error('Error fetching tips:', error);
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const handleDelete = async (tipId) => {
    const confirmed = window.confirm('Are you sure you want to delete this tip?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${BASE_URL}/api/tips/delete/${tipId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Tip deleted successfully');
        setTips((prevTips) => prevTips.filter(tip => tip.id !== tipId));
      } else {
        alert('Failed to delete tip');
        console.error('Failed to delete tip');
      }
    } catch (error) {
      alert('Error deleting tip');
      console.error('Error deleting tip', error);
    }
  };

  const handleEditClick = (tip) => {
    setEditingTip(tip);
  };

  const handleUpdate = () => {
    setEditingTip(null);
    fetchTips();
  };

  return (
    <div className="editPage-container">
      <h1>Edit Tips</h1> {/* Add heading */}
      <div className="editing-container">
        {editingTip ? (
          <TipsEditForm tip={editingTip} onCancel={() => setEditingTip(null)} onUpdate={handleUpdate} />
        ) : (
          <table className="faq-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Image Link</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tips.map(tip => (
                <tr key={tip.id}>
                  <td>{tip.id}</td>
                  <td>{tip.title}</td>
                  <td>{tip.description}</td>
                  <td>{tip.image_link}</td>
                  <td>{tip.type}</td>
                  <td className="buttons-container">
                    <button onClick={() => handleEditClick(tip)}>Edit</button>
                    <button onClick={() => handleDelete(tip.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EditTips;




