import React, { useState } from 'react'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const DragHandle = SortableHandle(() => (
    <i className={`material-icons handle`}>drag_handle</i>)
)

const SortableList = SortableContainer(({ players, deletePlayer, props }) => {
    return (
        <div className='player-list'>
            {players.map((player, index) => (
                <SortableItem
                    key={`Item-${index}`}
                    index={index}
                    player={player}
                    playInd={index}
                    deletePlayer={deletePlayer}
                    props={props}
                />
            ))}
        </div>
    )
})

const SortableItem = SortableElement(({ player, playInd, deletePlayer, props }) => (
    <Player
        player={player}
        ind={playInd}
        teams={props.teams}
        setTeams={props.setTeams}
        team={props.team}
        deletePlayer={deletePlayer}
    />
));

const Player = (props) => {

    const player = props.player;

    const handlePlayerChange = (e) => {
        let newTeams = [...props.teams];
        let teamInd = newTeams.findIndex(el => el.name === props.team.name);
        let playerInd = parseInt(e.target.name);
        newTeams[teamInd]['players'][playerInd] = e.target.value;
        props.setTeams(newTeams);
    }

    return (
        <div className='player-list-item'>
            <i className='material-icons player-del'
                onClick={() => {
                    props.deletePlayer(player);
                }}>delete</i>
            <input
                className='player-card'
                name={props.ind}
                value={player}
                onChange={handlePlayerChange}
            />
            <DragHandle />
        </div>
    )
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

    const onSortEnd = ({ oldIndex, newIndex }) => {
        let updatedTeams = [...props.teams];
        for (let team of updatedTeams) {
            if (team.name === props.team.name) {
                team.players = arrayMove(team.players, oldIndex, newIndex)
            }
        }
        props.setTeams(updatedTeams);
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
                    <SortableList
                        props={props}
                        players={props.team.players}
                        team={props.team}
                        teams={props.teams}
                        setTeams={props.setTeams}
                        deletePlayer={deletePlayer}
                        onSortEnd={onSortEnd}
                        distance={1}
                    />
                    <button className='btn team-btn btn-del' name={props.ind} onClick={props.deleteTeam}>Delete Team</button>
                    <button className='btn team-btn' onClick={addPlayer}>Add Player</button>
                    <button className='btn team-btn' onClick={saveTeam}>Save Changes</button>
                </div>
            }
        </div>
    )
}
