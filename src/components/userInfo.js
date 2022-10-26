export default class UserInfo {
  constructor({ name, about, /*avatar*/ }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    // this._avatar = document.querySelector(avatar);
  }

  // принимает новые данные пользователя и добавляет их на страницу
  getUserInfo(data) {
    this._name.textContent = data.name,
    this._about.textContent = data.about
    // this._avatar.src = data.avatar
  }

  // возвращает объект с данными пользователя
  setUserInfo(inputName, inputDescription) {
    this._name.textContent = inputName.value;
    this._about.textContent = inputDescription.value;
  }

}
