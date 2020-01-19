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
                onClick={(e) => props.handleStatClick(e, props.player)}>Touch</button>
            <button
                className='btn stat-btn'
                onClick={(e) => props.handleStatClick(e, props.player)}>Point</button>
            <button
                className='btn stat-btn'
                onClick={(e) => props.handleStatClick(e, props.player)}>T-Away</button>
            <button
                className='btn stat-btn'
                onClick={(e) => props.handleStatClick(e, props.player)}>Drop</button>
        </div>
    )
}

const DefenceButtons = (props) => {

    return (
        <div className='stat-btns'>
            <button
                className='btn stat-btn'
                onClick={(e) => props.handleStatClick(e, props.player)}>D-Play</button>
            <button 
                className='btn stat-btn' 
                onClick={(e) => props.handleStatClick(e, props.player)}>GSO</button>
            <button 
                className='btn stat-btn' 
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

    const handleStatClick = (e, player) => {
        let action = e.target.innerText;
        console.log(`${player}: ${action}: gameClock: ${props.gameTime}`)
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
                                onClick={() => {
                                    toast.dismiss()
                                    toast.info('Undo... action')
                                }}>
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
