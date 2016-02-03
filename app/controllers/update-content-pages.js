'use strict';

const request = require('request');
const markdown = require('markdown').markdown;
const config = require('../../config/config');

module.exports = function () {
    return requestPromise(buildRequestOptions(config.CONTENTS_URL))
        .then(getPages)
        .then(toHtml)
};

// add default request headers
function buildRequestOptions(url) {
    return {
        url: url,
        headers: {
            'User-Agent': config.appName
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

function getPages(data) {
    // parse response body
    let jsonData = JSON.parse(data);

    let promises = jsonData.map(function (page) {
        return requestPromise(buildRequestOptions(page.download_url))
            .then(function (mdContent) {
                return {
                    name: stripExtension(page.name),
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

function stripExtension(name) {
    return name.split('.').shift();
}
