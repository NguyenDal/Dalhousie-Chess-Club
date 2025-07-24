import React, { useState, useEffect } from 'react';
import '../styles/editPage.css';
import AboutUsEditForm from '../forms/editForm-about'; 
import { BASE_URL } from '../config';

function EditAbout() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(BASE_URL + '/api/members'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); 
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/members/delete/${itemId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log('Delete result:', result); // Debugging log
      if (result.success) {
        setItems((currentItems) => currentItems.filter(item => item.memberID !== itemId));
      } else {
        console.error('Failed to delete member');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleUpdate = () => {
    setEditingItem(null);
    
    const fetchItems = async () => {
      try {
        const response = await fetch(BASE_URL + '/api/members'); 
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchItems();
  };

  return (
    <div className='editPage-container'>
      <h1>Edit Members</h1>
      <div className='editing-container'>
        {editingItem ? (
          <AboutUsEditForm memberItem={editingItem} onCancel={() => setEditingItem(null)} onUpdate={handleUpdate} />
        ) : (
          <table className='library-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>status Active=1 Inactive=0</th>
                <th>Image</th>
                <th>Bio</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.memberID}>
                  <td>{item.memberID}</td>
                  <td>{item.name}</td>
                  <td>{item.positionID}</td>
                  <td>{item.status}</td>
                  <td>{item.people_imageID}</td>
                  <td>{item.bio}</td>
                  <td className='buttons-container'>
                    <button onClick={() => handleEditClick(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.memberID)}>Delete</button>
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

export default EditAbout;
