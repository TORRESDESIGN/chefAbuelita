import React from 'react'
import Header from './Header'
import ReactMarkdown from 'react-markdown'
//import axios from 'axios';

function App() {

  const [ingredients, setIngredients] = React.useState([]);
  const [currentIngredientId, setCurrentIngredientId] = React.useState(
    (ingredients[0] && ingredients[0].id) || ""
  ) // if there is an ingredient in state ingredients(not empty), then assign the .id othersiset assign "" 
  const [recipe, setRecipe] = React.useState("");
  let uuid = self.crypto.randomUUID(); //generates random keys method | fast and lightweight

  const ingredientsListItems = ingredients.map((ingredient) => (
        <li key={ingredient.id}>{ingredient.body}<button className="btn-delete" onClick={undo}><i className="fa-regular fa-trash-can"></i></button></li>
    ))
  console.log(ingredientsListItems);

  function addIngredients(formData) {
    document.getElementById("btn-get").disabled = false;
    const newIngredient = {
      id: uuid,
      body: formData.get("ingredients")
    }
    setIngredients(prevItem => {
      return [...prevItem, newIngredient]
    })
    setCurrentIngredientId(newIngredient.id)
  }

  function undo() { 
    
    //document.getElementById("btn-get").disabled = true;
    //console.log(ingredients);
  }

  function resetPage() {
    location.reload()
  }

  const URL = 'http://localhost:8000/recipe'
  async function getRecipe() {
    console.log(`Using ${ingredients.body} to get Recipe doggy!`)
    let response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(ingredients.body),
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
        </ul>
        <br />
        <section className="recipe-container" aria-live="polite">
          {!recipe && <div className="flex-column">
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
