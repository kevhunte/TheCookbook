import React, {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/Home'
import Search from './routes/SearchRecipes';
import Profile from './routes/Profile';
import NotFoundPage from './routes/ErrorPage';
import NavBar from './components/navbar';
import './App.css';

const App = () => {
// handle auth for router here. Can pass auth value to components for conditional rendering

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
