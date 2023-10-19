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
            // Clear previous results
            resultsSection.innerHTML = '';

            // Limit the number of recipes to display
            const limitedRecipes = recipes.slice(0, 6);

            // Display each recipe
            limitedRecipes.forEach(recipe => {
                displayRecipe(recipe);
            });
        });
});

function fetchRecipes(ingredients) {
    const API_KEY = '0974748c220e4ae9907f4f301f14405d';
    const endPoint = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&apiKey=${API_KEY}`;
    
    return fetch(endPoint)
        .then(response => response.json());
}

function fetchRecipeDetails(recipeId) {
    const API_KEY = '0974748c220e4ae9907f4f301f14405d';
    const endPoint = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;
    
    return fetch(endPoint)
        .then(response => response.json());
}

async function displayRecipe(recipe) {
    // Fetch the detailed information for the recipe
    const recipeDetails = await fetchRecipeDetails(recipe.id);
    
    const recipeCard = `
        <div class="card">
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>${recipeDetails.summary || 'No description available.'}</p>
            <a href="${recipeDetails.sourceUrl || '#'}" target="_blank">
                <button>View Full Recipe</button>
            </a>
        </div>
    `;

    resultsSection.innerHTML += recipeCard;
}

// TODO: Functions for saving and displaying favorite recipes using client-side storage.
