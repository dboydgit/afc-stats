import React from 'react';
import GameSetup from './GameSetup';
import GameInfo from './GameInfo';
import '../styles/Stats.css';

export default function Stats(props) {

    // show warning on page reload attempt *comment out for testing
    // window.onbeforeunload = () => {
    //     return 'Reloading will delete any ongoing game...'
    // }

    return (
        <div className='App'>
            <div className='stats'>
                {props.showSetup &&
                <GameSetup 
                    teams={props.teams}
                    finishSetup={props.finishSetup}
                />                }
                {!props.showSetup &&
                <div className='game-stats'>
                    <GameInfo 
                        darkTeam={props.darkTeam}
                        lightTeam={props.lightTeam}
                        score={props.score}
                        gameTime={props.gameTime}
                        gameLength={props.gameLength}
                        startTimer={props.startTimer}
                        pauseTimer={props.pauseTimer}
                        resetTimer={props.resetTimer}
                        paused={props.paused}
                        setPaused={props.setPaused}
                    />
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
