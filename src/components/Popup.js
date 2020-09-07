export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape" && this._popup.classList.contains("popup_open")) {
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

  open() {
    this._popup.classList.add("popup_open");
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt)
    );
  }

  close() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
