export default class UserInfo {
  constructor({name, about}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  // // принимает новые данные пользователя и добавляет их на страницу
  // getUserInfo(api) {
  //   api()
  //     .then((data) => {
  //       this._name.textContent = data.name;
  //       this._about.textContent = data.about;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       return this._name, this._about;
  //     })
  // }

  // // возвращает объект с данными пользователя
  // setUserInfo(inputName, inputDescription) {
  //   this._name.textContent = inputName.value;
  //   this._about.textContent = inputDescription.value;
  // }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
      // avatar: this._avatar.src
    }
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._name.textContent = data.name,
    this._about.textContent = data.about
    // this._avatar.src = data.avatar
  }
}
