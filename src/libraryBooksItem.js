import React, { useState } from "react";
import LibraryPopUp from './libraryBooksPopUp';
import { BASE_URL } from './config.js';

function LibraryItem({ id, name, image, author, description }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);

  const togglePopUp = () => {
    if (!showPopUp) {
      fetch(`${BASE_URL}/api/library/${id}`)
        .then(response => response.json())
        .then(data => {
          setBookDetails(data);
          setShowPopUp(true);
        })
        .catch(error => console.error('Error fetching book details:', error));
    } else {
      setShowPopUp(false);
    }
  }

  const normalizedImage = image.replace('./', '');
  const imageUrl = `${BASE_URL}/src${normalizedImage.startsWith('/') ? '' : '/'}${normalizedImage}`;

  return (
    <div className="libraryItem" onClick={togglePopUp}>
      <div className="libraryItem-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <h3>{name}</h3>
      <p>{author}</p>
      {showPopUp && bookDetails && (
        <LibraryPopUp
          name={bookDetails.title}
          image={imageUrl}
          author={bookDetails.author}
          description={bookDetails.description}
          onClose={togglePopUp}
        />
      )}
    </div>
  );
}

export default LibraryItem;