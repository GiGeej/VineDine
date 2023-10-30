// Define the HTML structure for the container, favorites list, and recipe card
const htmlTemplate = `
<div class="container">
  <div class="favorites-section">
    <ul id="recipe-list"></ul>
  </div>
  <div class="recipe-display" style="display: none;">
    <div class="card">
      <h3 id="recipe-title"></h3>
      <p id="recipe-description"></p>
      <a id="recipe-URL" target="_blank" class="recipe-link">Recipe URL</a>
      <button class="close-button">Close</button>
    </div>
  </div>
</div>
`;

// Inject the HTML structure into the DOM
document.body.innerHTML = htmlTemplate;

// DOM Elements
const favoritesSection = document.querySelector(".favorites-section");
const recipeDisplay = document.querySelector(".recipe-display");
const cardTitle = document.getElementById("recipe-title");
const cardDescription = document.getElementById("recipe-description");
const cardURL = document.getElementById("recipe-URL");

// Function to display saved recipes
function displaySavedRecipes() {
  // Clear previous results
  favoritesSection.innerHTML = "";

  // Iterate through local storage items
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // Check if the key represents a saved recipe
    if (key.startsWith("recipe_")) {
      const savedRecipe = JSON.parse(localStorage.getItem(key));
      displayRecipe(savedRecipe);
    }
  }
}

// Function to display a saved recipe
function displayRecipe(recipe) {
  const recipeButton = document.createElement("button");
  recipeButton.classList.add(
    "bg-grey-300",
    "rounded-lg",
    "p-2",
    "text-white",
    "favourite-btn"
  );
  recipeButton.textContent = recipe.title;

  // Add an event listener to open the recipe card when the button is clicked
  recipeButton.addEventListener("click", () => {
    cardTitle.textContent = recipe.title;
    cardDescription.textContent = recipe.details;
    cardURL.href = recipe.url;

    // Display the recipe card
    recipeDisplay.style.display = "block";
  });
  favoritesSection.appendChild(recipeButton);
}

// Event listener to close the recipe card
recipeDisplay.addEventListener("click", (event) => {
  if (event.target.classList.contains("close-button")) {
    recipeDisplay.style.display = "none";
  }
});

// Add event listener to the entire favoritesSection to handle button clicks
favoritesSection.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const recipeTitle = event.target.textContent;
    const key = "recipe_" + "fav"; // Use the same key pattern used for saving

    // Retrieve saved recipe and details from localStorage
    const savedRecipe = JSON.parse(localStorage.getItem(key));

    // Check if the savedRecipe object contains details and URL
    if (savedRecipe) {
      const recipeDetails = savedRecipe.details;
      const recipeUrl = savedRecipe.url;

      // Find Elements on the HTML Page
      const cardTitle = document.getElementById("recipe-title");
      const cardDescription = document.getElementById("recipe-description");
      const cardURL = document.getElementById("recipe-URL");

      // Add Text Content to the Page
      cardTitle.textContent = recipeTitle;
      cardDescription.textContent = recipeDetails;
      cardURL.textContent = recipeUrl;

      // Redirect to recipe details URL if available
      if (recipeDetails.sourceUrl) {
        window.location.href = recipeDetails.sourceUrl;
      }
    }
  }
});

// Ensure the function to display saved recipes is called when the DOM is ready
document.addEventListener("DOMContentLoaded", displaySavedRecipes);
