import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './styles/tournamentSearch.css'

export const TournamentSearch = ({setResults}) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
            // Filter the json data to match the input value
            const filteredResults = json.filter(user => {
                return (
                    user.name.toLowerCase().includes(value.toLowerCase())
                );
            }
                
            );
            setResults(filteredResults);
        });
    };
    

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

  return (
    <div className='input-wrapper'>
        <FontAwesomeIcon icon={faSearch} id="search-icon" />
        <input placeholder='Type to search...' 
        value={input} 
        onChange={(e) => handleChange(e.target.value)}/>
    </div>
  );
}
