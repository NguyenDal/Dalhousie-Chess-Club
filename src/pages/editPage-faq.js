import React, { useState, useEffect } from 'react';
import '../styles/editPage.css';
import FaqEditForm from '../forms/editForm-faq'; 
import { BASE_URL } from '../config';

function EditFAQ() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(BASE_URL + '/api/faq'); 
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
      const response = await fetch(`${BASE_URL}/api/faq/delete/${itemId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log('Delete result:', result); 
      if (result.success) {
        setItems((currentItems) => currentItems.filter(item => item.faqID !== itemId));
      } else {
        console.error('Failed to delete faq item');
      }
    } catch (error) {
      console.error('Error deleting faq item:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleUpdate = () => {
    setEditingItem(null);
    
    const fetchItems = async () => {
      try {
        const response = await fetch(BASE_URL + '/api/faq'); 
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
      <h1>Edit FAQ</h1>
      <div className='editing-container'>
        {editingItem ? (
          <FaqEditForm faq={editingItem} onCancel={() => setEditingItem(null)} onUpdate={handleUpdate} />
        ) : (
          <table className='faq-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.faqID}>
                  <td>{item.faqID}</td>
                  <td>{item.question}</td>
                  <td>{item.answer}</td>
                  <td className='buttons-container'>
                    <button onClick={() => handleEditClick(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.faqID)}>Delete</button>
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

export default EditFAQ;
