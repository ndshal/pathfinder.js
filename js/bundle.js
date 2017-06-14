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
	
	var _view = __webpack_require__(1);
	
	var _view2 = _interopRequireDefault(_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var stage = new createjs.Stage('main-canvas');
	  var view = new _view2.default(stage);
	  window.view = view;
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _board = __webpack_require__(2);
	
	var _board2 = _interopRequireDefault(_board);
	
	var _search_export = __webpack_require__(5);
	
	var Finders = _interopRequireWildcard(_search_export);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	window.Finders = Finders;
	
	var View = function () {
	  function View(stage) {
	    _classCallCheck(this, View);
	
	    this.board = new _board2.default(stage);
	    this.board.init();
	    this.finder = new Finders.AStar(this.board);
	
	    this.addListeners();
	    this.resetDimensions();
	  }
	
	  _createClass(View, [{
	    key: 'addListeners',
	    value: function addListeners() {
	      window.addEventListener('resize', this.resetDimensions.bind(this));
	
	      $('#algo-controls input').on('change', this.setNewAlgo.bind(this));
	      $('#run-search').on('click', this.runSearch.bind(this));
	      $('#clear-search').on('click', this.clearSearch.bind(this));
	      $('#set-obs').on('click', this.setObstaclePreset.bind(this));
	      $('#clear-obs').on('click', this.clearObstacles.bind(this));
	      $('.instructions-hide').on('click', this.hideInstructions.bind(this));
	      $('.instructions-show').on('click', this.showInstructions.bind(this));
	      $('.demo-show').on('click', this.showDemo.bind(this));
	    }
	  }, {
	    key: 'setNewAlgo',
	    value: function setNewAlgo(e) {
	      e.preventDefault();
	      var algoName = $('input[name=algo]:checked', '#algo-controls').val();
	      this.finder.kill();
	      this.finder = new Finders[algoName](this.board);
	      this.board.clearSearch();
	    }
	  }, {
	    key: 'runSearch',
	    value: function runSearch(e) {
	      e.preventDefault();
	      this.board.allowPaint = false;
	      this.finder.run();
	    }
	  }, {
	    key: 'clearSearch',
	    value: function clearSearch(e) {
	      e.preventDefault();
	      this.finder.kill();
	      this.board.clearSearch();
	    }
	  }, {
	    key: 'setObstaclePreset',
	    value: function setObstaclePreset(e) {
	      e.preventDefault();
	      var preset = $('input[name=preset]:checked', '#obs-controls').val();
	      this.finder.kill();
	      this.board.clearSearch();
	      if (preset === 'simple') {
	        this.board.setupSimple();
	      } else if (preset === 'maze') {
	        this.board.setupMaze();
	      }
	    }
	  }, {
	    key: 'clearObstacles',
	    value: function clearObstacles(e) {
	      e.preventDefault();
	      this.board.clearObstacles();
	      // also clear search
	      this.finder.kill();
	      this.board.clearSearch();
	    }
	  }, {
	    key: 'hideInstructions',
	    value: function hideInstructions(e) {
	      e.preventDefault();
	      $('.controls').removeClass('minimized');
	      $('.instructions').addClass('minimized');
	      $('.instructions .content').addClass('hidden');
	      $('.instructions .buttons').addClass('hidden');
	      $('.instructions .instructions-show').removeClass('hidden');
	    }
	  }, {
	    key: 'showInstructions',
	    value: function showInstructions(e) {
	      e.preventDefault();
	      $('.controls').addClass('minimized');
	      $('.instructions').removeClass('minimized');
	      $('.instructions .content').removeClass('hidden');
	      $('.instructions .buttons').removeClass('hidden');
	      $('.instructions .demo-gif').addClass('hidden');
	      $('.demo-show').text('Demo');
	      $('.instructions .instructions-show').addClass('hidden');
	    }
	  }, {
	    key: 'showDemo',
	    value: function showDemo(e) {
	      e.preventDefault();
	      if ($('.demo-show').text() === 'Demo') {
	        $('.demo-show').text('Back');
	      } else {
	        $('.demo-show').text('Demo');
	      }
	      $('.instructions .content').toggleClass('hidden');
	      $('.instructions .demo-gif').toggleClass('hidden');
	    }
	  }, {
	    key: 'resetDimensions',
	    value: function resetDimensions() {
	      $('#main-canvas').width(window.innerWidth);
	      $('#main-canvas').height(window.innerHeight);
	      this.board.resetDimensions();
	    }
	  }]);
	
	  return View;
	}();
	
	exports.default = View;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _graph_node = __webpack_require__(3);
	
	var _graph_node2 = _interopRequireDefault(_graph_node);
	
	var _board_presets = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
	  function Board(stage) {
	    _classCallCheck(this, Board);
	
	    this.stage = stage;
	
	    this.resetDimensions();
	    this.grid = this.buildGrid();
	    this.addListeners();
	    this.allowPaint = true;
	  }
	
	  _createClass(Board, [{
	    key: 'resetDimensions',
	    value: function resetDimensions() {
	      this.DIM_X = this.stage.canvas.width;
	      this.DIM_Y = this.stage.canvas.height;
	      this.dx = 16;
	      this.dy = 16;
	    }
	  }, {
	    key: 'buildGrid',
	    value: function buildGrid() {
	      var grid = {};
	
	      for (var i = 0; i < this.DIM_X; i += this.dx) {
	        for (var j = 0; j < this.DIM_Y; j += this.dy) {
	          var node = new _graph_node2.default(i, j, this.dx, this.dy);
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
	      this.setupSimple();
	      // this.setStart(`${10*this.dx},${10*this.dy}`);
	      // this.setGoal(`${26*this.dx},${10*this.dy}`);
	      createjs.Ticker.addEventListener('tick', this.stage);
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(e) {
	      console.log([Math.floor(e.stageX / this.dx), Math.floor(e.stageY / this.dy)].toString());
	
	      if (this.allowPaint) {
	        var node = this.grid[this._getCoordsFromEvent(e)];
	        node.toggleIsObstacle();
	      }
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
	          if (this.start !== currCoords && this.goal !== currCoords && this.allowPaint) {
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
	    key: 'clearSearch',
	    value: function clearSearch() {
	      for (var coords in this.grid) {
	        this.grid[coords].clearIfSearch();
	      }
	      this.allowPaint = true;
	    }
	  }, {
	    key: 'clearObstacles',
	    value: function clearObstacles() {
	      for (var coords in this.grid) {
	        this.grid[coords].clearIfObstacle();
	      }
	    }
	  }, {
	    key: 'setupSimple',
	    value: function setupSimple() {
	      var _this2 = this;
	
	      this.clearObstacles();
	      this.setStart(this._localToGrid(_board_presets.simple.start));
	      this.setGoal(this._localToGrid(_board_presets.simple.goal));
	      _board_presets.simple.obstacles.forEach(function (coords) {
	        return _this2.grid[_this2._localToGrid(coords)].toggleIsObstacle();
	      });
	    }
	  }, {
	    key: 'setupMaze',
	    value: function setupMaze() {
	      var _this3 = this;
	
	      this.clearObstacles();
	      this.setStart(this._localToGrid(_board_presets.maze.start));
	      this.setGoal(this._localToGrid(_board_presets.maze.goal));
	      _board_presets.maze.obstacles.forEach(function (coords) {
	        return _this3.grid[_this3._localToGrid(coords)].toggleIsObstacle();
	      });
	    }
	  }, {
	    key: 'neighbors',
	    value: function neighbors(coords) {
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
	          if (dx === dy || dx === -dy) continue;
	
	          var testCoords = [x + this.dx * dx, y + this.dy * dy].toString();
	          if (this.grid[testCoords]) {
	            neighbors.push(testCoords);
	          }
	        }
	      }
	      return neighbors;
	    }
	  }, {
	    key: '_localToGrid',
	    value: function _localToGrid(localCoords) {
	      var _localCoords$split$ma = localCoords.split(',').map(function (str) {
	        return parseInt(str);
	      }),
	          _localCoords$split$ma2 = _slicedToArray(_localCoords$split$ma, 2),
	          i = _localCoords$split$ma2[0],
	          j = _localCoords$split$ma2[1];
	
	      return [i * this.dx, j * this.dy].toString();
	    }
	  }, {
	    key: '_getCoordsFromEvent',
	    value: function _getCoordsFromEvent(e) {
	      return [Math.floor(e.stageX / this.dx) * this.dx, Math.floor(e.stageY / this.dy) * this.dy].toString();
	    }
	  }, {
	    key: '_generateCoords',
	    value: function _generateCoords() {
	      var x = Math.random() * this.DIM_X;
	      var y = Math.random() * this.DIM_Y;
	      x = Math.floor(x / this.dx) * this.dx;
	      y = Math.floor(y / this.dy) * this.dy;
	      return [x, y].toString();
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var graphNode = function () {
	  function graphNode(x, y, dx, dy) {
	    _classCallCheck(this, graphNode);
	
	    this.easelCell = new createjs.Shape();
	    this.dx = dx;
	    this.dy = dy;
	    this.setType('empty');
	    this.setCoords(x, y);
	  }
	
	  _createClass(graphNode, [{
	    key: 'setType',
	    value: function setType(type) {
	      if (['visited', 'frontier'].includes(type) && ['start', 'goal', 'obstacle'].includes(this.type)) {
	        return;
	      }
	
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
	    key: 'clearIfSearch',
	    value: function clearIfSearch() {
	      if (['frontier', 'visited'].includes(this.type)) {
	        this.setType('empty');
	      }
	    }
	  }, {
	    key: 'clearIfObstacle',
	    value: function clearIfObstacle() {
	      if (this.type === 'obstacle') this.setType('empty');
	    }
	  }, {
	    key: '_fill',
	    value: function _fill(color) {
	      this.easelCell.graphics.clear();
	      this.drawBorder();
	      this.easelCell.graphics.beginFill(color).drawRect(1, 1, this.dx - 2, this.dy - 2).endFill();
	    }
	  }, {
	    key: 'drawBorder',
	    value: function drawBorder() {
	      this.easelCell.graphics.setStrokeStyle(1).beginStroke('#fff').drawRect(0, 0, this.dx, this.dy).endStroke();
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
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var simple = {
	  start: '10,15',
	  goal: '28,15',
	  obstacles: ['27,12', '27,13', '27,14', '27,15', '27,16', '27,17', '27,18', '26,11', '26,12', '26,13', '26,14', '26,15', '26,16', '26,17', '26,18', '26,19', '25,10', '25,11', '25,12', '25,13', '25,20', '25,19', '25,18', '25,17', '24,18', '24,19', '24,20', '24,21', '24,12', '24,11', '24,10', '24,9', '23,9', '23,10', '23,11', '22,9', '22,10', '22,11', '21,9', '21,10', '21,11', '20,10', '20,11', '19,11', '23,19', '23,20', '23,21', '22,19', '22,20', '22,21', '21,19', '21,20', '21,21', '20,19', '20,20', '19,19']
	  // obstacles: [
	  //   '21,8','21,9','21,10','21,11','21,12','21,13','21,14','20,7','20,8','20,9','20,10','20,11','20,12','20,13','20,14','20,15','19,6','19,7','19,8','19,9','19,16','19,15','19,14','19,13','18,14','18,15','18,16','18,17','18,8','18,7','18,6','18,5','17,5','17,6','17,7','16,5','16,6','16,7','15,5','15,6','15,7','14,6','14,7','13,7','17,15','17,16','17,17','16,15','16,16','16,17','15,15','15,16','15,17','14,15','14,16','13,15',
	  // ]
	};
	
	var simple2 = {
	  start: '9,18',
	  goal: '21,6',
	  obstacles: []
	};
	
	for (var i = 11; i < 21; i++) {
	  simple2.obstacles.push(i + ',6');
	  simple2.obstacles.push(i + ',7');
	  simple2.obstacles.push(i + ',8');
	}
	simple2.obstacles.push('10,7');
	for (var j = 7; j < 17; j++) {
	  simple2.obstacles.push('21,' + j);
	  if (j < 9) continue;
	  simple2.obstacles.push('20,' + j);
	  simple2.obstacles.push('19,' + j);
	}
	simple2.obstacles.push('20,17');
	
	var maze = {
	  start: '35,29',
	  goal: '0,0',
	  obstacles: []
	};
	for (var _i = 0; _i < 47; _i++) {
	  for (var _j = 0; _j < 31; _j++) {
	    if (_i % 2 === 0 || _j % 2 === 0) {
	      maze.obstacles.push(_i + ',' + _j);
	    }
	  }
	}
	// correct path
	maze.obstacles = maze.obstacles.concat(['0,1', '1,2', '2,3', '3,4', '4,5', '6,5', '8,5', '9,6', '10,7', '12,7', '13,8', '13,10', '13,12', '14,13', '16,13', '17,14', '17,16', '17,18', '17,20', '17,22', '18,23', '20,23', '21,22', '21,20', '22,19', '23,20', '23,22', '24,23', '25,24', '26,25', '27,24', '27,22', '27,20', '27,18', '27,16', '28,17', '29,18', '30,19', '32,19', '31,20', '32,21', '33,22', '33,24', '34,25', '32,25', '31,26', '32,27', '33,28', '34,29', '16,19', '14,19', '12,19', '11,18', '10,17', '9,16', '8,15', '10,15', '12,15', '17,14', '17,16', '13,13', '13,14', '13,13', '12,9', '10,9', '8,9', '7,8', '7,6', '5,4', '4,3', '4,5', '3,4', '3,2', '2,1', '0,1', '1,0', '0,1', '1,0', '14,9', '16,9', '17,8', '17,6', '16,5', '15,4', '14,3', '12,3', '11,4', '10,5', '10,7', '10,9', '7,8']);
	
	// fake paths on left
	maze.obstacles = maze.obstacles.concat(['28,21', '29,22', '30,23', '30,27', '29,26', '31,28', '30,29', '34,21', '36,23', '33,18', '34,17', '32,17', '31,16', '31,14', '31,12', '32,11', '34,11', '33,12', '33,14', '34,15', '35,14', '30,13', '29,12', '29,10', '30,9', '32,9', '33,8', '33,6', '34,5', '35,6', '29,14', '36,5', '1,2', '2,3', '1,2', '1,4', '2,5', '3,6', '2,7', '1,8', '2,9', '4,9', '5,10', '4,11', '3,12', '4,13', '5,14', '1,12', '1,14', '2,15', '2,11', '3,16', '2,17', '1,18', '2,19', '4,19', '6,19', '8,19', '9,20', '9,22', '10,23', '12,23', '13,24', '13,26', '12,27', '11,26', '10,25', '9,26', '9,28', '8,29', '7,28', '6,27', '5,26', '6,25', '6,21', '6,23', '4,21', '3,22', '7,22', '2,25', '3,24', '1,24', '2,21', '1,26', '1,28', '2,29', '3,28', '4,29', '12,29', '14,29', '15,28', '16,27', '18,27', '19,28', '17,28', '16,29', '17,28', '16,29', '18,29', '13,20', '14,21', '15,22', '15,24', '16,25', '17,26', '11,20', '20,27', '22,27', '23,25', '23,26', '23,25', '22,25', '21,24', '23,28', '20,29', '14,23', '1,2', '27,26', '27,28', '26,29', '25,28', '11,10', '11,12', '10,13', '9,12', '8,11', '7,12', '9,8', '36,29', '38,29', '37,28', '6,1', '8,1', '9,2', '8,3', '12,1', '14,1', '16,1', '17,2', '18,3', '20,3', '19,4', '19,6', '20,7', '21,8', '22,9', '23,10', '22,11', '20,11', '19,10', '23,12', '23,14', '22,15', '21,14', '20,13', '19,14', '19,20', '19,18', '20,17', '14,17', '15,16', '16,15', '18,15', '17,10', '16,11', '15,6', '13,6', '21,2', '22,1', '24,1', '25,2', '24,3', '23,4', '24,5', '26,5', '28,5', '30,5', '29,4', '29,2', '30,1', '32,1', '31,2', '32,1', '32,3', '33,2', '28,1', '27,2', '27,6', '26,7', '24,7', '25,8', '26,9', '26,11', '25,12', '26,13', '25,14', '28,13', '31,8', '30,7', '26,19', '25,18', '24,17', '24,21', '4,17', '5,16', '4,17', '5,16', '6,17', '7,18', '23,16', '23,12', '24,11']);
	
	// fake paths on right
	maze.obstacles = maze.obstacles.concat(['36,1', '37,2', '38,3', '39,4', '40,5', '42,5', '44,5', '45,6', '44,7', '42,7', '41,8', '42,9', '43,10', '44,11', '45,12', '45,14', '44,15', '43,14', '41,16', '42,17', '43,18', '44,19', '45,18', '43,20', '44,21', '45,22', '45,24', '44,25', '43,24', '42,25', '41,26', '42,27', '43,28', '44,29', '45,28', '39,26', '39,28', '40,25', '40,27', '41,28', '41,26', '40,25', '41,28', '42,29', '34,25', '36,25', '35,26', '37,24', '38,23', '39,22', '39,20', '40,19', '41,20', '42,23', '38,19', '37,18', '37,16', '38,15', '39,16', '36,19', '35,20', '34,21', '36,21', '37,10', '37,12', '38,13', '40,11', '39,10', '41,12', '39,12', '36,9', '39,6', '37,6', '38,5', '37,6', '38,7', '43,4', '43,2', '44,1', '45,2', '42,3', '32,19', '36,27', '36,15', '26,13']);
	
	exports.simple = simple;
	exports.maze = maze;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AStar = exports.BestFirst = exports.Dijkstra = exports.BFS = undefined;
	
	var _bfs = __webpack_require__(6);
	
	var _bfs2 = _interopRequireDefault(_bfs);
	
	var _dijkstra = __webpack_require__(10);
	
	var _dijkstra2 = _interopRequireDefault(_dijkstra);
	
	var _best_first = __webpack_require__(11);
	
	var _best_first2 = _interopRequireDefault(_best_first);
	
	var _a_star = __webpack_require__(12);
	
	var _a_star2 = _interopRequireDefault(_a_star);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.BFS = _bfs2.default;
	exports.Dijkstra = _dijkstra2.default;
	exports.BestFirst = _best_first2.default;
	exports.AStar = _a_star2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _search = __webpack_require__(7);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _data_structures = __webpack_require__(9);
	
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
	      _get(BFS.prototype.__proto__ || Object.getPrototypeOf(BFS.prototype), 'initializeFrontier', this).call(this);
	    }
	  }, {
	    key: 'processNeighbors',
	    value: function processNeighbors(current) {
	      this.board.neighbors(current).forEach(function (neighbor) {
	        if (!(neighbor in this.cameFrom)) {
	          var type = this.board.grid[neighbor].type;
	          if (type !== 'obstacle') {
	            this.frontier.enqueue(neighbor);
	            this.cameFrom[neighbor] = current;
	            this.board.grid[neighbor].setType('frontier');
	          }
	        }
	      }.bind(this));
	    }
	  }]);
	
	  return BFS;
	}(_search2.default);
	
	exports.default = BFS;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _path = __webpack_require__(8);
	
	var _path2 = _interopRequireDefault(_path);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Search = function () {
	  function Search(board) {
	    _classCallCheck(this, Search);
	
	    this.board = board;
	  }
	
	  _createClass(Search, [{
	    key: 'initializeFrontier',
	    value: function initializeFrontier() {
	      this.reset();
	      this.processNeighbors(this.board.start);
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      if (this.path) this.path.reset();
	      this.cameFrom = {};
	      this.cameFrom[this.board.start] = null;
	    }
	  }, {
	    key: 'kill',
	    value: function kill() {
	      clearInterval(this.updateInterval);
	      this.reset();
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var _this = this;
	
	      this.initializeFrontier();
	      this.updateInterval = setInterval(function () {
	        var current = _this.frontier.dequeue();
	        if (!current || current === _this.board.goal) {
	          clearInterval(_this.updateInterval);
	          _this.path = new _path2.default(_this.buildPath(), _this.board.stage);
	        }
	        _this.processNeighbors(current);
	        _this.board.grid[current].setType('visited');
	      }, 20);
	    }
	  }, {
	    key: 'buildPath',
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
	  }, {
	    key: 'manhattan',
	    value: function manhattan(coords1, coords2) {
	      var _coords1$split$map = coords1.split(',').map(function (s) {
	        return parseInt(s);
	      }),
	          _coords1$split$map2 = _slicedToArray(_coords1$split$map, 2),
	          x1 = _coords1$split$map2[0],
	          y1 = _coords1$split$map2[1];
	
	      var _coords2$split$map = coords2.split(',').map(function (s) {
	        return parseInt(s);
	      }),
	          _coords2$split$map2 = _slicedToArray(_coords2$split$map, 2),
	          x2 = _coords2$split$map2[0],
	          y2 = _coords2$split$map2[1];
	
	      return Math.abs(x1 - x2) + Math.abs(y1 - y2);
	    }
	  }, {
	    key: 'euclidean',
	    value: function euclidean(coords1, coords2) {
	      var _coords1$split$map3 = coords1.split(',').map(function (s) {
	        return parseInt(s);
	      }),
	          _coords1$split$map4 = _slicedToArray(_coords1$split$map3, 2),
	          x1 = _coords1$split$map4[0],
	          y1 = _coords1$split$map4[1];
	
	      var _coords2$split$map3 = coords2.split(',').map(function (s) {
	        return parseInt(s);
	      }),
	          _coords2$split$map4 = _slicedToArray(_coords2$split$map3, 2),
	          x2 = _coords2$split$map4[0],
	          y2 = _coords2$split$map4[1];
	
	      return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	    }
	  }]);
	
	  return Search;
	}();
	
	exports.default = Search;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Path = function () {
	  function Path(path, stage) {
	    _classCallCheck(this, Path);
	
	    this.stage = stage;
	    this.processStringPath(path);
	  }
	
	  _createClass(Path, [{
	    key: 'processStringPath',
	    value: function processStringPath(stringPath) {
	      this.path = new createjs.Shape();
	      this.path.graphics.setStrokeStyle(1).beginStroke('#000');
	
	      stringPath.forEach(function (strCoords) {
	        var _strCoords$split$map = strCoords.split(',').map(function (s) {
	          return parseInt(s);
	        }),
	            _strCoords$split$map2 = _slicedToArray(_strCoords$split$map, 2),
	            x = _strCoords$split$map2[0],
	            y = _strCoords$split$map2[1];
	
	        x += 10;y += 10; // center on square, refactor this!
	        this.path.graphics.lineTo(x, y);
	      }.bind(this));
	      this.path.graphics.endStroke();
	      this.stage.addChild(this.path);
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.stage.removeChild(this.path);
	    }
	  }]);
	
	  return Path;
	}();
	
	exports.default = Path;

/***/ }),
/* 9 */
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
	    key: "dequeue",
	    value: function dequeue() {
	      if (this.isEmpty()) {
	        return null;
	      } else if (this.store.length === 2) {
	        return this.store.pop().item;
	      } else {
	        var min = this.store[1];
	        this.store[1] = this.store.pop();
	        this._percolateDown();
	
	        return min.item;
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _search = __webpack_require__(7);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _data_structures = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Dijkstra = function (_Search) {
	  _inherits(Dijkstra, _Search);
	
	  function Dijkstra() {
	    _classCallCheck(this, Dijkstra);
	
	    return _possibleConstructorReturn(this, (Dijkstra.__proto__ || Object.getPrototypeOf(Dijkstra)).apply(this, arguments));
	  }
	
	  _createClass(Dijkstra, [{
	    key: 'initializeFrontier',
	    value: function initializeFrontier() {
	      this.frontier = new _data_structures.PriorityQueue();
	      _get(Dijkstra.prototype.__proto__ || Object.getPrototypeOf(Dijkstra.prototype), 'initializeFrontier', this).call(this);
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      _get(Dijkstra.prototype.__proto__ || Object.getPrototypeOf(Dijkstra.prototype), 'reset', this).call(this);
	      this.costSoFar = {};
	      this.costSoFar[this.board.start] = 0;
	    }
	  }, {
	    key: 'processNeighbors',
	    value: function processNeighbors(current) {
	      this.board.neighbors(current).forEach(function (neighbor) {
	        var type = this.board.grid[neighbor].type;
	        var cost = type === 'obstacle' ? 20000 : 34;
	        var newCost = this.costSoFar[current] + cost;
	
	        if (!(neighbor in this.costSoFar) || newCost < this.costSoFar[neighbor]) {
	          this.frontier.insert(neighbor, newCost);
	          this.cameFrom[neighbor] = current;
	          this.costSoFar[neighbor] = newCost;
	          this.board.grid[neighbor].setType('frontier');
	        }
	      }.bind(this));
	    }
	  }]);
	
	  return Dijkstra;
	}(_search2.default);
	
	exports.default = Dijkstra;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _search = __webpack_require__(7);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _data_structures = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BestFirst = function (_Search) {
	  _inherits(BestFirst, _Search);
	
	  function BestFirst() {
	    _classCallCheck(this, BestFirst);
	
	    return _possibleConstructorReturn(this, (BestFirst.__proto__ || Object.getPrototypeOf(BestFirst)).apply(this, arguments));
	  }
	
	  _createClass(BestFirst, [{
	    key: 'initializeFrontier',
	    value: function initializeFrontier() {
	      this.frontier = new _data_structures.PriorityQueue();
	      _get(BestFirst.prototype.__proto__ || Object.getPrototypeOf(BestFirst.prototype), 'initializeFrontier', this).call(this);
	    }
	  }, {
	    key: 'processNeighbors',
	    value: function processNeighbors(current) {
	      this.board.neighbors(current).forEach(function (neighbor) {
	        if (!(neighbor in this.cameFrom)) {
	          var type = this.board.grid[neighbor].type;
	          if (type !== 'obstacle') {
	            var priority = this.euclidean(neighbor, this.board.goal);
	
	            this.frontier.insert(neighbor, priority);
	            this.cameFrom[neighbor] = current;
	            this.board.grid[neighbor].setType('frontier');
	          }
	        }
	      }.bind(this));
	    }
	  }]);
	
	  return BestFirst;
	}(_search2.default);
	
	exports.default = BestFirst;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _search = __webpack_require__(7);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _data_structures = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AStar = function (_Search) {
	  _inherits(AStar, _Search);
	
	  function AStar() {
	    _classCallCheck(this, AStar);
	
	    return _possibleConstructorReturn(this, (AStar.__proto__ || Object.getPrototypeOf(AStar)).apply(this, arguments));
	  }
	
	  _createClass(AStar, [{
	    key: 'initializeFrontier',
	    value: function initializeFrontier() {
	      this.frontier = new _data_structures.PriorityQueue();
	      _get(AStar.prototype.__proto__ || Object.getPrototypeOf(AStar.prototype), 'initializeFrontier', this).call(this);
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      _get(AStar.prototype.__proto__ || Object.getPrototypeOf(AStar.prototype), 'reset', this).call(this);
	      this.costSoFar = {};
	      this.costSoFar[this.board.start] = 0;
	    }
	  }, {
	    key: 'processNeighbors',
	    value: function processNeighbors(current) {
	      this.board.neighbors(current).forEach(function (neighbor) {
	        var type = this.board.grid[neighbor].type;
	        var cost = type === 'obstacle' ? 20000 : 6;
	        var newCost = this.costSoFar[current] + cost;
	
	        if (!(neighbor in this.costSoFar) || newCost < this.costSoFar[neighbor]) {
	          var priority = newCost + this.euclidean(neighbor, this.board.goal);
	
	          this.frontier.insert(neighbor, priority);
	          this.cameFrom[neighbor] = current;
	          this.costSoFar[neighbor] = newCost;
	          this.board.grid[neighbor].setType('frontier');
	        }
	      }.bind(this));
	    }
	  }]);
	
	  return AStar;
	}(_search2.default);
	
	exports.default = AStar;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map