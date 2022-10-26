export default class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  initItem(element) {
    this._selector.append(element);
  }

  addItem(element) {
    this._selector.prepend(element);
  }
}
