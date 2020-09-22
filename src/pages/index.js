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
  profileProf,
  myID,
  profileAvatar,
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
    const cardGenerator = api.getInitialCards();
    // ----------------- ЗАПРОСЫ К API -----------------//

    api
      .getUserInfo()
      .then((res) => {
        profileAvatar.style.background = `url(${res.avatar})`;
        profileAvatar.style.backgroundSize = "cover";
        profileName.textContent = res.name;
        profileProf.textContent = res.about;
      })
      .catch((err) => {
        console.log(err);
      });

    // ----------------- СОЗДАНИЕ КАРТОЧЕК -----------------//

    const cardList = new Section( //разобраться на досуге почему cardList и addCard друг от друга зависят
      {
        items: {},
        renderer: addCard,
      },
      gridCards
    );

    cardGenerator
      .then((res) => {
        const cards = new Section(
          {
            items: res.reverse(),
            renderer: (items) => addCard(items, userData._id),
          },
          gridCards
        );

        cards.renderItems();
      })
      .catch((err) => {
        console.log(err);
      });

    function addCard(item, id) {
      const element = new Card(
        item,

        id,

        "#card",

        () => {
          imgPopup.open(item.name, item.link);
        },

        () => {
          deleteForm.handleDeleteClick(() => {
            api
              .deleteCard(item._id)
              .then(() => {
                element._handleDeleteCard();
              })
              .catch((err) => {
                console.log(err);
              });
          }, deleteForm.open());
        },

        () => {
          api
            .likeCard(item._id)
            .then((res) => {
              element.updateLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        },

        () => {
          api
            .deleteLikeCard(item._id)
            .then((res) => {
              element.updateLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
      const cardElement = element.createCard(item._id);
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
      submitHandle: (item) => {
        profileModal.renderLoading(true);
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
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            profileModal.renderLoading(false, "Сохранить");
          });
      },
    });

    const deleteForm = new PopupWithDelete(".popup_type_card-delete");

    const imgPopup = new PopupWithImage(".popup_type_image");

    const avatarModal = new PopupWithForm({
      popupSelector: ".popup_type_avatar",
      submitHandle: (item) => {
        avatarModal.renderLoading(true);
        api
          .setNewAvatar(item)
          .then(() => {
            profileAvatar.style.background = `url(${item.link})`;
            profileAvatar.style.backgroundSize = "cover";
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            avatarModal.renderLoading(false, "Сохранить");
          });
      },
    });

    const addModal = new PopupWithForm({
      popupSelector: ".popup_type_add",
      submitHandle: (item) => {
        addModal.renderLoading(true);
        api
          .postNewCard(item)
          .then((item) => {
            addCard(item, userData._id);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            addModal.renderLoading(false, "Создать");
          });
      },
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
    profileAvatar.addEventListener("click", function () {
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

    const avatarFormValidator = new FormValidator(avatarModal, parameters);
    const profileFormValidator = new FormValidator(profileForm, parameters);
    const addFormValidator = new FormValidator(addForm, parameters);
    profileFormValidator.enableValidation();
    addFormValidator.enableValidation();
    avatarFormValidator.enableValidation();
  })
  .catch((err) => {
    console.log(err);
  });
