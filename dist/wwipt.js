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
  var nx = 200;
  var ny = 100;
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
          var time = time_1.TimeStatistic.end() / 1000;
          console.log('process finished!', 'Time: ' + time + 'sec');
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
});

var ww_render_1 = __webpack_require__(/*! ./demo/ww-render */ "./src/demo/ww-render.ts"); // local info


var maxWorkers = navigator.hardwareConcurrency || 4; // web worker sum demo
// wwSum(false)
// generate noise demo
// GenerateNoiseDemo()
// ray tracing diffuse demo
// rayTracingDiffuse()

ww_render_1.wwRender('dist/ww_ray_tracing_dielectric_worker.js', maxWorkers);

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

  function reflect(v, n) {
    return v.sub(n.mul(2 * v.dot(n)));
  }

  Utils.reflect = reflect;

  function schlick(cosine, refIdx) {
    var r0 = (1 - refIdx) / (1 + refIdx);
    r0 = r0 * r0;
    return r0 + (1 - r0) * Math.pow(1 - cosine, 5);
  }

  Utils.schlick = schlick;

  function refract(v, n, niOverNt, refracted) {
    var uv = v.unitVec3();
    var dt = uv.dot(n);
    var discriminant = 1.0 - niOverNt * niOverNt * (1 - dt * dt);

    if (discriminant > 0) {
      refracted.set(uv.sub(n.mul(dt)).mul(niOverNt).sub(n.mul(Math.sqrt(discriminant))));
      return true;
    } else {
      return false;
    }
  }

  Utils.refract = refract;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlbW8vd3ctcmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvbWF0aF91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdtYXRoL3ZlY3Rvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdtYXRoL3ZlY3RvcjMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy90aW1lLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0FBQ0E7O0FBRUEsU0FBZ0IsUUFBaEIsQ0FBeUIsVUFBekIsRUFBNkMsVUFBN0MsRUFBK0Q7QUFDN0QsTUFBSSxZQUFZLEdBQUcsQ0FBbkI7QUFDQSxN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QUFNLENBQUMsQ0FBRCxFQUFJLEdBQUosQ0FBZDtBQUNBLFVBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFELEVBQUksR0FBSixDQUFkO0FBRUEsaUJBQVcsQ0FBQyxLQUFELENBQVgsR0FBcUIsQ0FBckI7QUFDQSxpQkFBVyxDQUFDLEtBQUssR0FBRyxDQUFULENBQVgsR0FBeUIsQ0FBekI7QUFDQSxpQkFBVyxDQUFDLEtBQUssR0FBRyxDQUFULENBQVgsR0FBeUIsQ0FBekI7QUFDQSxpQkFBVyxDQUFDLEtBQUssR0FBRyxDQUFULENBQVgsR0FBeUIsR0FBekI7QUFDRDs7QUFDRCxXQUFPLFdBQVA7QUFDRDs7QUFoQmUsd0JBQWEsYUFBYjtBQWlCakIsQ0FqRkQsRUFBaUIsS0FBSyxHQUFMLGtDQUFLLEVBQUwsQ0FBakIsRSIsImZpbGUiOiJ3d2lwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBUaW1lU3RhdGlzdGljIH0gZnJvbSAnLi4vdGltZSdcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcblxuZXhwb3J0IGZ1bmN0aW9uIHd3UmVuZGVyKHdvcmtlclBhdGg6IHN0cmluZywgbWF4V29ya2VyczogbnVtYmVyKSB7XG4gIGxldCBlbmRXb3JrZXJOdW0gPSAwXG4gIGxldCB3b3JrZXJzOiBhbnkgPSBbXVxuICBsZXQgcHJvY2Vzc051bSA9IDEwXG5cbiAgY29uc3QgbnggPSAyMDBcbiAgY29uc3QgbnkgPSAxMDBcbiAgY29uc3QgbnMgPSAxMDBcblxuICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIGFueVxuICBjYW52YXMuaGVpZ2h0ID0gbnlcbiAgY2FudmFzLndpZHRoID0gbnhcbiAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG4gIC8vIGluaXQgaW1hZ2UgYnVmZmVyXG4gIGxldCBpbWFnZUJ1ZmZlciA9IG5ldyBBcnJheTxudW1iZXI+KG54ICogbnkgKiA0KVxuICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBpbWFnZUJ1ZmZlci5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaW1hZ2VCdWZmZXJbaWR4XSA9IDBcbiAgfVxuXG4gIFRpbWVTdGF0aXN0aWMuc3RhcnQoKVxuICBmb3IgKGxldCB3biA9IDA7IHduIDwgbWF4V29ya2Vyczsgd24rKykge1xuICAgIHdvcmtlcnNbd25dID0gbmV3IFdvcmtlcih3b3JrZXJQYXRoKVxuICAgIGxldCBpZCA9IHduICsgMVxuICAgIGxldCBzID0gd24gKiBNYXRoLmNlaWwobnkgLyBtYXhXb3JrZXJzKVxuICAgIGxldCBlID0gcyArIHByb2Nlc3NOdW0gLSAxXG4gICAgbGV0IGVNYXggPSAod24gKyAxKSAqIE1hdGguY2VpbChueSAvIG1heFdvcmtlcnMpIC0gMVxuXG4gICAgaWYgKGlkID09PSBtYXhXb3JrZXJzKSB7XG4gICAgICBlTWF4ID0gbnkgLSAxXG4gICAgfVxuXG4gICAgbGV0IHBhcmFtZXRlciA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIHN0YXJ0OiBzLFxuICAgICAgZW5kOiBlLFxuICAgICAgZW5kTWF4OiBlTWF4LFxuICAgICAgd2lkdGg6IG54LFxuICAgICAgaGVpZ2h0OiBueSxcbiAgICAgIHNhbXBsaW5nTnVtOiBuc1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZygncG9zdDogJywgcyxcIn5cIixlKVxuICAgIHdvcmtlcnNbd25dLnBvc3RNZXNzYWdlKHBhcmFtZXRlcilcbiAgICB3b3JrZXJzW3duXS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlOiBhbnkpIHtcbiAgICAgIGxldCByZXN1bHQgPSBtZXNzYWdlLmRhdGFcbiAgICAgIGxldCBjb2xBcnJheSA9IHJlc3VsdC5jb2xcbiAgICAgIGxldCBfcyA9IHJlc3VsdC5zdGFydFZhbFxuICAgICAgbGV0IF9lID0gcmVzdWx0LmVuZFZhbFxuICAgICAgbGV0IF9lbSA9IHJlc3VsdC5lbmRNYXhWYWxcbiAgICAgIGxldCBfaSA9IDBcblxuICAgICAgZm9yIChsZXQgaiA9IF9zOyBqIDw9IF9lOyBqKyspIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBueDsgaSsrKSB7XG4gICAgICAgICAgbGV0IGlkeCA9IChpICsgaiAqIG54KSAqIDRcbiAgICAgICAgICBpbWFnZUJ1ZmZlcltpZHhdID0gY29sQXJyYXlbX2kgKiA0XVxuICAgICAgICAgIGltYWdlQnVmZmVyW2lkeCArIDFdID0gY29sQXJyYXlbX2kgKiA0ICsgMV1cbiAgICAgICAgICBpbWFnZUJ1ZmZlcltpZHggKyAyXSA9IGNvbEFycmF5W19pICogNCArIDJdXG4gICAgICAgICAgaW1hZ2VCdWZmZXJbaWR4ICsgM10gPSBjb2xBcnJheVtfaSAqIDQgKyAzXVxuICAgICAgICAgIF9pKytcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoX2UgPCBfZW0pIHtcbiAgICAgICAgbGV0IHBhcmFtZXRlciA9IHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgc3RhcnQ6IF9lICsgMSxcbiAgICAgICAgICBlbmQ6IF9lICsgcHJvY2Vzc051bSAtIDEsXG4gICAgICAgICAgZW5kTWF4OiBfZW0sXG4gICAgICAgICAgd2lkdGg6IG54LFxuICAgICAgICAgIGhlaWdodDogbnksXG4gICAgICAgICAgc2FtcGxpbmdOdW06IG5zXG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3Bvc3Q6ICcsIF9lICsgMSAsXCJ+XCIsX2UgKyBwcm9jZXNzTnVtIC0gMSlcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZShwYXJhbWV0ZXIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnaWQ6ICcgKyBpZCwgJ2ZpbmlzaGVkJylcbiAgICAgICAgdGhpcy50ZXJtaW5hdGUoKVxuICAgICAgICBlbmRXb3JrZXJOdW0rK1xuICAgICAgICBpZiAoZW5kV29ya2VyTnVtID09PSBtYXhXb3JrZXJzKSB7XG4gICAgICAgICAgLy8gcHJvY2VzcyBmaW5pc2hlZFxuICAgICAgICAgIGxldCB0aW1lID0gVGltZVN0YXRpc3RpYy5lbmQoKSAvIDEwMDBcbiAgICAgICAgICBjb25zb2xlLmxvZygncHJvY2VzcyBmaW5pc2hlZCEnLCAnVGltZTogJyArIHRpbWUgKyAnc2VjJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGRpc3BsYXkgdGhlIHByb2Nlc3NlZCBpbWFnZVxuICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgVXRpbHMuV3JpdGUyQ2FudmFzKGNvbnRleHQsIGltYWdlQnVmZmVyLCBueCwgbnkpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgfVxuXG4gIHJlbmRlcigpXG59XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKlxuICogIG1hdGhfdXRpbHMudHNcbiAqICBzaW1wbGUgbWF0aCBmdW5jdGlvbnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFic01heCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICByZXR1cm4geCAqIHggPiB5ICogeSA/IHggOiB5XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhYnNNaW4oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgcmV0dXJuIHggKiB4IDwgeSAqIHkgPyB4IDogeVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbXVsZGVjKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gIHJldHVybiAoeCAqIDEwICogKHkgKiAxMCkpIC8gMTAwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXZkZWMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgcmV0dXJuICh4ICogMTApIC8gKHkgKiAxMCkgLyAxMDBcbn1cbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqXG4gKiAgdmVjdG9yLnRzXG4gKiAgVC1EIHZlY3RvciBkYXRhXG4gKiAgVDp0eXBlLGRlZmF1bHQgc2V0dGluZyBpcyBudW1iZXJcbiAqICBEOmRpbWVuc2lvblxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuaW1wb3J0IHsgYWJzTWF4LCBhYnNNaW4gfSBmcm9tICcuL21hdGhfdXRpbHMnXG5cbmV4cG9ydCBjbGFzcyBWZWN0b3Ige1xuICBwcml2YXRlIF9lbGVtZW50czogQXJyYXk8bnVtYmVyPlxuICBwcml2YXRlIF9kaW1lbnNpb246IG51bWJlclxuXG4gIC8vIGNvbnN0cnVjdHMgdmVjdG9yIHdpdGggcGFyYW1ldGVycyBvciB6ZXJvXG4gIGNvbnN0cnVjdG9yKGRpbWVuc2lvbjogbnVtYmVyLCBwYXJhbXM/OiBBcnJheTxudW1iZXI+KSB7XG4gICAgdGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uXG4gICAgbGV0IF9pID0gMFxuICAgIGlmIChwYXJhbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gaW5pdCBuIGRpbWVuc2lvbiB2ZWN0b3IgZGF0YSxzZXR0aW5nIGFsbCAwXG4gICAgICB0aGlzLl9lbGVtZW50cyA9IG5ldyBBcnJheTxudW1iZXI+KGRpbWVuc2lvbilcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IGRpbWVuc2lvbjsgX2krKykge1xuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRzID0gbmV3IEFycmF5PG51bWJlcj4oZGltZW5zaW9uKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgcGFyYW1zLmxlbmd0aDsgX2krKykge1xuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSBwYXJhbXNbX2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0KHBhcmFtczogVmVjdG9yIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAocGFyYW1zLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCBwYXJhbXMuc2l6ZSgpOyBfaSsrKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IHBhcmFtcy5kYXRhKClbX2ldXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgc2V0WmVybygpIHtcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XG4gICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXG4gICAgfVxuICB9XG5cbiAgc2V0T25lKCkge1xuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDFcbiAgICB9XG4gIH1cblxuICBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1xuICB9XG5cbiAgYXQoaWR4OiBudW1iZXIpIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdpbmRleCBpcyBub3QgY29ycmVjdCEnKVxuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1tpZHhdXG4gIH1cblxuICBkb3Qob3RoZXJzOiBWZWN0b3IgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdvdGhlcnMgaXMgbm90IGNvcnJlY3QhJylcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICBpZiAob3RoZXJzLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkaW1lbnNpb24gaXMgbm90IGNvcnJlY3QhJylcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGxldCByZXQgPSAwXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XG4gICAgICByZXQgKz0gdGhpcy5fZWxlbWVudHNbX2ldICogb3RoZXJzLmRhdGEoKVtfaV1cbiAgICB9XG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgbGVuZ3RoU3F1YXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcylcbiAgfVxuXG4gIGxlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCgpKVxuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIHRoaXMuaWRpdih0aGlzLmxlbmd0aCgpKVxuICB9XG5cbiAgc3VtKCkge1xuICAgIGxldCByZXQgPSAwXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xuICAgICAgcmV0ICs9IHRoaXMuX2VsZW1lbnRzW19pXVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25cbiAgfVxuXG4gIGF2ZygpIHtcbiAgICByZXR1cm4gdGhpcy5zdW0oKSAvIHRoaXMuc2l6ZSgpXG4gIH1cblxuICBtaW4oKSB7XG4gICAgbGV0IG1pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXG5cbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XG4gICAgICBtaW5WYWwgPSBNYXRoLm1pbihtaW5WYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcbiAgICB9XG4gICAgcmV0dXJuIG1pblZhbFxuICB9XG5cbiAgbWF4KCkge1xuICAgIGxldCBtYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcbiAgICAgIG1heFZhbCA9IE1hdGgubWF4KG1heFZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxuICAgIH1cbiAgICByZXR1cm4gbWF4VmFsXG4gIH1cblxuICBhYnNtYXgoKSB7XG4gICAgbGV0IGFic01heFZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xuICAgICAgYWJzTWF4VmFsID0gYWJzTWF4KGFic01heFZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxuICAgIH1cbiAgICByZXR1cm4gYWJzTWF4VmFsXG4gIH1cblxuICBhYnNtaW4oKSB7XG4gICAgbGV0IGFic01pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xuICAgICAgYWJzTWluVmFsID0gYWJzTWluKGFic01pblZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxuICAgIH1cbiAgICByZXR1cm4gYWJzTWluVmFsXG4gIH1cblxuICBkaXN0YW5jZVNxdWFyZWRUbyhvdGhlcnM6IFZlY3Rvcikge1xuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xuICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuXG4gICAgbGV0IHJldCA9IDBcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcbiAgICAgIGxldCBkaWZmID0gdGhpcy5fZWxlbWVudHNbX2ldIC0gb3RoZXJzLmRhdGEoKVtfaV1cbiAgICAgIHJldCArPSBkaWZmICogZGlmZlxuICAgIH1cblxuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIGRpc3RhbmNlVG8ob3RoZXJzOiBWZWN0b3IpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzKSlcbiAgfVxuXG4gIGlzRXF1YWwob3RoZXJzOiBWZWN0b3IpIHtcbiAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVycy5zaXplKCkpIHJldHVybiBmYWxzZVxuXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XG4gICAgICBpZiAodGhpcy5hdChfaSkgIT09IG90aGVycy5hdChfaSkpIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpc1NpbWlsYXIob3RoZXJzOiBWZWN0b3IgfCB1bmRlZmluZWQsIGVwc2lsb246IG51bWJlcikge1xuICAgIGlmIChvdGhlcnMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlcnMuc2l6ZSgpKSByZXR1cm4gZmFsc2VcblxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYXQoX2kpIC0gb3RoZXJzLmF0KF9pKSkgPiBlcHNpbG9uKSByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgYWRkKHBhcmFtcz86IGFueSkge1xuICAgIGxldCBfaSA9IDBcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCB2ID0gcGFyYW1zXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICs9IHYuZGF0YSgpW19pXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGxldCBzID0gcGFyYW1zXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICs9IHNcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld1ZcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuICB9XG5cbiAgc3ViKHBhcmFtcz86IGFueSkge1xuICAgIGxldCBfaSA9IDBcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCB2ID0gcGFyYW1zXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHYuZGF0YSgpW19pXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGxldCBzID0gcGFyYW1zXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHNcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld1ZcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuICB9XG5cbiAgbXVsKHBhcmFtcz86IGFueSkge1xuICAgIGxldCBfaSA9IDBcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCB2ID0gcGFyYW1zXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHYuZGF0YSgpW19pXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGxldCBzID0gcGFyYW1zXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHNcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld1ZcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuICB9XG5cbiAgZGl2KHBhcmFtcz86IGFueSkge1xuICAgIGxldCBfaSA9IDBcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCB2ID0gcGFyYW1zXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC89IHYuZGF0YSgpW19pXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGxldCBzID0gcGFyYW1zXG4gICAgICBpZiAocyA9PT0gMCkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLz0gc1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH1cblxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXG4gIH1cblxuICBpZGl2KHBhcmFtcz86IGFueSkge1xuICAgIHRoaXMuc2V0KHRoaXMuZGl2KHBhcmFtcykpXG4gIH1cblxuICBpYWRkKHBhcmFtcz86IGFueSkge1xuICAgIHRoaXMuc2V0KHRoaXMuYWRkKHBhcmFtcykpXG4gIH1cblxuICBpc3ViKHBhcmFtcz86IGFueSkge1xuICAgIHRoaXMuc2V0KHRoaXMuc3ViKHBhcmFtcykpXG4gIH1cblxuICBpbXVsKHBhcmFtcz86IGFueSkge1xuICAgIHRoaXMuc2V0KHRoaXMubXVsKHBhcmFtcykpXG4gIH1cblxuICBzZXRBdChpZHg6IG51bWJlciwgdmFsOiBudW1iZXIpIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICB0aGlzLl9lbGVtZW50c1tpZHhdID0gdmFsXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiBwcm9qX3UodikgPSA8dSx2Pi88dix2PiB1XG4gICAqIEBwYXJhbSB1XG4gICAqIEBwYXJhbSB2XG4gICAqL1xuICBzdGF0aWMgcHJvaih1OiBWZWN0b3IsIHY6IFZlY3Rvcikge1xuICAgIHJldHVybiB1Lm11bCh2LmRvdCh1KSAvIHUuZG90KHUpKVxuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuL3ZlY3RvcidcblxuZXhwb3J0IGNsYXNzIFZlY3RvcjMgZXh0ZW5kcyBWZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihlMTogbnVtYmVyLCBlMjogbnVtYmVyLCBlMzogbnVtYmVyKSB7XG4gICAgc3VwZXIoMywgbmV3IEFycmF5PG51bWJlcj4oZTEsIGUyLCBlMykpXG4gIH1cblxuICB4KCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEoKVswXVxuICB9XG4gIHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzFdXG4gIH1cbiAgeigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMl1cbiAgfVxuICByKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEoKVswXVxuICB9XG4gIGcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzFdXG4gIH1cbiAgYigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMl1cbiAgfVxuXG4gIGlzZXQodjM6IFZlY3RvcjMpIHtcbiAgICB0aGlzLmRhdGEoKVswXSA9IHYzLnIoKVxuICAgIHRoaXMuZGF0YSgpWzFdID0gdjMuZygpXG4gICAgdGhpcy5kYXRhKClbMl0gPSB2My5iKClcbiAgfVxuXG4gIHNldCh2MzogVmVjdG9yMykge1xuICAgIHJldHVybiBzdXBlci5zZXQobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxuICB9XG5cbiAgYWRkKHYzOiBhbnkpIHtcbiAgICBsZXQgYWRkdiA9IHN1cGVyLmFkZCh2MylcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoYWRkdi5kYXRhKClbMF0sIGFkZHYuZGF0YSgpWzFdLCBhZGR2LmRhdGEoKVsyXSlcbiAgfVxuXG4gIHN1Yih2MzogYW55KSB7XG4gICAgbGV0IHN1YnYgPSBzdXBlci5zdWIodjMpXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKHN1YnYuZGF0YSgpWzBdLCBzdWJ2LmRhdGEoKVsxXSwgc3Vidi5kYXRhKClbMl0pXG4gIH1cblxuICBtdWwodjM6IGFueSkge1xuICAgIGxldCBtdWx2ID0gc3VwZXIubXVsKHYzKVxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhtdWx2LmRhdGEoKVswXSwgbXVsdi5kYXRhKClbMV0sIG11bHYuZGF0YSgpWzJdKVxuICB9XG5cbiAgZGl2KHYzOiBhbnkpIHtcbiAgICBsZXQgZGl2diA9IHN1cGVyLmRpdih2MylcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoZGl2di5kYXRhKClbMF0sIGRpdnYuZGF0YSgpWzFdLCBkaXZ2LmRhdGEoKVsyXSlcbiAgfVxuXG4gIGRvdCh2MzogVmVjdG9yMykge1xuICAgIHJldHVybiBzdXBlci5kb3QobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxuICB9XG5cbiAgdW5pdFZlYzMoKTogVmVjdG9yMyB7XG4gICAgbGV0IG52ID0gbmV3IFZlY3RvcigzLCB0aGlzLmRhdGEoKSlcbiAgICBudi5ub3JtYWxpemUoKVxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhudi5kYXRhKClbMF0sIG52LmRhdGEoKVsxXSwgbnYuZGF0YSgpWzJdKVxuICB9XG5cbiAgZ2FtbWEyKCk6IFZlY3RvcjMge1xuICAgIGxldCB0diA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKFxuICAgICAgTWF0aC5zcXJ0KHR2LmF0KDApKSxcbiAgICAgIE1hdGguc3FydCh0di5hdCgxKSksXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMikpXG4gICAgKVxuICB9XG59XG4iLCJpbXBvcnQgeyB3d1N1bSB9IGZyb20gJy4vZGVtby93dy1zdW0nXG5pbXBvcnQgeyBHZW5lcmF0ZU5vaXNlRGVtbyB9IGZyb20gJy4vZGVtby9ub2lzZS1sb2FkJ1xuaW1wb3J0IHsgd3dSZW5kZXIgfSBmcm9tICcuL2RlbW8vd3ctcmVuZGVyJ1xuXG4vLyBsb2NhbCBpbmZvXG5jb25zdCBtYXhXb3JrZXJzID0gbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3kgfHwgNFxuXG4vLyB3ZWIgd29ya2VyIHN1bSBkZW1vXG4vLyB3d1N1bShmYWxzZSlcblxuLy8gZ2VuZXJhdGUgbm9pc2UgZGVtb1xuLy8gR2VuZXJhdGVOb2lzZURlbW8oKVxuXG4vLyByYXkgdHJhY2luZyBkaWZmdXNlIGRlbW9cbi8vIHJheVRyYWNpbmdEaWZmdXNlKClcblxud3dSZW5kZXIoJ2Rpc3Qvd3dfcmF5X3RyYWNpbmdfZGllbGVjdHJpY193b3JrZXIuanMnLCBtYXhXb3JrZXJzKVxuIiwiZXhwb3J0IG5hbWVzcGFjZSBUaW1lU3RhdGlzdGljIHtcbiAgbGV0IHM6IGFueVxuICBsZXQgZTogYW55XG4gIGV4cG9ydCBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICBzID0gbmV3IERhdGUoKVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGVuZCgpIHtcbiAgICBlID0gbmV3IERhdGUoKVxuICAgIGxldCB0aW1lRGlmZiA9IGUgLSBzXG4gICAgLy8gY29uc29sZS5sb2codGltZURpZmYgKyAnIG1zJylcbiAgICByZXR1cm4gdGltZURpZmZcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4vZWdtYXRoL3ZlY3RvcjMnXG5cbmV4cG9ydCBuYW1lc3BhY2UgVXRpbHMge1xuICBleHBvcnQgZnVuY3Rpb24gUmFuZG9tSW5Vbml0U3BoZXJlKCkge1xuICAgIGxldCBwID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcbiAgICBkbyB7XG4gICAgICBwID0gbmV3IFZlY3RvcjMoTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSlcbiAgICAgICAgLm11bCgyKVxuICAgICAgICAuc3ViKG5ldyBWZWN0b3IzKDEsIDEsIDEpKVxuICAgIH0gd2hpbGUgKHAubGVuZ3RoU3F1YXJlZCgpID49IDEuMClcbiAgICByZXR1cm4gcFxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZmxlY3QodjogVmVjdG9yMywgbjogVmVjdG9yMykge1xuICAgIHJldHVybiB2LnN1YihuLm11bCgyICogdi5kb3QobikpKVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHNjaGxpY2soY29zaW5lOiBudW1iZXIsIHJlZklkeDogbnVtYmVyKSB7XG4gICAgbGV0IHIwID0gKDEgLSByZWZJZHgpIC8gKDEgKyByZWZJZHgpXG4gICAgcjAgPSByMCAqIHIwXG4gICAgcmV0dXJuIHIwICsgKDEgLSByMCkgKiBNYXRoLnBvdygxIC0gY29zaW5lLCA1KVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZnJhY3QoXG4gICAgdjogVmVjdG9yMyxcbiAgICBuOiBWZWN0b3IzLFxuICAgIG5pT3Zlck50OiBudW1iZXIsXG4gICAgcmVmcmFjdGVkOiBWZWN0b3IzXG4gICkge1xuICAgIGxldCB1diA9IHYudW5pdFZlYzMoKVxuICAgIGxldCBkdCA9IHV2LmRvdChuKVxuICAgIGxldCBkaXNjcmltaW5hbnQgPSAxLjAgLSBuaU92ZXJOdCAqIG5pT3Zlck50ICogKDEgLSBkdCAqIGR0KVxuICAgIGlmIChkaXNjcmltaW5hbnQgPiAwKSB7XG4gICAgICByZWZyYWN0ZWQuc2V0KFxuICAgICAgICB1dlxuICAgICAgICAgIC5zdWIobi5tdWwoZHQpKVxuICAgICAgICAgIC5tdWwobmlPdmVyTnQpXG4gICAgICAgICAgLnN1YihuLm11bChNYXRoLnNxcnQoZGlzY3JpbWluYW50KSkpXG4gICAgICApXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gUmFuZG9tKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4ICsgMSAtIG1pbikpICsgbWluXG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gV3JpdGUyQ2FudmFzKFxuICAgIGNvbnRleHQ6IGFueSxcbiAgICBpbWFnZUJ1ZjogQXJyYXk8bnVtYmVyPixcbiAgICB3OiBudW1iZXIsXG4gICAgaDogbnVtYmVyXG4gICkge1xuICAgIGxldCBjYW52YXNJbWFnZSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHcsIGgpXG4gICAgbGV0IGRhdGEgPSBjYW52YXNJbWFnZS5kYXRhXG4gICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZGF0YS5sZW5ndGg7IGlkeCArPSA0KSB7XG4gICAgICBkYXRhW2lkeCArIDBdID0gaW1hZ2VCdWZbaWR4ICsgMF1cbiAgICAgIGRhdGFbaWR4ICsgMV0gPSBpbWFnZUJ1ZltpZHggKyAxXVxuICAgICAgZGF0YVtpZHggKyAyXSA9IGltYWdlQnVmW2lkeCArIDJdXG4gICAgICBkYXRhW2lkeCArIDNdID0gaW1hZ2VCdWZbaWR4ICsgM11cbiAgICB9XG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEoY2FudmFzSW1hZ2UsIDAsIDApXG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gR2VuZXJhdGVOb2lzZShcbiAgICBpbWFnZUJ1ZmZlcjogQXJyYXk8bnVtYmVyPixcbiAgICBzdGFydElkeDogbnVtYmVyLFxuICAgIGVuZElkeDogbnVtYmVyXG4gICkge1xuICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJZHg7IGluZGV4IDwgZW5kSWR4OyBpbmRleCArPSA0KSB7XG4gICAgICBsZXQgciA9IFJhbmRvbSgwLCAyNTUpXG4gICAgICBsZXQgZyA9IFJhbmRvbSgwLCAyNTUpXG4gICAgICBsZXQgYiA9IFJhbmRvbSgwLCAyNTUpXG5cbiAgICAgIGltYWdlQnVmZmVyW2luZGV4XSA9IHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMV0gPSBnXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleCArIDJdID0gYlxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAzXSA9IDI1NVxuICAgIH1cbiAgICByZXR1cm4gaW1hZ2VCdWZmZXJcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==