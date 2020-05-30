import React, {useState, useEffect} from 'react';
import endpoints from "../endpoints.json";

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
        <div className="topRecipes">
          <p> Pull this into its own component when it is time </p>
          <p> And make all of these elements interactive. </p>
          <p> Populate recipe body on click and navigate to that route </p>
          {latestRecipes && latestRecipes.map((r) =>
            <div key={r.id} className="">
              <p key={r.name}>
                {r.name}
              </p>
              <p style={{display: r.anonymous ? 'none' : undefined}} key={r.uploadedBy}>
                by {r.uploadedBy}
              </p>
              <div key={r.ratings}>
                <p>{r.ratings.love}</p>
                <p>{r.ratings.good}</p>
                <p>{r.ratings.bad}</p>
              </div>
            </div>
          )}
        </div>
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


export default Home;
