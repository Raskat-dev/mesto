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
const authorElement = authorPopup.querySelector('#author-container');
const photoPopup = document.querySelector('#popup_card');
const photoElement = photoPopup.querySelector('#photo-container');
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

function clearInputs (popup) {
  const form = popup.querySelector(formConfig.formSelector);
  const buttonSave = popup.querySelector(formConfig.submitButtonSelector);
  const inputs = Array.from(form.querySelectorAll(formConfig.inputSelector));
  inputs.forEach((inputElement) => {
      hideInputError(form, inputElement, formConfig);
    })
  toggleButtonState (inputs, buttonSave, formConfig);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escKeydown);
  document.removeEventListener('click', overlayClick);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escKeydown);
  document.addEventListener('click', overlayClick);
}

function openAuthor () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearInputs (authorPopup);
  openPopup(authorPopup);
}

function openPhoto () {
  photoElement.reset();
  clearInputs (photoPopup);
  openPopup(photoPopup);
}
//функция для просмотра оригинала фото
function openOriginal(photo) {
  const name = photo.target.alt;
  imageValue.src = photo.target.currentSrc;
  imageValue.alt = name;
  placeValue.textContent = name;
  openPopup(originalPhoto);
  document.addEventListener('keydown', escKeydown);
}

function pressLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

function pressDelete(evt) {
  const targetCard = evt.target.closest('.card')
  targetCard.removeEventListener('click', pressLike);
  targetCard.removeEventListener('click', openOriginal);
  targetCard.remove();
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

function createContent(photoPlace, photoLink) {
  cardsSection.prepend(addPhoto(photoPlace, photoLink));
}
//функция для сохранения ввода
function formSubmitAuthor (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(authorPopup);
}
function formSubmitPhoto (evt) {
  evt.preventDefault();
  createContent(placeInput.value, linkInput.value);
  placeInput.value = '';
  linkInput.value = '';
  closePopup(photoPopup);
};

const escKeydown = function(evt) {
  const openedForm = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    if (openedForm)
    closePopup(openedForm);
  };
}

const overlayClick = function(evt) {
  const opnForm = document.querySelector('.popup_opened');
  if (evt.target === opnForm) {
    closePopup(opnForm);
  }
}

authorElement.addEventListener('submit', formSubmitAuthor);
editButton.addEventListener('click', openAuthor);
closeAuthorButton.addEventListener('click', () => closePopup(authorPopup));
photoElement.addEventListener('submit', formSubmitPhoto);
addButton.addEventListener('click', openPhoto);
closePhotoButton.addEventListener('click', () => closePopup(photoPopup));
closeOriginalButton.addEventListener('click', () => closePopup(originalPhoto));

initialCards.forEach((item) => {
  createContent(item.name, item.link);
});
