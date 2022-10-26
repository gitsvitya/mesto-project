import Popup from "/src/components/modal.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupInput = this._popupForm.querySelectorAll('.popup__input');
  }

  getInputValues() {
    this._formValues = {};
    this._popupInput.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this.getInputValues());
    })
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }

}
