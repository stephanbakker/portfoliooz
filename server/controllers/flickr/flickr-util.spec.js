const expect = require('chai').expect;
const {createNonce} = require('./flickr-util');

describe.only('nonce', () => {
  const {nonce, timestamp} = createNonce();
  it('should create nonce and timestamp', () => {
    expect(nonce.length).to.equal(32);
    expect(nonce).to.be.a('string');
    expect(timestamp).to.be.a('string');
  });
});
