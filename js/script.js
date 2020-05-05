//задаем все переменные сразу
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__status');
const cardTemplate = document.querySelector('#card-template').content;
const cardsSection = document.querySelector('.cards');
const authorPopup = document.querySelector('#popup_author');
const authorElement = authorPopup.querySelector('.popup__container');
const photoPopup = document.querySelector('#popup_card');
const photoElement = photoPopup.querySelector('.popup__container');
const originalPhoto = document.querySelector('#popup_photo');
const nameInput = authorElement.querySelector('.popup__input_name');
const jobInput = authorElement.querySelector('.popup__input_job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeAuthorButton = authorPopup.querySelector('.popup__close');
const closePhotoButton = photoPopup.querySelector('.popup__close');
const closeOriginalButton = originalPhoto.querySelector('.popup__close');
const placeValue = originalPhoto.querySelector('.popup__place');
const imageValue = originalPhoto.querySelector('.popup__image');
const placeInput = photoElement.querySelector('.popup__input_place');
const linkInput = photoElement.querySelector('.popup__input_link');

function openClosePopup(popup) {
  if((popup.id ==='popup_author') && (!popup.classList.contains('popup_opened'))) {
   nameInput.value = profileName.textContent;
   jobInput.value = profileJob.textContent;
  }
  else if ((popup.id ==='popup_card') && (!popup.classList.contains('popup_opened'))) {
  photoElement.reset();
  }
 popup.classList.toggle('popup_opened');
}

//функция для просмотра оригинала фото
function openOriginal(photo) {
  const name = photo.target.alt;
  imageValue.src = photo.target.currentSrc;
  imageValue.alt = name;
  placeValue.textContent = name;
  openClosePopup(originalPhoto);
}

function closeOriginal() {
  originalPhoto.classList.remove('popup_opened');
}

function pressLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

function pressDelete(evt) {
  evt.target.closest('.card').removeEventListener('click', pressLike);
  evt.target.closest('.card').removeEventListener('click', openOriginal);
  evt.target.closest('.card').remove();
}

function createContent(photoPlace, photoLink) {
  cardsSection.prepend(addPhoto(photoPlace, photoLink));
}

function addPhoto(place, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTextElement = cardElement.querySelector('.card__title');

  cardTextElement.textContent = place;
  cardImageElement.src = link;
  cardImageElement.alt = place;

  cardElement.querySelector('.card__like').addEventListener('click', pressLike);

  cardElement.querySelector('.card__delete').addEventListener('click', pressDelete, {once : true});
  cardImageElement.addEventListener('click', openOriginal);

  return cardElement
}
//функция для сохранения ввода
function formSubmitAuthor (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    openClosePopup(authorPopup);
}
function formSubmitPhoto (evt) {
  evt.preventDefault();
  createContent(placeInput.value, linkInput.value);
  placeInput.value = '';
  linkInput.value = '';
  openClosePopup(photoPopup);
};

authorElement.addEventListener('submit', formSubmitAuthor);
editButton.addEventListener('click', () => openClosePopup(authorPopup));
closeAuthorButton.addEventListener('click', () => openClosePopup(authorPopup));
photoElement.addEventListener('submit', formSubmitPhoto);
addButton.addEventListener('click', () => openClosePopup(photoPopup));
closePhotoButton.addEventListener('click', () => openClosePopup(photoPopup));
closeOriginalButton.addEventListener('click', closeOriginal);

initialCards.forEach((item) => {
  createContent(item.name, item.link);
});
