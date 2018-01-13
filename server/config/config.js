module.exports = {
  appName: 'portfoliooz',
  CONTENTS_URL: 'https://api.github.com/repos/maritdik/content/contents',
  CONTENTS_UPDATE_WAIT: 360 * 1000, // github new page updates after 300s
  flickrExpireTime: 1000 * 60 * 60, // 60 minutes

  getFlickrOptions() {
    return {
      baseUrl: 'https://api.flickr.com/services/rest',
      permissions: 'write',
      forceAuth: true, // TODO ? still needed
      apiKey: getEnv('FLICKR_API_KEY'),
      apiSecret: getEnv('FLICKR_API_SECRET'),
      userId: getEnv('FLICKR_USER_ID'),
      accessToken: getEnv('FLICKR_ACCESS_TOKEN'),
      accessTokenSecret: getEnv('FLICKR_ACCESS_TOKEN_SECRET')
    };
  }
};

function getEnv(key) {
  return process.env[key];
}
