// Объявляем переменные
const profileEditButton = document.querySelector('.profile__edit-button');
const popupConteiner = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

// Открываем окно редактирования профиля
profileEditButton.addEventListener('click', function() {
  popupConteiner.classList.add('popup_opened');
});

// Закрываем окно редактирования профиля
popupCloseButton.addEventListener('click', function() {
  popupConteiner.classList.remove('popup_opened');
});