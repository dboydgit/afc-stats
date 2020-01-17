import React, {useState} from 'react'
import GameSetup from './GameSetup';
import '../styles/Stats.css';

export default function Stats(props) {

    const [gameLength, setGameLength] = useState(25);
    const [darkTeam, setDarkTeam] = useState('');
    const [lightTeam, setLightTeam] = useState('');
    const [gameHistory, setGameHistory] = useState([]);
    const [showSetup, setShowSetup] = useState(true);
    const [statTeam, setStatTeam] = useState('');
    const [offence, setOffence] = useState(true);

    const finishSetup = (time, dark, light, statTeam, offence) => {
        setGameLength(parseInt(time));
        setDarkTeam(dark);
        setLightTeam(light);
        setStatTeam(statTeam);
        setOffence(offence);
        setShowSetup(false);
    }

    return (
        <div className='App'>
            <div className='stats'>
                {showSetup &&
                <GameSetup 
                    teams={props.teams}
                    finishSetup={finishSetup}
                />}
                {!showSetup &&
                <div>
                    <h1>Taking Stats...</h1>
                </div>}
            </div>
        </div>
    )
}
