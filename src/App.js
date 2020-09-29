import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Timer from 'easytimer.js';
import { ToastContainer, cssTransition, toast } from 'react-toastify';

// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Styles
import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Home from './Components/Home';
import Stats from './Components/Stats';
import Subs from './Components/Subs';
import Teams from './Components/Teams';
import Games from './Components/Games';
import ServiceWorkerToast from './Components/Toasts/ServiceWorkerToast';

// assets
import defaultProfile from './assets/profile-avatars/050.svg';

const Slide = cssTransition({
  enter: 'toast-in',
  exit: 'toast-out',
  duration: [500, 100]
})

const firebaseConfig = {
  apiKey: "AIzaSyCrkAF4y3mmQsutAmonYLVmJbhUQiYHe98",
  authDomain: "afcpl-stats.firebaseapp.com",
  databaseURL: "https://afcpl-stats.firebaseio.com",
  projectId: "afcpl-stats",
  storageBucket: "afcpl-stats.appspot.com",
  messagingSenderId: "776486237669",
  appId: "1:776486237669:web:cc37c431513793409feb0c",
  measurementId: "G-CC84WXERHT"
};

const uiConfig = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  credentialHelper: 'none',
  signInFlow: 'popup',
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
}

// Instantiate a Firebase app and database
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
// enable the offline database capability
db.enablePersistence()
  .then(() => console.log('Offline Database Active'))
  .catch(err => {
    if (err.code === 'failed-precondition') {
      console.error('Multiple tabs open, persistence can only be enabled in one tab at a a time.', err)
    } else if (err.code === 'unimplemented') {
      console.error('The current browser does not support all of the features required to enable persistence', err)
    }
  })

