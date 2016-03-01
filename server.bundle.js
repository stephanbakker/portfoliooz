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

	'use strict';

	var _nconf = __webpack_require__(1);

	var _nconf2 = _interopRequireDefault(_nconf);

	var _mongoose = __webpack_require__(2);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	__webpack_require__(4);

	var _config = __webpack_require__(5);

	var _config2 = _interopRequireDefault(_config);

	var _express3 = __webpack_require__(6);

	var _express4 = _interopRequireDefault(_express3);

	var _routes = __webpack_require__(8);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)(); // module dependencies

	var port = process.env.PORT || 3000;

	// install models


	_nconf2.default.env().file({ file: './config/env.json' });

	// decorate app


	// and call them
	(0, _express4.default)(app);
	(0, _routes2.default)(app);

	// start server
	connectDb().on('error', console.log).on('disconnected', connectDb).once('open', listen);

	function listen() {
	    app.listen(port);
	}

	function connectDb() {
	    // TODO find out about those
	    var options = {
	        server: {
	            sockeOptions: {
	                keepAlive: 1
	            }
	        }
	    };

	    // handle db
	    var mongoDBEnv = _nconf2.default.get('MONGOLAB_URI');
	    _config2.default.db = mongoDBEnv || _config2.default.db;
	    console.log('mongoURI', mongoDBEnv);

	    return _mongoose2.default.connect(_config2.default.db, options).connection;
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("nconf");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(2);

	var PageSchema = new mongoose.Schema({
	    title: { type: String, trim: true },
	    html: { type: String, trim: true },
	    type: { type: String, default: 'content' },
	    photoSetId: { type: String },
	    photosDate: { type: Number },
	    photos: { type: Array }
	});

	mongoose.model('Page', PageSchema);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nconf = __webpack_require__(1);

	module.exports = {
	    appName: 'portfoliooz',
	    db: 'mongodb://localhost/marit',
	    CONTENTS_URL: 'https://api.github.com/repos/stephanbakker/md-content/contents',
	    flickr_collection_id: '138616365-72157663941826382',
	    flickr_expire_time: 1000 * 60 * 60 * 24, // 24 hours

	    flickrOptions: {
	        permissions: 'write',
	        force_auth: true,

	        api_key: nconf.get('FLICKR_API_KEY'),
	        secret: nconf.get('FLICKR_API_SECRET'),
	        user_id: nconf.get('FLICKR_USER_ID'),
	        access_token: nconf.get('FLICKR_ACCESS_TOKEN'),
	        access_token_secret: nconf.get('FLICKR_ACCESS_TOKEN_SECRET')
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var express = __webpack_require__(3);
	var path = __webpack_require__(7);

	module.exports = function (app) {
	    app.use(express.static(path.join(__dirname, '../public')));
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "config"))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (app) {
	    app.get('*', _pagesMiddleware2.default, _router2.default);
	};

	var _router = __webpack_require__(9);

	var _router2 = _interopRequireDefault(_router);

	var _pagesMiddleware = __webpack_require__(20);

	var _pagesMiddleware2 = _interopRequireDefault(_pagesMiddleware);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(11);

	var _reactRouter = __webpack_require__(12);

	var _routes = __webpack_require__(13);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// and these to match the url to routes and then render

	exports.default = function (req, res, next) {

	    // match the routes to the url
	    (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {

	        // add pages from middleware
	        props.params.pages = req.pages;

	        if (props.params.page) {
	            props.params.pageContent = req.pages.find(function (page) {
	                return page.title === props.params.page;
	            });
	        }

	        // in here we can make some decisions all at once
	        if (err) {
	            // there was an error somewhere during route matching
	            res.status(500).send(err.message);
	        } else if (redirect) {
	            // we haven't talked about `onEnter` hooks on routes, but before a
	            // route is entered, it can redirect. Here we handle on the server.
	            res.redirect(redirect.pathname + redirect.search);
	        } else if (props && isPageOrHome(props.params.page, props.params.pageContent)) {

	            // if we got props then we matched a route and can render
	            var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	            res.send(renderPage(appHtml, props));
	        } else {
	            // no errors, no redirect, we just didn't match anything
	            res.status(404).send('Not Found');
	        }
	    });
	};
	// we'll use this to render our app to an html string


	function isPageOrHome(page, content) {
	    return page ? !!content : true;
	}

	function renderPage(appHtml, props) {
	    var scriptProps = JSON.stringify(props);
	    return '\n        <!doctype html>\n        <html>\n            <meta charset="utf-8"/>\n            <title>My First React Router App</title>\n            <link rel="stylesheet" href="/index.css"/>\n            <body>\n                <div id="app">' + appHtml + '</div>\n                <script>\n                    window.__initialProps__ = ' + scriptProps + ';\n                </script>\n                <script src="/bundle.js"></script>\n            </body>\n        </html>\n    ';
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(12);

	var _App = __webpack_require__(14);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(17);

	var _Home2 = _interopRequireDefault(_Home);

	var _Page = __webpack_require__(18);

	var _Page2 = _interopRequireDefault(_Page);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/:page', component: _Page2.default })
	); // modules/routes.js

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	var _NavBar = __webpack_require__(15);

	var _NavBar2 = _interopRequireDefault(_NavBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'App',
	    render: function render() {
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'h1',
	                null,
	                'Marit Dik'
	            ),
	            _react2.default.createElement(_NavBar2.default, { pages: this.props.params.pages }),
	            this.props.children
	        );
	    }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(16);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'NavBar',
	    render: function render() {
	        var pages = this.props.pages || window && window.__initialProps__.params.pages;

	        return _react2.default.createElement(
	            'ul',
	            null,
	            pages.map(function (page) {
	                return _react2.default.createElement(
	                    'li',
	                    { key: page.title },
	                    _react2.default.createElement(
	                        _NavLink2.default,
	                        { to: page.title },
	                        page.title
	                    )
	                );
	            })
	        );
	    }
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'NavLink',
	    render: function render() {
	        return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'active' }));
	    }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Home',
	  render: function render() {
	    return _react2.default.createElement(
	      'h2',
	      null,
	      'Home'
	    );
	  }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	var _Photos = __webpack_require__(19);

	var _Photos2 = _interopRequireDefault(_Photos);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'Page',
	    render: function render() {
	        var pageTitle = this.props.params.page;

	        var pagesData = this.props.params.pages || window.__initialProps__.params.pages;

	        var pageContent = pagesData.find(function (page) {
	            return page.title === pageTitle;
	        });

	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'h1',
	                null,
	                pageContent.title
	            ),
	            _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: pageContent.html } }),
	            _react2.default.createElement(
	                'div',
	                null,
	                pageContent.photos.length
	            ),
	            _react2.default.createElement(_Photos2.default, { photos: pageContent.photos })
	        );
	    }
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(10);

	module.exports = React.createClass({
	    displayName: 'exports',


	    render: function render() {
	        var results = this.props.photos.map(function (photo, index) {
	            return React.createElement(
	                'div',
	                { key: 'p' + index, className: 'photos__item' },
	                React.createElement('img', { src: photo.url_s })
	            );
	        });
	        return React.createElement(
	            'div',
	            { className: 'photos' },
	            results
	        );
	    }

	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mongoose = __webpack_require__(2);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _flickrUpdatePages = __webpack_require__(21);

	var _flickrUpdatePages2 = _interopRequireDefault(_flickrUpdatePages);

	var _config = __webpack_require__(5);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Page = _mongoose2.default.model('Page');
	exports.default = pages;


	function pages(req, res, next) {
	    promiseAllPages().then(function (pages) {
	        var pageTitle = req.params.page;

	        req.pages = pages;

	        if (pageTitle) {
	            req.page = pages.find(findPage.bind({ title: pageTitle }));
	        }

	        next();
	        return req.page;
	    }).then(checkExpiresPhotos).catch(function (err) {
	        next(err);
	    });
	}

	function promiseAllPages() {
	    return new Promise(function (resolve, reject) {
	        Page.find(function (err, pages) {
	            if (err) {
	                reject(err);
	            }
	            resolve(pages);
	        });
	    });
	}

	function findPage(pageObj) {
	    return pageObj.title === this.title;
	}

	function checkExpiresPhotos(pageObj) {
	    var savedDate = pageObj && pageObj.photosDate;
	    if (savedDate && Date.now() - savedDate > _config2.default.flickr_expire_time) {
	        (0, _flickrUpdatePages2.default)();
	    }
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(2);
	var Page = mongoose.model('Page');

	var config = __webpack_require__(5);
	var nconf = __webpack_require__(1);
	var Flickr = __webpack_require__(22);
	var flickrOptions = __webpack_require__(5).flickrOptions;

	var flickrUpdateSets = __webpack_require__(23);

	module.exports = update;

	function update() {
	    console.log('start updating pages from flickr');

	    pFlickrFetchCollectionTree().then(mapPages).then(function (sets) {
	        flickrUpdateSets(sets);
	        return sets;
	    }).then(function (photoSets) {
	        return Promise.all(photoSets.map(pMongoPhotoPageUpdate));
	    }).catch(function (err) {
	        throw new Error(err);
	    });
	}

	function pFlickrFetchCollectionTree() {
	    return new Promise(function (resolve, reject) {
	        Flickr.authenticate(flickrOptions, function (err, flickr) {
	            if (err) {
	                reject('Error authenticating in Flickr', err);
	            }

	            flickr.collections.getTree({
	                api_key: nconf.get('FLICKR_API_KEY'),
	                user_id: nconf.get('FLICKR_USER_ID'),
	                collection_id: config.flickr_collection_id
	            }, function (err, result) {
	                if (err) {
	                    reject(err);
	                }
	                resolve(result);
	            });
	        });
	    });
	}

	function pMongoPhotoPageUpdate(photoSet) {
	    return new Promise(function (resolve, reject) {
	        Page.findOneAndUpdate({ photoSetId: photoSet.id }, {
	            title: photoSet.title,
	            photosDate: photoSet.date,
	            type: 'photo'
	        }, { 'upsert': true, 'new': true }, function (err, set) {
	            if (err) {
	                reject(err);
	            }
	            resolve(set);
	        });
	    });
	}

	function mapPages(flickrData) {
	    var set = flickrData.collections.collection[0].set;
	    console.log('flickr set to update: ', set);

	    return set.map(function (set) {
	        return {
	            title: set.title,
	            id: set.id,
	            date: Date.now()
	        };
	    });
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("flickrapi");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nconf = __webpack_require__(1);
	var Flickr = __webpack_require__(22);
	var flickrOptions = __webpack_require__(5).flickrOptions;

	// db
	var mongoose = __webpack_require__(2);
	var Page = mongoose.model('Page');

	module.exports = updateSets;

	function updateSets(sets) {
	    console.log('start updating sets to DB');

	    pFlickrAuthenticate().then(function (flickr) {
	        var pFlickrGetSet = flickrGetSetPromise(flickr);
	        return Promise.all(sets.map(pFlickrGetSet));
	    }).then(function (promisedSets) {
	        console.log('found sets to update: ', promisedSets.map(function (set) {
	            return set.title;
	        }).join(', '));
	        return Promise.all(promisedSets.map(updateInDB));
	    }).then(function (updatedSets) {
	        console.log('updated in DB: ', updatedSets.map(function (set) {
	            return set.title;
	        }).join(', '));
	    }).catch(function (err) {
	        throw new Error(err);
	    });
	}

	function pFlickrAuthenticate() {
	    return new Promise(function (resolve, reject) {
	        Flickr.authenticate(flickrOptions, function (err, flickr) {
	            if (err) {
	                reject(err);
	            }

	            resolve(flickr);
	        });
	    });
	}

	function flickrGetSetPromise(flickr) {
	    return function (set) {
	        return new Promise(function (resolve, reject) {
	            flickr.photosets.getPhotos({
	                photoset_id: set.id,
	                api_key: nconf.get('FLICKR_API_KEY'),
	                user_id: nconf.get('FLICKR_USER_ID'),
	                extras: 'url_sq, url_t, url_s, url_m, url_o'
	            }, function (err, result) {
	                // TODO more fine grained err handling
	                // https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
	                if (err) {
	                    reject(err);
	                }
	                resolve(result.photoset);
	            });
	        });
	    };
	}

	function updateInDB(set) {
	    return new Promise(function (resolve, reject) {
	        Page.findOneAndUpdate({ photoSetId: set.id }, {
	            title: set.title,
	            photos: set.photo
	        }, { 'new': true }, function (err, doc) {
	            if (err) {
	                reject(err);
	            }
	            resolve(doc);
	        });
	    });
	}

	function mapPhotoSets(sets) {
	    return sets.map(function (set) {
	        var photoset = set.photoset;
	        return {
	            id: photoset.id,
	            name: photoset.title,
	            photos: photoset.photo
	        };
	    });
	}

/***/ }
/******/ ]);