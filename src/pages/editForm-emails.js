import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/editEmail.css';
import { BASE_URL } from "../config.js";

const EditEmailForm = ({ template, onComplete }) => {
    const [localTemplate, setLocalTemplate] = useState({ subject: '', body: '', placeholders: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Load the template data when the component mounts or when the template prop changes
    useEffect(() => {
        if (template) {
            console.log('Loaded template for editing:', template);
            setLocalTemplate(template);
        } else {
            console.error('No template data provided.');
            alert('Invalid template data.');
            navigate('/editEmails');
        }
    }, [template, navigate]);

    // Validate the template before submission
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

    // Handle form submission for updating the template using PUT
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateTemplate(localTemplate)) return;
        setIsSubmitting(true);

        try {
            const response = await fetch(`${BASE_URL}/api/emails/${localTemplate.templateID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(localTemplate),
            });

            if (response.ok) {
                alert('Template updated successfully');
                if (onComplete) onComplete(); // Notify the parent component to refresh data
                navigate('/editEmails'); // Redirect to the main EditEmails page after saving
            } else {
                const errorData = await response.json();
                console.error('Failed to update template:', errorData);
                alert('Failed to update template. Please check the console for more details.');
            }
        } catch (error) {
            console.error('Error updating template:', error);
            alert('An error occurred while updating the template. Please check the console for more details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Update template state on input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalTemplate(prevTemplate => ({ ...prevTemplate, [name]: value }));
    };

    // Corrected handleCancel function
    const handleCancel = () => {
        console.log('Cancel button clicked. Navigating back to /editEmails');
        navigate('/editEmails'); // Ensure this line is called directly without conditions
    };

    return (
        <div className='edit-email-form-container'>
            <h2>Edit Template</h2>
            <form onSubmit={handleSubmit} className='edit-email-form'>
                <label>
                    Subject:
                    <input
                        type="text"
                        name="subject"
                        value={localTemplate.subject}
                        onChange={handleChange}
                        required
                        maxLength={100}
                    />
                </label>
                <label>
                    Body:
                    <textarea
                        name="body"
                        value={localTemplate.body}
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
                        value={localTemplate.placeholders || ''}
                        onChange={handleChange}
                    />
                </label>
                <div className="button-group">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                    <button type="button" onClick={handleCancel} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEmailForm;
