import View from './View';
import icons from 'url:../../img/icons.svg'; //loading the icons for parcel to convert them later

class bookmarkListView extends View {
    _parentContainer = document.querySelector('.bookmarks__list');

    render(data) {
        this._data = data;
        this._clear();
        this._data.forEach(el => {
            this._parentContainer.insertAdjacentHTML('beforeend', this._generateMarkup(el));
        })
    }
    _generateMarkup(data) {
        return `
        <li class="preview">
            <a class="preview__link preview__link" href="#${data.id}">
                <figure class="preview__fig">
                    <img src="${data.imageUrl}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${data.title}</h4>
                    <p class="preview__publisher">${data.publisher}</p>
                    ${data.isUser ? `<div class="preview__user-generated">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                </div>` : ''}
                </div>
            </a>
        </li>
        `
    }
}

export default new bookmarkListView();