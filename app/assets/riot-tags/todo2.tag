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
    this.items = opts.dataStore.items.slice(0)
    self = this
    opts.dataStore.on('update', function() {
      self.items = opts.dataStore.items.slice(0)
      self.update()
    })

    edit(e) {
      this.text = e.target.value
    }

    add(e) {
      if (this.text) {
        opts.dataStore.addItem({ title: this.text })
        this.text = this.input.value = ''
      }
    }
  </script>

</todo2>
