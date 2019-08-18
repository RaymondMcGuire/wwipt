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

/***/ "./src/demo/ww-ray-tracing-diffuse.ts":
/*!********************************************!*\
  !*** ./src/demo/ww-ray-tracing-diffuse.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var time_1 = __webpack_require__(/*! ../time */ "./src/time.ts");

var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");

function wwRayTracingDiffuse(workerPath, maxWorkers) {
  var endWorkerNum = 0;
  var workers = [];
  var processNum = 10;
  var nx = 800;
  var ny = 400;
  var ns = 100;
  var canvas = document.getElementById('canvas');
  canvas.height = ny;
  canvas.width = nx;
  var context = canvas.getContext('2d'); // init image buffer

  var imageBuffer = new Array(nx * ny * 4);

  for (var idx = 0; idx < imageBuffer.length; idx++) {
    imageBuffer[idx] = 0;
  }

  time_1.TimeStatistic.start();

  var _loop_1 = function _loop_1(wn) {
    workers[wn] = new Worker(workerPath);
    var id = wn + 1;
    var s = wn * Math.ceil(ny / maxWorkers);
    var e = s + processNum - 1;
    var eMax = (wn + 1) * Math.ceil(ny / maxWorkers) - 1;

    if (id === maxWorkers) {
      eMax = ny - 1;
    }

    var parameter = {
      id: id,
      start: s,
      end: e,
      endMax: eMax,
      width: nx,
      height: ny,
      samplingNum: ns
    }; // console.log('post: ', s,"~",e)

    workers[wn].postMessage(parameter);

    workers[wn].onmessage = function (message) {
      var result = message.data;
      var colArray = result.col;
      var _s = result.startVal;
      var _e = result.endVal;
      var _em = result.endMaxVal;
      var _i = 0;

      for (var j = _s; j <= _e; j++) {
        for (var i = 0; i < nx; i++) {
          var idx = (i + j * nx) * 4;
          imageBuffer[idx] = colArray[_i * 4];
          imageBuffer[idx + 1] = colArray[_i * 4 + 1];
          imageBuffer[idx + 2] = colArray[_i * 4 + 2];
          imageBuffer[idx + 3] = colArray[_i * 4 + 3];
          _i++;
        }
      }

      if (_e < _em) {
        var parameter_1 = {
          id: id,
          start: _e + 1,
          end: _e + processNum - 1,
          endMax: _em,
          width: nx,
          height: ny,
          samplingNum: ns
        }; // console.log('post: ', _e + 1 ,"~",_e + processNum - 1)

        this.postMessage(parameter_1);
      } else {
        // console.log('id: ' + id, 'finished')
        this.terminate();
        endWorkerNum++;

        if (endWorkerNum === maxWorkers) {
          // process finished
          var time = time_1.TimeStatistic.end();
          console.log('process finished!', 'Time: ' + time + 'ms');
        }
      }
    };
  };

  for (var wn = 0; wn < maxWorkers; wn++) {
    _loop_1(wn);
  } // display the processed image


  function render() {
    util_1.Utils.Write2Canvas(context, imageBuffer, nx, ny);
    requestAnimationFrame(render);
  }

  render();
}

exports.wwRayTracingDiffuse = wwRayTracingDiffuse;

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

var ww_ray_tracing_diffuse_1 = __webpack_require__(/*! ./demo/ww-ray-tracing-diffuse */ "./src/demo/ww-ray-tracing-diffuse.ts"); // local info


var maxWorkers = navigator.hardwareConcurrency || 4; // web worker sum demo
// wwSum(false)
// generate noise demo
// GenerateNoiseDemo()
// ray tracing diffuse demo
// rayTracingDiffuse()

