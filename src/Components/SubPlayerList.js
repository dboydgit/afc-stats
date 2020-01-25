import React, { useState } from 'react'
import '../styles/Subs.css';
import { toast } from 'react-toastify';

export default function SubPlayerList(props) {

    const [inSelected, setInSelected] = useState(false);
    const [outSelected, setOutSelected] = useState(false);
    const [playerSelected, setPlayerSelected] = useState('');

    const subStats = props.subStats;
    const setSubStats = props.setSubStats;

    const timeToMinSec = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds - (mins * 60);
        return `${mins.toString()}:${secs.toString().padStart(2, 0)}`
    }

    const completeSub = () => {
        setInSelected(false);
        setOutSelected(false);
        setPlayerSelected('')
    }

    const handleOut = (player) => {
        if (outSelected) {
            toast.error('Complete last sub before choosing another player');
            return;
        }
        console.log(`${player.name} subbing out`);
        setPlayerSelected(player.name);
        setOutSelected(true);
        if (inSelected) {
            completeSub()
        }
    }

    const handleIn = (player) => {
        if (inSelected) {
            toast.error('Complete last sub before choosing another player');
            return;
        }
        console.log(`${player.name} subbing in`)
        setPlayerSelected(player.name);
        setInSelected(true);
        if (outSelected) {
            completeSub()
        }
    }

    const list = subStats.map((player, ind) =>
        <div key={player.name} className='player-input sub-player'>
            <div
                className={`player-name sub-name ${props.darkTeam === props.statTeam ? 'dark' : ''}`}
            >
                <span className='player-text'>{player.name}</span>
                <span>{timeToMinSec(player.timeOnField)}</span>

            </div>
            {ind < 4 &&
                <button
                className={`btn sub-btn ${outSelected && playerSelected !== player.name ? 'btn-inactive' : ''} ${playerSelected === player.name ? 'btn-sec' : ''}`}
                    onClick={() => handleOut(player)}
                    
                >Sub Out</button>}
            {ind >= 4 &&
                <button
                    className={`btn sub-btn ${inSelected && playerSelected !== player.name ? 'btn-inactive' : ''} ${playerSelected === player.name ? 'btn-sec' : ''}`}
                    onClick={() => handleIn(player)}>Sub In</button>}
        </div>
    )
    return (
        <>
            <div className='player-list sub-list'>{list}</div>
        </>
    )
}
