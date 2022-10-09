import {openPicturePopup} from "/src/components/modal.js";
import {fillCards, deleteCard, toggleLike, getUserData} from "./api";

const elementTemplate = document.querySelector('#element__template');
const elementsNewList = document.querySelector('.elements__list');
const popupAddConteiner = document.querySelector('.popup_add-picture');
const formAddElement = popupAddConteiner.querySelector('.popup_add_form');
const titleInput = formAddElement.querySelector('input[name="popup_input-title"]');
const linkInput = formAddElement.querySelector('input[name="popup_input-link"]');
const cardButton = document.querySelector('.popup__button-submit-picture');


const myUserId = {id: ''};



//Функция создания карточки
function initCard(pictureName, pictureLink, numberofLikes, userId, cardId, detailedLikes) {
  const elementFromTemplate = elementTemplate.content.querySelector('.elements__element').cloneNode(true);
  const elementFromTemplatePicture = elementFromTemplate.querySelector('.elements__picture');
  const elementFromTemplateLikes = elementFromTemplate.querySelector('.elements__like-number');
  const cardDeleteButton = elementFromTemplate.querySelector('.elements__delete');
  const cardLikeButton = elementFromTemplate.querySelector('.elements__like');
  if (userId !== myUserId.id) {
    cardDeleteButton.classList.add("elements_delete_disable");
  }
  cardDeleteButton.addEventListener('click', function () {
    const deletedElement = event.target.closest('.elements__element');
    deleteCard(cardId)
      .then((res) => {
        deletedElement.remove();
      })
      .catch(err => {
        console.error(err);
      })
  });
  elementFromTemplatePicture.src = pictureLink;
  elementFromTemplatePicture.alt = pictureName;
  elementFromTemplateLikes.textContent = numberofLikes;
  elementFromTemplate.querySelector('.elements__name').textContent = pictureName;

  // Проверяем лайкали ли мы фотку до этого по userid лайкнувших от сервера, сравнивая с нашим id
  if (detailedLikes !== undefined) {
    for (let i = 0; i < detailedLikes.length; i++) {
      if (detailedLikes[i]._id === myUserId.id) {
        cardLikeButton.classList.add('elements_like_active');
      }
    }
  }
  cardLikeButton.addEventListener('click', function (event) {
    if (event.target.classList.contains('elements_like_active')) {
      toggleLike('DELETE', cardId)
        .then((res) => {
          event.target.classList.toggle('elements_like_active');
          numberofLikes -= 1;
          elementFromTemplateLikes.textContent = numberofLikes;
        })
        .catch(err => {
          console.error(err);
        })
    } else {
      toggleLike('PUT', cardId)
        .then((res) => {
          event.target.classList.toggle('elements_like_active');
          numberofLikes += 1;
          elementFromTemplateLikes.textContent = numberofLikes;
        })
        .catch(err => {
          console.error(err);
        })
    }
  });
  elementFromTemplatePicture.addEventListener('click', () => openPicturePopup(pictureLink, pictureName));
  return elementFromTemplate;
}

export {
  initCard,
  formAddElement,
  popupAddConteiner,
  titleInput,
  linkInput,
  elementsNewList,
  cardButton,
  myUserId
};
