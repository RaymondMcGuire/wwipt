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


  var cam = new camera_1.Camera();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VnbWF0aC9tYXRoX3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ21hdGgvdmVjdG9yMy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvY2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9oaXRhYmxlLWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2hpdGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL2xhbWJlcnRpYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VncmVuZGVyL21hdGVyaWFsLnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9tZXRhbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZWdyZW5kZXIvcmF5LnRzIiwid2VicGFjazovLy8uL3NyYy9lZ3JlbmRlci9zcGhlcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci93dy1yYXktdHJhY2luZy1tZXRhbC53b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlD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QUFHLENBQUwsSUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQUwsRUFBZCxDQUFELElBQWlDLEVBQXpDO0FBQ0EsWUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQUosQ0FBVyxDQUFYLEVBQWMsQ0FBZCxDQUFSO0FBQ0EsV0FBRyxDQUFDLElBQUosQ0FBUyxLQUFLLENBQUMsQ0FBRCxFQUFJLEtBQUosRUFBVyxDQUFYLENBQWQ7QUFDRDs7QUFDRCxTQUFHLENBQUMsSUFBSixDQUFTLEVBQVQ7QUFDQSxTQUFHLEdBQUcsR0FBRyxDQUFDLE1BQUosRUFBTjtBQUVBLGNBQVEsQ0FBQyxJQUFULENBQWMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxTQUFTLEdBQUcsQ0FBQyxDQUFKLEVBQXBCLENBQWQ7QUFDQSxjQUFRLENBQUMsSUFBVCxDQUFjLElBQUksQ0FBQyxLQUFMLENBQVcsU0FBUyxHQUFHLENBQUMsQ0FBSixFQUFwQixDQUFkO0FBQ0EsY0FBUSxDQUFDLElBQVQsQ0FBYyxJQUFJLENBQUMsS0FBTCxDQUFXLFNBQVMsR0FBRyxDQUFDLENBQUosRUFBcEIsQ0FBZDtBQUNBLGNBQVEsQ0FBQyxJQUFULENBQWMsR0FBZDtBQUNEO0FBQ0Y7O0FBRUQsS0FBRyxDQUFDLFdBQUosQ0FBZ0I7QUFDZCxPQUFHLEVBQUUsUUFEUztBQUVkLFlBQVEsRUFBRSxLQUZJO0FBR2QsVUFBTSxFQUFFLEdBSE07QUFJZCxNQUFFLEVBQUUsRUFKVTtBQUtkLGFBQVMsRUFBRTtBQUxHLEdBQWhCO0FBT0QsQ0F0RUQsQyIsImZpbGUiOiJ3d19yYXlfdHJhY2luZ19tZXRhbF93b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3dvcmtlci93dy1yYXktdHJhY2luZy1tZXRhbC53b3JrZXIudHNcIik7XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKlxuICogIG1hdGhfdXRpbHMudHNcbiAqICBzaW1wbGUgbWF0aCBmdW5jdGlvbnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFic01heCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICByZXR1cm4geCAqIHggPiB5ICogeSA/IHggOiB5XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhYnNNaW4oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgcmV0dXJuIHggKiB4IDwgeSAqIHkgPyB4IDogeVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbXVsZGVjKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gIHJldHVybiAoeCAqIDEwICogKHkgKiAxMCkpIC8gMTAwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXZkZWMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgcmV0dXJuICh4ICogMTApIC8gKHkgKiAxMCkgLyAxMDBcbn1cbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqXG4gKiAgdmVjdG9yLnRzXG4gKiAgVC1EIHZlY3RvciBkYXRhXG4gKiAgVDp0eXBlLGRlZmF1bHQgc2V0dGluZyBpcyBudW1iZXJcbiAqICBEOmRpbWVuc2lvblxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuaW1wb3J0IHsgYWJzTWF4LCBhYnNNaW4gfSBmcm9tICcuL21hdGhfdXRpbHMnXG5cbmV4cG9ydCBjbGFzcyBWZWN0b3Ige1xuICBwcml2YXRlIF9lbGVtZW50czogQXJyYXk8bnVtYmVyPlxuICBwcml2YXRlIF9kaW1lbnNpb246IG51bWJlclxuXG4gIC8vIGNvbnN0cnVjdHMgdmVjdG9yIHdpdGggcGFyYW1ldGVycyBvciB6ZXJvXG4gIGNvbnN0cnVjdG9yKGRpbWVuc2lvbjogbnVtYmVyLCBwYXJhbXM/OiBBcnJheTxudW1iZXI+KSB7XG4gICAgdGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uXG4gICAgbGV0IF9pID0gMFxuICAgIGlmIChwYXJhbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gaW5pdCBuIGRpbWVuc2lvbiB2ZWN0b3IgZGF0YSxzZXR0aW5nIGFsbCAwXG4gICAgICB0aGlzLl9lbGVtZW50cyA9IG5ldyBBcnJheTxudW1iZXI+KGRpbWVuc2lvbilcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IGRpbWVuc2lvbjsgX2krKykge1xuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRzID0gbmV3IEFycmF5PG51bWJlcj4oZGltZW5zaW9uKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgcGFyYW1zLmxlbmd0aDsgX2krKykge1xuICAgICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSBwYXJhbXNbX2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0KHBhcmFtczogVmVjdG9yIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAocGFyYW1zLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCBwYXJhbXMuc2l6ZSgpOyBfaSsrKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IHBhcmFtcy5kYXRhKClbX2ldXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgc2V0WmVybygpIHtcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XG4gICAgICB0aGlzLl9lbGVtZW50c1tfaV0gPSAwXG4gICAgfVxuICB9XG5cbiAgc2V0T25lKCkge1xuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRzW19pXSA9IDFcbiAgICB9XG4gIH1cblxuICBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1xuICB9XG5cbiAgYXQoaWR4OiBudW1iZXIpIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdpbmRleCBpcyBub3QgY29ycmVjdCEnKVxuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50c1tpZHhdXG4gIH1cblxuICBkb3Qob3RoZXJzOiBWZWN0b3IgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAob3RoZXJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdvdGhlcnMgaXMgbm90IGNvcnJlY3QhJylcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICBpZiAob3RoZXJzLnNpemUoKSAhPT0gdGhpcy5zaXplKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkaW1lbnNpb24gaXMgbm90IGNvcnJlY3QhJylcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGxldCByZXQgPSAwXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XG4gICAgICByZXQgKz0gdGhpcy5fZWxlbWVudHNbX2ldICogb3RoZXJzLmRhdGEoKVtfaV1cbiAgICB9XG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgbGVuZ3RoU3F1YXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcylcbiAgfVxuXG4gIGxlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCgpKVxuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIHRoaXMuaWRpdih0aGlzLmxlbmd0aCgpKVxuICB9XG5cbiAgc3VtKCkge1xuICAgIGxldCByZXQgPSAwXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xuICAgICAgcmV0ICs9IHRoaXMuX2VsZW1lbnRzW19pXVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25cbiAgfVxuXG4gIGF2ZygpIHtcbiAgICByZXR1cm4gdGhpcy5zdW0oKSAvIHRoaXMuc2l6ZSgpXG4gIH1cblxuICBtaW4oKSB7XG4gICAgbGV0IG1pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXG5cbiAgICBmb3IgKGxldCBfaSA9IDE7IF9pIDwgdGhpcy5fZGltZW5zaW9uOyBfaSsrKSB7XG4gICAgICBtaW5WYWwgPSBNYXRoLm1pbihtaW5WYWwsIHRoaXMuX2VsZW1lbnRzW19pXSlcbiAgICB9XG4gICAgcmV0dXJuIG1pblZhbFxuICB9XG5cbiAgbWF4KCkge1xuICAgIGxldCBtYXhWYWwgPSB0aGlzLl9lbGVtZW50c1swXVxuICAgIGZvciAobGV0IF9pID0gMTsgX2kgPCB0aGlzLl9kaW1lbnNpb247IF9pKyspIHtcbiAgICAgIG1heFZhbCA9IE1hdGgubWF4KG1heFZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxuICAgIH1cbiAgICByZXR1cm4gbWF4VmFsXG4gIH1cblxuICBhYnNtYXgoKSB7XG4gICAgbGV0IGFic01heFZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xuICAgICAgYWJzTWF4VmFsID0gYWJzTWF4KGFic01heFZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxuICAgIH1cbiAgICByZXR1cm4gYWJzTWF4VmFsXG4gIH1cblxuICBhYnNtaW4oKSB7XG4gICAgbGV0IGFic01pblZhbCA9IHRoaXMuX2VsZW1lbnRzWzBdXG4gICAgZm9yIChsZXQgX2kgPSAxOyBfaSA8IHRoaXMuX2RpbWVuc2lvbjsgX2krKykge1xuICAgICAgYWJzTWluVmFsID0gYWJzTWluKGFic01pblZhbCwgdGhpcy5fZWxlbWVudHNbX2ldKVxuICAgIH1cbiAgICByZXR1cm4gYWJzTWluVmFsXG4gIH1cblxuICBkaXN0YW5jZVNxdWFyZWRUbyhvdGhlcnM6IFZlY3Rvcikge1xuICAgIGlmIChvdGhlcnMuc2l6ZSgpICE9PSB0aGlzLnNpemUoKSkge1xuICAgICAgY29uc29sZS5sb2coJ2RpbWVuc2lvbiBpcyBub3QgY29ycmVjdCEnKVxuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuXG4gICAgbGV0IHJldCA9IDBcbiAgICBmb3IgKGxldCBfaSA9IDA7IF9pIDwgdGhpcy5zaXplKCk7IF9pKyspIHtcbiAgICAgIGxldCBkaWZmID0gdGhpcy5fZWxlbWVudHNbX2ldIC0gb3RoZXJzLmRhdGEoKVtfaV1cbiAgICAgIHJldCArPSBkaWZmICogZGlmZlxuICAgIH1cblxuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIGRpc3RhbmNlVG8ob3RoZXJzOiBWZWN0b3IpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcXVhcmVkVG8ob3RoZXJzKSlcbiAgfVxuXG4gIGlzRXF1YWwob3RoZXJzOiBWZWN0b3IpIHtcbiAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVycy5zaXplKCkpIHJldHVybiBmYWxzZVxuXG4gICAgZm9yIChsZXQgX2kgPSAwOyBfaSA8IHRoaXMuc2l6ZSgpOyBfaSsrKSB7XG4gICAgICBpZiAodGhpcy5hdChfaSkgIT09IG90aGVycy5hdChfaSkpIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpc1NpbWlsYXIob3RoZXJzOiBWZWN0b3IgfCB1bmRlZmluZWQsIGVwc2lsb246IG51bWJlcikge1xuICAgIGlmIChvdGhlcnMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlcnMuc2l6ZSgpKSByZXR1cm4gZmFsc2VcblxuICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCB0aGlzLnNpemUoKTsgX2krKykge1xuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYXQoX2kpIC0gb3RoZXJzLmF0KF9pKSkgPiBlcHNpbG9uKSByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgYWRkKHBhcmFtcz86IGFueSkge1xuICAgIGxldCBfaSA9IDBcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCB2ID0gcGFyYW1zXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICs9IHYuZGF0YSgpW19pXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGxldCBzID0gcGFyYW1zXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICs9IHNcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld1ZcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuICB9XG5cbiAgc3ViKHBhcmFtcz86IGFueSkge1xuICAgIGxldCBfaSA9IDBcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCB2ID0gcGFyYW1zXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHYuZGF0YSgpW19pXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGxldCBzID0gcGFyYW1zXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC09IHNcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld1ZcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuICB9XG5cbiAgbXVsKHBhcmFtcz86IGFueSkge1xuICAgIGxldCBfaSA9IDBcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCB2ID0gcGFyYW1zXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHYuZGF0YSgpW19pXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGxldCBzID0gcGFyYW1zXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldICo9IHNcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld1ZcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuICB9XG5cbiAgZGl2KHBhcmFtcz86IGFueSkge1xuICAgIGxldCBfaSA9IDBcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCB2ID0gcGFyYW1zXG4gICAgICBpZiAodi5zaXplKCkgIT09IHRoaXMuc2l6ZSgpKSByZXR1cm4gbmV3IFZlY3RvcigxLCBbLTFdKVxuXG4gICAgICBsZXQgbmV3ViA9IG5ldyBWZWN0b3IodGhpcy5zaXplKCksIHRoaXMuZGF0YSgpKVxuICAgICAgZm9yIChfaSA9IDA7IF9pIDwgbmV3Vi5zaXplKCk7IF9pKyspIHtcbiAgICAgICAgbmV3Vi5kYXRhKClbX2ldIC89IHYuZGF0YSgpW19pXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGxldCBzID0gcGFyYW1zXG4gICAgICBpZiAocyA9PT0gMCkgcmV0dXJuIG5ldyBWZWN0b3IoMSwgWy0xXSlcbiAgICAgIGxldCBuZXdWID0gbmV3IFZlY3Rvcih0aGlzLnNpemUoKSwgdGhpcy5kYXRhKCkpXG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBuZXdWLnNpemUoKTsgX2krKykge1xuICAgICAgICBuZXdWLmRhdGEoKVtfaV0gLz0gc1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VlxuICAgIH1cblxuICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIFstMV0pXG4gIH1cblxuICBpZGl2KHBhcmFtcz86IGFueSkge1xuICAgIHRoaXMuc2V0KHRoaXMuZGl2KHBhcmFtcykpXG4gIH1cblxuICBpYWRkKHBhcmFtcz86IGFueSkge1xuICAgIHRoaXMuc2V0KHRoaXMuYWRkKHBhcmFtcykpXG4gIH1cblxuICBpc3ViKHBhcmFtcz86IGFueSkge1xuICAgIHRoaXMuc2V0KHRoaXMuc3ViKHBhcmFtcykpXG4gIH1cblxuICBpbXVsKHBhcmFtcz86IGFueSkge1xuICAgIHRoaXMuc2V0KHRoaXMubXVsKHBhcmFtcykpXG4gIH1cblxuICBzZXRBdChpZHg6IG51bWJlciwgdmFsOiBudW1iZXIpIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKCkpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICB0aGlzLl9lbGVtZW50c1tpZHhdID0gdmFsXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiBwcm9qX3UodikgPSA8dSx2Pi88dix2PiB1XG4gICAqIEBwYXJhbSB1XG4gICAqIEBwYXJhbSB2XG4gICAqL1xuICBzdGF0aWMgcHJvaih1OiBWZWN0b3IsIHY6IFZlY3Rvcikge1xuICAgIHJldHVybiB1Lm11bCh2LmRvdCh1KSAvIHUuZG90KHUpKVxuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuL3ZlY3RvcidcblxuZXhwb3J0IGNsYXNzIFZlY3RvcjMgZXh0ZW5kcyBWZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihlMTogbnVtYmVyLCBlMjogbnVtYmVyLCBlMzogbnVtYmVyKSB7XG4gICAgc3VwZXIoMywgbmV3IEFycmF5PG51bWJlcj4oZTEsIGUyLCBlMykpXG4gIH1cblxuICB4KCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEoKVswXVxuICB9XG4gIHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzFdXG4gIH1cbiAgeigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMl1cbiAgfVxuICByKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEoKVswXVxuICB9XG4gIGcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSgpWzFdXG4gIH1cbiAgYigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhKClbMl1cbiAgfVxuXG4gIGlzZXQodjM6IFZlY3RvcjMpIHtcbiAgICB0aGlzLmRhdGEoKVswXSA9IHYzLnIoKVxuICAgIHRoaXMuZGF0YSgpWzFdID0gdjMuZygpXG4gICAgdGhpcy5kYXRhKClbMl0gPSB2My5iKClcbiAgfVxuXG4gIHNldCh2MzogVmVjdG9yMykge1xuICAgIHJldHVybiBzdXBlci5zZXQobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxuICB9XG5cbiAgYWRkKHYzOiBhbnkpIHtcbiAgICBsZXQgYWRkdiA9IHN1cGVyLmFkZCh2MylcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoYWRkdi5kYXRhKClbMF0sIGFkZHYuZGF0YSgpWzFdLCBhZGR2LmRhdGEoKVsyXSlcbiAgfVxuXG4gIHN1Yih2MzogYW55KSB7XG4gICAgbGV0IHN1YnYgPSBzdXBlci5zdWIodjMpXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKHN1YnYuZGF0YSgpWzBdLCBzdWJ2LmRhdGEoKVsxXSwgc3Vidi5kYXRhKClbMl0pXG4gIH1cblxuICBtdWwodjM6IGFueSkge1xuICAgIGxldCBtdWx2ID0gc3VwZXIubXVsKHYzKVxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhtdWx2LmRhdGEoKVswXSwgbXVsdi5kYXRhKClbMV0sIG11bHYuZGF0YSgpWzJdKVxuICB9XG5cbiAgZGl2KHYzOiBhbnkpIHtcbiAgICBsZXQgZGl2diA9IHN1cGVyLmRpdih2MylcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoZGl2di5kYXRhKClbMF0sIGRpdnYuZGF0YSgpWzFdLCBkaXZ2LmRhdGEoKVsyXSlcbiAgfVxuXG4gIGRvdCh2MzogVmVjdG9yMykge1xuICAgIHJldHVybiBzdXBlci5kb3QobmV3IFZlY3RvcigzLCB2My5kYXRhKCkpKVxuICB9XG5cbiAgdW5pdFZlYzMoKTogVmVjdG9yMyB7XG4gICAgbGV0IG52ID0gbmV3IFZlY3RvcigzLCB0aGlzLmRhdGEoKSlcbiAgICBudi5ub3JtYWxpemUoKVxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhudi5kYXRhKClbMF0sIG52LmRhdGEoKVsxXSwgbnYuZGF0YSgpWzJdKVxuICB9XG5cbiAgZ2FtbWEyKCk6IFZlY3RvcjMge1xuICAgIGxldCB0diA9IG5ldyBWZWN0b3IoMywgdGhpcy5kYXRhKCkpXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKFxuICAgICAgTWF0aC5zcXJ0KHR2LmF0KDApKSxcbiAgICAgIE1hdGguc3FydCh0di5hdCgxKSksXG4gICAgICBNYXRoLnNxcnQodHYuYXQoMikpXG4gICAgKVxuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcblxuZXhwb3J0IGNsYXNzIENhbWVyYSB7XG4gIGxvd2VyTGVmdENvcm5lcjogVmVjdG9yM1xuICBob3Jpem9udGFsOiBWZWN0b3IzXG4gIHZlcnRpY2FsOiBWZWN0b3IzXG4gIG9yaWdpbjogVmVjdG9yM1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxvd2VyTGVmdENvcm5lciA9IG5ldyBWZWN0b3IzKC0yLCAtMSwgLTEpXG4gICAgdGhpcy5ob3Jpem9udGFsID0gbmV3IFZlY3RvcjMoNCwgMCwgMClcbiAgICB0aGlzLnZlcnRpY2FsID0gbmV3IFZlY3RvcjMoMCwgMiwgMClcbiAgICB0aGlzLm9yaWdpbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXG4gIH1cblxuICBnZXRSYXkodTogbnVtYmVyLCB2OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFJheShcbiAgICAgIHRoaXMub3JpZ2luLFxuICAgICAgdGhpcy5sb3dlckxlZnRDb3JuZXJcbiAgICAgICAgLmFkZCh0aGlzLmhvcml6b250YWwubXVsKHUpKVxuICAgICAgICAuYWRkKHRoaXMudmVydGljYWwubXVsKHYpKVxuICAgICAgICAuc3ViKHRoaXMub3JpZ2luKVxuICAgIClcbiAgfVxufVxuIiwiaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi9oaXRhYmxlJ1xuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXG5pbXBvcnQgeyBMYW1iZXJ0aWFuIH0gZnJvbSAnLi9sYW1iZXJ0aWFuJ1xuXG5leHBvcnQgY2xhc3MgSGl0YWJsZUxpc3QgZXh0ZW5kcyBIaXRhYmxlIHtcbiAgbGlzdDogQXJyYXk8SGl0YWJsZT5cbiAgbGlzdFNpemU6IG51bWJlclxuICBjb25zdHJ1Y3RvcihsOiBBcnJheTxIaXRhYmxlPiwgbjogbnVtYmVyKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMubGlzdCA9IGxcbiAgICB0aGlzLmxpc3RTaXplID0gblxuICB9XG5cbiAgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhbiB7XG4gICAgbGV0IHRtcFJlYyA9IG5ldyBIaXRSZWNvcmQoXG4gICAgICAwLFxuICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMCksXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcbiAgICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAsIDAsIDApKVxuICAgIClcbiAgICBsZXQgaGl0QW55dGhpbmcgPSBmYWxzZVxuICAgIGxldCBjbG9zZXN0U29GYXIgPSB0TWF4XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3RTaXplOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmxpc3RbaV0uaGl0KHIsIHRNaW4sIGNsb3Nlc3RTb0ZhciwgdG1wUmVjKSkge1xuICAgICAgICBoaXRBbnl0aGluZyA9IHRydWVcbiAgICAgICAgY2xvc2VzdFNvRmFyID0gdG1wUmVjLnRcbiAgICAgICAgcmVjLnQgPSB0bXBSZWMudFxuICAgICAgICByZWMucCA9IHRtcFJlYy5wXG4gICAgICAgIHJlYy5ub3JtYWwgPSB0bXBSZWMubm9ybWFsXG4gICAgICAgIHJlYy5tYXRlcmlhbCA9IHRtcFJlYy5tYXRlcmlhbFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaGl0QW55dGhpbmdcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJy4vbWF0ZXJpYWwnXG5cbmV4cG9ydCBjbGFzcyBIaXRSZWNvcmQge1xuICB0OiBudW1iZXJcbiAgcDogVmVjdG9yM1xuICBub3JtYWw6IFZlY3RvcjNcbiAgbWF0ZXJpYWw6IE1hdGVyaWFsXG5cbiAgY29uc3RydWN0b3IoX3Q6IG51bWJlciwgX3A6IFZlY3RvcjMsIF9ub3JtYWw6IFZlY3RvcjMsIF9tYXRlcmlhbDogTWF0ZXJpYWwpIHtcbiAgICB0aGlzLnQgPSBfdFxuICAgIHRoaXMucCA9IF9wXG4gICAgdGhpcy5ub3JtYWwgPSBfbm9ybWFsXG4gICAgdGhpcy5tYXRlcmlhbCA9IF9tYXRlcmlhbFxuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIaXRhYmxlIHtcbiAgYWJzdHJhY3QgaGl0KHI6IFJheSwgdE1pbjogbnVtYmVyLCB0TWF4OiBudW1iZXIsIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhblxufVxuIiwiaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWwnXG5cbmV4cG9ydCBjbGFzcyBMYW1iZXJ0aWFuIGV4dGVuZHMgTWF0ZXJpYWwge1xuICBhbGJlZG86IFZlY3RvcjNcbiAgc2NhdHRlcmVkOiBSYXlcbiAgYXR0ZW51YXRpb246IFZlY3RvcjNcblxuICBjb25zdHJ1Y3RvcihhOiBWZWN0b3IzKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuYWxiZWRvID0gYVxuICAgIHRoaXMuc2NhdHRlcmVkID0gbmV3IFJheShuZXcgVmVjdG9yMygwLCAwLCAwKSwgbmV3IFZlY3RvcjMoMCwgMCwgMCkpXG4gICAgdGhpcy5hdHRlbnVhdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXG4gIH1cblxuICBzY2F0dGVyKHI6IFJheSwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcbiAgICBsZXQgdGFyZ2V0ID0gcmVjLnAuYWRkKHJlYy5ub3JtYWwpLmFkZChVdGlscy5SYW5kb21JblVuaXRTcGhlcmUoKSlcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkocmVjLnAsIHRhcmdldC5zdWIocmVjLnApKVxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMyhcbiAgICAgIHRoaXMuYWxiZWRvLngoKSxcbiAgICAgIHRoaXMuYWxiZWRvLnkoKSxcbiAgICAgIHRoaXMuYWxiZWRvLnooKVxuICAgIClcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG4iLCJpbXBvcnQgeyBSYXkgfSBmcm9tICcuL3JheSdcbmltcG9ydCB7IEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdGVyaWFsIHtcbiAgYWJzdHJhY3Qgc2NhdHRlcmVkOiBSYXlcbiAgYWJzdHJhY3QgYXR0ZW51YXRpb246IFZlY3RvcjNcbiAgYWJzdHJhY3Qgc2NhdHRlcihyOiBSYXksIHJlYzogSGl0UmVjb3JkKTogYm9vbGVhblxufVxuIiwiaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi9yYXknXG5pbXBvcnQgeyBIaXRSZWNvcmQgfSBmcm9tICcuL2hpdGFibGUnXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWwnXG5cbmV4cG9ydCBjbGFzcyBNZXRhbCBleHRlbmRzIE1hdGVyaWFsIHtcbiAgYWxiZWRvOiBWZWN0b3IzXG4gIHNjYXR0ZXJlZDogUmF5XG4gIGF0dGVudWF0aW9uOiBWZWN0b3IzXG4gIGZ1eno6IG51bWJlclxuXG4gIGNvbnN0cnVjdG9yKGE6IFZlY3RvcjMsIGY6IG51bWJlcikge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmFsYmVkbyA9IGFcbiAgICB0aGlzLnNjYXR0ZXJlZCA9IG5ldyBSYXkobmV3IFZlY3RvcjMoMCwgMCwgMCksIG5ldyBWZWN0b3IzKDAsIDAsIDApKVxuICAgIHRoaXMuYXR0ZW51YXRpb24gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxuXG4gICAgaWYgKGYgPCAxKSB0aGlzLmZ1enogPSBmXG4gICAgZWxzZSB0aGlzLmZ1enogPSAxXG4gIH1cblxuICBzY2F0dGVyKHI6IFJheSwgcmVjOiBIaXRSZWNvcmQpOiBib29sZWFuIHtcbiAgICBsZXQgcmVmbGVjdGVkID0gVXRpbHMucmVmbGVjdChyLmRpcmVjdGlvbigpLnVuaXRWZWMzKCksIHJlYy5ub3JtYWwpXG4gICAgdGhpcy5zY2F0dGVyZWQgPSBuZXcgUmF5KFxuICAgICAgcmVjLnAsXG4gICAgICByZWZsZWN0ZWQuYWRkKFV0aWxzLlJhbmRvbUluVW5pdFNwaGVyZSgpLm11bCh0aGlzLmZ1enopKVxuICAgIClcbiAgICB0aGlzLmF0dGVudWF0aW9uID0gbmV3IFZlY3RvcjMoXG4gICAgICB0aGlzLmFsYmVkby54KCksXG4gICAgICB0aGlzLmFsYmVkby55KCksXG4gICAgICB0aGlzLmFsYmVkby56KClcbiAgICApXG4gICAgcmV0dXJuIHRoaXMuc2NhdHRlcmVkLmRpcmVjdGlvbigpLmRvdChyZWMubm9ybWFsKSA+IDBcbiAgfVxufVxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICpcbiAqICByYXkudHNcbiAqICByYXkgZnVuY3Rpb24gZm9yIHAodCkgPSBBICsgdCAqIEJcbiAqICBUOnR5cGUsZGVmYXVsdCBzZXR0aW5nIGlzIG51bWJlclxuICogIEQ6ZGltZW5zaW9uXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi4vZWdtYXRoL3ZlY3RvcjMnXG5cbmV4cG9ydCBjbGFzcyBSYXkge1xuICBwdWJsaWMgX0E6IFZlY3RvcjNcbiAgcHVibGljIF9COiBWZWN0b3IzXG5cbiAgY29uc3RydWN0b3IoYTogVmVjdG9yMywgYjogVmVjdG9yMykge1xuICAgIHRoaXMuX0EgPSBhXG4gICAgdGhpcy5fQiA9IGJcbiAgfVxuXG4gIG9yaWdpbigpIHtcbiAgICByZXR1cm4gdGhpcy5fQVxuICB9XG4gIGRpcmVjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fQlxuICB9XG4gIHBvaW50QXRQYXJhbSh0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fQS5hZGQodGhpcy5fQi5tdWwodCkpXG4gIH1cbn1cbiIsImltcG9ydCB7IEhpdGFibGUsIEhpdFJlY29yZCB9IGZyb20gJy4vaGl0YWJsZSdcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9lZ21hdGgvdmVjdG9yMydcbmltcG9ydCB7IFJheSB9IGZyb20gJy4vcmF5J1xuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICcuL21hdGVyaWFsJ1xuXG5leHBvcnQgY2xhc3MgU3BoZXJlIGV4dGVuZHMgSGl0YWJsZSB7XG4gIGNlbnRlcjogVmVjdG9yM1xuICByYWRpdXM6IG51bWJlclxuICBtYXRlcmlhbDogTWF0ZXJpYWxcblxuICBjb25zdHJ1Y3RvcihjZW46IFZlY3RvcjMsIHI6IG51bWJlciwgbWF0OiBNYXRlcmlhbCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmNlbnRlciA9IGNlblxuICAgIHRoaXMucmFkaXVzID0gclxuICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRcbiAgfVxuXG4gIGhpdChyOiBSYXksIHRNaW46IG51bWJlciwgdE1heDogbnVtYmVyLCByZWM6IEhpdFJlY29yZCk6IGJvb2xlYW4ge1xuICAgIGxldCBvYyA9IHIub3JpZ2luKCkuc3ViKHRoaXMuY2VudGVyKVxuICAgIGxldCBhID0gci5kaXJlY3Rpb24oKS5kb3Qoci5kaXJlY3Rpb24oKSlcbiAgICBsZXQgYiA9IG9jLmRvdChyLmRpcmVjdGlvbigpKVxuICAgIGxldCBjID0gb2MuZG90KG9jKSAtIHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXNcbiAgICBsZXQgZGlzY3JpbWluYW50ID0gYiAqIGIgLSBhICogY1xuICAgIGlmIChkaXNjcmltaW5hbnQgPiAwKSB7XG4gICAgICBsZXQgdG1wID0gKC1iIC0gTWF0aC5zcXJ0KGIgKiBiIC0gYSAqIGMpKSAvIGFcbiAgICAgIGlmICh0bXAgPCB0TWF4ICYmIHRtcCA+IHRNaW4pIHtcbiAgICAgICAgcmVjLnQgPSB0bXBcbiAgICAgICAgcmVjLnAgPSByLnBvaW50QXRQYXJhbShyZWMudClcbiAgICAgICAgcmVjLm5vcm1hbCA9IHJlYy5wLnN1Yih0aGlzLmNlbnRlcikuZGl2KHRoaXMucmFkaXVzKVxuICAgICAgICByZWMubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIHRtcCA9ICgtYiArIE1hdGguc3FydChiICogYiAtIGEgKiBjKSkgLyBhXG4gICAgICBpZiAodG1wIDwgdE1heCAmJiB0bXAgPiB0TWluKSB7XG4gICAgICAgIHJlYy50ID0gdG1wXG4gICAgICAgIHJlYy5wID0gci5wb2ludEF0UGFyYW0ocmVjLnQpXG4gICAgICAgIHJlYy5ub3JtYWwgPSByZWMucC5zdWIodGhpcy5jZW50ZXIpLmRpdih0aGlzLnJhZGl1cylcbiAgICAgICAgcmVjLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbFxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4vZWdtYXRoL3ZlY3RvcjMnXG5cbmV4cG9ydCBuYW1lc3BhY2UgVXRpbHMge1xuICBleHBvcnQgZnVuY3Rpb24gUmFuZG9tSW5Vbml0U3BoZXJlKCkge1xuICAgIGxldCBwID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcbiAgICBkbyB7XG4gICAgICBwID0gbmV3IFZlY3RvcjMoTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSlcbiAgICAgICAgLm11bCgyKVxuICAgICAgICAuc3ViKG5ldyBWZWN0b3IzKDEsIDEsIDEpKVxuICAgIH0gd2hpbGUgKHAubGVuZ3RoU3F1YXJlZCgpID49IDEuMClcbiAgICByZXR1cm4gcFxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZmxlY3QodjogVmVjdG9yMywgbjogVmVjdG9yMykge1xuICAgIHJldHVybiB2LnN1YihuLm11bCgyICogdi5kb3QobikpKVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHNjaGxpY2soY29zaW5lOiBudW1iZXIsIHJlZklkeDogbnVtYmVyKSB7XG4gICAgbGV0IHIwID0gKDEgLSByZWZJZHgpIC8gKDEgKyByZWZJZHgpXG4gICAgcjAgPSByMCAqIHIwXG4gICAgcmV0dXJuIHIwICsgKDEgLSByMCkgKiBNYXRoLnBvdygxIC0gY29zaW5lLCA1KVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZnJhY3QoXG4gICAgdjogVmVjdG9yMyxcbiAgICBuOiBWZWN0b3IzLFxuICAgIG5pT3Zlck50OiBudW1iZXIsXG4gICAgcmVmcmFjdGVkOiBWZWN0b3IzXG4gICkge1xuICAgIGxldCB1diA9IHYudW5pdFZlYzMoKVxuICAgIGxldCBkdCA9IHV2LmRvdChuKVxuICAgIGxldCBkaXNjcmltaW5hbnQgPSAxLjAgLSBuaU92ZXJOdCAqIG5pT3Zlck50ICogKDEgLSBkdCAqIGR0KVxuICAgIGlmIChkaXNjcmltaW5hbnQgPiAwKSB7XG4gICAgICByZWZyYWN0ZWQuc2V0KFxuICAgICAgICB1dlxuICAgICAgICAgIC5zdWIobi5tdWwoZHQpKVxuICAgICAgICAgIC5tdWwobmlPdmVyTnQpXG4gICAgICAgICAgLnN1YihuLm11bChNYXRoLnNxcnQoZGlzY3JpbWluYW50KSkpXG4gICAgICApXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gUmFuZG9tKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4ICsgMSAtIG1pbikpICsgbWluXG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gV3JpdGUyQ2FudmFzKFxuICAgIGNvbnRleHQ6IGFueSxcbiAgICBpbWFnZUJ1ZjogQXJyYXk8bnVtYmVyPixcbiAgICB3OiBudW1iZXIsXG4gICAgaDogbnVtYmVyXG4gICkge1xuICAgIGxldCBjYW52YXNJbWFnZSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHcsIGgpXG4gICAgbGV0IGRhdGEgPSBjYW52YXNJbWFnZS5kYXRhXG4gICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZGF0YS5sZW5ndGg7IGlkeCArPSA0KSB7XG4gICAgICBkYXRhW2lkeCArIDBdID0gaW1hZ2VCdWZbaWR4ICsgMF1cbiAgICAgIGRhdGFbaWR4ICsgMV0gPSBpbWFnZUJ1ZltpZHggKyAxXVxuICAgICAgZGF0YVtpZHggKyAyXSA9IGltYWdlQnVmW2lkeCArIDJdXG4gICAgICBkYXRhW2lkeCArIDNdID0gaW1hZ2VCdWZbaWR4ICsgM11cbiAgICB9XG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEoY2FudmFzSW1hZ2UsIDAsIDApXG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gR2VuZXJhdGVOb2lzZShcbiAgICBpbWFnZUJ1ZmZlcjogQXJyYXk8bnVtYmVyPixcbiAgICBzdGFydElkeDogbnVtYmVyLFxuICAgIGVuZElkeDogbnVtYmVyXG4gICkge1xuICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJZHg7IGluZGV4IDwgZW5kSWR4OyBpbmRleCArPSA0KSB7XG4gICAgICBsZXQgciA9IFJhbmRvbSgwLCAyNTUpXG4gICAgICBsZXQgZyA9IFJhbmRvbSgwLCAyNTUpXG4gICAgICBsZXQgYiA9IFJhbmRvbSgwLCAyNTUpXG5cbiAgICAgIGltYWdlQnVmZmVyW2luZGV4XSA9IHJcbiAgICAgIGltYWdlQnVmZmVyW2luZGV4ICsgMV0gPSBnXG4gICAgICBpbWFnZUJ1ZmZlcltpbmRleCArIDJdID0gYlxuICAgICAgaW1hZ2VCdWZmZXJbaW5kZXggKyAzXSA9IDI1NVxuICAgIH1cbiAgICByZXR1cm4gaW1hZ2VCdWZmZXJcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4uL2VnbWF0aC92ZWN0b3IzJ1xuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi4vZWdyZW5kZXIvcmF5J1xuaW1wb3J0IHsgSGl0YWJsZSwgSGl0UmVjb3JkIH0gZnJvbSAnLi4vZWdyZW5kZXIvaGl0YWJsZSdcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gJy4uL2VncmVuZGVyL2NhbWVyYSdcbmltcG9ydCB7IFNwaGVyZSB9IGZyb20gJy4uL2VncmVuZGVyL3NwaGVyZSdcbmltcG9ydCB7IEhpdGFibGVMaXN0IH0gZnJvbSAnLi4vZWdyZW5kZXIvaGl0YWJsZS1saXN0J1xuaW1wb3J0IHsgTGFtYmVydGlhbiB9IGZyb20gJy4uL2VncmVuZGVyL2xhbWJlcnRpYW4nXG5pbXBvcnQgeyBNZXRhbCB9IGZyb20gJy4uL2VncmVuZGVyL21ldGFsJ1xuXG5jb25zdCBjdHg6IFdvcmtlciA9IHNlbGYgYXMgYW55XG5cbmZ1bmN0aW9uIENvbG9yKHI6IFJheSwgd29ybGQ6IEhpdGFibGUsIGRlcHRoOiBudW1iZXIpOiBWZWN0b3IzIHtcbiAgbGV0IGNvbCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApXG5cbiAgbGV0IGF0dGVudWF0aW9uU3VtID0gbmV3IFZlY3RvcjMoMSwgMSwgMSlcbiAgZm9yIChsZXQgbiA9IDA7IG4gPCBOdW1iZXIuTUFYX1ZBTFVFOyBuKyspIHtcbiAgICBsZXQgcmVjID0gbmV3IEhpdFJlY29yZChcbiAgICAgIDAsXG4gICAgICBuZXcgVmVjdG9yMygwLCAwLCAwKSxcbiAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDApLFxuICAgICAgbmV3IExhbWJlcnRpYW4obmV3IFZlY3RvcjMoMCwgMCwgMCkpXG4gICAgKVxuICAgIGxldCBiSGl0ID0gd29ybGQuaGl0KHIsIDAuMDAxLCBOdW1iZXIuTUFYX1ZBTFVFLCByZWMpXG4gICAgaWYgKCFiSGl0KSB7XG4gICAgICBicmVha1xuICAgIH1cbiAgICBsZXQgYlNjYXR0ZXIgPSByZWMubWF0ZXJpYWwuc2NhdHRlcihyLCByZWMpXG4gICAgbGV0IHNjYXR0ZXJlZCA9IHJlYy5tYXRlcmlhbC5zY2F0dGVyZWRcbiAgICBsZXQgYXR0ZW51YXRpb24gPSByZWMubWF0ZXJpYWwuYXR0ZW51YXRpb25cbiAgICBpZiAoYlNjYXR0ZXIgJiYgZGVwdGggPCA1MCkge1xuICAgICAgZGVwdGgrK1xuICAgICAgciA9IHNjYXR0ZXJlZFxuICAgICAgYXR0ZW51YXRpb25TdW0uaW11bChhdHRlbnVhdGlvbilcbiAgICB9IGVsc2Uge1xuICAgICAgYXR0ZW51YXRpb25TdW0gPSBuZXcgVmVjdG9yMygwLCAwLCAwKVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBsZXQgdW5pdERpciA9IHIuZGlyZWN0aW9uKCkudW5pdFZlYzMoKVxuICBsZXQgdCA9IDAuNSAqICh1bml0RGlyLnkoKSArIDEuMClcbiAgY29sID0gbmV3IFZlY3RvcjMoMS4wLCAxLjAsIDEuMClcbiAgICAubXVsKDEuMCAtIHQpXG4gICAgLmFkZChuZXcgVmVjdG9yMygwLjUsIDAuNywgMS4wKS5tdWwodCkpXG4gIGNvbC5pbXVsKGF0dGVudWF0aW9uU3VtKVxuXG4gIHJldHVybiBjb2xcbn1cblxuY3R4Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgbGV0IHBhcmFtID0gbWVzc2FnZS5kYXRhXG4gIGxldCBpZCA9IHBhcmFtLmlkXG4gIGxldCBzdGFydCA9IHBhcmFtLnN0YXJ0XG4gIGxldCBlbmQgPSBwYXJhbS5lbmRcbiAgbGV0IGVuZE1heCA9IHBhcmFtLmVuZE1heFxuXG4gIGxldCBueCA9IHBhcmFtLndpZHRoXG4gIGxldCBueSA9IHBhcmFtLmhlaWdodFxuICBsZXQgbnMgPSBwYXJhbS5zYW1wbGluZ051bVxuXG4gIC8vIHByb2Nlc3MgZW5kXG4gIGlmIChlbmQgPiBlbmRNYXgpIHtcbiAgICBlbmQgPSBlbmRNYXhcbiAgfVxuXG4gIC8vIG9iamVjdFxuICBsZXQgY2FtID0gbmV3IENhbWVyYSgpXG4gIGxldCBsaXN0ID0gbmV3IEFycmF5PEhpdGFibGU+KDQpXG4gIGxpc3RbMF0gPSBuZXcgU3BoZXJlKFxuICAgIG5ldyBWZWN0b3IzKDAsIDAsIC0xKSxcbiAgICAwLjUsXG4gICAgbmV3IExhbWJlcnRpYW4obmV3IFZlY3RvcjMoMC44LCAwLjMsIDAuMykpXG4gIClcbiAgbGlzdFsxXSA9IG5ldyBTcGhlcmUoXG4gICAgbmV3IFZlY3RvcjMoMCwgLTEwMC41LCAtMSksXG4gICAgMTAwLFxuICAgIG5ldyBMYW1iZXJ0aWFuKG5ldyBWZWN0b3IzKDAuOCwgMC44LCAwLjApKVxuICApXG4gIGxpc3RbMl0gPSBuZXcgU3BoZXJlKFxuICAgIG5ldyBWZWN0b3IzKDEsIDAsIC0xKSxcbiAgICAwLjUsXG4gICAgbmV3IE1ldGFsKG5ldyBWZWN0b3IzKDAuOCwgMC42LCAwLjIpLCAxLjApXG4gIClcbiAgbGlzdFszXSA9IG5ldyBTcGhlcmUoXG4gICAgbmV3IFZlY3RvcjMoLTEsIDAsIC0xKSxcbiAgICAwLjUsXG4gICAgbmV3IE1ldGFsKG5ldyBWZWN0b3IzKDAuOCwgMC44LCAwLjgpLCAwLjMpXG4gIClcblxuICBsZXQgd29ybGQgPSBuZXcgSGl0YWJsZUxpc3QobGlzdCwgNClcblxuICBsZXQgY29sQXJyYXkgPSBuZXcgQXJyYXk8TnVtYmVyPigpXG5cbiAgZm9yIChsZXQgaiA9IHN0YXJ0OyBqIDw9IGVuZDsgaisrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBueDsgaSsrKSB7XG4gICAgICBsZXQgY29sID0gbmV3IFZlY3RvcjMoMCwgMCwgMClcbiAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgbnM7IHMrKykge1xuICAgICAgICBsZXQgdSA9IChpICsgTWF0aC5yYW5kb20oKSkgLyBueFxuICAgICAgICBsZXQgdiA9IChueSAtIDEgLSAoaiArIE1hdGgucmFuZG9tKCkpKSAvIG55XG4gICAgICAgIGxldCByID0gY2FtLmdldFJheSh1LCB2KVxuICAgICAgICBjb2wuaWFkZChDb2xvcihyLCB3b3JsZCwgMCkpXG4gICAgICB9XG4gICAgICBjb2wuaWRpdihucylcbiAgICAgIGNvbCA9IGNvbC5nYW1tYTIoKVxuXG4gICAgICBjb2xBcnJheS5wdXNoKE1hdGguZmxvb3IoMjU1Ljk5ICogY29sLnIoKSkpXG4gICAgICBjb2xBcnJheS5wdXNoKE1hdGguZmxvb3IoMjU1Ljk5ICogY29sLmcoKSkpXG4gICAgICBjb2xBcnJheS5wdXNoKE1hdGguZmxvb3IoMjU1Ljk5ICogY29sLmIoKSkpXG4gICAgICBjb2xBcnJheS5wdXNoKDI1NSlcbiAgICB9XG4gIH1cblxuICBjdHgucG9zdE1lc3NhZ2Uoe1xuICAgIGNvbDogY29sQXJyYXksXG4gICAgc3RhcnRWYWw6IHN0YXJ0LFxuICAgIGVuZFZhbDogZW5kLFxuICAgIGlkOiBpZCxcbiAgICBlbmRNYXhWYWw6IGVuZE1heFxuICB9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==