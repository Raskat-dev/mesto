import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, { confirm }) {
    super(popupSelector);
    this._confirm = confirm;
    this._submit = evt => {
      evt.preventDefault();
      this._confirm(this._item, this._itemClass);
    }
    this._popup.querySelector('.popup__container').addEventListener('submit', this._submit);
  }
  setItem(item, itemClass) {
    this._item = item;
    this._itemClass = itemClass;
  }
}