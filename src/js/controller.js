import "core-js/stable";
import "regenerator-runtime";
import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import pageView from "./views/pageView";
import bookmarkListView from "./views/bookmarkListView";
import userRecipeView from "./views/userRecipeView";

///////////////////////////////////////

const showSearchResults = async function (query) {
  try {
    searchView.renderSpinner();
    await model.loadRecipeList(query);

    if (model.state.search.results?.length > 0) {
      searchView.render(model.getResultsPage(1));
      pageView.render(
        model.state.search.currentPage,
        model.state.search.totalPage
      );
    } else {
      pageView._clear();
      searchView.errorRender();
    }
  } catch (err) {
    console.error(err.message);
  }
};

const showRecipe = async function () {
  //the id is assigned after the hashchange/load eventlistener.
  const id = window.location.hash.slice(1);
  if (id === "" || !id) return; //stop load event from crashing the app due to empty id on initial load trigger
  if (id.slice(0, 4) === "user") {
    recipeView.render(model.state.userRecipes.find((el) => el.id === id));
    //listen for serving
    recipeView.addHandlerServing(controlServing);
    recipeView.addHandlerDelete(controlDeleteUserRecipe);
    return;
  }
  try {
    //spinner while waiting for the recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    //listen for serving
    recipeView.addHandlerServing(controlServing);
    //listen for bookmark
    recipeView.addHandlerBookmark(controlBookmark);
  } catch (err) {
    console.error(err.message);
    recipeView.errorRender();
  }
};

const controlPagination = function (page) {
  searchView.render(model.getResultsPage(page));
  pageView.render(model.state.search.currentPage, model.state.search.totalPage);
};

const controlServing = function (action, data) {
  model.state.recipe = data;
  model.updateServings(action);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function (recipe) {
  model.addBookmark(recipe);
  bookmarkListView.render(model.state.bookmarks);
  recipeView.render(model.state.recipe);
  //listen for serving
  recipeView.addHandlerServing(controlServing);
  //listen for bookmark
  recipeView.addHandlerBookmark(controlBookmark);
};

const controlUserRecipeHandler = function () {
  userRecipeView.addHandlerHideOverlay();
  userRecipeView.addHandlerUpload(controlAddRecipe);
};

const controlAddRecipe = function (userRecipe) {
  model.addUserRecipe(userRecipe);
  searchView.render(model.state.userRecipes);
};

const controlDeleteUserRecipe = function (recipe) {
  model.removeUserRecipe(recipe);
  searchView.render(model.state.userRecipes);
  if (model.state.userRecipes.length === 0) {
    window.location.hash = "";
    location.reload();
  }
};

const init = function () {
  //listen for adding a recipe
  userRecipeView.addHandlerAddRecipe(controlUserRecipeHandler);
  //listen for events to load specific recipe
  recipeView.addHandlerRender(showRecipe);
  //listen for search bar submit
  searchView.addHandlerRender(showSearchResults);
  //listen for pagination
  pageView.addHandlerPagination(controlPagination);
  //load localstorage bookmarks
  model.loadLocalStorageBookmarks();
  //Render local bookmarks
  bookmarkListView.render(model.state.bookmarks);
  //load localstorage userRecipes
  model.loadLocalStorageUserRecipes();
  //render user recipes and bookmarks
  searchView.render([...model.state.userRecipes, ...model.state.bookmarks]);

  console.log("Welcome to the app!");
};
init();
