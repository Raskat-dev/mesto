export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;

		this._container = document.querySelector(containerSelector);
  }

  renderItems(cards, userId) {
    cards.reverse().forEach((item) => {
      this._renderer(item, userId)
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
