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

require.register("@bower_components/typing.js/dist/typing.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@bower_components/typing.js");
  (function() {
    (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/util.js
// Merges two objects.
function merge() {
  var merged = {};

  for (var i = 0; i < arguments.length; i++) {
    var obj = arguments[i];

    for (var attr in obj) {
      merged[attr] = obj[attr];
    }
  }

  return merged;
} // Checks if the given object is a function. Taken from underscorejs source code.

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
} // Checks if the given object is an array.

function isArray(obj) {
  return toString(obj) === "[object Array]";
} // Returns the first element of the array.

function head(array) {
  return array[0];
} // Returns the same array skipping the first element.

function tail(array) {
  return array.slice(1);
} // Drops the first character of the string and returns the rest.

function strTail(str) {
  return str.substring(1, str.length);
} // Returns the first character of the string.

function strHead(str) {
  return str[0];
} // Return the last character of the string.

function strLast(str) {
  return str[str.length - 1];
} // Drops the given number of characters from the start of the string.

function strDrop(string, n) {
  return string.substr(n, string.length);
} // Drops the given number of characters from the end of the string

function strDropTail(string, n) {
  return string.substr(0, string.length - n);
} // Intersects the start of two strings.

function strIntersect(a, b) {
  var i;

  for (i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] != b[i]) break;
  }

  return a.substr(0, i);
} // Returns the original value with the given noise applied.
// E.g. noise(x, 2) = x - 2 <= y <= x + 2

function noise(x, delta) {
  return Math.round(Math.random() * delta * 2 - delta) + x;
} // Checks if the given prefix is prefix of target.

function isPrefix(prefix, target) {
  return target.substr(0, prefix.length) == prefix;
} // Checks if the given string has length zero.

function isEmpty(string) {
  return string.length == 0;
} // Creates a typer that deletes characters each time it
// is called until predicate is true. After that, it appends
// the characters of the given string one by one each time
// it is called.

function makeTyper(current, pending, predicate) {
  var forward = current.length == 0 || predicate(current, pending);
  var prevLength = current.length;
  return function () {
    var step = {
      current: current,
      pending: pending,
      isType: current.length > prevLength,
      isBackspace: current.length < prevLength,
      isDone: forward && pending.length <= 0
    };
    prevLength = current.length;

    if (forward && pending.length > 0) {
      current = current + head(pending);
      pending = tail(pending);
    } else if (!forward && current.length > 0) {
      current = strDropTail(current, 1);
    }

    forward = forward || current.length == 0 || predicate(current, pending);
    return step;
  };
} // Creates a typer that deletes characters until current is a prefix
// of target.

function makePrefixTyper(current, target) {
  var commonPrefix = strIntersect(current, target);
  var pending = target.substr(commonPrefix.length, target.length);
  return makeTyper(current, pending, function (curr) {
    return curr == commonPrefix;
  });
}
// CONCATENATED MODULE: ./src/typing.js

var DEFAULT_SETTINGS = {
  sentences: ['Hello typing.js'],
  caretChar: '_',
  caretClass: 'typingjs__caret',
  ignoreContent: false,
  ignorePrefix: false,
  typeDelay: 50,
  sentenceDelay: 750,
  humanize: true,
  onType: undefined,
  onBackspace: undefined,
  onFinish: undefined,
  onSentenceFinish: undefined
};
var Typing = {
  new: function _new(selector, options) {
    var elements = document.querySelectorAll(selector);
    this.withElements(elements, options);
  },
  withElements: function withElements(elements, options) {
    // Settings.
    var settings = merge(DEFAULT_SETTINGS, options);
    Array.prototype.map.call(elements, function (el) {
      // Creates initial elements.
      var initialText = settings.ignoreContent ? '' : el.textContent;
      var content = document.createElement('span');
      content.className = 'typingjs__content';
      content.textContent = initialText;
      var caret = document.createElement('caret');
      caret.className = settings.caretClass;
      caret.textContent = settings.caretChar;
      el.innerHTML = '';
      el.appendChild(content);
      el.appendChild(caret); // Starts progress here.

      var sentencesLeft = settings.sentences.slice();

      function typeSentence(typer) {
        // Reads next iteration of the typing animation.
        var _typer = typer(),
            current = _typer.current,
            isType = _typer.isType,
            isBackspace = _typer.isBackspace,
            isDone = _typer.isDone;

        content.textContent = current;

        if (isDone) {
          if (isFunction(settings.onSentenceFinish)) settings.onSentenceFinish.call(this_);
          typeArray();
        } else {
          // Callbacks.
          if (isType && isFunction(settings.onType)) settings.onType.call(this_);
          if (isBackspace && isFunction(settings.onBackspace)) settings.onBackspace.call(this_); // Next step

          var humanTimeout = settings.typeDelay;
          if (settings.humanize) humanTimeout = noise(settings.typeDelay, settings.typeDelay);
          setTimeout(typeSentence, humanTimeout, typer);
        }
      }

      function typeArray() {
        var targetStr = head(sentencesLeft);
        sentencesLeft = tail(sentencesLeft);

        if (targetStr !== undefined) {
          var typer = makePrefixTyper(content.textContent, targetStr);

          if (settings.ignorePrefix) {
            typer = makeTyper(content.textContent, targetStr, function (curr) {
              return curr.length == 0;
            });
          }

          setTimeout(typeSentence, settings.sentenceDelay, typer);
        } else if (isFunction(settings.onFinish)) {
          settings.onFinish.call(this_);
        }
      }

      typeArray();
    });
  }
};

if (typeof jQuery != 'undefined') {
  (function ($) {
    $.fn.typing = function (options) {
      Typing.withElements(this.get(), options);
    };
  })(jQuery);
}

