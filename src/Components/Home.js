import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Header from './Header';

// Firebase
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default function Home(props) {

  return (
    <div className='App'>
      <Header firebaseApp={props.firebaseApp}/>
      <div className='home-content'>
        {!props.dbUser &&
          <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={props.firebaseApp.auth()} />
        }
        {props.dbUser &&
          <>
            <p>{`Welcome, ${props.dbUser.name || props.dbUser.email}`}</p>
            <div className="home-btn-group">
              <Link
                className='btn'
                to='/stats'>Stats
                            </Link>
              <Link
                className='btn'
                to='/subs'>Subs
                            </Link>
              <Link
                className='btn'
                to='/teams'>Teams
                            </Link>
              <Link
                className='btn'
                to='/games'>Past Games
                            </Link>
            </div>
          </>
        }
      </div>
    </div>
  )
}
