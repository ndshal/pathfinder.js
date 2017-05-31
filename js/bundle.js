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
	
	var _data_structures = __webpack_require__(3);
	
	var _bfs = __webpack_require__(4);
	
	var _bfs2 = _interopRequireDefault(_bfs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.PriorityQueue = _data_structures.PriorityQueue;
	
	window.BFS = _bfs2.default;
	
	document.addEventListener('DOMContentLoaded', function () {
	  var stage = new createjs.Stage('main-canvas');
	  var board = new _board2.default(stage);
	  board.init();
	  window.board = board;
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _graph_node = __webpack_require__(2);
	
	var _graph_node2 = _interopRequireDefault(_graph_node);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
	  function Board(stage) {
	    _classCallCheck(this, Board);
	
	    this.stage = stage;
	    this.grid = this.buildGrid();
	    this.addListeners();
	  }
	
	  _createClass(Board, [{
	    key: 'buildGrid',
	    value: function buildGrid() {
	      var grid = {};
	
	      for (var i = 0; i < Board.DIM_X; i += Board.dx) {
	        for (var j = 0; j < Board.DIM_Y; j += Board.dy) {
	          var node = new _graph_node2.default(i, j);
	          grid[node.coords] = node;
	          this.stage.addChild(node.easelCell);
	        }
	      }
	
	      return grid;
	    }
	  }, {
	    key: 'addListeners',
	    value: function addListeners() {
	      var _this = this;
	
	      this.stage.on('click', this.handleClick.bind(this));
	      this.stage.on('pressmove', this.handleMouseMove.bind(this));
	      this.stage.on('pressup', function () {
	        _this.handleMouseMove.prevCoords = null;
	      });
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      this.setStart('10,10');
	      this.setGoal('110,100');
	      createjs.Ticker.addEventListener('tick', this.stage);
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(e) {
	      var node = this.grid[this._getCoordsFromEvent(e)];
	      node.toggleIsObstacle();
	    }
	  }, {
	    key: 'handleMouseMove',
	    value: function handleMouseMove(e) {
	      var currCoords = this._getCoordsFromEvent(e);
	      if (!this.grid[currCoords]) return false;
	
	      var prevCoords = this.handleMouseMove.prevCoords;
	
	      //only allow pressmove in discrete cells
	      if (currCoords !== prevCoords) {
	        if (this.start === prevCoords) {
	          this.setStart(currCoords);
	        } else if (this.goal === prevCoords) {
	          this.setGoal(currCoords);
	        } else {
	          if (this.start !== currCoords && this.goal !== currCoords) {
	            var node = this.grid[currCoords];
	            node.toggleIsObstacle();
	          }
	        }
	
	        this.handleMouseMove.prevCoords = currCoords;
	      }
	    }
	  }, {
	    key: 'setStart',
	    value: function setStart(coords) {
	      if (this.start) this.grid[this.start].setType('empty');
	      this.start = coords;
	      this.grid[coords].setType('start');
	    }
	  }, {
	    key: 'setGoal',
	    value: function setGoal(coords) {
	      if (this.goal) this.grid[this.goal].setType('empty');
	      this.goal = coords;
	      this.grid[coords].setType('goal');
	    }
	  }, {
	    key: '_getCoordsFromEvent',
	    value: function _getCoordsFromEvent(e) {
	      return [Math.floor(e.stageX / Board.dx) * Board.dx, Math.floor(e.stageY / Board.dx) * Board.dy].toString();
	    }
	  }, {
	    key: 'neigbors',
	    value: function neigbors(coords) {
	      var _coords$split$map = coords.split(',').map(function (str) {
	        return parseInt(str);
	      }),
	          _coords$split$map2 = _slicedToArray(_coords$split$map, 2),
	          x = _coords$split$map2[0],
	          y = _coords$split$map2[1];
	
	      //array of coords that are neighbors
	
	
	      var neighbors = [];
	      for (var dx = -1; dx < 2; dx++) {
	        for (var dy = -1; dy < 2; dy++) {
	          if (dx === 0 && dy === 0) continue;
	
	          var testCoords = [x + Board.dx * dx, y + Board.dy * dy].toString();
	          if (this.grid[testCoords]) {
	            neighbors.push(testCoords);
	          }
	        }
	      }
	
	      return neighbors;
	    }
	  }]);
	
	  return Board;
	}();
	
	Board.dx = 10;
	Board.dy = 10;
	Board.DIM_X = 150; //pixels, not # gridpoints
	Board.DIM_Y = 150;
	
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
	
	var graphNode = function () {
	  function graphNode(x, y) {
	    _classCallCheck(this, graphNode);
	
	    this.easelCell = new createjs.Shape();
	    this.drawBorder();
	    this.setType('empty');
	    this.setCoords(x, y);
	  }
	
	  _createClass(graphNode, [{
	    key: 'setType',
	    value: function setType(type) {
	      this.type = type;
	      this._fill(graphNode.COLORS[type]);
	    }
	  }, {
	    key: 'setCoords',
	    value: function setCoords(x, y) {
	      this.coords = [x, y].toString();
	      this.easelCell.x = x;
	      this.easelCell.y = y;
	    }
	  }, {
	    key: 'toggleIsObstacle',
	    value: function toggleIsObstacle() {
	      if (this.type === 'obstacle') {
	        this.setType('empty');
	      } else if (this.type === 'empty') {
	        this.setType('obstacle');
	      }
	    }
	  }, {
	    key: '_fill',
	    value: function _fill(color) {
	      this.easelCell.graphics.beginFill(color).drawRect(0, 0, 10, 10);
	    }
	  }, {
	    key: 'drawBorder',
	    value: function drawBorder() {
	      this.easelCell.graphics.setStrokeStyle(0.5).beginStroke('#ffffff').drawRect(0, 0, 10, 10);
	    }
	  }]);
	
	  return graphNode;
	}();
	
	graphNode.COLORS = {
	  'empty': '#e8e8e8',
	  'start': '#f00',
	  'goal': '#00f',
	  'obstacle': '#c1c1c1',
	  'visited': '#98fb98',
	  'frontier': '#0ff'
	};
	
	exports.default = graphNode;

/***/ }),
/* 3 */
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
	
	  this.dequeue = function () {
	    return _this.store.pop();
	  };
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _search = __webpack_require__(5);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _data_structures = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BFS = function (_Search) {
	  _inherits(BFS, _Search);
	
	  function BFS() {
	    _classCallCheck(this, BFS);
	
	    return _possibleConstructorReturn(this, (BFS.__proto__ || Object.getPrototypeOf(BFS)).apply(this, arguments));
	  }
	
	  _createClass(BFS, [{
	    key: 'initializeFrontier',
	    value: function initializeFrontier() {
	      this.frontier = new _data_structures.Queue();
	
	      this.processNeighbors(this.board.start);
	    }
	  }, {
	    key: 'updateFrontier',
	    value: function updateFrontier() {
	      var current = this.frontier.dequeue();
	      this.processNeighbors(current);
	      this.board.grid[current].setType('visited');
	    }
	  }, {
	    key: 'processNeighbors',
	    value: function processNeighbors(current) {
	      for (var neighbor in this.board.neighbors(current)) {
	        if (!(neighbor in this.cameFrom)) {
	          this.frontier.enqueue(neighbor);
	          this.cameFrom[neighbor] = current;
	          this.board.grid[neighbor].setType('frontier');
	        }
	      }
	    }
	  }]);
	
	  return BFS;
	}(_search2.default);
	
	exports.default = BFS;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Search = function () {
	  function Search(board) {
	    _classCallCheck(this, Search);
	
	    this.cameFrom = {};
	    this.cameFrom[board.start] = null;
	
	    this.board = board;
	    this.initializeFrontier();
	  }
	
	  _createClass(Search, [{
	    key: "buildPath",
	    value: function buildPath() {
	      if (!this.cameFrom[this.board.goal]) {
	        return null;
	      }
	
	      var current = this.board.goal;
	      var path = [];
	
	      while (current) {
	        path.unshift(current);
	        current = this.cameFrom[current];
	      }
	
	      return path;
	    }
	  }]);
	
	  return Search;
	}();
	
	exports.default = Search;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map