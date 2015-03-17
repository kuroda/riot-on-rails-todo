<todo2>

  <h3>{ opts.title }</h3>

  <ul>
    <li each={ items }>
      { title }
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.length + 1 }</button>
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
  </script>

</todo2>
