import React from 'react'
import { CSVLink } from 'react-csv';
import '../styles/GameList.css';

const GameList = (props) => {
    const games = props.games.map((game) => {
        let gameDate = new Date(game.date);
        let fileName = `${gameDate.getFullYear()}-${gameDate.getMonth()+1}-${gameDate.getDay()}-${game.darkTeam}-vs-${game.lightTeam}-${game.statTaker}.csv`
        return (
            <div key={game.date} className='card'>
                <div className='game-info'>
                    <span>{new Date(game.date).toDateString()}</span>
                    <span>{`Stat Taker: ${game.statTaker}`}</span>
                </div>
                <div className='game-info'>
                    <span>{`Stats For: ${game.statTeam}`}</span>
                    {game.testGame && <span className='test-game'>Test Game</span>}
                </div>
                <p>{`Final Score`}</p>
                <span>{`${game.lightTeam} - ${game.score.light}`}</span>
                <span>{`${game.darkTeam} - ${game.score.dark}`}</span>
                <CSVLink
                    data={game.gameHistory}
                    filename={fileName}
                    target='_blank'
                >Download Game CSV</CSVLink>
            </div>
        )
    }
    )
    return <div className='team-list'>{games}</div>
}

export default function Games(props) {
    return (
        <div className='App'>
            <h1>Recorded Games</h1>
            <GameList games={props.allGameHistory} />
        </div>
    )
}
