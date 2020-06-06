import React, {} from 'react';
import { useRecipeState } from "../App.js";
import { useAuth0 } from "../react-auth0-spa";
import '../Recipe.css';
import heartLogo from "../assets/heart.png";
import sadLogo from "../assets/sad.png";
import saveLogo from "../assets/cookbook.png";

const Recipe = () => {

  let {recipe} = useRecipeState(); // checks context (from another age)
  const { user } = useAuth0();

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

      {Object.keys(recipe).length !== 0 && recipe.constructor === Object ? <RecipeComponent recipe={recipe} user={user}/> : <DefaultComponent/>}

    </div>
  );
}


function RecipeComponent ({recipe, user}) {

    localStorage.setItem('lastRenderedRecipe', JSON.stringify(recipe)); // caches what is rendered for later

    const updateRecipe = (id, change) => {
      console.log('update '+id+' with '+change+' patch request.');
      console.log('then add this change to'+user.name+' account. Only auth can vote!');
    }

    return (
      <div className="recipeContainer">
        <h2 style={{fontVariant:'petite-caps', marginBottom:'0'}}>{recipe.name}</h2>
        <p style={{display: recipe.anonymous ? 'none' : undefined, marginTop:'0', fontSize:'12px', color:'#73716C'}}>Uploaded by {recipe.uploadedBy}</p>
        <div className="ratingsContainer">
          <button onClick={() => user&&updateRecipe(recipe.id,'love')} style={{margin:'0 0.25rem', border: 'none', background: 'transparent'}}>
          {recipe.ratings.love} <img src={heartLogo} alt="" style={{maxHeight: '1rem'}}/></button>
          <button onClick={() => user&&updateRecipe(recipe.id,'bad')} style={{margin:'0 0.25rem', border: 'none', background: 'transparent'}}>
          {recipe.ratings.bad} <img src={sadLogo} alt="" style={{maxHeight: '1rem'}}/></button>
          <button onClick={() => user&&updateRecipe(recipe.id,'save')} style={{margin:'0 0.25rem', border: 'none', background: 'transparent'}}>
          {recipe.saves} <img src={saveLogo} alt="" style={{maxHeight: '1rem'}}/></button>
        </div>
        <div className="">
          <h3 style={{fontVariant:'petite-caps'}}>Ingredients</h3>
            {recipe.ingredients.sort((a,b) => a.optional && !b.optional ? 1 : -1 ).map((i,index) =>
              <div key={index} className="ingredientContainer">
                <p key={i.name}>{i.name}, {i.quantity} {i.optional ? '(optional)' : ''}</p>
              </div>
            )}
        </div>
        <div className="instructionContainer">
          <h3 style={{fontVariant:'petite-caps'}}>Instructions</h3>
            {
              recipe.instructions.map((i,index) =>
              <div key={index} className="">
                <p key={i.desc}>{i.desc}</p>
              </div>
            )
          }
        </div>

      </div>
    );
}

function DefaultComponent () {
  return (
    <div>
      <p>It looks like you haven't picked a recipe yet to view!</p>
      <p>Check out the home page, search page, or your profile to select one to display.</p>
    </div>
  );
}

export default Recipe;
