import React from 'react';
import { BASE_URL} from '../config.js';
import { useState, useEffect } from 'react';
import '../styles/editPage.css';
import { Link } from 'react-router-dom';
import TournamentItem from '../tournamentItem.js';
import {Tournaments, formatDate, formatTime, formatPrice} from "./tournaments.js";


function EditTournaments() {


    useEffect(()=>{
        fetchData();
    })
    const [items, setItems] = useState([
        {tournamentsID: 1, title: 'Tournament 1'},
        {tournamentsID: 2, title: 'Tournament 2'},
        {tournamentsID: 3, title: 'Tournament 3'},
        {tournamentsID: 4, title: 'Tournament 4'},
    ]);



    const fetchData = () =>{
        const tournamentURL = `${BASE_URL}/tournaments`;
        fetch(tournamentURL).then(response => {
            if(!response.ok){
                throw new Error('Error fetching tournaments');
            }
            response.json().then(data => {
                setItems(data);
            })
        })
    }

    /*const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`/api/tournaments/delete/${itemId}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            if (result) {
                console.log(result);
                setItems(currentItems => currentItems.filter(item => item.id !== itemId));
            } else {
                console.error('Failed to delete tournament');
            }
        } catch (error) {
            console.error('Error deleting tournament:', error);
        }
    };*/

    return (
        <div className='editPage-container'>
            <h1>Edit Tournaments</h1>
            <div className='editing-container'>
                <table className="tournament-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>End Time</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(tournament => (
                        <tr key={tournament.tournamentsID}>
                            <td>{tournament.tournamentsID}</td>
                            <td>{tournament.title}</td>
                            <td><img src={tournament.image} alt={tournament.title} className="tournament-image" /></td>
                            <td>{formatPrice(tournament.cost)}</td>
                            <td>{formatDate(tournament.start_date)}</td>
                            <td>{formatTime(tournament.start_date)}</td>
                            <td>{formatTime(tournament.end_date)}</td>
                            <td>{tournament.description}</td>
                            <td>
                                <Link to={`/editForm-tournaments?itemId=${tournament.tournamentsID}`}>
                                    <button>Edit Tournament</button>
                                </Link>
                                <Link to={`/editForm-liveTournament?itemId=${tournament.tournamentsID}`}>
                                    <button>Update Live</button>
                                </Link>
                                <Link to={`/editForm-tournamentParticipants?itemId=${tournament.tournamentsID}`}>
                                    <button>Participants</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default EditTournaments;
