import React from 'react';
import '../styles/subscriberDeletionForm.css';

function DeleteForm() {

  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">Deletion Form</h2>
        <p>This is the page where you, the admin, can specify components or elements to delete from a page.</p>
      </div>

      <div className="form-A">
        <form className="form-element">
          <label>To be deleted:</label>
          <input className="text-form" type="text" required />
        </form>
      </div>

      <div className="submit-button-container">
        <button type="submit">Delete</button>
      </div>

    </div>
  )
}

export default DeleteForm;