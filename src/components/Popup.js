export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }
  close() {
    this._popup.classList.remove('popup_opened');
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      if (this._popup.classList.contains('popup_opened'))
      this.close();
    }
  }

_overlayClick (evt) {
  const opnForm = document.querySelector('.popup_opened');
  if (evt.target === opnForm) {
    this.close();
  }
}
  _setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', () => this.close(), {once:true});
    document.addEventListener('keydown', evt => this._handleEscClose(evt));
    document.addEventListener('click', evt => this._overlayClick(evt));
  }
}
