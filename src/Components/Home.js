import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Header from './Header';

export default function Home(props) {

    const [userVal, setUserVal] = useState(localStorage.getItem('userID') || '');
    const [showChange, setShowChange] = useState(false);

    // set the userID on form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        props.setUserID(userVal);
        localStorage.setItem('userID', userVal);
        setShowChange(false);
    }

    // update state on form change
    const handleChange = (e) => {
        setUserVal(e.target.value);
    }

    return (
        <div className='App'>
            <Header />
            <div className='home-content'>
                {!props.userID &&
                    <div className='home-form'>
                        <p>Who is taking stats?</p>
                        <form onSubmit={handleSubmit}>
                            <input className='home-input' type='text' value={userVal} onChange={handleChange} />
                            <button className='btn' type='submit'>Start</button>
                        </form>
                    </div>
                }
                {props.userID &&
                    <>
                        {!showChange &&
                            <>
                                <p>{`Welcome, ${props.userID}`}</p>
                                <p className='change-username-link'
                                    onClick={() => setShowChange(true)}
                                >Change Name</p>
                            </>}
                        {showChange &&
                            <form onSubmit={handleSubmit}>
                                <input className='home-input' type='text' value={userVal} onChange={handleChange} />
                                <button className='btn' type='submit'>Save</button>
                            </form>
                        }
                        <div className="home-btn-group">
                            <Link
                                className='btn'
                                to='/stats'>Stats
                            </Link>
                            <Link
                                className='btn'
                                to='/subs'>Subs
                            </Link>
                            <Link
                                className='btn'
                                to='/teams'>Teams
                            </Link>
                            <Link
                                className='btn'
                                to='/games'>Past Games
                            </Link>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
