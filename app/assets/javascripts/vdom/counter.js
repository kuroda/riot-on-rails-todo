var Counter = function Counter() {};

Counter.prototype = $.extend({}, Component, {
  init: function() {
    var self = this,
        c = this.root.getAttribute("data-count");
    if (!isNaN(c)) c = 0;
    this.dataStore = new CountStore(c);
    this.dataStore.on('update', function() { self.refresh() });
  },

  render: function() {
    var self = this,
        ds = this.dataStore;
    return virtualDom.h('div', {
      onclick: function(ev) { ds.increment() },
      style: {
        textAlign: 'center',
        lineHeight: (100 + ds.count) + 'px',
        border: '1px solid red',
        width: (100 + ds.count) + 'px',
        height: (100 + ds.count) + 'px'
      }
    }, [String(ds.count)]);
  }
});
