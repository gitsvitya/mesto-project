export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._name.textContent = data.name,
    this._about.textContent = data.about,
    this._avatar.style.backgroundImage = `url(${data.avatar})`
  }
}
