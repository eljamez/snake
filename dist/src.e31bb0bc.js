// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/bulma/css/bulma.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var CONSTANTS = {
  BG_COLOR: 'white',
  SNAKE_COLOR: 'blue',
  SNAKE_START: [{
    x: 30,
    y: 200
  }, {
    x: 20,
    y: 200
  }, {
    x: 10,
    y: 200
  }],
  FOOD_COLOR: 'green',
  SPEED: 100,
  KEY_MAP: [{
    key: 37,
    direction: 'left'
  }, {
    key: 38,
    direction: 'up'
  }, {
    key: 40,
    direction: 'down'
  }, {
    key: 39,
    direction: 'right'
  }]
};
var _default = CONSTANTS;
exports.default = _default;
},{}],"components/background.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var background = {
  /**
   * Draws the background
   * @param {Object} context - the canvas context
   * @param {String} color - the background color
   * @param {Object} { width, height } - the size of the canvas
   */
  refresh: function refresh(context, color, _ref) {
    var width = _ref.width,
        height = _ref.height;
    context.clearRect(0, 0, width, height);
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
  }
};
var _default = background;
exports.default = _default;
},{}],"components/snake.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var snake = {
  /**
   * Function to initiate the snake
   * @param {Array} parts - the parts of the snake to set
   */
  init: function init(parts) {
    this.parts = parts;
    this.direction = 'right';
  },

  /**
   * Function to check if new direction is opposite current
   * @param {String} newDirection - the direction to check against
   * @return {Bool} true if trying to go the opposite direction 
   */
  isOppositeDirection: function isOppositeDirection(newDirection) {
    switch (newDirection) {
      case 'up':
        return this.direction === 'down';

      case 'down':
        return this.direction === 'up';

      case 'right':
        return this.direction === 'left';

      case 'left':
        return this.direction === 'right';
    }
  },

  /**
   * Sets the direction of the snake
   * @param {String} newDirection 
   */
  setDirection: function setDirection(newDirection) {
    if (this.isOppositeDirection(newDirection)) {
      return false;
    }

    this.direction = newDirection;
  },

  /**
   * Moves the snake in the proper direction by adjusting the parts
   * @param {Bool} justAte - flag to check if the snake just ate, and to add to it's length
   */
  move: function move(justAte) {
    switch (this.direction) {
      case 'up':
        this.parts.unshift({
          x: this.parts[0].x,
          y: this.parts[0].y - 10
        });
        break;

      case 'right':
        this.parts.unshift({
          x: this.parts[0].x + 10,
          y: this.parts[0].y
        });
        break;

      case 'down':
        this.parts.unshift({
          x: this.parts[0].x,
          y: this.parts[0].y + 10
        });
        break;

      case 'left':
        this.parts.unshift({
          x: this.parts[0].x - 10,
          y: this.parts[0].y
        });
        break;
    }

    if (!justAte) {
      this.parts.pop();
    }
  },

  /**
   * Draws the snake on the canvas in the proper position
   * @param {Object} context - the context of the canvas
   * @param {String} color - the color of the snake
   */
  draw: function draw(context, color) {
    context.fillStyle = color;
    this.parts.forEach(function (part) {
      return context.fillRect(part.x, part.y, 10, 10);
    });
  },

  /**
   * Checks to see if snake is out of bounds or has hit itself
   * @param {Object} { width, height } - getting the width and height from the canvas size 
   * @return {Bool} 
   */
  isDead: function isDead(_ref) {
    var _this = this;

    var width = _ref.width,
        height = _ref.height;

    if (this.parts[0].x >= width || this.parts[0].y >= height || this.parts[0].x < 0 || this.parts[0].y < 0) {
      return true;
    }

    return this.parts.find(function (val, index) {
      if (index !== 0) {
        return val.x === _this.parts[0].x && val.y === _this.parts[0].y;
      } else {
        return false;
      }
    });
  },

  /**
   * Checks if snake has found the food and is currently eating
   * @param {Object} { currentX, currentY } - check if snake is currently eating the food
   * @return {Bool}
   */
  isEating: function isEating(_ref2) {
    var currentX = _ref2.currentX,
        currentY = _ref2.currentY;

    if (currentX === this.parts[0].x && currentY === this.parts[0].y) {
      return true;
    }

    return false;
  }
};
var _default = snake;
exports.default = _default;
},{}],"state/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var state = {
  game: {
    inProgress: false
  }
};
var _default = state;
exports.default = _default;
},{}],"components/food.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var food = {
  /**
   * food properties
   * TODO: create init function for setting these props
   */
  dropped: false,
  currentX: 0,
  currentY: 0,

  /**
   * function to drop the food
   * @param {Object} { width, height } - getting the width and height from the canvas size 
   */
  drop: function drop(_ref) {
    var width = _ref.width,
        height = _ref.height;
    this.currentX = this.getRandomPosition(height);
    this.currentY = this.getRandomPosition(width);
    this.dropped = true;
  },

  /**
   * function to draw the food on frame
   * @param {Object} context - the canvas context
   * @param {string} color - the food color
   */
  draw: function draw(context, color) {
    context.fillStyle = color;
    context.fillRect(this.currentX, this.currentY, 10, 10);
  },

  /**
   * creates a random number
   * @param {Number} max - the maximum number for random value
   * @return {Number} a random number for random food placement
   */
  getRandomPosition: function getRandomPosition(max) {
    return Math.round(Math.random() * (max / 10) + 0) * 10;
  },

  /**
   * function to call when food is eaten
   * @param {Bool} eaten - if the food was eaten, then it is no longer dropped
   */
  wasEaten: function wasEaten(eaten) {
    this.dropped = !eaten;
  }
};
var _default = food;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("bulma/css/bulma.css");

