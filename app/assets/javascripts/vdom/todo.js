var Todo = function Todo() {};

Todo.prototype = $.extend({}, Component, {
  init: function() {
    var self = this;
    this.dataStore = new ItemStore();
    this.dataStore.on('update', function() { self.update() });
  },

  render: function() {
    var self = this,
        h = virtualDom.h,
        ds = this.dataStore;
    return h('div', {}, [
      h('h3', ['Todo']),
      this.renderList()
    ]);
  },

  renderList: function() {
    var self = this,
        list = [],
        h = virtualDom.h
        ds = this.dataStore;
    return h('ul', _.map(ds.items, function(item) {
      return h('li', {}, [
        h('label', { class: item.done ? 'completed' : '' }, [
          h('input', {
            type: 'checkbox',
            class: item.done ? 'checked' : '',
            onclick: function() { self.toggleItem() }
          }),
          ' ',
          h('span', {
            class: self.modifying && item.modifying ? 'modifying' : ''
          }, item.name)
        ])
      ])
    }));
  },

  toggleItem: function() {
    console.log('toggle.')
  }
});
