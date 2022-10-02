//Импорт index.css для корректной сборки Webpack
import './pages/index.css';

//Импорты
import {enableValidation} from "./components/validate.js";
import {initialCards, addFormSubmitHandler, initCard, formAddElement, popupAddConteiner} from './components/card.js';
import {openPopup, closePopup, popupPictureContainer, popupEditConteiner} from './components/modal.js';
import {editFormSubmitHandler, profileName, profileDescription, nameInput, descriprionInput, formEditElement} from './components/profile.js';
import {profileEditButton, popupEditCloseButton, elementsInitialList, profileAddButton, popupPictureCloseButton, popupAddCloseButton} from './components/utils.js'

// Добавляем событие "openPopup" на попап с редактированием профиля
profileEditButton.addEventListener('click', function () {
  openPopup(popupEditConteiner);
});

// Добавляем событие "closePopup" на попап с редактированием профиля
popupEditCloseButton.addEventListener('click', function () {
  closePopup(popupEditConteiner);
});

// Добавляем событие "openPopup" на попап с добавлением новой карточки
profileAddButton.addEventListener('click', function () {
  openPopup(popupAddConteiner);
});

// Добавляем событие "closePopup" на попап с созданием новой карточки
popupAddCloseButton.addEventListener('click', function () {
  closePopup(popupAddConteiner);
});

// Добавляем событие "submit" на попап с редактированием профиля
formEditElement.addEventListener('submit', editFormSubmitHandler);

//Добавляем событие "submit" на попап с добавленим новой карточки
formAddElement.addEventListener('submit', addFormSubmitHandler);

// Добавляем событие "closePopup" на попап с картинкой
popupPictureCloseButton.addEventListener('click', function () {
  closePopup(popupPictureContainer);
});

// Заполняем изначальные 6 карточек
for (let i = 0; i < initialCards.length; i++) {
  elementsInitialList.append(initCard(initialCards[i].name, initialCards[i].link));
}

// Вносим изменения в данные профиля из введенного Input
nameInput.value = profileName.textContent;
descriprionInput.value = profileDescription.textContent;

// Функция проверки валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup_button-submit-disabled',
  inputErrorClass: 'form_input_type_error',
  errorClass: 'form_input-error_active'
});