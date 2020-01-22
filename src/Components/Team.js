import React, { useState } from 'react'

const Player = (props) => {

    const [player, setPlayer] = useState(props.player);

    const handlePlayerChange = (e) => {
        setPlayer(e.target.value);
        let newTeams = [...props.teams];
        let teamInd = newTeams.findIndex(el => el.name === props.team.name);
        let playerInd = parseInt(e.target.name);
        newTeams[teamInd]['players'][playerInd] = e.target.value;
        props.setTeams(newTeams);
    }

    return (
        <div className='player-list-item'>
            <i  className='material-icons player-del'
                onClick={() => {
                    props.deletePlayer(player);
                }}>delete</i>
            <input
                className='player-card'
                name={props.ind}
                value={player}
                onChange={handlePlayerChange}
            />
        </div>
    )
}

const PlayerList = (props) => {

    let players = props.team.players;
    const listItems = players.map((player, ind) =>
        <Player
            player={player}
            ind={ind}
            key={ind}
            teams={props.teams}
            setTeams={props.setTeams}
            team={props.team}
            deletePlayer={props.deletePlayer}
        />
    );
    return <div className='player-list'>{listItems}</div>
}

export default function Team(props) {

    const [showPlayers, setShowPlayers] = useState(false);

    const toggleShowPlayers = () => {
        setShowPlayers(!showPlayers);
    }

    const saveTeam = () => {
        props.saveTeams();
        toggleShowPlayers();
    }

    const addPlayer = () => {
        // add player to teams state
        let newTeams = [...props.teams];
        for (let team of newTeams) {
            if (team.name === props.team.name) {
                team.players.push('New Player');
                continue;
            }
        }
        props.setTeams(newTeams);
    }

    const deletePlayer = (player) => {
        // delete player from state
        let newTeams = [...props.teams];
        for (let team of newTeams) {
            if (team.name === props.team.name) {
                let ind = team.players.findIndex(el => el === player);
                team.players.splice(ind, 1);
                continue;
            }
        }
        props.setTeams(newTeams);
    }

    return (
        <div className='card team-card'>
            <div className='team-name'>
                <span>{`${props.team.name}`}</span>
            </div>
            <div className='card-info'>
                <span className='gm-name'>{`GM: ${props.team.gm}`}</span>
                <span className='card-link' onClick={toggleShowPlayers}>
                    <span>Players</span>
                    {!showPlayers && <i className="material-icons md-18">arrow_drop_down</i>}
                    {showPlayers && <i className="material-icons md-18">arrow_drop_up</i>}
                </span>
            </div>
            {showPlayers &&
                <div className='card-players'>
                    <PlayerList
                        team={props.team}
                        teams={props.teams}
                        setTeams={props.setTeams}
                        deletePlayer={deletePlayer}
                    />
                    <button className='btn team-btn btn-del' name={props.ind} onClick={props.deleteTeam}>Delete Team</button>
                    <button className='btn team-btn' onClick={addPlayer}>Add Player</button>
                    <button className='btn team-btn' onClick={saveTeam}>Save Changes</button>
                </div>
            }
        </div>
    )
}
