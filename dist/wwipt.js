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
 // import workerPath from 'file-loader?name=[name].js!../worker/ww-ray-tracing-diffuse.worker'

Object.defineProperty(exports, "__esModule", {
  value: true
});

var vector3_1 = __webpack_require__(/*! ../egmath/vector3 */ "./src/egmath/vector3.ts");

var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");

var sphere_1 = __webpack_require__(/*! ../egrender/sphere */ "./src/egrender/sphere.ts");

var hitable_list_1 = __webpack_require__(/*! ../egrender/hitable-list */ "./src/egrender/hitable-list.ts");

var camera_1 = __webpack_require__(/*! ../egrender/camera */ "./src/egrender/camera.ts");

function wwRayTracingDiffuse(maxWorkers) {
  var endWorkerNum = 0;
  var workers = [];
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

  var list = new Array(2);
  list[0] = new sphere_1.Sphere(new vector3_1.Vector3(0, 0, -1), 0.5);
  list[1] = new sphere_1.Sphere(new vector3_1.Vector3(0, -100.5, -1), 100);
  var world = new hitable_list_1.HitableList(list, 2);
  var cam = new camera_1.Camera();
  var j = ny - 1;

  function render() {
    if (j >= 0) {
      for (var wn = 0; wn < maxWorkers; wn++) {
        workers[wn] = new Worker('dist/worker.js');
        var id = wn + 1;
        var s = wn * Math.ceil(nx / maxWorkers);
        var e = s + Math.ceil(nx / maxWorkers) - 1;

        if (id === maxWorkers) {
          e = nx - 1;
        }

        var parameter = {
          id: id,
          start: s,
          end: e,
          width: nx,
          height: ny,
          camera: cam,
          hitWorld: world,
          samplingNum: ns,
          _j: j
        };
        workers[wn].postMessage(parameter);

        workers[wn].onmessage = function (message) {
          var result = message.data;
          var colArray = result.col;
          var _s = result.startVal;
          var _e = result.endVal;
          var _i = 0;

          for (var i = _s; i <= _e; i++) {
            var idx = (i + j * nx) * 4;
            imageBuffer[idx] = colArray[_i * 4];
            imageBuffer[idx + 1] = colArray[_i * 4 + 1];
            imageBuffer[idx + 2] = colArray[_i * 4 + 2];
            imageBuffer[idx + 3] = colArray[_i * 4 + 3];
            _i++;
          }

          this.terminate();
          endWorkerNum++;

          if (endWorkerNum === maxWorkers) {
            // process finished
            util_1.Utils.Write2Canvas(context, imageBuffer, nx, ny);
            j--;
            requestAnimationFrame(render);
          }
        };
      }
    }
  }

  render();
}

exports.wwRayTracingDiffuse = wwRayTracingDiffuse;

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

/***/ "./src/egrender/camera.ts":
/*!********************************!*\
  !*** ./src/egrender/camera.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var vector3_1 = __webpack_require__(/*! ../egmath/vector3 */ "./src/egmath/vector3.ts");

var ray_1 = __webpack_require__(/*! ./ray */ "./src/egrender/ray.ts");

var Camera =
/** @class */
function () {
  function Camera() {
    this.lowerLeftCorner = new vector3_1.Vector3(-2, -1, -1);
    this.horizontal = new vector3_1.Vector3(4, 0, 0);
    this.vertical = new vector3_1.Vector3(0, 2, 0);
    this.origin = new vector3_1.Vector3(0, 0, 0);
  }

  Camera.prototype.getRay = function (u, v) {
    return new ray_1.Ray(this.origin, this.lowerLeftCorner.add(this.horizontal.mul(u)).add(this.vertical.mul(v)).sub(this.origin));
  };

  return Camera;
}();

exports.Camera = Camera;

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

