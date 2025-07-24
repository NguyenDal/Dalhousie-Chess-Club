import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddForms.css';

function ParticipantApproval() {
    const [participants, setParticipants] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Fetch participants on component mount
        axios.get('http://localhost:5001/api/user')
            .then(response => {
                setParticipants(response.data);
                console.log('Fetched participants:', response.data);
            })
            .catch(error => console.error('Error fetching participants:', error));
    }, []);

    const handleApproval = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:5001/api/user/approved/${id}`, { approved: status });
            if (response.status === 200) {
                setParticipants(prevParticipants =>
                    prevParticipants.map(participant =>
                        participant.id === id ? { ...participant, approved: status } : participant
                    )
                );
                setSuccessMessage('Approval status updated successfully!');
                setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
            } else {
                console.error('Failed to update approval status');
            }
        } catch (error) {
            console.error('Error updating participant approval:', error);
        }
    };

    return (
        <div className="add-form-container">
            <div className="header-info">
                <h2 id="main-header">Participant Approval</h2>
            </div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <table className="participant-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Approval Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map(participant => (
                        <tr key={participant.id}>
                            <td>{participant.id}</td>
                            <td>{participant.fullname}</td>
                            <td>{participant.email}</td>
                            <td>{participant.approved === 1 ? "Approved" : "Rejected"}</td>
                            <td>
                                <button onClick={() => handleApproval(participant.id, 1)}>Approve</button>
                                <button onClick={() => handleApproval(participant.id, 0)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ParticipantApproval;