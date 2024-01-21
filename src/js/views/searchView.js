import icons from 'url:../../img/icons.svg'; //loading the icons for parcel to convert them later
import View from './View';

class searchView extends View {
  _parentContainer = document.querySelector('.results');
  _errorMessage = `Can't find recipes for that query, please another.`

  render(data) {
    this._data = data;
    this._clear();
    this._data.forEach(recipe => {
      this._parentContainer.insertAdjacentHTML('beforeend', this._generateMarkup(recipe));
    });
    this._parentContainer.addEventListener('click', function(e) {
      const allElements = document.querySelectorAll('.preview__link');
      allElements.forEach(item => item.classList.remove(`preview__link--active`));
      e.target.closest(`.preview__link`).classList.add(`preview__link--active`);
    });
  }

  addHandlerRender(handler) {
    const search = document.querySelector('.search');
    search.addEventListener('submit', function(e) {
      e.preventDefault();
      let query = e.target.querySelector('.search__field').value;
      handler(query);
      document.querySelector('.search__field').value = ''
    })
  }
  _generateMarkup(recipe) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.imageUrl}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            ${recipe.user ? `<div class="preview__user-generated">
                              <svg>
                                <use href="${icons}#icon-user"></use>
                              </svg>
                            </div>
          ` : ''}
          </div>
        </a>
      </li>
    `
  }
};

export default new searchView();