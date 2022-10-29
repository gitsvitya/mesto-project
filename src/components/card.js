export default class Card {
  constructor({data, myUserId, cardSelector, handleCardClick, api}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._userId = data.owner._id;
    this._cardId = data._id;
    this._detailedLikes = data.likes;
    this._myUserId = myUserId;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._cardSelector = cardSelector;
  }

  // Получаем шаблон карточки
  _getTemplate() {
    this._card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
    return this._card;
  }

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
    this._setEventListeners();
    this._DeleteBtn();
    this._isCardLiked();
    return this._element;
  }

  // Проверяем владельца карточки и убираем кнопку Delete
  _DeleteBtn() {
    if (this._userId !== this._myUserId) {
      this._deleteBtn.classList.add("elements_delete_disable");
    }
  }

  // Проверка, стоит ли лайк на карточке
  _isCardLiked() {
    if (this._detailedLikes !== undefined) {
      for (let i = 0; i < this._detailedLikes.length; i++) {
        if (this._detailedLikes[i]._id === this._myUserId) {
          this._likeBtn.classList.add('elements_like_active');
        }
      }
    }
  }

  _setEventListeners() {

    // Вешаем слушатель просмотра изображения
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });

    // Вешаем слушатель кнопки удаления
    this._deleteBtn.addEventListener('click', (evt) => {
      const deletedElement = evt.target.closest('.elements__element');
      this._api.deleteCard(this._cardId)
        .then(() => {
          deletedElement.remove();
        })
        .catch(err => {
          console.error(err);
        })
    });

    // Вешаем слушатель кнопки лайк
    this._likeBtn.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('elements_like_active')) {
        this._api.toggleLike('DELETE', this._cardId)
          .then((res) => {
            evt.target.classList.toggle('elements_like_active');
            this._likes -= 1;
            //this._likesNumber.textContent = this._likes;
            this._likesNumber.textContent = res.likes.length;
          })
          .catch(err => {
            console.error(err);
          })
      } else {
        this._api.toggleLike('PUT', this._cardId)
          .then((res) => {
            evt.target.classList.toggle('elements_like_active');
            this._likes += 1;
            //this._likesNumber.textContent = this._likes;
            this._likesNumber.textContent = res.likes.length;
          })
          .catch(err => {
            console.error(err);
          })
      }
    });
  }
}
