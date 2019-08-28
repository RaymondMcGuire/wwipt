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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/worker/ww-ray-tracing-lambertian.worker.ts");
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

/***/ "./src/worker/ww-ray-tracing-lambertian.worker.ts":
/*!********************************************************!*\
  !*** ./src/worker/ww-ray-tracing-lambertian.worker.ts ***!
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
  var list = new Array(2);
  list[0] = new sphere_1.Sphere(new vector3_1.Vector3(0, 0, -1), 0.5, new lambertian_1.Lambertian(new vector3_1.Vector3(0.8, 0.3, 0.3)));
  list[1] = new sphere_1.Sphere(new vector3_1.Vector3(0, -100.5, -1), 100, new lambertian_1.Lambertian(new vector3_1.Vector3(0.8, 0.8, 0.0)));
  var world = new hitable_list_1.HitableList(list, 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC9tYXRoX3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvY2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9oaXRhYmxlLWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2hpdGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2xhbWJlcnRpYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL21hdGVyaWFsLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9yYXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL3NwaGVyZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2VyL3d3LXJheS10cmFjaW5nLWxhbWJlcnRpYW4ud29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFF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Q0EsV0FBRyxDQUFDLElBQUosQ0FBUyxLQUFLLENBQUMsQ0FBRCxFQUFJLEtBQUosRUFBVyxDQUFYLENBQWQ7QUFDRDs7QUFDRCxTQUFHLENBQUMsSUFBSixDQUFTLEVBQVQ7QUFDQSxTQUFHLEdBQUcsR0FBRyxDQUFDLE1BQUosRUFBTjtBQUVBLGNBQVEsQ0FBQyxJQUFULENBQWMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxTQUFTLEdBQUcsQ0FBQyxDQUFKLEVBQXBCLENBQWQ7QUFDQSxjQUFRLENBQUMsSUFBVCxDQUFjLElBQUksQ0FBQyxLQUFMLENBQVcsU0FBUyxHQUFHLENBQUMsQ0FBSixFQUFwQixDQUFkO0FBQ0EsY0FBUSxDQUFDLElBQVQsQ0FBYyxJQUFJLENBQUMsS0FBTCxDQUFXLFNBQVMsR0FBRyxDQUFDLENBQUosRUFBcEIsQ0FBZDtBQUNBLGNBQVEsQ0FBQyxJQUFULENBQWMsR0FBZDtBQUNEO0FBQ0Y7O0FBRUQsS0FBRyxDQUFDLFdBQUosQ0FBZ0I7QUFDZCxPQUFHLEVBQUUsUUFEUztBQUVkLFlBQVEsRUFBRSxLQUZJO0FBR2QsVUFBTSxFQUFFLEdBSE07QUFJZCxNQUFFLEVBQUUsRUFKVTtBQUtkLGFBQVMsRUFBRTtBQUxHLEdBQWhCO0FBT0QsQ0FuRUQsQyIsImZpbGUiOiJ3d19yYXlfdHJhY2luZ19sYW1iZXJ0aWFuX3dvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvd29ya2VyL3d3LXJheS10cmFjaW5nLWxhbWJlcnRpYW4ud29ya2VyLnRzXCIpO1xuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKlxyXG4gKiAgbWF0aF91dGlscy50c1xyXG4gKiAgc2ltcGxlIG1hdGggZnVuY3Rpb25zXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhYnNNYXgoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICByZXR1cm4geCAqIHggPiB5ICogeSA/IHggOiB5XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhYnNNaW4oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICByZXR1cm4geCAqIHggPCB5ICogeSA/IHggOiB5XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtdWxkZWMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICByZXR1cm4gKHggKiAxMCAqICh5ICogMTApKSAvIDEwMFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGl2ZGVjKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuICh4ICogMTApIC8gKHkgKiAxMCkgLyAxMDBcclxufVxyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqICB2ZWN0b3IudHNcclxuICogIFQtRCB2ZWN0b3IgZGF0YVxyXG4gKiAgVDp0eXBlLGRlZmF1bHQgc2V0dGluZyBpcyBudW1iZXJcclxuICogIEQ6ZGltZW5zaW9uXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuaW1wb3J0IHsgYWJzTWF4LCBhYnNNaW4gfSBmcm9tICcuL21hdGhfdXRpbHMnXHJcblxyXG5leHBvcnQgY2xhc3MgVmVjdG9yIHtcclxuICBfZWxlbWVudHM6IEFycmF5PG51bWJlcj5cclxuICBfZGltZW5zaW9uOiBudW1iZXJcclxuXHJcbiAgLy8gY29uc3RydWN0cyB2ZWN0b3Igd2l0aCBwYXJhbWV0ZXJzIG9yIHplcm9cclxuICBjb25zdHJ1Y3RvcihkaW1lbnNpb246IG51bWJlciwgcGFyYW1zPzogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgdGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uXHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAocGFyYW1zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgLy8gaW5pdCBuIGRpbWVuc2lvbiB2ZWN0b3IgZGF0YSxzZXR0aW5nIGFsbCAwXHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzID0gbmV3IEFycmF5PG51bWJlcj4oZGltZW5zaW9uKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBkaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzID0gbmV3IEFycmF5PG51bWJlcj4oZGltZW5zaW9uKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBwYXJhbXMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gcGFyYW1zW19pXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQocGFyYW1zOiBWZWN0b3IgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAocGFyYW1zLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHBhcmFtcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSBwYXJhbXMuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxuICBzZXRaZXJvKCkge1xyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRPbmUoKSB7XHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDFcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudHNcclxuICB9XHJcblxyXG4gIGF0KGlkeDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2luZGV4IGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRzW2lkeF1cclxuICB9XHJcblxyXG4gIGRvdChvdGhlcnM6IFZlY3RvciB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG90aGVycyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdvdGhlcnMgaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICBpZiAob3RoZXJzLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIHJldCArPSB0aGlzLl9lbGVtZW50c1tfaV0gKiBvdGhlcnMuZGF0YSgpW19pXVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxuXHJcbiAgbGVuZ3RoU3F1YXJlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKVxyXG4gIH1cclxuXHJcbiAgbGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbmd0aFNxdWFyZWQoKSlcclxuICB9XHJcblxyXG4gIG5vcm1hbGl6ZSgpIHtcclxuICAgIHRoaXMuaWRpdih0aGlzLmxlbmd0aCgpKVxyXG4gIH1cclxuXHJcbiAgc3VtKCkge1xyXG4gICAgbGV0IHJldCA9IDBcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgcmV0ICs9IHRoaXMuX2VsZW1lbnRzW19pXVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxuXHJcbiAgc2l6ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25cclxuICB9XHJcblxyXG4gIGF2ZygpIHtcclxuICAgIHJldHVybiB0aGlzLnN1bSgpIC8gdGhpcy5zaXplKClcclxuICB9XHJcblxyXG4gIG1pbigpIHtcclxuICAgIGxldCBtaW5WYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG5cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgbWluVmFsID0gTWF0aC5taW4obWluVmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWluVmFsXHJcbiAgfVxyXG5cclxuICBtYXgoKSB7XHJcbiAgICBsZXQgbWF4VmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgbWF4VmFsID0gTWF0aC5tYXgobWF4VmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWF4VmFsXHJcbiAgfVxyXG5cclxuICBhYnNtYXgoKSB7XHJcbiAgICBsZXQgYWJzTWF4VmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgYWJzTWF4VmFsID0gYWJzTWF4KGFic01heFZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFic01heFZhbFxyXG4gIH1cclxuXHJcbiAgYWJzbWluKCkge1xyXG4gICAgbGV0IGFic01pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIGFic01pblZhbCA9IGFic01pbihhYnNNaW5WYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBhYnNNaW5WYWxcclxuICB9XHJcblxyXG4gIGRpc3RhbmNlU3F1YXJlZFRvKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICBpZiAob3RoZXJzLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGxldCBkaWZmID0gdGhpcy5fZWxlbWVudHNbX2ldIC0gb3RoZXJzLmRhdGEoKVtfaV1cclxuICAgICAgcmV0ICs9IGRpZmYgKiBkaWZmXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxuXHJcbiAgZGlzdGFuY2VUbyhvdGhlcnM6IFZlY3Rvcikge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlU3F1YXJlZFRvKG90aGVycykpXHJcbiAgfVxyXG5cclxuICBpc0VxdWFsKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVycy5zaXplKCkpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xyXG4gICAgICBpZiAodGhpcy5hdChfaSkgIT09IG90aGVycy5hdChfaSkpIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICBpc1NpbWlsYXIob3RoZXJzOiBWZWN0b3IgfCB1bmRlZmluZWQsIGVwc2lsb246IG51bWJlcikge1xyXG4gICAgaWYgKG90aGVycyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2VcclxuICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXJzLnNpemUoKSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLmF0KF9pKSAtIG90aGVycy5hdChfaSkpID4gZXBzaWxvbikgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGFkZChwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKz0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICs9IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgc3ViKHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAtPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLT0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBtdWwocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAqPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIGRpdihwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLz0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGlmIChzID09PSAwKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAvPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIGlkaXYocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLmRpdihwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgaWFkZChwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMuYWRkKHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBpc3ViKHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5zdWIocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIGltdWwocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLm11bChwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgc2V0QXQoaWR4OiBudW1iZXIsIHZhbDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2VsZW1lbnRzW2lkeF0gPSB2YWxcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBwcm9qX3UodikgPSA8dSx2Pi88dix2PiB1XHJcbiAgICogQHBhcmFtIHVcclxuICAgKiBAcGFyYW0gdlxyXG4gICAqL1xyXG4gIHN0YXRpYyBwcm9qKHU6IFZlY3RvciwgdjogVmVjdG9yKSB7XHJcbiAgICByZXR1cm4gdS5tdWwodi5kb3QodSkgLyB1LmRvdCh1KSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi92ZWN0b3InXHJcblxyXG5leHBvcnQgY2xhc3MgVmVjdG9yMyBleHRlbmRzIFZlY3RvciB7XHJcbiAgY29uc3RydWN0b3IoZTE6IG51bWJlciwgZTI6IG51bWJlciwgZTM6IG51bWJlcikge1xyXG4gICAgc3VwZXIoMywgbmV3IEFycmF5PG51bWJlcj4oZTEsIGUyLCBlMykpXHJcbiAgfVxyXG5cclxuICB4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzBdXHJcbiAgfVxyXG4gIHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMV1cclxuICB9XHJcbiAgeigpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsyXVxyXG4gIH1cclxuICByKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzBdXHJcbiAgfVxyXG4gIGcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMV1cclxuICB9XHJcbiAgYigpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsyXVxyXG4gIH1cclxuXHJcbiAgaXNldCh2MzogVmVjdG9yMykge1xyXG4gICAgdGhpcy5kYXRhKClbMF0gPSB2My5yKClcclxuICAgIHRoaXMuZGF0YSgpWzFdID0gdjMuZygpXHJcbiAgICB0aGlzLmRhdGEoKVsyXSA9IHYzLmIoKVxyXG4gIH1cclxuXHJcbiAgc2V0KHYzOiBWZWN0b3IzKSB7XHJcbiAgICByZXR1cm4gc3VwZXIuc2V0KG5ldyBWZWN0b3IoMywgdjMuZGF0YSgpKSlcclxuICB9XHJcblxyXG4gIGFkZCh2MzogYW55KSB7XHJcbiAgICBsZXQgYWRkdiA9IHN1cGVyLmFkZCh2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhhZGR2LmRhdGEoKVswXSwgYWRkdi5kYXRhKClbMV0sIGFkZHYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgc3ViKHYzOiBhbnkpIHtcclxuICAgIGxldCBzdWJ2ID0gc3VwZXIuc3ViKHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKHN1YnYuZGF0YSgpWzBdLCBzdWJ2LmRhdGEoKVsxXSwgc3Vidi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBtdWwodjM6IGFueSkge1xyXG4gICAgbGV0IG11bHYgPSBzdXBlci5tdWwodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMobXVsdi5kYXRhKClbMF0sIG11bHYuZGF0YSgpWzFdLCBtdWx2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIGRpdih2MzogYW55KSB7XHJcbiAgICBsZXQgZGl2diA9IHN1cGVyLmRpdih2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhkaXZ2LmRhdGEoKVswXSwgZGl2di5kYXRhKClbMV0sIGRpdnYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgZG90KHYzOiBWZWN0b3IzKSB7XHJcbiAgICByZXR1cm4gc3VwZXIuZG90KG5ldyBWZWN0b3IoMywgdjMuZGF0YSgpKSlcclxuICB9XHJcblxyXG4gIGNyb3NzKHYzOiBWZWN0b3IzKSB7XHJcbiAgICBsZXQgbnYgPSBuZXcgVmVjdG9yKDMsIHRoaXMuZGF0YSgpKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKFxyXG4gICAgICBudi5kYXRhKClbMV0gKiB2My5kYXRhKClbMl0gLSBudi5kYXRhKClbMl0gKiB2My5kYXRhKClbMV0sXHJcbiAgICAgIG52LmRhdGEoKVsyXSAqIHYzLmRhdGEoKVswXSAtIG52LmRhdGEoKVswXSAqIHYzLmRhdGEoKVsyXSxcclxuICAgICAgbnYuZGF0YSgpWzBdICogdjMuZGF0YSgpWzFdIC0gbnYuZGF0YSgpWzFdICogdjMuZGF0YSgpWzBdXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICB1bml0VmVjMygpOiBWZWN0b3IzIHtcclxuICAgIGxldCBudiA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXHJcbiAgICBudi5ub3JtYWxpemUoKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKG52LmRhdGEoKVswXSwgbnYuZGF0YSgpWzFdLCBudi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBnYW1tYTIoKTogVmVjdG9yMyB7XHJcbiAgICBsZXQgdHYgPSBuZXcgVmVjdG9yKDMsIHRoaXMuZGF0YSgpKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKFxyXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMCkpLFxyXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMSkpLFxyXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMikpXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBDYW1lcmEge1xyXG4gIGxvd2VyTGVmdENvcm5lcjogVmVjdG9yM1xyXG4gIGhvcml6b250YWw6IFZlY3RvcjNcclxuICB2ZXJ0aWNhbDogVmVjdG9yM1xyXG4gIG9yaWdpbjogVmVjdG9yM1xyXG5cclxuICBsZW5zUmFkaXVzOiBudW1iZXJcclxuXHJcbiAgdzogVmVjdG9yM1xyXG4gIHU6IFZlY3RvcjNcclxuICB2OiBWZWN0b3IzXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBsb29rRnJvbTogVmVjdG9yMyxcclxuICAgIGxvb2tBdDogVmVjdG9yMyxcclxuICAgIHZ1cDogVmVjdG9yMyxcclxuICAgIHZmb3Y6IG51bWJlcixcclxuICAgIGFzcGVjdDogbnVtYmVyLFxyXG4gICAgYXBlcnR1cmU6IG51bWJlcixcclxuICAgIGZvY3VzRGlzdDogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLmxlbnNSYWRpdXMgPSBhcGVydHVyZSAvIDJcclxuXHJcbiAgICBsZXQgdGhldGEgPSAodmZvdiAqIE1hdGguUEkpIC8gMTgwXHJcbiAgICBsZXQgaGFsZkhlaWdodCA9IE1hdGgudGFuKHRoZXRhIC8gMilcclxuICAgIGxldCBoYWxmV2lkdGggPSBoYWxmSGVpZ2h0ICogYXNwZWN0XHJcblxyXG4gICAgdGhpcy5vcmlnaW4gPSBsb29rRnJvbVxyXG4gICAgdGhpcy53ID0gbG9va0Zyb20uc3ViKGxvb2tBdCkudW5pdFZlYzMoKVxyXG4gICAgdGhpcy51ID0gdnVwLmNyb3NzKHRoaXMudykudW5pdFZlYzMoKVxyXG4gICAgdGhpcy52ID0gdGhpcy53LmNyb3NzKHRoaXMudSlcclxuXHJcbiAgICB0aGlzLmxvd2VyTGVmdENvcm5lciA9IHRoaXMub3JpZ2luXHJcbiAgICAgIC5zdWIodGhpcy51Lm11bChoYWxmV2lkdGggKiBmb2N1c0Rpc3QpKVxyXG4gICAgICAuc3ViKHRoaXMudi5tdWwoaGFsZkhlaWdodCAqIGZvY3VzRGlzdCkpXHJcbiAgICAgIC5zdWIodGhpcy53Lm11bChmb2N1c0Rpc3QpKVxyXG4gICAgdGhpcy5ob3Jpem9udGFsID0gdGhpcy51Lm11bCgyICogaGFsZldpZHRoICogZm9jdXNEaXN0KVxyXG4gICAgdGhpcy52ZXJ0aWNhbCA9IHRoaXMudi5tdWwoMiAqIGhhbGZIZWlnaHQgKiBmb2N1c0Rpc3QpXHJcbiAgfVxyXG5cclxuICBnZXRSYXkodTogbnVtYmVyLCB2OiBudW1iZXIpIHtcclxuICAgIGxldCByZCA9IFV0aWxzLlJhbmRvbUluVW5pdERpc2soKS5tdWwodGhpcy5sZW5zUmFkaXVzKVxyXG4gICAgbGV0IG9mZnNldCA9IHRoaXMudS5tdWwocmQueCgpKS5hZGQodGhpcy52Lm11bChyZC55KCkpKVxyXG4gICAgcmV0dXJuIG5ldyBSYXkoXHJcbiAgICAgIHRoaXMub3JpZ2luLmFkZChvZmZzZXQpLFxyXG4gICAgICB0aGlzLmxvd2VyTGVmdENvcm5lclxyXG4gICAgICAgIC5hZGQodGhpcy5ob3Jpem9udGFsLm11bCh1KSlcclxuICAgICAgICAuYWRkKHRoaXMudmVydGljYWwubXVsKHYpKVxyXG4gICAgICAgIC5zdWIodGhpcy5vcmlnaW4pXHJcbiAgICAgICAgLnN1YihvZmZzZXQpXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEhpdGFibGUsIEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgTGFtYmVydGlhbiB9IGZyb20gJy4vbGFtYmVydGlhbidcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXRhYmxlTGlzdCBleHRlbmRzIEhpdGFibGUge1xyXG4gIGxpc3Q6IEFycmF5PEhpdGFibGU+XHJcbiAgbGlzdFNpemU6IG51bWJlclxyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIGNvbnN0cnVjdG9yKGw6IEFycmF5PEhpdGFibGU+LCBuOiBudW1iZXIpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMubmFtZSA9ICdIaXRhYmxlTGlzdCdcclxuICAgIHRoaXMubGlzdCA9IGxcclxuICAgIHRoaXMubGlzdFNpemUgPSBuXHJcbiAgfVxyXG5cclxuICBoaXQocjogUmF5LCB0TWluOiBudW1iZXIsIHRNYXg6IG51bWJlciwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcclxuICAgIGxldCB0bXBSZWMgPSBuZXcgSGl0UmVjb3JkKFxyXG4gICAgICAwLFxyXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcclxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXHJcbiAgICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAsIDAsIDApKVxyXG4gICAgKVxyXG4gICAgbGV0IGhpdEFueXRoaW5nID0gZmFsc2VcclxuICAgIGxldCBjbG9zZXN0U29GYXIgPSB0TWF4XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGlzdFNpemU7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5saXN0W2ldLmhpdChyLCB0TWluLCBjbG9zZXN0U29GYXIsIHRtcFJlYykpIHtcclxuICAgICAgICBoaXRBbnl0aGluZyA9IHRydWVcclxuICAgICAgICBjbG9zZXN0U29GYXIgPSB0bXBSZWMudFxyXG4gICAgICAgIHJlYy50ID0gdG1wUmVjLnRcclxuICAgICAgICByZWMucCA9IHRtcFJlYy5wXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHRtcFJlYy5ub3JtYWxcclxuICAgICAgICByZWMubWF0ZXJpYWwgPSB0bXBSZWMubWF0ZXJpYWxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhpdEFueXRoaW5nXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXRSZWNvcmQge1xyXG4gIHQ6IG51bWJlclxyXG4gIHA6IFZlY3RvcjNcclxuICBub3JtYWw6IFZlY3RvcjNcclxuICBtYXRlcmlhbDogTWF0ZXJpYWxcclxuXHJcbiAgY29uc3RydWN0b3IoX3Q6IG51bWJlciwgX3A6IFZlY3RvcjMsIF9ub3JtYWw6IFZlY3RvcjMsIF9tYXRlcmlhbDogTWF0ZXJpYWwpIHtcclxuICAgIHRoaXMudCA9IF90XHJcbiAgICB0aGlzLnAgPSBfcFxyXG4gICAgdGhpcy5ub3JtYWwgPSBfbm9ybWFsXHJcbiAgICB0aGlzLm1hdGVyaWFsID0gX21hdGVyaWFsXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSGl0YWJsZSB7XHJcbiAgYWJzdHJhY3QgbmFtZTogc3RyaW5nXHJcbiAgYWJzdHJhY3QgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhblxyXG59XHJcbiIsImltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWwnXHJcblxyXG5leHBvcnQgY2xhc3MgTGFtYmVydGlhbiBleHRlbmRzIE1hdGVyaWFsIHtcclxuICBhbGJlZG86IFZlY3RvcjNcclxuICBzY2F0dGVyZWQ6IFJheVxyXG4gIGF0dGVudWF0aW9uOiBWZWN0b3IzXHJcbiAgbmFtZTogc3RyaW5nXHJcblxyXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMubmFtZSA9ICdMYW1iZXJ0aWFuJ1xyXG4gICAgdGhpcy5hbGJlZG8gPSBhXHJcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDApKVxyXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgfVxyXG5cclxuICBzY2F0dGVyKHI6IFJheSwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcclxuICAgIGxldCB0YXJnZXQgPSByZWMucC5hZGQocmVjLm5vcm1hbCkuYWRkKFV0aWxzLlJhbmRvbUluVW5pdFNwaGVyZSgpKVxyXG4gICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KHJlYy5wLCB0YXJnZXQuc3ViKHJlYy5wKSlcclxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMyhcclxuICAgICAgdGhpcy5hbGJlZG8ueCgpLFxyXG4gICAgICB0aGlzLmFsYmVkby55KCksXHJcbiAgICAgIHRoaXMuYWxiZWRvLnooKVxyXG4gICAgKVxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdGVyaWFsIHtcclxuICBhYnN0cmFjdCBuYW1lOiBzdHJpbmdcclxuICBhYnN0cmFjdCBzY2F0dGVyZWQ6IFJheVxyXG4gIGFic3RyYWN0IGF0dGVudWF0aW9uOiBWZWN0b3IzXHJcbiAgYWJzdHJhY3Qgc2NhdHRlcihyOiBSYXksIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhblxyXG59XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICpcclxuICogIHJheS50c1xyXG4gKiAgcmF5IGZ1bmN0aW9uIGZvciBwKHQpID0gQSArIHQgKiBCXHJcbiAqICBUOnR5cGUsZGVmYXVsdCBzZXR0aW5nIGlzIG51bWJlclxyXG4gKiAgRDpkaW1lbnNpb25cclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcblxyXG5leHBvcnQgY2xhc3MgUmF5IHtcclxuICBwdWJsaWMgX0E6IFZlY3RvcjNcclxuICBwdWJsaWMgX0I6IFZlY3RvcjNcclxuXHJcbiAgY29uc3RydWN0b3IoYTogVmVjdG9yMywgYjogVmVjdG9yMykge1xyXG4gICAgdGhpcy5fQSA9IGFcclxuICAgIHRoaXMuX0IgPSBiXHJcbiAgfVxyXG5cclxuICBvcmlnaW4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQVxyXG4gIH1cclxuICBkaXJlY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQlxyXG4gIH1cclxuICBwb2ludEF0UGFyYW0odDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQS5hZGQodGhpcy5fQi5tdWwodCkpXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEhpdGFibGUsIEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwaGVyZSBleHRlbmRzIEhpdGFibGUge1xyXG4gIGNlbnRlcjogVmVjdG9yM1xyXG4gIHJhZGl1czogbnVtYmVyXHJcbiAgbWF0ZXJpYWw6IE1hdGVyaWFsXHJcbiAgbmFtZTogc3RyaW5nXHJcblxyXG4gIGNvbnN0cnVjdG9yKGNlbjogVmVjdG9yMywgcjogbnVtYmVyLCBtYXQ6IE1hdGVyaWFsKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLm5hbWUgPSAnU3BoZXJlJ1xyXG4gICAgdGhpcy5jZW50ZXIgPSBjZW5cclxuICAgIHRoaXMucmFkaXVzID0gclxyXG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdFxyXG4gIH1cclxuXHJcbiAgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgb2MgPSByLm9yaWdpbigpLnN1Yih0aGlzLmNlbnRlcilcclxuICAgIGxldCBhID0gci5kaXJlY3Rpb24oKS5kb3Qoci5kaXJlY3Rpb24oKSlcclxuICAgIGxldCBiID0gb2MuZG90KHIuZGlyZWN0aW9uKCkpXHJcbiAgICBsZXQgYyA9IG9jLmRvdChvYykgLSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzXHJcbiAgICBsZXQgZGlzY3JpbWluYW50ID0gYiAqIGIgLSBhICogY1xyXG4gICAgaWYgKGRpc2NyaW1pbmFudCA+IDApIHtcclxuICAgICAgbGV0IHRtcCA9ICgtYiAtIE1hdGguc3FydChiICogYiAtIGEgKiBjKSkgLyBhXHJcbiAgICAgIGlmICh0bXAgPCB0TWF4ICYmIHRtcCA+IHRNaW4pIHtcclxuICAgICAgICByZWMudCA9IHRtcFxyXG4gICAgICAgIHJlYy5wID0gci5wb2ludEF0UGFyYW0ocmVjLnQpXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHJlYy5wLnN1Yih0aGlzLmNlbnRlcikuZGl2KHRoaXMucmFkaXVzKVxyXG4gICAgICAgIHJlYy5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0bXAgPSAoLWIgKyBNYXRoLnNxcnQoYiAqIGIgLSBhICogYykpIC8gYVxyXG4gICAgICBpZiAodG1wIDwgdE1heCAmJiB0bXAgPiB0TWluKSB7XHJcbiAgICAgICAgcmVjLnQgPSB0bXBcclxuICAgICAgICByZWMucCA9IHIucG9pbnRBdFBhcmFtKHJlYy50KVxyXG4gICAgICAgIHJlYy5ub3JtYWwgPSByZWMucC5zdWIodGhpcy5jZW50ZXIpLmRpdih0aGlzLnJhZGl1cylcclxuICAgICAgICByZWMubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuL2VnbWF0aC92ZWN0b3IzJ1xyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBVdGlscyB7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFJhbmRvbUluVW5pdFNwaGVyZSgpIHtcclxuICAgIGxldCBwID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgIGRvIHtcclxuICAgICAgcCA9IG5ldyBWZWN0b3IzKE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCkpXHJcbiAgICAgICAgLm11bCgyKVxyXG4gICAgICAgIC5zdWIobmV3IFZlY3RvcjMoMSwgMSwgMSkpXHJcbiAgICB9IHdoaWxlIChwLmxlbmd0aFNxdWFyZWQoKSA+PSAxLjApXHJcbiAgICByZXR1cm4gcFxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFJhbmRvbUluVW5pdERpc2soKSB7XHJcbiAgICBsZXQgcCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgICBkbyB7XHJcbiAgICAgIHAgPSBuZXcgVmVjdG9yMyhNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpKVxyXG4gICAgICAgIC5tdWwoMilcclxuICAgICAgICAuc3ViKG5ldyBWZWN0b3IzKDEsIDEsIDApKVxyXG4gICAgfSB3aGlsZSAocC5sZW5ndGhTcXVhcmVkKCkgPj0gMS4wKVxyXG4gICAgcmV0dXJuIHBcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiByZWZsZWN0KHY6IFZlY3RvcjMsIG46IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiB2LnN1YihuLm11bCgyICogdi5kb3QobikpKVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHNjaGxpY2soY29zaW5lOiBudW1iZXIsIHJlZklkeDogbnVtYmVyKSB7XHJcbiAgICBsZXQgcjAgPSAoMSAtIHJlZklkeCkgLyAoMSArIHJlZklkeClcclxuICAgIHIwID0gcjAgKiByMFxyXG4gICAgcmV0dXJuIHIwICsgKDEgLSByMCkgKiBNYXRoLnBvdygxIC0gY29zaW5lLCA1KVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZnJhY3QoXHJcbiAgICB2OiBWZWN0b3IzLFxyXG4gICAgbjogVmVjdG9yMyxcclxuICAgIG5pT3Zlck50OiBudW1iZXIsXHJcbiAgICByZWZyYWN0ZWQ6IFZlY3RvcjNcclxuICApIHtcclxuICAgIGxldCB1diA9IHYudW5pdFZlYzMoKVxyXG4gICAgbGV0IGR0ID0gdXYuZG90KG4pXHJcbiAgICBsZXQgZGlzY3JpbWluYW50ID0gMS4wIC0gbmlPdmVyTnQgKiBuaU92ZXJOdCAqICgxIC0gZHQgKiBkdClcclxuICAgIGlmIChkaXNjcmltaW5hbnQgPiAwKSB7XHJcbiAgICAgIHJlZnJhY3RlZC5zZXQoXHJcbiAgICAgICAgdXZcclxuICAgICAgICAgIC5zdWIobi5tdWwoZHQpKVxyXG4gICAgICAgICAgLm11bChuaU92ZXJOdClcclxuICAgICAgICAgIC5zdWIobi5tdWwoTWF0aC5zcXJ0KGRpc2NyaW1pbmFudCkpKVxyXG4gICAgICApXHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb20obWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCArIDEgLSBtaW4pKSArIG1pblxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFdyaXRlMkNhbnZhcyhcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIGltYWdlQnVmOiBBcnJheTxudW1iZXI+LFxyXG4gICAgdzogbnVtYmVyLFxyXG4gICAgaDogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBsZXQgY2FudmFzSW1hZ2UgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3LCBoKVxyXG4gICAgbGV0IGRhdGEgPSBjYW52YXNJbWFnZS5kYXRhXHJcbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBkYXRhLmxlbmd0aDsgaWR4ICs9IDQpIHtcclxuICAgICAgZGF0YVtpZHggKyAwXSA9IGltYWdlQnVmW2lkeCArIDBdXHJcbiAgICAgIGRhdGFbaWR4ICsgMV0gPSBpbWFnZUJ1ZltpZHggKyAxXVxyXG4gICAgICBkYXRhW2lkeCArIDJdID0gaW1hZ2VCdWZbaWR4ICsgMl1cclxuICAgICAgZGF0YVtpZHggKyAzXSA9IGltYWdlQnVmW2lkeCArIDNdXHJcbiAgICB9XHJcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShjYW52YXNJbWFnZSwgMCwgMClcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBHZW5lcmF0ZU5vaXNlKFxyXG4gICAgaW1hZ2VCdWZmZXI6IEFycmF5PG51bWJlcj4sXHJcbiAgICBzdGFydElkeDogbnVtYmVyLFxyXG4gICAgZW5kSWR4OiBudW1iZXJcclxuICApIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJZHg7IGluZGV4IDwgZW5kSWR4OyBpbmRleCArPSA0KSB7XHJcbiAgICAgIGxldCByID0gUmFuZG9tKDAsIDI1NSlcclxuICAgICAgbGV0IGcgPSBSYW5kb20oMCwgMjU1KVxyXG4gICAgICBsZXQgYiA9IFJhbmRvbSgwLCAyNTUpXHJcblxyXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleF0gPSByXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMV0gPSBnXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMl0gPSBiXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgM10gPSAyNTVcclxuICAgIH1cclxuICAgIHJldHVybiBpbWFnZUJ1ZmZlclxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4uL2VncmVuZGVyL3JheSdcclxuaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi4vZWdyZW5kZXIvaGl0YWJsZSdcclxuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSAnLi4vZWdyZW5kZXIvY2FtZXJhJ1xyXG5pbXBvcnQgeyBTcGhlcmUgfSBmcm9tICcuLi9lZ3JlbmRlci9zcGhlcmUnXHJcbmltcG9ydCB7IEhpdGFibGVMaXN0IH0gZnJvbSAnLi4vZWdyZW5kZXIvaGl0YWJsZS1saXN0J1xyXG5pbXBvcnQgeyBMYW1iZXJ0aWFuIH0gZnJvbSAnLi4vZWdyZW5kZXIvbGFtYmVydGlhbidcclxuXHJcbmNvbnN0IGN0eDogV29ya2VyID0gc2VsZiBhcyBhbnlcclxuXHJcbmZ1bmN0aW9uIENvbG9yKHI6IFJheSwgd29ybGQ6IEhpdGFibGUsIGRlcHRoOiBudW1iZXIpOiBWZWN0b3IzIHtcclxuICBsZXQgY29sID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuXHJcbiAgbGV0IGF0dGVudWF0aW9uU3VtID0gbmV3IFZlY3RvcjMoMSwgMSwgMSlcclxuICBmb3IgKGxldCBuID0gMDsgbiA8IE51bWJlci5NQVhfVkFMVUU7IG4rKykge1xyXG4gICAgbGV0IHJlYyA9IG5ldyBIaXRSZWNvcmQoXHJcbiAgICAgIDAsXHJcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcclxuICAgICAgbmV3IExhbWJlcnRpYW4obmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICApXHJcbiAgICBsZXQgYkhpdCA9IHdvcmxkLmhpdChyLCAwLjAwMSwgTnVtYmVyLk1BWF9WQUxVRSwgcmVjKVxyXG4gICAgaWYgKCFiSGl0KSB7XHJcbiAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgICBsZXQgYlNjYXR0ZXIgPSByZWMubWF0ZXJpYWwuc2NhdHRlcihyLCByZWMpXHJcbiAgICBsZXQgc2NhdHRlcmVkID0gcmVjLm1hdGVyaWFsLnNjYXR0ZXJlZFxyXG4gICAgbGV0IGF0dGVudWF0aW9uID0gcmVjLm1hdGVyaWFsLmF0dGVudWF0aW9uXHJcbiAgICBpZiAoYlNjYXR0ZXIgJiYgZGVwdGggPCA1MCkge1xyXG4gICAgICBkZXB0aCsrXHJcbiAgICAgIHIgPSBzY2F0dGVyZWRcclxuICAgICAgYXR0ZW51YXRpb25TdW0uaW11bChhdHRlbnVhdGlvbilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGF0dGVudWF0aW9uU3VtID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgICAgYnJlYWtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxldCB1bml0RGlyID0gci5kaXJlY3Rpb24oKS51bml0VmVjMygpXHJcbiAgbGV0IHQgPSAwLjUgKiAodW5pdERpci55KCkgKyAxLjApXHJcbiAgY29sID0gbmV3IFZlY3RvcjMoMS4wLCAxLjAsIDEuMClcclxuICAgIC5tdWwoMS4wIC0gdClcclxuICAgIC5hZGQobmV3IFZlY3RvcjMoMC41LCAwLjcsIDEuMCkubXVsKHQpKVxyXG4gIGNvbC5pbXVsKGF0dGVudWF0aW9uU3VtKVxyXG5cclxuICByZXR1cm4gY29sXHJcbn1cclxuXHJcbmN0eC5vbm1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgbGV0IHBhcmFtID0gbWVzc2FnZS5kYXRhXHJcbiAgbGV0IGlkID0gcGFyYW0uaWRcclxuICBsZXQgc3RhcnQgPSBwYXJhbS5zdGFydFxyXG4gIGxldCBlbmQgPSBwYXJhbS5lbmRcclxuICBsZXQgZW5kTWF4ID0gcGFyYW0uZW5kTWF4XHJcblxyXG4gIGxldCBueCA9IHBhcmFtLndpZHRoXHJcbiAgbGV0IG55ID0gcGFyYW0uaGVpZ2h0XHJcbiAgbGV0IG5zID0gcGFyYW0uc2FtcGxpbmdOdW1cclxuXHJcbiAgLy8gcHJvY2VzcyBlbmRcclxuICBpZiAoZW5kID4gZW5kTWF4KSB7XHJcbiAgICBlbmQgPSBlbmRNYXhcclxuICB9XHJcblxyXG4gIC8vIG9iamVjdFxyXG4gIGxldCBsb29rRnJvbSA9IG5ldyBWZWN0b3IzKDMsIDMsIDIpXHJcbiAgbGV0IGxvb2tBdCA9IG5ldyBWZWN0b3IzKDAsIDAsIC0xKVxyXG4gIGxldCB2dXAgPSBuZXcgVmVjdG9yMygwLCAxLCAwKVxyXG4gIGxldCB2Zm92ID0gMjBcclxuICBsZXQgYXNwZWN0ID0gbnggLyBueVxyXG4gIGxldCBhcGVydHVyZSA9IDIuMFxyXG4gIGxldCBmb2N1c0Rpc3QgPSBsb29rRnJvbS5zdWIobG9va0F0KS5sZW5ndGgoKVxyXG4gIGxldCBjYW0gPSBuZXcgQ2FtZXJhKGxvb2tGcm9tLCBsb29rQXQsIHZ1cCwgdmZvdiwgYXNwZWN0LCBhcGVydHVyZSwgZm9jdXNEaXN0KVxyXG4gIGxldCBsaXN0ID0gbmV3IEFycmF5PEhpdGFibGU+KDIpXHJcbiAgbGlzdFswXSA9IG5ldyBTcGhlcmUoXHJcbiAgICBuZXcgVmVjdG9yMygwLCAwLCAtMSksXHJcbiAgICAwLjUsXHJcbiAgICBuZXcgTGFtYmVydGlhbihuZXcgVmVjdG9yMygwLjgsIDAuMywgMC4zKSlcclxuICApXHJcbiAgbGlzdFsxXSA9IG5ldyBTcGhlcmUoXHJcbiAgICBuZXcgVmVjdG9yMygwLCAtMTAwLjUsIC0xKSxcclxuICAgIDEwMCxcclxuICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAuOCwgMC44LCAwLjApKVxyXG4gIClcclxuXHJcbiAgbGV0IHdvcmxkID0gbmV3IEhpdGFibGVMaXN0KGxpc3QsIDIpXHJcblxyXG4gIGxldCBjb2xBcnJheSA9IG5ldyBBcnJheTxOdW1iZXI+KClcclxuXHJcbiAgZm9yIChsZXQgaiA9IHN0YXJ0OyBqIDw9IGVuZDsgaisrKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG54OyBpKyspIHtcclxuICAgICAgbGV0IGNvbCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgbnM7IHMrKykge1xyXG4gICAgICAgIGxldCB1ID0gKGkgKyBNYXRoLnJhbmRvbSgpKSAvIG54XHJcbiAgICAgICAgbGV0IHYgPSAobnkgLSAxIC0gKGogKyBNYXRoLnJhbmRvbSgpKSkgLyBueVxyXG4gICAgICAgIGxldCByID0gY2FtLmdldFJheSh1LCB2KVxyXG4gICAgICAgIGNvbC5pYWRkKENvbG9yKHIsIHdvcmxkLCAwKSlcclxuICAgICAgfVxyXG4gICAgICBjb2wuaWRpdihucylcclxuICAgICAgY29sID0gY29sLmdhbW1hMigpXHJcblxyXG4gICAgICBjb2xBcnJheS5wdXNoKE1hdGguZmxvb3IoMjU1Ljk5ICogY29sLnIoKSkpXHJcbiAgICAgIGNvbEFycmF5LnB1c2goTWF0aC5mbG9vcigyNTUuOTkgKiBjb2wuZygpKSlcclxuICAgICAgY29sQXJyYXkucHVzaChNYXRoLmZsb29yKDI1NS45OSAqIGNvbC5iKCkpKVxyXG4gICAgICBjb2xBcnJheS5wdXNoKDI1NSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGN0eC5wb3N0TWVzc2FnZSh7XHJcbiAgICBjb2w6IGNvbEFycmF5LFxyXG4gICAgc3RhcnRWYWw6IHN0YXJ0LFxyXG4gICAgZW5kVmFsOiBlbmQsXHJcbiAgICBpZDogaWQsXHJcbiAgICBlbmRNYXhWYWw6IGVuZE1heFxyXG4gIH0pXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==