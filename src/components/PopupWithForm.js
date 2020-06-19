import Popup from './Popup.js';
import { formConfig } from '../utils/constants.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
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
    this.close();
  }
  _setEventListeners() {
    super._setEventListeners();
    this._submit = this._hanldeSubmitForm.bind(this);
    this._popup.querySelector(formConfig.formSelector).addEventListener('submit', this._submit);
  }
  _clear() {
    const inputList = Array.from(this._popup.querySelector(formConfig.formSelector).querySelectorAll(formConfig.inputSelector));
    const formButton = this._popup.querySelector(formConfig.formSelector).querySelector(formConfig.submitButtonSelector)
    inputList.forEach((inputElement) => {
      const spanElement = this._popup.querySelector(formConfig.formSelector).querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(formConfig.inputErrorClass);
      spanElement.classList.remove(formConfig.errorClass);
      spanElement.textContent = '';
      if (!inputElement.value) {
        formButton.classList.add(formConfig.inactiveButtonClass);
        formButton.disabled = true;
      }  else {
        formButton.classList.remove(formConfig.inactiveButtonClass);
        formButton.disabled = false;
      }
    });
  }
  close() {
    this._popup.querySelector('.popup__container').removeEventListener('submit', this._submit);
    this._clear();
    super.close();
    this._popup.querySelector('.popup__container').reset();
    }
}
