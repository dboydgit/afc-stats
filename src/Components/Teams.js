import React, { useState } from 'react';
import Team from './Team';
import '../styles/Teams.css'

const TeamList = (props) => {
  const teams = props.teams.map((team, ind) =>
    <Team
      team={team}
      ind={ind}
      key={team.name}
      teams={props.teams}
      setTeams={props.setTeams}
      saveTeam={props.saveTeam}
      deleteTeam={props.deleteTeam}
    />);
  return (
    <div className='team-list'>{teams}</div>
  )
}

export default function Teams(props) {

  const db = props.db;

  const [teamName, setTeamName] = useState('');
  const [teamGM, setTeamGM] = useState('');
  const [showAddTeam, setShowAddTeam] = useState(false);

  const teamPlayers = [
    'Player1',
    'Player2',
    'Player3',
    'Player4',
    'Player5',
    'Player6',
    'Player7',
    'Player8',
    'Player9',
    'Player10'
  ];

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case 'team-name':
        setTeamName(e.target.value);
        break;
      case 'team-gm':
        setTeamGM(e.target.value);
        break;
      default:
        console.log('State not updated!');
    }
  }

  const createTeam = (e) => {
    e.preventDefault();
    let newTeams = [...props.teams];
    let newTeam = {
      _id: new Date().toISOString(),
      docType: 'team',
      name: teamName,
      gm: teamGM,
      players: teamPlayers
    };
    newTeams.push(newTeam);
    // update state with new teams
    props.setTeams(newTeams);
    // add teams to DB
    saveTeam(newTeam);
    // clear form
    setTeamName('');
    setTeamGM('');
    setShowAddTeam(false);
  }

  const saveTeam = (team) => {
    db.collection('teams').doc(team._id)
      .set(team, { merge: true })
      .then(_ => console.log("Team Saved"))
      .catch(err => console.log(err))
  }

  const deleteTeam = (e) => {
    let teamInd = parseInt(e.target.name);
    let newTeams = [...props.teams];
    let deletedTeamArr = newTeams.splice(teamInd, 1);
    props.setTeams(newTeams);
    db.collection('teams').doc(deletedTeamArr[0]._id)
      .update({deleted: true})
      .then(_ => console.log('Team Deleted'))
      .catch(e => console.log(e))
  }

  return (
    <div className='App'>
      <h1 className='page-header'>Teams</h1>
      <TeamList
        teams={props.teams}
        setTeams={props.setTeams}
        saveTeam={saveTeam}
        deleteTeam={deleteTeam}
      />
      {!showAddTeam &&
        <button className='btn' onClick={() => { setShowAddTeam(true) }}>Add Team</button>}
      {showAddTeam &&
        <div className='add-team-form'>
          <label htmlFor='team-name'>Team Name: </label>
          <input name='team-name' onChange={handleInputChange} value={teamName} />
          <label htmlFor='team-gm'>Team GM: </label>
          <input name='team-gm' onChange={handleInputChange} value={teamGM} />
          <button className='btn' onClick={createTeam}>Create Team</button>
          <button className='btn nmt' onClick={() => setShowAddTeam(false)}>Cancel</button>
        </div>}
    </div>
  )
}
