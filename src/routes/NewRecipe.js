import React, {useState} from 'react';
import { useAuth0 } from "../react-auth0-spa";

const CHAR_LIMIT = 200;
const CHAR_LIMIT_SHORT = 50;

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

  const [photoFeedBack, setPhotoFeedback] = useState("");

  const charCount = (word) => word.length;

  const updateForm = (p, type, index) => {
    let val = p.target.value;
    if(type === 'name'){
      setFormData({
        ...formData,
        "name": charCount(val) <= CHAR_LIMIT_SHORT ? val : formData.name
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
          "ingredients": formData.ingredients.map((i,ind) => index === ind && charCount(val) < CHAR_LIMIT_SHORT ? {...i, "quantity":val} : i)
        });
      }
      else if(p.target.name === 'name') {
        setFormData({
         ...formData,
          "ingredients": formData.ingredients.map((i,ind) => index === ind && charCount(val) < CHAR_LIMIT_SHORT ? {...i, "ingredientName":val} : i)
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
      //console.log('character count:',charCount(val));
      setFormData({
        ...formData,
        "instructions": formData.instructions.map((i,ind) => index === ind && charCount(val) < CHAR_LIMIT ? {"desc":val} : i)
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

  const checkImage = (image) => {
    //const image = e.target.files[0];
    if(image){
      const sizeInKB = Math.ceil(image.size / 1024);
      console.log('Got image:',image, sizeInKB);
      if (sizeInKB <= 2000){
        // under 2mb
        setPhotoFeedback("Good!");
      }
      else {
        setPhotoFeedback("Please upload a picture under 2MB");
      }
    }
  }

  const handleSubmit = () => {
    // make sure first ingredient and instruction aren't empty and over a certain length
    // cycle through formData and verify values in keys

    // upload pic to bucket first
    // if fails, inform user. Ask to try with pic again or to try without if fails again
    // put a spinner until 202 comes back
  }

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
      <p>Upload an amazing recipe for the world to see</p>
      <div className="recipeFormContainer">
        <form id="newRecipeForm" onSubmit={(event) => event.preventDefault()} style={{margin:'0 0 2rem 0'}}>

          <label style={{margin:'0.15rem 0'}}>
          <h4>Name:</h4>
            <input type="text" placeholder="Recipe Name" value={formData.name} onChange={(n) => updateForm(n,'name')} autoFocus="on" autoComplete="off"/>
          </label>
          <div style={{margin:'1rem 0'}}>
          Upload a photo:&nbsp;
          <input id="photoObj" type="file" name="photo" accept="image/*" onChange={(e) => checkImage(e.target.files[0])}/>
          {photoFeedBack}
          </div>

          <div style={{margin:'1rem 0'}}>
          <h4>Ingredients:</h4>
          {formData.ingredients.map((i, index) =>
            <div key={index} style={{margin:'1rem 0'}}>
              <label style={{margin:'0.15rem 0'}}>
              Name of Ingredient:&nbsp;
                <input key={index+'a'} name="name" type="text" placeholder="Ingredient name" value={i.ingredientName} onChange={(n) => updateForm(n,'ingredients', index)} autoComplete="off"/>
              </label>
              <label style={{margin:'0.15rem 0'}}>
              Measurement:&nbsp;
                <input key={index+'b'} name="quantity" type="text" placeholder="Quantity ex. two cups" value={i.quantity} onChange={(n) => updateForm(n,'ingredients', index)} autoComplete="off"/>
              </label>
              <label style={{margin:'0.15rem 0'}}>
              Is this ingredient optional?&nbsp;
              Yes
              <input key={'r'+index} type="radio" name={"isOptional"+index} value="true" onChange={(n) => updateForm(n,'ingredients', index)}/>
              No
              <input key={'j'+index} type="radio" name={"isOptional"+index} value="false" onChange={(n) => updateForm(n,'ingredients', index)}/>
              </label>
              <button key={'k'+index} onClick={() => deleteEntry('ingredient',index)}
              style={{
                display: formData.ingredients.length > 1 ? undefined : 'none',
                color:'white', background:'red', padding:'0.5rem 1rem',
                border:'none', borderRadius:'15px', fontWeight:'600', margin:'0 1rem'}}>Delete
              </button>
            </div>
          )}
          <button onClick={() => addEntry('ingredient')}
          style={{
            color:'white', background:'#5ACF3D', padding:'0.5rem 1rem',
            border:'none', borderRadius:'15px', fontWeight:'600', margin:'0 1rem'}}
          >Add Another Ingredient</button>
          </div>

          <div style={{margin:'1rem 0'}}>
          <h4>Instructions:</h4>
          {formData.instructions.map((i, index) =>
            <div key={index} style={{margin:'1rem 0'}}>
              <textarea key={index^2+1} placeholder="Bake at 350&deg;F for 30 minutes" value={i.desc} onChange={(n) => updateForm(n,'instructions', index)} autoComplete="off"/>
              <button key={index^2+2} onClick={() => deleteEntry('instruction',index)}
              style={{display: formData.instructions.length > 1 ? undefined : 'none',
              color:'white', background:'red', padding:'0.5rem 1rem',
              border:'none', borderRadius:'15px', fontWeight:'600', margin:'0 1rem'}}>Delete
              </button>
            </div>
          )}
          <button onClick={() => addEntry('instruction')}
          style={{
            color:'white', background:'#5ACF3D', padding:'0.5rem 1rem',
            border:'none', borderRadius:'15px', fontWeight:'600', margin:'0 1rem'}}
          >Add Another Instruction</button>
          </div>

          <div style={{margin:'1rem 0'}}>
          <label style={{margin:'0.15rem 0'}}>
            Upload Anonymously?&nbsp;
            Yes
            <input type="radio" name="isAnonymous" value="true" onChange={(n) => updateForm(n,'anonymous')}/>
            No
            <input type="radio" name="isAnonymous" value="false" onChange={(n) => updateForm(n,'anonymous')}/>
          </label>
          </div>

          <button>Create</button>

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
