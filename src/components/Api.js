import { data } from "autoprefixer";
import { myID } from "../utils/parameters.js";
export class Api {
  constructor(options) {
    this._url = options.url;
    this._id = options.id;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
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
  }

  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json", //это тип данных, нужен при отправке данных на сервер
      },

      method: "PATCH",

      body: JSON.stringify({
        //в бади отправляют сами данные
        name: data.name,
        about: data.info
      }),
    })
      .then((res) => {
        return res.json();
      })
  }

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json"
      },

      method: "POST",

      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    })
    .then((res) => {
        return res.json();
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      //вместо кард айди нужно вставить айди с сервера
      headers: {
        authorization: this._id,
        "Content-Type": "application/json"
      },

      method: "DELETE",

      body: JSON.stringify({
        id: cardId
      }),
    });
  }

  likeCard() {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },

      method: "PUT",

      body: JSON.stringify({
        //тут пока хз что делать, думаю нужно передать айди карточки и переключить лайк с фолс на тру
        name: "",
        link: "",
      }),
    });
  }

  deleteLikeCard() {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },

      method: "PUT",

      body: JSON.stringify({
        name: "",
        link: "",
      }),
    });
  }

  setNewAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: {
        authorization: this._id,
        "Content-Type": "application/json", //работа с апи урок 5 MIME типы данных, возможно можно указать multipart/form-data
      },

      method: "PATCH",

      body: JSON.stringify({
        avatar: data.link //ссылка на фото профиля
      }),
    });
  }
}
