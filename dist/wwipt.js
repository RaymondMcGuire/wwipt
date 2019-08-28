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

/***/ "./src/demo/ww-render-dynamic.ts":
/*!***************************************!*\
  !*** ./src/demo/ww-render-dynamic.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var time_1 = __webpack_require__(/*! ../time */ "./src/time.ts");

var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");

var hitable_list_1 = __webpack_require__(/*! ../egrender/hitable-list */ "./src/egrender/hitable-list.ts");

var vector3_1 = __webpack_require__(/*! ../egmath/vector3 */ "./src/egmath/vector3.ts");

var sphere_1 = __webpack_require__(/*! ../egrender/sphere */ "./src/egrender/sphere.ts");

var lambertian_1 = __webpack_require__(/*! ../egrender/lambertian */ "./src/egrender/lambertian.ts");

var metal_1 = __webpack_require__(/*! ../egrender/metal */ "./src/egrender/metal.ts");

var dielectric_1 = __webpack_require__(/*! ../egrender/dielectric */ "./src/egrender/dielectric.ts");

function RandomScene(step) {
  var hitList = new Array();
  hitList[0] = new sphere_1.Sphere(new vector3_1.Vector3(0, -1000, 0), 1000, new lambertian_1.Lambertian(new vector3_1.Vector3(0.5, 0.5, 0.5)));
  var i = 1;

  for (var _a = -11; _a < 11; _a += step) {
    for (var _b = -11; _b < 11; _b += step) {
      var chooseMat = Math.random();
      var center = new vector3_1.Vector3(_a + 0.9 * Math.random(), 0.2, _b + 0.9 * Math.random());

      if (center.sub(new vector3_1.Vector3(4, 0.2, 0)).length() > 0.9) {
        if (chooseMat < 0.8) {
          // diffuse
          hitList[i++] = new sphere_1.Sphere(center, 0.2, new lambertian_1.Lambertian(new vector3_1.Vector3(Math.random() * Math.random(), Math.random() * Math.random(), Math.random() * Math.random())));
        } else if (chooseMat < 0.95) {
          // metal
          hitList[i++] = new sphere_1.Sphere(center, 0.2, new metal_1.Metal(new vector3_1.Vector3(0.5 * (1 + Math.random()), 0.5 * (1 + Math.random()), 0.5 * (1 + Math.random())), 0.5 * Math.random()));
        } else {
          // glass
          hitList[i++] = new sphere_1.Sphere(center, 0.2, new dielectric_1.Dielectric(1.5));
        }
      }
    }
  }

  hitList[i++] = new sphere_1.Sphere(new vector3_1.Vector3(0, 1, 0), 1.0, new dielectric_1.Dielectric(1.5));
  hitList[i++] = new sphere_1.Sphere(new vector3_1.Vector3(-4, 1, 0), 1.0, new lambertian_1.Lambertian(new vector3_1.Vector3(0.4, 0.2, 0.1)));
  hitList[i++] = new sphere_1.Sphere(new vector3_1.Vector3(4, 1, 0), 1.0, new metal_1.Metal(new vector3_1.Vector3(0.7, 0.6, 0.5), 0.0));
  return new hitable_list_1.HitableList(hitList, i);
}

var scene = RandomScene(5);

function wwRenderSceneDynamic(workerPath, maxWorkers) {
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
      samplingNum: ns,
      scene: scene
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
          samplingNum: ns,
          scene: scene
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

exports.wwRenderSceneDynamic = wwRenderSceneDynamic;

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

  Vector3.prototype.cross = function (v3) {
    var nv = new vector_1.Vector(3, this.data());
    return new Vector3(nv.data()[1] * v3.data()[2] - nv.data()[2] * v3.data()[1], nv.data()[2] * v3.data()[0] - nv.data()[0] * v3.data()[2], nv.data()[0] * v3.data()[1] - nv.data()[1] * v3.data()[0]);
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

/***/ "./src/egrender/dielectric.ts":
/*!************************************!*\
  !*** ./src/egrender/dielectric.ts ***!
  \************************************/
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

var material_1 = __webpack_require__(/*! ./material */ "./src/egrender/material.ts");

var vector3_1 = __webpack_require__(/*! ../egmath/vector3 */ "./src/egmath/vector3.ts");

var ray_1 = __webpack_require__(/*! ./ray */ "./src/egrender/ray.ts");

var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");

var Dielectric =
/** @class */
function (_super) {
  __extends(Dielectric, _super);

  function Dielectric(ri) {
    var _this = _super.call(this) || this;

    _this.name = 'Dielectric';
    _this.refIdx = ri;
    _this.scattered = new ray_1.Ray(new vector3_1.Vector3(0, 0, 0), new vector3_1.Vector3(0, 0, 0));
    _this.attenuation = new vector3_1.Vector3(0, 0, 0);
    return _this;
  }

  Dielectric.prototype.scatter = function (r, rec) {
    var outwardNormal = new vector3_1.Vector3(0, 0, 0);
    var refracted = new vector3_1.Vector3(0, 0, 0);
    var niOverNt = 0;
    var reflected = util_1.Utils.reflect(r.direction().unitVec3(), rec.normal);
    var reflectProb = 0;
    var cosine = 0;
    this.attenuation = new vector3_1.Vector3(1, 1, 1);

    if (r.direction().dot(rec.normal) > 0) {
      outwardNormal = rec.normal.mul(-1);
      niOverNt = this.refIdx;
      cosine = this.refIdx * r.direction().dot(rec.normal) / r.direction().length();
    } else {
      outwardNormal = rec.normal;
      niOverNt = 1.0 / this.refIdx;
      cosine = -r.direction().dot(rec.normal) / r.direction().length();
    }

    if (util_1.Utils.refract(r.direction(), outwardNormal, niOverNt, refracted)) {
      reflectProb = util_1.Utils.schlick(cosine, this.refIdx);
    } else {
      reflectProb = 1.0;
    }

    if (Math.random() < reflectProb) {
      this.scattered = new ray_1.Ray(rec.p, reflected);
    } else {
      this.scattered = new ray_1.Ray(rec.p, refracted);
    }

    return true;
  };

  return Dielectric;
}(material_1.Material);

exports.Dielectric = Dielectric;

/***/ }),

/***/ "./src/egrender/hitable-list.ts":
/*!**************************************!*\
  !*** ./src/egrender/hitable-list.ts ***!
  \**************************************/
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

var hitable_1 = __webpack_require__(/*! ./hitable */ "./src/egrender/hitable.ts");

var vector3_1 = __webpack_require__(/*! ../egmath/vector3 */ "./src/egmath/vector3.ts");

var lambertian_1 = __webpack_require__(/*! ./lambertian */ "./src/egrender/lambertian.ts");

var HitableList =
/** @class */
function (_super) {
  __extends(HitableList, _super);

  function HitableList(l, n) {
    var _this = _super.call(this) || this;

    _this.name = 'HitableList';
    _this.list = l;
    _this.listSize = n;
    return _this;
  }

  HitableList.prototype.hit = function (r, tMin, tMax, rec) {
    var tmpRec = new hitable_1.HitRecord(0, new vector3_1.Vector3(0, 0, 0), new vector3_1.Vector3(0, 0, 0), new lambertian_1.Lambertian(new vector3_1.Vector3(0, 0, 0)));
    var hitAnything = false;
    var closestSoFar = tMax;

    for (var i = 0; i < this.listSize; i++) {
      if (this.list[i].hit(r, tMin, closestSoFar, tmpRec)) {
        hitAnything = true;
        closestSoFar = tmpRec.t;
        rec.t = tmpRec.t;
        rec.p = tmpRec.p;
        rec.normal = tmpRec.normal;
        rec.material = tmpRec.material;
      }
    }

    return hitAnything;
  };

  return HitableList;
}(hitable_1.Hitable);

