<todo>

  <h3>{ opts.title } ({items.length}).</h3>

  <ul>
    <li each={ items.filter(filter) }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle } />
        <span class={ modifying: modifying }>
          { name }
        </span>
      </label>
      <span class="button" onclick={ parent.editItem } >UPDATE</span>
      <span class="button" onclick={ parent.destroy } >DELETE</span>
    </li>
  </ul>

  <form if={ !modifying } onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.filter(filter).length + 1 }</button>
  </form>

  <form if={ modifying } onsubmit={ updateItem }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Update</button>
    <button onclick={ cancelModification }>Cancel</button>
  </form>

  <style scoped>
    span.modifying {
      font-weight: bold;
      color: #800;
    }
    span.button {
      cursor: pointer;
      background-color: #888;
      color: #fff;
      padding: 2px;
      font-size: 60%;
    }
  </style>

  <script>
    var self = this
    var ds = opts.dataStore

    self.items = ds.items
    self.modifying = false
    self.targetItem = undefined

    ds.on('update', function() { self.update() })

    edit(e) {
      self.text = e.target.value
    }

    add(e) {
      if (self.text) {
        ds.addItem({ name: self.text })
        self.text = self.input.value = ''
      }
    }

    editItem(e) {
      if (self.modifying) {
        self.cancelModification()
      }
      else {
        self.targetItem = e.item
        self.modifying = true
        self.text = self.input.value = e.item.name
        ds.setTarget(e.item)
        self.update()
      }
    }

    updateItem(e) {
      if (self.text) {
        ds.updateItem(self.targetItem, self.text)
        self.text = self.input.value = ''
      }
    }

    cancelModification() {
      self.modifying = false
      ds.resetTarget()
      self.update()
    }

    destroy(e) {
      ds.deleteItem(e.item)
    }

    toggle(e) {
      ds.toggleItem(e.item)
      return true
    }

    filter(item) {
      return !item.hidden
    }
  </script>

</todo>
