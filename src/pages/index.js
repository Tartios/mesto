import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import Card from "../components/Card.js";
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
  gridCards,
  profileName,
  profileProf, myID, profileAvatar
} from "../utils/parameters.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithDelete } from "../components/PopupWithDelete";
import { data } from "autoprefixer";



const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-15",
  id: myID,
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
.then((res) => {
  const [cardInfo, userData] = res;
  console.log(cardInfo);
  const cardGenerator = api.getInitialCards()
  // .then((res) => {
  //   return {item: res,
  //   id: res.id}
  // });
// ----------------- ЗАПРОСЫ К API -----------------//

api.getUserInfo().then((res) => {
  profileAvatar.style.background = `url(${res.avatar})`;
  profileAvatar.style.backgroundSize = "cover";
  profileName.textContent = res.name;
  profileProf.textContent = res.about;
});


// ----------------- СОЗДАНИЕ КАРТОЧЕК -----------------//

const cardList = new Section( //разобраться на досуге почему cardList и addCard друг от друга зависят
  {
    items: {},
    renderer: addCard,
  },
  gridCards
);

cardGenerator.then((res) => {
  const cards = new Section(
    {
      items: res,
      renderer: (items) => addCard(items),
    },
    gridCards
  );

  cards.renderItems();
});

function addCard(item) {
  const element = new Card(
    item,

    "#card",

    () => {
      imgPopup.open(item.name, item.link);
    },

    (id) => {//тут пишу функцию handleDeleteClick в которой
      // апи бахает карточку, а при создании формы просто 
      //передаю ПУСТУЮ функцию, потому что перезаписываю я 
      //ее тут и именно тут я определяю чем она занимается,
      // потому что конкретно вот эта форма создана конкретно
      // под задачи вот этого дерьма и если в этом дерьме
      // при нажатии на кнопку нужно убирать карточки, то
      // вот тут я прописываю эту функцию и передаю ее туда
      deleteForm.handleDeleteClick(() => {
        api.deleteCard(id).then(() => {
          element._handleDeleteCard()
        });
      }, 
      deleteForm.open());
    },

    (id) => {
      api.likeCard()
      .then((res) => {
        element.handleLikeCard();
      })
      // api.getInitialCards()
      // .then((res) => {
      //   return [] = res.likes    
      // })
      // .then((res) => {
      //   console.log(res)
      // })
    },

    (id) => {
      api.deleteLikeCard()
      .then((res) => {
        element.handleDelLikeCard();
      })
    }
  );
  const cardElement = element.createCard();
  cardList.addItem(cardElement);
}


// ----------------- ПРОФИЛЬ -----------------//


const profilePopup = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__prof",
});

// ----------------- СОЗДАНИЕ ФОРМ -----------------//

const profileModal = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  submitHandle: (item) =>
    api
      .patchUserInfo(item)
      .then((item) => {
        return item;
      })
      .then((item) => {
        profilePopup.setUserInfo(item);
        profileName.textContent = item.name;
        profileProf.textContent = item.about;
      })
});

const deleteForm = new PopupWithDelete(".popup_type_card-delete");

const imgPopup = new PopupWithImage(".popup_type_image");

const avatarModal = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  submitHandle: (item) => {
    api.setNewAvatar(item)
    .then(() => {
      profileAvatar.style.background = `url(${item.link})`;
      profileAvatar.style.backgroundSize = "cover";
    })
  }
});

const addModal = new PopupWithForm({
  popupSelector: ".popup_type_add",
  submitHandle: (item) => {
    api
      .postNewCard(item)
      .then((item) => {addCard(item)})}
});

// ----------------- СЛУШАТЕЛИ ФОРМ И КНОПОК -----------------//

//слушатели форм

profileModal.setEventListeners();
deleteForm.setEventListeners();
imgPopup.setEventListeners();
avatarModal.setEventListeners();
addModal.setEventListeners();


//слушатели кнопок

//аватарка
profileAvatar.addEventListener("click", function() {
  avatarModal.open();
});

//добавить карточку
addButton.addEventListener("click", function () {
  inputMark.value = null;
  inputLink.value = null;
  addFormValidator.blockButton(addSave, parameters.inactiveButtonClass);
  addFormValidator.removeValidate();
  addModal.open();
});



//обновить профиль
openButton.addEventListener("click", function () {
  const userInfo = profilePopup.getUserInfo();
  inputName.value = userInfo.name;
  inputProf.value = userInfo.info;
  profileFormValidator.removeValidate();
  profileModal.open();
});

// ----------------- ВАЛИДАЦИЯ -----------------//

//const avatarFormValidator = new FormValidator(avatarModal, parameters);
const profileFormValidator = new FormValidator(profileForm, parameters);
const addFormValidator = new FormValidator(addForm, parameters);
profileFormValidator.enableValidation();
addFormValidator.enableValidation();
//avatarFormValidator.enableValidation();

});

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
// function getInitialCards() {
//   fetch('https://mesto.nomoreparties.co/v1/cohort-15/cards', {
//       headers: {
//           authorization: "b7f21f02-0f3c-4a3e-ae62-e9761e3102fc"
//       },

