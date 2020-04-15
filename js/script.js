//задаем все переменные сразу

const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const saveButton = document.querySelector('.popup__save');
const editButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__status');
//функция для вызова формы
function formPopup () {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  else {
    popup.classList.add('popup_opened')
  }
}
//функция для сохранения ввода
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    formPopup ()
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', formPopup);
closeButton.addEventListener('click', formPopup);
