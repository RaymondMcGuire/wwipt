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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/worker/ww-ray-tracing-metal.worker.ts");
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

/***/ "./src/worker/ww-ray-tracing-metal.worker.ts":
/*!***************************************************!*\
  !*** ./src/worker/ww-ray-tracing-metal.worker.ts ***!
  \***************************************************/
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
  var list = new Array(4);
  list[0] = new sphere_1.Sphere(new vector3_1.Vector3(0, 0, -1), 0.5, new lambertian_1.Lambertian(new vector3_1.Vector3(0.8, 0.3, 0.3)));
  list[1] = new sphere_1.Sphere(new vector3_1.Vector3(0, -100.5, -1), 100, new lambertian_1.Lambertian(new vector3_1.Vector3(0.8, 0.8, 0.0)));
  list[2] = new sphere_1.Sphere(new vector3_1.Vector3(1, 0, -1), 0.5, new metal_1.Metal(new vector3_1.Vector3(0.8, 0.6, 0.2), 1.0));
  list[3] = new sphere_1.Sphere(new vector3_1.Vector3(-1, 0, -1), 0.5, new metal_1.Metal(new vector3_1.Vector3(0.8, 0.8, 0.8), 0.3));
  var world = new hitable_list_1.HitableList(list, 4);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC9tYXRoX3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvY2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9oaXRhYmxlLWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2hpdGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2xhbWJlcnRpYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL21hdGVyaWFsLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9tZXRhbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvcmF5LnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9zcGhlcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci93dy1yYXktdHJhY2luZy1tZXRhbC53b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlD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Z0I7QUFDZCxPQUFHLEVBQUUsUUFEUztBQUVkLFlBQVEsRUFBRSxLQUZJO0FBR2QsVUFBTSxFQUFFLEdBSE07QUFJZCxNQUFFLEVBQUUsRUFKVTtBQUtkLGFBQVMsRUFBRTtBQUxHLEdBQWhCO0FBT0QsQ0E3RUQsQyIsImZpbGUiOiJ3d19yYXlfdHJhY2luZ19tZXRhbF93b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3dvcmtlci93dy1yYXktdHJhY2luZy1tZXRhbC53b3JrZXIudHNcIik7XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqICBtYXRoX3V0aWxzLnRzXHJcbiAqICBzaW1wbGUgbWF0aCBmdW5jdGlvbnNcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFic01heCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiB4ICogeCA+IHkgKiB5ID8geCA6IHlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFic01pbih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiB4ICogeCA8IHkgKiB5ID8geCA6IHlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG11bGRlYyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiAoeCAqIDEwICogKHkgKiAxMCkpIC8gMTAwXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXZkZWMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICByZXR1cm4gKHggKiAxMCkgLyAoeSAqIDEwKSAvIDEwMFxyXG59XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICpcclxuICogIHZlY3Rvci50c1xyXG4gKiAgVC1EIHZlY3RvciBkYXRhXHJcbiAqICBUOnR5cGUsZGVmYXVsdCBzZXR0aW5nIGlzIG51bWJlclxyXG4gKiAgRDpkaW1lbnNpb25cclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5pbXBvcnQgeyBhYnNNYXgsIGFic01pbiB9IGZyb20gJy4vbWF0aF91dGlscydcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3Ige1xyXG4gIHByaXZhdGUgX2VsZW1lbnRzOiBBcnJheTxudW1iZXI+XHJcbiAgcHJpdmF0ZSBfZGltZW5zaW9uOiBudW1iZXJcclxuXHJcbiAgLy8gY29uc3RydWN0cyB2ZWN0b3Igd2l0aCBwYXJhbWV0ZXJzIG9yIHplcm9cclxuICBjb25zdHJ1Y3RvcihkaW1lbnNpb246IG51bWJlciwgcGFyYW1zPzogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgdGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uXHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAocGFyYW1zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgLy8gaW5pdCBuIGRpbWVuc2lvbiB2ZWN0b3IgZGF0YSxzZXR0aW5nIGFsbCAwXHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzID0gbmV3IEFycmF5PG51bWJlcj4oZGltZW5zaW9uKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBkaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzID0gbmV3IEFycmF5PG51bWJlcj4oZGltZW5zaW9uKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBwYXJhbXMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gcGFyYW1zW19pXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQocGFyYW1zOiBWZWN0b3IgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAocGFyYW1zLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHBhcmFtcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSBwYXJhbXMuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxuICBzZXRaZXJvKCkge1xyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRPbmUoKSB7XHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDFcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudHNcclxuICB9XHJcblxyXG4gIGF0KGlkeDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2luZGV4IGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRzW2lkeF1cclxuICB9XHJcblxyXG4gIGRvdChvdGhlcnM6IFZlY3RvciB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG90aGVycyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdvdGhlcnMgaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICBpZiAob3RoZXJzLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIHJldCArPSB0aGlzLl9lbGVtZW50c1tfaV0gKiBvdGhlcnMuZGF0YSgpW19pXVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxuXHJcbiAgbGVuZ3RoU3F1YXJlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKVxyXG4gIH1cclxuXHJcbiAgbGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbmd0aFNxdWFyZWQoKSlcclxuICB9XHJcblxyXG4gIG5vcm1hbGl6ZSgpIHtcclxuICAgIHRoaXMuaWRpdih0aGlzLmxlbmd0aCgpKVxyXG4gIH1cclxuXHJcbiAgc3VtKCkge1xyXG4gICAgbGV0IHJldCA9IDBcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgcmV0ICs9IHRoaXMuX2VsZW1lbnRzW19pXVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxuXHJcbiAgc2l6ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25cclxuICB9XHJcblxyXG4gIGF2ZygpIHtcclxuICAgIHJldHVybiB0aGlzLnN1bSgpIC8gdGhpcy5zaXplKClcclxuICB9XHJcblxyXG4gIG1pbigpIHtcclxuICAgIGxldCBtaW5WYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG5cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgbWluVmFsID0gTWF0aC5taW4obWluVmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWluVmFsXHJcbiAgfVxyXG5cclxuICBtYXgoKSB7XHJcbiAgICBsZXQgbWF4VmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgbWF4VmFsID0gTWF0aC5tYXgobWF4VmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWF4VmFsXHJcbiAgfVxyXG5cclxuICBhYnNtYXgoKSB7XHJcbiAgICBsZXQgYWJzTWF4VmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgYWJzTWF4VmFsID0gYWJzTWF4KGFic01heFZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFic01heFZhbFxyXG4gIH1cclxuXHJcbiAgYWJzbWluKCkge1xyXG4gICAgbGV0IGFic01pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIGFic01pblZhbCA9IGFic01pbihhYnNNaW5WYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBhYnNNaW5WYWxcclxuICB9XHJcblxyXG4gIGRpc3RhbmNlU3F1YXJlZFRvKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICBpZiAob3RoZXJzLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGxldCBkaWZmID0gdGhpcy5fZWxlbWVudHNbX2ldIC0gb3RoZXJzLmRhdGEoKVtfaV1cclxuICAgICAgcmV0ICs9IGRpZmYgKiBkaWZmXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxuXHJcbiAgZGlzdGFuY2VUbyhvdGhlcnM6IFZlY3Rvcikge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlU3F1YXJlZFRvKG90aGVycykpXHJcbiAgfVxyXG5cclxuICBpc0VxdWFsKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVycy5zaXplKCkpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xyXG4gICAgICBpZiAodGhpcy5hdChfaSkgIT09IG90aGVycy5hdChfaSkpIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICBpc1NpbWlsYXIob3RoZXJzOiBWZWN0b3IgfCB1bmRlZmluZWQsIGVwc2lsb246IG51bWJlcikge1xyXG4gICAgaWYgKG90aGVycyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2VcclxuICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXJzLnNpemUoKSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLmF0KF9pKSAtIG90aGVycy5hdChfaSkpID4gZXBzaWxvbikgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGFkZChwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKz0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICs9IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgc3ViKHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAtPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLT0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBtdWwocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAqPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIGRpdihwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLz0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGlmIChzID09PSAwKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAvPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIGlkaXYocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLmRpdihwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgaWFkZChwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMuYWRkKHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBpc3ViKHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5zdWIocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIGltdWwocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLm11bChwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgc2V0QXQoaWR4OiBudW1iZXIsIHZhbDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2VsZW1lbnRzW2lkeF0gPSB2YWxcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBwcm9qX3UodikgPSA8dSx2Pi88dix2PiB1XHJcbiAgICogQHBhcmFtIHVcclxuICAgKiBAcGFyYW0gdlxyXG4gICAqL1xyXG4gIHN0YXRpYyBwcm9qKHU6IFZlY3RvciwgdjogVmVjdG9yKSB7XHJcbiAgICByZXR1cm4gdS5tdWwodi5kb3QodSkgLyB1LmRvdCh1KSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi92ZWN0b3InXHJcblxyXG5leHBvcnQgY2xhc3MgVmVjdG9yMyBleHRlbmRzIFZlY3RvciB7XHJcbiAgY29uc3RydWN0b3IoZTE6IG51bWJlciwgZTI6IG51bWJlciwgZTM6IG51bWJlcikge1xyXG4gICAgc3VwZXIoMywgbmV3IEFycmF5PG51bWJlcj4oZTEsIGUyLCBlMykpXHJcbiAgfVxyXG5cclxuICB4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzBdXHJcbiAgfVxyXG4gIHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMV1cclxuICB9XHJcbiAgeigpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsyXVxyXG4gIH1cclxuICByKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzBdXHJcbiAgfVxyXG4gIGcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMV1cclxuICB9XHJcbiAgYigpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsyXVxyXG4gIH1cclxuXHJcbiAgaXNldCh2MzogVmVjdG9yMykge1xyXG4gICAgdGhpcy5kYXRhKClbMF0gPSB2My5yKClcclxuICAgIHRoaXMuZGF0YSgpWzFdID0gdjMuZygpXHJcbiAgICB0aGlzLmRhdGEoKVsyXSA9IHYzLmIoKVxyXG4gIH1cclxuXHJcbiAgc2V0KHYzOiBWZWN0b3IzKSB7XHJcbiAgICByZXR1cm4gc3VwZXIuc2V0KG5ldyBWZWN0b3IoMywgdjMuZGF0YSgpKSlcclxuICB9XHJcblxyXG4gIGFkZCh2MzogYW55KSB7XHJcbiAgICBsZXQgYWRkdiA9IHN1cGVyLmFkZCh2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhhZGR2LmRhdGEoKVswXSwgYWRkdi5kYXRhKClbMV0sIGFkZHYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgc3ViKHYzOiBhbnkpIHtcclxuICAgIGxldCBzdWJ2ID0gc3VwZXIuc3ViKHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKHN1YnYuZGF0YSgpWzBdLCBzdWJ2LmRhdGEoKVsxXSwgc3Vidi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBtdWwodjM6IGFueSkge1xyXG4gICAgbGV0IG11bHYgPSBzdXBlci5tdWwodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMobXVsdi5kYXRhKClbMF0sIG11bHYuZGF0YSgpWzFdLCBtdWx2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIGRpdih2MzogYW55KSB7XHJcbiAgICBsZXQgZGl2diA9IHN1cGVyLmRpdih2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhkaXZ2LmRhdGEoKVswXSwgZGl2di5kYXRhKClbMV0sIGRpdnYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgZG90KHYzOiBWZWN0b3IzKSB7XHJcbiAgICByZXR1cm4gc3VwZXIuZG90KG5ldyBWZWN0b3IoMywgdjMuZGF0YSgpKSlcclxuICB9XHJcblxyXG4gIGNyb3NzKHYzOiBWZWN0b3IzKSB7XHJcbiAgICBsZXQgbnYgPSBuZXcgVmVjdG9yKDMsIHRoaXMuZGF0YSgpKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKFxyXG4gICAgICBudi5kYXRhKClbMV0gKiB2My5kYXRhKClbMl0gLSBudi5kYXRhKClbMl0gKiB2My5kYXRhKClbMV0sXHJcbiAgICAgIG52LmRhdGEoKVsyXSAqIHYzLmRhdGEoKVswXSAtIG52LmRhdGEoKVswXSAqIHYzLmRhdGEoKVsyXSxcclxuICAgICAgbnYuZGF0YSgpWzBdICogdjMuZGF0YSgpWzFdIC0gbnYuZGF0YSgpWzFdICogdjMuZGF0YSgpWzBdXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICB1bml0VmVjMygpOiBWZWN0b3IzIHtcclxuICAgIGxldCBudiA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXHJcbiAgICBudi5ub3JtYWxpemUoKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKG52LmRhdGEoKVswXSwgbnYuZGF0YSgpWzFdLCBudi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBnYW1tYTIoKTogVmVjdG9yMyB7XHJcbiAgICBsZXQgdHYgPSBuZXcgVmVjdG9yKDMsIHRoaXMuZGF0YSgpKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKFxyXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMCkpLFxyXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMSkpLFxyXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMikpXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBDYW1lcmEge1xyXG4gIGxvd2VyTGVmdENvcm5lcjogVmVjdG9yM1xyXG4gIGhvcml6b250YWw6IFZlY3RvcjNcclxuICB2ZXJ0aWNhbDogVmVjdG9yM1xyXG4gIG9yaWdpbjogVmVjdG9yM1xyXG5cclxuICBsZW5zUmFkaXVzOiBudW1iZXJcclxuXHJcbiAgdzogVmVjdG9yM1xyXG4gIHU6IFZlY3RvcjNcclxuICB2OiBWZWN0b3IzXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBsb29rRnJvbTogVmVjdG9yMyxcclxuICAgIGxvb2tBdDogVmVjdG9yMyxcclxuICAgIHZ1cDogVmVjdG9yMyxcclxuICAgIHZmb3Y6IG51bWJlcixcclxuICAgIGFzcGVjdDogbnVtYmVyLFxyXG4gICAgYXBlcnR1cmU6IG51bWJlcixcclxuICAgIGZvY3VzRGlzdDogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLmxlbnNSYWRpdXMgPSBhcGVydHVyZSAvIDJcclxuXHJcbiAgICBsZXQgdGhldGEgPSAodmZvdiAqIE1hdGguUEkpIC8gMTgwXHJcbiAgICBsZXQgaGFsZkhlaWdodCA9IE1hdGgudGFuKHRoZXRhIC8gMilcclxuICAgIGxldCBoYWxmV2lkdGggPSBoYWxmSGVpZ2h0ICogYXNwZWN0XHJcblxyXG4gICAgdGhpcy5vcmlnaW4gPSBsb29rRnJvbVxyXG4gICAgdGhpcy53ID0gbG9va0Zyb20uc3ViKGxvb2tBdCkudW5pdFZlYzMoKVxyXG4gICAgdGhpcy51ID0gdnVwLmNyb3NzKHRoaXMudykudW5pdFZlYzMoKVxyXG4gICAgdGhpcy52ID0gdGhpcy53LmNyb3NzKHRoaXMudSlcclxuXHJcbiAgICB0aGlzLmxvd2VyTGVmdENvcm5lciA9IHRoaXMub3JpZ2luXHJcbiAgICAgIC5zdWIodGhpcy51Lm11bChoYWxmV2lkdGggKiBmb2N1c0Rpc3QpKVxyXG4gICAgICAuc3ViKHRoaXMudi5tdWwoaGFsZkhlaWdodCAqIGZvY3VzRGlzdCkpXHJcbiAgICAgIC5zdWIodGhpcy53Lm11bChmb2N1c0Rpc3QpKVxyXG4gICAgdGhpcy5ob3Jpem9udGFsID0gdGhpcy51Lm11bCgyICogaGFsZldpZHRoICogZm9jdXNEaXN0KVxyXG4gICAgdGhpcy52ZXJ0aWNhbCA9IHRoaXMudi5tdWwoMiAqIGhhbGZIZWlnaHQgKiBmb2N1c0Rpc3QpXHJcbiAgfVxyXG5cclxuICBnZXRSYXkodTogbnVtYmVyLCB2OiBudW1iZXIpIHtcclxuICAgIGxldCByZCA9IFV0aWxzLlJhbmRvbUluVW5pdERpc2soKS5tdWwodGhpcy5sZW5zUmFkaXVzKVxyXG4gICAgbGV0IG9mZnNldCA9IHRoaXMudS5tdWwocmQueCgpKS5hZGQodGhpcy52Lm11bChyZC55KCkpKVxyXG4gICAgcmV0dXJuIG5ldyBSYXkoXHJcbiAgICAgIHRoaXMub3JpZ2luLmFkZChvZmZzZXQpLFxyXG4gICAgICB0aGlzLmxvd2VyTGVmdENvcm5lclxyXG4gICAgICAgIC5hZGQodGhpcy5ob3Jpem9udGFsLm11bCh1KSlcclxuICAgICAgICAuYWRkKHRoaXMudmVydGljYWwubXVsKHYpKVxyXG4gICAgICAgIC5zdWIodGhpcy5vcmlnaW4pXHJcbiAgICAgICAgLnN1YihvZmZzZXQpXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEhpdGFibGUsIEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgTGFtYmVydGlhbiB9IGZyb20gJy4vbGFtYmVydGlhbidcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXRhYmxlTGlzdCBleHRlbmRzIEhpdGFibGUge1xyXG4gIGxpc3Q6IEFycmF5PEhpdGFibGU+XHJcbiAgbGlzdFNpemU6IG51bWJlclxyXG4gIGNvbnN0cnVjdG9yKGw6IEFycmF5PEhpdGFibGU+LCBuOiBudW1iZXIpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMubGlzdCA9IGxcclxuICAgIHRoaXMubGlzdFNpemUgPSBuXHJcbiAgfVxyXG5cclxuICBoaXQocjogUmF5LCB0TWluOiBudW1iZXIsIHRNYXg6IG51bWJlciwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcclxuICAgIGxldCB0bXBSZWMgPSBuZXcgSGl0UmVjb3JkKFxyXG4gICAgICAwLFxyXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcclxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXHJcbiAgICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAsIDAsIDApKVxyXG4gICAgKVxyXG4gICAgbGV0IGhpdEFueXRoaW5nID0gZmFsc2VcclxuICAgIGxldCBjbG9zZXN0U29GYXIgPSB0TWF4XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGlzdFNpemU7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5saXN0W2ldLmhpdChyLCB0TWluLCBjbG9zZXN0U29GYXIsIHRtcFJlYykpIHtcclxuICAgICAgICBoaXRBbnl0aGluZyA9IHRydWVcclxuICAgICAgICBjbG9zZXN0U29GYXIgPSB0bXBSZWMudFxyXG4gICAgICAgIHJlYy50ID0gdG1wUmVjLnRcclxuICAgICAgICByZWMucCA9IHRtcFJlYy5wXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHRtcFJlYy5ub3JtYWxcclxuICAgICAgICByZWMubWF0ZXJpYWwgPSB0bXBSZWMubWF0ZXJpYWxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhpdEFueXRoaW5nXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXRSZWNvcmQge1xyXG4gIHQ6IG51bWJlclxyXG4gIHA6IFZlY3RvcjNcclxuICBub3JtYWw6IFZlY3RvcjNcclxuICBtYXRlcmlhbDogTWF0ZXJpYWxcclxuXHJcbiAgY29uc3RydWN0b3IoX3Q6IG51bWJlciwgX3A6IFZlY3RvcjMsIF9ub3JtYWw6IFZlY3RvcjMsIF9tYXRlcmlhbDogTWF0ZXJpYWwpIHtcclxuICAgIHRoaXMudCA9IF90XHJcbiAgICB0aGlzLnAgPSBfcFxyXG4gICAgdGhpcy5ub3JtYWwgPSBfbm9ybWFsXHJcbiAgICB0aGlzLm1hdGVyaWFsID0gX21hdGVyaWFsXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSGl0YWJsZSB7XHJcbiAgYWJzdHJhY3QgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhblxyXG59XHJcbiIsImltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWwnXHJcblxyXG5leHBvcnQgY2xhc3MgTGFtYmVydGlhbiBleHRlbmRzIE1hdGVyaWFsIHtcclxuICBhbGJlZG86IFZlY3RvcjNcclxuICBzY2F0dGVyZWQ6IFJheVxyXG4gIGF0dGVudWF0aW9uOiBWZWN0b3IzXHJcblxyXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuYWxiZWRvID0gYVxyXG4gICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygwLCAwLCAwKSlcclxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gIH1cclxuXHJcbiAgc2NhdHRlcihyOiBSYXksIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gcmVjLnAuYWRkKHJlYy5ub3JtYWwpLmFkZChVdGlscy5SYW5kb21JblVuaXRTcGhlcmUoKSlcclxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShyZWMucCwgdGFyZ2V0LnN1YihyZWMucCkpXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoXHJcbiAgICAgIHRoaXMuYWxiZWRvLngoKSxcclxuICAgICAgdGhpcy5hbGJlZG8ueSgpLFxyXG4gICAgICB0aGlzLmFsYmVkby56KClcclxuICAgIClcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRlcmlhbCB7XHJcbiAgYWJzdHJhY3Qgc2NhdHRlcmVkOiBSYXlcclxuICBhYnN0cmFjdCBhdHRlbnVhdGlvbjogVmVjdG9yM1xyXG4gIGFic3RyYWN0IHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW5cclxufVxyXG4iLCJpbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi91dGlsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIE1ldGFsIGV4dGVuZHMgTWF0ZXJpYWwge1xyXG4gIGFsYmVkbzogVmVjdG9yM1xyXG4gIHNjYXR0ZXJlZDogUmF5XHJcbiAgYXR0ZW51YXRpb246IFZlY3RvcjNcclxuICBmdXp6OiBudW1iZXJcclxuXHJcbiAgY29uc3RydWN0b3IoYTogVmVjdG9yMywgZjogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmFsYmVkbyA9IGFcclxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuXHJcbiAgICBpZiAoZiA8IDEpIHRoaXMuZnV6eiA9IGZcclxuICAgIGVsc2UgdGhpcy5mdXp6ID0gMVxyXG4gIH1cclxuXHJcbiAgc2NhdHRlcihyOiBSYXksIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgcmVmbGVjdGVkID0gVXRpbHMucmVmbGVjdChyLmRpcmVjdGlvbigpLnVuaXRWZWMzKCksIHJlYy5ub3JtYWwpXHJcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkoXHJcbiAgICAgIHJlYy5wLFxyXG4gICAgICByZWZsZWN0ZWQuYWRkKFV0aWxzLlJhbmRvbUluVW5pdFNwaGVyZSgpLm11bCh0aGlzLmZ1enopKVxyXG4gICAgKVxyXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKFxyXG4gICAgICB0aGlzLmFsYmVkby54KCksXHJcbiAgICAgIHRoaXMuYWxiZWRvLnkoKSxcclxuICAgICAgdGhpcy5hbGJlZG8ueigpXHJcbiAgICApXHJcbiAgICByZXR1cm4gdGhpcy5zY2F0dGVyZWQuZGlyZWN0aW9uKCkuZG90KHJlYy5ub3JtYWwpID4gMFxyXG4gIH1cclxufVxyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqICByYXkudHNcclxuICogIHJheSBmdW5jdGlvbiBmb3IgcCh0KSA9IEEgKyB0ICogQlxyXG4gKiAgVDp0eXBlLGRlZmF1bHQgc2V0dGluZyBpcyBudW1iZXJcclxuICogIEQ6ZGltZW5zaW9uXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFJheSB7XHJcbiAgcHVibGljIF9BOiBWZWN0b3IzXHJcbiAgcHVibGljIF9COiBWZWN0b3IzXHJcblxyXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMsIGI6IFZlY3RvcjMpIHtcclxuICAgIHRoaXMuX0EgPSBhXHJcbiAgICB0aGlzLl9CID0gYlxyXG4gIH1cclxuXHJcbiAgb3JpZ2luKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX0FcclxuICB9XHJcbiAgZGlyZWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX0JcclxuICB9XHJcbiAgcG9pbnRBdFBhcmFtKHQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuX0EuYWRkKHRoaXMuX0IubXVsKHQpKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIaXRhYmxlLCBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBTcGhlcmUgZXh0ZW5kcyBIaXRhYmxlIHtcclxuICBjZW50ZXI6IFZlY3RvcjNcclxuICByYWRpdXM6IG51bWJlclxyXG4gIG1hdGVyaWFsOiBNYXRlcmlhbFxyXG5cclxuICBjb25zdHJ1Y3RvcihjZW46IFZlY3RvcjMsIHI6IG51bWJlciwgbWF0OiBNYXRlcmlhbCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5jZW50ZXIgPSBjZW5cclxuICAgIHRoaXMucmFkaXVzID0gclxyXG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdFxyXG4gIH1cclxuXHJcbiAgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgb2MgPSByLm9yaWdpbigpLnN1Yih0aGlzLmNlbnRlcilcclxuICAgIGxldCBhID0gci5kaXJlY3Rpb24oKS5kb3Qoci5kaXJlY3Rpb24oKSlcclxuICAgIGxldCBiID0gb2MuZG90KHIuZGlyZWN0aW9uKCkpXHJcbiAgICBsZXQgYyA9IG9jLmRvdChvYykgLSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzXHJcbiAgICBsZXQgZGlzY3JpbWluYW50ID0gYiAqIGIgLSBhICogY1xyXG4gICAgaWYgKGRpc2NyaW1pbmFudCA+IDApIHtcclxuICAgICAgbGV0IHRtcCA9ICgtYiAtIE1hdGguc3FydChiICogYiAtIGEgKiBjKSkgLyBhXHJcbiAgICAgIGlmICh0bXAgPCB0TWF4ICYmIHRtcCA+IHRNaW4pIHtcclxuICAgICAgICByZWMudCA9IHRtcFxyXG4gICAgICAgIHJlYy5wID0gci5wb2ludEF0UGFyYW0ocmVjLnQpXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHJlYy5wLnN1Yih0aGlzLmNlbnRlcikuZGl2KHRoaXMucmFkaXVzKVxyXG4gICAgICAgIHJlYy5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0bXAgPSAoLWIgKyBNYXRoLnNxcnQoYiAqIGIgLSBhICogYykpIC8gYVxyXG4gICAgICBpZiAodG1wIDwgdE1heCAmJiB0bXAgPiB0TWluKSB7XHJcbiAgICAgICAgcmVjLnQgPSB0bXBcclxuICAgICAgICByZWMucCA9IHIucG9pbnRBdFBhcmFtKHJlYy50KVxyXG4gICAgICAgIHJlYy5ub3JtYWwgPSByZWMucC5zdWIodGhpcy5jZW50ZXIpLmRpdih0aGlzLnJhZGl1cylcclxuICAgICAgICByZWMubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuL2VnbWF0aC92ZWN0b3IzJ1xyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBVdGlscyB7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFJhbmRvbUluVW5pdFNwaGVyZSgpIHtcclxuICAgIGxldCBwID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgIGRvIHtcclxuICAgICAgcCA9IG5ldyBWZWN0b3IzKE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCkpXHJcbiAgICAgICAgLm11bCgyKVxyXG4gICAgICAgIC5zdWIobmV3IFZlY3RvcjMoMSwgMSwgMSkpXHJcbiAgICB9IHdoaWxlIChwLmxlbmd0aFNxdWFyZWQoKSA+PSAxLjApXHJcbiAgICByZXR1cm4gcFxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFJhbmRvbUluVW5pdERpc2soKSB7XHJcbiAgICBsZXQgcCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgICBkbyB7XHJcbiAgICAgIHAgPSBuZXcgVmVjdG9yMyhNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpKVxyXG4gICAgICAgIC5tdWwoMilcclxuICAgICAgICAuc3ViKG5ldyBWZWN0b3IzKDEsIDEsIDApKVxyXG4gICAgfSB3aGlsZSAocC5sZW5ndGhTcXVhcmVkKCkgPj0gMS4wKVxyXG4gICAgcmV0dXJuIHBcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiByZWZsZWN0KHY6IFZlY3RvcjMsIG46IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiB2LnN1YihuLm11bCgyICogdi5kb3QobikpKVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHNjaGxpY2soY29zaW5lOiBudW1iZXIsIHJlZklkeDogbnVtYmVyKSB7XHJcbiAgICBsZXQgcjAgPSAoMSAtIHJlZklkeCkgLyAoMSArIHJlZklkeClcclxuICAgIHIwID0gcjAgKiByMFxyXG4gICAgcmV0dXJuIHIwICsgKDEgLSByMCkgKiBNYXRoLnBvdygxIC0gY29zaW5lLCA1KVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZnJhY3QoXHJcbiAgICB2OiBWZWN0b3IzLFxyXG4gICAgbjogVmVjdG9yMyxcclxuICAgIG5pT3Zlck50OiBudW1iZXIsXHJcbiAgICByZWZyYWN0ZWQ6IFZlY3RvcjNcclxuICApIHtcclxuICAgIGxldCB1diA9IHYudW5pdFZlYzMoKVxyXG4gICAgbGV0IGR0ID0gdXYuZG90KG4pXHJcbiAgICBsZXQgZGlzY3JpbWluYW50ID0gMS4wIC0gbmlPdmVyTnQgKiBuaU92ZXJOdCAqICgxIC0gZHQgKiBkdClcclxuICAgIGlmIChkaXNjcmltaW5hbnQgPiAwKSB7XHJcbiAgICAgIHJlZnJhY3RlZC5zZXQoXHJcbiAgICAgICAgdXZcclxuICAgICAgICAgIC5zdWIobi5tdWwoZHQpKVxyXG4gICAgICAgICAgLm11bChuaU92ZXJOdClcclxuICAgICAgICAgIC5zdWIobi5tdWwoTWF0aC5zcXJ0KGRpc2NyaW1pbmFudCkpKVxyXG4gICAgICApXHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBSYW5kb20obWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCArIDEgLSBtaW4pKSArIG1pblxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFdyaXRlMkNhbnZhcyhcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIGltYWdlQnVmOiBBcnJheTxudW1iZXI+LFxyXG4gICAgdzogbnVtYmVyLFxyXG4gICAgaDogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBsZXQgY2FudmFzSW1hZ2UgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3LCBoKVxyXG4gICAgbGV0IGRhdGEgPSBjYW52YXNJbWFnZS5kYXRhXHJcbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBkYXRhLmxlbmd0aDsgaWR4ICs9IDQpIHtcclxuICAgICAgZGF0YVtpZHggKyAwXSA9IGltYWdlQnVmW2lkeCArIDBdXHJcbiAgICAgIGRhdGFbaWR4ICsgMV0gPSBpbWFnZUJ1ZltpZHggKyAxXVxyXG4gICAgICBkYXRhW2lkeCArIDJdID0gaW1hZ2VCdWZbaWR4ICsgMl1cclxuICAgICAgZGF0YVtpZHggKyAzXSA9IGltYWdlQnVmW2lkeCArIDNdXHJcbiAgICB9XHJcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShjYW52YXNJbWFnZSwgMCwgMClcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBHZW5lcmF0ZU5vaXNlKFxyXG4gICAgaW1hZ2VCdWZmZXI6IEFycmF5PG51bWJlcj4sXHJcbiAgICBzdGFydElkeDogbnVtYmVyLFxyXG4gICAgZW5kSWR4OiBudW1iZXJcclxuICApIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJZHg7IGluZGV4IDwgZW5kSWR4OyBpbmRleCArPSA0KSB7XHJcbiAgICAgIGxldCByID0gUmFuZG9tKDAsIDI1NSlcclxuICAgICAgbGV0IGcgPSBSYW5kb20oMCwgMjU1KVxyXG4gICAgICBsZXQgYiA9IFJhbmRvbSgwLCAyNTUpXHJcblxyXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleF0gPSByXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMV0gPSBnXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMl0gPSBiXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgM10gPSAyNTVcclxuICAgIH1cclxuICAgIHJldHVybiBpbWFnZUJ1ZmZlclxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4uL2VncmVuZGVyL3JheSdcclxuaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi4vZWdyZW5kZXIvaGl0YWJsZSdcclxuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSAnLi4vZWdyZW5kZXIvY2FtZXJhJ1xyXG5pbXBvcnQgeyBTcGhlcmUgfSBmcm9tICcuLi9lZ3JlbmRlci9zcGhlcmUnXHJcbmltcG9ydCB7IEhpdGFibGVMaXN0IH0gZnJvbSAnLi4vZWdyZW5kZXIvaGl0YWJsZS1saXN0J1xyXG5pbXBvcnQgeyBMYW1iZXJ0aWFuIH0gZnJvbSAnLi4vZWdyZW5kZXIvbGFtYmVydGlhbidcclxuaW1wb3J0IHsgTWV0YWwgfSBmcm9tICcuLi9lZ3JlbmRlci9tZXRhbCdcclxuXHJcbmNvbnN0IGN0eDogV29ya2VyID0gc2VsZiBhcyBhbnlcclxuXHJcbmZ1bmN0aW9uIENvbG9yKHI6IFJheSwgd29ybGQ6IEhpdGFibGUsIGRlcHRoOiBudW1iZXIpOiBWZWN0b3IzIHtcclxuICBsZXQgY29sID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuXHJcbiAgbGV0IGF0dGVudWF0aW9uU3VtID0gbmV3IFZlY3RvcjMoMSwgMSwgMSlcclxuICBmb3IgKGxldCBuID0gMDsgbiA8IE51bWJlci5NQVhfVkFMVUU7IG4rKykge1xyXG4gICAgbGV0IHJlYyA9IG5ldyBIaXRSZWNvcmQoXHJcbiAgICAgIDAsXHJcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcclxuICAgICAgbmV3IExhbWJlcnRpYW4obmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICApXHJcbiAgICBsZXQgYkhpdCA9IHdvcmxkLmhpdChyLCAwLjAwMSwgTnVtYmVyLk1BWF9WQUxVRSwgcmVjKVxyXG4gICAgaWYgKCFiSGl0KSB7XHJcbiAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgICBsZXQgYlNjYXR0ZXIgPSByZWMubWF0ZXJpYWwuc2NhdHRlcihyLCByZWMpXHJcbiAgICBsZXQgc2NhdHRlcmVkID0gcmVjLm1hdGVyaWFsLnNjYXR0ZXJlZFxyXG4gICAgbGV0IGF0dGVudWF0aW9uID0gcmVjLm1hdGVyaWFsLmF0dGVudWF0aW9uXHJcbiAgICBpZiAoYlNjYXR0ZXIgJiYgZGVwdGggPCA1MCkge1xyXG4gICAgICBkZXB0aCsrXHJcbiAgICAgIHIgPSBzY2F0dGVyZWRcclxuICAgICAgYXR0ZW51YXRpb25TdW0uaW11bChhdHRlbnVhdGlvbilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGF0dGVudWF0aW9uU3VtID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgICAgYnJlYWtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxldCB1bml0RGlyID0gci5kaXJlY3Rpb24oKS51bml0VmVjMygpXHJcbiAgbGV0IHQgPSAwLjUgKiAodW5pdERpci55KCkgKyAxLjApXHJcbiAgY29sID0gbmV3IFZlY3RvcjMoMS4wLCAxLjAsIDEuMClcclxuICAgIC5tdWwoMS4wIC0gdClcclxuICAgIC5hZGQobmV3IFZlY3RvcjMoMC41LCAwLjcsIDEuMCkubXVsKHQpKVxyXG4gIGNvbC5pbXVsKGF0dGVudWF0aW9uU3VtKVxyXG5cclxuICByZXR1cm4gY29sXHJcbn1cclxuXHJcbmN0eC5vbm1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgbGV0IHBhcmFtID0gbWVzc2FnZS5kYXRhXHJcbiAgbGV0IGlkID0gcGFyYW0uaWRcclxuICBsZXQgc3RhcnQgPSBwYXJhbS5zdGFydFxyXG4gIGxldCBlbmQgPSBwYXJhbS5lbmRcclxuICBsZXQgZW5kTWF4ID0gcGFyYW0uZW5kTWF4XHJcblxyXG4gIGxldCBueCA9IHBhcmFtLndpZHRoXHJcbiAgbGV0IG55ID0gcGFyYW0uaGVpZ2h0XHJcbiAgbGV0IG5zID0gcGFyYW0uc2FtcGxpbmdOdW1cclxuXHJcbiAgLy8gcHJvY2VzcyBlbmRcclxuICBpZiAoZW5kID4gZW5kTWF4KSB7XHJcbiAgICBlbmQgPSBlbmRNYXhcclxuICB9XHJcblxyXG4gIC8vIG9iamVjdFxyXG4gIGxldCBsb29rRnJvbSA9IG5ldyBWZWN0b3IzKDMsIDMsIDIpXHJcbiAgbGV0IGxvb2tBdCA9IG5ldyBWZWN0b3IzKDAsIDAsIC0xKVxyXG4gIGxldCB2dXAgPSBuZXcgVmVjdG9yMygwLCAxLCAwKVxyXG4gIGxldCB2Zm92ID0gMjBcclxuICBsZXQgYXNwZWN0ID0gbnggLyBueVxyXG4gIGxldCBhcGVydHVyZSA9IDIuMFxyXG4gIGxldCBmb2N1c0Rpc3QgPSBsb29rRnJvbS5zdWIobG9va0F0KS5sZW5ndGgoKVxyXG4gIGxldCBjYW0gPSBuZXcgQ2FtZXJhKGxvb2tGcm9tLCBsb29rQXQsIHZ1cCwgdmZvdiwgYXNwZWN0LCBhcGVydHVyZSwgZm9jdXNEaXN0KVxyXG4gIGxldCBsaXN0ID0gbmV3IEFycmF5PEhpdGFibGU+KDQpXHJcbiAgbGlzdFswXSA9IG5ldyBTcGhlcmUoXHJcbiAgICBuZXcgVmVjdG9yMygwLCAwLCAtMSksXHJcbiAgICAwLjUsXHJcbiAgICBuZXcgTGFtYmVydGlhbihuZXcgVmVjdG9yMygwLjgsIDAuMywgMC4zKSlcclxuICApXHJcbiAgbGlzdFsxXSA9IG5ldyBTcGhlcmUoXHJcbiAgICBuZXcgVmVjdG9yMygwLCAtMTAwLjUsIC0xKSxcclxuICAgIDEwMCxcclxuICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAuOCwgMC44LCAwLjApKVxyXG4gIClcclxuICBsaXN0WzJdID0gbmV3IFNwaGVyZShcclxuICAgIG5ldyBWZWN0b3IzKDEsIDAsIC0xKSxcclxuICAgIDAuNSxcclxuICAgIG5ldyBNZXRhbChuZXcgVmVjdG9yMygwLjgsIDAuNiwgMC4yKSwgMS4wKVxyXG4gIClcclxuICBsaXN0WzNdID0gbmV3IFNwaGVyZShcclxuICAgIG5ldyBWZWN0b3IzKC0xLCAwLCAtMSksXHJcbiAgICAwLjUsXHJcbiAgICBuZXcgTWV0YWwobmV3IFZlY3RvcjMoMC44LCAwLjgsIDAuOCksIDAuMylcclxuICApXHJcblxyXG4gIGxldCB3b3JsZCA9IG5ldyBIaXRhYmxlTGlzdChsaXN0LCA0KVxyXG5cclxuICBsZXQgY29sQXJyYXkgPSBuZXcgQXJyYXk8TnVtYmVyPigpXHJcblxyXG4gIGZvciAobGV0IGogPSBzdGFydDsgaiA8PSBlbmQ7IGorKykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBueDsgaSsrKSB7XHJcbiAgICAgIGxldCBjb2wgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gICAgICBmb3IgKGxldCBzID0gMDsgcyA8IG5zOyBzKyspIHtcclxuICAgICAgICBsZXQgdSA9IChpICsgTWF0aC5yYW5kb20oKSkgLyBueFxyXG4gICAgICAgIGxldCB2ID0gKG55IC0gMSAtIChqICsgTWF0aC5yYW5kb20oKSkpIC8gbnlcclxuICAgICAgICBsZXQgciA9IGNhbS5nZXRSYXkodSwgdilcclxuICAgICAgICBjb2wuaWFkZChDb2xvcihyLCB3b3JsZCwgMCkpXHJcbiAgICAgIH1cclxuICAgICAgY29sLmlkaXYobnMpXHJcbiAgICAgIGNvbCA9IGNvbC5nYW1tYTIoKVxyXG5cclxuICAgICAgY29sQXJyYXkucHVzaChNYXRoLmZsb29yKDI1NS45OSAqIGNvbC5yKCkpKVxyXG4gICAgICBjb2xBcnJheS5wdXNoKE1hdGguZmxvb3IoMjU1Ljk5ICogY29sLmcoKSkpXHJcbiAgICAgIGNvbEFycmF5LnB1c2goTWF0aC5mbG9vcigyNTUuOTkgKiBjb2wuYigpKSlcclxuICAgICAgY29sQXJyYXkucHVzaCgyNTUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjdHgucG9zdE1lc3NhZ2Uoe1xyXG4gICAgY29sOiBjb2xBcnJheSxcclxuICAgIHN0YXJ0VmFsOiBzdGFydCxcclxuICAgIGVuZFZhbDogZW5kLFxyXG4gICAgaWQ6IGlkLFxyXG4gICAgZW5kTWF4VmFsOiBlbmRNYXhcclxuICB9KVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=