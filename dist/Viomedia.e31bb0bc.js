// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@babel/runtime/helpers/classCallCheck.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],"node_modules/@babel/runtime/helpers/createClass.js":[function(require,module,exports) {
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],"src/js/Model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model =
/*#__PURE__*/
function () {
  function Model() {
    (0, _classCallCheck2.default)(this, Model);
    this.data = [];
    this.info = [];
    this.error = false;
  }

  (0, _createClass2.default)(Model, [{
    key: "bindModelChanged",
    value: function bindModelChanged(callback) {
      this.onModelChanged = callback;
    }
  }, {
    key: "bindInfoChanged",
    value: function bindInfoChanged(callback) {
      this.onInfoChanged = callback;
    }
  }, {
    key: "changeModel",
    value: function changeModel(url) {
      var _this = this;

      this.getData(url).then(function (data) {
        if (!_this.error) {
          _this.data = data;
          _this.errror = false;
          _this.prevUrl = url;
        }

        _this.onModelChanged(data);
      });
    }
  }, {
    key: "changeInfo",
    value: function changeInfo(url) {
      var _this2 = this;

      this.getData(url).then(function (data) {
        if (!_this2.error) {
          _this2.info = data;
          _this2.errror = false;
        }

        _this2.onInfoChanged(data);
      });
    }
  }, {
    key: "getData",
    value: function getData(url) {
      var _this3 = this;

      var api_key = '1bfc8daa39d0d2a75494316589ddaa56e6116c7f0a60d1d3f3617d6807a78314';
      return fetch("https://api.unsplash.com/".concat(url), {
        headers: {
          'Authorization': 'Client-ID ' + api_key
        }
      }).then(function (response) {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      }).then(function (jsondata) {
        return jsondata;
      }).catch(function (error) {
        _this3.error = true;
        return {
          error: error
        };
      });
    }
  }]);
  return Model;
}();

var _default = Model;
exports.default = _default;
},{"@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js"}],"node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":[function(require,module,exports) {
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;
},{}],"node_modules/@babel/runtime/helpers/iterableToArray.js":[function(require,module,exports) {
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;
},{}],"node_modules/@babel/runtime/helpers/nonIterableSpread.js":[function(require,module,exports) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;
},{}],"node_modules/@babel/runtime/helpers/toConsumableArray.js":[function(require,module,exports) {
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":"node_modules/@babel/runtime/helpers/arrayWithoutHoles.js","./iterableToArray":"node_modules/@babel/runtime/helpers/iterableToArray.js","./nonIterableSpread":"node_modules/@babel/runtime/helpers/nonIterableSpread.js"}],"src/js/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var config = {
  COLLECTION_PER_PAGE: 100,
  PHOTOS_PER_PAGE: 12
};
exports.config = config;
},{}],"src/js/Views/Photo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Photo = function Photo(data) {
  var alt_description = data.alt_description,
      description = data.description,
      _data$likes = data.likes,
      likes = _data$likes === void 0 ? 0 : _data$likes,
      location = data.location,
      urls = data.urls,
      tags = data.tags;
  var descriptionElem = description ? "<h1 class='photo__description'>".concat(description, "</h1>") : '';
  var altDescriptionElem = alt_description ? "<p class='photo__alt-desription'>".concat(alt_description, "</p>") : '';
  var cityInfo = location.city ? "<div class='photo__city'>".concat(location.city, "</div>") : '';
  var tagsList = '';
  tags.forEach(function (tag) {
    tagsList += "\n      <li class='tag'>".concat(tag.title, "</li>\n    ");
  });
  return "<div class='photo'>\n      ".concat(descriptionElem, "\n      <div class='photo__likes'>Likes: ").concat(likes, "</div>\n      <div class='photo__wrap'>\n        <img alt='").concat(alt_description || "photo", "' src=").concat(urls.small, " class='photo__img'>\n      </div>\n      ").concat(altDescriptionElem, "\n\n      ").concat(cityInfo, "\n      <ul class='photo__tags'>Tags: ").concat(tagsList, "</ul>      \n    </div>");
};