exports.HitableList = HitableList;

/***/ }),

/***/ "./src/egrender/hitable.ts":
/*!*********************************!*\
  !*** ./src/egrender/hitable.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var HitRecord =
/** @class */
function () {
  function HitRecord(_t, _p, _normal, _material) {
    this.t = _t;
    this.p = _p;
    this.normal = _normal;
    this.material = _material;
  }

  return HitRecord;
}();

exports.HitRecord = HitRecord;

var Hitable =
/** @class */
function () {
  function Hitable() {}

  return Hitable;
}();

exports.Hitable = Hitable;

/***/ }),

/***/ "./src/egrender/lambertian.ts":
/*!************************************!*\
  !*** ./src/egrender/lambertian.ts ***!
  \************************************/
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

var material_1 = __webpack_require__(/*! ./material */ "./src/egrender/material.ts");

var vector3_1 = __webpack_require__(/*! ../egmath/vector3 */ "./src/egmath/vector3.ts");

var ray_1 = __webpack_require__(/*! ./ray */ "./src/egrender/ray.ts");

var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");

var Lambertian =
/** @class */
function (_super) {
  __extends(Lambertian, _super);

  function Lambertian(a) {
    var _this = _super.call(this) || this;

    _this.name = 'Lambertian';
    _this.albedo = a;
    _this.scattered = new ray_1.Ray(new vector3_1.Vector3(0, 0, 0), new vector3_1.Vector3(0, 0, 0));
    _this.attenuation = new vector3_1.Vector3(0, 0, 0);
    return _this;
  }

  Lambertian.prototype.scatter = function (r, rec) {
    var target = rec.p.add(rec.normal).add(util_1.Utils.RandomInUnitSphere());
    this.scattered = new ray_1.Ray(rec.p, target.sub(rec.p));
    this.attenuation = new vector3_1.Vector3(this.albedo.x(), this.albedo.y(), this.albedo.z());
    return true;
  };

  return Lambertian;
}(material_1.Material);

exports.Lambertian = Lambertian;

/***/ }),

/***/ "./src/egrender/material.ts":
/*!**********************************!*\
  !*** ./src/egrender/material.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Material =
/** @class */
function () {
  function Material() {}

  return Material;
}();

exports.Material = Material;

/***/ }),

/***/ "./src/egrender/metal.ts":
/*!*******************************!*\
  !*** ./src/egrender/metal.ts ***!
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

var material_1 = __webpack_require__(/*! ./material */ "./src/egrender/material.ts");

var vector3_1 = __webpack_require__(/*! ../egmath/vector3 */ "./src/egmath/vector3.ts");

var ray_1 = __webpack_require__(/*! ./ray */ "./src/egrender/ray.ts");

var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");

var Metal =
/** @class */
function (_super) {
  __extends(Metal, _super);

  function Metal(a, f) {
    var _this = _super.call(this) || this;

    _this.name = 'Metal';
    _this.albedo = a;
    _this.scattered = new ray_1.Ray(new vector3_1.Vector3(0, 0, 0), new vector3_1.Vector3(0, 0, 0));
    _this.attenuation = new vector3_1.Vector3(0, 0, 0);
    if (f < 1) _this.fuzz = f;else _this.fuzz = 1;
    return _this;
  }

  Metal.prototype.scatter = function (r, rec) {
    var reflected = util_1.Utils.reflect(r.direction().unitVec3(), rec.normal);
    this.scattered = new ray_1.Ray(rec.p, reflected.add(util_1.Utils.RandomInUnitSphere().mul(this.fuzz)));
    this.attenuation = new vector3_1.Vector3(this.albedo.x(), this.albedo.y(), this.albedo.z());
    return this.scattered.direction().dot(rec.normal) > 0;
  };

  return Metal;
}(material_1.Material);

exports.Metal = Metal;

/***/ }),

/***/ "./src/egrender/ray.ts":
/*!*****************************!*\
  !*** ./src/egrender/ray.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Ray =
/** @class */
function () {
  function Ray(a, b) {
    this._A = a;
    this._B = b;
  }

  Ray.prototype.origin = function () {
    return this._A;
  };

  Ray.prototype.direction = function () {
    return this._B;
  };

  Ray.prototype.pointAtParam = function (t) {
    return this._A.add(this._B.mul(t));
  };

  return Ray;
}();

exports.Ray = Ray;

/***/ }),

/***/ "./src/egrender/sphere.ts":
/*!********************************!*\
  !*** ./src/egrender/sphere.ts ***!
  \********************************/
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

var hitable_1 = __webpack_require__(/*! ./hitable */ "./src/egrender/hitable.ts");

var Sphere =
/** @class */
function (_super) {
  __extends(Sphere, _super);

  function Sphere(cen, r, mat) {
    var _this = _super.call(this) || this;

    _this.name = 'Sphere';
    _this.center = cen;
    _this.radius = r;
    _this.material = mat;
    return _this;
  }

  Sphere.prototype.hit = function (r, tMin, tMax, rec) {
    var oc = r.origin().sub(this.center);
    var a = r.direction().dot(r.direction());
    var b = oc.dot(r.direction());
    var c = oc.dot(oc) - this.radius * this.radius;
    var discriminant = b * b - a * c;

    if (discriminant > 0) {
      var tmp = (-b - Math.sqrt(b * b - a * c)) / a;

      if (tmp < tMax && tmp > tMin) {
        rec.t = tmp;
        rec.p = r.pointAtParam(rec.t);
        rec.normal = rec.p.sub(this.center).div(this.radius);
        rec.material = this.material;
        return true;
      }

      tmp = (-b + Math.sqrt(b * b - a * c)) / a;

      if (tmp < tMax && tmp > tMin) {
        rec.t = tmp;
        rec.p = r.pointAtParam(rec.t);
        rec.normal = rec.p.sub(this.center).div(this.radius);
        rec.material = this.material;
        return true;
      }
    }

    return false;
  };

  return Sphere;
}(hitable_1.Hitable);

exports.Sphere = Sphere;

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

var ww_render_dynamic_1 = __webpack_require__(/*! ./demo/ww-render-dynamic */ "./src/demo/ww-render-dynamic.ts"); // local info


var maxWorkers = navigator.hardwareConcurrency || 4; // web worker sum demo
// wwSum(false)
// generate noise demo
// GenerateNoiseDemo()
// ray tracing diffuse demo
// rayTracingDiffuse()
// render fix scene
// wwRenderSceneFix('dist/ww_ray_tracing_random_worker.js', maxWorkers)

