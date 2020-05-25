import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
//uses the App.css file in the App root

const NavBar = () => {
  // check if authenticated. Show user's picture if so
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <div id="navbar" className="navbar">
       <img className="navbarPicture" src="/favicon.png" alt="navbar icon"/>
        <Link to="/" className="navbar-brand">The Cookbook</Link>
        <div>
          <ul className="list-items">
              <li><Link to="/search">Recipes</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              {!isAuthenticated && (
            <li><button onClick={() => loginWithRedirect({})}>Log in</button></li>
          )}

          {isAuthenticated && <li><button onClick={() => logout()}>Log out</button></li>}
          </ul>
        </div>
      </div>
    </div>
  );
}


export default NavBar;
