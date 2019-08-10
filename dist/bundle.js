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

/***/ "./node_modules/file-loader/dist/cjs.js?name=[name].js!./src/ww-sum.worker.ts":
/*!************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[name].js!./src/ww-sum.worker.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ww-sum.worker.js";

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");

var ww_sum_1 = __webpack_require__(/*! ./ww-sum */ "./src/ww-sum.ts"); // config


var size = 420;
var canvas = document.getElementById('canvas');
canvas.height = size;
canvas.width = size;
var context = canvas.getContext('2d'); // init image buffer

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
ww_sum_1.wwSum();

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

/***/ }),

/***/ "./src/ww-sum.ts":
/*!***********************!*\
  !*** ./src/ww-sum.ts ***!
  \***********************/
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

var ww_sum_worker_1 = __importDefault(__webpack_require__(/*! file-loader?name=[name].js!./ww-sum.worker */ "./node_modules/file-loader/dist/cjs.js?name=[name].js!./src/ww-sum.worker.ts"));

function wwSum() {
  // demo for web worker, calculate 1+2+3+...+100
  var endWorkerNum = 0;
  var workerNumber = 8;
  var workers = [];
  var TOTAL = 0;
  var MAX_NUM = 200;
  var processNum = 10;

  for (var wn = 0; wn < workerNumber; wn++) {
    workers[wn] = new Worker(ww_sum_worker_1["default"]);
    var id = wn + 1;
    var s = wn * Math.ceil(MAX_NUM / workerNumber) + 1;
    var e = s + processNum - 1;
    var em = (wn + 1) * Math.ceil(MAX_NUM / workerNumber);

    if (id === workerNumber) {
      em = MAX_NUM;
    }

    var parameter = {
      id: id,
      start: s,
      end: e,
      endMAX: em
    };
    workers[wn].postMessage(parameter);

    workers[wn].onmessage = function (message) {
      var result = message.data;
      var data = result.data;
      var endVal = result.endVal;
      var em = result.endMAX;
      var id = result.id;
      TOTAL += data;

      if (endVal <= MAX_NUM && endVal < em) {
        var parameter_1 = {
          id: id,
          start: endVal + 1,
          end: endVal + processNum,
          endMAX: em
        };
        this.postMessage(parameter_1);
      } else {
        this.terminate();
        endWorkerNum++;

        if (endWorkerNum === workerNumber) {
          console.log('process finish!', 'Total value is: ' + TOTAL);
        }
      }
    };
  }
}

