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
  duration: [500, 100]
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
  const [gameLength, setGameLength] = useState(25); //1 for testing
  const [darkTeam, setDarkTeam] = useState(''); //test str Dark
  const [lightTeam, setLightTeam] = useState(''); // test str Light Team
  const [showStatSetup, setShowStatSetup] = useState(true); //set false for testing
  const [showSubSetup, setShowSubSetup] = useState(true); ////set false for testing
  const [statTeam, setStatTeam] = useState(''); //test str Dark or Light
  const [playerStats, setPlayerStats] = useState([]);
  // hardcode playerStats for testing {"name":"Luke","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player2","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player3","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player4","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player5","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player6","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player7","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player8","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player9","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player10","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0}
  const [offense, setOffense] = useState(true);
  const [score, setScore] = useState({
    'dark': 0,
    'light': 0
  });
  const [gameHistory, setGameHistory] = useState([]);
  const [gameTime, setGameTime] = useState('');
  const [paused, setPaused] = useState(false);
  const [testGame, setTestGame] = useState(false);
  const [gameTimer] = useState(new Timer({
    countdown: true,
    callback: (timer) => {
      setGameTime(timer.getTimeValues().toString(['minutes', 'seconds']));
    }
  }));
  // state for sub page
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [subStats, setSubStats] = useState([]);
  // hardcode subStats for testing {"name":"Luke","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player2","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player3","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player4","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player5","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player6","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player7","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player8","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player9","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player10","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false}
  const [subInSelected, setSubInSelected] = useState(false);
  const [subOutSelected, setSubOutSelected] = useState(false);
  const [subPlayerSelected, setSubPlayerSelected] = useState('');
  const [subHistory, setSubHistory] = useState([]);

  const getData = useCallback(() => {
    if (!remoteDB) return;
    setLoadingDB(true)
    remoteDB.allDocs({ include_docs: true }).then(res => {
      console.log('Documents fetched');
      console.log(res);
      setLoadingDB(false);
      let newAllHistory = [];
      let newTeams = [];
      res.rows.forEach(row => {
        if (row.doc.docType === 'team' && !row.doc.deleted) {
          newTeams.push(row.doc);
        };
        if ((row.doc.docType === 'stats' || row.doc.docType === 'subs') && !row.doc.deleted) {
          newAllHistory.unshift(row.doc);
        }
      })
      setAllGameHistory(newAllHistory);
      setTeams(newTeams);
    })
  }, [remoteDB])

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
        if (changedDoc.docType === 'stats' || changedDoc.docType === 'subs') {
          let newAllHistory = [...allGameHistory];
          let gameInd = newAllHistory.findIndex(game => game._id === changedDoc._id);
          if (gameInd === -1) newAllHistory.push(changedDoc);
          else newAllHistory[gameInd] = changedDoc;
          setAllGameHistory(newAllHistory);
        }
        if (changedDoc.docType === 'team') {
          let newTeams = [...teams];
          let teamInd = newTeams.findIndex(team => team._id === changedDoc._id);
          if (teamInd === -1) newTeams.push(changedDoc);
          else newTeams[teamInd] = changedDoc;
          setTeams(newTeams);
        }
        console.log(`Remote update: ${changedDoc._id} - ${changedDoc.docType}`);
      } else {
        console.log('This was a local change');
      }
    }).on('active', () => console.log('Sync Active'))
      .on('error', () => console.log('Database Sync Error'));
    return () => {
      dbSync.cancel();
      console.log('Sync Cancelled');
    };
  }, [loadingDB, localDB, remoteDB, allGameHistory, teams])

  // set the game clock to initial value when gameLength changes
  useEffect(() => {
    setGameTime(`${gameLength.toString().padStart(2, 0)}:00`);
  }, [gameLength])

  // finish the game setup and set state for stat taking
  const finishSetup = (time, dark, light, statTeam, offense) => {
    setGameLength(parseInt(time));
    setDarkTeam(dark);
    setLightTeam(light);
    setStatTeam(statTeam);
    offense === 'subs' ? setShowSubSetup(false) : setShowStatSetup(false);
    let findTeam = teams.find(team => team.name === statTeam)
    if (offense === 'subs') {
      let initSubsStats = [];
      for (let player of findTeam.players) {
        initSubsStats.push({
          name: player,
          timeOnField: 0,
          lastTimeIn: `${time}:00`,
          shiftLengths: [],
        })
      }
      setSubStats(initSubsStats);
    } else {
      setOffense(offense);
      let initPlayerStats = [];
      for (let player of findTeam.players) {
        initPlayerStats.push({
          name: player,
          Touch: 0,
          Assist: 0,
          Point: 0,
          'T-Away': 0,
          Drop: 0,
          'D-Play': 0,
          GSO: 0,
          'GSO-Mark': 0
        })
      }
      setPlayerStats(initPlayerStats);
    }
  }

  const resetGame = () => {
    setGameLength(25);
    gameTimer.stop();
    setDarkTeam('');
    setLightTeam('');
    setStatTeam('');
    setShowStatSetup(true);
    setShowSubSetup(true);
    setPlayerStats([]);
    setSubStats([]);
    setGameHistory([]);
    setSubHistory([]);
    setGameStarted(false);
    setGameFinished(false);
    setSubPlayerSelected('');
    setSubInSelected(false);
    setSubOutSelected(false);
    setGameTime('25:00');
    setPaused(false);
    setTestGame(false);
    setScore({
      'dark': 0,
      'light': 0
    })
  }

  const saveGame = (gameType) => {
    let gameDate = new Date();
    let gameDetails = {
      _id: gameDate.toISOString(),
      date: gameDate,
      docType: gameType,
      darkTeam: darkTeam,
      lightTeam: lightTeam,
      statTeam: statTeam,
      gameLength: gameLength,
      testGame: testGame,
      statTaker: userID,
    }
    if (gameType === 'stats') {
      gameDetails.playerStats = playerStats;
      gameDetails.score = score;
      gameDetails.gameHistory = gameHistory;
      // download backup data
      let gameData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify([[...gameHistory], [...playerStats]]));
      let fileNameStat = `GameStats-${gameDate.getFullYear()}-${gameDate.getMonth() + 1}-${gameDate.getDate()}.json`;
      let element = document.createElement('a');
      element.setAttribute('href', gameData);
      element.setAttribute('download', fileNameStat);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    if (gameType === 'subs') {
      gameDetails.subStats = subStats;
      gameDetails.subHistory = subHistory;
      // download backup data
      let gameData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify([[...subHistory], [...subStats]]));
      let fileNameStat = `SubStats-${gameDate.getFullYear()}-${gameDate.getMonth() + 1}-${gameDate.getDate()}.json`;
      let element = document.createElement('a');
      element.setAttribute('href', gameData);
      element.setAttribute('download', fileNameStat);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    let newAllHistory = [...allGameHistory];
    newAllHistory.unshift(gameDetails);
    setAllGameHistory(newAllHistory);
    // add to the Database
    localDB.put(gameDetails);
    resetGame();
  }

  const toggleOffense = () => {
    setOffense(!offense);
  }

  const initSubHistory = () => {
    // add the first 4 players to the subHistory
    let newSubHistory = [];
    let time = new Date();
    for (let i = 0; i < 4; i++) {
      newSubHistory.push({
        date: time.toDateString(),
        time: time.toTimeString(),
        gameTime: gameTime,
        darkTeam: darkTeam,
        lightTeam: lightTeam,
        statTeam: statTeam,
        player: subStats[i].name,
        action: 'In',
        timeOnField: ''
      })
    }
    setSubHistory(newSubHistory);
  }

  const addSubHistory = (playerIn, playerOut, timeOn) => {
    // add an entry to the subHistory
    let newSubHistory = [...subHistory];
    let time = new Date();
    let inEntry = {
      date: time.toDateString(),
      time: time.toTimeString(),
      gameTime: gameTime,
      darkTeam: darkTeam,
      lightTeam: lightTeam,
      statTeam: statTeam,
      player: playerIn,
      action: 'In',
      timeOnField: ''
    };
    let outEntry = {
      date: time.toDateString(),
      time: time.toTimeString(),
      gameTime: gameTime,
      darkTeam: darkTeam,
      lightTeam: lightTeam,
      statTeam: statTeam,
      player: playerOut,
      action: 'Out',
      timeOnField: timeOn
    }
    newSubHistory.push(outEntry, inEntry);
    setSubHistory(newSubHistory);
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
              teams={teams}
              showStatSetup={showStatSetup}
              showSubSetup={showSubSetup}
              finishSetup={finishSetup}
              gameLength={gameLength}
              darkTeam={darkTeam}
              lightTeam={lightTeam}
              statTeam={statTeam}
              offense={offense}
              score={score}
              setScore={setScore}
              gameHistory={gameHistory}
              setGameHistory={setGameHistory}
              gameTime={gameTime}
              startTimer={() => {
                if (gameFinished) return;
                gameTimer.start({ startValues: { minutes: gameLength } })
                setPaused(false);
                if (!gameStarted && !gameFinished) {
                  setGameStarted(true);
                  gameTimer.addEventListener('targetAchieved', (e) => {
                    console.log('Time Finished');
                    setPaused(true);
                    setGameFinished(true);
                  })
                }
              }}
              pauseTimer={() => gameTimer.pause()}
              stopTimer={() => gameTimer.stop()}
              resetTimer={() => {
                gameTimer.reset()
                setGameTime(`${gameLength.toString().padStart(2, 0)}:00`)
              }}
              paused={paused}
              setPaused={setPaused}
              playerStats={playerStats}
              setPlayerStats={setPlayerStats}
              toggleOffense={toggleOffense}
              testGame={testGame}
              setTestGame={setTestGame}
              saveGame={saveGame}
              resetGame={resetGame}
            /> : <Redirect to='/' />}
        </Route>
        <Route path='/subs'>
          {userID ?
            <Subs
              userID={userID}
              teams={teams}
              darkTeam={darkTeam}
              lightTeam={lightTeam}
              statTeam={statTeam}
              finishSetup={finishSetup}
              setTestGame={setTestGame}
              showSubSetup={showSubSetup}
              showStatSetup={showStatSetup}
              gameLength={gameLength}
              gameTime={gameTime}
              startTimer={() => {
                if (gameFinished) return;
                gameTimer.start({ startValues: { minutes: gameLength } });
                setPaused(false);
                if (!gameStarted && !gameFinished) {
                  setGameStarted(true);
                  gameTimer.addEventListener('targetAchieved', (e) => {
                    console.log('Time Finished');
                    setPaused(true);
                    setGameFinished(true);
                  })
                  initSubHistory();
                }
              }}
              pauseTimer={() => gameTimer.pause()}
              stopTimer={() => gameTimer.stop()}
              resetTimer={() => {
                gameTimer.reset()
                setGameTime(`${gameLength.toString().padStart(2, 0)}:00`)
              }}
              paused={paused}
              setPaused={setPaused}
              subStats={subStats}
              setSubStats={setSubStats}
              subInSelected={subInSelected}
              setSubInSelected={setSubInSelected}
              subOutSelected={subOutSelected}
              setSubOutSelected={setSubOutSelected}
              subPlayerSelected={subPlayerSelected}
              setSubPlayerSelected={setSubPlayerSelected}
              addSubHistory={addSubHistory}
              resetGame={resetGame}
              saveGame={saveGame}
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
            setAllGameHistory={setAllGameHistory}
            localDB={localDB}
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
