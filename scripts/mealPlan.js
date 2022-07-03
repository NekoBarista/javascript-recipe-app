let recipes = getSavedRecipes()
let ingredients = getSavedIngredients()

const generateRecipeDOM = (recipe) => {
  
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

  const renderRecipes = (recipes) => {
    document.querySelector("#mealplan").innerHTML=" "


    let filteredRecipes = recipes.filter((recipe) => recipe.mealPlan === true)
    if (filteredRecipes.length === 0) {

      let emptyMessage = document.createElement('p')
      emptyMessage.textContent =  "There are currently no meals in your meal plan"
      let mealPlan = document.querySelector("#mealplan")
      emptyMessage.classList.add("emptyMessage")
      
      mealPlan.appendChild(emptyMessage)
    }

    else {
    filteredRecipes.forEach((recipe) => {
      let recipeEl = generateRecipeDOM(recipe, ingredients)
      document.querySelector("#mealplan").appendChild(recipeEl)
      
    
    })
  
  
    }


  
  }


    renderRecipes(recipes)
