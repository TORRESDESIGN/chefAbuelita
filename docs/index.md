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
This was much better and resolved my disable button issue 🎉.

## How to remove duplicate ingredients
My original code allowed me to add the same ingredients, which is not a good feature to have.
My old code was the following:
```
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
```
My new code is this:
```
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
```
This works great, however it does not let the users know why nothing is happening when they try to add a duplicate ingredient,
I now need to work on a error message to let users know they can do that.

## My error handling of duplicate ingredients
I added a state to hold the errors.

```
const [errorMessage, setErrorMessage] = React.useState('');
```
And set the error within the subfunction of addIngredients > setIngredients with a timeout so the error would go away after 3 seconds.
```
setIngredients(prevItems => {
      // Check if already exists
      if (prevItems.some(item => item.body === ingredientBody)) {
        setErrorMessage(`${ingredientBody} already exist!`)
        setTimeout(()=> {
          setErrorMessage("")
        }, 3000)
        return prevItems; // Return unchanged state
      }
...
....
```
And then slapped it on top of the ingredientsList component.
```
 </div>
        {errorMessage && (<i className="error">{errorMessage}</i>)}
        <IngredientsList
          addIngredients={addIngredients}
          hideInput={hideInput}
        />
....
...
```

## Adding special sticky footer that stays at bottom of page with Flexbox
I first needed to change my React fragment(<>...</>) to a div, since RFragments can't have css properties since they
dont' render any actual DOM element. I needed assign some special properties to the parent element and footer as so.
### .CSS
```
.main-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  margin-top: auto;
  text-align: center;
}
```
Now my footer will stay nicely at the bottom of page regardless of content on the page.


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
