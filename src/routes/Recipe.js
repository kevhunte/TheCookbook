import React, {useEffect, useState} from 'react';
import { useRecipeState } from "../App.js";

const Recipe = () => {

  let {recipe} = useRecipeState(); // checks context (from another age)

  if(Object.keys(recipe).length === 0 && recipe.constructor === Object) {

    if(window.location.search.includes("id=")) {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      // send to recipes endpoint with id as query string. Set recipe on response
      recipe = {}
      // return a 404 component here if the API call is unsuccessful
    }
    else{
      // if no context, or id, render from localStorage
      recipe = JSON.parse(localStorage.getItem('lastRenderedRecipe')) || {};
    }
  }
  //If not there either, Default

  return (
    <div id="recipePage" className="recipePage page animated">

      {Object.keys(recipe).length !== 0 && recipe.constructor === Object ? <RecipeComponent recipe={recipe}/> : <DefaultComponent/>}

    </div>
  );
}


function RecipeComponent ({recipe}) {

    localStorage.setItem('lastRenderedRecipe', JSON.stringify(recipe)); // caches what is rendered for later

    return (
      <div className="">
        <p>{recipe.name}</p>
        <p style={{display: recipe.anonymous ? 'none' : undefined}}>Uploaded by {recipe.uploadedBy}</p>
        <p>{recipe.ratings.love}</p>
        <p>{recipe.ratings.bad}</p>
        <p>{recipe.saves}</p>
        <div>
        <h3>Ingredients</h3>
          {recipe.ingredients.map((i,index) =>
            <div key={index}>
              <p key={i.name}>{i.name}</p>
              <p key={i.quantity}>{i.quantity}</p>
            </div>
          )}
        </div>

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
