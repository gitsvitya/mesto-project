import Popup from "/src/components/modal.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPictureImage = this._popup.querySelector('.popup__picture-image');
    this._popupPictureDescription = this._popup.querySelector('.popup__picture-figcaption');
  }

  // Функция открытия попапа с картинкой, addEventListener присваивается при ее создании
  openPopup (name, link) {
    this._popupPictureImage.src = link;
    this._popupPictureImage.alt = name;
    this._popupPictureDescription.textContent = name;
    super.openPopup();
  }
}

// const popupPictureImage = document.querySelector('.popup__picture-image');
// const popupPictureDescription = document.querySelector('.popup__picture-figcaption');
