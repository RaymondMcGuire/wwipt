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
ww_sum_1.wwSum(false);

/***/ }),

/***/ "./src/time.ts":
/*!*********************!*\
  !*** ./src/time.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var TimeStatistic;

(function (TimeStatistic) {
  var s;
  var e;

  function start() {
    s = new Date();
  }

  TimeStatistic.start = start;

  function end() {
    e = new Date();
    var timeDiff = e - s; // console.log(timeDiff + ' ms')

    return timeDiff;
  }

  TimeStatistic.end = end;
})(TimeStatistic = exports.TimeStatistic || (exports.TimeStatistic = {}));

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

var time_1 = __webpack_require__(/*! ./time */ "./src/time.ts");

var ww_sum_worker_1 = __importDefault(__webpack_require__(/*! file-loader?name=[name].js!./ww-sum.worker */ "./node_modules/file-loader/dist/cjs.js?name=[name].js!./src/ww-sum.worker.ts"));

function wwSum(bDebug) {
  if (bDebug === void 0) {
    bDebug = true;
  }

  time_1.TimeStatistic.start(); // demo for web worker, calculate 1+2+3+...+100

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
      endMAX: em,
      debug: bDebug
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
          endMAX: em,
          debug: bDebug
        };
        this.postMessage(parameter_1);
      } else {
        this.terminate();
        endWorkerNum++;

        if (endWorkerNum === workerNumber) {
          var time = time_1.TimeStatistic.end();
          console.log('process finish!', 'Total value is: ' + TOTAL, 'Time: ' + time + 'ms');
        }
      }
    };
  }
}

