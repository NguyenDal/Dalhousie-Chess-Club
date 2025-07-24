import React, { useState, useEffect } from 'react';
import '../styles/editVolunteers.css';
import { BASE_URL } from '../config.js';


function EditVolunteerForm({ volunteer, onCancel, onUpdate }) {

    const [formData, setFormData] = useState({
        volunteerName: '',
        email: '',
        isDalStudent: false,
        timeCommitment: false,
        program: [],
        yearExp: '',
        motivation: '',
    });

    useEffect(() => {
        if (volunteer) {
            setFormData({
                volunteerName: volunteer.volunteerName,
                email: volunteer.email,
                isDalStudent: volunteer.isDalStudent ? 'Yes' : 'No',
                timeCommitment: volunteer.timeCommitment ? 'Able to contribute 2 hours per week' : 'Not able to contribute 2 hours per week',
                program: volunteer.program.split(', '), // Assuming program data is stored as a comma-separated string
                yearExp: volunteer.yearExp,
                motivation: volunteer.motivation,
            });
        }
    }, [volunteer]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                program: checked
                    ? [...prevData.program, value]
                    : prevData.program.filter(prog => prog !== value),
            }));
        } else if (type === 'select-one' && (name === 'isDalStudent' || name === 'timeCommitment')) {
            // For selects handling boolean data with 'Yes' and 'No' options
            setFormData(prevData => ({
                ...prevData,
                [name]: value === 'Yes'
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = {
            ...formData,
            isDalStudent: formData.isDalStudent === 'Yes',
            timeCommitment: formData.timeCommitment === 'Able to contribute 2 hours per week',
            program: formData.program.join(', '),
        };

        // API call with submitData
        try {
            const response = await fetch(`${BASE_URL}/api/volunteers/edit/${volunteer.volunteerID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            });
            if (response.ok) {
                alert('Volunteer updated successfully');
                onUpdate();
                onCancel();
            } else {
                throw new Error('Failed to update volunteer');
            }
        } catch (error) {
            alert('Error updating volunteer');
            console.error('Error updating volunteer:', error);
        }
    };


    return (
        <div className="edit-form-container">
            <form className="edit-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="volunteerName" value={formData.volunteerName} onChange={handleChange} />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

                <label htmlFor="isDalStudent">Student Status:</label>
                <select name="isDalStudent" value={formData.isDalStudent ? 'Yes' : 'No'} onChange={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>

                <label htmlFor="timeCommitment">Time Commitment:</label>
                <select name="timeCommitment" value={formData.timeCommitment ? 'Able to contribute 2 hours per week' : 'Not able to contribute 2 hours per week'} onChange={handleChange}>
                    <option value="Able to contribute 2 hours per week">Able to contribute 2 hours per week</option>
                    <option value="Not able to contribute 2 hours per week">Not able to contribute 2 hours per week</option>
                </select>

                <label>Program:</label>
                <div className="checkbox-group">
                    {['Medical/Life/Health Sciences', 'Engineering/Math', 'Social Sciences/Arts', 'Professional/Graduate Degree'].map((program) => (
                        <label key={program}>
                            <input
                                type="checkbox"
                                name="program"
                                value={program}
                                checked={formData.program.includes(program)}
                                onChange={handleChange}
                            />
                            {program}
                        </label>
                    ))}
                </div>

                <label htmlFor="yearExperience">Year Experience:</label>
                <textarea id="yearExperience" name="yearExp" value={formData.yearExp} onChange={handleChange}></textarea>

                <label htmlFor="motivation">Motivation:</label>
                <textarea id="motivation" name="motivation" value={formData.motivation} onChange={handleChange}></textarea>

                <div className="button-container">
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default EditVolunteerForm;




