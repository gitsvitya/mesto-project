import './pages/index.css';

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
}

//Функция переключения кнопки лайков, addEventListener присваивается при создании карточки
function toggleLikeButton(event) {
  event.target.classList.toggle('elements_like_active');
}

// Функция добавления новой карточки
function addFormSubmitHandler(event) {
  event.preventDefault();
  elementsNewList.prepend(initCard(titleInput.value, linkInput.value));
  document.querySelector('.popup_add_form').reset();
  closePopup(popupAddConteiner);
}

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

function initCard (pictureName, pictureLink) {
  const elementFromTemplate = elementTemplate.content.querySelector('.elements__element').cloneNode(true);
  const elementFromTemplatePicture = elementFromTemplate.querySelector('.elements__picture');
  elementFromTemplatePicture.src = pictureLink;
  elementFromTemplatePicture.alt = pictureName;
  elementFromTemplate.querySelector('.elements__name').textContent = pictureName;
  elementFromTemplate.querySelector('.elements__like').addEventListener('click', toggleLikeButton);
  elementFromTemplate.querySelector('.elements__delete').addEventListener('click', pushDeleteButton);
  elementFromTemplate.querySelector('.elements__picture').addEventListener('click', () => openPicturePopup(pictureLink, pictureName));
  return elementFromTemplate;
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
  elementsInitialList.append(initCard(initialCards[i].name, initialCards[i].link));
}

// Вносим изменения в данные профиля из введенного Input
nameInput.value = profileName.textContent;
descriprionInput.value = profileDescription.textContent;






// Валидация формы "Редактировать профиль"

// Ищем элемент в форме и добавляем ему класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form_input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form_input-error_active');
};

// Ищем элемент в форме и добавляем ему класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form_input_type_error');
  errorElement.classList.remove('form_input-error_active');
  errorElement.textContent = '';
};

//Проверяем вводимый элемент на валидарность и показываем ошибку, если false
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Ищем все поля input и кнопку submit
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button-submit');

// Делаем кнопку неактивной перед первым вводом
  toggleButtonState(inputList, buttonElement);

// Проверяем все вводимые элементы на ошибки и регулирует активность кнопки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Ищем все формы и отменяем стандартные визуализации ошибки браузера
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
// Ищем все form__set в формах и на каждой выполняем функцию setEventListeners
    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

//Проверяем вводимый элемент на валидарность посредством input и возвращаем результат
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Присваиваем все элементы на валидарность, если хоть один невыполненн, то делаем кнопку неактивной
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup_button-submit-disabled');
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove('popup_button-submit-disabled');
    buttonElement.removeAttribute('disabled');
  }
};

enableValidation();