import Popup from './Popup.js';
import { imageValue, placeValue } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
	constructor(popupSelector, { name, link }) {
    super(popupSelector);
    this._name = name;
    this._link = link;
	}

 open() {
   super.open();
   imageValue.src = this._link;
   imageValue.alt = this._name;
   placeValue.textContent = this._name;
  }
}
