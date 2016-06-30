/* eslint-env node, mocha */
const expect = require('chai').expect;

import {promiseAllPages} from './datastore-utils';

describe('datastore utils', () => {
    describe('promiseAllPages', () => {
        function storeStub() {
            return {
                getPages() {
                    return [{title: 1}, {title: 2}];
                }
            };
        }

        it('should return a promise', () => {
            const promise = promiseAllPages(storeStub);

            expect(promise).to.be.a('promise');

            promise.then(data => {
                expect(data).to.have.length(2);
                expect(data[0].title).to.eql(1);
            });
        });
    });
});
