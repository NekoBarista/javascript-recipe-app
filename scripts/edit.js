
//definitions
const recipeId = location.hash.substring(1)
const recipes = getSavedRecipes()
let recipe = recipes.find((recipe) => recipe.id === recipeId)
const ingredients = getSavedIngredients()

let recipeTitle = document.querySelector('#recipe-title')
let recipeBody = document.querySelector('#recipe-steps')
let plan = document.querySelector('#to-plan')
const randomButton = document.querySelector('#random')


plan.checked = recipe.mealPlan
recipeBody.value = recipe.Body
recipeTitle.value= recipe.Title

plan.addEventListener('change', (e) => {
    recipe.mealPlan = e.target.checked
    saveRecipe(recipes)
   
 
})

// 'save' button function
savebutton = document.querySelector('#save')
savebutton.addEventListener('click', (e)=> {
    e.preventDefault()
    window.location.replace('./index.html') 
})

// delete button function

const removeRecipe = (id) => {
    let recipeIndex = recipes.findIndex((recipe) => recipe.id === id
    )
  
    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
    }
    saveRecipe(recipes)
    location.assign('./index.html')

  }



  
deleteButton = document.querySelector("#delete")
deleteButton.addEventListener('click', (e) =>{ removeRecipe(recipe.id)
    
         })

//add recipe information functions

//store recipe title

recipeTitle.addEventListener('input', (e)=> {
    recipe.Title = e.target.value
    saveRecipe(recipes)
})


// store recipe body
recipeBody.addEventListener('change', (e)=> {
    recipe.Body = e.target.value
    saveRecipe(recipes)

})



// add ingredients button
let ingredientButton = document.querySelector("#ingredients-list")



ingredientButton.addEventListener('submit',(e) => {
    e.preventDefault()
    
 
    const text = e.target.elements.text.value.trim()
    let id =uuidv4()
    if (text.length>0) {
ingredients.push( {
id: id,
recipe: recipeId,
Ingredient: text,
Have: false,

})

e.target.elements.text.value = '' 

saveIngredient(ingredients)
renderIngredients(ingredients)

    }

    else {alert("Please enter an ingredient")}

})

// remove ingredient function
    const removeIngredient = (id) => {
      let ingredientIndex = ingredients.findIndex((ingredient) => ingredient.id === id
      )
    
      if (ingredientIndex > -1) {
          ingredients.splice(ingredientIndex, 1)
      }

      saveIngredient(ingredients)
     
      renderIngredients(ingredients)
    
     
    }
    



// render ingredient DOM
const ingredientDOM = (ingredient) => {   

let listEl = document.createElement('label')
const containerEl = document.createElement('div')
const checkbox = document.createElement('input')
checkbox.setAttribute('type', 'checkbox')
checkbox.checked = ingredient.Have

checkbox.classList.add("itemCheckbox")

containerEl.appendChild(checkbox)

let ingredientEl= document.createElement('span')
let removeButton = document.createElement("button")
removeButton.textContent = "Remove"
removeButton.classList.add("button-text")
listEl.classList.add("list-item-ingredient")

checkbox.addEventListener('change', (e) => {
    ingredient.Have = e.target.checked
    saveIngredient(ingredients)
   
})

removeButton.addEventListener('click', (e) => {
    removeIngredient(ingredient.id)
    saveIngredient(ingredients)
    renderIngredients(ingredients)
   
 
})


    ingredientEl.textContent = ingredient.Ingredient
    
    listEl.appendChild(containerEl)
containerEl.appendChild(ingredientEl)
listEl.appendChild(removeButton)

return listEl


}

//render ingredients

const renderIngredients = (ingredients) => {
    let ingredientlist = document.querySelector("#ingredient-list")
    ingredientlist.innerHTML=""



    let filteredIngredients= ingredients.filter((ingredient) => ingredient.recipe ===  recipeId
    )
    filteredIngredients.forEach(ingredient => {

        let ingredientEl = ingredientDOM(ingredient)
        let ingredientlist = document.querySelector("#ingredient-list")

        ingredientlist.appendChild(ingredientEl)
        
    });

}



renderIngredients(ingredients)


//


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



// random recipe


const handleRandomClick = () => {

    let newarray = ingredients.filter((ingredient) => ingredient.recipe ===  recipeId)

    if (newarray) {


   newarray.forEach((ingredient)=>{

   
        let ingredientIndex = ingredients.findIndex((ingredient) => ingredient.recipe === recipeId)

        
        ingredients.splice(ingredientIndex, 1)

    })

   } 



    saveIngredient(ingredients)
    renderIngredients(ingredients)
  
    let id =uuidv4()

    
    axios.get('https://api.spoonacular.com/recipes/random?apiKey=e095ef0c64034f35a9211eb6a39f4772'
    ).then(function (response)
    {

        recipeTitle.value = response.data.recipes[0].title
        recipe.Title = response.data.recipes[0].title
        recipeBody.value =  response.data.recipes[0].instructions.trim().replaceAll('<li>', ' ').replaceAll('<ol>' ,' ').replaceAll('<b>',' ').replaceAll('<ul>', ' ').replaceAll('<st>',' ').replaceAll('</st>',' ').replaceAll('</b>',' ').replaceAll('</ol>', ' ').replaceAll('</li>', ' ').replaceAll('</ul>', ' ').replaceAll('<br>', ' ').replaceAll('</br>', ' ')
        recipe.Body = response.data.recipes[0].instructions.replaceAll('<li>', ' ').replaceAll('<ol>' ,' ').replaceAll('<b>',' ').replaceAll('<ul>', ' ').replaceAll('<st>',' ').replaceAll('</st>',' ').replaceAll('</b>',' ').replaceAll('</ol>', ' ').replaceAll('</li>', ' ').replaceAll('</ul>', ' ').replaceAll('<br>', ' ').replaceAll('</br>', ' ').replaceAll('&amp; ', '&').trim()

        saveRecipe(recipes)

        response.data.recipes[0].extendedIngredients.forEach((ingredient) => {
            let ingredientName = ingredient.original
    
            ingredients.push( {
                id: id,
                recipe: recipeId ,
                Ingredient: ingredientName,
                Have: false,
                
                })
             
        })


        saveRecipe(recipes)
        saveIngredient(ingredients)
        renderIngredients(ingredients)
    }
    )

   

}

randomButton.addEventListener('click', handleRandomClick)