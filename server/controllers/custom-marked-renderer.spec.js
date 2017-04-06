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
  it('should have a target="_blank" added', () => {
    const link = marked('[text](http://marit.nl)');
    expect(link).to.equal('<p><a href="http://marit.nl" target="_blank">text</a></p>\n');
  });
});
