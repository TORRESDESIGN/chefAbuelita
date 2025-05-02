import React from 'react'
import Header from './Header'
import ReactMarkdown from 'react-markdown'
//import axios from 'axios';

function App() {

  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  console.log(recipe, recipe.length);

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
        <section className="recipe-container">
          {!recipe && <div>
          <h3>Ready to get cooking?</h3>
          <p>Generate a Mexican dish recipe from the list of ingredients.</p>
          <button className="btn-get" onClick={getRecipe}>Get Recipe!</button>
          </div>
          }
          {recipe && <hr />}
          <ReactMarkdown>{recipe}</ReactMarkdown>
        </section>
      </main>
    </>
  )
}

export default App
