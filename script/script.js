// Открываем окно редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditConteiner = document.querySelector('.popup_profile-edit');
profileEditButton.addEventListener('click', function () {
  popupEditConteiner.classList.add('popup_opened');
});

// Закрываем окно редактирования профиля
const popupEditCloseButton = document.querySelector('.popup_edit-close-button');
popupEditCloseButton.addEventListener('click', function () {
  popupEditConteiner.classList.remove('popup_opened');
});

// Редактирование имени и информации о себе
const formEditElement = popupEditConteiner.querySelector('.popup_edit_form');
const nameInput = formEditElement.querySelector('input[name="popup_edit-input-name"]');
const descriprionInput = formEditElement.querySelector('input[name="popup_edit-input-description"]');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriprionInput.value;
  popupEditConteiner.classList.remove('popup_opened');
};
formEditElement.addEventListener('submit', editFormSubmitHandler);

//Функция переключения кнопки лайков, addEventListener присваивается при создании карточки
function toggleLikeButton(event) {
  event.target.classList.toggle('elements_like_active');
}

//Функция удаления карточки, addEventListener присваивается при ее создании
function pushDeleteButton(event) {
  const deletedElement = event.target.closest('.elements__element');
  deletedElement.remove();
}

// Загрузка карточек "из коробки"
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
const elementsInitialList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element__template');
function initionCardsForming() {
  for (let i = 0; i < initialCards.length; i++) {
    const clonedInitialElement = elementTemplate.content.cloneNode(true);
    clonedInitialElement.querySelector('.elements__picture').src = initialCards[i].link;
    clonedInitialElement.querySelector('.elements__picture').alt = initialCards[i].name;
    clonedInitialElement.querySelector('.elements__name').textContent = initialCards[i].name;
    clonedInitialElement.querySelector('.elements__like').addEventListener('click', toggleLikeButton);
    clonedInitialElement.querySelector('.elements__delete').addEventListener('click', pushDeleteButton);
    clonedInitialElement.querySelector('.elements__picture').addEventListener('click', openPicturePopup);
    elementsInitialList.append(clonedInitialElement);
  }
}
initionCardsForming();

// Открываем окно редактирования профиля
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddConteiner = document.querySelector('.popup_add-picture');
profileAddButton.addEventListener('click', function () {
  popupAddConteiner.classList.add('popup_opened');
});

// Закрываем окно редактирования профиля
const popupAddCloseButton = document.querySelector('.popup_add-close-button');
popupAddCloseButton.addEventListener('click', function () {
  popupAddConteiner.classList.remove('popup_opened');
});

// Добавление новой карточки
const formAddElement = popupAddConteiner.querySelector('.popup_add_form');
const elementsNewList = document.querySelector('.elements__list');
const titleInput = formAddElement.querySelector('input[name="popup_input-title"]');
const linkInput = formAddElement.querySelector('input[name="popup_input-link"]');
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const newElement = elementTemplate.content.cloneNode(true);
  newElement.querySelector('.elements__picture').src = linkInput.value;
  newElement.querySelector('.elements__picture').alt = titleInput.value;
  newElement.querySelector('.elements__name').textContent = titleInput.value;
  newElement.querySelector('.elements__like').addEventListener('click', toggleLikeButton);
  newElement.querySelector('.elements__delete').addEventListener('click', pushDeleteButton);
  newElement.querySelector('.elements__picture').addEventListener('click', openPicturePopup);
  elementsNewList.prepend(newElement);
  popupAddConteiner.classList.remove('popup_opened');
};
formAddElement.addEventListener('submit', addFormSubmitHandler);

//Функция открытия попапа с картинкой, addEventListener присваивается при ее создании
const popupPictureImage = document.querySelector('.popup__picture-image');
const popupPictureDescription = document.querySelector('.popup__picture-figcaption');
function openPicturePopup(event) {
  const openedPopupPicture = event.target;
  popupPictureImage.setAttribute('src', openedPopupPicture.src);
  popupPictureDescription.textContent = openedPopupPicture.alt;
  popupPictureContainer.classList.add('popup_opened');
}

// Закрываем попап с картинкой
const popupPictureCloseButton = document.querySelector('.popup_picture-close-button');
const popupPictureContainer = document.querySelector('.popup_picture');
popupPictureCloseButton.addEventListener('click', function () {
  popupPictureContainer.classList.remove('popup_opened');
});