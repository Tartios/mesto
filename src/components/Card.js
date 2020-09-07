export default class Card {
  constructor(item, templateID, handleCardClick) {
    this._link = item.link;
    this._name = item.name;
    this._template = templateID;
    this._handleCardClick = handleCardClick;
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

  _handleLikeCard() {
    this._element
      .querySelector(".foto-grid__like-button")
      .classList.toggle("foto-grid__like-button_true");
  }

  _addEventListeners() {
    this._element
      .querySelector(".foto-grid__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._element
      .querySelector(".foto-grid__image")
      .addEventListener("click", () => {
        this._handleCardClick(this.name, this.link);
      });
    this._element
      .querySelector(".foto-grid__like-button")
      .addEventListener("click", () => {
        this._handleLikeCard();
      });
  }

  createCard() {
    this._element = this._getCard();
    this._addEventListeners();

    this._element.querySelector(".foto-grid__image").alt = this._name;
    this._element.querySelector(".foto-grid__image").src = this._link;
    this._element.querySelector(".foto-grid__title").textContent = this._name;

    return this._element;
  }
}
