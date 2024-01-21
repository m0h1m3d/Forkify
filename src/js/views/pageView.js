import View from './View';
import icons from 'url:../../img/icons.svg'; //loading the icons for parcel to convert them later

class pageView extends View {
    _parentContainer = document.querySelector('.pagination');
    _errorMessage = "Can't load recipe."
    _currentPage;
    _totalPage;
    
    render(currentPage, totalPage) {
        this._currentPage = currentPage;
        this._totalPage = totalPage;
        this._clear();
        this._parentContainer.insertAdjacentHTML('beforeend', this._renderPagination(currentPage));
    }

    _renderPagination(page) {
        let markup;

        if (page === 1) {
            markup = `
                <button class="btn--inline pagination__btn--next">
                    <span>Page 2</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
          
            `
        } else if (page === this._totalPage) {
            markup = `
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${page - 1}</span>
                </button>
            `
        } else {
            markup = `
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${page - 1}</span>
                </button>
                <button class="btn--inline pagination__btn--next">
                    <span>Page ${page + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `
        }
        return markup;
    }
    addHandlerPagination(handler) {
        this._parentContainer.addEventListener('click', function(e) {
            if (!e.target.closest('.btn--inline')) return;
            this._clear();
            const pageButton = e.target.closest('.btn--inline');
            pageButton.classList.contains('pagination__btn--next') ? this._currentPage++ : this._currentPage--;
            handler(this._currentPage);
        }.bind(this))
    }
}

export default new pageView();