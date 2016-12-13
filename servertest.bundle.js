/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(12);
	module.exports = __webpack_require__(15);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _datastoreUtils = __webpack_require__(2);

	/* eslint-env node, mocha */
	var expect = __webpack_require__(11).expect;

	describe('datastore utils', function () {
	  describe('promiseAllPages', function () {
	    function storeStub() {
	      return {
	        getPages: function getPages() {
	          return [{ title: 1 }, { title: 2 }];
	        }
	      };
	    }

	    it('should return a promise', function () {
	      var promise = (0, _datastoreUtils.promiseAllPages)(storeStub());

	      expect(promise).to.be.a('promise');

	      promise.then(function (data) {
	        expect(data).to.have.length(2);
	        expect(data[0].title).to.eql(1);
	      });
	    });
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.checkExpiresPhotos = exports.promiseAllPages = undefined;

	var _flickrUpdatePages = __webpack_require__(3);

	var _flickrUpdatePages2 = _interopRequireDefault(_flickrUpdatePages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = __webpack_require__(7);
	exports.promiseAllPages = promiseAllPages;
	exports.checkExpiresPhotos = checkExpiresPhotos;


	function promiseAllPages(datastore) {
	  return new Promise(function (resolve, reject) {
	    var pages = datastore.getPages();

	    if (pages) {
	      resolve(pages);
	    } else {
	      reject('no pages found');
	    }
	  });
	}

	function checkExpiresPhotos(datastore) {
	  var savedDate = datastore.getSaveDate('photo');
	  if (savedDate && Date.now() - savedDate > config.flickrExpireTime) {
	    (0, _flickrUpdatePages2.default)();
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _datastore = __webpack_require__(4);

	var _datastore2 = _interopRequireDefault(_datastore);

	var _flickrAuthenticate = __webpack_require__(5);

	var _flickrAuthenticate2 = _interopRequireDefault(_flickrAuthenticate);

	var _flickrUpdateSets = __webpack_require__(9);

	var _flickrUpdateSets2 = _interopRequireDefault(_flickrUpdateSets);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var nconf = __webpack_require__(8);

	exports.default = flickrUpdate;


	function flickrUpdate() {
	    console.log('start updating pages from flickr');

	    return (0, _flickrAuthenticate2.default)().then(pFlickrGetSetList).then(mapPages).then(_flickrUpdateSets2.default).then(function (photoSets) {
	        return _datastore2.default.updatePages(photoSets, 'photo');
	    });
	}

	function pFlickrGetSetList(flickr) {
	    return new Promise(function (resolve, reject) {
	        /* eslint-disable camelcase */
	        flickr.photosets.getList({
	            api_key: nconf.get('FLICKR_API_KEY'),
	            user_id: nconf.get('FLICKR_USER_ID'),
	            nojsoncallback: 1
	            /* eslint-enable camelcase */
	        }, function (err, result) {
	            if (err) {
	                reject('Error "flickr.photosets.getList": ' + err);
	            } else {
	                resolve(result);
	            }
	        });
	    });
	}

	function mapPages(flickrData) {
	    var sets = flickrData.photosets.photoset;

	    return sets.map(function (set) {
	        return {
	            title: set.title._content,
	            id: set.id,
	            date: Date.now()
	        };
	    });
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var datastore = datastoreFactory();

	exports.default = datastore;


	function datastoreFactory() {
	  var pages = {
	    content: [],
	    photo: [],
	    saveDate: {
	      content: null,
	      photo: null
	    }
	  };

	  function updatePages(newPages, type) {
	    pages[type] = newPages;
	    pages.saveDate[type] = Date.now();

	    return pages;
	  }

	  function getPages() {
	    return pages.photo.concat(pages.content);
	  }

	  function getSaveDate(type) {
	    return pages.saveDate[type];
	  }

	  return {
	    updatePages: updatePages,
	    getPages: getPages,
	    getSaveDate: getSaveDate
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Flickr = __webpack_require__(6);
	var flickrOptions = __webpack_require__(7).getFlickrOptions();

	exports.default = flickrAuthenticate;


	function flickrAuthenticate() {
	    return new Promise(function (resolve, reject) {
	        Flickr.authenticate(flickrOptions, function (err, flickr) {
	            if (err) {
	                reject('Error authenticating for Flickr', err);
	            } else {
	                resolve(flickr);
	            }
	        });
	    });
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("flickrapi");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nconf = __webpack_require__(8);

	module.exports = {
	    appName: 'portfoliooz',
	    CONTENTS_URL: 'https://api.github.com/repos/stephanbakker/md-content/contents',
	    flickrExpireTime: 1000 * 60 * 60 * 24, // 24 hours

	    getFlickrOptions: function getFlickrOptions() {
	        /* eslint-disable camelcase */
	        return {
	            permissions: 'write',
	            force_auth: true,
	            api_key: nconf.get('FLICKR_API_KEY'),
	            secret: nconf.get('FLICKR_API_SECRET'),
	            user_id: nconf.get('FLICKR_USER_ID'),
	            access_token: nconf.get('FLICKR_ACCESS_TOKEN'),
	            access_token_secret: nconf.get('FLICKR_ACCESS_TOKEN_SECRET')
	        };
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("nconf");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(10);

	var _flickrAuthenticate = __webpack_require__(5);

	var _flickrAuthenticate2 = _interopRequireDefault(_flickrAuthenticate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var nconf = __webpack_require__(8);

	exports.default = updateSets;


	function updateSets(sets) {
	    console.log('start updating sets to DB');

	    return (0, _flickrAuthenticate2.default)().then(function (flickr) {
	        console.log('flickr authenticated => get sets:');
	        return Promise.all(sets.map(function (set) {
	            return flickrGetSetPromise(flickr, set);
	        }));
	    }).then(function (sets) {
	        console.log('found sets to update: ', sets.map(function (set) {
	            return set.title;
	        }).join(', '));
	        return mapPhotoSets(sets);
	    });
	}

	function flickrGetSetPromise(flickr, set) {
	    return new Promise(function (resolve, reject) {
	        /* eslint-disable camelcase */
	        flickr.photosets.getPhotos({
	            photoset_id: set.id,
	            api_key: nconf.get('FLICKR_API_KEY'),
	            user_id: nconf.get('FLICKR_USER_ID'),
	            privacy_filter: 2, // friends, private is ignored somehow
	            extras: 'url_sq, url_t, url_s, url_m, url_o, url_l, tags',
	            nojsoncallback: 1
	            /* eslint-ensable camelcase */
	        }, function (err, result) {
	            // TODO more fine grained err handling
	            // https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
	            if (err) {
	                reject('Error fetching photoSet: ' + err);
	            } else {
	                console.log('set fetched', result.photoset.id);
	                resolve(result.photoset);
	            }
	        });
	    });
	}

	function mapPhotoSets(sets) {
	    return sets.map(function (photoset) {
	        return {
	            id: photoset.id,
	            title: (0, _util.titleToRoute)(photoset.title),
	            tags: photoset.tags,
	            photos: photoset.photo
	        };
	    });
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.titleToRoute = titleToRoute;


	function titleToRoute(title) {
	    return title.trim().replace(/\s/g, '-');
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _augmentPagedata = __webpack_require__(13);

	var _augmentPagedata2 = _interopRequireDefault(_augmentPagedata);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-env node, mocha */
	var expect = __webpack_require__(11).expect;
	var sinon = __webpack_require__(14);

	describe('augment pagedata', function () {
	    it('should call next once', function () {
	        var pages = [{ title: 'Title1' }, { title: 'Title2' }, { title: 'Title3' }];

	        var req = {
	            params: {
	                page: 'Title2'
	            }
	        };

	        var res = {};
	        var next = sinon.spy();

	        (0, _augmentPagedata2.default)(pages, req, res, next);

	        expect(next.calledOnce).to.equal(true);
	        expect(req.pages).to.equal(pages);
	        expect(req.page).to.deep.equal(pages[1]);
	    });
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (pages, req, res, next) {
	    var pageTitle = req.params.page;

	    req.pages = pages;

	    if (pageTitle) {
	        req.page = pages.find(function (page) {
	            return page.title === pageTitle;
	        });
	    }

	    next();
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("sinon");

/***/ },
/* 15 */
/***/ function(module, exports) {

	/* eslint-env node, mocha */
	// const expect = require('chai').expect;
	// const sinon = require('sinon');
	"use strict";

/***/ }
/******/ ]);