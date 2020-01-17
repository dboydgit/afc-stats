import React, { useState } from 'react';
import '../styles/GameSetup.css';

export default function GameSetup(props) {

    const [time, setTime] = useState('25');
    const [dark, setDark] = useState('');
    const [light, setLight] = useState('');
    const [statTeam, setStatTeam] = useState('');
    const [offence, setOffence] = useState('');
    const [error, setError] = useState('');

    let teamNames = [<option value='' key=''></option>];
    for (let team of props.teams) {
        teamNames.push(<option value={team.name} key={team.name}>{team.name}</option>);
    }

    const submitFinish = (e) => {
        e.preventDefault();
        if (!dark || !light || !statTeam || !offence) {
            setError('Please choose all options');
            return;
        }
        let offenceBool;
        statTeam === offence ? offenceBool = true : offenceBool = false;
        props.finishSetup(time, dark, light, statTeam, offenceBool);
    }

    return (
        <div className='game-setup card'>
            <h3 id='setup-title'>Game Setup</h3>
            <label htmlFor='game-length'>Game Length (mins)</label>
            <input name='game-length' type='number' min='1' max='120'
                value={time} onChange={(e) => setTime(e.target.value)} />
            <label htmlFor='dark-team'>Select Dark Team</label>
            <select name='dark-team' value={dark}
                onChange={(e) => setDark(e.target.value)}>{teamNames}</select>
            <label htmlFor='light-team'>Select Light Team</label>
            <select name='light-team' value={light}
                onChange={(e) => setLight(e.target.value)}>{teamNames}</select>
                     
            <label htmlFor='stat-team'>Taking Stats For</label>
            <select name='stat-team' value={statTeam}
                onChange={(e) => setStatTeam(e.target.value)}>
                <option></option>
                <option>{`${dark} (dark)`}</option>
                <option>{`${light} (light)`}</option>
            </select>
            <label htmlFor='offence-team'>Team on Offence</label>
            <select name='offence-team' value={offence}
                onChange={(e) => setOffence(e.target.value)}>
                <option></option>
                <option>{`${dark} (dark)`}</option>
                <option>{`${light} (light)`}</option>
            </select>
            <button className='btn' onClick={submitFinish}>Finish Setup</button>
            {error &&
                <span className='form-err'>{error}</span>}   
        </div>
    )
}
