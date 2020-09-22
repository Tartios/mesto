import { userID } from "../utils/parameters";

export default class Card {
  constructor(
    item,
    userId,
    templateId,
    handleCardClick,
    handleCardDelete,
    handleLikeClick,
    _handleDeleteLikeClick
  ) {
    this._link = item.link;
    this._name = item.name;
    this._userId = userId;
    this._likes = item.likes;
    this._template = templateId;
    this._handleCardClick = handleCardClick;
    this._deleteCard = handleCardDelete;
    this._ownerId = item.owner._id;
    this._handleLikeCards = handleLikeClick;
    this._handleDeleteLikeClick = _handleDeleteLikeClick;
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

  _createLikes() {
    const likeCounter = this._element.querySelector(".foto-grid__like-counter");
    likeCounter.textContent = this._likes.length;
    this._toogleLikes();
  }

  _isLiked() {
    return this._likes.some((person) => {
      return person._id === userID;
    });
  }

  updateLikes(arrayLikes) {
    this._likes = arrayLikes;

    this._createLikes();
  }

  _toogleLikes() {
    const likeButton = this._element.querySelector(".foto-grid__like-button");

    if (this._isLiked()) {
      likeButton.classList.add("foto-grid__like-button_true");
    } else {
      likeButton.classList.remove("foto-grid__like-button_true");
    }
  }

  _addEventListeners() {
    this._element
      .querySelector(".foto-grid__delete-button")
      .addEventListener("click", () => {
        this._deleteCard(this._userId);
      });
    this._element
      .querySelector(".foto-grid__image")
      .addEventListener("click", () => {
        this._handleCardClick(this.name, this.link);
      });
    this._element
      .querySelector(".foto-grid__like-button")
      .addEventListener("click", () => {
        if (!this._isLiked()) {
          this._handleLikeCards();
        } else {
          this._handleDeleteLikeClick();
        }
      });
  }

  createCard() {
    this._element = this._getCard();
    const imgElement = this._element.querySelector(".foto-grid__image");
    this._addEventListeners();
    this._createLikes();
    if (this._ownerId != this._userId) {
      this._element.querySelector(".foto-grid__delete-button").remove();
    }

    imgElement.alt = this._name;
    imgElement.src = this._link;
    this._element.querySelector(".foto-grid__title").textContent = this._name;

    return this._element;
  }
}
