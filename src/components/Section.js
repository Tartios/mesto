export class Section {
  constructor({ items, renderer }, selector) {
    this._item = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  addItem(element) {
    this._selector.prepend(element);
  }

  renderItems() {
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }
}
