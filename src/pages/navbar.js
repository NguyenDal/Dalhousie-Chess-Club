import React, { useState } from 'react';
import '../styles/navbar.css';
import Logo from '../images/logo.png';
import Reorder from '../images/reorder.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function NavBar() {    
    const [showDropdowns, setShowDropdowns] = useState(false);
    const [showDropdownAbout, setShowDropdownAbout] = useState(false);
    const { user, logout } = useAuth();

    const toggleDropdowns = () => {
        setShowDropdowns(!showDropdowns);
    };
    const setShowDropdownsAbout = () => {    
        setShowDropdownAbout(!showDropdownAbout);
    }

    // Checking if the user is in mobile or desktop
    const [userIsDesktop, setUserIsDesktop] = useState(window.innerWidth > 650);
    const toggleWindowView = () => {
        window.innerWidth > 650 ? setUserIsDesktop(true) : setUserIsDesktop(false);
    }

    useEffect(() => {
        window.addEventListener('resize', toggleWindowView);
        return () => {
            window.removeEventListener('resize', toggleWindowView);
        }
    }, [userIsDesktop]);

    return (
        <div className="navbar">
            <Link to='/'><img src={ Logo } alt='Dal Chess Club Logo' /></Link>
            <button className='mobile-toggle' onClick={toggleDropdowns}>
                <img src={ Reorder } alt='reorder icon' className='icon' />
            </button>
            <h2>Dalhousie Chess Club</h2>
            <div className={`links ${showDropdowns ? 'show-dropdowns' : ''}`}>
                <div className='dropdown'>
                    <Link to='/'><button className='dropbtn'>Home</button></Link>
                </div>
                <div className='dropdown'>
                    <Link><button className='dropbtn'>Tournaments</button></Link>
                    <div className='dropdown-content'>
                        {userIsDesktop ? 
                            <>
                                <Link to='/tournaments'><button className='content'>Current and Future Tournaments</button></Link> 
                                <Link to='/pastTournaments'><button className='content'>Past Tournaments</button></Link>
                                <Link to='grandPrixPage'><button className='content'>Grand Prix</button></Link> 
                                <Link to='/usersChampions'><button className='content'>Champions</button></Link>
                                <Link to='/score-editForm'><button className='content'>Results</button></Link>
                            </>
                            : 
                            <>
                                <Link to='/tournaments'><button className='content'>Current and Future Tournaments</button></Link> 
                                <Link to='pastTournaments'><button className='content'>Past Tournaments</button></Link> 
                                <Link to='grandPrixPage'><button className='content'>Grand Prix</button></Link> 
                                <Link to='/usersChampions'><button className='content'>Champions</button></Link>
                                <Link to='/score-editForm'><button className='content'>Results</button></Link>
                            </>}
                    </div>
                </div>
                <div className='dropdown'>
                    <Link to='/news'><button className='dropbtn'>News</button></Link>
                </div>
                <div className='dropdown'>
                    <Link><button onClick={setShowDropdownsAbout} className='dropbtn'>About Us</button></Link>
                    {setShowDropdownsAbout && <div className='dropdown-content'>
                        <Link to='/about-us'><button className='content'>Our Members</button></Link>
                        <Link to='/faq'><button className='content'>FAQ</button></Link>
                        <Link to='/Constitutions'><button className='content'>Constitutions</button></Link>
                    </div>}
                </div>
                <div className='dropdown'>
                    <Link to='/chess-for-wellness'><button className='dropbtn'>Chess for Wellness</button></Link>
                </div>
                <div className='dropdown'>
                    <Link><button className='dropbtn' >Improve</button></Link>
                    <div className='dropdown-content'>
                        {userIsDesktop ? 
                            <>
                                <Link to='/improve'><button className='content'>Events</button></Link> 
                                <Link to='/library'><button className='content'>Library</button></Link> 
                                <Link to='/dailyTips'><button className='content'>Daily Tips</button></Link>
                            </>
                            : 
                            <>
                                <Link to='/improve'><button className='content'>Events</button></Link> 
                                <Link to='/library'><button className='content'>Library</button></Link>
                                <Link to='/dailyTips'><button className='content'>Daily Tips</button></Link>
                            </>}
                    </div>
                </div>
                <div className='dropdown'>
                    <Link to='/volunteer'><button className='dropbtn'>Get Involved</button></Link>
                </div>
                {user.isAuthenticated && (
                    <>
                        <div className='dropdown adminButtons'>
                            <Link to='/adminLanding'><button className='dropbtn adminButtons'>Admin Dashboard</button></Link>
                        </div>
                        <div className='dropdown adminButtons'>
                            <button className='dropbtn adminButtons' onClick={logout}>Logout</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default NavBar;