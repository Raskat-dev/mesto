export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._overlay = this._overlayClick.bind(this);
    this._esc = this._handleEscClose.bind(this);
    this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
  }

  open() {
    document.addEventListener('click', this._overlay);
    document.addEventListener('keydown', this._esc);
    this._popup.classList.add('popup_opened');
  }
  close() {
    document.removeEventListener('click', this._overlay);
    document.removeEventListener('keydown', this._esc);
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
}
