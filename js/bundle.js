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
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
	  function Board(stage) {
	    _classCallCheck(this, Board);
	
	    this.stage = stage;
	
	    this.handleClick = this.handleClick.bind(this);
	  }
	
	  _createClass(Board, [{
	    key: 'handleClick',
	    value: function handleClick(e) {
	      var cell = e.target;
	      console.log(e.target);
	      cell.graphics.beginFill('#0FF').drawRect(0, 0, 10, 10);
	      this.stage.update();
	    }
	  }, {
	    key: 'drawGrid',
	    value: function drawGrid() {
	      for (var i = 0; i < 15; i++) {
	        for (var j = 0; j < 15; j++) {
	          var cell = new createjs.Shape();
	          cell.graphics.setStrokeStyle(0.5).beginStroke("black");
	          cell.x = i * 10;
	          cell.y = j * 10;
	          cell.graphics.beginFill('#FFF').drawRect(0, 0, 10, 10);
	          cell.on('click', this.handleClick);
	
	          this.stage.addChild(cell);
	        }
	      }
	
	      this.stage.update();
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map