export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }
  getUserInfo() {
    return {
      name: this._name,
      description: this._description
    }
  }
  setUserInfo(formInputs) {
    this._name = formInputs.name;
    this._description = formInputs.description;
    document.querySelector('.profile__name').textContent = this._name;
    document.querySelector('.profile__description').textContent = this._description;
  }
}
