import View from './View';
import icons from 'url:../../img/icons.svg'; //loading the icons for parcel to convert them later
import {Fraction} from 'fractional';

class RecipeView extends View {
    _parentContainer = document.querySelector('.recipe');
    _isBookmarked;
    _servingButtons;
    _errorMessage = "Can't find recipe, please try another one!"

    render(data) {
        this._data = data;
        const html = this._generateMarkup();
        this._clear();
        this._parentContainer.insertAdjacentHTML('beforeend', html);
    }
    update(data) {
        this._data = data;
        this._data.servings === 1 ? document.querySelector('.btn--decrease-servings').classList.add('hidden') : document.querySelector('.btn--decrease-servings').classList.remove('hidden');
        const newHtml = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newHtml);
        const newMarkup = Array.from(newDOM.querySelectorAll('*'));
        const oldMarkup = Array.from(this._parentContainer.querySelectorAll('*'));

        newMarkup.forEach((el, i) => {
            const currentOldElement = oldMarkup[i];

            if(!el.isEqualNode(currentOldElement) && el.firstChild?.nodeValue.trim() !== '')
                currentOldElement.textContent = el.textContent;
        })
    }
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(event => window.addEventListener(event, handler));
    }
    addHandlerServing(handler) {
        this._servingButtons = document.querySelector('.recipe__info-buttons');
        this._servingButtons.addEventListener('click', function(e) {
            //Guard clause if the button doesn't exist or is removed due to serving count
            if (!e.target.closest('.btn--tiny') || e.target.closest('.btn--tiny').classList.contains('hidden')) return;
            //designate the action and call the handler
            if (e.target.closest('.btn--tiny').classList.contains('btn--increase-servings')) {
                handler('increase', this._data);
            } else {
                handler('decrease', this._data);
            }
        }.bind(this))
    }
    addHandlerBookmark(handler) {
        const bookmarkBtn = document.querySelector('.btn--round');
        bookmarkBtn.addEventListener('click', function() {
            handler(this._data);
        }.bind(this))
    }
    addHandlerDelete(handler) {
        const deleteBtn = document.querySelector('.btn--delete');
        deleteBtn.addEventListener('click', function() {
            handler(this._data);
        }.bind(this))
    }
    _generateMarkup() {
        return `
            <figure class="recipe__fig">
            <img src="${this._data.imageUrl}" alt="${this._data.title}" class="recipe__img" />
            <h1 class="recipe__title">
                <span>${this._data.title}</span>
            </h1>
            </figure>
        
            <div class="recipe__details">
                <div style="display: flex;">
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                        <use href="${icons}#icon-clock"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                        <span class="recipe__info-text">minutes</span>
                    </div>
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="${icons}#icon-users"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                        <span class="recipe__info-text">servings</span>
                        <div class="recipe__info-buttons">
                            <button class="btn--tiny btn--decrease-servings${this._data.servings === 1 ? ' hidden' : ''}">
                                <svg>
                                <use href="${icons}#icon-minus-circle"></use>
                                </svg>
                            </button>
                            <button class="btn--tiny btn--increase-servings">
                                <svg>
                                <use href="${icons}#icon-plus-circle"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div style="display: flex;">
                    ${this._data.user ? 
                    `<div class="recipe__user-generated">
                        <svg>
                        <use href="${icons}#icon-user"></use>
                        </svg>
                    </div>
                    ` : ''}
                    ${this._data.user ? `
                    <button class="btn--round btn--delete">
                        <svg>
                            <use href="${icons}#icon-minus-circle"></use>
                        </svg>
                    </button>
                    ` : `
                    <button class="btn--round">
                        <svg>
                            <use href="${icons}#icon-bookmark${this._data.isBookmarked ? '-fill' : ''}"></use>
                        </svg>
                    </button>
                    `}
                </div>
            </div>
        
            <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${this._data.ingredients.map(ing => {
                return `<li class="recipe__ingredient">
                        <svg class="recipe__icon">
                            <use href="${icons}#icon-check"></use>
                        </svg>
                        <div class="recipe__quantity">${ing?.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
                        <div class="recipe__description">
                            <span class="recipe__unit">${ing?.unit}</span>
                            ${ing?.description}
                        </div>
                        </li>`
            }).join('')}
            </ul>
            </div>
        
            <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
                directions at their website.
            </p>
            <a
                class="btn--small recipe__btn"
                href="${this._data.sourceUrl}"
                target="_blank"
            >
                <span>Directions</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </a>
            </div>
        `
    }
};

export default new RecipeView();