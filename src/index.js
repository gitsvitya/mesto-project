// Импорты
import './pages/index.css';

import {profileEditButton, profileAddButton, avatarEditButton, titleInput, linkInput, cardButton, myUserId, profileName, profileDescription, profileAvatar, nameInput, descriptionInput, avatarInput, avatarImage, avatarButton, profileButton, config, editForm, addForm, avatarForm} from './components/constants.js';

import Api from '/src/components/api';
import FormValidator from '/src/components/validate'
import Card from '/src/components/card'
import Section from '/src/components/section.js';
import PopupWithImage from './components/popupWithImage';
import PopupWithForm from './components/popupWithForm';
import UserInfo from "/src/components/userInfo.js";

// Экземпляр класса валидации для формы редактирования профиля
const profileDescriptionFormValidator = new FormValidator(config, editForm);
profileDescriptionFormValidator.enableValidation();

// Экземпляр класса валидации для формы добавления новой карточки
const cardFormValidator = new FormValidator(config, addForm);
cardFormValidator.enableValidation();

// Экземпляр класса валидации для формы редактирования аватара пользователя
const profileAvatarFormValidator = new FormValidator(config, avatarForm);
profileAvatarFormValidator.enableValidation();

// Создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '50cb73c3-cd63-4207-b16a-8317dc26240b',
    'Content-Type': 'application/json'
  }
});

// Создание экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_picture');

// Создание экземпляра класса Card
const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: '#element__template',
    handleCardClick: (name, link) => {
      popupWithImage.setEventListeners();
      popupWithImage.openPopup(name, link);
    }
  });
  return card.generateCard();
}

// Создание экземпляра класса Section
const cardsList = new Section({
  renderer: (items) => {
    cardsList.renderItems(createCard(items));
  },
}, '.elements__list');

//     Создание экземпляра класса, отвечающего за попап с формой редактирования аватара
const AvatarPopupWithForm = new PopupWithForm({
  popupSelector: '.popup_avatar-edit',
  formSubmit: () => {
    avatarButton.textContent = 'Сохранение...';
    api.sendAvatar(avatarInput.value)
      .then((res) => {
        avatarImage.style.backgroundImage = `url(${avatarInput.value})`;
        AvatarPopupWithForm.closePopup();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        profileButton.textContent = 'Сохранить';
      })
  }
});

// Создание экземпляра класса, отвечающего за отображение информации о пользователе
const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__description',
});

// Создание экземпляра класса, отвечающего за попап с формой редактирования профиля
const ProfilePopupWithForm = new PopupWithForm({
  popupSelector: '.popup_profile-edit',
  formSubmit: () => {
    profileButton.textContent = 'Сохранение...';
    api.sendProfileData(nameInput.value, descriptionInput.value)
      .then((res) => {
        userInfo.setUserInfo(nameInput, descriptionInput);
        ProfilePopupWithForm.closePopup();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        profileButton.textContent = 'Сохранить';
      })
  }
});

// Создание экземпляра класса, отвечающий за попап с формой добавления новой карточки
const CardPopupWithForm = new PopupWithForm({
  popupSelector: '.popup_add-picture',
  formSubmit: () => {
    cardButton.textContent = 'Создание...';
    api.sendCard(titleInput.value, linkInput.value)
      .then((res) => {
        cardsList.addItem(createCard(res));
        CardPopupWithForm.closePopup();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        cardButton.textContent = 'Создать';
      })
  }
});

// Добавление событий на попап с созданием новой карточки
profileAddButton.addEventListener('click', function () {
  cardFormValidator.toggleButtonState();
  CardPopupWithForm.openPopup();
});
CardPopupWithForm.setEventListeners();

// Добавление событий на попап с редактированием профиля
profileEditButton.addEventListener('click', function () {
  ProfilePopupWithForm.openPopup();
  profileDescriptionFormValidator.toggleButtonState();
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});
ProfilePopupWithForm.setEventListeners();

// Добавление событий на попап с обновления аватара
avatarEditButton.addEventListener('click', function () {
  profileAvatarFormValidator.toggleButtonState();
  AvatarPopupWithForm.openPopup();
});
AvatarPopupWithForm.setEventListeners();

// Первоначальное заполнение данных с сервера
Promise.all([api.getUserData(), api.fillCards()])
  .then((values) => {
    function handleInitialCards() {
      api.fillCards()
        .then((res) => {
          res.forEach((res) => {
            cardsList.initItem(createCard(res));
          })
        })
        .catch(err => {
          console.error(err);
        });
    }
    userInfo.getUserInfo(api.getUserData.bind(api))
    profileAvatar.style.backgroundImage = `url(${values[0].avatar})`;
    myUserId.id = values[0]._id;
    handleInitialCards(values[1])
  })
  .catch((err) => {
    console.log(err);
  })