//       method: 'GET'
//   })
//   .then(res => {
//       return res.json();
//   })
//   .then((result) => {
//       console.log(result);
//   })
// }

// getInitialCards();

// function getUserInfo() {
//   fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
//       headers: {
//           authorization: 'b7f21f02-0f3c-4a3e-ae62-e9761e3102fc'
//       },

//       method: 'GET'
//   })
//   .then(res => {
//       return res.json();
//   })
//   .then((result) => {
//       console.log(result);
//   })
// }

// getUserInfo();









// cardList.renderItems();






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



// const cardGenerator = api.getInitialCards();
// api.getUserInfo().then((res) => {
//   profileName.textContent = res.name;
//   profileProf.textContent = res.about;
// });

// cardGenerator.then((res) => {
//   const cards = new Section(
//     {
//       items: res,
//       renderer: (items) => addCard(items),
//     },
//     gridCards
//   );

//   cards.renderItems();
// });

// // function getInitialCards() {
// //   fetch('https://mesto.nomoreparties.co/v1/cohort-15/cards', {
// //       headers: {
// //           authorization: "b7f21f02-0f3c-4a3e-ae62-e9761e3102fc"
// //       },

// //       method: 'GET'
// //   })
// //   .then(res => {
// //       return res.json();
// //   })
// //   .then((result) => {
// //       console.log(result);
// //   })
// // }

// // getInitialCards();

// // function getUserInfo() {
// //   fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
// //       headers: {
// //           authorization: 'b7f21f02-0f3c-4a3e-ae62-e9761e3102fc'
// //       },

// //       method: 'GET'
// //   })
// //   .then(res => {
// //       return res.json();
// //   })
// //   .then((result) => {
// //       console.log(result);
// //   })
// // }

// // getUserInfo();
// const deleteForm = new PopupWithDelete(".popup_type_card-delete", () => {
//   api.deleteCard().then(() => {
//     element._handleDeleteCard()
//   });
// });

// deleteForm.setEventListeners();

// const imgPopup = new PopupWithImage(".popup_type_image");
// imgPopup.setEventListeners();
// const profilePopup = new UserInfo({
//   nameSelector: ".profile__name",
//   infoSelector: ".profile__prof",
// });

// function addCard(item) {
//   const element = new Card(
//     item,
//     "#card",
//     () => {
//       imgPopup.open(item.name, item.link);
//     },
//     () => {
//       deleteForm.handleDeleteClick(() => {
//         api.deleteCard(item.id).then(() => {
//           element._handleDeleteCard()
//         });
//       }, deleteForm.open());
//     }
//   );
//   const cardElement = element.createCard();
//   cardList.addItem(cardElement);
// }

// const cardList = new Section( //разобраться на досуге почему cardList и addCard друг от друга зависят
//   {
//     items: {},
//     renderer: addCard,
//   },
//   gridCards
// );

// // cardList.renderItems();

// const avatarModal = new PopupWithForm({
//   popupSelector: ".popup_type_avatar",
//   submitHandle: (item) => {
//     api.setNewAvatar(item)
//     .then((item) => {
//       profileAvatar.style.backgroundImage = item.avatar
//     })
//   }
// })

// avatarModal.setEventListeners();

// const addModal = new PopupWithForm({
//   popupSelector: ".popup_type_add",
//   submitHandle: (item) => {
//     api
//       .postNewCard(item)
//       .then((item) => {addCard(item)})}
// });

// addModal.setEventListeners();


// profileAvatar.addEventListener("click", function() {
//   avatarModal.open();
// })
// //вешает слушатель на кнопку открытия модалки добавления
// addButton.addEventListener("click", function () {
//   inputMark.value = null;
//   inputLink.value = null;
//   addFormValidator.blockButton(addSave, parameters.inactiveButtonClass);
//   addFormValidator.removeValidate();
//   addModal.open();
// });

// const profileModal = new PopupWithForm({
//   popupSelector: ".popup_type_profile",
//   submitHandle: (item) =>
//     api
//       .patchUserInfo(item)
//       .then((item) => {
//         return item;
//       })
//       .then((item) => {
//         profilePopup.setUserInfo(item);
//         profileName.textContent = item.name;
//         profileProf.textContent = item.about;
//       })
// });

// profileModal.setEventListeners();

// //вешает слушатель на кнопку открытия модалки профиля
// openButton.addEventListener("click", function () {
//   const userInfo = profilePopup.getUserInfo();
//   inputName.value = userInfo.name;
//   inputProf.value = userInfo.info;
//   profileFormValidator.removeValidate();
//   profileModal.open();
// });

// // const modalImg = new PopupWithImage('.popup_type_image');
// // const modalForm = new PopupWithForm({popupSelector: '.popup_type_profile',
// // submitHandle: (item) => {
// //     const card = new Card(item, () => {
// //         popupImage.open(this.link, this.name)
// //     })
// // }});

// // initialCards.forEach((item) => {
// //     const card = new Card(item);
// //     const element = card.createCard();
// //     Section.addItem(element);
// // });

// const profileFormValidator = new FormValidator(profileForm, parameters);
// const addFormValidator = new FormValidator(addForm, parameters);
// profileFormValidator.enableValidation();
// addFormValidator.enableValidation();
