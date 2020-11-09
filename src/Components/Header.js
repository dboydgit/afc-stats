import React from 'react';
import '../styles/Header.css';

export default function Header(props) {
  const signOut = () => {
    props.firebaseApp.auth().signOut();
    localStorage.clear();
  };

  return (
    <>
      <header className="app-header">
        <h1>{`AFC PL Stats`}</h1>
        {props.firebaseApp.auth().currentUser && (
          <button className="btn logout-btn" onClick={signOut}>
            Logout
          </button>
        )}
      </header>
      {process.env.REACT_APP_ENV === 'staging' && <h1>** STAGING SITE **</h1>}
    </>
  );
}
