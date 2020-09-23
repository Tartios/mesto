export class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.style.backgroundImage,
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (avatar) {
      this._avatar.style.background = `url(${avatar})`;
      this._avatar.style.backgroundSize = "cover";
    }
    if (name) {
      this._name.textContent = name;
    }
    if (about) {
      this._about.textContent = about;
    }
  }
}
