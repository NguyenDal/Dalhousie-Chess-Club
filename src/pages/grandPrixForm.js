import React, { useState, useEffect } from 'react';
import '../styles/editPage.css';
import { BASE_URL } from "../config";

function GrandPrixForm() {
    const currentGameId = 1; // Adjust if necessary
    const [grandPrixIframe, setGrandPrixIframe] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/grand-prix/${currentGameId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log('Fetched data:', data); // Add logging
            setGrandPrixIframe(data.iframe_link); // Ensure this matches the backend response
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleAdd = async (event) => {
        event.preventDefault();
        const formData = { iframe_link: grandPrixIframe };
        try {
            const response = await fetch(`${BASE_URL}/api/grand-prix/edit/${currentGameId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to update Grand Prix:', errorText);
                setSuccessMessage('');
                return;
            }

            const result = await response.json();
            console.log('Server response:', result); // Add logging
            if (result.success) {
                console.log(result);
                setSuccessMessage('Grand Prix updated successfully!');
            } else {
                console.error('Failed to update Grand Prix');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSuccessMessage('');
        }
    };

    return (
        <div className="gp-add-form-container">
            <div className="gp-header-info">
                <h2 id="gp-main-header">Add Grand Prix</h2>
                <p>This is the page where you, the admin, can add new tournaments.</p>
                <p>To add grand prix table, publish the respective <a href="https://support.google.com/docs/answer/183965?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Cstop-publishing-a-file%2Cembed-a-document-spreadsheet-or-presentation." target="_blank">Google Spreadsheet</a> as a web page and embed here:</p>
                <ul className="gp-list-group">
                    <li>Open your Google Spreadsheet.</li>
                    <li>Click on File, Publish to the web.</li>
                    <li>Choose the Embed option and select the sheet you want to embed.</li>
                    <li>Click on 'Publish', then copy the HTML code provided.</li>
                </ul>
            </div>
            <form className="gp-form-element" onSubmit={handleAdd}>
                <div className="gp-form-container">
                    <label>Grand Prix (iframe):</label>
                    <textarea
                        className="gp-text-form"
                        value={grandPrixIframe}
                        onChange={(e) => setGrandPrixIframe(e.target.value)}
                        required
                    />
                </div>
                <div className="gp-submit-button-container">
                    <button type="submit">Submit</button>
                </div>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
}

export default GrandPrixForm;
