export default class Card {
  constructor( { data, handleCardClick, handleDelete, addLike, deleteLike }, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id
    this._owner = data.owner;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this.abs = this.deletePopup.bind(this);
    this._userId = userId;
    this._addLike = addLike;
    this._deleteLike = deleteLike; 
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
    const cardLikes = this._card.querySelector('.card__likes-number');
    if (this._card.querySelector('.card__like').classList.contains('card__like_active')) {
      this._card.querySelector('.card__like').classList.remove('card__like_active');
      this._deleteLike()
      .then((res) => cardLikes.textContent = res.likes.length)
      .catch((err) => {
      console.log(`Ошибка ${err}.`);
    })
    } else {
      this._card.querySelector('.card__like').classList.add('card__like_active');
      this._addLike()
      .then((res) => cardLikes.textContent = res.likes.length)
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      })
    }
  }
  pressDelete() {
    this._card.querySelector('.card__image').removeEventListener('click', this.openOriginal);
    this._card.querySelector('.card__like').removeEventListener('click', this.pressLike);
    this._card.remove();
    this._card = null;
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

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._card.querySelector('.card__image');
    const cardLikes = this._card.querySelector('.card__likes-number');

    if(this._owner._id !== this._userId) {
      this._card.querySelector('.card__delete').style.display='none';
    }
    if (this._likes.some((user) => (user._id === this._userId))) {
      this._card.querySelector('.card__like').classList.add('card__like_active');
    }

    cardImage.src = this._link;
    this._card.querySelector('.card__title').textContent = this._name;
    cardImage.alt = this._name;
    cardLikes.textContent = this._likes.length;

    return this._card;
  }
}
