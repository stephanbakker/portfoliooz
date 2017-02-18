const nconf = require('nconf');

module.exports = {
  appName: 'portfoliooz',
  CONTENTS_URL: 'https://api.github.com/repos/maritdik/content/contents',
  flickrExpireTime: 1000 * 60 * 60 * 24, // 24 hours

  getFlickrOptions() {
    /* eslint-disable camelcase */
    return {
      permissions: 'write',
      force_auth: true,
      api_key: nconf.get('FLICKR_API_KEY'),
      secret: nconf.get('FLICKR_API_SECRET'),
      user_id: nconf.get('FLICKR_USER_ID'),
      access_token: nconf.get('FLICKR_ACCESS_TOKEN'),
      access_token_secret: nconf.get('FLICKR_ACCESS_TOKEN_SECRET')
    };
  }
};
