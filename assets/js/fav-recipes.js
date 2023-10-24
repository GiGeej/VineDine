// DOM Elements
const favoritesSection = document.getElementById("favorites");
const recipeDisplay = document.getElementById("recipe-diplay")

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
    const recipeDetails = JSON.parse(localStorage.getItem(recipeDetails))
    const savedRecipe = JSON.parse(localStorage.getItem(key));
    const recipeDescription = JSON.parse(localStorage.getItem(recipeDetails.details));
    const recipeUrl = JSON.parse(localStorage(recipeDetails.url));

    //console.log("Recipe Title:", recipeTitle);
    //console.log("Key:", key);
    //console.log("Saved Recipe:", savedRecipe);
    //console.log(recipeDetails);
    //console.log("description", recipeDescription);
    //console.log("url", recipeUrl);


    const recipeCard = `
  <div class="recipe-card">
    <div>
      <h3>${recipeTitle}</h3>
      <p>${recipeDescription}</p>
    </div>
    <div>
        <button>
          ${recipeUrl}
        </button>
    </div>
  </div>
`;
recipeDisplay.innerHTML += recipeCard;

    //TODO - send to recipe details URL
    if (savedRecipe && recipeDetails.sourceUrl) {
      window.location.href = recipeDetails.sourceUrl;
    }
  }
});

// Ensure the function to display saved recipes is called when the DOM is ready
document.addEventListener("DOMContentLoaded", displaySavedRecipes);

function displayCard(recipe) {

}





/*<div class="card">
<div class="content-cont">
  <h3>${recipeTitle}</h3>
  <p>${recipeDetails.summary || "No description available."}</p>
  <a href="${recipeDetails.sourceUrl || "#"}" target="_blank">
    <button>View Full Recipe</button>
  </a>
<a href="#">
  <button>Pair with Wine</button>
</a>
  </div>
  </div>*/


 