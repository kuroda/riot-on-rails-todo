var ItemStore = function ItemStore() {
  this.items = []
  this.refresh()
}

ItemStore.prototype = $.extend(Observable, {
  refresh: function() {
    var self = this
    $.ajax({
      type: 'GET',
      url: '/api/items.json'
    }).done(function(data) {
      self.items.length = 0
      for (i = 0; i < data.length; i++) {
        self.items.push(data[i])
      }
      self.trigger('update')
    })
  },
  createItem: function(name) {
    var self = this
    $.ajax({
      type: 'POST',
      url: '/api/items',
      data: { item: { name: name } }
    }).done(function(data) {
      if (data === 'OK')
        self.refresh()
    })
  },
  updateItem: function(item, name) {
    var self = this
    $.ajax({
      type: 'PATCH',
      url: '/api/items/' + item.id,
      data: { item: { name: name } }
    }).done(function(data) {
      if (data === 'OK')
        self.refresh()
    })
  },
  deleteItem: function(id) {
    var self = this
    $.ajax({
      type: 'DELETE',
      url: '/api/items/' + id
    }).done(function(data) {
      if (data === 'OK')
        self.refresh()
    })
  },
  toggleItem: function(item) {
    var self = this
    $.ajax({
      type: 'PATCH',
      url: '/api/items/' + item.id,
      data: { item: { done: !item.done } }
    }).done(function(data) {
      if (data === 'OK')
        self.refresh()
    })
  },
  setTarget: function(item) {
    for (i = 0; i < this.items.length; i++) {
      if (this.items[i].id === item.id)
        this.items[i].modifying = true
      else
        this.items[i].modifying = false
    }
  },
  resetTarget: function() {
    for (i = 0; i < this.items.length; i++) {
      this.items[i].modifying = false
    }
  },
  getItem: function(id) {
    return _.find(this.items, function(item) { return item.id === Number(id) })
  }
});
