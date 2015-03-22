<todo>

  <h3>{ opts.title } ({items.length})</h3>

  <ul>
    <li each={ items.filter(filter) }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggleItem } />
        <span class={ modifying: parent.modifying && modifying }>
          { name }
        </span>
      </label>
      <span class="button" onclick={ parent.editItem } >UPDATE</span>
      <span class="button" onclick={ parent.destroyItem } >DELETE</span>
    </li>
  </ul>

  <form if={ !modifying } onsubmit={ createItem }>
    <input name="input1" onkeyup={ changeText }>
    <button disabled={ !text }>Add #{ items.filter(filter).length + 1 }</button>
  </form>

  <form if={ modifying } onsubmit={ updateItem }>
    <input name="input2" onkeyup={ changeText }>
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

    changeText(e) {
      self.text = e.target.value
    }

    createItem(e) {
      if (self.text) {
        ds.createItem(self.text)
        self.text = self.input1.value = ''
      }
    }

    editItem(e) {
      if (self.modifying) {
        self.cancelModification()
      }
      else {
        self.targetItem = e.item
        self.modifying = true
        self.text = self.input2.value = e.item.name
        ds.setTarget(e.item)
        self.update()
      }
    }

    updateItem(e) {
      if (self.text) {
        ds.updateItem(self.targetItem, self.text)
        self.reset()
      }
    }

    cancelModification() {
      self.reset()
      self.update()
    }

    destroyItem(e) {
      self.reset()
      ds.deleteItem(e.item)
    }

    toggleItem(e) {
      ds.toggleItem(e.item)
      return true
    }

    reset() {
      self.modifying = false
      self.text = self.input1.value = self.input2.value = ''
    }

    filter(item) {
      return !item.hidden
    }
  </script>

</todo>
