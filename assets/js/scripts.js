// DOM Elements
const ingredientsInput = document.getElementById("ingredients");
const searchButton = document.getElementById("searchButton");
const resultsSection = document.getElementById("results");
const favoritesSection = document.getElementById("favorites");

// Event Listener for Search Button

searchButton.addEventListener("click", function () {
  const heroSection = document.getElementById("hero");

  heroSection.classList.add("hero-image-search");
  heroSection.classList.remove("hero-image");
});
searchButton.addEventListener("click", function () {
  const ingredients = ingredientsInput.value
    .split(",")
    .map((item) => item.trim());

  // Fetch recipes from Spoonacular
  fetchRecipes(ingredients).then((recipes) => {
    // Clear previous results
    resultsSection.innerHTML = "";

    // Limit the number of recipes to display
    const limitedRecipes = recipes.slice(0, 6);

    // Display each recipe
    limitedRecipes.forEach((recipe) => {
      displayRecipe(recipe);
    });
  });
});

function fetchRecipes(ingredients) {
  const API_KEY = "0974748c220e4ae9907f4f301f14405d";
  const endPoint = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(
    ","
  )}&apiKey=${API_KEY}`;

  return fetch(endPoint).then((response) => response.json());
}

function fetchRecipeDetails(recipeId) {
  const API_KEY = "0974748c220e4ae9907f4f301f14405d";
  const endPoint = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;

  return fetch(endPoint).then((response) => response.json());
}

// Function to save the state in local storage
function saveAppState(state) {
  localStorage.setItem("appState", JSON.stringify(state));
}

// Function to load the state from local storage
function loadAppState() {
  const savedState = localStorage.getItem("appState");
  return savedState ? JSON.parse(savedState) : null;
}

async function displayRecipe(recipe) {
  // Fetch the detailed information for the recipe
  const recipeDetails = await fetchRecipeDetails(recipe.id);

  // Fetch and display a unique cocktail for this recipe
  fetchAndDisplayCocktail().then((cocktail) => {
    // Create an unordered list for cocktail ingredients and measures
    let cocktailIngredientsList = '<ul>';
    for (let i = 0; i < cocktail.ingredients.length; i++) {
      cocktailIngredientsList += `<li>${cocktail.measures[i]} ${cocktail.ingredients[i]}</li>`;
    }
    cocktailIngredientsList += '</ul>';

    // Construct the Google search URL using the encoded cocktail name followed by "cocktail"
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(cocktail.name + ' cocktail')}`;


    const recipeCard = `
    <div class="project-grid">

    <div class="project-box">
        <a href="${recipeDetails.sourceUrl || "#"}" target="_blank">
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>${recipeDetails.summary || "No description available."}</p>
        </a>
    </div>

    <div class="project-box">
        <a href="${googleSearchUrl}" target="_blank">
            <img src="${cocktail.image}" alt="${cocktail.name}">
            <h3>${cocktail.name}</h3>
            <p>${cocktail.description}</p>
            ${cocktailIngredientsList}
        </a>
    </div>

    `;

    // Update the results section
    resultsSection.innerHTML += recipeCard;

    // Save the current state in local storage
    saveAppState({
      resultsHTML: resultsSection.innerHTML,
    });
  });
}

const homeReturn = document.getElementById("home");
homeReturn.addEventListener("click", function () {
  const heroSection = document.getElementById("hero");

  heroSection.classList.add("hero-image");
  heroSection.classList.remove("hero-image-search");

  //remove text left in input box
});

// Load the state when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const savedState = loadAppState();
  if (savedState) {
    resultsSection.innerHTML = savedState.resultsHTML;
  }
});

// TODO: Functions for saving and displaying favorite recipes using client-side storage.

// Event listener for the heart emoji button using event delegation
// ...

// Event listener for the heart emoji button using event delegation
resultsSection.addEventListener("click", function (event) {
  const heartButton = event.target.closest(".heart-icon");

  if (heartButton) {
    // Get the recipe card associated with the clicked heart button
    const recipeCard = heartButton.closest(".card");

    // Access recipe data from the card (you can customize this based on your data structure)
    const recipeTitle = recipeCard.querySelector("h3").textContent;
    const recipeImage = recipeCard.querySelector("img").src;
    const recipeDetails = recipeCard.querySelector("p").textContent;

    // Create an object to store recipe data
    const savedRecipe = {
      title: recipeTitle,
      url: recipeImage, // Update this to store the image URL or other relevant data
      details: recipeDetails,
    };

    // Generate a unique key for this recipe using the recipe title
    const recipeKey = "recipe_" + recipeTitle.replace(/\s/g, "_");

    // Save the recipe to local storage
    localStorage.setItem(recipeKey, JSON.stringify(savedRecipe));

    // Indicate that the recipe is saved, e.g., change the heart color or style
    heartButton.classList.add("saved-heart");
  }
});

// URL of the API
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// Function to fetch and display cocktail data
function fetchAndDisplayCocktail() {
  const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const cocktail = data.drinks[0];

      // Extract the relevant details from the API response
      const cocktailName = cocktail.strDrink;
      const cocktailImage = cocktail.strDrinkThumb;
      const cocktailDescription = cocktail.strInstructions;

      // Extract all ingredients and measures
      const ingredients = [];
      const measures = [];
      for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
          ingredients.push(ingredient);
          measures.push(measure ? measure.trim() : "");
        }
      }

      return {
        name: cocktailName,
        image: cocktailImage,
        description: cocktailDescription,
        ingredients: ingredients,
        measures: measures
      };
    })
    .catch((error) => {
      console.error("There was an error fetching the cocktail data:", error);
    });
}

// Add event listener to the button
document
  .getElementById("cocktailButton")
  .addEventListener("click", fetchAndDisplayCocktail);

// ...
