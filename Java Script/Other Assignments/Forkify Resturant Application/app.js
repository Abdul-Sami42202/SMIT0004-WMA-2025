import renderRecipeDetails from "./utils/renderRecipeDetails";
import fetchRecipeData from "./services/fetchRecipeData";
import renderResults from "./utils/renderSearchResults";

let searchInput = document.querySelector("input");
let searchBtn = document.querySelector(".search-btn");
let recipeList = document.querySelector(".recipe-list");
let recipeDetailPanel = document.querySelector(".recipe-detail-panel");
let recipeDetailContent = document.querySelector(".recipe-detail-content");

recipeList.addEventListener("click", async (e) => {
  const recipeItem = e.target.closest(".recipe-item");
  if (!recipeItem) return;

  recipeList
    .querySelectorAll(".recipe-item")
    .forEach((el) => el.classList.remove("active"));
  recipeItem.classList.add("active");

  const recipeId = recipeItem.dataset.id;
  const recipe = await fetchRecipeData(recipeId);
  recipeDetailContent.innerHTML = renderRecipeDetails(recipe);
  recipeDetailContent.classList.remove("hidden");
  recipeDetailPanel.classList.add("has-recipe");
});

// Search Button functionality
searchBtn.addEventListener("click", renderResults);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    renderResults();
  }
});
