export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close-button');
    this._closeEscape = this._handleEscape.bind(this);
  }

  //Функция открытия попапа
  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeEscape);
  }

  //Функция закрытия попапа
  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeEscape);
  }

  // Функция закрытия popup по escape
  _handleEscape(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._closeBtn.addEventListener('click', () => {
      this.closePopup();
    });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.closePopup();
      }
    });
  }
}

