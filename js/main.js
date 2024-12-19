/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AppManager.js":
/*!***************************!*\
  !*** ./src/AppManager.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/zip.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/internal/operators/reduce.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/internal/operators/find.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/internal/operators/take.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var AppManager = {
  getParameter: function getParameter(url, param) {
    var returnValue;
    var parameters = url.slice(url.indexOf("?") + 1, url.length).split("&");

    var _iterator = _createForOfIteratorHelper(parameters),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var parameter = _step.value;
        var varName = parameter.split("=")[0];

        if (varName.toUpperCase() == param.toUpperCase()) {
          returnValue = parameter.split("=")[1];
          return decodeURIComponent(returnValue);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  createAppItem: function createAppItem(app) {
    var item = document.createElement("div");
    item.className = "mdl-cell mdl-card mdl-shadow--4dp portfolio-card";
    item.innerHTML = "\n      <div class=\"mdl-card__media\">\n        <img class=\"article-image\" src=\"".concat(app === null || app === void 0 ? void 0 : app.indexImageUrl, "\" border=\"0\" alt=\"\">\n      </div>\n      <div class=\"mdl-card__title\">\n        <h2 class=\"mdl-card__title-text\">").concat(app === null || app === void 0 ? void 0 : app.name, "</h2>\n      </div>\n      <div class=\"mdl-card__supporting-text\">").concat(app === null || app === void 0 ? void 0 : app.summary, "</div>\n      <div class=\"mdl-card__actions mdl-card--border\">\n        <a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent\"\n          href=\"index.html?id=").concat(app === null || app === void 0 ? void 0 : app.id, "\">Read more</a>\n      </div>\n    ");
    return item;
  },
  createAppDetail$: function createAppDetail$(app) {
    var downloadHtml$ = AppManager.createDownloadHtml$(app === null || app === void 0 ? void 0 : app.downloads).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.reduce)(function (acc, curr) {
      return acc + curr;
    }, ""));
    var screenshotHtml$ = AppManager.createScreenshotHtml$(app === null || app === void 0 ? void 0 : app.screenshots).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.reduce)(function (acc, curr) {
      return acc + curr;
    }, ""));
    var historyHtml$ = AppManager.createHistoryHtml$(app === null || app === void 0 ? void 0 : app.histories).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.reduce)(function (acc, curr) {
      return acc + curr;
    }, ""));
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.zip)(downloadHtml$, screenshotHtml$, historyHtml$).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
          downloadHtml = _ref2[0],
          screenshotHtml = _ref2[1],
          historyHtml = _ref2[2];

      return "\n          <div class=\"mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp\">\n            <!-- App Information -->\n            <div class=\"mdl-grid portfolio-copy\">\n              <div class=\"mdl-cell mdl-cell--4-col mdl-cell--2-col-phone\">\n                <img class=\"article-image\" style=\"border-radius:20px; width: 100px; height: auto;\" src=\"".concat(app === null || app === void 0 ? void 0 : app.iconUrl, "\" border=\"0\" alt=\"\">\n              </div>\n              <div class=\"mdl-cell mdl-cell--8-col mdl-cell--2-col-phone\">\n                <h2 class=\"mdl-card__title-text\">").concat(app === null || app === void 0 ? void 0 : app.name, "</h2>\n                <p>").concat(app === null || app === void 0 ? void 0 : app.summary, "</p>\n              </div>\n              <div class=\"mdl-cell mdl-cell--12-col\">\n                ").concat(downloadHtml, "\n              </div>\n              <!-- Screenshot -->\n              <h3 class=\"mdl-cell mdl-cell--12-col mdl-typography--headline\">Screenshot</h3>\n              ").concat(screenshotHtml, "\n              <!-- Description -->\n              <h3 class=\"mdl-cell mdl-cell--12-col mdl-typography--headline\">Description</h3>\n              <div class=\"mdl-cell mdl-cell--12-col mdl-card__supporting-text no-padding\">\n                <p>").concat(app === null || app === void 0 ? void 0 : app.description, "</p>\n              </div>\n              <!-- What&#039;s new -->\n              <h3 class=\"mdl-cell mdl-cell--12-col mdl-typography--headline\">What&#039;s new</h3>\n              <div class=\"mdl-cell mdl-cell--12-col mdl-card__supporting-text no-padding\">\n                <!-- Information -->\n                ").concat(historyHtml, "\n              </div>\n            </div>\n          </div>");
    }));
  },
  createDownloadHtml$: function createDownloadHtml$(downloads) {
    var currentPlatform;

    if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent) || /Macintosh/i.test(window.navigator.userAgent) && navigator.maxTouchPoints === 5) {
      currentPlatform = "IOS";
    } else if (/Android/i.test(window.navigator.userAgent)) {
      currentPlatform = "ANDROID";
    } else if (/Windows/i.test(window.navigator.userAgent)) {
      currentPlatform = "WINDOWS";
    } else {
      currentPlatform = "Unkown";
    }

    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.from)(downloads).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.find)(function (download) {
      return (download === null || download === void 0 ? void 0 : download.platform.toUpperCase()) === currentPlatform.toUpperCase();
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (download) {
      var attr = download ? "href=\"".concat(download === null || download === void 0 ? void 0 : download.url, "\"") : "disabled=\"disabled\"";
      var text = download ? "Install" : "Not available";
      return "\n            <a class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent\"\n              style=\"float: right;\" ".concat(attr, ">\n              ").concat(text, "\n            </a>");
    }));
  },
  createScreenshotHtml$: function createScreenshotHtml$(screenshots) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.from)(screenshots).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (screenshot) {
      var _screenshot$orientati;

      var orientation = (_screenshot$orientati = screenshot === null || screenshot === void 0 ? void 0 : screenshot.orientation) !== null && _screenshot$orientati !== void 0 ? _screenshot$orientati : "portrait";
      return "\n          <div class=\"mdl-cell ".concat(orientation === "landscape" ? "mdl-cell--6-col" : "mdl-cell--3-col", " mdl-cell--1-col-phone\">\n            <img class=\"article-image\" src=\"").concat(screenshot === null || screenshot === void 0 ? void 0 : screenshot.url, "\" border=\"0\" alt=\"").concat(screenshot === null || screenshot === void 0 ? void 0 : screenshot.alt, "\">\n          </div>");
    }));
  },
  createHistoryHtml$: function createHistoryHtml$(histories) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.from)(histories).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (history) {
      return "<p><b>".concat(history.version, "</b><br/>").concat(history.description, "</p>");
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(3));
  }
};
/* harmony default export */ __webpack_exports__["default"] = (AppManager);

