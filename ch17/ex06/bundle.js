/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./renderGrid.js":
/*!***********************!*\
  !*** ./renderGrid.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGrid: () => (/* binding */ renderGrid)
/* harmony export */ });
// renderGrid.js
function renderGrid(grid, ctx, ROWS, COLS, RESOLUTION) {
  for (var row = 0; row < ROWS; row++) {
    for (var col = 0; col < COLS; col++) {
      var cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
      ctx.stroke();
    }
  }
}

/***/ }),

/***/ "./updateGrid.js":
/*!***********************!*\
  !*** ./updateGrid.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COLS: () => (/* binding */ COLS),
/* harmony export */   ROWS: () => (/* binding */ ROWS),
/* harmony export */   updateGrid: () => (/* binding */ updateGrid)
/* harmony export */ });
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// updateGrid.js
var ROWS = 50;
var COLS = 50;
function updateGrid(grid) {
  var nextGrid = grid.map(function (arr) {
    return _toConsumableArray(arr);
  });
  for (var row = 0; row < ROWS; row++) {
    for (var col = 0; col < COLS; col++) {
      var liveNeighbors = 0;
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          var newRow = row + i;
          var newCol = col + j;
          if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
            if (grid[newRow][newCol]) {
              liveNeighbors++;
            }
          }
        }
      }
      if (grid[row][col]) {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          nextGrid[row][col] = false;
        }
      } else {
        if (liveNeighbors === 3) {
          nextGrid[row][col] = true;
        }
      }
    }
  }
  return nextGrid;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateGrid.js */ "./updateGrid.js");
/* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderGrid.js */ "./renderGrid.js");
// index.js


var RESOLUTION = 10;
var canvas = document.querySelector('#screen');
var ctx = canvas.getContext('2d');
var startButton = document.querySelector('#start');
var pauseButton = document.querySelector('#pause');
canvas.width = _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS * RESOLUTION;
canvas.height = _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS * RESOLUTION;
var animationId = null;
var sound = new Audio('/ch15.04-10/ex10/decision1.mp3');
var grid = new Array(_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS).fill(null).map(function () {
  return new Array(_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS).fill(null).map(function () {
    return !!Math.floor(Math.random() * 2);
  });
});
canvas.addEventListener('click', function (evt) {
  var rect = canvas.getBoundingClientRect();
  var pos = {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
  var row = Math.floor(pos.y / RESOLUTION);
  var col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ctx, _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS, _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS, RESOLUTION);
});
function update() {
  grid = (0,_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.updateGrid)(grid);
  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ctx, _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS, _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS, RESOLUTION);
  animationId = requestAnimationFrame(update);
}
startButton.addEventListener('click', function () {
  if (animationId) {
    return;
  }
  update();
});
pauseButton.addEventListener('click', function () {
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});
(0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ctx, _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS, _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS, RESOLUTION);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map