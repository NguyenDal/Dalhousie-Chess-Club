import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/editEmail.css';
import { BASE_URL } from "../config.js";
import AddEmailForm from './AddEmailForm';
import EditEmailForm from './editForm-emails.js';

const EditEmails = () => {
    const [emailTemplates, setEmailTemplates] = useState([]);
    const [editingTemplate, setEditingTemplate] = useState(null); // State to handle editing a specific template
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmailTemplates();
    }, []);

    const fetchEmailTemplates = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/api/emails`);
            if (!response.ok) {
                throw new Error(`Failed to fetch email templates: ${response.statusText}`);
            }
            const data = await response.json();
            setEmailTemplates(data);
        } catch (error) {
            console.error('Error fetching email templates:', error);
            setError('Failed to load email templates. Please check your connection or server.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (templateID) => {
        const templateToEdit = emailTemplates.find(template => template.templateID === templateID);
        if (templateToEdit) {
            setEditingTemplate(templateToEdit);
        } else {
            console.error(`Template with ID ${templateID} not found`);
            alert('Template not found.');
        }
    };

    const handleDelete = async (templateID) => {
        if (window.confirm('Are you sure you want to delete this template?')) {
            try {
                const response = await fetch(`${BASE_URL}/api/emails/${templateID}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Email template deleted successfully');
                    setEmailTemplates(emailTemplates.filter(template => template.templateID !== templateID));
                } else {
                    console.error(`Failed to delete template with ID ${templateID}`);
                    alert('Failed to delete template. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting template:', error);
                alert('Error deleting template.');
            }
        }
    };

    const handleAddTemplate = (newTemplate) => {
        setEmailTemplates(prevTemplates => [...prevTemplates, newTemplate]);
        setShowAddForm(false);
    };

    const handleEditComplete = (updatedTemplate) => {
        setEditingTemplate(null); // Reset editing state after completion
        if (updatedTemplate) {
            setEmailTemplates(prevTemplates =>
                prevTemplates.map(template =>
                    template.templateID === updatedTemplate.templateID ? updatedTemplate : template
                )
            );
        } else {
            fetchEmailTemplates(); // Refresh the template list if no specific update is passed
        }
    };

    return (
        <div className="editPage">
            <div className="header-info">
                <h1>Edit Email Templates</h1>
                <p>Manage and edit your existing email templates here.</p>
            </div>

            {editingTemplate ? (
                <EditEmailForm template={editingTemplate} onComplete={handleEditComplete} />
            ) : (
                <>
                    <button onClick={() => setShowAddForm(!showAddForm)} className="toggle-add-form-button">
                        {showAddForm ? "Close Add Email Form" : "Add New Email Template"}
                    </button>

                    {showAddForm && <AddEmailForm handleAddTemplate={handleAddTemplate} />}

                    <div className="editing-container">
                        {loading ? (
                            <p>Loading email templates...</p>
                        ) : error ? (
                            <p className="error-message">{error}</p>
                        ) : emailTemplates.length > 0 ? (
                            <table className="library-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Subject</th>
                                        <th>Body</th>
                                        <th>Placeholders</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emailTemplates.map(template => (
                                        <tr key={template.templateID}>
                                            <td>{template.templateID}</td>
                                            <td>{template.subject}</td>
                                            <td>{template.body}</td>
                                            <td>{template.placeholders}</td>
                                            <td className="buttons-container">
                                                <button onClick={() => handleEdit(template.templateID)}>Edit</button>
                                                <button onClick={() => handleDelete(template.templateID)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No email templates available. Add a new template to get started.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default EditEmails;
