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
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/file-loader/dist/cjs.js?name=[name].js!./src/test.worker.ts":
/*!**********************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[name].js!./src/test.worker.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "test.worker.js";

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");

var test_worker_1 = __importDefault(__webpack_require__(/*! file-loader?name=[name].js!./test.worker */ "./node_modules/file-loader/dist/cjs.js?name=[name].js!./src/test.worker.ts")); // config


var size = 420;
var canvas = document.getElementById('canvas');
canvas.height = size;
canvas.width = size;
var context = canvas.getContext('2d'); //init image buffer

var imageBuffer = new Array(size * size * 3);

for (var idx = 0; idx < imageBuffer.length; idx++) {
  imageBuffer[idx] = 0;
}

function GenerateNoise(imageBuffer, startIdx, endIdx) {
  for (var index = startIdx; index < endIdx; index += 3) {
    var r = util_1.Utils.Random(0, 255);
    var g = util_1.Utils.Random(0, 255);
    var b = util_1.Utils.Random(0, 255);
    imageBuffer[index] = r;
    imageBuffer[index + 1] = g;
    imageBuffer[index + 2] = b;
  }

  return imageBuffer;
}

var currentProgress = 0;

function render() {
  if (currentProgress < size) {
    imageBuffer = GenerateNoise(imageBuffer, size * currentProgress * 3, size * (1 + currentProgress) * 3);
    util_1.Utils.Write2Canvas(context, imageBuffer, size);
    currentProgress++;
    requestAnimationFrame(render);
  }
}

render();
var worker = new Worker(test_worker_1["default"]);
console.log(test_worker_1["default"], worker);
worker.addEventListener('message', function (message) {
  console.log(message);
});
worker.postMessage('this is a test message to the worker');

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Utils;