/***/ }),

/***/ "./src/Environment.js":
/*!****************************!*\
  !*** ./src/Environment.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FaviconLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FaviconLoader */ "./src/FaviconLoader.js");


function setFavicon() {
  var url = "./images/favicon-bestcare.png?220311";

  if (url) {
    (0,_FaviconLoader__WEBPACK_IMPORTED_MODULE_0__["default"])("./images/favicon-bestcare.png?220311");
  }
}

function setTitleLogo() {
  var logoClassName = "";

  if (logoClassName) {
    document.getElementById("title-logo").classList.add(logoClassName);
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  setUp: function setUp() {
    setFavicon();
    setTitleLogo();
  }
});

/***/ }),

/***/ "./src/FaviconLoader.js":
/*!******************************!*\
  !*** ./src/FaviconLoader.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function FaviconLoader(url) {
  // Get HTML head element
  var head = document.getElementsByTagName("head")[0]; // Create new link Element

  var link = document.createElement("link"); // set the attributes for link element

  link.rel = "shortcut icon";
  link.type = "image/x-png";
  link.href = url; // Append link element to HTML head

  head.appendChild(link);
}

/* harmony default export */ __webpack_exports__["default"] = (FaviconLoader);

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var material_design_lite_dist_material_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! material-design-lite/dist/material.min */ "./node_modules/material-design-lite/dist/material.min.js");
/* harmony import */ var material_design_lite_dist_material_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(material_design_lite_dist_material_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var material_design_lite_dist_material_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! material-design-lite/dist/material.min.css */ "./node_modules/material-design-lite/dist/material.min.css");
/* harmony import */ var material_design_lite_dist_material_grey_pink_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! material-design-lite/dist/material.grey-pink.min.css */ "./node_modules/material-design-lite/dist/material.grey-pink.min.css");
/* harmony import */ var _css_font_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./css/font.css */ "./src/css/font.css");
/* harmony import */ var _css_icon_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./css/icon.css */ "./src/css/icon.css");
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./css/styles.css */ "./src/css/styles.css");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/of.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/internal/operators/filter.js");
/* harmony import */ var _Environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Environment */ "./src/Environment.js");
/* harmony import */ var _AppManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AppManager */ "./src/AppManager.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











