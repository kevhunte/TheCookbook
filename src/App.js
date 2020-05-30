import React, {useState, useEffect} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import Home from './routes/Home'
import Search from './routes/SearchRecipes';
import Profile from './routes/Profile';
import NotFoundPage from './routes/ErrorPage';
import NavBar from './components/navbar';
import './App.css';

const App = () => {
  // control state of recipe here. Accessible from all routes

const { loading } = useAuth0();

  if (loading) {
    return (
      <div className="">Loading...</div>
    ); // create a loading component because this looks ugly
  }

  return (
    <div className="App">
    <Router history={history}>
        <NavBar/>
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
      </Router>
    </div>
  );
}

export default App;
