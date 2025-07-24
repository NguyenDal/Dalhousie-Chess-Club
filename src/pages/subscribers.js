import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/editPage.css';
import { BASE_URL } from '../config';

function Subscribers() {
    const [items, setItems] = useState([]);
    const [displayItems, setDisplayItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('newest');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/subscribers`)
            .then(response => {
                setItems(response.data);
                setDisplayItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching subscribers:', error);
            });
    }, []);

    /* Pagination Logic - Start */
    // Pagination Logic also contained in nav tag
    const [currPage, setCurrPage] = useState(1);  // Initialize currPage as 1
    const [recordsPerPage] = useState(20);  // Initialize recordsPerPage as 20

    const indexOfLastRecord = currPage * recordsPerPage;  // Index of the last record on the current page
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;  // Index of the first record on the current page
    const currRecords = displayItems.slice(indexOfFirstRecord, indexOfLastRecord);  // Records displayed on the current page

    const numOfPages = Math.ceil(displayItems.length / recordsPerPage);  // Total number of pages

    // Change page
    const paginate = (pageNumber) => setCurrPage(pageNumber);

    const nextPage = () => {
        if (currPage !== numOfPages) {
            setCurrPage(currPage + 1);
        }
    };

    const prevPage = () => {
        if (currPage !== 1) {
            setCurrPage(currPage - 1);
        }
    };

    // Page numbers to be displayed
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(displayItems.length / recordsPerPage); i++) {
        pageNumbers.push(i);
    }
    /* Pagination Logic - End */

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        applySortAndFilter(e.target.value, searchTerm);
    };

    const applySortAndFilter = (order, search) => {
        let filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        const sortedItems = filteredItems.sort((a, b) => {
            switch (order) {
                case 'AtoZ': return a.name.localeCompare(b.name);
                case 'ZtoA': return b.name.localeCompare(a.name);
                case 'newest': return b.id - a.id;
                case 'oldest': return a.id - b.id;
                default: return 0;
            }
        });
        setDisplayItems(sortedItems);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        applySortAndFilter(sortOrder, searchTerm);
    };

    const copyEmailsToClipboard = () => {
        navigator.clipboard.writeText(displayItems.map(item => item.email).join(';'))
            .then(() => alert('Mailing list copied to clipboard!'))
            .catch(err => console.error('Error copying text to clipboard', err));
    };

    return (
        <div className='editPage-container'>
            <h1>Subscribers List</h1>
            <div className='toolbar'>
                <button onClick={copyEmailsToClipboard} className='copy-button'>Copy All the Emails</button>
                <select onChange={handleSortChange} className='sort-dropdown' value={sortOrder}>
                    <option value="AtoZ">A to Z</option>
                    <option value="ZtoA">Z to A</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchChange} className="search-input" />
                <button onClick={handleSearch} className='search-button'>Search</button>
            </div>
            <table className="subscribers-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currRecords.map(item => (
                        <tr key={item.id}>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>
                                <button onClick={() => navigate(`/subscribersDeleteForm?email=${item.email}&id=${item.id}`)} className='copy-button'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br></br>
            <nav>
                <div className='toolbar'>
                    <div className='search-button'>
                        <a className='page-link' onClick={prevPage}>Back</a>
                    </div>
                    {
                        pageNumbers.map(number => (
                            <div key={number} className='search-button'>
                                <a className='page-link' onClick={() => paginate(number)}>{number}</a>
                            </div>
                        ))
                    }
                    <div className='search-button'>
                        <a className='page-link' onClick={nextPage}>Next</a>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Subscribers;