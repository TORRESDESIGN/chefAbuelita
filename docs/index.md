# Code Documentation

## How to get the targeted/clicked items key/id!
```
function App() {...
const [ingredients, setIngredients] = React.useState([]);
/* {id: '5a3ff738-1bda-484e-8c21-22acf4cbac91', body: 'cheese'}*/

const ingredientsListItems = ingredients.map((ingredient) => (
        <li key={ingredient.id}>{ingredient.body}
          <button onMouseEnter={(event) => {getId(ingredient.id)}} className="btn-delete"><i className="fa-regular fa-trash-can"></i>
          </button>
        </li>
    ))

function getId(ingredientId) {
    console.log("This id is:", ingredientId);
}
```

Or delete items with **onClick** instead of **onMouseEnter**

```
function deleteIngredient(ingredientId) {
    setIngredients(prevItem => {
      return prevItem.filter(item => {
        return item.id !== ingredientId
      })
    })
  }

```
## How to disable get recipe button if ingredients list empty
I approached this using the HTML5 disabled attribute which looks like this:
```
<button onClick={props.getRecipe} disabled={props.isDisabled}>Get Recipe!
</button>
```
and created a isDisable state that was triggered by the add ingredients function as so:
```
setIsDisabled(prevState => !prevState)
```
but this was incorrect as it toggled the button with every new ingredient added. I thought about using
useEffect, but after further investigating useEffect should only be used with *external systems* such as api's,
and avoiding this would reduce re-renders/better performance.
so I went the js truthy and falsy approach as so.
```
const isDisabled = ingredients.length === 0;
```
This was much better and resolved my diable button issue 🎉.

---
# H1
## H2
### H3
*Italic*

**Bold**

[Markdown Link](https://commonmark.org/help/) 

![Image](http://url/a.png)  

> Blockquote
1. One
2. Two
3. Three
* List
* List
* List
Horizontal rule:

---
`Inline code` with backticks  

```
let ingredientList = ingredient.map(item => {
  return [item.body]
})
```

this is `important` text. and percentage signs : % and `%`
