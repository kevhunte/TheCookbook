import React, {useState} from 'react';
import { useAuth0 } from "../react-auth0-spa";

const NewRecipe = () => {

  const {user, loading} = useAuth0();

  const [payload, setPayload] = useState({});
  //update payload with form input

  if(loading || !user){
    return (
      <div id="newRecipe" className="newRecipe page animated">
        <UnauthComp/>
      </div>
    );
  }
  return (
    <div id="newRecipe" className="newRecipe page animated">
      <h2>Let's eat!</h2>
      <p>This page holds the form for users to upload new recipes</p>
    </div>
  );
}

function UnauthComp() {
  return (
    <>
      <h2>We'll wait for you here.</h2>
      <p>In order to upload a recipe, you have to log in!</p>
      <p>Click on the Log in button above. See you soon.</p>
    </>
  );
}

export default NewRecipe;
