import icons from 'url:../../img/icons.svg'; //loading the icons for parcel to convert them later

export default class View {
    _data;
    _parentContainer;
    _errorMessage;
    
    renderSpinner() {
        this._clear();
        const markup =  `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `
        this._parentContainer.insertAdjacentHTML('afterbegin', markup);
    }
    errorRender(message = this._errorMessage) {
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `
        this._clear();
        this._parentContainer.insertAdjacentHTML('afterbegin', markup);
    }
    _clear() {
        this._parentContainer.innerHTML = '';
    }
}