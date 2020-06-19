import { profileName, profileJob, nameInput, jobInput } from '../utils/constants.js'

export default class UserInfo {
  constructor(author = {}) {
    this._name = author.name;
    this._description = author.description;
  }
  getUserInfo() {
    this._name = profileName.textContent;
    this._description = profileJob.textContent;
  }
  setUserInfo() {
    this._name = nameInput.value;
    this._description = jobInput.value;
    profileName.textContent = this._name;
    profileJob.textContent = this._description;
  }
}