var _default = Photo;
exports.default = _default;
},{}],"src/js/Views/Collection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Collection = function Collection(data, title, pagination) {
  var list = '';
  data.forEach(function (photo) {
    var id = photo.id,
        color = photo.color,
        description = photo.description,
        urls = photo.urls;
    var li = "<li class='collection__item' style='background-color: ".concat(color, "'>\n      <a class='collection__link js-select-photo' href=", "photos/".concat(id), " ").concat(description ? 'title=' + description : '', ">\n        <img class='collection__photo' alt='").concat(description || "photo", "' src=").concat(urls.thumb, ">\n      </a>      \n    </li>");
    list += li;
  });
  return "<h1 class='title'>Collection ".concat(title, "</h1>\n    <ul class='collection js-collection'>\n      ").concat(list, "\n    </ul>\n    ").concat(pagination);
};

var _default = Collection;
exports.default = _default;
},{}],"src/js/Views/CollectionsList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var CollectionsList = function CollectionsList(data) {
  var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var list = '';
  data.forEach(function (collection) {
    var id = collection.id,
        title = collection.title,
        total_photos = collection.total_photos;
    var li = "<li class='collections-list__item'>\n      <a class='collections-list__link js-select-collection'\n        href=".concat("/collections/".concat(id, "/photos"), "\n        data-title=", title, "\n        data-count=").concat(total_photos, "\n      >\n        ").concat(title, " <span class='collections-list__count'>(").concat(total_photos, ")</span>\n      </a>      \n    </li>");
    list += li;
  });
  return "<div class='collections'>\n        <h1 class='title'>Collections list</h1>\n        <ul class='collections-list js-collections-list'>\n          ".concat(list, "\n        </ul>\n        ").concat(pagination, "\n    </div>");
};

var _default = CollectionsList;
exports.default = _default;
},{}],"src/js/Views/Pagination.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Pagination = function Pagination(count, currentPage, perPage) {
  var totalPages = Math.ceil(+count / +perPage);
  var prevDisabled,
      nextDisabled = '';
  var prevPage, nextPage;
  var current = +currentPage; // first page

  if (current === 1) {
    prevDisabled = 'disabled';
    prevPage = 1;
    nextPage = 2;
  } else if (current === totalPages) {
    // last page
    nextDisabled = 'disabled';
    nextPage = totalPages;
    prevPage = current - 1;
  } else {
    nextPage = current + 1;
    prevPage = current - 1;
  }

  return "<div class='pagination'>\n      <span class='pagination__info'>page ".concat(current, " of ").concat(totalPages, "</span>\n      <button class='btn pagination__btn' ").concat(prevDisabled, " data-page='").concat(prevPage, "'>Previous ").concat(perPage, "</button>      \n      <button class='btn pagination__btn' ").concat(nextDisabled, " data-page='").concat(nextPage, "'>Next ").concat(perPage, "</button>\n    </div>\n  ");
};

var _default = Pagination;
exports.default = _default;
},{}],"src/js/Views/Breadcrumbs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Breadcrumbs = function Breadcrumbs(href, title) {
  var collectionLink = href ? "<a class='breadcrumbs__link' href='".concat(href, "'>Collection ").concat(title, "</a>") : '';
  return "<nav class='breadcrumbs'>\n      <a class='breadcrumbs__link' href='/collections?per_page=100'>Collections</a>\n      ".concat(collectionLink, "\n    </nav>");
};

var _default = Breadcrumbs;
exports.default = _default;
},{}],"src/js/View.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _helpers = require("./helpers");

var _Photo = _interopRequireDefault(require("./Views/Photo"));

var _Collection = _interopRequireDefault(require("./Views/Collection"));

var _CollectionsList = _interopRequireDefault(require("./Views/CollectionsList"));

var _Pagination = _interopRequireDefault(require("./Views/Pagination"));

var _Breadcrumbs = _interopRequireDefault(require("./Views/Breadcrumbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  path: 'collections',
  template: 'collectionsList'
}, {
  path: 'collections/:id/photos',
  template: 'collection'
}, {
  path: 'collections/:id/photos/:id',
  template: 'photo'
}];

