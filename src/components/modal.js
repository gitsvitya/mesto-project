import {titleInput, linkInput} from "./card.js";

const popupPictureImage = document.querySelector('.popup__picture-image');
const popupPictureDescription = document.querySelector('.popup__picture-figcaption');
const popupPictureContainer = document.querySelector('.popup_picture');
const popupEditConteiner = document.querySelector('.popup_profile-edit');
const formEditElement = popupEditConteiner.querySelector('.popup_edit_form');


//Функция открытия попапа
function openPopup(container) {
    const submitButton = container.querySelector('.popup__button-submit');
    container.classList.add('popup_opened');
    document.addEventListener('keydown', escapePopupClose);
    container.addEventListener('click', clickPopupClose);
    if (submitButton !== null && titleInput.value === '' && linkInput.value === '')
    {
        submitButton.classList.add('popup_button-submit-disabled');
        submitButton.setAttribute('disabled', true);
    }
}

// Функция открытия попапа с картинкой, addEventListener присваивается при ее создании
function openPicturePopup(pictureLink, pictureName) {
    popupPictureImage.setAttribute('src', pictureLink);
    popupPictureImage.setAttribute('alt', pictureName);
    popupPictureDescription.textContent = pictureName;
    openPopup(popupPictureContainer);
}

// Функция закрытия popup по escape
const escapePopupClose = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

//Функция закрытия popup по клику
const clickPopupClose = (evt) => {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
};

//Функция закрытия попапа
function closePopup(container) {
    container.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapePopupClose);
    container.removeEventListener('click', clickPopupClose);
}

export {openPicturePopup, openPopup, closePopup, popupPictureContainer, popupEditConteiner, formEditElement};
