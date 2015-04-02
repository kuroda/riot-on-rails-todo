(function() {
  window.VdomBuilder = function VdomBuilder(component, formId) {
    this.component = component;
    this.formId = formId;
    this.h = virtualDom.h;
    this.elements = [];
  };

  window.VdomBuilder.prototype = {
    markup: function(tagName, arg1, arg2) {
      this.contentTag(tagName, arg1, arg2);
      return this.elements[0];
    },
    contentTag: function(tagName) {
      var attributes, content, callback, vb;

      if (typeof arguments[1] === 'string') {
        content = arguments[1];
        attributes = arguments[2] || {};
        attributes = filter(attributes);
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
          var vb = new VdomBuilder(this.component, this.formId);
          callback.call(vb);
          attributes = filter(attributes);
          this.elements.push(this.h(tagName, attributes, vb.elements));
        }
      }
    },
    tag: function(tagName, attributes) {
      attributes = filter(attributes);
      this.elements.push(this.h(tagName, attributes));
    },
    text: function(content) {
      this.elements.push(content);
    },
    space: function() {
      this.elements.push(' ');
    }
    form: function(id, attributes, callback) {
      var vb = new VdomBuilder(this.component, id);
      callback.call(vb);
      attributes = attributes || {};
      attributes['id'] = id;
      attributes = filter(attributes);
      if (attributes['onsubmit'] === undefined) {
        attributes['onsubmit'] = function(e) { return false };
      }
      this.elements.push(this.h('form', attributes, vb.elements));
    },
    input: function(attributes) {
      var form, name, value;
      attributes = attributes || {};
      name = attributes['name'];
      value = attributes['value'];
      attributes = filter(attributes);
      if (value === undefined && name !== undefined && this.formId !== undefined) {
        form = this.component.forms[this.formId];
        if (form !== undefined && form[name] !== undefined)
          attributes['value'] = form[name];
      }
      this.elements.push(this.h('input', attributes));
    },
    textField: function(name, attributes) {
      var self = this;
      attributes = attributes || {};
      attributes['type'] = 'text';
      attributes['name'] = name;
      if (attributes['onkeyup'] === undefined)
        attributes['onkeyup'] = function(e) { self.component.update() };
      this.input(attributes);
    },
    checkBox: function(name, checked, attributes) {
      attributes = attributes || {};
      attributes['type'] = 'checkbox';
      if (name) attributes['name'] = name;
      if (checked) attributes['checked'] = 'checked';
      this.input(attributes);
    },
    value: function(name) {
      var form;
      if (name !== undefined && this.formId !== undefined) {
        form = this.component.forms[this.formId];
        if (form !== undefined) return form[name];
      }
    }
  };

  function filter(attributes) {
    if ('visible' in attributes && !attributes['visible']) {
      attributes['style'] = attributes['style'] || {};
      attributes['style']['display'] = 'none';
    }
    if (typeof attributes['className'] === 'object') {
      var names = []
      for (var name in attributes['className']) {
        if (attributes['className'][name]) {
          names.push(name)
        }
      }
      if (names.length) {
        attributes['className'] = names.join(' ')
      }
      else {
        delete attributes['className'];
      }
    }
    return attributes;
  }

  var normalElementNames = [
    'a', 'abbr', 'address', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo',
    'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code',
    'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div',
    'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'html',
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
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'keygen',
    'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'
  ]

  for (var i = 0; i < voidElementNames.length; i++) {
    var tagName = voidElementNames[i];
    VdomBuilder.prototype[tagName] = new Function("attributes",
      "this.tag('" + tagName + "', attributes)");
  }
})();
