import React, { useState, useEffect } from 'react';
import '../styles/chess-puzzle.css';

const ChessPuzzle = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://chesspuzzle.net/Daily/Api');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching puzzle data:', error);
      }
    };

    fetchData();
  }, []);

 return (
  <div className='puzzle'>
    {data && (
      <div>
        <a href={data.Link} target='_blank' rel='noopener noreferrer'>
          <img src={data.Image} alt='Daily Chess Puzzle' />
        </a>
        <p>{data.Text}</p>
      </div>
    )}
  </div>
);
};

export default ChessPuzzle;