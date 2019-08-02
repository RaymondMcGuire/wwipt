/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\"); // config\n\n\nvar size = 420;\nvar canvas = document.getElementById('canvas');\ncanvas.height = size;\ncanvas.width = size;\nvar context = canvas.getContext('2d'); //init image buffer\n\nvar imageBuffer = new Array(size * size * 3);\n\nfor (var idx = 0; idx < imageBuffer.length; idx++) {\n  imageBuffer[idx] = 0;\n}\n\nfunction GenerateNoise(imageBuffer, startIdx, endIdx) {\n  for (var index = startIdx; index < endIdx; index += 3) {\n    var r = util_1.Utils.Random(0, 255);\n    var g = util_1.Utils.Random(0, 255);\n    var b = util_1.Utils.Random(0, 255);\n    imageBuffer[index] = r;\n    imageBuffer[index + 1] = g;\n    imageBuffer[index + 2] = b;\n  }\n\n  return imageBuffer;\n}\n\nvar currentProgress = 0;\n\nfunction render() {\n  if (currentProgress < size) {\n    imageBuffer = GenerateNoise(imageBuffer, size * currentProgress * 3, size * (1 + currentProgress) * 3);\n    util_1.Utils.Write2Canvas(context, imageBuffer, size);\n    currentProgress++;\n    requestAnimationFrame(render);\n  }\n}\n\nrender();\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar Utils;\n\n(function (Utils) {\n  function Random(min, max) {\n    return Math.floor(Math.random() * (max + 1 - min)) + min;\n  }\n\n  Utils.Random = Random;\n\n  function Write2Canvas(context, imageBuf, size) {\n    var canvasImage = context.getImageData(0, 0, size, size);\n\n    for (var i = 0; i < size; i++) {\n      for (var j = 0; j < size; j++) {\n        var idx = (i * size + j) * 4;\n        canvasImage.data[idx + 0] = imageBuf[(i * size + j) * 3 + 0];\n        canvasImage.data[idx + 1] = imageBuf[(i * size + j) * 3 + 1];\n        canvasImage.data[idx + 2] = imageBuf[(i * size + j) * 3 + 2];\n        canvasImage.data[idx + 3] = 255;\n      }\n    }\n\n    context.putImageData(canvasImage, 0, 0);\n  }\n\n  Utils.Write2Canvas = Write2Canvas;\n})(Utils = exports.Utils || (exports.Utils = {}));\n\n//# sourceURL=webpack:///./src/util.ts?");

/***/ })

/******/ });