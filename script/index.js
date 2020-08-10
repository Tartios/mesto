const openButton = document.querySelector('.profile__info-button');
const addButton = document.querySelector('.profile__add-button');


const gridCards = document.querySelector('.foto-grid');


const popupProfile = document.querySelector('.popup_type_profile');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');


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

// функции создания и работы с модальными окнами //

function createCard(item) {
    const card = cardTemplate.cloneNode(true);
    const cardDelete = card.querySelector('.foto-grid__delete-button');
    const cardImg = card.querySelector('.foto-grid__image');
    const cardTitle = card.querySelector('.foto-grid__title');
    const cardLike = card.querySelector('.foto-grid__like-button');
    const imgSrc = popupImage.querySelector('.popup__imgSrc');
    const imagePopupTitle = popupImage.querySelector('.popup__title');

    cardDelete.addEventListener('click', () => {//слушатель кнопки удаления
        cardDelete.closest('.foto-grid__section').remove();
    });

    cardLike.addEventListener('click', () => {//слушатель на лайк
        cardLike.classList.toggle('foto-grid__like-button_true');
    });

    cardImg.addEventListener('click', () => {//слушатель открытия картинки
        imgSrc.src = cardImg.src;
        imagePopupTitle.textContent = cardTitle.textContent;
        openPopup(popupImage);
    });

    cardImg.src = item.link;    
    cardImg.alt = item.name;
    cardTitle.textContent = item.name;
    
    return card;
};

function cardCreator(item) {
    gridCards.prepend(createCard(item));
};

openButton.addEventListener('click', function() {
    openPopup(popupProfile);
    inputName.value = profileName.textContent;
    inputProf.value = profileProf.textContent;
});

addButton.addEventListener('click', function() {
    inputMark.value = null;
    inputLink.value = null;
    blockButton(addSave, parameters.inactiveButtonClass);
    openPopup(popupAdd);
});

const isPopupOpened = (popup) => {
    return popup.classList.contains('popup_open');
};

const thisModalIsOpen = () => {
    const popups = Array.from(document.querySelectorAll('.popup'));
    const popupElement = popups.find(function (popup) {
        return isPopupOpened(popup);
    });
    return popupElement;
};

const handleEscape = (e) => {
    const popupElement = thisModalIsOpen();
    if(e.key === 'Escape') {
        if(popupElement != undefined) {
            console.log('eee')
            closePopup(popupElement);            
        }
    }
};

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

function openPopup(modal) {// открыть модалку
    escEvLAdd();
    modal.classList.add('popup_open');    
};

function closePopup(modal) {// закрыть модалку
    escEvLRemove();
    modal.classList.remove('popup_open');
};

const escEvLAdd = () => {//добавить слушатель esc
    document.addEventListener('keydown', handleEscape);
};

const escEvLRemove = () => {//удалить слушатель esc
    document.removeEventListener('keydown', handleEscape);    
};

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
    cardCreator({name: inputMark.value, link: inputLink.value});
    closePopup(popupAdd);
});

initialCards.forEach((item) => {
    cardCreator(item);
});