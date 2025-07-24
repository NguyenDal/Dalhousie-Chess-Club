import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/adminLanding.css';
import tournamentIcon from '../images/tournament.png';
import bookIcon from '../images/book.png';
import championIcon from '../images/championship.png';
import newsIcon from '../images/newspaper.png';
import trainerIcon from '../images/trainer.png';
import eventIcon from '../images/event.png';
import faqIcon from '../images/FAQ.png';
import aboutUsIcon from '../images/aboutUs.png';
import subscribersIcon from '../images/subscribe.jpg';
import grandPrixIcon from '../images/grandPrix.webp';
import tipsIcon from '../images/tips.jpg';
import scoreIcon from '../images/score.jpg';
import volunteerIcon from '../images/volunteer.jpg';
import sponsorIcon from '../images/sponsor.png';
import emailIcon from '../images/emails.png';
import constitutionIcon from '../images/constitution.png'; 
import participationIcon from '../images/participation.png';


const AdminLanding = () => {
    const [visibleDropdown, setVisibleDropdown] = useState(null);

    const toggleDropdown = (dropdown) => {
        setVisibleDropdown(visibleDropdown === dropdown ? null : dropdown);
    };

    const redirectLink = [
        { label: 'Add Tournament', to: '/Tournaments-AddForm', category: 'tournament' },
        { label: 'Edit Tournament', to: '/editTournaments', category: 'tournament' },
        { label: 'Add Book', to: '/Library-AddForm', category: 'book' },
        { label: 'Edit Books', to: '/editLibrary', category: 'book' },
        { label: 'Add News', to: '/News-AddForm', category: 'news' },
        { label: 'Edit News', to: '/editNews', category: 'news' },
        { label: 'Add Trainer', to: '/Trainers-AddForm', category: 'trainer' },
        { label: 'Edit Trainer', to: '/editTrainer', category: 'trainer' },
        { label: 'Add Event', to: '/Events-AddForm', category: 'event' },
        { label: 'Edit Event', to: '/editEvent', category: 'event' },
        { label: 'Add FAQ', to: '/FAQ-AddForm', category: 'FAQ' },
        { label: 'Edit FAQ', to: '/editFAQ', category: 'FAQ' },
        { label: 'Add About Us', to: '/AboutUs-AddForm', category: 'about Us' },
        { label: 'Edit About Us', to: '/editAbout', category: 'about Us' },
        { label: 'Add Champion', to: '/Champions-AddForm', category: 'champion' },
        { label: 'Edit Champion', to: '/champions', category: 'champion' },
        { label: 'Add Tips', to: '/tips-addForm', category: 'tips' },
        { label: 'Edit Tips', to: '/tips-editForm', category: 'tips' },
        { label: 'Add Score', to: '/score-addForm', category: 'score'},
        { label: 'Edit Score', to: '/score-editForm', category: 'score'},
        { label: 'Edit Volunteer', to: '/editVolunteer', category: 'volunteer'},
        { label: 'Edit DCC Execs', to: '/editDCCExecs', category: 'volunteer'},
        { label: 'Add Sponsor', to: '/sponsor-addForm', category: 'sponsor'},
        { label: 'Edit Sponsor', to: '/sponsor-editForm', category: 'sponsor'},
        { label: 'Add/Edit Email', to: '/EditEmails', category: 'email' },
        { label: 'Edit Constitution', to: '/editConstitution', category: 'constitution' },
        { label: 'Participant Approval', to: '/participant-approval', category: 'participantApproval' },
    ];

    const categorizedLinks = {
        tournament: redirectLink.filter(link => link.category === 'tournament'),
        book: redirectLink.filter(link => link.category === 'book'),
        news: redirectLink.filter(link => link.category === 'news'),
        trainer: redirectLink.filter(link => link.category === 'trainer'),
        event: redirectLink.filter(link => link.category === 'event'),
        FAQ: redirectLink.filter(link => link.category === 'FAQ'),
        'about Us': redirectLink.filter(link => link.category === 'about Us'),
        champion: redirectLink.filter(link => link.category === 'champion'),
        tips: redirectLink.filter(link => link.category === 'tips'),
        score: redirectLink.filter(link => link.category === 'score'),
        volunteer: redirectLink.filter(link => link.category === 'volunteer'),
        sponsor: redirectLink.filter(link => link.category === 'sponsor'),
        email: redirectLink.filter(link => link.category === 'email'),
        constitution: redirectLink.filter(link => link.category === 'constitution'),
        participantApproval: redirectLink.filter(link => link.category === 'participantApproval'),
    };

    const icons = {
        tournament: tournamentIcon,
        book: bookIcon,
        news: newsIcon,
        trainer: trainerIcon,
        event: eventIcon,
        FAQ: faqIcon,
        'about Us': aboutUsIcon,
        champion: championIcon,
        subscribers: subscribersIcon,
        grandPrix: grandPrixIcon,
        tips: tipsIcon,
        score: scoreIcon,
        volunteer: volunteerIcon,
        sponsor: sponsorIcon,
        email: emailIcon,
        constitution: constitutionIcon,
        participantApproval: participationIcon
    };


    return (
        <div className="admin-page">
            <h1>Welcome!</h1>
            <div className='admin-button-container-row1'>
                {['tournament', 'score', 'book', 'news', 'trainer'].map((category, index) => (
                    <div
                        key={index}
                        className="admin-dropdown"
                        onMouseLeave={() => setVisibleDropdown(null)}
                    >
                        <button
                            className={`admin-dropdown-button ${category}`}
                            onClick={() => toggleDropdown(category)}
                        >
                            <span className="label">{category.charAt(0).toUpperCase() + category.slice(1)} Options</span>
                            <img src={icons[category]} alt={`${category} icon`} className="icon" />
                        </button>
                        {visibleDropdown === category && (
                            <div className="admin-dropdown-content admin-show">
                                {categorizedLinks[category].map((link, index) => (
                                    <Link key={index} className='admin-dropdown-link' to={link.to}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='admin-button-container-row2'>
                {['event', 'FAQ', 'about Us', 'volunteer', 'sponsor', 'champion', 'tips', 'email', 'constitution', 'participantApproval'].map((category, index) => (
                    <div
                        key={index}
                        className="admin-dropdown"
                        onMouseLeave={() => setVisibleDropdown(null)}
                    >
                        <button
                            className={`admin-dropdown-button ${category}`}
                            onClick={() => toggleDropdown(category)}
                        >
                            <span className="label">{ category.charAt(0).toUpperCase() + category.slice(1)} </span>
                            <img src={icons[category]} alt={`${category} icon`} className="icon" />
                        </button>
                        {visibleDropdown === category && (
                            <div className="admin-dropdown-content admin-show">
                                {categorizedLinks[category].map((link, index) => (
                                    <Link key={index} className='admin-dropdown-link' to={link.to}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                
            <div className="admin-dropdown">
                <Link to="/subscribers" className={`admin-dropdown-button subscribers`}>
                    <span className="label">Subscribers</span>
                    <img src={icons.subscribers} alt="subscribers icon" className="icon" />
                </Link>
            </div>
            <div className="admin-dropdown">
                <Link to="/grandPrixForm" className={`admin-dropdown-button grandPrix`}>
                    <span className="label">Grand Prix</span>
                    <img src={icons.grandPrix} alt="grandPrix icon" className="icon" />
                </Link>
            </div>
                
            </div>
        </div>
    );
};

export default AdminLanding;