(0,rxjs__WEBPACK_IMPORTED_MODULE_8__.fromEvent)(document, "DOMContentLoaded").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.withLatestFrom)((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)("./assets/apps.json?220311")), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(function (x) {
  return x.slice(-1)[0];
}), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.mergeMap)(function (url) {
  return fetch(url).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)({
        error: true,
        message: "Error ".concat(response.status)
      });
    }
  })["catch"](function (err) {
    console.error(err);
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)({
      error: true,
      message: err.message
    });
  });
})).subscribe(function (result) {
  var _location;

  _Environment__WEBPACK_IMPORTED_MODULE_6__["default"].setUp(); // JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')

  var list = [];

  if ((result === null || result === void 0 ? void 0 : result.apps) === null) {
    list = [];
  } else if ((result === null || result === void 0 ? void 0 : result.apps) instanceof Array) {
    list = result === null || result === void 0 ? void 0 : result.apps;
  } else {
    list = [result === null || result === void 0 ? void 0 : result.apps];
  }

  var apps$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.from)(list).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.filter)(function (app) {
    return app === null || app === void 0 ? void 0 : app.isUse;
  }));
  var appId = _AppManager__WEBPACK_IMPORTED_MODULE_7__["default"].getParameter((_location = location) === null || _location === void 0 ? void 0 : _location.href, "id");

  if (appId) {
    apps$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.filter)(function (app) {
      return (app === null || app === void 0 ? void 0 : app.id) === appId;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.mergeMap)(function (app) {
      return _AppManager__WEBPACK_IMPORTED_MODULE_7__["default"].createAppDetail$(app);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.withLatestFrom)((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)(document.getElementById("app_detail")))).subscribe(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          html = _ref2[0],
          detail = _ref2[1];

      detail.innerHTML = html;
    });
  } else {
    apps$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(_AppManager__WEBPACK_IMPORTED_MODULE_7__["default"].createAppItem), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.withLatestFrom)((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)(document.getElementById("app_detail")))).subscribe(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          item = _ref4[0],
          detail = _ref4[1];

      detail.appendChild(item);
    });
  }

  var config = result === null || result === void 0 ? void 0 : result.environment;
  document.title = document.title + (config ? " (".concat(config, ")") : "");
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/font.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/font.css ***!
  \****************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _font_2tsd397wLxj96qwHyNIkxPesZW2xOQ_xsNqO47m55DA_woff2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../font/2tsd397wLxj96qwHyNIkxPesZW2xOQ-xsNqO47m55DA.woff2 */ "./src/font/2tsd397wLxj96qwHyNIkxPesZW2xOQ-xsNqO47m55DA.woff2");
/* harmony import */ var _font_Hgo13k_tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw_woff2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../font/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2 */ "./src/font/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2");
/* harmony import */ var _font_CWB0XYA8bzo0kSThX0UTuA_woff2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../font/CWB0XYA8bzo0kSThX0UTuA.woff2 */ "./src/font/CWB0XYA8bzo0kSThX0UTuA.woff2");
/* harmony import */ var _font_RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw_woff2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../font/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2 */ "./src/font/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2");
/* harmony import */ var _font_d_6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw_woff2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../font/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2 */ "./src/font/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2");
/* harmony import */ var _font_mnpfi9pxYH_Go5UiibESIltXRa8TVwTICgirnJhmVJw_woff2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../font/mnpfi9pxYH-Go5UiibESIltXRa8TVwTICgirnJhmVJw.woff2 */ "./src/font/mnpfi9pxYH-Go5UiibESIltXRa8TVwTICgirnJhmVJw.woff2");
/* harmony import */ var _font_vPcynSL0qHq_6dX7lKVByfesZW2xOQ_xsNqO47m55DA_woff2__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../font/vPcynSL0qHq_6dX7lKVByfesZW2xOQ-xsNqO47m55DA.woff2 */ "./src/font/vPcynSL0qHq_6dX7lKVByfesZW2xOQ-xsNqO47m55DA.woff2");
/* harmony import */ var _font_t6Nd4cfPRhZP44Q5QAjcC44P5ICox8Kq3LLUNMylGO4_woff2__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../font/t6Nd4cfPRhZP44Q5QAjcC44P5ICox8Kq3LLUNMylGO4.woff2 */ "./src/font/t6Nd4cfPRhZP44Q5QAjcC44P5ICox8Kq3LLUNMylGO4.woff2");
// Imports











