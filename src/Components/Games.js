import React, { useState } from 'react'
import { CSVLink } from 'react-csv';
import '../styles/GameList.css';
import StatTable from './StatTable';
import { toast } from 'react-toastify';

const DelToast = (props) => (
    <>
        <span>Game Deleted...</span>
        <button
            className='btn toast-btn'
            onClick={() => {
                props.toggleDeleteGame(props.game.date);
                props.closeToast();
            }}
        >
            Undo<i className='material-icons md-18'>undo</i>
        </button>
    </>
)

const GameCard = (props) => {

    const [showStats, setShowStats] = useState(false);

    let game = props.game;
    let gameDate = new Date(game.date);
    let fileName = `${gameDate.getFullYear()}-${gameDate.getMonth() + 1}-${gameDate.getDay()}-${game.darkTeam}-vs-${game.lightTeam}-GAME-${game.statTeam}.csv`
    let statFileName = `${gameDate.getFullYear()}-${gameDate.getMonth() + 1}-${gameDate.getDay()}-${game.darkTeam}-vs-${game.lightTeam}-STATS-${game.statTeam}.csv`

    const toggleShowStats = () => setShowStats(!showStats);
    const statHeaders = [
        { label: 'Name', key: 'name' },
        { label: 'Touches', key: 'Touch' },
        { label: 'Points', key: 'Point' },
        { label: 'Assists', key: 'Assist' },
        { label: 'D-Plays', key: 'D-Play' },
        { label: 'Drops', key: 'Drop' },
        { label: 'Throwaways', key: 'T-Away' },
        { label: 'GSO', key: 'GSO' },
        { label: 'GSO-Mark', key: 'GSO-Mark' },
    ]

    return (
        <div className='card game-list-card'>
            <div className='game-list-info'>
                <span>{new Date(game.date).toDateString()}</span>
                <span>{`Stat Taker: ${game.statTaker}`}</span>
            </div>
            <div className='game-list-info'>
                <span>{`Stats For: ${game.statTeam}`}</span>
                {game.testGame && <span className='test-game'>Test Game</span>}
            </div>
            <div className='game-score'>
                <div className='score-card score-card-games dark'>
                    <span id='team-name'>{game.darkTeam}</span>
                    <span className='score dark'>{game.score.dark}</span>
                </div>
                <div className='score-card score-card-games light'>
                    <span id='team-name'>{game.lightTeam}</span>
                    <span className='score light'>{game.score.light}</span>
                </div>
            </div>
            <div className='game-list-btns'>
                <CSVLink
                    className='btn game-list-btn'
                    data={game.gameHistory}
                    filename={fileName}
                    target='_blank'
                >
                    Game CSV
                    <i className="material-icons md-18">get_app</i>
                </CSVLink>
                <CSVLink
                    className='btn game-list-btn'
                    data={game.playerStats}
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
                <>
                    <StatTable stats={game.playerStats} />
                    <button
                        className='btn btn-del game-list-btn'
                        onClick={() => {
                            props.toggleDeleteGame(game.date);
                            toast.error(
                                <DelToast
                                    game={game}
                                    toggleDeleteGame={props.toggleDeleteGame}
                                />, {autoClose: 4000, hideProgressBar:false});
                        }}>Delete Game</button>
                </>
            }
        </div>
    )
}

const GameList = (props) => {
    const showGames = props.games.filter(game => !game.deleted);
    const games = showGames.map((game) =>
        <GameCard key={game.date} game={game} toggleDeleteGame={props.toggleDeleteGame} />
    )
    return <div className='team-list'>{games}</div>
}

export default function Games(props) {

    const toggleDeleteGame = (gameDate) => {
        // update local state
        let newAllHistory = [...props.allGameHistory];
        for (let game of newAllHistory) {
            if (game.date === gameDate) game.deleted = !game.deleted;
            continue;
        }
        props.setAllGameHistory(newAllHistory);
        // save to the DB
        props.saveAllGames(newAllHistory)
    }

    return (
        <div className='App'>
            <h1 className='page-header'>Recorded Games</h1>
            <GameList
                games={props.allGameHistory}
                toggleDeleteGame={toggleDeleteGame}
            />
        </div>
    )
}
