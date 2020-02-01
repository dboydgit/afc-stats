import React, {useState} from 'react';
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

    const db = props.localDB;

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
        db.get(team._id).then(doc => {
            team._rev = doc._rev;
            return db.put(team);
        }).then(res => console.log(res))
        .catch(err => {
            if (err.name === 'not_found') {
                db.put(team)
                console.log('New Team Created')
            } else {
                console.log(err);
            }
        })
    }

    const deleteTeam = (e) => {
        let teamInd = parseInt(e.target.name);
        let newTeams = [...props.teams];
        let deletedTeamArr = newTeams.splice(teamInd, 1);
        props.setTeams(newTeams);
        db.get(deletedTeamArr[0]._id).then(doc => {
            doc.deleted = true;
            return db.put(doc);
        }).then(res => console.log(res))
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
            <button className='btn' onClick={() => {setShowAddTeam(true)}}>Add Team</button>}
            {showAddTeam && 
            <div className='add-team-form'>
                <label htmlFor='team-name'>Team Name: </label>
                <input name='team-name' onChange={handleInputChange} value={teamName}/>
                <label htmlFor='team-gm'>Team GM: </label>
                <input name='team-gm' onChange={handleInputChange} value={teamGM}/>
                <button className='btn' onClick={createTeam}>Create Team</button>
                <button className='btn nmt' onClick={() => setShowAddTeam(false)}>Cancel</button>
            </div>}
        </div>
    )
}
