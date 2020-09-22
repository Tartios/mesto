import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
  constructor(popupSelector, id) {
    super(popupSelector);
  }

  handleDeleteClick(submitAction) {
    this._handle = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector(".popup__save-button")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        this._handle();
        this.close();
      });
  }
}
