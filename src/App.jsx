import React from 'react'
import Header from './Header'
import IngredientsList from './components/IngredientsList'
import RecipeSection from './components/RecipeSection'

//import axios from 'axios';

function App() {

  const [ingredients, setIngredients] = React.useState([]);
  const [currentIngredientId, setCurrentIngredientId] = React.useState(
    (ingredients[0] && ingredients[0].id) || ""
  ) // if there is an ingredient in state ingredients(not empty), then assign the .id othersiset assign "" 
  const [recipe, setRecipe] = React.useState("");
  const [hideInput, setHideInput] = React.useState(false);
  const [hideIngredients, setHideIngredients] = React.useState(false);
  const isDisabled = ingredients.length === 0;
  let uuid = self.crypto.randomUUID(); //generates random keys method | fast and lightweight

  const ingredientsListItems = ingredients.map((ingredient) => (
        <li key={ingredient.id} hidden={hideIngredients}>{ingredient.body}
          <button onClick={(event) => {deleteIngredient(ingredient.id)}} className="btn-delete"><i className="fa-regular fa-trash-can"></i>
          </button>
        </li>
    ))

/*
  //working function(old)
  function addIngredients(formData) {
    const newIngredient = {
      id: uuid,
      body: formData.get("ingredients").toLowerCase()
    }
    setIngredients(prevItem => {
      return [...prevItem, newIngredient]
    })
    setCurrentIngredientId(newIngredient.id)
  }
  */
  //remove duplicates working function
  
  function addIngredients(formData) {
  const ingredientBody = formData.get("ingredients").toLowerCase();
  
    setIngredients(prevItems => {
      // Check if already exists
      if (prevItems.some(item => item.body === ingredientBody)) {
        return prevItems; // Return unchanged state
      }
      
      const newIngredient = {
        id: uuid,
        body: ingredientBody
      };
      
      setCurrentIngredientId(newIngredient.id);
      return [...prevItems, newIngredient];
    });
  }


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
      setHideInput(prevState => !prevState)
      setHideIngredients(prevState => !prevState)
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
          hideInput={hideInput}
        />
        <ul>
          {ingredientsListItems}
        </ul>
        <br />
        <RecipeSection
          getRecipe={getRecipe}
          recipe={recipe}
          resetPage={resetPage}
          isDisabled={isDisabled}
        />
      </main>
    </>
  )
}

export default App
