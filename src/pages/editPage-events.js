import React, { useState, useEffect } from 'react';
import '../styles/editEvents.css';
import { BASE_URL } from '../config.js';

function EditEventForm({ event, onCancel, onUpdate }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        cost: 0,
        registration_deadline: '',
    });

    useEffect(() => {
        if (event) {
            setFormData(event); // Initialize form with event data when selected
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/api/events/edit/${event.eventsID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Event updated successfully');
                onUpdate();
            } else {
                alert('Error updating event');
                console.error('Error updating event');
            }
        } catch (error) {
            alert('Error updating event');
            console.error('Error updating event', error);
        }
    };

    return (
        <div className="edit-form-container">
            <form className="edit-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} />

                <label htmlFor="start_date">Start Date:</label>
                <input type="datetime-local" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange} />

                <label htmlFor="end_date">End Date:</label>
                <input type="datetime-local" id="end_date" name="end_date" value={formData.end_date} onChange={handleChange} />

                <label htmlFor="cost">Cost:</label>
                <input type="number" id="cost" name="cost" value={formData.cost} onChange={handleChange} />

                <label htmlFor="registration_deadline">Registration Deadline:</label>
                <input type="datetime-local" id="registration_deadline" name="registration_deadline" value={formData.registration_deadline} onChange={handleChange} />

                <div className="button-container">
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

const EditEvent = () => {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/events`);
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEditClick = (event) => {
        setEditingEvent(event);
    };

    const handleDelete = async (eventID) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const response = await fetch(`${BASE_URL}/api/events/delete/${eventID}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Event deleted successfully');
                    setEvents(events.filter(event => event.eventsID !== eventID));
                    fetchEvents();  // Refresh the list after deleting
                } else {
                    alert('Failed to delete event');
                    console.error('Failed to delete event');
                }
            } catch (error) {
                alert('Error deleting event');
                console.error('Error deleting event', error);
            }
        }
    };

    return (
        <div className="editPage-container">
            <h1>Edit Events</h1>
            <div className="editing-container">
                {editingEvent ? (
                    <EditEventForm event={editingEvent} onCancel={() => setEditingEvent(null)} onUpdate={fetchEvents} />
                ) : (
                    <table className="events-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                {/* Additional headers as needed */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map(event => (
                                <tr key={event.eventsID}>
                                    <td>{event.eventsID}</td>
                                    <td>{event.title}</td>
                                    <td>{event.description}</td>
                                    {/* Additional columns as needed */}
                                    <td className="buttons-container">
                                        <button onClick={() => handleEditClick(event)}>Edit</button>
                                        <button onClick={() => handleDelete(event.eventsID)}>Delete</button>
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

export default EditEvent;
