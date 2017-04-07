const Renderer = require('marked').Renderer;

const CustomRenderer = function() {};

// all links from github content are external links, make them open new page
CustomRenderer.prototype = Object.create(Renderer.prototype, {
  link: {
    value(href, title, text) {
      let out = Renderer.prototype.link.call(this, href, title, text);
      out = out.replace(/^(<a href="https?:[^"]+")/, '$1 target="_blank"');
      return out;
    }
  }
});

module.exports = CustomRenderer;
