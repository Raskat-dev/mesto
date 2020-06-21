export default class UserInfo {
  constructor({ name, description }, profileName, profileDescription) {
    this._name = name;
    this._description = description;
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
  }
  getUserInfo() {
    return {
      name: this._name,
      description: this._description
    }
  }
  setUserInfo(userData) {
    this._name = userData.name;
    this._description = userData.description;
    this._profileName.textContent = this._name;
    this._profileDescription.textContent = this._description;
  }
}
