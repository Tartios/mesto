import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandle }) {
    super(popupSelector);
    this._submit = submitHandle;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));

    this._formValues = {};

    this._inputList.forEach((item) => {
      this._formValues[item.name] = item.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
    });
  }
}
