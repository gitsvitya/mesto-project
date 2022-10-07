//Импорт index.css для корректной сборки Webpack
import './pages/index.css';

//Импорты
import {enableValidation} from "/src/components/validate.js";
import {initialCards, handleInitialCards, handleSubmitCardForm, initCard, formAddElement, popupAddConteiner} from '/src/components/card.js';
import {openPopup, closePopup, popupPictureContainer, popupEditConteiner} from '/src/components/modal.js';
import {
  handleProfileFormSubmit,
  profileName,
  profileDescription,
  profileAvatar,
  nameInput,
  descriprionInput,
  formEditElement,
  fillProfileWithData
} from '/src/components/profile.js';

import {profileEditButton, elementsInitialList, profileAddButton, popupPictureCloseButton, popupAddCloseButton, closeButtons} from './components/constants.js';
import {getUserData, fillCards} from './components/api.js';

// Добавляем событие "openPopup" на попап с редактированием профиля
profileEditButton.addEventListener('click', function () {
  openPopup(popupEditConteiner);
  nameInput.value = profileName.textContent;
  descriprionInput.value = profileDescription.textContent;
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Добавляем событие "openPopup" на попап с добавлением новой карточки
profileAddButton.addEventListener('click', function () {
  openPopup(popupAddConteiner);
});

// Добавляем событие "submit" на попап с редактированием профиля
formEditElement.addEventListener('submit', handleProfileFormSubmit);

//Добавляем событие "submit" на попап с добавленим новой карточки
formAddElement.addEventListener('submit', handleSubmitCardForm);

// Функция проверки валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup_button-submit-disabled',
  inputErrorClass: 'form_input_type_error',
  errorClass: 'form_input-error_active'
});

// Функция формирования профилиля с сервера
fillProfileWithData(profileName, profileDescription, profileAvatar);

// Функция заполнения первоначальных карточек с сервера
handleInitialCards();
