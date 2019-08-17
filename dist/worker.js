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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/worker/ww-ray-tracing-diffuse.worker.ts");
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

/***/ "./src/worker/ww-ray-tracing-diffuse.worker.ts":
/*!*****************************************************!*\
  !*** ./src/worker/ww-ray-tracing-diffuse.worker.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var vector3_1 = __webpack_require__(/*! ../egmath/vector3 */ "./src/egmath/vector3.ts");

var ray_1 = __webpack_require__(/*! ../egrender/ray */ "./src/egrender/ray.ts");

var hitable_1 = __webpack_require__(/*! ../egrender/hitable */ "./src/egrender/hitable.ts");

var camera_1 = __webpack_require__(/*! ../egrender/camera */ "./src/egrender/camera.ts");

var sphere_1 = __webpack_require__(/*! ../egrender/sphere */ "./src/egrender/sphere.ts");

var hitable_list_1 = __webpack_require__(/*! ../egrender/hitable-list */ "./src/egrender/hitable-list.ts");

var ctx = self;

function RandomInUnitSphere() {
  var p = new vector3_1.Vector3(0, 0, 0);

  do {
    p = new vector3_1.Vector3(Math.random(), Math.random(), Math.random()).mul(2).sub(new vector3_1.Vector3(1, 1, 1));
  } while (p.lengthSquared() >= 1.0);

  return p;
}

function Color(r, world) {
  var col = new vector3_1.Vector3(0, 0, 0);
  var reflectNum = Number.MAX_VALUE;

  for (var n = 0; n < Number.MAX_VALUE; n++) {
    var rec = new hitable_1.HitRecord(0, new vector3_1.Vector3(0, 0, 0), new vector3_1.Vector3(0, 0, 0));
    var bHit = world.hit(r, 0.001, Number.MAX_VALUE, rec);

    if (!bHit) {
      reflectNum = n;
      break;
    }

    var target = rec.p.add(rec.normal).add(RandomInUnitSphere());
    r = new ray_1.Ray(rec.p, target.sub(rec.p));
  }

  var unitDir = r.direction().unitVec3();
  var t = 0.5 * (unitDir.y() + 1.0);
  col = new vector3_1.Vector3(1.0, 1.0, 1.0).mul(1.0 - t).add(new vector3_1.Vector3(0.5, 0.7, 1.0).mul(t));
  col.imul(Math.pow(0.5, reflectNum));
  return col;
}

