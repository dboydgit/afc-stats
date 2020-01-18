import React from 'react'

export default function GameInfo(props) {
    return (
        <div className='game-info'>
            <div className='score-card dark'>
                <span id='team-name'>{props.darkTeam}</span>
                <span className='score dark'>{props.score.dark}</span>
            </div>
            <div className='game-clock'>
                <span>{`${props.gameTime}`}</span>
            </div>
            <div className='score-card light'>
                <span id='team-name'>{props.lightTeam}</span>
                <span className='score light'>{props.score.light}</span>
            </div>
        </div>
    )
}
