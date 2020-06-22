import React, {useState} from 'react';
import { useAuth0 } from "../react-auth0-spa";

const CHAR_LIMIT = 200;
const CHAR_LIMIT_SHORT = 50;

const NewRecipe = () => {

  const {user, loading} = useAuth0();

  //schema
  const schema = {
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
}

  const [formData, setFormData] = useState(schema);

  const [photoFeedBack, setPhotoFeedback] = useState("");
  let imageObj = null;

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
      const sizeInMB = (image.size / 1024 / 1024).toFixed(2);
      //console.log('Got image:',image, sizeInKB);
      if (sizeInMB <= 2){
        // under 2mb
        setPhotoFeedback("Good!");
        imageObj = image;
        //console.log(imageObj);
        return true;
      }
      else {
        setPhotoFeedback("Please upload a picture under 2MB");
        imageObj = null;
        return false;
      }
    }
  }

  const checkStringInput = (input) => {
    // strip out non chars / non-significant input
    if (input) {
      let processed = input.replace(/[^a-zA-Z0-9\d]+/g, '');
      //console.log('original:',input,'processed:', processed);

      return processed.length >= 5;
    }
    return false;
  }

  const handleSubmit = () => {
    // make sure first ingredient and instruction aren't empty and over a certain length
    // regex to replace non chars. Then check if length equal to or greater than 5
    // cycle through formData and verify values in keys
    for (const ing of formData.ingredients) {
      let name = ing.ingredientName
      let quant = ing.quantity

      if (checkStringInput(name) && checkStringInput(quant)) {
        continue;
      }
      else {
        //invalid input, tell user to fix it
        console.log('invalid ingredient sent');
        return;
      }
    }


    for (const ins of formData.instructions) {
      let desc = ins.desc

      if (checkStringInput(desc)) {
        continue;
      }
      else {
        //invalid input, tell user to fix it
        console.log('invalid instruction sent');
        return;
      }
    }

    //
    // upload pic to bucket first. Pull from imageObj
    // if fails, inform user. Ask to try with pic again or to try without if fails again
    // put a spinner until 202 comes back
  }

  // if(loading || !user){
          /*Security*/
  //   return (
  //     <div id="newRecipe" className="newRecipe page animated">
  //       <UnauthComp/>
  //     </div>
  //   );
  // }
  return (
    <div id="newRecipe" className="newRecipe page animated">
      <h2>Let's eat!</h2>
      <p>Upload an amazing recipe for the world to see</p>
      <div className="recipeFormContainer">
        <form id="newRecipeForm" onSubmit={(event) => event.preventDefault()} style={{margin:'0 0 2rem 0'}}>

          <label style={{margin:'0.15rem 0'}}>
          <h4>Name:</h4>
            <input type="text" placeholder="Recipe Name" value={formData.name} onChange={(n) => updateForm(n,'name')} required autoFocus="on" autoComplete="off"/>
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
                <input key={index+'a'} name="name" type="text" placeholder="Ingredient name" value={i.ingredientName} onChange={(n) => updateForm(n,'ingredients', index)} required={!i.optional || formData.ingredients.length === 1} autoComplete="off"/>
              </label>
              <label style={{margin:'0.15rem 0'}}>
              Measurement:&nbsp;
                <input key={index+'b'} name="quantity" type="text" placeholder="Quantity ex. two cups" value={i.quantity} onChange={(n) => updateForm(n,'ingredients', index)} required={!i.optional || formData.ingredients.length === 1} autoComplete="off"/>
              </label>
              <label style={{margin:'0.15rem 0'}}>
              Is this ingredient optional?&nbsp;
              Yes
              <input key={'r'+index} type="radio" name={"isOptional"+index} value="true" checked={i.optional} onChange={(n) => updateForm(n,'ingredients', index)}/>
              No
              <input key={'j'+index} type="radio" name={"isOptional"+index} value="false" checked={!i.optional} onChange={(n) => updateForm(n,'ingredients', index)}/>
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
              <textarea key={index^2+1} placeholder="Bake at 350&deg;F for 30 minutes" value={i.desc} onChange={(n) => updateForm(n,'instructions', index)} required={index === 0 || formData.instructions.length === 1} autoComplete="off"/>
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
            <input type="radio" name="isAnonymous" value="false" checked onChange={(n) => updateForm(n,'anonymous')}/>
          </label>
          </div>

          <button onClick={() => handleSubmit()} >Create</button>

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
