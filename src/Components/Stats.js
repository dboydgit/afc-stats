import React from 'react'
import GameSetup from './GameSetup';
import '../styles/Stats.css';

export default function Stats(props) {

    // show warning on page reload attempt
    window.onbeforeunload = () => {
        return 'Reloading will delete any ongoing game...'
    }

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
                    <p>{`${props.gameLength} minute game between`}</p>
                    <p>{`${props.darkTeam} (Dark) vs ${props.lightTeam} (Light)`}</p>
                    <p>{`Taking stats for ${props.statTeam}`}</p>
                    <p>{`${props.statTeam} starting on 
                        ${props.offence ? 'Offence' : 'Defence'}`}</p>
                </div>}
            </div>
        </div>
    )
}
