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
          (function(item) {
            this.li(function() {
              this.label(
                { class: item.done && 'completed' },
                function() {
                  this.input({
                    type: 'checkbox',
                    checked: item.done,
                    onclick: function(e) { self.toggleItem(item) }
                  })
                  this.text(' ');
                  this.span(item.name, {
                    className: self.modifying && item.modifying && 'modifying'
                  })
                }
              );
              this.text(' ');
              this.span('UPDATE', {
                className: 'button',
                onclick: function(e) { self.editItem(item) }
              });
              this.text(' ');
              this.span('DELETE', {
                className: 'button',
                onclick: function(e) { self.destroyItem(item) }
              });
            })
          }).call(this, ds.items[i]);
        }
      });
      if (self.modifying) {
        this.form(
          { onsubmit: function(e) { return false } },
          function() {
            this.input({
              type: 'text',
              name: 'input2',
              value: self.text,
              onkeyup: function(e) { self.changeText(e) }
            });
            this.button('Update', { disabled: false, onclick: function(e) { self.updateItem(e) } });
            this.button('Cancel', { onclick: function(e) { self.reset() }})
          }
        )
      }
      else {
        this.form(
          { onsubmit: function(e) { return false } },
          function() {
            this.input({
              type: 'text',
              name: 'input1',
              value: self.text,
              onkeyup: function(e) { self.changeText(e) }
            });
            this.button('Add', { disabled: false, onclick: function(e) { self.createItem(e) } })
          }
        )
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

  editItem: function(item) {
    if (this.modifying) {
      this.reset()
    }
    else {
      this.targetItem = item
      this.modifying = true
      this.text = item.name
      this.dataStore.setTarget(item)
    }
    this.update();
  },

  updateItem: function(e) {
    if (this.text !== '') {
      this.dataStore.updateItem(this.targetItem, this.text)
      this.reset()
    }
  },

  destroyItem: function(item) {
    this.reset()
    this.dataStore.deleteItem(item.id)
  },

  toggleItem: function(item) {
    this.dataStore.toggleItem(item);
    return true;
  },

  reset: function() {
    this.modifying = false
    this.text = ''
    this.update()
  }
});
