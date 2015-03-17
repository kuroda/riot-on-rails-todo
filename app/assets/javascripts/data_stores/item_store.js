var ItemStore = function(items) {
  this.items = items
};

ItemStore.prototype = {
  addItem: function(item) {
    this.items.push(item)
  }
};
