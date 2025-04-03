import React from 'react'
import Header from './Header'

function App() {

  const [ingredients, setIngredients] = React.useState(["cheese"]);
  console.log(ingredients);

  const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

  function addIngredients(formData) {
    const newIngredient = formData.get("ingredients")
    setIngredients(prevItem => {
      return [...prevItem, newIngredient]
    }) 
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
      </main>
    </>
  )
}

export default App
