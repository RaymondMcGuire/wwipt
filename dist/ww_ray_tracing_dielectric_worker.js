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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC9tYXRoX3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvY2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9kaWVsZWN0cmljLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9oaXRhYmxlLWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2hpdGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2xhbWJlcnRpYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL21hdGVyaWFsLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9tZXRhbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvcmF5LnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9zcGhlcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci93dy1yYXktdHJhY2luZy1kaWVsZWN0cmljLndvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNB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S0FBTCxDQUFXLFNBQVMsR0FBRyxDQUFDLENBQUosRUFBcEIsQ0FBZDtBQUNBLGNBQVEsQ0FBQyxJQUFULENBQWMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxTQUFTLEdBQUcsQ0FBQyxDQUFKLEVBQXBCLENBQWQ7QUFDQSxjQUFRLENBQUMsSUFBVCxDQUFjLElBQUksQ0FBQyxLQUFMLENBQVcsU0FBUyxHQUFHLENBQUMsQ0FBSixFQUFwQixDQUFkO0FBQ0EsY0FBUSxDQUFDLElBQVQsQ0FBYyxHQUFkO0FBQ0Q7QUFDRjs7QUFFRCxLQUFHLENBQUMsV0FBSixDQUFnQjtBQUNkLE9BQUcsRUFBRSxRQURTO0FBRWQsWUFBUSxFQUFFLEtBRkk7QUFHZCxVQUFNLEVBQUUsR0FITTtBQUlkLE1BQUUsRUFBRSxFQUpVO0FBS2QsYUFBUyxFQUFFO0FBTEcsR0FBaEI7QUFPRCxDQTFFRCxDIiwiZmlsZSI6Ind3X3JheV90cmFjaW5nX2RpZWxlY3RyaWNfd29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJkaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy93b3JrZXIvd3ctcmF5LXRyYWNpbmctZGllbGVjdHJpYy53b3JrZXIudHNcIik7XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqICBtYXRoX3V0aWxzLnRzXHJcbiAqICBzaW1wbGUgbWF0aCBmdW5jdGlvbnNcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFic01heCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiB4ICogeCA+IHkgKiB5ID8geCA6IHlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFic01pbih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiB4ICogeCA8IHkgKiB5ID8geCA6IHlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG11bGRlYyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiAoeCAqIDEwICogKHkgKiAxMCkpIC8gMTAwXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXZkZWMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICByZXR1cm4gKHggKiAxMCkgLyAoeSAqIDEwKSAvIDEwMFxyXG59XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICpcclxuICogIHZlY3Rvci50c1xyXG4gKiAgVC1EIHZlY3RvciBkYXRhXHJcbiAqICBUOnR5cGUsZGVmYXVsdCBzZXR0aW5nIGlzIG51bWJlclxyXG4gKiAgRDpkaW1lbnNpb25cclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5pbXBvcnQgeyBhYnNNYXgsIGFic01pbiB9IGZyb20gJy4vbWF0aF91dGlscydcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3Ige1xyXG4gIF9lbGVtZW50czogQXJyYXk8bnVtYmVyPlxyXG4gIF9kaW1lbnNpb246IG51bWJlclxyXG5cclxuICAvLyBjb25zdHJ1Y3RzIHZlY3RvciB3aXRoIHBhcmFtZXRlcnMgb3IgemVyb1xyXG4gIGNvbnN0cnVjdG9yKGRpbWVuc2lvbjogbnVtYmVyLCBwYXJhbXM/OiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICB0aGlzLl9kaW1lbnNpb24gPSBkaW1lbnNpb25cclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmIChwYXJhbXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBpbml0IG4gZGltZW5zaW9uIHZlY3RvciBkYXRhLHNldHRpbmcgYWxsIDBcclxuICAgICAgdGhpcy5fZWxlbWVudHMgPSBuZXcgQXJyYXk8bnVtYmVyPihkaW1lbnNpb24pXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IGRpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDBcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZWxlbWVudHMgPSBuZXcgQXJyYXk8bnVtYmVyPihkaW1lbnNpb24pXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IHBhcmFtcy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSBwYXJhbXNbX2ldXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldChwYXJhbXM6IFZlY3RvciB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChwYXJhbXMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdkaW1lbnNpb24gaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgcGFyYW1zLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IHBhcmFtcy5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIHNldFplcm8oKSB7XHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldE9uZSgpIHtcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gMVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1xyXG4gIH1cclxuXHJcbiAgYXQoaWR4OiBudW1iZXIpIHtcclxuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnaW5kZXggaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudHNbaWR4XVxyXG4gIH1cclxuXHJcbiAgZG90KG90aGVyczogVmVjdG9yIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ290aGVycyBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXQgPSAwXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgcmV0ICs9IHRoaXMuX2VsZW1lbnRzW19pXSAqIG90aGVycy5kYXRhKClbX2ldXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBsZW5ndGhTcXVhcmVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpXHJcbiAgfVxyXG5cclxuICBsZW5ndGgoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCgpKVxyXG4gIH1cclxuXHJcbiAgbm9ybWFsaXplKCkge1xyXG4gICAgdGhpcy5pZGl2KHRoaXMubGVuZ3RoKCkpXHJcbiAgfVxyXG5cclxuICBzdW0oKSB7XHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICByZXQgKz0gdGhpcy5fZWxlbWVudHNbX2ldXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBzaXplKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvblxyXG4gIH1cclxuXHJcbiAgYXZnKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3VtKCkgLyB0aGlzLnNpemUoKVxyXG4gIH1cclxuXHJcbiAgbWluKCkge1xyXG4gICAgbGV0IG1pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBtaW5WYWwgPSBNYXRoLm1pbihtaW5WYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBtaW5WYWxcclxuICB9XHJcblxyXG4gIG1heCgpIHtcclxuICAgIGxldCBtYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBtYXhWYWwgPSBNYXRoLm1heChtYXhWYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBtYXhWYWxcclxuICB9XHJcblxyXG4gIGFic21heCgpIHtcclxuICAgIGxldCBhYnNNYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBhYnNNYXhWYWwgPSBhYnNNYXgoYWJzTWF4VmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWJzTWF4VmFsXHJcbiAgfVxyXG5cclxuICBhYnNtaW4oKSB7XHJcbiAgICBsZXQgYWJzTWluVmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgYWJzTWluVmFsID0gYWJzTWluKGFic01pblZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFic01pblZhbFxyXG4gIH1cclxuXHJcbiAgZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzOiBWZWN0b3IpIHtcclxuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXQgPSAwXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgbGV0IGRpZmYgPSB0aGlzLl9lbGVtZW50c1tfaV0gLSBvdGhlcnMuZGF0YSgpW19pXVxyXG4gICAgICByZXQgKz0gZGlmZiAqIGRpZmZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBkaXN0YW5jZVRvKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzKSlcclxuICB9XHJcblxyXG4gIGlzRXF1YWwob3RoZXJzOiBWZWN0b3IpIHtcclxuICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXJzLnNpemUoKSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmF0KF9pKSAhPT0gb3RoZXJzLmF0KF9pKSkgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGlzU2ltaWxhcihvdGhlcnM6IFZlY3RvciB8IHVuZGVmaW5lZCwgZXBzaWxvbjogbnVtYmVyKSB7XHJcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlcnMuc2l6ZSgpKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYXQoX2kpIC0gb3RoZXJzLmF0KF9pKSkgPiBlcHNpbG9uKSByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgYWRkKHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSArPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKz0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBzdWIocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAtPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIG11bChwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKj0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgZGl2KHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAvPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgaWYgKHMgPT09IDApIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC89IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgaWRpdihwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMuZGl2KHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBpYWRkKHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5hZGQocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIGlzdWIocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLnN1YihwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgaW11bChwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMubXVsKHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBzZXRBdChpZHg6IG51bWJlciwgdmFsOiBudW1iZXIpIHtcclxuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZWxlbWVudHNbaWR4XSA9IHZhbFxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHByb2pfdSh2KSA9IDx1LHY+Lzx2LHY+IHVcclxuICAgKiBAcGFyYW0gdVxyXG4gICAqIEBwYXJhbSB2XHJcbiAgICovXHJcbiAgc3RhdGljIHByb2oodTogVmVjdG9yLCB2OiBWZWN0b3IpIHtcclxuICAgIHJldHVybiB1Lm11bCh2LmRvdCh1KSAvIHUuZG90KHUpKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuL3ZlY3RvcidcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3IzIGV4dGVuZHMgVmVjdG9yIHtcclxuICBjb25zdHJ1Y3RvcihlMTogbnVtYmVyLCBlMjogbnVtYmVyLCBlMzogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigzLCBuZXcgQXJyYXk8bnVtYmVyPihlMSwgZTIsIGUzKSlcclxuICB9XHJcblxyXG4gIHgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMF1cclxuICB9XHJcbiAgeSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsxXVxyXG4gIH1cclxuICB6KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzJdXHJcbiAgfVxyXG4gIHIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMF1cclxuICB9XHJcbiAgZygpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsxXVxyXG4gIH1cclxuICBiKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzJdXHJcbiAgfVxyXG5cclxuICBpc2V0KHYzOiBWZWN0b3IzKSB7XHJcbiAgICB0aGlzLmRhdGEoKVswXSA9IHYzLnIoKVxyXG4gICAgdGhpcy5kYXRhKClbMV0gPSB2My5nKClcclxuICAgIHRoaXMuZGF0YSgpWzJdID0gdjMuYigpXHJcbiAgfVxyXG5cclxuICBzZXQodjM6IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiBzdXBlci5zZXQobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxyXG4gIH1cclxuXHJcbiAgYWRkKHYzOiBhbnkpIHtcclxuICAgIGxldCBhZGR2ID0gc3VwZXIuYWRkKHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGFkZHYuZGF0YSgpWzBdLCBhZGR2LmRhdGEoKVsxXSwgYWRkdi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBzdWIodjM6IGFueSkge1xyXG4gICAgbGV0IHN1YnYgPSBzdXBlci5zdWIodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoc3Vidi5kYXRhKClbMF0sIHN1YnYuZGF0YSgpWzFdLCBzdWJ2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIG11bCh2MzogYW55KSB7XHJcbiAgICBsZXQgbXVsdiA9IHN1cGVyLm11bCh2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhtdWx2LmRhdGEoKVswXSwgbXVsdi5kYXRhKClbMV0sIG11bHYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgZGl2KHYzOiBhbnkpIHtcclxuICAgIGxldCBkaXZ2ID0gc3VwZXIuZGl2KHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGRpdnYuZGF0YSgpWzBdLCBkaXZ2LmRhdGEoKVsxXSwgZGl2di5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBkb3QodjM6IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiBzdXBlci5kb3QobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxyXG4gIH1cclxuXHJcbiAgY3Jvc3ModjM6IFZlY3RvcjMpIHtcclxuICAgIGxldCBudiA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoXHJcbiAgICAgIG52LmRhdGEoKVsxXSAqIHYzLmRhdGEoKVsyXSAtIG52LmRhdGEoKVsyXSAqIHYzLmRhdGEoKVsxXSxcclxuICAgICAgbnYuZGF0YSgpWzJdICogdjMuZGF0YSgpWzBdIC0gbnYuZGF0YSgpWzBdICogdjMuZGF0YSgpWzJdLFxyXG4gICAgICBudi5kYXRhKClbMF0gKiB2My5kYXRhKClbMV0gLSBudi5kYXRhKClbMV0gKiB2My5kYXRhKClbMF1cclxuICAgIClcclxuICB9XHJcblxyXG4gIHVuaXRWZWMzKCk6IFZlY3RvcjMge1xyXG4gICAgbGV0IG52ID0gbmV3IFZlY3RvcigzLCB0aGlzLmRhdGEoKSlcclxuICAgIG52Lm5vcm1hbGl6ZSgpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMobnYuZGF0YSgpWzBdLCBudi5kYXRhKClbMV0sIG52LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIGdhbW1hMigpOiBWZWN0b3IzIHtcclxuICAgIGxldCB0diA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoXHJcbiAgICAgIE1hdGguc3FydCh0di5hdCgwKSksXHJcbiAgICAgIE1hdGguc3FydCh0di5hdCgxKSksXHJcbiAgICAgIE1hdGguc3FydCh0di5hdCgyKSlcclxuICAgIClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi91dGlsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbWVyYSB7XHJcbiAgbG93ZXJMZWZ0Q29ybmVyOiBWZWN0b3IzXHJcbiAgaG9yaXpvbnRhbDogVmVjdG9yM1xyXG4gIHZlcnRpY2FsOiBWZWN0b3IzXHJcbiAgb3JpZ2luOiBWZWN0b3IzXHJcblxyXG4gIGxlbnNSYWRpdXM6IG51bWJlclxyXG5cclxuICB3OiBWZWN0b3IzXHJcbiAgdTogVmVjdG9yM1xyXG4gIHY6IFZlY3RvcjNcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGxvb2tGcm9tOiBWZWN0b3IzLFxyXG4gICAgbG9va0F0OiBWZWN0b3IzLFxyXG4gICAgdnVwOiBWZWN0b3IzLFxyXG4gICAgdmZvdjogbnVtYmVyLFxyXG4gICAgYXNwZWN0OiBudW1iZXIsXHJcbiAgICBhcGVydHVyZTogbnVtYmVyLFxyXG4gICAgZm9jdXNEaXN0OiBudW1iZXJcclxuICApIHtcclxuICAgIHRoaXMubGVuc1JhZGl1cyA9IGFwZXJ0dXJlIC8gMlxyXG5cclxuICAgIGxldCB0aGV0YSA9ICh2Zm92ICogTWF0aC5QSSkgLyAxODBcclxuICAgIGxldCBoYWxmSGVpZ2h0ID0gTWF0aC50YW4odGhldGEgLyAyKVxyXG4gICAgbGV0IGhhbGZXaWR0aCA9IGhhbGZIZWlnaHQgKiBhc3BlY3RcclxuXHJcbiAgICB0aGlzLm9yaWdpbiA9IGxvb2tGcm9tXHJcbiAgICB0aGlzLncgPSBsb29rRnJvbS5zdWIobG9va0F0KS51bml0VmVjMygpXHJcbiAgICB0aGlzLnUgPSB2dXAuY3Jvc3ModGhpcy53KS51bml0VmVjMygpXHJcbiAgICB0aGlzLnYgPSB0aGlzLncuY3Jvc3ModGhpcy51KVxyXG5cclxuICAgIHRoaXMubG93ZXJMZWZ0Q29ybmVyID0gdGhpcy5vcmlnaW5cclxuICAgICAgLnN1Yih0aGlzLnUubXVsKGhhbGZXaWR0aCAqIGZvY3VzRGlzdCkpXHJcbiAgICAgIC5zdWIodGhpcy52Lm11bChoYWxmSGVpZ2h0ICogZm9jdXNEaXN0KSlcclxuICAgICAgLnN1Yih0aGlzLncubXVsKGZvY3VzRGlzdCkpXHJcbiAgICB0aGlzLmhvcml6b250YWwgPSB0aGlzLnUubXVsKDIgKiBoYWxmV2lkdGggKiBmb2N1c0Rpc3QpXHJcbiAgICB0aGlzLnZlcnRpY2FsID0gdGhpcy52Lm11bCgyICogaGFsZkhlaWdodCAqIGZvY3VzRGlzdClcclxuICB9XHJcblxyXG4gIGdldFJheSh1OiBudW1iZXIsIHY6IG51bWJlcikge1xyXG4gICAgbGV0IHJkID0gVXRpbHMuUmFuZG9tSW5Vbml0RGlzaygpLm11bCh0aGlzLmxlbnNSYWRpdXMpXHJcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy51Lm11bChyZC54KCkpLmFkZCh0aGlzLnYubXVsKHJkLnkoKSkpXHJcbiAgICByZXR1cm4gbmV3IFJheShcclxuICAgICAgdGhpcy5vcmlnaW4uYWRkKG9mZnNldCksXHJcbiAgICAgIHRoaXMubG93ZXJMZWZ0Q29ybmVyXHJcbiAgICAgICAgLmFkZCh0aGlzLmhvcml6b250YWwubXVsKHUpKVxyXG4gICAgICAgIC5hZGQodGhpcy52ZXJ0aWNhbC5tdWwodikpXHJcbiAgICAgICAgLnN1Yih0aGlzLm9yaWdpbilcclxuICAgICAgICAuc3ViKG9mZnNldClcclxuICAgIClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBEaWVsZWN0cmljIGV4dGVuZHMgTWF0ZXJpYWwge1xyXG4gIHNjYXR0ZXJlZDogUmF5XHJcbiAgYXR0ZW51YXRpb246IFZlY3RvcjNcclxuICByZWZJZHg6IG51bWJlclxyXG4gIG5hbWU6IHN0cmluZ1xyXG5cclxuICBjb25zdHJ1Y3RvcihyaTogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLm5hbWUgPSAnRGllbGVjdHJpYydcclxuICAgIHRoaXMucmVmSWR4ID0gcmlcclxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICB9XHJcblxyXG4gIHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IG91dHdhcmROb3JtYWwgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gICAgbGV0IHJlZnJhY3RlZCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcblxyXG4gICAgbGV0IG5pT3Zlck50ID0gMFxyXG5cclxuICAgIGxldCByZWZsZWN0ZWQgPSBVdGlscy5yZWZsZWN0KHIuZGlyZWN0aW9uKCkudW5pdFZlYzMoKSwgcmVjLm5vcm1hbClcclxuICAgIGxldCByZWZsZWN0UHJvYiA9IDBcclxuICAgIGxldCBjb3NpbmUgPSAwXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoMSwgMSwgMSlcclxuXHJcbiAgICBpZiAoci5kaXJlY3Rpb24oKS5kb3QocmVjLm5vcm1hbCkgPiAwKSB7XHJcbiAgICAgIG91dHdhcmROb3JtYWwgPSByZWMubm9ybWFsLm11bCgtMSlcclxuICAgICAgbmlPdmVyTnQgPSB0aGlzLnJlZklkeFxyXG4gICAgICBjb3NpbmUgPVxyXG4gICAgICAgICh0aGlzLnJlZklkeCAqIHIuZGlyZWN0aW9uKCkuZG90KHJlYy5ub3JtYWwpKSAvIHIuZGlyZWN0aW9uKCkubGVuZ3RoKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG91dHdhcmROb3JtYWwgPSByZWMubm9ybWFsXHJcbiAgICAgIG5pT3Zlck50ID0gMS4wIC8gdGhpcy5yZWZJZHhcclxuICAgICAgY29zaW5lID0gLXIuZGlyZWN0aW9uKCkuZG90KHJlYy5ub3JtYWwpIC8gci5kaXJlY3Rpb24oKS5sZW5ndGgoKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChVdGlscy5yZWZyYWN0KHIuZGlyZWN0aW9uKCksIG91dHdhcmROb3JtYWwsIG5pT3Zlck50LCByZWZyYWN0ZWQpKSB7XHJcbiAgICAgIHJlZmxlY3RQcm9iID0gVXRpbHMuc2NobGljayhjb3NpbmUsIHRoaXMucmVmSWR4KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVmbGVjdFByb2IgPSAxLjBcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA8IHJlZmxlY3RQcm9iKSB7XHJcbiAgICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShyZWMucCwgcmVmbGVjdGVkKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KHJlYy5wLCByZWZyYWN0ZWQpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBMYW1iZXJ0aWFuIH0gZnJvbSAnLi9sYW1iZXJ0aWFuJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpdGFibGVMaXN0IGV4dGVuZHMgSGl0YWJsZSB7XHJcbiAgbGlzdDogQXJyYXk8SGl0YWJsZT5cclxuICBsaXN0U2l6ZTogbnVtYmVyXHJcbiAgbmFtZTogc3RyaW5nXHJcbiAgY29uc3RydWN0b3IobDogQXJyYXk8SGl0YWJsZT4sIG46IG51bWJlcikge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5uYW1lID0gJ0hpdGFibGVMaXN0J1xyXG4gICAgdGhpcy5saXN0ID0gbFxyXG4gICAgdGhpcy5saXN0U2l6ZSA9IG5cclxuICB9XHJcblxyXG4gIGhpdChyOiBSYXksIHRNaW46IG51bWJlciwgdE1heDogbnVtYmVyLCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHRtcFJlYyA9IG5ldyBIaXRSZWNvcmQoXHJcbiAgICAgIDAsXHJcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcclxuICAgICAgbmV3IExhbWJlcnRpYW4obmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICApXHJcbiAgICBsZXQgaGl0QW55dGhpbmcgPSBmYWxzZVxyXG4gICAgbGV0IGNsb3Nlc3RTb0ZhciA9IHRNYXhcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0U2l6ZTsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmxpc3RbaV0uaGl0KHIsIHRNaW4sIGNsb3Nlc3RTb0ZhciwgdG1wUmVjKSkge1xyXG4gICAgICAgIGhpdEFueXRoaW5nID0gdHJ1ZVxyXG4gICAgICAgIGNsb3Nlc3RTb0ZhciA9IHRtcFJlYy50XHJcbiAgICAgICAgcmVjLnQgPSB0bXBSZWMudFxyXG4gICAgICAgIHJlYy5wID0gdG1wUmVjLnBcclxuICAgICAgICByZWMubm9ybWFsID0gdG1wUmVjLm5vcm1hbFxyXG4gICAgICAgIHJlYy5tYXRlcmlhbCA9IHRtcFJlYy5tYXRlcmlhbFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGl0QW55dGhpbmdcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpdFJlY29yZCB7XHJcbiAgdDogbnVtYmVyXHJcbiAgcDogVmVjdG9yM1xyXG4gIG5vcm1hbDogVmVjdG9yM1xyXG4gIG1hdGVyaWFsOiBNYXRlcmlhbFxyXG5cclxuICBjb25zdHJ1Y3RvcihfdDogbnVtYmVyLCBfcDogVmVjdG9yMywgX25vcm1hbDogVmVjdG9yMywgX21hdGVyaWFsOiBNYXRlcmlhbCkge1xyXG4gICAgdGhpcy50ID0gX3RcclxuICAgIHRoaXMucCA9IF9wXHJcbiAgICB0aGlzLm5vcm1hbCA9IF9ub3JtYWxcclxuICAgIHRoaXMubWF0ZXJpYWwgPSBfbWF0ZXJpYWxcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIaXRhYmxlIHtcclxuICBhYnN0cmFjdCBuYW1lOiBzdHJpbmdcclxuICBhYnN0cmFjdCBoaXQocjogUmF5LCB0TWluOiBudW1iZXIsIHRNYXg6IG51bWJlciwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuXHJcbn1cclxuIiwiaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBMYW1iZXJ0aWFuIGV4dGVuZHMgTWF0ZXJpYWwge1xyXG4gIGFsYmVkbzogVmVjdG9yM1xyXG4gIHNjYXR0ZXJlZDogUmF5XHJcbiAgYXR0ZW51YXRpb246IFZlY3RvcjNcclxuICBuYW1lOiBzdHJpbmdcclxuXHJcbiAgY29uc3RydWN0b3IoYTogVmVjdG9yMykge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5uYW1lID0gJ0xhbWJlcnRpYW4nXHJcbiAgICB0aGlzLmFsYmVkbyA9IGFcclxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICB9XHJcblxyXG4gIHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHRhcmdldCA9IHJlYy5wLmFkZChyZWMubm9ybWFsKS5hZGQoVXRpbHMuUmFuZG9tSW5Vbml0U3BoZXJlKCkpXHJcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkocmVjLnAsIHRhcmdldC5zdWIocmVjLnApKVxyXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKFxyXG4gICAgICB0aGlzLmFsYmVkby54KCksXHJcbiAgICAgIHRoaXMuYWxiZWRvLnkoKSxcclxuICAgICAgdGhpcy5hbGJlZG8ueigpXHJcbiAgICApXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0ZXJpYWwge1xyXG4gIGFic3RyYWN0IG5hbWU6IHN0cmluZ1xyXG4gIGFic3RyYWN0IHNjYXR0ZXJlZDogUmF5XHJcbiAgYWJzdHJhY3QgYXR0ZW51YXRpb246IFZlY3RvcjNcclxuICBhYnN0cmFjdCBzY2F0dGVyKHI6IFJheSwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuXHJcbn1cclxuIiwiaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXRhbCBleHRlbmRzIE1hdGVyaWFsIHtcclxuICBhbGJlZG86IFZlY3RvcjNcclxuICBzY2F0dGVyZWQ6IFJheVxyXG4gIGF0dGVudWF0aW9uOiBWZWN0b3IzXHJcbiAgZnV6ejogbnVtYmVyXHJcbiAgbmFtZTogc3RyaW5nXHJcblxyXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMsIGY6IG51bWJlcikge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5uYW1lID0gJ01ldGFsJ1xyXG4gICAgdGhpcy5hbGJlZG8gPSBhXHJcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDApKVxyXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcblxyXG4gICAgaWYgKGYgPCAxKSB0aGlzLmZ1enogPSBmXHJcbiAgICBlbHNlIHRoaXMuZnV6eiA9IDFcclxuICB9XHJcblxyXG4gIHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHJlZmxlY3RlZCA9IFV0aWxzLnJlZmxlY3Qoci5kaXJlY3Rpb24oKS51bml0VmVjMygpLCByZWMubm9ybWFsKVxyXG4gICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KFxyXG4gICAgICByZWMucCxcclxuICAgICAgcmVmbGVjdGVkLmFkZChVdGlscy5SYW5kb21JblVuaXRTcGhlcmUoKS5tdWwodGhpcy5mdXp6KSlcclxuICAgIClcclxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMyhcclxuICAgICAgdGhpcy5hbGJlZG8ueCgpLFxyXG4gICAgICB0aGlzLmFsYmVkby55KCksXHJcbiAgICAgIHRoaXMuYWxiZWRvLnooKVxyXG4gICAgKVxyXG4gICAgcmV0dXJuIHRoaXMuc2NhdHRlcmVkLmRpcmVjdGlvbigpLmRvdChyZWMubm9ybWFsKSA+IDBcclxuICB9XHJcbn1cclxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKlxyXG4gKiAgcmF5LnRzXHJcbiAqICByYXkgZnVuY3Rpb24gZm9yIHAodCkgPSBBICsgdCAqIEJcclxuICogIFQ6dHlwZSxkZWZhdWx0IHNldHRpbmcgaXMgbnVtYmVyXHJcbiAqICBEOmRpbWVuc2lvblxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuXHJcbmV4cG9ydCBjbGFzcyBSYXkge1xyXG4gIHB1YmxpYyBfQTogVmVjdG9yM1xyXG4gIHB1YmxpYyBfQjogVmVjdG9yM1xyXG5cclxuICBjb25zdHJ1Y3RvcihhOiBWZWN0b3IzLCBiOiBWZWN0b3IzKSB7XHJcbiAgICB0aGlzLl9BID0gYVxyXG4gICAgdGhpcy5fQiA9IGJcclxuICB9XHJcblxyXG4gIG9yaWdpbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9BXHJcbiAgfVxyXG4gIGRpcmVjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9CXHJcbiAgfVxyXG4gIHBvaW50QXRQYXJhbSh0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLl9BLmFkZCh0aGlzLl9CLm11bCh0KSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXHJcblxyXG5leHBvcnQgY2xhc3MgU3BoZXJlIGV4dGVuZHMgSGl0YWJsZSB7XHJcbiAgY2VudGVyOiBWZWN0b3IzXHJcbiAgcmFkaXVzOiBudW1iZXJcclxuICBtYXRlcmlhbDogTWF0ZXJpYWxcclxuICBuYW1lOiBzdHJpbmdcclxuXHJcbiAgY29uc3RydWN0b3IoY2VuOiBWZWN0b3IzLCByOiBudW1iZXIsIG1hdDogTWF0ZXJpYWwpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMubmFtZSA9ICdTcGhlcmUnXHJcbiAgICB0aGlzLmNlbnRlciA9IGNlblxyXG4gICAgdGhpcy5yYWRpdXMgPSByXHJcbiAgICB0aGlzLm1hdGVyaWFsID0gbWF0XHJcbiAgfVxyXG5cclxuICBoaXQocjogUmF5LCB0TWluOiBudW1iZXIsIHRNYXg6IG51bWJlciwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcclxuICAgIGxldCBvYyA9IHIub3JpZ2luKCkuc3ViKHRoaXMuY2VudGVyKVxyXG4gICAgbGV0IGEgPSByLmRpcmVjdGlvbigpLmRvdChyLmRpcmVjdGlvbigpKVxyXG4gICAgbGV0IGIgPSBvYy5kb3Qoci5kaXJlY3Rpb24oKSlcclxuICAgIGxldCBjID0gb2MuZG90KG9jKSAtIHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXNcclxuICAgIGxldCBkaXNjcmltaW5hbnQgPSBiICogYiAtIGEgKiBjXHJcbiAgICBpZiAoZGlzY3JpbWluYW50ID4gMCkge1xyXG4gICAgICBsZXQgdG1wID0gKC1iIC0gTWF0aC5zcXJ0KGIgKiBiIC0gYSAqIGMpKSAvIGFcclxuICAgICAgaWYgKHRtcCA8IHRNYXggJiYgdG1wID4gdE1pbikge1xyXG4gICAgICAgIHJlYy50ID0gdG1wXHJcbiAgICAgICAgcmVjLnAgPSByLnBvaW50QXRQYXJhbShyZWMudClcclxuICAgICAgICByZWMubm9ybWFsID0gcmVjLnAuc3ViKHRoaXMuY2VudGVyKS5kaXYodGhpcy5yYWRpdXMpXHJcbiAgICAgICAgcmVjLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbFxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRtcCA9ICgtYiArIE1hdGguc3FydChiICogYiAtIGEgKiBjKSkgLyBhXHJcbiAgICAgIGlmICh0bXAgPCB0TWF4ICYmIHRtcCA+IHRNaW4pIHtcclxuICAgICAgICByZWMudCA9IHRtcFxyXG4gICAgICAgIHJlYy5wID0gci5wb2ludEF0UGFyYW0ocmVjLnQpXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHJlYy5wLnN1Yih0aGlzLmNlbnRlcikuZGl2KHRoaXMucmFkaXVzKVxyXG4gICAgICAgIHJlYy5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4vZWdtYXRoL3ZlY3RvcjMnXHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFV0aWxzIHtcclxuICBleHBvcnQgZnVuY3Rpb24gUmFuZG9tSW5Vbml0U3BoZXJlKCkge1xyXG4gICAgbGV0IHAgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gICAgZG8ge1xyXG4gICAgICBwID0gbmV3IFZlY3RvcjMoTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSlcclxuICAgICAgICAubXVsKDIpXHJcbiAgICAgICAgLnN1YihuZXcgVmVjdG9yMygxLCAxLCAxKSlcclxuICAgIH0gd2hpbGUgKHAubGVuZ3RoU3F1YXJlZCgpID49IDEuMClcclxuICAgIHJldHVybiBwXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gUmFuZG9tSW5Vbml0RGlzaygpIHtcclxuICAgIGxldCBwID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgIGRvIHtcclxuICAgICAgcCA9IG5ldyBWZWN0b3IzKE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCkpXHJcbiAgICAgICAgLm11bCgyKVxyXG4gICAgICAgIC5zdWIobmV3IFZlY3RvcjMoMSwgMSwgMCkpXHJcbiAgICB9IHdoaWxlIChwLmxlbmd0aFNxdWFyZWQoKSA+PSAxLjApXHJcbiAgICByZXR1cm4gcFxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZmxlY3QodjogVmVjdG9yMywgbjogVmVjdG9yMykge1xyXG4gICAgcmV0dXJuIHYuc3ViKG4ubXVsKDIgKiB2LmRvdChuKSkpXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gc2NobGljayhjb3NpbmU6IG51bWJlciwgcmVmSWR4OiBudW1iZXIpIHtcclxuICAgIGxldCByMCA9ICgxIC0gcmVmSWR4KSAvICgxICsgcmVmSWR4KVxyXG4gICAgcjAgPSByMCAqIHIwXHJcbiAgICByZXR1cm4gcjAgKyAoMSAtIHIwKSAqIE1hdGgucG93KDEgLSBjb3NpbmUsIDUpXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gcmVmcmFjdChcclxuICAgIHY6IFZlY3RvcjMsXHJcbiAgICBuOiBWZWN0b3IzLFxyXG4gICAgbmlPdmVyTnQ6IG51bWJlcixcclxuICAgIHJlZnJhY3RlZDogVmVjdG9yM1xyXG4gICkge1xyXG4gICAgbGV0IHV2ID0gdi51bml0VmVjMygpXHJcbiAgICBsZXQgZHQgPSB1di5kb3QobilcclxuICAgIGxldCBkaXNjcmltaW5hbnQgPSAxLjAgLSBuaU92ZXJOdCAqIG5pT3Zlck50ICogKDEgLSBkdCAqIGR0KVxyXG4gICAgaWYgKGRpc2NyaW1pbmFudCA+IDApIHtcclxuICAgICAgcmVmcmFjdGVkLnNldChcclxuICAgICAgICB1dlxyXG4gICAgICAgICAgLnN1YihuLm11bChkdCkpXHJcbiAgICAgICAgICAubXVsKG5pT3Zlck50KVxyXG4gICAgICAgICAgLnN1YihuLm11bChNYXRoLnNxcnQoZGlzY3JpbWluYW50KSkpXHJcbiAgICAgIClcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFJhbmRvbShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4ICsgMSAtIG1pbikpICsgbWluXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gV3JpdGUyQ2FudmFzKFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgaW1hZ2VCdWY6IEFycmF5PG51bWJlcj4sXHJcbiAgICB3OiBudW1iZXIsXHJcbiAgICBoOiBudW1iZXJcclxuICApIHtcclxuICAgIGxldCBjYW52YXNJbWFnZSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHcsIGgpXHJcbiAgICBsZXQgZGF0YSA9IGNhbnZhc0ltYWdlLmRhdGFcclxuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGRhdGEubGVuZ3RoOyBpZHggKz0gNCkge1xyXG4gICAgICBkYXRhW2lkeCArIDBdID0gaW1hZ2VCdWZbaWR4ICsgMF1cclxuICAgICAgZGF0YVtpZHggKyAxXSA9IGltYWdlQnVmW2lkeCArIDFdXHJcbiAgICAgIGRhdGFbaWR4ICsgMl0gPSBpbWFnZUJ1ZltpZHggKyAyXVxyXG4gICAgICBkYXRhW2lkeCArIDNdID0gaW1hZ2VCdWZbaWR4ICsgM11cclxuICAgIH1cclxuICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKGNhbnZhc0ltYWdlLCAwLCAwKVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIEdlbmVyYXRlTm9pc2UoXHJcbiAgICBpbWFnZUJ1ZmZlcjogQXJyYXk8bnVtYmVyPixcclxuICAgIHN0YXJ0SWR4OiBudW1iZXIsXHJcbiAgICBlbmRJZHg6IG51bWJlclxyXG4gICkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSBzdGFydElkeDsgaW5kZXggPCBlbmRJZHg7IGluZGV4ICs9IDQpIHtcclxuICAgICAgbGV0IHIgPSBSYW5kb20oMCwgMjU1KVxyXG4gICAgICBsZXQgZyA9IFJhbmRvbSgwLCAyNTUpXHJcbiAgICAgIGxldCBiID0gUmFuZG9tKDAsIDI1NSlcclxuXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4XSA9IHJcclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAxXSA9IGdcclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAyXSA9IGJcclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAzXSA9IDI1NVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGltYWdlQnVmZmVyXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi4vZWdyZW5kZXIvcmF5J1xyXG5pbXBvcnQgeyBIaXRhYmxlLCBIaXRSZWNvcmQgfSBmcm9tICcuLi9lZ3JlbmRlci9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tICcuLi9lZ3JlbmRlci9jYW1lcmEnXHJcbmltcG9ydCB7IFNwaGVyZSB9IGZyb20gJy4uL2VncmVuZGVyL3NwaGVyZSdcclxuaW1wb3J0IHsgSGl0YWJsZUxpc3QgfSBmcm9tICcuLi9lZ3JlbmRlci9oaXRhYmxlLWxpc3QnXHJcbmltcG9ydCB7IExhbWJlcnRpYW4gfSBmcm9tICcuLi9lZ3JlbmRlci9sYW1iZXJ0aWFuJ1xyXG5pbXBvcnQgeyBNZXRhbCB9IGZyb20gJy4uL2VncmVuZGVyL21ldGFsJ1xyXG5pbXBvcnQgeyBEaWVsZWN0cmljIH0gZnJvbSAnLi4vZWdyZW5kZXIvZGllbGVjdHJpYydcclxuXHJcbmNvbnN0IGN0eDogV29ya2VyID0gc2VsZiBhcyBhbnlcclxuXHJcbmZ1bmN0aW9uIENvbG9yKHI6IFJheSwgd29ybGQ6IEhpdGFibGUsIGRlcHRoOiBudW1iZXIpOiBWZWN0b3IzIHtcclxuICBsZXQgY29sID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuXHJcbiAgbGV0IGF0dGVudWF0aW9uU3VtID0gbmV3IFZlY3RvcjMoMSwgMSwgMSlcclxuICBmb3IgKGxldCBuID0gMDsgbiA8IE51bWJlci5NQVhfVkFMVUU7IG4rKykge1xyXG4gICAgbGV0IHJlYyA9IG5ldyBIaXRSZWNvcmQoXHJcbiAgICAgIDAsXHJcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcclxuICAgICAgbmV3IExhbWJlcnRpYW4obmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICApXHJcbiAgICBsZXQgYkhpdCA9IHdvcmxkLmhpdChyLCAwLjAwMSwgTnVtYmVyLk1BWF9WQUxVRSwgcmVjKVxyXG4gICAgaWYgKCFiSGl0KSB7XHJcbiAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgICBsZXQgYlNjYXR0ZXIgPSByZWMubWF0ZXJpYWwuc2NhdHRlcihyLCByZWMpXHJcbiAgICBsZXQgc2NhdHRlcmVkID0gcmVjLm1hdGVyaWFsLnNjYXR0ZXJlZFxyXG4gICAgbGV0IGF0dGVudWF0aW9uID0gcmVjLm1hdGVyaWFsLmF0dGVudWF0aW9uXHJcbiAgICBpZiAoYlNjYXR0ZXIgJiYgZGVwdGggPCA1MCkge1xyXG4gICAgICBkZXB0aCsrXHJcbiAgICAgIHIgPSBzY2F0dGVyZWRcclxuICAgICAgYXR0ZW51YXRpb25TdW0uaW11bChhdHRlbnVhdGlvbilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGF0dGVudWF0aW9uU3VtID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgICAgYnJlYWtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxldCB1bml0RGlyID0gci5kaXJlY3Rpb24oKS51bml0VmVjMygpXHJcbiAgbGV0IHQgPSAwLjUgKiAodW5pdERpci55KCkgKyAxLjApXHJcbiAgY29sID0gbmV3IFZlY3RvcjMoMS4wLCAxLjAsIDEuMClcclxuICAgIC5tdWwoMS4wIC0gdClcclxuICAgIC5hZGQobmV3IFZlY3RvcjMoMC41LCAwLjcsIDEuMCkubXVsKHQpKVxyXG4gIGNvbC5pbXVsKGF0dGVudWF0aW9uU3VtKVxyXG5cclxuICByZXR1cm4gY29sXHJcbn1cclxuXHJcbmN0eC5vbm1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgbGV0IHBhcmFtID0gbWVzc2FnZS5kYXRhXHJcbiAgbGV0IGlkID0gcGFyYW0uaWRcclxuICBsZXQgc3RhcnQgPSBwYXJhbS5zdGFydFxyXG4gIGxldCBlbmQgPSBwYXJhbS5lbmRcclxuICBsZXQgZW5kTWF4ID0gcGFyYW0uZW5kTWF4XHJcblxyXG4gIGxldCBueCA9IHBhcmFtLndpZHRoXHJcbiAgbGV0IG55ID0gcGFyYW0uaGVpZ2h0XHJcbiAgbGV0IG5zID0gcGFyYW0uc2FtcGxpbmdOdW1cclxuXHJcbiAgLy8gcHJvY2VzcyBlbmRcclxuICBpZiAoZW5kID4gZW5kTWF4KSB7XHJcbiAgICBlbmQgPSBlbmRNYXhcclxuICB9XHJcblxyXG4gIC8vIG9iamVjdFxyXG4gIGxldCBsb29rRnJvbSA9IG5ldyBWZWN0b3IzKDMsIDMsIDIpXHJcbiAgbGV0IGxvb2tBdCA9IG5ldyBWZWN0b3IzKDAsIDAsIC0xKVxyXG4gIGxldCB2dXAgPSBuZXcgVmVjdG9yMygwLCAxLCAwKVxyXG4gIGxldCB2Zm92ID0gMjBcclxuICBsZXQgYXNwZWN0ID0gbnggLyBueVxyXG4gIGxldCBhcGVydHVyZSA9IDIuMFxyXG4gIGxldCBmb2N1c0Rpc3QgPSBsb29rRnJvbS5zdWIobG9va0F0KS5sZW5ndGgoKVxyXG4gIGxldCBjYW0gPSBuZXcgQ2FtZXJhKGxvb2tGcm9tLCBsb29rQXQsIHZ1cCwgdmZvdiwgYXNwZWN0LCBhcGVydHVyZSwgZm9jdXNEaXN0KVxyXG4gIGxldCBsaXN0ID0gbmV3IEFycmF5PEhpdGFibGU+KDUpXHJcbiAgbGlzdFswXSA9IG5ldyBTcGhlcmUoXHJcbiAgICBuZXcgVmVjdG9yMygwLCAwLCAtMSksXHJcbiAgICAwLjUsXHJcbiAgICBuZXcgTGFtYmVydGlhbihuZXcgVmVjdG9yMygwLjEsIDAuMiwgMC41KSlcclxuICApXHJcbiAgbGlzdFsxXSA9IG5ldyBTcGhlcmUoXHJcbiAgICBuZXcgVmVjdG9yMygwLCAtMTAwLjUsIC0xKSxcclxuICAgIDEwMCxcclxuICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAuOCwgMC44LCAwLjApKVxyXG4gIClcclxuICBsaXN0WzJdID0gbmV3IFNwaGVyZShcclxuICAgIG5ldyBWZWN0b3IzKDEsIDAsIC0xKSxcclxuICAgIDAuNSxcclxuICAgIG5ldyBNZXRhbChuZXcgVmVjdG9yMygwLjgsIDAuNiwgMC4yKSwgMC4zKVxyXG4gIClcclxuICBsaXN0WzNdID0gbmV3IFNwaGVyZShuZXcgVmVjdG9yMygtMSwgMCwgLTEpLCAwLjUsIG5ldyBEaWVsZWN0cmljKDEuNSkpXHJcbiAgbGlzdFs0XSA9IG5ldyBTcGhlcmUobmV3IFZlY3RvcjMoLTEsIDAsIC0xKSwgLTAuNDUsIG5ldyBEaWVsZWN0cmljKDEuNSkpXHJcblxyXG4gIGxldCB3b3JsZCA9IG5ldyBIaXRhYmxlTGlzdChsaXN0LCA1KVxyXG5cclxuICBsZXQgY29sQXJyYXkgPSBuZXcgQXJyYXk8TnVtYmVyPigpXHJcblxyXG4gIGZvciAobGV0IGogPSBzdGFydDsgaiA8PSBlbmQ7IGorKykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBueDsgaSsrKSB7XHJcbiAgICAgIGxldCBjb2wgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gICAgICBmb3IgKGxldCBzID0gMDsgcyA8IG5zOyBzKyspIHtcclxuICAgICAgICBsZXQgdSA9IChpICsgTWF0aC5yYW5kb20oKSkgLyBueFxyXG4gICAgICAgIGxldCB2ID0gKG55IC0gMSAtIChqICsgTWF0aC5yYW5kb20oKSkpIC8gbnlcclxuICAgICAgICBsZXQgciA9IGNhbS5nZXRSYXkodSwgdilcclxuICAgICAgICBjb2wuaWFkZChDb2xvcihyLCB3b3JsZCwgMCkpXHJcbiAgICAgIH1cclxuICAgICAgY29sLmlkaXYobnMpXHJcbiAgICAgIGNvbCA9IGNvbC5nYW1tYTIoKVxyXG5cclxuICAgICAgY29sQXJyYXkucHVzaChNYXRoLmZsb29yKDI1NS45OSAqIGNvbC5yKCkpKVxyXG4gICAgICBjb2xBcnJheS5wdXNoKE1hdGguZmxvb3IoMjU1Ljk5ICogY29sLmcoKSkpXHJcbiAgICAgIGNvbEFycmF5LnB1c2goTWF0aC5mbG9vcigyNTUuOTkgKiBjb2wuYigpKSlcclxuICAgICAgY29sQXJyYXkucHVzaCgyNTUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjdHgucG9zdE1lc3NhZ2Uoe1xyXG4gICAgY29sOiBjb2xBcnJheSxcclxuICAgIHN0YXJ0VmFsOiBzdGFydCxcclxuICAgIGVuZFZhbDogZW5kLFxyXG4gICAgaWQ6IGlkLFxyXG4gICAgZW5kTWF4VmFsOiBlbmRNYXhcclxuICB9KVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=