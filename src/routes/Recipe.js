import React, {useEffect, useState} from 'react';

const Recipe = ({recipe}) => {
  //pass in as a prop? useEffect to check. If not there, check in query string.
  //If not there either, display generic page. Give info?
  const handleInput = () => {
    if(recipe){
      //setState for recipe
    }
    else if(false){
      //pull from window.location
    }
    else{
      //nowhere expected, default behavior
    }
  }

  useEffect(() => {
    handleInput();
  },[]);

  return (
    <div id="recipePage" className="recipePage page animated">
      <p>{'The page that will show a particular recipe'}</p>
    </div>
  );
}

export default Recipe;
