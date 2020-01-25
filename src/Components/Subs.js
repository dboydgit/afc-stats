import React from 'react';
import GameSetup from './GameSetup';
import GameInfo from './GameInfo';

export default function Subs(props) {
    return (
        <div className='App'>
            {!props.showStatSetup && 
            <p>Currently tracking Stats.</p>}
            {props.showStatSetup && props.showSubSetup &&
                <GameSetup
                    teams={props.teams}
                    finishSetup={props.finishSetup}
                    setTestGame={props.setTestGame}
                    forStats={false}
                />}
            {props.showStatSetup && !props.showSubSetup &&
                <div className='game-stats'>
                    <GameInfo
                        darkTeam={props.darkTeam}
                        lightTeam={props.lightTeam}
                        gameTime={props.gameTime}
                        gameLength={props.gameLength}
                        startTimer={props.startTimer}
                        pauseTimer={props.pauseTimer}
                        resetTimer={props.resetTimer}
                        paused={props.paused}
                        setPaused={props.setPaused} 
                        forStats={false}
                    />
                    <p>Setup complete!</p>
                </div>}
        </div>
    )
}