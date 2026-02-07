const API = import.meta.env.VITE_BASE_URI;

const fetchRecipeData = async (recipeId) => {
  try {
    const response = await fetch(`${API}/recipes/${recipeId}`);
    const singleRecipeData = await response.json();
    const recipe = singleRecipeData?.data?.recipe;
    if (!recipe) {
      console.error("Recipe not found or invalid response", singleRecipeData);
      return;
    }
    return recipe;
  } catch (error) {
    console.error(error);
  }
};

export default fetchRecipeData;
