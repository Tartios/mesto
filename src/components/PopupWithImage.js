import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupTitle = this._popup.querySelector(".popup__title");
    this._imgSrc = this._popup.querySelector(".popup__imgSrc");
  }
  open(name, link) {
    this._imgSrc.src = link;
    this._imgSrc.alt = name;
    this._imagePopupTitle.textContent = name;
    super.open();
  }
}
