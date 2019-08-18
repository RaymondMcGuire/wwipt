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

/***/ "./src/demo/ww-render.ts":
/*!*******************************!*\
  !*** ./src/demo/ww-render.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var time_1 = __webpack_require__(/*! ../time */ "./src/time.ts");

var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");

function wwRender(workerPath, maxWorkers) {
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

exports.wwRender = wwRender;

/***/ }),

/***/ "./src/egmath/math_utils.ts":
/*!**********************************!*\
  !*** ./src/egmath/math_utils.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* =========================================================================
 *
 *  math_utils.ts
 *  simple math functions
 * ========================================================================= */

Object.defineProperty(exports, "__esModule", {
  value: true
});

function absMax(x, y) {
  return x * x > y * y ? x : y;
}

exports.absMax = absMax;

function absMin(x, y) {
  return x * x < y * y ? x : y;
}

exports.absMin = absMin;

function muldec(x, y) {
  return x * 10 * (y * 10) / 100;
}

exports.muldec = muldec;

function divdec(x, y) {
  return x * 10 / (y * 10) / 100;
}

exports.divdec = divdec;

/***/ }),

/***/ "./src/egmath/vector.ts":
/*!******************************!*\
  !*** ./src/egmath/vector.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* =========================================================================
 *
 *  vector.ts
 *  T-D vector data
 *  T:type,default setting is number
 *  D:dimension
 * ========================================================================= */

var math_utils_1 = __webpack_require__(/*! ./math_utils */ "./src/egmath/math_utils.ts");

