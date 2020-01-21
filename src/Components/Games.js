import React, { useState } from 'react'
import { CSVLink } from 'react-csv';
import '../styles/GameList.css';

const GameCard = (props) => {

    const [showStats, setShowStats] = useState(false);

    let gameDate = new Date(props.game.date);
    let fileName = `${gameDate.getFullYear()}-${gameDate.getMonth() + 1}-${gameDate.getDay()}-${props.game.darkTeam}-vs-${props.game.lightTeam}-GAME-${props.game.statTeam}.csv`
    let statFileName = `${gameDate.getFullYear()}-${gameDate.getMonth() + 1}-${gameDate.getDay()}-${props.game.darkTeam}-vs-${props.game.lightTeam}-STATS-${props.game.statTeam}.csv`
    
    const toggleShowStats = () => setShowStats(!showStats);
    const statHeaders = [
        {label: 'Name', key: 'name'},
        {label: 'Touches', key: 'Touch'},
        {label: 'Points', key: 'Point'},
        {label: 'Assists', key: 'Assist'},
        {label: 'D-Plays', key: 'D-Play'},
        {label: 'Drops', key: 'Drop'},
        {label: 'Throwaways', key: 'T-Away'},
        {label: 'GSO', key: 'GSO'},
        {label: 'GSO-Mark', key: 'GSO-Mark'},
    ]

    return (
        <div className='card game-list-card'>
            <div className='game-list-info'>
                <span>{new Date(props.game.date).toDateString()}</span>
                <span>{`Stat Taker: ${props.game.statTaker}`}</span>
            </div>
            <div className='game-list-info'>
                <span>{`Stats For: ${props.game.statTeam}`}</span>
                {props.game.testGame && <span className='test-game'>Test Game</span>}
            </div>
            <div className='game-score'>
                <div className='score-card dark'>
                    <span id='team-name'>{props.game.darkTeam}</span>
                    <span className='score dark'>{props.game.score.dark}</span>
                </div>
                <div className='score-card light'>
                    <span id='team-name'>{props.game.lightTeam}</span>
                    <span className='score light'>{props.game.score.light}</span>
                </div>
            </div>
            <div className='game-list-btns'>
                <CSVLink
                    className='btn game-list-btn'
                    data={props.game.gameHistory}
                    filename={fileName}
                    target='_blank'
                >
                    Game CSV
                    <i className="material-icons md-18">get_app</i>
                </CSVLink>
                <CSVLink
                    className='btn game-list-btn'
                    data={props.game.playerStats}
                    headers={statHeaders}
                    filename={statFileName}
                    target='_blank'
                >
                    Stats CSV
                    <i className="material-icons md-18">get_app</i></CSVLink>
                {!showStats && <button
                    className='btn game-list-btn'
                    onClick={toggleShowStats}
                >
                    Show Stats<i className="material-icons md-18">arrow_drop_down</i>
                </button>}
                {showStats && <button
                    className='btn game-list-btn'
                    onClick={toggleShowStats}
                >
                    Hide Stats<i className="material-icons md-18">arrow_drop_up</i>
                </button>}
            </div>
            {showStats &&
                <p>game stats here</p>
            }
        </div>
    )
}

const GameList = (props) => {
    const games = props.games.map((game) =>
        <GameCard key={game.date} game={game} />
    )
    return <div className='team-list'>{games}</div>
}

export default function Games(props) {
    return (
        <div className='App'>
            <h1 className='page-header'>Recorded Games</h1>
            <GameList games={props.allGameHistory} />
        </div>
    )
}