ctx.onmessage = function (message) {
  var param = message.data;
  var id = param.id;
  var start = param.start;
  var end = param.end;
  console.log(id, start, end);
  var nx = param.width;
  var ny = param.height;
  var ns = param.samplingNum;
  var cam = new camera_1.Camera();
  var list = new Array(2);
  list[0] = new sphere_1.Sphere(new vector3_1.Vector3(0, 0, -1), 0.5);
  list[1] = new sphere_1.Sphere(new vector3_1.Vector3(0, -100.5, -1), 100);
  var world = new hitable_list_1.HitableList(list, 2); //let world = param.hitWorld

  var j = param._j;
  var colArray = new Array();

  for (var i = start; i <= end; i++) {
    var col = new vector3_1.Vector3(0, 0, 0);

    for (var s = 0; s < ns; s++) {
      var u = (i + Math.random()) / nx;
      var v = (ny - 1 - (j + Math.random())) / ny;
      var r = cam.getRay(u, v);
      col.iadd(Color(r, world));
    }

    col.idiv(ns);
    col = col.gamma2();
    colArray.push(Math.floor(255.99 * col.r()));
    colArray.push(Math.floor(255.99 * col.g()));
    colArray.push(Math.floor(255.99 * col.b()));
    colArray.push(255);
  }

  ctx.postMessage({
    col: colArray,
    startVal: start,
    endVal: end,
    id: id
  });
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC9tYXRoX3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvY2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9oaXRhYmxlLWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2hpdGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL3JheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvc3BoZXJlLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIvd3ctcmF5LXRyYWNpbmctZGlmZnVzZS53b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7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QVEsQ0FBQyxJQUFULENBQWMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxTQUFTLEdBQUcsQ0FBQyxDQUFKLEVBQXBCLENBQWQ7QUFDQSxZQUFRLENBQUMsSUFBVCxDQUFjLEdBQWQ7QUFDRDs7QUFFRCxLQUFHLENBQUMsV0FBSixDQUFnQjtBQUFFLE9BQUcsRUFBRSxRQUFQO0FBQWlCLFlBQVEsRUFBRSxLQUEzQjtBQUFrQyxVQUFNLEVBQUUsR0FBMUM7QUFBK0MsTUFBRSxFQUFFO0FBQW5ELEdBQWhCO0FBQ0QsQ0F2Q0QsQyIsImZpbGUiOiJ3b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3dvcmtlci93dy1yYXktdHJhY2luZy1kaWZmdXNlLndvcmtlci50c1wiKTtcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICpcclxuICogIG1hdGhfdXRpbHMudHNcclxuICogIHNpbXBsZSBtYXRoIGZ1bmN0aW9uc1xyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWJzTWF4KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIHggKiB4ID4geSAqIHkgPyB4IDogeVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWJzTWluKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIHggKiB4IDwgeSAqIHkgPyB4IDogeVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbXVsZGVjKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuICh4ICogMTAgKiAoeSAqIDEwKSkgLyAxMDBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpdmRlYyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIHJldHVybiAoeCAqIDEwKSAvICh5ICogMTApIC8gMTAwXHJcbn1cclxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKlxyXG4gKiAgdmVjdG9yLnRzXHJcbiAqICBULUQgdmVjdG9yIGRhdGFcclxuICogIFQ6dHlwZSxkZWZhdWx0IHNldHRpbmcgaXMgbnVtYmVyXHJcbiAqICBEOmRpbWVuc2lvblxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmltcG9ydCB7IGFic01heCwgYWJzTWluIH0gZnJvbSAnLi9tYXRoX3V0aWxzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlY3RvciB7XHJcbiAgcHJpdmF0ZSBfZWxlbWVudHM6IEFycmF5PG51bWJlcj5cclxuICBwcml2YXRlIF9kaW1lbnNpb246IG51bWJlclxyXG5cclxuICAvLyBjb25zdHJ1Y3RzIHZlY3RvciB3aXRoIHBhcmFtZXRlcnMgb3IgemVyb1xyXG4gIGNvbnN0cnVjdG9yKGRpbWVuc2lvbjogbnVtYmVyLCBwYXJhbXM/OiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICB0aGlzLl9kaW1lbnNpb24gPSBkaW1lbnNpb25cclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmIChwYXJhbXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBpbml0IG4gZGltZW5zaW9uIHZlY3RvciBkYXRhLHNldHRpbmcgYWxsIDBcclxuICAgICAgdGhpcy5fZWxlbWVudHMgPSBuZXcgQXJyYXk8bnVtYmVyPihkaW1lbnNpb24pXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IGRpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDBcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZWxlbWVudHMgPSBuZXcgQXJyYXk8bnVtYmVyPihkaW1lbnNpb24pXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IHBhcmFtcy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSBwYXJhbXNbX2ldXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldChwYXJhbXM6IFZlY3RvciB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChwYXJhbXMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdkaW1lbnNpb24gaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgcGFyYW1zLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IHBhcmFtcy5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIHNldFplcm8oKSB7XHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldE9uZSgpIHtcclxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgdGhpcy5fZWxlbWVudHNbX2ldID0gMVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1xyXG4gIH1cclxuXHJcbiAgYXQoaWR4OiBudW1iZXIpIHtcclxuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnaW5kZXggaXMgbm90IGNvcnJlY3QhJylcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudHNbaWR4XVxyXG4gIH1cclxuXHJcbiAgZG90KG90aGVyczogVmVjdG9yIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ290aGVycyBpcyBub3QgY29ycmVjdCEnKVxyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXQgPSAwXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgcmV0ICs9IHRoaXMuX2VsZW1lbnRzW19pXSAqIG90aGVycy5kYXRhKClbX2ldXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBsZW5ndGhTcXVhcmVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpXHJcbiAgfVxyXG5cclxuICBsZW5ndGgoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCgpKVxyXG4gIH1cclxuXHJcbiAgbm9ybWFsaXplKCkge1xyXG4gICAgdGhpcy5pZGl2KHRoaXMubGVuZ3RoKCkpXHJcbiAgfVxyXG5cclxuICBzdW0oKSB7XHJcbiAgICBsZXQgcmV0ID0gMFxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICByZXQgKz0gdGhpcy5fZWxlbWVudHNbX2ldXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBzaXplKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvblxyXG4gIH1cclxuXHJcbiAgYXZnKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3VtKCkgLyB0aGlzLnNpemUoKVxyXG4gIH1cclxuXHJcbiAgbWluKCkge1xyXG4gICAgbGV0IG1pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBtaW5WYWwgPSBNYXRoLm1pbihtaW5WYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBtaW5WYWxcclxuICB9XHJcblxyXG4gIG1heCgpIHtcclxuICAgIGxldCBtYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBtYXhWYWwgPSBNYXRoLm1heChtYXhWYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcclxuICAgIH1cclxuICAgIHJldHVybiBtYXhWYWxcclxuICB9XHJcblxyXG4gIGFic21heCgpIHtcclxuICAgIGxldCBhYnNNYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxyXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xyXG4gICAgICBhYnNNYXhWYWwgPSBhYnNNYXgoYWJzTWF4VmFsLCB0aGlzLl9lbGVtZW50c1tfaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWJzTWF4VmFsXHJcbiAgfVxyXG5cclxuICBhYnNtaW4oKSB7XHJcbiAgICBsZXQgYWJzTWluVmFsID0gdGhpcy5fZWxlbWVudHNbMF1cclxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcclxuICAgICAgYWJzTWluVmFsID0gYWJzTWluKGFic01pblZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFic01pblZhbFxyXG4gIH1cclxuXHJcbiAgZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzOiBWZWN0b3IpIHtcclxuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGltZW5zaW9uIGlzIG5vdCBjb3JyZWN0IScpXHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXQgPSAwXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgbGV0IGRpZmYgPSB0aGlzLl9lbGVtZW50c1tfaV0gLSBvdGhlcnMuZGF0YSgpW19pXVxyXG4gICAgICByZXQgKz0gZGlmZiAqIGRpZmZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBkaXN0YW5jZVRvKG90aGVyczogVmVjdG9yKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzKSlcclxuICB9XHJcblxyXG4gIGlzRXF1YWwob3RoZXJzOiBWZWN0b3IpIHtcclxuICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXJzLnNpemUoKSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmF0KF9pKSAhPT0gb3RoZXJzLmF0KF9pKSkgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGlzU2ltaWxhcihvdGhlcnM6IFZlY3RvciB8IHVuZGVmaW5lZCwgZXBzaWxvbjogbnVtYmVyKSB7XHJcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlcnMuc2l6ZSgpKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcclxuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYXQoX2kpIC0gb3RoZXJzLmF0KF9pKSkgPiBlcHNpbG9uKSByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgYWRkKHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSArPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKz0gc1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgfVxyXG5cclxuICBzdWIocGFyYW1zPzogYW55KSB7XHJcbiAgICBsZXQgX2kgPSAwXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbGV0IHYgPSBwYXJhbXNcclxuICAgICAgaWYgKHYuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHYuZGF0YSgpW19pXVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3VlxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgcyA9IHBhcmFtc1xyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAtPSBzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcclxuICB9XHJcblxyXG4gIG11bChwYXJhbXM/OiBhbnkpIHtcclxuICAgIGxldCBfaSA9IDBcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBsZXQgdiA9IHBhcmFtc1xyXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG5cclxuICAgICAgbGV0IG5ld1YgPSBuZXcgVmVjdG9yKHRoaXMuc2l6ZSgpLCB0aGlzLmRhdGEoKSlcclxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcclxuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gKj0gdi5kYXRhKClbX2ldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdWXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBzID0gcGFyYW1zXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgZGl2KHBhcmFtcz86IGFueSkge1xyXG4gICAgbGV0IF9pID0gMFxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGxldCB2ID0gcGFyYW1zXHJcbiAgICAgIGlmICh2LnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcblxyXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxyXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xyXG4gICAgICAgIG5ld1YuZGF0YSgpW19pXSAvPSB2LmRhdGEoKVtfaV1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbGV0IHMgPSBwYXJhbXNcclxuICAgICAgaWYgKHMgPT09IDApIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXHJcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXHJcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IG5ld1Yuc2l6ZSgpOyBfaSsrKSB7XHJcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC89IHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld1ZcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxyXG4gIH1cclxuXHJcbiAgaWRpdihwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMuZGl2KHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBpYWRkKHBhcmFtcz86IGFueSkge1xyXG4gICAgdGhpcy5zZXQodGhpcy5hZGQocGFyYW1zKSlcclxuICB9XHJcblxyXG4gIGlzdWIocGFyYW1zPzogYW55KSB7XHJcbiAgICB0aGlzLnNldCh0aGlzLnN1YihwYXJhbXMpKVxyXG4gIH1cclxuXHJcbiAgaW11bChwYXJhbXM/OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMubXVsKHBhcmFtcykpXHJcbiAgfVxyXG5cclxuICBzZXRBdChpZHg6IG51bWJlciwgdmFsOiBudW1iZXIpIHtcclxuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLnNpemUoKSkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZWxlbWVudHNbaWR4XSA9IHZhbFxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHByb2pfdSh2KSA9IDx1LHY+Lzx2LHY+IHVcclxuICAgKiBAcGFyYW0gdVxyXG4gICAqIEBwYXJhbSB2XHJcbiAgICovXHJcbiAgc3RhdGljIHByb2oodTogVmVjdG9yLCB2OiBWZWN0b3IpIHtcclxuICAgIHJldHVybiB1Lm11bCh2LmRvdCh1KSAvIHUuZG90KHUpKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuL3ZlY3RvcidcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3IzIGV4dGVuZHMgVmVjdG9yIHtcclxuICBjb25zdHJ1Y3RvcihlMTogbnVtYmVyLCBlMjogbnVtYmVyLCBlMzogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigzLCBuZXcgQXJyYXk8bnVtYmVyPihlMSwgZTIsIGUzKSlcclxuICB9XHJcblxyXG4gIHgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMF1cclxuICB9XHJcbiAgeSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsxXVxyXG4gIH1cclxuICB6KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzJdXHJcbiAgfVxyXG4gIHIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMF1cclxuICB9XHJcbiAgZygpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEoKVsxXVxyXG4gIH1cclxuICBiKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzJdXHJcbiAgfVxyXG5cclxuICBzZXQodjM6IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiBzdXBlci5zZXQobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxyXG4gIH1cclxuXHJcbiAgYWRkKHYzOiBhbnkpIHtcclxuICAgIGxldCBhZGR2ID0gc3VwZXIuYWRkKHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGFkZHYuZGF0YSgpWzBdLCBhZGR2LmRhdGEoKVsxXSwgYWRkdi5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBzdWIodjM6IGFueSkge1xyXG4gICAgbGV0IHN1YnYgPSBzdXBlci5zdWIodjMpXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoc3Vidi5kYXRhKClbMF0sIHN1YnYuZGF0YSgpWzFdLCBzdWJ2LmRhdGEoKVsyXSlcclxuICB9XHJcblxyXG4gIG11bCh2MzogYW55KSB7XHJcbiAgICBsZXQgbXVsdiA9IHN1cGVyLm11bCh2MylcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhtdWx2LmRhdGEoKVswXSwgbXVsdi5kYXRhKClbMV0sIG11bHYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgZGl2KHYzOiBhbnkpIHtcclxuICAgIGxldCBkaXZ2ID0gc3VwZXIuZGl2KHYzKVxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGRpdnYuZGF0YSgpWzBdLCBkaXZ2LmRhdGEoKVsxXSwgZGl2di5kYXRhKClbMl0pXHJcbiAgfVxyXG5cclxuICBkb3QodjM6IFZlY3RvcjMpIHtcclxuICAgIHJldHVybiBzdXBlci5kb3QobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxyXG4gIH1cclxuXHJcbiAgdW5pdFZlYzMoKTogVmVjdG9yMyB7XHJcbiAgICBsZXQgbnYgPSBuZXcgVmVjdG9yKDMsIHRoaXMuZGF0YSgpKVxyXG4gICAgbnYubm9ybWFsaXplKClcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhudi5kYXRhKClbMF0sIG52LmRhdGEoKVsxXSwgbnYuZGF0YSgpWzJdKVxyXG4gIH1cclxuXHJcbiAgZ2FtbWEyKCk6IFZlY3RvcjMge1xyXG4gICAgbGV0IHR2ID0gbmV3IFZlY3RvcigzLCB0aGlzLmRhdGEoKSlcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhcclxuICAgICAgTWF0aC5zcXJ0KHR2LmF0KDApKSxcclxuICAgICAgTWF0aC5zcXJ0KHR2LmF0KDEpKSxcclxuICAgICAgTWF0aC5zcXJ0KHR2LmF0KDIpKVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbWVyYSB7XHJcbiAgbG93ZXJMZWZ0Q29ybmVyOiBWZWN0b3IzXHJcbiAgaG9yaXpvbnRhbDogVmVjdG9yM1xyXG4gIHZlcnRpY2FsOiBWZWN0b3IzXHJcbiAgb3JpZ2luOiBWZWN0b3IzXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmxvd2VyTGVmdENvcm5lciA9IG5ldyBWZWN0b3IzKC0yLCAtMSwgLTEpXHJcbiAgICB0aGlzLmhvcml6b250YWwgPSBuZXcgVmVjdG9yMyg0LCAwLCAwKVxyXG4gICAgdGhpcy52ZXJ0aWNhbCA9IG5ldyBWZWN0b3IzKDAsIDIsIDApXHJcbiAgICB0aGlzLm9yaWdpbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgfVxyXG5cclxuICBnZXRSYXkodTogbnVtYmVyLCB2OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgUmF5KFxyXG4gICAgICB0aGlzLm9yaWdpbixcclxuICAgICAgdGhpcy5sb3dlckxlZnRDb3JuZXJcclxuICAgICAgICAuYWRkKHRoaXMuaG9yaXpvbnRhbC5tdWwodSkpXHJcbiAgICAgICAgLmFkZCh0aGlzLnZlcnRpY2FsLm11bCh2KSlcclxuICAgICAgICAuc3ViKHRoaXMub3JpZ2luKVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIaXRhYmxlLCBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXHJcblxyXG5leHBvcnQgY2xhc3MgSGl0YWJsZUxpc3QgZXh0ZW5kcyBIaXRhYmxlIHtcclxuICBsaXN0OiBBcnJheTxIaXRhYmxlPlxyXG4gIGxpc3RTaXplOiBudW1iZXJcclxuICBjb25zdHJ1Y3RvcihsOiBBcnJheTxIaXRhYmxlPiwgbjogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmxpc3QgPSBsXHJcbiAgICB0aGlzLmxpc3RTaXplID0gblxyXG4gIH1cclxuXHJcbiAgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgdG1wUmVjID0gbmV3IEhpdFJlY29yZCgwLCBuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMCkpXHJcbiAgICBsZXQgaGl0QW55dGhpbmcgPSBmYWxzZVxyXG4gICAgbGV0IGNsb3Nlc3RTb0ZhciA9IHRNYXhcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0U2l6ZTsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmxpc3RbaV0uaGl0KHIsIHRNaW4sIGNsb3Nlc3RTb0ZhciwgdG1wUmVjKSkge1xyXG4gICAgICAgIGhpdEFueXRoaW5nID0gdHJ1ZVxyXG4gICAgICAgIGNsb3Nlc3RTb0ZhciA9IHRtcFJlYy50XHJcbiAgICAgICAgcmVjLnQgPSB0bXBSZWMudFxyXG4gICAgICAgIHJlYy5wID0gdG1wUmVjLnBcclxuICAgICAgICByZWMubm9ybWFsID0gdG1wUmVjLm5vcm1hbFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGl0QW55dGhpbmdcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXRSZWNvcmQge1xyXG4gIHQ6IG51bWJlclxyXG4gIHA6IFZlY3RvcjNcclxuICBub3JtYWw6IFZlY3RvcjNcclxuXHJcbiAgY29uc3RydWN0b3IoX3Q6IG51bWJlciwgX3A6IFZlY3RvcjMsIF9ub3JtYWw6IFZlY3RvcjMpIHtcclxuICAgIHRoaXMudCA9IF90XHJcbiAgICB0aGlzLnAgPSBfcFxyXG4gICAgdGhpcy5ub3JtYWwgPSBfbm9ybWFsXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSGl0YWJsZSB7XHJcbiAgYWJzdHJhY3QgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhblxyXG59XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICpcclxuICogIHJheS50c1xyXG4gKiAgcmF5IGZ1bmN0aW9uIGZvciBwKHQpID0gQSArIHQgKiBCXHJcbiAqICBUOnR5cGUsZGVmYXVsdCBzZXR0aW5nIGlzIG51bWJlclxyXG4gKiAgRDpkaW1lbnNpb25cclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcblxyXG5leHBvcnQgY2xhc3MgUmF5IHtcclxuICBwcml2YXRlIF9BOiBWZWN0b3IzXHJcbiAgcHJpdmF0ZSBfQjogVmVjdG9yM1xyXG5cclxuICBjb25zdHJ1Y3RvcihhOiBWZWN0b3IzLCBiOiBWZWN0b3IzKSB7XHJcbiAgICB0aGlzLl9BID0gYVxyXG4gICAgdGhpcy5fQiA9IGJcclxuICB9XHJcblxyXG4gIG9yaWdpbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9BXHJcbiAgfVxyXG4gIGRpcmVjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9CXHJcbiAgfVxyXG4gIHBvaW50QXRQYXJhbSh0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLl9BLmFkZCh0aGlzLl9CLm11bCh0KSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwaGVyZSBleHRlbmRzIEhpdGFibGUge1xyXG4gIGNlbnRlcjogVmVjdG9yM1xyXG4gIHJhZGl1czogbnVtYmVyXHJcblxyXG4gIGNvbnN0cnVjdG9yKGNlbjogVmVjdG9yMywgcjogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmNlbnRlciA9IGNlblxyXG4gICAgdGhpcy5yYWRpdXMgPSByXHJcbiAgfVxyXG5cclxuICBoaXQocjogUmF5LCB0TWluOiBudW1iZXIsIHRNYXg6IG51bWJlciwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcclxuICAgIGxldCBvYyA9IHIub3JpZ2luKCkuc3ViKHRoaXMuY2VudGVyKVxyXG4gICAgbGV0IGEgPSByLmRpcmVjdGlvbigpLmRvdChyLmRpcmVjdGlvbigpKVxyXG4gICAgbGV0IGIgPSBvYy5kb3Qoci5kaXJlY3Rpb24oKSlcclxuICAgIGxldCBjID0gb2MuZG90KG9jKSAtIHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXNcclxuICAgIGxldCBkaXNjcmltaW5hbnQgPSBiICogYiAtIGEgKiBjXHJcbiAgICBpZiAoZGlzY3JpbWluYW50ID4gMCkge1xyXG4gICAgICBsZXQgdG1wID0gKC1iIC0gTWF0aC5zcXJ0KGIgKiBiIC0gYSAqIGMpKSAvIGFcclxuICAgICAgaWYgKHRtcCA8IHRNYXggJiYgdG1wID4gdE1pbikge1xyXG4gICAgICAgIHJlYy50ID0gdG1wXHJcbiAgICAgICAgcmVjLnAgPSByLnBvaW50QXRQYXJhbShyZWMudClcclxuICAgICAgICByZWMubm9ybWFsID0gcmVjLnAuc3ViKHRoaXMuY2VudGVyKS5kaXYodGhpcy5yYWRpdXMpXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG5cclxuICAgICAgdG1wID0gKC1iICsgTWF0aC5zcXJ0KGIgKiBiIC0gYSAqIGMpKSAvIGFcclxuICAgICAgaWYgKHRtcCA8IHRNYXggJiYgdG1wID4gdE1pbikge1xyXG4gICAgICAgIHJlYy50ID0gdG1wXHJcbiAgICAgICAgcmVjLnAgPSByLnBvaW50QXRQYXJhbShyZWMudClcclxuICAgICAgICByZWMubm9ybWFsID0gcmVjLnAuc3ViKHRoaXMuY2VudGVyKS5kaXYodGhpcy5yYWRpdXMpXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcclxuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi4vZWdyZW5kZXIvcmF5J1xyXG5pbXBvcnQgeyBIaXRhYmxlLCBIaXRSZWNvcmQgfSBmcm9tICcuLi9lZ3JlbmRlci9oaXRhYmxlJ1xyXG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tICcuLi9lZ3JlbmRlci9jYW1lcmEnXHJcbmltcG9ydCB7IFNwaGVyZSB9IGZyb20gJy4uL2VncmVuZGVyL3NwaGVyZSc7XHJcbmltcG9ydCB7IEhpdGFibGVMaXN0IH0gZnJvbSAnLi4vZWdyZW5kZXIvaGl0YWJsZS1saXN0JztcclxuXHJcbmNvbnN0IGN0eDogV29ya2VyID0gc2VsZiBhcyBhbnlcclxuXHJcbmZ1bmN0aW9uIFJhbmRvbUluVW5pdFNwaGVyZSgpIHtcclxuICBsZXQgcCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXHJcbiAgZG8ge1xyXG4gICAgcCA9IG5ldyBWZWN0b3IzKE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCkpXHJcbiAgICAgIC5tdWwoMilcclxuICAgICAgLnN1YihuZXcgVmVjdG9yMygxLCAxLCAxKSlcclxuICB9IHdoaWxlIChwLmxlbmd0aFNxdWFyZWQoKSA+PSAxLjApXHJcbiAgcmV0dXJuIHBcclxufVxyXG5cclxuZnVuY3Rpb24gQ29sb3IocjogUmF5LCB3b3JsZDogSGl0YWJsZSk6IFZlY3RvcjMge1xyXG4gIGxldCBjb2wgPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxyXG5cclxuICBsZXQgcmVmbGVjdE51bSA9IE51bWJlci5NQVhfVkFMVUVcclxuICBmb3IgKGxldCBuID0gMDsgbiA8IE51bWJlci5NQVhfVkFMVUU7IG4rKykge1xyXG4gICAgbGV0IHJlYyA9IG5ldyBIaXRSZWNvcmQoMCwgbmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDApKVxyXG4gICAgbGV0IGJIaXQgPSB3b3JsZC5oaXQociwgMC4wMDEsIE51bWJlci5NQVhfVkFMVUUsIHJlYylcclxuICAgIGlmICghYkhpdCkge1xyXG4gICAgICByZWZsZWN0TnVtID0gblxyXG4gICAgICBicmVha1xyXG4gICAgfVxyXG4gICAgbGV0IHRhcmdldCA9IHJlYy5wLmFkZChyZWMubm9ybWFsKS5hZGQoUmFuZG9tSW5Vbml0U3BoZXJlKCkpXHJcbiAgICByID0gbmV3IFJheShyZWMucCwgdGFyZ2V0LnN1YihyZWMucCkpXHJcbiAgfVxyXG5cclxuICBsZXQgdW5pdERpciA9IHIuZGlyZWN0aW9uKCkudW5pdFZlYzMoKVxyXG4gIGxldCB0ID0gMC41ICogKHVuaXREaXIueSgpICsgMS4wKVxyXG4gIGNvbCA9IG5ldyBWZWN0b3IzKDEuMCwgMS4wLCAxLjApXHJcbiAgICAubXVsKDEuMCAtIHQpXHJcbiAgICAuYWRkKG5ldyBWZWN0b3IzKDAuNSwgMC43LCAxLjApLm11bCh0KSlcclxuICBjb2wuaW11bChNYXRoLnBvdygwLjUsIHJlZmxlY3ROdW0pKVxyXG5cclxuICByZXR1cm4gY29sXHJcbn1cclxuXHJcbmN0eC5vbm1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgXHJcbiAgbGV0IHBhcmFtID0gbWVzc2FnZS5kYXRhXHJcbiAgbGV0IGlkID0gcGFyYW0uaWRcclxuICBsZXQgc3RhcnQgPSBwYXJhbS5zdGFydFxyXG4gIGxldCBlbmQgPSBwYXJhbS5lbmRcclxuICBjb25zb2xlLmxvZyhpZCxzdGFydCxlbmQpXHJcbiAgbGV0IG54ID0gcGFyYW0ud2lkdGhcclxuICBsZXQgbnkgPSBwYXJhbS5oZWlnaHRcclxuICBsZXQgbnMgPSBwYXJhbS5zYW1wbGluZ051bVxyXG4gIGxldCBjYW0gPSBuZXcgQ2FtZXJhKClcclxuICBsZXQgbGlzdCA9IG5ldyBBcnJheTxIaXRhYmxlPigyKVxyXG4gIGxpc3RbMF0gPSBuZXcgU3BoZXJlKG5ldyBWZWN0b3IzKDAsIDAsIC0xKSwgMC41KVxyXG4gIGxpc3RbMV0gPSBuZXcgU3BoZXJlKG5ldyBWZWN0b3IzKDAsIC0xMDAuNSwgLTEpLCAxMDApXHJcblxyXG4gIGxldCB3b3JsZCA9IG5ldyBIaXRhYmxlTGlzdChsaXN0LCAyKVxyXG4gIC8vbGV0IHdvcmxkID0gcGFyYW0uaGl0V29ybGRcclxuICBsZXQgaiA9IHBhcmFtLl9qXHJcblxyXG4gIGxldCBjb2xBcnJheSA9IG5ldyBBcnJheTxOdW1iZXI+KClcclxuXHJcbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XHJcbiAgICBsZXQgY29sID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcclxuICAgIGZvciAobGV0IHMgPSAwOyBzIDwgbnM7IHMrKykge1xyXG4gICAgICBsZXQgdSA9IChpICsgTWF0aC5yYW5kb20oKSkgLyBueFxyXG4gICAgICBsZXQgdiA9IChueSAtIDEgLSAoaiArIE1hdGgucmFuZG9tKCkpKSAvIG55XHJcbiAgICAgIGxldCByID0gY2FtLmdldFJheSh1LCB2KVxyXG4gICAgICBjb2wuaWFkZChDb2xvcihyLCB3b3JsZCkpXHJcbiAgICB9XHJcbiAgICBjb2wuaWRpdihucylcclxuICAgIGNvbCA9IGNvbC5nYW1tYTIoKVxyXG5cclxuICAgIGNvbEFycmF5LnB1c2goTWF0aC5mbG9vcigyNTUuOTkgKiBjb2wucigpKSlcclxuICAgIGNvbEFycmF5LnB1c2goTWF0aC5mbG9vcigyNTUuOTkgKiBjb2wuZygpKSlcclxuICAgIGNvbEFycmF5LnB1c2goTWF0aC5mbG9vcigyNTUuOTkgKiBjb2wuYigpKSlcclxuICAgIGNvbEFycmF5LnB1c2goMjU1KVxyXG4gIH1cclxuXHJcbiAgY3R4LnBvc3RNZXNzYWdlKHsgY29sOiBjb2xBcnJheSwgc3RhcnRWYWw6IHN0YXJ0LCBlbmRWYWw6IGVuZCwgaWQ6IGlkIH0pXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==