var Vector =
/** @class */
function () {
  // constructs vector with parameters or zero
  function Vector(dimension, params) {
    this._dimension = dimension;
    var _i = 0;

    if (params === undefined) {
      // init n dimension vector data,setting all 0
      this._elements = new Array(dimension);

      for (_i = 0; _i < dimension; _i++) {
        this._elements[_i] = 0;
      }
    } else {
      this._elements = new Array(dimension);

      for (_i = 0; _i < params.length; _i++) {
        this._elements[_i] = params[_i];
      }
    }
  }

  Vector.prototype.set = function (params) {
    if (params !== undefined) {
      if (params.size() !== this.size()) {
        console.log('dimension is not correct!');
        return false;
      }

      for (var _i = 0; _i < params.size(); _i++) {
        this._elements[_i] = params.data()[_i];
      }

      return true;
    }

    return false;
  };

  Vector.prototype.setZero = function () {
    for (var _i = 0; _i < this._dimension; _i++) {
      this._elements[_i] = 0;
    }
  };

  Vector.prototype.setOne = function () {
    for (var _i = 0; _i < this._dimension; _i++) {
      this._elements[_i] = 1;
    }
  };

  Vector.prototype.data = function () {
    return this._elements;
  };

  Vector.prototype.at = function (idx) {
    if (idx < 0 || idx >= this.size()) {
      console.log('index is not correct!');
      return -1;
    }

    return this._elements[idx];
  };

  Vector.prototype.dot = function (others) {
    if (others === undefined) {
      console.log('others is not correct!');
      return -1;
    }

    if (others.size() !== this.size()) {
      console.log('dimension is not correct!');
      return -1;
    }

    var ret = 0;

    for (var _i = 0; _i < this.size(); _i++) {
      ret += this._elements[_i] * others.data()[_i];
    }

    return ret;
  };

  Vector.prototype.lengthSquared = function () {
    return this.dot(this);
  };

  Vector.prototype.length = function () {
    return Math.sqrt(this.lengthSquared());
  };

  Vector.prototype.normalize = function () {
    this.idiv(this.length());
  };

  Vector.prototype.sum = function () {
    var ret = 0;

    for (var _i = 0; _i < this._dimension; _i++) {
      ret += this._elements[_i];
    }

    return ret;
  };

  Vector.prototype.size = function () {
    return this._dimension;
  };

  Vector.prototype.avg = function () {
    return this.sum() / this.size();
  };

  Vector.prototype.min = function () {
    var minVal = this._elements[0];

    for (var _i = 1; _i < this._dimension; _i++) {
      minVal = Math.min(minVal, this._elements[_i]);
    }

    return minVal;
  };

  Vector.prototype.max = function () {
    var maxVal = this._elements[0];

    for (var _i = 1; _i < this._dimension; _i++) {
      maxVal = Math.max(maxVal, this._elements[_i]);
    }

    return maxVal;
  };

  Vector.prototype.absmax = function () {
    var absMaxVal = this._elements[0];

    for (var _i = 1; _i < this._dimension; _i++) {
      absMaxVal = math_utils_1.absMax(absMaxVal, this._elements[_i]);
    }

    return absMaxVal;
  };

  Vector.prototype.absmin = function () {
    var absMinVal = this._elements[0];

    for (var _i = 1; _i < this._dimension; _i++) {
      absMinVal = math_utils_1.absMin(absMinVal, this._elements[_i]);
    }

    return absMinVal;
  };

  Vector.prototype.distanceSquaredTo = function (others) {
    if (others.size() !== this.size()) {
      console.log('dimension is not correct!');
      return -1;
    }

    var ret = 0;

    for (var _i = 0; _i < this.size(); _i++) {
      var diff = this._elements[_i] - others.data()[_i];

      ret += diff * diff;
    }

    return ret;
  };

  Vector.prototype.distanceTo = function (others) {
    return Math.sqrt(this.distanceSquaredTo(others));
  };

  Vector.prototype.isEqual = function (others) {
    if (this.size() !== others.size()) return false;

    for (var _i = 0; _i < this.size(); _i++) {
      if (this.at(_i) !== others.at(_i)) return false;
    }

    return true;
  };

  Vector.prototype.isSimilar = function (others, epsilon) {
    if (others === undefined) return false;
    if (this.size() !== others.size()) return false;

    for (var _i = 0; _i < this.size(); _i++) {
      if (Math.abs(this.at(_i) - others.at(_i)) > epsilon) return false;
    }

    return true;
  };

  Vector.prototype.add = function (params) {
    var _i = 0;

    if (_typeof(params) === 'object') {
      var v = params;
      if (v.size() !== this.size()) return new Vector(1, [-1]);
      var newV = new Vector(this.size(), this.data());

      for (_i = 0; _i < newV.size(); _i++) {
        newV.data()[_i] += v.data()[_i];
      }

      return newV;
    } else if (typeof params === 'number') {
      var s = params;
      var newV = new Vector(this.size(), this.data());

      for (_i = 0; _i < newV.size(); _i++) {
        newV.data()[_i] += s;
      }

      return newV;
    }

    return new Vector(1, [-1]);
  };

  Vector.prototype.sub = function (params) {
    var _i = 0;

    if (_typeof(params) === 'object') {
      var v = params;
      if (v.size() !== this.size()) return new Vector(1, [-1]);
      var newV = new Vector(this.size(), this.data());

      for (_i = 0; _i < newV.size(); _i++) {
        newV.data()[_i] -= v.data()[_i];
      }

      return newV;
    } else if (typeof params === 'number') {
      var s = params;
      var newV = new Vector(this.size(), this.data());

      for (_i = 0; _i < newV.size(); _i++) {
        newV.data()[_i] -= s;
      }

      return newV;
    }

    return new Vector(1, [-1]);
  };

  Vector.prototype.mul = function (params) {
    var _i = 0;

    if (_typeof(params) === 'object') {
      var v = params;
      if (v.size() !== this.size()) return new Vector(1, [-1]);
      var newV = new Vector(this.size(), this.data());

      for (_i = 0; _i < newV.size(); _i++) {
        newV.data()[_i] *= v.data()[_i];
      }

      return newV;
    } else if (typeof params === 'number') {
      var s = params;
      var newV = new Vector(this.size(), this.data());

      for (_i = 0; _i < newV.size(); _i++) {
        newV.data()[_i] *= s;
      }

      return newV;
    }

    return new Vector(1, [-1]);
  };

  Vector.prototype.div = function (params) {
    var _i = 0;

    if (_typeof(params) === 'object') {
      var v = params;
      if (v.size() !== this.size()) return new Vector(1, [-1]);
      var newV = new Vector(this.size(), this.data());

      for (_i = 0; _i < newV.size(); _i++) {
        newV.data()[_i] /= v.data()[_i];
      }

      return newV;
    } else if (typeof params === 'number') {
      var s = params;
      if (s === 0) return new Vector(1, [-1]);
      var newV = new Vector(this.size(), this.data());

      for (_i = 0; _i < newV.size(); _i++) {
        newV.data()[_i] /= s;
      }

      return newV;
    }

    return new Vector(1, [-1]);
  };

  Vector.prototype.idiv = function (params) {
    this.set(this.div(params));
  };

  Vector.prototype.iadd = function (params) {
    this.set(this.add(params));
  };

  Vector.prototype.isub = function (params) {
    this.set(this.sub(params));
  };

  Vector.prototype.imul = function (params) {
    this.set(this.mul(params));
  };

  Vector.prototype.setAt = function (idx, val) {
    if (idx < 0 || idx >= this.size()) {
      return undefined;
    }

    this._elements[idx] = val;
    return true;
  };
  /**
   * proj_u(v) = <u,v>/<v,v> u
   * @param u
   * @param v
   */


  Vector.proj = function (u, v) {
    return u.mul(v.dot(u) / u.dot(u));
  };

  return Vector;
}();

