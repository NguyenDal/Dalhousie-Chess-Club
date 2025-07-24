import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/editPage.css';
import { BASE_URL } from '../config';

function EditTournamentResult() {
    const navigate = useNavigate();
    const { resultID } = useParams();

    const [formData, setFormData] = useState({
        tournamentsID: '',
        tournamentTitle: '',
        participant1: '',
        participant2: '',
        winnerID: '',
        gameDate: '',
        resultURL: ''
    });

    useEffect(() => {
        const fetchResultDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/tournaments/results/${resultID}`);
                const result = response.data[0];
                setFormData({
                    tournamentsID: result.tournamentsID,
                    tournamentTitle: result.tournament || '',
                    participant1: result.participant1,
                    participant2: result.participant2,
                    winnerID: result.winnerID || '',
                    gameDate: result.gameDate,
                    resultURL: result.resultURL || ''
                });
            } catch (error) {
                console.error("Error fetching result details", error);
                alert("Failed to fetch the result details.");
            }
        };
        fetchResultDetails();
    }, [resultID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        let tournamentsID = '';
    
        try {
            // Validate Tournament Title
            const tournamentResponse = await axios.get(`${BASE_URL}/api/tournaments/validate?title=${formData.tournamentTitle}`);
            if (!tournamentResponse.data || tournamentResponse.data.length === 0) {
                valid = false;
                alert("Tournament not found!");
            } else {
                // Assign the correct tournamentsID from the validation response
                tournamentsID = tournamentResponse.data[0].tournamentsID;
            }
    
            if (!valid) {
                return; // Exit if the tournament validation fails
            }
    
            // Construct the update data
            const updatedData = {
                tournamentsID,
                userName1: formData.participant1,
                userName2: formData.participant2,
                winnerID: formData.winnerID,
                gameDate: formData.gameDate,
                resultURL: formData.resultURL
            };
    
            // Proceed with updating the result
            await axios.put(`${BASE_URL}/api/tournaments/results/update/${resultID}`, updatedData)
                .then(response => {
                    alert("Result updated successfully!");
                    navigate('/score-editForm');
                })
                .catch(error => {
                    console.error("Failed to update the result:", error);
                    alert("Failed to update the result. Please try again.");
                });
        } catch (error) {
            alert("An error occurred during submission.");
        }
    };
    
    

    return (
        <div className="gp-form-page-container">
            <h1 className="gp-header-title">Edit Tournament Result</h1>
            <div className="gp-form-container">
                <form className="gp-add-form-container" onSubmit={handleSubmit}>
                    <div className="gp-form-element">
                        <label>Tournament Title:</label>
                        <input
                            type="text"
                            name="tournamentTitle"
                            value={formData.tournamentTitle}
                            onChange={handleChange}
                            required
                            className="gp-text-form"
                        />
                    </div>

                    <div className="gp-form-element">
                        <label>White:</label>
                        <input
                            type="text"
                            name="participant1"
                            value={formData.participant1}
                            onChange={handleChange}
                            required
                            className="gp-text-form"
                        />
                    </div>

                    <div className="gp-form-element">
                        <label>Black:</label>
                        <input
                            type="text"
                            name="participant2"
                            value={formData.participant2}
                            onChange={handleChange}
                            required
                            className="gp-text-form"
                        />
                    </div>

                    <div className="gp-form-element">
                        <label>Winner ID:</label>
                        <select
                            name="winnerID"
                            value={formData.winnerID}
                            onChange={handleChange}
                            className="gp-text-form"
                        >
                            <option value="">Draw</option>
                            <option value={formData.participant1}>White - {formData.participant1}</option>
                            <option value={formData.participant2}>Black - {formData.participant2}</option>
                        </select>
                    </div>

                    <div className="gp-form-element">
                        <label>Game Date:</label>
                        <input
                            type="datetime-local"
                            name="gameDate"
                            value={formData.gameDate}
                            onChange={handleChange}
                            required
                            className="gp-text-form"
                        />
                    </div>

                    <div className="gp-form-element">
                        <label>Result URL:</label>
                        <input
                            type="text"
                            name="resultURL"
                            value={formData.resultURL}
                            onChange={handleChange}
                            required
                            className="gp-text-form"
                        />
                    </div>

                    <div className="gp-submit-button-container">
                        <button type="button" className="cancel-button" onClick={() => navigate('/score-editForm')}>Cancel</button>
                        <button type="submit" className="save-button">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTournamentResult;