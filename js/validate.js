const formConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_status_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage, formObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formObject.errorClass);
};

const hideInputError = (formElement, inputElement, formObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObject.inputErrorClass);
  errorElement.classList.remove(formObject.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, formObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formObject);
  } else {
    hideInputError(formElement, inputElement, formObject);
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};
// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, formObject) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(formObject.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(formObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, formObject) => {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonElement = formElement.querySelector(formObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formObject);
  inputList.forEach((inputElement) => {
     // каждому полю добавим обработчик события input. Провяем все символы
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем checkInputValidity,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement, formObject);
      //вызов toggleButtonState
      toggleButtonState(inputList, buttonElement, formObject);
    });
  });
};

//функция создания массива форм страницы, принимает объект - собирает форму
const enableValidation = (formObject) => {
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, formObject);
});
}

enableValidation(formConfig);
