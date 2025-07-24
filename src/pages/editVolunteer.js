import React, { useState, useEffect } from 'react';
import EditVolunteerForm from '../forms/editVolunteerForm.js'; 
import '../styles/ExecVolunteerForm.css';
import { BASE_URL } from '../config.js';

const EditVolunteer = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [editingVolunteer, setEditingVolunteer] = useState(null);

    const fetchVolunteers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/volunteers`);
            const data = await response.json();
            setVolunteers(data.map(vol => ({
                ...vol,
                isDalStudent: vol.isDalStudent ? 'Yes' : 'No',
                timeCommitment: vol.timeCommitment ? 'Yes' : 'No',
            })));
        } catch (error) {
            console.error('Error fetching volunteers:', error);
        }
    };

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const handleEditClick = (volunteer) => {
        setEditingVolunteer(volunteer);
    };

    const handleDelete = async (volunteerID) => {
        if (window.confirm('Are you sure you want to delete this volunteer?')) {
            try {
                const response = await fetch(`${BASE_URL}/api/volunteers/delete/${volunteerID}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Volunteer deleted successfully');
                    setVolunteers(volunteers.filter(volunteer => volunteer.volunteerID !== volunteerID));
                } else {
                    alert('Failed to delete volunteer');
                    console.error('Failed to delete volunteer');
                }
            } catch (error) {
                alert('Error deleting volunteer');
                console.error('Error deleting volunteer', error);
            }
        }
    };

    return (
        <div className="editPage">
            <div className="header-info">
                <h2>Edit Volunteers Page</h2>
                <p>This is the page where you, the admin, can edit existing volunteers.</p>
            </div>

            <div className="editing">
                {editingVolunteer ? (
                    <EditVolunteerForm volunteer={editingVolunteer} onCancel={() => setEditingVolunteer(null)} onUpdate={fetchVolunteers} />
                ) : (
                    <table className="volunteers-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Student Status</th>
                                <th>Time Commitment</th>
                                <th>Program</th>
                                <th>Year Experience</th>
                                <th>Motivation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volunteers.map(volunteer => (
                                <tr key={volunteer.volunteerID}>
                                    <td>{volunteer.volunteerName}</td>
                                    <td>{volunteer.email}</td>
                                    <td>{volunteer.isDalStudent}</td>
                                    <td>{volunteer.timeCommitment}</td>
                                    <td>{volunteer.program}</td>
                                    <td>{volunteer.yearExp}</td>
                                    <td>{volunteer.motivation}</td>
                                    <td className="buttons-container">
                                        <button onClick={() => handleEditClick(volunteer)}>Edit</button>
                                        <button onClick={() => handleDelete(volunteer.volunteerID)}>Delete</button>
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

export default EditVolunteer;
