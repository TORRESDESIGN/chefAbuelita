import React from 'react';

function IngredientsList(props) {
	return (
		<form className="flex flex-sauce" action={props.addIngredients} hidden={props.hideInput}>
          <label htmlFor="ingredients"></label>
          <input id="ingredients" name="ingredients" type="text" placeholder="Cheese" required/>
          <button className="btn-add">+ Add Item</button>
        </form>
	)
}

export default IngredientsList