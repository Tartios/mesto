export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape" && this._popup.classList.contains("popup_open")) {
      console.log('hi')
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (
      evt.target.classList.contains("popup") ===
      evt.currentTarget.classList.contains("popup")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close-button");
    this._popup.addEventListener("click", (evt) => {
      this._handleOverlayClick(evt);
    });
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  renderLoading(isLoading, text) {
    const saveButton = this._popup.querySelector(".popup__save-button");
    if (isLoading) {
      saveButton.textContent =
        "Сохранение...";
    } else {
      saveButton.textContent = text;
    }
  }

  open() {
    this._popup.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
