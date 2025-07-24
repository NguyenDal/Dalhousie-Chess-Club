import React, {useEffect, useState} from 'react';
import '../styles/editPage.css';
import {BASE_URL} from '../config.js';
import {Link} from "react-router-dom";
function EditNews() {

    const [items, setItems] = useState([
        {newsID: 1, NewsTitle: 'Event 1', date: new Date().toISOString(), text: "Dummy 1", event_ImageID:1, imgurl:''},
        {newsID: 2, NewsTitle: 'Event 2', date: new Date().toISOString(), text: "Dummy 2", event_ImageID:2, imgurl:''},
        {newsID: 3, NewsTitle: 'Event 3', date: new Date().toISOString(), text: "Dummy 3", event_ImageID:3, imgurl:''},
        {newsID: 4, NewsTitle: 'Event 4', date: new Date().toISOString(), text: "Dummy 4", event_ImageID:4, imgurl:''},
    ]);

    const fetchData = async () => {
        try{
            const response = await fetch(`${BASE_URL}/api/news`);
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data = await response.json();
            console.log('Fetched data:', data);
            setItems(data);
        } catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchData();
    },[])


    function formatDate(dateString) {
        if (!dateString) {
            return "Date TBD";
        }
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }

    function formatText(text){
        if(text.length <= 100){
            return text;
        }
        return text.substring(0, 100).concat(" ...");
    }


    const handleDelete = async (itemId) => {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (!confirmed) {
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/news/delete/${itemId}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            if (result) {
                console.log(result);
                setItems(currentItems => currentItems.filter(item => item.newsID !== itemId));
            } else {
                console.error('Failed to delete news item');
            }
        } catch (error) {
            console.error('Error deleting news item:', error);
        }
    };


    return (
        <div className='editPage-container'>
            <h1>Edit News</h1>
            <div className='editing-container'>
                <table className='library-table'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Text</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (console.log(item)))}
                    {items.map(item => (
                        <tr key={item.newsID}>
                            <td>{item.newsID}</td>
                            <td>{item.newsTitle}</td>
                            <td>{formatDate(item.date)}</td>
                            <td>{formatText(item.text)}</td>
                            <td>{item.imageUrl && <img src={item.imageUrl} alt={item.newsTitle} style={{ width: '100px', height: 'auto' }}/>}</td>
                            <td className='buttons-container'>
                                <Link to={`/editForm-news?itemId=${item.newsID}`}><button>Edit</button></Link>
                                <button onClick={() => handleDelete(item.newsID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};
export default EditNews;