exports.Vector = Vector;

/***/ }),

/***/ "./src/egmath/vector3.ts":
/*!*******************************!*\
  !*** ./src/egmath/vector3.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var vector_1 = __webpack_require__(/*! ./vector */ "./src/egmath/vector.ts");

var Vector3 =
/** @class */
function (_super) {
  __extends(Vector3, _super);

  function Vector3(e1, e2, e3) {
    return _super.call(this, 3, new Array(e1, e2, e3)) || this;
  }

  Vector3.prototype.x = function () {
    return this.data()[0];
  };

  Vector3.prototype.y = function () {
    return this.data()[1];
  };

  Vector3.prototype.z = function () {
    return this.data()[2];
  };

  Vector3.prototype.r = function () {
    return this.data()[0];
  };

  Vector3.prototype.g = function () {
    return this.data()[1];
  };

  Vector3.prototype.b = function () {
    return this.data()[2];
  };

  Vector3.prototype.iset = function (v3) {
    this.data()[0] = v3.r();
    this.data()[1] = v3.g();
    this.data()[2] = v3.b();
  };

  Vector3.prototype.set = function (v3) {
    return _super.prototype.set.call(this, new vector_1.Vector(3, v3.data()));
  };

  Vector3.prototype.add = function (v3) {
    var addv = _super.prototype.add.call(this, v3);

    return new Vector3(addv.data()[0], addv.data()[1], addv.data()[2]);
  };

  Vector3.prototype.sub = function (v3) {
    var subv = _super.prototype.sub.call(this, v3);

    return new Vector3(subv.data()[0], subv.data()[1], subv.data()[2]);
  };

  Vector3.prototype.mul = function (v3) {
    var mulv = _super.prototype.mul.call(this, v3);

    return new Vector3(mulv.data()[0], mulv.data()[1], mulv.data()[2]);
  };

  Vector3.prototype.div = function (v3) {
    var divv = _super.prototype.div.call(this, v3);

    return new Vector3(divv.data()[0], divv.data()[1], divv.data()[2]);
  };

  Vector3.prototype.dot = function (v3) {
    return _super.prototype.dot.call(this, new vector_1.Vector(3, v3.data()));
  };

  Vector3.prototype.unitVec3 = function () {
    var nv = new vector_1.Vector(3, this.data());
    nv.normalize();
    return new Vector3(nv.data()[0], nv.data()[1], nv.data()[2]);
  };

  Vector3.prototype.gamma2 = function () {
    var tv = new vector_1.Vector(3, this.data());
    return new Vector3(Math.sqrt(tv.at(0)), Math.sqrt(tv.at(1)), Math.sqrt(tv.at(2)));
  };

  return Vector3;
}(vector_1.Vector);

exports.Vector3 = Vector3;

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
}); // import { rayTracingDiffuse } from './demo/ray-tracing-diffuse'

var ww_render_1 = __webpack_require__(/*! ./demo/ww-render */ "./src/demo/ww-render.ts"); // local info


var maxWorkers = navigator.hardwareConcurrency || 4; // web worker sum demo
// wwSum(false)
// generate noise demo
// GenerateNoiseDemo()
// ray tracing diffuse demo
// rayTracingDiffuse()

ww_render_1.wwRender('dist/ww_ray_tracing_lambertian_worker.js', maxWorkers);

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

var vector3_1 = __webpack_require__(/*! ./egmath/vector3 */ "./src/egmath/vector3.ts");

var Utils;

