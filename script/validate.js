import {parameters} from './parameters.js'

export default class FormValidator {
    constructor(form, parameters) {
        this._formElement = form;   
        this._formSelector = parameters.formSelector;
        this._inputSelector = parameters.inputSelector;
        this._submitButtonSelector = parameters.submitButtonSelector;
        this._inactiveButtonClass = parameters.inactiveButtonClass;
        this._inputErrorClass = parameters.inputErrorClass;
        this._errorClass = parameters.errorClass;
    }
    
    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        console.log(inputElement);
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if(this._hasInvalidInput(inputList)) {
            blockButton(buttonElement, this._inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled=false;
        }
    }

    _isValid(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                console.log(this._formElement);
                console.log(inputElement);
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation() { 
            this._formElement.addEventListener('submit', (evt) => { 
                evt.preventDefault(); 
            }); 
            this._setEventListeners(); 
    }

}

    function blockButton(buttonElement, inactiveButtonClass) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled=true;
    }


// //покажи ошибку
// const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     inputElement.classList.add(inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(errorClass);
// };
// //вроде типа когда все ок то убери ошибку, но это не точно
// const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     inputElement.classList.remove(inputErrorClass);
//     errorElement.classList.remove(errorClass);
//     errorElement.textContent = '';
// };
// //проверка на невалидность, если есть невалидное значение - вернуть
// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid;
//     });
// };
// //знаменитая блокировка кнопки, думаю можно выкинуть отсюда
// function blockButton(buttonElement, inactiveButtonClass) {
//     buttonElement.classList.add(inactiveButtonClass);
//     buttonElement.disabled=true;
// }
// //добавляет и убирает блокировку кнопки
// const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
//     if(hasInvalidInput(inputList)) {
//         blockButton(buttonElement, inactiveButtonClass);
//     } else {
//         buttonElement.classList.remove(inactiveButtonClass);
//         buttonElement.disabled=false;
//     }
// };
// //показывает или убирает ошибку валидации
// const isValid = (formElement, inputElement) => {
//     if(!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage);
//     } else {
//         hideInputError(formElement, inputElement);
//     }
// };
// //добавляет слушатели на формы валидации
// const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
//     const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//     const buttonElement = formElement.querySelector(submitButtonSelector);
//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener('input', () => {
//             isValid(formElement, inputElement);
//             toggleButtonState(inputList, buttonElement, rest);
//         });
//     });
// };
// // запускает весь код выше
// const enableValidation = ({formSelector, ...rest}) => { 
//     const popupForms = Array.from(document.querySelectorAll(formSelector)); 
//     popupForms.forEach((formElement) => { 
//         formElement.addEventListener('submit', (evt) => { 
//             evt.preventDefault(); 
//         }); 
//         setEventListeners(formElement, rest); 
//     }); 
// };

//// enableValidation(parameters)