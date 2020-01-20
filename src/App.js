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
import Timer from 'easytimer.js';
import { ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slide = cssTransition({
  enter: 'toast-in',
  exit: 'toast-out',
  duration: [500,100]
})

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
  const [allGameHistory, setAllGameHistory] = useState([]);
  const [gameLength, setGameLength] = useState(1);
  const [darkTeam, setDarkTeam] = useState("Dark Team"); //test str
  const [lightTeam, setLightTeam] = useState("Light Team"); // test str
  const [showSetup, setShowSetup] = useState(false); //set false for testing
  const [statTeam, setStatTeam] = useState('testDark'); //test str
  // hardcode for testing
  const [statPlayers, setStatPlayers] = useState(["Eric", "Player2", "Player3", "Player4", "Player5", "Player6", "Player7", "Player8", "Player9", "Player10"]);
  // try playerStats instead of stat players - hardcode for testing
  const [playerStats, setPlayerStats] = useState([
    {name: 'Eric', stats:{
      Touch: 0,
      Assist: 0,
      Point: 0,
      'T-Away': 0,
      Drop: 0,
      'D-Play': 0,
      GSO: 0,
      'GSO-Mark': 0
    }},
    {name: 'Player1', stats:{
      Touch: 0,
      Assist: 0,
      Point: 0,
      'T-Away': 0,
      Drop: 0,
      'D-Play': 0,
      GSO: 0,
      'GSO-Mark': 0
    }},
    {name: 'Player2', stats:{
      Touch: 0,
      Assist: 0,
      Point: 0,
      'T-Away': 0,
      Drop: 0,
      'D-Play': 0,
      GSO: 0,
      'GSO-Mark': 0
    }},
    {name: 'Player3', stats:{
      Touch: 0,
      Assist: 0,
      Point: 0,
      'T-Away': 0,
      Drop: 0,
      'D-Play': 0,
      GSO: 0,
      'GSO-Mark': 0
    }},
    {name: 'Player4', stats:{
      Touch: 0,
      Assist: 0,
      Point: 0,
      'T-Away': 0,
      Drop: 0,
      'D-Play': 0,
      GSO: 0,
      'GSO-Mark': 0
    }},
    {name: 'Player5', stats:{
      Touch: 0,
      Assist: 0,
      Point: 0,
      'T-Away': 0,
      Drop: 0,
      'D-Play': 0,
      GSO: 0,
      'GSO-Mark': 0
    }},
    {name: 'Player6', stats:{
      Touch: 0,
      Assist: 0,
      Point: 0,
      'T-Away': 0,
      Drop: 0,
      'D-Play': 0,
      GSO: 0,
      'GSO-Mark': 0
    }},
    {name: 'Player7', stats:{
      Touch: 0,
      Assist: 0,
      Point: 0,
      'T-Away': 0,
      Drop: 0,
      'D-Play': 0,
      GSO: 0,
      'GSO-Mark': 0
    }},
    {name: 'Player8', stats:{
      Touch: 0,
      Assist: 0,
      Point: 0,
      'T-Away': 0,
      Drop: 0,
      'D-Play': 0,
      GSO: 0,
      'GSO-Mark': 0
    }},
    {name: 'Player9', stats:{
      Touch: 0,
      Assist: 0,
      Point: 0,
      'T-Away': 0,
      Drop: 0,
      'D-Play': 0,
      GSO: 0,
      'GSO-Mark': 0
    }},
  ]);
  const [offence, setOffence] = useState(true);
  const [score, setScore] = useState({
    'dark': 0,
    'light': 0
  });
  const [gameHistory, setGameHistory] = useState([]);
  const [gameTime, setGameTime] = useState('');
  const [gameTimer] = useState(new Timer({
    countdown: true,
    startValues: { minutes: gameLength }
  }));
  const [paused, setPaused] = useState(false);

  const getData = useCallback(() => {
    if (!remoteDB) return;
    setLoadingDB(true)
    remoteDB.allDocs({ include_docs: true }).then(res => {
      console.log('Documents fetched');
      console.log(res);
      setLoadingDB(false);
      res.rows.forEach(row => {
        if (row.doc._id === 'team-doc') setTeams(row.doc.teams);
        if (row.doc._id === 'game-history') setAllGameHistory(row.doc.games);
      })
    })
  }, [remoteDB])

  // get data from the DB when ready
  useEffect(() => {
    if (!remoteDB) return;
    remoteDB.info();
    getData();
  }, [remoteDB, getData])

  // handle remote document update
  const handleRemoteUpdate = (doc) => {
    // TODO update the state on remote update.
    console.log(doc)
  }

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

  // set the game clock to initial value when gameLength changes
  useEffect(() => {
    setGameTime(`${gameLength.toString().padStart(2, 0)}:00`);
    gameTimer.addEventListener("secondsUpdated", (e) => {
      setGameTime(gameTimer.getTimeValues().toString(['minutes', 'seconds']))
    })
  }, [gameLength, gameTimer])

  // finish the game setup and set state for stat taking
  const finishSetup = (time, dark, light, statTeam, offence) => {
    setGameLength(parseInt(time));
    setDarkTeam(dark);
    setLightTeam(light);
    setStatTeam(statTeam);
    setOffence(offence);
    setShowSetup(false);
    let findTeam = teams.find(team => team.name === statTeam)
    setStatPlayers(findTeam.players)
  }

  const toggleOffence = () => {
    setOffence(!offence);
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
              gameLength={gameLength}
              darkTeam={darkTeam}
              lightTeam={lightTeam}
              statTeam={statTeam}
              offence={offence}
              score={score}
              setScore={setScore}
              gameHistory={gameHistory}
              setGameHistory={setGameHistory}
              gameTime={gameTime}
              startTimer={() => gameTimer.start()}
              pauseTimer={() => gameTimer.pause()}
              resetTimer={() => {
                gameTimer.reset()
                setGameTime(`${gameLength.toString().padStart(2, 0)}:00`)
              }}
              paused={paused}
              setPaused={setPaused}
              statPlayers={statPlayers}
              playerStats={playerStats}
              setPlayerStats={setPlayerStats}
              toggleOffence={toggleOffence}
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
          <Games
            allGameHistory={allGameHistory}
          />
        </Route>
      </Switch>
      <div className='bottom-nav'>
        <NavLink className='nav-link' to='/' exact activeClassName='nav-active'>Home</NavLink>
        <NavLink className='nav-link' to='/stats' activeClassName='nav-active'>Stats</NavLink>
        <NavLink className='nav-link' to='/subs' activeClassName='nav-active'>Subs</NavLink>
        <NavLink className='nav-link' to='/teams' activeClassName='nav-active'>Teams</NavLink>
        <NavLink className='nav-link' to='/games' activeClassName='nav-active'>Games</NavLink>
      </div>
      <ToastContainer
        position='bottom-center'
        transition={Slide}
        autoClose={false}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable={false}
        pauseOnHover={false}
      />
    </Router>
  );
}

export default App;
