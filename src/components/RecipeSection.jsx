import React from 'react';
import ReactMarkdown from 'react-markdown'

function RecipeSection(props) {
	return (
		<section className="recipe-container" aria-live="polite">
          {!props.recipe && <div className="flex-column">
          <h3>Ready to get cooking?</h3>
          <p>Generate a Mexican dish recipe from the list of ingredients.</p>
          <button id="btn-get" className="btn-get" onClick={props.getRecipe}>Get Recipe!</button>
          </div>
          }
          {props.recipe && <hr />}
          <ReactMarkdown>{props.recipe}</ReactMarkdown>
          {props.recipe && <button className="btn-refresh" onClick={props.resetPage}>Reset</button>}
        </section>
	)
}

export default RecipeSection;