var CountStore = function CountStore(count) {
  this.count = count;
};

CountStore.prototype = $.extend(Observable, {
  increment: function() {
    this.count++;
    this.trigger('update');
  }
});
