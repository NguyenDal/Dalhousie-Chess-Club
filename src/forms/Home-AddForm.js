import React, { useState } from 'react';
import '../styles/AddForms.css';

function HomeAddForm() {
 const [homeImage, setHomeImage] = useState('');
 const [homeText, setHomeText] = useState('');
 const [homeOtherContent, sethomeOtherContent] = useState('');

 const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const formData = {
      homeImage: 1,
      homeText: homeText,
      homeOtherContent: homeOtherContent
    };


    const response = await fetch('/api/home/add', { // change the path if the ports are not same (yet to decide)
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });


    const result = await response.json();
    if (result) {
      console.log(result);
    } else {
      console.error('Failed to add member');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">Home Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "Home" page.</p>
      </div>

       <form onSubmit={handleSubmit} className="form-combined"></form>

      <label>Image</label>
       <input
         className="file-form"
         type="file"
         accept='image/*'
         value={homeImage}
         onChange={(e) => setHomeImage(e.target.value)}
         required
       />

      <label>Text</label>
       <input
         className="text-form"
         type="text"
         value={homeText}
         onChange={(e) => setHomeText(e.target.value)}
         required
       />

      <label>Other content</label>
       <input
         className="text-form-c"
         type="text"
         value={homeOtherContent}
         onChange={(e) => sethomeOtherContent(e.target.value)}
         required
       />

      <div className="submit-button-container">
        <button type="submit">Submit</button>
      </div>

    </div>
  )
}

export default HomeAddForm;