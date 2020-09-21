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
    // this._userId = cardId;
    this._like = item.likes;
    this._template = templateId;
    this._handleCardClick = handleCardClick;
    this._deleteCard = handleCardDelete;
    // this._ownerId = item.owner._id;
    this._handleLikeCards = handleLikeClick;
    this._delLike = delLike;
    // this._likeButton = this._element.querySelector(".foto-grid__like-button");
    // this._likeCounter = this._element.querySelector(".foto-grid__like-counter");
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
    likeCounter.textContent = this._like.length;
  }

  handleLikeCard() {
    const likeButton = this._element.querySelector(".foto-grid__like-button");
    const likeCounter = this._element.querySelector(".foto-grid__like-counter");
    likeCounter.textContent = this._like.length;
    likeButton.classList.add("foto-grid__like-button_true");
  }

  handleDelLikeCard() {
    const likeButton = this._element.querySelector(".foto-grid__like-button");
    likeButton.classList.remove("foto-grid__like-button_true");
    const likeCounter = this._element.querySelector(".foto-grid__like-counter");
    likeCounter.textContent = this._like.length;
  }

  _isLiked() {
    return this._like.some((person) => {
      return person.id === myID;
    });
  }

  _toogleLikes() {
    const likeCounter = this._element.querySelector(".foto-grid__like-counter");
    if (this._like) {
      likeCounter.textContent = this._like.length;
    } else {
      likeCounter.textContent = [].length;
    }

    const likeButton = this._element.querySelector(".foto-grid__like-button");
    this._isLiked();

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
        this._toogleLikes()
        this._handleLikeCards();
      });
  }

  createCard() {
    this._element = this._getCard();
    const imgElement = this._element.querySelector(".foto-grid__image");
    this._addEventListeners();
    this._createLikes();
    // console.log(this._ownerId);
    if(this._ownerId != this._userId) {
      this._element
        .querySelector(".foto-grid__delete-button").remove()
    };

    imgElement.alt = this._name;
    imgElement.src = this._link;
    this._element.querySelector(".foto-grid__title").textContent = this._name;

    return this._element;
  }
}
