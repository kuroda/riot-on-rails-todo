VdomBuilder = @VdomBuilder

class @CoffeeTodo extends @Component
  init: ->
    self = this
    this.dataStore = new ItemStore()
    this.dataStore.on 'update', -> self.refresh()
    this.targetItem = undefined

  render: ->
    self = this
    b = new VdomBuilder(this)
    ds = this.dataStore
    return b.markup 'div', (b) ->
      b.h3 'TODO'
      b.ul (b) ->
        for item in ds.items
          do (item) -> renderListItem(self, b, item)

      b.form 'edit-todo-form2', visible: self.targetItem, (b) ->
        b.textField 'name'
        b.button 'Update', disabled: !b.value('name'), onclick: (e) -> self.updateItem(e)
        b.button 'Cancel', onclick: -> self.reset()

      b.form 'new-todo-form2', visible: !self.targetItem, (b) ->
        b.textField 'name'
        b.button 'Add', disabled: !b.value('name'), onclick: (e) -> self.createItem(e)

  renderListItem = (self, b, item) ->
    b.li (b) ->
      b.label className: { completed: item.done }, (b) ->
        b.checkBox '', item.done, onclick: (e) -> self.toggleItem(item)
        b.space()
        b.span(item.name, className: { modifying: item.modifying })
      b.space()
      b.span 'UPDATE', className: 'button', onclick: (e) -> self.editItem(item)
      b.space()
      b.span 'DELETE', className: 'button', onclick: (e) -> self.destroyItem(item)

  createItem: (e) ->
    name = $('#new-todo-form2 input[name="name"]').val() || ''
    if name != ''
      this.reset()
      this.dataStore.createItem(name)

  editItem: (item) ->
    if this.targetItem != undefined
      this.dataStore.resetTarget()
      this.reset()
    else
      this.targetItem = item
      this.dataStore.setTarget(item)
      $('#edit-todo-form2 input[name="name"]').val(item.name)
    this.refresh()

  updateItem: (e) ->
    name = $('#edit-todo-form2 input[name="name"]').val() || ''
    if name != ''
      this.dataStore.updateItem(this.targetItem, name)
      this.reset()

  destroyItem: (item) ->
    this.reset()
    this.dataStore.deleteItem(item.id)

  toggleItem: (item) ->
    this.dataStore.toggleItem(item)

  reset: ->
    $('#new-todo-form input[name="name"]').val('')
    $('#edit-todo-form input[name="name"]').val('')
    this.targetItem = undefined
    this.refresh()
