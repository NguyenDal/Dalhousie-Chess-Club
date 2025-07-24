import React from 'react';
import '../styles/forgotPassword.css'; // Reusing the same CSS for consistency

function DalhousieOpenRegistration() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Registration Submitted!');
  };

  return (
    <div className="forgotPassword-container">
      <div className="forgotPassword-header">
        <h1>2023 Dalhousie Open Registration</h1>
        <p>Please fill out this form if you are interested in participating in the upcoming tournament.</p> 
        <p>The survey will take approximately 5 minutes or less to complete.</p>
      </div>
      <form className="emailFormDiv" onSubmit={handleSubmit}>
        <label>Do you have an active (non-expired) CFC membership? You MUST have one to play in the tournament. If you are not a member, please purchase a membership online in the CFC website, in this link:<a href="https://www.chess.ca/en/players/membership-join/" target='_blank'>https://www.chess.ca/en/players/membership-join/</a></label>
        <div className='emailFormDiv'>
          <input type="radio" name="cfcMembership" value="yes" /> Yes
          <input type="radio" name="cfcMembership" value="no" /> No
        </div>

        <input type="text" name="name" className="emailText-form" placeholder="What is your name?" required />
        <input type="email" name="email" className="emailText-form" placeholder="What is your email address?" required />
        <input type="text" name="cfcId" className="emailText-form" placeholder="Please state your CFC ID." required />
        <input type="text" name="cfcRating" className="emailText-form" placeholder="Please state your CFC rating. If you are unrated, please state 'unrated'." required />
        <input type="text" name="cfcExpiry" className="emailText-form" placeholder="What is your CFC membership expiry date?" required />

        <label>You can request up to 2 half-point byes. If you don't need a bye, please leave it blank.</label>
        <div className='emailFormDiv'>
          <input type="checkbox" name="byeOptions" value="Round 1" /> Round 1
          <input type="checkbox" name="byeOptions" value="Round 2" /> Round 2
          <input type="checkbox" name="byeOptions" value="Round 3" /> Round 3
          <input type="checkbox" name="byeOptions" value="Round 4" /> Round 4
          <input type="checkbox" name="byeOptions" value="Round 5" /> Round 5 (this will be a 0 point bye)
        </div>

        <label>Would you like to be added to the email list, so that we can inform you better on upcoming tournaments and events?</label>
        <div className='emailFormDiv'>
          <input type="radio" name="emailList" value="yes" /> Yes
          <input type="radio" name="emailList" value="no" /> No
          <input type="radio" name="emailList" value="already" /> I'm already on the list
        </div>

        <div className="reset-submit-container">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="subscriptionMessage-container">
        <p>Want news about tournaments, events, socials or open positions?</p>
        <p>Subsribe to our mailing list!</p>
      </div>
      <div className="subscribe-button-container">
        <a href="mailingList">
          <button>Subscribe</button>
        </a>
      </div>
    </div>
  );
}

export default DalhousieOpenRegistration;

