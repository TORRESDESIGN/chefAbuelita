import React from 'react'
import Header from './Header'
//import axios from 'axios';

function App() {

  const [ingredients, setIngredients] = React.useState([]);
  //console.log(ingredients);
/*
  fetch("http://localhost:8000", {
    method: "POST",
    body: JSON.stringify({
      "ingredients": ingredients
    }),
    header: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(res => res.json())
    .then(json => console.log(json))
*/
  const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

  function addIngredients(formData) {
    const newIngredient = formData.get("ingredients")
    setIngredients(prevItem => {
      return [...prevItem, newIngredient]
    }) 
  }

  const URL = 'http://localhost:8000/recipe'
  async function getRecipe() {
    console.log(`Using ${ingredients} to get Recipe doggy!`)
    let response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(ingredients),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    if (response.ok) {
    const result = await response.json();
    console.log('Success:', result);
  } else {
    console.error('Error:', response.status, response.statusText);
  }

  }
  return (
    <>
      <Header />
      <main>
        <div className="info-wrappper">
          <i className="fa-solid fa-robot"></i>
          <details>
            <summary>Enter what ingredients you have amigo!</summary>
            <p>I'll give a delicious recipe you can cook.</p>
          </details>
        </div>
        <form className="flex" action={addIngredients} method="POST">
          <label htmlFor="ingredients"></label>
          <input id="ingredients" name="ingredients" type="text" placeholder="Cheese" />
          <button className="btn-add">+ Add Item</button>
        </form>
        <ul>
          {ingredientsListItems}
        </ul>
        <br />
        <button className="btn-get" onClick={getRecipe}>Get Recipe!</button>
      </main>
    </>
  )
}

export default App
