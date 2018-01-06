const expect = require('chai').expect;
const {createNonce, createNonce2} = require('./flickr-simple');

describe.only('nonce', () => {
  it('should create nonce', () => {
    expect(createNonce()).to.equal(createNonce2());
  })
});

