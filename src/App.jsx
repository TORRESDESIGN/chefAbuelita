import React from 'react'
import Header from './Header'

function App() {

  return (
    <>
      <Header />
      <main>
        <form className="flex" action="addIngredients">
          <input type="text" placehoder="Tortillas" />
          <button className="btn-add">Add Item</button>
        </form>
      </main>
    </>
  )
}

export default App
