import React, { useState } from 'react';


export default function GameInfo(props) {

    const [paused, setPaused] = useState(false);

    return (
        <div className='game-info'>
            <div className='score-card dark'>
                <span id='team-name'>{props.darkTeam}</span>
                <span className='score dark'>{props.score.dark}</span>
            </div>
            <div className='game-clock'>
                <span>{`${props.gameTime}`}</span>
                <div className='timer-controls'>
                    <i className='material-icons timer-control'
                        onClick={() => {
                            props.startTimer();
                            setPaused(false);
                            console.log('start timer')
                        }}>play_arrow</i>
                    {!paused && <i className='material-icons timer-control'
                        onClick={() => {
                            props.pauseTimer();
                            setPaused(true);
                            console.log('pause timer')
                        }}>pause</i>}
                    {paused && <i className='material-icons timer-control'
                        onClick={() => {
                            props.resetTimer();
                            props.pauseTimer();
                            setPaused(false);
                            console.log('reset timer')
                        }}>replay</i>}
                </div>
            </div>
            <div className='score-card light'>
                <span id='team-name'>{props.lightTeam}</span>
                <span className='score light'>{props.score.light}</span>
            </div>
        </div>
    )
}
