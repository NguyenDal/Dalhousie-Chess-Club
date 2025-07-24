import React, { useState, useEffect } from 'react';
import '../styles/dailyTips.css';
import { BASE_URL } from '../config.js';

const Tip = ({ title, description, image_link }) => {
    const imageUrl = image_link ? `${BASE_URL}${image_link}` : '';

    return (
        <div className="tip-content">
            <div className="tip-text">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {imageUrl && <img src={imageUrl} alt={title} className="tip-image" />}
        </div>
    );
};

function DailyTips() {
    const [openingTips, setOpeningTips] = useState([]);
    const [middleGameTips, setMiddleGameTips] = useState([]);
    const [endgameTips, setEndgameTips] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    const fetchTips = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/tips`);
            const data = await response.json();
            setOpeningTips(data.filter(tip => tip.type.toLowerCase() === 'opening'));
            setMiddleGameTips(data.filter(tip => tip.type.toLowerCase() === 'middle game'));
            setEndgameTips(data.filter(tip => tip.type.toLowerCase() === 'endgame'));
        } catch (error) {
            console.error('Error fetching tips:', error);
        }
    };

    useEffect(() => {
        fetchTips();
    }, []);

    const getTipOfTheDay = (tipsArray) => {
        if (tipsArray.length === 0) return null;
        const day = currentDate.getDate();
        const index = day % tipsArray.length;
        return tipsArray[index];
    };

    const getRandomTipType = () => {
        const types = ['opening', 'middle game', 'endgame'];
        const day = currentDate.getDate();
        const index = day % types.length;
        return types[index];
    };

    const selectedTipType = getRandomTipType();
    const selectedTip = selectedTipType === 'opening' ? getTipOfTheDay(openingTips) :
                        selectedTipType === 'middle game' ? getTipOfTheDay(middleGameTips) :
                        getTipOfTheDay(endgameTips);

    const getIntroText = (type) => {
        switch (type.toLowerCase()) {
            case 'opening':
                return "Mastering the art of the opening is a vital first step towards chess mastery. A strong opening sets the tone for the entire game, helping you establish control, develop your pieces effectively, and ensure the safety of your king.";
            case 'middle game':
                return "Transitioning to the middle game, the real strategic battle unfolds. It's not just about moving pieces; it's about launching a well-coordinated attack while maintaining a solid defense.";
            case 'endgame':
                return "The endgame is where chess matches are won or lost. It's a high-stakes phase where every move can make the difference between a resounding victory or a bitter defeat.";
            default:
                return "";
        }
    };

    return (
        <div className="daily-tips-page">
            <h1 className="daily-tips-header">Daily Chess Tips</h1>
            <p className="daily-tips-intro">Welcome to the Daily Chess Tips page! Use the valuable tips below to enhance your strategies for the opening, middle game, and endgame.</p>
            <p className="daily-tips-intro">The tips are updated every 24 hours, so be sure to check back daily for new insights to improve your chess game.</p>
            <div className="tips-container">
                {selectedTip && (
                    <div className="tip-container">
                        <div className="type-intro-box">
                            <p><strong>{selectedTip.type}:</strong> {getIntroText(selectedTip.type)}</p>
                        </div>
                        <div className="tip-content-wrapper">
                            <Tip {...selectedTip} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DailyTips;






