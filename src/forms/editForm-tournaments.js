import React from 'react';
import '../styles/AddForms.css';
import { useLocation } from 'react-router-dom';

function TournamentsEditForm() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('itemId');

const handleEdit = async (itemId, title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, locationID, requirements, prizes, tournament_typeID, registration_deadline, cfc_required) => {
    const formData = { title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, locationID, requirements, prizes, tournament_typeID, registration_deadline, cfc_required };
    try {

        const response = await fetch(`/api/tournaments/edit/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result) {
            console.log(result);
        } else {
            console.error('Failed to update tournament');
        }
    } catch (error) {
        console.error('Error updating tournament:', error);
    }
};

  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">Tournaments Page Edit Form</h2>
        <p>This is the page where you, the admin, can edit existing content in the "Tournaments" page.</p>
      </div>

      <div className="form-container">
        <form className="form-element">
          <label>Images</label>
          <input className="file-form" type="file" accept="image/*" required />
        </form>
      </div>

      {/* Second Form */}
      <div className="form-container">
        <form className="form-element">
          <label>Player 1 Name:</label>
          <input className="text-form" type="text" required />
        </form>
      </div>

      {/* Third Form */}
      <div className="form-container">
        <form className="form-element">
          <label>Player 2 Name:</label>
          <input className="text-form-c" type="text" required />
        </form>
      </div>

        {/* Fourth Form */}
        <div className="form-container">
            <form className="form-element">
                <label>Player 1 Time Taken:</label>
                <input className="text-form" type="time" required />
            </form>
        </div>

        {/* Fifth Form */}
        <div className="form-container">
            <form className="form-element">
                <label>Player 2 Time Taken:</label>
                <input className="text-form" type="time" required />
            </form>
        </div>

        {/* Sixth Form */}
        <div className="form-container">
            <h3>Outcome: </h3>
            <form className="form-element">
                <label>Player 1 Score: </label>
                <input className="text-form" type="number" defaultValue={0} required/>

                <label>Player 2 Score: </label>
                <input className="text-form" type="number" defaultValue={0} required/>

            </form>
        </div>

        <div className="submit-button-container">
            <button onClick={() => handleEdit(itemId)} type="submit">Submit</button>
        </div>

    </div>
  )
}

export default TournamentsEditForm;