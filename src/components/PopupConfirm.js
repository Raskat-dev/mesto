import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, { confirm }) {
    super(popupSelector);
    this._confirm = confirm;
    this._submit = evt => {
      evt.preventDefault();
      this._confirm(this._card, this._cardClass);
    }
    this._popup.querySelector('.popup__container').addEventListener('submit', this._submit);
  }
  setCard(card, cardClass) {
    this._card = card;
    this._cardClass = cardClass;
  }
}