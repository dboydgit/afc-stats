import React from 'react'
import GameSetup from './GameSetup';
import '../styles/Stats.css';

export default function Stats(props) {

    return (
        <div className='App'>
            <div className='stats'>
                {props.showSetup &&
                <GameSetup 
                    teams={props.teams}
                    finishSetup={props.finishSetup}
                />}
                {!props.showSetup &&
                <div>
                    <h1>Taking Stats...</h1>
                </div>}
            </div>
        </div>
    )
}
