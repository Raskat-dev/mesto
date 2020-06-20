import Popup from './Popup.js';
import { formConfig } from '../utils/constants.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }, validator) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._validator = validator;
  }
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(formConfig.inputSelector);
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    });
    return this._formValues;
  }
  _hanldeSubmitForm(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }
  open() {
    super.open();
    this._submit = this._hanldeSubmitForm.bind(this);
    this._popup.querySelector(formConfig.formSelector).addEventListener('submit', this._submit);
  }

  close() {
    this._popup.querySelector('.popup__container').removeEventListener('submit', this._submit);
    this._popup.querySelector('.popup__container').reset();
    this._validator.clear(this._popup);
    super.close();
    }
}
