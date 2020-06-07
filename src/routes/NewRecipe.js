import React, {useState} from 'react';
import { useAuth0 } from "../react-auth0-spa";

const NewRecipe = () => {

  const {user, loading} = useAuth0();

//schema
  const [formData, setFormData] = useState({
    "name":"",
    "ingredients":[
      {
        "ingredientName":"",
        "quantity": "",
        "optional": false
      }
    ],
    "instructions":[
      {
        "desc":""
      }
    ],
    "anonymous":false
  });

  const updateForm = (p, type, index) => {
    //console.log(p.target);
    let val = p.target.value;
    if(type === 'name'){
      setFormData({
        ...formData,
        "name":val
      });
    }
    else if (type === 'anonymous') {
      setFormData({
        ...formData,
        "anonymous":val
      });
    }
    else if (type === 'ingredients') {
      if(p.target.name === 'quantity') {
        setFormData({
         ...formData,
          "ingredients": formData.ingredients.map((i,ind) => index === ind ? {...i, "quantity":val} : i)
        });
      }
      else if(p.target.name === 'name') {
        setFormData({
         ...formData,
          "ingredients": formData.ingredients.map((i,ind) => index === ind ? {...i, "ingredientName":val} : i)
        });
      }
      else if(p.target.name === 'isOptional') {
        console.log('val gotten:',val, val === 'true');
        setFormData({
         ...formData,
          "ingredients": formData.ingredients.map((i,ind) => index === ind ? {...i, "optional": val === 'true'} : i)
        });
        console.log(...formData.ingredients);
      }
    }
    else if (type === 'instructions') {
      setFormData({
        ...formData,
        "instructions": formData.instructions.map((i,ind) => index === ind ? val : i)
      });
    }


  }

  const addEntry = (type) => {
    if(type === "ingredient"){
      setFormData({
        ...formData,
        "ingredients": [...formData.ingredients, {
          "ingredientName":"",
          "quantity": "",
          "optional": false
        }]
      })
    }
    else if(type === "instruction"){
      setFormData({
        ...formData,
        "instructions": [...formData.instructions, {
          "desc":""
        }]
      })
    }
  }

  const handleSubmit = (payload) => {
    // upload pic to bucket first
    // if fails, inform user. Ask to try with pic again or to try without if fails again
    // put a spinner until 202 comes back
  }

  // if(loading || !user){
  //   return (
  //     <div id="newRecipe" className="newRecipe page animated">
  //       <UnauthComp/>
  //     </div>
  //   );
  // }
  return (
    <div id="newRecipe" className="newRecipe page animated">
      <h2>Let's eat!</h2>
      <p>This page holds the form for users to upload new recipes</p>
      <div className="recipeFormContainer">
        <form id="newRecipeForm" onSubmit={(event) => event.preventDefault()}>
          <label>
          Name:&nbsp;
            <input type="text" placeholder="Johnny's Applesauce" value={formData.name} onChange={(n) => updateForm(n,'name')} autoComplete="off"/>
          </label>
          <br/>
          <label>
          Ingredients:<br/>
          {formData.ingredients.map((i, index) =>
            <div key={index}>
              <label>
              Name of Ingredient:&nbsp;
                <input key={i.name} name="name" type="text" placeholder="Cream Cheese" value={i.name} onChange={(n) => updateForm(n,'ingredients', index)} autoComplete="off"/>
              </label>
              <br/>
              <label>
              Measurement:&nbsp;
                <input key={i.value} name="quantity" type="text" placeholder="2 cups" value={i.value} onChange={(n) => updateForm(n,'ingredients', index)} autoComplete="off"/>
              </label>
              <br/>
              <label>
              Is this ingredient optional?&nbsp;
              Yes
              <input key={i.optional} type="radio" name="isOptional" value="true" onChange={(n) => updateForm(n,'ingredients', index)}/>
              No
              <input key={!i.optional} type="radio" name="isOptional" value="false" onChange={(n) => updateForm(n,'ingredients', index)}/>
              </label>
            </div>
          )}
          <button onClick={() => addEntry('ingredient')}>Add Another Ingredient</button>
          </label>
          <br/>
          <label>
          Instructions:<br/>
          {formData.instructions.map((i, index) =>
              <textarea key={index} placeholder="Bake at 350&deg;F for 30 minutes" value={i.desc} onChange={(n) => updateForm(n,'instructions', index)} autoComplete="off"/>
          )}
          <button onClick={() => addEntry('instruction')}>Add Another Instruction</button>
          </label>

            <input type="radio" name="isAnonymous" value="true" onChange={(n) => updateForm(n,'anonymous')}/>
            <input type="radio" name="isAnonymous" value="false" onChange={(n) => updateForm(n,'anonymous')}/>


        </form>
      </div>
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
