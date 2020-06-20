export default class Card {
  constructor( { data, handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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
  this._handleCardClick();
 }
  _pressLike() {
    this._card.querySelector('.card__like').classList.toggle('card__like_active');
  }
  _pressDelete() {
    this._card.querySelector('.card__image').removeEventListener('click', this.openOriginal);
    this._card.querySelector('.card__like').removeEventListener('click', this.pressLike);
    this._card.remove();
  }
  _setEventListeners() {
    this.openOriginal = this._openOriginal.bind(this);
    this.pressLike = this._pressLike.bind(this);
    this._card.querySelector('.card__image').addEventListener('click', this.openOriginal);
    this._card.querySelector('.card__like').addEventListener('click', this.pressLike);
    this._card.querySelector('.card__delete').addEventListener('click', () => this._pressDelete(), {once : true});
  }
  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._card.querySelector('.card__image');

    cardImage.src = this._link;
    this._card.querySelector('.card__title').textContent = this._name;
    cardImage.alt = this._name;

    return this._card;
  }
}
