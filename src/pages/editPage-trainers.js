import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/editPage.css';
import { Link } from 'react-router-dom';
import {BASE_URL} from "../config.js";


function EditTrainer() {

    const [items, setItems] = useState([
        {speakerID: 1, name: 'name 1', speciality: 'speciality 1', bio:'bio 1', people_imageID: 1 },
        {speakerID: 2, name: 'name 2', speciality: 'speciality 2', bio:'bio 2', people_imageID: 2 },
        {speakerID: 3, name: 'name 3', speciality: 'speciality 3', bio:'bio 3', people_imageID: 3 },
        {speakerID: 4, name: 'name 4', speciality: 'speciality 4', bio:'bio 4', people_imageID: 4 },
    ]);

    useEffect(()=>{
        fetchData();
    }, [])

    const fetchData = async () => {
        try{
            const response = await fetch(`${BASE_URL}/api/speaker`);
            console.log(response);
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data = await response.json();
            console.log(data);
            setItems(data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`${BASE_URL}/api/speaker/delete/${itemId}`, {
                method: 'DELETE'
            });

            const result = await response.json();
            if (result) {
                console.log(result);
                setItems(currentItems => currentItems.filter(item => item.speakerID !== itemId));
            } else {
                console.error('Failed to delete trainer');
            }
        } catch (error) {
            console.error('Error deleting trainer:', error);
        }
    };

    return (
        <div className='editPage-container'>
            <h1>Edit Trainers</h1>
            <div className='editing-container'>
                <table className='library-table'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Speciality</th>
                        <th>Bio</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.speakerID}>
                            <td>{item.speakerID}</td>
                            <td>{item.name}</td>
                            <td>{item.speciality}</td>
                            <td>{item.bio}</td>
                            <td>{item.people_imageID}</td>
                            <td className='buttons-container'>
                                <Link to={`/editForm-trainers?itemId=${item.speakerID}`}>
                                    <button>Edit</button>
                                </Link>
                                <button onClick={() => handleDelete(item.speakerID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    );

};

export default EditTrainer;