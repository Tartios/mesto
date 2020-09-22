import { data } from "autoprefixer";
import { myID } from "../utils/parameters.js";
export class Api {
  constructor(options) {
    this._url = options.url;
    this._id = options.id;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._id,
      },

      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._id,
      },

      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json"
      },

      method: "PATCH",

      body: JSON.stringify({
        name: data.name,
        about: data.info,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
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
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
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
    });
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },

      method: "PUT",
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },

      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setNewAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json"
      },

      method: "PATCH",

      body: JSON.stringify({
        avatar: data.link,
      }),
    });
  }
}
