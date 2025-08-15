import React from 'react'
import Header from './Header'
import IngredientsList from './components/IngredientsList'
import RecipeSection from './components/RecipeSection'
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
        <li key={ingredient.id}>{ingredient.body}
          <button onClick={(event) => {deleteIngredient(ingredient.id)}} className="btn-delete"><i className="fa-regular fa-trash-can"></i>
          </button>
        </li>
    ))
  //console.log(currentIngredientId, ingredients[0]);

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

  //onMouseEnter={(event) => {getId(ingredient.id)}}
  /*
  function getId(ingredientId) {
    setCurrentIngredientId(ingredientId)
    console.log(currentIngredientId);
  }
  */

  function deleteIngredient(ingredientId) {
    setIngredients(prevItem => {
      return prevItem.filter(item => {
        return item.id !== ingredientId
      })
    })
  }

  function resetPage() {
    location.reload()
  }

  const URL = 'http://localhost:8000/recipe'
  
  async function getRecipe() {
    const ingredientList = ingredients.map(item => {
      return [item.body]
    })
    console.log(`Using ${ingredientList} to get Recipe doggy!`)
    
    let response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(ingredientList),
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
        <IngredientsList
          addIngredients={addIngredients}
        />
        <ul>
          {ingredientsListItems}
        </ul>
        <br />
        <RecipeSection
          getRecipe={getRecipe}
          recipe={recipe}
          resetPage={resetPage}
        />
      </main>
    </>
  )
}

export default App
