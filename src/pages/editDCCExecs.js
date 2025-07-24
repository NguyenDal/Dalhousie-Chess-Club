
import React, { useState, useEffect } from 'react';
import EditVolunteerForm from '../forms/editDCCExecsForm.js';
import '../styles/ExecVolunteerForm.css';
import { BASE_URL } from '../config.js';
import EditExecForm from '../forms/editDCCExecsForm.js';

const EditExec = () => {
    const [execs, setExecs] = useState([]);
    const [editingExec, setEditingExec] = useState(null);

    const fetchExecs = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/executiveTeam`);
            const data = await response.json();
            setExecs(data);
        } catch (error) {
            console.error('Error fetching execs:', error);
        }
    };

    useEffect(() => {
        fetchExecs();
    }, []);

    const handleEditClick = (exec) => {
        setEditingExec(exec);
    };

    const handleDelete = async (execID) => {
        if (window.confirm('Are you sure you want to delete this exec?')) {
            try {
                const response = await fetch(`${BASE_URL}/api/executiveTeam/delete/${execID}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Exec deleted successfully');
                    setExecs(execs.filter(exec => exec.execID !== execID));
                    fetchExecs();  // Refresh the list after deleting
                } else {
                    alert('Failed to delete exec');
                    console.error('Failed to delete exec');
                }
            } catch (error) {
                alert('Error deleting exec');
                console.error('Error deleting exec', error);
            }
        }
        // alert(execID);
    };

    const handleViewResume = (base64String) => {
        // Check if there's no resume data
        if (!base64String) {
            alert("No resume uploaded or available to view.");
            return;
        }
        // Remove 'data:application/pdf;base64,' if it's part of the string
        const base64Response = base64String.startsWith('data:application/pdf;base64,') ? base64String.split(',')[1] : base64String;

        // Convert Base64 string to a Blob
        const blob = b64toBlob(base64Response, 'application/pdf');
        const blobUrl = URL.createObjectURL(blob);

        // Open the Blob URL in a new tab
        window.open(blobUrl, '_blank');
    };

    // Helper function to convert Base64 encoded string to a Blob
    function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    return (
        <div className="editPage">
            <div className="header-info">
                <h2>Edit DCC Execs Page</h2>
                <p>This is the page where you, the admin, can edit existing executives.</p>
            </div>

            <div className="editing">
                {editingExec ? (
                    <EditExecForm exec={editingExec} onCancel={() => setEditingExec(null)} onUpdate={fetchExecs} />
                ) : (
                    <table className="volunteers-table">
                        <thead>
                            <tr>
                                <th>B00 Number</th>
                                <th>Additional Info</th>
                                <th>Chess Experience</th>
                                <th>Availability (hours/week)</th>
                                <th>Positions Interested In</th>
                                <th>Comments/Questions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {execs.map(exec => (
                                <tr key={exec.b00Num}>
                                    <td>{exec.b00Num}</td>
                                    <td>{exec.additionalNotes}</td>
                                    <td>{exec.experience}</td>
                                    <td>{exec.hoursPerWeek}</td>
                                    <td>{exec.positionInterest}</td>
                                    <td>{exec.comments}</td>
                                    <td className="buttons-container">
                                        <button onClick={() => handleViewResume(exec.resume)} className="view-resume-button">View Resume</button>
                                        <button onClick={() => handleEditClick(exec)}>Edit</button>
                                        <button onClick={() => handleDelete(exec.execID)}>Delete</button>
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

export default EditExec;
