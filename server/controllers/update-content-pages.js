'use strict';

const request = require('request');
const marked = require('marked');
const config = require('../config/config');
import {titleToRoute} from '../utils/util';

// markdown settings
marked.setOptions({
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
  return new Promise(
    (resolve, reject) => {
      request.get(options, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
}

function getPages(data) {
  // parse response body
  let jsonData = JSON.parse(data);

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
