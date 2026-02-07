import fetchResults from "../services/fetchSearchResults";
let recipeList = document.querySelector(".recipe-list");
let recipeDetailPanel = document.querySelector(".recipe-detail-panel");
let recipeDetailContent = document.querySelector(".recipe-detail-content");
let emoji = document.getElementById("emoji");
let instruction = document.getElementById("instruction");

const renderResults = async () => {
  const recipes = await fetchResults();
  if (recipes.length === 0) {
    emoji.className = "fa-solid fa-circle-exclamation";
    instruction.innerText = "No recipes found. Try another keyword.";
    recipeDetailContent.classList.add("hidden");
    recipeDetailPanel.classList.remove("has-recipe");
    return;
  }
  emoji.className = "fa-regular fa-face-smile";
  instruction.innerText = "Recipes found. Click any item to view details.";
  recipes.forEach((recipe) => {
    let recipeItem = document.createElement("div");
    recipeItem.className = "recipe-item";
    recipeList.appendChild(recipeItem);

    recipeItem.dataset.id = recipe.id;

    recipeItem.innerHTML = `
            <img src="${recipe.image_url}" alt="${recipe.title}"/>
            <div>
                <h4>${recipe.title}</h4>
                <p>${recipe.publisher}</p>
            </div>`;
  });
};

export default renderResults;
