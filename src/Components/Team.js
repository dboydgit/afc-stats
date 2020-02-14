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
            <DragHandle />
            <i className='material-icons player-del'
                onClick={() => {
                    if (window.confirm(`Delete Player (${player})?`)) {
                        props.deletePlayer(player);
                    }
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

export default function Team(props) {

    const [showPlayers, setShowPlayers] = useState(false);

    const toggleShowPlayers = () => {
        setShowPlayers(!showPlayers);
    }

    const saveTeam = (team) => {
        props.saveTeam(team);
        toggleShowPlayers();
    }

    const addPlayer = () => {
        // add player to teams state
        let newTeams = [...props.teams];
        for (let team of newTeams) {
            if (team.name === props.team.name) {
                team.players.push('New Player');
                break;
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
                break;
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

    function shouldCancelStart(e) {
        // Cancel sorting if the event target is an anchor tag (`a`)
        if (e.target.innerText.toLowerCase() === 'delete' ||
            e.target.tagName.toLowerCase() === 'input') {
            return true; // Return true to cancel sorting
        }
    }

    const sortPlayersAZ = () => {
        let newTeams = [...props.teams];
        for (let team of newTeams) {
            if (team.name === props.team.name) {
                team.players.sort();
                break;
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
                <div className='card-link'>
                    {showPlayers &&
                        <button className='btn player-sort-btn' onClick={sortPlayersAZ}>
                            <span>Sort A-Z</span>
                            <i className="material-icons md-18">sort</i>
                        </button>}
                    <div onClick={toggleShowPlayers}>
                        {!showPlayers &&
                            <div className='card-link'>
                                <span>Show Players</span>
                                <i className="material-icons md-18">arrow_drop_down</i>
                            </div>}
                        {showPlayers &&
                            <div className='card-link'>
                                <span>Hide Players</span>
                                <i className="material-icons md-18">arrow_drop_up</i>
                            </div>}
                    </div>
                </div>
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
                        shouldCancelStart={shouldCancelStart}
                        useDragHandle
                    />
                    <button
                        className='btn team-btn btn-del'
                        name={props.ind}
                        onClick={props.deleteTeam}>Delete Team
                    </button>
                    <button
                        className='btn team-btn'
                        onClick={addPlayer}
                    >Add Player</button>
                    <button
                        className='btn team-btn'
                        onClick={() => saveTeam(props.team)}>Save Changes
                    </button>
                </div>
            }
        </div>
    )
}
