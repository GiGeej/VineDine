// DOM Elements
const favoritesSection = document.getElementById("favorites");
const recipeDisplay = document.getElementById("recipe-display");

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
    "favourite-btn",
    "saved-recipe"
  );
  recipeButton.textContent = recipe.title;

  recipeListItem.appendChild(recipeButton);
  favoritesSection.appendChild(recipeListItem);
}

// Add event listener to the entire favoritesSection to handle button clicks
favoritesSection.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const recipeTitle = event.target.textContent;
    const key = "recipe_" + recipeTitle.replace(/\s/g, "_");

    // Retrieve saved recipe and details from localStorage
    const savedRecipe = JSON.parse(localStorage.getItem(key));

    // Check if the savedRecipe object contains details and URL
    if (savedRecipe) {
      const recipeDetails = savedRecipe.details;
      const recipeUrl = savedRecipe.url;
      const recipeImg = savedRecipe.img;

      // Clear the existing content in recipeDisplay
      recipeDisplay.classList.remove("hidden");
      recipeDisplay.innerHTML = "";

      const recipeCard = `
        <a href="${recipeUrl || "#"}" target="_blank">
        <img src="${recipeImg}" alt="${recipeTitle}">
        <h3>${recipeTitle}</h3>
        <p>${recipeDetails}</p>
        </a>
      `;

      // Append the new recipe card
      recipeDisplay.innerHTML += recipeCard;
    }
  }
});



// Ensure the function to display saved recipes is called when the DOM is ready
document.addEventListener("DOMContentLoaded", displaySavedRecipes);

