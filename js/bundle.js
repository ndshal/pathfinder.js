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
	
	var _data_structures = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.PriorityQueue = _data_structures.PriorityQueue;
	
	document.addEventListener('DOMContentLoaded', function () {
	  window.createjs = createjs;
	
	  var stage = new createjs.Stage('main-canvas');
	  var board = new _board2.default(stage);
	  window.board = board;
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _graph_node = __webpack_require__(3);
	
	var _graph_node2 = _interopRequireDefault(_graph_node);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
	  function Board(stage) {
	    _classCallCheck(this, Board);
	
	    this.stage = stage;
	    createjs.Ticker.addEventListener('tick', this.stage);
	
	    this.handleClick = this.handleClick.bind(this);
	    this.handleMouseMove = this.handleMouseMove.bind(this);
	
	    this.grid = this.drawGrid();
	  }
	
	  _createClass(Board, [{
	    key: 'handleClick',
	    value: function handleClick(e) {
	      var gridX = Math.floor(e.stageX / 10);
	      var gridY = Math.floor(e.stageY / 10);
	      var node = this.grid[gridX][gridY];
	      if (this.start === node || this.goal === node) {
	        return false;
	      }
	
	      node.toggleIsObstacle();
	      return true;
	    }
	  }, {
	    key: 'handleMouseMove',
	    value: function handleMouseMove(e) {
	      var currX = Math.floor(e.stageX / 10) * 10;
	      var currY = Math.floor(e.stageY / 10) * 10;
	      var prevX = this.handleMouseMove.prevX;
	      var prevY = this.handleMouseMove.prevY;
	
	      //only allow pressmove in discrete cells
	      if (currX !== prevX || currY !== prevY) {
	        var node = this.grid[currX / 10][currY / 10];
	
	        if (this.isStart(prevX, prevY)) {
	          this.setStart(node);
	        } else if (this.isGoal(prevX, prevY)) {
	          this.setGoal(node);
	        } else {
	          node.toggleIsObstacle();
	        }
	
	        this.handleMouseMove.prevX = currX;
	        this.handleMouseMove.prevY = currY;
	      }
	    }
	  }, {
	    key: 'isStart',
	    value: function isStart(x, y) {
	      return x === this.start.easelCell.x && y === this.start.easelCell.y;
	    }
	  }, {
	    key: 'isGoal',
	    value: function isGoal(x, y) {
	      return x === this.goal.easelCell.x && y === this.goal.easelCell.y;
	    }
	  }, {
	    key: 'setStart',
	    value: function setStart(node) {
	      if (this.start) {
	        this.start.fillByString('empty');
	      }
	
	      node.fillByString('start');
	      this.start = node;
	    }
	  }, {
	    key: 'setGoal',
	    value: function setGoal(node) {
	      if (this.goal) {
	        this.goal.fillByString('empty');
	      }
	      node.fillByString('goal');
	      this.goal = node;
	    }
	  }, {
	    key: 'drawGrid',
	    value: function drawGrid() {
	      var _this = this;
	
	      var grid = [];
	
	      for (var i = 0; i < 15; i++) {
	        grid.push([]);
	        for (var j = 0; j < 15; j++) {
	          var node = new _graph_node2.default(i * 10, j * 10);
	          this.stage.addChild(node.easelCell);
	          grid[i].push(node);
	        }
	      }
	
	      this.setStart(grid[10][11]);
	      this.setGoal(grid[1][7]);
	
	      this.stage.on('click', this.handleClick);
	      this.stage.on('pressmove', this.handleMouseMove);
	      this.stage.on('pressup', function () {
	        _this.handleMouseMove.prevX = null;
	        _this.handleMouseMove.prevY = null;
	      });
	
	      return grid;
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var graphNode = function () {
	  function graphNode(x, y) {
	    _classCallCheck(this, graphNode);
	
	    this.easelCell = new createjs.Shape();
	    this.drawBorder();
	    this.isObstacle = false;
	    this.scale = 1;
	    this.fillByString('empty');
	
	    this.moveTo(x, y);
	  }
	
	  _createClass(graphNode, [{
	    key: 'toggleIsObstacle',
	    value: function toggleIsObstacle() {
	      this.isObstacle = !this.isObstacle;
	      var str = this.isObstacle ? 'obstacle' : 'empty';
	      this.fillByString(str);
	    }
	  }, {
	    key: '_fill',
	    value: function _fill(color) {
	      this.easelCell.graphics.beginFill(color).drawRect(0, 0, 10, 10);
	    }
	  }, {
	    key: 'fillByString',
	    value: function fillByString(colorString) {
	      this.color = graphNode.COLORS[colorString];
	      this._fill(graphNode.COLORS[colorString]);
	    }
	  }, {
	    key: 'drawBorder',
	    value: function drawBorder() {
	      this.easelCell.graphics.setStrokeStyle(0.5).beginStroke('#ffffff').drawRect(0, 0, 10, 10);
	    }
	  }, {
	    key: 'moveTo',
	    value: function moveTo(x, y) {
	      this.easelCell.x = x;
	      this.easelCell.y = y;
	    }
	  }]);
	
	  return graphNode;
	}();
	
	graphNode.COLORS = {
	  'empty': '#e8e8e8',
	  'start': '#ff0000',
	  'goal': '#0000ff',
	  'obstacle': '#c1c1c1'
	};
	
	exports.default = graphNode;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Queue = exports.Queue = function Queue() {
	  var _this = this;
	
	  _classCallCheck(this, Queue);
	
	  this.store = [];
	  // make me a linked list later?
	
	  this.dequeue = this.store.pop;
	  this.enqueue = function (item) {
	    return _this.store.unshift(item);
	  };
	  this.isEmpty = function () {
	    return _this.store.length === 0;
	  };
	};
	
	var PriorityQueue = exports.PriorityQueue = function () {
	  function PriorityQueue() {
	    _classCallCheck(this, PriorityQueue);
	
	    this.store = [{ item: null, priority: 0 }];
	    // use array to represent filled bst
	    // el at i has parent at Math.floor(i/2) and children at 2i, 2i+1
	  }
	
	  _createClass(PriorityQueue, [{
	    key: "insert",
	    value: function insert(item, priority) {
	      this.store.push({ item: item, priority: priority });
	      this._percolateUp();
	
	      return this.store.length;
	    }
	  }, {
	    key: "deleteMin",
	    value: function deleteMin() {
	      if (this.isEmpty()) {
	        return null;
	      } else if (this.store.length === 2) {
	        return this.store.pop();
	      } else {
	        var min = this.store[1];
	        this.store[1] = this.store.pop();
	        this._percolateDown();
	
	        return min;
	      }
	    }
	  }, {
	    key: "_percolateUp",
	    value: function _percolateUp() {
	      var childIdx = this.store.length - 1;
	      var parentIdx = Math.floor(childIdx / 2);
	      while (this.store[childIdx].priority < this.store[parentIdx].priority) {
	        var _ref = [this.store[parentIdx], this.store[childIdx]];
	        this.store[childIdx] = _ref[0];
	        this.store[parentIdx] = _ref[1];
	
	
	        childIdx = parentIdx;
	        parentIdx = Math.floor(childIdx / 2);
	      }
	    }
	  }, {
	    key: "isEmpty",
	    value: function isEmpty() {
	      return this.store.length === 1;
	    }
	  }, {
	    key: "_percolateDown",
	    value: function _percolateDown() {
	      var idx = 1;
	      var minChildIdx = this._getMinChildIdx(idx);
	
	      while (minChildIdx && this.store[idx].priority > this.store[minChildIdx].priority) {
	        var _ref2 = [this.store[minChildIdx], this.store[idx]];
	        this.store[idx] = _ref2[0];
	        this.store[minChildIdx] = _ref2[1];
	
	
	        idx = minChildIdx;
	        minChildIdx = this._getMinChildIdx(idx);
	      }
	    }
	  }, {
	    key: "_getMinChildIdx",
	    value: function _getMinChildIdx(idx) {
	      var leftChild = this.store[2 * idx];
	      var rightChild = this.store[2 * idx + 1];
	      var minChildIdx = void 0,
	          minPriority = void 0;
	      if (rightChild) {
	        minPriority = Math.min(leftChild.priority, rightChild.priority);
	      } else if (leftChild) {
	        minPriority = leftChild.priority;
	      } else {
	        return false;
	      }
	      return leftChild.priority === minPriority ? 2 * idx : 2 * idx + 1;
	    }
	  }]);

	  return PriorityQueue;
	}();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map