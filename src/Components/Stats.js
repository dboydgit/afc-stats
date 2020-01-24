import React, { useState } from 'react';
import GameSetup from './GameSetup';
import GameInfo from './GameInfo';
import '../styles/Stats.css';
import { toast } from 'react-toastify';

const OffenseButtons = (props) => {

    let mustTouch = false;
    let noThrowaway = true;
    let noTouch = false;
    let noDrop = false;

    if (!props.prevEntry.action || props.prevEntry.turnover) mustTouch = true;
    if (!props.prevEntry.turnover && props.prevEntry.player === props.player.name) {
        noTouch = true;
        noThrowaway = false;
        noDrop = true;
    }

    return (
        <div className='stat-btns'>
            <button
                className={`btn stat-btn ${noTouch ? 'btn-inactive' : ''}`}
                name='Touch'
                onClick={(e) => props.handleStatClick(e, props.player.name, false)}>
                Touch
                    <div className='score-badge'>{props.player.Touch}</div>
                {props.player.Assist !== 0 &&
                    <div className='score-badge assist'>{`${props.player.Assist}-A`}</div>}
            </button>
            <button
                className={`btn stat-btn ${mustTouch ? 'btn-inactive' : ''}`}
                name='Point'
                onClick={(e) => props.handleStatClick(e, props.player.name)}>
                Point
                    <div className='score-badge'>{props.player.Point}</div>
            </button>
            <button
                className={`btn stat-btn ${mustTouch || noThrowaway ? 'btn-inactive' : ''}`}
                name='T-Away'
                onClick={(e) => props.handleStatClick(e, props.player.name)}>
                T-Away
                    <div className='score-badge'>{props.player['T-Away']}</div>
            </button>
            <button
                className={`btn stat-btn ${mustTouch || noDrop ? 'btn-inactive' : ''}`}
                name='Drop'
                onClick={(e) => props.handleStatClick(e, props.player.name)}>
                Drop
                    <div className='score-badge'>{props.player.Drop}</div>
            </button>
        </div>
    )
}

const DefenceButtons = (props) => {

    return (
        <div className='stat-btns'>
            <button
                className='btn stat-btn'
                name='D-Play'
                onClick={(e) => props.handleStatClick(e, props.player.name)}>
                D-Play
                    <div className='score-badge'>{props.player['D-Play']}</div>
            </button>
            <button
                className='btn stat-btn'
                name='GSO'
                onClick={(e) => props.handleStatClick(e, props.player.name)}>
                GSO
                    <div className='score-badge'>{props.player.GSO}</div>
            </button>
            <button
                className='btn stat-btn'
                name='GSO-Mark'
                onClick={(e) => props.handleStatClick(e, props.player.name)}>
                GSO-Mark
                    <div className='score-badge'>{props.player['GSO-Mark']}</div>
            </button>
        </div>
    )
}

const PlayerList = (props) => {
    const playerStats = props.playerStats;
    const list = playerStats.map(player =>
        <div key={player.name} className='player-input'>
            <div
                className={`player-name ${props.darkTeam === props.statTeam ? 'dark' : ''}`}
            >
                <span className='player-text'>{player.name}</span>
            </div>
            {props.offense &&
                <OffenseButtons
                    player={player}
                    handleStatClick={props.handleStatClick}
                    prevEntry={props.prevEntry}
                />}
            {!props.offense &&
                <DefenceButtons
                    player={player}
                    handleStatClick={props.handleStatClick}
                />}
        </div>
    )
    return (
        <div className='player-list'>{list}</div>
    )
}

