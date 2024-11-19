/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateGrid.js */ \"./updateGrid.js\");\n/* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderGrid.js */ \"./renderGrid.js\");\n// index.js\n\n\nvar RESOLUTION = 10;\nvar canvas = document.querySelector('#screen');\nvar ctx = canvas.getContext('2d');\nvar startButton = document.querySelector('#start');\nvar pauseButton = document.querySelector('#pause');\ncanvas.width = _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS * RESOLUTION;\ncanvas.height = _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS * RESOLUTION;\nvar animationId = null;\nvar sound = new Audio('/ch15.04-10/ex10/decision1.mp3');\nvar grid = new Array(_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS).fill(null).map(function () {\n  return new Array(_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS).fill(null).map(function () {\n    return !!Math.floor(Math.random() * 2);\n  });\n});\ncanvas.addEventListener('click', function (evt) {\n  var rect = canvas.getBoundingClientRect();\n  var pos = {\n    x: evt.clientX - rect.left,\n    y: evt.clientY - rect.top\n  };\n  var row = Math.floor(pos.y / RESOLUTION);\n  var col = Math.floor(pos.x / RESOLUTION);\n  grid[row][col] = !grid[row][col];\n  sound.cloneNode().play();\n  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ctx, _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS, _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS, RESOLUTION);\n});\nfunction update() {\n  grid = (0,_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.updateGrid)(grid);\n  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ctx, _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS, _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS, RESOLUTION);\n  animationId = requestAnimationFrame(update);\n}\nstartButton.addEventListener('click', function () {\n  if (animationId) {\n    return;\n  }\n  update();\n});\npauseButton.addEventListener('click', function () {\n  if (!animationId) {\n    return;\n  }\n  cancelAnimationFrame(animationId);\n  animationId = null;\n});\n(0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ctx, _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS, _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS, RESOLUTION);\n\n//# sourceURL=webpack://ex05/./index.js?");

/***/ }),

/***/ "./renderGrid.js":
/*!***********************!*\
  !*** ./renderGrid.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderGrid: () => (/* binding */ renderGrid)\n/* harmony export */ });\n// renderGrid.js\nfunction renderGrid(grid, ctx, ROWS, COLS, RESOLUTION) {\n  for (var row = 0; row < ROWS; row++) {\n    for (var col = 0; col < COLS; col++) {\n      var cell = grid[row][col];\n      ctx.beginPath();\n      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);\n      ctx.fillStyle = cell ? 'black' : 'white';\n      ctx.fill();\n      ctx.stroke();\n    }\n  }\n}\n\n//# sourceURL=webpack://ex05/./renderGrid.js?");

/***/ }),

/***/ "./updateGrid.js":
/*!***********************!*\
  !*** ./updateGrid.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   COLS: () => (/* binding */ COLS),\n/* harmony export */   ROWS: () => (/* binding */ ROWS),\n/* harmony export */   updateGrid: () => (/* binding */ updateGrid)\n/* harmony export */ });\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\n// updateGrid.js\nvar ROWS = 50;\nvar COLS = 50;\nfunction updateGrid(grid) {\n  var nextGrid = grid.map(function (arr) {\n    return _toConsumableArray(arr);\n  });\n  for (var row = 0; row < ROWS; row++) {\n    for (var col = 0; col < COLS; col++) {\n      var liveNeighbors = 0;\n      for (var i = -1; i <= 1; i++) {\n        for (var j = -1; j <= 1; j++) {\n          if (i === 0 && j === 0) continue;\n          var newRow = row + i;\n          var newCol = col + j;\n          if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {\n            if (grid[newRow][newCol]) {\n              liveNeighbors++;\n            }\n          }\n        }\n      }\n      if (grid[row][col]) {\n        if (liveNeighbors < 2 || liveNeighbors > 3) {\n          nextGrid[row][col] = false;\n        }\n      } else {\n        if (liveNeighbors === 3) {\n          nextGrid[row][col] = true;\n        }\n      }\n    }\n  }\n  return nextGrid;\n}\n\n//# sourceURL=webpack://ex05/./updateGrid.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;