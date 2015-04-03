var Todo = function Todo() {};

Todo.prototype = $.extend({}, Component, {
  init: function() {
    var self = this;
    this.dataStore = new ItemStore();
    this.dataStore.on('update', function() { self.refresh() });
    this.targetItem = undefined;
  },

  render: function() {
    var self = this,
        b = new VdomBuilder(this),
        ds = this.dataStore;

    return b.markup('div', function(b) {
      b.h3('TODO');
      b.ul(function(b) {
        for (var i = 0; i < ds.items.length; i++) {
          (function(item) {
            b.li(function(b) {
              b.label(
                { className: { completed: item.done } },
                function(b) {
                  b.checkBox('', item.done, {
                    onclick: function(e) { self.toggleItem(item) }
                  })
                  b.space;
                  b.span(item.name, {
                    className: { modifying: item.modifying }
                  })
                }
              );
              b.space();
              b.span('UPDATE', {
                className: 'button',
                onclick: function(e) { self.editItem(item) }
              });
              b.space();
              b.span('DELETE', {
                className: 'button',
                onclick: function(e) { self.destroyItem(item) }
              });
            })
          })(ds.items[i]);
        }
      });

      b.form('edit-todo-form', { visible: self.targetItem },
        function(b) {
          b.textField('name');
          b.button('Update', {
            disabled: !b.value('name'),
            onclick: function(e) { self.updateItem(e) }
          });
          b.button('Cancel', { onclick: function(e) { self.reset() }})
        }
      )

      b.form('new-todo-form', { visible: !self.targetItem },
        function(b) {
          b.textField('name');
          b.button('Add', {
            disabled: !b.value('name'),
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
      this.dataStore.resetTarget()
      this.reset()
    }
    else {
      this.targetItem = item
      this.dataStore.setTarget(item)
      $('#edit-todo-form input[name="name"]').val(item.name);
    }
    this.refresh();
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
    this.refresh()
  }
});
