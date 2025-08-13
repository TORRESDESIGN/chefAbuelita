# Code Documentation
## disable button issue
## Ex:
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

## How to the targeted/clicked items key/id trick!
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
** Or delete items **
```
function deleteIngredient(ingredientId) {
    setIngredients(prevItem => {
      return prevItem.filter(item => {
        return item.id !== ingredientId
      })
    })
  }
```