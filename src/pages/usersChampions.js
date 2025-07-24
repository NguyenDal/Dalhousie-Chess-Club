import React, { useState, useEffect } from 'react';
import '../styles/champions.css';
import { BASE_URL } from "../config";

const UsersChampions = () => {
    const [champions, setChampions] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchTournaments = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/tournaments`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (isMounted) {
                        setTournaments(data);
                    }
                } else {
                    console.error('Failed to fetch tournaments:', response.statusText);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching tournaments:', error);
                }
            }
        };

        fetchTournaments();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchChampions = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/champions`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (isMounted) {
                        if (selectedTournament) {
                            const filteredChampions = data.filter(
                                champion => champion.title === selectedTournament
                            );
                            setChampions(filteredChampions);
                        } else {
                            setChampions(data);
                        }
                    }
                } else {
                    console.error('Failed to fetch champions:', response.statusText);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error updating champions:', error);
                }
            }
        };

        fetchChampions();

        return () => {
            isMounted = false;
        };
    }, [selectedTournament]);

    return (
        <div className="champions-page">
            <div className="tournament-dropdown">
                <label htmlFor="tournament-select">Choose a tournament:</label>
                <select 
                    id="tournament-select" 
                    value={selectedTournament} 
                    onChange={e => setSelectedTournament(e.target.value || "")}
                >
                    <option value="">All Tournaments</option>
                    {tournaments.map(tournament => (
                        <option key={tournament.tournamentsID} value={tournament.title}>
                            {tournament.title}
                        </option>
                    ))}
                </select>
            </div>
            <h1>Champions</h1>
            <table className="champions-table">
                <thead>
                    <tr>
                        <th>Champion Name</th>
                        <th>Year</th>
                        <th>Tournament Name</th>
                    </tr>
                </thead>
                <tbody>
                    {champions.map((champion, index) => (
                        <tr key={index}>
                            <td>{champion.name}</td>
                            <td>{formatDate(champion.year)}</td>
                            <td>{champion.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersChampions;

// adapted from tournaments.js 
export function formatDate(dateString) {
    if (!dateString) {
        return "Date TBD";
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    return `${year}`;
}
