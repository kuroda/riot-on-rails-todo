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

  <!-- this script tag is optional -->
  <script>
    this.dataStore = opts.dataStore
    this.items = this.dataStore.items

    edit(e) {
      this.text = e.target.value
    }

    add(e) {
      if (this.text) {
        this.dataStore.addItem({ title: this.text })
        this.text = this.input.value = ''
        this.items = this.dataStore.items
        this.update()
      }
    }

    // an example how to filter items on the list
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
