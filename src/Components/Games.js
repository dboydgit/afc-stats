import React, { useState } from 'react'
import { CSVLink } from 'react-csv';
import '../styles/GameList.css';
import StatTable from './StatTable';
import SubStatTable from './SubStatTable';
import { toast } from 'react-toastify';

const DelToast = (props) => (
    <>
        <span>Game Deleted...</span>
        <button
            className='btn toast-btn'
            onClick={() => {
                props.toggleDeleteGame(props.game._id);
                props.closeToast();
            }}
        >
            Undo<i className='material-icons md-18'>undo</i>
        </button>
    </>
)

const GameCard = (props) => {

    const [showStats, setShowStats] = useState(false);
    const [showNoteInput, setShowNoteInput] = useState(false);
    const [note, setNote] = useState('');

    let game = props.game;
    let gameDate = new Date(game.date);

    const generateFileName = (str) => {
        return `${gameDate.getFullYear()}-${gameDate.getMonth() + 1}-${gameDate.getDay()}-${game.darkTeam}-vs-${game.lightTeam}-${str}-${game.statTeam}.csv`
    }

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

    const NoteList = (props) => {
        const notes = props.notes.map((note, index) =>
            <p className='card-note' key={index}>{note}</p>
        );
        notes.unshift(<p className='card-note-title' key='note-title'>Notes</p>)
        return <div className='card-notes'>{notes}</div>
    }

    return (
        <div className='card game-list-card'>
            <div className='game-list-info'>
                <span>{new Date(game.date).toDateString()}</span>
                <span>{`Stat Taker: ${game.statTaker}`}</span>
            </div>
            <div className='game-list-info'>
                <span>{`${game.playerStats ? 'Stats' : 'Subs'} For: ${game.statTeam}`}</span>
                {game.testGame && <span className='test-game'>Test Game</span>}
            </div>
            <div className='game-score'>
                <div className='score-card score-card-games dark'>
                    <span id='team-name'>{game.darkTeam}</span>
                    {game.score && <span className='score dark'>{game.score.dark}</span>}
                </div>
                <div className='score-card score-card-games light'>
                    <span id='team-name'>{game.lightTeam}</span>
                    {game.score && <span className='score light'>{game.score.light}</span>}
                </div>
            </div>
            <div className='game-list-btns'>
                <CSVLink
                    className='btn game-list-btn'
                    data={game.gameHistory || game.subHistory}
                    filename={game.gameHistory ? generateFileName('GAME') : generateFileName('SUBS')}
                    target='_blank'
                >
                    {game.gameHistory ? `Game CSV` : 'Subs CSV'}
                    <i className="material-icons md-18">get_app</i>
                </CSVLink>
                {game.playerStats && <CSVLink
                    className='btn game-list-btn'
                    data={game.playerStats}
                    headers={statHeaders}
                    filename={generateFileName('STATS')}
                    target='_blank'
                >
                    Stats CSV
                    <i className="material-icons md-18">get_app</i></CSVLink>}
                {game.subStats && <CSVLink
                    className='btn game-list-btn'
                    data={game.subStats}
                    // headers={statHeaders}
                    filename={generateFileName('SubStats')}
                    target='_blank'
                >
                    Stats CSV
                    <i className="material-icons md-18">get_app</i></CSVLink>}
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
            {showStats && game.playerStats &&
                <>
                    <StatTable stats={game.playerStats} />
                    <div className='game-card-btns'>
                        <button
                            className='btn btn-del game-list-btn'
                            onClick={() => {
                                props.toggleDeleteGame(game.date);
                                toast.error(
                                    <DelToast
                                        game={game}
                                        toggleDeleteGame={props.toggleDeleteGame}
                                    />, { autoClose: 4000, hideProgressBar: false });
                            }}>Delete Game</button>
                        {!showNoteInput && <button
                            className='btn game-list-btn'
                            onClick={() => {
                                setShowNoteInput(true);
                            }}>Add Note</button>}
                        {showNoteInput &&
                            <div>
                                <textarea
                                    className='note-input'
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                                <div className='game-card-btns'>
                                    <button className='btn game-list-btn' onClick={() => setShowNoteInput(false)}>Cancel</button>
                                    <button
                                        className='btn game-list-btn'
                                        onClick={() => {
                                            if (!props.game.notes) props.game.notes = [];
                                            props.game.notes.push(note);
                                            props.updateGame(game);
                                            setShowNoteInput(false);
                                            setNote('');
                                        }}
                                    >Save</button>
                                </div>
                            </div>}
                    </div>
                </>
            }
            {showStats && game.subStats &&
                <>
                    <SubStatTable stats={game.subStats} />
                    {game.notes && <NoteList notes={game.notes} />}
                    <div className='game-card-btns'>
                        <button
                            className='btn btn-del game-list-btn'
                            onClick={() => {
                                props.toggleDeleteGame(game._id);
                                toast.error(
                                    <DelToast
                                        game={game}
                                        toggleDeleteGame={props.toggleDeleteGame}
                                    />, { autoClose: 4000, hideProgressBar: false });
                            }}>Delete Game</button>
                        {!showNoteInput && <button
                            className='btn game-list-btn'
                            onClick={() => {
                                setShowNoteInput(true);
                            }}>Add Note</button>}
                    </div>
                    {showNoteInput &&
                        <div>
                            <textarea
                                className='note-input'
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <div className='game-card-btns'>
                                <button className='btn game-list-btn' onClick={() => setShowNoteInput(false)}>Cancel</button>
                                <button
                                    className='btn game-list-btn'
                                    onClick={() => {
                                        if (!props.game.notes) props.game.notes = [];
                                        props.game.notes.push(note);
                                        props.updateGame(game);
                                        setShowNoteInput(false);
                                        setNote('');
                                    }}
                                >Save</button>
                            </div>
                        </div>}
                </>
            }
        </div>
    )
}

const GameList = (props) => {
    const showGames = props.games.filter(game => !game.deleted);
    const games = showGames.map((game) =>
        <GameCard
            key={game.date}
            game={game}
            updateGame={props.updateGame}
            toggleDeleteGame={props.toggleDeleteGame}
        />
    )
    return <div className='team-list'>{games}</div>
}

export default function Games(props) {

    let db = props.localDB;

    const toggleDeleteGame = (id) => {
        // update local state
        let newAllHistory = [...props.allGameHistory];
        for (let game of newAllHistory) {
            if (game._id === id) game.deleted = !game.deleted;
            continue;
        }
        props.setAllGameHistory(newAllHistory);
        // save to the DB
        db.get(id).then(doc => {
            doc.deleted = !doc.deleted;
            return db.put(doc);
        }).then(res => console.log(res))
            .catch(err => {
                console.log(err);
            })
    }

    const updateGame = (game) => {
        console.log('Updating game ' + game)
        let newGames = [...props.allGameHistory];
        let gameInd = newGames.findIndex(el => el._id === game._id);
        newGames[gameInd] = game;
        props.setAllGameHistory(newGames);
        db.get(game._id).then(doc => {
            doc.notes = game.notes;
            return db.put(doc);
        }).then(res => console.log(res)).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='App'>
            <h1 className='page-header'>Recorded Games</h1>
            <GameList
                games={props.allGameHistory}
                updateGame={updateGame}
                toggleDeleteGame={toggleDeleteGame}
            />
        </div>
    )
}
