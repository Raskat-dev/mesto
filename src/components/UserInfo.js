export default class UserInfo {
  constructor(user, profileName, profileDescription, profileAvatar) {
    this._name = user.name;
    this._about = user.about;
    this._avatar = user.avatar;
    this._id = user._id;
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._profileAvatar = document.querySelector(profileAvatar);
  }
  getUserInfo() {
    return {
      name: this._name,
      about: this._about
    }
  }
  getUserAvatar() {
    return {
      avatar: this._avatar
    }
  }
  setUserNameInfo(userData) {
    this._name = userData.name;
    this._about = userData.about;
    this._profileName.textContent = this._name;
    this._profileDescription.textContent = this._about;
  }

  setUserAvatar(userData) {
    this._avatar = userData.avatar;
    this._profileAvatar.src = this._avatar;

  }
  setUserInfo(userData) {
    this._name = userData.name;
    this._about = userData.about;
    this._avatar = userData.avatar;
    this._id = userData._id;
    this._profileName.textContent = this._name;
    this._profileDescription.textContent = this._about;
    this._profileAvatar.src = this._avatar;
  } 
}