var HitableList =
/** @class */
function (_super) {
  __extends(HitableList, _super);

  function HitableList(l, n) {
    var _this = _super.call(this) || this;

    _this.list = l;
    _this.listSize = n;
    return _this;
  }

  HitableList.prototype.hit = function (r, tMin, tMax, rec) {
    var tmpRec = new hitable_1.HitRecord(0, new vector3_1.Vector3(0, 0, 0), new vector3_1.Vector3(0, 0, 0));
    var hitAnything = false;
    var closestSoFar = tMax;

    for (var i = 0; i < this.listSize; i++) {
      if (this.list[i].hit(r, tMin, closestSoFar, tmpRec)) {
        hitAnything = true;
        closestSoFar = tmpRec.t;
        rec.t = tmpRec.t;
        rec.p = tmpRec.p;
        rec.normal = tmpRec.normal;
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
  function HitRecord(_t, _p, _normal) {
    this.t = _t;
    this.p = _p;
    this.normal = _normal;
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

  function Sphere(cen, r) {
    var _this = _super.call(this) || this;

    _this.center = cen;
    _this.radius = r;
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
        return true;
      }

      tmp = (-b + Math.sqrt(b * b - a * c)) / a;

      if (tmp < tMax && tmp > tMin) {
        rec.t = tmp;
        rec.p = r.pointAtParam(rec.t);
        rec.normal = rec.p.sub(this.center).div(this.radius);
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

var ww_ray_tracing_diffuse_1 = __webpack_require__(/*! ./demo/ww-ray-tracing-diffuse */ "./src/demo/ww-ray-tracing-diffuse.ts"); // local info


var maxWorkers = navigator.hardwareConcurrency || 4; // web worker sum demo
// wwSum(false)
// generate noise demo
// GenerateNoiseDemo()
// ray tracing diffuse demo
// rayTracingDiffuse()

ww_ray_tracing_diffuse_1.wwRayTracingDiffuse(maxWorkers);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlbW8vd3ctcmF5LXRyYWNpbmctZGlmZnVzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdtYXRoL21hdGhfdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC92ZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC92ZWN0b3IzLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9jYW1lcmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2hpdGFibGUtbGlzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvaGl0YWJsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvcmF5LnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9zcGhlcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxl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QUFYLEdBQXFCLENBQXJCO0FBQ0EsaUJBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBVCxDQUFYLEdBQXlCLENBQXpCO0FBQ0EsaUJBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBVCxDQUFYLEdBQXlCLENBQXpCO0FBQ0EsaUJBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBVCxDQUFYLEdBQXlCLEdBQXpCO0FBQ0Q7O0FBQ0QsV0FBTyxXQUFQO0FBQ0Q7O0FBaEJlLHdCQUFhLGFBQWI7QUFpQmpCLENBdkNELEVBQWlCLEtBQUssR0FBTCxrQ0FBSyxFQUFMLENBQWpCLEUiLCJmaWxlIjoid3dpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLy8gaW1wb3J0IHdvcmtlclBhdGggZnJvbSAnZmlsZS1sb2FkZXI/bmFtZT1bbmFtZV0uanMhLi4vd29ya2VyL3d3LXJheS10cmFjaW5nLWRpZmZ1c2Uud29ya2VyJ1xyXG5cclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWwnXHJcbmltcG9ydCB7IEhpdGFibGUsIEhpdFJlY29yZCB9IGZyb20gJy4uL2VncmVuZGVyL2hpdGFibGUnXHJcbmltcG9ydCB7IFNwaGVyZSB9IGZyb20gJy4uL2VncmVuZGVyL3NwaGVyZSdcclxuaW1wb3J0IHsgSGl0YWJsZUxpc3QgfSBmcm9tICcuLi9lZ3JlbmRlci9oaXRhYmxlLWxpc3QnXHJcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gJy4uL2VncmVuZGVyL2NhbWVyYSdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3d1JheVRyYWNpbmdEaWZmdXNlKG1heFdvcmtlcnM6IG51bWJlcikge1xyXG4gIGxldCBlbmRXb3JrZXJOdW0gPSAwXHJcbiAgbGV0IHdvcmtlcnM6IGFueSA9IFtdXHJcblxyXG4gIGNvbnN0IG54ID0gODAwXHJcbiAgY29uc3QgbnkgPSA0MDBcclxuICBjb25zdCBucyA9IDEwMFxyXG5cclxuICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIGFueVxyXG4gIGNhbnZhcy5oZWlnaHQgPSBueVxyXG4gIGNhbnZhcy53aWR0aCA9IG54XHJcbiAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuICAvLyBpbml0IGltYWdlIGJ1ZmZlclxyXG4gIGxldCBpbWFnZUJ1ZmZlciA9IG5ldyBBcnJheTxudW1iZXI+KG54ICogbnkgKiA0KVxyXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGltYWdlQnVmZmVyLmxlbmd0aDsgaWR4KyspIHtcclxuICAgIGltYWdlQnVmZmVyW2lkeF0gPSAwXHJcbiAgfVxyXG5cclxuICBsZXQgbGlzdCA9IG5ldyBBcnJheTxIaXRhYmxlPigyKVxyXG4gIGxpc3RbMF0gPSBuZXcgU3BoZXJlKG5ldyBWZWN0b3IzKDAsIDAsIC0xKSwgMC41KVxyXG4gIGxpc3RbMV0gPSBuZXcgU3BoZXJlKG5ldyBWZWN0b3IzKDAsIC0xMDAuNSwgLTEpLCAxMDApXHJcblxyXG4gIGxldCB3b3JsZCA9IG5ldyBIaXRhYmxlTGlzdChsaXN0LCAyKVxyXG4gIGxldCBjYW0gPSBuZXcgQ2FtZXJhKClcclxuXHJcbiAgbGV0IGogPSBueSAtIDFcclxuICBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICBpZiAoaiA+PSAwKSB7XHJcbiAgICAgIGZvciAobGV0IHduID0gMDsgd24gPCBtYXhXb3JrZXJzOyB3bisrKSB7XHJcbiAgICAgICAgd29ya2Vyc1t3bl0gPSBuZXcgV29ya2VyKCdkaXN0L3dvcmtlci5qcycpXHJcbiAgICAgICAgbGV0IGlkID0gd24gKyAxXHJcbiAgICAgICAgbGV0IHMgPSB3biAqIE1hdGguY2VpbChueCAvIG1heFdvcmtlcnMpXHJcbiAgICAgICAgbGV0IGUgPSBzICsgTWF0aC5jZWlsKG54IC8gbWF4V29ya2VycykgLSAxXHJcblxyXG4gICAgICAgIGlmIChpZCA9PT0gbWF4V29ya2Vycykge1xyXG4gICAgICAgICAgZSA9IG54IC0gMVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmFtZXRlciA9IHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHN0YXJ0OiBzLFxyXG4gICAgICAgICAgZW5kOiBlLFxyXG4gICAgICAgICAgd2lkdGg6IG54LFxyXG4gICAgICAgICAgaGVpZ2h0OiBueSxcclxuICAgICAgICAgIGNhbWVyYTogY2FtLFxyXG4gICAgICAgICAgaGl0V29ybGQ6IHdvcmxkLFxyXG4gICAgICAgICAgc2FtcGxpbmdOdW06IG5zLFxyXG4gICAgICAgICAgX2o6IGpcclxuICAgICAgICB9XHJcbiAgICAgICAgd29ya2Vyc1t3bl0ucG9zdE1lc3NhZ2UocGFyYW1ldGVyKVxyXG4gICAgICAgIHdvcmtlcnNbd25dLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2U6IGFueSkge1xyXG4gICAgICAgICAgbGV0IHJlc3VsdCA9IG1lc3NhZ2UuZGF0YVxyXG4gICAgICAgICAgbGV0IGNvbEFycmF5ID0gcmVzdWx0LmNvbFxyXG4gICAgICAgICAgbGV0IF9zID0gcmVzdWx0LnN0YXJ0VmFsXHJcbiAgICAgICAgICBsZXQgX2UgPSByZXN1bHQuZW5kVmFsXHJcbiAgICAgICAgICBsZXQgX2kgPSAwXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gX3M7IGkgPD0gX2U7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaWR4ID0gKGkgKyBqICogbngpICogNFxyXG4gICAgICAgICAgICBpbWFnZUJ1ZmZlcltpZHhdID0gY29sQXJyYXlbX2kgKiA0XVxyXG4gICAgICAgICAgICBpbWFnZUJ1ZmZlcltpZHggKyAxXSA9IGNvbEFycmF5W19pICogNCArIDFdXHJcbiAgICAgICAgICAgIGltYWdlQnVmZmVyW2lkeCArIDJdID0gY29sQXJyYXlbX2kgKiA0ICsgMl1cclxuICAgICAgICAgICAgaW1hZ2VCdWZmZXJbaWR4ICsgM10gPSBjb2xBcnJheVtfaSAqIDQgKyAzXVxyXG4gICAgICAgICAgICBfaSsrXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy50ZXJtaW5hdGUoKVxyXG4gICAgICAgICAgZW5kV29ya2VyTnVtKytcclxuICAgICAgICAgIGlmIChlbmRXb3JrZXJOdW0gPT09IG1heFdvcmtlcnMpIHtcclxuICAgICAgICAgICAgLy8gcHJvY2VzcyBmaW5pc2hlZFxyXG5cclxuICAgICAgICAgICAgVXRpbHMuV3JpdGUyQ2FudmFzKGNvbnRleHQsIGltYWdlQnVmZmVyLCBueCwgbnkpXHJcbiAgICAgICAgICAgIGotLVxyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKClcclxufVxyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqICBtYXRoX3V0aWxzLnRzXHJcbiAqICBzaW1wbGUgbWF0aCBmdW5jdGlvbnNcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFic01heCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiB4ICogeCA+IHkgKiB5ID8geCA6IHlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFic01pbih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiB4ICogeCA8IHkgKiB5ID8geCA6IHlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG11bGRlYyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiAoeCAqIDEwICogKHkgKiAxMCkpIC8gMTAwXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXZkZWMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICByZXR1cm4gKHggKiAxMCkgLyAoeSAqIDEwKSAvIDEwMFxyXG59XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICpcclxuICogIHZlY3Rvci50c1xyXG4gKiAgVC1EIHZlY3RvciBkYXRhXHJcbiAqICBUOnR5cGUsZGVmYXVsdCBzZXR0aW5nIGlzIG51bWJlclxyXG4gKiAgRDpkaW1lbnNpb25cclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5pbXBvcnQgeyBhYnNNYXgsIGFic01pbiB9IGZyb20gJy4vbWF0aF91dGlscydcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3Ige1xyXG4gIHByaXZhdGUgX2VsZW1lbnRzOiBBcnJheTxudW1iZXI+XHJcbiAgcHJpdmF0ZSBfZGltZW5zaW9uOiBudW1iZXJcclxuXHJcbiAgLy8gY29uc3RydWN0cyB2ZWN0b3Igd2l0aCBwYXJhbWV0ZXJzIG9yIHplcm9cclxuICBjb25zdHJ1Y3RvcihkaW1lbnNpb246IG51bWJlciwgcGFyYW1zPzogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgdGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uXHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAocGFyYW1zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgLy8gaW5pdCBuIGRpbWVuc2lvbiB2ZWN0b3IgZGF0YSxzZXR0aW5nIGFsbCAwXHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzID0gbmV3IEFycmF5PG51bWJlcj4oZGltZW5zaW9uKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBkaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzID0gbmV3IEFycmF5PG51bWJlcj4oZGltZW5zaW9uKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBwYXJhbXMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gcGFyYW1zW19pXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQocGFyYW1zOiBWZWN0b3IgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAocGFyYW1zLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHBhcmFtcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSBwYXJhbXMuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxuICBzZXRaZXJvKCkge1xyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRPbmUoKSB7XHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDFcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudHNcclxuICB9XHJcblxyXG4gIGF0KGlkeDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2luZGV4IGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRzW2lkeF1cclxuICB9XHJcblxyXG4gIGRvdChvdGhlcnM6IFZlY3RvciB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG90aGVycyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdvdGhlcnMgaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICBpZiAob3RoZXJzLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIHJldCArPSB0aGlzLl9lbGVtZW50c1tfaV0gKiBvdGhlcnMuZGF0YSgpW19pXVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxuXHJcbiAgbGVuZ3RoU3F1YXJlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKVxyXG4gIH1cclxuXHJcbiAgbGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbmd0aFNxdWFyZWQoKSlcclxuICB9XHJcblxyXG4gIG5vcm1hbGl6ZSgpIHtcclxuICAgIHRoaXMuaWRpdih0aGlzLmxlbmd0aCgpKVxyXG4gIH1cclxuXHJcbiAgc3VtKCkge1xyXG4gICAgbGV0IHJldCA9IDBcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgcmV0ICs9IHRoaXMuX2VsZW1lbnRzW19pXVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxuXHJcbiAgc2l6ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25cclxuICB9XHJcblxyXG4gIGF2ZygpIHtcclxuICAgIHJldHVybiB0aGlzLnN1bSgpIC8gdGhpcy5zaXplKClcclxuICB9XHJcblxyXG4gIG1pbigpIHtcclxuICAgIGxldCBtaW5WYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG5cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgbWluVmFsID0gTWF0aC5taW4obWluVmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWluVmFsXHJcbiAgfVxyXG5cclxuICBtYXgoKSB7XHJcbiAgICBsZXQgbWF4VmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgbWF4VmFsID0gTWF0aC5tYXgobWF4VmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWF4VmFsXHJcbiAgfVxyXG5cclxuICBhYnNtYXgoKSB7XHJcbiAgICBsZXQgYWJzTWF4VmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgYWJzTWF4VmFsID0gYWJzTWF4KGFic01heFZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFic01heFZhbFxyXG4gIH1cclxuXHJcbiAgYWJzbWluKCkge1xyXG4gICAgbGV0IGFic01pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIGFic01pblZhbCA9IGFic01pbihhYnNNaW5WYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBhYnNNaW5WYWxcclxuICB9XHJcblxyXG4gIGRpc3RhbmNlU3F1YXJlZFRvKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICBpZiAob3RoZXJzLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGxldCBkaWZmID0gdGhpcy5fZWxlbWVudHNbX2ldIC0gb3RoZXJzLmRhdGEoKVtfaV1cclxuICAgICAgcmV0ICs9IGRpZmYgKiBkaWZmXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxuXHJcbiAgZGlzdGFuY2VUbyhvdGhlcnM6IFZlY3Rvcikge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlU3F1YXJlZFRvKG90aGVycykpXHJcbiAgfVxyXG5cclxuICBpc0VxdWFsKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVycy5zaXplKCkpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xyXG4gICAgICBpZiAodGhpcy5hdChfaSkgIT09IG90aGVycy5hdChfaSkpIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICBpc1NpbWlsYXIob3RoZXJzOiBWZWN0b3IgfCB1bmRlZmluZWQsIGVwc2lsb246IG51bWJlcikge1xyXG4gICAgaWYgKG90aGVycyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2VcclxuICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXJzLnNpemUoKSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLmF0KF9pKSAtIG90aGVycy5hdChfaSkpID4gZXBzaWxvbikgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGFkZChwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKz0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICs9IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgc3ViKHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAtPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLT0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBtdWwocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAqPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIGRpdihwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLz0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGlmIChzID09PSAwKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAvPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIGlkaXYocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLmRpdihwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgaWFkZChwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMuYWRkKHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBpc3ViKHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5zdWIocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIGltdWwocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLm11bChwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgc2V0QXQoaWR4OiBudW1iZXIsIHZhbDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2VsZW1lbnRzW2lkeF0gPSB2YWxcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBwcm9qX3UodikgPSA8dSx2Pi88dix2PiB1XHJcbiAgICogQHBhcmFtIHVcclxuICAgKiBAcGFyYW0gdlxyXG4gICAqL1xyXG4gIHN0YXRpYyBwcm9qKHU6IFZlY3RvciwgdjogVmVjdG9yKSB7XHJcbiAgICByZXR1cm4gdS5tdWwodi5kb3QodSkgLyB1LmRvdCh1KSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi92ZWN0b3InXHJcblxyXG5leHBvcnQgY2xhc3MgVmVjdG9yMyBleHRlbmRzIFZlY3RvciB7XHJcbiAgY29uc3RydWN0b3IoZTE6IG51bWJlciwgZTI6IG51bWJlciwgZTM6IG51bWJlcikge1xyXG4gICAgc3VwZXIoMywgbmV3IEFycmF5PG51bWJlcj4oZTEsIGUyLCBlMykpXHJcbiAgfVxyXG5cclxuICB4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzBdXHJcbiAgfVxyXG4gIHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMV1cclxuICB9XHJcbiAgeigpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsyXVxyXG4gIH1cclxuICByKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzBdXHJcbiAgfVxyXG4gIGcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMV1cclxuICB9XHJcbiAgYigpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsyXVxyXG4gIH1cclxuXHJcbiAgc2V0KHYzOiBWZWN0b3IzKSB7XHJcbiAgICByZXR1cm4gc3VwZXIuc2V0KG5ldyBWZWN0b3IoMywgdjMuZGF0YSgpKSlcclxuICB9XHJcblxyXG4gIGFkZCh2MzogYW55KSB7XHJcbiAgICBsZXQgYWRkdiA9IHN1cGVyLmFkZCh2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhhZGR2LmRhdGEoKVswXSwgYWRkdi5kYXRhKClbMV0sIGFkZHYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgc3ViKHYzOiBhbnkpIHtcclxuICAgIGxldCBzdWJ2ID0gc3VwZXIuc3ViKHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKHN1YnYuZGF0YSgpWzBdLCBzdWJ2LmRhdGEoKVsxXSwgc3Vidi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBtdWwodjM6IGFueSkge1xyXG4gICAgbGV0IG11bHYgPSBzdXBlci5tdWwodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMobXVsdi5kYXRhKClbMF0sIG11bHYuZGF0YSgpWzFdLCBtdWx2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIGRpdih2MzogYW55KSB7XHJcbiAgICBsZXQgZGl2diA9IHN1cGVyLmRpdih2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhkaXZ2LmRhdGEoKVswXSwgZGl2di5kYXRhKClbMV0sIGRpdnYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgZG90KHYzOiBWZWN0b3IzKSB7XHJcbiAgICByZXR1cm4gc3VwZXIuZG90KG5ldyBWZWN0b3IoMywgdjMuZGF0YSgpKSlcclxuICB9XHJcblxyXG4gIHVuaXRWZWMzKCk6IFZlY3RvcjMge1xyXG4gICAgbGV0IG52ID0gbmV3IFZlY3RvcigzLCB0aGlzLmRhdGEoKSlcclxuICAgIG52Lm5vcm1hbGl6ZSgpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMobnYuZGF0YSgpWzBdLCBudi5kYXRhKClbMV0sIG52LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIGdhbW1hMigpOiBWZWN0b3IzIHtcclxuICAgIGxldCB0diA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoXHJcbiAgICAgIE1hdGguc3FydCh0di5hdCgwKSksXHJcbiAgICAgIE1hdGguc3FydCh0di5hdCgxKSksXHJcbiAgICAgIE1hdGguc3FydCh0di5hdCgyKSlcclxuICAgIClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuXHJcbmV4cG9ydCBjbGFzcyBDYW1lcmEge1xyXG4gIGxvd2VyTGVmdENvcm5lcjogVmVjdG9yM1xyXG4gIGhvcml6b250YWw6IFZlY3RvcjNcclxuICB2ZXJ0aWNhbDogVmVjdG9yM1xyXG4gIG9yaWdpbjogVmVjdG9yM1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5sb3dlckxlZnRDb3JuZXIgPSBuZXcgVmVjdG9yMygtMiwgLTEsIC0xKVxyXG4gICAgdGhpcy5ob3Jpem9udGFsID0gbmV3IFZlY3RvcjMoNCwgMCwgMClcclxuICAgIHRoaXMudmVydGljYWwgPSBuZXcgVmVjdG9yMygwLCAyLCAwKVxyXG4gICAgdGhpcy5vcmlnaW4gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gIH1cclxuXHJcbiAgZ2V0UmF5KHU6IG51bWJlciwgdjogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFJheShcclxuICAgICAgdGhpcy5vcmlnaW4sXHJcbiAgICAgIHRoaXMubG93ZXJMZWZ0Q29ybmVyXHJcbiAgICAgICAgLmFkZCh0aGlzLmhvcml6b250YWwubXVsKHUpKVxyXG4gICAgICAgIC5hZGQodGhpcy52ZXJ0aWNhbC5tdWwodikpXHJcbiAgICAgICAgLnN1Yih0aGlzLm9yaWdpbilcclxuICAgIClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpdGFibGVMaXN0IGV4dGVuZHMgSGl0YWJsZSB7XHJcbiAgbGlzdDogQXJyYXk8SGl0YWJsZT5cclxuICBsaXN0U2l6ZTogbnVtYmVyXHJcbiAgY29uc3RydWN0b3IobDogQXJyYXk8SGl0YWJsZT4sIG46IG51bWJlcikge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5saXN0ID0gbFxyXG4gICAgdGhpcy5saXN0U2l6ZSA9IG5cclxuICB9XHJcblxyXG4gIGhpdChyOiBSYXksIHRNaW46IG51bWJlciwgdE1heDogbnVtYmVyLCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHRtcFJlYyA9IG5ldyBIaXRSZWNvcmQoMCwgbmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDApKVxyXG4gICAgbGV0IGhpdEFueXRoaW5nID0gZmFsc2VcclxuICAgIGxldCBjbG9zZXN0U29GYXIgPSB0TWF4XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGlzdFNpemU7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5saXN0W2ldLmhpdChyLCB0TWluLCBjbG9zZXN0U29GYXIsIHRtcFJlYykpIHtcclxuICAgICAgICBoaXRBbnl0aGluZyA9IHRydWVcclxuICAgICAgICBjbG9zZXN0U29GYXIgPSB0bXBSZWMudFxyXG4gICAgICAgIHJlYy50ID0gdG1wUmVjLnRcclxuICAgICAgICByZWMucCA9IHRtcFJlYy5wXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHRtcFJlYy5ub3JtYWxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhpdEFueXRoaW5nXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcblxyXG5leHBvcnQgY2xhc3MgSGl0UmVjb3JkIHtcclxuICB0OiBudW1iZXJcclxuICBwOiBWZWN0b3IzXHJcbiAgbm9ybWFsOiBWZWN0b3IzXHJcblxyXG4gIGNvbnN0cnVjdG9yKF90OiBudW1iZXIsIF9wOiBWZWN0b3IzLCBfbm9ybWFsOiBWZWN0b3IzKSB7XHJcbiAgICB0aGlzLnQgPSBfdFxyXG4gICAgdGhpcy5wID0gX3BcclxuICAgIHRoaXMubm9ybWFsID0gX25vcm1hbFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEhpdGFibGUge1xyXG4gIGFic3RyYWN0IGhpdChyOiBSYXksIHRNaW46IG51bWJlciwgdE1heDogbnVtYmVyLCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW5cclxufVxyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqICByYXkudHNcclxuICogIHJheSBmdW5jdGlvbiBmb3IgcCh0KSA9IEEgKyB0ICogQlxyXG4gKiAgVDp0eXBlLGRlZmF1bHQgc2V0dGluZyBpcyBudW1iZXJcclxuICogIEQ6ZGltZW5zaW9uXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFJheSB7XHJcbiAgcHJpdmF0ZSBfQTogVmVjdG9yM1xyXG4gIHByaXZhdGUgX0I6IFZlY3RvcjNcclxuXHJcbiAgY29uc3RydWN0b3IoYTogVmVjdG9yMywgYjogVmVjdG9yMykge1xyXG4gICAgdGhpcy5fQSA9IGFcclxuICAgIHRoaXMuX0IgPSBiXHJcbiAgfVxyXG5cclxuICBvcmlnaW4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQVxyXG4gIH1cclxuICBkaXJlY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQlxyXG4gIH1cclxuICBwb2ludEF0UGFyYW0odDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQS5hZGQodGhpcy5fQi5tdWwodCkpXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEhpdGFibGUsIEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuXHJcbmV4cG9ydCBjbGFzcyBTcGhlcmUgZXh0ZW5kcyBIaXRhYmxlIHtcclxuICBjZW50ZXI6IFZlY3RvcjNcclxuICByYWRpdXM6IG51bWJlclxyXG5cclxuICBjb25zdHJ1Y3RvcihjZW46IFZlY3RvcjMsIHI6IG51bWJlcikge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5jZW50ZXIgPSBjZW5cclxuICAgIHRoaXMucmFkaXVzID0gclxyXG4gIH1cclxuXHJcbiAgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgb2MgPSByLm9yaWdpbigpLnN1Yih0aGlzLmNlbnRlcilcclxuICAgIGxldCBhID0gci5kaXJlY3Rpb24oKS5kb3Qoci5kaXJlY3Rpb24oKSlcclxuICAgIGxldCBiID0gb2MuZG90KHIuZGlyZWN0aW9uKCkpXHJcbiAgICBsZXQgYyA9IG9jLmRvdChvYykgLSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzXHJcbiAgICBsZXQgZGlzY3JpbWluYW50ID0gYiAqIGIgLSBhICogY1xyXG4gICAgaWYgKGRpc2NyaW1pbmFudCA+IDApIHtcclxuICAgICAgbGV0IHRtcCA9ICgtYiAtIE1hdGguc3FydChiICogYiAtIGEgKiBjKSkgLyBhXHJcbiAgICAgIGlmICh0bXAgPCB0TWF4ICYmIHRtcCA+IHRNaW4pIHtcclxuICAgICAgICByZWMudCA9IHRtcFxyXG4gICAgICAgIHJlYy5wID0gci5wb2ludEF0UGFyYW0ocmVjLnQpXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHJlYy5wLnN1Yih0aGlzLmNlbnRlcikuZGl2KHRoaXMucmFkaXVzKVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRtcCA9ICgtYiArIE1hdGguc3FydChiICogYiAtIGEgKiBjKSkgLyBhXHJcbiAgICAgIGlmICh0bXAgPCB0TWF4ICYmIHRtcCA+IHRNaW4pIHtcclxuICAgICAgICByZWMudCA9IHRtcFxyXG4gICAgICAgIHJlYy5wID0gci5wb2ludEF0UGFyYW0ocmVjLnQpXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHJlYy5wLnN1Yih0aGlzLmNlbnRlcikuZGl2KHRoaXMucmFkaXVzKVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyB3d1N1bSB9IGZyb20gJy4vZGVtby93dy1zdW0nXHJcbmltcG9ydCB7IEdlbmVyYXRlTm9pc2VEZW1vIH0gZnJvbSAnLi9kZW1vL25vaXNlLWxvYWQnXHJcbmltcG9ydCB7IHJheVRyYWNpbmdEaWZmdXNlIH0gZnJvbSAnLi9kZW1vL3JheS10cmFjaW5nLWRpZmZ1c2UnXHJcbmltcG9ydCB7IHd3UmF5VHJhY2luZ0RpZmZ1c2UgfSBmcm9tICcuL2RlbW8vd3ctcmF5LXRyYWNpbmctZGlmZnVzZSdcclxuXHJcbi8vIGxvY2FsIGluZm9cclxuY29uc3QgbWF4V29ya2VycyA9IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5IHx8IDRcclxuXHJcbi8vIHdlYiB3b3JrZXIgc3VtIGRlbW9cclxuLy8gd3dTdW0oZmFsc2UpXHJcblxyXG4vLyBnZW5lcmF0ZSBub2lzZSBkZW1vXHJcbi8vIEdlbmVyYXRlTm9pc2VEZW1vKClcclxuXHJcbi8vIHJheSB0cmFjaW5nIGRpZmZ1c2UgZGVtb1xyXG4vLyByYXlUcmFjaW5nRGlmZnVzZSgpXHJcblxyXG53d1JheVRyYWNpbmdEaWZmdXNlKG1heFdvcmtlcnMpXHJcbiIsImV4cG9ydCBuYW1lc3BhY2UgVXRpbHMge1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb20obWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCArIDEgLSBtaW4pKSArIG1pblxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFdyaXRlMkNhbnZhcyhcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIGltYWdlQnVmOiBBcnJheTxudW1iZXI+LFxyXG4gICAgdzogbnVtYmVyLFxyXG4gICAgaDogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBsZXQgY2FudmFzSW1hZ2UgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3LCBoKVxyXG4gICAgbGV0IGRhdGEgPSBjYW52YXNJbWFnZS5kYXRhXHJcbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBkYXRhLmxlbmd0aDsgaWR4ICs9IDQpIHtcclxuICAgICAgZGF0YVtpZHggKyAwXSA9IGltYWdlQnVmW2lkeCArIDBdXHJcbiAgICAgIGRhdGFbaWR4ICsgMV0gPSBpbWFnZUJ1ZltpZHggKyAxXVxyXG4gICAgICBkYXRhW2lkeCArIDJdID0gaW1hZ2VCdWZbaWR4ICsgMl1cclxuICAgICAgZGF0YVtpZHggKyAzXSA9IGltYWdlQnVmW2lkeCArIDNdXHJcbiAgICB9XHJcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShjYW52YXNJbWFnZSwgMCwgMClcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBHZW5lcmF0ZU5vaXNlKFxyXG4gICAgaW1hZ2VCdWZmZXI6IEFycmF5PG51bWJlcj4sXHJcbiAgICBzdGFydElkeDogbnVtYmVyLFxyXG4gICAgZW5kSWR4OiBudW1iZXJcclxuICApIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJZHg7IGluZGV4IDwgZW5kSWR4OyBpbmRleCArPSA0KSB7XHJcbiAgICAgIGxldCByID0gUmFuZG9tKDAsIDI1NSlcclxuICAgICAgbGV0IGcgPSBSYW5kb20oMCwgMjU1KVxyXG4gICAgICBsZXQgYiA9IFJhbmRvbSgwLCAyNTUpXHJcblxyXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleF0gPSByXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMV0gPSBnXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMl0gPSBiXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgM10gPSAyNTVcclxuICAgIH1cclxuICAgIHJldHVybiBpbWFnZUJ1ZmZlclxyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9