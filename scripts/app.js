let recipes = getSavedRecipes()
let ingredients = getSavedIngredients()
const filters = {
    searchText: ''
  }




//Create new recipe button
addButton = document.querySelector('#add-button')

addButton.addEventListener('click', (e) => {
e.preventDefault()
let id =uuidv4()
recipes.push( {
id: id,
Title: "",
Body: "",
mealPlan: false

})
saveRecipe(recipes)
window.location.replace(`./editrecipe.html#${id}`)


})

// set up filter text

const searchRecipes = (event) => {
    filters.searchText = event.target.value
    renderRecipes(recipes, ingredients, filters)
  }

  document.querySelector("#searchbox").addEventListener("input",searchRecipes)

   //render recipe DOM

   const generateRecipeDOM = (recipe, ingredients) => {
  
    const recipeEl = document.createElement('a')
    const titleEl = document.createElement('p')
    const ingredientsEl = document.createElement('p')

    recipeEl.classList.add("list-item")
    titleEl.classList.add("list-item-title")
    ingredientsEl.classList.add("list-item-subtitle")
    
    
    const ingredientList = ingredients.filter((ingredient) => ingredient.recipe ===  recipe.id && ingredient.Have === true)

    
    if(ingredientList.length > 0) {
      let groceries = []

      ingredientList.forEach(ingredient => {
        groceries.push(ingredient.Ingredient)

      })
let grocerylist = groceries.join(', ')

ingredientsEl.textContent = `You need ${grocerylist}` 
    }

   
    else {
ingredientsEl.textContent = " " 
    }


    if (recipe.Title.length > 0) {
      titleEl.textContent = recipe.Title
    
    }
    
    else {
      titleEl.textContent = "Untitled Recipe"
    }
  
    
  
  recipeEl.appendChild(titleEl)
  recipeEl.appendChild(ingredientsEl)
    recipeEl.setAttribute('href', `./editrecipe.html#${recipe.id}`)
    
    
    return recipeEl
    }

  // render recipes

  const renderRecipes = (recipes, ingredients, filters) => {
    document.querySelector("#recipes").innerHTML=" "


    let filteredRecipes = recipes.filter((recipe) => recipe.Title.toLowerCase().includes(filters.searchText.toLowerCase()))
if(filteredRecipes.length===0) {
let emptyMessage = document.createElement('p')
emptyMessage.textContent = "There are no recipes to show"
let recipeSpace= document.querySelector("#recipes")
emptyMessage.classList.add("emptyMessage")
recipeSpace.appendChild(emptyMessage)

}

else {
    filteredRecipes.forEach((recipe) => {
      let recipeEl = generateRecipeDOM(recipe, ingredients)
      document.querySelector("#recipes").appendChild(recipeEl)
      
    
    })
}
  
  
  
  }


    renderRecipes(recipes, ingredients, filters)

    


//storage 

window.addEventListener('storage', (e) =>{
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue)
        recipe = recipes.find((recipe) =>
            recipe.id === recipeId
        )

        if (!recipe) {
            location.assign('/index.html')
        }

        recipeTitle.value = recipe.Title
        recipeBody.value = recipe.Body
        mealPlan.checked = recipe.mealPlan
    }
})


  








  



