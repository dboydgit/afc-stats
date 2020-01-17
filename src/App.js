import React, { useEffect, useState, useCallback } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import './styles/App.css';
import PouchDB from 'pouchdb';
import Home from './Components/Home';
import Stats from './Components/Stats';
import Subs from './Components/Subs';
import Teams from './Components/Teams';
import Games from './Components/Games';

function App() {

  const DB_HOST = process.env.NODE_ENV === 'development' ?
    'http://localhost:5984' :
    'https://db-couchdb.duckdns.org';

  // set state
  const [loadingDB, setLoadingDB] = useState(true);
  const [userID, setUserID] = useState(localStorage.getItem('userID') || '');
  const [remoteDB] = useState(new PouchDB(`${DB_HOST}/ultimate-stats`));
  const [localDB] = useState(new PouchDB('ultimate-stats'));
  const [teams, setTeams] = useState([]);
  const [gameLength, setGameLength] = useState(25);
  const [darkTeam, setDarkTeam] = useState('');
  const [lightTeam, setLightTeam] = useState('');
  const [gameHistory, setGameHistory] = useState([]);
  const [showSetup, setShowSetup] = useState(true);
  const [statTeam, setStatTeam] = useState('');
  const [offence, setOffence] = useState(true);

  const getData = useCallback(() => {
    if (!remoteDB) return;
    setLoadingDB(true)
    remoteDB.allDocs({ include_docs: true }).then(res => {
      console.log('Documents fetched');
      console.log(res);
      setLoadingDB(false);
      res.rows.forEach(row => {
        if (row.doc._id === 'team-doc') setTeams(row.doc.teams);
      })
    })
  }, [remoteDB])

  // handle remote document update
  const handleRemoteUpdate = (doc) => {
    // TODO update the state on remote update.
    console.log(doc)
  }

  // get data from the DB when ready
  useEffect(() => {
    if (!remoteDB) return;
    remoteDB.info();
    getData();
  }, [remoteDB, getData])

  // Effect for handling remote DB changes
  useEffect(() => {
    if (loadingDB || !localDB || !remoteDB) return;
    let dbSync;
    dbSync = localDB.sync(remoteDB, {
      live: true,
      retry: true,
      include_docs: true,
    }).on('change', (e) => {
      console.log('Database Change');
      console.log(e);
      let changedDoc = e.change.docs[0];
      if (e.direction === 'pull') {
        handleRemoteUpdate(changedDoc);
        console.log(`Updated: ${changedDoc._id}`);
      } else {
        console.log('This was a local change');
      }
    }).on('active', () => console.log('Sync Active'))
      .on('error', () => console.log('Database Sync Error'));
    return () => {
      dbSync.cancel();
      console.log('Sync Cancelled');
    };
  }, [loadingDB, localDB, remoteDB])

  // finish the game setup and set state for stat taking
  const finishSetup = (time, dark, light, statTeam, offence) => {
    setGameLength(parseInt(time));
    setDarkTeam(dark);
    setLightTeam(light);
    setStatTeam(statTeam);
    setOffence(offence);
    setShowSetup(false);
  }

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home
            userID={userID}
            setUserID={setUserID}
            localDB={localDB}
          />
        </Route>
        <Route path='/stats'>
          {userID ?
            <Stats
              userID={userID}
              localDB={localDB}
              teams={teams}
              showSetup={showSetup}
              finishSetup={finishSetup}
            /> : <Redirect to='/' />}
        </Route>
        <Route path='/subs'>
          {userID ?
            <Subs
              userID={userID}
              localDB={localDB}
            /> : <Redirect to='/' />}
        </Route>
        <Route path='/teams'>
          {userID ?
            <Teams
              teams={teams}
              setTeams={setTeams}
              localDB={localDB}
            /> : <Redirect to='/' />}
        </Route>
        <Route path='/games'>
          <Games />
        </Route>
      </Switch>
      <div className='bottom-nav'>
        <NavLink className='nav-link' to='/' exact activeClassName='nav-active'>Home</NavLink>
        <NavLink className='nav-link' to='/stats' activeClassName='nav-active'>Stats</NavLink>
        <NavLink className='nav-link' to='/subs' activeClassName='nav-active'>Subs</NavLink>
        <NavLink className='nav-link' to='/teams' activeClassName='nav-active'>Teams</NavLink>
        <NavLink className='nav-link' to='/games' activeClassName='nav-active'>Games</NavLink>
      </div>
    </Router>
  );
}

export default App;
