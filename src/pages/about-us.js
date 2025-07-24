import React, { useState, useEffect } from 'react';
import '../styles/about-us.css';
import { BASE_URL} from '../config.js';

const Member = ({ memberId, position, bio, imageUrl }) => (
  <div className="member">
    <h2 className="position">{position}</h2>
    <div className='member-info'>
      <img
        src={imageUrl}
        alt={`Image of ${position}`}
        className="members-placeholder"
      />
      <p>{bio}</p>
    </div>
  </div>
);

function AboutUsPage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch members from API
    fetch(`${BASE_URL}/api/about-us/getMembers`)
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error("Error fetching members:", err));
  }, []);

  return (
    <div className="container">
      <div className="about-us">
        <h1>Our Members</h1>
        {/*<p id="members-p">Introductory paragraph about the team members...</p>*/}
      </div>
      {members.map(member => (
        <Member key={member.memberId} {...member} />
      ))}
      <div id="other-info-section">
        {/* Other sections like 'Who Are We?' and 'Our History' */}
      </div>
    </div>
  );
}

export default AboutUsPage;