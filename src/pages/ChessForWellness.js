import React from 'react';
import '../styles/ChessForWellness.css';
import chessForWellnessPage1 from '../images/chessForWellnessProposal-Page1.jpg';
import chessForWellnessPage2 from '../images/chessForWellnessProposal-Page2.jpg';

function ChessForWellness() {
    return (
        <div className="chess-for-wellness-page">
            <h1 className="chess-for-wellness-header">Chess for Wellness</h1>
            <p className="chess-for-wellness-intro">
            Chess for Wellness is a social initiative that has been launched by Dal Chess Club. 
            The club hosts weekly social events for Dalhousie students and chess lovers. However, 
            we recognize that some chess enthusiasts may not be able to access weekly socials for
            various reasons. As Chess for Wellness volunteers, we host boardgame social events at 
            local retirement homes and local organizations that foster community wellbeing and 
            mental health.
            </p>
            <div className="wellness-benefits">
                <h2>Benefits of Chess for Wellness</h2>
                <ul>
                    <li>Improves memory and cognitive skills</li>
                    <li>Boosts creativity and problem-solving abilities</li>
                    <li>Enhances concentration and focus</li>
                    <li>Reduces stress and anxiety</li>
                    <li>Helps in delaying dementia</li>
                </ul>
            </div>
            <div className="proposal-images">
                <img src={chessForWellnessPage1} alt="Chess for Wellness Proposal Page 1" />
                <img src={chessForWellnessPage2} alt="Chess for Wellness Proposal Page 2" />
            </div>
            <br></br>
            <br></br>
            <div id="chessforwellness-link">
                <a href='http://localhost:3000/chessclub/volunteer'><b>Register as a Volunteer</b></a>
            </div>
            <br></br>
            <br></br>
            <div id="chessforwellness-article-link">
                <a href='https://www.dal.ca/news/2024/03/15/chess-for-brains.html'>
                    <b>Chess for Brain - Dal News Article</b>
                </a>
            </div>
        </div>
    );
}

export default ChessForWellness;
