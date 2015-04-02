var VdomBuilder = function VdomBuilder() {
  this.h = virtualDom.h;
  this.elements = [];
};

VdomBuilder.prototype = {
  markup: function(tagName, arg1, arg2) {
    this.contentTag(tagName, arg1, arg2);
    return this.elements[0];
  },
  contentTag: function(tagName) {
    var attributes, content, callback, vb;

    if (typeof arguments[1] === 'string') {
      content = arguments[1];
      attributes = arguments[2] || {};
      this.elements.push(this.h(tagName, attributes, content));
    }
    else {
      if (typeof arguments[1] === 'object') {
        attributes = arguments[1];
        callback = arguments[2];
      }
      else {
        attributes = {};
        callback = arguments[1];
      }
      if (typeof callback === 'function') {
        var vb = new VdomBuilder();
        callback.call(vb);
        this.elements.push(this.h(tagName, attributes, vb.elements));
      }
    }
  },
  tag: function(tagName, attributes) {
    this.elements.push(this.h(tagName, attributes));
  },
  text: function(content) {
    this.elements.push(content);
  }
};

(function() {
  var normalElementNames = [
    'a', 'abbr', 'address', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo',
    'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code',
    'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div',
    'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer',
    'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'html',
    'i', 'iframe', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark',
    'menu', 'menuitem', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup',
    'option', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's',
    'samp', 'script', 'section', 'select', 'small', 'span', 'strong', 'style',
    'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot',
    'th', 'thead', 'time', 'title', 'tr', 'u', 'ul', 'var', 'video' ];

  for (var i = 0; i < normalElementNames.length; i++) {
    var tagName = normalElementNames[i];
    VdomBuilder.prototype[tagName] = new Function("contentOrCallback", "attributes",
      "this.contentTag('" + tagName + "', contentOrCallback, attributes)");
  }

  var voidElementNames = [
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen',
    'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'
  ]

  for (var i = 0; i < voidElementNames.length; i++) {
    var tagName = voidElementNames[i];
    VdomBuilder.prototype[tagName] = new Function("attributes",
      "this.tag('" + tagName + "', attributes)");
  }
})();
