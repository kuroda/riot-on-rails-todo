<todo>

  <h3>{ opts.title } ({items.length}).</h3>

  <ul>
    <li each={ items.filter(filter) }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { name }
      </label>
      <span class="del-link" onclick={ parent.destroy } >DELETE</span>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.filter(filter).length + 1 }</button>
  </form>

  <style scoped>
    span.del-link {
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
