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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _boot = __webpack_require__(1);

	var _boot2 = _interopRequireDefault(_boot);

	var _load = __webpack_require__(2);

	var _load2 = _interopRequireDefault(_load);

	var _play = __webpack_require__(3);

	var _play2 = _interopRequireDefault(_play);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.game = new Phaser.Game(450, 700, Phaser.CANVASs, 'game-container');

	game.state.add('boot', _boot2.default);
	game.state.add('load', _load2.default);
	game.state.add('play', _play2.default);
	game.state.start('boot');

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  create: function create() {
	    game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
	    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	    game.state.start('load', true, false);
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  preload: function preload() {
	    game.load.spritesheet('tile', 'images/button.png', 300, 300);
	    game.load.spritesheet('select', 'images/select.png', 300, 300);
	    game.load.spritesheet('full', 'images/fullscreen.png', 300, 300);
	    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
	  },
	  onLoadComplete: function onLoadComplete() {
	    game.state.start('play', true, false);
	  }
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _TileGroup = __webpack_require__(4);

	var _TileGroup2 = _interopRequireDefault(_TileGroup);

	var _Interface = __webpack_require__(6);

	var _Interface2 = _interopRequireDefault(_Interface);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  create: function create() {
	    game.powerupDuration = 600;
	    game.roundDuration = 3600;
	    game.blockInput = false;
	    game.highScore = 0;
	    game.tiles = new _TileGroup2.default();
	    game.ui = new _Interface2.default();
	    this.startRound();
	  },
	  startRound: function startRound() {
	    game.score = 0;
	    game.ui.reset();
	  },
	  update: function update() {
	    if (game.ui.mainTimer == 0) {
	      if (game.score > game.highScore) {
	        game.highScore = game.score;
	        game.highScoreText.text = "Highscore: " + game.highScore;
	      }
	      game.score = 0;
	      game.scoreText.text = "Score: " + game.score;

	      game.ui.reset();
	    }
	    game.ui.update();
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Tile = __webpack_require__(5);

	var _Tile2 = _interopRequireDefault(_Tile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TileGroup = function (_Phaser$Group) {
	  _inherits(TileGroup, _Phaser$Group);

	  function TileGroup() {
	    _classCallCheck(this, TileGroup);

	    var space = 5;
	    var grid = 4;
	    var scale = game.width / 4 - 10;
	    var x = 12;
	    var y = game.height - (scale * 4 + space * 4) - 100;

	    var _this = _possibleConstructorReturn(this, (TileGroup.__proto__ || Object.getPrototypeOf(TileGroup)).call(this, game));

	    for (var i = x; i < scale * grid + x; i += scale + space) {
	      for (var j = y; j < scale * grid + y; j += scale + space) {
	        var frame = parseInt(Math.random() * 3) * 3;
	        var tile = new _Tile2.default(i, j, scale, frame);
	        tile.events.onInputDown.add(_this.doSelect, _this);
	        _this.add(tile);
	      }
	    }
	    return _this;
	  }

	  _createClass(TileGroup, [{
	    key: "doSelect",
	    value: function doSelect(tile) {
	      if (tile.alive && !game.blockInput) {
	        if (game.selectedTile == null) {
	          game.tileSelector.x = tile.x;
	          game.tileSelector.y = tile.y;
	          game.selectedTile = tile;
	          game.tileSelector.visible = true;
	        } else if (game.selectedTile == tile) {
	          this.deselect();
	        } else if (tile.frame === game.selectedTile.frame) {
	          this.combineTiles(game.selectedTile, tile);
	        } else {
	          game.blockInput = true;
	          this.deselect();
	          game.blockedText.text = "input blocked";
	          game.time.events.add(1500, function () {
	            game.blockInput = false;
	            game.blockedText.text = "";
	          });
	        }
	      }
	    }
	  }, {
	    key: "deselect",
	    value: function deselect() {
	      game.tileSelector.visible = false;
	      game.selectedTile = null;
	    }
	  }, {
	    key: "combineTiles",
	    value: function combineTiles(tile1, tile2) {
	      game.tileSelector.visible = false;
	      game.selectedTile = null;

	      game.score += game.ui.timers[0] > 0 ? 200 : 100;
	      game.scoreText.text = "Score: " + game.score;

	      game.add.tween(tile1, tile1.x, tile1.y).to({
	        x: tile2.x,
	        y: tile2.y
	      }, 300, Phaser.Easing.Quadratic.Out, true, 0, 0).onComplete.add(tile1.destroy.bind(tile1));

	      tile2.frame += 1;
	      if (tile1.frame == 2) {
	        game.ui.timers[1] = game.powerupDuration;
	      }
	      if (tile1.frame == 5) {
	        game.ui.timers[0] = game.powerupDuration;
	      }
	      if (tile1.frame == 8) {
	        game.ui.timers[2] = game.powerupDuration;
	      }
	    }
	  }]);

	  return TileGroup;
	}(Phaser.Group);

	exports.default = TileGroup;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tile = function (_Phaser$Sprite) {
	  _inherits(Tile, _Phaser$Sprite);

	  function Tile(x, y, scale, frame) {
	    _classCallCheck(this, Tile);

	    var _this = _possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).call(this, game, x, y, 'tile'));

	    _this._position = { x: x, y: y };
	    _this.width = scale;
	    _this.height = scale;
	    _this.frame = frame;
	    _this.inputEnabled = true;
	    return _this;
	  }

	  _createClass(Tile, [{
	    key: 'update',
	    value: function update() {
	      if (this.frame > 8 && this.alive) this.frame = 0;
	      if (!this.alive) {
	        if (game.ui.timers[1] > 0) {
	          this.spawn();
	        } else {
	          this.alpha += 0.006;
	        }
	        if (this.alpha > 0.7) {
	          this.spawn();
	        }
	      }
	    }
	  }, {
	    key: 'spawn',
	    value: function spawn() {
	      this.alive = true;
	      this.alpha = 1;
	      this.frame = parseInt(Math.random() * 3) * 3;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.frame = 9;
	      this.alpha = 0;
	      this.alive = false;
	      this.x = this._position.x;
	      this.y = this._position.y;
	    }
	  }]);

	  return Tile;
	}(Phaser.Sprite);

	exports.default = Tile;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Interface = function () {
	  function Interface() {
	    _classCallCheck(this, Interface);

	    game.stage.backgroundColor = '#182d3b';
	    this.bars = [0xff0000, 0x00ff00, 0x0000ff, 0xffffff].map(function (color, i) {
	      var bar = game.add.graphics(25, 70 + 10 * (i + 1));
	      bar.lineStyle(3, color, 1);
	      bar.lineTo(game.width - 50, 0);
	      bar.scale.x = 0;
	      return bar;
	    });

	    game.scoreText = game.add.text(20, 20, "Score: 0", {
	      font: '20pt Arial',
	      fill: '#ffffff'
	    });

	    game.highScoreText = game.add.text(20, 60, "", {
	      font: '14pt Arial',
	      fill: '#ffffff'
	    });

	    game.blockedText = game.add.text(165, 130, "", {
	      font: '14pt Arial',
	      fill: '#ffffff'
	    });

	    game.fullscreenButton = game.add.button(400, 10, 'full', function () {
	      if (game.scale.isFullScreen) {
	        game.scale.stopFullScreen();
	      } else {
	        game.scale.startFullScreen(false);
	      }
	    });

	    game.fullscreenButton.width = 40;
	    game.fullscreenButton.height = 40;

	    game.tileSelector = game.add.sprite(1, 1, 'select');
	    game.tileSelector.width = 100;
	    game.tileSelector.height = 100;
	    game.tileSelector.visible = false;
	  }

	  _createClass(Interface, [{
	    key: 'reset',
	    value: function reset() {
	      game.tileSelector.visible = false;
	      this.mainTimer = game.roundDuration;
	      game.selectedTile = null;
	      this.timers = [0, 0, 0];
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var _this = this;

	      // decrement the this.mainTimer
	      // (half the speed if blue is active)
	      if (this.mainTimer > 0) {
	        this.mainTimer -= this.timers[2] > 0 ? 0.5 : 1;
	        this.bars[3].scale.x = this.mainTimer / game.roundDuration;
	      }
	      // decrement powerup timers and adjust bar scale
	      this.timers = this.timers.map(function (timer, i) {
	        if (timer > 0) {
	          _this.bars[i].scale.x = timer / game.powerupDuration;
	          return timer -= _this.timers[2] > 0 ? 0.5 : 1;
	        } else {
	          return 0;
	        }
	      });
	    }
	  }]);

	  return Interface;
	}();

	exports.default = Interface;

/***/ })
/******/ ]);