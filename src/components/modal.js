const popupPictureImage = document.querySelector('.popup__picture-image');
const popupPictureDescription = document.querySelector('.popup__picture-figcaption');
const popupPictureContainer = document.querySelector('.popup_picture');
const popupEditConteiner = document.querySelector('.popup_profile-edit');
const formEditElement = popupEditConteiner.querySelector('.popup_edit_form');

//Функция открытия попапа
function openPopup(container) {
    container.classList.add('popup_opened');
    document.addEventListener('keydown', escapePopupClose);
    container.addEventListener('click', clickPopupClose);
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

// Функция закрытия окна по клику
const clickPopupClose = (evt) => {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.target === evt.currentTarget) {
        closePopup(openedPopup);
    }
};

//Функция закрытия попапа
function closePopup(container) {
    container.classList.remove('popup_opened');
}

export {openPicturePopup, openPopup, closePopup, popupPictureContainer, popupEditConteiner, formEditElement};
