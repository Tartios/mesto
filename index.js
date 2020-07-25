const openButton = document.querySelector('.profile__info-button');
const addButton = document.querySelector('.profile__add-button');


const gridCards = document.querySelector('.foto-grid');



const popupProfile = document.querySelector('.popup_type_profile');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');


const popupProfileClose = popupProfile.querySelector('.popup__close-button');
const popupAddClose = popupAdd.querySelector('.popup__close-button');
const popupImageClose = popupImage.querySelector('.popup__close-button');

const profileForm = popupProfile.querySelector('.popup__form');
const addForm = popupAdd.querySelector('.popup__form');


const inputName = profileForm.querySelector('.popup__input_name');
const inputProf = profileForm.querySelector('.popup__input_prof');
const inputMark = addForm.querySelector('.popup__input_mark');
const inputLink = addForm.querySelector('.popup__input_link');


const formSave = profileForm.querySelector('.popup__save-button');
const addSave = addForm.querySelector('.popup__save-button');


const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__prof');
const cardTemplate = document.querySelector('#card').content.querySelector('.foto-grid__section');


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createCard(item) {
    const card = cardTemplate.cloneNode(true);
    const cardDelete = card.querySelector('.foto-grid__delete-button');
    const cardImg = card.querySelector('.foto-grid__image');
    const cardTitle = card.querySelector('.foto-grid__title');
    const cardLike = card.querySelector('.foto-grid__like-button');
    const imgSrc = popupImage.querySelector('.popup__imgSrc');
    const imagePopupTitle = popupImage.querySelector('.popup__title');

    cardDelete.addEventListener('click', () => {
        cardDelete.closest('.foto-grid__section').remove();
    });

    cardLike.addEventListener('click', () => {
        cardLike.classList.toggle('foto-grid__like-button_true');
    });

    cardImg.addEventListener('click', () => {
        imgSrc.src = cardImg.src;
        imagePopupTitle.textContent = cardTitle.textContent;
        togglePopup(popupImage);
    });

    cardImg.src = item.link;
    cardTitle.textContent = item.name;
    
    return card;
}

function cardCreator(item) {
    gridCards.prepend(createCard(item));
}

function togglePopup(modal) {
    modal.classList.toggle('popup_open');
}

openButton.addEventListener('click', function() {
    togglePopup(popupProfile);
    inputName.value = profileName.textContent;
    inputProf.value = profileProf.textContent;
});

addButton.addEventListener('click', function() {
    inputMark.value = null;
    inputLink.value = null;
    togglePopup(popupAdd);
});

popupProfileClose.addEventListener('click', () => { 
    togglePopup(popupProfile);
});

popupAddClose.addEventListener('click', () => { 
    togglePopup(popupAdd);
});

popupImageClose.addEventListener('click', () => { 
    togglePopup(popupImage);
});

formSave.addEventListener('click', function(event) {
    event.preventDefault();
    togglePopup(popupProfile);
    profileName.textContent = inputName.value;
    profileProf.textContent = inputProf.value;
});

addSave.addEventListener('click', function(event) {
    event.preventDefault();
    cardCreator({name: inputMark.value, link: inputLink.value});
    togglePopup(popupAdd);
});

initialCards.forEach((item) => {
    cardCreator(item);
});

