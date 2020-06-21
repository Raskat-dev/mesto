import './index.css';

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const authorPopup = document.querySelector('#popup_author');
const authorElement = authorPopup.querySelector('#author-container');
const photoPopup = document.querySelector('#popup_card');
const photoElement = photoPopup.querySelector('#photo-container');
const originalPhoto = document.querySelector('#popup_photo');
const nameInput = authorElement.querySelector('.popup__input_name');
const jobInput = authorElement.querySelector('.popup__input_job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

import {  initialCards, formConfig } from '../utils/constants.js';
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';

// создание базовых карточек
const currentPhoto = new PopupWithImage (originalPhoto, '.popup__image', '.popup__place');

const defaultCardList = new Section({items: initialCards,
  renderer: (photo) => {
  const card = new Card({data: photo, handleCardClick: () => {
    currentPhoto.open(photo);
  }});
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
}}, '.cards');
// рендерим карточки на странице
defaultCardList.renderItems();

//валидация форм
const validateAuthorForm = new FormValidator(formConfig, authorElement);
validateAuthorForm.enableValidation();
const validatePhotoForm = new FormValidator(formConfig, photoElement);
validatePhotoForm.enableValidation();

//сабмит новой карточки
const addPhotoForm = new PopupWithForm(photoPopup, {
  handleFormSubmit: (item) => {
  const card = new Card({data: item,
    handleCardClick: () => {
    currentPhoto.open(item);
  }})
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
  addPhotoForm.close();
}}, validatePhotoForm);

//создаем объект с дефолтными данными пользователя
const defaultUserInfo = new UserInfo({ name: profileName.textContent, description: profileJob.textContent }, '.profile__name', '.profile__description');

const addUserForm = new PopupWithForm(authorPopup, {
  handleFormSubmit: (inputResult) => {
  defaultUserInfo.setUserInfo(inputResult);
  addUserForm.close();
  }
}, validateAuthorForm)

editButton.addEventListener('click', () => {
  const {name, description} = defaultUserInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = description;
  addUserForm.open()
});
addButton.addEventListener('click', () => addPhotoForm.open());
