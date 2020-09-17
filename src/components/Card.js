export default class Card {
  constructor(item, templateId, handleCardClick, handleCardDelete) {
    console.log(item)
    this._link = item.link;
    this._name = item.name;
    this._id = item._id;
    this._template = templateId;
    this._handleCardClick = handleCardClick;
    this._deleteCard = handleCardDelete;
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
        console.log(this._id);
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
        this._handleLikeCard();
      });
  }

  createCard() {    
    this._element = this._getCard();
    const imgElement = this._element.querySelector(".foto-grid__image");
    this._addEventListeners();

    imgElement.alt = this._name;
    imgElement.src = this._link;
    this._element.querySelector(".foto-grid__title").textContent = this._name;

    return this._element;
  }
}