var View =
/*#__PURE__*/
function () {
  function View() {
    var _this = this;

    (0, _classCallCheck2.default)(this, View);

    this._selectCollection = function (e) {
      e.preventDefault();
      var target = e.target;
      var link = target.closest('.js-select-collection');

      if (link) {
        _this.title = link.dataset.title || '';
        _this.photosCount = link.dataset.count;
        var url = "".concat(link.getAttribute('href'), "?page=").concat(_this.currentPage, "&per_page=").concat(_helpers.config.PHOTOS_PER_PAGE);

        _this.changeRoute(url);
      }
    };

    this._selectPhoto = function (e) {
      e.preventDefault();
      var target = e.target;
      var link = target.closest('.js-select-photo');

      if (link) {
        _this.breadcrumbs.innerHTML = (0, _Breadcrumbs.default)(history.state.url, _this.title);

        _this.changeRoute(link.getAttribute('href'));
      }
    };

    this._paginateCollection = function (e) {
      e.preventDefault();
      var target = e.target;
      var gotoPage = target.dataset.page;
      _this.currentPage = gotoPage;
      var url = "".concat(location.pathname, "?page=").concat(gotoPage, "&per_page=").concat(_helpers.config.PHOTOS_PER_PAGE);

      _this.changeRoute(url);
    };

    this._breadcrumbsNavigation = function (e) {
      e.preventDefault();
      var target = e.target;

      if (target.tagName === 'A') {
        _this.changeRoute(target.getAttribute('href'));
      }
    };

    this.app = this.getElement('#root');
    this.container = this.createElement('section', ['container']);
    this.displayWrapper = this.createElement('div', ['wrapper']);
    this.breadcrumbs = this.createElement('nav', ['breadcrumbs']);
    this.paginationBtns = '';
    this.collectionsList = '';
    this.collection = '';
    this.photo = '';
    this.title = '';
    this.photosCount = '';
    this.currentPage = 1;
  }

  (0, _createClass2.default)(View, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.app.append(this.container);
      this.container.append(this.displayWrapper);
      this.container.prepend(this.breadcrumbs);
      this.breadcrumbs.addEventListener('click', this._breadcrumbsNavigation);
      this.initRender();
      window.addEventListener('popstate', function (e) {
        _this2.changeRoute(document.location.pathname + document.location.search, false);
      });
    }
  }, {
    key: "bindInitCollectionInfo",
    value: function bindInitCollectionInfo(callback) {
      this.getInformation = callback;
    }
  }, {
    key: "bindRouteChange",
    value: function bindRouteChange(callback) {
      this.onChangedRoute = callback;
    }
  }, {
    key: "setInfo",
    value: function setInfo(data) {
      var title = data.title,
          total_photos = data.total_photos;
      this.title = title;
      this.photosCount = total_photos;
    }
  }, {
    key: "initRender",
    value: function initRender() {
      var initPath = document.location.pathname !== '/' ? document.location.pathname + document.location.search : '/collections?per_page=100';

      var currentRoute = this._matchUrlToRoute();

      if (currentRoute.template === 'collection' && this.title === '' && this.photosCount === '') {
        var id = initPath.split('/')[2];
        this.getInformation("/collections/".concat(id));
      }

      this.changeRoute(initPath);
    }
  }, {
    key: "changeRoute",
    value: function changeRoute(url) {
      var updateState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.onChangedRoute(url);
      if (updateState) history.pushState({
        url: url
      }, '', url);
      this.displayWrapper.classList.add('loading');
    }
  }, {
    key: "_matchUrlToRoute",
    value: function _matchUrlToRoute() {
      var currentUrl = window.location.pathname.slice(1).toLowerCase() || '/';
      var segmentsUrl = currentUrl.split('/');
      var matchedRoute = routes.find(function (route) {
        var routePathSegments = route.path.split('/');

        if (routePathSegments.length !== segmentsUrl.length) {
          return false;
        }

        var match = routePathSegments.every(function (routePathSegment, i) {
          return routePathSegment === segmentsUrl[i] || routePathSegment[0] === ':';
        });
        return match;
      });
      return matchedRoute;
    }
  }, {
    key: "renderView",
    value: function renderView(data) {
      if (data.error) {
        this._displayError(data.error);
      }

      this.displayWrapper.classList.remove('loading');

      var currentRoute = this._matchUrlToRoute();

      var currentTemplate = '';

      if (currentRoute) {
        currentTemplate = currentRoute.template;
      }

      switch (currentTemplate) {
        case 'collectionsList':
          this._displayCollections(data);

          break;

        case 'collection':
          this._displayCollection(data);

          break;

        case 'photo':
          this._displayPhoto(data);

          break;

        default:
          this._displayError();

      }
    }
  }, {
    key: "getElement",
    value: function getElement(selector) {
      var element = document.querySelector(selector);
      return element;
    }
  }, {
    key: "createElement",
    value: function createElement(tag, classNames) {
      var _element$classList;

      var element = document.createElement(tag);
      if (classNames) (_element$classList = element.classList).add.apply(_element$classList, (0, _toConsumableArray2.default)(classNames));
      return element;
    }
  }, {
    key: "_displayCollections",
    value: function _displayCollections(data) {
      if (this.collectionList) this.collectionList.removeEventListener('click', this._selectPhoto);
      if (this.collectionsList) this.collectionsList.removeEventListener('click', this._selectCollection);
      this.currentPage = 1;
      var collections = (0, _CollectionsList.default)(data);
      this.displayWrapper.innerHTML = collections;
      this.collectionsList = this.getElement('.js-collections-list');
      this.collectionsList.addEventListener('click', this._selectCollection);
    }
  }, {
    key: "_displayCollection",
    value: function _displayCollection(data) {
      var _this3 = this;

      if (this.collectionsList) this.collectionsList.removeEventListener('click', this._selectCollection);
      this.breadcrumbs.innerHTML = (0, _Breadcrumbs.default)();
      var pagination = this.photosCount > _helpers.config.PHOTOS_PER_PAGE ? (0, _Pagination.default)(this.photosCount, this.currentPage, _helpers.config.PHOTOS_PER_PAGE) : '';
      this.displayWrapper.innerHTML = (0, _Collection.default)(data, this.title, pagination);
      this.collectionList = this.getElement('.js-collection');
      this.collectionList.addEventListener('click', this._selectPhoto);
      this.paginationBtns = document.querySelectorAll('.btn[data-page]');
      this.paginationBtns.forEach(function (btn) {
        btn.addEventListener('click', _this3._paginateCollection);
      });
    }
  }, {
    key: "_displayPhoto",
    value: function _displayPhoto(data) {
      var _this4 = this;

      this.currentPage = 1;
      if (this.paginationBtns) this.paginationBtns.forEach(function (btn) {
        btn.addEventListener('click', _this4._paginateCollection);
      });
      if (this.collectionList) this.collectionList.removeEventListener('click', this._selectPhoto);
      this.displayWrapper.innerHTML = (0, _Photo.default)(data);
    }
  }, {
    key: "_displayError",
    value: function _displayError(error) {
      this.displayWrapper.innerHTML = "Something went wrong ".concat(error);
    }
  }]);
  return View;
}();

