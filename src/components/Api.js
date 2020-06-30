export default class Api {
  constructor(options) {
    this._url = options.url;
    this._token  = options.token;
  }

  getProfileInfo() {
  return fetch(`${this._url}/users/me`, {
  method: 'GET',
  headers: {
    authorization: this._token
  }
})
  .then((res) => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
}
//изменение данных пользователя
  changeProfileInfo(user) {
    return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: this._token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
    name: user.name,
    about: user.about
    })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }
  //изменение аватара пользователя
  changeProfileAvatar(user) {
    return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: this._token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
    avatar: user.avatar,
    })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }
  
  getCardsFromServer() {
    return fetch(`${this._url}/cards`, {
  method: 'GET',
  headers: {
    authorization: this._token
  }
})
.then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }

  addNewCard(item) {
    return fetch(`${this._url}/cards`, {
    method: 'POST',
    headers: {
      authorization: this._token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: item.name,
      link: item.link
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  }
  
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }
}