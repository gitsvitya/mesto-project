// Валидация формы "Редактировать профиль"
// Ищем элемент в форме и добавляем ему класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

// Ищем элемент в форме и добавляем ему класс с ошибкой
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

//Проверяем вводимый элемент на валидарность и показываем ошибку, если false
const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, {inputErrorClass, errorClass});
    } else {
        hideInputError(formElement, inputElement, {inputErrorClass, errorClass});
    }
};

// Ищем все поля input и кнопку submit
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

// Делаем кнопку неактивной перед первым вводом
    toggleButtonState(inputList, buttonElement, {inactiveButtonClass});

// Проверяем все вводимые элементы на ошибки и регулирует активность кнопки
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, {inputErrorClass, errorClass});
            toggleButtonState(inputList, buttonElement, {inactiveButtonClass});
        });
    });
};

// Ищем все формы и отменяем стандартные визуализации ошибки браузера
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
// Ищем все form__set в формах и на каждой выполняем функцию setEventListeners
        const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
        });
    });
};

//Проверяем вводимый элемент на валидарность посредством input и возвращаем результат
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// Присваиваем все элементы на валидарность, если хоть один невыполненн, то делаем кнопку неактивной
const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }
    else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

// Экспор главной фукнции
export {enableValidation};