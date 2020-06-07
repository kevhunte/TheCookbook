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
        "anonymous":val === 'true'
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
      else if(p.target.type === 'radio') {
        //console.log('val gotten:',val, val === 'true');
        setFormData({
         ...formData,
          "ingredients": formData.ingredients.map((i,ind) => index === ind ? {...i, "optional": val === 'true'} : i)
        });
      }
    }
    else if (type === 'instructions') {
      setFormData({
        ...formData,
        "instructions": formData.instructions.map((i,ind) => index === ind ? {"desc":val} : i)
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

  const deleteEntry = (type, index) => {
    if (type === 'ingredient'){
      let newList = formData.ingredients.filter((i, ind) => ind !== index);
      //console.log(...newList);
      setFormData({
        ...formData,
        "ingredients":newList
      });
    }
    else if (type === 'instruction'){
      let newList = formData.instructions.filter((i, ind) => ind !== index);
      //console.log(...newList);
      setFormData({
        ...formData,
        "instructions": newList
      });
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
                <input key={index+'a'} name="name" type="text" placeholder="Cream Cheese" value={i.ingredientName} onChange={(n) => updateForm(n,'ingredients', index)} autoComplete="off"/>
              </label>
              <br/>
              <label>
              Measurement:&nbsp;
                <input key={index+'b'} name="quantity" type="text" placeholder="2 cups" value={i.quantity} onChange={(n) => updateForm(n,'ingredients', index)} autoComplete="off"/>
              </label>
              <br/>
              <label>
              Is this ingredient optional?&nbsp;
              Yes
              <input key={'r'+index} type="radio" name={"isOptional"+index} value="true" onChange={(n) => updateForm(n,'ingredients', index)}/>
              No
              <input key={'j'+index} type="radio" name={"isOptional"+index} value="false" onChange={(n) => updateForm(n,'ingredients', index)}/>
              </label>
              <button key={'k'+index} onClick={() => deleteEntry('ingredient',index)} style={{display: formData.ingredients.length > 1 ? undefined : 'none'}}>Delete Ingredient</button>
            </div>
          )}
          <button onClick={() => addEntry('ingredient')}>Add Another Ingredient</button>
          </label>
          <br/>
          <label>
          Instructions:<br/>
          {formData.instructions.map((i, index) =>
            <div key={index}>
              <textarea key={index^2+1} placeholder="Bake at 350&deg;F for 30 minutes" value={i.desc} onChange={(n) => updateForm(n,'instructions', index)} autoComplete="off"/>
              <button key={index^2+2} onClick={() => deleteEntry('instruction',index)} style={{display: formData.instructions.length > 1 ? undefined : 'none'}}>Delete Step</button>
            </div>
          )}
          <button onClick={() => addEntry('instruction')}>Add Another Instruction</button>
          </label>
          <br/>
          <label>
            Upload Anonymously?&nbsp;
            Yes
            <input type="radio" name="isAnonymous" value="true" onChange={(n) => updateForm(n,'anonymous')}/>
            No
            <input type="radio" name="isAnonymous" value="false" onChange={(n) => updateForm(n,'anonymous')}/>
          </label>

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
