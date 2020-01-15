import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Home.css';
import Header from './Header';

export default function Home(props) {

    let history = useHistory();

    const [userVal, setUserVal] = useState('');

    // set the userID on form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        props.setUserID(userVal);
        localStorage.setItem('userID', userVal);
    }

    // update state on form change
    const handleChange = (e) => {
        setUserVal(e.target.value);
    }

    // go to page name
    const goToPage = (e) => {
        history.push(e.target.name);
    }

    return (
        <div className='App'>
            <Header />
            <div className='home-content'>
                {!props.userID &&
                    <div className='home-form'>
                        <p>Who is taking stats?</p>
                        <form onSubmit={handleSubmit}>
                            <input id='home-input' type='text' value={userVal} onChange={handleChange} />
                            <button className='btn' type='submit'>Start</button>
                        </form>
                    </div>
                }
                {props.userID &&
                    <div>
                        <p>{`Welcome, ${props.userID}`}</p>
                        <div className="home-btn-group">
                            <button
                                className='btn'
                                name='/stats'
                                onClick={goToPage}>New Game</button>
                            <button
                                className='btn'
                                name='/teams'
                                onClick={goToPage}>Teams</button>
                            <button
                                className='btn'
                                name='/games'
                                onClick={goToPage}>Past Games</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
