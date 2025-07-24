import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/editPage.css';
import { BASE_URL } from '../config';
import TournamentPopUp from '../tournamentPopUp';
import { useAuth } from '../contexts/AuthContext';

function EditScore() {
    const { user } = useAuth();
    const [results, setResults] = useState([]);
    const [displayResults, setDisplayResults] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const [sortOrder, setSortOrder] = useState('');
    const [sortWin, setSortWin] = useState('');
    const [searchNameTerm, setSearchNameTerm] = useState('');
    const [searchTournamentTerm, setSearchTournamentTerm] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchEndDate, setSearchEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/tournaments/results`)
            .then(response => {
                setResults(response.data);
                setDisplayResults(response.data);
            })
            .catch(error => console.error('Error fetching tournament results:', error));
    }, []);

    const handleViewDetails = async (resultID) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/tournaments/results/${resultID}`);
            setSelectedResult(response.data[0]);
            setShowPopUp(true);
        } catch (error) {
            console.error('Error fetching result details:', error);
        }
    };

    const handleEditClick = (resultID) => {
        navigate(`/editTournamentResult/${resultID}`);
    };

    const handleClose = () => {
        setShowPopUp(false);
    };

    const handleDelete = async (resultID) => {
        if (window.confirm('Are you sure you want to delete this result?')) {
            try {
                const response = await axios.delete(`${BASE_URL}/api/tournaments/results/delete/${resultID}`);
                if (response.status === 200) {
                    alert('Result deleted successfully');
                    const updatedResults = displayResults.filter(result => result.resultID !== resultID);
                    setDisplayResults(updatedResults);
                    setResults(updatedResults);
                } else {
                    alert('Failed to delete result');
                }
            } catch (error) {
                alert('Error deleting result');
                console.error('Error deleting result:', error);
            }
        }
    };

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = displayResults.slice(indexOfFirstResult, indexOfLastResult);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const numOfPages = Math.ceil(displayResults.length / resultsPerPage);

    const nextPage = () => {
        if (currentPage < numOfPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleSortChange = (e) => {
        const selectedOrder = e.target.value;
        setSortOrder(selectedOrder);
        applySortAndFilter(selectedOrder, sortWin, searchNameTerm, searchTournamentTerm, searchStartDate, searchEndDate);
    };

    const handleSortWinChange = (e) => {
        const selectedWin = e.target.value;
        setSortWin(selectedWin);
        applySortAndFilter(sortOrder, selectedWin, searchNameTerm, searchTournamentTerm, searchStartDate, searchEndDate);
    };

    const applySortAndFilter = (order, win, nameSearch, tournamentSearch, startDate, endDate) => {
        let filteredResults = results.filter(result => {
            const gameDateTime = startDate || endDate ? new Date(result.gameDate) : null;
            const start = startDate ? new Date(startDate) : new Date('1970-01-01T00:00');
            const end = endDate ? new Date(endDate) : new Date();

            return result.tournament.toLowerCase().includes(tournamentSearch.toLowerCase()) &&
                (result.participant1.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    result.participant2.toLowerCase().includes(nameSearch.toLowerCase())) &&
                (!startDate || gameDateTime >= start) &&
                (!endDate || gameDateTime <= end);
        });

        if (win === "whiteWin") {
            filteredResults = filteredResults.filter(result => result.winner === result.participant1);
        } else if (win === "blackWin") {
            filteredResults = filteredResults.filter(result => result.winner === result.participant2);
        } else if (win === "draw") {
            filteredResults = filteredResults.filter(result => result.winner === null || result.winner === '' || result.winner === 'Draw');
        }

        const sortedResults = filteredResults.sort((a, b) => {
            switch (order) {
                case 'newest': return new Date(b.gameDate) - new Date(a.gameDate);
                case 'oldest': return new Date(a.gameDate) - new Date(b.gameDate);
                default: return 0;
            }
        });
        setDisplayResults(sortedResults);
    };


    const handleSearchNameChange = (e) => {
        setSearchNameTerm(e.target.value);
    };

    const handleSearchTournamentChange = (e) => {
        setSearchTournamentTerm(e.target.value);
    };

    const handleSearch = () => {
        applySortAndFilter(sortOrder, sortWin, searchNameTerm, searchTournamentTerm, searchStartDate, searchEndDate);
    };

    const pageNumbers = [];
    for (let i = 1; i <= numOfPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='editPage'>
            <h1>{user?.isAuthenticated ? 'Edit Tournament Scores' : 'Tournament Results'}</h1>
            <div className='toolbar'>
                {user?.isAuthenticated && (
                    <button className="add-result-button" onClick={() => navigate('/score-addForm')}>Add Result</button>
                )}
                <select onChange={handleSortChange} className='sort-dropdown' value={sortOrder}>
                    <option value="">Sort By Date</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <select onChange={handleSortWinChange} className='sort-dropdown' value={sortWin}>
                    <option value="">Sort By Win</option>
                    <option value="whiteWin">White Win</option>
                    <option value="blackWin">Black Win</option>
                    <option value="draw">Draw</option>
                </select>
                <label className='date-label'>
                    From:
                    <input
                        type="date"
                        value={searchStartDate}
                        onChange={(e) => setSearchStartDate(e.target.value)}
                        className="search-input"
                    />
                </label>
                <label className='date-label'>
                    To:
                    <input
                        type="date"
                        value={searchEndDate}
                        onChange={(e) => setSearchEndDate(e.target.value)}
                        className="search-input"
                    />
                </label>
                <input
                    type="text"
                    placeholder="Search by tournament"
                    value={searchTournamentTerm}
                    onChange={handleSearchTournamentChange}
                    className="search-input"
                />
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchNameTerm}
                    onChange={handleSearchNameChange}
                    className="search-input"
                />
                <button onClick={handleSearch} className='search-button'>Search</button>
            </div>

            <table className="subscribers-table">
                <thead>
                    <tr>
                        <th>Tournament</th>
                        <th>White</th>
                        <th>Black</th>
                        <th>Result</th>
                        <th>Game Date</th>
                        <th>Details</th>
                        {user?.isAuthenticated && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentResults.map(result => {
                        let textResult = '1/2 - 1/2'; // Default text for a draw
                        if (result.winner === result.participant1) {
                            textResult = '1 - 0';
                        } else if (result.winner === result.participant2) {
                            textResult = '0 - 1';
                        }

                        // Determine if the match is a draw, check for both null and "Draw"
                        const isDraw = result.winner === null || result.winner === 'Draw';

                        const whiteBackgroundColor = isDraw ? 'yellow' : result.winner === result.participant1 ? 'green' : 'red';
                        const blackBackgroundColor = isDraw ? 'yellow' : result.winner === result.participant2 ? 'green' : 'red';

                        return (
                            <tr key={result.resultID}>
                                <td>{result.tournament}</td>
                                <td style={{ backgroundColor: whiteBackgroundColor }}>
                                    {result.participant1}
                                </td>
                                <td style={{ backgroundColor: blackBackgroundColor }}>
                                    {result.participant2}
                                </td>
                                <td>{isDraw ? '1/2 - 1/2' : textResult}</td>
                                <td>{new Date(result.gameDate).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleViewDetails(result.resultID)} className='copy-button'>View Details</button>
                                </td>
                                {user?.isAuthenticated && (
                                    <td>
                                        <button onClick={() => handleEditClick(result.resultID)} className='copy-button'>Edit</button>
                                        <button onClick={() => handleDelete(result.resultID)} className='copy-button'>Delete</button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <nav>
                <div className='toolbar'>
                    <div className='search-button'>
                        <a onClick={prevPage}>Back</a>
                    </div>
                    {pageNumbers.map(number => (
                        <div key={number} className='search-button'>
                            <a onClick={() => paginate(number)}>{number}</a>
                        </div>
                    ))}
                    <div className='search-button'>
                        <a onClick={nextPage}>Next</a>
                    </div>
                </div>
            </nav>

            {showPopUp && selectedResult && (
                <TournamentPopUp
                    participant1={selectedResult.participant1}
                    participant2={selectedResult.participant2}
                    result={selectedResult.winner === 'Draw' ? '1/2 - 1/2' : selectedResult.winner === selectedResult.participant1 ? '1 - 0' : '0 - 1'}
                    winner={selectedResult.winner}  // Pass the winner string directly
                    resultURL={selectedResult.resultURL}
                    tournamentName={selectedResult.tournament}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}

export default EditScore;

