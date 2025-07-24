import React, { useState, useEffect } from 'react';
import '../styles/news.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL} from '../config.js';
import { useLocation } from 'react-router-dom';

const NewsArticle = ({ title, date, text, imageUrl, newsID }) => (
    <div className="news-article" id={newsID}>
        <h2>{title}</h2>
        <p className="date">{date}</p>
        <p>{text}</p>
        {imageUrl && <img src={imageUrl} alt={title} />}
    </div>
);

const NewsPage = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [input, setInput] = useState("");
    const [dateFilter, setDateFilter] = useState('');
    const location = useLocation();

    const fetchData = () => {
        fetch(`${BASE_URL}/api/news/getAllNews`)
            .then((response) => response.json())
            .then((json) => {
                const filteredResults = json.filter(article => {
                    const matchesTitle = article.title.toLowerCase().includes(input.toLowerCase());
                    const matchesDate = dateFilter ? new Date(article.date).getMonth() === (1 + (new Date(dateFilter).getMonth()))%12 : true;
                    return matchesTitle && matchesDate;
                });
                setNewsArticles(filteredResults);
            });
    };

    useEffect(() => {
        fetchData();
    }, [input, dateFilter]);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        console.log('Location hash:', hash);
        if (hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                const element = document.getElementById(hash);
                console.log('Element to scroll to:', element);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    console.log('Scrolled to element:', element);
                } else {
                    console.log('Element not found');
                }
            }, 800); 
        }
    }, [location, newsArticles]); 

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleDateFilterChange = (event) => {
        setDateFilter(event.target.value);
    };

    return (
        <div className="news-page">
            <h1 className="news-header">News</h1>
            <div className="filters-container">
                <div className='input-wrapper'>
                    <FontAwesomeIcon icon={faSearch} id="search-icon"/>
                    <input
                        placeholder='Type to search...'
                        value={input}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='filter'>
                    <label>Select Date Month - Year:</label>
                    <input
                        type="month"
                        value={dateFilter}
                        onChange={handleDateFilterChange}
                    />
                </div>
            </div>

            <div className="news-container">
                {newsArticles.length !== 0 ? newsArticles.map((article) => (
                    <NewsArticle key={article.newsID} {...article} newsID={article.newsID} />
                )) : <h3>No News Articles Found...</h3>}
            </div>
        </div>
    );
};

export default NewsPage;
