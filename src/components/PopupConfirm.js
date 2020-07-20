import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, { confirm }) {
    super(popupSelector);
    this._confirm = confirm;
    this._submit = evt => {
      evt.preventDefault();
      this._confirm(this._item, this._itemObject);
    }
    this._popup.querySelector('.popup__container').addEventListener('submit', this._submit);
  }
  setItem(item, itemObject) {
    this._item = item;
    this._itemObject = itemObject;
  }
}