var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_font_2tsd397wLxj96qwHyNIkxPesZW2xOQ_xsNqO47m55DA_woff2__WEBPACK_IMPORTED_MODULE_3__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_font_Hgo13k_tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw_woff2__WEBPACK_IMPORTED_MODULE_4__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_font_CWB0XYA8bzo0kSThX0UTuA_woff2__WEBPACK_IMPORTED_MODULE_5__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_font_RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw_woff2__WEBPACK_IMPORTED_MODULE_6__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_font_d_6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw_woff2__WEBPACK_IMPORTED_MODULE_7__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_font_mnpfi9pxYH_Go5UiibESIltXRa8TVwTICgirnJhmVJw_woff2__WEBPACK_IMPORTED_MODULE_8__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_font_vPcynSL0qHq_6dX7lKVByfesZW2xOQ_xsNqO47m55DA_woff2__WEBPACK_IMPORTED_MODULE_9__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_font_t6Nd4cfPRhZP44Q5QAjcC44P5ICox8Kq3LLUNMylGO4_woff2__WEBPACK_IMPORTED_MODULE_10__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: normal;\r\n  font-weight: 100;\r\n  src: local(\"Roboto Thin\"), local(\"Roboto-Thin\"),\r\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ")\r\n      format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  src: local(\"Roboto Light\"), local(\"Roboto-Light\"),\r\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ")\r\n      format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  src: local(\"Roboto\"), local(\"Roboto-Regular\"),\r\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: normal;\r\n  font-weight: 500;\r\n  src: local(\"Roboto Medium\"), local(\"Roboto-Medium\"),\r\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ")\r\n      format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: normal;\r\n  font-weight: 700;\r\n  src: local(\"Roboto Bold\"), local(\"Roboto-Bold\"),\r\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ")\r\n      format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: normal;\r\n  font-weight: 900;\r\n  src: local(\"Roboto Black\"), local(\"Roboto-Black\"),\r\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ")\r\n      format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: italic;\r\n  font-weight: 400;\r\n  src: local(\"Roboto Italic\"), local(\"Roboto-Italic\"),\r\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ")\r\n      format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: italic;\r\n  font-weight: 700;\r\n  src: local(\"Roboto Bold Italic\"), local(\"Roboto-BoldItalic\"),\r\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ")\r\n      format(\"woff2\");\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/font.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB;;qBAEmB;AACrB;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB;;qBAEmB;AACrB;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB;2DAC2D;AAC7D;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB;;qBAEmB;AACrB;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB;;qBAEmB;AACrB;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB;;qBAEmB;AACrB;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB;;qBAEmB;AACrB;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB;;qBAEmB;AACrB","sourcesContent":["@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: normal;\r\n  font-weight: 100;\r\n  src: local(\"Roboto Thin\"), local(\"Roboto-Thin\"),\r\n    url(../font/2tsd397wLxj96qwHyNIkxPesZW2xOQ-xsNqO47m55DA.woff2)\r\n      format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: normal;\r\n  font-weight: 300;\r\n  src: local(\"Roboto Light\"), local(\"Roboto-Light\"),\r\n    url(../font/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2)\r\n      format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  src: local(\"Roboto\"), local(\"Roboto-Regular\"),\r\n    url(../font/CWB0XYA8bzo0kSThX0UTuA.woff2) format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: normal;\r\n  font-weight: 500;\r\n  src: local(\"Roboto Medium\"), local(\"Roboto-Medium\"),\r\n    url(../font/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2)\r\n      format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: normal;\r\n  font-weight: 700;\r\n  src: local(\"Roboto Bold\"), local(\"Roboto-Bold\"),\r\n    url(../font/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2)\r\n      format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: normal;\r\n  font-weight: 900;\r\n  src: local(\"Roboto Black\"), local(\"Roboto-Black\"),\r\n    url(../font/mnpfi9pxYH-Go5UiibESIltXRa8TVwTICgirnJhmVJw.woff2)\r\n      format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: italic;\r\n  font-weight: 400;\r\n  src: local(\"Roboto Italic\"), local(\"Roboto-Italic\"),\r\n    url(../font/vPcynSL0qHq_6dX7lKVByfesZW2xOQ-xsNqO47m55DA.woff2)\r\n      format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"Roboto\";\r\n  font-style: italic;\r\n  font-weight: 700;\r\n  src: local(\"Roboto Bold Italic\"), local(\"Roboto-BoldItalic\"),\r\n    url(../font/t6Nd4cfPRhZP44Q5QAjcC44P5ICox8Kq3LLUNMylGO4.woff2)\r\n      format(\"woff2\");\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/icon.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/icon.css ***!
  \****************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _font_2fcrYFNaTjcS6g4U3t_Y5ZjZjT5FdEJ140U2DJYC3mY_woff2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../font/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2 */ "./src/font/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_font_2fcrYFNaTjcS6g4U3t_Y5ZjZjT5FdEJ140U2DJYC3mY_woff2__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\r\n  font-family: \"Material Icons\";\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  src: local(\"Material Icons\"), local(\"MaterialIcons-Regular\"),\r\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ")\r\n      format(\"woff2\");\r\n}\r\n\r\n.material-icons {\r\n  font-family: \"Material Icons\";\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-size: 24px;\r\n  line-height: 1;\r\n  letter-spacing: normal;\r\n  text-transform: none;\r\n  display: inline-block;\r\n  white-space: nowrap;\r\n  word-wrap: normal;\r\n  direction: ltr;\r\n  font-feature-settings: \"liga\";\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/icon.css"],"names":[],"mappings":"AAAA;EACE,6BAA6B;EAC7B,kBAAkB;EAClB,gBAAgB;EAChB;;qBAEmB;AACrB;;AAEA;EACE,6BAA6B;EAC7B,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,oBAAoB;EACpB,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,6BAA6B;AAC/B","sourcesContent":["@font-face {\r\n  font-family: \"Material Icons\";\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  src: local(\"Material Icons\"), local(\"MaterialIcons-Regular\"),\r\n    url(../font/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2)\r\n      format(\"woff2\");\r\n}\r\n\r\n.material-icons {\r\n  font-family: \"Material Icons\";\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-size: 24px;\r\n  line-height: 1;\r\n  letter-spacing: normal;\r\n  text-transform: none;\r\n  display: inline-block;\r\n  white-space: nowrap;\r\n  word-wrap: normal;\r\n  direction: ltr;\r\n  font-feature-settings: \"liga\";\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/styles.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/styles.css ***!
  \******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_header_bg_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/header-bg.jpg */ "./src/images/header-bg.jpg");
/* harmony import */ var _images_logo_default_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../images/logo-default.png */ "./src/images/logo-default.png");
/* harmony import */ var _images_logo_edgenext_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../images/logo-edgenext.png */ "./src/images/logo-edgenext.png");
/* harmony import */ var _images_footer_background_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../images/footer-background.png */ "./src/images/footer-background.png");
// Imports







