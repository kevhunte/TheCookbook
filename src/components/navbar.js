import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
//uses the App.css file in the App root

const NavBar = () => {
  // check if authenticated. Show user's picture if so
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
      <div id="navbar" className="navbar">
       <img className="navbarPicture" src="/favicon.png" alt="navbar icon"/>
        <Link to="/" className="navbar-brand">The Cookbook</Link>
        <div style={{display:'flex', flexGrow:'1'}}>
          <ul className="list-items" style={{marginLeft:'0'}}>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/profile">Profile</Link></li>
          </ul>
          <ul className="list-items" style={{marginRight:'0'}}>
          {/* eslint-disable-next-line*/}
          {!isAuthenticated && (<li><a href="#" onClick={() => loginWithRedirect({})}>Log&nbsp;in</a></li>)}
          {/* eslint-disable-next-line*/}
          {isAuthenticated && <li><a href="#" onClick={() => logout()}>Log&nbsp;out</a></li>}
          </ul>
        </div>
      </div>
  );
}


export default NavBar;
