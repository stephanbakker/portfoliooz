const request = require('request');
const marked = require('marked');
const CustomRenderer = require('./custom-marked-renderer');
const config = require('../config/config');
import {titleToRoute} from '../utils/util';

// markdown settings
marked.setOptions({
  renderer: new CustomRenderer(),
  gfm: true,
  tables: true,
  sanitize: true
});

export default function getContentPages() {
  return requestPromise(buildRequestOptions(config.CONTENTS_URL))
    .then(getPages)
    .then(toHtml);
}

// add default request headers
function buildRequestOptions(url) {
  return {
    url: url,
    headers: {
      'User-Agent': config.appName
    }
  };
}

// promise-ify request
function requestPromise(options) {
  console.info('starting content update');
  return new Promise((resolve, reject) => {
    request.get(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        let statusCode = response.statusCode;
        if (statusCode === 200) {
          console.log('response from github: ', statusCode);
          resolve(body);
        } else if (statusCode === 403) {
          console.warn('403: ', body);
          console.warn(
            'rate limit reset at:',
            new Date(response.headers['x-ratelimit-reset'] * 1000));

          reject('rate limit exceeded:' + statusCode);
          // X-RateLimit-Limit: 5000
          // X-RateLimit-Remaining: 4966
          // X-RateLimit-Reset
        } else {
          console.log('response code from github', statusCode);
          reject(body);
        }
      }
    });
  });
}

function getPages(data) {
  // parse response body
  let jsonData = JSON.parse(data);

  // validate jsonData
  if (jsonData.message) {
    return Promise.reject(jsonData);
  }

  let promises = jsonData.map(page => {
    return requestPromise(buildRequestOptions(page.download_url))
      .then(mdContent => {
        return {
          title: stripExtension(page.name),
          mdContent: mdContent
        };
      });
  });

  return Promise.all(promises);
}

function toHtml(pages) {
  console.info('content fetched');
  return pages.map(function(page) {
    return {
      title: titleToRoute(page.title),
      html: marked(page.mdContent)
    };
  });
}

function stripExtension(name) {
  return name.split('.').shift();
}
