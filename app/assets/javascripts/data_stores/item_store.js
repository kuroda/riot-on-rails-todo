var ItemStore = function() {
  riot.observable(this)
  this.items = []
  this.refresh()
}

ItemStore.prototype = {
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
  addItem: function(item) {
    var self = this
    $.ajax({
      type: 'POST',
      url: '/api/items',
      data: { item: item }
    }).done(function(data) {
      if (data === 'OK')
        self.refresh()
    })
  },
  deleteItem: function(item) {
    var self = this
    $.ajax({
      type: 'DELETE',
      url: '/api/items/' + item.id
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
  }
}
