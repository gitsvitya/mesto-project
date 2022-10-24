export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  fillCards () {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  sendProfileData(profileName, profileDescription) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profileName,
        about: profileDescription
      })
    })
      .then(res => this._getResponseData(res));
  }

  sendCard(cardName, cardLink) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
      .then(res => this._getResponseData(res));
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  toggleLike(methodType, cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: methodType,
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  sendAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(
        {avatar: avatarLink}
      )
    })
      .then(res => this._getResponseData(res));
  }
}





// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
//   headers: {
//     authorization: '50cb73c3-cd63-4207-b16a-8317dc26240b',
//     'Content-Type': 'application/json'
//   }
// }
// export {getUserData, fillCards, sendProfileData, sendCard, deleteCard, toggleLike, sendAvatar};
