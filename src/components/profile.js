// Функция редактирования имени и информации в профиле
import {
  // closePopup,
  popupEditConteiner,
  formEditElement,
  formEditAvatar
} from "/src/components/modal";
// import {sendProfileData} from "/src/components/api";

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const nameInput = formEditElement.querySelector('input[name="popup_edit-input-name"]');
const descriptionInput = formEditElement.querySelector('input[name="popup_edit-input-description"]');
const avatarInput = formEditAvatar.querySelector('input[name="popup_input-avatar"]');
const avatarImage = document.querySelector('.profile__avatar');
const avatarButton = document.querySelector('.popup__button-submit-avatar');
const profileButton = document.querySelector('.popup__button-submit-profile');

import Api from '/src/components/api';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '50cb73c3-cd63-4207-b16a-8317dc26240b',
    'Content-Type': 'application/json'
  }
});

// Функция заполнения и отправки данных профиля (кроме аватара)
function handleProfileFormSubmit(event) {
  profileButton.textContent = 'Сохранение...';
  event.preventDefault();
  api.sendProfileData(nameInput.value, descriptionInput.value)
    .then((res) => {
      profileName.textContent = nameInput.value;
      profileDescription.textContent = descriptionInput.value;
      closePopup(popupEditConteiner);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      profileButton.textContent = 'Сохранить';
    })
}

export {
  handleProfileFormSubmit,
  profileName,
  profileDescription,
  profileAvatar,
  nameInput,
  descriptionInput,
  formEditElement,
  avatarInput,
  avatarImage,
  avatarButton,
  profileButton
};
