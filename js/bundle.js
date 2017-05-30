/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _board = __webpack_require__(1);
	
	var _board2 = _interopRequireDefault(_board);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  window.createjs = createjs;
	
	  var stage = new createjs.Stage('main-canvas');
	  var board = new _board2.default(stage);
	  window.board = board;
	  board.drawGrid();
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cell = __webpack_require__(2);
	
	var _cell2 = _interopRequireDefault(_cell);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	window.Cell = _cell2.default;
	
	var Board = function () {
	  function Board(stage) {
	    var _this = this;
	
	    _classCallCheck(this, Board);
	
	    this.stage = stage;
	    createjs.Ticker.addEventListener("tick", function (evt) {
	      if (!evt.paused) {
	        _this.stage.update();
	      }
	    });
	
	    this.handleMouseMove = this.handleMouseMove.bind(this);
	    this.toggleObstacle = this.toggleObstacle.bind(this);
	  }
	
	  _createClass(Board, [{
	    key: 'handleMouseMove',
	    value: function handleMouseMove(e) {
	      var currX = Math.floor(e.stageX / 10) * 10;
	      var currY = Math.floor(e.stageY / 10) * 10;
	      var prevX = this.handleMouseMove.prevX;
	      var prevY = this.handleMouseMove.prevY;
	      console.log(currX, currY);
	
	      //only allow pressmove in discrete cells
	      if (currX !== prevX || currY !== prevY) {
	        var cell = this.stage.getObjectUnderPoint(currX, currY);
	        if (this.isStart(prevX, prevY)) {
	          this.setStart(cell);
	        } else if (this.isGoal(prevX, prevY)) {
	          this.setGoal(cell);
	        } else {
	          this.toggleObstacle(cell);
	        }
	
	        this.handleMouseMove.prevX = currX;
	        this.handleMouseMove.prevY = currY;
	      }
	    }
	  }, {
	    key: 'toggleObstacle',
	    value: function toggleObstacle(cell) {
	      if (this.start === cell || this.goal === cell) {
	        return false;
	      }
	
	      cell.toggleIsObstacle();
	      return true;
	    }
	  }, {
	    key: 'isStart',
	    value: function isStart(x, y) {
	      return x === this.start.x && y === this.start.y;
	    }
	  }, {
	    key: 'isGoal',
	    value: function isGoal(x, y) {
	      return x === this.goal.x && y === this.goal.y;
	    }
	  }, {
	    key: 'setStart',
	    value: function setStart(cell) {
	      if (this.start) {
	        this.start.fillByString('empty');
	      }
	      cell.fillByString('start');
	      this.start = cell;
	    }
	  }, {
	    key: 'setGoal',
	    value: function setGoal(cell) {
	      if (this.goal) {
	        this.goal.fillByString('empty');
	      }
	      cell.fillByString('goal');
	      this.goal = cell;
	    }
	  }, {
	    key: 'drawGrid',
	    value: function drawGrid() {
	      var _this2 = this;
	
	      for (var i = 0; i < 15; i++) {
	        for (var j = 0; j < 15; j++) {
	          var cell = new _cell2.default(i * 10, j * 10);
	          cell.on('click', function (e) {
	            return _this2.toggleObstacle(e.target);
	          });
	          this.stage.addChild(cell.easelObj());
	        }
	      }
	
	      this.setStart(this.stage.getChildAt(10));
	      this.setGoal(this.stage.getChildAt(98));
	
	      this.stage.on('pressmove', this.handleMouseMove);
	      this.stage.on('pressup', function () {
	        console.log('pressup');
	
	        _this2.handleMouseMove.prevX = null;
	        _this2.handleMouseMove.prevY = null;
	      });
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cell = function () {
	  function Cell(x, y) {
	    _classCallCheck(this, Cell);
	
	    this.cell = new createjs.Shape();
	    this.isObstacle = false;
	    this.color = Cell.COLORS['empty'];
	
	    this.moveTo(x, y);
	    this.on = this.cell.on.bind(this.cell);
	  }
	
	  _createClass(Cell, [{
	    key: 'toggleIsObstacle',
	    value: function toggleIsObstacle() {
	      this.color = this.isObstacle ? Cell.COLORS['obstacle'] : Cell.COLORS['empty'];
	      this.fill(this.color);
	      this.isObstacle = !this.isObstacle;
	    }
	  }, {
	    key: '_fill',
	    value: function _fill(color) {
	      this.cell.graphics.beginFill(color).drawRect(0, 0, 10, 10);
	    }
	  }, {
	    key: 'fillByString',
	    value: function fillByString(colorString) {
	      this.color = Cell.COLORS[colorString];
	      this._fill(Cell.COLORS[colorString]);
	    }
	  }, {
	    key: 'moveTo',
	    value: function moveTo(x, y) {
	      this.cell.x = x;
	      this.cell.y = y;
	    }
	  }, {
	    key: 'easelObj',
	    value: function easelObj() {
	      return this.cell;
	    }
	  }]);
	
	  return Cell;
	}();
	
	Cell.COLORS = {
	  'empty': '#e8e8e8',
	  'start': '#ff0000',
	  'goal': '#0000ff',
	  'obstacle': '#c1c1c1'
	};
	
	exports.default = Cell;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map