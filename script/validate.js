const parameters = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_block',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_active'
  };
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};
function blockButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled=true;
};
const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
    if(hasInvalidInput(inputList)) {
        blockButton(buttonElement, inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled=false;
    }
};
const isValid = (formElement, inputElement) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement, rest);
        });
    });
};
const enableValidation = ({formSelector, ...rest}) => { 
    const popupForms = Array.from(document.querySelectorAll(formSelector)); 
    popupForms.forEach((formElement) => { 
        formElement.addEventListener('submit', (evt) => { 
            evt.preventDefault(); 
        }); 
        setEventListeners(formElement, rest); 
    }); 
}
enableValidation(parameters);