var _default = View;
exports.default = _default;
},{"@babel/runtime/helpers/toConsumableArray":"node_modules/@babel/runtime/helpers/toConsumableArray.js","@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js","./helpers":"src/js/helpers.js","./Views/Photo":"src/js/Views/Photo.js","./Views/Collection":"src/js/Views/Collection.js","./Views/CollectionsList":"src/js/Views/CollectionsList.js","./Views/Pagination":"src/js/Views/Pagination.js","./Views/Breadcrumbs":"src/js/Views/Breadcrumbs.js"}],"src/js/Controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controller = function Controller(model, view) {
  var _this = this;

  (0, _classCallCheck2.default)(this, Controller);

  this.handleChangedModel = function (data) {
    _this.view.renderView(data);
  };

  this.handleChangedInfo = function (data) {
    _this.view.setInfo(data);
  };

  this.listenRouteChanged = function (url) {
    _this.model.changeModel(url);
  };

  this.listenInfoChanged = function (url) {
    _this.model.changeInfo(url);
  };

  this.model = model, this.view = view, this.model.bindModelChanged(this.handleChangedModel);
  this.view.bindRouteChange(this.listenRouteChanged);
  this.model.bindInfoChanged(this.handleChangedInfo);
  this.view.bindInitCollectionInfo(this.listenInfoChanged);
  this.view.init();
};

var _default = Controller;
exports.default = _default;
},{"@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _Model = _interopRequireDefault(require("./src/js/Model"));

var _View = _interopRequireDefault(require("./src/js/View"));

var _Controller = _interopRequireDefault(require("./src/js/Controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _Controller.default(new _Model.default(), new _View.default());
},{"./src/js/Model":"src/js/Model.js","./src/js/View":"src/js/View.js","./src/js/Controller":"src/js/Controller.js"}],"C:/Users/Olga/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63272" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Olga/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Viomedia.e31bb0bc.js.map