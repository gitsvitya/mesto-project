// Функция редактирования имени и информации в профиле
import {closePopup, popupEditConteiner, formEditElement} from "/src/components/modal";
import {getUserData, sendProfileData} from "/src/components/api";

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const nameInput = formEditElement.querySelector('input[name="popup_edit-input-name"]');
const descriprionInput = formEditElement.querySelector('input[name="popup_edit-input-description"]');


function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriprionInput.value;
    sendProfileData(nameInput.value, descriprionInput.value);
    closePopup(popupEditConteiner);
}
// Функция формирования профилиля с сервера
const fillProfileWithData = (mestoProfileName, mestoProfileAbout, mestoProfileAvatar) => {
    getUserData()
        .then((res) => {
            mestoProfileName.textContent = res.name;
            mestoProfileAbout.textContent = res.about;
            mestoProfileAvatar.src = res.avatar;
    });
}

export {
    handleProfileFormSubmit,
    profileName,
    profileDescription,
    profileAvatar,
    nameInput,
    descriprionInput,
    formEditElement,
    fillProfileWithData
};