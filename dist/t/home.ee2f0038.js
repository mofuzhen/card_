// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../utils/OSSUploader.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

parcelRequire = function (e, r, n, t) {
  var i = "function" == typeof parcelRequire && parcelRequire,
      o = "function" == typeof require && require;

  function u(n, t) {
    if (!r[n]) {
      if (!e[n]) {
        var f = "function" == typeof parcelRequire && parcelRequire;
        if (!t && f) return f(n, !0);
        if (i) return i(n, !0);
        if (o && "string" == typeof n) return o(n);
        var c = new Error("Cannot find module '" + n + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[n][1][r] || r;
      };

      var l = r[n] = new u.Module(n);
      e[n][0].call(l.exports, p, l, l.exports, this);
    }

    return r[n].exports;

    function p(e) {
      return u(p.resolve(e));
    }
  }

  u.isParcelRequire = !0, u.Module = function (e) {
    this.id = e, this.bundle = u, this.exports = {};
  }, u.modules = e, u.cache = r, u.parent = i, u.register = function (r, n) {
    e[r] = [function (e, r) {
      r.exports = n;
    }, {}];
  };

  for (var f = 0; f < n.length; f++) {
    u(n[f]);
  }

  if (n.length) {
    var c = u(n[n.length - 1]);
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function () {
      return c;
    }) : t && (this[t] = c);
  }

  return u;
}({
  "xd/O": [function (require, module, exports) {
    var r = {
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      encode: function encode(t) {
        var e,
            o,
            h,
            a,
            n,
            c,
            d,
            C = "",
            i = 0;

        for (t = r._utf8_encode(t); i < t.length;) {
          a = (e = t.charCodeAt(i++)) >> 2, n = (3 & e) << 4 | (o = t.charCodeAt(i++)) >> 4, c = (15 & o) << 2 | (h = t.charCodeAt(i++)) >> 6, d = 63 & h, isNaN(o) ? c = d = 64 : isNaN(h) && (d = 64), C = C + this._keyStr.charAt(a) + this._keyStr.charAt(n) + this._keyStr.charAt(c) + this._keyStr.charAt(d);
        }

        return C;
      },
      decode: function decode(t) {
        var e,
            o,
            h,
            a,
            n,
            c,
            d = "",
            C = 0;

        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); C < t.length;) {
          e = this._keyStr.indexOf(t.charAt(C++)) << 2 | (a = this._keyStr.indexOf(t.charAt(C++))) >> 4, o = (15 & a) << 4 | (n = this._keyStr.indexOf(t.charAt(C++))) >> 2, h = (3 & n) << 6 | (c = this._keyStr.indexOf(t.charAt(C++))), d += String.fromCharCode(e), 64 != n && (d += String.fromCharCode(o)), 64 != c && (d += String.fromCharCode(h));
        }

        return d = r._utf8_decode(d);
      },
      _utf8_encode: function _utf8_encode(r) {
        r = r.replace(/\r\n/g, "\n");

        for (var t = "", e = 0; e < r.length; e++) {
          var o = r.charCodeAt(e);
          o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128));
        }

        return t;
      },
      _utf8_decode: function _utf8_decode(r) {
        for (var t = "", e = 0, o = c1 = c2 = 0; e < r.length;) {
          (o = r.charCodeAt(e)) < 128 ? (t += String.fromCharCode(o), e++) : o > 191 && o < 224 ? (c2 = r.charCodeAt(e + 1), t += String.fromCharCode((31 & o) << 6 | 63 & c2), e += 2) : (c2 = r.charCodeAt(e + 1), c3 = r.charCodeAt(e + 2), t += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), e += 3);
        }

        return t;
      }
    };
    module.exports = r;
  }, {}],
  "rHLc": [function (require, module, exports) {
    var r = {},
        t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        n = r.util = {
      rotl: function rotl(r, t) {
        return r << t | r >>> 32 - t;
      },
      rotr: function rotr(r, t) {
        return r << 32 - t | r >>> t;
      },
      endian: function endian(r) {
        if (r.constructor == Number) return 16711935 & n.rotl(r, 8) | 4278255360 & n.rotl(r, 24);

        for (var t = 0; t < r.length; t++) {
          r[t] = n.endian(r[t]);
        }

        return r;
      },
      randomBytes: function randomBytes(r) {
        for (var t = []; r > 0; r--) {
          t.push(Math.floor(256 * Math.random()));
        }

        return t;
      },
      stringToBytes: function stringToBytes(r) {
        for (var t = [], n = 0; n < r.length; n++) {
          t.push(r.charCodeAt(n));
        }

        return t;
      },
      bytesToString: function bytesToString(r) {
        for (var t = [], n = 0; n < r.length; n++) {
          t.push(String.fromCharCode(r[n]));
        }

        return t.join("");
      },
      stringToWords: function stringToWords(r) {
        for (var t = [], n = 0, e = 0; n < r.length; n++, e += 8) {
          t[e >>> 5] |= r.charCodeAt(n) << 24 - e % 32;
        }

        return t;
      },
      bytesToWords: function bytesToWords(r) {
        for (var t = [], n = 0, e = 0; n < r.length; n++, e += 8) {
          t[e >>> 5] |= r[n] << 24 - e % 32;
        }

        return t;
      },
      wordsToBytes: function wordsToBytes(r) {
        for (var t = [], n = 0; n < 32 * r.length; n += 8) {
          t.push(r[n >>> 5] >>> 24 - n % 32 & 255);
        }

        return t;
      },
      bytesToHex: function bytesToHex(r) {
        for (var t = [], n = 0; n < r.length; n++) {
          t.push((r[n] >>> 4).toString(16)), t.push((15 & r[n]).toString(16));
        }

        return t.join("");
      },
      hexToBytes: function hexToBytes(r) {
        for (var t = [], n = 0; n < r.length; n += 2) {
          t.push(parseInt(r.substr(n, 2), 16));
        }

        return t;
      },
      bytesToBase64: function bytesToBase64(r) {
        if ("function" == typeof btoa) return btoa(n.bytesToString(r));

        for (var e, o = [], s = 0; s < r.length; s++) {
          switch (s % 3) {
            case 0:
              o.push(t.charAt(r[s] >>> 2)), e = (3 & r[s]) << 4;
              break;

            case 1:
              o.push(t.charAt(e | r[s] >>> 4)), e = (15 & r[s]) << 2;
              break;

            case 2:
              o.push(t.charAt(e | r[s] >>> 6)), o.push(t.charAt(63 & r[s])), e = -1;
          }
        }

        for (null != e && -1 != e && o.push(t.charAt(e)); o.length % 4 != 0;) {
          o.push("=");
        }

        return o.join("");
      },
      base64ToBytes: function base64ToBytes(r) {
        if ("function" == typeof atob) return n.stringToBytes(atob(r));
        r = r.replace(/[^A-Z0-9+\/]/gi, "");

        for (var e = [], o = 0; o < r.length; o++) {
          switch (o % 4) {
            case 1:
              e.push(t.indexOf(r.charAt(o - 1)) << 2 | t.indexOf(r.charAt(o)) >>> 4);
              break;

            case 2:
              e.push((15 & t.indexOf(r.charAt(o - 1))) << 4 | t.indexOf(r.charAt(o)) >>> 2);
              break;

            case 3:
              e.push((3 & t.indexOf(r.charAt(o - 1))) << 6 | t.indexOf(r.charAt(o)));
          }
        }

        return e;
      }
    };
    r.mode = {}, r.HMAC = function (r, t, e, o) {
      for (var s = e = e.length > 4 * r._blocksize ? r(e, {
        asBytes: !0
      }) : n.stringToBytes(e), a = e.slice(0), u = 0; u < 4 * r._blocksize; u++) {
        s[u] ^= 92, a[u] ^= 54;
      }

      var i = r(n.bytesToString(s) + r(n.bytesToString(a) + t, {
        asString: !0
      }), {
        asBytes: !0
      });
      return o && o.asBytes ? i : o && o.asString ? n.bytesToString(i) : n.bytesToHex(i);
    };

    var e = r.SHA1 = function (r, t) {
      var o = n.wordsToBytes(e._sha1(r));
      return t && t.asBytes ? o : t && t.asString ? n.bytesToString(o) : n.bytesToHex(o);
    };

    e._sha1 = function (r) {
      var t = n.stringToWords(r),
          e = 8 * r.length,
          o = [],
          s = 1732584193,
          a = -271733879,
          u = -1732584194,
          i = 271733878,
          h = -1009589776;
      t[e >> 5] |= 128 << 24 - e % 32, t[15 + (e + 64 >>> 9 << 4)] = e;

      for (var f = 0; f < t.length; f += 16) {
        for (var c = s, g = a, l = u, b = i, y = h, p = 0; p < 80; p++) {
          if (p < 16) o[p] = t[f + p];else {
            var v = o[p - 3] ^ o[p - 8] ^ o[p - 14] ^ o[p - 16];
            o[p] = v << 1 | v >>> 31;
          }
          var d = (s << 5 | s >>> 27) + h + (o[p] >>> 0) + (p < 20 ? 1518500249 + (a & u | ~a & i) : p < 40 ? 1859775393 + (a ^ u ^ i) : p < 60 ? (a & u | a & i | u & i) - 1894007588 : (a ^ u ^ i) - 899497514);
          h = i, i = u, u = a << 30 | a >>> 2, a = s, s = d;
        }

        s += c, a += g, u += l, i += b, h += y;
      }

      return [s, a, u, i, h];
    }, e._blocksize = 16, module.exports = r;
  }, {}],
  "Focm": [function (require, module, exports) {
    var e = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }

      return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }();

    function t(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    var n = require("./Base64"),
        i = require("./Crypto"),
        r = function () {
      function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t(this, r), this.expiredAt = this.getPolicyExpiredAt(e.expire), this.OSSAccessKeyId = e.AccessKeyId, this.policy = this.getPolicyBase64(e.maxSize, this.expiredAt), this.signature = this.getSignature(this.policy, e.AccessKeySecret), this.name = Date.now() + "-" + this.getRandomString();
      }

      return e(r, [{
        key: "getPolicyBase64",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5,
              t = {
            expiration: arguments[1],
            conditions: [["content-length-range", 0, 1024 * e * 1024]]
          };
          return n.encode(JSON.stringify(t));
        }
      }, {
        key: "getSignature",
        value: function value(e, t) {
          var n = i.HMAC(i.SHA1, e, t, {
            asBytes: !0
          });
          return i.util.bytesToBase64(n);
        }
      }, {
        key: "getPolicyExpiredAt",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 7200,
              t = new Date();
          return t.setHours(t.getHours() + e / 60 / 60), t.toISOString();
        }
      }, {
        key: "getRandomString",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 16,
              t = "qwertyuiopasdfghjklzxcvbnm1234567890";
          if (e > t.length) for (var n = 0; n < e / t.length + 1;) {
            n++, t += t;
          }
          return t.split("").map(function (e) {
            return t[Math.ceil(Math.random() * (t.length - 1))];
          }).join("").slice(0, e);
        }
      }]), r;
    }();

    module.exports = r, window.OSSUploader = r;
  }, {
    "./Base64": "xd/O",
    "./Crypto": "rHLc"
  }]
}, {}, ["Focm"], null);
},{}],"../../components/img/艾克.png":[function(require,module,exports) {
module.exports = "/艾克.50511e31.png";
},{}],"components/home/component/home.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ENV = _interopRequireDefault(require("../../../../../ENV"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var OSSUploader = require('../../../../../utils/OSSUploader');

