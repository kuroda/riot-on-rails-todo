var Component = {
  mount: function(id) {
    this.root = document.getElementById(id);
    this.init();
    this.tree = this.render();
    this.rootNode = virtualDom.create(this.tree);
    this.root.appendChild(this.rootNode);
  },
  init: function() {},
  update: function() {
    var newTree = this.render(this.count);
    var patches = virtualDom.diff(this.tree, newTree);
    this.rootNode = virtualDom.patch(this.rootNode, patches);
    this.tree = newTree;
  }
};
