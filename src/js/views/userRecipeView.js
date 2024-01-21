import View from "./View";
import icons from "url:../../img/icons.svg"; //loading the icons for parcel to convert them later

class userRecipeView extends View {
  _parentContainer = document.querySelector(".overlay");

  addHandlerAddRecipe(handler) {
    document
      .querySelector(".header__logo")
      .addEventListener("click", function () {
        window.location.hash = "";
        location.reload();
      });
    document.querySelector(".nav__btn--add-recipe").addEventListener(
      "click",
      function () {
        this._parentContainer.classList.toggle("hidden");
        handler();
      }.bind(this)
    );
  }

  addHandlerHideOverlay() {
    const closeBtn = document.querySelector(".btn--close-modal");
    [this._parentContainer, closeBtn].forEach((event) =>
      event.addEventListener(
        "click",
        function (e) {
          if (e.target === this._parentContainer || e.target === closeBtn) {
            this._parentContainer.classList.add("hidden");
            this._clearInput();
          }
        }.bind(this)
      )
    );
  }
  addHandlerUpload(handler) {
    const uploadContainer = document.querySelector(".upload");
    const listener = (e) => {
      e.preventDefault();
      handler(this._createUserRecipe(e));
      this._parentContainer.classList.add("hidden");
      this._clearInput();
    };
    uploadContainer.addEventListener("submit", listener.bind(this));
    uploadContainer.removeEventListener("submit", listener.bind(this));
  }
  _clearInput() {
    document.querySelectorAll(".upload input").forEach((el) => (el.value = ""));
  }
  _createUserRecipe(event) {
    if (event.target[0].value === "") return;
    const userRecipe = {
      id: `user${(Date.now() + "").slice(-10)}`,
      title: event.target["title"].value,
      publisher: event.target["publisher"].value,
      sourceUrl: event.target["sourceUrl"].value,
      imageUrl: event.target["image"].value,
      servings: Number(event.target["servings"].value),
      user: true,
      cookingTime: Number(event.target["cookingTime"].value),
      ingredients: [
        {
          quantity: event.target["ingredient-1"].value.split("-")[0],
          unit: event.target["ingredient-1"].value.split("-")[1],
          description: event.target["ingredient-1"].value.split("-")[2],
        },
        {
          quantity: event.target["ingredient-2"].value.split("-")[0],
          unit: event.target["ingredient-2"].value.split("-")[1],
          description: event.target["ingredient-2"].value.split("-")[2],
        },
        {
          quantity: event.target["ingredient-3"].value.split("-")[0],
          unit: event.target["ingredient-3"].value.split("-")[1],
          description: event.target["ingredient-3"].value.split("-")[2],
        },
        {
          quantity: event.target["ingredient-4"].value.split("-")[0],
          unit: event.target["ingredient-4"].value.split("-")[1],
          description: event.target["ingredient-4"].value.split("-")[2],
        },
        {
          quantity: event.target["ingredient-5"].value.split("-")[0],
          unit: event.target["ingredient-5"].value.split("-")[1],
          description: event.target["ingredient-5"].value.split("-")[2],
        },
        {
          quantity: event.target["ingredient-6"].value.split("-")[0],
          unit: event.target["ingredient-6"].value.split("-")[1],
          description: event.target["ingredient-6"].value.split("-")[2],
        },
      ].filter((el) => el.description !== undefined),
    };
    return userRecipe;
  }
}

export default new userRecipeView();
