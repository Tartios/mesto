import {FormValidator} from './FormValidator.js'
import Card from './Card.js'
import {openPopup, closePopup, cardCreator, blockButton} from './utils.js'
import {parameters, openButton, addButton, 
popupProfile, popupAdd, popupImage, profileForm, addForm, inputName,
inputProf, inputMark, inputLink, formSave, addSave, profileName,
profileProf, initialCards} from './parameters.js'

//вешает слушатель на кнопку открытия модалки профиля
openButton.addEventListener('click', function() {
    openPopup(popupProfile);
    inputName.value = profileName.textContent;
    inputProf.value = profileProf.textContent;
});
//вешает слушатель на кнопку открытия модалки добавления
addButton.addEventListener('click', function() {
    inputMark.value = null;
    inputLink.value = null;
    blockButton(addSave, parameters.inactiveButtonClass);
    openPopup(popupAdd);
});


popupProfile.addEventListener('click', (e) => {//закрывает модалку профиля щелчком вне окна
    if(e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
        closePopup(popupProfile);
    }
});

popupAdd.addEventListener('click', (e) => {//закрывает модалку добавления щелчком вне окна
    if(e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
        closePopup(popupAdd);
    }
});

popupImage.addEventListener('click', (e) => {//закрывает модалку картинки щелчком вне окна
    if(e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
        closePopup(popupImage);
    }
})

formSave.addEventListener('click', function(event) {//закрытие модалки профиля кнопкой сохранить
    event.preventDefault();
    closePopup(popupProfile);
    profileName.textContent = inputName.value;
    profileProf.textContent = inputProf.value;
});

addSave.addEventListener('click', function(event) {//закрытие модалки добавления карточки кнопкой создать
    event.preventDefault();
    const card = new Card({name: inputMark.value, link: inputLink.value});
    const element = card.createCard();
    cardCreator(element);
    closePopup(popupAdd);
});

initialCards.forEach((item) => {
    const card = new Card(item);
    const element = card.createCard();
    cardCreator(element);
});

const profileFormValidator = new FormValidator(profileForm, parameters);
const addFormValidator = new FormValidator(addForm, parameters);
profileFormValidator.enableValidation();
addFormValidator.enableValidation();