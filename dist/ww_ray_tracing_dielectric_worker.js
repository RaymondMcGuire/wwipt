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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/worker/ww-ray-tracing-dielectric.worker.ts");
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

/***/ "./src/worker/ww-ray-tracing-dielectric.worker.ts":
/*!********************************************************!*\
  !*** ./src/worker/ww-ray-tracing-dielectric.worker.ts ***!
  \********************************************************/
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
  } // object


  var lookFrom = new vector3_1.Vector3(3, 3, 2);
  var lookAt = new vector3_1.Vector3(0, 0, -1);
  var vup = new vector3_1.Vector3(0, 1, 0);
  var vfov = 20;
  var aspect = nx / ny;
  var aperture = 2.0;
  var focusDist = lookFrom.sub(lookAt).length();
  var cam = new camera_1.Camera(lookFrom, lookAt, vup, vfov, aspect, aperture, focusDist);
  var list = new Array(5);
  list[0] = new sphere_1.Sphere(new vector3_1.Vector3(0, 0, -1), 0.5, new lambertian_1.Lambertian(new vector3_1.Vector3(0.1, 0.2, 0.5)));
  list[1] = new sphere_1.Sphere(new vector3_1.Vector3(0, -100.5, -1), 100, new lambertian_1.Lambertian(new vector3_1.Vector3(0.8, 0.8, 0.0)));
  list[2] = new sphere_1.Sphere(new vector3_1.Vector3(1, 0, -1), 0.5, new metal_1.Metal(new vector3_1.Vector3(0.8, 0.6, 0.2), 0.3));
  list[3] = new sphere_1.Sphere(new vector3_1.Vector3(-1, 0, -1), 0.5, new dielectric_1.Dielectric(1.5));
  list[4] = new sphere_1.Sphere(new vector3_1.Vector3(-1, 0, -1), -0.45, new dielectric_1.Dielectric(1.5));
  var world = new hitable_list_1.HitableList(list, 5);
  var colArray = new Array();

  for (var j = start; j <= end; j++) {
    for (var i = 0; i < nx; i++) {
      var col = new vector3_1.Vector3(0, 0, 0);

      for (var s = 0; s < ns; s++) {
        var u = (i + Math.random()) / nx;
        var v = (ny - 1 - (j + Math.random())) / ny;
        var r = cam.getRay(u, v);
        col.iadd(Color(r, world, 0));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC9tYXRoX3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvY2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9kaWVsZWN0cmljLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9oaXRhYmxlLWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2hpdGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2xhbWJlcnRpYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL21hdGVyaWFsLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9tZXRhbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvcmF5LnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9zcGhlcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci93dy1yYXktdHJhY2luZy1kaWVsZWN0cmljLndvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNB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QyxLQUFMLENBQVcsU0FBUyxHQUFHLENBQUMsQ0FBSixFQUFwQixDQUFkO0FBQ0EsY0FBUSxDQUFDLElBQVQsQ0FBYyxHQUFkO0FBQ0Q7QUFDRjs7QUFFRCxLQUFHLENBQUMsV0FBSixDQUFnQjtBQUNkLE9BQUcsRUFBRSxRQURTO0FBRWQsWUFBUSxFQUFFLEtBRkk7QUFHZCxVQUFNLEVBQUUsR0FITTtBQUlkLE1BQUUsRUFBRSxFQUpVO0FBS2QsYUFBUyxFQUFFO0FBTEcsR0FBaEI7QUFPRCxDQTFFRCxDIiwiZmlsZSI6Ind3X3JheV90cmFjaW5nX2RpZWxlY3RyaWNfd29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJkaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy93b3JrZXIvd3ctcmF5LXRyYWNpbmctZGllbGVjdHJpYy53b3JrZXIudHNcIik7XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqICBtYXRoX3V0aWxzLnRzXHJcbiAqICBzaW1wbGUgbWF0aCBmdW5jdGlvbnNcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFic01heCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiB4ICogeCA+IHkgKiB5ID8geCA6IHlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFic01pbih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiB4ICogeCA8IHkgKiB5ID8geCA6IHlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG11bGRlYyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiAoeCAqIDEwICogKHkgKiAxMCkpIC8gMTAwXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXZkZWMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICByZXR1cm4gKHggKiAxMCkgLyAoeSAqIDEwKSAvIDEwMFxyXG59XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICpcclxuICogIHZlY3Rvci50c1xyXG4gKiAgVC1EIHZlY3RvciBkYXRhXHJcbiAqICBUOnR5cGUsZGVmYXVsdCBzZXR0aW5nIGlzIG51bWJlclxyXG4gKiAgRDpkaW1lbnNpb25cclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5pbXBvcnQgeyBhYnNNYXgsIGFic01pbiB9IGZyb20gJy4vbWF0aF91dGlscydcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3Ige1xyXG4gIHByaXZhdGUgX2VsZW1lbnRzOiBBcnJheTxudW1iZXI+XHJcbiAgcHJpdmF0ZSBfZGltZW5zaW9uOiBudW1iZXJcclxuXHJcbiAgLy8gY29uc3RydWN0cyB2ZWN0b3Igd2l0aCBwYXJhbWV0ZXJzIG9yIHplcm9cclxuICBjb25zdHJ1Y3RvcihkaW1lbnNpb246IG51bWJlciwgcGFyYW1zPzogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgdGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uXHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAocGFyYW1zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgLy8gaW5pdCBuIGRpbWVuc2lvbiB2ZWN0b3IgZGF0YSxzZXR0aW5nIGFsbCAwXHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzID0gbmV3IEFycmF5PG51bWJlcj4oZGltZW5zaW9uKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBkaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzID0gbmV3IEFycmF5PG51bWJlcj4oZGltZW5zaW9uKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBwYXJhbXMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gcGFyYW1zW19pXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQocGFyYW1zOiBWZWN0b3IgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAocGFyYW1zLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHBhcmFtcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSBwYXJhbXMuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxuICBzZXRaZXJvKCkge1xyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRPbmUoKSB7XHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDFcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudHNcclxuICB9XHJcblxyXG4gIGF0KGlkeDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2luZGV4IGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRzW2lkeF1cclxuICB9XHJcblxyXG4gIGRvdChvdGhlcnM6IFZlY3RvciB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG90aGVycyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdvdGhlcnMgaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICBpZiAob3RoZXJzLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIHJldCArPSB0aGlzLl9lbGVtZW50c1tfaV0gKiBvdGhlcnMuZGF0YSgpW19pXVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxuXHJcbiAgbGVuZ3RoU3F1YXJlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKVxyXG4gIH1cclxuXHJcbiAgbGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbmd0aFNxdWFyZWQoKSlcclxuICB9XHJcblxyXG4gIG5vcm1hbGl6ZSgpIHtcclxuICAgIHRoaXMuaWRpdih0aGlzLmxlbmd0aCgpKVxyXG4gIH1cclxuXHJcbiAgc3VtKCkge1xyXG4gICAgbGV0IHJldCA9IDBcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgcmV0ICs9IHRoaXMuX2VsZW1lbnRzW19pXVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxuXHJcbiAgc2l6ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25cclxuICB9XHJcblxyXG4gIGF2ZygpIHtcclxuICAgIHJldHVybiB0aGlzLnN1bSgpIC8gdGhpcy5zaXplKClcclxuICB9XHJcblxyXG4gIG1pbigpIHtcclxuICAgIGxldCBtaW5WYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG5cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgbWluVmFsID0gTWF0aC5taW4obWluVmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWluVmFsXHJcbiAgfVxyXG5cclxuICBtYXgoKSB7XHJcbiAgICBsZXQgbWF4VmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgbWF4VmFsID0gTWF0aC5tYXgobWF4VmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWF4VmFsXHJcbiAgfVxyXG5cclxuICBhYnNtYXgoKSB7XHJcbiAgICBsZXQgYWJzTWF4VmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgYWJzTWF4VmFsID0gYWJzTWF4KGFic01heFZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFic01heFZhbFxyXG4gIH1cclxuXHJcbiAgYWJzbWluKCkge1xyXG4gICAgbGV0IGFic01pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIGFic01pblZhbCA9IGFic01pbihhYnNNaW5WYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBhYnNNaW5WYWxcclxuICB9XHJcblxyXG4gIGRpc3RhbmNlU3F1YXJlZFRvKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICBpZiAob3RoZXJzLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGxldCBkaWZmID0gdGhpcy5fZWxlbWVudHNbX2ldIC0gb3RoZXJzLmRhdGEoKVtfaV1cclxuICAgICAgcmV0ICs9IGRpZmYgKiBkaWZmXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxuXHJcbiAgZGlzdGFuY2VUbyhvdGhlcnM6IFZlY3Rvcikge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlU3F1YXJlZFRvKG90aGVycykpXHJcbiAgfVxyXG5cclxuICBpc0VxdWFsKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVycy5zaXplKCkpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xyXG4gICAgICBpZiAodGhpcy5hdChfaSkgIT09IG90aGVycy5hdChfaSkpIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICBpc1NpbWlsYXIob3RoZXJzOiBWZWN0b3IgfCB1bmRlZmluZWQsIGVwc2lsb246IG51bWJlcikge1xyXG4gICAgaWYgKG90aGVycyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2VcclxuICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXJzLnNpemUoKSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLmF0KF9pKSAtIG90aGVycy5hdChfaSkpID4gZXBzaWxvbikgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGFkZChwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKz0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICs9IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgc3ViKHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAtPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLT0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBtdWwocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAqPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIGRpdihwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLz0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGlmIChzID09PSAwKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAvPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIGlkaXYocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLmRpdihwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgaWFkZChwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMuYWRkKHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBpc3ViKHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5zdWIocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIGltdWwocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLm11bChwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgc2V0QXQoaWR4OiBudW1iZXIsIHZhbDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2VsZW1lbnRzW2lkeF0gPSB2YWxcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBwcm9qX3UodikgPSA8dSx2Pi88dix2PiB1XHJcbiAgICogQHBhcmFtIHVcclxuICAgKiBAcGFyYW0gdlxyXG4gICAqL1xyXG4gIHN0YXRpYyBwcm9qKHU6IFZlY3RvciwgdjogVmVjdG9yKSB7XHJcbiAgICByZXR1cm4gdS5tdWwodi5kb3QodSkgLyB1LmRvdCh1KSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi92ZWN0b3InXHJcblxyXG5leHBvcnQgY2xhc3MgVmVjdG9yMyBleHRlbmRzIFZlY3RvciB7XHJcbiAgY29uc3RydWN0b3IoZTE6IG51bWJlciwgZTI6IG51bWJlciwgZTM6IG51bWJlcikge1xyXG4gICAgc3VwZXIoMywgbmV3IEFycmF5PG51bWJlcj4oZTEsIGUyLCBlMykpXHJcbiAgfVxyXG5cclxuICB4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzBdXHJcbiAgfVxyXG4gIHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMV1cclxuICB9XHJcbiAgeigpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsyXVxyXG4gIH1cclxuICByKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzBdXHJcbiAgfVxyXG4gIGcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMV1cclxuICB9XHJcbiAgYigpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsyXVxyXG4gIH1cclxuXHJcbiAgaXNldCh2MzogVmVjdG9yMykge1xyXG4gICAgdGhpcy5kYXRhKClbMF0gPSB2My5yKClcclxuICAgIHRoaXMuZGF0YSgpWzFdID0gdjMuZygpXHJcbiAgICB0aGlzLmRhdGEoKVsyXSA9IHYzLmIoKVxyXG4gIH1cclxuXHJcbiAgc2V0KHYzOiBWZWN0b3IzKSB7XHJcbiAgICByZXR1cm4gc3VwZXIuc2V0KG5ldyBWZWN0b3IoMywgdjMuZGF0YSgpKSlcclxuICB9XHJcblxyXG4gIGFkZCh2MzogYW55KSB7XHJcbiAgICBsZXQgYWRkdiA9IHN1cGVyLmFkZCh2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhhZGR2LmRhdGEoKVswXSwgYWRkdi5kYXRhKClbMV0sIGFkZHYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgc3ViKHYzOiBhbnkpIHtcclxuICAgIGxldCBzdWJ2ID0gc3VwZXIuc3ViKHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKHN1YnYuZGF0YSgpWzBdLCBzdWJ2LmRhdGEoKVsxXSwgc3Vidi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBtdWwodjM6IGFueSkge1xyXG4gICAgbGV0IG11bHYgPSBzdXBlci5tdWwodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMobXVsdi5kYXRhKClbMF0sIG11bHYuZGF0YSgpWzFdLCBtdWx2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIGRpdih2MzogYW55KSB7XHJcbiAgICBsZXQgZGl2diA9IHN1cGVyLmRpdih2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhkaXZ2LmRhdGEoKVswXSwgZGl2di5kYXRhKClbMV0sIGRpdnYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgZG90KHYzOiBWZWN0b3IzKSB7XHJcbiAgICByZXR1cm4gc3VwZXIuZG90KG5ldyBWZWN0b3IoMywgdjMuZGF0YSgpKSlcclxuICB9XHJcblxyXG4gIGNyb3NzKHYzOiBWZWN0b3IzKSB7XHJcbiAgICBsZXQgbnYgPSBuZXcgVmVjdG9yKDMsIHRoaXMuZGF0YSgpKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKFxyXG4gICAgICBudi5kYXRhKClbMV0gKiB2My5kYXRhKClbMl0gLSBudi5kYXRhKClbMl0gKiB2My5kYXRhKClbMV0sXHJcbiAgICAgIG52LmRhdGEoKVsyXSAqIHYzLmRhdGEoKVswXSAtIG52LmRhdGEoKVswXSAqIHYzLmRhdGEoKVsyXSxcclxuICAgICAgbnYuZGF0YSgpWzBdICogdjMuZGF0YSgpWzFdIC0gbnYuZGF0YSgpWzFdICogdjMuZGF0YSgpWzBdXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICB1bml0VmVjMygpOiBWZWN0b3IzIHtcclxuICAgIGxldCBudiA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXHJcbiAgICBudi5ub3JtYWxpemUoKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKG52LmRhdGEoKVswXSwgbnYuZGF0YSgpWzFdLCBudi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBnYW1tYTIoKTogVmVjdG9yMyB7XHJcbiAgICBsZXQgdHYgPSBuZXcgVmVjdG9yKDMsIHRoaXMuZGF0YSgpKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKFxyXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMCkpLFxyXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMSkpLFxyXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMikpXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBDYW1lcmEge1xyXG4gIGxvd2VyTGVmdENvcm5lcjogVmVjdG9yM1xyXG4gIGhvcml6b250YWw6IFZlY3RvcjNcclxuICB2ZXJ0aWNhbDogVmVjdG9yM1xyXG4gIG9yaWdpbjogVmVjdG9yM1xyXG5cclxuICBsZW5zUmFkaXVzOiBudW1iZXJcclxuXHJcbiAgdzogVmVjdG9yM1xyXG4gIHU6IFZlY3RvcjNcclxuICB2OiBWZWN0b3IzXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBsb29rRnJvbTogVmVjdG9yMyxcclxuICAgIGxvb2tBdDogVmVjdG9yMyxcclxuICAgIHZ1cDogVmVjdG9yMyxcclxuICAgIHZmb3Y6IG51bWJlcixcclxuICAgIGFzcGVjdDogbnVtYmVyLFxyXG4gICAgYXBlcnR1cmU6IG51bWJlcixcclxuICAgIGZvY3VzRGlzdDogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLmxlbnNSYWRpdXMgPSBhcGVydHVyZSAvIDJcclxuXHJcbiAgICBsZXQgdGhldGEgPSAodmZvdiAqIE1hdGguUEkpIC8gMTgwXHJcbiAgICBsZXQgaGFsZkhlaWdodCA9IE1hdGgudGFuKHRoZXRhIC8gMilcclxuICAgIGxldCBoYWxmV2lkdGggPSBoYWxmSGVpZ2h0ICogYXNwZWN0XHJcblxyXG4gICAgdGhpcy5vcmlnaW4gPSBsb29rRnJvbVxyXG4gICAgdGhpcy53ID0gbG9va0Zyb20uc3ViKGxvb2tBdCkudW5pdFZlYzMoKVxyXG4gICAgdGhpcy51ID0gdnVwLmNyb3NzKHRoaXMudykudW5pdFZlYzMoKVxyXG4gICAgdGhpcy52ID0gdGhpcy53LmNyb3NzKHRoaXMudSlcclxuXHJcbiAgICB0aGlzLmxvd2VyTGVmdENvcm5lciA9IHRoaXMub3JpZ2luXHJcbiAgICAgIC5zdWIodGhpcy51Lm11bChoYWxmV2lkdGggKiBmb2N1c0Rpc3QpKVxyXG4gICAgICAuc3ViKHRoaXMudi5tdWwoaGFsZkhlaWdodCAqIGZvY3VzRGlzdCkpXHJcbiAgICAgIC5zdWIodGhpcy53Lm11bChmb2N1c0Rpc3QpKVxyXG4gICAgdGhpcy5ob3Jpem9udGFsID0gdGhpcy51Lm11bCgyICogaGFsZldpZHRoICogZm9jdXNEaXN0KVxyXG4gICAgdGhpcy52ZXJ0aWNhbCA9IHRoaXMudi5tdWwoMiAqIGhhbGZIZWlnaHQgKiBmb2N1c0Rpc3QpXHJcbiAgfVxyXG5cclxuICBnZXRSYXkodTogbnVtYmVyLCB2OiBudW1iZXIpIHtcclxuICAgIGxldCByZCA9IFV0aWxzLlJhbmRvbUluVW5pdERpc2soKS5tdWwodGhpcy5sZW5zUmFkaXVzKVxyXG4gICAgbGV0IG9mZnNldCA9IHRoaXMudS5tdWwocmQueCgpKS5hZGQodGhpcy52Lm11bChyZC55KCkpKVxyXG4gICAgcmV0dXJuIG5ldyBSYXkoXHJcbiAgICAgIHRoaXMub3JpZ2luLmFkZChvZmZzZXQpLFxyXG4gICAgICB0aGlzLmxvd2VyTGVmdENvcm5lclxyXG4gICAgICAgIC5hZGQodGhpcy5ob3Jpem9udGFsLm11bCh1KSlcclxuICAgICAgICAuYWRkKHRoaXMudmVydGljYWwubXVsKHYpKVxyXG4gICAgICAgIC5zdWIodGhpcy5vcmlnaW4pXHJcbiAgICAgICAgLnN1YihvZmZzZXQpXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWwnXHJcblxyXG5leHBvcnQgY2xhc3MgRGllbGVjdHJpYyBleHRlbmRzIE1hdGVyaWFsIHtcclxuICBzY2F0dGVyZWQ6IFJheVxyXG4gIGF0dGVudWF0aW9uOiBWZWN0b3IzXHJcbiAgcmVmSWR4OiBudW1iZXJcclxuXHJcbiAgY29uc3RydWN0b3Iocmk6IG51bWJlcikge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5yZWZJZHggPSByaVxyXG4gICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygwLCAwLCAwKSlcclxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gIH1cclxuXHJcbiAgc2NhdHRlcihyOiBSYXksIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgb3V0d2FyZE5vcm1hbCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgICBsZXQgcmVmcmFjdGVkID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuXHJcbiAgICBsZXQgbmlPdmVyTnQgPSAwXHJcblxyXG4gICAgbGV0IHJlZmxlY3RlZCA9IFV0aWxzLnJlZmxlY3Qoci5kaXJlY3Rpb24oKS51bml0VmVjMygpLCByZWMubm9ybWFsKVxyXG4gICAgbGV0IHJlZmxlY3RQcm9iID0gMFxyXG4gICAgbGV0IGNvc2luZSA9IDBcclxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMygxLCAxLCAxKVxyXG5cclxuICAgIGlmIChyLmRpcmVjdGlvbigpLmRvdChyZWMubm9ybWFsKSA+IDApIHtcclxuICAgICAgb3V0d2FyZE5vcm1hbCA9IHJlYy5ub3JtYWwubXVsKC0xKVxyXG4gICAgICBuaU92ZXJOdCA9IHRoaXMucmVmSWR4XHJcbiAgICAgIGNvc2luZSA9XHJcbiAgICAgICAgKHRoaXMucmVmSWR4ICogci5kaXJlY3Rpb24oKS5kb3QocmVjLm5vcm1hbCkpIC8gci5kaXJlY3Rpb24oKS5sZW5ndGgoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0d2FyZE5vcm1hbCA9IHJlYy5ub3JtYWxcclxuICAgICAgbmlPdmVyTnQgPSAxLjAgLyB0aGlzLnJlZklkeFxyXG4gICAgICBjb3NpbmUgPSAtci5kaXJlY3Rpb24oKS5kb3QocmVjLm5vcm1hbCkgLyByLmRpcmVjdGlvbigpLmxlbmd0aCgpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFV0aWxzLnJlZnJhY3Qoci5kaXJlY3Rpb24oKSwgb3V0d2FyZE5vcm1hbCwgbmlPdmVyTnQsIHJlZnJhY3RlZCkpIHtcclxuICAgICAgcmVmbGVjdFByb2IgPSBVdGlscy5zY2hsaWNrKGNvc2luZSwgdGhpcy5yZWZJZHgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZWZsZWN0UHJvYiA9IDEuMFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgcmVmbGVjdFByb2IpIHtcclxuICAgICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KHJlYy5wLCByZWZsZWN0ZWQpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkocmVjLnAsIHJlZnJhY3RlZClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIaXRhYmxlLCBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IExhbWJlcnRpYW4gfSBmcm9tICcuL2xhbWJlcnRpYW4nXHJcblxyXG5leHBvcnQgY2xhc3MgSGl0YWJsZUxpc3QgZXh0ZW5kcyBIaXRhYmxlIHtcclxuICBsaXN0OiBBcnJheTxIaXRhYmxlPlxyXG4gIGxpc3RTaXplOiBudW1iZXJcclxuICBjb25zdHJ1Y3RvcihsOiBBcnJheTxIaXRhYmxlPiwgbjogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmxpc3QgPSBsXHJcbiAgICB0aGlzLmxpc3RTaXplID0gblxyXG4gIH1cclxuXHJcbiAgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgdG1wUmVjID0gbmV3IEhpdFJlY29yZChcclxuICAgICAgMCxcclxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXHJcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICBuZXcgTGFtYmVydGlhbihuZXcgVmVjdG9yMygwLCAwLCAwKSlcclxuICAgIClcclxuICAgIGxldCBoaXRBbnl0aGluZyA9IGZhbHNlXHJcbiAgICBsZXQgY2xvc2VzdFNvRmFyID0gdE1heFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3RTaXplOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMubGlzdFtpXS5oaXQociwgdE1pbiwgY2xvc2VzdFNvRmFyLCB0bXBSZWMpKSB7XHJcbiAgICAgICAgaGl0QW55dGhpbmcgPSB0cnVlXHJcbiAgICAgICAgY2xvc2VzdFNvRmFyID0gdG1wUmVjLnRcclxuICAgICAgICByZWMudCA9IHRtcFJlYy50XHJcbiAgICAgICAgcmVjLnAgPSB0bXBSZWMucFxyXG4gICAgICAgIHJlYy5ub3JtYWwgPSB0bXBSZWMubm9ybWFsXHJcbiAgICAgICAgcmVjLm1hdGVyaWFsID0gdG1wUmVjLm1hdGVyaWFsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBoaXRBbnl0aGluZ1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXHJcblxyXG5leHBvcnQgY2xhc3MgSGl0UmVjb3JkIHtcclxuICB0OiBudW1iZXJcclxuICBwOiBWZWN0b3IzXHJcbiAgbm9ybWFsOiBWZWN0b3IzXHJcbiAgbWF0ZXJpYWw6IE1hdGVyaWFsXHJcblxyXG4gIGNvbnN0cnVjdG9yKF90OiBudW1iZXIsIF9wOiBWZWN0b3IzLCBfbm9ybWFsOiBWZWN0b3IzLCBfbWF0ZXJpYWw6IE1hdGVyaWFsKSB7XHJcbiAgICB0aGlzLnQgPSBfdFxyXG4gICAgdGhpcy5wID0gX3BcclxuICAgIHRoaXMubm9ybWFsID0gX25vcm1hbFxyXG4gICAgdGhpcy5tYXRlcmlhbCA9IF9tYXRlcmlhbFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEhpdGFibGUge1xyXG4gIGFic3RyYWN0IGhpdChyOiBSYXksIHRNaW46IG51bWJlciwgdE1heDogbnVtYmVyLCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW5cclxufVxyXG4iLCJpbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi91dGlsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIExhbWJlcnRpYW4gZXh0ZW5kcyBNYXRlcmlhbCB7XHJcbiAgYWxiZWRvOiBWZWN0b3IzXHJcbiAgc2NhdHRlcmVkOiBSYXlcclxuICBhdHRlbnVhdGlvbjogVmVjdG9yM1xyXG5cclxuICBjb25zdHJ1Y3RvcihhOiBWZWN0b3IzKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmFsYmVkbyA9IGFcclxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICB9XHJcblxyXG4gIHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHRhcmdldCA9IHJlYy5wLmFkZChyZWMubm9ybWFsKS5hZGQoVXRpbHMuUmFuZG9tSW5Vbml0U3BoZXJlKCkpXHJcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkocmVjLnAsIHRhcmdldC5zdWIocmVjLnApKVxyXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKFxyXG4gICAgICB0aGlzLmFsYmVkby54KCksXHJcbiAgICAgIHRoaXMuYWxiZWRvLnkoKSxcclxuICAgICAgdGhpcy5hbGJlZG8ueigpXHJcbiAgICApXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0ZXJpYWwge1xyXG4gIGFic3RyYWN0IHNjYXR0ZXJlZDogUmF5XHJcbiAgYWJzdHJhY3QgYXR0ZW51YXRpb246IFZlY3RvcjNcclxuICBhYnN0cmFjdCBzY2F0dGVyKHI6IFJheSwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuXHJcbn1cclxuIiwiaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXRhbCBleHRlbmRzIE1hdGVyaWFsIHtcclxuICBhbGJlZG86IFZlY3RvcjNcclxuICBzY2F0dGVyZWQ6IFJheVxyXG4gIGF0dGVudWF0aW9uOiBWZWN0b3IzXHJcbiAgZnV6ejogbnVtYmVyXHJcblxyXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMsIGY6IG51bWJlcikge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5hbGJlZG8gPSBhXHJcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDApKVxyXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcblxyXG4gICAgaWYgKGYgPCAxKSB0aGlzLmZ1enogPSBmXHJcbiAgICBlbHNlIHRoaXMuZnV6eiA9IDFcclxuICB9XHJcblxyXG4gIHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHJlZmxlY3RlZCA9IFV0aWxzLnJlZmxlY3Qoci5kaXJlY3Rpb24oKS51bml0VmVjMygpLCByZWMubm9ybWFsKVxyXG4gICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KFxyXG4gICAgICByZWMucCxcclxuICAgICAgcmVmbGVjdGVkLmFkZChVdGlscy5SYW5kb21JblVuaXRTcGhlcmUoKS5tdWwodGhpcy5mdXp6KSlcclxuICAgIClcclxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMyhcclxuICAgICAgdGhpcy5hbGJlZG8ueCgpLFxyXG4gICAgICB0aGlzLmFsYmVkby55KCksXHJcbiAgICAgIHRoaXMuYWxiZWRvLnooKVxyXG4gICAgKVxyXG4gICAgcmV0dXJuIHRoaXMuc2NhdHRlcmVkLmRpcmVjdGlvbigpLmRvdChyZWMubm9ybWFsKSA+IDBcclxuICB9XHJcbn1cclxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKlxyXG4gKiAgcmF5LnRzXHJcbiAqICByYXkgZnVuY3Rpb24gZm9yIHAodCkgPSBBICsgdCAqIEJcclxuICogIFQ6dHlwZSxkZWZhdWx0IHNldHRpbmcgaXMgbnVtYmVyXHJcbiAqICBEOmRpbWVuc2lvblxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuXHJcbmV4cG9ydCBjbGFzcyBSYXkge1xyXG4gIHB1YmxpYyBfQTogVmVjdG9yM1xyXG4gIHB1YmxpYyBfQjogVmVjdG9yM1xyXG5cclxuICBjb25zdHJ1Y3RvcihhOiBWZWN0b3IzLCBiOiBWZWN0b3IzKSB7XHJcbiAgICB0aGlzLl9BID0gYVxyXG4gICAgdGhpcy5fQiA9IGJcclxuICB9XHJcblxyXG4gIG9yaWdpbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9BXHJcbiAgfVxyXG4gIGRpcmVjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9CXHJcbiAgfVxyXG4gIHBvaW50QXRQYXJhbSh0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLl9BLmFkZCh0aGlzLl9CLm11bCh0KSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXHJcblxyXG5leHBvcnQgY2xhc3MgU3BoZXJlIGV4dGVuZHMgSGl0YWJsZSB7XHJcbiAgY2VudGVyOiBWZWN0b3IzXHJcbiAgcmFkaXVzOiBudW1iZXJcclxuICBtYXRlcmlhbDogTWF0ZXJpYWxcclxuXHJcbiAgY29uc3RydWN0b3IoY2VuOiBWZWN0b3IzLCByOiBudW1iZXIsIG1hdDogTWF0ZXJpYWwpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuY2VudGVyID0gY2VuXHJcbiAgICB0aGlzLnJhZGl1cyA9IHJcclxuICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRcclxuICB9XHJcblxyXG4gIGhpdChyOiBSYXksIHRNaW46IG51bWJlciwgdE1heDogbnVtYmVyLCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IG9jID0gci5vcmlnaW4oKS5zdWIodGhpcy5jZW50ZXIpXHJcbiAgICBsZXQgYSA9IHIuZGlyZWN0aW9uKCkuZG90KHIuZGlyZWN0aW9uKCkpXHJcbiAgICBsZXQgYiA9IG9jLmRvdChyLmRpcmVjdGlvbigpKVxyXG4gICAgbGV0IGMgPSBvYy5kb3Qob2MpIC0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1c1xyXG4gICAgbGV0IGRpc2NyaW1pbmFudCA9IGIgKiBiIC0gYSAqIGNcclxuICAgIGlmIChkaXNjcmltaW5hbnQgPiAwKSB7XHJcbiAgICAgIGxldCB0bXAgPSAoLWIgLSBNYXRoLnNxcnQoYiAqIGIgLSBhICogYykpIC8gYVxyXG4gICAgICBpZiAodG1wIDwgdE1heCAmJiB0bXAgPiB0TWluKSB7XHJcbiAgICAgICAgcmVjLnQgPSB0bXBcclxuICAgICAgICByZWMucCA9IHIucG9pbnRBdFBhcmFtKHJlYy50KVxyXG4gICAgICAgIHJlYy5ub3JtYWwgPSByZWMucC5zdWIodGhpcy5jZW50ZXIpLmRpdih0aGlzLnJhZGl1cylcclxuICAgICAgICByZWMubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG5cclxuICAgICAgdG1wID0gKC1iICsgTWF0aC5zcXJ0KGIgKiBiIC0gYSAqIGMpKSAvIGFcclxuICAgICAgaWYgKHRtcCA8IHRNYXggJiYgdG1wID4gdE1pbikge1xyXG4gICAgICAgIHJlYy50ID0gdG1wXHJcbiAgICAgICAgcmVjLnAgPSByLnBvaW50QXRQYXJhbShyZWMudClcclxuICAgICAgICByZWMubm9ybWFsID0gcmVjLnAuc3ViKHRoaXMuY2VudGVyKS5kaXYodGhpcy5yYWRpdXMpXHJcbiAgICAgICAgcmVjLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbFxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi9lZ21hdGgvdmVjdG9yMydcclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgVXRpbHMge1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb21JblVuaXRTcGhlcmUoKSB7XHJcbiAgICBsZXQgcCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgICBkbyB7XHJcbiAgICAgIHAgPSBuZXcgVmVjdG9yMyhNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpKVxyXG4gICAgICAgIC5tdWwoMilcclxuICAgICAgICAuc3ViKG5ldyBWZWN0b3IzKDEsIDEsIDEpKVxyXG4gICAgfSB3aGlsZSAocC5sZW5ndGhTcXVhcmVkKCkgPj0gMS4wKVxyXG4gICAgcmV0dXJuIHBcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb21JblVuaXREaXNrKCkge1xyXG4gICAgbGV0IHAgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gICAgZG8ge1xyXG4gICAgICBwID0gbmV3IFZlY3RvcjMoTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSlcclxuICAgICAgICAubXVsKDIpXHJcbiAgICAgICAgLnN1YihuZXcgVmVjdG9yMygxLCAxLCAwKSlcclxuICAgIH0gd2hpbGUgKHAubGVuZ3RoU3F1YXJlZCgpID49IDEuMClcclxuICAgIHJldHVybiBwXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gcmVmbGVjdCh2OiBWZWN0b3IzLCBuOiBWZWN0b3IzKSB7XHJcbiAgICByZXR1cm4gdi5zdWIobi5tdWwoMiAqIHYuZG90KG4pKSlcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBzY2hsaWNrKGNvc2luZTogbnVtYmVyLCByZWZJZHg6IG51bWJlcikge1xyXG4gICAgbGV0IHIwID0gKDEgLSByZWZJZHgpIC8gKDEgKyByZWZJZHgpXHJcbiAgICByMCA9IHIwICogcjBcclxuICAgIHJldHVybiByMCArICgxIC0gcjApICogTWF0aC5wb3coMSAtIGNvc2luZSwgNSlcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiByZWZyYWN0KFxyXG4gICAgdjogVmVjdG9yMyxcclxuICAgIG46IFZlY3RvcjMsXHJcbiAgICBuaU92ZXJOdDogbnVtYmVyLFxyXG4gICAgcmVmcmFjdGVkOiBWZWN0b3IzXHJcbiAgKSB7XHJcbiAgICBsZXQgdXYgPSB2LnVuaXRWZWMzKClcclxuICAgIGxldCBkdCA9IHV2LmRvdChuKVxyXG4gICAgbGV0IGRpc2NyaW1pbmFudCA9IDEuMCAtIG5pT3Zlck50ICogbmlPdmVyTnQgKiAoMSAtIGR0ICogZHQpXHJcbiAgICBpZiAoZGlzY3JpbWluYW50ID4gMCkge1xyXG4gICAgICByZWZyYWN0ZWQuc2V0KFxyXG4gICAgICAgIHV2XHJcbiAgICAgICAgICAuc3ViKG4ubXVsKGR0KSlcclxuICAgICAgICAgIC5tdWwobmlPdmVyTnQpXHJcbiAgICAgICAgICAuc3ViKG4ubXVsKE1hdGguc3FydChkaXNjcmltaW5hbnQpKSlcclxuICAgICAgKVxyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gUmFuZG9tKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggKyAxIC0gbWluKSkgKyBtaW5cclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBXcml0ZTJDYW52YXMoXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICBpbWFnZUJ1ZjogQXJyYXk8bnVtYmVyPixcclxuICAgIHc6IG51bWJlcixcclxuICAgIGg6IG51bWJlclxyXG4gICkge1xyXG4gICAgbGV0IGNhbnZhc0ltYWdlID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdywgaClcclxuICAgIGxldCBkYXRhID0gY2FudmFzSW1hZ2UuZGF0YVxyXG4gICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZGF0YS5sZW5ndGg7IGlkeCArPSA0KSB7XHJcbiAgICAgIGRhdGFbaWR4ICsgMF0gPSBpbWFnZUJ1ZltpZHggKyAwXVxyXG4gICAgICBkYXRhW2lkeCArIDFdID0gaW1hZ2VCdWZbaWR4ICsgMV1cclxuICAgICAgZGF0YVtpZHggKyAyXSA9IGltYWdlQnVmW2lkeCArIDJdXHJcbiAgICAgIGRhdGFbaWR4ICsgM10gPSBpbWFnZUJ1ZltpZHggKyAzXVxyXG4gICAgfVxyXG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEoY2FudmFzSW1hZ2UsIDAsIDApXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gR2VuZXJhdGVOb2lzZShcclxuICAgIGltYWdlQnVmZmVyOiBBcnJheTxudW1iZXI+LFxyXG4gICAgc3RhcnRJZHg6IG51bWJlcixcclxuICAgIGVuZElkeDogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IHN0YXJ0SWR4OyBpbmRleCA8IGVuZElkeDsgaW5kZXggKz0gNCkge1xyXG4gICAgICBsZXQgciA9IFJhbmRvbSgwLCAyNTUpXHJcbiAgICAgIGxldCBnID0gUmFuZG9tKDAsIDI1NSlcclxuICAgICAgbGV0IGIgPSBSYW5kb20oMCwgMjU1KVxyXG5cclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXhdID0gclxyXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleCArIDFdID0gZ1xyXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleCArIDJdID0gYlxyXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleCArIDNdID0gMjU1XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW1hZ2VCdWZmZXJcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuLi9lZ3JlbmRlci9yYXknXHJcbmltcG9ydCB7IEhpdGFibGUsIEhpdFJlY29yZCB9IGZyb20gJy4uL2VncmVuZGVyL2hpdGFibGUnXHJcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gJy4uL2VncmVuZGVyL2NhbWVyYSdcclxuaW1wb3J0IHsgU3BoZXJlIH0gZnJvbSAnLi4vZWdyZW5kZXIvc3BoZXJlJ1xyXG5pbXBvcnQgeyBIaXRhYmxlTGlzdCB9IGZyb20gJy4uL2VncmVuZGVyL2hpdGFibGUtbGlzdCdcclxuaW1wb3J0IHsgTGFtYmVydGlhbiB9IGZyb20gJy4uL2VncmVuZGVyL2xhbWJlcnRpYW4nXHJcbmltcG9ydCB7IE1ldGFsIH0gZnJvbSAnLi4vZWdyZW5kZXIvbWV0YWwnXHJcbmltcG9ydCB7IERpZWxlY3RyaWMgfSBmcm9tICcuLi9lZ3JlbmRlci9kaWVsZWN0cmljJ1xyXG5cclxuY29uc3QgY3R4OiBXb3JrZXIgPSBzZWxmIGFzIGFueVxyXG5cclxuZnVuY3Rpb24gQ29sb3IocjogUmF5LCB3b3JsZDogSGl0YWJsZSwgZGVwdGg6IG51bWJlcik6IFZlY3RvcjMge1xyXG4gIGxldCBjb2wgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG5cclxuICBsZXQgYXR0ZW51YXRpb25TdW0gPSBuZXcgVmVjdG9yMygxLCAxLCAxKVxyXG4gIGZvciAobGV0IG4gPSAwOyBuIDwgTnVtYmVyLk1BWF9WQUxVRTsgbisrKSB7XHJcbiAgICBsZXQgcmVjID0gbmV3IEhpdFJlY29yZChcclxuICAgICAgMCxcclxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXHJcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICBuZXcgTGFtYmVydGlhbihuZXcgVmVjdG9yMygwLCAwLCAwKSlcclxuICAgIClcclxuICAgIGxldCBiSGl0ID0gd29ybGQuaGl0KHIsIDAuMDAxLCBOdW1iZXIuTUFYX1ZBTFVFLCByZWMpXHJcbiAgICBpZiAoIWJIaXQpIHtcclxuICAgICAgYnJlYWtcclxuICAgIH1cclxuICAgIGxldCBiU2NhdHRlciA9IHJlYy5tYXRlcmlhbC5zY2F0dGVyKHIsIHJlYylcclxuICAgIGxldCBzY2F0dGVyZWQgPSByZWMubWF0ZXJpYWwuc2NhdHRlcmVkXHJcbiAgICBsZXQgYXR0ZW51YXRpb24gPSByZWMubWF0ZXJpYWwuYXR0ZW51YXRpb25cclxuICAgIGlmIChiU2NhdHRlciAmJiBkZXB0aCA8IDUwKSB7XHJcbiAgICAgIGRlcHRoKytcclxuICAgICAgciA9IHNjYXR0ZXJlZFxyXG4gICAgICBhdHRlbnVhdGlvblN1bS5pbXVsKGF0dGVudWF0aW9uKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXR0ZW51YXRpb25TdW0gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gICAgICBicmVha1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGV0IHVuaXREaXIgPSByLmRpcmVjdGlvbigpLnVuaXRWZWMzKClcclxuICBsZXQgdCA9IDAuNSAqICh1bml0RGlyLnkoKSArIDEuMClcclxuICBjb2wgPSBuZXcgVmVjdG9yMygxLjAsIDEuMCwgMS4wKVxyXG4gICAgLm11bCgxLjAgLSB0KVxyXG4gICAgLmFkZChuZXcgVmVjdG9yMygwLjUsIDAuNywgMS4wKS5tdWwodCkpXHJcbiAgY29sLmltdWwoYXR0ZW51YXRpb25TdW0pXHJcblxyXG4gIHJldHVybiBjb2xcclxufVxyXG5cclxuY3R4Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICBsZXQgcGFyYW0gPSBtZXNzYWdlLmRhdGFcclxuICBsZXQgaWQgPSBwYXJhbS5pZFxyXG4gIGxldCBzdGFydCA9IHBhcmFtLnN0YXJ0XHJcbiAgbGV0IGVuZCA9IHBhcmFtLmVuZFxyXG4gIGxldCBlbmRNYXggPSBwYXJhbS5lbmRNYXhcclxuXHJcbiAgbGV0IG54ID0gcGFyYW0ud2lkdGhcclxuICBsZXQgbnkgPSBwYXJhbS5oZWlnaHRcclxuICBsZXQgbnMgPSBwYXJhbS5zYW1wbGluZ051bVxyXG5cclxuICAvLyBwcm9jZXNzIGVuZFxyXG4gIGlmIChlbmQgPiBlbmRNYXgpIHtcclxuICAgIGVuZCA9IGVuZE1heFxyXG4gIH1cclxuXHJcbiAgLy8gb2JqZWN0XHJcbiAgbGV0IGxvb2tGcm9tID0gbmV3IFZlY3RvcjMoMywgMywgMilcclxuICBsZXQgbG9va0F0ID0gbmV3IFZlY3RvcjMoMCwgMCwgLTEpXHJcbiAgbGV0IHZ1cCA9IG5ldyBWZWN0b3IzKDAsIDEsIDApXHJcbiAgbGV0IHZmb3YgPSAyMFxyXG4gIGxldCBhc3BlY3QgPSBueCAvIG55XHJcbiAgbGV0IGFwZXJ0dXJlID0gMi4wXHJcbiAgbGV0IGZvY3VzRGlzdCA9IGxvb2tGcm9tLnN1Yihsb29rQXQpLmxlbmd0aCgpXHJcbiAgbGV0IGNhbSA9IG5ldyBDYW1lcmEobG9va0Zyb20sIGxvb2tBdCwgdnVwLCB2Zm92LCBhc3BlY3QsIGFwZXJ0dXJlLCBmb2N1c0Rpc3QpXHJcbiAgbGV0IGxpc3QgPSBuZXcgQXJyYXk8SGl0YWJsZT4oNSlcclxuICBsaXN0WzBdID0gbmV3IFNwaGVyZShcclxuICAgIG5ldyBWZWN0b3IzKDAsIDAsIC0xKSxcclxuICAgIDAuNSxcclxuICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAuMSwgMC4yLCAwLjUpKVxyXG4gIClcclxuICBsaXN0WzFdID0gbmV3IFNwaGVyZShcclxuICAgIG5ldyBWZWN0b3IzKDAsIC0xMDAuNSwgLTEpLFxyXG4gICAgMTAwLFxyXG4gICAgbmV3IExhbWJlcnRpYW4obmV3IFZlY3RvcjMoMC44LCAwLjgsIDAuMCkpXHJcbiAgKVxyXG4gIGxpc3RbMl0gPSBuZXcgU3BoZXJlKFxyXG4gICAgbmV3IFZlY3RvcjMoMSwgMCwgLTEpLFxyXG4gICAgMC41LFxyXG4gICAgbmV3IE1ldGFsKG5ldyBWZWN0b3IzKDAuOCwgMC42LCAwLjIpLCAwLjMpXHJcbiAgKVxyXG4gIGxpc3RbM10gPSBuZXcgU3BoZXJlKG5ldyBWZWN0b3IzKC0xLCAwLCAtMSksIDAuNSwgbmV3IERpZWxlY3RyaWMoMS41KSlcclxuICBsaXN0WzRdID0gbmV3IFNwaGVyZShuZXcgVmVjdG9yMygtMSwgMCwgLTEpLCAtMC40NSwgbmV3IERpZWxlY3RyaWMoMS41KSlcclxuXHJcbiAgbGV0IHdvcmxkID0gbmV3IEhpdGFibGVMaXN0KGxpc3QsIDUpXHJcblxyXG4gIGxldCBjb2xBcnJheSA9IG5ldyBBcnJheTxOdW1iZXI+KClcclxuXHJcbiAgZm9yIChsZXQgaiA9IHN0YXJ0OyBqIDw9IGVuZDsgaisrKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG54OyBpKyspIHtcclxuICAgICAgbGV0IGNvbCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgbnM7IHMrKykge1xyXG4gICAgICAgIGxldCB1ID0gKGkgKyBNYXRoLnJhbmRvbSgpKSAvIG54XHJcbiAgICAgICAgbGV0IHYgPSAobnkgLSAxIC0gKGogKyBNYXRoLnJhbmRvbSgpKSkgLyBueVxyXG4gICAgICAgIGxldCByID0gY2FtLmdldFJheSh1LCB2KVxyXG4gICAgICAgIGNvbC5pYWRkKENvbG9yKHIsIHdvcmxkLCAwKSlcclxuICAgICAgfVxyXG4gICAgICBjb2wuaWRpdihucylcclxuICAgICAgY29sID0gY29sLmdhbW1hMigpXHJcblxyXG4gICAgICBjb2xBcnJheS5wdXNoKE1hdGguZmxvb3IoMjU1Ljk5ICogY29sLnIoKSkpXHJcbiAgICAgIGNvbEFycmF5LnB1c2goTWF0aC5mbG9vcigyNTUuOTkgKiBjb2wuZygpKSlcclxuICAgICAgY29sQXJyYXkucHVzaChNYXRoLmZsb29yKDI1NS45OSAqIGNvbC5iKCkpKVxyXG4gICAgICBjb2xBcnJheS5wdXNoKDI1NSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGN0eC5wb3N0TWVzc2FnZSh7XHJcbiAgICBjb2w6IGNvbEFycmF5LFxyXG4gICAgc3RhcnRWYWw6IHN0YXJ0LFxyXG4gICAgZW5kVmFsOiBlbmQsXHJcbiAgICBpZDogaWQsXHJcbiAgICBlbmRNYXhWYWw6IGVuZE1heFxyXG4gIH0pXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==