// DOM Elements
const ingredientsInput = document.getElementById("ingredients");
const searchButton = document.getElementById("searchButton");
const resultsSection = document.getElementById("results");
const favoritesSection = document.getElementById("favorites");

// Event Listener for Search Button
searchButton.addEventListener("click", function() {
    const ingredients = ingredientsInput.value.split(',').map(item => item.trim());

    // Fetch recipes from Spoonacular
    fetchRecipes(ingredients)
        .then(recipes => {
            // For each recipe, fetch wine pairing
            recipes.forEach(recipe => {
                fetchWinePairing(recipe.mainIngredient) // This assumes we can determine a main ingredient.
                    .then(wine => {
                        displayRecipeWithWine(recipe, wine);
                    });
            });
        });
});

function fetchRecipes(ingredients) {
    const API_KEY = 'YOUR_SPOONACULAR_API_KEY';
    const endPoint = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&apiKey=${API_KEY}`;
    
    return fetch(endPoint)
        .then(response => response.json());
}

function fetchWinePairing(ingredient) {
    const API_KEY = 'YOUR_GLOBAL_WINE_SCORE_API_KEY';
    const endPoint = `https://api.globalwinescore.com/globalwinescores/latest/?wine=${ingredient}&apiKey=${API_KEY}`;
    
    return fetch(endPoint)
        .then(response => response.json());
}

function displayRecipeWithWine(recipe, wine) {
    const recipeCard = `
        <div class="card">
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
            <h4>Wine Pairing: ${wine.name}</h4>
            <p>${wine.description}</p>
        </div>
    `;

    resultsSection.innerHTML += recipeCard;
}

// TODO: Functions for saving and displaying favorite recipes using client-side storage.

