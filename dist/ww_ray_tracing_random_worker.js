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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/worker/ww-ray-tracing-random.worker.ts");
/******/ })
/************************************************************************/
/******/ ({

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

var ray_1 = __webpack_require__(/*! ./ray */ "./src/egrender/ray.ts");

var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");

var Camera =
/** @class */
function () {
  function Camera(lookFrom, lookAt, vup, vfov, aspect, aperture, focusDist) {
    this.lensRadius = aperture / 2;
    var theta = vfov * Math.PI / 180;
    var halfHeight = Math.tan(theta / 2);
    var halfWidth = halfHeight * aspect;
    this.origin = lookFrom;
    this.w = lookFrom.sub(lookAt).unitVec3();
    this.u = vup.cross(this.w).unitVec3();
    this.v = this.w.cross(this.u);
    this.lowerLeftCorner = this.origin.sub(this.u.mul(halfWidth * focusDist)).sub(this.v.mul(halfHeight * focusDist)).sub(this.w.mul(focusDist));
    this.horizontal = this.u.mul(2 * halfWidth * focusDist);
    this.vertical = this.v.mul(2 * halfHeight * focusDist);
  }

  Camera.prototype.getRay = function (u, v) {
    var rd = util_1.Utils.RandomInUnitDisk().mul(this.lensRadius);
    var offset = this.u.mul(rd.x()).add(this.v.mul(rd.y()));
    return new ray_1.Ray(this.origin.add(offset), this.lowerLeftCorner.add(this.horizontal.mul(u)).add(this.vertical.mul(v)).sub(this.origin).sub(offset));
  };

  return Camera;
}();

exports.Camera = Camera;

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

/***/ }),

/***/ "./src/worker/ww-ray-tracing-random.worker.ts":
/*!****************************************************!*\
  !*** ./src/worker/ww-ray-tracing-random.worker.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var vector3_1 = __webpack_require__(/*! ../egmath/vector3 */ "./src/egmath/vector3.ts");

var hitable_1 = __webpack_require__(/*! ../egrender/hitable */ "./src/egrender/hitable.ts");

var camera_1 = __webpack_require__(/*! ../egrender/camera */ "./src/egrender/camera.ts");

var sphere_1 = __webpack_require__(/*! ../egrender/sphere */ "./src/egrender/sphere.ts");

var hitable_list_1 = __webpack_require__(/*! ../egrender/hitable-list */ "./src/egrender/hitable-list.ts");

var lambertian_1 = __webpack_require__(/*! ../egrender/lambertian */ "./src/egrender/lambertian.ts");

var metal_1 = __webpack_require__(/*! ../egrender/metal */ "./src/egrender/metal.ts");

var dielectric_1 = __webpack_require__(/*! ../egrender/dielectric */ "./src/egrender/dielectric.ts");

var ctx = self;

