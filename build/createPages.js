'use strict';

const fs = require('fs');
const request = require('request');
const markdown = require('markdown').markdown;

// config
const CONTENTS_URL = 'https://api.github.com/repos/stephanbakker/md-content/contents';

// add default request headers
function buildRequestOptions(url) {
    return {
        url: url,
        headers: {
            'User-Agent': 'portfoliooz'
        }
    }
}

// promise-ify request
function requestPromise(options) {
    return new Promise(
        function (resolve, reject) {
            request.get(options, function requestHandler(error, response, body) {
                if (error) {
                    return reject(err);
                } else {
                    resolve(body);
                }
            });
        });
}

requestPromise(buildRequestOptions(CONTENTS_URL))
    .then(getPages)
    .then(toHtml)
    .then(writeJson)
    .catch(function (err) {
        throw (err);
    });


function getPages(data) {
    // parse response body
    let jsonData = JSON.parse(data);

    let promises = jsonData.map(function (page) {
        return requestPromise(buildRequestOptions(page.download_url))
            .then(function (mdContent) {
                return {
                    name: page.name,
                    mdContent: mdContent
                }
            });
    });

    return Promise.all(promises);

}

function toHtml(pages) {
    return pages.map(function (page) {
        return {
            name: page.name,
            html: markdown.toHTML(page.mdContent)
        }
    });
}

function writeJson(pages) {
    return new Promise(function (resolve, reject) {
        fs.writeFile('./build/pages.json', JSON.stringify(pages), function writeFile(err) {
            if (err) {
                return reject(err);
            } else {
                resolve('saved');
            }
        });
    });
}

