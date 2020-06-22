import React, {useState, useEffect, useContext, Suspense} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import NotFoundPage from './routes/ErrorPage';
import NavBar from './components/navbar';
import './App.css';

const Home = React.lazy(() => import('./routes/Home'));
const Search = React.lazy(() => import('./routes/SearchRecipes'));
const Profile = React.lazy(() => import('./routes/Profile'));
const Recipe = React.lazy(() => import('./routes/Recipe'));
const NewRecipe = React.lazy(() => import('./routes/NewRecipe'));

const App = () => {

const { loading, user } = useAuth0();

  if (loading) {
    return (
      <Loading/>
    );
  }
  const toNewRecipes = () => {
    console.log('takes auth users to recipe page');
    history.push("/new");
  }

  return (
    <div className="App">
    <Router history={history}>
        <NavBar/>
        <RecipeProvider>
          <Suspense fallback={<Loading/>}>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/search" component={Search} />
                <Route path="/profile" component={Profile} />
                <Route path="/recipe" component={Recipe} />
                <Route path="/new" component={NewRecipe} />
                <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </RecipeProvider>
        <button id="toNewRecipePage" onClick={() => user&&toNewRecipes()} style={{display: user ? undefined : 'none'}}>+</button>
        <div id="footer" className="footer">
          {'----Footer component----'}<br/>
          {'Not sure what to put here yet'}<br/>
          {'Contact my info?'}
        </div>
      </Router>
    </div>
  );
}

function Loading(){
  // this looks ugly, fix later
  return(
    <div className="">Loading...</div>
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
    {children}
    </RecipeContext.Provider>
  );
};

export const RecipeContext = React.createContext();
export const useRecipeState = () => useContext(RecipeContext);
export default App;