function RandomScene(num) {
  var hitList = new Array(num + 1);
  hitList[0] = new sphere_1.Sphere(new vector3_1.Vector3(0, -1000, 0), 1000, new lambertian_1.Lambertian(new vector3_1.Vector3(0.5, 0.5, 0.5)));
  var i = 1;

  for (var _a = -11; _a < 11; _a++) {
    for (var _b = -11; _b < 11; _b++) {
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

var scene = RandomScene(100);

function Color(r, world, depth) {
  var col = new vector3_1.Vector3(0, 0, 0);
  var attenuationSum = new vector3_1.Vector3(1, 1, 1);

  for (var n = 0; n < Number.MAX_VALUE; n++) {
    var rec = new hitable_1.HitRecord(0, new vector3_1.Vector3(0, 0, 0), new vector3_1.Vector3(0, 0, 0), new lambertian_1.Lambertian(new vector3_1.Vector3(0, 0, 0)));
    var bHit = world.hit(r, 0.001, Number.MAX_VALUE, rec);

    if (!bHit) {
      break;
    }

    var bScatter = rec.material.scatter(r, rec);
    var scattered = rec.material.scattered;
    var attenuation = rec.material.attenuation;

    if (bScatter && depth < 50) {
      depth++;
      r = scattered;
      attenuationSum.imul(attenuation);
    } else {
      attenuationSum = new vector3_1.Vector3(0, 0, 0);
      break;
    }
  }

  var unitDir = r.direction().unitVec3();
  var t = 0.5 * (unitDir.y() + 1.0);
  col = new vector3_1.Vector3(1.0, 1.0, 1.0).mul(1.0 - t).add(new vector3_1.Vector3(0.5, 0.7, 1.0).mul(t));
  col.imul(attenuationSum);
  return col;
}

ctx.onmessage = function (message) {
  var param = message.data;
  var id = param.id;
  var start = param.start;
  var end = param.end;
  var endMax = param.endMax;
  var nx = param.width;
  var ny = param.height;
  var ns = param.samplingNum; // process end

  if (end > endMax) {
    end = endMax;
  } // camera


  var lookFrom = new vector3_1.Vector3(13, 2, 3);
  var lookAt = new vector3_1.Vector3(0, 0, 0);
  var vup = new vector3_1.Vector3(0, 1, 0);
  var vfov = 20;
  var aspect = nx / ny;
  var aperture = 0.1;
  var focusDist = 10.0;
  var cam = new camera_1.Camera(lookFrom, lookAt, vup, vfov, aspect, aperture, focusDist);
  var colArray = new Array();

  for (var j = start; j <= end; j++) {
    for (var i = 0; i < nx; i++) {
      var col = new vector3_1.Vector3(0, 0, 0);

      for (var s = 0; s < ns; s++) {
        var u = (i + Math.random()) / nx;
        var v = (ny - 1 - (j + Math.random())) / ny;
        var r = cam.getRay(u, v);
        col.iadd(Color(r, scene, 0));
      }

      col.idiv(ns);
      col = col.gamma2();
      colArray.push(Math.floor(255.99 * col.r()));
      colArray.push(Math.floor(255.99 * col.g()));
      colArray.push(Math.floor(255.99 * col.b()));
      colArray.push(255);
    }
  }

  ctx.postMessage({
    col: colArray,
    startVal: start,
    endVal: end,
    id: id,
    endMaxVal: endMax
  });
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC9tYXRoX3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvY2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9kaWVsZWN0cmljLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9oaXRhYmxlLWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2hpdGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2xhbWJlcnRpYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL21hdGVyaWFsLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9tZXRhbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvcmF5LnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9zcGhlcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci93dy1yYXktdHJhY2luZy1yYW5kb20ud29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFD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TjtBQUVBLGNBQVEsQ0FBQyxJQUFULENBQWMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxTQUFTLEdBQUcsQ0FBQyxDQUFKLEVBQXBCLENBQWQ7QUFDQSxjQUFRLENBQUMsSUFBVCxDQUFjLElBQUksQ0FBQyxLQUFMLENBQVcsU0FBUyxHQUFHLENBQUMsQ0FBSixFQUFwQixDQUFkO0FBQ0EsY0FBUSxDQUFDLElBQVQsQ0FBYyxJQUFJLENBQUMsS0FBTCxDQUFXLFNBQVMsR0FBRyxDQUFDLENBQUosRUFBcEIsQ0FBZDtBQUNBLGNBQVEsQ0FBQyxJQUFULENBQWMsR0FBZDtBQUNEO0FBQ0Y7O0FBRUQsS0FBRyxDQUFDLFdBQUosQ0FBZ0I7QUFDZCxPQUFHLEVBQUUsUUFEUztBQUVkLFlBQVEsRUFBRSxLQUZJO0FBR2QsVUFBTSxFQUFFLEdBSE07QUFJZCxNQUFFLEVBQUUsRUFKVTtBQUtkLGFBQVMsRUFBRTtBQUxHLEdBQWhCO0FBT0QsQ0F0REQsQyIsImZpbGUiOiJ3d19yYXlfdHJhY2luZ19yYW5kb21fd29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJkaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy93b3JrZXIvd3ctcmF5LXRyYWNpbmctcmFuZG9tLndvcmtlci50c1wiKTtcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICpcclxuICogIG1hdGhfdXRpbHMudHNcclxuICogIHNpbXBsZSBtYXRoIGZ1bmN0aW9uc1xyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWJzTWF4KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIHggKiB4ID4geSAqIHkgPyB4IDogeVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWJzTWluKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIHggKiB4IDwgeSAqIHkgPyB4IDogeVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbXVsZGVjKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuICh4ICogMTAgKiAoeSAqIDEwKSkgLyAxMDBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpdmRlYyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiAoeCAqIDEwKSAvICh5ICogMTApIC8gMTAwXHJcbn1cclxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKlxyXG4gKiAgdmVjdG9yLnRzXHJcbiAqICBULUQgdmVjdG9yIGRhdGFcclxuICogIFQ6dHlwZSxkZWZhdWx0IHNldHRpbmcgaXMgbnVtYmVyXHJcbiAqICBEOmRpbWVuc2lvblxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmltcG9ydCB7IGFic01heCwgYWJzTWluIH0gZnJvbSAnLi9tYXRoX3V0aWxzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlY3RvciB7XHJcbiAgcHJpdmF0ZSBfZWxlbWVudHM6IEFycmF5PG51bWJlcj5cclxuICBwcml2YXRlIF9kaW1lbnNpb246IG51bWJlclxyXG5cclxuICAvLyBjb25zdHJ1Y3RzIHZlY3RvciB3aXRoIHBhcmFtZXRlcnMgb3IgemVyb1xyXG4gIGNvbnN0cnVjdG9yKGRpbWVuc2lvbjogbnVtYmVyLCBwYXJhbXM/OiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICB0aGlzLl9kaW1lbnNpb24gPSBkaW1lbnNpb25cclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmIChwYXJhbXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBpbml0IG4gZGltZW5zaW9uIHZlY3RvciBkYXRhLHNldHRpbmcgYWxsIDBcclxuICAgICAgdGhpcy5fZWxlbWVudHMgPSBuZXcgQXJyYXk8bnVtYmVyPihkaW1lbnNpb24pXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IGRpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDBcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZWxlbWVudHMgPSBuZXcgQXJyYXk8bnVtYmVyPihkaW1lbnNpb24pXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IHBhcmFtcy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSBwYXJhbXNbX2ldXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldChwYXJhbXM6IFZlY3RvciB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChwYXJhbXMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdkaW1lbnNpb24gaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgcGFyYW1zLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IHBhcmFtcy5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIHNldFplcm8oKSB7XHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldE9uZSgpIHtcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gMVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1xyXG4gIH1cclxuXHJcbiAgYXQoaWR4OiBudW1iZXIpIHtcclxuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnaW5kZXggaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudHNbaWR4XVxyXG4gIH1cclxuXHJcbiAgZG90KG90aGVyczogVmVjdG9yIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ290aGVycyBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXQgPSAwXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgcmV0ICs9IHRoaXMuX2VsZW1lbnRzW19pXSAqIG90aGVycy5kYXRhKClbX2ldXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBsZW5ndGhTcXVhcmVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpXHJcbiAgfVxyXG5cclxuICBsZW5ndGgoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCgpKVxyXG4gIH1cclxuXHJcbiAgbm9ybWFsaXplKCkge1xyXG4gICAgdGhpcy5pZGl2KHRoaXMubGVuZ3RoKCkpXHJcbiAgfVxyXG5cclxuICBzdW0oKSB7XHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICByZXQgKz0gdGhpcy5fZWxlbWVudHNbX2ldXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBzaXplKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvblxyXG4gIH1cclxuXHJcbiAgYXZnKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3VtKCkgLyB0aGlzLnNpemUoKVxyXG4gIH1cclxuXHJcbiAgbWluKCkge1xyXG4gICAgbGV0IG1pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBtaW5WYWwgPSBNYXRoLm1pbihtaW5WYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBtaW5WYWxcclxuICB9XHJcblxyXG4gIG1heCgpIHtcclxuICAgIGxldCBtYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBtYXhWYWwgPSBNYXRoLm1heChtYXhWYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBtYXhWYWxcclxuICB9XHJcblxyXG4gIGFic21heCgpIHtcclxuICAgIGxldCBhYnNNYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBhYnNNYXhWYWwgPSBhYnNNYXgoYWJzTWF4VmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWJzTWF4VmFsXHJcbiAgfVxyXG5cclxuICBhYnNtaW4oKSB7XHJcbiAgICBsZXQgYWJzTWluVmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgYWJzTWluVmFsID0gYWJzTWluKGFic01pblZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFic01pblZhbFxyXG4gIH1cclxuXHJcbiAgZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzOiBWZWN0b3IpIHtcclxuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXQgPSAwXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgbGV0IGRpZmYgPSB0aGlzLl9lbGVtZW50c1tfaV0gLSBvdGhlcnMuZGF0YSgpW19pXVxyXG4gICAgICByZXQgKz0gZGlmZiAqIGRpZmZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBkaXN0YW5jZVRvKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzKSlcclxuICB9XHJcblxyXG4gIGlzRXF1YWwob3RoZXJzOiBWZWN0b3IpIHtcclxuICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXJzLnNpemUoKSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmF0KF9pKSAhPT0gb3RoZXJzLmF0KF9pKSkgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGlzU2ltaWxhcihvdGhlcnM6IFZlY3RvciB8IHVuZGVmaW5lZCwgZXBzaWxvbjogbnVtYmVyKSB7XHJcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlcnMuc2l6ZSgpKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYXQoX2kpIC0gb3RoZXJzLmF0KF9pKSkgPiBlcHNpbG9uKSByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgYWRkKHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSArPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKz0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBzdWIocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAtPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIG11bChwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKj0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgZGl2KHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAvPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgaWYgKHMgPT09IDApIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC89IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgaWRpdihwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMuZGl2KHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBpYWRkKHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5hZGQocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIGlzdWIocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLnN1YihwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgaW11bChwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMubXVsKHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBzZXRBdChpZHg6IG51bWJlciwgdmFsOiBudW1iZXIpIHtcclxuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZWxlbWVudHNbaWR4XSA9IHZhbFxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHByb2pfdSh2KSA9IDx1LHY+Lzx2LHY+IHVcclxuICAgKiBAcGFyYW0gdVxyXG4gICAqIEBwYXJhbSB2XHJcbiAgICovXHJcbiAgc3RhdGljIHByb2oodTogVmVjdG9yLCB2OiBWZWN0b3IpIHtcclxuICAgIHJldHVybiB1Lm11bCh2LmRvdCh1KSAvIHUuZG90KHUpKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuL3ZlY3RvcidcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3IzIGV4dGVuZHMgVmVjdG9yIHtcclxuICBjb25zdHJ1Y3RvcihlMTogbnVtYmVyLCBlMjogbnVtYmVyLCBlMzogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigzLCBuZXcgQXJyYXk8bnVtYmVyPihlMSwgZTIsIGUzKSlcclxuICB9XHJcblxyXG4gIHgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMF1cclxuICB9XHJcbiAgeSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsxXVxyXG4gIH1cclxuICB6KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzJdXHJcbiAgfVxyXG4gIHIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMF1cclxuICB9XHJcbiAgZygpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsxXVxyXG4gIH1cclxuICBiKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzJdXHJcbiAgfVxyXG5cclxuICBpc2V0KHYzOiBWZWN0b3IzKSB7XHJcbiAgICB0aGlzLmRhdGEoKVswXSA9IHYzLnIoKVxyXG4gICAgdGhpcy5kYXRhKClbMV0gPSB2My5nKClcclxuICAgIHRoaXMuZGF0YSgpWzJdID0gdjMuYigpXHJcbiAgfVxyXG5cclxuICBzZXQodjM6IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiBzdXBlci5zZXQobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxyXG4gIH1cclxuXHJcbiAgYWRkKHYzOiBhbnkpIHtcclxuICAgIGxldCBhZGR2ID0gc3VwZXIuYWRkKHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGFkZHYuZGF0YSgpWzBdLCBhZGR2LmRhdGEoKVsxXSwgYWRkdi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBzdWIodjM6IGFueSkge1xyXG4gICAgbGV0IHN1YnYgPSBzdXBlci5zdWIodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoc3Vidi5kYXRhKClbMF0sIHN1YnYuZGF0YSgpWzFdLCBzdWJ2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIG11bCh2MzogYW55KSB7XHJcbiAgICBsZXQgbXVsdiA9IHN1cGVyLm11bCh2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhtdWx2LmRhdGEoKVswXSwgbXVsdi5kYXRhKClbMV0sIG11bHYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgZGl2KHYzOiBhbnkpIHtcclxuICAgIGxldCBkaXZ2ID0gc3VwZXIuZGl2KHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGRpdnYuZGF0YSgpWzBdLCBkaXZ2LmRhdGEoKVsxXSwgZGl2di5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBkb3QodjM6IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiBzdXBlci5kb3QobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxyXG4gIH1cclxuXHJcbiAgY3Jvc3ModjM6IFZlY3RvcjMpIHtcclxuICAgIGxldCBudiA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoXHJcbiAgICAgIG52LmRhdGEoKVsxXSAqIHYzLmRhdGEoKVsyXSAtIG52LmRhdGEoKVsyXSAqIHYzLmRhdGEoKVsxXSxcclxuICAgICAgbnYuZGF0YSgpWzJdICogdjMuZGF0YSgpWzBdIC0gbnYuZGF0YSgpWzBdICogdjMuZGF0YSgpWzJdLFxyXG4gICAgICBudi5kYXRhKClbMF0gKiB2My5kYXRhKClbMV0gLSBudi5kYXRhKClbMV0gKiB2My5kYXRhKClbMF1cclxuICAgIClcclxuICB9XHJcblxyXG4gIHVuaXRWZWMzKCk6IFZlY3RvcjMge1xyXG4gICAgbGV0IG52ID0gbmV3IFZlY3RvcigzLCB0aGlzLmRhdGEoKSlcclxuICAgIG52Lm5vcm1hbGl6ZSgpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMobnYuZGF0YSgpWzBdLCBudi5kYXRhKClbMV0sIG52LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIGdhbW1hMigpOiBWZWN0b3IzIHtcclxuICAgIGxldCB0diA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoXHJcbiAgICAgIE1hdGguc3FydCh0di5hdCgwKSksXHJcbiAgICAgIE1hdGguc3FydCh0di5hdCgxKSksXHJcbiAgICAgIE1hdGguc3FydCh0di5hdCgyKSlcclxuICAgIClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi91dGlsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbWVyYSB7XHJcbiAgbG93ZXJMZWZ0Q29ybmVyOiBWZWN0b3IzXHJcbiAgaG9yaXpvbnRhbDogVmVjdG9yM1xyXG4gIHZlcnRpY2FsOiBWZWN0b3IzXHJcbiAgb3JpZ2luOiBWZWN0b3IzXHJcblxyXG4gIGxlbnNSYWRpdXM6IG51bWJlclxyXG5cclxuICB3OiBWZWN0b3IzXHJcbiAgdTogVmVjdG9yM1xyXG4gIHY6IFZlY3RvcjNcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGxvb2tGcm9tOiBWZWN0b3IzLFxyXG4gICAgbG9va0F0OiBWZWN0b3IzLFxyXG4gICAgdnVwOiBWZWN0b3IzLFxyXG4gICAgdmZvdjogbnVtYmVyLFxyXG4gICAgYXNwZWN0OiBudW1iZXIsXHJcbiAgICBhcGVydHVyZTogbnVtYmVyLFxyXG4gICAgZm9jdXNEaXN0OiBudW1iZXJcclxuICApIHtcclxuICAgIHRoaXMubGVuc1JhZGl1cyA9IGFwZXJ0dXJlIC8gMlxyXG5cclxuICAgIGxldCB0aGV0YSA9ICh2Zm92ICogTWF0aC5QSSkgLyAxODBcclxuICAgIGxldCBoYWxmSGVpZ2h0ID0gTWF0aC50YW4odGhldGEgLyAyKVxyXG4gICAgbGV0IGhhbGZXaWR0aCA9IGhhbGZIZWlnaHQgKiBhc3BlY3RcclxuXHJcbiAgICB0aGlzLm9yaWdpbiA9IGxvb2tGcm9tXHJcbiAgICB0aGlzLncgPSBsb29rRnJvbS5zdWIobG9va0F0KS51bml0VmVjMygpXHJcbiAgICB0aGlzLnUgPSB2dXAuY3Jvc3ModGhpcy53KS51bml0VmVjMygpXHJcbiAgICB0aGlzLnYgPSB0aGlzLncuY3Jvc3ModGhpcy51KVxyXG5cclxuICAgIHRoaXMubG93ZXJMZWZ0Q29ybmVyID0gdGhpcy5vcmlnaW5cclxuICAgICAgLnN1Yih0aGlzLnUubXVsKGhhbGZXaWR0aCAqIGZvY3VzRGlzdCkpXHJcbiAgICAgIC5zdWIodGhpcy52Lm11bChoYWxmSGVpZ2h0ICogZm9jdXNEaXN0KSlcclxuICAgICAgLnN1Yih0aGlzLncubXVsKGZvY3VzRGlzdCkpXHJcbiAgICB0aGlzLmhvcml6b250YWwgPSB0aGlzLnUubXVsKDIgKiBoYWxmV2lkdGggKiBmb2N1c0Rpc3QpXHJcbiAgICB0aGlzLnZlcnRpY2FsID0gdGhpcy52Lm11bCgyICogaGFsZkhlaWdodCAqIGZvY3VzRGlzdClcclxuICB9XHJcblxyXG4gIGdldFJheSh1OiBudW1iZXIsIHY6IG51bWJlcikge1xyXG4gICAgbGV0IHJkID0gVXRpbHMuUmFuZG9tSW5Vbml0RGlzaygpLm11bCh0aGlzLmxlbnNSYWRpdXMpXHJcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy51Lm11bChyZC54KCkpLmFkZCh0aGlzLnYubXVsKHJkLnkoKSkpXHJcbiAgICByZXR1cm4gbmV3IFJheShcclxuICAgICAgdGhpcy5vcmlnaW4uYWRkKG9mZnNldCksXHJcbiAgICAgIHRoaXMubG93ZXJMZWZ0Q29ybmVyXHJcbiAgICAgICAgLmFkZCh0aGlzLmhvcml6b250YWwubXVsKHUpKVxyXG4gICAgICAgIC5hZGQodGhpcy52ZXJ0aWNhbC5tdWwodikpXHJcbiAgICAgICAgLnN1Yih0aGlzLm9yaWdpbilcclxuICAgICAgICAuc3ViKG9mZnNldClcclxuICAgIClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBEaWVsZWN0cmljIGV4dGVuZHMgTWF0ZXJpYWwge1xyXG4gIHNjYXR0ZXJlZDogUmF5XHJcbiAgYXR0ZW51YXRpb246IFZlY3RvcjNcclxuICByZWZJZHg6IG51bWJlclxyXG5cclxuICBjb25zdHJ1Y3RvcihyaTogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLnJlZklkeCA9IHJpXHJcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDApKVxyXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgfVxyXG5cclxuICBzY2F0dGVyKHI6IFJheSwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcclxuICAgIGxldCBvdXR3YXJkTm9ybWFsID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgIGxldCByZWZyYWN0ZWQgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG5cclxuICAgIGxldCBuaU92ZXJOdCA9IDBcclxuXHJcbiAgICBsZXQgcmVmbGVjdGVkID0gVXRpbHMucmVmbGVjdChyLmRpcmVjdGlvbigpLnVuaXRWZWMzKCksIHJlYy5ub3JtYWwpXHJcbiAgICBsZXQgcmVmbGVjdFByb2IgPSAwXHJcbiAgICBsZXQgY29zaW5lID0gMFxyXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKDEsIDEsIDEpXHJcblxyXG4gICAgaWYgKHIuZGlyZWN0aW9uKCkuZG90KHJlYy5ub3JtYWwpID4gMCkge1xyXG4gICAgICBvdXR3YXJkTm9ybWFsID0gcmVjLm5vcm1hbC5tdWwoLTEpXHJcbiAgICAgIG5pT3Zlck50ID0gdGhpcy5yZWZJZHhcclxuICAgICAgY29zaW5lID1cclxuICAgICAgICAodGhpcy5yZWZJZHggKiByLmRpcmVjdGlvbigpLmRvdChyZWMubm9ybWFsKSkgLyByLmRpcmVjdGlvbigpLmxlbmd0aCgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvdXR3YXJkTm9ybWFsID0gcmVjLm5vcm1hbFxyXG4gICAgICBuaU92ZXJOdCA9IDEuMCAvIHRoaXMucmVmSWR4XHJcbiAgICAgIGNvc2luZSA9IC1yLmRpcmVjdGlvbigpLmRvdChyZWMubm9ybWFsKSAvIHIuZGlyZWN0aW9uKCkubGVuZ3RoKClcclxuICAgIH1cclxuXHJcbiAgICBpZiAoVXRpbHMucmVmcmFjdChyLmRpcmVjdGlvbigpLCBvdXR3YXJkTm9ybWFsLCBuaU92ZXJOdCwgcmVmcmFjdGVkKSkge1xyXG4gICAgICByZWZsZWN0UHJvYiA9IFV0aWxzLnNjaGxpY2soY29zaW5lLCB0aGlzLnJlZklkeClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlZmxlY3RQcm9iID0gMS4wXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPCByZWZsZWN0UHJvYikge1xyXG4gICAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkocmVjLnAsIHJlZmxlY3RlZClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShyZWMucCwgcmVmcmFjdGVkKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEhpdGFibGUsIEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgTGFtYmVydGlhbiB9IGZyb20gJy4vbGFtYmVydGlhbidcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXRhYmxlTGlzdCBleHRlbmRzIEhpdGFibGUge1xyXG4gIGxpc3Q6IEFycmF5PEhpdGFibGU+XHJcbiAgbGlzdFNpemU6IG51bWJlclxyXG4gIGNvbnN0cnVjdG9yKGw6IEFycmF5PEhpdGFibGU+LCBuOiBudW1iZXIpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMubGlzdCA9IGxcclxuICAgIHRoaXMubGlzdFNpemUgPSBuXHJcbiAgfVxyXG5cclxuICBoaXQocjogUmF5LCB0TWluOiBudW1iZXIsIHRNYXg6IG51bWJlciwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcclxuICAgIGxldCB0bXBSZWMgPSBuZXcgSGl0UmVjb3JkKFxyXG4gICAgICAwLFxyXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcclxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXHJcbiAgICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAsIDAsIDApKVxyXG4gICAgKVxyXG4gICAgbGV0IGhpdEFueXRoaW5nID0gZmFsc2VcclxuICAgIGxldCBjbG9zZXN0U29GYXIgPSB0TWF4XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGlzdFNpemU7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5saXN0W2ldLmhpdChyLCB0TWluLCBjbG9zZXN0U29GYXIsIHRtcFJlYykpIHtcclxuICAgICAgICBoaXRBbnl0aGluZyA9IHRydWVcclxuICAgICAgICBjbG9zZXN0U29GYXIgPSB0bXBSZWMudFxyXG4gICAgICAgIHJlYy50ID0gdG1wUmVjLnRcclxuICAgICAgICByZWMucCA9IHRtcFJlYy5wXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHRtcFJlYy5ub3JtYWxcclxuICAgICAgICByZWMubWF0ZXJpYWwgPSB0bXBSZWMubWF0ZXJpYWxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhpdEFueXRoaW5nXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXRSZWNvcmQge1xyXG4gIHQ6IG51bWJlclxyXG4gIHA6IFZlY3RvcjNcclxuICBub3JtYWw6IFZlY3RvcjNcclxuICBtYXRlcmlhbDogTWF0ZXJpYWxcclxuXHJcbiAgY29uc3RydWN0b3IoX3Q6IG51bWJlciwgX3A6IFZlY3RvcjMsIF9ub3JtYWw6IFZlY3RvcjMsIF9tYXRlcmlhbDogTWF0ZXJpYWwpIHtcclxuICAgIHRoaXMudCA9IF90XHJcbiAgICB0aGlzLnAgPSBfcFxyXG4gICAgdGhpcy5ub3JtYWwgPSBfbm9ybWFsXHJcbiAgICB0aGlzLm1hdGVyaWFsID0gX21hdGVyaWFsXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSGl0YWJsZSB7XHJcbiAgYWJzdHJhY3QgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhblxyXG59XHJcbiIsImltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWwnXHJcblxyXG5leHBvcnQgY2xhc3MgTGFtYmVydGlhbiBleHRlbmRzIE1hdGVyaWFsIHtcclxuICBhbGJlZG86IFZlY3RvcjNcclxuICBzY2F0dGVyZWQ6IFJheVxyXG4gIGF0dGVudWF0aW9uOiBWZWN0b3IzXHJcblxyXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuYWxiZWRvID0gYVxyXG4gICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygwLCAwLCAwKSlcclxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gIH1cclxuXHJcbiAgc2NhdHRlcihyOiBSYXksIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gcmVjLnAuYWRkKHJlYy5ub3JtYWwpLmFkZChVdGlscy5SYW5kb21JblVuaXRTcGhlcmUoKSlcclxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShyZWMucCwgdGFyZ2V0LnN1YihyZWMucCkpXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoXHJcbiAgICAgIHRoaXMuYWxiZWRvLngoKSxcclxuICAgICAgdGhpcy5hbGJlZG8ueSgpLFxyXG4gICAgICB0aGlzLmFsYmVkby56KClcclxuICAgIClcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRlcmlhbCB7XHJcbiAgYWJzdHJhY3Qgc2NhdHRlcmVkOiBSYXlcclxuICBhYnN0cmFjdCBhdHRlbnVhdGlvbjogVmVjdG9yM1xyXG4gIGFic3RyYWN0IHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW5cclxufVxyXG4iLCJpbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi91dGlsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIE1ldGFsIGV4dGVuZHMgTWF0ZXJpYWwge1xyXG4gIGFsYmVkbzogVmVjdG9yM1xyXG4gIHNjYXR0ZXJlZDogUmF5XHJcbiAgYXR0ZW51YXRpb246IFZlY3RvcjNcclxuICBmdXp6OiBudW1iZXJcclxuXHJcbiAgY29uc3RydWN0b3IoYTogVmVjdG9yMywgZjogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmFsYmVkbyA9IGFcclxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuXHJcbiAgICBpZiAoZiA8IDEpIHRoaXMuZnV6eiA9IGZcclxuICAgIGVsc2UgdGhpcy5mdXp6ID0gMVxyXG4gIH1cclxuXHJcbiAgc2NhdHRlcihyOiBSYXksIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgcmVmbGVjdGVkID0gVXRpbHMucmVmbGVjdChyLmRpcmVjdGlvbigpLnVuaXRWZWMzKCksIHJlYy5ub3JtYWwpXHJcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkoXHJcbiAgICAgIHJlYy5wLFxyXG4gICAgICByZWZsZWN0ZWQuYWRkKFV0aWxzLlJhbmRvbUluVW5pdFNwaGVyZSgpLm11bCh0aGlzLmZ1enopKVxyXG4gICAgKVxyXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKFxyXG4gICAgICB0aGlzLmFsYmVkby54KCksXHJcbiAgICAgIHRoaXMuYWxiZWRvLnkoKSxcclxuICAgICAgdGhpcy5hbGJlZG8ueigpXHJcbiAgICApXHJcbiAgICByZXR1cm4gdGhpcy5zY2F0dGVyZWQuZGlyZWN0aW9uKCkuZG90KHJlYy5ub3JtYWwpID4gMFxyXG4gIH1cclxufVxyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqICByYXkudHNcclxuICogIHJheSBmdW5jdGlvbiBmb3IgcCh0KSA9IEEgKyB0ICogQlxyXG4gKiAgVDp0eXBlLGRlZmF1bHQgc2V0dGluZyBpcyBudW1iZXJcclxuICogIEQ6ZGltZW5zaW9uXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFJheSB7XHJcbiAgcHVibGljIF9BOiBWZWN0b3IzXHJcbiAgcHVibGljIF9COiBWZWN0b3IzXHJcblxyXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMsIGI6IFZlY3RvcjMpIHtcclxuICAgIHRoaXMuX0EgPSBhXHJcbiAgICB0aGlzLl9CID0gYlxyXG4gIH1cclxuXHJcbiAgb3JpZ2luKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX0FcclxuICB9XHJcbiAgZGlyZWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX0JcclxuICB9XHJcbiAgcG9pbnRBdFBhcmFtKHQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuX0EuYWRkKHRoaXMuX0IubXVsKHQpKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIaXRhYmxlLCBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBTcGhlcmUgZXh0ZW5kcyBIaXRhYmxlIHtcclxuICBjZW50ZXI6IFZlY3RvcjNcclxuICByYWRpdXM6IG51bWJlclxyXG4gIG1hdGVyaWFsOiBNYXRlcmlhbFxyXG5cclxuICBjb25zdHJ1Y3RvcihjZW46IFZlY3RvcjMsIHI6IG51bWJlciwgbWF0OiBNYXRlcmlhbCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5jZW50ZXIgPSBjZW5cclxuICAgIHRoaXMucmFkaXVzID0gclxyXG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdFxyXG4gIH1cclxuXHJcbiAgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgb2MgPSByLm9yaWdpbigpLnN1Yih0aGlzLmNlbnRlcilcclxuICAgIGxldCBhID0gci5kaXJlY3Rpb24oKS5kb3Qoci5kaXJlY3Rpb24oKSlcclxuICAgIGxldCBiID0gb2MuZG90KHIuZGlyZWN0aW9uKCkpXHJcbiAgICBsZXQgYyA9IG9jLmRvdChvYykgLSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzXHJcbiAgICBsZXQgZGlzY3JpbWluYW50ID0gYiAqIGIgLSBhICogY1xyXG4gICAgaWYgKGRpc2NyaW1pbmFudCA+IDApIHtcclxuICAgICAgbGV0IHRtcCA9ICgtYiAtIE1hdGguc3FydChiICogYiAtIGEgKiBjKSkgLyBhXHJcbiAgICAgIGlmICh0bXAgPCB0TWF4ICYmIHRtcCA+IHRNaW4pIHtcclxuICAgICAgICByZWMudCA9IHRtcFxyXG4gICAgICAgIHJlYy5wID0gci5wb2ludEF0UGFyYW0ocmVjLnQpXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHJlYy5wLnN1Yih0aGlzLmNlbnRlcikuZGl2KHRoaXMucmFkaXVzKVxyXG4gICAgICAgIHJlYy5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0bXAgPSAoLWIgKyBNYXRoLnNxcnQoYiAqIGIgLSBhICogYykpIC8gYVxyXG4gICAgICBpZiAodG1wIDwgdE1heCAmJiB0bXAgPiB0TWluKSB7XHJcbiAgICAgICAgcmVjLnQgPSB0bXBcclxuICAgICAgICByZWMucCA9IHIucG9pbnRBdFBhcmFtKHJlYy50KVxyXG4gICAgICAgIHJlYy5ub3JtYWwgPSByZWMucC5zdWIodGhpcy5jZW50ZXIpLmRpdih0aGlzLnJhZGl1cylcclxuICAgICAgICByZWMubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuL2VnbWF0aC92ZWN0b3IzJ1xyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBVdGlscyB7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFJhbmRvbUluVW5pdFNwaGVyZSgpIHtcclxuICAgIGxldCBwID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgIGRvIHtcclxuICAgICAgcCA9IG5ldyBWZWN0b3IzKE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCkpXHJcbiAgICAgICAgLm11bCgyKVxyXG4gICAgICAgIC5zdWIobmV3IFZlY3RvcjMoMSwgMSwgMSkpXHJcbiAgICB9IHdoaWxlIChwLmxlbmd0aFNxdWFyZWQoKSA+PSAxLjApXHJcbiAgICByZXR1cm4gcFxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFJhbmRvbUluVW5pdERpc2soKSB7XHJcbiAgICBsZXQgcCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgICBkbyB7XHJcbiAgICAgIHAgPSBuZXcgVmVjdG9yMyhNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpKVxyXG4gICAgICAgIC5tdWwoMilcclxuICAgICAgICAuc3ViKG5ldyBWZWN0b3IzKDEsIDEsIDApKVxyXG4gICAgfSB3aGlsZSAocC5sZW5ndGhTcXVhcmVkKCkgPj0gMS4wKVxyXG4gICAgcmV0dXJuIHBcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiByZWZsZWN0KHY6IFZlY3RvcjMsIG46IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiB2LnN1YihuLm11bCgyICogdi5kb3QobikpKVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHNjaGxpY2soY29zaW5lOiBudW1iZXIsIHJlZklkeDogbnVtYmVyKSB7XHJcbiAgICBsZXQgcjAgPSAoMSAtIHJlZklkeCkgLyAoMSArIHJlZklkeClcclxuICAgIHIwID0gcjAgKiByMFxyXG4gICAgcmV0dXJuIHIwICsgKDEgLSByMCkgKiBNYXRoLnBvdygxIC0gY29zaW5lLCA1KVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZnJhY3QoXHJcbiAgICB2OiBWZWN0b3IzLFxyXG4gICAgbjogVmVjdG9yMyxcclxuICAgIG5pT3Zlck50OiBudW1iZXIsXHJcbiAgICByZWZyYWN0ZWQ6IFZlY3RvcjNcclxuICApIHtcclxuICAgIGxldCB1diA9IHYudW5pdFZlYzMoKVxyXG4gICAgbGV0IGR0ID0gdXYuZG90KG4pXHJcbiAgICBsZXQgZGlzY3JpbWluYW50ID0gMS4wIC0gbmlPdmVyTnQgKiBuaU92ZXJOdCAqICgxIC0gZHQgKiBkdClcclxuICAgIGlmIChkaXNjcmltaW5hbnQgPiAwKSB7XHJcbiAgICAgIHJlZnJhY3RlZC5zZXQoXHJcbiAgICAgICAgdXZcclxuICAgICAgICAgIC5zdWIobi5tdWwoZHQpKVxyXG4gICAgICAgICAgLm11bChuaU92ZXJOdClcclxuICAgICAgICAgIC5zdWIobi5tdWwoTWF0aC5zcXJ0KGRpc2NyaW1pbmFudCkpKVxyXG4gICAgICApXHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb20obWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCArIDEgLSBtaW4pKSArIG1pblxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFdyaXRlMkNhbnZhcyhcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIGltYWdlQnVmOiBBcnJheTxudW1iZXI+LFxyXG4gICAgdzogbnVtYmVyLFxyXG4gICAgaDogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBsZXQgY2FudmFzSW1hZ2UgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3LCBoKVxyXG4gICAgbGV0IGRhdGEgPSBjYW52YXNJbWFnZS5kYXRhXHJcbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBkYXRhLmxlbmd0aDsgaWR4ICs9IDQpIHtcclxuICAgICAgZGF0YVtpZHggKyAwXSA9IGltYWdlQnVmW2lkeCArIDBdXHJcbiAgICAgIGRhdGFbaWR4ICsgMV0gPSBpbWFnZUJ1ZltpZHggKyAxXVxyXG4gICAgICBkYXRhW2lkeCArIDJdID0gaW1hZ2VCdWZbaWR4ICsgMl1cclxuICAgICAgZGF0YVtpZHggKyAzXSA9IGltYWdlQnVmW2lkeCArIDNdXHJcbiAgICB9XHJcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShjYW52YXNJbWFnZSwgMCwgMClcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBHZW5lcmF0ZU5vaXNlKFxyXG4gICAgaW1hZ2VCdWZmZXI6IEFycmF5PG51bWJlcj4sXHJcbiAgICBzdGFydElkeDogbnVtYmVyLFxyXG4gICAgZW5kSWR4OiBudW1iZXJcclxuICApIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJZHg7IGluZGV4IDwgZW5kSWR4OyBpbmRleCArPSA0KSB7XHJcbiAgICAgIGxldCByID0gUmFuZG9tKDAsIDI1NSlcclxuICAgICAgbGV0IGcgPSBSYW5kb20oMCwgMjU1KVxyXG4gICAgICBsZXQgYiA9IFJhbmRvbSgwLCAyNTUpXHJcblxyXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleF0gPSByXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMV0gPSBnXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMl0gPSBiXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgM10gPSAyNTVcclxuICAgIH1cclxuICAgIHJldHVybiBpbWFnZUJ1ZmZlclxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4uL2VncmVuZGVyL3JheSdcclxuaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi4vZWdyZW5kZXIvaGl0YWJsZSdcclxuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSAnLi4vZWdyZW5kZXIvY2FtZXJhJ1xyXG5pbXBvcnQgeyBTcGhlcmUgfSBmcm9tICcuLi9lZ3JlbmRlci9zcGhlcmUnXHJcbmltcG9ydCB7IEhpdGFibGVMaXN0IH0gZnJvbSAnLi4vZWdyZW5kZXIvaGl0YWJsZS1saXN0J1xyXG5pbXBvcnQgeyBMYW1iZXJ0aWFuIH0gZnJvbSAnLi4vZWdyZW5kZXIvbGFtYmVydGlhbidcclxuaW1wb3J0IHsgTWV0YWwgfSBmcm9tICcuLi9lZ3JlbmRlci9tZXRhbCdcclxuaW1wb3J0IHsgRGllbGVjdHJpYyB9IGZyb20gJy4uL2VncmVuZGVyL2RpZWxlY3RyaWMnXHJcblxyXG5jb25zdCBjdHg6IFdvcmtlciA9IHNlbGYgYXMgYW55XHJcblxyXG5mdW5jdGlvbiBSYW5kb21TY2VuZShudW06IG51bWJlcik6IEhpdGFibGVMaXN0IHtcclxuICBsZXQgaGl0TGlzdCA9IG5ldyBBcnJheTxIaXRhYmxlPihudW0gKyAxKVxyXG4gIGhpdExpc3RbMF0gPSBuZXcgU3BoZXJlKFxyXG4gICAgbmV3IFZlY3RvcjMoMCwgLTEwMDAsIDApLFxyXG4gICAgMTAwMCxcclxuICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAuNSwgMC41LCAwLjUpKVxyXG4gIClcclxuICBsZXQgaSA9IDFcclxuICBmb3IgKGxldCBfYSA9IC0xMTsgX2EgPCAxMTsgX2ErKykge1xyXG4gICAgZm9yIChsZXQgX2IgPSAtMTE7IF9iIDwgMTE7IF9iKyspIHtcclxuICAgICAgbGV0IGNob29zZU1hdCA9IE1hdGgucmFuZG9tKClcclxuICAgICAgbGV0IGNlbnRlciA9IG5ldyBWZWN0b3IzKFxyXG4gICAgICAgIF9hICsgMC45ICogTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAwLjIsXHJcbiAgICAgICAgX2IgKyAwLjkgKiBNYXRoLnJhbmRvbSgpXHJcbiAgICAgIClcclxuICAgICAgaWYgKGNlbnRlci5zdWIobmV3IFZlY3RvcjMoNCwgMC4yLCAwKSkubGVuZ3RoKCkgPiAwLjkpIHtcclxuICAgICAgICBpZiAoY2hvb3NlTWF0IDwgMC44KSB7XHJcbiAgICAgICAgICAvLyBkaWZmdXNlXHJcbiAgICAgICAgICBoaXRMaXN0W2krK10gPSBuZXcgU3BoZXJlKFxyXG4gICAgICAgICAgICBjZW50ZXIsXHJcbiAgICAgICAgICAgIDAuMixcclxuICAgICAgICAgICAgbmV3IExhbWJlcnRpYW4oXHJcbiAgICAgICAgICAgICAgbmV3IFZlY3RvcjMoXHJcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIE1hdGgucmFuZG9tKClcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2UgaWYgKGNob29zZU1hdCA8IDAuOTUpIHtcclxuICAgICAgICAgIC8vIG1ldGFsXHJcbiAgICAgICAgICBoaXRMaXN0W2krK10gPSBuZXcgU3BoZXJlKFxyXG4gICAgICAgICAgICBjZW50ZXIsXHJcbiAgICAgICAgICAgIDAuMixcclxuICAgICAgICAgICAgbmV3IE1ldGFsKFxyXG4gICAgICAgICAgICAgIG5ldyBWZWN0b3IzKFxyXG4gICAgICAgICAgICAgICAgMC41ICogKDEgKyBNYXRoLnJhbmRvbSgpKSxcclxuICAgICAgICAgICAgICAgIDAuNSAqICgxICsgTWF0aC5yYW5kb20oKSksXHJcbiAgICAgICAgICAgICAgICAwLjUgKiAoMSArIE1hdGgucmFuZG9tKCkpXHJcbiAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAwLjUgKiBNYXRoLnJhbmRvbSgpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gZ2xhc3NcclxuICAgICAgICAgIGhpdExpc3RbaSsrXSA9IG5ldyBTcGhlcmUoY2VudGVyLCAwLjIsIG5ldyBEaWVsZWN0cmljKDEuNSkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaXRMaXN0W2krK10gPSBuZXcgU3BoZXJlKG5ldyBWZWN0b3IzKDAsIDEsIDApLCAxLjAsIG5ldyBEaWVsZWN0cmljKDEuNSkpXHJcbiAgaGl0TGlzdFtpKytdID0gbmV3IFNwaGVyZShcclxuICAgIG5ldyBWZWN0b3IzKC00LCAxLCAwKSxcclxuICAgIDEuMCxcclxuICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAuNCwgMC4yLCAwLjEpKVxyXG4gIClcclxuICBoaXRMaXN0W2krK10gPSBuZXcgU3BoZXJlKFxyXG4gICAgbmV3IFZlY3RvcjMoNCwgMSwgMCksXHJcbiAgICAxLjAsXHJcbiAgICBuZXcgTWV0YWwobmV3IFZlY3RvcjMoMC43LCAwLjYsIDAuNSksIDAuMClcclxuICApXHJcblxyXG4gIHJldHVybiBuZXcgSGl0YWJsZUxpc3QoaGl0TGlzdCwgaSlcclxufVxyXG5cclxubGV0IHNjZW5lID0gUmFuZG9tU2NlbmUoMTAwKVxyXG5cclxuZnVuY3Rpb24gQ29sb3IocjogUmF5LCB3b3JsZDogSGl0YWJsZSwgZGVwdGg6IG51bWJlcik6IFZlY3RvcjMge1xyXG4gIGxldCBjb2wgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG5cclxuICBsZXQgYXR0ZW51YXRpb25TdW0gPSBuZXcgVmVjdG9yMygxLCAxLCAxKVxyXG4gIGZvciAobGV0IG4gPSAwOyBuIDwgTnVtYmVyLk1BWF9WQUxVRTsgbisrKSB7XHJcbiAgICBsZXQgcmVjID0gbmV3IEhpdFJlY29yZChcclxuICAgICAgMCxcclxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXHJcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICBuZXcgTGFtYmVydGlhbihuZXcgVmVjdG9yMygwLCAwLCAwKSlcclxuICAgIClcclxuICAgIGxldCBiSGl0ID0gd29ybGQuaGl0KHIsIDAuMDAxLCBOdW1iZXIuTUFYX1ZBTFVFLCByZWMpXHJcbiAgICBpZiAoIWJIaXQpIHtcclxuICAgICAgYnJlYWtcclxuICAgIH1cclxuICAgIGxldCBiU2NhdHRlciA9IHJlYy5tYXRlcmlhbC5zY2F0dGVyKHIsIHJlYylcclxuICAgIGxldCBzY2F0dGVyZWQgPSByZWMubWF0ZXJpYWwuc2NhdHRlcmVkXHJcbiAgICBsZXQgYXR0ZW51YXRpb24gPSByZWMubWF0ZXJpYWwuYXR0ZW51YXRpb25cclxuICAgIGlmIChiU2NhdHRlciAmJiBkZXB0aCA8IDUwKSB7XHJcbiAgICAgIGRlcHRoKytcclxuICAgICAgciA9IHNjYXR0ZXJlZFxyXG4gICAgICBhdHRlbnVhdGlvblN1bS5pbXVsKGF0dGVudWF0aW9uKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXR0ZW51YXRpb25TdW0gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gICAgICBicmVha1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGV0IHVuaXREaXIgPSByLmRpcmVjdGlvbigpLnVuaXRWZWMzKClcclxuICBsZXQgdCA9IDAuNSAqICh1bml0RGlyLnkoKSArIDEuMClcclxuICBjb2wgPSBuZXcgVmVjdG9yMygxLjAsIDEuMCwgMS4wKVxyXG4gICAgLm11bCgxLjAgLSB0KVxyXG4gICAgLmFkZChuZXcgVmVjdG9yMygwLjUsIDAuNywgMS4wKS5tdWwodCkpXHJcbiAgY29sLmltdWwoYXR0ZW51YXRpb25TdW0pXHJcblxyXG4gIHJldHVybiBjb2xcclxufVxyXG5cclxuY3R4Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICBsZXQgcGFyYW0gPSBtZXNzYWdlLmRhdGFcclxuICBsZXQgaWQgPSBwYXJhbS5pZFxyXG4gIGxldCBzdGFydCA9IHBhcmFtLnN0YXJ0XHJcbiAgbGV0IGVuZCA9IHBhcmFtLmVuZFxyXG4gIGxldCBlbmRNYXggPSBwYXJhbS5lbmRNYXhcclxuXHJcbiAgbGV0IG54ID0gcGFyYW0ud2lkdGhcclxuICBsZXQgbnkgPSBwYXJhbS5oZWlnaHRcclxuICBsZXQgbnMgPSBwYXJhbS5zYW1wbGluZ051bVxyXG5cclxuICAvLyBwcm9jZXNzIGVuZFxyXG4gIGlmIChlbmQgPiBlbmRNYXgpIHtcclxuICAgIGVuZCA9IGVuZE1heFxyXG4gIH1cclxuXHJcbiAgLy8gY2FtZXJhXHJcbiAgbGV0IGxvb2tGcm9tID0gbmV3IFZlY3RvcjMoMTMsIDIsIDMpXHJcbiAgbGV0IGxvb2tBdCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgbGV0IHZ1cCA9IG5ldyBWZWN0b3IzKDAsIDEsIDApXHJcbiAgbGV0IHZmb3YgPSAyMFxyXG4gIGxldCBhc3BlY3QgPSBueCAvIG55XHJcbiAgbGV0IGFwZXJ0dXJlID0gMC4xXHJcbiAgbGV0IGZvY3VzRGlzdCA9IDEwLjBcclxuICBsZXQgY2FtID0gbmV3IENhbWVyYShsb29rRnJvbSwgbG9va0F0LCB2dXAsIHZmb3YsIGFzcGVjdCwgYXBlcnR1cmUsIGZvY3VzRGlzdClcclxuXHJcbiAgbGV0IGNvbEFycmF5ID0gbmV3IEFycmF5PE51bWJlcj4oKVxyXG5cclxuICBmb3IgKGxldCBqID0gc3RhcnQ7IGogPD0gZW5kOyBqKyspIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbng7IGkrKykge1xyXG4gICAgICBsZXQgY29sID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCBuczsgcysrKSB7XHJcbiAgICAgICAgbGV0IHUgPSAoaSArIE1hdGgucmFuZG9tKCkpIC8gbnhcclxuICAgICAgICBsZXQgdiA9IChueSAtIDEgLSAoaiArIE1hdGgucmFuZG9tKCkpKSAvIG55XHJcbiAgICAgICAgbGV0IHIgPSBjYW0uZ2V0UmF5KHUsIHYpXHJcbiAgICAgICAgY29sLmlhZGQoQ29sb3Iociwgc2NlbmUsIDApKVxyXG4gICAgICB9XHJcbiAgICAgIGNvbC5pZGl2KG5zKVxyXG4gICAgICBjb2wgPSBjb2wuZ2FtbWEyKClcclxuXHJcbiAgICAgIGNvbEFycmF5LnB1c2goTWF0aC5mbG9vcigyNTUuOTkgKiBjb2wucigpKSlcclxuICAgICAgY29sQXJyYXkucHVzaChNYXRoLmZsb29yKDI1NS45OSAqIGNvbC5nKCkpKVxyXG4gICAgICBjb2xBcnJheS5wdXNoKE1hdGguZmxvb3IoMjU1Ljk5ICogY29sLmIoKSkpXHJcbiAgICAgIGNvbEFycmF5LnB1c2goMjU1KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3R4LnBvc3RNZXNzYWdlKHtcclxuICAgIGNvbDogY29sQXJyYXksXHJcbiAgICBzdGFydFZhbDogc3RhcnQsXHJcbiAgICBlbmRWYWw6IGVuZCxcclxuICAgIGlkOiBpZCxcclxuICAgIGVuZE1heFZhbDogZW5kTWF4XHJcbiAgfSlcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9