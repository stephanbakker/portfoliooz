/* eslint-env node, mocha */
const expect = require('chai').expect;

import {updateContentPagesFactory} from './update-pages.factory';

const getContentPages = success => {
  return () => {
    return success ?
      Promise.resolve({
        content: [{title: 'one'}, {title: 'two'}]
      }) :
      Promise.reject('meeh');
  };
};

const updatePages = (pages, type) => Promise.resolve(pages);

describe('updateContentPages', () => {
  let logResult = '';

  const logger = {
    log: data => {
      logResult = data;
    },
    warn: (...data) => {
      logResult = data.join(', ');
    }
  };

  it('should log list of update pages', done => {
    const updateContent = updateContentPagesFactory.bind(
                              null, getContentPages(true), updatePages, logger);

    updateContent()
      .then(() => {
        expect(logResult).to.contain('Pages updated from github: one, two');
        done();
      })
      .catch(done);
  });

  it('should log handle reject of update pages', done => {
    const updateContent = updateContentPagesFactory.bind(
                              null, getContentPages(false), updatePages, logger);

    updateContent()
      .then(() => {
        expect(logResult).to.equal('Error fetching pages from github, meeh');
        done();
      })
      .catch(done);
  });
});