export default function Stats(props) {

    // show warning on page reload attempt during game
    window.onbeforeunload = (e) => {
        if (!props.showSetup) e.returnValue = 'Game will not be saved.';
    }

    const [showAddPlayer, setShowAddPlayer] = useState(false);
    const [newPlayer, setNewPlayer] = useState('');
    let [prevEntry, setPrevEntry] = useState({
        action: '',
        player: '',
        turnover: false
    })

    const handleStatClick = (e, player = '', turnover = true) => {
        toast.dismiss();
        let action = e.currentTarget.name;
        // set the game history
        let newHistory = [...props.gameHistory];
        // get the last entry and set player if available
        let lastEntry = newHistory[newHistory.length - 1] || '';
        let lastPlayer = '';
        // set last thrower for Point and Drop
        if (lastEntry && (action === 'Point' || action === 'Drop')) {
            lastPlayer = lastEntry.player;
        }
        // Validate first action of a possession is a touch
        if (props.offense && action !== 'Touch' && (lastEntry.turnover || !newHistory.length)) {
            toast.error('First action of a possession must be a touch');
            return;
        }
        // set last thrower for touch (if not right after turnover)
        if (action === 'Touch' && !lastEntry.turnover) {
            if (player === lastEntry.player) {
                toast.error("Cannot touch the disc twice in a row");
                return;
            } else {
                lastPlayer = lastEntry.player;
            }
        }
        // Validate throwaway was by lastPlayer
        if (action === 'T-Away') {
            if (lastEntry.action !== 'Touch') {
                toast.error('Throwaway can only be recorded following a touch');
                return;
            } else if (lastEntry.player !== player) {
                console.log(lastEntry.player)
                toast.error(`Only player in possession (${lastEntry.player}) can throwaway`)
                return;
            }
        }
        // set the score for point, GSO
        let newScore = { ...props.score };
        if (action === 'Point') {
            props.statTeam === props.darkTeam ? newScore.dark++ : newScore.light++;
        }
        if (action === 'GSO' || action === 'GSO-Mark') {
            props.statTeam === props.darkTeam ? newScore.light++ : newScore.dark++;
        }
        props.setScore(newScore);
        // add action to game history
        let time = new Date();
        let historyEntry = {
            date: time.toDateString(),
            time: time.toTimeString(),
            gameTime: props.gameTime,
            statTeam: props.statTeam,
            [`${props.darkTeam}_score`]: newScore.dark,
            [`${props.lightTeam}_score`]: newScore.light,
            action: action,
            player: player,
            lastPlayer: lastPlayer,
            turnover: turnover,
        }
        // set new player stats
        let newPlayerStats = [...props.playerStats];
        newPlayerStats.forEach(el => {
            if (el.name === player) {
                if (action === 'Drop') el.Touch++;
                el[action]++;
            }
            if (action === 'Point' && el.name === lastPlayer) el.Assist++;
        })
        props.setPlayerStats(newPlayerStats);
        // log entry to console
        console.log(`${player}: ${action}: gameClock: ${props.gameTime}: 
            time: ${historyEntry.time}`)

        toast.success(`Last Entry: ${action}${player ? ' - ' + player : ''} ${lastPlayer ? ' from ' + lastPlayer : ''}`)
        setPrevEntry({action: action, player: player, turnover: turnover}); 
        if (turnover) props.toggleOffense();
        newHistory.push(historyEntry);
        props.setGameHistory(newHistory);
    }

    const handleUndo = () => {
        toast.dismiss();
        let newHistory = [...props.gameHistory];
        let newScore = { ...props.score };
        // remove last entry from game history
        let lastEntry = newHistory.pop();
        if (!lastEntry) {
            toast.info('Nothing to undo');
            return;
        }
        console.log('UNDO')
        // undo playerStats count
        let newPlayerStats = [...props.playerStats];
        newPlayerStats.forEach(el => {
            if (el.name === lastEntry.player) {
                if (lastEntry.action === 'Drop') el.Touch--;
                el[lastEntry.action]--;
            }
            if (lastEntry.action === 'Point' && lastEntry.lastPlayer === el.name) {
                el.Assist--;
            }
        })
        props.setPlayerStats(newPlayerStats);
        // undo turnover and change buttons
        if (lastEntry.turnover) props.toggleOffense();
        // undo points and change score
        if (lastEntry.action === 'Point') {
            props.statTeam === props.darkTeam ? newScore.dark-- : newScore.light--;
        }
        if (lastEntry.action === 'GSO' || lastEntry.action === 'GSO-Mark') {
            props.statTeam === props.darkTeam ? newScore.light-- : newScore.dark--;
        }
        // show undo action
        toast.info(`UNDO: ${lastEntry.action} by ${lastEntry.player}`);
        // set new state
        props.setScore(newScore);
        props.setGameHistory(newHistory);
        if (!newHistory.length) setPrevEntry({action:'', player:'', turnover: false});
        else {
            let newPrevEntry = newHistory[newHistory.length - 1];
            setPrevEntry({
                action: newPrevEntry.action,
                player: newPrevEntry.player,
                turnover: newPrevEntry.turnover
            })
        }
    }

    const saveGame = () => {
        toast.dismiss();
        toast.success('Game Saved', { autoClose: 2000 });
        let gameDetails = {
            date: new Date(),
            darkTeam: props.darkTeam,
            lightTeam: props.lightTeam,
            statTeam: props.statTeam,
            gameLength: props.gameLength,
            playerStats: props.playerStats,
            score: props.score,
            testGame: props.testGame,
            statTaker: props.userID,
            gameHistory: props.gameHistory
        }
        let newAllHistory = [...props.allGameHistory];
        newAllHistory.unshift(gameDetails);
        props.setAllGameHistory(newAllHistory);
        // update the DB
        props.saveAllGames(newAllHistory);
        props.resetGame();
    }

    const addStatPlayer = (player) => {
        let newPlayerStats = [...props.playerStats];
        newPlayerStats.push({
            name: player,
            Touch: 0,
            Assist: 0,
            Point: 0,
            'T-Away': 0,
            Drop: 0,
            'D-Play': 0,
            GSO: 0,
            'GSO-Mark': 0
        })
        props.setPlayerStats(newPlayerStats);
        setShowAddPlayer(false);
        setNewPlayer('');
    }

    return (
        <div className='App'>
            <div className='stats'>
                {props.showSetup &&
                    <GameSetup
                        teams={props.teams}
                        finishSetup={props.finishSetup}
                        setTestGame={props.setTestGame}
                    />}
                {!props.showSetup &&
                    <div className='game-stats'>
                        {props.testGame &&
                            <div id='test-notification'>
                                <p id='test-text'>Test Game</p>
                            </div>}
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
                        <div className='game-options'>
                            <button className='btn opt-btn'
                                onClick={() => {
                                    if (window.confirm('Cancel Game? Progress will not be saved.')) {
                                        toast.dismiss();
                                        toast.error('Game Deleted', { autoClose: 2000 });
                                        props.resetGame();
                                    }
                                }}>Exit Game</button>
                            <button className='btn opt-btn'
                                onClick={saveGame}>Finish & Save</button>
                            <button className='btn opt-btn'
                                onClick={handleUndo}>
                                Undo<i className='material-icons md-18'>undo</i>
                            </button>
                        </div>
                        <PlayerList
                            offense={props.offense}
                            playerStats={props.playerStats}
                            setPlayerStats={props.setPlayerStats}
                            statTeam={props.statTeam}
                            darkTeam={props.darkTeam}
                            handleStatClick={handleStatClick}
                            gameHistory={props.gameHistory}
                            // use current entry to track and disable correct buttons...
                            prevEntry={prevEntry}
                        />
                        {!props.offense &&
                            <button
                                className='btn stat-btn stat-btn-after'
                                name='O-Error'
                                onClick={(e) => handleStatClick(e)}>
                                Offensive Error
                        </button>
                        }
                        {!showAddPlayer && <button
                            className='btn stat-btn stat-btn-after'
                            onClick={() => setShowAddPlayer(true)}
                        >Add Player</button>}
                        {showAddPlayer &&
                            <div className='add-player-input'>
                                <i className='material-icons'
                                    onClick={() => setShowAddPlayer(false)}>close</i>
                                <input
                                    placeholder='player name'
                                    onChange={(e) => setNewPlayer(e.target.value)}
                                    value={newPlayer}></input>
                                <button
                                    className='btn stat-btn stat-btn-after'
                                    onClick={() => addStatPlayer(newPlayer)}>Save</button>
                            </div>
                        }
                    </div>}
            </div>
        </div>
    )
}
