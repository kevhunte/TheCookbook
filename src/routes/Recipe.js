import React, {useEffect, useState} from 'react';
import { useRecipeState } from "../App.js";

const Recipe = () => {
  let {recipe}  = useRecipeState();
  // If not in context, check localStorage. If not there, check in query string and call API
  //If not there either, display generic page.

  return (
    <div id="recipePage" className="recipePage page animated">

      {Object.keys(recipe).length !== 0 && recipe.constructor === Object ? <RecipeComponent recipe={recipe}/> : <DefaultComponent/>}

    </div>
  );
}


function RecipeComponent ({recipe}) {
    // checks if recipe is set
    return (
      <div style={{display: recipe ? undefined : 'none'}}>
        <p>{recipe.name}</p>
        <p>{recipe.ratings.love}</p>
        <p>{recipe.ratings.bad}</p>
        <p>{recipe.saves}</p>
        <p style={{display: recipe.anonymous ? 'none' : undefined}}>Uploaded by {recipe.uploadedBy}</p>
      </div>
    );
}

function DefaultComponent () {
  // default recipe component
  return (
    <div>
      <p>It looks like you haven't picked a recipe yet to view!</p>
      <p>Check out the home page, search page, or your profile to select one to display.</p>
    </div>
  );
}

export default Recipe;