ww_ray_tracing_diffuse_1.wwRayTracingDiffuse('dist/ww_ray_tracing_diffuse_worker.js', maxWorkers);

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

  function Write2Canvas(context, imageBuf, w, h) {
    var canvasImage = context.getImageData(0, 0, w, h);
    var data = canvasImage.data;

    for (var idx = 0; idx < data.length; idx += 4) {
      data[idx + 0] = imageBuf[idx + 0];
      data[idx + 1] = imageBuf[idx + 1];
      data[idx + 2] = imageBuf[idx + 2];
      data[idx + 3] = imageBuf[idx + 3];
    }

    context.putImageData(canvasImage, 0, 0);
  }

  Utils.Write2Canvas = Write2Canvas;

  function GenerateNoise(imageBuffer, startIdx, endIdx) {
    for (var index = startIdx; index < endIdx; index += 4) {
      var r = Random(0, 255);
      var g = Random(0, 255);
      var b = Random(0, 255);
      imageBuffer[index] = r;
      imageBuffer[index + 1] = g;
      imageBuffer[index + 2] = b;
      imageBuffer[index + 3] = 255;
    }

    return imageBuffer;
  }

  Utils.GenerateNoise = GenerateNoise;
})(Utils = exports.Utils || (exports.Utils = {}));

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlbW8vd3ctcmF5LXRyYWNpbmctZGlmZnVzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFDQTs7QUFFQSxTQUFnQixtQkFBaEIsQ0FBb0MsVUFBcEMsRUFBd0QsVUFBeEQsRUFBMEU7QUFDeEUsTUFBSSxZQUFZLEdBQUcsQ0FBbkI7QUFDQSxNQUFJLE9BQU8sR0FBUSxFQUFuQjtBQUNBLE1BQUksVUFBVSxHQUFHLEVBQWpCO0FBRUEsTUFBTSxFQUFFLEdBQUcsR0FBWDtBQUNBLE1BQU0sRUFBRSxHQUFHLEdBQVg7QUFD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aWxlIjoid3dpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgVGltZVN0YXRpc3RpYyB9IGZyb20gJy4uL3RpbWUnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3d1JheVRyYWNpbmdEaWZmdXNlKHdvcmtlclBhdGg6IHN0cmluZywgbWF4V29ya2VyczogbnVtYmVyKSB7XHJcbiAgbGV0IGVuZFdvcmtlck51bSA9IDBcclxuICBsZXQgd29ya2VyczogYW55ID0gW11cclxuICBsZXQgcHJvY2Vzc051bSA9IDEwXHJcblxyXG4gIGNvbnN0IG54ID0gODAwXHJcbiAgY29uc3QgbnkgPSA0MDBcclxuICBjb25zdCBucyA9IDEwMFxyXG5cclxuICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIGFueVxyXG4gIGNhbnZhcy5oZWlnaHQgPSBueVxyXG4gIGNhbnZhcy53aWR0aCA9IG54XHJcbiAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuICAvLyBpbml0IGltYWdlIGJ1ZmZlclxyXG4gIGxldCBpbWFnZUJ1ZmZlciA9IG5ldyBBcnJheTxudW1iZXI+KG54ICogbnkgKiA0KVxyXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGltYWdlQnVmZmVyLmxlbmd0aDsgaWR4KyspIHtcclxuICAgIGltYWdlQnVmZmVyW2lkeF0gPSAwXHJcbiAgfVxyXG5cclxuICBUaW1lU3RhdGlzdGljLnN0YXJ0KClcclxuICBmb3IgKGxldCB3biA9IDA7IHduIDwgbWF4V29ya2Vyczsgd24rKykge1xyXG4gICAgd29ya2Vyc1t3bl0gPSBuZXcgV29ya2VyKHdvcmtlclBhdGgpXHJcbiAgICBsZXQgaWQgPSB3biArIDFcclxuICAgIGxldCBzID0gd24gKiBNYXRoLmNlaWwobnkgLyBtYXhXb3JrZXJzKVxyXG4gICAgbGV0IGUgPSBzICsgcHJvY2Vzc051bSAtIDFcclxuICAgIGxldCBlTWF4ID0gKHduICsgMSkgKiBNYXRoLmNlaWwobnkgLyBtYXhXb3JrZXJzKSAtIDFcclxuXHJcbiAgICBpZiAoaWQgPT09IG1heFdvcmtlcnMpIHtcclxuICAgICAgZU1heCA9IG55IC0gMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYXJhbWV0ZXIgPSB7XHJcbiAgICAgIGlkOiBpZCxcclxuICAgICAgc3RhcnQ6IHMsXHJcbiAgICAgIGVuZDogZSxcclxuICAgICAgZW5kTWF4OiBlTWF4LFxyXG4gICAgICB3aWR0aDogbngsXHJcbiAgICAgIGhlaWdodDogbnksXHJcbiAgICAgIHNhbXBsaW5nTnVtOiBuc1xyXG4gICAgfVxyXG4gICAgLy8gY29uc29sZS5sb2coJ3Bvc3Q6ICcsIHMsXCJ+XCIsZSlcclxuICAgIHdvcmtlcnNbd25dLnBvc3RNZXNzYWdlKHBhcmFtZXRlcilcclxuICAgIHdvcmtlcnNbd25dLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2U6IGFueSkge1xyXG4gICAgICBsZXQgcmVzdWx0ID0gbWVzc2FnZS5kYXRhXHJcbiAgICAgIGxldCBjb2xBcnJheSA9IHJlc3VsdC5jb2xcclxuICAgICAgbGV0IF9zID0gcmVzdWx0LnN0YXJ0VmFsXHJcbiAgICAgIGxldCBfZSA9IHJlc3VsdC5lbmRWYWxcclxuICAgICAgbGV0IF9lbSA9IHJlc3VsdC5lbmRNYXhWYWxcclxuICAgICAgbGV0IF9pID0gMFxyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IF9zOyBqIDw9IF9lOyBqKyspIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG54OyBpKyspIHtcclxuICAgICAgICAgIGxldCBpZHggPSAoaSArIGogKiBueCkgKiA0XHJcbiAgICAgICAgICBpbWFnZUJ1ZmZlcltpZHhdID0gY29sQXJyYXlbX2kgKiA0XVxyXG4gICAgICAgICAgaW1hZ2VCdWZmZXJbaWR4ICsgMV0gPSBjb2xBcnJheVtfaSAqIDQgKyAxXVxyXG4gICAgICAgICAgaW1hZ2VCdWZmZXJbaWR4ICsgMl0gPSBjb2xBcnJheVtfaSAqIDQgKyAyXVxyXG4gICAgICAgICAgaW1hZ2VCdWZmZXJbaWR4ICsgM10gPSBjb2xBcnJheVtfaSAqIDQgKyAzXVxyXG4gICAgICAgICAgX2krK1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9lIDwgX2VtKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtZXRlciA9IHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHN0YXJ0OiBfZSArIDEsXHJcbiAgICAgICAgICBlbmQ6IF9lICsgcHJvY2Vzc051bSAtIDEsXHJcbiAgICAgICAgICBlbmRNYXg6IF9lbSxcclxuICAgICAgICAgIHdpZHRoOiBueCxcclxuICAgICAgICAgIGhlaWdodDogbnksXHJcbiAgICAgICAgICBzYW1wbGluZ051bTogbnNcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3Bvc3Q6ICcsIF9lICsgMSAsXCJ+XCIsX2UgKyBwcm9jZXNzTnVtIC0gMSlcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKHBhcmFtZXRlcilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnaWQ6ICcgKyBpZCwgJ2ZpbmlzaGVkJylcclxuICAgICAgICB0aGlzLnRlcm1pbmF0ZSgpXHJcbiAgICAgICAgZW5kV29ya2VyTnVtKytcclxuICAgICAgICBpZiAoZW5kV29ya2VyTnVtID09PSBtYXhXb3JrZXJzKSB7XHJcbiAgICAgICAgICAvLyBwcm9jZXNzIGZpbmlzaGVkXHJcbiAgICAgICAgICBsZXQgdGltZSA9IFRpbWVTdGF0aXN0aWMuZW5kKClcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9jZXNzIGZpbmlzaGVkIScsICdUaW1lOiAnICsgdGltZSArICdtcycpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBkaXNwbGF5IHRoZSBwcm9jZXNzZWQgaW1hZ2VcclxuICBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICBVdGlscy5Xcml0ZTJDYW52YXMoY29udGV4dCwgaW1hZ2VCdWZmZXIsIG54LCBueSlcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKVxyXG59XHJcbiIsImltcG9ydCB7IHd3U3VtIH0gZnJvbSAnLi9kZW1vL3d3LXN1bSdcclxuaW1wb3J0IHsgR2VuZXJhdGVOb2lzZURlbW8gfSBmcm9tICcuL2RlbW8vbm9pc2UtbG9hZCdcclxuaW1wb3J0IHsgcmF5VHJhY2luZ0RpZmZ1c2UgfSBmcm9tICcuL2RlbW8vcmF5LXRyYWNpbmctZGlmZnVzZSdcclxuaW1wb3J0IHsgd3dSYXlUcmFjaW5nRGlmZnVzZSB9IGZyb20gJy4vZGVtby93dy1yYXktdHJhY2luZy1kaWZmdXNlJ1xyXG5cclxuLy8gbG9jYWwgaW5mb1xyXG5jb25zdCBtYXhXb3JrZXJzID0gbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3kgfHwgNFxyXG5cclxuLy8gd2ViIHdvcmtlciBzdW0gZGVtb1xyXG4vLyB3d1N1bShmYWxzZSlcclxuXHJcbi8vIGdlbmVyYXRlIG5vaXNlIGRlbW9cclxuLy8gR2VuZXJhdGVOb2lzZURlbW8oKVxyXG5cclxuLy8gcmF5IHRyYWNpbmcgZGlmZnVzZSBkZW1vXHJcbi8vIHJheVRyYWNpbmdEaWZmdXNlKClcclxuXHJcbnd3UmF5VHJhY2luZ0RpZmZ1c2UoJ2Rpc3Qvd3dfcmF5X3RyYWNpbmdfZGlmZnVzZV93b3JrZXIuanMnLCBtYXhXb3JrZXJzKVxyXG4iLCJleHBvcnQgbmFtZXNwYWNlIFRpbWVTdGF0aXN0aWMge1xyXG4gIGxldCBzOiBhbnlcclxuICBsZXQgZTogYW55XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KCkge1xyXG4gICAgcyA9IG5ldyBEYXRlKClcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBlbmQoKSB7XHJcbiAgICBlID0gbmV3IERhdGUoKVxyXG4gICAgbGV0IHRpbWVEaWZmID0gZSAtIHNcclxuICAgIC8vIGNvbnNvbGUubG9nKHRpbWVEaWZmICsgJyBtcycpXHJcbiAgICByZXR1cm4gdGltZURpZmZcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IG5hbWVzcGFjZSBVdGlscyB7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFJhbmRvbShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4ICsgMSAtIG1pbikpICsgbWluXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gV3JpdGUyQ2FudmFzKFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgaW1hZ2VCdWY6IEFycmF5PG51bWJlcj4sXHJcbiAgICB3OiBudW1iZXIsXHJcbiAgICBoOiBudW1iZXJcclxuICApIHtcclxuICAgIGxldCBjYW52YXNJbWFnZSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHcsIGgpXHJcbiAgICBsZXQgZGF0YSA9IGNhbnZhc0ltYWdlLmRhdGFcclxuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGRhdGEubGVuZ3RoOyBpZHggKz0gNCkge1xyXG4gICAgICBkYXRhW2lkeCArIDBdID0gaW1hZ2VCdWZbaWR4ICsgMF1cclxuICAgICAgZGF0YVtpZHggKyAxXSA9IGltYWdlQnVmW2lkeCArIDFdXHJcbiAgICAgIGRhdGFbaWR4ICsgMl0gPSBpbWFnZUJ1ZltpZHggKyAyXVxyXG4gICAgICBkYXRhW2lkeCArIDNdID0gaW1hZ2VCdWZbaWR4ICsgM11cclxuICAgIH1cclxuICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKGNhbnZhc0ltYWdlLCAwLCAwKVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIEdlbmVyYXRlTm9pc2UoXHJcbiAgICBpbWFnZUJ1ZmZlcjogQXJyYXk8bnVtYmVyPixcclxuICAgIHN0YXJ0SWR4OiBudW1iZXIsXHJcbiAgICBlbmRJZHg6IG51bWJlclxyXG4gICkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSBzdGFydElkeDsgaW5kZXggPCBlbmRJZHg7IGluZGV4ICs9IDQpIHtcclxuICAgICAgbGV0IHIgPSBSYW5kb20oMCwgMjU1KVxyXG4gICAgICBsZXQgZyA9IFJhbmRvbSgwLCAyNTUpXHJcbiAgICAgIGxldCBiID0gUmFuZG9tKDAsIDI1NSlcclxuXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4XSA9IHJcclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAxXSA9IGdcclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAyXSA9IGJcclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAzXSA9IDI1NVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGltYWdlQnVmZmVyXHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=