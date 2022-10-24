// import {openPicturePopup} from "/src/components/modal.js";

const elementTemplate = document.querySelector('#element__template');
const elementsNewList = document.querySelector('.elements__list');
const popupAddConteiner = document.querySelector('.popup_add-picture');
const formAddElement = popupAddConteiner.querySelector('.popup_add_form');
const titleInput = formAddElement.querySelector('input[name="popup_input-title"]');
const linkInput = formAddElement.querySelector('input[name="popup_input-link"]');
const cardButton = document.querySelector('.popup__button-submit-picture');
const myUserId = {id: '50cb73c3-cd63-4207-b16a-8317dc26240b'};

//===================================================================================================================
// Экземпляр класса Api. (Нужен для deleteCard и toggleLike) (Убрать. deleteCard и toggleLike перенести в index.js)
//-------------------------------------------------------------------------------------------------------------------

import Api from "./api";

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '50cb73c3-cd63-4207-b16a-8317dc26240b',
    'Content-Type': 'application/json'
  }
});

//===================================================================================================================
//     Класс Card 
//-------------------------------------------------------------------------------------------------------------------

export default class Card { 
  constructor({ data, cardSelector, handleCardClick /* handleDeleteClick, toggleLikeClick,*/}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._userId = data.owner._id;
    this._cardId = data._id;
    this._detailedLikes = data.likes;

    this._handleCardClick = handleCardClick; // слушатель просмотра изображения 
    //this._handleDeleteIconClick = handleDeleteIconClick; // слушатель кнопки удаления карточки
    //this._toggleLike = toggleLike; // слушатель кнопки лайк

    this._cardSelector = cardSelector;
  }

//--------------------------------------------------------

  // Получаем шаблон карточки
  _getTemplate() {
    this._card = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.elements__element')
    .cloneNode(true);

    return this._card;
  }
  
//--------------------------------------------------------
   // Метод создания карточки
   generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.elements__picture');
    this._likesNumber = this._element.querySelector('.elements__like-number');
    this._deleteBtn = this._element.querySelector('.elements__delete');
    this._likeBtn = this._element.querySelector('.elements__like');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._likesNumber.textContent = this._likes;
    this._element.querySelector('.elements__name').textContent = this._name;

    this._setEventListeners(); // Вешаем слушатели на карточку
    this._DeleteBtn(); // проверяем владельца карточки и убираем кнопку Delete
    this._isCardLiked(); // Проверка, стоит ли лайк на карточке 

    return this._element;
  }

//---------------------------------------------------------
  // проверяем владельца карточки и убираем кнопку Delete
  _DeleteBtn() {
    if (this._userId !== myUserId.id) {
      this._deleteBtn.classList.add("elements_delete_disable");
    }
  }

//---------------------------------------------------------
  // Проверка, стоит ли лайк на карточке 
  _isCardLiked() {
    if (this._detailedLikes !== undefined) {
      for (let i = 0; i < this._detailedLikes.length; i++) {
        if (this._detailedLikes[i]._id === myUserId.id) {
          this._likeBtn.classList.add('elements_like_active');
        }
      }
    }
  }

//---------------------------------------------------------
  // Вешаем слушатели на карточку
  _setEventListeners() {

    // слушатель просмотра изображения
    this._image.addEventListener('click', () => { 
      this._handleCardClick(this._name, this._link)
    });

    // слушатель кнопки удаления 
    this._deleteBtn.addEventListener('click', (evt) => {
      const deletedElement = evt.target.closest('.elements__element');
      deletedElement.remove();
      api.deleteCard(this._cardId)
        .catch(err => {
          console.error(err);
       })
    });

    // слушатель кнопки лайк
    this._likeBtn.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('elements_like_active')) {
        api.toggleLike('DELETE', this._cardId)
          .then((res) => {
            evt.target.classList.toggle('elements_like_active');
            this._likes -= 1;
            this._likesNumber.textContent = this._likes;
          })
          .catch(err => {
            console.error(err);
          })
      } else {
        api.toggleLike('PUT', this._cardId)
          .then((res) => {
            evt.target.classList.toggle('elements_like_active');
            this._likes += 1;
            this._likesNumber.textContent = this._likes;
          })
          .catch(err => { 
            console.error(err);
          })
      }
    });
  }

}

//===================================================================================================================

//Функция создания карточки
// function initCard(pictureName, pictureLink, numberofLikes, userId, cardId, detailedLikes) {
//   const elementFromTemplate = elementTemplate.content.querySelector('.elements__element').cloneNode(true);
//   const elementFromTemplatePicture = elementFromTemplate.querySelector('.elements__picture');
//   const elementFromTemplateLikes = elementFromTemplate.querySelector('.elements__like-number');
//   const cardDeleteButton = elementFromTemplate.querySelector('.elements__delete');
//   const cardLikeButton = elementFromTemplate.querySelector('.elements__like');

//   if (userId !== myUserId.id) {
//     cardDeleteButton.classList.add("elements_delete_disable");
//   }
//   cardDeleteButton.addEventListener('click', function () {
//     const deletedElement = event.target.closest('.elements__element');
//     api.deleteCard(cardId)
//       .then((res) => {
//         deletedElement.remove();
//       })
//       .catch(err => {
//         console.error(err);
//       })
//   });
//   elementFromTemplatePicture.src = pictureLink;
//   elementFromTemplatePicture.alt = pictureName;
//   elementFromTemplateLikes.textContent = numberofLikes;
//   elementFromTemplate.querySelector('.elements__name').textContent = pictureName;

//   // Проверяем лайкали ли мы фотку до этого по userid лайкнувших от сервера, сравнивая с нашим id
//   if (detailedLikes !== undefined) {
//     for (let i = 0; i < detailedLikes.length; i++) {
//       if (detailedLikes[i]._id === myUserId.id) {
//         cardLikeButton.classList.add('elements_like_active');
//       }
//     }
//   }
//   cardLikeButton.addEventListener('click', function (event) {
//     if (event.target.classList.contains('elements_like_active')) {
//       api.toggleLike('DELETE', cardId)
//         .then((res) => {
//           event.target.classList.toggle('elements_like_active');
//           numberofLikes -= 1;
//           elementFromTemplateLikes.textContent = numberofLikes;
//         })
//         .catch(err => {
//           console.error(err);
//         })
//     } else {
//       api.toggleLike('PUT', cardId)
//         .then((res) => {
//           event.target.classList.toggle('elements_like_active');
//           numberofLikes += 1;
//           elementFromTemplateLikes.textContent = numberofLikes;
//         })
//         .catch(err => { 
//           console.error(err);
//         })
//     }
//   });
//   elementFromTemplatePicture.addEventListener('click', () => openPicturePopup(pictureLink, pictureName));
//   return elementFromTemplate;
// }

export {
  //initCard,
  formAddElement,
  popupAddConteiner,
  titleInput,
  linkInput,
  elementsNewList,
  cardButton,
  myUserId
};