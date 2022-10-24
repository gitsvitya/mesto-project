//Импорт index.css для корректной сборки Webpack
import './pages/index.css';

//Импорты
import {enableValidation} from "/src/components/validate.js";
import {formAddElement, popupAddConteiner, titleInput, linkInput, elementsNewList, cardButton, initCard, myUserId} from '/src/components/card.js';
import {openPopup, closePopup, popupEditConteiner, popupAvatarConteiner, formEditAvatar} from '/src/components/modal.js';
import {handleProfileFormSubmit, profileName, profileDescription, profileAvatar, nameInput, descriptionInput, formEditElement, avatarInput, avatarImage, avatarButton, profileButton} from '/src/components/profile.js';
import {profileEditButton, profileAddButton, closeButtons, avatarEditButton} from './components/constants.js';
// import {fillCards, getUserData, sendAvatar, sendCard} from "./components/api";

import Api from '/src/components/api';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '50cb73c3-cd63-4207-b16a-8317dc26240b',
    'Content-Type': 'application/json'
  }
});

// Добавляем событие "openPopup" на попап с редактированием профиля
profileEditButton.addEventListener('click', function () {
  openPopup(popupEditConteiner);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

// Обработчик сабмита формы
function handleSubmitCardForm(evt) {
  cardButton.textContent = 'Сохранение...';
  evt.preventDefault();
  api.sendCard(titleInput.value, linkInput.value)
    .then((res) => {
      elementsNewList.prepend(initCard(res.name, res.link, res.likes.length, res.owner._id, res._id, res.likes));
      closePopup(popupAddConteiner);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      cardButton.textContent = 'Создать';
    })
  formAddElement.reset();
  evt.submitter.classList.add('popup_button-submit-disabled');
  evt.submitter.setAttribute('disabled', true);
}

// Функция обновления аватара и отправки на сервер
function handleProfileAvatarSubmit(event) {
  avatarButton.textContent = 'Сохранение...';
  event.preventDefault();
  api.sendAvatar(avatarInput.value)
    .then((res) => {
      avatarImage.style.backgroundImage = `url(${avatarInput.value})`;
      closePopup(popupAvatarConteiner);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      profileButton.textContent = 'Сохранить';
    })
}

avatarEditButton.addEventListener('click', function () {
  openPopup(popupAvatarConteiner);
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

// Добавляем событие "submit" на попап с добавлением аватара
formEditAvatar.addEventListener('submit', handleProfileAvatarSubmit);

// Функция проверки валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup_button-submit-disabled',
  inputErrorClass: 'form_input_type_error',
  errorClass: 'form_input-error_active'
});

Promise.all([api.getUserData(), api.fillCards()])
  .then((values) => {
    // Функция заполнения первоначальных карточек с сервера
    function handleInitialCards() {
      api.fillCards()
        .then((res) => {
          res.forEach((res) => {
            elementsNewList.append(initCard(res.name, res.link, res.likes.length, res.owner._id, res._id, res.likes));
          })
        })
        .catch(err => {
          console.error(err);
        });
    }

    profileName.textContent = values[0].name;
    profileDescription.textContent = values[0].about;
    profileAvatar.style.backgroundImage = `url(${values[0].avatar})`;
    myUserId.id = values[0]._id;
    handleInitialCards(values[1])
  })
  .catch((err) => {
    console.log(err);
  })

