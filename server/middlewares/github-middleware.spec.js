/* eslint-env node, mocha */
const expect = require('chai').expect;

import githubMiddleware from './github-middleware';

describe('github middleware', () => {
  it('should have added "githubUpdate: true" on "req"', () => {
    const reqMock = {
      get(header) {
        return this.headers[header];
      },
      headers: {
        'X-GitHub-Event': 'push'
      }
    };
    const nextMock = () => {
      expect(reqMock.githubUpdate).to.be.true;
    };

    githubMiddleware(reqMock, {}, nextMock);
  });

  it('should have added "githubUpdate: false"', () => {
    const reqMock = {
      get(header) {
        return this.headers[header];
      },
      headers: {
        'X-GitHub-Fake': 'fake'
      }
    };
    const nextMock = () => {
      expect(reqMock.githubUpdate).to.be.false;
    };

    githubMiddleware(reqMock, {}, nextMock);
  });
});
