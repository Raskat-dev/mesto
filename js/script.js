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
const profileName = document.querySelector('.profile__name');//name
const profileJob = document.querySelector('.profile__status');//status
const cardTemplate = document.querySelector('#card-template').content;//константа блока кардс
const cardsSection = document.querySelector('.cards');
//попапы
const authorPopup = document.querySelector('#popup_author');//author name/status popup
const authorElement = authorPopup.querySelector('.popup__container');
const photoPopup = document.querySelector('#popup_card');//photo-add popup
const photoElement = photoPopup.querySelector('.popup__container');
const originalPhoto = document.querySelector('#popup_photo');//original phhoto popup
//поля ввода в формы
const nameInput = authorElement.querySelector('.popup__input_name');//author name input
const jobInput = authorElement.querySelector('.popup__input_job');//author status input
//кнопки
const editButton = document.querySelector('.profile__edit-button');//change author name/status button
const addButton = document.querySelector('.profile__add-button');//add photo on the page
const closeAuthorButton = authorPopup.querySelector('.popup__close');//author form close button
const closePhotoButton = photoPopup.querySelector('.popup__close');//photo-add form close button
const closeOriginalButton = originalPhoto.querySelector('.popup__close');//original photo close button
// остальное
const placeValue = originalPhoto.querySelector('.popup__place');
const imageValue = originalPhoto.querySelector('.popup__image');
const placeInput = photoElement.querySelector('.popup__input_place');//photo-add place input
const linkInput = photoElement.querySelector('.popup__input_link');//photo-add link input


function openClosePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function openCloseAuthorPopup() {

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openClosePopup(authorPopup);
}
//функция для вызова формы добавления фото
function openClosePhotoPopup() {
  photoElement.reset();
  openClosePopup(photoPopup);
}

//функция для просмотра оригинала фото
function openCloseOriginal(photoPlace, photoLink) {
  if (originalPhoto.classList.contains('popup_opened')) {
    openClosePopup(originalPhoto);
}
  else {
  openClosePopup(originalPhoto)
  placeValue.textContent = photoPlace;
  imageValue.src = photoLink;
  imageValue.alt = photoPlace;
}
}

function pressLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

function pressDelete(evt) {
  evt.target.closest('.card').remove()
}

function addPhoto(place, link) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = place;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = place;

  cardElement.querySelector('.card__like').addEventListener('click', pressLike);

  cardElement.querySelector('.card__delete').addEventListener('click', pressDelete);

  cardElement.querySelector('.card__image').addEventListener('click', () => {
    openCloseOriginal(place, link);
  });

  cardsSection.prepend(cardElement);
}

//функция для сохранения ввода
function formSubmitAuthor (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    openCloseAuthorPopup ()
}
function formSubmitPhoto (evt) {
  evt.preventDefault();
  addPhoto(placeInput.value, linkInput.value);
  placeInput.value = '';
  linkInput.value = '';
  openClosePhotoPopup();
};

authorElement.addEventListener('submit', formSubmitAuthor);//save new name\status
editButton.addEventListener('click', openCloseAuthorPopup);//change name\status
closeAuthorButton.addEventListener('click', openCloseAuthorPopup);//close authorPopup
photoElement.addEventListener('submit', formSubmitPhoto);
addButton.addEventListener('click', openClosePhotoPopup);//open photo-add popup
closePhotoButton.addEventListener('click', openClosePhotoPopup);//close photo-add popup
closeOriginalButton.addEventListener('click', openCloseOriginal);//close original popup

initialCards.forEach((item) => {
  addPhoto(item.name,item.link);
});
