import React from 'react'
import Header from './Header'

function App() {

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
        <form className="flex" action="addIngredients">
          <label htmlFor="ingredients"></label>
          <input id="ingredients" name="ingredients" type="text" placeholder="Cheese" />
          <button className="btn-add">+ Add Item</button>
        </form>
      </main>
    </>
  )
}

export default App