exports.wwSum = wwSum;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3d3LXN1bS53b3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsLnRzIiwid2VicGFjazovLy8uL3NyYy93dy1zdW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixxQkFBdUIsc0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0F4Qzs7QUFDQSxzRSxDQUNBOzs7QUFDQSxJQUFNLElBQUksR0FBRyxHQUFiO0FBQ0EsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLElBQWhCO0FBQ0EsTUFBTSxDQUFDLEtBQVAsR0FBZSxJQUFmO0FBQ0EsSUFBSSxP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IiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJ3dy1zdW0ud29ya2VyLmpzXCI7IiwiaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL3V0aWwnXHJcbmltcG9ydCB7IHd3U3VtIH0gZnJvbSAnLi93dy1zdW0nXHJcbi8vIGNvbmZpZ1xyXG5jb25zdCBzaXplID0gNDIwXHJcbmxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgYW55XHJcbmNhbnZhcy5oZWlnaHQgPSBzaXplXHJcbmNhbnZhcy53aWR0aCA9IHNpemVcclxubGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuLy8gaW5pdCBpbWFnZSBidWZmZXJcclxubGV0IGltYWdlQnVmZmVyID0gbmV3IEFycmF5PG51bWJlcj4oc2l6ZSAqIHNpemUgKiAzKVxyXG5mb3IgKGxldCBpZHggPSAwOyBpZHggPCBpbWFnZUJ1ZmZlci5sZW5ndGg7IGlkeCsrKSB7XHJcbiAgaW1hZ2VCdWZmZXJbaWR4XSA9IDBcclxufVxyXG5cclxuZnVuY3Rpb24gR2VuZXJhdGVOb2lzZShcclxuICBpbWFnZUJ1ZmZlcjogQXJyYXk8bnVtYmVyPixcclxuICBzdGFydElkeDogbnVtYmVyLFxyXG4gIGVuZElkeDogbnVtYmVyXHJcbikge1xyXG4gIGZvciAobGV0IGluZGV4ID0gc3RhcnRJZHg7IGluZGV4IDwgZW5kSWR4OyBpbmRleCArPSAzKSB7XHJcbiAgICBsZXQgciA9IFV0aWxzLlJhbmRvbSgwLCAyNTUpXHJcbiAgICBsZXQgZyA9IFV0aWxzLlJhbmRvbSgwLCAyNTUpXHJcbiAgICBsZXQgYiA9IFV0aWxzLlJhbmRvbSgwLCAyNTUpXHJcblxyXG4gICAgaW1hZ2VCdWZmZXJbaW5kZXhdID0gclxyXG4gICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAxXSA9IGdcclxuICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMl0gPSBiXHJcbiAgfVxyXG4gIHJldHVybiBpbWFnZUJ1ZmZlclxyXG59XHJcblxyXG5sZXQgY3VycmVudFByb2dyZXNzID0gMFxyXG5cclxuZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gIGlmIChjdXJyZW50UHJvZ3Jlc3MgPCBzaXplKSB7XHJcbiAgICBpbWFnZUJ1ZmZlciA9IEdlbmVyYXRlTm9pc2UoXHJcbiAgICAgIGltYWdlQnVmZmVyLFxyXG4gICAgICBzaXplICogY3VycmVudFByb2dyZXNzICogMyxcclxuICAgICAgc2l6ZSAqICgxICsgY3VycmVudFByb2dyZXNzKSAqIDNcclxuICAgIClcclxuICAgIFV0aWxzLldyaXRlMkNhbnZhcyhjb250ZXh0LCBpbWFnZUJ1ZmZlciwgc2l6ZSlcclxuICAgIGN1cnJlbnRQcm9ncmVzcysrXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKVxyXG4gIH1cclxufVxyXG5cclxucmVuZGVyKClcclxuXHJcbnd3U3VtKClcclxuIiwiZXhwb3J0IG5hbWVzcGFjZSBVdGlscyB7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFJhbmRvbShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4ICsgMSAtIG1pbikpICsgbWluXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gV3JpdGUyQ2FudmFzKFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgaW1hZ2VCdWY6IEFycmF5PG51bWJlcj4sXHJcbiAgICBzaXplOiBudW1iZXJcclxuICApIHtcclxuICAgIGxldCBjYW52YXNJbWFnZSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHNpemUsIHNpemUpXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xyXG4gICAgICAgIGxldCBpZHggPSAoaSAqIHNpemUgKyBqKSAqIDRcclxuICAgICAgICBjYW52YXNJbWFnZS5kYXRhW2lkeCArIDBdID0gaW1hZ2VCdWZbKGkgKiBzaXplICsgaikgKiAzICsgMF1cclxuICAgICAgICBjYW52YXNJbWFnZS5kYXRhW2lkeCArIDFdID0gaW1hZ2VCdWZbKGkgKiBzaXplICsgaikgKiAzICsgMV1cclxuICAgICAgICBjYW52YXNJbWFnZS5kYXRhW2lkeCArIDJdID0gaW1hZ2VCdWZbKGkgKiBzaXplICsgaikgKiAzICsgMl1cclxuICAgICAgICBjYW52YXNJbWFnZS5kYXRhW2lkeCArIDNdID0gMjU1XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKGNhbnZhc0ltYWdlLCAwLCAwKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgd29ya2VyUGF0aCBmcm9tICdmaWxlLWxvYWRlcj9uYW1lPVtuYW1lXS5qcyEuL3d3LXN1bS53b3JrZXInXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd3dTdW0oKSB7XHJcbiAgLy8gZGVtbyBmb3Igd2ViIHdvcmtlciwgY2FsY3VsYXRlIDErMiszKy4uLisxMDBcclxuICBsZXQgZW5kV29ya2VyTnVtID0gMFxyXG4gIGxldCB3b3JrZXJOdW1iZXIgPSA4XHJcbiAgbGV0IHdvcmtlcnMgPSBbXVxyXG5cclxuICBsZXQgVE9UQUwgPSAwXHJcbiAgbGV0IE1BWF9OVU0gPSAyMDBcclxuICBsZXQgcHJvY2Vzc051bSA9IDEwXHJcblxyXG4gIGZvciAobGV0IHduID0gMDsgd24gPCB3b3JrZXJOdW1iZXI7IHduKyspIHtcclxuICAgIHdvcmtlcnNbd25dID0gbmV3IFdvcmtlcih3b3JrZXJQYXRoKVxyXG4gICAgbGV0IGlkID0gd24gKyAxXHJcbiAgICBsZXQgcyA9IHduICogTWF0aC5jZWlsKE1BWF9OVU0gLyB3b3JrZXJOdW1iZXIpICsgMVxyXG4gICAgbGV0IGUgPSBzICsgcHJvY2Vzc051bSAtIDFcclxuXHJcbiAgICBsZXQgZW0gPSAod24gKyAxKSAqIE1hdGguY2VpbChNQVhfTlVNIC8gd29ya2VyTnVtYmVyKVxyXG4gICAgaWYgKGlkID09PSB3b3JrZXJOdW1iZXIpIHtcclxuICAgICAgZW0gPSBNQVhfTlVNXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhcmFtZXRlciA9IHsgaWQ6IGlkLCBzdGFydDogcywgZW5kOiBlLCBlbmRNQVg6IGVtIH1cclxuICAgIHdvcmtlcnNbd25dLnBvc3RNZXNzYWdlKHBhcmFtZXRlcilcclxuICAgIHdvcmtlcnNbd25dLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICAgICAgbGV0IHJlc3VsdCA9IG1lc3NhZ2UuZGF0YVxyXG4gICAgICBsZXQgZGF0YSA9IHJlc3VsdC5kYXRhXHJcbiAgICAgIGxldCBlbmRWYWwgPSByZXN1bHQuZW5kVmFsXHJcbiAgICAgIGxldCBlbSA9IHJlc3VsdC5lbmRNQVhcclxuICAgICAgbGV0IGlkID0gcmVzdWx0LmlkXHJcbiAgICAgIFRPVEFMICs9IGRhdGFcclxuICAgICAgaWYgKGVuZFZhbCA8PSBNQVhfTlVNICYmIGVuZFZhbCA8IGVtKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtZXRlciA9IHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHN0YXJ0OiBlbmRWYWwgKyAxLFxyXG4gICAgICAgICAgZW5kOiBlbmRWYWwgKyBwcm9jZXNzTnVtLFxyXG4gICAgICAgICAgZW5kTUFYOiBlbVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKHBhcmFtZXRlcilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnRlcm1pbmF0ZSgpXHJcbiAgICAgICAgZW5kV29ya2VyTnVtKytcclxuICAgICAgICBpZiAoZW5kV29ya2VyTnVtID09PSB3b3JrZXJOdW1iZXIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9jZXNzIGZpbmlzaCEnLCAnVG90YWwgdmFsdWUgaXM6ICcgKyBUT1RBTClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==