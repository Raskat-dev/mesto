import { escKeydown, overlayClick, closePopup, openPopup } from './index.js';
const originalPhoto = document.querySelector('#popup_photo');
const placeValue = originalPhoto.querySelector('.popup__place');
const imageValue = originalPhoto.querySelector('.popup__image');

export default class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#card-template')
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement
  }

  _openOriginal() {

    imageValue.src = this._link;
    imageValue.alt = this._name;
    placeValue.textContent = this._name;
    openPopup(originalPhoto);
  }

  _pressLike() {
    this._card.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _pressDelete() {
    this._card.remove();
  }

  _setEventListeners() {
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._openOriginal()});
    this._card.querySelector('.card__like').addEventListener('click', () => {
      this._pressLike()});
    this._card.querySelector('.card__delete').addEventListener('click', () => {
      this._pressDelete()}, {once : true});
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__title').textContent = this._name;
    this._card.querySelector('.card__image').alt = this._name;

    return this._card;
  }
}
