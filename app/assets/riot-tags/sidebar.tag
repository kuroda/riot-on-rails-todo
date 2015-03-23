<sidebar>

  <h3>Sidebar ({ items.filter(filter).length })</h3>

  <ul>
    <li each={ items.filter(filter) }>{ name }</li>
  </ul>

  <script>
    var self = this
    var ds = opts.dataStore

    self.items = ds.items

    ds.on('update', function() { self.update() })

    filter(item) {
      return !item.hidden && !item.done
    }
  </script>

</sidebar>
