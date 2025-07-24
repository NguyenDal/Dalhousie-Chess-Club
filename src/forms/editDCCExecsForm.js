import React, { useState, useEffect } from 'react';
import '../styles/ExecVolunteerForm.css';
import { BASE_URL } from '../config.js';

function EditExecForm({ exec, onCancel, onUpdate }) {
    const [formData, setFormData] = useState({
        b00Num: '',
        resume: null,
        additionalNotes: '',
        experience: '',
        hoursPerWeek: '',
        positionInterest: '',
        comments: '',
    });

    useEffect(() => {
        if (exec) {
            setFormData({
                ...exec,
                positionInterest: exec.positionInterest || ''  // Make sure it's a string
            });
        }
    }, [exec]);

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => {
                const positionsArray = prev.positionInterest ? prev.positionInterest.split(", ") : [];
                let updatedPositions;
                if (checked) {
                    updatedPositions = [...positionsArray, value];
                } else {
                    updatedPositions = positionsArray.filter(pos => pos !== value);
                }
                return {
                    ...prev,
                    positionInterest: updatedPositions.join(", ")
                };
            });
        } else if (name === "resume" && files.length) {
            setFormData(prev => ({ ...prev, resume: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'resume' && formData[key] instanceof File) {
                data.append(key, formData[key]);
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await fetch(`${BASE_URL}/api/executiveTeam/update/${exec.execID}`, {
                method: 'PUT',
                body: data,
            });
            if (response.ok) {
                alert('Exec updated successfully');
                onUpdate();
                onCancel();
            } else {
                alert('Error updating exec');
            }
        } catch (error) {
            alert('Error updating exec');
            console.error('Error updating exec:', error);
        }
    };

    return (
        <div className="edit-form-container">
            <form onSubmit={handleSubmit} className="form-combined">
                <div className="form-element">
                    <label>B00 Number</label>
                    <input className="text-form" type="text" name="b00Num" value={formData.b00Num} onChange={handleChange} />
                </div>

                <div className="form-element">
                    <label>Upload Resume (PDF)</label>
                    <input className="text-form" type="file" name="resume" accept=".pdf" onChange={handleChange} />
                </div>

                <div className="form-element">
                    <label>Additional Info</label>
                    <textarea className="text-form" name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} />
                </div>

                <div className="form-element">
                    <label>Chess Experience</label>
                    <textarea className="text-form" name="experience" value={formData.experience} onChange={handleChange} />
                </div>

                <div className="form-element">
                    <label>Hours per week you can commit</label>
                    <input className="text-form" type="number" name="hoursPerWeek" value={formData.hoursPerWeek} onChange={handleChange} />
                </div>

                <div className="form-element">
                    <label>Positions Interested In</label>
                    <div className="checkbox-group">
                        {['Tournament Director', 'Seminar Director', 'Weekly Socials Meet Director', 'Treasurer', 'Secretary', 'Web Developer', 'Social Media Director', 'Marketing Events Coordinator', 'Discord Moderator', 'Graphic Designer', 'Sponsorship Coordinator', 'Community Relations'].map(position => (
                            <div key={position}>
                                <input type="checkbox" name="positionInterest" value={position} checked={formData.positionInterest.includes(position)} onChange={handleChange} />
                                <label>{position}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-element">
                    <label>Comments/Questions</label>
                    <textarea className="text-form" name="comments" value={formData.comments} onChange={handleChange} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', gap: '10px' }}>
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default EditExecForm;
