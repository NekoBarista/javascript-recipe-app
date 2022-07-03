// save recipe to local storage

const saveRecipe = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes))


}

//get recipe list
const getSavedRecipes = () => {
  const recipesJSON = localStorage.getItem('recipes')
  try {
    return recipesJSON ? JSON.parse(recipesJSON): []
  }
  catch (e) {
    return []
  }
  
  }

  // get ingredient list
  const getSavedIngredients = () => {
    const ingredientsJSON = localStorage.getItem('ingredients')

    try {
    return ingredientsJSON ? JSON.parse(ingredientsJSON):[] }
    catch (e) {return []}
    
}


//save ingredient to local storage

const saveIngredient = (ingredients) => {
  localStorage.setItem('ingredients', JSON.stringify(ingredients))
}


 