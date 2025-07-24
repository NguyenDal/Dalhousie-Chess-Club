import React, { useState, useEffect } from 'react';
import '../styles/editPage.css';
import LibraryEditForm from '../forms/editForm-library'; 
import { BASE_URL } from '../config';

function EditLibrary() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(BASE_URL + '/api/library'); 
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
      const response = await fetch(`${BASE_URL}/api/library/delete/${itemId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log('Delete result:', result); // Debugging log
      if (result.success) {
        setItems((currentItems) => currentItems.filter(item => item.booksID !== itemId));
      } else {
        console.error('Failed to delete library book');
      }
    } catch (error) {
      console.error('Error deleting library book:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleUpdate = () => {
    setEditingItem(null);
    
    const fetchItems = async () => {
      try {
        const response = await fetch(BASE_URL + '/api/library'); 
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
      <h1>Edit Library</h1>
      <div className='editing-container'>
        {editingItem ? (
          <LibraryEditForm libraryItem={editingItem} onCancel={() => setEditingItem(null)} onUpdate={handleUpdate} />
        ) : (
          <table className='library-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Image</th>
                <th>Available</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.booksID}>
                  <td>{item.booksID}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.image}</td>
                  <td>{item.available}</td>
                  <td>{item.description}</td>
                  <td className='buttons-container'>
                    <button onClick={() => handleEditClick(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.booksID)}>Delete</button>
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

export default EditLibrary;
