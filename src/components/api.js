const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '50cb73c3-cd63-4207-b16a-8317dc26240b',
    'Content-Type': 'application/json'
  }
}

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

const fillCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

const sendProfileData = (profileName, profileDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileDescription
    })
  })
    .then(res => getResponseData(res));
}

const sendCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
    .then(res => getResponseData(res));
}

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

const toggleLike = (methodType, cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: methodType,
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

const sendAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(
      {avatar: avatarLink}
    )
  })
    .then(res => getResponseData(res));
}

export {getUserData, fillCards, sendProfileData, sendCard, deleteCard, toggleLike, sendAvatar};
