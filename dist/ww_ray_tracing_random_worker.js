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
  var ns = param.samplingNum;
  var _scene = param.scene; // process end

  if (end > endMax) {
    end = endMax;
  } // init scene


  var objList = _scene.list;
  var listSize = _scene.listSize;
  var list = new Array(listSize);

  for (var index = 0; index < list.length; index++) {
    var hitable = objList[index];
    var className = hitable.name;

    switch (className) {
      case 'Sphere':
        var _s = hitable; // material

        var m = void 0;

        switch (_s.material.name) {
          case 'Lambertian':
            var _m = _s.material;
            m = new lambertian_1.Lambertian(new vector3_1.Vector3(_m.albedo._elements[0], _m.albedo._elements[1], _m.albedo._elements[2]));
            break;

          case 'Metal':
            var _m1 = _s.material;
            m = new metal_1.Metal(new vector3_1.Vector3(_m1.albedo._elements[0], _m1.albedo._elements[1], _m1.albedo._elements[2]), _m1.fuzz);
            break;

          case 'Dielectric':
            var _m2 = _s.material;
            m = new dielectric_1.Dielectric(_m2.refIdx);
            break;

          default:
            var _m3 = _s.material;
            m = new lambertian_1.Lambertian(new vector3_1.Vector3(_m3.albedo._elements[0], _m3.albedo._elements[1], _m3.albedo._elements[2]));
            break;
        }

        var _center = _s.center._elements;
        var center = void 0;
        center = new vector3_1.Vector3(_center[0], _center[1], _center[2]);
        var s = new sphere_1.Sphere(center, _s.radius, m);
        list[index] = s;
        break;
    }
  }

  var scene = new hitable_list_1.HitableList(list, listSize); // camera

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC9tYXRoX3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvY2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9kaWVsZWN0cmljLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9oaXRhYmxlLWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2hpdGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2xhbWJlcnRpYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL21hdGVyaWFsLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9tZXRhbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvcmF5LnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9zcGhlcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci93dy1yYXktdHJhY2luZy1yYW5kb20ud29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFD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QUFDLFdBQUosQ0FBZ0I7QUFDZCxPQUFHLEVBQUUsUUFEUztBQUVkLFlBQVEsRUFBRSxLQUZJO0FBR2QsVUFBTSxFQUFFLEdBSE07QUFJZCxNQUFFLEVBQUUsRUFKVTtBQUtkLGFBQVMsRUFBRTtBQUxHLEdBQWhCO0FBT0QsQ0F2SEQsQyIsImZpbGUiOiJ3d19yYXlfdHJhY2luZ19yYW5kb21fd29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJkaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy93b3JrZXIvd3ctcmF5LXRyYWNpbmctcmFuZG9tLndvcmtlci50c1wiKTtcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICpcclxuICogIG1hdGhfdXRpbHMudHNcclxuICogIHNpbXBsZSBtYXRoIGZ1bmN0aW9uc1xyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWJzTWF4KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIHggKiB4ID4geSAqIHkgPyB4IDogeVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWJzTWluKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIHggKiB4IDwgeSAqIHkgPyB4IDogeVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbXVsZGVjKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuICh4ICogMTAgKiAoeSAqIDEwKSkgLyAxMDBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpdmRlYyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiAoeCAqIDEwKSAvICh5ICogMTApIC8gMTAwXHJcbn1cclxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKlxyXG4gKiAgdmVjdG9yLnRzXHJcbiAqICBULUQgdmVjdG9yIGRhdGFcclxuICogIFQ6dHlwZSxkZWZhdWx0IHNldHRpbmcgaXMgbnVtYmVyXHJcbiAqICBEOmRpbWVuc2lvblxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmltcG9ydCB7IGFic01heCwgYWJzTWluIH0gZnJvbSAnLi9tYXRoX3V0aWxzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlY3RvciB7XHJcbiAgX2VsZW1lbnRzOiBBcnJheTxudW1iZXI+XHJcbiAgX2RpbWVuc2lvbjogbnVtYmVyXHJcblxyXG4gIC8vIGNvbnN0cnVjdHMgdmVjdG9yIHdpdGggcGFyYW1ldGVycyBvciB6ZXJvXHJcbiAgY29uc3RydWN0b3IoZGltZW5zaW9uOiBudW1iZXIsIHBhcmFtcz86IEFycmF5PG51bWJlcj4pIHtcclxuICAgIHRoaXMuX2RpbWVuc2lvbiA9IGRpbWVuc2lvblxyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHBhcmFtcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIC8vIGluaXQgbiBkaW1lbnNpb24gdmVjdG9yIGRhdGEsc2V0dGluZyBhbGwgMFxyXG4gICAgICB0aGlzLl9lbGVtZW50cyA9IG5ldyBBcnJheTxudW1iZXI+KGRpbWVuc2lvbilcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gMFxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9lbGVtZW50cyA9IG5ldyBBcnJheTxudW1iZXI+KGRpbWVuc2lvbilcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgcGFyYW1zLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IHBhcmFtc1tfaV1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0KHBhcmFtczogVmVjdG9yIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKHBhcmFtcy5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCBwYXJhbXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gcGFyYW1zLmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxuXHJcbiAgc2V0WmVybygpIHtcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gMFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0T25lKCkge1xyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAxXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRzXHJcbiAgfVxyXG5cclxuICBhdChpZHg6IG51bWJlcikge1xyXG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuc2l6ZSgpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdpbmRleCBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1tpZHhdXHJcbiAgfVxyXG5cclxuICBkb3Qob3RoZXJzOiBWZWN0b3IgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChvdGhlcnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnb3RoZXJzIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG4gICAgaWYgKG90aGVycy5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdkaW1lbnNpb24gaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJldCA9IDBcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xyXG4gICAgICByZXQgKz0gdGhpcy5fZWxlbWVudHNbX2ldICogb3RoZXJzLmRhdGEoKVtfaV1cclxuICAgIH1cclxuICAgIHJldHVybiByZXRcclxuICB9XHJcblxyXG4gIGxlbmd0aFNxdWFyZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcylcclxuICB9XHJcblxyXG4gIGxlbmd0aCgpIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcXVhcmVkKCkpXHJcbiAgfVxyXG5cclxuICBub3JtYWxpemUoKSB7XHJcbiAgICB0aGlzLmlkaXYodGhpcy5sZW5ndGgoKSlcclxuICB9XHJcblxyXG4gIHN1bSgpIHtcclxuICAgIGxldCByZXQgPSAwXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIHJldCArPSB0aGlzLl9lbGVtZW50c1tfaV1cclxuICAgIH1cclxuICAgIHJldHVybiByZXRcclxuICB9XHJcblxyXG4gIHNpemUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9uXHJcbiAgfVxyXG5cclxuICBhdmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdW0oKSAvIHRoaXMuc2l6ZSgpXHJcbiAgfVxyXG5cclxuICBtaW4oKSB7XHJcbiAgICBsZXQgbWluVmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuXHJcbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIG1pblZhbCA9IE1hdGgubWluKG1pblZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1pblZhbFxyXG4gIH1cclxuXHJcbiAgbWF4KCkge1xyXG4gICAgbGV0IG1heFZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIG1heFZhbCA9IE1hdGgubWF4KG1heFZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1heFZhbFxyXG4gIH1cclxuXHJcbiAgYWJzbWF4KCkge1xyXG4gICAgbGV0IGFic01heFZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIGFic01heFZhbCA9IGFic01heChhYnNNYXhWYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBhYnNNYXhWYWxcclxuICB9XHJcblxyXG4gIGFic21pbigpIHtcclxuICAgIGxldCBhYnNNaW5WYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBhYnNNaW5WYWwgPSBhYnNNaW4oYWJzTWluVmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWJzTWluVmFsXHJcbiAgfVxyXG5cclxuICBkaXN0YW5jZVNxdWFyZWRUbyhvdGhlcnM6IFZlY3Rvcikge1xyXG4gICAgaWYgKG90aGVycy5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdkaW1lbnNpb24gaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJldCA9IDBcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xyXG4gICAgICBsZXQgZGlmZiA9IHRoaXMuX2VsZW1lbnRzW19pXSAtIG90aGVycy5kYXRhKClbX2ldXHJcbiAgICAgIHJldCArPSBkaWZmICogZGlmZlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXRcclxuICB9XHJcblxyXG4gIGRpc3RhbmNlVG8ob3RoZXJzOiBWZWN0b3IpIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVNxdWFyZWRUbyhvdGhlcnMpKVxyXG4gIH1cclxuXHJcbiAgaXNFcXVhbChvdGhlcnM6IFZlY3Rvcikge1xyXG4gICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlcnMuc2l6ZSgpKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgaWYgKHRoaXMuYXQoX2kpICE9PSBvdGhlcnMuYXQoX2kpKSByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgaXNTaW1pbGFyKG90aGVyczogVmVjdG9yIHwgdW5kZWZpbmVkLCBlcHNpbG9uOiBudW1iZXIpIHtcclxuICAgIGlmIChvdGhlcnMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVycy5zaXplKCkpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xyXG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5hdChfaSkgLSBvdGhlcnMuYXQoX2kpKSA+IGVwc2lsb24pIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICBhZGQocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICs9IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSArPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIHN1YihwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLT0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgbXVsKHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAqPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKj0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBkaXYocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC89IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBpZiAocyA9PT0gMCkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLz0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBpZGl2KHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5kaXYocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIGlhZGQocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLmFkZChwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgaXN1YihwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMuc3ViKHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBpbXVsKHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5tdWwocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIHNldEF0KGlkeDogbnVtYmVyLCB2YWw6IG51bWJlcikge1xyXG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuc2l6ZSgpKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9lbGVtZW50c1tpZHhdID0gdmFsXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcHJval91KHYpID0gPHUsdj4vPHYsdj4gdVxyXG4gICAqIEBwYXJhbSB1XHJcbiAgICogQHBhcmFtIHZcclxuICAgKi9cclxuICBzdGF0aWMgcHJvaih1OiBWZWN0b3IsIHY6IFZlY3Rvcikge1xyXG4gICAgcmV0dXJuIHUubXVsKHYuZG90KHUpIC8gdS5kb3QodSkpXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gJy4vdmVjdG9yJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlY3RvcjMgZXh0ZW5kcyBWZWN0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKGUxOiBudW1iZXIsIGUyOiBudW1iZXIsIGUzOiBudW1iZXIpIHtcclxuICAgIHN1cGVyKDMsIG5ldyBBcnJheTxudW1iZXI+KGUxLCBlMiwgZTMpKVxyXG4gIH1cclxuXHJcbiAgeCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVswXVxyXG4gIH1cclxuICB5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzFdXHJcbiAgfVxyXG4gIHooKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMl1cclxuICB9XHJcbiAgcigpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVswXVxyXG4gIH1cclxuICBnKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzFdXHJcbiAgfVxyXG4gIGIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMl1cclxuICB9XHJcblxyXG4gIGlzZXQodjM6IFZlY3RvcjMpIHtcclxuICAgIHRoaXMuZGF0YSgpWzBdID0gdjMucigpXHJcbiAgICB0aGlzLmRhdGEoKVsxXSA9IHYzLmcoKVxyXG4gICAgdGhpcy5kYXRhKClbMl0gPSB2My5iKClcclxuICB9XHJcblxyXG4gIHNldCh2MzogVmVjdG9yMykge1xyXG4gICAgcmV0dXJuIHN1cGVyLnNldChuZXcgVmVjdG9yKDMsIHYzLmRhdGEoKSkpXHJcbiAgfVxyXG5cclxuICBhZGQodjM6IGFueSkge1xyXG4gICAgbGV0IGFkZHYgPSBzdXBlci5hZGQodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoYWRkdi5kYXRhKClbMF0sIGFkZHYuZGF0YSgpWzFdLCBhZGR2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIHN1Yih2MzogYW55KSB7XHJcbiAgICBsZXQgc3VidiA9IHN1cGVyLnN1Yih2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhzdWJ2LmRhdGEoKVswXSwgc3Vidi5kYXRhKClbMV0sIHN1YnYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgbXVsKHYzOiBhbnkpIHtcclxuICAgIGxldCBtdWx2ID0gc3VwZXIubXVsKHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKG11bHYuZGF0YSgpWzBdLCBtdWx2LmRhdGEoKVsxXSwgbXVsdi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBkaXYodjM6IGFueSkge1xyXG4gICAgbGV0IGRpdnYgPSBzdXBlci5kaXYodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoZGl2di5kYXRhKClbMF0sIGRpdnYuZGF0YSgpWzFdLCBkaXZ2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIGRvdCh2MzogVmVjdG9yMykge1xyXG4gICAgcmV0dXJuIHN1cGVyLmRvdChuZXcgVmVjdG9yKDMsIHYzLmRhdGEoKSkpXHJcbiAgfVxyXG5cclxuICBjcm9zcyh2MzogVmVjdG9yMykge1xyXG4gICAgbGV0IG52ID0gbmV3IFZlY3RvcigzLCB0aGlzLmRhdGEoKSlcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhcclxuICAgICAgbnYuZGF0YSgpWzFdICogdjMuZGF0YSgpWzJdIC0gbnYuZGF0YSgpWzJdICogdjMuZGF0YSgpWzFdLFxyXG4gICAgICBudi5kYXRhKClbMl0gKiB2My5kYXRhKClbMF0gLSBudi5kYXRhKClbMF0gKiB2My5kYXRhKClbMl0sXHJcbiAgICAgIG52LmRhdGEoKVswXSAqIHYzLmRhdGEoKVsxXSAtIG52LmRhdGEoKVsxXSAqIHYzLmRhdGEoKVswXVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgdW5pdFZlYzMoKTogVmVjdG9yMyB7XHJcbiAgICBsZXQgbnYgPSBuZXcgVmVjdG9yKDMsIHRoaXMuZGF0YSgpKVxyXG4gICAgbnYubm9ybWFsaXplKClcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhudi5kYXRhKClbMF0sIG52LmRhdGEoKVsxXSwgbnYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgZ2FtbWEyKCk6IFZlY3RvcjMge1xyXG4gICAgbGV0IHR2ID0gbmV3IFZlY3RvcigzLCB0aGlzLmRhdGEoKSlcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhcclxuICAgICAgTWF0aC5zcXJ0KHR2LmF0KDApKSxcclxuICAgICAgTWF0aC5zcXJ0KHR2LmF0KDEpKSxcclxuICAgICAgTWF0aC5zcXJ0KHR2LmF0KDIpKVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWwnXHJcblxyXG5leHBvcnQgY2xhc3MgQ2FtZXJhIHtcclxuICBsb3dlckxlZnRDb3JuZXI6IFZlY3RvcjNcclxuICBob3Jpem9udGFsOiBWZWN0b3IzXHJcbiAgdmVydGljYWw6IFZlY3RvcjNcclxuICBvcmlnaW46IFZlY3RvcjNcclxuXHJcbiAgbGVuc1JhZGl1czogbnVtYmVyXHJcblxyXG4gIHc6IFZlY3RvcjNcclxuICB1OiBWZWN0b3IzXHJcbiAgdjogVmVjdG9yM1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbG9va0Zyb206IFZlY3RvcjMsXHJcbiAgICBsb29rQXQ6IFZlY3RvcjMsXHJcbiAgICB2dXA6IFZlY3RvcjMsXHJcbiAgICB2Zm92OiBudW1iZXIsXHJcbiAgICBhc3BlY3Q6IG51bWJlcixcclxuICAgIGFwZXJ0dXJlOiBudW1iZXIsXHJcbiAgICBmb2N1c0Rpc3Q6IG51bWJlclxyXG4gICkge1xyXG4gICAgdGhpcy5sZW5zUmFkaXVzID0gYXBlcnR1cmUgLyAyXHJcblxyXG4gICAgbGV0IHRoZXRhID0gKHZmb3YgKiBNYXRoLlBJKSAvIDE4MFxyXG4gICAgbGV0IGhhbGZIZWlnaHQgPSBNYXRoLnRhbih0aGV0YSAvIDIpXHJcbiAgICBsZXQgaGFsZldpZHRoID0gaGFsZkhlaWdodCAqIGFzcGVjdFxyXG5cclxuICAgIHRoaXMub3JpZ2luID0gbG9va0Zyb21cclxuICAgIHRoaXMudyA9IGxvb2tGcm9tLnN1Yihsb29rQXQpLnVuaXRWZWMzKClcclxuICAgIHRoaXMudSA9IHZ1cC5jcm9zcyh0aGlzLncpLnVuaXRWZWMzKClcclxuICAgIHRoaXMudiA9IHRoaXMudy5jcm9zcyh0aGlzLnUpXHJcblxyXG4gICAgdGhpcy5sb3dlckxlZnRDb3JuZXIgPSB0aGlzLm9yaWdpblxyXG4gICAgICAuc3ViKHRoaXMudS5tdWwoaGFsZldpZHRoICogZm9jdXNEaXN0KSlcclxuICAgICAgLnN1Yih0aGlzLnYubXVsKGhhbGZIZWlnaHQgKiBmb2N1c0Rpc3QpKVxyXG4gICAgICAuc3ViKHRoaXMudy5tdWwoZm9jdXNEaXN0KSlcclxuICAgIHRoaXMuaG9yaXpvbnRhbCA9IHRoaXMudS5tdWwoMiAqIGhhbGZXaWR0aCAqIGZvY3VzRGlzdClcclxuICAgIHRoaXMudmVydGljYWwgPSB0aGlzLnYubXVsKDIgKiBoYWxmSGVpZ2h0ICogZm9jdXNEaXN0KVxyXG4gIH1cclxuXHJcbiAgZ2V0UmF5KHU6IG51bWJlciwgdjogbnVtYmVyKSB7XHJcbiAgICBsZXQgcmQgPSBVdGlscy5SYW5kb21JblVuaXREaXNrKCkubXVsKHRoaXMubGVuc1JhZGl1cylcclxuICAgIGxldCBvZmZzZXQgPSB0aGlzLnUubXVsKHJkLngoKSkuYWRkKHRoaXMudi5tdWwocmQueSgpKSlcclxuICAgIHJldHVybiBuZXcgUmF5KFxyXG4gICAgICB0aGlzLm9yaWdpbi5hZGQob2Zmc2V0KSxcclxuICAgICAgdGhpcy5sb3dlckxlZnRDb3JuZXJcclxuICAgICAgICAuYWRkKHRoaXMuaG9yaXpvbnRhbC5tdWwodSkpXHJcbiAgICAgICAgLmFkZCh0aGlzLnZlcnRpY2FsLm11bCh2KSlcclxuICAgICAgICAuc3ViKHRoaXMub3JpZ2luKVxyXG4gICAgICAgIC5zdWIob2Zmc2V0KVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi91dGlsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIERpZWxlY3RyaWMgZXh0ZW5kcyBNYXRlcmlhbCB7XHJcbiAgc2NhdHRlcmVkOiBSYXlcclxuICBhdHRlbnVhdGlvbjogVmVjdG9yM1xyXG4gIHJlZklkeDogbnVtYmVyXHJcbiAgbmFtZTogc3RyaW5nXHJcblxyXG4gIGNvbnN0cnVjdG9yKHJpOiBudW1iZXIpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMubmFtZSA9ICdEaWVsZWN0cmljJ1xyXG4gICAgdGhpcy5yZWZJZHggPSByaVxyXG4gICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygwLCAwLCAwKSlcclxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gIH1cclxuXHJcbiAgc2NhdHRlcihyOiBSYXksIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgb3V0d2FyZE5vcm1hbCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgICBsZXQgcmVmcmFjdGVkID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuXHJcbiAgICBsZXQgbmlPdmVyTnQgPSAwXHJcblxyXG4gICAgbGV0IHJlZmxlY3RlZCA9IFV0aWxzLnJlZmxlY3Qoci5kaXJlY3Rpb24oKS51bml0VmVjMygpLCByZWMubm9ybWFsKVxyXG4gICAgbGV0IHJlZmxlY3RQcm9iID0gMFxyXG4gICAgbGV0IGNvc2luZSA9IDBcclxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMygxLCAxLCAxKVxyXG5cclxuICAgIGlmIChyLmRpcmVjdGlvbigpLmRvdChyZWMubm9ybWFsKSA+IDApIHtcclxuICAgICAgb3V0d2FyZE5vcm1hbCA9IHJlYy5ub3JtYWwubXVsKC0xKVxyXG4gICAgICBuaU92ZXJOdCA9IHRoaXMucmVmSWR4XHJcbiAgICAgIGNvc2luZSA9XHJcbiAgICAgICAgKHRoaXMucmVmSWR4ICogci5kaXJlY3Rpb24oKS5kb3QocmVjLm5vcm1hbCkpIC8gci5kaXJlY3Rpb24oKS5sZW5ndGgoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0d2FyZE5vcm1hbCA9IHJlYy5ub3JtYWxcclxuICAgICAgbmlPdmVyTnQgPSAxLjAgLyB0aGlzLnJlZklkeFxyXG4gICAgICBjb3NpbmUgPSAtci5kaXJlY3Rpb24oKS5kb3QocmVjLm5vcm1hbCkgLyByLmRpcmVjdGlvbigpLmxlbmd0aCgpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFV0aWxzLnJlZnJhY3Qoci5kaXJlY3Rpb24oKSwgb3V0d2FyZE5vcm1hbCwgbmlPdmVyTnQsIHJlZnJhY3RlZCkpIHtcclxuICAgICAgcmVmbGVjdFByb2IgPSBVdGlscy5zY2hsaWNrKGNvc2luZSwgdGhpcy5yZWZJZHgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZWZsZWN0UHJvYiA9IDEuMFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgcmVmbGVjdFByb2IpIHtcclxuICAgICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KHJlYy5wLCByZWZsZWN0ZWQpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkocmVjLnAsIHJlZnJhY3RlZClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIaXRhYmxlLCBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IExhbWJlcnRpYW4gfSBmcm9tICcuL2xhbWJlcnRpYW4nXHJcblxyXG5leHBvcnQgY2xhc3MgSGl0YWJsZUxpc3QgZXh0ZW5kcyBIaXRhYmxlIHtcclxuICBsaXN0OiBBcnJheTxIaXRhYmxlPlxyXG4gIGxpc3RTaXplOiBudW1iZXJcclxuICBuYW1lOiBzdHJpbmdcclxuICBjb25zdHJ1Y3RvcihsOiBBcnJheTxIaXRhYmxlPiwgbjogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLm5hbWUgPSAnSGl0YWJsZUxpc3QnXHJcbiAgICB0aGlzLmxpc3QgPSBsXHJcbiAgICB0aGlzLmxpc3RTaXplID0gblxyXG4gIH1cclxuXHJcbiAgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgdG1wUmVjID0gbmV3IEhpdFJlY29yZChcclxuICAgICAgMCxcclxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXHJcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICBuZXcgTGFtYmVydGlhbihuZXcgVmVjdG9yMygwLCAwLCAwKSlcclxuICAgIClcclxuICAgIGxldCBoaXRBbnl0aGluZyA9IGZhbHNlXHJcbiAgICBsZXQgY2xvc2VzdFNvRmFyID0gdE1heFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3RTaXplOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMubGlzdFtpXS5oaXQociwgdE1pbiwgY2xvc2VzdFNvRmFyLCB0bXBSZWMpKSB7XHJcbiAgICAgICAgaGl0QW55dGhpbmcgPSB0cnVlXHJcbiAgICAgICAgY2xvc2VzdFNvRmFyID0gdG1wUmVjLnRcclxuICAgICAgICByZWMudCA9IHRtcFJlYy50XHJcbiAgICAgICAgcmVjLnAgPSB0bXBSZWMucFxyXG4gICAgICAgIHJlYy5ub3JtYWwgPSB0bXBSZWMubm9ybWFsXHJcbiAgICAgICAgcmVjLm1hdGVyaWFsID0gdG1wUmVjLm1hdGVyaWFsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBoaXRBbnl0aGluZ1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXHJcblxyXG5leHBvcnQgY2xhc3MgSGl0UmVjb3JkIHtcclxuICB0OiBudW1iZXJcclxuICBwOiBWZWN0b3IzXHJcbiAgbm9ybWFsOiBWZWN0b3IzXHJcbiAgbWF0ZXJpYWw6IE1hdGVyaWFsXHJcblxyXG4gIGNvbnN0cnVjdG9yKF90OiBudW1iZXIsIF9wOiBWZWN0b3IzLCBfbm9ybWFsOiBWZWN0b3IzLCBfbWF0ZXJpYWw6IE1hdGVyaWFsKSB7XHJcbiAgICB0aGlzLnQgPSBfdFxyXG4gICAgdGhpcy5wID0gX3BcclxuICAgIHRoaXMubm9ybWFsID0gX25vcm1hbFxyXG4gICAgdGhpcy5tYXRlcmlhbCA9IF9tYXRlcmlhbFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEhpdGFibGUge1xyXG4gIGFic3RyYWN0IG5hbWU6IHN0cmluZ1xyXG4gIGFic3RyYWN0IGhpdChyOiBSYXksIHRNaW46IG51bWJlciwgdE1heDogbnVtYmVyLCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW5cclxufVxyXG4iLCJpbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi91dGlsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIExhbWJlcnRpYW4gZXh0ZW5kcyBNYXRlcmlhbCB7XHJcbiAgYWxiZWRvOiBWZWN0b3IzXHJcbiAgc2NhdHRlcmVkOiBSYXlcclxuICBhdHRlbnVhdGlvbjogVmVjdG9yM1xyXG4gIG5hbWU6IHN0cmluZ1xyXG5cclxuICBjb25zdHJ1Y3RvcihhOiBWZWN0b3IzKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLm5hbWUgPSAnTGFtYmVydGlhbidcclxuICAgIHRoaXMuYWxiZWRvID0gYVxyXG4gICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygwLCAwLCAwKSlcclxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gIH1cclxuXHJcbiAgc2NhdHRlcihyOiBSYXksIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gcmVjLnAuYWRkKHJlYy5ub3JtYWwpLmFkZChVdGlscy5SYW5kb21JblVuaXRTcGhlcmUoKSlcclxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShyZWMucCwgdGFyZ2V0LnN1YihyZWMucCkpXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoXHJcbiAgICAgIHRoaXMuYWxiZWRvLngoKSxcclxuICAgICAgdGhpcy5hbGJlZG8ueSgpLFxyXG4gICAgICB0aGlzLmFsYmVkby56KClcclxuICAgIClcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRlcmlhbCB7XHJcbiAgYWJzdHJhY3QgbmFtZTogc3RyaW5nXHJcbiAgYWJzdHJhY3Qgc2NhdHRlcmVkOiBSYXlcclxuICBhYnN0cmFjdCBhdHRlbnVhdGlvbjogVmVjdG9yM1xyXG4gIGFic3RyYWN0IHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW5cclxufVxyXG4iLCJpbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi91dGlsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIE1ldGFsIGV4dGVuZHMgTWF0ZXJpYWwge1xyXG4gIGFsYmVkbzogVmVjdG9yM1xyXG4gIHNjYXR0ZXJlZDogUmF5XHJcbiAgYXR0ZW51YXRpb246IFZlY3RvcjNcclxuICBmdXp6OiBudW1iZXJcclxuICBuYW1lOiBzdHJpbmdcclxuXHJcbiAgY29uc3RydWN0b3IoYTogVmVjdG9yMywgZjogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLm5hbWUgPSAnTWV0YWwnXHJcbiAgICB0aGlzLmFsYmVkbyA9IGFcclxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuXHJcbiAgICBpZiAoZiA8IDEpIHRoaXMuZnV6eiA9IGZcclxuICAgIGVsc2UgdGhpcy5mdXp6ID0gMVxyXG4gIH1cclxuXHJcbiAgc2NhdHRlcihyOiBSYXksIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgcmVmbGVjdGVkID0gVXRpbHMucmVmbGVjdChyLmRpcmVjdGlvbigpLnVuaXRWZWMzKCksIHJlYy5ub3JtYWwpXHJcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkoXHJcbiAgICAgIHJlYy5wLFxyXG4gICAgICByZWZsZWN0ZWQuYWRkKFV0aWxzLlJhbmRvbUluVW5pdFNwaGVyZSgpLm11bCh0aGlzLmZ1enopKVxyXG4gICAgKVxyXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKFxyXG4gICAgICB0aGlzLmFsYmVkby54KCksXHJcbiAgICAgIHRoaXMuYWxiZWRvLnkoKSxcclxuICAgICAgdGhpcy5hbGJlZG8ueigpXHJcbiAgICApXHJcbiAgICByZXR1cm4gdGhpcy5zY2F0dGVyZWQuZGlyZWN0aW9uKCkuZG90KHJlYy5ub3JtYWwpID4gMFxyXG4gIH1cclxufVxyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqICByYXkudHNcclxuICogIHJheSBmdW5jdGlvbiBmb3IgcCh0KSA9IEEgKyB0ICogQlxyXG4gKiAgVDp0eXBlLGRlZmF1bHQgc2V0dGluZyBpcyBudW1iZXJcclxuICogIEQ6ZGltZW5zaW9uXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFJheSB7XHJcbiAgcHVibGljIF9BOiBWZWN0b3IzXHJcbiAgcHVibGljIF9COiBWZWN0b3IzXHJcblxyXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMsIGI6IFZlY3RvcjMpIHtcclxuICAgIHRoaXMuX0EgPSBhXHJcbiAgICB0aGlzLl9CID0gYlxyXG4gIH1cclxuXHJcbiAgb3JpZ2luKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX0FcclxuICB9XHJcbiAgZGlyZWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX0JcclxuICB9XHJcbiAgcG9pbnRBdFBhcmFtKHQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuX0EuYWRkKHRoaXMuX0IubXVsKHQpKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIaXRhYmxlLCBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBTcGhlcmUgZXh0ZW5kcyBIaXRhYmxlIHtcclxuICBjZW50ZXI6IFZlY3RvcjNcclxuICByYWRpdXM6IG51bWJlclxyXG4gIG1hdGVyaWFsOiBNYXRlcmlhbFxyXG4gIG5hbWU6IHN0cmluZ1xyXG5cclxuICBjb25zdHJ1Y3RvcihjZW46IFZlY3RvcjMsIHI6IG51bWJlciwgbWF0OiBNYXRlcmlhbCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5uYW1lID0gJ1NwaGVyZSdcclxuICAgIHRoaXMuY2VudGVyID0gY2VuXHJcbiAgICB0aGlzLnJhZGl1cyA9IHJcclxuICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRcclxuICB9XHJcblxyXG4gIGhpdChyOiBSYXksIHRNaW46IG51bWJlciwgdE1heDogbnVtYmVyLCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IG9jID0gci5vcmlnaW4oKS5zdWIodGhpcy5jZW50ZXIpXHJcbiAgICBsZXQgYSA9IHIuZGlyZWN0aW9uKCkuZG90KHIuZGlyZWN0aW9uKCkpXHJcbiAgICBsZXQgYiA9IG9jLmRvdChyLmRpcmVjdGlvbigpKVxyXG4gICAgbGV0IGMgPSBvYy5kb3Qob2MpIC0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1c1xyXG4gICAgbGV0IGRpc2NyaW1pbmFudCA9IGIgKiBiIC0gYSAqIGNcclxuICAgIGlmIChkaXNjcmltaW5hbnQgPiAwKSB7XHJcbiAgICAgIGxldCB0bXAgPSAoLWIgLSBNYXRoLnNxcnQoYiAqIGIgLSBhICogYykpIC8gYVxyXG4gICAgICBpZiAodG1wIDwgdE1heCAmJiB0bXAgPiB0TWluKSB7XHJcbiAgICAgICAgcmVjLnQgPSB0bXBcclxuICAgICAgICByZWMucCA9IHIucG9pbnRBdFBhcmFtKHJlYy50KVxyXG4gICAgICAgIHJlYy5ub3JtYWwgPSByZWMucC5zdWIodGhpcy5jZW50ZXIpLmRpdih0aGlzLnJhZGl1cylcclxuICAgICAgICByZWMubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG5cclxuICAgICAgdG1wID0gKC1iICsgTWF0aC5zcXJ0KGIgKiBiIC0gYSAqIGMpKSAvIGFcclxuICAgICAgaWYgKHRtcCA8IHRNYXggJiYgdG1wID4gdE1pbikge1xyXG4gICAgICAgIHJlYy50ID0gdG1wXHJcbiAgICAgICAgcmVjLnAgPSByLnBvaW50QXRQYXJhbShyZWMudClcclxuICAgICAgICByZWMubm9ybWFsID0gcmVjLnAuc3ViKHRoaXMuY2VudGVyKS5kaXYodGhpcy5yYWRpdXMpXHJcbiAgICAgICAgcmVjLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbFxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi9lZ21hdGgvdmVjdG9yMydcclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgVXRpbHMge1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb21JblVuaXRTcGhlcmUoKSB7XHJcbiAgICBsZXQgcCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgICBkbyB7XHJcbiAgICAgIHAgPSBuZXcgVmVjdG9yMyhNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpKVxyXG4gICAgICAgIC5tdWwoMilcclxuICAgICAgICAuc3ViKG5ldyBWZWN0b3IzKDEsIDEsIDEpKVxyXG4gICAgfSB3aGlsZSAocC5sZW5ndGhTcXVhcmVkKCkgPj0gMS4wKVxyXG4gICAgcmV0dXJuIHBcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb21JblVuaXREaXNrKCkge1xyXG4gICAgbGV0IHAgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gICAgZG8ge1xyXG4gICAgICBwID0gbmV3IFZlY3RvcjMoTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSlcclxuICAgICAgICAubXVsKDIpXHJcbiAgICAgICAgLnN1YihuZXcgVmVjdG9yMygxLCAxLCAwKSlcclxuICAgIH0gd2hpbGUgKHAubGVuZ3RoU3F1YXJlZCgpID49IDEuMClcclxuICAgIHJldHVybiBwXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gcmVmbGVjdCh2OiBWZWN0b3IzLCBuOiBWZWN0b3IzKSB7XHJcbiAgICByZXR1cm4gdi5zdWIobi5tdWwoMiAqIHYuZG90KG4pKSlcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBzY2hsaWNrKGNvc2luZTogbnVtYmVyLCByZWZJZHg6IG51bWJlcikge1xyXG4gICAgbGV0IHIwID0gKDEgLSByZWZJZHgpIC8gKDEgKyByZWZJZHgpXHJcbiAgICByMCA9IHIwICogcjBcclxuICAgIHJldHVybiByMCArICgxIC0gcjApICogTWF0aC5wb3coMSAtIGNvc2luZSwgNSlcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiByZWZyYWN0KFxyXG4gICAgdjogVmVjdG9yMyxcclxuICAgIG46IFZlY3RvcjMsXHJcbiAgICBuaU92ZXJOdDogbnVtYmVyLFxyXG4gICAgcmVmcmFjdGVkOiBWZWN0b3IzXHJcbiAgKSB7XHJcbiAgICBsZXQgdXYgPSB2LnVuaXRWZWMzKClcclxuICAgIGxldCBkdCA9IHV2LmRvdChuKVxyXG4gICAgbGV0IGRpc2NyaW1pbmFudCA9IDEuMCAtIG5pT3Zlck50ICogbmlPdmVyTnQgKiAoMSAtIGR0ICogZHQpXHJcbiAgICBpZiAoZGlzY3JpbWluYW50ID4gMCkge1xyXG4gICAgICByZWZyYWN0ZWQuc2V0KFxyXG4gICAgICAgIHV2XHJcbiAgICAgICAgICAuc3ViKG4ubXVsKGR0KSlcclxuICAgICAgICAgIC5tdWwobmlPdmVyTnQpXHJcbiAgICAgICAgICAuc3ViKG4ubXVsKE1hdGguc3FydChkaXNjcmltaW5hbnQpKSlcclxuICAgICAgKVxyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gUmFuZG9tKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggKyAxIC0gbWluKSkgKyBtaW5cclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBXcml0ZTJDYW52YXMoXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICBpbWFnZUJ1ZjogQXJyYXk8bnVtYmVyPixcclxuICAgIHc6IG51bWJlcixcclxuICAgIGg6IG51bWJlclxyXG4gICkge1xyXG4gICAgbGV0IGNhbnZhc0ltYWdlID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdywgaClcclxuICAgIGxldCBkYXRhID0gY2FudmFzSW1hZ2UuZGF0YVxyXG4gICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZGF0YS5sZW5ndGg7IGlkeCArPSA0KSB7XHJcbiAgICAgIGRhdGFbaWR4ICsgMF0gPSBpbWFnZUJ1ZltpZHggKyAwXVxyXG4gICAgICBkYXRhW2lkeCArIDFdID0gaW1hZ2VCdWZbaWR4ICsgMV1cclxuICAgICAgZGF0YVtpZHggKyAyXSA9IGltYWdlQnVmW2lkeCArIDJdXHJcbiAgICAgIGRhdGFbaWR4ICsgM10gPSBpbWFnZUJ1ZltpZHggKyAzXVxyXG4gICAgfVxyXG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEoY2FudmFzSW1hZ2UsIDAsIDApXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gR2VuZXJhdGVOb2lzZShcclxuICAgIGltYWdlQnVmZmVyOiBBcnJheTxudW1iZXI+LFxyXG4gICAgc3RhcnRJZHg6IG51bWJlcixcclxuICAgIGVuZElkeDogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IHN0YXJ0SWR4OyBpbmRleCA8IGVuZElkeDsgaW5kZXggKz0gNCkge1xyXG4gICAgICBsZXQgciA9IFJhbmRvbSgwLCAyNTUpXHJcbiAgICAgIGxldCBnID0gUmFuZG9tKDAsIDI1NSlcclxuICAgICAgbGV0IGIgPSBSYW5kb20oMCwgMjU1KVxyXG5cclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXhdID0gclxyXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleCArIDFdID0gZ1xyXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleCArIDJdID0gYlxyXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleCArIDNdID0gMjU1XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW1hZ2VCdWZmZXJcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuLi9lZ3JlbmRlci9yYXknXHJcbmltcG9ydCB7IEhpdGFibGUsIEhpdFJlY29yZCB9IGZyb20gJy4uL2VncmVuZGVyL2hpdGFibGUnXHJcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gJy4uL2VncmVuZGVyL2NhbWVyYSdcclxuaW1wb3J0IHsgU3BoZXJlIH0gZnJvbSAnLi4vZWdyZW5kZXIvc3BoZXJlJ1xyXG5pbXBvcnQgeyBIaXRhYmxlTGlzdCB9IGZyb20gJy4uL2VncmVuZGVyL2hpdGFibGUtbGlzdCdcclxuaW1wb3J0IHsgTGFtYmVydGlhbiB9IGZyb20gJy4uL2VncmVuZGVyL2xhbWJlcnRpYW4nXHJcbmltcG9ydCB7IE1ldGFsIH0gZnJvbSAnLi4vZWdyZW5kZXIvbWV0YWwnXHJcbmltcG9ydCB7IERpZWxlY3RyaWMgfSBmcm9tICcuLi9lZ3JlbmRlci9kaWVsZWN0cmljJ1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4uL2VncmVuZGVyL21hdGVyaWFsJ1xyXG5cclxuY29uc3QgY3R4OiBXb3JrZXIgPSBzZWxmIGFzIGFueVxyXG5cclxuZnVuY3Rpb24gQ29sb3IocjogUmF5LCB3b3JsZDogSGl0YWJsZSwgZGVwdGg6IG51bWJlcik6IFZlY3RvcjMge1xyXG4gIGxldCBjb2wgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG5cclxuICBsZXQgYXR0ZW51YXRpb25TdW0gPSBuZXcgVmVjdG9yMygxLCAxLCAxKVxyXG4gIGZvciAobGV0IG4gPSAwOyBuIDwgTnVtYmVyLk1BWF9WQUxVRTsgbisrKSB7XHJcbiAgICBsZXQgcmVjID0gbmV3IEhpdFJlY29yZChcclxuICAgICAgMCxcclxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXHJcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICBuZXcgTGFtYmVydGlhbihuZXcgVmVjdG9yMygwLCAwLCAwKSlcclxuICAgIClcclxuICAgIGxldCBiSGl0ID0gd29ybGQuaGl0KHIsIDAuMDAxLCBOdW1iZXIuTUFYX1ZBTFVFLCByZWMpXHJcbiAgICBpZiAoIWJIaXQpIHtcclxuICAgICAgYnJlYWtcclxuICAgIH1cclxuICAgIGxldCBiU2NhdHRlciA9IHJlYy5tYXRlcmlhbC5zY2F0dGVyKHIsIHJlYylcclxuICAgIGxldCBzY2F0dGVyZWQgPSByZWMubWF0ZXJpYWwuc2NhdHRlcmVkXHJcbiAgICBsZXQgYXR0ZW51YXRpb24gPSByZWMubWF0ZXJpYWwuYXR0ZW51YXRpb25cclxuICAgIGlmIChiU2NhdHRlciAmJiBkZXB0aCA8IDUwKSB7XHJcbiAgICAgIGRlcHRoKytcclxuICAgICAgciA9IHNjYXR0ZXJlZFxyXG4gICAgICBhdHRlbnVhdGlvblN1bS5pbXVsKGF0dGVudWF0aW9uKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXR0ZW51YXRpb25TdW0gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gICAgICBicmVha1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGV0IHVuaXREaXIgPSByLmRpcmVjdGlvbigpLnVuaXRWZWMzKClcclxuICBsZXQgdCA9IDAuNSAqICh1bml0RGlyLnkoKSArIDEuMClcclxuICBjb2wgPSBuZXcgVmVjdG9yMygxLjAsIDEuMCwgMS4wKVxyXG4gICAgLm11bCgxLjAgLSB0KVxyXG4gICAgLmFkZChuZXcgVmVjdG9yMygwLjUsIDAuNywgMS4wKS5tdWwodCkpXHJcbiAgY29sLmltdWwoYXR0ZW51YXRpb25TdW0pXHJcblxyXG4gIHJldHVybiBjb2xcclxufVxyXG5cclxuY3R4Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICBsZXQgcGFyYW0gPSBtZXNzYWdlLmRhdGFcclxuICBsZXQgaWQgPSBwYXJhbS5pZFxyXG4gIGxldCBzdGFydCA9IHBhcmFtLnN0YXJ0XHJcbiAgbGV0IGVuZCA9IHBhcmFtLmVuZFxyXG4gIGxldCBlbmRNYXggPSBwYXJhbS5lbmRNYXhcclxuXHJcbiAgbGV0IG54ID0gcGFyYW0ud2lkdGhcclxuICBsZXQgbnkgPSBwYXJhbS5oZWlnaHRcclxuICBsZXQgbnMgPSBwYXJhbS5zYW1wbGluZ051bVxyXG5cclxuICBsZXQgX3NjZW5lID0gcGFyYW0uc2NlbmVcclxuXHJcbiAgLy8gcHJvY2VzcyBlbmRcclxuICBpZiAoZW5kID4gZW5kTWF4KSB7XHJcbiAgICBlbmQgPSBlbmRNYXhcclxuICB9XHJcblxyXG4gIC8vIGluaXQgc2NlbmVcclxuICBsZXQgb2JqTGlzdCA9IF9zY2VuZS5saXN0XHJcbiAgbGV0IGxpc3RTaXplID0gX3NjZW5lLmxpc3RTaXplXHJcbiAgbGV0IGxpc3QgPSBuZXcgQXJyYXk8SGl0YWJsZT4obGlzdFNpemUpXHJcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICBjb25zdCBoaXRhYmxlID0gb2JqTGlzdFtpbmRleF0gYXMgSGl0YWJsZVxyXG4gICAgbGV0IGNsYXNzTmFtZSA9IGhpdGFibGUubmFtZVxyXG4gICAgc3dpdGNoIChjbGFzc05hbWUpIHtcclxuICAgICAgY2FzZSAnU3BoZXJlJzpcclxuICAgICAgICBsZXQgX3MgPSBoaXRhYmxlIGFzIFNwaGVyZVxyXG5cclxuICAgICAgICAvLyBtYXRlcmlhbFxyXG4gICAgICAgIGxldCBtOiBNYXRlcmlhbFxyXG4gICAgICAgIHN3aXRjaCAoX3MubWF0ZXJpYWwubmFtZSkge1xyXG4gICAgICAgICAgY2FzZSAnTGFtYmVydGlhbic6XHJcbiAgICAgICAgICAgIGxldCBfbSA9IF9zLm1hdGVyaWFsIGFzIExhbWJlcnRpYW5cclxuICAgICAgICAgICAgbSA9IG5ldyBMYW1iZXJ0aWFuKFxyXG4gICAgICAgICAgICAgIG5ldyBWZWN0b3IzKFxyXG4gICAgICAgICAgICAgICAgX20uYWxiZWRvLl9lbGVtZW50c1swXSxcclxuICAgICAgICAgICAgICAgIF9tLmFsYmVkby5fZWxlbWVudHNbMV0sXHJcbiAgICAgICAgICAgICAgICBfbS5hbGJlZG8uX2VsZW1lbnRzWzJdXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICBjYXNlICdNZXRhbCc6XHJcbiAgICAgICAgICAgIGxldCBfbTEgPSBfcy5tYXRlcmlhbCBhcyBNZXRhbFxyXG4gICAgICAgICAgICBtID0gbmV3IE1ldGFsKFxyXG4gICAgICAgICAgICAgIG5ldyBWZWN0b3IzKFxyXG4gICAgICAgICAgICAgICAgX20xLmFsYmVkby5fZWxlbWVudHNbMF0sXHJcbiAgICAgICAgICAgICAgICBfbTEuYWxiZWRvLl9lbGVtZW50c1sxXSxcclxuICAgICAgICAgICAgICAgIF9tMS5hbGJlZG8uX2VsZW1lbnRzWzJdXHJcbiAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICBfbTEuZnV6elxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICBjYXNlICdEaWVsZWN0cmljJzpcclxuICAgICAgICAgICAgbGV0IF9tMiA9IF9zLm1hdGVyaWFsIGFzIERpZWxlY3RyaWNcclxuICAgICAgICAgICAgbSA9IG5ldyBEaWVsZWN0cmljKF9tMi5yZWZJZHgpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgbGV0IF9tMyA9IF9zLm1hdGVyaWFsIGFzIExhbWJlcnRpYW5cclxuICAgICAgICAgICAgbSA9IG5ldyBMYW1iZXJ0aWFuKFxyXG4gICAgICAgICAgICAgIG5ldyBWZWN0b3IzKFxyXG4gICAgICAgICAgICAgICAgX20zLmFsYmVkby5fZWxlbWVudHNbMF0sXHJcbiAgICAgICAgICAgICAgICBfbTMuYWxiZWRvLl9lbGVtZW50c1sxXSxcclxuICAgICAgICAgICAgICAgIF9tMy5hbGJlZG8uX2VsZW1lbnRzWzJdXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgX2NlbnRlciA9IF9zLmNlbnRlci5fZWxlbWVudHNcclxuICAgICAgICBsZXQgY2VudGVyOiBWZWN0b3IzXHJcbiAgICAgICAgY2VudGVyID0gbmV3IFZlY3RvcjMoX2NlbnRlclswXSwgX2NlbnRlclsxXSwgX2NlbnRlclsyXSlcclxuICAgICAgICBsZXQgcyA9IG5ldyBTcGhlcmUoY2VudGVyLCBfcy5yYWRpdXMsIG0pXHJcbiAgICAgICAgbGlzdFtpbmRleF0gPSBzXHJcbiAgICAgICAgYnJlYWtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxldCBzY2VuZSA9IG5ldyBIaXRhYmxlTGlzdChsaXN0LCBsaXN0U2l6ZSlcclxuXHJcbiAgLy8gY2FtZXJhXHJcbiAgbGV0IGxvb2tGcm9tID0gbmV3IFZlY3RvcjMoMTMsIDIsIDMpXHJcbiAgbGV0IGxvb2tBdCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgbGV0IHZ1cCA9IG5ldyBWZWN0b3IzKDAsIDEsIDApXHJcbiAgbGV0IHZmb3YgPSAyMFxyXG4gIGxldCBhc3BlY3QgPSBueCAvIG55XHJcbiAgbGV0IGFwZXJ0dXJlID0gMC4xXHJcbiAgbGV0IGZvY3VzRGlzdCA9IDEwLjBcclxuICBsZXQgY2FtID0gbmV3IENhbWVyYShsb29rRnJvbSwgbG9va0F0LCB2dXAsIHZmb3YsIGFzcGVjdCwgYXBlcnR1cmUsIGZvY3VzRGlzdClcclxuXHJcbiAgbGV0IGNvbEFycmF5ID0gbmV3IEFycmF5PE51bWJlcj4oKVxyXG5cclxuICBmb3IgKGxldCBqID0gc3RhcnQ7IGogPD0gZW5kOyBqKyspIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbng7IGkrKykge1xyXG4gICAgICBsZXQgY29sID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCBuczsgcysrKSB7XHJcbiAgICAgICAgbGV0IHUgPSAoaSArIE1hdGgucmFuZG9tKCkpIC8gbnhcclxuICAgICAgICBsZXQgdiA9IChueSAtIDEgLSAoaiArIE1hdGgucmFuZG9tKCkpKSAvIG55XHJcbiAgICAgICAgbGV0IHIgPSBjYW0uZ2V0UmF5KHUsIHYpXHJcbiAgICAgICAgY29sLmlhZGQoQ29sb3Iociwgc2NlbmUsIDApKVxyXG4gICAgICB9XHJcbiAgICAgIGNvbC5pZGl2KG5zKVxyXG4gICAgICBjb2wgPSBjb2wuZ2FtbWEyKClcclxuXHJcbiAgICAgIGNvbEFycmF5LnB1c2goTWF0aC5mbG9vcigyNTUuOTkgKiBjb2wucigpKSlcclxuICAgICAgY29sQXJyYXkucHVzaChNYXRoLmZsb29yKDI1NS45OSAqIGNvbC5nKCkpKVxyXG4gICAgICBjb2xBcnJheS5wdXNoKE1hdGguZmxvb3IoMjU1Ljk5ICogY29sLmIoKSkpXHJcbiAgICAgIGNvbEFycmF5LnB1c2goMjU1KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3R4LnBvc3RNZXNzYWdlKHtcclxuICAgIGNvbDogY29sQXJyYXksXHJcbiAgICBzdGFydFZhbDogc3RhcnQsXHJcbiAgICBlbmRWYWw6IGVuZCxcclxuICAgIGlkOiBpZCxcclxuICAgIGVuZE1heFZhbDogZW5kTWF4XHJcbiAgfSlcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9