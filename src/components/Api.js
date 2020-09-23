export class Api {
  constructor(options) {
    this._url = options.url;
    this._id = options.id;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  _getResponceData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Error ${res.status}`));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._id,
      },

      method: "GET",
    }).then(this._getResponceData);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._id,
      },

      method: "GET",
    }).then(this._getResponceData);
  }

  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },

      method: "PATCH",

      body: JSON.stringify({
        name: data.name,
        about: data.info,
      }),
    }).then(this._getResponceData);
  }

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },

      method: "POST",

      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponceData);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },

      method: "DELETE",

      body: JSON.stringify({
        id: cardId,
      }),
    }).then(this._getResponceData);
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },

      method: "PUT",
    }).then(this._getResponceData);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },

      method: "DELETE",
    }).then(this._getResponceData);
  }

  setNewAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },

      method: "PATCH",

      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then(this._getResponceData);
  }
}
