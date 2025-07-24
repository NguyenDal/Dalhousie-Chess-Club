import React, { useState } from 'react';
import '../styles/editConstitution.css';

const EditConstitution = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
            // Logic to upload or save the file goes here
            console.log("File selected:", selectedFile.name);
            alert("Constitution PDF uploaded successfully!");
        } else {
            alert("Please select a file before submitting.");
        }
    };

    return (
        <div className="edit-constitution-container">
            <h1>Edit Constitution</h1>
            <p>Upload a new PDF file to replace the current constitution displayed on the website.</p>
            
            <form onSubmit={handleSubmit} className="upload-form">
                <label htmlFor="fileUpload">
                    Select a new PDF:
                </label>
                <input 
                    type="file" 
                    id="fileUpload" 
                    accept="application/pdf" 
                    onChange={handleFileChange} 
                    className="file-input"
                />
                <button type="submit" className="upload-button">
                    Upload PDF
                </button>
            </form>

            {selectedFile && (
                <p className="file-info">
                    Selected file: <strong>{selectedFile.name}</strong>
                </p>
            )}
        </div>
    );
};

export default EditConstitution;
