/* eslint-env node, mocha */
const expect = require('chai').expect;
const marked = require('marked');
const Renderer = require('./custom-marked-renderer');

marked.setOptions({
  renderer: new Renderer(),
  gfm: true,
  tables: true,
  sanitize: true
});

describe('custom renderer for link', () => {
  it('should have a target="_blank" added on http: link', () => {
    const link = marked('[text](http://marit.nl)');
    expect(link).to.equal('<p><a href="http://marit.nl" target="_blank">text</a></p>\n');
  });

  it('should have a target="_blank" added on https: link', () => {
    const link = marked('[text](https://marit.nl)');
    expect(link).to.equal('<p><a href="https://marit.nl" target="_blank">text</a></p>\n');
  });

  it('should not have a target="_blank" on internal links', () => {
    const link = marked('[text](#marit)');
    expect(link).to.equal('<p><a href="#marit">text</a></p>\n');
  });
});
