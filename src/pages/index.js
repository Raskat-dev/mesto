import './index.css';

import { authorElement, editButton, photoElement, addButton, profileName, profileJob, originalPhoto, initialCards, authorPopup, photoPopup, formConfig, cardsSection, nameInput, jobInput } from '../utils/constants.js';
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';
// создание базовых карточек

const defaultCardList = new Section({items: initialCards,
  renderer: (photo) => {
  const card = new Card({data: photo, handleCardClick: () => {
    const currentPhoto = new PopupWithImage (originalPhoto, { name: photo.name, link: photo.link });
    currentPhoto.open();
  }});
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
}}, cardsSection);
// рендерим карточки на странице
defaultCardList.renderItems();

//сабмит новой карточки
const addPhotoForm = new PopupWithForm(photoPopup, {
  handleFormSubmit: (item) => {
  const card = new Card({data: item,
    handleCardClick: () => {
    const newPhoto = new PopupWithImage (originalPhoto, { name: item.name, link: item.link });
    newPhoto.open();
  }})
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
}});

//создаем объект с дефолтными данными пользователя
const defaultUserInfo = new UserInfo();
defaultUserInfo.getUserInfo();

const addUserForm = new PopupWithForm(authorPopup, {
  handleFormSubmit: () => {
  defaultUserInfo.setUserInfo();
  }
})
//функция создания массива форм страницы, принимает объект - собирает форму
const validateAuthorForm = new FormValidator(formConfig, authorElement);
validateAuthorForm.enableValidation();
const validatePhotoForm = new FormValidator(formConfig, photoElement);
validatePhotoForm.enableValidation();

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  addUserForm.open()
});
addButton.addEventListener('click', () => addPhotoForm.open());
