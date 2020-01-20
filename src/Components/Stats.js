import React, {useEffect} from 'react';
import GameSetup from './GameSetup';
import GameInfo from './GameInfo';
import '../styles/Stats.css';
import { toast } from 'react-toastify';

const OffenceButtons = (props) => {

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     };
    // }, [input])

    return (
        <div className='stat-btns'>
            <button
                className='btn stat-btn'
                name='TOUCH'
                onClick={(e) => props.handleStatClick(e, props.player, false)}>Touch</button>
            <button
                className='btn stat-btn'
                name='POINT'
                onClick={(e) => props.handleStatClick(e, props.player)}>Point</button>
            <button
                className='btn stat-btn'
                name='T-AWAY'
                onClick={(e) => props.handleStatClick(e, props.player)}>T-Away</button>
            <button
                className='btn stat-btn'
                name='DROP'
                onClick={(e) => props.handleStatClick(e, props.player)}>Drop</button>
        </div>
    )
}

const DefenceButtons = (props) => {

    return (
        <div className='stat-btns'>
            <button
                className='btn stat-btn'
                name='D-PLAY'
                onClick={(e) => props.handleStatClick(e, props.player)}>D-Play</button>
            <button 
                className='btn stat-btn'
                name='GSO'
                onClick={(e) => props.handleStatClick(e, props.player)}>GSO</button>
            <button 
                className='btn stat-btn'
                name='GSO-MARK'
                onClick={(e) => props.handleStatClick(e, props.player)}>GSO-MARK</button>
        </div>
    )
}

const PlayerList = (props) => {
    const players = props.statPlayers;
    const list = players.map(player =>
        <div key={player} className='player-input'>
            <div
                className={`player-name ${props.darkTeam === props.statTeam ? 'dark' : ''}`}
            >
                <span className='player-text'>{player}</span>
            </div>
            {props.offence &&
                <OffenceButtons
                    player={player}
                    handleStatClick={props.handleStatClick}
                />}
            {!props.offence &&
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

    // show warning on page reload attempt *comment out for testing
    // window.onbeforeunload = () => {
    //     return 'Reloading will delete any ongoing game...'
    // }

    const handleStatClick = (e, player, turnover=true) => {
        toast.dismiss();
        if (turnover) props.toggleOffence();
        let action = e.target.name;
        // set the score for point, GSO
        let newScore = {...props.score};
        if (action === 'POINT') {
            props.statTeam === props.darkTeam ? newScore.dark++ : newScore.light++;
        }
        if (action === 'GSO' || action === 'GSO-MARK') {
            props.statTeam === props.darkTeam ? newScore.light++ : newScore.dark++;
        }
        props.setScore(newScore);
        // add action to game history
        let historyEntry = {
            realTime: new Date().toString(),
            gameTime: props.gameTime,
            statTeam: props.statTeam,
            [`${props.darkTeam}_score`]: newScore.dark,
            [`${props.lightTeam}_score`]: newScore.light,
            action: action,
            player: player, 
            turnover: turnover,
        }

        console.log(`${player}: ${action}: gameClock: ${props.gameTime}: 
            time: ${historyEntry.realTime}`)
        let newHistory = [...props.gameHistory];
        // get the last entry and set player if available
        let lastEntry = newHistory[newHistory.length - 1] || '';
        let lastPlayer = '';
        if (lastEntry && props.offence) lastPlayer = lastEntry.player;
        toast.success(`Last Entry - ${action} by ${player} ${lastPlayer ? 'from ' + lastPlayer : ''}`)
        newHistory.push(historyEntry);
        props.setGameHistory(newHistory);
    }

    const handleUndo = () => {
        toast.dismiss();
        let newHistory = [...props.gameHistory];
        let newScore = {...props.score};
        // remove last entry from game history
        let lastEntry = newHistory.pop();
        if (!lastEntry) {
            toast.info('Nothing to undo');
            return;
        }
        console.log('UNDO')
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

    return (
        <div className='App'>
            <div className='stats'>
                {props.showSetup &&
                    <GameSetup
                        teams={props.teams}
                        finishSetup={props.finishSetup}
                    />}
                {!props.showSetup &&
                    <div className='game-stats'>
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
                            <button className='btn opt-btn'>Exit Game</button>
                            <button className='btn opt-btn'
                                onClick={handleUndo}>
                                Undo<i className='material-icons md-18'>undo</i>
                            </button>
                        </div>
                        <PlayerList
                            offence={props.offence}
                            statPlayers={props.statPlayers}
                            statTeam={props.statTeam}
                            darkTeam={props.darkTeam}
                            handleStatClick={handleStatClick}
                        />
                    </div>}
            </div>
        </div>
    )
}
