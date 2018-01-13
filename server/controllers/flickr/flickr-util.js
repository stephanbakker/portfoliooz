const crypto = require('crypto');
const config = require('../../config/config');

module.exports = {
  createNonce,
  signData,
  signUrl,
  getFormBaseString,
  getParams,
  generateUrl,
  titleToRoute,
  mapTags,
  parseTags,
  generateFlickrGetListUrl,
  generateFlickrGetPhotosUrl
};

function createNonce() {
  const timestamp = String(Date.now());
  const md5 = crypto.createHash('md5').update(timestamp).digest("hex");
  const nonce = md5.substring(0, 32);
  return {
    nonce, timestamp
  };
}

// HMAC-SHA1 data signing
function signData(data, key, secret) {
  const hmacKey = key + "&" + (secret ? secret : '');
  const hmac = crypto.createHmac("SHA1", hmacKey);
  hmac.update(data);
  const digest = hmac.digest("base64");
  return encodeURIComponent(digest);
}

function signUrl(baseUrl, options) {
  const params = getParams(options);
  const data = getFormBaseString('GET', baseUrl, params);
  const oauthSignature =
    signData(data, options.apiSecret, options.accesstokenSecret);

  return `${baseUrl}?${params}&oauth_signature=${oauthSignature}`;
}

function getFormBaseString(verb, url, queryString) {
  return [
    verb,
    encodeURIComponent(url),
    encodeURIComponent(queryString)
  ].join("&");
}

function getParams(options) {
  return [
    `api_key=${options.apiKey}`,
    'format=json',
    `method=${options.method}`,
    'nojsoncallback=1',
    `oauth_consumer_key=${options.apiKey}`,
    `oauth_nonce=${options.nonce}`,
    'oauth_signature_method=HMAC-SHA1',
    `oauth_timestamp=${options.timestamp}`,
    `oauth_token=${options.accessToken}`,
    `user_id=142067970%40N07`
    // '&oauth_version=1.0',
  ].join('&');
}

function generateUrl(options) {
  const expandedOptions = Object.assign(
    {}, options, createNonce()
  );

  return signUrl(options.baseUrl, expandedOptions);
}

function titleToRoute(title) {
  return title.trim().replace(/\s/g, '-');
}

function mapTags(photos) {
  return photos.map(photo => {
    if (photo.tags !== '') {
      photo.tags = parseTags(photo.tags);
    }
    return photo;
  });
}

function parseTags(tagString) {
  return tagString.replace(/tm/g, '-');
}

function generateFlickrGetListUrl() {
  const flickrOptions = config.getFlickrOptions();

  const options = Object.assign({}, flickrOptions, {
    method: 'flickr.photosets.getList'
  });

  return generateUrl(options);
}

function generateFlickrGetPhotosUrl(set) {
  const flickrOptions = config.getFlickrOptions();

  const options = Object.assign({}, flickrOptions, {
    method: 'flickr.photosets.getPhotos'
  });

  const extraParams = [
    `photoset_id=${set.id}`,
    'privacy_filter=2', // friends, private is ignored somehow
    'extras=url_sq,url_t,url_s,url_m,url_o,url_l,tags,description'
  ].join('&');

  const url = generateUrl(options);

  return `${url}&${extraParams}`;
}
