// DOM Elements
const favoritesSection = document.getElementById("favorites");

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
    "bg-blue-200",
    "rounded-lg",
    "p-2",
    "text-blue-700"
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
    const savedRecipe = JSON.parse(localStorage.getItem(key));

    console.log("Recipe Title:", recipeTitle);
    console.log("Key:", key);
    console.log("Saved Recipe:", savedRecipe);

    //TODO - send to recipe details URL
    if (savedRecipe && recipeDetails.sourceUrl) {
      window.location.href = recipeDetails.sourceUrl;
    }
  }
});

// Ensure the function to display saved recipes is called when the DOM is ready
document.addEventListener("DOMContentLoaded", displaySavedRecipes);
