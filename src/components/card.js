import {openPicturePopup, closePopup, openPopup} from "/src/components/modal.js";
import {fillCards, sendCard, deleteCard} from "./api";
import {profileAddButton} from "./constants";

const elementTemplate = document.querySelector('#element__template');
const elementsNewList = document.querySelector('.elements__list');
const popupAddConteiner = document.querySelector('.popup_add-picture');
const formAddElement = popupAddConteiner.querySelector('.popup_add_form');
const titleInput = formAddElement.querySelector('input[name="popup_input-title"]');
const linkInput = formAddElement.querySelector('input[name="popup_input-link"]');

const myUserId = 'dedae49c75f881debabf24b5';


//Функция переключения кнопки лайков, addEventListener присваивается при создании карточки
function toggleLikeButton(event) {
    event.target.classList.toggle('elements_like_active');
    if (event.target.classList.contains('elements_like_active')) {
      console.log(true);
    }
    else{
      console.log(false);
    }
}

// Функция добавления новой карточки
function handleSubmitCardForm(evt) {
    evt.preventDefault();
    elementsNewList.prepend(initCard(titleInput.value, linkInput.value));
    sendCard(titleInput.value, linkInput.value);
    formAddElement.reset();
    evt.submitter.classList.add('popup_button-submit-disabled');
    evt.submitter.setAttribute('disabled', true);
    closePopup(popupAddConteiner);
}
// Функция заполнения первоначальных карточек с сервера
function handleInitialCards(evt) {
    fillCards()
        .then((res) => {
            for (let i = 0; i < res.length; i++) {
                elementsNewList.append(initCard(res[i].name, res[i].link, res[i].likes.length, res[i].owner._id, res[i]._id));
            }
            });
}

//Функция удаления карточки, addEventListener присваивается при ее создании
function pushDeleteButton(event) {
    const deletedElement = event.target.closest('.elements__element');
    deletedElement.remove();
}

//Функция создания карточки
function initCard (pictureName, pictureLink, numberofLikes, userId, cardId) {
    const elementFromTemplate = elementTemplate.content.querySelector('.elements__element').cloneNode(true);
    const elementFromTemplatePicture = elementFromTemplate.querySelector('.elements__picture');
    const elementFromTemplateLikes = elementFromTemplate.querySelector('.elements__like-number');
    const cardDeleteButton = elementFromTemplate.querySelector('.elements__delete');
    if (userId !== myUserId) {
      cardDeleteButton.classList.add("elements_delete_disable");
    }
    cardDeleteButton.addEventListener('click', function () {
      deleteCard(cardId);
    });
    elementFromTemplatePicture.src = pictureLink;
    elementFromTemplatePicture.alt = pictureName;
    elementFromTemplateLikes.textContent = numberofLikes;
    elementFromTemplate.querySelector('.elements__name').textContent = pictureName;
    elementFromTemplate.querySelector('.elements__like').addEventListener('click', toggleLikeButton);
    elementFromTemplate.querySelector('.elements__delete').addEventListener('click', pushDeleteButton);
    elementFromTemplatePicture.addEventListener('click', () => openPicturePopup(pictureLink, pictureName));
    return elementFromTemplate;
}

export {handleInitialCards, toggleLikeButton, handleSubmitCardForm, pushDeleteButton, initCard, formAddElement, popupAddConteiner, titleInput, linkInput, elementsNewList};
