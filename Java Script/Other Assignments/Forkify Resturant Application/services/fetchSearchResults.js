let searchInput = document.querySelector("input");
let recipeList = document.querySelector(".recipe-list");
const API = import.meta.env.VITE_BASE_URI;

// function that fetch recipies data
const fetchResults = async () => {
  if (!searchInput.value) return;
  searchInput.blur();
  try {
    const response = await fetch(`${API}/recipes?search=${searchInput.value}`);
    const recipiesdata = await response.json();
    recipeList.innerHTML = "";
    const recipes = recipiesdata?.data?.recipes;
    return recipes;
  } catch (error) {
    console.log(error);
  }
};

export default fetchResults;
