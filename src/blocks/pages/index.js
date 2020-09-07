import "./index.css";
import { FormValidator } from "../../components/FormValidator.js";
import Card from "../../components/Card.js";
import { blockButton } from "../../utils/utils.js";
import {
  parameters,
  openButton,
  addButton,
  profileForm,
  addForm,
  inputName,
  inputProf,
  inputMark,
  inputLink,
  addSave,
  initialCards,
  gridCards,
} from "../../utils/parameters.js";
import { Section } from "../../components/Section.js";
import { PopupWithForm } from "../../components/PopupWithForm.js";
import { PopupWithImage } from "../../components/PopupWithImage.js";
import { UserInfo } from "../../components/UserInfo.js";

//почти все эти слушатели - задвоение. есть все кроме щелчка вне окна вроде бы
// popupProfile.addEventListener('click', (e) => {//закрывает модалку профиля щелчком вне окна
//     if(e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
//         closePopup(popupProfile);
//     }
// });

// popupAdd.addEventListener('click', (e) => {//закрывает модалку добавления щелчком вне окна
//     if(e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
//         closePopup(popupAdd);
//     }
// });

// popupImage.addEventListener('click', (e) => {//закрывает модалку картинки щелчком вне окна
//     if(e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
//         closePopup(popupImage);
//     }
// })

// formSave.addEventListener('click', function(event) {//закрытие модалки профиля кнопкой сохранить
//     event.preventDefault();
//     closePopup(popupProfile);
//     profileName.textContent = inputName.value;
//     profileProf.textContent = inputProf.value;
// });

// addSave.addEventListener('click', function(event) {//закрытие модалки добавления карточки кнопкой создать
//     event.preventDefault();
//     const card = new Card({name: inputMark.value, link: inputLink.value});
//     const element = card.createCard();
//     cardCreator(element);
//     closePopup(popupAdd);
// });

const imgPopup = new PopupWithImage(".popup_type_image");
imgPopup.setEventListeners();
const profilePopup = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__prof",
});

function addCard(item) {
  const element = new Card(item, "#card", () => {
    imgPopup.open(item.name, item.link);
  });
  const cardElement = element.createCard();
  cardList.addItem(cardElement);
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: addCard,
  },
  gridCards
);

cardList.renderItems();


const addModal = new PopupWithForm({
  popupSelector: ".popup_type_add",
  submitHandle: (item) => {addCard(item)},
});

addModal.setEventListeners();

//вешает слушатель на кнопку открытия модалки добавления
addButton.addEventListener("click", function () {
  inputMark.value = null;
  inputLink.value = null;
  blockButton(addSave, parameters.inactiveButtonClass);
  addFormValidator.removeValidate();
  addModal.open();
});

const profileModal = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  submitHandle: (item) => {
    profilePopup.setUserInfo(item);
  },
});

profileModal.setEventListeners();

//вешает слушатель на кнопку открытия модалки профиля
openButton.addEventListener("click", function () {
  const userInfo = profilePopup.getUserInfo();
  inputName.value = userInfo.name;
  inputProf.value = userInfo.info;
  profileFormValidator.removeValidate()
  profileModal.open();
});

// const modalImg = new PopupWithImage('.popup_type_image');
// const modalForm = new PopupWithForm({popupSelector: '.popup_type_profile',
// submitHandle: (item) => {
//     const card = new Card(item, () => {
//         popupImage.open(this.link, this.name)
//     })
// }});

// initialCards.forEach((item) => {
//     const card = new Card(item);
//     const element = card.createCard();
//     Section.addItem(element);
// });

const profileFormValidator = new FormValidator(profileForm, parameters);
const addFormValidator = new FormValidator(addForm, parameters);
profileFormValidator.enableValidation();
addFormValidator.enableValidation();
