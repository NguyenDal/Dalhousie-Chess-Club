import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/volunteer.css';
import { BASE_URL } from '../config.js';

const VolunteerForm = ({ title, description, formLink, buttonText = "Apply Now" }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(formLink);
    };

    return (
        <div className="volunteer-content">
            <div className="volunteer-text">
                <h2>{title}</h2>
                <p>{description}</p>
                <button onClick={handleNavigation}><b>{buttonText}</b></button>
            </div>
        </div>
    );
};

function VolunteerPage() {
    const [volunteerOptions, setVolunteerOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchVolunteerOptions = async () => {
        try {
            const data = [
                {
                    title: "Volunteer",
                    description: "Join us as a volunteer and contribute to exciting events and community initiatives.",
                    formLink: '/volunteerForm'
                },
                {
                    title: "Dal Chess Club Exec",
                    description: "Become a member of the Dal Chess Club Executive Team. Help organize tournaments and events.",
                    formLink: '/execForm'
                },
                {
                    title: "Club Member",
                    description: "Get involved as a club member and participate in our exciting events and activities. Join the community and connect with others.",
                    formLink: '/eventInfo',  // Link to your events page
                    buttonText: "View Events & Join"
                }
            ];
            setVolunteerOptions(data);
            setLoading(false);
        } catch (error) {
            setError('Failed to load volunteer options');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVolunteerOptions();
    }, []);

    if (loading) return <p>Loading opportunities...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="volunteer-page">
            <h1 className="volunteer-header">Get Involved</h1>
            <p className="volunteer-intro">
                Get involved with our club! Whether you want to volunteer, join the exec team, or become a member, your contribution makes a difference.
            </p>
            <div className="volunteer-options">
                {volunteerOptions.map(option => (
                    <VolunteerForm
                        key={option.title}
                        title={option.title}
                        description={option.description}
                        formLink={option.formLink}
                        buttonText={option.buttonText}
                    />
                ))}
            </div>
        </div>
    );
}

export default VolunteerPage;
