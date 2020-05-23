import React, {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/Home'
import Search from './routes/SearchRecipes';
import Profile from './routes/Profile';
import NotFoundPage from './routes/ErrorPage';
//import logo from './logo.svg';
import './App.css';

const App = () => {
  const routes = [
    {'path':'/', 'name':'Home'},
    {'path':'/search', 'name':'Search'},
    {'path':'/profile', 'name':'Profile'}
  ];


  return (
    <div className="App">
      <div id="navbar" className="navbar">
        <a href="/" className="navbar-brand">The Cookbook</a>
        <div>
          <ul className="list-items">
              <li><a href="/search">Recipes</a></li>
              <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
      </div>
      <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/search" component={Search} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFoundPage} />
      </Switch>
      <div id="footer" className="footer">
        {'----Footer component----'}<br/>
        {'Not sure what to put here yet'}<br/>
        {'Contact my info?'}
      </div>
    </div>
  );
}

export default App;