(function (Utils) {
  function RandomInUnitSphere() {
    var p = new vector3_1.Vector3(0, 0, 0);

    do {
      p = new vector3_1.Vector3(Math.random(), Math.random(), Math.random()).mul(2).sub(new vector3_1.Vector3(1, 1, 1));
    } while (p.lengthSquared() >= 1.0);

    return p;
  }

  Utils.RandomInUnitSphere = RandomInUnitSphere;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlbW8vd3ctcmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvbWF0aF91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdtYXRoL3ZlY3Rvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdtYXRoL3ZlY3RvcjMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy90aW1lLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0FBQ0E7O0FBRUEsU0FBZ0IsUUFBaEIsQ0FBeUIsVUFBekIsRUFBNkMsVUFBN0MsRUFBK0Q7QUFDN0QsTUFBSSxZQUFZLEdBQUcsQ0FBbkI7QUFDQSxN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Q0FBZDtBQUNBLFVBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFELEVBQUksR0FBSixDQUFkO0FBRUEsaUJBQVcsQ0FBQyxLQUFELENBQVgsR0FBcUIsQ0FBckI7QUFDQSxpQkFBVyxDQUFDLEtBQUssR0FBRyxDQUFULENBQVgsR0FBeUIsQ0FBekI7QUFDQSxpQkFBVyxDQUFDLEtBQUssR0FBRyxDQUFULENBQVgsR0FBeUIsQ0FBekI7QUFDQSxpQkFBVyxDQUFDLEtBQUssR0FBRyxDQUFULENBQVgsR0FBeUIsR0FBekI7QUFDRDs7QUFDRCxXQUFPLFdBQVA7QUFDRDs7QUFoQmUsd0JBQWEsYUFBYjtBQWlCakIsQ0FqREQsRUFBaUIsS0FBSyxHQUFMLGtDQUFLLEVBQUwsQ0FBakIsRSIsImZpbGUiOiJ3d2lwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBUaW1lU3RhdGlzdGljIH0gZnJvbSAnLi4vdGltZSdcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi91dGlsJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHd3UmVuZGVyKHdvcmtlclBhdGg6IHN0cmluZywgbWF4V29ya2VyczogbnVtYmVyKSB7XHJcbiAgbGV0IGVuZFdvcmtlck51bSA9IDBcclxuICBsZXQgd29ya2VyczogYW55ID0gW11cclxuICBsZXQgcHJvY2Vzc051bSA9IDEwXHJcblxyXG4gIGNvbnN0IG54ID0gODAwXHJcbiAgY29uc3QgbnkgPSA0MDBcclxuICBjb25zdCBucyA9IDEwMFxyXG5cclxuICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIGFueVxyXG4gIGNhbnZhcy5oZWlnaHQgPSBueVxyXG4gIGNhbnZhcy53aWR0aCA9IG54XHJcbiAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuICAvLyBpbml0IGltYWdlIGJ1ZmZlclxyXG4gIGxldCBpbWFnZUJ1ZmZlciA9IG5ldyBBcnJheTxudW1iZXI+KG54ICogbnkgKiA0KVxyXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGltYWdlQnVmZmVyLmxlbmd0aDsgaWR4KyspIHtcclxuICAgIGltYWdlQnVmZmVyW2lkeF0gPSAwXHJcbiAgfVxyXG5cclxuICBUaW1lU3RhdGlzdGljLnN0YXJ0KClcclxuICBmb3IgKGxldCB3biA9IDA7IHduIDwgbWF4V29ya2Vyczsgd24rKykge1xyXG4gICAgd29ya2Vyc1t3bl0gPSBuZXcgV29ya2VyKHdvcmtlclBhdGgpXHJcbiAgICBsZXQgaWQgPSB3biArIDFcclxuICAgIGxldCBzID0gd24gKiBNYXRoLmNlaWwobnkgLyBtYXhXb3JrZXJzKVxyXG4gICAgbGV0IGUgPSBzICsgcHJvY2Vzc051bSAtIDFcclxuICAgIGxldCBlTWF4ID0gKHduICsgMSkgKiBNYXRoLmNlaWwobnkgLyBtYXhXb3JrZXJzKSAtIDFcclxuXHJcbiAgICBpZiAoaWQgPT09IG1heFdvcmtlcnMpIHtcclxuICAgICAgZU1heCA9IG55IC0gMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYXJhbWV0ZXIgPSB7XHJcbiAgICAgIGlkOiBpZCxcclxuICAgICAgc3RhcnQ6IHMsXHJcbiAgICAgIGVuZDogZSxcclxuICAgICAgZW5kTWF4OiBlTWF4LFxyXG4gICAgICB3aWR0aDogbngsXHJcbiAgICAgIGhlaWdodDogbnksXHJcbiAgICAgIHNhbXBsaW5nTnVtOiBuc1xyXG4gICAgfVxyXG4gICAgLy8gY29uc29sZS5sb2coJ3Bvc3Q6ICcsIHMsXCJ+XCIsZSlcclxuICAgIHdvcmtlcnNbd25dLnBvc3RNZXNzYWdlKHBhcmFtZXRlcilcclxuICAgIHdvcmtlcnNbd25dLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2U6IGFueSkge1xyXG4gICAgICBsZXQgcmVzdWx0ID0gbWVzc2FnZS5kYXRhXHJcbiAgICAgIGxldCBjb2xBcnJheSA9IHJlc3VsdC5jb2xcclxuICAgICAgbGV0IF9zID0gcmVzdWx0LnN0YXJ0VmFsXHJcbiAgICAgIGxldCBfZSA9IHJlc3VsdC5lbmRWYWxcclxuICAgICAgbGV0IF9lbSA9IHJlc3VsdC5lbmRNYXhWYWxcclxuICAgICAgbGV0IF9pID0gMFxyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IF9zOyBqIDw9IF9lOyBqKyspIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG54OyBpKyspIHtcclxuICAgICAgICAgIGxldCBpZHggPSAoaSArIGogKiBueCkgKiA0XHJcbiAgICAgICAgICBpbWFnZUJ1ZmZlcltpZHhdID0gY29sQXJyYXlbX2kgKiA0XVxyXG4gICAgICAgICAgaW1hZ2VCdWZmZXJbaWR4ICsgMV0gPSBjb2xBcnJheVtfaSAqIDQgKyAxXVxyXG4gICAgICAgICAgaW1hZ2VCdWZmZXJbaWR4ICsgMl0gPSBjb2xBcnJheVtfaSAqIDQgKyAyXVxyXG4gICAgICAgICAgaW1hZ2VCdWZmZXJbaWR4ICsgM10gPSBjb2xBcnJheVtfaSAqIDQgKyAzXVxyXG4gICAgICAgICAgX2krK1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9lIDwgX2VtKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtZXRlciA9IHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHN0YXJ0OiBfZSArIDEsXHJcbiAgICAgICAgICBlbmQ6IF9lICsgcHJvY2Vzc051bSAtIDEsXHJcbiAgICAgICAgICBlbmRNYXg6IF9lbSxcclxuICAgICAgICAgIHdpZHRoOiBueCxcclxuICAgICAgICAgIGhlaWdodDogbnksXHJcbiAgICAgICAgICBzYW1wbGluZ051bTogbnNcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3Bvc3Q6ICcsIF9lICsgMSAsXCJ+XCIsX2UgKyBwcm9jZXNzTnVtIC0gMSlcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKHBhcmFtZXRlcilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnaWQ6ICcgKyBpZCwgJ2ZpbmlzaGVkJylcclxuICAgICAgICB0aGlzLnRlcm1pbmF0ZSgpXHJcbiAgICAgICAgZW5kV29ya2VyTnVtKytcclxuICAgICAgICBpZiAoZW5kV29ya2VyTnVtID09PSBtYXhXb3JrZXJzKSB7XHJcbiAgICAgICAgICAvLyBwcm9jZXNzIGZpbmlzaGVkXHJcbiAgICAgICAgICBsZXQgdGltZSA9IFRpbWVTdGF0aXN0aWMuZW5kKClcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9jZXNzIGZpbmlzaGVkIScsICdUaW1lOiAnICsgdGltZSArICdtcycpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBkaXNwbGF5IHRoZSBwcm9jZXNzZWQgaW1hZ2VcclxuICBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICBVdGlscy5Xcml0ZTJDYW52YXMoY29udGV4dCwgaW1hZ2VCdWZmZXIsIG54LCBueSlcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKVxyXG59XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICpcclxuICogIG1hdGhfdXRpbHMudHNcclxuICogIHNpbXBsZSBtYXRoIGZ1bmN0aW9uc1xyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWJzTWF4KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIHggKiB4ID4geSAqIHkgPyB4IDogeVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWJzTWluKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIHggKiB4IDwgeSAqIHkgPyB4IDogeVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbXVsZGVjKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuICh4ICogMTAgKiAoeSAqIDEwKSkgLyAxMDBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpdmRlYyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiAoeCAqIDEwKSAvICh5ICogMTApIC8gMTAwXHJcbn1cclxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKlxyXG4gKiAgdmVjdG9yLnRzXHJcbiAqICBULUQgdmVjdG9yIGRhdGFcclxuICogIFQ6dHlwZSxkZWZhdWx0IHNldHRpbmcgaXMgbnVtYmVyXHJcbiAqICBEOmRpbWVuc2lvblxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmltcG9ydCB7IGFic01heCwgYWJzTWluIH0gZnJvbSAnLi9tYXRoX3V0aWxzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlY3RvciB7XHJcbiAgcHJpdmF0ZSBfZWxlbWVudHM6IEFycmF5PG51bWJlcj5cclxuICBwcml2YXRlIF9kaW1lbnNpb246IG51bWJlclxyXG5cclxuICAvLyBjb25zdHJ1Y3RzIHZlY3RvciB3aXRoIHBhcmFtZXRlcnMgb3IgemVyb1xyXG4gIGNvbnN0cnVjdG9yKGRpbWVuc2lvbjogbnVtYmVyLCBwYXJhbXM/OiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICB0aGlzLl9kaW1lbnNpb24gPSBkaW1lbnNpb25cclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmIChwYXJhbXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBpbml0IG4gZGltZW5zaW9uIHZlY3RvciBkYXRhLHNldHRpbmcgYWxsIDBcclxuICAgICAgdGhpcy5fZWxlbWVudHMgPSBuZXcgQXJyYXk8bnVtYmVyPihkaW1lbnNpb24pXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IGRpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDBcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZWxlbWVudHMgPSBuZXcgQXJyYXk8bnVtYmVyPihkaW1lbnNpb24pXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IHBhcmFtcy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSBwYXJhbXNbX2ldXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldChwYXJhbXM6IFZlY3RvciB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChwYXJhbXMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdkaW1lbnNpb24gaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgcGFyYW1zLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IHBhcmFtcy5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIHNldFplcm8oKSB7XHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldE9uZSgpIHtcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gMVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1xyXG4gIH1cclxuXHJcbiAgYXQoaWR4OiBudW1iZXIpIHtcclxuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnaW5kZXggaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudHNbaWR4XVxyXG4gIH1cclxuXHJcbiAgZG90KG90aGVyczogVmVjdG9yIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ290aGVycyBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXQgPSAwXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgcmV0ICs9IHRoaXMuX2VsZW1lbnRzW19pXSAqIG90aGVycy5kYXRhKClbX2ldXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBsZW5ndGhTcXVhcmVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpXHJcbiAgfVxyXG5cclxuICBsZW5ndGgoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCgpKVxyXG4gIH1cclxuXHJcbiAgbm9ybWFsaXplKCkge1xyXG4gICAgdGhpcy5pZGl2KHRoaXMubGVuZ3RoKCkpXHJcbiAgfVxyXG5cclxuICBzdW0oKSB7XHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICByZXQgKz0gdGhpcy5fZWxlbWVudHNbX2ldXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBzaXplKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvblxyXG4gIH1cclxuXHJcbiAgYXZnKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3VtKCkgLyB0aGlzLnNpemUoKVxyXG4gIH1cclxuXHJcbiAgbWluKCkge1xyXG4gICAgbGV0IG1pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBtaW5WYWwgPSBNYXRoLm1pbihtaW5WYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBtaW5WYWxcclxuICB9XHJcblxyXG4gIG1heCgpIHtcclxuICAgIGxldCBtYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBtYXhWYWwgPSBNYXRoLm1heChtYXhWYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBtYXhWYWxcclxuICB9XHJcblxyXG4gIGFic21heCgpIHtcclxuICAgIGxldCBhYnNNYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBhYnNNYXhWYWwgPSBhYnNNYXgoYWJzTWF4VmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWJzTWF4VmFsXHJcbiAgfVxyXG5cclxuICBhYnNtaW4oKSB7XHJcbiAgICBsZXQgYWJzTWluVmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgYWJzTWluVmFsID0gYWJzTWluKGFic01pblZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFic01pblZhbFxyXG4gIH1cclxuXHJcbiAgZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzOiBWZWN0b3IpIHtcclxuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXQgPSAwXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgbGV0IGRpZmYgPSB0aGlzLl9lbGVtZW50c1tfaV0gLSBvdGhlcnMuZGF0YSgpW19pXVxyXG4gICAgICByZXQgKz0gZGlmZiAqIGRpZmZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBkaXN0YW5jZVRvKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzKSlcclxuICB9XHJcblxyXG4gIGlzRXF1YWwob3RoZXJzOiBWZWN0b3IpIHtcclxuICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXJzLnNpemUoKSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmF0KF9pKSAhPT0gb3RoZXJzLmF0KF9pKSkgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGlzU2ltaWxhcihvdGhlcnM6IFZlY3RvciB8IHVuZGVmaW5lZCwgZXBzaWxvbjogbnVtYmVyKSB7XHJcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlcnMuc2l6ZSgpKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYXQoX2kpIC0gb3RoZXJzLmF0KF9pKSkgPiBlcHNpbG9uKSByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgYWRkKHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSArPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKz0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBzdWIocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAtPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIG11bChwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKj0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgZGl2KHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAvPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgaWYgKHMgPT09IDApIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC89IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgaWRpdihwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMuZGl2KHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBpYWRkKHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5hZGQocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIGlzdWIocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLnN1YihwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgaW11bChwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMubXVsKHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBzZXRBdChpZHg6IG51bWJlciwgdmFsOiBudW1iZXIpIHtcclxuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZWxlbWVudHNbaWR4XSA9IHZhbFxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHByb2pfdSh2KSA9IDx1LHY+Lzx2LHY+IHVcclxuICAgKiBAcGFyYW0gdVxyXG4gICAqIEBwYXJhbSB2XHJcbiAgICovXHJcbiAgc3RhdGljIHByb2oodTogVmVjdG9yLCB2OiBWZWN0b3IpIHtcclxuICAgIHJldHVybiB1Lm11bCh2LmRvdCh1KSAvIHUuZG90KHUpKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuL3ZlY3RvcidcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3IzIGV4dGVuZHMgVmVjdG9yIHtcclxuICBjb25zdHJ1Y3RvcihlMTogbnVtYmVyLCBlMjogbnVtYmVyLCBlMzogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigzLCBuZXcgQXJyYXk8bnVtYmVyPihlMSwgZTIsIGUzKSlcclxuICB9XHJcblxyXG4gIHgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMF1cclxuICB9XHJcbiAgeSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsxXVxyXG4gIH1cclxuICB6KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzJdXHJcbiAgfVxyXG4gIHIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMF1cclxuICB9XHJcbiAgZygpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsxXVxyXG4gIH1cclxuICBiKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzJdXHJcbiAgfVxyXG5cclxuICBpc2V0KHYzOiBWZWN0b3IzKSB7XHJcbiAgICB0aGlzLmRhdGEoKVswXSA9IHYzLnIoKVxyXG4gICAgdGhpcy5kYXRhKClbMV0gPSB2My5nKClcclxuICAgIHRoaXMuZGF0YSgpWzJdID0gdjMuYigpXHJcbiAgfVxyXG5cclxuICBzZXQodjM6IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiBzdXBlci5zZXQobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxyXG4gIH1cclxuXHJcbiAgYWRkKHYzOiBhbnkpIHtcclxuICAgIGxldCBhZGR2ID0gc3VwZXIuYWRkKHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGFkZHYuZGF0YSgpWzBdLCBhZGR2LmRhdGEoKVsxXSwgYWRkdi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBzdWIodjM6IGFueSkge1xyXG4gICAgbGV0IHN1YnYgPSBzdXBlci5zdWIodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoc3Vidi5kYXRhKClbMF0sIHN1YnYuZGF0YSgpWzFdLCBzdWJ2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIG11bCh2MzogYW55KSB7XHJcbiAgICBsZXQgbXVsdiA9IHN1cGVyLm11bCh2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhtdWx2LmRhdGEoKVswXSwgbXVsdi5kYXRhKClbMV0sIG11bHYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgZGl2KHYzOiBhbnkpIHtcclxuICAgIGxldCBkaXZ2ID0gc3VwZXIuZGl2KHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGRpdnYuZGF0YSgpWzBdLCBkaXZ2LmRhdGEoKVsxXSwgZGl2di5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBkb3QodjM6IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiBzdXBlci5kb3QobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxyXG4gIH1cclxuXHJcbiAgdW5pdFZlYzMoKTogVmVjdG9yMyB7XHJcbiAgICBsZXQgbnYgPSBuZXcgVmVjdG9yKDMsIHRoaXMuZGF0YSgpKVxyXG4gICAgbnYubm9ybWFsaXplKClcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhudi5kYXRhKClbMF0sIG52LmRhdGEoKVsxXSwgbnYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgZ2FtbWEyKCk6IFZlY3RvcjMge1xyXG4gICAgbGV0IHR2ID0gbmV3IFZlY3RvcigzLCB0aGlzLmRhdGEoKSlcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhcclxuICAgICAgTWF0aC5zcXJ0KHR2LmF0KDApKSxcclxuICAgICAgTWF0aC5zcXJ0KHR2LmF0KDEpKSxcclxuICAgICAgTWF0aC5zcXJ0KHR2LmF0KDIpKVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyB3d1N1bSB9IGZyb20gJy4vZGVtby93dy1zdW0nXHJcbmltcG9ydCB7IEdlbmVyYXRlTm9pc2VEZW1vIH0gZnJvbSAnLi9kZW1vL25vaXNlLWxvYWQnXHJcbi8vIGltcG9ydCB7IHJheVRyYWNpbmdEaWZmdXNlIH0gZnJvbSAnLi9kZW1vL3JheS10cmFjaW5nLWRpZmZ1c2UnXHJcbmltcG9ydCB7IHd3UmVuZGVyIH0gZnJvbSAnLi9kZW1vL3d3LXJlbmRlcidcclxuXHJcbi8vIGxvY2FsIGluZm9cclxuY29uc3QgbWF4V29ya2VycyA9IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5IHx8IDRcclxuXHJcbi8vIHdlYiB3b3JrZXIgc3VtIGRlbW9cclxuLy8gd3dTdW0oZmFsc2UpXHJcblxyXG4vLyBnZW5lcmF0ZSBub2lzZSBkZW1vXHJcbi8vIEdlbmVyYXRlTm9pc2VEZW1vKClcclxuXHJcbi8vIHJheSB0cmFjaW5nIGRpZmZ1c2UgZGVtb1xyXG4vLyByYXlUcmFjaW5nRGlmZnVzZSgpXHJcblxyXG53d1JlbmRlcignZGlzdC93d19yYXlfdHJhY2luZ19sYW1iZXJ0aWFuX3dvcmtlci5qcycsIG1heFdvcmtlcnMpXHJcbiIsImV4cG9ydCBuYW1lc3BhY2UgVGltZVN0YXRpc3RpYyB7XHJcbiAgbGV0IHM6IGFueVxyXG4gIGxldCBlOiBhbnlcclxuICBleHBvcnQgZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgICBzID0gbmV3IERhdGUoKVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGVuZCgpIHtcclxuICAgIGUgPSBuZXcgRGF0ZSgpXHJcbiAgICBsZXQgdGltZURpZmYgPSBlIC0gc1xyXG4gICAgLy8gY29uc29sZS5sb2codGltZURpZmYgKyAnIG1zJylcclxuICAgIHJldHVybiB0aW1lRGlmZlxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi9lZ21hdGgvdmVjdG9yMydcclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgVXRpbHMge1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb21JblVuaXRTcGhlcmUoKSB7XHJcbiAgICBsZXQgcCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgICBkbyB7XHJcbiAgICAgIHAgPSBuZXcgVmVjdG9yMyhNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpKVxyXG4gICAgICAgIC5tdWwoMilcclxuICAgICAgICAuc3ViKG5ldyBWZWN0b3IzKDEsIDEsIDEpKVxyXG4gICAgfSB3aGlsZSAocC5sZW5ndGhTcXVhcmVkKCkgPj0gMS4wKVxyXG4gICAgcmV0dXJuIHBcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb20obWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCArIDEgLSBtaW4pKSArIG1pblxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFdyaXRlMkNhbnZhcyhcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIGltYWdlQnVmOiBBcnJheTxudW1iZXI+LFxyXG4gICAgdzogbnVtYmVyLFxyXG4gICAgaDogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBsZXQgY2FudmFzSW1hZ2UgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3LCBoKVxyXG4gICAgbGV0IGRhdGEgPSBjYW52YXNJbWFnZS5kYXRhXHJcbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBkYXRhLmxlbmd0aDsgaWR4ICs9IDQpIHtcclxuICAgICAgZGF0YVtpZHggKyAwXSA9IGltYWdlQnVmW2lkeCArIDBdXHJcbiAgICAgIGRhdGFbaWR4ICsgMV0gPSBpbWFnZUJ1ZltpZHggKyAxXVxyXG4gICAgICBkYXRhW2lkeCArIDJdID0gaW1hZ2VCdWZbaWR4ICsgMl1cclxuICAgICAgZGF0YVtpZHggKyAzXSA9IGltYWdlQnVmW2lkeCArIDNdXHJcbiAgICB9XHJcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShjYW52YXNJbWFnZSwgMCwgMClcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBHZW5lcmF0ZU5vaXNlKFxyXG4gICAgaW1hZ2VCdWZmZXI6IEFycmF5PG51bWJlcj4sXHJcbiAgICBzdGFydElkeDogbnVtYmVyLFxyXG4gICAgZW5kSWR4OiBudW1iZXJcclxuICApIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJZHg7IGluZGV4IDwgZW5kSWR4OyBpbmRleCArPSA0KSB7XHJcbiAgICAgIGxldCByID0gUmFuZG9tKDAsIDI1NSlcclxuICAgICAgbGV0IGcgPSBSYW5kb20oMCwgMjU1KVxyXG4gICAgICBsZXQgYiA9IFJhbmRvbSgwLCAyNTUpXHJcblxyXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleF0gPSByXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMV0gPSBnXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMl0gPSBiXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgM10gPSAyNTVcclxuICAgIH1cclxuICAgIHJldHVybiBpbWFnZUJ1ZmZlclxyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9