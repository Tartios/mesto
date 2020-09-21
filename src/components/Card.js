import { myID } from "../utils/parameters";

export default class Card {
  constructor(
    item,
    templateId,
    handleCardClick,
    handleCardDelete,
    handleLikeClick,
    delLike
  ) {
    // console.log(item)
    this._link = item.link;
    this._name = item.name;
    this._id = item._id;
    this._template = templateId;
    this._handleCardClick = handleCardClick;
    this._deleteCard = handleCardDelete;
    // this._ownerId = item.owner._id;
    this._handleLikeCards = handleLikeClick;
    this._delLike = delLike;
  }
  _getCard() {
    const cardTemplate = document
      .querySelector(this._template)
      .content.querySelector(".foto-grid__section")
      .cloneNode(true);

    return cardTemplate;
  }

  _handleDeleteCard() {
    this._element.closest(".foto-grid__section").remove();
  }

  _createLikes() {}

  handleLikeCard() {
    this._element
      .querySelector(".foto-grid__like-button")
      .classList.add("foto-grid__like-button_true");
    const likeCounter = this._element.querySelector(".foto-grid__like-counter");
    likeCounter.textContent = аргумент.likes.length;
  }

  handleDelLikeCard() {
    this._element
      .querySelector(".foto-grid__like-button")
      .classList.remove("foto-grid__like-button_true");
    const likeCounter = this._element.querySelector(".foto-grid__like-counter");
    likeCounter.textContent = аргумент.likes.length;
  }

  _drawInitialLikes() {
    if (this._likeData) {
      likeCounter.textContent = this._likeData.length;
    } else {
      likeCounter.textContent = [].length;
    }

    const likeButton = this._element.querySelector(".foto-grid__like-button");
    const isLiked = this._likeData.some((person) => {
      return person.id === myID;
    });

    if (isLiked) {
      likeButton.classList.add("foto-grid__like-button_true");
    } else {
      likeButton.classList.remove("foto-grid__like-button_true");
    }
  }

  _addEventListeners() {
    this._element
      .querySelector(".foto-grid__delete-button")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".foto-grid__image")
      .addEventListener("click", () => {
        this._handleCardClick(this.name, this.link);
      });
    this._element
      .querySelector(".foto-grid__like-button")
      .addEventListener("click", () => {
        this.handleLikeCard();
        this._handleLikeCards();
      });
  }

  createCard() {
    this._element = this._getCard();
    const imgElement = this._element.querySelector(".foto-grid__image");
    this._addEventListeners();
    // console.log(this._userId, this._ownerId);
    // if(this._id != this._userId) {

    // };

    imgElement.alt = this._name;
    imgElement.src = this._link;
    this._element.querySelector(".foto-grid__title").textContent = this._name;

    return this._element;
  }
}
