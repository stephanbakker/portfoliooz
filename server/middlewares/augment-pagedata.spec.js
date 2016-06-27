const expect = require('chai').expect;
const sinon = require('sinon');

import augmentPageData from './augment-pagedata';

describe('augment pagedata', () => {
    it('should call next once', () => {
        const pages = [
            {title: 'Title1'},
            {title: 'Title2'},
            {title: 'Title3'}
        ];

        const req = {
            params: {
                page: 'Title2'
            }
        };

        const res = {};
        const next = sinon.spy();

        augmentPageData(pages, req, res, next);

        expect(next.calledOnce).to.be.true;
        expect(req.pages).to.equal(pages);
        expect(req.page).to.deep.equal(pages[1]);
    });
});
