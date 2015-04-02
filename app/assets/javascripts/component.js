(function() {
  window.Component = {
    mount: function(id) {
      this.root = document.getElementById(id);
      this.init();
      this.forms = {};
      this.tree = this.render();
      this.rootNode = virtualDom.create(this.tree);
      this.root.appendChild(this.rootNode);
    },
    init: function() {},
    update: function() {
      serializeForms(this);
      var newTree = this.render();
      var patches = virtualDom.diff(this.tree, newTree);
      this.rootNode = virtualDom.patch(this.rootNode, patches);
      this.tree = newTree;
    }
  };

  // Convert form data to JavaScript objects and set them to `forms` attribute.
  function serializeForms(component) {
    component.forms = {};
    $(component.rootNode).find('form').each(function(i) {
      var obj = {};
      var ary = $(this).serializeArray();
      $.each(ary, function() {
        obj[this.name] = this.value || '';
      });
      if ($(this).attr('id')) {
        component.forms[$(this).attr('id')] = obj;
      }
    });
  }
})();
