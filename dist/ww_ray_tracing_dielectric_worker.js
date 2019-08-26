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


  var cam = new camera_1.Camera();
  var list = new Array(5);
  list[0] = new sphere_1.Sphere(new vector3_1.Vector3(0, 0, -1), 0.5, new lambertian_1.Lambertian(new vector3_1.Vector3(0.1, 0.2, 0.5)));
  list[1] = new sphere_1.Sphere(new vector3_1.Vector3(0, -100.5, -1), 100, new lambertian_1.Lambertian(new vector3_1.Vector3(0.8, 0.8, 0.0)));
  list[2] = new sphere_1.Sphere(new vector3_1.Vector3(1, 0, -1), 0.5, new metal_1.Metal(new vector3_1.Vector3(0.8, 0.6, 0.2), 1.0));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC9tYXRoX3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvY2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9kaWVsZWN0cmljLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9oaXRhYmxlLWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2hpdGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2xhbWJlcnRpYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL21hdGVyaWFsLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9tZXRhbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvcmF5LnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9zcGhlcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci93dy1yYXktdHJhY2luZy1kaWVsZWN0cmljLndvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNB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QixFQUE2QjtBQUMzQixZQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTCxFQUFMLElBQXNCLEVBQTlCO0FBQ0EsWUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBTCxJQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTCxFQUFkLENBQUQsSUFBaUMsRUFBekM7QUFDQSxZQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBSixDQUFXLENBQVgsRUFBYyxDQUFkLENBQVI7QUFDQSxXQUFHLENBQUMsSUFBSixDQUFTLEtBQUssQ0FBQyxDQUFELEVBQUksS0FBSixFQUFXLENBQVgsQ0FBZDtBQUNEOztBQUNELFNBQUcsQ0FBQyxJQUFKLENBQVMsRUFBVDtBQUNBLFNBQUcsR0FBRyxHQUFHLENBQUMsTUFBSixFQUFOO0FBRUEsY0FBUSxDQUFDLElBQVQsQ0FBYyxJQUFJLENBQUMsS0FBTCxDQUFXLFNBQVMsR0FBRyxDQUFDLENBQUosRUFBcEIsQ0FBZDtBQUNBLGNBQVEsQ0FBQyxJQUFULENBQWMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxTQUFTLEdBQUcsQ0FBQyxDQUFKLEVBQXBCLENBQWQ7QUFDQSxjQUFRLENBQUMsSUFBVCxDQUFjLElBQUksQ0FBQyxLQUFMLENBQVcsU0FBUyxHQUFHLENBQUMsQ0FBSixFQUFwQixDQUFkO0FBQ0EsY0FBUSxDQUFDLElBQVQsQ0FBYyxHQUFkO0FBQ0Q7QUFDRjs7QUFFRCxLQUFHLENBQUMsV0FBSixDQUFnQjtBQUNkLE9BQUcsRUFBRSxRQURTO0FBRWQsWUFBUSxFQUFFLEtBRkk7QUFHZCxVQUFNLEVBQUUsR0FITTtBQUlkLE1BQUUsRUFBRSxFQUpVO0FBS2QsYUFBUyxFQUFFO0FBTEcsR0FBaEI7QUFPRCxDQW5FRCxDIiwiZmlsZSI6Ind3X3JheV90cmFjaW5nX2RpZWxlY3RyaWNfd29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJkaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy93b3JrZXIvd3ctcmF5LXRyYWNpbmctZGllbGVjdHJpYy53b3JrZXIudHNcIik7XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKlxuICogIG1hdGhfdXRpbHMudHNcbiAqICBzaW1wbGUgbWF0aCBmdW5jdGlvbnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFic01heCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICByZXR1cm4geCAqIHggPiB5ICogeSA/IHggOiB5XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhYnNNaW4oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgcmV0dXJuIHggKiB4IDwgeSAqIHkgPyB4IDogeVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbXVsZGVjKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gIHJldHVybiAoeCAqIDEwICogKHkgKiAxMCkpIC8gMTAwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXZkZWMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgcmV0dXJuICh4ICogMTApIC8gKHkgKiAxMCkgLyAxMDBcbn1cbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqXG4gKiAgdmVjdG9yLnRzXG4gKiAgVC1EIHZlY3RvciBkYXRhXG4gKiAgVDp0eXBlLGRlZmF1bHQgc2V0dGluZyBpcyBudW1iZXJcbiAqICBEOmRpbWVuc2lvblxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuaW1wb3J0IHsgYWJzTWF4LCBhYnNNaW4gfSBmcm9tICcuL21hdGhfdXRpbHMnXG5cbmV4cG9ydCBjbGFzcyBWZWN0b3Ige1xuICBwcml2YXRlIF9lbGVtZW50czogQXJyYXk8bnVtYmVyPlxuICBwcml2YXRlIF9kaW1lbnNpb246IG51bWJlclxuXG4gIC8vIGNvbnN0cnVjdHMgdmVjdG9yIHdpdGggcGFyYW1ldGVycyBvciB6ZXJvXG4gIGNvbnN0cnVjdG9yKGRpbWVuc2lvbjogbnVtYmVyLCBwYXJhbXM/OiBBcnJheTxudW1iZXI+KSB7XG4gICAgdGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uXG4gICAgbGV0IF9pID0gMFxuICAgIGlmIChwYXJhbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gaW5pdCBuIGRpbWVuc2lvbiB2ZWN0b3IgZGF0YSxzZXR0aW5nIGFsbCAwXG4gICAgICB0aGlzLl9lbGVtZW50cyA9IG5ldyBBcnJheTxudW1iZXI+KGRpbWVuc2lvbilcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IGRpbWVuc2lvbjsgX2krKykge1xuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRzID0gbmV3IEFycmF5PG51bWJlcj4oZGltZW5zaW9uKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgcGFyYW1zLmxlbmd0aDsgX2krKykge1xuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSBwYXJhbXNbX2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0KHBhcmFtczogVmVjdG9yIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAocGFyYW1zLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCBwYXJhbXMuc2l6ZSgpOyBfaSsrKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IHBhcmFtcy5kYXRhKClbX2ldXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgc2V0WmVybygpIHtcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XG4gICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXG4gICAgfVxuICB9XG5cbiAgc2V0T25lKCkge1xuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDFcbiAgICB9XG4gIH1cblxuICBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1xuICB9XG5cbiAgYXQoaWR4OiBudW1iZXIpIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdpbmRleCBpcyBub3QgY29ycmVjdCEnKVxuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1tpZHhdXG4gIH1cblxuICBkb3Qob3RoZXJzOiBWZWN0b3IgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdvdGhlcnMgaXMgbm90IGNvcnJlY3QhJylcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICBpZiAob3RoZXJzLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkaW1lbnNpb24gaXMgbm90IGNvcnJlY3QhJylcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGxldCByZXQgPSAwXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XG4gICAgICByZXQgKz0gdGhpcy5fZWxlbWVudHNbX2ldICogb3RoZXJzLmRhdGEoKVtfaV1cbiAgICB9XG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgbGVuZ3RoU3F1YXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcylcbiAgfVxuXG4gIGxlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCgpKVxuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIHRoaXMuaWRpdih0aGlzLmxlbmd0aCgpKVxuICB9XG5cbiAgc3VtKCkge1xuICAgIGxldCByZXQgPSAwXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xuICAgICAgcmV0ICs9IHRoaXMuX2VsZW1lbnRzW19pXVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25cbiAgfVxuXG4gIGF2ZygpIHtcbiAgICByZXR1cm4gdGhpcy5zdW0oKSAvIHRoaXMuc2l6ZSgpXG4gIH1cblxuICBtaW4oKSB7XG4gICAgbGV0IG1pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXG5cbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XG4gICAgICBtaW5WYWwgPSBNYXRoLm1pbihtaW5WYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcbiAgICB9XG4gICAgcmV0dXJuIG1pblZhbFxuICB9XG5cbiAgbWF4KCkge1xuICAgIGxldCBtYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcbiAgICAgIG1heFZhbCA9IE1hdGgubWF4KG1heFZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxuICAgIH1cbiAgICByZXR1cm4gbWF4VmFsXG4gIH1cblxuICBhYnNtYXgoKSB7XG4gICAgbGV0IGFic01heFZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xuICAgICAgYWJzTWF4VmFsID0gYWJzTWF4KGFic01heFZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxuICAgIH1cbiAgICByZXR1cm4gYWJzTWF4VmFsXG4gIH1cblxuICBhYnNtaW4oKSB7XG4gICAgbGV0IGFic01pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xuICAgICAgYWJzTWluVmFsID0gYWJzTWluKGFic01pblZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxuICAgIH1cbiAgICByZXR1cm4gYWJzTWluVmFsXG4gIH1cblxuICBkaXN0YW5jZVNxdWFyZWRUbyhvdGhlcnM6IFZlY3Rvcikge1xuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xuICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuXG4gICAgbGV0IHJldCA9IDBcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcbiAgICAgIGxldCBkaWZmID0gdGhpcy5fZWxlbWVudHNbX2ldIC0gb3RoZXJzLmRhdGEoKVtfaV1cbiAgICAgIHJldCArPSBkaWZmICogZGlmZlxuICAgIH1cblxuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIGRpc3RhbmNlVG8ob3RoZXJzOiBWZWN0b3IpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzKSlcbiAgfVxuXG4gIGlzRXF1YWwob3RoZXJzOiBWZWN0b3IpIHtcbiAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVycy5zaXplKCkpIHJldHVybiBmYWxzZVxuXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XG4gICAgICBpZiAodGhpcy5hdChfaSkgIT09IG90aGVycy5hdChfaSkpIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpc1NpbWlsYXIob3RoZXJzOiBWZWN0b3IgfCB1bmRlZmluZWQsIGVwc2lsb246IG51bWJlcikge1xuICAgIGlmIChvdGhlcnMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlcnMuc2l6ZSgpKSByZXR1cm4gZmFsc2VcblxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYXQoX2kpIC0gb3RoZXJzLmF0KF9pKSkgPiBlcHNpbG9uKSByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgYWRkKHBhcmFtcz86IGFueSkge1xuICAgIGxldCBfaSA9IDBcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCB2ID0gcGFyYW1zXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICs9IHYuZGF0YSgpW19pXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGxldCBzID0gcGFyYW1zXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICs9IHNcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld1ZcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuICB9XG5cbiAgc3ViKHBhcmFtcz86IGFueSkge1xuICAgIGxldCBfaSA9IDBcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCB2ID0gcGFyYW1zXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHYuZGF0YSgpW19pXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGxldCBzID0gcGFyYW1zXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHNcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld1ZcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuICB9XG5cbiAgbXVsKHBhcmFtcz86IGFueSkge1xuICAgIGxldCBfaSA9IDBcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCB2ID0gcGFyYW1zXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHYuZGF0YSgpW19pXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGxldCBzID0gcGFyYW1zXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHNcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld1ZcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuICB9XG5cbiAgZGl2KHBhcmFtcz86IGFueSkge1xuICAgIGxldCBfaSA9IDBcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCB2ID0gcGFyYW1zXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC89IHYuZGF0YSgpW19pXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGxldCBzID0gcGFyYW1zXG4gICAgICBpZiAocyA9PT0gMCkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLz0gc1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH1cblxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXG4gIH1cblxuICBpZGl2KHBhcmFtcz86IGFueSkge1xuICAgIHRoaXMuc2V0KHRoaXMuZGl2KHBhcmFtcykpXG4gIH1cblxuICBpYWRkKHBhcmFtcz86IGFueSkge1xuICAgIHRoaXMuc2V0KHRoaXMuYWRkKHBhcmFtcykpXG4gIH1cblxuICBpc3ViKHBhcmFtcz86IGFueSkge1xuICAgIHRoaXMuc2V0KHRoaXMuc3ViKHBhcmFtcykpXG4gIH1cblxuICBpbXVsKHBhcmFtcz86IGFueSkge1xuICAgIHRoaXMuc2V0KHRoaXMubXVsKHBhcmFtcykpXG4gIH1cblxuICBzZXRBdChpZHg6IG51bWJlciwgdmFsOiBudW1iZXIpIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICB0aGlzLl9lbGVtZW50c1tpZHhdID0gdmFsXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiBwcm9qX3UodikgPSA8dSx2Pi88dix2PiB1XG4gICAqIEBwYXJhbSB1XG4gICAqIEBwYXJhbSB2XG4gICAqL1xuICBzdGF0aWMgcHJvaih1OiBWZWN0b3IsIHY6IFZlY3Rvcikge1xuICAgIHJldHVybiB1Lm11bCh2LmRvdCh1KSAvIHUuZG90KHUpKVxuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuL3ZlY3RvcidcblxuZXhwb3J0IGNsYXNzIFZlY3RvcjMgZXh0ZW5kcyBWZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihlMTogbnVtYmVyLCBlMjogbnVtYmVyLCBlMzogbnVtYmVyKSB7XG4gICAgc3VwZXIoMywgbmV3IEFycmF5PG51bWJlcj4oZTEsIGUyLCBlMykpXG4gIH1cblxuICB4KCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEoKVswXVxuICB9XG4gIHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzFdXG4gIH1cbiAgeigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMl1cbiAgfVxuICByKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEoKVswXVxuICB9XG4gIGcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzFdXG4gIH1cbiAgYigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMl1cbiAgfVxuXG4gIGlzZXQodjM6IFZlY3RvcjMpIHtcbiAgICB0aGlzLmRhdGEoKVswXSA9IHYzLnIoKVxuICAgIHRoaXMuZGF0YSgpWzFdID0gdjMuZygpXG4gICAgdGhpcy5kYXRhKClbMl0gPSB2My5iKClcbiAgfVxuXG4gIHNldCh2MzogVmVjdG9yMykge1xuICAgIHJldHVybiBzdXBlci5zZXQobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxuICB9XG5cbiAgYWRkKHYzOiBhbnkpIHtcbiAgICBsZXQgYWRkdiA9IHN1cGVyLmFkZCh2MylcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoYWRkdi5kYXRhKClbMF0sIGFkZHYuZGF0YSgpWzFdLCBhZGR2LmRhdGEoKVsyXSlcbiAgfVxuXG4gIHN1Yih2MzogYW55KSB7XG4gICAgbGV0IHN1YnYgPSBzdXBlci5zdWIodjMpXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKHN1YnYuZGF0YSgpWzBdLCBzdWJ2LmRhdGEoKVsxXSwgc3Vidi5kYXRhKClbMl0pXG4gIH1cblxuICBtdWwodjM6IGFueSkge1xuICAgIGxldCBtdWx2ID0gc3VwZXIubXVsKHYzKVxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhtdWx2LmRhdGEoKVswXSwgbXVsdi5kYXRhKClbMV0sIG11bHYuZGF0YSgpWzJdKVxuICB9XG5cbiAgZGl2KHYzOiBhbnkpIHtcbiAgICBsZXQgZGl2diA9IHN1cGVyLmRpdih2MylcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoZGl2di5kYXRhKClbMF0sIGRpdnYuZGF0YSgpWzFdLCBkaXZ2LmRhdGEoKVsyXSlcbiAgfVxuXG4gIGRvdCh2MzogVmVjdG9yMykge1xuICAgIHJldHVybiBzdXBlci5kb3QobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxuICB9XG5cbiAgdW5pdFZlYzMoKTogVmVjdG9yMyB7XG4gICAgbGV0IG52ID0gbmV3IFZlY3RvcigzLCB0aGlzLmRhdGEoKSlcbiAgICBudi5ub3JtYWxpemUoKVxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhudi5kYXRhKClbMF0sIG52LmRhdGEoKVsxXSwgbnYuZGF0YSgpWzJdKVxuICB9XG5cbiAgZ2FtbWEyKCk6IFZlY3RvcjMge1xuICAgIGxldCB0diA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKFxuICAgICAgTWF0aC5zcXJ0KHR2LmF0KDApKSxcbiAgICAgIE1hdGguc3FydCh0di5hdCgxKSksXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMikpXG4gICAgKVxuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcblxuZXhwb3J0IGNsYXNzIENhbWVyYSB7XG4gIGxvd2VyTGVmdENvcm5lcjogVmVjdG9yM1xuICBob3Jpem9udGFsOiBWZWN0b3IzXG4gIHZlcnRpY2FsOiBWZWN0b3IzXG4gIG9yaWdpbjogVmVjdG9yM1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxvd2VyTGVmdENvcm5lciA9IG5ldyBWZWN0b3IzKC0yLCAtMSwgLTEpXG4gICAgdGhpcy5ob3Jpem9udGFsID0gbmV3IFZlY3RvcjMoNCwgMCwgMClcbiAgICB0aGlzLnZlcnRpY2FsID0gbmV3IFZlY3RvcjMoMCwgMiwgMClcbiAgICB0aGlzLm9yaWdpbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXG4gIH1cblxuICBnZXRSYXkodTogbnVtYmVyLCB2OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFJheShcbiAgICAgIHRoaXMub3JpZ2luLFxuICAgICAgdGhpcy5sb3dlckxlZnRDb3JuZXJcbiAgICAgICAgLmFkZCh0aGlzLmhvcml6b250YWwubXVsKHUpKVxuICAgICAgICAuYWRkKHRoaXMudmVydGljYWwubXVsKHYpKVxuICAgICAgICAuc3ViKHRoaXMub3JpZ2luKVxuICAgIClcbiAgfVxufVxuIiwiaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWwnXG5cbmV4cG9ydCBjbGFzcyBEaWVsZWN0cmljIGV4dGVuZHMgTWF0ZXJpYWwge1xuICBzY2F0dGVyZWQ6IFJheVxuICBhdHRlbnVhdGlvbjogVmVjdG9yM1xuICByZWZJZHg6IG51bWJlclxuXG4gIGNvbnN0cnVjdG9yKHJpOiBudW1iZXIpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5yZWZJZHggPSByaVxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMCkpXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXG4gIH1cblxuICBzY2F0dGVyKHI6IFJheSwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcbiAgICBsZXQgb3V0d2FyZE5vcm1hbCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXG4gICAgbGV0IHJlZnJhY3RlZCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXG5cbiAgICBsZXQgbmlPdmVyTnQgPSAwXG5cbiAgICBsZXQgcmVmbGVjdGVkID0gVXRpbHMucmVmbGVjdChyLmRpcmVjdGlvbigpLnVuaXRWZWMzKCksIHJlYy5ub3JtYWwpXG4gICAgbGV0IHJlZmxlY3RQcm9iID0gMFxuICAgIGxldCBjb3NpbmUgPSAwXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKDEsIDEsIDEpXG5cbiAgICBpZiAoci5kaXJlY3Rpb24oKS5kb3QocmVjLm5vcm1hbCkgPiAwKSB7XG4gICAgICBvdXR3YXJkTm9ybWFsID0gcmVjLm5vcm1hbC5tdWwoLTEpXG4gICAgICBuaU92ZXJOdCA9IHRoaXMucmVmSWR4XG4gICAgICBjb3NpbmUgPVxuICAgICAgICAodGhpcy5yZWZJZHggKiByLmRpcmVjdGlvbigpLmRvdChyZWMubm9ybWFsKSkgLyByLmRpcmVjdGlvbigpLmxlbmd0aCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHdhcmROb3JtYWwgPSByZWMubm9ybWFsXG4gICAgICBuaU92ZXJOdCA9IDEuMCAvIHRoaXMucmVmSWR4XG4gICAgICBjb3NpbmUgPSAtci5kaXJlY3Rpb24oKS5kb3QocmVjLm5vcm1hbCkgLyByLmRpcmVjdGlvbigpLmxlbmd0aCgpXG4gICAgfVxuXG4gICAgaWYgKFV0aWxzLnJlZnJhY3Qoci5kaXJlY3Rpb24oKSwgb3V0d2FyZE5vcm1hbCwgbmlPdmVyTnQsIHJlZnJhY3RlZCkpIHtcbiAgICAgIHJlZmxlY3RQcm9iID0gVXRpbHMuc2NobGljayhjb3NpbmUsIHRoaXMucmVmSWR4KVxuICAgIH0gZWxzZSB7XG4gICAgICByZWZsZWN0UHJvYiA9IDEuMFxuICAgIH1cblxuICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgcmVmbGVjdFByb2IpIHtcbiAgICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShyZWMucCwgcmVmbGVjdGVkKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkocmVjLnAsIHJlZnJhY3RlZClcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG4iLCJpbXBvcnQgeyBIaXRhYmxlLCBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcbmltcG9ydCB7IExhbWJlcnRpYW4gfSBmcm9tICcuL2xhbWJlcnRpYW4nXG5cbmV4cG9ydCBjbGFzcyBIaXRhYmxlTGlzdCBleHRlbmRzIEhpdGFibGUge1xuICBsaXN0OiBBcnJheTxIaXRhYmxlPlxuICBsaXN0U2l6ZTogbnVtYmVyXG4gIGNvbnN0cnVjdG9yKGw6IEFycmF5PEhpdGFibGU+LCBuOiBudW1iZXIpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5saXN0ID0gbFxuICAgIHRoaXMubGlzdFNpemUgPSBuXG4gIH1cblxuICBoaXQocjogUmF5LCB0TWluOiBudW1iZXIsIHRNYXg6IG51bWJlciwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcbiAgICBsZXQgdG1wUmVjID0gbmV3IEhpdFJlY29yZChcbiAgICAgIDAsXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxuICAgICAgbmV3IExhbWJlcnRpYW4obmV3IFZlY3RvcjMoMCwgMCwgMCkpXG4gICAgKVxuICAgIGxldCBoaXRBbnl0aGluZyA9IGZhbHNlXG4gICAgbGV0IGNsb3Nlc3RTb0ZhciA9IHRNYXhcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGlzdFNpemU7IGkrKykge1xuICAgICAgaWYgKHRoaXMubGlzdFtpXS5oaXQociwgdE1pbiwgY2xvc2VzdFNvRmFyLCB0bXBSZWMpKSB7XG4gICAgICAgIGhpdEFueXRoaW5nID0gdHJ1ZVxuICAgICAgICBjbG9zZXN0U29GYXIgPSB0bXBSZWMudFxuICAgICAgICByZWMudCA9IHRtcFJlYy50XG4gICAgICAgIHJlYy5wID0gdG1wUmVjLnBcbiAgICAgICAgcmVjLm5vcm1hbCA9IHRtcFJlYy5ub3JtYWxcbiAgICAgICAgcmVjLm1hdGVyaWFsID0gdG1wUmVjLm1hdGVyaWFsXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoaXRBbnl0aGluZ1xuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcblxuZXhwb3J0IGNsYXNzIEhpdFJlY29yZCB7XG4gIHQ6IG51bWJlclxuICBwOiBWZWN0b3IzXG4gIG5vcm1hbDogVmVjdG9yM1xuICBtYXRlcmlhbDogTWF0ZXJpYWxcblxuICBjb25zdHJ1Y3RvcihfdDogbnVtYmVyLCBfcDogVmVjdG9yMywgX25vcm1hbDogVmVjdG9yMywgX21hdGVyaWFsOiBNYXRlcmlhbCkge1xuICAgIHRoaXMudCA9IF90XG4gICAgdGhpcy5wID0gX3BcbiAgICB0aGlzLm5vcm1hbCA9IF9ub3JtYWxcbiAgICB0aGlzLm1hdGVyaWFsID0gX21hdGVyaWFsXG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEhpdGFibGUge1xuICBhYnN0cmFjdCBoaXQocjogUmF5LCB0TWluOiBudW1iZXIsIHRNYXg6IG51bWJlciwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuXG59XG4iLCJpbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcbmltcG9ydCB7IEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcblxuZXhwb3J0IGNsYXNzIExhbWJlcnRpYW4gZXh0ZW5kcyBNYXRlcmlhbCB7XG4gIGFsYmVkbzogVmVjdG9yM1xuICBzY2F0dGVyZWQ6IFJheVxuICBhdHRlbnVhdGlvbjogVmVjdG9yM1xuXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5hbGJlZG8gPSBhXG4gICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygwLCAwLCAwKSlcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcbiAgfVxuXG4gIHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xuICAgIGxldCB0YXJnZXQgPSByZWMucC5hZGQocmVjLm5vcm1hbCkuYWRkKFV0aWxzLlJhbmRvbUluVW5pdFNwaGVyZSgpKVxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShyZWMucCwgdGFyZ2V0LnN1YihyZWMucCkpXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKFxuICAgICAgdGhpcy5hbGJlZG8ueCgpLFxuICAgICAgdGhpcy5hbGJlZG8ueSgpLFxuICAgICAgdGhpcy5hbGJlZG8ueigpXG4gICAgKVxuICAgIHJldHVybiB0cnVlXG4gIH1cbn1cbiIsImltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xuaW1wb3J0IHsgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0ZXJpYWwge1xuICBhYnN0cmFjdCBzY2F0dGVyZWQ6IFJheVxuICBhYnN0cmFjdCBhdHRlbnVhdGlvbjogVmVjdG9yM1xuICBhYnN0cmFjdCBzY2F0dGVyKHI6IFJheSwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuXG59XG4iLCJpbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcbmltcG9ydCB7IEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcblxuZXhwb3J0IGNsYXNzIE1ldGFsIGV4dGVuZHMgTWF0ZXJpYWwge1xuICBhbGJlZG86IFZlY3RvcjNcbiAgc2NhdHRlcmVkOiBSYXlcbiAgYXR0ZW51YXRpb246IFZlY3RvcjNcbiAgZnV6ejogbnVtYmVyXG5cbiAgY29uc3RydWN0b3IoYTogVmVjdG9yMywgZjogbnVtYmVyKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuYWxiZWRvID0gYVxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMCkpXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXG5cbiAgICBpZiAoZiA8IDEpIHRoaXMuZnV6eiA9IGZcbiAgICBlbHNlIHRoaXMuZnV6eiA9IDFcbiAgfVxuXG4gIHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xuICAgIGxldCByZWZsZWN0ZWQgPSBVdGlscy5yZWZsZWN0KHIuZGlyZWN0aW9uKCkudW5pdFZlYzMoKSwgcmVjLm5vcm1hbClcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkoXG4gICAgICByZWMucCxcbiAgICAgIHJlZmxlY3RlZC5hZGQoVXRpbHMuUmFuZG9tSW5Vbml0U3BoZXJlKCkubXVsKHRoaXMuZnV6eikpXG4gICAgKVxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMyhcbiAgICAgIHRoaXMuYWxiZWRvLngoKSxcbiAgICAgIHRoaXMuYWxiZWRvLnkoKSxcbiAgICAgIHRoaXMuYWxiZWRvLnooKVxuICAgIClcbiAgICByZXR1cm4gdGhpcy5zY2F0dGVyZWQuZGlyZWN0aW9uKCkuZG90KHJlYy5ub3JtYWwpID4gMFxuICB9XG59XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKlxuICogIHJheS50c1xuICogIHJheSBmdW5jdGlvbiBmb3IgcCh0KSA9IEEgKyB0ICogQlxuICogIFQ6dHlwZSxkZWZhdWx0IHNldHRpbmcgaXMgbnVtYmVyXG4gKiAgRDpkaW1lbnNpb25cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcblxuZXhwb3J0IGNsYXNzIFJheSB7XG4gIHB1YmxpYyBfQTogVmVjdG9yM1xuICBwdWJsaWMgX0I6IFZlY3RvcjNcblxuICBjb25zdHJ1Y3RvcihhOiBWZWN0b3IzLCBiOiBWZWN0b3IzKSB7XG4gICAgdGhpcy5fQSA9IGFcbiAgICB0aGlzLl9CID0gYlxuICB9XG5cbiAgb3JpZ2luKCkge1xuICAgIHJldHVybiB0aGlzLl9BXG4gIH1cbiAgZGlyZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9CXG4gIH1cbiAgcG9pbnRBdFBhcmFtKHQ6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLl9BLmFkZCh0aGlzLl9CLm11bCh0KSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXG5cbmV4cG9ydCBjbGFzcyBTcGhlcmUgZXh0ZW5kcyBIaXRhYmxlIHtcbiAgY2VudGVyOiBWZWN0b3IzXG4gIHJhZGl1czogbnVtYmVyXG4gIG1hdGVyaWFsOiBNYXRlcmlhbFxuXG4gIGNvbnN0cnVjdG9yKGNlbjogVmVjdG9yMywgcjogbnVtYmVyLCBtYXQ6IE1hdGVyaWFsKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuY2VudGVyID0gY2VuXG4gICAgdGhpcy5yYWRpdXMgPSByXG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdFxuICB9XG5cbiAgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XG4gICAgbGV0IG9jID0gci5vcmlnaW4oKS5zdWIodGhpcy5jZW50ZXIpXG4gICAgbGV0IGEgPSByLmRpcmVjdGlvbigpLmRvdChyLmRpcmVjdGlvbigpKVxuICAgIGxldCBiID0gb2MuZG90KHIuZGlyZWN0aW9uKCkpXG4gICAgbGV0IGMgPSBvYy5kb3Qob2MpIC0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1c1xuICAgIGxldCBkaXNjcmltaW5hbnQgPSBiICogYiAtIGEgKiBjXG4gICAgaWYgKGRpc2NyaW1pbmFudCA+IDApIHtcbiAgICAgIGxldCB0bXAgPSAoLWIgLSBNYXRoLnNxcnQoYiAqIGIgLSBhICogYykpIC8gYVxuICAgICAgaWYgKHRtcCA8IHRNYXggJiYgdG1wID4gdE1pbikge1xuICAgICAgICByZWMudCA9IHRtcFxuICAgICAgICByZWMucCA9IHIucG9pbnRBdFBhcmFtKHJlYy50KVxuICAgICAgICByZWMubm9ybWFsID0gcmVjLnAuc3ViKHRoaXMuY2VudGVyKS5kaXYodGhpcy5yYWRpdXMpXG4gICAgICAgIHJlYy5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgdG1wID0gKC1iICsgTWF0aC5zcXJ0KGIgKiBiIC0gYSAqIGMpKSAvIGFcbiAgICAgIGlmICh0bXAgPCB0TWF4ICYmIHRtcCA+IHRNaW4pIHtcbiAgICAgICAgcmVjLnQgPSB0bXBcbiAgICAgICAgcmVjLnAgPSByLnBvaW50QXRQYXJhbShyZWMudClcbiAgICAgICAgcmVjLm5vcm1hbCA9IHJlYy5wLnN1Yih0aGlzLmNlbnRlcikuZGl2KHRoaXMucmFkaXVzKVxuICAgICAgICByZWMubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi9lZ21hdGgvdmVjdG9yMydcblxuZXhwb3J0IG5hbWVzcGFjZSBVdGlscyB7XG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb21JblVuaXRTcGhlcmUoKSB7XG4gICAgbGV0IHAgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxuICAgIGRvIHtcbiAgICAgIHAgPSBuZXcgVmVjdG9yMyhNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpKVxuICAgICAgICAubXVsKDIpXG4gICAgICAgIC5zdWIobmV3IFZlY3RvcjMoMSwgMSwgMSkpXG4gICAgfSB3aGlsZSAocC5sZW5ndGhTcXVhcmVkKCkgPj0gMS4wKVxuICAgIHJldHVybiBwXG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcmVmbGVjdCh2OiBWZWN0b3IzLCBuOiBWZWN0b3IzKSB7XG4gICAgcmV0dXJuIHYuc3ViKG4ubXVsKDIgKiB2LmRvdChuKSkpXG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gc2NobGljayhjb3NpbmU6IG51bWJlciwgcmVmSWR4OiBudW1iZXIpIHtcbiAgICBsZXQgcjAgPSAoMSAtIHJlZklkeCkgLyAoMSArIHJlZklkeClcbiAgICByMCA9IHIwICogcjBcbiAgICByZXR1cm4gcjAgKyAoMSAtIHIwKSAqIE1hdGgucG93KDEgLSBjb3NpbmUsIDUpXG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcmVmcmFjdChcbiAgICB2OiBWZWN0b3IzLFxuICAgIG46IFZlY3RvcjMsXG4gICAgbmlPdmVyTnQ6IG51bWJlcixcbiAgICByZWZyYWN0ZWQ6IFZlY3RvcjNcbiAgKSB7XG4gICAgbGV0IHV2ID0gdi51bml0VmVjMygpXG4gICAgbGV0IGR0ID0gdXYuZG90KG4pXG4gICAgbGV0IGRpc2NyaW1pbmFudCA9IDEuMCAtIG5pT3Zlck50ICogbmlPdmVyTnQgKiAoMSAtIGR0ICogZHQpXG4gICAgaWYgKGRpc2NyaW1pbmFudCA+IDApIHtcbiAgICAgIHJlZnJhY3RlZC5zZXQoXG4gICAgICAgIHV2XG4gICAgICAgICAgLnN1YihuLm11bChkdCkpXG4gICAgICAgICAgLm11bChuaU92ZXJOdClcbiAgICAgICAgICAuc3ViKG4ubXVsKE1hdGguc3FydChkaXNjcmltaW5hbnQpKSlcbiAgICAgIClcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb20obWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggKyAxIC0gbWluKSkgKyBtaW5cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBXcml0ZTJDYW52YXMoXG4gICAgY29udGV4dDogYW55LFxuICAgIGltYWdlQnVmOiBBcnJheTxudW1iZXI+LFxuICAgIHc6IG51bWJlcixcbiAgICBoOiBudW1iZXJcbiAgKSB7XG4gICAgbGV0IGNhbnZhc0ltYWdlID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdywgaClcbiAgICBsZXQgZGF0YSA9IGNhbnZhc0ltYWdlLmRhdGFcbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBkYXRhLmxlbmd0aDsgaWR4ICs9IDQpIHtcbiAgICAgIGRhdGFbaWR4ICsgMF0gPSBpbWFnZUJ1ZltpZHggKyAwXVxuICAgICAgZGF0YVtpZHggKyAxXSA9IGltYWdlQnVmW2lkeCArIDFdXG4gICAgICBkYXRhW2lkeCArIDJdID0gaW1hZ2VCdWZbaWR4ICsgMl1cbiAgICAgIGRhdGFbaWR4ICsgM10gPSBpbWFnZUJ1ZltpZHggKyAzXVxuICAgIH1cbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShjYW52YXNJbWFnZSwgMCwgMClcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBHZW5lcmF0ZU5vaXNlKFxuICAgIGltYWdlQnVmZmVyOiBBcnJheTxudW1iZXI+LFxuICAgIHN0YXJ0SWR4OiBudW1iZXIsXG4gICAgZW5kSWR4OiBudW1iZXJcbiAgKSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSBzdGFydElkeDsgaW5kZXggPCBlbmRJZHg7IGluZGV4ICs9IDQpIHtcbiAgICAgIGxldCByID0gUmFuZG9tKDAsIDI1NSlcbiAgICAgIGxldCBnID0gUmFuZG9tKDAsIDI1NSlcbiAgICAgIGxldCBiID0gUmFuZG9tKDAsIDI1NSlcblxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXhdID0gclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAxXSA9IGdcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMl0gPSBiXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleCArIDNdID0gMjU1XG4gICAgfVxuICAgIHJldHVybiBpbWFnZUJ1ZmZlclxuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuLi9lZ3JlbmRlci9yYXknXG5pbXBvcnQgeyBIaXRhYmxlLCBIaXRSZWNvcmQgfSBmcm9tICcuLi9lZ3JlbmRlci9oaXRhYmxlJ1xuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSAnLi4vZWdyZW5kZXIvY2FtZXJhJ1xuaW1wb3J0IHsgU3BoZXJlIH0gZnJvbSAnLi4vZWdyZW5kZXIvc3BoZXJlJ1xuaW1wb3J0IHsgSGl0YWJsZUxpc3QgfSBmcm9tICcuLi9lZ3JlbmRlci9oaXRhYmxlLWxpc3QnXG5pbXBvcnQgeyBMYW1iZXJ0aWFuIH0gZnJvbSAnLi4vZWdyZW5kZXIvbGFtYmVydGlhbidcbmltcG9ydCB7IE1ldGFsIH0gZnJvbSAnLi4vZWdyZW5kZXIvbWV0YWwnXG5pbXBvcnQgeyBEaWVsZWN0cmljIH0gZnJvbSAnLi4vZWdyZW5kZXIvZGllbGVjdHJpYydcblxuY29uc3QgY3R4OiBXb3JrZXIgPSBzZWxmIGFzIGFueVxuXG5mdW5jdGlvbiBDb2xvcihyOiBSYXksIHdvcmxkOiBIaXRhYmxlLCBkZXB0aDogbnVtYmVyKTogVmVjdG9yMyB7XG4gIGxldCBjb2wgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxuXG4gIGxldCBhdHRlbnVhdGlvblN1bSA9IG5ldyBWZWN0b3IzKDEsIDEsIDEpXG4gIGZvciAobGV0IG4gPSAwOyBuIDwgTnVtYmVyLk1BWF9WQUxVRTsgbisrKSB7XG4gICAgbGV0IHJlYyA9IG5ldyBIaXRSZWNvcmQoXG4gICAgICAwLFxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcbiAgICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAsIDAsIDApKVxuICAgIClcbiAgICBsZXQgYkhpdCA9IHdvcmxkLmhpdChyLCAwLjAwMSwgTnVtYmVyLk1BWF9WQUxVRSwgcmVjKVxuICAgIGlmICghYkhpdCkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gICAgbGV0IGJTY2F0dGVyID0gcmVjLm1hdGVyaWFsLnNjYXR0ZXIociwgcmVjKVxuICAgIGxldCBzY2F0dGVyZWQgPSByZWMubWF0ZXJpYWwuc2NhdHRlcmVkXG4gICAgbGV0IGF0dGVudWF0aW9uID0gcmVjLm1hdGVyaWFsLmF0dGVudWF0aW9uXG4gICAgaWYgKGJTY2F0dGVyICYmIGRlcHRoIDwgNTApIHtcbiAgICAgIGRlcHRoKytcbiAgICAgIHIgPSBzY2F0dGVyZWRcbiAgICAgIGF0dGVudWF0aW9uU3VtLmltdWwoYXR0ZW51YXRpb24pXG4gICAgfSBlbHNlIHtcbiAgICAgIGF0dGVudWF0aW9uU3VtID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgbGV0IHVuaXREaXIgPSByLmRpcmVjdGlvbigpLnVuaXRWZWMzKClcbiAgbGV0IHQgPSAwLjUgKiAodW5pdERpci55KCkgKyAxLjApXG4gIGNvbCA9IG5ldyBWZWN0b3IzKDEuMCwgMS4wLCAxLjApXG4gICAgLm11bCgxLjAgLSB0KVxuICAgIC5hZGQobmV3IFZlY3RvcjMoMC41LCAwLjcsIDEuMCkubXVsKHQpKVxuICBjb2wuaW11bChhdHRlbnVhdGlvblN1bSlcblxuICByZXR1cm4gY29sXG59XG5cbmN0eC5vbm1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gIGxldCBwYXJhbSA9IG1lc3NhZ2UuZGF0YVxuICBsZXQgaWQgPSBwYXJhbS5pZFxuICBsZXQgc3RhcnQgPSBwYXJhbS5zdGFydFxuICBsZXQgZW5kID0gcGFyYW0uZW5kXG4gIGxldCBlbmRNYXggPSBwYXJhbS5lbmRNYXhcblxuICBsZXQgbnggPSBwYXJhbS53aWR0aFxuICBsZXQgbnkgPSBwYXJhbS5oZWlnaHRcbiAgbGV0IG5zID0gcGFyYW0uc2FtcGxpbmdOdW1cblxuICAvLyBwcm9jZXNzIGVuZFxuICBpZiAoZW5kID4gZW5kTWF4KSB7XG4gICAgZW5kID0gZW5kTWF4XG4gIH1cblxuICAvLyBvYmplY3RcbiAgbGV0IGNhbSA9IG5ldyBDYW1lcmEoKVxuICBsZXQgbGlzdCA9IG5ldyBBcnJheTxIaXRhYmxlPig1KVxuICBsaXN0WzBdID0gbmV3IFNwaGVyZShcbiAgICBuZXcgVmVjdG9yMygwLCAwLCAtMSksXG4gICAgMC41LFxuICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAuMSwgMC4yLCAwLjUpKVxuICApXG4gIGxpc3RbMV0gPSBuZXcgU3BoZXJlKFxuICAgIG5ldyBWZWN0b3IzKDAsIC0xMDAuNSwgLTEpLFxuICAgIDEwMCxcbiAgICBuZXcgTGFtYmVydGlhbihuZXcgVmVjdG9yMygwLjgsIDAuOCwgMC4wKSlcbiAgKVxuICBsaXN0WzJdID0gbmV3IFNwaGVyZShcbiAgICBuZXcgVmVjdG9yMygxLCAwLCAtMSksXG4gICAgMC41LFxuICAgIG5ldyBNZXRhbChuZXcgVmVjdG9yMygwLjgsIDAuNiwgMC4yKSwgMS4wKVxuICApXG4gIGxpc3RbM10gPSBuZXcgU3BoZXJlKG5ldyBWZWN0b3IzKC0xLCAwLCAtMSksIDAuNSwgbmV3IERpZWxlY3RyaWMoMS41KSlcbiAgbGlzdFs0XSA9IG5ldyBTcGhlcmUobmV3IFZlY3RvcjMoLTEsIDAsIC0xKSwgLTAuNDUsIG5ldyBEaWVsZWN0cmljKDEuNSkpXG5cbiAgbGV0IHdvcmxkID0gbmV3IEhpdGFibGVMaXN0KGxpc3QsIDUpXG5cbiAgbGV0IGNvbEFycmF5ID0gbmV3IEFycmF5PE51bWJlcj4oKVxuXG4gIGZvciAobGV0IGogPSBzdGFydDsgaiA8PSBlbmQ7IGorKykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbng7IGkrKykge1xuICAgICAgbGV0IGNvbCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXG4gICAgICBmb3IgKGxldCBzID0gMDsgcyA8IG5zOyBzKyspIHtcbiAgICAgICAgbGV0IHUgPSAoaSArIE1hdGgucmFuZG9tKCkpIC8gbnhcbiAgICAgICAgbGV0IHYgPSAobnkgLSAxIC0gKGogKyBNYXRoLnJhbmRvbSgpKSkgLyBueVxuICAgICAgICBsZXQgciA9IGNhbS5nZXRSYXkodSwgdilcbiAgICAgICAgY29sLmlhZGQoQ29sb3Iociwgd29ybGQsIDApKVxuICAgICAgfVxuICAgICAgY29sLmlkaXYobnMpXG4gICAgICBjb2wgPSBjb2wuZ2FtbWEyKClcblxuICAgICAgY29sQXJyYXkucHVzaChNYXRoLmZsb29yKDI1NS45OSAqIGNvbC5yKCkpKVxuICAgICAgY29sQXJyYXkucHVzaChNYXRoLmZsb29yKDI1NS45OSAqIGNvbC5nKCkpKVxuICAgICAgY29sQXJyYXkucHVzaChNYXRoLmZsb29yKDI1NS45OSAqIGNvbC5iKCkpKVxuICAgICAgY29sQXJyYXkucHVzaCgyNTUpXG4gICAgfVxuICB9XG5cbiAgY3R4LnBvc3RNZXNzYWdlKHtcbiAgICBjb2w6IGNvbEFycmF5LFxuICAgIHN0YXJ0VmFsOiBzdGFydCxcbiAgICBlbmRWYWw6IGVuZCxcbiAgICBpZDogaWQsXG4gICAgZW5kTWF4VmFsOiBlbmRNYXhcbiAgfSlcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=