ww_render_dynamic_1.wwRenderSceneDynamic('dist/ww_ray_tracing_random_worker.js', maxWorkers);

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

  function RandomInUnitDisk() {
    var p = new vector3_1.Vector3(0, 0, 0);

    do {
      p = new vector3_1.Vector3(Math.random(), Math.random(), Math.random()).mul(2).sub(new vector3_1.Vector3(1, 1, 0));
    } while (p.lengthSquared() >= 1.0);

    return p;
  }

  Utils.RandomInUnitDisk = RandomInUnitDisk;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlbW8vd3ctcmVuZGVyLWR5bmFtaWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC9tYXRoX3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvZGllbGVjdHJpYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvaGl0YWJsZS1saXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9oaXRhYmxlLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9sYW1iZXJ0aWFuLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9tYXRlcmlhbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvbWV0YWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL3JheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvc3BoZXJlLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNB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QUssRUFBTCxDQUFqQixFIiwiZmlsZSI6Ind3aXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJkaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IFRpbWVTdGF0aXN0aWMgfSBmcm9tICcuLi90aW1lJ1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWwnXHJcbmltcG9ydCB7IEhpdGFibGVMaXN0IH0gZnJvbSAnLi4vZWdyZW5kZXIvaGl0YWJsZS1saXN0J1xyXG5pbXBvcnQgeyBIaXRhYmxlIH0gZnJvbSAnLi4vZWdyZW5kZXIvaGl0YWJsZSdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBTcGhlcmUgfSBmcm9tICcuLi9lZ3JlbmRlci9zcGhlcmUnXHJcbmltcG9ydCB7IExhbWJlcnRpYW4gfSBmcm9tICcuLi9lZ3JlbmRlci9sYW1iZXJ0aWFuJ1xyXG5pbXBvcnQgeyBNZXRhbCB9IGZyb20gJy4uL2VncmVuZGVyL21ldGFsJ1xyXG5pbXBvcnQgeyBEaWVsZWN0cmljIH0gZnJvbSAnLi4vZWdyZW5kZXIvZGllbGVjdHJpYydcclxuXHJcbmZ1bmN0aW9uIFJhbmRvbVNjZW5lKHN0ZXA6IG51bWJlcik6IEhpdGFibGVMaXN0IHtcclxuICBsZXQgaGl0TGlzdCA9IG5ldyBBcnJheTxIaXRhYmxlPigpXHJcbiAgaGl0TGlzdFswXSA9IG5ldyBTcGhlcmUoXHJcbiAgICBuZXcgVmVjdG9yMygwLCAtMTAwMCwgMCksXHJcbiAgICAxMDAwLFxyXG4gICAgbmV3IExhbWJlcnRpYW4obmV3IFZlY3RvcjMoMC41LCAwLjUsIDAuNSkpXHJcbiAgKVxyXG4gIGxldCBpID0gMVxyXG4gIGZvciAobGV0IF9hID0gLTExOyBfYSA8IDExOyBfYSArPSBzdGVwKSB7XHJcbiAgICBmb3IgKGxldCBfYiA9IC0xMTsgX2IgPCAxMTsgX2IgKz0gc3RlcCkge1xyXG4gICAgICBsZXQgY2hvb3NlTWF0ID0gTWF0aC5yYW5kb20oKVxyXG4gICAgICBsZXQgY2VudGVyID0gbmV3IFZlY3RvcjMoXHJcbiAgICAgICAgX2EgKyAwLjkgKiBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgIDAuMixcclxuICAgICAgICBfYiArIDAuOSAqIE1hdGgucmFuZG9tKClcclxuICAgICAgKVxyXG4gICAgICBpZiAoY2VudGVyLnN1YihuZXcgVmVjdG9yMyg0LCAwLjIsIDApKS5sZW5ndGgoKSA+IDAuOSkge1xyXG4gICAgICAgIGlmIChjaG9vc2VNYXQgPCAwLjgpIHtcclxuICAgICAgICAgIC8vIGRpZmZ1c2VcclxuICAgICAgICAgIGhpdExpc3RbaSsrXSA9IG5ldyBTcGhlcmUoXHJcbiAgICAgICAgICAgIGNlbnRlcixcclxuICAgICAgICAgICAgMC4yLFxyXG4gICAgICAgICAgICBuZXcgTGFtYmVydGlhbihcclxuICAgICAgICAgICAgICBuZXcgVmVjdG9yMyhcclxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIE1hdGgucmFuZG9tKCksXHJcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogTWF0aC5yYW5kb20oKVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hvb3NlTWF0IDwgMC45NSkge1xyXG4gICAgICAgICAgLy8gbWV0YWxcclxuICAgICAgICAgIGhpdExpc3RbaSsrXSA9IG5ldyBTcGhlcmUoXHJcbiAgICAgICAgICAgIGNlbnRlcixcclxuICAgICAgICAgICAgMC4yLFxyXG4gICAgICAgICAgICBuZXcgTWV0YWwoXHJcbiAgICAgICAgICAgICAgbmV3IFZlY3RvcjMoXHJcbiAgICAgICAgICAgICAgICAwLjUgKiAoMSArIE1hdGgucmFuZG9tKCkpLFxyXG4gICAgICAgICAgICAgICAgMC41ICogKDEgKyBNYXRoLnJhbmRvbSgpKSxcclxuICAgICAgICAgICAgICAgIDAuNSAqICgxICsgTWF0aC5yYW5kb20oKSlcclxuICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgIDAuNSAqIE1hdGgucmFuZG9tKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBnbGFzc1xyXG4gICAgICAgICAgaGl0TGlzdFtpKytdID0gbmV3IFNwaGVyZShjZW50ZXIsIDAuMiwgbmV3IERpZWxlY3RyaWMoMS41KSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpdExpc3RbaSsrXSA9IG5ldyBTcGhlcmUobmV3IFZlY3RvcjMoMCwgMSwgMCksIDEuMCwgbmV3IERpZWxlY3RyaWMoMS41KSlcclxuICBoaXRMaXN0W2krK10gPSBuZXcgU3BoZXJlKFxyXG4gICAgbmV3IFZlY3RvcjMoLTQsIDEsIDApLFxyXG4gICAgMS4wLFxyXG4gICAgbmV3IExhbWJlcnRpYW4obmV3IFZlY3RvcjMoMC40LCAwLjIsIDAuMSkpXHJcbiAgKVxyXG4gIGhpdExpc3RbaSsrXSA9IG5ldyBTcGhlcmUoXHJcbiAgICBuZXcgVmVjdG9yMyg0LCAxLCAwKSxcclxuICAgIDEuMCxcclxuICAgIG5ldyBNZXRhbChuZXcgVmVjdG9yMygwLjcsIDAuNiwgMC41KSwgMC4wKVxyXG4gIClcclxuXHJcbiAgcmV0dXJuIG5ldyBIaXRhYmxlTGlzdChoaXRMaXN0LCBpKVxyXG59XHJcblxyXG5sZXQgc2NlbmUgPSBSYW5kb21TY2VuZSg1KVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHd3UmVuZGVyU2NlbmVEeW5hbWljKHdvcmtlclBhdGg6IHN0cmluZywgbWF4V29ya2VyczogbnVtYmVyKSB7XHJcbiAgbGV0IGVuZFdvcmtlck51bSA9IDBcclxuICBsZXQgd29ya2VyczogYW55ID0gW11cclxuICBsZXQgcHJvY2Vzc051bSA9IDEwXHJcblxyXG4gIGNvbnN0IG54ID0gODAwXHJcbiAgY29uc3QgbnkgPSA0MDBcclxuICBjb25zdCBucyA9IDEwMFxyXG5cclxuICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIGFueVxyXG4gIGNhbnZhcy5oZWlnaHQgPSBueVxyXG4gIGNhbnZhcy53aWR0aCA9IG54XHJcbiAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuICAvLyBpbml0IGltYWdlIGJ1ZmZlclxyXG4gIGxldCBpbWFnZUJ1ZmZlciA9IG5ldyBBcnJheTxudW1iZXI+KG54ICogbnkgKiA0KVxyXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGltYWdlQnVmZmVyLmxlbmd0aDsgaWR4KyspIHtcclxuICAgIGltYWdlQnVmZmVyW2lkeF0gPSAwXHJcbiAgfVxyXG5cclxuICBUaW1lU3RhdGlzdGljLnN0YXJ0KClcclxuICBmb3IgKGxldCB3biA9IDA7IHduIDwgbWF4V29ya2Vyczsgd24rKykge1xyXG4gICAgd29ya2Vyc1t3bl0gPSBuZXcgV29ya2VyKHdvcmtlclBhdGgpXHJcbiAgICBsZXQgaWQgPSB3biArIDFcclxuICAgIGxldCBzID0gd24gKiBNYXRoLmNlaWwobnkgLyBtYXhXb3JrZXJzKVxyXG4gICAgbGV0IGUgPSBzICsgcHJvY2Vzc051bSAtIDFcclxuICAgIGxldCBlTWF4ID0gKHduICsgMSkgKiBNYXRoLmNlaWwobnkgLyBtYXhXb3JrZXJzKSAtIDFcclxuXHJcbiAgICBpZiAoaWQgPT09IG1heFdvcmtlcnMpIHtcclxuICAgICAgZU1heCA9IG55IC0gMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYXJhbWV0ZXIgPSB7XHJcbiAgICAgIGlkOiBpZCxcclxuICAgICAgc3RhcnQ6IHMsXHJcbiAgICAgIGVuZDogZSxcclxuICAgICAgZW5kTWF4OiBlTWF4LFxyXG4gICAgICB3aWR0aDogbngsXHJcbiAgICAgIGhlaWdodDogbnksXHJcbiAgICAgIHNhbXBsaW5nTnVtOiBucyxcclxuICAgICAgc2NlbmU6IHNjZW5lXHJcbiAgICB9XHJcbiAgICAvLyBjb25zb2xlLmxvZygncG9zdDogJywgcyxcIn5cIixlKVxyXG4gICAgd29ya2Vyc1t3bl0ucG9zdE1lc3NhZ2UocGFyYW1ldGVyKVxyXG4gICAgd29ya2Vyc1t3bl0ub25tZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZTogYW55KSB7XHJcbiAgICAgIGxldCByZXN1bHQgPSBtZXNzYWdlLmRhdGFcclxuICAgICAgbGV0IGNvbEFycmF5ID0gcmVzdWx0LmNvbFxyXG4gICAgICBsZXQgX3MgPSByZXN1bHQuc3RhcnRWYWxcclxuICAgICAgbGV0IF9lID0gcmVzdWx0LmVuZFZhbFxyXG4gICAgICBsZXQgX2VtID0gcmVzdWx0LmVuZE1heFZhbFxyXG4gICAgICBsZXQgX2kgPSAwXHJcblxyXG4gICAgICBmb3IgKGxldCBqID0gX3M7IGogPD0gX2U7IGorKykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbng7IGkrKykge1xyXG4gICAgICAgICAgbGV0IGlkeCA9IChpICsgaiAqIG54KSAqIDRcclxuICAgICAgICAgIGltYWdlQnVmZmVyW2lkeF0gPSBjb2xBcnJheVtfaSAqIDRdXHJcbiAgICAgICAgICBpbWFnZUJ1ZmZlcltpZHggKyAxXSA9IGNvbEFycmF5W19pICogNCArIDFdXHJcbiAgICAgICAgICBpbWFnZUJ1ZmZlcltpZHggKyAyXSA9IGNvbEFycmF5W19pICogNCArIDJdXHJcbiAgICAgICAgICBpbWFnZUJ1ZmZlcltpZHggKyAzXSA9IGNvbEFycmF5W19pICogNCArIDNdXHJcbiAgICAgICAgICBfaSsrXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2UgPCBfZW0pIHtcclxuICAgICAgICBsZXQgcGFyYW1ldGVyID0ge1xyXG4gICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgc3RhcnQ6IF9lICsgMSxcclxuICAgICAgICAgIGVuZDogX2UgKyBwcm9jZXNzTnVtIC0gMSxcclxuICAgICAgICAgIGVuZE1heDogX2VtLFxyXG4gICAgICAgICAgd2lkdGg6IG54LFxyXG4gICAgICAgICAgaGVpZ2h0OiBueSxcclxuICAgICAgICAgIHNhbXBsaW5nTnVtOiBucyxcclxuICAgICAgICAgIHNjZW5lOiBzY2VuZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZygncG9zdDogJywgX2UgKyAxICxcIn5cIixfZSArIHByb2Nlc3NOdW0gLSAxKVxyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2UocGFyYW1ldGVyKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdpZDogJyArIGlkLCAnZmluaXNoZWQnKVxyXG4gICAgICAgIHRoaXMudGVybWluYXRlKClcclxuICAgICAgICBlbmRXb3JrZXJOdW0rK1xyXG4gICAgICAgIGlmIChlbmRXb3JrZXJOdW0gPT09IG1heFdvcmtlcnMpIHtcclxuICAgICAgICAgIC8vIHByb2Nlc3MgZmluaXNoZWRcclxuICAgICAgICAgIGxldCB0aW1lID0gVGltZVN0YXRpc3RpYy5lbmQoKSAvIDEwMDBcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9jZXNzIGZpbmlzaGVkIScsICdUaW1lOiAnICsgdGltZSArICdzZWMnKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZGlzcGxheSB0aGUgcHJvY2Vzc2VkIGltYWdlXHJcbiAgZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgVXRpbHMuV3JpdGUyQ2FudmFzKGNvbnRleHQsIGltYWdlQnVmZmVyLCBueCwgbnkpXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKClcclxufVxyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqICBtYXRoX3V0aWxzLnRzXHJcbiAqICBzaW1wbGUgbWF0aCBmdW5jdGlvbnNcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFic01heCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiB4ICogeCA+IHkgKiB5ID8geCA6IHlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFic01pbih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiB4ICogeCA8IHkgKiB5ID8geCA6IHlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG11bGRlYyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiAoeCAqIDEwICogKHkgKiAxMCkpIC8gMTAwXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXZkZWMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICByZXR1cm4gKHggKiAxMCkgLyAoeSAqIDEwKSAvIDEwMFxyXG59XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICpcclxuICogIHZlY3Rvci50c1xyXG4gKiAgVC1EIHZlY3RvciBkYXRhXHJcbiAqICBUOnR5cGUsZGVmYXVsdCBzZXR0aW5nIGlzIG51bWJlclxyXG4gKiAgRDpkaW1lbnNpb25cclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5pbXBvcnQgeyBhYnNNYXgsIGFic01pbiB9IGZyb20gJy4vbWF0aF91dGlscydcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3Ige1xyXG4gIF9lbGVtZW50czogQXJyYXk8bnVtYmVyPlxyXG4gIF9kaW1lbnNpb246IG51bWJlclxyXG5cclxuICAvLyBjb25zdHJ1Y3RzIHZlY3RvciB3aXRoIHBhcmFtZXRlcnMgb3IgemVyb1xyXG4gIGNvbnN0cnVjdG9yKGRpbWVuc2lvbjogbnVtYmVyLCBwYXJhbXM/OiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICB0aGlzLl9kaW1lbnNpb24gPSBkaW1lbnNpb25cclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmIChwYXJhbXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBpbml0IG4gZGltZW5zaW9uIHZlY3RvciBkYXRhLHNldHRpbmcgYWxsIDBcclxuICAgICAgdGhpcy5fZWxlbWVudHMgPSBuZXcgQXJyYXk8bnVtYmVyPihkaW1lbnNpb24pXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IGRpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDBcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZWxlbWVudHMgPSBuZXcgQXJyYXk8bnVtYmVyPihkaW1lbnNpb24pXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IHBhcmFtcy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSBwYXJhbXNbX2ldXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldChwYXJhbXM6IFZlY3RvciB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChwYXJhbXMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdkaW1lbnNpb24gaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgcGFyYW1zLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IHBhcmFtcy5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIHNldFplcm8oKSB7XHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldE9uZSgpIHtcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gMVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1xyXG4gIH1cclxuXHJcbiAgYXQoaWR4OiBudW1iZXIpIHtcclxuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnaW5kZXggaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudHNbaWR4XVxyXG4gIH1cclxuXHJcbiAgZG90KG90aGVyczogVmVjdG9yIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ290aGVycyBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXQgPSAwXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgcmV0ICs9IHRoaXMuX2VsZW1lbnRzW19pXSAqIG90aGVycy5kYXRhKClbX2ldXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBsZW5ndGhTcXVhcmVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpXHJcbiAgfVxyXG5cclxuICBsZW5ndGgoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCgpKVxyXG4gIH1cclxuXHJcbiAgbm9ybWFsaXplKCkge1xyXG4gICAgdGhpcy5pZGl2KHRoaXMubGVuZ3RoKCkpXHJcbiAgfVxyXG5cclxuICBzdW0oKSB7XHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICByZXQgKz0gdGhpcy5fZWxlbWVudHNbX2ldXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBzaXplKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvblxyXG4gIH1cclxuXHJcbiAgYXZnKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3VtKCkgLyB0aGlzLnNpemUoKVxyXG4gIH1cclxuXHJcbiAgbWluKCkge1xyXG4gICAgbGV0IG1pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBtaW5WYWwgPSBNYXRoLm1pbihtaW5WYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBtaW5WYWxcclxuICB9XHJcblxyXG4gIG1heCgpIHtcclxuICAgIGxldCBtYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBtYXhWYWwgPSBNYXRoLm1heChtYXhWYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBtYXhWYWxcclxuICB9XHJcblxyXG4gIGFic21heCgpIHtcclxuICAgIGxldCBhYnNNYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBhYnNNYXhWYWwgPSBhYnNNYXgoYWJzTWF4VmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWJzTWF4VmFsXHJcbiAgfVxyXG5cclxuICBhYnNtaW4oKSB7XHJcbiAgICBsZXQgYWJzTWluVmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgYWJzTWluVmFsID0gYWJzTWluKGFic01pblZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFic01pblZhbFxyXG4gIH1cclxuXHJcbiAgZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzOiBWZWN0b3IpIHtcclxuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXQgPSAwXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgbGV0IGRpZmYgPSB0aGlzLl9lbGVtZW50c1tfaV0gLSBvdGhlcnMuZGF0YSgpW19pXVxyXG4gICAgICByZXQgKz0gZGlmZiAqIGRpZmZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBkaXN0YW5jZVRvKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzKSlcclxuICB9XHJcblxyXG4gIGlzRXF1YWwob3RoZXJzOiBWZWN0b3IpIHtcclxuICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXJzLnNpemUoKSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmF0KF9pKSAhPT0gb3RoZXJzLmF0KF9pKSkgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGlzU2ltaWxhcihvdGhlcnM6IFZlY3RvciB8IHVuZGVmaW5lZCwgZXBzaWxvbjogbnVtYmVyKSB7XHJcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlcnMuc2l6ZSgpKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYXQoX2kpIC0gb3RoZXJzLmF0KF9pKSkgPiBlcHNpbG9uKSByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgYWRkKHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSArPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKz0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBzdWIocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAtPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIG11bChwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKj0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgZGl2KHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAvPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgaWYgKHMgPT09IDApIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC89IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgaWRpdihwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMuZGl2KHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBpYWRkKHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5hZGQocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIGlzdWIocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLnN1YihwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgaW11bChwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMubXVsKHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBzZXRBdChpZHg6IG51bWJlciwgdmFsOiBudW1iZXIpIHtcclxuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZWxlbWVudHNbaWR4XSA9IHZhbFxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHByb2pfdSh2KSA9IDx1LHY+Lzx2LHY+IHVcclxuICAgKiBAcGFyYW0gdVxyXG4gICAqIEBwYXJhbSB2XHJcbiAgICovXHJcbiAgc3RhdGljIHByb2oodTogVmVjdG9yLCB2OiBWZWN0b3IpIHtcclxuICAgIHJldHVybiB1Lm11bCh2LmRvdCh1KSAvIHUuZG90KHUpKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuL3ZlY3RvcidcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3IzIGV4dGVuZHMgVmVjdG9yIHtcclxuICBjb25zdHJ1Y3RvcihlMTogbnVtYmVyLCBlMjogbnVtYmVyLCBlMzogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigzLCBuZXcgQXJyYXk8bnVtYmVyPihlMSwgZTIsIGUzKSlcclxuICB9XHJcblxyXG4gIHgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMF1cclxuICB9XHJcbiAgeSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsxXVxyXG4gIH1cclxuICB6KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzJdXHJcbiAgfVxyXG4gIHIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMF1cclxuICB9XHJcbiAgZygpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsxXVxyXG4gIH1cclxuICBiKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzJdXHJcbiAgfVxyXG5cclxuICBpc2V0KHYzOiBWZWN0b3IzKSB7XHJcbiAgICB0aGlzLmRhdGEoKVswXSA9IHYzLnIoKVxyXG4gICAgdGhpcy5kYXRhKClbMV0gPSB2My5nKClcclxuICAgIHRoaXMuZGF0YSgpWzJdID0gdjMuYigpXHJcbiAgfVxyXG5cclxuICBzZXQodjM6IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiBzdXBlci5zZXQobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxyXG4gIH1cclxuXHJcbiAgYWRkKHYzOiBhbnkpIHtcclxuICAgIGxldCBhZGR2ID0gc3VwZXIuYWRkKHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGFkZHYuZGF0YSgpWzBdLCBhZGR2LmRhdGEoKVsxXSwgYWRkdi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBzdWIodjM6IGFueSkge1xyXG4gICAgbGV0IHN1YnYgPSBzdXBlci5zdWIodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoc3Vidi5kYXRhKClbMF0sIHN1YnYuZGF0YSgpWzFdLCBzdWJ2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIG11bCh2MzogYW55KSB7XHJcbiAgICBsZXQgbXVsdiA9IHN1cGVyLm11bCh2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhtdWx2LmRhdGEoKVswXSwgbXVsdi5kYXRhKClbMV0sIG11bHYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgZGl2KHYzOiBhbnkpIHtcclxuICAgIGxldCBkaXZ2ID0gc3VwZXIuZGl2KHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGRpdnYuZGF0YSgpWzBdLCBkaXZ2LmRhdGEoKVsxXSwgZGl2di5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBkb3QodjM6IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiBzdXBlci5kb3QobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxyXG4gIH1cclxuXHJcbiAgY3Jvc3ModjM6IFZlY3RvcjMpIHtcclxuICAgIGxldCBudiA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoXHJcbiAgICAgIG52LmRhdGEoKVsxXSAqIHYzLmRhdGEoKVsyXSAtIG52LmRhdGEoKVsyXSAqIHYzLmRhdGEoKVsxXSxcclxuICAgICAgbnYuZGF0YSgpWzJdICogdjMuZGF0YSgpWzBdIC0gbnYuZGF0YSgpWzBdICogdjMuZGF0YSgpWzJdLFxyXG4gICAgICBudi5kYXRhKClbMF0gKiB2My5kYXRhKClbMV0gLSBudi5kYXRhKClbMV0gKiB2My5kYXRhKClbMF1cclxuICAgIClcclxuICB9XHJcblxyXG4gIHVuaXRWZWMzKCk6IFZlY3RvcjMge1xyXG4gICAgbGV0IG52ID0gbmV3IFZlY3RvcigzLCB0aGlzLmRhdGEoKSlcclxuICAgIG52Lm5vcm1hbGl6ZSgpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMobnYuZGF0YSgpWzBdLCBudi5kYXRhKClbMV0sIG52LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIGdhbW1hMigpOiBWZWN0b3IzIHtcclxuICAgIGxldCB0diA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoXHJcbiAgICAgIE1hdGguc3FydCh0di5hdCgwKSksXHJcbiAgICAgIE1hdGguc3FydCh0di5hdCgxKSksXHJcbiAgICAgIE1hdGguc3FydCh0di5hdCgyKSlcclxuICAgIClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBEaWVsZWN0cmljIGV4dGVuZHMgTWF0ZXJpYWwge1xyXG4gIHNjYXR0ZXJlZDogUmF5XHJcbiAgYXR0ZW51YXRpb246IFZlY3RvcjNcclxuICByZWZJZHg6IG51bWJlclxyXG4gIG5hbWU6IHN0cmluZ1xyXG5cclxuICBjb25zdHJ1Y3RvcihyaTogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLm5hbWUgPSAnRGllbGVjdHJpYydcclxuICAgIHRoaXMucmVmSWR4ID0gcmlcclxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICB9XHJcblxyXG4gIHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IG91dHdhcmROb3JtYWwgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gICAgbGV0IHJlZnJhY3RlZCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcblxyXG4gICAgbGV0IG5pT3Zlck50ID0gMFxyXG5cclxuICAgIGxldCByZWZsZWN0ZWQgPSBVdGlscy5yZWZsZWN0KHIuZGlyZWN0aW9uKCkudW5pdFZlYzMoKSwgcmVjLm5vcm1hbClcclxuICAgIGxldCByZWZsZWN0UHJvYiA9IDBcclxuICAgIGxldCBjb3NpbmUgPSAwXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoMSwgMSwgMSlcclxuXHJcbiAgICBpZiAoci5kaXJlY3Rpb24oKS5kb3QocmVjLm5vcm1hbCkgPiAwKSB7XHJcbiAgICAgIG91dHdhcmROb3JtYWwgPSByZWMubm9ybWFsLm11bCgtMSlcclxuICAgICAgbmlPdmVyTnQgPSB0aGlzLnJlZklkeFxyXG4gICAgICBjb3NpbmUgPVxyXG4gICAgICAgICh0aGlzLnJlZklkeCAqIHIuZGlyZWN0aW9uKCkuZG90KHJlYy5ub3JtYWwpKSAvIHIuZGlyZWN0aW9uKCkubGVuZ3RoKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG91dHdhcmROb3JtYWwgPSByZWMubm9ybWFsXHJcbiAgICAgIG5pT3Zlck50ID0gMS4wIC8gdGhpcy5yZWZJZHhcclxuICAgICAgY29zaW5lID0gLXIuZGlyZWN0aW9uKCkuZG90KHJlYy5ub3JtYWwpIC8gci5kaXJlY3Rpb24oKS5sZW5ndGgoKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChVdGlscy5yZWZyYWN0KHIuZGlyZWN0aW9uKCksIG91dHdhcmROb3JtYWwsIG5pT3Zlck50LCByZWZyYWN0ZWQpKSB7XHJcbiAgICAgIHJlZmxlY3RQcm9iID0gVXRpbHMuc2NobGljayhjb3NpbmUsIHRoaXMucmVmSWR4KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVmbGVjdFByb2IgPSAxLjBcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA8IHJlZmxlY3RQcm9iKSB7XHJcbiAgICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShyZWMucCwgcmVmbGVjdGVkKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KHJlYy5wLCByZWZyYWN0ZWQpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBMYW1iZXJ0aWFuIH0gZnJvbSAnLi9sYW1iZXJ0aWFuJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpdGFibGVMaXN0IGV4dGVuZHMgSGl0YWJsZSB7XHJcbiAgbGlzdDogQXJyYXk8SGl0YWJsZT5cclxuICBsaXN0U2l6ZTogbnVtYmVyXHJcbiAgbmFtZTogc3RyaW5nXHJcbiAgY29uc3RydWN0b3IobDogQXJyYXk8SGl0YWJsZT4sIG46IG51bWJlcikge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5uYW1lID0gJ0hpdGFibGVMaXN0J1xyXG4gICAgdGhpcy5saXN0ID0gbFxyXG4gICAgdGhpcy5saXN0U2l6ZSA9IG5cclxuICB9XHJcblxyXG4gIGhpdChyOiBSYXksIHRNaW46IG51bWJlciwgdE1heDogbnVtYmVyLCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHRtcFJlYyA9IG5ldyBIaXRSZWNvcmQoXHJcbiAgICAgIDAsXHJcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcclxuICAgICAgbmV3IExhbWJlcnRpYW4obmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICApXHJcbiAgICBsZXQgaGl0QW55dGhpbmcgPSBmYWxzZVxyXG4gICAgbGV0IGNsb3Nlc3RTb0ZhciA9IHRNYXhcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0U2l6ZTsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmxpc3RbaV0uaGl0KHIsIHRNaW4sIGNsb3Nlc3RTb0ZhciwgdG1wUmVjKSkge1xyXG4gICAgICAgIGhpdEFueXRoaW5nID0gdHJ1ZVxyXG4gICAgICAgIGNsb3Nlc3RTb0ZhciA9IHRtcFJlYy50XHJcbiAgICAgICAgcmVjLnQgPSB0bXBSZWMudFxyXG4gICAgICAgIHJlYy5wID0gdG1wUmVjLnBcclxuICAgICAgICByZWMubm9ybWFsID0gdG1wUmVjLm5vcm1hbFxyXG4gICAgICAgIHJlYy5tYXRlcmlhbCA9IHRtcFJlYy5tYXRlcmlhbFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGl0QW55dGhpbmdcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpdFJlY29yZCB7XHJcbiAgdDogbnVtYmVyXHJcbiAgcDogVmVjdG9yM1xyXG4gIG5vcm1hbDogVmVjdG9yM1xyXG4gIG1hdGVyaWFsOiBNYXRlcmlhbFxyXG5cclxuICBjb25zdHJ1Y3RvcihfdDogbnVtYmVyLCBfcDogVmVjdG9yMywgX25vcm1hbDogVmVjdG9yMywgX21hdGVyaWFsOiBNYXRlcmlhbCkge1xyXG4gICAgdGhpcy50ID0gX3RcclxuICAgIHRoaXMucCA9IF9wXHJcbiAgICB0aGlzLm5vcm1hbCA9IF9ub3JtYWxcclxuICAgIHRoaXMubWF0ZXJpYWwgPSBfbWF0ZXJpYWxcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIaXRhYmxlIHtcclxuICBhYnN0cmFjdCBuYW1lOiBzdHJpbmdcclxuICBhYnN0cmFjdCBoaXQocjogUmF5LCB0TWluOiBudW1iZXIsIHRNYXg6IG51bWJlciwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuXHJcbn1cclxuIiwiaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBMYW1iZXJ0aWFuIGV4dGVuZHMgTWF0ZXJpYWwge1xyXG4gIGFsYmVkbzogVmVjdG9yM1xyXG4gIHNjYXR0ZXJlZDogUmF5XHJcbiAgYXR0ZW51YXRpb246IFZlY3RvcjNcclxuICBuYW1lOiBzdHJpbmdcclxuXHJcbiAgY29uc3RydWN0b3IoYTogVmVjdG9yMykge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5uYW1lID0gJ0xhbWJlcnRpYW4nXHJcbiAgICB0aGlzLmFsYmVkbyA9IGFcclxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICB9XHJcblxyXG4gIHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHRhcmdldCA9IHJlYy5wLmFkZChyZWMubm9ybWFsKS5hZGQoVXRpbHMuUmFuZG9tSW5Vbml0U3BoZXJlKCkpXHJcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkocmVjLnAsIHRhcmdldC5zdWIocmVjLnApKVxyXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKFxyXG4gICAgICB0aGlzLmFsYmVkby54KCksXHJcbiAgICAgIHRoaXMuYWxiZWRvLnkoKSxcclxuICAgICAgdGhpcy5hbGJlZG8ueigpXHJcbiAgICApXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0ZXJpYWwge1xyXG4gIGFic3RyYWN0IG5hbWU6IHN0cmluZ1xyXG4gIGFic3RyYWN0IHNjYXR0ZXJlZDogUmF5XHJcbiAgYWJzdHJhY3QgYXR0ZW51YXRpb246IFZlY3RvcjNcclxuICBhYnN0cmFjdCBzY2F0dGVyKHI6IFJheSwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuXHJcbn1cclxuIiwiaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXRhbCBleHRlbmRzIE1hdGVyaWFsIHtcclxuICBhbGJlZG86IFZlY3RvcjNcclxuICBzY2F0dGVyZWQ6IFJheVxyXG4gIGF0dGVudWF0aW9uOiBWZWN0b3IzXHJcbiAgZnV6ejogbnVtYmVyXHJcbiAgbmFtZTogc3RyaW5nXHJcblxyXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMsIGY6IG51bWJlcikge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5uYW1lID0gJ01ldGFsJ1xyXG4gICAgdGhpcy5hbGJlZG8gPSBhXHJcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDApKVxyXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcblxyXG4gICAgaWYgKGYgPCAxKSB0aGlzLmZ1enogPSBmXHJcbiAgICBlbHNlIHRoaXMuZnV6eiA9IDFcclxuICB9XHJcblxyXG4gIHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHJlZmxlY3RlZCA9IFV0aWxzLnJlZmxlY3Qoci5kaXJlY3Rpb24oKS51bml0VmVjMygpLCByZWMubm9ybWFsKVxyXG4gICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KFxyXG4gICAgICByZWMucCxcclxuICAgICAgcmVmbGVjdGVkLmFkZChVdGlscy5SYW5kb21JblVuaXRTcGhlcmUoKS5tdWwodGhpcy5mdXp6KSlcclxuICAgIClcclxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMyhcclxuICAgICAgdGhpcy5hbGJlZG8ueCgpLFxyXG4gICAgICB0aGlzLmFsYmVkby55KCksXHJcbiAgICAgIHRoaXMuYWxiZWRvLnooKVxyXG4gICAgKVxyXG4gICAgcmV0dXJuIHRoaXMuc2NhdHRlcmVkLmRpcmVjdGlvbigpLmRvdChyZWMubm9ybWFsKSA+IDBcclxuICB9XHJcbn1cclxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKlxyXG4gKiAgcmF5LnRzXHJcbiAqICByYXkgZnVuY3Rpb24gZm9yIHAodCkgPSBBICsgdCAqIEJcclxuICogIFQ6dHlwZSxkZWZhdWx0IHNldHRpbmcgaXMgbnVtYmVyXHJcbiAqICBEOmRpbWVuc2lvblxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuXHJcbmV4cG9ydCBjbGFzcyBSYXkge1xyXG4gIHB1YmxpYyBfQTogVmVjdG9yM1xyXG4gIHB1YmxpYyBfQjogVmVjdG9yM1xyXG5cclxuICBjb25zdHJ1Y3RvcihhOiBWZWN0b3IzLCBiOiBWZWN0b3IzKSB7XHJcbiAgICB0aGlzLl9BID0gYVxyXG4gICAgdGhpcy5fQiA9IGJcclxuICB9XHJcblxyXG4gIG9yaWdpbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9BXHJcbiAgfVxyXG4gIGRpcmVjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9CXHJcbiAgfVxyXG4gIHBvaW50QXRQYXJhbSh0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLl9BLmFkZCh0aGlzLl9CLm11bCh0KSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXHJcblxyXG5leHBvcnQgY2xhc3MgU3BoZXJlIGV4dGVuZHMgSGl0YWJsZSB7XHJcbiAgY2VudGVyOiBWZWN0b3IzXHJcbiAgcmFkaXVzOiBudW1iZXJcclxuICBtYXRlcmlhbDogTWF0ZXJpYWxcclxuICBuYW1lOiBzdHJpbmdcclxuXHJcbiAgY29uc3RydWN0b3IoY2VuOiBWZWN0b3IzLCByOiBudW1iZXIsIG1hdDogTWF0ZXJpYWwpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMubmFtZSA9ICdTcGhlcmUnXHJcbiAgICB0aGlzLmNlbnRlciA9IGNlblxyXG4gICAgdGhpcy5yYWRpdXMgPSByXHJcbiAgICB0aGlzLm1hdGVyaWFsID0gbWF0XHJcbiAgfVxyXG5cclxuICBoaXQocjogUmF5LCB0TWluOiBudW1iZXIsIHRNYXg6IG51bWJlciwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcclxuICAgIGxldCBvYyA9IHIub3JpZ2luKCkuc3ViKHRoaXMuY2VudGVyKVxyXG4gICAgbGV0IGEgPSByLmRpcmVjdGlvbigpLmRvdChyLmRpcmVjdGlvbigpKVxyXG4gICAgbGV0IGIgPSBvYy5kb3Qoci5kaXJlY3Rpb24oKSlcclxuICAgIGxldCBjID0gb2MuZG90KG9jKSAtIHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXNcclxuICAgIGxldCBkaXNjcmltaW5hbnQgPSBiICogYiAtIGEgKiBjXHJcbiAgICBpZiAoZGlzY3JpbWluYW50ID4gMCkge1xyXG4gICAgICBsZXQgdG1wID0gKC1iIC0gTWF0aC5zcXJ0KGIgKiBiIC0gYSAqIGMpKSAvIGFcclxuICAgICAgaWYgKHRtcCA8IHRNYXggJiYgdG1wID4gdE1pbikge1xyXG4gICAgICAgIHJlYy50ID0gdG1wXHJcbiAgICAgICAgcmVjLnAgPSByLnBvaW50QXRQYXJhbShyZWMudClcclxuICAgICAgICByZWMubm9ybWFsID0gcmVjLnAuc3ViKHRoaXMuY2VudGVyKS5kaXYodGhpcy5yYWRpdXMpXHJcbiAgICAgICAgcmVjLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbFxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRtcCA9ICgtYiArIE1hdGguc3FydChiICogYiAtIGEgKiBjKSkgLyBhXHJcbiAgICAgIGlmICh0bXAgPCB0TWF4ICYmIHRtcCA+IHRNaW4pIHtcclxuICAgICAgICByZWMudCA9IHRtcFxyXG4gICAgICAgIHJlYy5wID0gci5wb2ludEF0UGFyYW0ocmVjLnQpXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHJlYy5wLnN1Yih0aGlzLmNlbnRlcikuZGl2KHRoaXMucmFkaXVzKVxyXG4gICAgICAgIHJlYy5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgd3dTdW0gfSBmcm9tICcuL2RlbW8vd3ctc3VtJ1xyXG5pbXBvcnQgeyBHZW5lcmF0ZU5vaXNlRGVtbyB9IGZyb20gJy4vZGVtby9ub2lzZS1sb2FkJ1xyXG5pbXBvcnQgeyB3d1JlbmRlclNjZW5lRml4IH0gZnJvbSAnLi9kZW1vL3d3LXJlbmRlci1maXgnXHJcbmltcG9ydCB7IHd3UmVuZGVyU2NlbmVEeW5hbWljIH0gZnJvbSAnLi9kZW1vL3d3LXJlbmRlci1keW5hbWljJ1xyXG5cclxuLy8gbG9jYWwgaW5mb1xyXG5jb25zdCBtYXhXb3JrZXJzID0gbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3kgfHwgNFxyXG5cclxuLy8gd2ViIHdvcmtlciBzdW0gZGVtb1xyXG4vLyB3d1N1bShmYWxzZSlcclxuXHJcbi8vIGdlbmVyYXRlIG5vaXNlIGRlbW9cclxuLy8gR2VuZXJhdGVOb2lzZURlbW8oKVxyXG5cclxuLy8gcmF5IHRyYWNpbmcgZGlmZnVzZSBkZW1vXHJcbi8vIHJheVRyYWNpbmdEaWZmdXNlKClcclxuXHJcbi8vIHJlbmRlciBmaXggc2NlbmVcclxuLy8gd3dSZW5kZXJTY2VuZUZpeCgnZGlzdC93d19yYXlfdHJhY2luZ19yYW5kb21fd29ya2VyLmpzJywgbWF4V29ya2VycylcclxuXHJcbnd3UmVuZGVyU2NlbmVEeW5hbWljKCdkaXN0L3d3X3JheV90cmFjaW5nX3JhbmRvbV93b3JrZXIuanMnLCBtYXhXb3JrZXJzKVxyXG4iLCJleHBvcnQgbmFtZXNwYWNlIFRpbWVTdGF0aXN0aWMge1xyXG4gIGxldCBzOiBhbnlcclxuICBsZXQgZTogYW55XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KCkge1xyXG4gICAgcyA9IG5ldyBEYXRlKClcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBlbmQoKSB7XHJcbiAgICBlID0gbmV3IERhdGUoKVxyXG4gICAgbGV0IHRpbWVEaWZmID0gZSAtIHNcclxuICAgIC8vIGNvbnNvbGUubG9nKHRpbWVEaWZmICsgJyBtcycpXHJcbiAgICByZXR1cm4gdGltZURpZmZcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4vZWdtYXRoL3ZlY3RvcjMnXHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFV0aWxzIHtcclxuICBleHBvcnQgZnVuY3Rpb24gUmFuZG9tSW5Vbml0U3BoZXJlKCkge1xyXG4gICAgbGV0IHAgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gICAgZG8ge1xyXG4gICAgICBwID0gbmV3IFZlY3RvcjMoTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSlcclxuICAgICAgICAubXVsKDIpXHJcbiAgICAgICAgLnN1YihuZXcgVmVjdG9yMygxLCAxLCAxKSlcclxuICAgIH0gd2hpbGUgKHAubGVuZ3RoU3F1YXJlZCgpID49IDEuMClcclxuICAgIHJldHVybiBwXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gUmFuZG9tSW5Vbml0RGlzaygpIHtcclxuICAgIGxldCBwID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgIGRvIHtcclxuICAgICAgcCA9IG5ldyBWZWN0b3IzKE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCkpXHJcbiAgICAgICAgLm11bCgyKVxyXG4gICAgICAgIC5zdWIobmV3IFZlY3RvcjMoMSwgMSwgMCkpXHJcbiAgICB9IHdoaWxlIChwLmxlbmd0aFNxdWFyZWQoKSA+PSAxLjApXHJcbiAgICByZXR1cm4gcFxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZmxlY3QodjogVmVjdG9yMywgbjogVmVjdG9yMykge1xyXG4gICAgcmV0dXJuIHYuc3ViKG4ubXVsKDIgKiB2LmRvdChuKSkpXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gc2NobGljayhjb3NpbmU6IG51bWJlciwgcmVmSWR4OiBudW1iZXIpIHtcclxuICAgIGxldCByMCA9ICgxIC0gcmVmSWR4KSAvICgxICsgcmVmSWR4KVxyXG4gICAgcjAgPSByMCAqIHIwXHJcbiAgICByZXR1cm4gcjAgKyAoMSAtIHIwKSAqIE1hdGgucG93KDEgLSBjb3NpbmUsIDUpXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gcmVmcmFjdChcclxuICAgIHY6IFZlY3RvcjMsXHJcbiAgICBuOiBWZWN0b3IzLFxyXG4gICAgbmlPdmVyTnQ6IG51bWJlcixcclxuICAgIHJlZnJhY3RlZDogVmVjdG9yM1xyXG4gICkge1xyXG4gICAgbGV0IHV2ID0gdi51bml0VmVjMygpXHJcbiAgICBsZXQgZHQgPSB1di5kb3QobilcclxuICAgIGxldCBkaXNjcmltaW5hbnQgPSAxLjAgLSBuaU92ZXJOdCAqIG5pT3Zlck50ICogKDEgLSBkdCAqIGR0KVxyXG4gICAgaWYgKGRpc2NyaW1pbmFudCA+IDApIHtcclxuICAgICAgcmVmcmFjdGVkLnNldChcclxuICAgICAgICB1dlxyXG4gICAgICAgICAgLnN1YihuLm11bChkdCkpXHJcbiAgICAgICAgICAubXVsKG5pT3Zlck50KVxyXG4gICAgICAgICAgLnN1YihuLm11bChNYXRoLnNxcnQoZGlzY3JpbWluYW50KSkpXHJcbiAgICAgIClcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFJhbmRvbShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4ICsgMSAtIG1pbikpICsgbWluXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gV3JpdGUyQ2FudmFzKFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgaW1hZ2VCdWY6IEFycmF5PG51bWJlcj4sXHJcbiAgICB3OiBudW1iZXIsXHJcbiAgICBoOiBudW1iZXJcclxuICApIHtcclxuICAgIGxldCBjYW52YXNJbWFnZSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHcsIGgpXHJcbiAgICBsZXQgZGF0YSA9IGNhbnZhc0ltYWdlLmRhdGFcclxuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGRhdGEubGVuZ3RoOyBpZHggKz0gNCkge1xyXG4gICAgICBkYXRhW2lkeCArIDBdID0gaW1hZ2VCdWZbaWR4ICsgMF1cclxuICAgICAgZGF0YVtpZHggKyAxXSA9IGltYWdlQnVmW2lkeCArIDFdXHJcbiAgICAgIGRhdGFbaWR4ICsgMl0gPSBpbWFnZUJ1ZltpZHggKyAyXVxyXG4gICAgICBkYXRhW2lkeCArIDNdID0gaW1hZ2VCdWZbaWR4ICsgM11cclxuICAgIH1cclxuICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKGNhbnZhc0ltYWdlLCAwLCAwKVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIEdlbmVyYXRlTm9pc2UoXHJcbiAgICBpbWFnZUJ1ZmZlcjogQXJyYXk8bnVtYmVyPixcclxuICAgIHN0YXJ0SWR4OiBudW1iZXIsXHJcbiAgICBlbmRJZHg6IG51bWJlclxyXG4gICkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSBzdGFydElkeDsgaW5kZXggPCBlbmRJZHg7IGluZGV4ICs9IDQpIHtcclxuICAgICAgbGV0IHIgPSBSYW5kb20oMCwgMjU1KVxyXG4gICAgICBsZXQgZyA9IFJhbmRvbSgwLCAyNTUpXHJcbiAgICAgIGxldCBiID0gUmFuZG9tKDAsIDI1NSlcclxuXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4XSA9IHJcclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAxXSA9IGdcclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAyXSA9IGJcclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAzXSA9IDI1NVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGltYWdlQnVmZmVyXHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=