import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import endpoints from "../endpoints.json";
import heartLogo from "../assets/heart.png";
import sadLogo from "../assets/sad.png";

const Home = () => {
  const [latestRecipes,setlatestRecipes] = useState([]);

  const fetchLatestRecipes = async (endpoint, token) => {
    try{
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data.recipes);
      if(data.response === 200){
        setlatestRecipes(data.recipes);
      }
    }
    catch(e){
      console.error('error calling endpoint:',e);
    }
    finally {
      return null;
    }

  }

  useEffect(() => {
    //no querystrings. Default behavior for endpoint
    fetchLatestRecipes(endpoints.recipesEndpoint);


  },[]);

  return (
    <div id="home" className="home page animated">
      <br/>
        <TopRecipes latestRecipes={latestRecipes}/>
        <div className="homeContent">
        <p>{'Homepage for site!'}</p>
        <p>{'What the site is and what it is for'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
        <p>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>

        <p>{'Show how to download to homepage as a PWA once that part is ready'}</p>
        </div>
    </div>
  );
}

function TopRecipes({latestRecipes}){
// on click, head to the recipe route and set state to that recipe
  const history = useHistory();

  const toRecipePage = (recipe) => {
    if(recipe){
      // set state
      history.push("/recipe");
    }

  }

  return(
    <div className="topRecipes">
      <p> Latest recipes added to The Cookbook </p>
      <p> Populate recipe body on click and navigate to that route </p>
      {latestRecipes && latestRecipes.map((r, index) =>
        <div key={r.id} className="topRecipe">
          <p key={r.name} style={{fontVariant: 'all-petite-caps'}}>
            {r.name}
          </p>
          <p key={r.uploadedBy} style={{fontFamily:'monospace'}}>
            by {r.anonymous ? 'Anonymous' : r.uploadedBy}
          </p>
          <div key={r.ratings} className="topRecipeSubContent">

              <span style={{display: r.ratings.love ? undefined : 'none', margin:'0.1rem 0.3rem'}}>{r.ratings.love} <img src={heartLogo} style={{width:'1rem'}} alt=""/></span>

              <span style={{display: r.ratings.bad ? undefined : 'none'}}>{r.ratings.bad} <img src={sadLogo} style={{width:'1rem'}} alt=""/></span>

            <div key={index^2} className="">
              <button key={index} onClick={() => toRecipePage(r)} style={{padding:'0.5rem 1rem', borderRadius:'25px',background:'wheat',fontWeight:'550', border:'none'}}>{'View this recipe > '}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
