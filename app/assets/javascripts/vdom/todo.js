var Todo = function Todo() {};

Todo.prototype = $.extend({}, Component, {
  init: function() {
    var self = this;
    this.dataStore = new ItemStore();
    this.dataStore.on('update', function() { self.update() });
    this.targetItem = undefined;
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
                    className: self.targetItem && item.modifying && 'modifying'
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

      this.form(
        {
          id: 'edit-todo-form',
          style: { display: self.targetItem ? '' : 'none' },
          onsubmit: function(e) { return false }
        },
        function() {
          var name = $('#edit-todo-form input[name="name"]').val() || '';
          this.input({
            type: 'text', name: 'name', value: name,
            onkeyup: function(e) { self.update() }
          });
          this.button('Update', { disabled: false, onclick: function(e) { self.updateItem(e) } });
          this.button('Cancel', { onclick: function(e) { self.reset() }})
        }
      )

      this.form(
        {
          id: 'new-todo-form',
          style: { display: self.targetItem ? 'none' : '' },
          onsubmit: function(e) { return false }
        },
        function() {
          var name = $('#new-todo-form input[name="name"]').val() || '';
          this.input({
            type: 'text', name: 'name', value: name,
            onkeyup: function(e) { self.update() }
          });
          this.button('Add', {
            disabled: name === '',
            onclick: function(e) { self.createItem(e) }
          })
        }
      )
    });
  },

  createItem: function(e) {
    var name = $('#new-todo-form input[name="name"]').val() || '';
    if (name !== '') {
      this.reset();
      this.dataStore.createItem(name);
    }
  },

  editItem: function(item) {
    if (this.targetItem !== undefined) {
      this.reset()
    }
    else {
      this.targetItem = item
      this.dataStore.setTarget(item)
      $('#edit-todo-form input[name="name"]').val(item.name);
    }
    this.update();
  },

  updateItem: function(e) {
    var name = $('#edit-todo-form input[name="name"]').val() || '';
    if (name !== '') {
      this.dataStore.updateItem(this.targetItem, name)
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
    $('#new-todo-form input[name="name"]').val('');
    $('#edit-todo-form input[name="name"]').val('');
    this.targetItem = undefined
    this.update()
  }
});
