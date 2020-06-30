export default class Card {
  constructor( { data, handleCardClick, handleDelete, userId }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this.abs = this.deletePopup.bind(this);
    this._userId = userId;
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
  this._handleCardClick(this._name, this._link);
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
    this._card.querySelector('.card__delete').addEventListener('click', this.abs);
  }
  deletePopup() {
     this._handleDelete();
  }

  compareUserId(userId) {
    this.userId = userId;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._card.querySelector('.card__image');
    const cardLikes = this._card.querySelector('.card__likes-number');

    if(this._ownerId !== this._userId) {
      this._card.querySelector('.card__delete').style.display='none';
    }

    cardImage.src = this._link;
    this._card.querySelector('.card__title').textContent = this._name;
    cardImage.alt = this._name;
    cardLikes.textContent = this._likes.length;

    return this._card;
  }
}
