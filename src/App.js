import React, {useState, useEffect, useContext} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import Home from './routes/Home'
import Search from './routes/SearchRecipes';
import Profile from './routes/Profile';
import Recipe from './routes/Recipe';
import NotFoundPage from './routes/ErrorPage';
import NavBar from './components/navbar';
import './App.css';

const App = () => {

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
        <RecipeProvider>
          <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/search" component={Search} />
              <Route path="/profile" component={Profile} />
              <Route path="/recipe" component={Recipe} />
              <Route component={NotFoundPage} />
          </Switch>
        </RecipeProvider>
        <div id="footer" className="footer">
          {'----Footer component----'}<br/>
          {'Not sure what to put here yet'}<br/>
          {'Contact my info?'}
        </div>
      </Router>
    </div>
  );
}

const RecipeProvider = ({children}) => {
  const [recipe, setRecipe] = useState({});

// shouldn't be a need for useEffect, no work done on mount

  const setRecipeState = (r) => {
    if(r){
      setRecipe(r);
    }
  }

  return (
    <RecipeContext.Provider
    value={{
      recipe,
      setRecipeState
    }}>
    // {children}
    </RecipeContext.Provider>
  );
};

export const RecipeContext = React.createContext();
export const useRecipeState = () => useContext(RecipeContext);
export default App;
