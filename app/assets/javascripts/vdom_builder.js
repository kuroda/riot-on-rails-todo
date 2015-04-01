var VdomBuilder = function VdomBuilder() {
  this.h = virtualDom.h;
  this.elements = [];
};

VdomBuilder.prototype = {
  markup: function(tagName, contentOrCallback, attributes) {
    this.contentTag(tagName, contentOrCallback, attributes);
    return this.elements[0];
  },
  contentTag: function(tagName, contentOrCallback, attributes) {
    if (typeof contentOrCallback === 'function') {
      var vb = new VdomBuilder();
      contentOrCallback.call(vb);
      this.elements.push(this.h(tagName, attributes, vb.elements));
    }
    else if (typeof contentOrCallback === 'string') {
      this.elements.push(this.h(tagName, attributes, contentOrCallback));
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