window.Typing = Typing;
/* harmony default export */ var typing = __webpack_exports__["default"] = (Typing);

/***/ })
/******/ ]);
});
//# sourceMappingURL=typing.js.map
  })();
});
require.register("js/app.js", function(exports, require, module) {
"use strict";

var _loader = _interopRequireDefault(require("./views/loader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleDOMContentLoaded() {
  var viewName = document.getElementsByTagName('body')[0].getAttribute('data-js-view-name');
  var ViewClass = (0, _loader.default)(viewName);
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("./element");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ClassToggler =
/*#__PURE__*/
function () {
  function ClassToggler(selector) {
    _classCallCheck(this, ClassToggler);

    this.el = new _element.Element(selector);
    this.onClasses = '';
    this.offClasses = '';
  }

  _createClass(ClassToggler, [{
    key: "on",
    value: function on(classes) {
      this.onClasses = classes;
      this.el.removeClass(this.offClasses);
      this.el.addClass(this.onClasses);
    }
  }, {
    key: "off",
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasClass = _hasClass;
exports.addClass = _addClass;
exports.removeClass = _removeClass;
exports.toggleClass = _toggleClass;
exports.default = void 0;

var _index = require("./index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Helper functions for manipulating classes.
function _hasClass(el, classname) {
  if (el.classList) {
    return el.classList.contains(classname);
  }

  return new RegExp('(^| )' + classname + '( |$)', 'gi').test(el.classname);
}

function _addClass(el, classname) {
  if (el.classList) {
    el.classList.add(classname);
    return;
  }

  el.classname += ' ' + classname;
}

function _removeClass(el, classname) {
  if (el.classList) {
    el.classList.remove(classname);
    return;
  }

  el.classname = el.classname.replace(new RegExp('(^|\\b)' + classname.split(' ').join('|') + '(\\b|$)', 'gi', ' '));
}

function _toggleClass(el, classname) {
  _hasClass(el, classname) ? _removeClass(el, classname) : _addClass(el, classname);
} // Class manipulation on multiple elements.


var Element =
/*#__PURE__*/
function () {
  function Element(selector) {
    _classCallCheck(this, Element);

    this.elements = document.querySelectorAll(selector);
  }

  _createClass(Element, [{
    key: "first",
    value: function first() {
      return this.elements[0];
    }
  }, {
    key: "hasClass",
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
    key: "addClass",
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
    key: "removeClass",
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
    key: "toggleClass",
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;
exports.isMobile = isMobile;
Object.defineProperty(exports, "Element", {
  enumerable: true,
  get: function get() {
    return _element.default;
  }
});
Object.defineProperty(exports, "ClassToggler", {
  enumerable: true,
  get: function get() {
    return _classToggler.default;
  }
});

var _element = _interopRequireDefault(require("./element"));

var _classToggler = _interopRequireDefault(require("./classToggler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import and re-export.
// ----------------
// Functions
// ----------------
// Calls the function f on each element of the given array.
// returning a new array with the new values.
function map(array, f) {
  return Array.prototype.map.call(array, f);
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
});

;require.register("js/views/blog.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(require("./main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BlogView =
/*#__PURE__*/
function (_MainView) {
  _inherits(BlogView, _MainView);

  function BlogView() {
    _classCallCheck(this, BlogView);

    return _possibleConstructorReturn(this, _getPrototypeOf(BlogView).apply(this, arguments));
  }

  return BlogView;
}(_main.default);

exports.default = BlogView;
});

;require.register("js/views/home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typing = _interopRequireDefault(require("@bower_components/typing.js"));

var _main = _interopRequireDefault(require("./main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HomeView =
/*#__PURE__*/
function (_MainView) {
  _inherits(HomeView, _MainView);

  function HomeView() {
    _classCallCheck(this, HomeView);

    return _possibleConstructorReturn(this, _getPrototypeOf(HomeView).apply(this, arguments));
  }

  _createClass(HomeView, [{
    key: "mount",
    value: function mount() {
      _get(_getPrototypeOf(HomeView.prototype), "mount", this).call(this);

      var sentences = [].slice.call(document.querySelectorAll('#tagline-comments li')).map(function (n) {
        return n.innerHTML;
      });

      _typing.default.new('#tagline', {
        sentences: sentences,
        sentenceDelay: 1000,
        ignorePrefix: true
      });
    }
  }]);

  return HomeView;
}(_main.default);

exports.default = HomeView;
});

;require.register("js/views/loader.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadView;

var _home = _interopRequireDefault(require("./home"));

var _projects = _interopRequireDefault(require("./projects"));

var _blog = _interopRequireDefault(require("./blog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var views = {
  HomeView: _home.default,
  ProjectsView: _projects.default,
  BlogView: _blog.default
};

function loadView(viewName) {
  return views[viewName] || _home.default;
}
});

;require.register("js/views/main.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("../util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MainView =
/*#__PURE__*/
function () {
  function MainView() {
    _classCallCheck(this, MainView);
  }

  _createClass(MainView, [{
    key: "mount",
    value: function mount() {
      setupNavToggle();
    }
  }, {
    key: "unmount",
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(require("./main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ProjectsView =
/*#__PURE__*/
function (_MainView) {
  _inherits(ProjectsView, _MainView);

  function ProjectsView() {
    _classCallCheck(this, ProjectsView);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProjectsView).apply(this, arguments));
  }

  return ProjectsView;
}(_main.default);

exports.default = ProjectsView;
});

;require.alias("@bower_components/typing.js/dist/typing.js", "@bower_components/typing.js");require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('js/app');
//# sourceMappingURL=app.js.map