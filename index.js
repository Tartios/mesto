let open_button = document.querySelector('.profile__info-button');
let popup = document.querySelector('.popup');
let popup_close = document.querySelector('.popup__close-button');
let profileForm = document.querySelector('.popup__form');
let inputName = profileForm.querySelector('.popup__input_name');
let inputProf = profileForm.querySelector('.popup__input_prof');
let formSave = profileForm.querySelector('.popup__save-button');
let profileName = document.querySelector('.profile__name');
let profileProf = document.querySelector('.profile__prof');

function togglePopup() {
    popup.classList.toggle('popup_open');
}

open_button.addEventListener('click', function() {
    togglePopup();
    inputName.value = profileName.textContent;
    inputProf.value = profileProf.textContent;
});

popup_close.addEventListener('click', togglePopup);

formSave.addEventListener('click', function(event) {
    event.preventDefault();
    togglePopup();
    profileName.textContent = inputName.value;
    profileProf.textContent = inputProf.value;
})