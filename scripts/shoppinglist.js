
let neededItems = getSavedIngredients()
const listEl = document.querySelector("#items")
let recipes = getSavedRecipes



const shoppinglistDOM = (ingredient) => {
let itemContainerEl= document.createElement("a")
let itemCheckbox = document.createElement("input")
itemCheckbox.setAttribute('type', 'checkbox')
let itemEl = document.createElement("span")
itemContainerEl.classList.add("list-item")
itemContainerEl.classList.add("item-container")

itemCheckbox.classList.add("itemCheckbox")
itemEl.textContent = ingredient.Ingredient

itemCheckbox.addEventListener('change', (e) => {
    ingredient.Have = !e.target.checked
    saveIngredient(neededItems)
    renderlist(neededItems)
    location.reload();
})

itemContainerEl.appendChild(itemCheckbox)
itemContainerEl.appendChild(itemEl)


return itemContainerEl

}

const renderlist = (ingredients) => {
     let filteredIngredients = ingredients.filter((ingredient) => ingredient.Have === true)

     if (filteredIngredients.length === 0) {
items = document.querySelector("#items")
let h2 = document.querySelector("h2")
h2.textContent= " "
let emptyMessage = document.createElement('p')
emptyMessage.textContent =  "There are currently no items on your shopping list"
emptyMessage.classList.add("emptyMessage")

items.appendChild(emptyMessage)
     }


    else {filteredIngredients.forEach((ingredient) => {   
        
        let recipeEl = shoppinglistDOM(ingredient)
    document.querySelector("#items").appendChild(recipeEl)
})
    }
    
}

renderlist(neededItems)