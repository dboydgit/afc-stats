import React from 'react'
import '../styles/Subs.css';
import { timeToMinSec, timeOnPoint } from '../utils/timeUtils';

export default function SubPlayerList(props) {

    const subStats = props.subStats;

    const list = subStats.map((player, ind) =>
        <div key={player.name} className='player-input sub-player'>
            <div
                className={`player-name sub-name ${props.darkTeam === props.statTeam ? 'dark' : ''}`}
            >
                <span className='player-text'>{player.name}</span>
                {ind < 4 ?
                    <span>{`Point: ${player.lastTimeIn ? timeOnPoint(player.lastTimeIn, props.gameTime) : '0:00'}`}</span> :
                    <span>{`Total: ${timeToMinSec(player.timeOnField)}`}</span>}
            </div>
            {ind < 4 &&
                <button
                    className={`btn sub-btn ${props.subPlayerSelected === player.name ? 'btn-sec' : ''}`}
                    onClick={() => props.handleOut(player)}

                >Sub Out</button>}
            {ind >= 4 &&
                <button
                    className={`btn sub-btn ${props.subPlayerSelected === player.name ? 'btn-sec' : ''}`}
                    onClick={() => props.handleIn(player)}>Sub In</button>}
        </div>
    )
    return (
        <>
            <div className='player-list sub-list'>{list}</div>
        </>
    )
}
