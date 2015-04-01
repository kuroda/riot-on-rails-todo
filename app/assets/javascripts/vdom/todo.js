var Todo = function Todo() {};

Todo.prototype = $.extend({}, Component, {
  init: function() {
    var self = this;
    this.dataStore = new ItemStore();
    this.dataStore.on('update', function() { self.update() });
    this.text = '';
    this.modifying = false;
  },

  render: function() {
    var self = this,
        vb = new VdomBuilder(),
        ds = this.dataStore;

    return vb.markup('div', function() {
      this.h3('TODO');
      this.ul(function() {
        for (var i = 0; i < ds.items.length; i++) {
          var item = ds.items[i];
          this.li(function() {
            this.label(function() {
              this.input({
                type: 'checkbox',
                checked: item.done,
                dataset: { id: item.id },
                onclick: function(e) { self.toggleItem(e) }
              })
              this.text(' ');
              this.span(item.name, {
                className: self.modifying && item.modifying && 'modifying'
              })
            }, { class: item.done && 'completed' })
            this.text(' ');
            this.span('UPDATE', {
              className: 'button',
              dataset: { id: item.id },
              onclick: function(e) { self.editItem(e) }
            });
            this.text(' ');
            this.span('DELETE', {
              className: 'button',
              dataset: { id: item.id },
              onclick: function(e) { self.destroyItem(e) }
            });
          })
        }
      });
      if (self.modifying) {
        this.form(function() {
          this.input({
            type: 'text',
            name: 'input2',
            value: self.text,
            onkeyup: function(e) { self.changeText(e) }
          });
          this.button('Update', { disabled: false, onclick: function(e) { self.updateItem(e) } });
          this.button('Cancel', { onclick: function(e) { self.reset() }})
        }, { onclick: function(e) { return false } })
      }
      else {
        this.form(function() {
          this.input({
            type: 'text',
            name: 'input1',
            value: self.text,
            onkeyup: function(e) { self.changeText(e) }
          });
          this.button('Add', { disabled: false, onclick: function(e) { self.createItem(e) } })
        }, { onclick: function(e) { return false } })
      }
    });
  },

  changeText: function(e) {
    this.text = e.target.value;
  },

  createItem: function(e) {
    if (this.text !== '') {
      this.dataStore.createItem(this.text)
      this.text = ''
    }
  },

  editItem: function(e) {
    var id = e.target.getAttribute('data-id');
    var item = this.dataStore.getItem(id);
    if (this.modifying) {
      this.reset()
    }
    else {
      this.targetItem = item
      this.modifying = true
      this.text = item.name
      this.dataStore.setTarget(id)
    }
    this.update();
  },

  updateItem: function(e) {
    if (this.text !== '') {
      this.dataStore.updateItem(this.targetItem, this.text)
      this.reset()
    }
  },

  destroyItem: function(e) {
    var id = e.target.getAttribute('data-id');
    this.reset()
    this.dataStore.deleteItem(id)
  },

  toggleItem: function(e) {
    this.dataStore.toggleItem(e.target.getAttribute('data-id'));
    return true;
  },

  reset: function() {
    this.modifying = false
    this.text = ''
    this.update()
  }
});
