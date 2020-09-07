import { Popup } from "./Popup.js";
import { imgSrc, imagePopupTitle } from "../utils/parameters.js";

export class PopupWithImage extends Popup {
  open(name, link) {
    imgSrc.src = link;
    imgSrc.alt = name;
    imagePopupTitle.textContent = name;
    super.open();
  }
}
