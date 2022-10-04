import {openPicturePopup, closePopup} from "./modal.js";

const elementTemplate = document.querySelector('#element__template');
const elementsNewList = document.querySelector('.elements__list');
const popupAddConteiner = document.querySelector('.popup_add-picture');
const formAddElement = popupAddConteiner.querySelector('.popup_add_form');
const titleInput = formAddElement.querySelector('input[name="popup_input-title"]');
const linkInput = formAddElement.querySelector('input[name="popup_input-link"]');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Функция переключения кнопки лайков, addEventListener присваивается при создании карточки
function toggleLikeButton(event) {
    event.target.classList.toggle('elements_like_active');
}

// Функция добавления новой карточки
function handleSubmitCardForm(evt) {
    evt.preventDefault();
    elementsNewList.prepend(initCard(titleInput.value, linkInput.value));
    formAddElement.reset();
    evt.submitter.classList.add('popup_button-submit-disabled');
    evt.submitter.setAttribute('disabled', true);
    closePopup(popupAddConteiner);
}

//Функция удаления карточки, addEventListener присваивается при ее создании
function pushDeleteButton(event) {
    const deletedElement = event.target.closest('.elements__element');
    deletedElement.remove();
}

//Функция создания карточки
function initCard (pictureName, pictureLink) {
    const elementFromTemplate = elementTemplate.content.querySelector('.elements__element').cloneNode(true);
    const elementFromTemplatePicture = elementFromTemplate.querySelector('.elements__picture');
    elementFromTemplatePicture.src = pictureLink;
    elementFromTemplatePicture.alt = pictureName;
    elementFromTemplate.querySelector('.elements__name').textContent = pictureName;
    elementFromTemplate.querySelector('.elements__like').addEventListener('click', toggleLikeButton);
    elementFromTemplate.querySelector('.elements__delete').addEventListener('click', pushDeleteButton);
    elementFromTemplatePicture.addEventListener('click', () => openPicturePopup(pictureLink, pictureName));
    return elementFromTemplate;
}

export {initialCards, toggleLikeButton, handleSubmitCardForm, pushDeleteButton, initCard, formAddElement, popupAddConteiner, titleInput, linkInput};