exports.wwSum = wwSum;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3d3LXN1bS53b3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy90aW1lLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsLnRzIiwid2VicGFjazovLy8uL3NyYy93dy1zdW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixxQkFBdUIsc0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0F4Qzs7QUFDQSxzRSxDQUNBOzs7QUFDQSxJQUFNLElBQUksR0FBRyxHQUFiO0FBQ0EsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLElBQWhCO0FBQ0EsTUFBTSxDQUFD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cEI7QUFDQSxVQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBaEI7QUFDQSxVQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBaEI7QUFDQSxXQUFLLElBQUksSUFBVDs7QUFDQSxVQUFJLE1BQU0sSUFBSSxPQUFWLElBQXFCLE1BQU0sR0FBRyxFQUFsQyxFQUFzQztBQUNwQyxZQUFJLFdBQVMsR0FBRztBQUNkLFlBQUUsRUFBRSxFQURVO0FBRWQsZUFBSyxFQUFFLE1BQU0sR0FBRyxDQUZGO0FBR2QsYUFBRyxFQUFFLE1BQU0sR0FBRyxVQUhBO0FBSWQsZ0JBQU0sRUFBRSxFQUpNO0FBS2QsZUFBSyxFQUFFO0FBTE8sU0FBaEI7QUFPQSxhQUFLLFdBQUwsQ0FBaUIsV0FBakI7QUFDRCxPQVRELE1BU087QUFDTCxhQUFLLFNBQUw7QUFDQSxvQkFBWTs7QUFDWixZQUFJLFlBQVksS0FBSyxZQUFyQixFQUFtQztBQUNqQyxjQUFJLElBQUksR0FBRyxxQkFBYyxHQUFkLEVBQVg7QUFDQSxpQkFBTyxDQUFDLEdBQVIsQ0FDRSxpQkFERixFQUVFLHFCQUFxQixLQUZ2QixFQUdFLFdBQVcsSUFBWCxHQUFrQixJQUhwQjtBQUtEO0FBQ0Y7QUFDRixLQTVCRDtBQTZCRDtBQUNGOztBQXZERCxzQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwid3ctc3VtLndvcmtlci5qc1wiOyIsImltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi91dGlsJ1xyXG5pbXBvcnQgeyB3d1N1bSB9IGZyb20gJy4vd3ctc3VtJ1xyXG4vLyBjb25maWdcclxuY29uc3Qgc2l6ZSA9IDQyMFxyXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIGFueVxyXG5jYW52YXMuaGVpZ2h0ID0gc2l6ZVxyXG5jYW52YXMud2lkdGggPSBzaXplXHJcbmxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcclxuXHJcbi8vIGluaXQgaW1hZ2UgYnVmZmVyXHJcbmxldCBpbWFnZUJ1ZmZlciA9IG5ldyBBcnJheTxudW1iZXI+KHNpemUgKiBzaXplICogMylcclxuZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgaW1hZ2VCdWZmZXIubGVuZ3RoOyBpZHgrKykge1xyXG4gIGltYWdlQnVmZmVyW2lkeF0gPSAwXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEdlbmVyYXRlTm9pc2UoXHJcbiAgaW1hZ2VCdWZmZXI6IEFycmF5PG51bWJlcj4sXHJcbiAgc3RhcnRJZHg6IG51bWJlcixcclxuICBlbmRJZHg6IG51bWJlclxyXG4pIHtcclxuICBmb3IgKGxldCBpbmRleCA9IHN0YXJ0SWR4OyBpbmRleCA8IGVuZElkeDsgaW5kZXggKz0gMykge1xyXG4gICAgbGV0IHIgPSBVdGlscy5SYW5kb20oMCwgMjU1KVxyXG4gICAgbGV0IGcgPSBVdGlscy5SYW5kb20oMCwgMjU1KVxyXG4gICAgbGV0IGIgPSBVdGlscy5SYW5kb20oMCwgMjU1KVxyXG5cclxuICAgIGltYWdlQnVmZmVyW2luZGV4XSA9IHJcclxuICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMV0gPSBnXHJcbiAgICBpbWFnZUJ1ZmZlcltpbmRleCArIDJdID0gYlxyXG4gIH1cclxuICByZXR1cm4gaW1hZ2VCdWZmZXJcclxufVxyXG5cclxubGV0IGN1cnJlbnRQcm9ncmVzcyA9IDBcclxuXHJcbmZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICBpZiAoY3VycmVudFByb2dyZXNzIDwgc2l6ZSkge1xyXG4gICAgaW1hZ2VCdWZmZXIgPSBHZW5lcmF0ZU5vaXNlKFxyXG4gICAgICBpbWFnZUJ1ZmZlcixcclxuICAgICAgc2l6ZSAqIGN1cnJlbnRQcm9ncmVzcyAqIDMsXHJcbiAgICAgIHNpemUgKiAoMSArIGN1cnJlbnRQcm9ncmVzcykgKiAzXHJcbiAgICApXHJcbiAgICBVdGlscy5Xcml0ZTJDYW52YXMoY29udGV4dCwgaW1hZ2VCdWZmZXIsIHNpemUpXHJcbiAgICBjdXJyZW50UHJvZ3Jlc3MrK1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcclxuICB9XHJcbn1cclxuXHJcbnJlbmRlcigpXHJcblxyXG53d1N1bShmYWxzZSlcclxuIiwiZXhwb3J0IG5hbWVzcGFjZSBUaW1lU3RhdGlzdGljIHtcclxuICBsZXQgczogYW55XHJcbiAgbGV0IGU6IGFueVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBzdGFydCgpIHtcclxuICAgIHMgPSBuZXcgRGF0ZSgpXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gZW5kKCkge1xyXG4gICAgZSA9IG5ldyBEYXRlKClcclxuICAgIGxldCB0aW1lRGlmZiA9IGUgLSBzXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aW1lRGlmZiArICcgbXMnKVxyXG4gICAgcmV0dXJuIHRpbWVEaWZmXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBuYW1lc3BhY2UgVXRpbHMge1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb20obWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCArIDEgLSBtaW4pKSArIG1pblxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFdyaXRlMkNhbnZhcyhcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIGltYWdlQnVmOiBBcnJheTxudW1iZXI+LFxyXG4gICAgc2l6ZTogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBsZXQgY2FudmFzSW1hZ2UgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBzaXplLCBzaXplKVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcclxuICAgICAgICBsZXQgaWR4ID0gKGkgKiBzaXplICsgaikgKiA0XHJcbiAgICAgICAgY2FudmFzSW1hZ2UuZGF0YVtpZHggKyAwXSA9IGltYWdlQnVmWyhpICogc2l6ZSArIGopICogMyArIDBdXHJcbiAgICAgICAgY2FudmFzSW1hZ2UuZGF0YVtpZHggKyAxXSA9IGltYWdlQnVmWyhpICogc2l6ZSArIGopICogMyArIDFdXHJcbiAgICAgICAgY2FudmFzSW1hZ2UuZGF0YVtpZHggKyAyXSA9IGltYWdlQnVmWyhpICogc2l6ZSArIGopICogMyArIDJdXHJcbiAgICAgICAgY2FudmFzSW1hZ2UuZGF0YVtpZHggKyAzXSA9IDI1NVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShjYW52YXNJbWFnZSwgMCwgMClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVGltZVN0YXRpc3RpYyB9IGZyb20gJy4vdGltZSdcclxuaW1wb3J0IHdvcmtlclBhdGggZnJvbSAnZmlsZS1sb2FkZXI/bmFtZT1bbmFtZV0uanMhLi93dy1zdW0ud29ya2VyJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHd3U3VtKGJEZWJ1ZzogYm9vbGVhbiA9IHRydWUpIHtcclxuICBUaW1lU3RhdGlzdGljLnN0YXJ0KClcclxuXHJcbiAgLy8gZGVtbyBmb3Igd2ViIHdvcmtlciwgY2FsY3VsYXRlIDErMiszKy4uLisxMDBcclxuICBsZXQgZW5kV29ya2VyTnVtID0gMFxyXG4gIGxldCB3b3JrZXJOdW1iZXIgPSA4XHJcbiAgbGV0IHdvcmtlcnMgPSBbXVxyXG5cclxuICBsZXQgVE9UQUwgPSAwXHJcbiAgbGV0IE1BWF9OVU0gPSAyMDBcclxuICBsZXQgcHJvY2Vzc051bSA9IDEwXHJcblxyXG4gIGZvciAobGV0IHduID0gMDsgd24gPCB3b3JrZXJOdW1iZXI7IHduKyspIHtcclxuICAgIHdvcmtlcnNbd25dID0gbmV3IFdvcmtlcih3b3JrZXJQYXRoKVxyXG4gICAgbGV0IGlkID0gd24gKyAxXHJcbiAgICBsZXQgcyA9IHduICogTWF0aC5jZWlsKE1BWF9OVU0gLyB3b3JrZXJOdW1iZXIpICsgMVxyXG4gICAgbGV0IGUgPSBzICsgcHJvY2Vzc051bSAtIDFcclxuXHJcbiAgICBsZXQgZW0gPSAod24gKyAxKSAqIE1hdGguY2VpbChNQVhfTlVNIC8gd29ya2VyTnVtYmVyKVxyXG4gICAgaWYgKGlkID09PSB3b3JrZXJOdW1iZXIpIHtcclxuICAgICAgZW0gPSBNQVhfTlVNXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhcmFtZXRlciA9IHsgaWQ6IGlkLCBzdGFydDogcywgZW5kOiBlLCBlbmRNQVg6IGVtLCBkZWJ1ZzogYkRlYnVnIH1cclxuICAgIHdvcmtlcnNbd25dLnBvc3RNZXNzYWdlKHBhcmFtZXRlcilcclxuICAgIHdvcmtlcnNbd25dLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICAgICAgbGV0IHJlc3VsdCA9IG1lc3NhZ2UuZGF0YVxyXG4gICAgICBsZXQgZGF0YSA9IHJlc3VsdC5kYXRhXHJcbiAgICAgIGxldCBlbmRWYWwgPSByZXN1bHQuZW5kVmFsXHJcbiAgICAgIGxldCBlbSA9IHJlc3VsdC5lbmRNQVhcclxuICAgICAgbGV0IGlkID0gcmVzdWx0LmlkXHJcbiAgICAgIFRPVEFMICs9IGRhdGFcclxuICAgICAgaWYgKGVuZFZhbCA8PSBNQVhfTlVNICYmIGVuZFZhbCA8IGVtKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtZXRlciA9IHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHN0YXJ0OiBlbmRWYWwgKyAxLFxyXG4gICAgICAgICAgZW5kOiBlbmRWYWwgKyBwcm9jZXNzTnVtLFxyXG4gICAgICAgICAgZW5kTUFYOiBlbSxcclxuICAgICAgICAgIGRlYnVnOiBiRGVidWdcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZShwYXJhbWV0ZXIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy50ZXJtaW5hdGUoKVxyXG4gICAgICAgIGVuZFdvcmtlck51bSsrXHJcbiAgICAgICAgaWYgKGVuZFdvcmtlck51bSA9PT0gd29ya2VyTnVtYmVyKSB7XHJcbiAgICAgICAgICBsZXQgdGltZSA9IFRpbWVTdGF0aXN0aWMuZW5kKClcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAncHJvY2VzcyBmaW5pc2ghJyxcclxuICAgICAgICAgICAgJ1RvdGFsIHZhbHVlIGlzOiAnICsgVE9UQUwsXHJcbiAgICAgICAgICAgICdUaW1lOiAnICsgdGltZSArICdtcydcclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==