var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_header_bg_jpg__WEBPACK_IMPORTED_MODULE_3__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_logo_default_png__WEBPACK_IMPORTED_MODULE_4__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_logo_edgenext_png__WEBPACK_IMPORTED_MODULE_5__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_footer_background_png__WEBPACK_IMPORTED_MODULE_6__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".portfolio-header {\r\n  position: relative;\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n}\r\n\r\n.portfolio-header .mdl-layout__header-row {\r\n  padding: 0;\r\n  -webkit-justify-content: center;\r\n  -ms-flex-pack: center;\r\n  justify-content: center;\r\n}\r\n\r\n.mdl-layout__title {\r\n  font-size: 14px;\r\n  text-align: center;\r\n  font-weight: 300;\r\n}\r\n\r\n.is-compact .mdl-layout__title span {\r\n  display: none;\r\n}\r\n\r\n.portfolio-logo-row {\r\n  min-height: 120px;\r\n}\r\n\r\n.is-compact .portfolio-logo-row {\r\n  min-height: auto;\r\n}\r\n\r\n.mdl-layout__drawer-button {\r\n  display: none;\r\n}\r\n\r\n.is-compact .mdl-layout__drawer-button {\r\n  display: block;\r\n}\r\n\r\n.portfolio-logo {\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") 50% no-repeat;\r\n  background-size: contain;\r\n  height: 58px;\r\n  width: 200px;\r\n  margin: 10px auto;\r\n}\r\n\r\n.portfolio-logo-edgenext {\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") 50% no-repeat !important;\r\n}\r\n\r\n.is-compact .portfolio-logo {\r\n  height: 35px;\r\n  width: 120px;\r\n  margin: 12px auto;\r\n}\r\n\r\n.portfolio-description {\r\n  font-size: 18px;\r\n}\r\n\r\n.is-compact .portfolio-description {\r\n  font-size: 14px;\r\n}\r\n\r\n.portfolio-navigation-row {\r\n  background-color: rgba(0, 0, 0, 0.08);\r\n  text-transform: uppercase;\r\n  height: 45px;\r\n}\r\n\r\n.portfolio-navigation-row .mdl-navigation {\r\n  text-align: center;\r\n  max-width: 900px;\r\n  width: 100%;\r\n}\r\n\r\n.portfolio-navigation-row .mdl-navigation__link {\r\n  -webkit-flex: 1;\r\n  -ms-flex: 1;\r\n  flex: 1;\r\n  line-height: 42px;\r\n}\r\n\r\n.portfolio-header .mdl-layout__drawer-button {\r\n  background-color: rgba(197, 197, 197, 0.44);\r\n}\r\n\r\n.portfolio-navigation-row .is-active {\r\n  position: relative;\r\n  font-weight: bold;\r\n}\r\n\r\n.portfolio-navigation-row .is-active:after {\r\n  content: \"\";\r\n  width: 70%;\r\n  height: 2px;\r\n  display: block;\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 0;\r\n  background-color: rgb(255, 64, 129);\r\n  left: 15%;\r\n}\r\n\r\n.portfolio-card .mdl-card__title {\r\n  padding-bottom: 0;\r\n}\r\n\r\n/* .portfolio-blog-card-full-bg {\r\n  background: url(../images/example-blog03.jpg) center / cover;\r\n}\r\n\r\n.portfolio-blog-card-event-bg {\r\n  background: url(../images/example-blog05.jpg) center / cover;\r\n}\r\n\r\n.portfolio-blog-card-strip-bg {\r\n  background: url(../images/example-blog06.jpg) center / cover;\r\n} */\r\n\r\n.portfolio-blog-card-compact .mdl-card__title {\r\n  padding-bottom: 0;\r\n}\r\n\r\n.portfolio-blog-card-bg > .mdl-card__actions {\r\n  height: 52px;\r\n  padding: 16px;\r\n  background: rgba(0, 0, 0, 0.2);\r\n}\r\n\r\nimg.article-image {\r\n  width: 100%;\r\n  height: auto;\r\n}\r\n\r\n.portfolio-max-width {\r\n  max-width: 900px;\r\n  margin: auto;\r\n}\r\n\r\n.portfolio-copy {\r\n  max-width: 700px;\r\n}\r\n\r\n.no-padding {\r\n  padding: 0;\r\n}\r\n\r\n.no-left-padding {\r\n  padding-left: 0;\r\n}\r\n\r\n.no-bottom-padding {\r\n  padding-bottom: 0;\r\n}\r\n\r\n.padding-top {\r\n  padding: 10px 0 0;\r\n}\r\n\r\n.portfolio-share-btn {\r\n  position: relative;\r\n  float: right;\r\n  top: -4px;\r\n}\r\n\r\n.demo-card-event > .mdl-card__actions {\r\n  -webkit-align-items: center;\r\n  -ms-flex-align: center;\r\n  align-items: center;\r\n  box-sizing: border-box;\r\n  display: -webkit-flex;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n.portfolio-contact .mdl-textfield {\r\n  width: 100%;\r\n}\r\n\r\n.portfolio-contact form {\r\n  max-width: 550px;\r\n  margin: auto;\r\n}\r\n\r\nfooter {\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\r\n  background-size: cover;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,yDAA8C;AAChD;;AAEA;EACE,UAAU;EACV,+BAA+B;EAC/B,qBAAqB;EACrB,uBAAuB;AACzB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,iEAAyD;EACzD,wBAAwB;EACxB,YAAY;EACZ,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,4EAAqE;AACvE;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,qCAAqC;EACrC,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,eAAe;EACf,WAAW;EACX,OAAO;EACP,iBAAiB;AACnB;;AAEA;EACE,2CAA2C;AAC7C;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,UAAU;EACV,WAAW;EACX,cAAc;EACd,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,mCAAmC;EACnC,SAAS;AACX;;AAEA;EACE,iBAAiB;AACnB;;AAEA;;;;;;;;;;GAUG;;AAEH;EACE,iBAAiB;AACnB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,YAAY;AACd;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,SAAS;AACX;;AAEA;EACE,2BAA2B;EAC3B,sBAAsB;EACtB,mBAAmB;EACnB,sBAAsB;EACtB,qBAAqB;EACrB,oBAAoB;EACpB,aAAa;AACf;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,YAAY;AACd;;AAEA;EACE,yDAAsD;EACtD,sBAAsB;AACxB","sourcesContent":[".portfolio-header {\r\n  position: relative;\r\n  background-image: url(../images/header-bg.jpg);\r\n}\r\n\r\n.portfolio-header .mdl-layout__header-row {\r\n  padding: 0;\r\n  -webkit-justify-content: center;\r\n  -ms-flex-pack: center;\r\n  justify-content: center;\r\n}\r\n\r\n.mdl-layout__title {\r\n  font-size: 14px;\r\n  text-align: center;\r\n  font-weight: 300;\r\n}\r\n\r\n.is-compact .mdl-layout__title span {\r\n  display: none;\r\n}\r\n\r\n.portfolio-logo-row {\r\n  min-height: 120px;\r\n}\r\n\r\n.is-compact .portfolio-logo-row {\r\n  min-height: auto;\r\n}\r\n\r\n.mdl-layout__drawer-button {\r\n  display: none;\r\n}\r\n\r\n.is-compact .mdl-layout__drawer-button {\r\n  display: block;\r\n}\r\n\r\n.portfolio-logo {\r\n  background: url(../images/logo-default.png) 50% no-repeat;\r\n  background-size: contain;\r\n  height: 58px;\r\n  width: 200px;\r\n  margin: 10px auto;\r\n}\r\n\r\n.portfolio-logo-edgenext {\r\n  background: url(../images/logo-edgenext.png) 50% no-repeat !important;\r\n}\r\n\r\n.is-compact .portfolio-logo {\r\n  height: 35px;\r\n  width: 120px;\r\n  margin: 12px auto;\r\n}\r\n\r\n.portfolio-description {\r\n  font-size: 18px;\r\n}\r\n\r\n.is-compact .portfolio-description {\r\n  font-size: 14px;\r\n}\r\n\r\n.portfolio-navigation-row {\r\n  background-color: rgba(0, 0, 0, 0.08);\r\n  text-transform: uppercase;\r\n  height: 45px;\r\n}\r\n\r\n.portfolio-navigation-row .mdl-navigation {\r\n  text-align: center;\r\n  max-width: 900px;\r\n  width: 100%;\r\n}\r\n\r\n.portfolio-navigation-row .mdl-navigation__link {\r\n  -webkit-flex: 1;\r\n  -ms-flex: 1;\r\n  flex: 1;\r\n  line-height: 42px;\r\n}\r\n\r\n.portfolio-header .mdl-layout__drawer-button {\r\n  background-color: rgba(197, 197, 197, 0.44);\r\n}\r\n\r\n.portfolio-navigation-row .is-active {\r\n  position: relative;\r\n  font-weight: bold;\r\n}\r\n\r\n.portfolio-navigation-row .is-active:after {\r\n  content: \"\";\r\n  width: 70%;\r\n  height: 2px;\r\n  display: block;\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 0;\r\n  background-color: rgb(255, 64, 129);\r\n  left: 15%;\r\n}\r\n\r\n.portfolio-card .mdl-card__title {\r\n  padding-bottom: 0;\r\n}\r\n\r\n/* .portfolio-blog-card-full-bg {\r\n  background: url(../images/example-blog03.jpg) center / cover;\r\n}\r\n\r\n.portfolio-blog-card-event-bg {\r\n  background: url(../images/example-blog05.jpg) center / cover;\r\n}\r\n\r\n.portfolio-blog-card-strip-bg {\r\n  background: url(../images/example-blog06.jpg) center / cover;\r\n} */\r\n\r\n.portfolio-blog-card-compact .mdl-card__title {\r\n  padding-bottom: 0;\r\n}\r\n\r\n.portfolio-blog-card-bg > .mdl-card__actions {\r\n  height: 52px;\r\n  padding: 16px;\r\n  background: rgba(0, 0, 0, 0.2);\r\n}\r\n\r\nimg.article-image {\r\n  width: 100%;\r\n  height: auto;\r\n}\r\n\r\n.portfolio-max-width {\r\n  max-width: 900px;\r\n  margin: auto;\r\n}\r\n\r\n.portfolio-copy {\r\n  max-width: 700px;\r\n}\r\n\r\n.no-padding {\r\n  padding: 0;\r\n}\r\n\r\n.no-left-padding {\r\n  padding-left: 0;\r\n}\r\n\r\n.no-bottom-padding {\r\n  padding-bottom: 0;\r\n}\r\n\r\n.padding-top {\r\n  padding: 10px 0 0;\r\n}\r\n\r\n.portfolio-share-btn {\r\n  position: relative;\r\n  float: right;\r\n  top: -4px;\r\n}\r\n\r\n.demo-card-event > .mdl-card__actions {\r\n  -webkit-align-items: center;\r\n  -ms-flex-align: center;\r\n  align-items: center;\r\n  box-sizing: border-box;\r\n  display: -webkit-flex;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n.portfolio-contact .mdl-textfield {\r\n  width: 100%;\r\n}\r\n\r\n.portfolio-contact form {\r\n  max-width: 550px;\r\n  margin: auto;\r\n}\r\n\r\nfooter {\r\n  background-image: url(../images/footer-background.png);\r\n  background-size: cover;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/font/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2":
/*!********************************************************************!*\
  !*** ./src/font/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2 ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "font/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2");

/***/ }),

