// DOM Elements
const favoritesSection = document.getElementById("favorites");
const recipeDisplay = document.getElementById("recipe-diplay");

//Function to display saved recipes
function displaySavedRecipes() {
  // Clear previous results
  favoritesSection.innerHTML = "";

  // Iterate through local storage items
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // Check if the key represents a saved recipe
    if (key.startsWith("recipe_")) {
      const savedRecipe = JSON.parse(localStorage.getItem(key));
      console.log(savedRecipe);
      displayRecipe(savedRecipe);
    }
  }
}

// Function to display a saved recipe
function displayRecipe(recipe) {
  const recipeListItem = document.createElement("li");
  recipeListItem.classList.add("mb-2"); // Add margin between list items

  const recipeButton = document.createElement("button");
  recipeButton.classList.add(
    "bg-grey-300",
    "rounded-lg",
    "p-2",
    "text-white",
    "favourite-btn"
  );
  recipeButton.textContent = recipe.title;

  recipeListItem.appendChild(recipeButton);
  favoritesSection.appendChild(recipeListItem);
}

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

function displayCard(recipe) {

}







 