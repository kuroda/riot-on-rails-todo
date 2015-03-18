<todo>

  <h3>{ opts.title }</h3>

  <ul>
    <li each={ items.filter(filter) }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.filter(filter).length + 1 }</button>
  </form>

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
        ds.addItem({ title: self.text })
        self.text = self.input.value = ''
      }
    }

    filter(item) {
      return !item.hidden
    }

    toggle(e) {
      var item = e.item
      item.done = !item.done
      return true
    }
  </script>

</todo>