var _constants = _interopRequireDefault(require("./constants"));

var _background = _interopRequireDefault(require("./components/background"));

var _snake = _interopRequireDefault(require("./components/snake"));

var _state = _interopRequireDefault(require("./state"));

var _food = _interopRequireDefault(require("./components/food"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: move into init function

/**
 * Set up Canvas
 */
var battleGround = document.getElementById("battleGround");
var context = battleGround.getContext("2d");
/**
 * get the direction from arrow key map
 * @param {*} keycode 
 */

var getDirection = function getDirection(keycode) {
  return _constants.default.KEY_MAP.find(function (val) {
    return val.key === keycode;
  }).direction;
};
/**
 * function called on keydown event
 * @param {*} e 
 */


var keyPress = function keyPress(e) {
  if (e.keyCode === 32 && !_state.default.game.inProgress) {
    startGame();
  }

  if (_state.default.game.inProgress) {
    _snake.default.setDirection(getDirection(e.keyCode));
  }
};

_background.default.refresh(context, _constants.default.BG_COLOR, battleGround);

document.addEventListener('keydown', keyPress);
/**
 * Main function to kick off the game
 * TODO: Create module of game controls
 * TODO: Create more consistant reset
 */

var startGame = function startGame() {
  _state.default.game.inProgress = true;

  _snake.default.init(_constants.default.SNAKE_START);

  _food.default.dropped = false;
  /**
   * Sets up a new game / intervals for frames
   */

  var newGame = setInterval(function () {
    if (!_food.default.dropped) {
      _food.default.drop(battleGround);
    }

    _background.default.refresh(context, _constants.default.BG_COLOR, battleGround);

    _food.default.draw(context, _constants.default.FOOD_COLOR);

    _food.default.wasEaten(_snake.default.isEating(_food.default));

    _snake.default.move(_snake.default.isEating(_food.default));

    _snake.default.draw(context, _constants.default.SNAKE_COLOR);

    if (_snake.default.isDead(battleGround)) {
      endGame();
    }
  }, _constants.default.SPEED);
  /**
   * Initiates the end of the game. 
   */

  var endGame = function endGame() {
    clearInterval(newGame);
    alert('game over');
    _state.default.game.inProgress = false;
  };
};
},{"bulma/css/bulma.css":"../node_modules/bulma/css/bulma.css","./constants":"constants.js","./components/background":"components/background.js","./components/snake":"components/snake.js","./state":"state/index.js","./components/food":"components/food.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63145" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.map