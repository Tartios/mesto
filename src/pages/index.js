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
  avatarForm,
  popupError,
} from "../utils/parameters.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithDelete } from "../components/PopupWithDelete";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-15",
  id: myID,
});
api
  .getAppInfo()
  .then((res) => {
    const [cardInfo, userData] = res;
    const cardGenerator = api.getInitialCards();
    // ----------------- ЗАПРОСЫ К API -----------------//

    api
      .getUserInfo()
      .then((res) => {
        profilePopup.setUserInfo(res);
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
            items: res.reverse(), //сделан реверс начальных карточек
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
              .then(() => {
                deleteForm.close()
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
      avatarSelector: ".profile__avatar",
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
          .then(() => {         
            profileModal.close();
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
          .then((item) => {
            profilePopup.setUserInfo(item);
          })
          .then(() => {            
            avatarModal.close();
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
            addModal.close();
          })
          .then(() => {            
            addModal.close();
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
      avatarFormValidator.blockButton(addSave, parameters.inactiveButtonClass);
      avatarFormValidator.removeValidate();
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
      inputProf.value = userInfo.about;
      profileFormValidator.removeValidate();
      profileModal.open();
    });

    // ----------------- ВАЛИДАЦИЯ -----------------//

    const avatarFormValidator = new FormValidator(
      avatarForm,
      parameters,
      popupError
    );
    const profileFormValidator = new FormValidator(
      profileForm,
      parameters,
      popupError
    );
    const addFormValidator = new FormValidator(addForm, parameters, popupError);
    profileFormValidator.enableValidation();
    addFormValidator.enableValidation();
    avatarFormValidator.enableValidation();
  })
  .catch((err) => {
    console.log(err);
  });
