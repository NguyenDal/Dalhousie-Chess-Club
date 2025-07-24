import React, { useState, useEffect } from 'react';
import LibraryItem from '../libraryBooksItem';
import '../styles/library.css';
import { BASE_URL } from '../config.js';

function Library() {
  const [libraryList, setLibraryList] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/library`)
      .then(response => response.json())
      .then(data => {
        setLibraryList(data);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="library">
      {/* Add the message here */}
      <div className="library-message">
        <strong>To borrow a book, please email</strong>  <a href="mailto:chess@dal.ca">chess@dal.ca</a>.
      </div>
      <h1>Library Books List</h1>
      <div className="libraryList">
        {libraryList.map((libraryItem, index) => (
          <LibraryItem
            key={index}
            id={libraryItem.booksID}
            name={libraryItem.title}
            image={libraryItem.image}
            author={libraryItem.author}
            description={libraryItem.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;