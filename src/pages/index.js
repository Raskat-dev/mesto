import './index.css';

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar')
const authorPopup = document.querySelector('#popup_author');
const authorElement = authorPopup.querySelector('#author-container');
const avatarPopup = document.querySelector('#popup_avatar');
const avatarElement = avatarPopup.querySelector('#avatar-container');
const photoPopup = document.querySelector('#popup_card');
const deletePopup = document.querySelector('#popup_delete');
const photoElement = photoPopup.querySelector('#photo-container');
const originalPhoto = document.querySelector('#popup_photo');
const nameInput = authorElement.querySelector('.popup__input_name');
const jobInput = authorElement.querySelector('.popup__input_job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

import { formConfig } from '../utils/constants.js';
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupConfirm from '../components/PopupConfirm';

//валидация форм
const validateAuthorForm = new FormValidator(formConfig, authorElement);
validateAuthorForm.enableValidation();
const validatePhotoForm = new FormValidator(formConfig, photoElement);
validatePhotoForm.enableValidation();
const validateAvatarForm = new FormValidator(formConfig, avatarElement);
validateAvatarForm.enableValidation();


const deletePopupWindow = new PopupConfirm(deletePopup, { confirm: (item, itemClass) => {
  cardDelete(item, itemClass);
}
});
const openConfirmModal = function(item, itemClass) {
  deletePopupWindow.setItem(item, itemClass);
  deletePopupWindow.open();
}
//Данные о пользователе с сервера
const apiRequest = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-12',
  token: 'c7046677-4ab5-42c0-bca8-fcae81104075'
})
//создаем объект с дефолтными данными пользователя
const downloadStatus = function(formElement, status) {
  if (status === true) {
    formElement.querySelector('.popup__save').textContent = 'Сохранение...'
    }
  if (status === false) {
    formElement.querySelector('.popup__save').textContent = 'Сохранить'
    }
  }

const defaultUserInfo = new UserInfo({name: '', about: '', avatar: ''}, '.profile__name', '.profile__description', '.profile__avatar');

//изменение данных пользователя
const addUserForm = new PopupWithForm(authorPopup, {
  handleFormSubmit: (inputResult) => {
    downloadStatus(authorElement, true);
    apiRequest.changeProfileInfo(inputResult)
    .then((res) => {
      defaultUserInfo.setUserNameInfo(res);
      addUserForm.close();
    })
    .catch((err) => {
      console.log(`Ошибка ${err}.`);
    })
    .finally(() => {
      downloadStatus(authorElement, false);
    })
  }
}, validateAuthorForm)

const addUserAvatar = new PopupWithForm(avatarPopup, {
  handleFormSubmit: (inputResult) => {
    downloadStatus(avatarElement, true);
    apiRequest.changeProfileAvatar(inputResult)
    .then((res) => {
      defaultUserInfo.setUserAvatar(res);
      addUserAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка ${err}.`);
    })
    .finally(() => {
      downloadStatus(avatarElement, false);
    })
  }
}, validateAvatarForm)

const currentPhoto = new PopupWithImage (originalPhoto, '.popup__image', '.popup__place');

const createCard = function(cardItem, userId) {
  const card = new Card({data: cardItem,
    handleCardClick: () => {
    currentPhoto.open(cardItem);
  }, handleDelete: () => openConfirmModal(cardItem, card), 
  addLike: () => cardLike(cardItem),
  deleteLike:() => cardLikeDelete(cardItem) }, userId);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement); 
}
//функция для лайка карточки
const cardLike = function(card) {
  return apiRequest.addLike(card._id)
}
//функция для удаления лайка карточки
const cardLikeDelete = function(card) {
  return apiRequest.deleteLike(card._id)
}

//сабмит новой карточки
const addPhotoForm = new PopupWithForm(photoPopup, {
  handleFormSubmit: (item) => {
    downloadStatus(photoElement, true);
    apiRequest.addNewCard(item)
    .then((res) => {
      createCard(res, res.owner._id);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}.`);
    })
    .finally(() => {
      addPhotoForm.close();
      downloadStatus(photoElement, false);
    })
}}, validatePhotoForm);

const cardDelete = function(item, cardObject) {
  apiRequest.deleteCard(item._id)
  .then(() => {
    cardObject.pressDelete();
  })
  .catch((err) => {
    console.log(`Ошибка ${err}.`);
  })
  .finally(() => {
    deletePopupWindow.close();
  })
}
//Карточки с сервера__________________
//создаем секцию, куда будем пушить карточки
const cardList = new Section({
  renderer: (photo, userId) => {
    createCard(photo, userId);
}}, '.cards');

const startPage = function() {
  Promise.all([apiRequest.getProfileInfo(), apiRequest.getCardsFromServer()])
  .then(([user, cards]) => {
    defaultUserInfo.setUserInfo(user);
    cardList.renderItems(cards, user._id);
  })
  .catch((err) => {
    console.log(`Ошибка ${err}.`);
  })
}
startPage();

editButton.addEventListener('click', () => {
  const {name, about} = defaultUserInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  addUserForm.open()
});
addButton.addEventListener('click', () => addPhotoForm.open());
document.querySelector('.profile__avatarblock').addEventListener('click', () => addUserAvatar.open())
