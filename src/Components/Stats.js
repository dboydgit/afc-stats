import React from 'react';
import GameSetup from './GameSetup';
import GameInfo from './GameInfo';
import '../styles/Stats.css';
import { toast } from 'react-toastify';

const OffenceButtons = (props) => {

    return (
        <div className='stat-btns'>
            <button
                className='btn stat-btn'
                name='Touch'
                onClick={(e) => props.handleStatClick(e, props.player, false)}>
                Touch
                    <div className='score-badge'>{props.stats.Touch}</div>
                    {props.stats.Assist !== 0 && 
                        <div className='score-badge assist'>{`${props.stats.Assist}-A`}</div>}
            </button>
            <button
                className='btn stat-btn'
                name='Point'
                onClick={(e) => props.handleStatClick(e, props.player)}>
                Point
                    <div className='score-badge'>{props.stats.Point}</div>
            </button>
            <button
                className='btn stat-btn'
                name='T-Away'
                onClick={(e) => props.handleStatClick(e, props.player)}>
                T-Away
                    <div className='score-badge'>{props.stats['T-Away']}</div>
            </button>
            <button
                className='btn stat-btn'
                name='Drop'
                onClick={(e) => props.handleStatClick(e, props.player)}>
                Drop
                    <div className='score-badge'>{props.stats.Drop}</div>
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
                onClick={(e) => props.handleStatClick(e, props.player)}>
                D-Play
                    <div className='score-badge'>{props.stats['D-Play']}</div>
            </button>
            <button
                className='btn stat-btn'
                name='GSO'
                onClick={(e) => props.handleStatClick(e, props.player)}>
                GSO
                    <div className='score-badge'>{props.stats.GSO}</div>
            </button>
            <button
                className='btn stat-btn'
                name='GSO-Mark'
                onClick={(e) => props.handleStatClick(e, props.player)}>
                GSO-Mark
                    <div className='score-badge'>{props.stats['GSO-Mark']}</div>
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
            {props.offence &&
                <OffenceButtons
                    player={player.name}
                    stats={player.stats}
                    handleStatClick={props.handleStatClick}
                />}
            {!props.offence &&
                <DefenceButtons
                    player={player.name}
                    stats={player.stats}
                    handleStatClick={props.handleStatClick}
                />}
        </div>
    )
    return (
        <div className='player-list'>{list}</div>
    )
}

export default function Stats(props) {

    // show warning on page reload attempt *comment out for testing
    window.onbeforeunload = () => {
        return ''
    }

    let db = props.localDB;

    const handleStatClick = (e, player, turnover = true) => {
        toast.dismiss();
        if (turnover) props.toggleOffence();
        let action = e.currentTarget.name;
        // set the game history
        let newHistory = [...props.gameHistory];
        // get the last entry and set player if available
        let lastEntry = newHistory[newHistory.length - 1] || '';
        let lastPlayer = '';
        if (lastEntry && props.offence) lastPlayer = lastEntry.player;
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
                if (action === 'Drop') el.stats.Touch++;
                el.stats[action]++;
            }
            if (action === 'Point' && el.name === lastPlayer) el.stats.Assist++;
        })
        props.setPlayerStats(newPlayerStats);
        // log entry to console
        console.log(`${player}: ${action}: gameClock: ${props.gameTime}: 
            time: ${historyEntry.time}`)
        
        toast.success(`Last Entry - ${action} by ${player} ${lastPlayer ? 'from ' + lastPlayer : ''}`)
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
                if (lastEntry.action === 'Drop') el.stats.Touch--;
                el.stats[lastEntry.action]--;
                return;
            }
            if (lastEntry.action === 'Point' && lastEntry.lastPlayer === el.name) {
                el.stats.Assist--;
            }
        })
        props.setPlayerStats(newPlayerStats);
        // undo turnover and change buttons
        if (lastEntry.turnover) props.toggleOffence();
        // undo points and change score
        if (lastEntry.action === 'POINT') {
            props.statTeam === props.darkTeam ? newScore.dark-- : newScore.light--;
        }
        if (lastEntry.action === 'GSO' || lastEntry.action === 'GSO-MARK') {
            props.statTeam === props.darkTeam ? newScore.light-- : newScore.dark--;
        }
        // show undo action
        toast.info(`UNDO: ${lastEntry.action} by ${lastEntry.player}`);
        // set new state
        props.setScore(newScore);
        props.setGameHistory(newHistory);
    }

    const saveGame = () => {
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
        newAllHistory.push(gameDetails);
        props.setAllGameHistory(newAllHistory);
        // update the DB
        db.get('game-history').then(doc => {
            doc.games = newAllHistory;
            return db.put(doc);
        }).then(res => console.log(res))
        .catch(err => {
            if (err.name === 'not_found') {
                db.put({
                    _id: 'game-history',
                    games: newAllHistory
                })
            } else {
                console.log(err)
            }
        }).then(() => props.resetGame());
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
                            offence={props.offence}
                            playerStats={props.playerStats}
                            setPlayerStats={props.setPlayerStats}
                            statTeam={props.statTeam}
                            darkTeam={props.darkTeam}
                            handleStatClick={handleStatClick}
                            gameHistory={props.gameHistory}
                        />
                    </div>}
            </div>
        </div>
    )
}