/***/ "./src/font/2tsd397wLxj96qwHyNIkxPesZW2xOQ-xsNqO47m55DA.woff2":
/*!********************************************************************!*\
  !*** ./src/font/2tsd397wLxj96qwHyNIkxPesZW2xOQ-xsNqO47m55DA.woff2 ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "font/2tsd397wLxj96qwHyNIkxPesZW2xOQ-xsNqO47m55DA.woff2");

/***/ }),

/***/ "./src/font/CWB0XYA8bzo0kSThX0UTuA.woff2":
/*!***********************************************!*\
  !*** ./src/font/CWB0XYA8bzo0kSThX0UTuA.woff2 ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "font/CWB0XYA8bzo0kSThX0UTuA.woff2");

/***/ }),

/***/ "./src/font/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2":
/*!********************************************************************!*\
  !*** ./src/font/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2 ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "font/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2");

/***/ }),

/***/ "./src/font/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2":
/*!********************************************************************!*\
  !*** ./src/font/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2 ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "font/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2");

/***/ }),

/***/ "./src/font/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2":
/*!********************************************************************!*\
  !*** ./src/font/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2 ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "font/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2");

/***/ }),

/***/ "./src/font/mnpfi9pxYH-Go5UiibESIltXRa8TVwTICgirnJhmVJw.woff2":
/*!********************************************************************!*\
  !*** ./src/font/mnpfi9pxYH-Go5UiibESIltXRa8TVwTICgirnJhmVJw.woff2 ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "font/mnpfi9pxYH-Go5UiibESIltXRa8TVwTICgirnJhmVJw.woff2");

/***/ }),

