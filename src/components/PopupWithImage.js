import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(name, link) {
    const imagePopupTitle = this._popup.querySelector(".popup__title");
    const imgSrc = this._popup.querySelector(".popup__imgSrc");
    imgSrc.src = link;
    imgSrc.alt = name;
    imagePopupTitle.textContent = name;
    super.open();
  }
}
