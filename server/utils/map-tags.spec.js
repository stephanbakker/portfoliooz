import { mapTags } from './map-tags';

/* eslint-env node, mocha */
const expect = require('chai').expect;

describe('mapTags', () => {
  it('should replace "tm" to "-" in all tags', () => {

    const inputPhotos = [
      {tags: '2016 2018tm2020'},
      {tags: '200-200'},
      {tags: '2000tm2010 2017'}
    ];

    expect(mapTags(inputPhotos)[0].tags).to.equal('2016 2018-2020');
    expect(mapTags(inputPhotos)[1].tags).to.equal('200-200');
    expect(mapTags(inputPhotos)[2].tags).to.equal('2000-2010 2017');
  });
});