function App() {

  // set state (global)
  const [activePoint, setActivePoint] = useState(localStorage.getItem('activePoint') === 'true');
  const [activeTimeOut, setActiveTimeOut] = useState(localStorage.getItem('activeTimeOut') === 'true');
  const [activeGame, setActiveGame] = useState(localStorage.getItem('activeGame') === 'true');
  const [gameTime, setGameTime] = useState(localStorage.getItem('gameTime') || '00:00');
  const [gameTimeSecs, setGameTimeSecs] = useState(localStorage.getItem('gameTimeSecs') || 0);
  const [darkTeam, setDarkTeam] = useState(localStorage.getItem('darkTeam') || '') //test str Dark
  const [dbUser, setDbUser] = useState(null);
  const [fetchedGames, setFetchedGames] = useState([]);
  const [fetchedTeams, setFetchedTeams] = useState([]);
  const [gameFinished, setGameFinished] = useState(localStorage.getItem('gameFinished') === 'true');
  const [gameLength, setGameLength] = useState(localStorage.getItem('gameLength') || 25); //1 for testing
  const [gameStarted, setGameStarted] = useState(localStorage.getItem('gameStarted') === 'true');
  const [gameHistory, setGameHistory] = useState(localStorage.getItem('gameHistory') || []);
  const [lightTeam, setLightTeam] = useState(localStorage.getItem('lightTeam') || ''); // test str Light Team
  const [offense, setOffense] = useState(localStorage.getItem('offense') === 'true');
  const [playerStats, setPlayerStats] = useState(localStorage.getItem('playerStats') || []);
  // hardcode playerStats for testing {"name":"Luke","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player2","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player3","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player4","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player5","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player6","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player7","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player8","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player9","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0},{"name":"Player10","Touch":0,"Assist":0,"Point":0,"T-Away":0,"Drop":0,"D-Play":0,"GSO":0,"GSO-Mark":0}
  const [score, setScore] = useState(localStorage.getItem('score') || {
    'dark': 0,
    'light': 0
  });
  const [statTeam, setStatTeam] = useState(localStorage.getItem('statTeam') || ''); //test str Dark or Light
  const [testGame, setTestGame] = useState(localStorage.getItem('testGame') === 'true');

  // don't need? const [loadingDB, setLoadingDB] = useState(true);
  const [paused, setPaused] = useState(localStorage.getItem('paused') === 'true');
  const [showStatSetup, setShowStatSetup] = useState(localStorage.getItem('showStatSetup') === 'true'); //set false for testing
  const [showSubSetup, setShowSubSetup] = useState(localStorage.getItem('showSubSetup') === 'true'); ////set false for testing
  const [teams, setTeams] = useState(JSON.parse(localStorage.getItem('teams')) || []);
  // don't need? const [userID, setUserID] = useState(localStorage.getItem('userID') || '');

  // state for sub page
  const [subStats, setSubStats] = useState(localStorage.getItem('subStats') || []);
  // hardcode subStats for testing {"name":"Luke","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player2","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player3","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player4","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player5","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player6","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player7","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player8","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player9","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false},{"name":"Player10","timeOnField":0,"lastTimeIn":null,"chosen":false,"selected":false}
  const [subInSelected, setSubInSelected] = useState(localStorage.getItem('subInSelected') === 'true');
  const [subOutSelected, setSubOutSelected] = useState(localStorage.getItem('subOutSelected') === 'true');
  const [subPlayerSelected, setSubPlayerSelected] = useState(localStorage.getItem('subPlayerSelected') || '');
  const [subHistory, setSubHistory] = useState(JSON.parse(localStorage.getItem('subHistory')) || []);

  const [serviceWorkerInit, setServiceWorkerInit] = useState(false);
  const [serviceWorkerReg, setServiceWorkerReg] = useState(null);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.register({
    onSuccess: () => setServiceWorkerInit(true),
    onUpdate: reg => {
      setServiceWorkerReg(reg);
    },
  });

  // show service worker toast on first install
  useEffect(() => {
    if (serviceWorkerInit) {
      toast.success('App available for offline use.')
    }
  }, [serviceWorkerInit]);

  // allow user to update site when service worker changes and no active game
  useEffect(() => {
    if (!activeGame && serviceWorkerReg && serviceWorkerReg.waiting) {
      toast.info(
        <ServiceWorkerToast
          serviceWorkerReg={serviceWorkerReg}
        />,
        {
          closeOnClick: false,
          autoClose: false
        }
      );
    }
  }, [activeGame, serviceWorkerReg])

  const gameTimer = useRef(new Timer({
    callback: (timer) => {
      let newTime = (timer.getTimeValues().toString(['minutes', 'seconds']));
      let newTimeSecs = (timer.getTotalTimeValues().seconds);
      localStorage.setItem('currentGameTime', newTime);
      localStorage.setItem('curTimeSecs', newTimeSecs);
      setGameTime(newTime);
      setGameTimeSecs(newTimeSecs);
    }
  }))

  const loadUser = useCallback(() => {
    // get user from localStorage if loaded already
    if (localStorage.getItem('dbUser') !== 'null') {
      return
    }
    // get the user from the db and load into state
    // add the user to the database if doesn't exist
    db.collection('users').doc(user.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          let newDbUser = doc.data();
          setDbUser(newDbUser);
          console.log('User fetched from database')
        } else {
          let newDbUser = {
            creationTime: user.metadata.creationTime,
            email: user.email,
            name: user.displayName || '',
            profileURL: user.photoURL || defaultProfile,
            uid: user.uid,
          }
          db.collection('users').doc(user.uid)
            .set(newDbUser);
          setDbUser(newDbUser)
        }
      })
      .catch(error => console.error('Error loading User', error))
  }, [user]);

  // listen for realtime updates to dbUser if loaded
  useEffect(() => {
    let updateUser = null;
    if (user) {
      console.log('Adding snapshot listener')
      updateUser = db.collection('users').doc(user.uid)
        .onSnapshot((doc) => {
          console.log('firestore snapshot read')
          setDbUser(doc.data())
        })
    }
    return () => {
      if (updateUser !== null) {
        console.log('Removing snapshot listener')
        updateUser();
      }
    }
  }, [user])

  useEffect(() => {
    // show toast for successful update
    if (localStorage.getItem('serviceWorkerUpdated') === 'true') {
      toast.success('Site Updated');
      localStorage.setItem('serviceWorkerUpdated', 'false');
    }
    // listen for auth state changes
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        // user signed in
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // user signed out
        localStorage.removeItem('user');
        localStorage.removeItem('dbUser');
        setUser(user);
        setDbUser(null);
        setFetchedGames([]);
        setFetchedTeams([]);
        removeLocalGame();
      }
    })
    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      loadUser();
    }
  }, [user, loadUser]);

  // save game variables to localstorage to allow continuation of games on page reload
  useEffect(() => {
    localStorage.setItem('activePoint', activePoint);
    localStorage.setItem('activeTimeOut', activeTimeOut);
    localStorage.setItem('activeGame', activeGame);
    localStorage.setItem('gameTime', gameTime);
    localStorage.setItem('gameTimeSecs', gameTimeSecs);
    localStorage.setItem('darkTeam', darkTeam);
    localStorage.setItem('dbUser', JSON.stringify(dbUser));
    localStorage.setItem('fetchedGames', JSON.stringify(fetchedGames))
    localStorage.setItem('fetchedTeams', JSON.stringify(fetchedTeams))
    localStorage.setItem('gameFinished', gameFinished)
    localStorage.setItem('gameLength', gameLength)
    localStorage.setItem('gameStarted', gameStarted)
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory))
    localStorage.setItem('lightTeam', lightTeam)
    localStorage.setItem('offense', offense);
    localStorage.setItem('playerStats', JSON.stringify(playerStats));
    localStorage.setItem('score', JSON.stringify(score));
    localStorage.setItem('statTeam', statTeam);
    localStorage.setItem('testGame', testGame);
    localStorage.setItem('paused', paused);
    localStorage.setItem('showStatSetup', showStatSetup);
    localStorage.setItem('showSubSetup', showSubSetup);
    localStorage.setItem('teams', JSON.stringify(teams));
    localStorage.setItem('subStats', JSON.stringify(subStats));
    localStorage.setItem('subInSelected', subInSelected);
    localStorage.setItem('subOutSelected', subOutSelected);
    localStorage.setItem('subPlayerSelected', subPlayerSelected);
    localStorage.setItem('subHistory', JSON.stringify(subHistory));
  }, [activeGame,
      activePoint,
      activeTimeOut,
      darkTeam,
      dbUser,
      fetchedGames,
      fetchedTeams,
      gameFinished,
      gameHistory,
      gameLength,
      gameStarted, 
      gameTime,
      gameTimeSecs,
      lightTeam,
      offense,
      paused,
      playerStats,
      score,
      showStatSetup,
      showSubSetup,
      statTeam,
      subHistory,
      subInSelected,
      subOutSelected,
      subPlayerSelected,
      subStats,
      teams,
      testGame]);

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
    let opponent = statTeam === dark ? light : dark;
    let opponentTeam = teams.find(team => team.name === opponent);
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
          GM: findTeam.gm || '',
          VS: opponentTeam.gm || '',
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

  const removeLocalGame = () => {
    toast.dismiss();
    localStorage.removeItem('activePoint');
    localStorage.removeItem('activeTimeOut');
    localStorage.removeItem('activeGame');
    localStorage.removeItem('gameTime');
    localStorage.removeItem('gameTimeSecs');
    localStorage.removeItem('darkTeam');
    localStorage.removeItem('gameFinished');
    localStorage.removeItem('gameLength');
    localStorage.removeItem('gameStarted');
    localStorage.removeItem('gameHistory');
    localStorage.removeItem('lightTeam');
    localStorage.removeItem('offense');
    localStorage.removeItem('playerStats');
    localStorage.removeItem('score');
    localStorage.removeItem('statTeam');
    localStorage.removeItem('testGame');
    localStorage.removeItem('showStatSetup');
    localStorage.removeItem('showSubSetup');
    localStorage.removeItem('subStats');
    localStorage.removeItem('subInSelected');
    localStorage.removeItem('subOutSelected');
    localStorage.removeItem('subPlayerSelected');
    localStorage.removeItem('subHistory');
    localStorage.setItem('paused', 'true');
    // reset the state variables
    resetGame();
  }

  const resetGame = () => {
    setGameLength(25);
    gameTimer.current.stop();
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
      statTaker: dbUser.email,
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
    let newFetchedGames = [...fetchedGames];
    newFetchedGames.unshift(gameDetails);
    setFetchedGames(newFetchedGames);
    // add to the Database
    db.collection('games').doc(gameDetails._id)
      .set(gameDetails);
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
            db={db}
            firebaseApp={firebaseApp}
            uiConfig={uiConfig}
            dbUser={dbUser}
          />
        </Route>
        <Route path='/stats'>
          {user ?
            <Stats
              userID={user.email}
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
          {user ?
            <Subs
              userID={user.email}
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
          {user ?
            <Teams
              teams={teams}
              setTeams={setTeams}
              localDB={db}
            /> : <Redirect to='/' />}
        </Route>
        <Route path='/games'>
          <Games
            allGameHistory={fetchedGames}
            setAllGameHistory={setFetchedGames}
            localDB={db}
            teams={teams}
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
