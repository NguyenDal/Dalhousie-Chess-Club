import React from 'react';
import '../styles/subscriberDeletionForm.css';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

function SubscribersDeleteForm() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const id  = params.get('id');
  const email  = params.get('email');
  
  
  function onDelete () {
    let iEmail = document.getElementById("email").value;
    
    if (email === iEmail && id) {
      
      fetch(`${BASE_URL}/api/subscribers/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      }).then((res)=>{alert("Deleted subscriber successfully!");
      navigate(`/subscribers`);
      })
      
    }
    else {
      alert("Email doesn't match");
    }
  }
  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">Subscriber Deletion Page</h2>
        <p>This is the page where you, the admin, can delete individual subscribers from the database.</p>
      </div>

      <div className="form-A">
        <form className="form-element">
          <label>Subscriber To Be Deleted Email</label>
          <input className="text-form" type="text" id = "email" required />
        </form>
      </div>

      <div className="submit-button-container">
        <button type="submit" onClick={onDelete}>Delete</button>
      </div>

    </div>
  )
}

export default SubscribersDeleteForm;

