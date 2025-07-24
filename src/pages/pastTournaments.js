import React, { useState, useEffect } from 'react';
import TournamentItem from '../tournamentItem.js';
import { TournamentSearch } from '../tournamentSearch.js';
import "../styles/tournaments.css";
import { BASE_URL } from '../config.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function PastTournaments() {
    const [tournamentsList, setTournamentsList] = useState([]);

    // Search results state
    const [nameFilter, setNameFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    // fetches data from db whenever either of the three filters change
    useEffect(() => {
        fetchData();
    }, [nameFilter, priceFilter, dateFilter]);

    // fetches data from the server with query strings in case of filters and assigns it to tournamentList.
    const fetchData = () => {
        const serverUrl =  `${BASE_URL}/pastTournaments?name=${nameFilter}&price=${priceFilter}&date=${dateFilter}`;
        fetch(serverUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched tournaments:', data); // Debug log
                if (data.length === 0) {
                    setTournamentsList([]); // Clear the list if no data is returned
                } else {
                    setTournamentsList(data);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setTournamentsList([]); // Clear the list if there is an error
            });
    }

    // handle functions to call state change
    const handleNameFilter = (event) => {
        setNameFilter(event.target.value);
    }
    const handlePriceFilter = (event) => {
        setPriceFilter(event.target.value);
    }
    const handleDateFilter = (event) => {
        setDateFilter(event.target.value);
    }

    return (
        <div className="tournament">
            <h1>Past Tournaments</h1>
            <div className="filters-container">

                <div className='input-wrapper'>
                    <FontAwesomeIcon icon={faSearch} id="search-icon" />
                    <input placeholder='Type to search...'
                           value={nameFilter}
                           onChange={handleNameFilter}/>
                </div>
                <div className='filter'>
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={priceFilter}
                        onChange={handlePriceFilter}
                    />
                </div>
                <div className='filter' >
                    <label>Select Date Month - Year:</label>
                    <input
                        type="month"
                        value={dateFilter}
                        onChange={handleDateFilter}
                    />
                </div>
            </div>

            <div className="tournamentList">
                {tournamentsList.length === 0 ?
                    (<h3>No Tournaments Found...</h3>) :
                    (tournamentsList.map((tournament, key) => {

                        return(
                            <TournamentItem
                                key={key}
                                tournamentsID={tournament.tournamentsID}
                                name={tournament.title}
                                image={tournament.image}
                                price={formatPrice(tournament.cost)}
                                date={formatDate(tournament.start_date)}
                                time={formatTime(tournament.start_date)}
                                endTime={formatTime(tournament.end_date)}
                                participantsNo={tournament.num_of_participants}
                                description={tournament.description}
                                registrationLink={"pastTournament"}
                            />
                        )
                    }))
                }
            </div>
        </div>
    )
}

export function formatPrice(price) {
    if (!price || price === 0) {
        return "FREE";
    } else {
        return "$" + price;
    }
}

export function formatDate(dateString) {
    if (!dateString) {
        return "Date TBD";
    }
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

export function formatTime(dateString) {
    const date = new Date(dateString);

    if (!dateString) {
        return "Finish";
    }
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? 12 : 12;

    return `${hours}${ampm}`;
}

export default PastTournaments;

