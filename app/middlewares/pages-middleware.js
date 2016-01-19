'use strict';

const mongoose = require('mongoose');
const Page = mongoose.model('Page');

module.exports = {
    page: page
}

function page(req, res, next) {
    // add pages for creating navigation
    let contentPages = Page.find();

    let page = req.params.page;

    if (page) {
        let contentPage = contentPages.find(function (contentPage) {
            return contentPage.name === page;   
        });

        req.page = contentPage || undefined;
    }

    next();
};


