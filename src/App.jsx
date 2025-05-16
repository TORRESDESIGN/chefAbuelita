import React from 'react'
import Header from './Header'
import ReactMarkdown from 'react-markdown'
//import axios from 'axios';

function App() {

  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  //console.log(recipe, recipe.length);

  const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

  function addIngredients(formData) {
    document.getElementById("btn-get").disabled = false;
    const newIngredient = formData.get("ingredients")
    setIngredients(prevItem => {
      return [...prevItem, newIngredient]
    }) 
  }

  function undo() {
    setIngredients(prevItem => {
      prevItem.pop()
      return [...prevItem]
    })
    document.getElementById("btn-get").disabled = true;
    console.log(ingredients);
  }

  function resetPage() {
    location.reload()
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
    setRecipe(result.message)
    console.log('Success:', result.message);
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
            <summary>What it is this app for?</summary>
            <ol>
              <li>Enter what ingredients(🍅🥩🥔) you have amigo!</li>
              <li>I'll give a delicious recipe you can cook!🍳</li>
            </ol>
          </details>
        </div>
        <form className="flex flex-sauce" action={addIngredients} method="POST">
          <label htmlFor="ingredients"></label>
          <input id="ingredients" name="ingredients" type="text" placeholder="Cheese" required/>
          <button className="btn-add">+ Add Item</button>
        </form>
        <ul>
          {ingredientsListItems}
          {ingredients.length > 0 && <button className="btn-undo" onClick={undo}>undo</button>}
        </ul>
        <br />
        <section className="recipe-container" aria-live="polite">
          {!recipe && <div className="flex-me">
          <h3>Ready to get cooking?</h3>
          <p>Generate a Mexican dish recipe from the list of ingredients.</p>
          <button id="btn-get" className="btn-get" onClick={getRecipe} disabled>Get Recipe!</button>
          </div>
          }
          {recipe && <hr />}
          <ReactMarkdown>{recipe}</ReactMarkdown>
          {recipe && <button className="btn-refresh" onClick={resetPage}>Reset</button>}
        </section>
      </main>
    </>
  )
}

export default App
