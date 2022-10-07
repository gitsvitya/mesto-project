const token = '50cb73c3-cd63-4207-b16a-8317dc26240b';

const fillUserData = (mestoProfileName, mestoProfileAbout, mestoProfileAvatar) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me', {
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
        .then((result) => {
            mestoProfileName.textContent = result.name;
            mestoProfileAbout.textContent = result.about;
            mestoProfileAvatar.src = result.avatar;
            console.log(result);
        });
}



export {fillUserData};