var _default = {
  name: "home",
  data: function data() {
    return {
      src: require('../../../../../components/img/艾克.png')
    };
  },
  created: function created() {
    console.log(new OSSUploader({
      AccessKeyId: _ENV.default.OSS.AccessKey,
      AccessKeySecret: _ENV.default.OSS.AccessSecret
    }));
  },
  mounted: function mounted() {
    this.nextStep();
  },
  methods: {
    changeTab: function changeTab() {
      this.$emit('onChangeTabbar', {
        //名称
        name: "奖励",
        //组件名称
        componentName: "rewards"
      });
    },
    upload: function upload(e) {
      var picture_ = e.target.files[0];
      console.log(picture_);
      var myfrom = new FormData();
      var oss = new OSSUploader({
        AccessKeyId: _ENV.default.OSS.AccessKey,
        AccessKeySecret: _ENV.default.OSS.AccessSecret
      });
      oss.file = picture_;
      oss.key = 'images/' + oss.name + picture_.name;
      oss.success_action_status = 200;
      Object.keys(oss).forEach(function (k) {
        myfrom.append(k, oss[k]);
      });
      console.log(oss);
      this.nextStep(myfrom);
    },
    nextStep: function nextStep(myfrom) {
      // this.$http.get('/playboom.oss-cn-beijing.aliyuncs.com').then(res=>{
      this.$http.post(_ENV.default.OSS.endpoint, myfrom, {
        headers: {
          contentType: false,
          processData: false
        }
      }).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }
};
exports.default = _default;
        var $36f297 = exports.default || module.exports;
      
      if (typeof $36f297 === 'function') {
        $36f297 = $36f297.options;
      }
    
        /* template */
        Object.assign($36f297, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "page-tabbar" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "card_picture" }, [
      _c(
        "div",
        { staticClass: "cardPiture_top", on: { click: _vm.changeTab } },
        [
          _c("h3", [_vm._v("疯狂多米诺")]),
          _vm._v(" "),
          _c("p", [_vm._v("请上传包含4天分享内容的截图1张")])
        ]
      ),
      _vm._v(" "),
      _vm._m(1)
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "image-upload" }, [
      _c("div", { staticClass: "image-upload-item" }, [
        _c("img", {
          staticClass: "user-image",
          attrs: { src: _vm.src, alt: "" }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "image-upload-item" }, [
        _c("a", { staticClass: "a-upload", attrs: { href: "javascript:;" } }, [
          _c("img", {
            staticClass: "add",
            attrs: { src: "/添加.75ffb7a5.png", alt: "" }
          }),
          _vm._v(" "),
          _c("input", {
            attrs: {
              id: "upload",
              type: "file",
              name: "",
              placeholder: "点击"
            },
            on: { change: _vm.upload }
          }),
          _vm._v("\n            点击上传\n          ")
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card_bg" }, [
      _c("img", {
        attrs: { src: "/打卡送礼.dde9c792.png", alt: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-img" }, [
      _c("img", {
        attrs: { src: "/艾克.50511e31.png", alt: "" }
      })
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$36f297', $36f297);
          } else {
            api.reload('$36f297', $36f297);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"../../../../../ENV":"../../ENV.js","../../../../../utils/OSSUploader":"../../utils/OSSUploader.js","../../../../../components/img/艾克.png":"../../components/img/艾克.png","./..\\..\\..\\..\\..\\components\\img\\打卡送礼.png":[["打卡送礼.dde9c792.png","../../components/img/打卡送礼.png"],"../../components/img/打卡送礼.png"],"./..\\..\\..\\..\\..\\components\\img\\艾克.png":[["艾克.50511e31.png","../../components/img/艾克.png"],"../../components/img/艾克.png"],"./..\\..\\..\\..\\..\\components\\img\\添加.png":[["添加.75ffb7a5.png","../../components/img/添加.png"],"../../components/img/添加.png"],"_css_loader":"../../../node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"../../../node_modules/vue-hot-reload-api/dist/index.js","vue":"../../../node_modules/vue/dist/vue.runtime.esm.js"}],"../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50282" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}],"../../../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],0:[function(require,module,exports) {
var b=require("../../../node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.load([]).then(function(){require("components/home/component/home.vue");});
},{}]},{},["../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/home.ee2f0038.js.map