/***/ "./src/font/t6Nd4cfPRhZP44Q5QAjcC44P5ICox8Kq3LLUNMylGO4.woff2":
/*!********************************************************************!*\
  !*** ./src/font/t6Nd4cfPRhZP44Q5QAjcC44P5ICox8Kq3LLUNMylGO4.woff2 ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "font/t6Nd4cfPRhZP44Q5QAjcC44P5ICox8Kq3LLUNMylGO4.woff2");

/***/ }),

/***/ "./src/font/vPcynSL0qHq_6dX7lKVByfesZW2xOQ-xsNqO47m55DA.woff2":
/*!********************************************************************!*\
  !*** ./src/font/vPcynSL0qHq_6dX7lKVByfesZW2xOQ-xsNqO47m55DA.woff2 ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "font/vPcynSL0qHq_6dX7lKVByfesZW2xOQ-xsNqO47m55DA.woff2");

/***/ }),

/***/ "./src/images/footer-background.png":
/*!******************************************!*\
  !*** ./src/images/footer-background.png ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/628cb20196f5739a239932a157508905.png");

/***/ }),

/***/ "./src/images/header-bg.jpg":
/*!**********************************!*\
  !*** ./src/images/header-bg.jpg ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/ede21b42d06e4a8d16e706ac0b3ce8eb.jpg");

/***/ }),

/***/ "./src/images/logo-default.png":
/*!*************************************!*\
  !*** ./src/images/logo-default.png ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/52c0e09a827b456c18bb9c8edd7cac00.png");

/***/ }),

/***/ "./src/images/logo-edgenext.png":
/*!**************************************!*\
  !*** ./src/images/logo-edgenext.png ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/4de03c2c63e73f7a9b85f3d1fbef3885.png");

/***/ }),

/***/ "./src/css/font.css":
/*!**************************!*\
  !*** ./src/css/font.css ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_font_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./font.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/font.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_font_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_font_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_font_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_font_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/css/icon.css":
/*!**************************!*\
  !*** ./src/css/icon.css ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./icon.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/icon.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkdownload_service"] = self["webpackChunkdownload_service"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/app.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map