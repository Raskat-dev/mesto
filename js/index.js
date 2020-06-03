import FormValidator from './FormValidator.js';
import Card from './Card.js';

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

const formConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_status_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__status');
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
const placeInput = photoElement.querySelector('.popup__input_place');
const linkInput = photoElement.querySelector('.popup__input_link');


function hideInputError (inputElement, formName) {
  const errorElement = formName.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formConfig.inputErrorClass);
  errorElement.classList.remove(formConfig._errorClass);
  errorElement.textContent = '';
}

function hasInvalidInput (inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(formConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(formConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function clearEachInput (formName, inputs, buttonSave) {
  inputs.forEach((inputElement) => {
    hideInputError(inputElement, formName)})
    toggleButtonState(inputs, buttonSave);
}

function clearInputs (popup) {
  const form = popup.querySelector(formConfig.formSelector);
  const buttonSave = popup.querySelector(formConfig.submitButtonSelector);
  const inputs = Array.from(form.querySelectorAll(formConfig.inputSelector));

  if (popup === authorPopup) {
    clearEachInput(authorPopup, inputs, buttonSave);
    }
  if (popup === photoPopup) {
    clearEachInput(photoPopup, inputs, buttonSave);
  }
}

function escKeydown (evt) {
  if (evt.key === 'Escape') {
    const openedForm = document.querySelector('.popup_opened');
    if (openedForm)
    closePopup(openedForm);
  }
}

function overlayClick (evt) {
  const opnForm = document.querySelector('.popup_opened');
  if (evt.target === opnForm) {
    closePopup(opnForm);
  }
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

function createCard (photo) {
  const card = new Card(photo)
  const cardElement = card.generateCard();
  cardsSection.prepend(cardElement);
}
//функция для сохранения ввода
function formSubmitAuthor (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(authorPopup);
}
function formSubmitPhoto (evt) {
  const newPhotoObject = {
    name: placeInput.value,
    link: linkInput.value
  }
  evt.preventDefault();
  createCard(newPhotoObject);
  placeInput.value = '';
  linkInput.value = '';
  closePopup(photoPopup);
}

authorElement.addEventListener('submit', formSubmitAuthor);
editButton.addEventListener('click', openAuthor);
closeAuthorButton.addEventListener('click', () => closePopup(authorPopup));
photoElement.addEventListener('submit', formSubmitPhoto);
addButton.addEventListener('click', openPhoto);
closePhotoButton.addEventListener('click', () => closePopup(photoPopup));
closeOriginalButton.addEventListener('click', () =>
  closePopup(originalPhoto));

initialCards.forEach((item) => {
  createCard(item);
});

//функция создания массива форм страницы, принимает объект - собирает форму
const validateAuthorForm = new FormValidator(formConfig, authorElement);
validateAuthorForm.enableValidation();
const validatePhotoForm = new FormValidator(formConfig, photoElement);
validatePhotoForm.enableValidation();
