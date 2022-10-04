// Функция редактирования имени и информации в профиле
import {closePopup, popupEditConteiner, formEditElement} from "./modal";

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = formEditElement.querySelector('input[name="popup_edit-input-name"]');
const descriprionInput = formEditElement.querySelector('input[name="popup_edit-input-description"]');


function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriprionInput.value;
    closePopup(popupEditConteiner);
}

export {handleProfileFormSubmit, profileName, profileDescription, nameInput, descriprionInput, formEditElement};