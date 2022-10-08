import {openPicturePopup, closePopup, openPopup} from "/src/components/modal.js";
import {fillCards, sendCard, deleteCard, likeswitcher} from "./api";

const elementTemplate = document.querySelector('#element__template');
const elementsNewList = document.querySelector('.elements__list');
const popupAddConteiner = document.querySelector('.popup_add-picture');
const formAddElement = popupAddConteiner.querySelector('.popup_add_form');
const titleInput = formAddElement.querySelector('input[name="popup_input-title"]');
const linkInput = formAddElement.querySelector('input[name="popup_input-link"]');
const cardButton = document.querySelector('.popup__button-submit-picture');


const myUserId = 'dedae49c75f881debabf24b5';

// Функция добавления новой карточки
function handleSubmitCardForm(evt) {
  cardButton.textContent = 'Сохранение';
  evt.preventDefault();
  sendCard(titleInput.value, linkInput.value)
    .then(data => {
      cardButton.textContent = 'Сохранить';
    })

  elementsNewList.prepend(initCard(titleInput.value, linkInput.value));
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
        elementsNewList.append(initCard(res[i].name, res[i].link, res[i].likes.length, res[i].owner._id, res[i]._id, res[i].likes));
      }
    });
}

//Функция удаления карточки, addEventListener присваивается при ее создании
function pushDeleteButton(event) {
  const deletedElement = event.target.closest('.elements__element');
  deletedElement.remove();
}

//Функция создания карточки
function initCard(pictureName, pictureLink, numberofLikes, userId, cardId, detailedLikes) {
  const elementFromTemplate = elementTemplate.content.querySelector('.elements__element').cloneNode(true);
  const elementFromTemplatePicture = elementFromTemplate.querySelector('.elements__picture');
  const elementFromTemplateLikes = elementFromTemplate.querySelector('.elements__like-number');
  const cardDeleteButton = elementFromTemplate.querySelector('.elements__delete');
  const cardLikeButton = elementFromTemplate.querySelector('.elements__like');
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

  // Проверяем лайкали ли мы фотку до этого по userid лайкнувших от сервера, сравнивая с нашим id
  if (detailedLikes !== undefined) {
    for (let i = 0; i < detailedLikes.length; i++) {
      if (detailedLikes[i]._id === myUserId) {
        cardLikeButton.classList.add('elements_like_active');
      }
    }
  }
  cardLikeButton.addEventListener('click', function (event) {
    event.target.classList.toggle('elements_like_active');
    if (event.target.classList.contains('elements_like_active')) {
      likeswitcher('PUT', cardId);
      numberofLikes += 1;
      elementFromTemplateLikes.textContent = numberofLikes;
    } else {
      likeswitcher('DELETE', cardId);
      numberofLikes -= 1;
      elementFromTemplateLikes.textContent = numberofLikes;
    }
  });
  cardDeleteButton.addEventListener('click', pushDeleteButton);
  elementFromTemplatePicture.addEventListener('click', () => openPicturePopup(pictureLink, pictureName));
  return elementFromTemplate;
}

export {
  handleInitialCards,
  handleSubmitCardForm,
  pushDeleteButton,
  initCard,
  formAddElement,
  popupAddConteiner,
  titleInput,
  linkInput,
  elementsNewList
};
