var Todo = function Todo() {};

Todo.prototype = $.extend({}, Component.prototype, {
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
            self.renderListItem(b, item)
          })(ds.items[i]);
        }
      });

      b.form('edit', { visible: self.targetItem },
        function(b) {
          b.textField('name');
          b.button('Update', {
            disabled: !self.forms.edit.name,
            onclick: function(e) { self.updateItem(e) }
          });
          b.button('Cancel', { onclick: function(e) { self.reset() }})
        }
      )

      b.form('new', { visible: !self.targetItem },
        function(b) {
          b.textField('name');
          b.button('Add', {
            disabled: !self.forms.new.name,
            onclick: function(e) { self.createItem(e) }
          })
        }
      )
    });
  },

  renderListItem: function(b, item) {
    var self = this;
    return b.li(function(b) {
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
  },

  createItem: function(e) {
    if (this.forms.new.name !== '') {
      this.dataStore.createItem(this.forms.new.name);
      this.reset();
    }
  },

  editItem: function(item) {
    if (this.targetItem !== undefined) {
      this.dataStore.resetTarget()
      this.reset()
    }
    else {
      this.targetItem = item;
      this.dataStore.setTarget(item);
      this.forms.edit.name = item.name
    }
    this.refresh();
  },

  updateItem: function(e) {
    if (this.forms.edit.name !== '') {
      this.dataStore.updateItem(this.targetItem, this.forms.edit.name)
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
    this.forms.edit.name = '';
    this.forms.new.name = '';
    this.targetItem = undefined;
    this.dataStore.resetTarget();
    this.refresh()
  }
});
