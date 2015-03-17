var ItemStore = function(items) {
  riot.observable(this)
  this.items = items
};

ItemStore.prototype = {
  addItem: function(item) {
    this.items.push(item)
    this.trigger('update')
  }
};
