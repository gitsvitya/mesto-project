const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditConteiner = document.querySelector('.popup_profile-edit');
const formEditElement = popupEditConteiner.querySelector('.popup_edit_form');
const nameInput = formEditElement.querySelector('input[name="popup_edit-input-name"]');
const descriprionInput = formEditElement.querySelector('input[name="popup_edit-input-description"]');
const popupEditCloseButton = document.querySelector('.popup_edit-close-button');
const elementsInitialList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element__template');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddConteiner = document.querySelector('.popup_add-picture');
const formAddElement = popupAddConteiner.querySelector('.popup_add_form');
const elementsNewList = document.querySelector('.elements__list');
const titleInput = formAddElement.querySelector('input[name="popup_input-title"]');
const linkInput = formAddElement.querySelector('input[name="popup_input-link"]');
const popupPictureImage = document.querySelector('.popup__picture-image');
const popupPictureDescription = document.querySelector('.popup__picture-figcaption');
const popupPictureCloseButton = document.querySelector('.popup_picture-close-button');
const popupPictureContainer = document.querySelector('.popup_picture');
const popupAddCloseButton = document.querySelector('.popup_add-close-button');
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

//Функция открытия попапа
function openPopup(container) {
  container.classList.add('popup_opened');
}

//Функция закрытия попапа
function closePopup(container) {
  container.classList.remove('popup_opened');
}

// Функция редактирования имени и информации в профиле
function editFormSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriprionInput.value;
  closePopup(popupEditConteiner);
};

//Функция переключения кнопки лайков, addEventListener присваивается при создании карточки
function toggleLikeButton(event) {
  event.target.classList.toggle('elements_like_active');
}

// Функция добавления новой карточки
function addFormSubmitHandler(event) {
  event.preventDefault();
  initCard(elementsNewList, titleInput.value, linkInput.value, 'prepend');
  document.querySelector('.popup_add_form').reset();
  closePopup(popupAddConteiner);
};

// Функция открытия попапа с картинкой, addEventListener присваивается при ее создании
function openPicturePopup(pictureLink, pictureName) {
  popupPictureImage.setAttribute('src', pictureLink);
  popupPictureImage.setAttribute('alt', pictureName);
  popupPictureDescription.textContent = pictureName;
  openPopup(popupPictureContainer);
}

//Функция удаления карточки, addEventListener присваивается при ее создании
function pushDeleteButton(event) {
  const deletedElement = event.target.closest('.elements__element');
  deletedElement.remove();
}

//Функция создания карточки
function initCard (listAppend, pictureName, pictureLink, addSide) {
  const elementFromTemplate = elementTemplate.content.querySelector('.elements__element').cloneNode(true);
  const elementFromTemplatePicture = elementFromTemplate.querySelector('.elements__picture');
  elementFromTemplatePicture.src = pictureLink;
  elementFromTemplatePicture.alt = pictureName;
  elementFromTemplate.querySelector('.elements__name').textContent = pictureName;
  elementFromTemplate.querySelector('.elements__like').addEventListener('click', toggleLikeButton);
  elementFromTemplate.querySelector('.elements__delete').addEventListener('click', pushDeleteButton);
  elementFromTemplate.querySelector('.elements__picture').addEventListener('click', () => openPicturePopup(pictureLink, pictureName));
  if (addSide === 'append') {
    listAppend.append(elementFromTemplate);
  }
  else {
    listAppend.prepend(elementFromTemplate);
  }
}

// Добавляем событие "openPopup" на попап с редактированием профиля
profileEditButton.addEventListener('click', function () {
  openPopup(popupEditConteiner);
});

// Добавляем событие "closePopup" на попап с редактированием профиля
popupEditCloseButton.addEventListener('click', function () {
  closePopup(popupEditConteiner);
});

// Добавляем событие "openPopup" на попап с добавлением новой карточки
profileAddButton.addEventListener('click', function () {
  openPopup(popupAddConteiner);
});

// Добавляем событие "closePopup" на попап с созданием новой карточки
popupAddCloseButton.addEventListener('click', function () {
  closePopup(popupAddConteiner);
});

// Добавляем событие "submit" на попап с редактированием профиля
formEditElement.addEventListener('submit', editFormSubmitHandler);

//Добавляем событие "submit" на попап с добавленим новой карточки
formAddElement.addEventListener('submit', addFormSubmitHandler);

// Добавляем событие "closePopup" на попап с картинкой
popupPictureCloseButton.addEventListener('click', function () {
  closePopup(popupPictureContainer);
});

// Заполняем изначальные 6 карточек
for (let i = 0; i < initialCards.length; i++) {
  initCard(elementsInitialList, initialCards[i].name, initialCards[i].link, 'append');
}

// Вносим изменения в данные профиля из введенного Input
nameInput.value = profileName.textContent;
descriprionInput.value = profileDescription.textContent;