(function (Utils) {
  function Random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

  Utils.Random = Random;

  function Write2Canvas(context, imageBuf, size) {
    var canvasImage = context.getImageData(0, 0, size, size);

    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        var idx = (i * size + j) * 4;
        canvasImage.data[idx + 0] = imageBuf[(i * size + j) * 3 + 0];
        canvasImage.data[idx + 1] = imageBuf[(i * size + j) * 3 + 1];
        canvasImage.data[idx + 2] = imageBuf[(i * size + j) * 3 + 2];
        canvasImage.data[idx + 3] = 255;
      }
    }

    context.putImageData(canvasImage, 0, 0);
  }

  Utils.Write2Canvas = Write2Canvas;
})(Utils = exports.Utils || (exports.Utils = {}));

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rlc3Qud29ya2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsaUJBQWlCLHFCQUF1QixvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXhDOztBQUNBLHVMLENBRUE7OztBQUNBLElBQU0sSUFBSSxHQUFHLEdBQWI7QUFDQSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsSUFBaEI7QUFDQSxNQUFNLENBQUMsS0FBUCxHQUFlLElBQWY7QUFDQSxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBUCxD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Q0FBaUIsR0FBRyxHQUFHLENBQXZCLElBQTRCLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFKLEdBQVcsQ0FBWixJQUFpQixDQUFqQixHQUFxQixDQUF0QixDQUFwQztBQUNBLG1CQUFXLENBQUMsSUFBWixDQUFpQixHQUFHLEdBQUcsQ0FBdkIsSUFBNEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUosR0FBVyxDQUFaLElBQWlCLENBQWpCLEdBQXFCLENBQXRCLENBQXBDO0FBQ0EsbUJBQVcsQ0FBQyxJQUFaLENBQWlCLEdBQUcsR0FBRyxDQUF2QixJQUE0QixRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSixHQUFXLENBQVosSUFBaUIsQ0FBakIsR0FBcUIsQ0FBdEIsQ0FBcEM7QUFDQSxtQkFBVyxDQUFDLElBQVosQ0FBaUIsR0FBRyxHQUFHLENBQXZCLElBQTRCLEdBQTVCO0FBQ0Q7QUFDRjs7QUFDRCxXQUFPLENBQUMsWUFBUixDQUFxQixXQUFyQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQztBQUNEOztBQWhCZSx1QkFBWSxZQUFaO0FBaUJqQixDQXhCRCxFQUFpQixLQUFLLEdBQUwsa0NBQUssRUFBTCxDQUFqQixFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJ0ZXN0Lndvcmtlci5qc1wiOyIsImltcG9ydCB7VXRpbHN9IGZyb20gJy4vdXRpbCdcclxuaW1wb3J0IHdvcmtlclBhdGggZnJvbSBcImZpbGUtbG9hZGVyP25hbWU9W25hbWVdLmpzIS4vdGVzdC53b3JrZXJcIjtcclxuXHJcbi8vIGNvbmZpZ1xyXG5jb25zdCBzaXplID0gNDIwXHJcbmxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgYW55XHJcbmNhbnZhcy5oZWlnaHQgPSBzaXplXHJcbmNhbnZhcy53aWR0aCA9IHNpemVcclxubGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuLy9pbml0IGltYWdlIGJ1ZmZlclxyXG5sZXQgaW1hZ2VCdWZmZXIgPSBuZXcgQXJyYXk8bnVtYmVyPihzaXplICogc2l6ZSAqIDMpXHJcbmZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGltYWdlQnVmZmVyLmxlbmd0aDsgaWR4KyspIHtcclxuICAgIGltYWdlQnVmZmVyW2lkeF0gPSAwXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEdlbmVyYXRlTm9pc2UoaW1hZ2VCdWZmZXI6QXJyYXk8bnVtYmVyPixzdGFydElkeDpudW1iZXIsZW5kSWR4Om51bWJlcil7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IHN0YXJ0SWR4OyBpbmRleCA8IGVuZElkeDsgaW5kZXgrPTMpIHtcclxuICAgICAgICBsZXQgciA9IFV0aWxzLlJhbmRvbSgwLDI1NSlcclxuICAgICAgICBsZXQgZyA9IFV0aWxzLlJhbmRvbSgwLDI1NSlcclxuICAgICAgICBsZXQgYiA9IFV0aWxzLlJhbmRvbSgwLDI1NSlcclxuXHJcbiAgICAgICAgaW1hZ2VCdWZmZXJbaW5kZXhdID0gclxyXG4gICAgICAgIGltYWdlQnVmZmVyW2luZGV4KzFdID0gZ1xyXG4gICAgICAgIGltYWdlQnVmZmVyW2luZGV4KzJdID0gYlxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGltYWdlQnVmZmVyXHJcbn1cclxuXHJcbmxldCBjdXJyZW50UHJvZ3Jlc3MgPSAwXHJcblxyXG5mdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICBpZihjdXJyZW50UHJvZ3Jlc3M8c2l6ZSl7XHJcbiAgICAgICAgaW1hZ2VCdWZmZXIgPSBHZW5lcmF0ZU5vaXNlKGltYWdlQnVmZmVyLHNpemUqY3VycmVudFByb2dyZXNzKjMsc2l6ZSooMStjdXJyZW50UHJvZ3Jlc3MpKjMpXHJcbiAgICAgICAgVXRpbHMuV3JpdGUyQ2FudmFzKGNvbnRleHQsaW1hZ2VCdWZmZXIsc2l6ZSlcclxuICAgICAgICBjdXJyZW50UHJvZ3Jlc3MrK1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbnJlbmRlcigpO1xyXG5cclxuY29uc3Qgd29ya2VyID0gbmV3IFdvcmtlcih3b3JrZXJQYXRoKTtcclxuXHJcbmNvbnNvbGUubG9nKHdvcmtlclBhdGgsIHdvcmtlcik7XHJcbndvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbWVzc2FnZSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxufSk7XHJcbndvcmtlci5wb3N0TWVzc2FnZSgndGhpcyBpcyBhIHRlc3QgbWVzc2FnZSB0byB0aGUgd29ya2VyJyk7IiwiXHJcbmV4cG9ydCBuYW1lc3BhY2UgVXRpbHMge1xyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSYW5kb20obWluOm51bWJlcixtYXg6bnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIChtYXggKyAxIC0gbWluKSApICsgbWluO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFdyaXRlMkNhbnZhcyhcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIGltYWdlQnVmOiBBcnJheTxudW1iZXI+LFxyXG4gICAgc2l6ZTogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBsZXQgY2FudmFzSW1hZ2UgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBzaXplLCBzaXplKVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcclxuICAgICAgICBsZXQgaWR4ID0gKGkgKiBzaXplICsgaikgKiA0XHJcbiAgICAgICAgY2FudmFzSW1hZ2UuZGF0YVtpZHggKyAwXSA9IGltYWdlQnVmWyhpICogc2l6ZSArIGopICogMyArIDBdXHJcbiAgICAgICAgY2FudmFzSW1hZ2UuZGF0YVtpZHggKyAxXSA9IGltYWdlQnVmWyhpICogc2l6ZSArIGopICogMyArIDFdXHJcbiAgICAgICAgY2FudmFzSW1hZ2UuZGF0YVtpZHggKyAyXSA9IGltYWdlQnVmWyhpICogc2l6ZSArIGopICogMyArIDJdXHJcbiAgICAgICAgY2FudmFzSW1hZ2UuZGF0YVtpZHggKyAzXSA9IDI1NVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShjYW52YXNJbWFnZSwgMCwgMClcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==