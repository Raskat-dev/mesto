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


const deletePopupWindow = new PopupConfirm(deletePopup, { confirm: (card, cardClass) => {
  cardDelete(card, cardClass);
}
});
const openConfirmModal = function(card, cardClass) {
  deletePopupWindow.setCard(card, cardClass);
  deletePopupWindow.open();
}
//валидация форм
const validateAuthorForm = new FormValidator(formConfig, authorElement);
validateAuthorForm.enableValidation();
const validatePhotoForm = new FormValidator(formConfig, photoElement);
validatePhotoForm.enableValidation();
const validateAvatarForm = new FormValidator(formConfig, avatarElement);
validateAvatarForm.enableValidation();

//Данные о пользователе с сервера
const apiRequest = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-12',
  token: 'c7046677-4ab5-42c0-bca8-fcae81104075'
})
//создаем объект с дефолтными данными пользователя

const defaultUserInfo = new UserInfo({name: '', about: '', avatar: ''}, '.profile__name', '.profile__description', '.profile__avatar');
const downloadUserInfo = function() {
  apiRequest.getProfileInfo()
  .then((result) => {
    defaultUserInfo.setUserInfo(result);
  })
  .catch((err) => {
    console.log(`Ошибка ${err.status}.`);
  });
}
downloadUserInfo();

//изменение данных пользователя
const addUserForm = new PopupWithForm(authorPopup, {
  handleFormSubmit: (inputResult) => {
    apiRequest.changeProfileInfo(inputResult)
    .then((res) => {
      defaultUserInfo.setUserNameInfo(res);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}.`);
    });
  addUserForm.close();
  }
}, validateAuthorForm)

const addUserAvatar = new PopupWithForm(avatarPopup, {
  handleFormSubmit: (inputResult) => {
    apiRequest.changeProfileAvatar(inputResult)
    .then((res) => {
      defaultUserInfo.setUserAvatar(res);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}.`);
    });
    addUserAvatar.close();
  }
}, validateAvatarForm)

// создание базовых карточек
const currentPhoto = new PopupWithImage (originalPhoto, '.popup__image', '.popup__place');
//Карточки с сервера__________________
//создаем секцию, куда будем пушить карточки
const defaultCardList = new Section({items: {},
  renderer: (photo) => {
  const card = new Card({data: photo, handleCardClick: () => {
    currentPhoto.open(photo);
  }, handleDelete: () => openConfirmModal(photo, card), userId: 'ab1d038b506be9771e877439'});
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
}}, '.cards');
//заполняем созданную секцию с помощью Api
const downloadDefaultCards = function() {
  apiRequest.getCardsFromServer()
  .then((result) => {
    defaultCardList.addDefaultItems(result);
    defaultCardList.renderItems();
  })
  .catch((err) => {
    console.log(`Ошибка ${err}.`);
  });
}
downloadDefaultCards();

//сабмит новой карточки
const addPhotoForm = new PopupWithForm(photoPopup, {
  handleFormSubmit: (item) => {
    apiRequest.addNewCard(item)
    .then(res => console.log(res))
    .then((res) => {
      const card = new Card({data: res,
        handleCardClick: () => {
        currentPhoto.open(res);
      }, handleDelete: () => openConfirmModal(res, card), userId: 'ab1d038b506be9771e877439'})
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement); 
    })
    .catch((err) => {
      console.log(`Ошибка ${err}.`);
    });
    addPhotoForm.close();
}}, validatePhotoForm);

const cardDelete = function(item, cardClass) {
  apiRequest.deleteCard(item._id)
  .then((result) => {
    cardClass._pressDelete();
  })
  .catch((err) => {
    console.log(`Ошибка ${err}.`);
  })
  .finally(() => {
    deletePopupWindow.close();
  })
}

editButton.addEventListener('click', () => {
  const {name, about} = defaultUserInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  addUserForm.open()
});
addButton.addEventListener('click', () => addPhotoForm.open());
document.querySelector('.profile__avatarblock').addEventListener('click', () => addUserAvatar.open())
