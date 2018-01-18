const expect = require('chai').expect;
const {
  createNonce,
  signData,
  signUrl,
  getParams,
  generateFlickrGetListUrl,
  generateFlickrGetPhotosUrl
} = require('./flickr-util');

describe('flickr util', () => {
  describe('nonce', () => {
    const { nonce, timestamp } = createNonce();
    it('should create nonce and timestamp', () => {
      expect(nonce.length).to.equal(32);
      expect(nonce).to.be.a('string');
      expect(timestamp).to.be.a('string');
      expect(Number(timestamp)).not.to.be.NaN;
    });
  });

  describe('signData', () => {
    it('should return encryptes/signed string from input', () => {
      const result = signData('data', 'some-key', 'some-secret');
      expect(result).to.be.a('string');
    });
  });

  describe('signUrl', () => {
    const options = {
      apiKey: 'abcd1234',
      method: 'GET',
      nonce: 'nonce-string',
      timestamp: '7483974839074',
      accessToken: 'access-token'
    };
    it('should return a parameterized url with signature', () => {
      const result = signUrl('http://some.base.url/api', options);
      expect(result).to.be.a('string');
      Object.keys(options)
        .forEach(key => {
          expect(result).to.include(options[key]);
        });
      expect(result).to.include('oauth_signature');
    });
  });

  describe('getParams', () => {
    it('should return query for url containing expected params', () => {
      const expectedParams = [
        'api_key', 'format=json', 'method', 'nojsoncallback=1', 'oauth_consumer_key=',
        'oauth_signature_method=HMAC-SHA1', 'oauth_nonce', 'oauth_signature',
        'oauth_token', 'user_id=142067970%40N07'
      ];
      const options = {
        apiKey: 'lalala',
        method: 'GET',
        nonce: 'feifeoifo',
        timestamp: '12345',
        accessToken: 'fefenifow;ngf'
      };

      const result = getParams(options);

      expectedParams.forEach(string => {
        expect(result).to.contain(string);
      });

      Object.keys(options).forEach(key => {
        expect(result).to.contain(options[key]);
      });
    });
  });

  describe('generateFlickrGetListUrl', () => {
    it('should return url for flickr.photosets.getList', () => {
      const method = 'flickr.photosets.getList';

      const result = generateFlickrGetListUrl();

      expect(result).to.contain(method);
    });
  });

  describe('generateFlickrGetPhotosUrl', () => {
    it('should return url for flickr.photosets.getPhotos', () => {
      const expectedParts = [
        'method=flickr.photosets.getPhotos',
        'photoset_id=1234',
        'privacy_filter=2',
        'extras=url_sq,url_t,url_s,url_m,url_o,url_l,tags,description'
      ];

      const result = generateFlickrGetPhotosUrl({id: '1234'});

      expectedParts.forEach(part => {
        expect(result).to.contain(part);
      });
    });
  });

});
