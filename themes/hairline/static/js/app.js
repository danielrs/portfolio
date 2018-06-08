(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("js/app.js", function(exports, require, module) {
'use strict';

var _loader = require('./views/loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleDOMContentLoaded() {
  var viewName = document.getElementsByTagName('body')[0].getAttribute('data-js-view-name');
  var ViewClass = (0, _loader2.default)(viewName);
  var view = new ViewClass();
  window.currentView = view;
  window.currentView.mount();
}

function handleDOMContentUnload() {
  window.currentView.unmount();
  wundow.cunrrentView = null;
}

handleDOMContentLoaded();
window.addEventListener('unload', handleDOMContentUnload, false);
});

require.register("js/util/classToggler.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _element = require('./element');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassToggler = function () {
  function ClassToggler(selector) {
    _classCallCheck(this, ClassToggler);

    this.el = new _element.Element(selector);
    this.onClasses = '';
    this.offClasses = '';
  }

  _createClass(ClassToggler, [{
    key: 'on',
    value: function on(classes) {
      this.onClasses = classes;
      this.el.removeClass(this.offClasses);
      this.el.addClass(this.onClasses);
    }
  }, {
    key: 'off',
    value: function off(classes) {
      this.offClasses = classes;
      this.el.removeClass(this.onClasses);
      this.el.addClass(this.offClasses);
    }
  }]);

  return ClassToggler;
}();

exports.default = ClassToggler;
});

;require.register("js/util/element.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleClass = exports.removeClass = exports.addClass = exports.hasClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Helper functions for manipulating classes.

function _hasClass(el, classname) {
  if (el.classList) {
    return el.classList.contains(classname);
  }

  return new RegExp('(^| )' + classname + '( |$)', 'gi').test(el.classname);
}

exports.hasClass = _hasClass;
function _addClass(el, classname) {
  if (el.classList) {
    el.classList.add(classname);
    return;
  }

  el.classname += ' ' + classname;
}

exports.addClass = _addClass;
function _removeClass(el, classname) {
  if (el.classList) {
    el.classList.remove(classname);
    return;
  }

  el.classname = el.classname.replace(new RegExp('(^|\\b)' + classname.split(' ').join('|') + '(\\b|$)', 'gi', ' '));
}

exports.removeClass = _removeClass;
function _toggleClass(el, classname) {
  _hasClass(el, classname) ? _removeClass(el, classname) : _addClass(el, classname);
}

// Class manipulation on multiple elements.
exports.toggleClass = _toggleClass;

var Element = function () {
  function Element(selector) {
    _classCallCheck(this, Element);

    this.elements = document.querySelectorAll(selector);
  }

  _createClass(Element, [{
    key: 'first',
    value: function first() {
      return this.elements[0];
    }
  }, {
    key: 'hasClass',
    value: function hasClass(classes) {
      if (this.elements.length == 0) {
        return false;
      }

      var el = this.elements[0];
      return classes.split(' ').some(function (c) {
        return _hasClass(el, c);
      });
    }
  }, {
    key: 'addClass',
    value: function addClass(classes) {
      if (!classes) {
        return;
      }

      classes = classes.split(' ');
      (0, _index.map)(this.elements, function (el) {
        (0, _index.map)(classes, function (c) {
          return _addClass(el, c);
        });
      });
    }
  }, {
    key: 'removeClass',
    value: function removeClass(classes) {
      if (!classes) {
        return;
      }

      classes = classes.split(' ');
      (0, _index.map)(this.elements, function (el) {
        (0, _index.map)(classes, function (c) {
          return _removeClass(el, c);
        });
      });
    }
  }, {
    key: 'toggleClass',
    value: function toggleClass(classes) {
      if (!classes) {
        return;
      }

      classes = classes.split(' ');
      (0, _index.map)(this.elements, function (el) {
        (0, _index.map)(classes, function (c) {
          return _toggleClass(el, c);
        });
      });
    }
  }]);

  return Element;
}();

exports.default = Element;
});

;require.register("js/util/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassToggler = exports.Element = undefined;
exports.map = map;
exports.isMobile = isMobile;

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _classToggler = require('./classToggler');

var _classToggler2 = _interopRequireDefault(_classToggler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import and re-export.

exports.Element = _element2.default;
exports.ClassToggler = _classToggler2.default;

// ----------------
// Functions
// ----------------

// Calls the function f on each element of the given array.
// returning a new array with the new values.

function map(array, f) {
  return Array.prototype.map.call(array, f);
}

function isMobile() {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
}
});

;require.register("js/views/blog.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlogView = function (_MainView) {
  _inherits(BlogView, _MainView);

  function BlogView() {
    _classCallCheck(this, BlogView);

    return _possibleConstructorReturn(this, (BlogView.__proto__ || Object.getPrototypeOf(BlogView)).apply(this, arguments));
  }

  return BlogView;
}(_main2.default);

exports.default = BlogView;
});

;require.register("js/views/home.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeView = function (_MainView) {
  _inherits(HomeView, _MainView);

  function HomeView() {
    _classCallCheck(this, HomeView);

    return _possibleConstructorReturn(this, (HomeView.__proto__ || Object.getPrototypeOf(HomeView)).apply(this, arguments));
  }

  _createClass(HomeView, [{
    key: 'mount',
    value: function mount() {
      _get(HomeView.prototype.__proto__ || Object.getPrototypeOf(HomeView.prototype), 'mount', this).call(this);

      var sentences = [].slice.call(document.querySelectorAll('#tagline-comments li')).map(function (n) {
        return n.innerHTML;
      });

      Typing.new('#tagline', {
        sentences: sentences,
        sentenceDelay: 1000,
        ignorePrefix: true
      });
    }
  }]);

  return HomeView;
}(_main2.default);

exports.default = HomeView;
});

;require.register("js/views/loader.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadView;

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _projects = require('./projects');

var _projects2 = _interopRequireDefault(_projects);

var _blog = require('./blog');

var _blog2 = _interopRequireDefault(_blog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var views = {
  HomeView: _home2.default,
  ProjectsView: _projects2.default,
  BlogView: _blog2.default
};

function loadView(viewName) {
  return views[viewName] || _home2.default;
}
});

;require.register("js/views/main.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainView = function () {
  function MainView() {
    _classCallCheck(this, MainView);
  }

  _createClass(MainView, [{
    key: 'mount',
    value: function mount() {
      setupNavToggle();
    }
  }, {
    key: 'unmount',
    value: function unmount() {}
  }]);

  return MainView;
}();

exports.default = MainView;


function setupNavToggle() {
  var nav = new _util.Element('#nav');
  var navlist = new _util.Element('#nav .nav__list');
  var menuToggle = new _util.Element('#menu-toggle');

  menuToggle.first().addEventListener('click', function () {
    nav.toggleClass('nav--hidden');
  });
  nav.addClass('nav--hidden');
}
});

;require.register("js/views/projects.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectsView = function (_MainView) {
  _inherits(ProjectsView, _MainView);

  function ProjectsView() {
    _classCallCheck(this, ProjectsView);

    return _possibleConstructorReturn(this, (ProjectsView.__proto__ || Object.getPrototypeOf(ProjectsView)).apply(this, arguments));
  }

  return ProjectsView;
}(_main2.default);

exports.default = ProjectsView;
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('js/app');
//# sourceMappingURL=app.js.map