const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-button');
const popupAddContainer = document.querySelector('.popup_add-picture');
const formAddElement = popupAddContainer.querySelector('.popup_add_form');
const titleInput = formAddElement.querySelector('input[name="popup_input-title"]');
const linkInput = formAddElement.querySelector('input[name="popup_input-link"]');
const cardButton = document.querySelector('.popup__button-submit-picture');
const myUserId = {id: ''};
const popupEditContainer = document.querySelector('.popup_profile-edit');
const formEditElement = popupEditContainer.querySelector('.popup_edit_form');
const popupAvatarContainer = document.querySelector('.popup_avatar-edit');
const formEditAvatar = popupAvatarContainer.querySelector('.popup_avatar_form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const nameInput = formEditElement.querySelector('input[name="popup_edit-input-name"]');
const descriptionInput = formEditElement.querySelector('input[name="popup_edit-input-description"]');
const avatarInput = formEditAvatar.querySelector('input[name="popup_input-avatar"]');
const avatarImage = document.querySelector('.profile__avatar');
const avatarButton = document.querySelector('.popup__button-submit-avatar');
const profileButton = document.querySelector('.popup__button-submit-profile');
const editForm = document.querySelector('.popup_edit_form');
const addForm = document.querySelector('.popup_add_form');
const avatarForm = document.querySelector('.popup_avatar_form');

const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup_button-submit-disabled',
  inputErrorClass: 'form_input_type_error',
  errorClass: 'form_input-error_active'
};

export {
  profileEditButton,
  profileAddButton,
  avatarEditButton,
  popupAddContainer,
  formAddElement,
  titleInput,
  linkInput,
  cardButton,
  myUserId,
  popupEditContainer,
  formEditElement,
  popupAvatarContainer,
  formEditAvatar,
  profileName,
  profileDescription,
  profileAvatar,
  nameInput,
  descriptionInput,
  avatarInput,
  avatarImage,
  avatarButton,
  profileButton,
  config,
  editForm,
  addForm,
  avatarForm
};
