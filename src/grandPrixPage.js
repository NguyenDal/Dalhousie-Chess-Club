import React, { useState, useEffect } from "react";
import './styles/grandPrix.css';
import { BASE_URL } from "./config";

function GrandPrixPage() {
  const [grandPrixIframe, setGrandPrixIframe] = useState('');
  const itemId = 1; // Fetch data for id 1

  useEffect(() => {
    fetchData(itemId);
  }, []);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/grand-prix/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGrandPrixIframe(data.iframe_link); // Ensure this matches the key sent by your backend
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="randPrix-container">
      <div className="grandPrix-title">
        <h1>Grand Prix</h1>
          <div className="grandPrix-contents">
            <p>The Dalhousie Grand Prix is a points-based competition that rewards players for achieving multiple strong performances throughout the academic year. </p>
            <p> Out of 7 open tournaments hosted by the Dalhousie Chess Club, the best 4 results will count towards the final standings. </p> 
            <p>In the case of tied positions in the final standings, the player with the higher CFC rating will be given the higher position.</p>
            <p>In the case of tied positions in a tournament, the points will be evenly divided amongst the tied positions. </p>
          </div>
        <div className="grandPrix-table" dangerouslySetInnerHTML={{ __html: grandPrixIframe }}></div>
      </div>
    </div>
  );
}

export default GrandPrixPage;
