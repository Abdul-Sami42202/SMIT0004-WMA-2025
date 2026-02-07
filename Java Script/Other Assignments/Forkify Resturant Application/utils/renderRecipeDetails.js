import formatIngredient from "./formatIngredient";

const renderRecipeDetails = (recipe) => {
  const {
    cooking_time,
    image_url,
    ingredients = [],
    publisher,
    servings,
    source_url,
    title,
  } = recipe;

  const ingredientsHtml = (ingredients || [])
    .map(
      (ing) => `
              <div class="ingredient-item">
                <i class="fa-solid fa-check"></i>
                <span>${formatIngredient(ing)}</span>
              </div>
            `,
    )
    .join("");

  return `<div class="hero">
            <img class="image" src="${image_url}" alt="${title}" />
            <span class="recipe-tag">${title}</span>
          </div>
          <div class="recipe-meta">
            <span class="meta-item">
              <i class="fa-regular fa-clock"></i>
              ${cooking_time} MINUTES
            </span>
            <span class="meta-item">
              <i class="fa-regular fa-user"></i>
              <span class="servings-num">${servings}</span> SERVINGS
              <div class="servings-controls">
                <button type="button" aria-label="Decrease servings">−</button>
                <button type="button" aria-label="Increase servings">+</button>
              </div>
            </span>
            <button type="button" class="bookmark-btn" aria-label="Bookmark">
              <i class="fa-regular fa-bookmark"></i>
            </button>
          </div>
          <div class="recipe-ingredients">
            <h3>Recipe Ingredients</h3>
            <div class="ingredients-grid">
              ${ingredientsHtml}
            </div>
          </div>
          <div class="how-to-cook">
            <h3>How to Cook It</h3>
            <p>This recipe was carefully designed and tested by <strong>${publisher}</strong>. ${source_url ? `Please <a href="${source_url}" target="_blank" rel="noopener">check out directions at their website</a>.` : ""}</p>
          </div>`;
};

export default renderRecipeDetails;
