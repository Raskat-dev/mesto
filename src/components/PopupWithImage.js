import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(popupSelector, imageSelector, nameSelector) {
    super(popupSelector);
    this._image = document.querySelector(imageSelector);
    this._name = document.querySelector(nameSelector);
	}

 open(item) {
    this._image.src = item.link;
    this._image.alt = item.name;
    this._name.textContent = item.name;
    super.open();
  }
}
