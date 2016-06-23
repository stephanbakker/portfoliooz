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

	var _datastore = __webpack_require__(1);

	var _datastore2 = _interopRequireDefault(_datastore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// module dependencies
	var nconf = __webpack_require__(2);
	var express = __webpack_require__(3);

	// this is run from root, so needs './server'
	nconf.env().file({ file: './server/config/env.json' });

	// app parts
	var app = express();
	var port = process.env.PORT || 3000;
	__webpack_require__(4)(app);
	__webpack_require__(7)(app);

	// after conf stuff
	var startupContent = __webpack_require__(32);

	// pull in pages
	startupContent().then(listen).catch(function (err) {
	    throw new Error('Error starting up server', err);
	});

	function listen() {
	    app.listen(port, function () {
	        console.log('express server started on port: ', port);
	    });
	}

/***/ },
/* 1 */
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
	        return pages.content.concat(pages.photo);
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
/* 2 */
/***/ function(module, exports) {

	module.exports = require("nconf");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _errorMiddleware = __webpack_require__(5);

	var _errorMiddleware2 = _interopRequireDefault(_errorMiddleware);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var express = __webpack_require__(3);
	var path = __webpack_require__(6);

	module.exports = function (app) {
	    app.use(express.static(path.join(__dirname, '../../public')));
	    app.use(_errorMiddleware2.default);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "server/config"))

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (err, req, res, next) {
	    res.sendStatus(500);
	    res.render('error', { error: err });
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _router = __webpack_require__(8);

	var _router2 = _interopRequireDefault(_router);

	var _pagesMiddleware = __webpack_require__(21);

	var _pagesMiddleware2 = _interopRequireDefault(_pagesMiddleware);

	var _updateContentPages = __webpack_require__(29);

	var _updateContentPages2 = _interopRequireDefault(_updateContentPages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (app) {
	    app.get('*', _pagesMiddleware2.default, _router2.default);

	    app.post('/update-pages', _updateContentPages2.default);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(10);

	var _reactRouter = __webpack_require__(11);

	var _routes = __webpack_require__(12);

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
	    var pageTitle = (props.params.page || 'Home') + ' - Marit Dik';
	    return '\n        <!doctype html>\n        <html>\n            <meta charset="utf-8"/>\n            <title>' + pageTitle + '</title>\n            <meta name="viewport" content="width=device-width, initial-scale=1"/>\n            <link href=\'https://fonts.googleapis.com/css?family=Roboto+Slab\' rel=\'stylesheet\' type=\'text/css\'>\n            <link rel="stylesheet" href="/main.css"/>\n            <body>\n                <div id="app" class="app">' + appHtml + '</div>\n                <script>\n                    window.__initialProps__ = ' + scriptProps + ';\n                </script>\n                <script src="/bundle.js"></script>\n            </body>\n        </html>\n    ';
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(11);

	var _App = __webpack_require__(13);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(16);

	var _Home2 = _interopRequireDefault(_Home);

	var _Page = __webpack_require__(17);

	var _Page2 = _interopRequireDefault(_Page);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/:page', component: _Page2.default },
	    _react2.default.createElement(_reactRouter.Route, { path: '/:page/:photo', component: _Page2.default })
	  )
	); // modules/routes.js

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	var _NavBar = __webpack_require__(14);

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(15);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'NavBar',
	    render: function render() {
	        var pages = this.props.pages || window && window.__initialProps__.params.pages;

	        return _react2.default.createElement(
	            'nav',
	            null,
	            _react2.default.createElement(
	                'ul',
	                { className: 'nav' },
	                pages.map(function (page) {
	                    return _react2.default.createElement(
	                        'li',
	                        { className: 'nav__item', key: page.title },
	                        _react2.default.createElement(
	                            _NavLink2.default,
	                            { to: page.title },
	                            page.title
	                        )
	                    );
	                })
	            )
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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'NavLink',
	    render: function render() {
	        return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { className: 'nav__item__link', activeClassName: 'is-active' }));
	    }
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'Home',
	    componentDidMount: function componentDidMount() {
	        document.title = document.title.replace(/^[^-]*/, 'Home');
	    },
	    render: function render() {
	        return _react2.default.createElement(
	            'h2',
	            null,
	            'Home'
	        );
	    }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	var _Photos = __webpack_require__(18);

	var _Photos2 = _interopRequireDefault(_Photos);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'Page',
	    componentDidMount: function componentDidMount() {
	        document.title = document.title.replace(/^[^-]*/, this.props.params.page);
	    },
	    render: function render() {
	        var pageTitle = this.props.params.page;

	        var pagesData = this.props.params.pages || window.__initialProps__.params.pages;

	        var pageContent = pagesData.find(function (page) {
	            return page.title === pageTitle;
	        });

	        var photos = pageContent.photos && _react2.default.createElement(_Photos2.default, { photos: pageContent.photos, currentPage: this.props.params.page, currentPhoto: this.props.params.photo });

	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: pageContent.html } }),
	            photos
	        );
	    }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(11);

	var _Photo = __webpack_require__(19);

	var _Photo2 = _interopRequireDefault(_Photo);

	var _Tag = __webpack_require__(20);

	var _Tag2 = _interopRequireDefault(_Tag);

	var _Tags = __webpack_require__(34);

	var _Tags2 = _interopRequireDefault(_Tags);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createClass({
	    displayName: 'exports',
	    componentDidMount: function componentDidMount() {
	        document.title = document.title.replace(/^[^-]*/, this.props.currentPage);
	    },
	    getInitialState: function getInitialState() {
	        return {
	            activeIndex: -1,
	            tagIndex: 0,
	            currentTag: _Tags2.default.getTags(this.props.photos).shift()
	        };
	    },
	    render: function render() {
	        var _this = this;

	        var photos = this.state.currentTag ? this.props.photos.filter(function (photo) {
	            return filterTaggedPhotos(photo, _this.state.currentTag);
	        }) : this.props.photos;

	        var results = photos.map(function (photo, index) {
	            var key = 'p' + index;

	            return _react2.default.createElement(
	                'li',
	                { key: key, className: 'overview__item' },
	                _react2.default.createElement(_Photo2.default, { onClick: _this.toggle(index), data: photo, ref: 'photo' + index })
	            );
	        });

	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_Tags2.default, { photos: this.props.photos, update: this.updateTag, current: this.state.currentTag }),
	            _react2.default.createElement(
	                'ul',
	                { className: 'overview' },
	                results
	            )
	        );
	    },
	    toggle: function toggle(index) {
	        var _this2 = this;

	        return function (evt) {
	            var photo = _this2.refs['photo' + index];
	            if (_this2.state.activeIndex === index) {
	                photo.setState({ isActive: false });
	                _this2.setState({
	                    activeIndex: -1
	                });
	            } else {
	                photo.setState({ isActive: true });
	                _this2.setState({
	                    activeIndex: index
	                });
	            }
	        };
	    },
	    updateTag: function updateTag(tag) {
	        this.setState({
	            currentTag: this.state.currentTag !== tag ? tag : null
	        });
	    }
	});

	function filterTaggedPhotos(photo, tag) {
	    return _Tags2.default.getTagsFromPhoto(photo.tags).indexOf(tag) > -1;
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createClass({
	    displayName: 'exports',
	    getInitialState: function getInitialState() {
	        return {
	            isActive: false
	        };
	    },
	    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	        if (this.state.isActive) {
	            this.expand();
	        } else if (prevState.isActive) {
	            this.collapse();
	        }
	    },
	    render: function render() {
	        var _this = this;

	        var description = this.state.isActive ? _react2.default.createElement(
	            'p',
	            null,
	            this.props.data.title
	        ) : '';
	        var imgData = this.props.data;

	        return _react2.default.createElement(
	            'div',
	            { onClick: this.props.onClick,
	                ref: function ref(container) {
	                    return _this._container = container;
	                },
	                className: 'item__wrapper' },
	            _react2.default.createElement('img', { src: imgData.url_t, ref: function ref(thumb) {
	                    return _this.thumb = thumb;
	                } }),
	            _react2.default.createElement(
	                'div',
	                { className: 'toggleContainer', ref: function ref(toggleContainer) {
	                        return _this._toggleContainer = toggleContainer;
	                    } },
	                _react2.default.createElement(
	                    'span',
	                    null,
	                    _react2.default.createElement('img', { src: imgData.url_o, ref: function ref(zoomed) {
	                            return _this._zoomed = zoomed;
	                        } })
	                ),
	                description
	            )
	        );
	    },


	    // custom
	    expand: function expand() {
	        var item = this._container;
	        var toggleContainer = this._toggleContainer;

	        var startRects = this.startRects = item.getBoundingClientRect();

	        toggleContainer.classList.add('is-expanded');

	        var expandedRects = toggleContainer.getBoundingClientRect();

	        // make sure the zoomed image is not taking too much space
	        // leaving some padding, and space for description
	        this._zoomed.style.maxHeight = expandedRects.height - 100 + 'px';
	        this._zoomed.style.maxWidth = expandedRects.width - 100 + 'px';

	        toggleContainer.style.clip = 'rect(' + startRects.top + 'px, ' + startRects.right + 'px, ' + startRects.bottom + 'px, ' + startRects.left + 'px)';

	        // Read again to force the style change to take hold.
	        var triggerValue = toggleContainer.offsetTop;

	        toggleContainer.style.clip = 'rect(' + expandedRects.top + 'px, ' + expandedRects.right + 'px, ' + expandedRects.bottom + 'px, ' + expandedRects.left + 'px)';
	    },
	    collapse: function collapse() {
	        var toggleContainer = this._toggleContainer;
	        var startRects = this.startRects;

	        toggleContainer.style.clip = 'rect(' + startRects.top + 'px, ' + startRects.right + 'px, ' + startRects.bottom + 'px, ' + startRects.left + 'px)';

	        this._zoomed.classList.remove('zoom');

	        toggleContainer.addEventListener('transitionend', this.transitionCollapseEnd);
	    },
	    transitionCollapseEnd: function transitionCollapseEnd(evt) {
	        var toggleContainer = this._toggleContainer;

	        this.startRects = null;

	        toggleContainer.classList.remove('is-expanded');

	        toggleContainer.removeEventListener('transitionend', this.transitionCollapseEnd);
	    },
	    getImgStartTranslateValues: function getImgStartTranslateValues(startRects, endRects) {
	        return {
	            top: startRects.top - endRects.top,
	            left: startRects.left - endRects.left
	        };
	    }
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'Tag',
	    render: function render() {
	        var clName = (this.props.active ? 'active' : '') + ' tags__item__filter';
	        return _react2.default.createElement(
	            'button',
	            _extends({}, this.props, { className: clName }),
	            this.props.tag
	        );
	    }
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _datastore = __webpack_require__(1);

	var _datastore2 = _interopRequireDefault(_datastore);

	var _datastoreUtils = __webpack_require__(22);

	var _augmentPagedata = __webpack_require__(28);

	var _augmentPagedata2 = _interopRequireDefault(_augmentPagedata);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = pages;


	function pages(req, res, next) {
	    (0, _datastoreUtils.promiseAllPages)(_datastore2.default).then(function (pages) {
	        return (0, _augmentPagedata2.default)(pages, req, res, next);
	    }).then(function () {
	        return (0, _datastoreUtils.checkExpiresPhotos)(_datastore2.default);
	    }).catch(next);
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.checkExpiresPhotos = exports.promiseAllPages = undefined;

	var _flickrUpdatePages = __webpack_require__(23);

	var _flickrUpdatePages2 = _interopRequireDefault(_flickrUpdatePages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.promiseAllPages = promiseAllPages;
	exports.checkExpiresPhotos = checkExpiresPhotos;


	function promiseAllPages(datastore) {
	    return new Promise(function (resolve, reject) {
	        var pages = datastore.getPages();

	        if (pages) {
	            return resolve(pages);
	        } else {
	            reject('no pages found');
	        }
	    });
	}

	function checkExpiresPhotos(datastore) {
	    var savedDate = datastore.getSaveDate('photo');
	    if (savedDate && Date.now() - savedDate > config.flickr_expire_time) {
	        (0, _flickrUpdatePages2.default)();
	    }
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _datastore = __webpack_require__(1);

	var _datastore2 = _interopRequireDefault(_datastore);

	var _flickrAuthenticate = __webpack_require__(24);

	var _flickrAuthenticate2 = _interopRequireDefault(_flickrAuthenticate);

	var _flickrUpdateSets = __webpack_require__(27);

	var _flickrUpdateSets2 = _interopRequireDefault(_flickrUpdateSets);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var nconf = __webpack_require__(2);
	var config = __webpack_require__(26);

	exports.default = flickrUpdate;


	function flickrUpdate() {
	    console.log('start updating pages from flickr');

	    return (0, _flickrAuthenticate2.default)().then(pFlickrFetchCollectionTree).then(mapPages).then(_flickrUpdateSets2.default).then(function (photoSets) {
	        return _datastore2.default.updatePages(photoSets, 'photo');
	    }).catch(function (err) {
	        console.log('something wrong with flickrUpdate', err);
	        throw new Error(err);
	    });
	}

	function pFlickrFetchCollectionTree(flickr) {
	    return new Promise(function (resolve, reject) {
	        flickr.collections.getTree({
	            api_key: nconf.get('FLICKR_API_KEY'),
	            user_id: nconf.get('FLICKR_USER_ID'),
	            collection_id: config.flickr_collection_id
	        }, function (err, result) {
	            if (err) {
	                reject('Error fetching collection tree', err);
	            }
	            resolve(result);
	        });
	    });
	}

	function mapPages(flickrData) {
	    var set = flickrData.collections.collection[0].set;

	    return set.map(function (set) {
	        return {
	            title: set.title,
	            id: set.id,
	            date: Date.now()
	        };
	    });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Flickr = __webpack_require__(25);
	var flickrOptions = __webpack_require__(26).getFlickrOptions();

	exports.default = flickrAuthenticate;


	function flickrAuthenticate() {
	    return new Promise(function (resolve, reject) {
	        Flickr.authenticate(flickrOptions, function (err, flickr) {
	            if (err) {
	                reject('Error authenticating for Flickr', err);
	            }

	            resolve(flickr);
	        });
	    });
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("flickrapi");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nconf = __webpack_require__(2);

	module.exports = {
	    appName: 'portfoliooz',
	    CONTENTS_URL: 'https://api.github.com/repos/stephanbakker/md-content/contents',
	    flickr_collection_id: '138616365-72157663941826382',
	    flickr_expire_time: 1000 * 60 * 60 * 24, // 24 hours

	    getFlickrOptions: function getFlickrOptions() {
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _flickrAuthenticate = __webpack_require__(24);

	var _flickrAuthenticate2 = _interopRequireDefault(_flickrAuthenticate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var nconf = __webpack_require__(2);

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
	    }).catch(function (err) {
	        throw new Error(err);
	    });
	}

	function flickrGetSetPromise(flickr, set) {
	    return new Promise(function (resolve, reject) {
	        flickr.photosets.getPhotos({
	            photoset_id: set.id,
	            api_key: nconf.get('FLICKR_API_KEY'),
	            user_id: nconf.get('FLICKR_USER_ID'),
	            privacy_filter: 2, // friends, private is ignored somehow
	            extras: 'url_sq, url_t, url_s, url_m, url_o, tags'
	        }, function (err, result) {
	            // TODO more fine grained err handling
	            // https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
	            if (err) {
	                reject('Error fetching photoSet', err);
	            }
	            console.log('set fetched', result.photoset.id);
	            resolve(result.photoset);
	        });
	    });
	}

	function mapPhotoSets(sets) {
	    return sets.map(function (photoset) {
	        return {
	            id: photoset.id,
	            title: photoset.title,
	            tags: photoset.tags,
	            photos: photoset.photo
	        };
	    });
	}

/***/ },
/* 28 */
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
	            return page.title = pageTitle;
	        });
	    }

	    next();
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = getContentPages;
	var request = __webpack_require__(30);
	var markdown = __webpack_require__(31).markdown;
	var config = __webpack_require__(26);

	function getContentPages() {
	    return requestPromise(buildRequestOptions(config.CONTENTS_URL)).then(getPages).then(toHtml);
	}

	// add default request headers
	function buildRequestOptions(url) {
	    return {
	        url: url,
	        headers: {
	            'User-Agent': config.appName
	        }
	    };
	}

	// promise-ify request
	function requestPromise(options) {
	    console.info('starting content update');
	    return new Promise(function (resolve, reject) {
	        request.get(options, function (error, response, body) {
	            if (error) {
	                return reject(error);
	            } else {
	                resolve(body);
	            }
	        });
	    });
	}

	function getPages(data) {
	    // parse response body
	    var jsonData = JSON.parse(data);

	    var promises = jsonData.map(function (page) {
	        return requestPromise(buildRequestOptions(page.download_url)).then(function (mdContent) {
	            return {
	                title: stripExtension(page.name),
	                mdContent: mdContent
	            };
	        });
	    });

	    return Promise.all(promises);
	}

	function toHtml(pages) {
	    console.info('content fetched');
	    return pages.map(function (page) {
	        return {
	            title: page.title,
	            html: markdown.toHTML(page.mdContent)
	        };
	    });
	}

	function stripExtension(name) {
	    return name.split('.').shift();
	}

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("markdown");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _pages = __webpack_require__(33);

	var _pages2 = _interopRequireDefault(_pages);

	var _flickrUpdatePages = __webpack_require__(23);

	var _flickrUpdatePages2 = _interopRequireDefault(_flickrUpdatePages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	  return Promise.all([(0, _pages2.default)(), (0, _flickrUpdatePages2.default)()]);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _datastore = __webpack_require__(1);

	var _datastore2 = _interopRequireDefault(_datastore);

	var _updateContentPages = __webpack_require__(29);

	var _updateContentPages2 = _interopRequireDefault(_updateContentPages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = updatePages;


	function updatePages(req, res, next) {
	    return (0, _updateContentPages2.default)().then(function (pages) {
	        return _datastore2.default.updatePages(pages, 'content');
	    }).then(function (data) {
	        var updated = data.content.map(function (page) {
	            return page.title;
	        }).join(',');
	        if (res) {
	            res.end('Pages updated on request: %s', updated);
	        } else {
	            console.log('Pages updated: %s', updated);
	        }
	    }).catch(function (err) {
	        res && res.sendStatus(500, err);
	        console.log('Error updating pages (500)', err);
	    });
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	var _Tag = __webpack_require__(20);

	var _Tag2 = _interopRequireDefault(_Tag);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createClass({
	    displayName: 'exports',


	    statics: {
	        getTags: getTags,
	        getTagsFromPhoto: getTagsFromPhoto
	    },

	    render: function render() {
	        var _this = this;

	        var tags = getTags(this.props.photos).map(function (tag, index) {
	            var isCurrent = tag === _this.props.current;
	            return _react2.default.createElement(
	                'li',
	                { className: 'tags__item', key: 'tag' + index },
	                _react2.default.createElement(_Tag2.default, {
	                    onClick: _this.setFilter(tag),
	                    tag: tag,
	                    active: isCurrent })
	            );
	        });

	        return _react2.default.createElement(
	            'ul',
	            { className: 'tags' },
	            tags
	        );
	    },
	    setFilter: function setFilter(tag) {
	        var _this2 = this;

	        return function (evt) {
	            return _this2.props.update(tag);
	        };
	    }
	});

	function getTags(photos) {
	    return getUniqueTags(photos);
	}

	function getUniqueTags(photos) {
	    return photos.reduce(reduceTags, []).filter(uniq);
	}

	function reduceTags(acumulator, photo) {
	    return acumulator.concat(getTagsFromPhoto(photo.tags));
	}

	function getTagsFromPhoto(tags) {
	    return tags.split(' ').filter(function (tag) {
	        return tag !== '';
	    });
	}

	function uniq(item, index, array) {
	    return array.indexOf(item) === index;
	}

/***/ }
/******/ ]);