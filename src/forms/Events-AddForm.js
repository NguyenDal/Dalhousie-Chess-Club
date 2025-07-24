import React, { useState } from 'react';
import { BASE_URL } from '../config';
import '../styles/AddForms.css';

function EventsAddForm() {
    const [title, setTitle] = useState('');
    const [eventImage, setEventImage] = useState();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [locationID, setLocationID] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [speakerID, setSpeakerID] = useState('');
    const [numOfAttendees, setNumOfAttendees] = useState('');
    const [registrationDeadline, setRegistrationDeadline] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('eventImage', eventImage);
            formData.append('start_date', startDate);
            formData.append('end_date', endDate);
            formData.append('description', description);
            formData.append('cost', cost);
            formData.append('locationID', locationID);
            formData.append('categoryID', categoryID);
            formData.append('speakerID', speakerID);
            formData.append('num_of_attendees', numOfAttendees);
            formData.append('registration_deadline', registrationDeadline);

            const response = await fetch(`${BASE_URL}/api/events/add`, {
                method: 'POST',
                body: formData,
            });


            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Event added successfully!');
                console.log(result);
            } else {
                console.error('Failed to add event:', result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="add-form-container">
            <div className="header-info">
                <h2 id="main-header">Events Page Add Form</h2>
                <p>This is the page where you, the admin, can manipulate content in the "Events" page.</p>
            </div>

            <form onSubmit={handleSubmit} className="form-A">
                <div className="form-element">
                    <label>Event Title</label>
                    <input
                        className="text-form"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element">
                    <label>Event Image</label>
                    <input
                        className="file-form"
                        type="file"
                        accept="image/*"
                        name="eventImage"
                        onChange={(e) => setEventImage(e.target.files[0])}
                        required
                    />
                </div>
                <div className="form-element">
                    <label>Start Date</label>
                    <input
                        className="text-form"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element">
                    <label>End Date</label>
                    <input
                        className="text-form"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
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
                <div className="form-element">
                    <label>Cost</label>
                    <input
                        className="text-form"
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element">
                    <label>Location ID</label>
                    <input
                        className="text-form"
                        type="text"
                        value={locationID}
                        onChange={(e) => setLocationID(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element">
                    <label>Category ID</label>
                    <input
                        className="text-form"
                        type="text"
                        value={categoryID}
                        onChange={(e) => setCategoryID(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element">
                    <label>Speaker ID</label>
                    <input
                        className="text-form"
                        type="text"
                        value={speakerID}
                        onChange={(e) => setSpeakerID(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element">
                    <label>Number of Attendees</label>
                    <input
                        className="text-form"
                        type="number"
                        value={numOfAttendees}
                        onChange={(e) => setNumOfAttendees(e.target.value)}
                        required
                    />
                </div>
                <div className="form-element">
                    <label>Registration Deadline</label>
                    <input
                        className="text-form"
                        type="date"
                        value={registrationDeadline}
                        onChange={(e) => setRegistrationDeadline(e.target.value)}
                        required
                    />
                </div>
                <div className="submit-button-container">
                    <button type="submit">Submit</button>
                </div>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
}

export default EventsAddForm;

