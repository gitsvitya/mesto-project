// const token = '50cb73c3-cd63-4207-b16a-8317dc26240b';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
    headers: {
        authorization: '50cb73c3-cd63-4207-b16a-8317dc26240b',
        'Content-Type': 'application/json'
    }
}

const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch (err => {
            console.error(err);
        });
}

const fillCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch (err => {
            console.error(err);
        });
}

const sendProfileData = (profileName, profileDescription) => {
    fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
                name: profileName,
                about: profileDescription
            })
    })
}

export {getUserData, fillCards, sendProfileData};