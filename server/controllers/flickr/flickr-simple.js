const crypto = require('crypto');

module.exports = {
  createNonce, createNonce2, authenticate
};

function createNonce() {
  const timestamp = String(Date.now());
  const md5 = crypto.createHash('md5').update(timestamp).digest("hex");
  const nonce = md5.substring(0, 32);
  return nonce;
}

function createNonce2() {
  return crypto.pseudoRandomBytes(32).toString('base64');
}

const secret = {
  "FLICKR_API_KEY": "442507664bb0b7b21e70a8e2a48eeabf",
  "FLICKR_API_SECRET": "8712919a761e847a",
  "FLICKR_USER_ID": "142067970@N07",
  "FLICKR_ACCESS_TOKEN": "72157674940293375-fb0fc2117e10bea6",
  "FLICKR_ACCESS_TOKEN_SECRET": "d8032481951b77ea"
}

function authenticate(options) {
  const url = createUrl({
    nonce: createNonce(),
    timeStamp: String(Date.now()),
    consumerKey: secret.FLICKR_API_KEY,
    accessToken: secret.FLICKR_ACCESS_TOKEN,
    oauthSignature: sign(data, secret.FLICKR_API_KEY, secret.FLICKR_API_SECRET)
  });
}

function createUrl(options) {
  return ['https://api.flickr.com/services/rest',
          `?nojsoncallback=1 &oauth_nonce=${options.nonce}`,
          '&format=json',
          `&oauth_consumer_key=${options.consumerKey}`,
          `&oauth_timestamp=${options.timestamp}`,
          '&oauth_signature_method=HMAC-SHA1',
          '&oauth_version=1.0',
          `&oauth_token=${options.accessToken}`,
          `&oauth_signature=${options.oauthSignature}`,
          '&method=flickr.test.login'].join('');
}

/**
 * HMAC-SHA1 data signing
 */
function sign(data, key, secret) {
  const hmacKey = key + "&" + (secret ? secret : '');
  const hmac = crypto.createHmac("SHA1", hmacKey);
  hmac.update(data);
  const digest = hmac.digest("base64");
  return encodeURIComponent(digest);
}
