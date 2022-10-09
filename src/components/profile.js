// Функция редактирования имени и информации в профиле
import {
  closePopup,
  popupEditConteiner,
  formEditElement,
  formEditAvatar,
  popupAvatarConteiner
} from "/src/components/modal";
import {getUserData, sendAvatar, sendProfileData} from "/src/components/api";
import {cardButton} from "./card";

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const nameInput = formEditElement.querySelector('input[name="popup_edit-input-name"]');
const descriptionInput = formEditElement.querySelector('input[name="popup_edit-input-description"]');
const avatarInput = formEditAvatar.querySelector('input[name="popup_input-avatar"]');
const avatarImage = document.querySelector('.profile__avatar');
const avatarButton = document.querySelector('.popup__button-submit-avatar');
const profileButton = document.querySelector('.popup__button-submit-profile');

// Функция заполнения и отправки данных профиля (кроме аватара)
function handleProfileFormSubmit(event) {
  profileButton.textContent = 'Сохранение';
  event.preventDefault();
  profileName.textContent = nameInput.value;
  sendProfileData(nameInput.value, descriptionInput.value)
    .then((res) => {
      closePopup(popupEditConteiner);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      profileButton.textContent = 'Сохранить';
    })
  profileDescription.textContent = descriptionInput.value;
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
