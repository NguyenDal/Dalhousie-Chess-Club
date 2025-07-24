import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/editEmail.css';
import { BASE_URL } from "../config.js";

const AddEmailForm = ({ handleAddTemplate }) => {
    const [template, setTemplate] = useState({ subject: '', body: '', placeholders: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Template validation function
    const validateTemplate = (template) => {
        if (!template.subject.trim() || !template.body.trim()) {
            alert('Subject and body are required.');
            return false;
        }
        if (template.subject.length > 100) {
            alert('Subject must be 100 characters or fewer.');
            return false;
        }
        if (template.body.length > 1000) {
            alert('Body must be 1000 characters or fewer.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateTemplate(template)) return;
        setIsSubmitting(true);

        try {
            const response = await fetch(`${BASE_URL}/api/emails`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(template),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add template.');
            }

            const responseData = await response.json();
            console.log('Template added successfully:', responseData);

            if (responseData && responseData.subject) {
                // Ensure templateID is assigned or use fallback logic
                if (!responseData.templateID) {
                    responseData.templateID = Date.now(); // Fallback for unique ID
                }
                alert('New template added successfully');
                handleAddTemplate(responseData);
                navigate('/editEmails');
            } else {
                console.error('Unexpected response format:', responseData);
                alert('Unexpected response format. Please check the server response.');
            }
        } catch (error) {
            console.error('Error adding template:', error);
            alert(`An error occurred while adding the template: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTemplate(prevTemplate => ({ ...prevTemplate, [name]: value }));
    };

    return (
        <div className='edit-email-form-container'>
            <h1>Add New Email Template</h1>
            <form onSubmit={handleSubmit} className='edit-email-form'>
                <label>
                    Subject:
                    <input
                        type="text"
                        name="subject"
                        value={template.subject}
                        onChange={handleChange}
                        required
                        maxLength={100}
                    />
                </label>
                <label>
                    Body:
                    <textarea
                        name="body"
                        value={template.body}
                        onChange={handleChange}
                        required
                        maxLength={1000}
                    />
                </label>
                <label>
                    Placeholders:
                    <input
                        type="text"
                        name="placeholders"
                        value={template.placeholders}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Email'}
                </button>
                <button type="button" onClick={() => navigate('/editEmails')}>Cancel</button>
            </form>
        </div>
    );
};

export default AddEmailForm;
