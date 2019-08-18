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


  var cam = new camera_1.Camera();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC9tYXRoX3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvY2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9oaXRhYmxlLWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2hpdGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2xhbWJlcnRpYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL21hdGVyaWFsLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9yYXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL3NwaGVyZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2VyL3d3LXJheS10cmFjaW5nLWxhbWJlcnRpYW4ud29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFF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RSxLQUZJO0FBR2QsVUFBTSxFQUFFLEdBSE07QUFJZCxNQUFFLEVBQUUsRUFKVTtBQUtkLGFBQVMsRUFBRTtBQUxHLEdBQWhCO0FBT0QsQ0E1REQsQyIsImZpbGUiOiJ3d19yYXlfdHJhY2luZ19sYW1iZXJ0aWFuX3dvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvd29ya2VyL3d3LXJheS10cmFjaW5nLWxhbWJlcnRpYW4ud29ya2VyLnRzXCIpO1xuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKlxyXG4gKiAgbWF0aF91dGlscy50c1xyXG4gKiAgc2ltcGxlIG1hdGggZnVuY3Rpb25zXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhYnNNYXgoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICByZXR1cm4geCAqIHggPiB5ICogeSA/IHggOiB5XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhYnNNaW4oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICByZXR1cm4geCAqIHggPCB5ICogeSA/IHggOiB5XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtdWxkZWMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICByZXR1cm4gKHggKiAxMCAqICh5ICogMTApKSAvIDEwMFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGl2ZGVjKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuICh4ICogMTApIC8gKHkgKiAxMCkgLyAxMDBcclxufVxyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqICB2ZWN0b3IudHNcclxuICogIFQtRCB2ZWN0b3IgZGF0YVxyXG4gKiAgVDp0eXBlLGRlZmF1bHQgc2V0dGluZyBpcyBudW1iZXJcclxuICogIEQ6ZGltZW5zaW9uXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuaW1wb3J0IHsgYWJzTWF4LCBhYnNNaW4gfSBmcm9tICcuL21hdGhfdXRpbHMnXHJcblxyXG5leHBvcnQgY2xhc3MgVmVjdG9yIHtcclxuICBwcml2YXRlIF9lbGVtZW50czogQXJyYXk8bnVtYmVyPlxyXG4gIHByaXZhdGUgX2RpbWVuc2lvbjogbnVtYmVyXHJcblxyXG4gIC8vIGNvbnN0cnVjdHMgdmVjdG9yIHdpdGggcGFyYW1ldGVycyBvciB6ZXJvXHJcbiAgY29uc3RydWN0b3IoZGltZW5zaW9uOiBudW1iZXIsIHBhcmFtcz86IEFycmF5PG51bWJlcj4pIHtcclxuICAgIHRoaXMuX2RpbWVuc2lvbiA9IGRpbWVuc2lvblxyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHBhcmFtcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIC8vIGluaXQgbiBkaW1lbnNpb24gdmVjdG9yIGRhdGEsc2V0dGluZyBhbGwgMFxyXG4gICAgICB0aGlzLl9lbGVtZW50cyA9IG5ldyBBcnJheTxudW1iZXI+KGRpbWVuc2lvbilcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gMFxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9lbGVtZW50cyA9IG5ldyBBcnJheTxudW1iZXI+KGRpbWVuc2lvbilcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgcGFyYW1zLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IHBhcmFtc1tfaV1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0KHBhcmFtczogVmVjdG9yIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKHBhcmFtcy5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCBwYXJhbXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gcGFyYW1zLmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxuXHJcbiAgc2V0WmVybygpIHtcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gMFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0T25lKCkge1xyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAxXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRzXHJcbiAgfVxyXG5cclxuICBhdChpZHg6IG51bWJlcikge1xyXG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuc2l6ZSgpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdpbmRleCBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1tpZHhdXHJcbiAgfVxyXG5cclxuICBkb3Qob3RoZXJzOiBWZWN0b3IgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChvdGhlcnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnb3RoZXJzIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG4gICAgaWYgKG90aGVycy5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdkaW1lbnNpb24gaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJldCA9IDBcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xyXG4gICAgICByZXQgKz0gdGhpcy5fZWxlbWVudHNbX2ldICogb3RoZXJzLmRhdGEoKVtfaV1cclxuICAgIH1cclxuICAgIHJldHVybiByZXRcclxuICB9XHJcblxyXG4gIGxlbmd0aFNxdWFyZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcylcclxuICB9XHJcblxyXG4gIGxlbmd0aCgpIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcXVhcmVkKCkpXHJcbiAgfVxyXG5cclxuICBub3JtYWxpemUoKSB7XHJcbiAgICB0aGlzLmlkaXYodGhpcy5sZW5ndGgoKSlcclxuICB9XHJcblxyXG4gIHN1bSgpIHtcclxuICAgIGxldCByZXQgPSAwXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIHJldCArPSB0aGlzLl9lbGVtZW50c1tfaV1cclxuICAgIH1cclxuICAgIHJldHVybiByZXRcclxuICB9XHJcblxyXG4gIHNpemUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9uXHJcbiAgfVxyXG5cclxuICBhdmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdW0oKSAvIHRoaXMuc2l6ZSgpXHJcbiAgfVxyXG5cclxuICBtaW4oKSB7XHJcbiAgICBsZXQgbWluVmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuXHJcbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIG1pblZhbCA9IE1hdGgubWluKG1pblZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1pblZhbFxyXG4gIH1cclxuXHJcbiAgbWF4KCkge1xyXG4gICAgbGV0IG1heFZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIG1heFZhbCA9IE1hdGgubWF4KG1heFZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1heFZhbFxyXG4gIH1cclxuXHJcbiAgYWJzbWF4KCkge1xyXG4gICAgbGV0IGFic01heFZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIGFic01heFZhbCA9IGFic01heChhYnNNYXhWYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBhYnNNYXhWYWxcclxuICB9XHJcblxyXG4gIGFic21pbigpIHtcclxuICAgIGxldCBhYnNNaW5WYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBhYnNNaW5WYWwgPSBhYnNNaW4oYWJzTWluVmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWJzTWluVmFsXHJcbiAgfVxyXG5cclxuICBkaXN0YW5jZVNxdWFyZWRUbyhvdGhlcnM6IFZlY3Rvcikge1xyXG4gICAgaWYgKG90aGVycy5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdkaW1lbnNpb24gaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJldCA9IDBcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xyXG4gICAgICBsZXQgZGlmZiA9IHRoaXMuX2VsZW1lbnRzW19pXSAtIG90aGVycy5kYXRhKClbX2ldXHJcbiAgICAgIHJldCArPSBkaWZmICogZGlmZlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXRcclxuICB9XHJcblxyXG4gIGRpc3RhbmNlVG8ob3RoZXJzOiBWZWN0b3IpIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVNxdWFyZWRUbyhvdGhlcnMpKVxyXG4gIH1cclxuXHJcbiAgaXNFcXVhbChvdGhlcnM6IFZlY3Rvcikge1xyXG4gICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlcnMuc2l6ZSgpKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgaWYgKHRoaXMuYXQoX2kpICE9PSBvdGhlcnMuYXQoX2kpKSByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgaXNTaW1pbGFyKG90aGVyczogVmVjdG9yIHwgdW5kZWZpbmVkLCBlcHNpbG9uOiBudW1iZXIpIHtcclxuICAgIGlmIChvdGhlcnMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVycy5zaXplKCkpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xyXG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5hdChfaSkgLSBvdGhlcnMuYXQoX2kpKSA+IGVwc2lsb24pIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICBhZGQocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICs9IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSArPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIHN1YihwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLT0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgbXVsKHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAqPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKj0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBkaXYocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC89IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBpZiAocyA9PT0gMCkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLz0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBpZGl2KHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5kaXYocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIGlhZGQocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLmFkZChwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgaXN1YihwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMuc3ViKHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBpbXVsKHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5tdWwocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIHNldEF0KGlkeDogbnVtYmVyLCB2YWw6IG51bWJlcikge1xyXG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuc2l6ZSgpKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9lbGVtZW50c1tpZHhdID0gdmFsXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcHJval91KHYpID0gPHUsdj4vPHYsdj4gdVxyXG4gICAqIEBwYXJhbSB1XHJcbiAgICogQHBhcmFtIHZcclxuICAgKi9cclxuICBzdGF0aWMgcHJvaih1OiBWZWN0b3IsIHY6IFZlY3Rvcikge1xyXG4gICAgcmV0dXJuIHUubXVsKHYuZG90KHUpIC8gdS5kb3QodSkpXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gJy4vdmVjdG9yJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlY3RvcjMgZXh0ZW5kcyBWZWN0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKGUxOiBudW1iZXIsIGUyOiBudW1iZXIsIGUzOiBudW1iZXIpIHtcclxuICAgIHN1cGVyKDMsIG5ldyBBcnJheTxudW1iZXI+KGUxLCBlMiwgZTMpKVxyXG4gIH1cclxuXHJcbiAgeCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVswXVxyXG4gIH1cclxuICB5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzFdXHJcbiAgfVxyXG4gIHooKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMl1cclxuICB9XHJcbiAgcigpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVswXVxyXG4gIH1cclxuICBnKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzFdXHJcbiAgfVxyXG4gIGIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMl1cclxuICB9XHJcblxyXG4gIGlzZXQodjM6IFZlY3RvcjMpIHtcclxuICAgIHRoaXMuZGF0YSgpWzBdID0gdjMucigpXHJcbiAgICB0aGlzLmRhdGEoKVsxXSA9IHYzLmcoKVxyXG4gICAgdGhpcy5kYXRhKClbMl0gPSB2My5iKClcclxuICB9XHJcblxyXG4gIHNldCh2MzogVmVjdG9yMykge1xyXG4gICAgcmV0dXJuIHN1cGVyLnNldChuZXcgVmVjdG9yKDMsIHYzLmRhdGEoKSkpXHJcbiAgfVxyXG5cclxuICBhZGQodjM6IGFueSkge1xyXG4gICAgbGV0IGFkZHYgPSBzdXBlci5hZGQodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoYWRkdi5kYXRhKClbMF0sIGFkZHYuZGF0YSgpWzFdLCBhZGR2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIHN1Yih2MzogYW55KSB7XHJcbiAgICBsZXQgc3VidiA9IHN1cGVyLnN1Yih2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhzdWJ2LmRhdGEoKVswXSwgc3Vidi5kYXRhKClbMV0sIHN1YnYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgbXVsKHYzOiBhbnkpIHtcclxuICAgIGxldCBtdWx2ID0gc3VwZXIubXVsKHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKG11bHYuZGF0YSgpWzBdLCBtdWx2LmRhdGEoKVsxXSwgbXVsdi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBkaXYodjM6IGFueSkge1xyXG4gICAgbGV0IGRpdnYgPSBzdXBlci5kaXYodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoZGl2di5kYXRhKClbMF0sIGRpdnYuZGF0YSgpWzFdLCBkaXZ2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIGRvdCh2MzogVmVjdG9yMykge1xyXG4gICAgcmV0dXJuIHN1cGVyLmRvdChuZXcgVmVjdG9yKDMsIHYzLmRhdGEoKSkpXHJcbiAgfVxyXG5cclxuICB1bml0VmVjMygpOiBWZWN0b3IzIHtcclxuICAgIGxldCBudiA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXHJcbiAgICBudi5ub3JtYWxpemUoKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKG52LmRhdGEoKVswXSwgbnYuZGF0YSgpWzFdLCBudi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBnYW1tYTIoKTogVmVjdG9yMyB7XHJcbiAgICBsZXQgdHYgPSBuZXcgVmVjdG9yKDMsIHRoaXMuZGF0YSgpKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKFxyXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMCkpLFxyXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMSkpLFxyXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMikpXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcblxyXG5leHBvcnQgY2xhc3MgQ2FtZXJhIHtcclxuICBsb3dlckxlZnRDb3JuZXI6IFZlY3RvcjNcclxuICBob3Jpem9udGFsOiBWZWN0b3IzXHJcbiAgdmVydGljYWw6IFZlY3RvcjNcclxuICBvcmlnaW46IFZlY3RvcjNcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubG93ZXJMZWZ0Q29ybmVyID0gbmV3IFZlY3RvcjMoLTIsIC0xLCAtMSlcclxuICAgIHRoaXMuaG9yaXpvbnRhbCA9IG5ldyBWZWN0b3IzKDQsIDAsIDApXHJcbiAgICB0aGlzLnZlcnRpY2FsID0gbmV3IFZlY3RvcjMoMCwgMiwgMClcclxuICAgIHRoaXMub3JpZ2luID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICB9XHJcblxyXG4gIGdldFJheSh1OiBudW1iZXIsIHY6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBSYXkoXHJcbiAgICAgIHRoaXMub3JpZ2luLFxyXG4gICAgICB0aGlzLmxvd2VyTGVmdENvcm5lclxyXG4gICAgICAgIC5hZGQodGhpcy5ob3Jpem9udGFsLm11bCh1KSlcclxuICAgICAgICAuYWRkKHRoaXMudmVydGljYWwubXVsKHYpKVxyXG4gICAgICAgIC5zdWIodGhpcy5vcmlnaW4pXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEhpdGFibGUsIEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgTGFtYmVydGlhbiB9IGZyb20gJy4vbGFtYmVydGlhbidcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXRhYmxlTGlzdCBleHRlbmRzIEhpdGFibGUge1xyXG4gIGxpc3Q6IEFycmF5PEhpdGFibGU+XHJcbiAgbGlzdFNpemU6IG51bWJlclxyXG4gIGNvbnN0cnVjdG9yKGw6IEFycmF5PEhpdGFibGU+LCBuOiBudW1iZXIpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMubGlzdCA9IGxcclxuICAgIHRoaXMubGlzdFNpemUgPSBuXHJcbiAgfVxyXG5cclxuICBoaXQocjogUmF5LCB0TWluOiBudW1iZXIsIHRNYXg6IG51bWJlciwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcclxuICAgIGxldCB0bXBSZWMgPSBuZXcgSGl0UmVjb3JkKFxyXG4gICAgICAwLFxyXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcclxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXHJcbiAgICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAsIDAsIDApKVxyXG4gICAgKVxyXG4gICAgbGV0IGhpdEFueXRoaW5nID0gZmFsc2VcclxuICAgIGxldCBjbG9zZXN0U29GYXIgPSB0TWF4XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGlzdFNpemU7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5saXN0W2ldLmhpdChyLCB0TWluLCBjbG9zZXN0U29GYXIsIHRtcFJlYykpIHtcclxuICAgICAgICBoaXRBbnl0aGluZyA9IHRydWVcclxuICAgICAgICBjbG9zZXN0U29GYXIgPSB0bXBSZWMudFxyXG4gICAgICAgIHJlYy50ID0gdG1wUmVjLnRcclxuICAgICAgICByZWMucCA9IHRtcFJlYy5wXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHRtcFJlYy5ub3JtYWxcclxuICAgICAgICByZWMubWF0ZXJpYWwgPSB0bXBSZWMubWF0ZXJpYWxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhpdEFueXRoaW5nXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXRSZWNvcmQge1xyXG4gIHQ6IG51bWJlclxyXG4gIHA6IFZlY3RvcjNcclxuICBub3JtYWw6IFZlY3RvcjNcclxuICBtYXRlcmlhbDogTWF0ZXJpYWxcclxuXHJcbiAgY29uc3RydWN0b3IoX3Q6IG51bWJlciwgX3A6IFZlY3RvcjMsIF9ub3JtYWw6IFZlY3RvcjMsIF9tYXRlcmlhbDogTWF0ZXJpYWwpIHtcclxuICAgIHRoaXMudCA9IF90XHJcbiAgICB0aGlzLnAgPSBfcFxyXG4gICAgdGhpcy5ub3JtYWwgPSBfbm9ybWFsXHJcbiAgICB0aGlzLm1hdGVyaWFsID0gX21hdGVyaWFsXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSGl0YWJsZSB7XHJcbiAgYWJzdHJhY3QgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhblxyXG59XHJcbiIsImltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuaW1wb3J0IHsgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWwnXHJcblxyXG5leHBvcnQgY2xhc3MgTGFtYmVydGlhbiBleHRlbmRzIE1hdGVyaWFsIHtcclxuICBhbGJlZG86IFZlY3RvcjNcclxuICBzY2F0dGVyZWQ6IFJheVxyXG4gIGF0dGVudWF0aW9uOiBWZWN0b3IzXHJcblxyXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuYWxiZWRvID0gYVxyXG4gICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KG5ldyBWZWN0b3IzKDAsIDAsIDApLCBuZXcgVmVjdG9yMygwLCAwLCAwKSlcclxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gIH1cclxuXHJcbiAgc2NhdHRlcihyOiBSYXksIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gcmVjLnAuYWRkKHJlYy5ub3JtYWwpLmFkZChVdGlscy5SYW5kb21JblVuaXRTcGhlcmUoKSlcclxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShyZWMucCwgdGFyZ2V0LnN1YihyZWMucCkpXHJcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoXHJcbiAgICAgIHRoaXMuYWxiZWRvLngoKSxcclxuICAgICAgdGhpcy5hbGJlZG8ueSgpLFxyXG4gICAgICB0aGlzLmFsYmVkby56KClcclxuICAgIClcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRlcmlhbCB7XHJcbiAgYWJzdHJhY3Qgc2NhdHRlcmVkOiBSYXlcclxuICBhYnN0cmFjdCBhdHRlbnVhdGlvbjogVmVjdG9yM1xyXG4gIGFic3RyYWN0IHNjYXR0ZXIocjogUmF5LCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW5cclxufVxyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqXHJcbiAqICByYXkudHNcclxuICogIHJheSBmdW5jdGlvbiBmb3IgcCh0KSA9IEEgKyB0ICogQlxyXG4gKiAgVDp0eXBlLGRlZmF1bHQgc2V0dGluZyBpcyBudW1iZXJcclxuICogIEQ6ZGltZW5zaW9uXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFJheSB7XHJcbiAgcHVibGljIF9BOiBWZWN0b3IzXHJcbiAgcHVibGljIF9COiBWZWN0b3IzXHJcblxyXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMsIGI6IFZlY3RvcjMpIHtcclxuICAgIHRoaXMuX0EgPSBhXHJcbiAgICB0aGlzLl9CID0gYlxyXG4gIH1cclxuXHJcbiAgb3JpZ2luKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX0FcclxuICB9XHJcbiAgZGlyZWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX0JcclxuICB9XHJcbiAgcG9pbnRBdFBhcmFtKHQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuX0EuYWRkKHRoaXMuX0IubXVsKHQpKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIaXRhYmxlLCBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9tYXRlcmlhbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBTcGhlcmUgZXh0ZW5kcyBIaXRhYmxlIHtcclxuICBjZW50ZXI6IFZlY3RvcjNcclxuICByYWRpdXM6IG51bWJlclxyXG4gIG1hdGVyaWFsOiBNYXRlcmlhbFxyXG5cclxuICBjb25zdHJ1Y3RvcihjZW46IFZlY3RvcjMsIHI6IG51bWJlciwgbWF0OiBNYXRlcmlhbCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5jZW50ZXIgPSBjZW5cclxuICAgIHRoaXMucmFkaXVzID0gclxyXG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdFxyXG4gIH1cclxuXHJcbiAgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgb2MgPSByLm9yaWdpbigpLnN1Yih0aGlzLmNlbnRlcilcclxuICAgIGxldCBhID0gci5kaXJlY3Rpb24oKS5kb3Qoci5kaXJlY3Rpb24oKSlcclxuICAgIGxldCBiID0gb2MuZG90KHIuZGlyZWN0aW9uKCkpXHJcbiAgICBsZXQgYyA9IG9jLmRvdChvYykgLSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzXHJcbiAgICBsZXQgZGlzY3JpbWluYW50ID0gYiAqIGIgLSBhICogY1xyXG4gICAgaWYgKGRpc2NyaW1pbmFudCA+IDApIHtcclxuICAgICAgbGV0IHRtcCA9ICgtYiAtIE1hdGguc3FydChiICogYiAtIGEgKiBjKSkgLyBhXHJcbiAgICAgIGlmICh0bXAgPCB0TWF4ICYmIHRtcCA+IHRNaW4pIHtcclxuICAgICAgICByZWMudCA9IHRtcFxyXG4gICAgICAgIHJlYy5wID0gci5wb2ludEF0UGFyYW0ocmVjLnQpXHJcbiAgICAgICAgcmVjLm5vcm1hbCA9IHJlYy5wLnN1Yih0aGlzLmNlbnRlcikuZGl2KHRoaXMucmFkaXVzKVxyXG4gICAgICAgIHJlYy5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0bXAgPSAoLWIgKyBNYXRoLnNxcnQoYiAqIGIgLSBhICogYykpIC8gYVxyXG4gICAgICBpZiAodG1wIDwgdE1heCAmJiB0bXAgPiB0TWluKSB7XHJcbiAgICAgICAgcmVjLnQgPSB0bXBcclxuICAgICAgICByZWMucCA9IHIucG9pbnRBdFBhcmFtKHJlYy50KVxyXG4gICAgICAgIHJlYy5ub3JtYWwgPSByZWMucC5zdWIodGhpcy5jZW50ZXIpLmRpdih0aGlzLnJhZGl1cylcclxuICAgICAgICByZWMubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuL2VnbWF0aC92ZWN0b3IzJ1xyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBVdGlscyB7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFJhbmRvbUluVW5pdFNwaGVyZSgpIHtcclxuICAgIGxldCBwID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgIGRvIHtcclxuICAgICAgcCA9IG5ldyBWZWN0b3IzKE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCkpXHJcbiAgICAgICAgLm11bCgyKVxyXG4gICAgICAgIC5zdWIobmV3IFZlY3RvcjMoMSwgMSwgMSkpXHJcbiAgICB9IHdoaWxlIChwLmxlbmd0aFNxdWFyZWQoKSA+PSAxLjApXHJcbiAgICByZXR1cm4gcFxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIFJhbmRvbShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4ICsgMSAtIG1pbikpICsgbWluXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gV3JpdGUyQ2FudmFzKFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgaW1hZ2VCdWY6IEFycmF5PG51bWJlcj4sXHJcbiAgICB3OiBudW1iZXIsXHJcbiAgICBoOiBudW1iZXJcclxuICApIHtcclxuICAgIGxldCBjYW52YXNJbWFnZSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHcsIGgpXHJcbiAgICBsZXQgZGF0YSA9IGNhbnZhc0ltYWdlLmRhdGFcclxuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGRhdGEubGVuZ3RoOyBpZHggKz0gNCkge1xyXG4gICAgICBkYXRhW2lkeCArIDBdID0gaW1hZ2VCdWZbaWR4ICsgMF1cclxuICAgICAgZGF0YVtpZHggKyAxXSA9IGltYWdlQnVmW2lkeCArIDFdXHJcbiAgICAgIGRhdGFbaWR4ICsgMl0gPSBpbWFnZUJ1ZltpZHggKyAyXVxyXG4gICAgICBkYXRhW2lkeCArIDNdID0gaW1hZ2VCdWZbaWR4ICsgM11cclxuICAgIH1cclxuICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKGNhbnZhc0ltYWdlLCAwLCAwKVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIEdlbmVyYXRlTm9pc2UoXHJcbiAgICBpbWFnZUJ1ZmZlcjogQXJyYXk8bnVtYmVyPixcclxuICAgIHN0YXJ0SWR4OiBudW1iZXIsXHJcbiAgICBlbmRJZHg6IG51bWJlclxyXG4gICkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSBzdGFydElkeDsgaW5kZXggPCBlbmRJZHg7IGluZGV4ICs9IDQpIHtcclxuICAgICAgbGV0IHIgPSBSYW5kb20oMCwgMjU1KVxyXG4gICAgICBsZXQgZyA9IFJhbmRvbSgwLCAyNTUpXHJcbiAgICAgIGxldCBiID0gUmFuZG9tKDAsIDI1NSlcclxuXHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4XSA9IHJcclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAxXSA9IGdcclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAyXSA9IGJcclxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAzXSA9IDI1NVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGltYWdlQnVmZmVyXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi4vZWdyZW5kZXIvcmF5J1xyXG5pbXBvcnQgeyBIaXRhYmxlLCBIaXRSZWNvcmQgfSBmcm9tICcuLi9lZ3JlbmRlci9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tICcuLi9lZ3JlbmRlci9jYW1lcmEnXHJcbmltcG9ydCB7IFNwaGVyZSB9IGZyb20gJy4uL2VncmVuZGVyL3NwaGVyZSdcclxuaW1wb3J0IHsgSGl0YWJsZUxpc3QgfSBmcm9tICcuLi9lZ3JlbmRlci9oaXRhYmxlLWxpc3QnXHJcbmltcG9ydCB7IExhbWJlcnRpYW4gfSBmcm9tICcuLi9lZ3JlbmRlci9sYW1iZXJ0aWFuJ1xyXG5cclxuY29uc3QgY3R4OiBXb3JrZXIgPSBzZWxmIGFzIGFueVxyXG5cclxuZnVuY3Rpb24gQ29sb3IocjogUmF5LCB3b3JsZDogSGl0YWJsZSwgZGVwdGg6IG51bWJlcik6IFZlY3RvcjMge1xyXG4gIGxldCBjb2wgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG5cclxuICBsZXQgYXR0ZW51YXRpb25TdW0gPSBuZXcgVmVjdG9yMygxLCAxLCAxKVxyXG4gIGZvciAobGV0IG4gPSAwOyBuIDwgTnVtYmVyLk1BWF9WQUxVRTsgbisrKSB7XHJcbiAgICBsZXQgcmVjID0gbmV3IEhpdFJlY29yZChcclxuICAgICAgMCxcclxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXHJcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICBuZXcgTGFtYmVydGlhbihuZXcgVmVjdG9yMygwLCAwLCAwKSlcclxuICAgIClcclxuICAgIGxldCBiSGl0ID0gd29ybGQuaGl0KHIsIDAuMDAxLCBOdW1iZXIuTUFYX1ZBTFVFLCByZWMpXHJcbiAgICBpZiAoIWJIaXQpIHtcclxuICAgICAgYnJlYWtcclxuICAgIH1cclxuICAgIGxldCBiU2NhdHRlciA9IHJlYy5tYXRlcmlhbC5zY2F0dGVyKHIsIHJlYylcclxuICAgIGxldCBzY2F0dGVyZWQgPSByZWMubWF0ZXJpYWwuc2NhdHRlcmVkXHJcbiAgICBsZXQgYXR0ZW51YXRpb24gPSByZWMubWF0ZXJpYWwuYXR0ZW51YXRpb25cclxuICAgIGlmIChiU2NhdHRlciAmJiBkZXB0aCA8IDUwKSB7XHJcbiAgICAgIGRlcHRoKytcclxuICAgICAgciA9IHNjYXR0ZXJlZFxyXG4gICAgICBhdHRlbnVhdGlvblN1bS5pbXVsKGF0dGVudWF0aW9uKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXR0ZW51YXRpb25TdW0gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG4gICAgICBicmVha1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGV0IHVuaXREaXIgPSByLmRpcmVjdGlvbigpLnVuaXRWZWMzKClcclxuICBsZXQgdCA9IDAuNSAqICh1bml0RGlyLnkoKSArIDEuMClcclxuICBjb2wgPSBuZXcgVmVjdG9yMygxLjAsIDEuMCwgMS4wKVxyXG4gICAgLm11bCgxLjAgLSB0KVxyXG4gICAgLmFkZChuZXcgVmVjdG9yMygwLjUsIDAuNywgMS4wKS5tdWwodCkpXHJcbiAgY29sLmltdWwoYXR0ZW51YXRpb25TdW0pXHJcblxyXG4gIHJldHVybiBjb2xcclxufVxyXG5cclxuY3R4Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICBsZXQgcGFyYW0gPSBtZXNzYWdlLmRhdGFcclxuICBsZXQgaWQgPSBwYXJhbS5pZFxyXG4gIGxldCBzdGFydCA9IHBhcmFtLnN0YXJ0XHJcbiAgbGV0IGVuZCA9IHBhcmFtLmVuZFxyXG4gIGxldCBlbmRNYXggPSBwYXJhbS5lbmRNYXhcclxuXHJcbiAgbGV0IG54ID0gcGFyYW0ud2lkdGhcclxuICBsZXQgbnkgPSBwYXJhbS5oZWlnaHRcclxuICBsZXQgbnMgPSBwYXJhbS5zYW1wbGluZ051bVxyXG5cclxuICAvLyBwcm9jZXNzIGVuZFxyXG4gIGlmIChlbmQgPiBlbmRNYXgpIHtcclxuICAgIGVuZCA9IGVuZE1heFxyXG4gIH1cclxuXHJcbiAgLy8gb2JqZWN0XHJcbiAgbGV0IGNhbSA9IG5ldyBDYW1lcmEoKVxyXG4gIGxldCBsaXN0ID0gbmV3IEFycmF5PEhpdGFibGU+KDIpXHJcbiAgbGlzdFswXSA9IG5ldyBTcGhlcmUoXHJcbiAgICBuZXcgVmVjdG9yMygwLCAwLCAtMSksXHJcbiAgICAwLjUsXHJcbiAgICBuZXcgTGFtYmVydGlhbihuZXcgVmVjdG9yMygwLjgsIDAuMywgMC4zKSlcclxuICApXHJcbiAgbGlzdFsxXSA9IG5ldyBTcGhlcmUoXHJcbiAgICBuZXcgVmVjdG9yMygwLCAtMTAwLjUsIC0xKSxcclxuICAgIDEwMCxcclxuICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAuOCwgMC44LCAwLjApKVxyXG4gIClcclxuXHJcbiAgbGV0IHdvcmxkID0gbmV3IEhpdGFibGVMaXN0KGxpc3QsIDIpXHJcblxyXG4gIGxldCBjb2xBcnJheSA9IG5ldyBBcnJheTxOdW1iZXI+KClcclxuXHJcbiAgZm9yIChsZXQgaiA9IHN0YXJ0OyBqIDw9IGVuZDsgaisrKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG54OyBpKyspIHtcclxuICAgICAgbGV0IGNvbCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgbnM7IHMrKykge1xyXG4gICAgICAgIGxldCB1ID0gKGkgKyBNYXRoLnJhbmRvbSgpKSAvIG54XHJcbiAgICAgICAgbGV0IHYgPSAobnkgLSAxIC0gKGogKyBNYXRoLnJhbmRvbSgpKSkgLyBueVxyXG4gICAgICAgIGxldCByID0gY2FtLmdldFJheSh1LCB2KVxyXG4gICAgICAgIGNvbC5pYWRkKENvbG9yKHIsIHdvcmxkLCAwKSlcclxuICAgICAgfVxyXG4gICAgICBjb2wuaWRpdihucylcclxuICAgICAgY29sID0gY29sLmdhbW1hMigpXHJcblxyXG4gICAgICBjb2xBcnJheS5wdXNoKE1hdGguZmxvb3IoMjU1Ljk5ICogY29sLnIoKSkpXHJcbiAgICAgIGNvbEFycmF5LnB1c2goTWF0aC5mbG9vcigyNTUuOTkgKiBjb2wuZygpKSlcclxuICAgICAgY29sQXJyYXkucHVzaChNYXRoLmZsb29yKDI1NS45OSAqIGNvbC5iKCkpKVxyXG4gICAgICBjb2xBcnJheS5wdXNoKDI1NSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGN0eC5wb3N0TWVzc2FnZSh7XHJcbiAgICBjb2w6IGNvbEFycmF5LFxyXG4gICAgc3RhcnRWYWw6IHN0YXJ0LFxyXG4gICAgZW5kVmFsOiBlbmQsXHJcbiAgICBpZDogaWQsXHJcbiAgICBlbmRNYXhWYWw6IGVuZE1heFxyXG4gIH0pXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==