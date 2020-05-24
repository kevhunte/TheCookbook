import React from 'react';
//uses the App.css file in the App root

const NavBar = () => {
  // check if authenticated. Show user's picture if so
  return (
    <>
      <div id="navbar" className="navbar">
       <img className="navbarPicture" src="/favicon.png" alt="navbar icon"/>
        <a href="/" className="navbar-brand">The Cookbook</a>
        <div>
          <ul className="list-items">
              <li><a href="/search">Recipes</a></li>
              <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}


export default NavBar;
