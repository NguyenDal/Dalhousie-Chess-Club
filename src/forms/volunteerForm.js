import React, { useState } from 'react';
import '../styles/volunteerForm.css'; 
import { BASE_URL } from '../config.js';

function VolunteerForm() {
    // State to store form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        studentStatus: false,
        timeCommitment: false,
        program: [],
        yearExperience: '',
        motivation: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                program: checked
                    ? [...prevData.program, value]
                    : prevData.program.filter(prog => prog !== value),
            }));
        } else if (type === 'radio' && (name === 'studentStatus' || name === 'timeCommitment')) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value === 'yes',
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            volunteerName: formData.name,
            email: formData.email,
            isDalStudent: formData.studentStatus,
            timeCommitment: formData.timeCommitment,
            program: formData.program.join(', '),
            yearExp: formData.yearExperience,
            motivation: formData.motivation,
        };

        try {
            const response = await fetch(`${BASE_URL}/api/volunteers/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });
            if (!response.ok) {
                setSuccessMessage('Failed to submit registration. Please try again!');
                throw new Error('Failed to register volunteer.');
            }
    
            setFormData ({
                name: '',
                email: '',
                studentStatus: false,
                timeCommitment: false,
                program: [],
                yearExperience: '',
                motivation: '',
            });

            setSuccessMessage('Registration submitted successfully!');
            alert('Volunteer registered successfully!');

        } catch (error) {
            console.error('Failed to submit registration:', error);
            setSuccessMessage('An error occurred. Please try again!');
            alert('Error submitting form.');
        }
    };

    return (
        <div className="add-form-container">
            <div className="header-info">
                <h2>Chess for Wellness Volunteer Registration</h2>
                <p>Fill out the form below to register as a volunteer for the Chess for Wellness program.</p>
            </div>

            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit} className="form-combined">
                <div className="form-A">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        className="text-form"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-B">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="text-form"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-C">
                    <label>Are you a Dalhousie University student?</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="studentStatus"
                                value="yes"
                                checked={formData.studentStatus}
                                onChange={handleChange}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="studentStatus"
                                value="no"
                                checked={!formData.studentStatus}
                                onChange={handleChange}
                            />
                            No
                        </label>
                    </div>
                </div>

                <div className="form-D">
                    <label>Time Commitment:</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="timeCommitment"
                                value="yes"
                                checked={formData.timeCommitment}
                                onChange={handleChange}
                            />
                            I am able to contribute 2 hours per week
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="timeCommitment"
                                value="no"
                                checked={!formData.timeCommitment}
                                onChange={handleChange}
                            />
                            I am not able to contribute 2 hours per week
                        </label>
                    </div>
                </div>

                <div className="form-E">
                    <label>Program:</label>
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="program"
                                value="Medical/Life/Health Sciences"
                                checked={formData.program.includes("Medical/Life/Health Sciences")}
                                onChange={handleChange}
                            />
                            Medical/Life/Health Sciences
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="program"
                                value="Engineering/Math"
                                checked={formData.program.includes("Engineering/Math")}
                                onChange={handleChange}
                            />
                            Engineering/Math
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="program"
                                value="Social Sciences/Arts"
                                checked={formData.program.includes("Social Sciences/Arts")}
                                onChange={handleChange}
                            />
                            Social Sciences/Arts
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="program"
                                value="Professional/Graduate Degree"
                                checked={formData.program.includes("Professional/Graduate Degree")}
                                onChange={handleChange}
                            />
                            Professional/Graduate Degree
                        </label>
                    </div>
                </div>

                <div className="form-F">
                    <label htmlFor="yearExperience">What year are you in? Do you have any previous volunteer experience?</label>
                    <textarea
                        id="yearExperience"
                        name="yearExperience"
                        placeholder="Enter your answer"
                        className="text-form"
                        value={formData.yearExperience}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-G">
                    <label htmlFor="motivation">What is your biggest motivation to join the club?</label>
                    <textarea
                        id="motivation"
                        name="motivation"
                        placeholder="Enter your answer"
                        className="text-form"
                        value={formData.motivation}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="submit-button-container">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default VolunteerForm;
