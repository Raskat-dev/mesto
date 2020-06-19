
export const initialCards = [
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

export const formConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_status_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__description');
export const authorPopup = document.querySelector('#popup_author');
export const cardsSection = document.querySelector('.cards');
export const authorElement = authorPopup.querySelector('#author-container');
export const photoPopup = document.querySelector('#popup_card');
export const photoElement = photoPopup.querySelector('#photo-container');
export const originalPhoto = document.querySelector('#popup_photo');
export const nameInput = authorElement.querySelector('.popup__input_name');
export const jobInput = authorElement.querySelector('.popup__input_job');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const closeAuthorButton = authorPopup.querySelector('.popup__close');
export const closePhotoButton = photoPopup.querySelector('.popup__close');
export const closeOriginalButton = originalPhoto.querySelector('.popup__close');
export const placeInput = photoElement.querySelector('.popup__input_place');
export const linkInput = photoElement.querySelector('.popup__input_link');
export const placeValue = originalPhoto.querySelector('.popup__place');
export const imageValue = originalPhoto.querySelector('.popup__image');
