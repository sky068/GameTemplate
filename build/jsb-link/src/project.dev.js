window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AFLogger: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25e69AZ0/xDH7MCLjFyNBxu", "AFLogger");
    "use strict";
    var PACKAGENAMEFB = "com/zygame/utils/AFHelper";
    cc.Class({
      statics: {
        logEventLevel: function logEventLevel(level) {
          if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "trackEventLevel", "(I)V", level);
          cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AppsFlyerHelper", "trackEventLevel", level);
        },
        logEventWatchAds: function logEventWatchAds(adName) {
          cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAMEFB, "trackEventWatchAD", "(Ljava/lang/String;)V", adName) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AppsFlyerHelper", "trackEventWatchAds", adName);
        },
        logEventClickButton: function logEventClickButton(btName) {
          cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAMEFB, "trackEventClickButton", "(Ljava/lang/String;)V", btName) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AppsFlyerHelper", "trackEventClickButton", btName);
        },
        logEvent: function logEvent(key, value) {
          cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAMEFB, "trackEvent", "(Ljava/lang/String;Ljava/lang/String;)V", key, value) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AppsFlyerHelper", "trackEvent:withValue:", key, value);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  AdHelper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "68c65uC/Q5J/qrAibYnfzMi", "AdHelper");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var AdHelper = cc.Class({
      statics: {
        initAdSdk: function initAdSdk() {
          101 == CHANNEL_ID || 102 == CHANNEL_ID ? zy.UpltvHelper.initUpltv(function(ret) {
            cc.log("===upltv init: " + ret);
            ret && zy.UpltvHelper.setloadRdADCb();
          }) : 201 == CHANNEL_ID || 202 == CHANNEL_ID;
        },
        isInterstitialReady: function isInterstitialReady(placeId) {
          if (101 == CHANNEL_ID || 102 == CHANNEL_ID) return zy.UpltvHelper.isInterstitialReady(placeId);
          if (201 == CHANNEL_ID || 202 == CHANNEL_ID) return zy.OpenAdsHelper.isIntersitialReady(placeId);
        },
        showInterstitialAds: function showInterstitialAds(placeId) {
          if (101 == CHANNEL_ID || 102 == CHANNEL_ID) {
            zy.UpltvHelper.showInterstitial(placeId, null);
            zy.LogHelper.logEventWatchAds(placeId);
          } else if (201 == CHANNEL_ID || 202 == CHANNEL_ID) {
            zy.OpenAdsHelper.showInterstitialAds(placeId);
            zy.LogHelper.logEventWatchAds(placeId);
          }
        },
        isRdAdsReady: function isRdAdsReady(placeId) {
          if (101 == CHANNEL_ID || 102 == CHANNEL_ID) return zy.UpltvHelper.rdADIsReady();
          if (201 == CHANNEL_ID || 202 == CHANNEL_ID) return zy.OpenAdsHelper.isRdAdsReady(placeId);
        },
        showRdAds: function showRdAds(placeId, cb) {
          this.gotRdCall = cb;
          101 == CHANNEL_ID || 102 == CHANNEL_ID ? zy.UpltvHelper.rdAdShow(placeId) : 201 != CHANNEL_ID && 202 != CHANNEL_ID || zy.OpenAdsHelper.showRdAds(placeId);
          zy.AdHelper.pauseGame();
        },
        onOpenAdsReward: function onOpenAdsReward(placeId, ret) {
          cc.log("===>js\u6536\u5230\u89c6\u9891\u6fc0\u52b1\u56de\u8c03:" + placeId + ", " + ret);
          cc.log("===> typeof ret: " + ("undefined" === typeof ret ? "undefined" : _typeof(ret)));
          if (this.gotRdCall) {
            this.gotRdCall(ret);
            this.gotRdCall = null;
          }
          ret && zy.LogHelper.logEventWatchAds(placeId);
          zy.AdHelper.resumeGame();
        },
        pauseGame: function pauseGame() {
          cc.game.pause();
          zy.audioMng.pauseMusic();
        },
        resumeGame: function resumeGame() {
          cc.game.resume();
          zy.audioMng.resumeMusic();
        }
      }
    });
    zy.AdHelper = AdHelper;
    cc._RF.pop();
  }, {} ],
  Alert: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f8e868rNBKE7k8hoS6RoAS", "Alert");
    "use strict";
    cc.Class({
      extends: cc.Component,
      statics: {
        alertNode: null,
        show: function show(params) {
          var _this = this;
          cc.loader.loadRes("prefabs/common/Alert", function(err, pf) {
            if (!err) {
              cc.isValid(_this.alertNode) && _this.alertNode.destroy();
              _this.alertNode = cc.instantiate(pf);
              _this.alertNode.zIndex = zy.constData.ZIndex.ALERT;
              _this.alertNode.parent = zy.director.getUiRoot();
              _this.alertNode.getComponent("Alert").init(params);
            }
          });
        }
      },
      properties: {
        okBtn: cc.Node,
        cancleBtn: cc.Node,
        contentLabel: cc.Label
      },
      init: function init() {
        var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
          text: "",
          okText: "",
          cancleText: null,
          okCb: null,
          cancleCb: null
        };
        this.contentLabel.string = params.text;
        this.okBtn.active = !!params.okText;
        this.okBtn.getComponentInChildren(cc.Label).string = params.okText ? params.okText : i18n.t("btn_ok");
        this.cancleBtn.active = !!params.cancleText;
        this.cancleBtn.getComponentInChildren(cc.Label).string = params.cancleText ? params.cancleText : i18n.t("btn_cancle");
        this.okCb = params.okCb;
        this.cancleCb = params.cancleCb;
        this.contentLabel._updateRenderData(true);
        var width = this.contentLabel.node.width;
        if (width > 400) {
          this.contentLabel.overflow = cc.Label.Overflow.SHRINK;
          this.contentLabel.node.width = 400;
          this.contentLabel.node.height = 260;
          this.contentLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        }
      },
      confirmCallback: function confirmCallback() {
        this.okCb && this.okCb();
        this.closeCallback();
      },
      cancleCallback: function cancleCallback() {
        this.cancleCb && this.cancleCb();
        this.closeCallback();
      },
      closeCallback: function closeCallback() {
        this.node.destroy();
      },
      clean: function clean() {
        this.node.destroy();
      }
    });
    cc._RF.pop();
  }, {} ],
  Algo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d18ccVTPSlPKasd+dtGaYsS", "Algo");
    "use strict";
    var Algo = {};
    Algo.cipher = function(input, w) {
      var Nb = 4;
      var Nr = w.length / Nb - 1;
      var state = [ [], [], [], [] ];
      for (var i = 0; i < 4 * Nb; i++) state[i % 4][Math.floor(i / 4)] = input[i];
      state = Algo.addRoundKey(state, w, 0, Nb);
      for (var round = 1; round < Nr; round++) {
        state = Algo.subBytes(state, Nb);
        state = Algo.shiftRows(state, Nb);
        state = Algo.mixColumns(state, Nb);
        state = Algo.addRoundKey(state, w, round, Nb);
      }
      state = Algo.subBytes(state, Nb);
      state = Algo.shiftRows(state, Nb);
      state = Algo.addRoundKey(state, w, Nr, Nb);
      var output = new Array(4 * Nb);
      for (var _i = 0; _i < 4 * Nb; _i++) output[_i] = state[_i % 4][Math.floor(_i / 4)];
      return output;
    };
    Algo.keyExpansion = function(key) {
      var Nb = 4;
      var Nk = key.length / 4;
      var Nr = Nk + 6;
      var w = new Array(Nb * (Nr + 1));
      var temp = new Array(4);
      for (var i = 0; i < Nk; i++) {
        var r = [ key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3] ];
        w[i] = r;
      }
      for (var _i2 = Nk; _i2 < Nb * (Nr + 1); _i2++) {
        w[_i2] = new Array(4);
        for (var t = 0; t < 4; t++) temp[t] = w[_i2 - 1][t];
        if (_i2 % Nk == 0) {
          temp = Algo.subWord(Algo.rotWord(temp));
          for (var _t = 0; _t < 4; _t++) temp[_t] ^= Algo.rCon[_i2 / Nk][_t];
        } else Nk > 6 && _i2 % Nk == 4 && (temp = Algo.subWord(temp));
        for (var _t2 = 0; _t2 < 4; _t2++) w[_i2][_t2] = w[_i2 - Nk][_t2] ^ temp[_t2];
      }
      return w;
    };
    Algo.subBytes = function(s, Nb) {
      for (var r = 0; r < 4; r++) for (var c = 0; c < Nb; c++) s[r][c] = Algo.sBox[s[r][c]];
      return s;
    };
    Algo.shiftRows = function(s, Nb) {
      var t = new Array(4);
      for (var r = 1; r < 4; r++) {
        for (var c = 0; c < 4; c++) t[c] = s[r][(c + r) % Nb];
        for (var _c = 0; _c < 4; _c++) s[r][_c] = t[_c];
      }
      return s;
    };
    Algo.mixColumns = function(s, Nb) {
      for (var c = 0; c < 4; c++) {
        var a = new Array(4);
        var b = new Array(4);
        for (var i = 0; i < 4; i++) {
          a[i] = s[i][c];
          b[i] = 128 & s[i][c] ? s[i][c] << 1 ^ 283 : s[i][c] << 1;
        }
        s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3];
        s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3];
        s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3];
        s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3];
      }
      return s;
    };
    Algo.addRoundKey = function(state, w, rnd, Nb) {
      for (var r = 0; r < 4; r++) for (var c = 0; c < Nb; c++) state[r][c] ^= w[4 * rnd + c][r];
      return state;
    };
    Algo.subWord = function(w) {
      for (var i = 0; i < 4; i++) w[i] = Algo.sBox[w[i]];
      return w;
    };
    Algo.rotWord = function(w) {
      var tmp = w[0];
      for (var i = 0; i < 3; i++) w[i] = w[i + 1];
      w[3] = tmp;
      return w;
    };
    Algo.sBox = [ 99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22 ];
    Algo.rCon = [ [ 0, 0, 0, 0 ], [ 1, 0, 0, 0 ], [ 2, 0, 0, 0 ], [ 4, 0, 0, 0 ], [ 8, 0, 0, 0 ], [ 16, 0, 0, 0 ], [ 32, 0, 0, 0 ], [ 64, 0, 0, 0 ], [ 128, 0, 0, 0 ], [ 27, 0, 0, 0 ], [ 54, 0, 0, 0 ] ];
    "undefined" != typeof module && module.exports && (module.exports = Algo);
    "function" == typeof define && define.amd && define([], function() {
      return Algo;
    });
    cc._RF.pop();
  }, {} ],
  Audio: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bc426H/sghBCZ8seMku3vc5", "Audio");
    "use strict";
    var BGM = {
      MAIN: "sounds/bgm/main"
    };
    var Effect = {
      CommonClick: "sounds/effect/common_click"
    };
    cc.Class({
      statics: {
        BGM: BGM,
        Effect: Effect,
        init: function init() {
          this.curBGMUrl = null;
          this.curBGMClip = null;
          this.bgmVolume = .9;
          this.effVolume = 1;
          this.bgmEnabled = true;
          this.effEnabled = true;
          var bgmEnabled = cc.sys.localStorage.getItem("bgmEnabled");
          null != bgmEnabled && "false" == bgmEnabled && (this.bgmEnabled = false);
          var bgmVolume = cc.sys.localStorage.getItem("bgmVolume");
          if (null != bgmVolume) {
            this.bgmVolume = parseFloat(bgmVolume);
            cc.audioEngine.setMusicVolume(bgmVolume);
          }
          var effEnabled = cc.sys.localStorage.getItem("effEnabled");
          null != effEnabled && "false" == effEnabled && (this.effEnabled = false);
          var effVolume = cc.sys.localStorage.getItem("effVolume");
          if (null != effVolume) {
            this.effVolume = parseFloat(effVolume);
            cc.audioEngine.setEffectsVolume(effVolume);
          }
        },
        getCurBGMUrl: function getCurBGMUrl() {
          return this.curBGMUrl;
        },
        playBGM: function playBGM(url, force) {
          var _this = this;
          if (this.curBGMUrl && this.curBGMUrl == url && !force) return;
          this.curBGMUrl = url;
          if (!this.bgmEnabled) return;
          this.curBGMClip && this.uncache(this.curBGMClip);
          cc.loader.loadRes(url, cc.AudioClip, function(err, clip) {
            if (!err) {
              _this.curBGMClip = clip;
              cc.audioEngine.playMusic(clip, true);
            }
          });
        },
        pauseBGM: function pauseBGM() {
          cc.audioEngine.pauseMusic();
        },
        resumeBGM: function resumeBGM() {
          cc.audioEngine.resumeMusic();
        },
        stopBGM: function stopBGM() {
          cc.audioEngine.stopMusic();
        },
        playEffect: function playEffect(url) {
          var loop = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          if (!this.effEnabled) return;
          cc.loader.loadRes(url, cc.AudioClip, function(err, clip) {
            err || cc.audioEngine.playEffect(clip, loop);
          });
        },
        pauseAllEffects: function pauseAllEffects() {
          cc.audioEngine.pauseAllEffects();
        },
        resumeAllEffects: function resumeAllEffects() {
          cc.audioEngine.resumeAllEffects();
        },
        stopALlEffects: function stopALlEffects() {
          cc.audioEngine.stopAllEffects();
        },
        uncache: function uncache(clip) {
          cc.audioEngine.uncache(clip);
        },
        uncacheAll: function uncacheAll() {
          cc.audioEngine.uncacheAll();
        },
        pauseAll: function pauseAll() {
          cc.audioEngine.pauseAll();
        },
        resumeAll: function resumeAll() {
          cc.audioEngine.resumeAll();
        },
        stopAll: function stopAll() {
          cc.audioEngine.stopAll();
        },
        setBGMEnabled: function setBGMEnabled(enabled) {
          if (this.bgmEnabled != enabled) {
            cc.sys.localStorage.setItem("bgmEnabled", String(enabled));
            this.bgmEnabled = enabled;
            true == this.bgmEnabled && null != this.curBGMUrl ? this.playBGM(this.curBGMUrl, true) : this.stopBGM();
          }
        },
        getBGMEnabled: function getBGMEnabled() {
          return this.bgmEnabled;
        },
        setBGMVolume: function setBGMVolume(v) {
          if (this.bgmVolume != v) {
            cc.sys.localStorage.setItem("bgmVolume", v);
            this.bgmVolume = v;
            cc.audioEngine.setMusicVolume(v);
          }
        },
        getBGMVomue: function getBGMVomue() {
          return this.bgmVolume;
        },
        setEffectsEnabled: function setEffectsEnabled(enabled) {
          if (this.effEnabled != enabled) {
            cc.sys.localStorage.setItem("effEnabled", String(enabled));
            this.effEnabled = enabled;
            enabled || this.stopALlEffects();
          }
        },
        getEffectsEnabled: function getEffectsEnabled() {
          return this.effEnabled;
        },
        setEffectsVolume: function setEffectsVolume(v) {
          if (this.effVolume != v) {
            cc.sys.localStorage.setItem("effVolume", v);
            this.effVolume = v;
            cc.audioEngine.setEffectsVolume(this.effVolume);
          }
        },
        getEffectVolume: function getEffectVolume() {
          return this.effVolume;
        },
        clean: function clean() {
          this.stopAll();
          this.uncacheAll();
          this.curBGMUrl = null;
          this.curBGMClip = null;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  BgColorData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73fc8Zfy+RL0IYz9HD/hGyA", "BgColorData");
    "use strict";
    var Utils = require("./../framework/common/UtilsOther");
    var DataBase = require("./DataBase");
    cc.Class({
      extends: DataBase,
      ctor: function ctor() {
        this.fileDir = "config/bgColorData";
        this.lastLevel = 1;
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
        this.dataObj = Utils.arrayToDict(this.dataObj, "id");
      },
      getBgTopColor: function getBgTopColor(level) {
        var data = this.getBgColorData(level);
        var color = data["top"];
        return "#" + color;
      },
      getBgDownColor: function getBgDownColor(level) {
        var data = this.getBgColorData(level);
        var color = data["down"];
        return "#" + color;
      },
      getBgColorData: function getBgColorData(level) {
        var id = this.getBgColorId(level);
        var data = this.dataObj[id];
        return data;
      },
      getBgColorId: function getBgColorId(level) {
        var id = level % 10;
        id = 0 == id ? 10 : id;
        return id;
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/common/UtilsOther": "UtilsOther",
    "./DataBase": "DataBase"
  } ],
  ButtonSafe: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8e42eou+C1Nna+T44ZKvKRT", "ButtonSafe");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        safeTime: {
          default: .5,
          tooltip: "\u6309\u94ae\u4fdd\u62a4\u65f6\u95f4\uff0c\u6307\u5b9a\u95f4\u9694\u5185\u53ea\u80fd\u70b9\u51fb\u4e00\u6b21."
        }
      },
      start: function start() {
        var _this = this;
        var button = this.getComponent(cc.Button);
        if (!button) return;
        this.clickEvents = button.clickEvents;
        this.node.on("click", function() {
          button.clickEvents = [];
          _this.scheduleOnce(function(dt) {
            button.clickEvents = _this.clickEvents;
          }, _this.safeTime);
        }, this);
      }
    });
    cc._RF.pop();
  }, {} ],
  Button: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cab9bUXOXBDk6Oo/t2eesSG", "Button");
    "use strict";
    var mat4 = {};
    var _mat4 = function _mat4(m00, m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15) {
      this.m00 = m00;
      this.m01 = m01;
      this.m02 = m02;
      this.m03 = m03;
      this.m04 = m04;
      this.m05 = m05;
      this.m06 = m06;
      this.m07 = m07;
      this.m08 = m08;
      this.m09 = m09;
      this.m10 = m10;
      this.m11 = m11;
      this.m12 = m12;
      this.m13 = m13;
      this.m14 = m14;
      this.m15 = m15;
    };
    mat4.create = function() {
      return new _mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    };
    mat4.invert = function(out, a) {
      var a00 = a.m00, a01 = a.m01, a02 = a.m02, a03 = a.m03, a10 = a.m04, a11 = a.m05, a12 = a.m06, a13 = a.m07, a20 = a.m08, a21 = a.m09, a22 = a.m10, a23 = a.m11, a30 = a.m12, a31 = a.m13, a32 = a.m14, a33 = a.m15;
      var b00 = a00 * a11 - a01 * a10;
      var b01 = a00 * a12 - a02 * a10;
      var b02 = a00 * a13 - a03 * a10;
      var b03 = a01 * a12 - a02 * a11;
      var b04 = a01 * a13 - a03 * a11;
      var b05 = a02 * a13 - a03 * a12;
      var b06 = a20 * a31 - a21 * a30;
      var b07 = a20 * a32 - a22 * a30;
      var b08 = a20 * a33 - a23 * a30;
      var b09 = a21 * a32 - a22 * a31;
      var b10 = a21 * a33 - a23 * a31;
      var b11 = a22 * a33 - a23 * a32;
      var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      if (!det) return null;
      det = 1 / det;
      out.m00 = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out.m01 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out.m02 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out.m03 = (a22 * b04 - a21 * b05 - a23 * b03) * det;
      out.m04 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out.m05 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out.m06 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out.m07 = (a20 * b05 - a22 * b02 + a23 * b01) * det;
      out.m08 = (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out.m09 = (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out.m10 = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      out.m11 = (a21 * b02 - a20 * b04 - a23 * b00) * det;
      out.m12 = (a11 * b07 - a10 * b09 - a12 * b06) * det;
      out.m13 = (a00 * b09 - a01 * b07 + a02 * b06) * det;
      out.m14 = (a31 * b01 - a30 * b03 - a32 * b00) * det;
      out.m15 = (a20 * b03 - a21 * b01 + a22 * b00) * det;
      return out;
    };
    var vec2 = {};
    vec2.transformMat4 = function(out, a, m) {
      var x = a.x, y = a.y;
      out.x = m.m00 * x + m.m04 * y + m.m12;
      out.y = m.m01 * x + m.m05 * y + m.m13;
      return out;
    };
    var math = {
      mat4: mat4,
      vec2: vec2
    };
    var _mat4_temp = math.mat4.create();
    var Button = cc.Class({
      extends: cc.Button,
      statics: {
        createNode: function createNode(params) {
          var node = new cc.Node();
          node.addComponent(zy.Sprite);
          zy.Sprite.updateNode(node, params);
          node.addComponent(zy.Button);
          zy.Button.updateNode(node, params);
          return node;
        },
        updateNode: function updateNode(node, params) {
          var button = node.getComponent(zy.Button);
          button || (button = node.getComponent(cc.Button));
          var eventHandler = params.eventHandler;
          params.hasOwnProperty("touchAction") && (button.touchAction = params.touchAction);
          params.hasOwnProperty("commonClickAudio") && (button.commonClickAudio = params.commonClickAudio);
          if (eventHandler) {
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = eventHandler.target;
            clickEventHandler.component = eventHandler.component;
            clickEventHandler.customEventData = eventHandler.customEventData;
            clickEventHandler.handler = eventHandler.handler;
            button.clickEvents.push(clickEventHandler);
          }
          params.hasOwnProperty("enableAutoGrayEffect") && (button.enableAutoGrayEffect = params.enableAutoGrayEffect);
          params.hasOwnProperty("interactable") && (button.interactable = params.interactable);
          zy.Node.updateNode(node, params);
        }
      },
      properties: {
        touchAction: {
          override: true,
          default: true,
          tooltip: "display custom action"
        },
        commonClickAudio: {
          default: true,
          tooltip: "common click audio"
        },
        isPolygonCollider: {
          default: false,
          tooltip: "is polygon collider"
        },
        polygonPoints: {
          visible: function visible() {
            return true === this.isPolygonCollider;
          },
          tooltip: false,
          default: function _default() {
            return [];
          },
          type: [ cc.Vec2 ]
        },
        brightTargets: {
          default: function _default() {
            return [];
          },
          type: [ cc.Node ]
        }
      },
      onLoad: function onLoad() {
        this.touchScaleAction = null;
        this.touchScaleRatio = .8;
        true;
        this.node.__hitTest = this.node._hitTest;
        this.node._hitTest = this._hitTest;
      },
      _polygonCheckRect: function _polygonCheckRect(_point) {
        var point = this.node.convertToNodeSpaceAR(_point);
        if (point.x < -this.node.width / 2 || point.x > this.node.width / 2 || point.y < -this.node.height / 2 || point.y > this.node.height / 2) return false;
        var i = void 0, j = void 0, c = false;
        var nvert = this.polygonPoints.length;
        for (i = 0, j = nvert - 1; i < nvert; j = i++) this.polygonPoints[i].y > point.y != this.polygonPoints[j].y > point.y && point.x < (this.polygonPoints[j].x - this.polygonPoints[i].x) * (point.y - this.polygonPoints[i].y) / (this.polygonPoints[j].y - this.polygonPoints[i].y) + this.polygonPoints[i].x && (c = !c);
        return c;
      },
      _polygonCheckIn: function _polygonCheckIn(point) {
        return !this.isPolygonCollider || this.polygonPoints.length <= 2 || this._polygonCheckRect(point);
      },
      _hitTest: function _hitTest(point, listener) {
        var w = this._contentSize.width, h = this._contentSize.height, cameraPt = cc.v2(), testPt = cc.v2();
        var camera = cc.Camera.findCamera(this);
        camera ? camera.getScreenToWorldPoint(point, cameraPt) : cameraPt.set(point);
        this._updateWorldMatrix();
        math.mat4.invert(_mat4_temp, this._worldMatrix);
        math.vec2.transformMat4(testPt, cameraPt, _mat4_temp);
        testPt.x += this._anchorPoint.x * w;
        testPt.y += this._anchorPoint.y * h;
        var minX = 0;
        var minY = 0;
        var button = this.getComponent(cc.Button);
        if (button && button.touchAction && button._pressed) {
          var offsetX = w * button.nodeScaleX * (1 - button.touchScaleRatio) / 2;
          var offsetY = h * button.nodeScaleY * (1 - button.touchScaleRatio) / 2;
          minX -= offsetX;
          minY -= offsetY;
          w += offsetX;
          h += offsetY;
        }
        if (testPt.x >= minX && testPt.y >= minY && testPt.x <= w && testPt.y <= h) {
          if (listener && listener.mask) {
            var mask = listener.mask;
            var parent = this;
            for (var i = 0; parent && i < mask.index; ++i, parent = parent.parent) ;
            if (parent === mask.node) {
              var comp = parent.getComponent(cc.Mask);
              return !comp || !comp.enabledInHierarchy || comp._hitTest(cameraPt);
            }
            listener.mask = null;
            return true;
          }
          return true;
        }
        return false;
      },
      _onTouchBegan: function _onTouchBegan(event) {
        this._super(event);
        if (!this.interactable || !this.enabledInHierarchy) return;
        this._setBrightEffect(true);
        if (!this.touchAction) return;
        if (this.touchScaleAction) {
          this.node.stopAction(this.touchScaleAction);
          this.node.scaleX = this.nodeScaleX;
          this.node.scaleY = this.nodeScaleY;
        } else {
          this.nodeScaleX = this.node.scaleX;
          this.nodeScaleY = this.node.scaleY;
        }
        this.touchScaleAction = cc.sequence(cc.scaleTo(.08, this.touchScaleRatio * this.nodeScaleX, this.touchScaleRatio * this.nodeScaleY), cc.callFunc(function() {
          this.touchScaleAction = null;
        }.bind(this)));
        this.node.runAction(this.touchScaleAction);
      },
      _onTouchMove: function _onTouchMove(event) {
        this._super(event);
        if (!this.interactable || !this.enabledInHierarchy || !this._pressed) return;
      },
      _onTouchEnded: function _onTouchEnded(event) {
        this.commonClickAudio && zy.audio.playEffect(zy.audio.Effect.CommonClick);
        if (!this.interactable || !this.enabledInHierarchy) {
          this._resetScale();
          return;
        }
        this._setBrightEffect(false);
        if (this._pressed) {
          cc.Component.EventHandler.emitEvents(this.clickEvents, event);
          this.node.emit("click", this);
        }
        this._pressed = false;
        this._updateState();
        event.stopPropagation();
        this._endTouchScaleAction();
      },
      _onTouchCancel: function _onTouchCancel() {
        this._setBrightEffect(false);
        this._super();
        if (!this.interactable || !this.enabledInHierarchy) {
          this._resetScale();
          return;
        }
        this._endTouchScaleAction();
      },
      _resetScale: function _resetScale() {
        if (!this.touchAction) return;
        if (this.touchScaleAction) {
          this.node.stopAction(this.touchScaleAction);
          this.touchScaleAction = null;
        }
        if (this.nodeScaleX && this.nodeScaleY) {
          this.node.scaleX = this.nodeScaleX;
          this.node.scaleY = this.nodeScaleY;
        }
      },
      _endTouchScaleAction: function _endTouchScaleAction() {
        if (!this.touchAction) return;
        if (this.touchScaleAction) {
          this.node.stopAction(this.touchScaleAction);
          this.node.scaleX = this.nodeScaleX * this.touchScaleRatio;
          this.node.scaleY = this.nodeScaleY * this.touchScaleRatio;
          this.touchScaleAction = null;
        }
        this.touchScaleAction = cc.sequence(cc.scaleTo(.08, 1.1 * this.nodeScaleX, 1.1 * this.nodeScaleY), cc.scaleTo(.08, .9 * this.nodeScaleX, .9 * this.nodeScaleY), cc.scaleTo(.08, 1 * this.nodeScaleX, 1 * this.nodeScaleY), cc.callFunc(function() {
          this.touchScaleAction = null;
        }.bind(this)));
        this.node.runAction(this.touchScaleAction);
      },
      _setBrightEffect: function _setBrightEffect(bright) {
        if (0 != this.brightTargets.length) {
          var shader = bright ? zy.shaderUtils.Effect.Bright : zy.shaderUtils.Effect.Normal;
          for (var i in this.brightTargets) {
            var _node = this.brightTargets[i];
            if (_node.getComponent(cc.Sprite)) {
              var component = _node.getComponent(cc.Sprite);
              var state = component.getState();
              bright && 1 != state ? zy.shaderUtils.setShader(component, shader) : component.setState(state);
            } else if (_node.getComponent(sp.Skeleton)) {
              var _component = _node.getComponent(sp.Skeleton);
              zy.shaderUtils.setShader(_component, shader);
            }
          }
        }
      },
      onDisable: function onDisable() {
        this._super();
        if (!this.touchAction) return;
        this._resetScale();
      }
    });
    zy.Button = module.exports = Button;
    cc._RF.pop();
  }, {} ],
  1: [ function(require, module, exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = "undefined" !== typeof Uint8Array ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len = b64.length;
      if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var validLen = b64.indexOf("=");
      -1 === validLen && (validLen = len);
      var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
      return [ validLen, placeHoldersLen ];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return 3 * (validLen + placeHoldersLen) / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return 3 * (validLen + placeHoldersLen) / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i;
      for (i = 0; i < len; i += 4) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = 255 & tmp;
      }
      if (2 === placeHoldersLen) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = 255 & tmp;
      }
      if (1 === placeHoldersLen) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = 255 & tmp;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[63 & num];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (255 & uint8[i + 2]);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      if (1 === extraBytes) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (2 === extraBytes) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }, {} ],
  2: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      var base64 = require("base64-js");
      var ieee754 = require("ieee754");
      var isArray = require("isarray");
      exports.Buffer = Buffer;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.TYPED_ARRAY_SUPPORT = void 0 !== global.TYPED_ARRAY_SUPPORT ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
      exports.kMaxLength = kMaxLength();
      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          arr.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function() {
              return 42;
            }
          };
          return 42 === arr.foo() && "function" === typeof arr.subarray && 0 === arr.subarray(1, 1).byteLength;
        } catch (e) {
          return false;
        }
      }
      function kMaxLength() {
        return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function createBuffer(that, length) {
        if (kMaxLength() < length) throw new RangeError("Invalid typed array length");
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = new Uint8Array(length);
          that.__proto__ = Buffer.prototype;
        } else {
          null === that && (that = new Buffer(length));
          that.length = length;
        }
        return that;
      }
      function Buffer(arg, encodingOrOffset, length) {
        if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) return new Buffer(arg, encodingOrOffset, length);
        if ("number" === typeof arg) {
          if ("string" === typeof encodingOrOffset) throw new Error("If encoding is specified then the first argument must be a string");
          return allocUnsafe(this, arg);
        }
        return from(this, arg, encodingOrOffset, length);
      }
      Buffer.poolSize = 8192;
      Buffer._augment = function(arr) {
        arr.__proto__ = Buffer.prototype;
        return arr;
      };
      function from(that, value, encodingOrOffset, length) {
        if ("number" === typeof value) throw new TypeError('"value" argument must not be a number');
        if ("undefined" !== typeof ArrayBuffer && value instanceof ArrayBuffer) return fromArrayBuffer(that, value, encodingOrOffset, length);
        if ("string" === typeof value) return fromString(that, value, encodingOrOffset);
        return fromObject(that, value);
      }
      Buffer.from = function(value, encodingOrOffset, length) {
        return from(null, value, encodingOrOffset, length);
      };
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        Buffer.prototype.__proto__ = Uint8Array.prototype;
        Buffer.__proto__ = Uint8Array;
        "undefined" !== typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(Buffer, Symbol.species, {
          value: null,
          configurable: true
        });
      }
      function assertSize(size) {
        if ("number" !== typeof size) throw new TypeError('"size" argument must be a number');
        if (size < 0) throw new RangeError('"size" argument must not be negative');
      }
      function alloc(that, size, fill, encoding) {
        assertSize(size);
        if (size <= 0) return createBuffer(that, size);
        if (void 0 !== fill) return "string" === typeof encoding ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
        return createBuffer(that, size);
      }
      Buffer.alloc = function(size, fill, encoding) {
        return alloc(null, size, fill, encoding);
      };
      function allocUnsafe(that, size) {
        assertSize(size);
        that = createBuffer(that, size < 0 ? 0 : 0 | checked(size));
        if (!Buffer.TYPED_ARRAY_SUPPORT) for (var i = 0; i < size; ++i) that[i] = 0;
        return that;
      }
      Buffer.allocUnsafe = function(size) {
        return allocUnsafe(null, size);
      };
      Buffer.allocUnsafeSlow = function(size) {
        return allocUnsafe(null, size);
      };
      function fromString(that, string, encoding) {
        "string" === typeof encoding && "" !== encoding || (encoding = "utf8");
        if (!Buffer.isEncoding(encoding)) throw new TypeError('"encoding" must be a valid string encoding');
        var length = 0 | byteLength(string, encoding);
        that = createBuffer(that, length);
        var actual = that.write(string, encoding);
        actual !== length && (that = that.slice(0, actual));
        return that;
      }
      function fromArrayLike(that, array) {
        var length = array.length < 0 ? 0 : 0 | checked(array.length);
        that = createBuffer(that, length);
        for (var i = 0; i < length; i += 1) that[i] = 255 & array[i];
        return that;
      }
      function fromArrayBuffer(that, array, byteOffset, length) {
        array.byteLength;
        if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError("'offset' is out of bounds");
        if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("'length' is out of bounds");
        array = void 0 === byteOffset && void 0 === length ? new Uint8Array(array) : void 0 === length ? new Uint8Array(array, byteOffset) : new Uint8Array(array, byteOffset, length);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = array;
          that.__proto__ = Buffer.prototype;
        } else that = fromArrayLike(that, array);
        return that;
      }
      function fromObject(that, obj) {
        if (Buffer.isBuffer(obj)) {
          var len = 0 | checked(obj.length);
          that = createBuffer(that, len);
          if (0 === that.length) return that;
          obj.copy(that, 0, 0, len);
          return that;
        }
        if (obj) {
          if ("undefined" !== typeof ArrayBuffer && obj.buffer instanceof ArrayBuffer || "length" in obj) {
            if ("number" !== typeof obj.length || isnan(obj.length)) return createBuffer(that, 0);
            return fromArrayLike(that, obj);
          }
          if ("Buffer" === obj.type && isArray(obj.data)) return fromArrayLike(that, obj.data);
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      function checked(length) {
        if (length >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
        return 0 | length;
      }
      function SlowBuffer(length) {
        +length != length && (length = 0);
        return Buffer.alloc(+length);
      }
      Buffer.isBuffer = function isBuffer(b) {
        return !!(null != b && b._isBuffer);
      };
      Buffer.compare = function compare(a, b) {
        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError("Arguments must be Buffers");
        if (a === b) return 0;
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
         case "hex":
         case "utf8":
         case "utf-8":
         case "ascii":
         case "latin1":
         case "binary":
         case "base64":
         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return true;

         default:
          return false;
        }
      };
      Buffer.concat = function concat(list, length) {
        if (!isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === list.length) return Buffer.alloc(0);
        var i;
        if (void 0 === length) {
          length = 0;
          for (i = 0; i < list.length; ++i) length += list[i].length;
        }
        var buffer = Buffer.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer.isBuffer(string)) return string.length;
        if ("undefined" !== typeof ArrayBuffer && "function" === typeof ArrayBuffer.isView && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) return string.byteLength;
        "string" !== typeof string && (string = "" + string);
        var len = string.length;
        if (0 === len) return 0;
        var loweredCase = false;
        for (;;) switch (encoding) {
         case "ascii":
         case "latin1":
         case "binary":
          return len;

         case "utf8":
         case "utf-8":
         case void 0:
          return utf8ToBytes(string).length;

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return 2 * len;

         case "hex":
          return len >>> 1;

         case "base64":
          return base64ToBytes(string).length;

         default:
          if (loweredCase) return utf8ToBytes(string).length;
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
        }
      }
      Buffer.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        var loweredCase = false;
        (void 0 === start || start < 0) && (start = 0);
        if (start > this.length) return "";
        (void 0 === end || end > this.length) && (end = this.length);
        if (end <= 0) return "";
        end >>>= 0;
        start >>>= 0;
        if (end <= start) return "";
        encoding || (encoding = "utf8");
        while (true) switch (encoding) {
         case "hex":
          return hexSlice(this, start, end);

         case "utf8":
         case "utf-8":
          return utf8Slice(this, start, end);

         case "ascii":
          return asciiSlice(this, start, end);

         case "latin1":
         case "binary":
          return latin1Slice(this, start, end);

         case "base64":
          return base64Slice(this, start, end);

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return utf16leSlice(this, start, end);

         default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
        }
      }
      Buffer.prototype._isBuffer = true;
      function swap(b, n, m) {
        var i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var i = 0; i < len; i += 2) swap(this, i, i + 1);
        return this;
      };
      Buffer.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer.prototype.toString = function toString() {
        var length = 0 | this.length;
        if (0 === length) return "";
        if (0 === arguments.length) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer.prototype.equals = function equals(b) {
        if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return 0 === Buffer.compare(this, b);
      };
      Buffer.prototype.inspect = function inspect() {
        var str = "";
        var max = exports.INSPECT_MAX_BYTES;
        if (this.length > 0) {
          str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
          this.length > max && (str += " ... ");
        }
        return "<Buffer " + str + ">";
      };
      Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (!Buffer.isBuffer(target)) throw new TypeError("Argument must be a Buffer");
        void 0 === start && (start = 0);
        void 0 === end && (end = target ? target.length : 0);
        void 0 === thisStart && (thisStart = 0);
        void 0 === thisEnd && (thisEnd = this.length);
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
        if (thisStart >= thisEnd && start >= end) return 0;
        if (thisStart >= thisEnd) return -1;
        if (start >= end) return 1;
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (0 === buffer.length) return -1;
        if ("string" === typeof byteOffset) {
          encoding = byteOffset;
          byteOffset = 0;
        } else byteOffset > 2147483647 ? byteOffset = 2147483647 : byteOffset < -2147483648 && (byteOffset = -2147483648);
        byteOffset = +byteOffset;
        isNaN(byteOffset) && (byteOffset = dir ? 0 : buffer.length - 1);
        byteOffset < 0 && (byteOffset = buffer.length + byteOffset);
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (!dir) return -1;
          byteOffset = 0;
        }
        "string" === typeof val && (val = Buffer.from(val, encoding));
        if (Buffer.isBuffer(val)) {
          if (0 === val.length) return -1;
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        }
        if ("number" === typeof val) {
          val &= 255;
          if (Buffer.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf) return dir ? Uint8Array.prototype.indexOf.call(buffer, val, byteOffset) : Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (void 0 !== encoding) {
          encoding = String(encoding).toLowerCase();
          if ("ucs2" === encoding || "ucs-2" === encoding || "utf16le" === encoding || "utf-16le" === encoding) {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i) {
          return 1 === indexSize ? buf[i] : buf.readUInt16BE(i * indexSize);
        }
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) if (read(arr, i) === read(val, -1 === foundIndex ? 0 : i - foundIndex)) {
            -1 === foundIndex && (foundIndex = i);
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            -1 !== foundIndex && (i -= i - foundIndex);
            foundIndex = -1;
          }
        } else {
          byteOffset + valLength > arrLength && (byteOffset = arrLength - valLength);
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
        return -1 !== this.indexOf(val, byteOffset, encoding);
      };
      Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (length) {
          length = Number(length);
          length > remaining && (length = remaining);
        } else length = remaining;
        var strLen = string.length;
        if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
        length > strLen / 2 && (length = strLen / 2);
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(2 * i, 2), 16);
          if (isNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function latin1Write(buf, string, offset, length) {
        return asciiWrite(buf, string, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer.prototype.write = function write(string, offset, length, encoding) {
        if (void 0 === offset) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (void 0 === length && "string" === typeof offset) {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else {
          if (!isFinite(offset)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          offset |= 0;
          if (isFinite(length)) {
            length |= 0;
            void 0 === encoding && (encoding = "utf8");
          } else {
            encoding = length;
            length = void 0;
          }
        }
        var remaining = this.length - offset;
        (void 0 === length || length > remaining) && (length = remaining);
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        encoding || (encoding = "utf8");
        var loweredCase = false;
        for (;;) switch (encoding) {
         case "hex":
          return hexWrite(this, string, offset, length);

         case "utf8":
         case "utf-8":
          return utf8Write(this, string, offset, length);

         case "ascii":
          return asciiWrite(this, string, offset, length);

         case "latin1":
         case "binary":
          return latin1Write(this, string, offset, length);

         case "base64":
          return base64Write(this, string, offset, length);

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return ucs2Write(this, string, offset, length);

         default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
        }
      };
      Buffer.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        return 0 === start && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end));
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
             case 1:
              firstByte < 128 && (codePoint = firstByte);
              break;

             case 2:
              secondByte = buf[i + 1];
              if (128 === (192 & secondByte)) {
                tempCodePoint = (31 & firstByte) << 6 | 63 & secondByte;
                tempCodePoint > 127 && (codePoint = tempCodePoint);
              }
              break;

             case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if (128 === (192 & secondByte) && 128 === (192 & thirdByte)) {
                tempCodePoint = (15 & firstByte) << 12 | (63 & secondByte) << 6 | 63 & thirdByte;
                tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343) && (codePoint = tempCodePoint);
              }
              break;

             case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if (128 === (192 & secondByte) && 128 === (192 & thirdByte) && 128 === (192 & fourthByte)) {
                tempCodePoint = (15 & firstByte) << 18 | (63 & secondByte) << 12 | (63 & thirdByte) << 6 | 63 & fourthByte;
                tempCodePoint > 65535 && tempCodePoint < 1114112 && (codePoint = tempCodePoint);
              }
            }
          }
          if (null === codePoint) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | 1023 & codePoint;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
        var res = "";
        var i = 0;
        while (i < len) res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
        return res;
      }
      function asciiSlice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) ret += String.fromCharCode(127 & buf[i]);
        return ret;
      }
      function latin1Slice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) ret += String.fromCharCode(buf[i]);
        return ret;
      }
      function hexSlice(buf, start, end) {
        var len = buf.length;
        (!start || start < 0) && (start = 0);
        (!end || end < 0 || end > len) && (end = len);
        var out = "";
        for (var i = start; i < end; ++i) out += toHex(buf[i]);
        return out;
      }
      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length; i += 2) res += String.fromCharCode(bytes[i] + 256 * bytes[i + 1]);
        return res;
      }
      Buffer.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = void 0 === end ? len : ~~end;
        if (start < 0) {
          start += len;
          start < 0 && (start = 0);
        } else start > len && (start = len);
        if (end < 0) {
          end += len;
          end < 0 && (end = 0);
        } else end > len && (end = len);
        end < start && (end = start);
        var newBuf;
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) newBuf[i] = this[i + start];
        }
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 256)) val += this[offset + i] * mul;
        return val;
      };
      Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset + --byteLength];
        var mul = 1;
        while (byteLength > 0 && (mul *= 256)) val += this[offset + --byteLength] * mul;
        return val;
      };
      Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        noAssert || checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 16777216 * this[offset + 3];
      };
      Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return 16777216 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 256)) val += this[offset + i] * mul;
        mul *= 128;
        val >= mul && (val -= Math.pow(2, 8 * byteLength));
        return val;
      };
      Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var i = byteLength;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) val += this[offset + --i] * mul;
        mul *= 128;
        val >= mul && (val -= Math.pow(2, 8 * byteLength));
        return val;
      };
      Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
        noAssert || checkOffset(offset, 1, this.length);
        if (!(128 & this[offset])) return this[offset];
        return -1 * (255 - this[offset] + 1);
      };
      Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return 32768 & val ? 4294901760 | val : val;
      };
      Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return 32768 & val ? 4294901760 | val : val;
      };
      Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        noAssert || checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        noAssert || checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        byteLength |= 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = 255 & value;
        while (++i < byteLength && (mul *= 256)) this[offset + i] = value / mul & 255;
        return offset + byteLength;
      };
      Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        byteLength |= 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var i = byteLength - 1;
        var mul = 1;
        this[offset + i] = 255 & value;
        while (--i >= 0 && (mul *= 256)) this[offset + i] = value / mul & 255;
        return offset + byteLength;
      };
      Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 1, 255, 0);
        Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value));
        this[offset] = 255 & value;
        return offset + 1;
      };
      function objectWriteUInt16(buf, value, offset, littleEndian) {
        value < 0 && (value = 65535 + value + 1);
        for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i);
      }
      Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
        } else objectWriteUInt16(this, value, offset, true);
        return offset + 2;
      };
      Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = 255 & value;
        } else objectWriteUInt16(this, value, offset, false);
        return offset + 2;
      };
      function objectWriteUInt32(buf, value, offset, littleEndian) {
        value < 0 && (value = 4294967295 + value + 1);
        for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) buf[offset + i] = value >>> 8 * (littleEndian ? i : 3 - i) & 255;
      }
      Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = 255 & value;
        } else objectWriteUInt32(this, value, offset, true);
        return offset + 4;
      };
      Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = 255 & value;
        } else objectWriteUInt32(this, value, offset, false);
        return offset + 4;
      };
      Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = 255 & value;
        while (++i < byteLength && (mul *= 256)) {
          value < 0 && 0 === sub && 0 !== this[offset + i - 1] && (sub = 1);
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = byteLength - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = 255 & value;
        while (--i >= 0 && (mul *= 256)) {
          value < 0 && 0 === sub && 0 !== this[offset + i + 1] && (sub = 1);
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 1, 127, -128);
        Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value));
        value < 0 && (value = 255 + value + 1);
        this[offset] = 255 & value;
        return offset + 1;
      };
      Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
        } else objectWriteUInt16(this, value, offset, true);
        return offset + 2;
      };
      Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = 255 & value;
        } else objectWriteUInt16(this, value, offset, false);
        return offset + 2;
      };
      Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else objectWriteUInt32(this, value, offset, true);
        return offset + 4;
      };
      Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648);
        value < 0 && (value = 4294967295 + value + 1);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = 255 & value;
        } else objectWriteUInt32(this, value, offset, false);
        return offset + 4;
      };
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        noAssert || checkIEEE754(buf, value, offset, 4, 3.4028234663852886e38, -3.4028234663852886e38);
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        noAssert || checkIEEE754(buf, value, offset, 8, 1.7976931348623157e308, -1.7976931348623157e308);
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer.prototype.copy = function copy(target, targetStart, start, end) {
        start || (start = 0);
        end || 0 === end || (end = this.length);
        targetStart >= target.length && (targetStart = target.length);
        targetStart || (targetStart = 0);
        end > 0 && end < start && (end = start);
        if (end === start) return 0;
        if (0 === target.length || 0 === this.length) return 0;
        if (targetStart < 0) throw new RangeError("targetStart out of bounds");
        if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        end > this.length && (end = this.length);
        target.length - targetStart < end - start && (end = target.length - targetStart + start);
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) for (i = len - 1; i >= 0; --i) target[i + targetStart] = this[i + start]; else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) for (i = 0; i < len; ++i) target[i + targetStart] = this[i + start]; else Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
        return len;
      };
      Buffer.prototype.fill = function fill(val, start, end, encoding) {
        if ("string" === typeof val) {
          if ("string" === typeof start) {
            encoding = start;
            start = 0;
            end = this.length;
          } else if ("string" === typeof end) {
            encoding = end;
            end = this.length;
          }
          if (1 === val.length) {
            var code = val.charCodeAt(0);
            code < 256 && (val = code);
          }
          if (void 0 !== encoding && "string" !== typeof encoding) throw new TypeError("encoding must be a string");
          if ("string" === typeof encoding && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        } else "number" === typeof val && (val &= 255);
        if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
        if (end <= start) return this;
        start >>>= 0;
        end = void 0 === end ? this.length : end >>> 0;
        val || (val = 0);
        var i;
        if ("number" === typeof val) for (i = start; i < end; ++i) this[i] = val; else {
          var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len];
        }
        return this;
      };
      var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = stringtrim(str).replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) str += "=";
        return str;
      }
      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, "");
      }
      function toHex(n) {
        if (n < 16) return "0" + n.toString(16);
        return n.toString(16);
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              if (i + 1 === length) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              (units -= 3) > -1 && bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = 65536 + (leadSurrogate - 55296 << 10 | codePoint - 56320);
          } else leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 6 | 192, 63 & codePoint | 128);
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
          } else {
            if (!(codePoint < 1114112)) throw new Error("Invalid code point");
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) byteArray.push(255 & str.charCodeAt(i));
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isnan(val) {
        return val !== val;
      }
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    "base64-js": 1,
    ieee754: 4,
    isarray: 3
  } ],
  3: [ function(require, module, exports) {
    var toString = {}.toString;
    module.exports = Array.isArray || function(arr) {
      return "[object Array]" == toString.call(arr);
    };
  }, {} ],
  4: [ function(require, module, exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = 8 * nBytes - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (;nBits > 0; e = 256 * e + buffer[offset + i], i += d, nBits -= 8) ;
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (;nBits > 0; m = 256 * m + buffer[offset + i], i += d, nBits -= 8) ;
      if (0 === e) e = 1 - eBias; else {
        if (e === eMax) return m ? NaN : Infinity * (s ? -1 : 1);
        m += Math.pow(2, mLen);
        e -= eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = 8 * nBytes - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || Infinity === value) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e += eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (;mLen >= 8; buffer[offset + i] = 255 & m, i += d, m /= 256, mLen -= 8) ;
      e = e << mLen | m;
      eLen += mLen;
      for (;eLen > 0; buffer[offset + i] = 255 & e, i += d, e /= 256, eLen -= 8) ;
      buffer[offset + i - d] |= 128 * s;
    };
  }, {} ],
  CSVParser: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aab19B0yLhC7JV+rBaX1XJH", "CSVParser");
    "use strict";
    var CSV = {
      DefaultOptions: {
        delim: ",",
        quote: '"',
        rowdelim: "\n"
      }
    };
    function CSVSyntaxError(msg) {
      this.message = msg;
      Error.captureStackTrace && Error.captureStackTrace(this, arguments.callee);
    }
    CSVSyntaxError.prototype = new Error();
    CSVSyntaxError.prototype.constructor = CSVSyntaxError;
    CSVSyntaxError.prototype.name = "CSVSyntaxError";
    "[object Error]" == new Error().toString() && (CSVSyntaxError.prototype.toString = function() {
      return this.name + ": " + this.message;
    });
    function CSVParser(str, options) {
      this.str = str;
      this.options = CSV.DefaultOptions;
      if (options) {
        options.delim = options.delim || CSV.DefaultOptions.delim;
        options.quote = options.quote || CSV.DefaultOptions.quote;
        if (1 != options.quote.length) throw new RangeError("options.quote should be only 1 char");
        options.rowdelim = options.rowdelim || CSV.DefaultOptions.rowdelim;
        this.options = options;
      }
      this.pos = 0;
      this.endpos = str.length;
      this.lineNo = 1;
    }
    CSVParser.prototype.next = function(s) {
      if (this.pos < this.endpos) {
        var len = s.length;
        if (this.str.substring(this.pos, this.pos + len) == s) {
          this.pos += len;
          return true;
        }
      }
      return false;
    };
    CSVParser.prototype.ahead = function(s) {
      if (this.pos < this.endpos) {
        if (!s) return true;
        var len = s.length;
        if (this.str.substring(this.pos, this.pos + len) == s) return true;
      }
      return false;
    };
    function countMatches(str, patt) {
      var count = 0;
      var i = str.indexOf(patt);
      while (i > 0) {
        count++;
        i = str.indexOf(patt, i + patt.length);
      }
      return count;
    }
    CSVParser.prototype.quotedField = function() {
      var mark = this.pos;
      if (!this.next(this.options.quote)) {
        this.pos = mark;
        return null;
      }
      var tmp = [];
      var start = this.pos;
      while (start < this.endpos) {
        var end = this.str.indexOf(this.options.quote, start);
        if (end < 0) throw new CSVSyntaxError("line " + this.lineNo + ": missing close quote");
        var part = this.str.substring(start, end);
        this.lineNo += countMatches(part, "\n");
        tmp.push(part);
        if (!(end + 1 < this.endpos && this.str.charAt(end + 1) == this.options.quote)) {
          this.pos = end + 1;
          break;
        }
        start = end + 2;
        end = this.str.indexOf(this.options.quote, start);
      }
      return tmp.join(this.options.quote);
    };
    CSVParser.prototype.normalField = function() {
      var begin = this.pos;
      var idelim = this.str.indexOf(this.options.delim, begin);
      idelim < 0 && (idelim = this.endpos);
      var irowdelim = this.str.indexOf(this.options.rowdelim, begin);
      irowdelim < 0 && (irowdelim = this.endpos);
      this.pos = Math.min(idelim, irowdelim);
      return this.str.substring(begin, this.pos);
    };
    CSVParser.prototype.nextField = function() {
      var tmp = this.quotedField();
      if (null !== tmp) return tmp;
      return this.normalField();
    };
    CSVParser.prototype.nextRow_0 = function() {
      var mark = this.pos;
      if (!this.next(this.options.delim)) {
        this.pos = mark;
        return null;
      }
      var tmp = this.nextField();
      if (null === tmp) {
        this.pos = mark;
        return null;
      }
      return tmp;
    };
    CSVParser.prototype.nextRow = function() {
      var ar = [];
      var mark = this.pos;
      var tmp = this.nextField();
      if (null === tmp) {
        this.pos = mark;
        return null;
      }
      ar.push(tmp);
      tmp = this.nextRow_0();
      while (null !== tmp) {
        ar.push(tmp);
        tmp = this.nextRow_0();
      }
      if (!(this.next(this.options.rowdelim) || !this.ahead())) throw new CSVSyntaxError("line " + this.lineNo + ": " + this.str.substring(Math.max(this.pos - 5, 0), this.pos + 5));
      "\n" == this.str.charAt(this.pos - 1) && this.lineNo++;
      return ar;
    };
    CSVParser.prototype.nextRowSimple = function() {
      var ar = [];
      var mark = this.pos;
      var tmp = this.nextField();
      if (null === tmp) {
        this.pos = mark;
        return null;
      }
      ar.push(tmp);
      tmp = this.nextRow_0();
      while (null !== tmp) {
        ar.push(tmp);
        tmp = this.nextRow_0();
      }
      if (!(this.next(this.options.rowdelim) || !this.ahead())) throw new CSVSyntaxError("line " + this.lineNo + ": " + this.str.substring(Math.max(this.pos - 5, 0), this.pos + 5));
      "\n" == this.str.charAt(this.pos - 1) && this.lineNo++;
      return 1 === ar.length ? ar[0] : ar;
    };
    CSVParser.prototype.hasNext = function() {
      return this.ahead();
    };
    CSV.CSVSyntaxError = CSVSyntaxError;
    CSV.CSVParser = CSVParser;
    CSV.parseOne = function(str, options) {
      var parser = new CSVParser(str, options);
      if (parser.hasNext()) return parser.nextRow();
      return null;
    };
    CSV.parseOneSimple = function(str, options) {
      var parser = new CSVParser(str, options);
      if (parser.hasNext()) return parser.nextRowSimple();
      return null;
    };
    Array.prototype.map || (Array.prototype.map = function(callback, thisArg) {
      var T, A, k;
      if (null === this) throw new TypeError(" this is null or not defined");
      var O = Object(this);
      var len = O.length >>> 0;
      if ("[object Function]" != {}.toString.call(callback)) throw new TypeError(callback + " is not a function");
      thisArg && (T = thisArg);
      A = new Array(len);
      k = 0;
      while (k < len) {
        var kValue, mappedValue;
        if (k in O) {
          kValue = O[k];
          mappedValue = callback.call(T, kValue, k, O);
          A[k] = mappedValue;
        }
        k++;
      }
      return A;
    });
    module.exports = CSVParser;
    cc._RF.pop();
  }, {} ],
  ClientConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "753fe0rGydIfKrO8zNwCJKu", "ClientConfig");
    "use strict";
    window.zy = window.zy || {};
    window.CHANNEL_ID = 201;
    window.DEBUG_OPEN = true;
    window.ZC_TRACK_API = "https://ad-ucapi.zhanchenggame.com/index.php?";
    101 == CHANNEL_ID || 102 == CHANNEL_ID ? window.ZC_TRACK_CFG = {
      product: "zgxqbtp",
      ios: {
        appid: "1492246824",
        appkey: "24b0ffbb0f4392230fb7ebdfb0e3e30e"
      },
      android: {
        appid: "com.zhanyou.towerdefensegame",
        appkey: "0cd1e64c9fa98c20d7216dcc165cb33b"
      }
    } : 201 != CHANNEL_ID && 202 != CHANNEL_ID || (window.ZC_TRACK_CFG = {
      product: "zgxqbtp",
      ios: {
        appid: "1492059932",
        appkey: "24b0ffbb0f4392230fb7ebdfb0e3e30e"
      },
      android: {
        appid: "com.zhanyou.inland.towerdefensegame",
        appkey: "0cd1e64c9fa98c20d7216dcc165cb33b"
      }
    });
    window.UPLTV_IOS_APPKEY = "e6c55d8be2d0";
    window.UPLTV_ANDROID_APPKEY = "889576bfeaf9";
    window.BASE_LOCAL_VERSION = "2020011302";
    window.VERSION_NAME = "1.0.0";
    window.HOT_UPDATE_SUB_PATH = "zy/download" + VERSION_NAME;
    cc._RF.pop();
  }, {} ],
  CoinsUpData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "98fe7nljxtJe5pNcVWhv+/4", "CoinsUpData");
    "use strict";
    var Utils = require("./../framework/common/UtilsOther");
    var DataBase = require("./DataBase");
    cc.Class({
      extends: DataBase,
      ctor: function ctor() {
        this.fileDir = "config/coinsUpData";
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
        this.dataLen = data.length;
        this.dataObj = Utils.arrayToDict(this.dataObj, "level");
      },
      getCoins: function getCoins(level) {
        var data = this.dataObj[level];
        var gold = data["gold"];
        return gold;
      },
      getPrice: function getPrice(level) {
        var data = this.dataObj[level];
        var price = data["price"];
        return price;
      },
      getMaxLevel: function getMaxLevel() {
        return this.dataLen;
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/common/UtilsOther": "UtilsOther",
    "./DataBase": "DataBase"
  } ],
  ConstData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "14638K9xV1Mg4d0HwW7hmJE", "ConstData");
    "use strict";
    var ZIndex = {
      POP_BASE: 1,
      LOADING: 888,
      ALERT: 998,
      TIP: 999,
      POP_MASK: -999,
      GUIDE: 900
    };
    var DesignSize = cc.size(750, 1334);
    var StaticKey = {
      SaveDataVersion: "V2",
      PlayerDataKey: "playerDataKey"
    };
    var AdKey = {
      VdFreePh: "video_reward_1",
      VdOfflineCoins: "video_reward_2",
      VdAddTime: "video_reward_3",
      VdLevelCoins: "video_reward_5",
      VdREVIVE: "video_reward_4",
      InterLevel: "interstitial_1",
      FreeCoins: "video_reward_6"
    };
    var OpenAdsKey = {
      video_reward_1: "941627716",
      video_reward_2: "942161521",
      video_reward_3: "941627750",
      video_reward_4: "941627756",
      video_reward_5: "941627759",
      video_reward_6: "941630566",
      interstitial_1: "941627740"
    };
    var OpenAdsKeyIOS = {
      video_reward_1: "942341544",
      video_reward_2: "942341562",
      video_reward_3: "942341570",
      video_reward_4: "942341573",
      video_reward_5: "942341577",
      video_reward_6: "942341579",
      interstitial_1: "942341589"
    };
    var Font = {
      FONT_NORMAL: "fonts/Montserrat-Bold"
    };
    cc.Class({
      statics: {
        ZIndex: ZIndex,
        DesignSize: DesignSize,
        StaticKey: StaticKey,
        AdKey: AdKey,
        OpenAdsKey: OpenAdsKey,
        OpenAdsKeyIOS: OpenAdsKeyIOS,
        MaxPhCounts1Day: 10,
        PhAdReward: 5,
        PhLevelReward: 3,
        PhCost: 5,
        PhDefault: 20,
        PhRecoverTime: 600,
        FreeCoinsCooling: 300,
        FreeCoinsMaxNum: 10,
        FreeCoinsMaxNum2: 4,
        FreeCoinsNeedAds: 5,
        InterAdLevel: 4,
        InterAdDuration: 2,
        Font: Font,
        init: function init(data) {},
        clean: function clean() {}
      }
    });
    cc._RF.pop();
  }, {} ],
  CornerMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b4036SOD9lMEK0kFdgVPqge", "CornerMng");
    "use strict";
    var _UI_CONFIG;
    function _defineProperty(obj, key, value) {
      key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      }) : obj[key] = value;
      return obj;
    }
    var CornerType = cc.Enum({
      CORNER_ID_UPGRADE_OTHER: 1001,
      CORNER_ID_UPGRADE_TOWER: 1010,
      CORNER_ID_FREE_COINS: 1020
    });
    var CornerConfig = {};
    var UI_CONFIG = (_UI_CONFIG = {}, _defineProperty(_UI_CONFIG, CornerType.CORNER_ID_UPGRADE_OTHER, {
      offset: cc.v2(-10, -10)
    }), _defineProperty(_UI_CONFIG, CornerType.CORNER_ID_UPGRADE_TOWER, {
      offset: cc.v2(-10, -10)
    }), _defineProperty(_UI_CONFIG, CornerType.CORNER_ID_FREE_COINS, {
      offset: cc.v2(-10, -10)
    }), _UI_CONFIG);
    var OPFlag = cc.Enum({
      NORMAL: 0,
      NEW: 1,
      UPDATE: 2,
      DELETE: 3
    });
    var CORNER_ZINDEX = 9999;
    cc.Class({
      extends: cc.Component,
      statics: {
        CornerType: CornerType,
        CornerConfig: CornerConfig,
        UI_CONFIG: UI_CONFIG,
        prepare: function prepare() {
          this.cornerList = {};
          this.cornerUI = {};
        },
        init: function init(data) {
          this.prepare();
          this.initData(data);
        },
        initData: function initData(data) {
          this.updateCorner(data);
        },
        registOn: function registOn(node, cornerType) {
          if (node && cc.isValid(node)) {
            this.cornerUI[cornerType] || (this.cornerUI[cornerType] = []);
            this.cornerUI[cornerType].push(node);
          }
          this.updateNode(cornerType);
        },
        registOff: function registOff(cornerType) {
          this.cornerUI[cornerType] && delete this.cornerUI[cornerType];
        },
        addClientCorner: function addClientCorner(id) {
          this.updateCorner([ {
            id: id,
            flag: OPFlag.NEW
          } ]);
        },
        deleteClientCorner: function deleteClientCorner(id) {
          this.updateCorner([ {
            id: id,
            flag: OPFlag.DELETE
          } ]);
        },
        getCornerData: function getCornerData(id) {
          return this.cornerList[id];
        },
        updateCorner: function updateCorner(data) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = void 0;
          try {
            for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var c = _step.value;
              var id = c.id || 0;
              c.flag == OPFlag.DELETE ? delete this.cornerList[id] : this.cornerList[id] = 1;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              !_iteratorNormalCompletion && _iterator.return && _iterator.return();
            } finally {
              if (_didIteratorError) throw _iteratorError;
            }
          }
          data && data.length > 0 && this.updateAllCorner();
        },
        updateAllCorner: function updateAllCorner() {
          for (var cornerType in this.cornerUI) this.updateNode(cornerType);
        },
        updateNode: function updateNode(cornerTpe) {
          var nodeList = this.cornerUI[cornerTpe];
          if (!nodeList) return;
          var getPosition = function getPosition(node, cfg) {
            var anchor = node.getAnchorPoint();
            var posX = node.width * (1 - anchor.x);
            var posY = node.height * (1 - anchor.y);
            if (cfg) {
              posX += cfg.offset.x;
              posY += cfg.offset.y;
            }
            return cc.v2(posX, posY);
          };
          var corner = this.checkCorner(cornerTpe);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = void 0;
          try {
            for (var _iterator2 = nodeList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var node = _step2.value;
              if (node && cc.isValid(node)) if (corner) {
                var cornerNode = node.getChildByName("CORNER_NODE_UI");
                if (!cornerNode) {
                  var uiCfg = UI_CONFIG[cornerTpe];
                  var srcUrl = uiCfg && uiCfg.src || "textures/common/red_dot";
                  var srcScale = uiCfg && uiCfg.scale || 1;
                  cornerNode = zy.Node.createNode({
                    zIndex: CORNER_ZINDEX,
                    name: "CORNER_NODE_UI",
                    parent: node
                  });
                  cornerNode.addComponent(zy.Sprite);
                  zy.Sprite.updateNode(cornerNode, {
                    url: srcUrl,
                    scale: srcScale
                  });
                  if (cc.isValid(cornerNode)) {
                    var cornerPos = getPosition(node, uiCfg);
                    cornerNode.position = cornerPos;
                  }
                }
                cc.isValid(cornerNode) && (cornerNode.active = true);
              } else {
                var _cornerNode = node.getChildByName("CORNER_NODE_UI");
                _cornerNode && cc.isValid(_cornerNode) && (_cornerNode.active = false);
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              !_iteratorNormalCompletion2 && _iterator2.return && _iterator2.return();
            } finally {
              if (_didIteratorError2) throw _iteratorError2;
            }
          }
        },
        checkCorner: function checkCorner(id) {
          if (this.cornerList[id]) return true;
          var cfg = CornerConfig[id] || [];
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = void 0;
          try {
            for (var _iterator3 = cfg[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _id = _step3.value;
              if (this.cornerList[_id]) return true;
              if (CornerConfig[_id] && this.checkCorner(_id)) return true;
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              !_iteratorNormalCompletion3 && _iterator3.return && _iterator3.return();
            } finally {
              if (_didIteratorError3) throw _iteratorError3;
            }
          }
          return false;
        },
        clean: function clean() {
          this.prepare();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  DataBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4bc8dkqHTBMcaHi1VJ5zUzI", "DataBase");
    "use strict";
    cc.Class({
      ctor: function ctor() {
        this.dataObj = null;
        this.fileDir = "";
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
      }
    });
    cc._RF.pop();
  }, {} ],
  DataMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "935052anXpNNrnw1ueUkI/J", "DataMng");
    "use strict";
    var TurretData = require("./TurretData");
    var TurretSecondData = require("./TurretSecondData");
    var TurretPriceData = require("./TurretPriceData");
    var UpStarGotData = require("./UpStarGotData");
    var UpStarNeedData = require("./UpStarNeedData");
    var CoinsUpData = require("./CoinsUpData");
    var HpUpData = require("./HpUpData");
    var TurretAttrData = require("./TurretAttrData");
    var EnemyAttrData = require("./EnemyAttrData");
    var LevelsData = require("./LevelsData");
    var LevelsEnemyWaveData = require("./LevelsEnemyWaveData");
    var BgColorData = require("./BgColorData");
    var UserData = require("./UserData");
    var DataBase = require("./DataBase");
    cc.Class({
      ctor: function ctor() {
        this.loadCounts = 0;
        this.turretData = new TurretData();
        this.turretSecondData = new TurretSecondData();
        this.turretPriceData = new TurretPriceData();
        this.upStarGotData = new UpStarGotData();
        this.upStarNeedData = new UpStarNeedData();
        this.coinsUpData = new CoinsUpData();
        this.hpUpData = new HpUpData();
        this.turretAttrData = new TurretAttrData();
        this.enemyAttrData = new EnemyAttrData();
        this.levelsData = new LevelsData();
        this.levelsEnemyWaveData = new LevelsEnemyWaveData();
        this.bgColorData = new BgColorData();
        this.userData = new UserData();
      },
      loadDataFromLocalFile: function loadDataFromLocalFile(progressCb, completeCb) {
        var _this = this;
        this.loadSavedData();
        var keys = Object.keys(this);
        cc.log("====keys11: %s", JSON.stringify(keys));
        keys = keys.filter(function(k) {
          return _this.hasOwnProperty(k) && _this[k] instanceof DataBase;
        });
        cc.log("====keys22: %s", JSON.stringify(keys));
        var _loop = function _loop(key) {
          var obj = _this[key];
          var fileName = obj.fileDir;
          cc.loader.loadRes(fileName, cc.JsonAsset, function(err, data) {
            err ? cc.error("load local data: " + fileName + ", error: " + err) : obj.initData && obj.initData.call(obj, data.json);
            _this.loadCounts++;
            progressCb && progressCb(_this.loadCounts, keys.length);
            _this.loadCounts >= keys.length && completeCb && completeCb();
          });
        };
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;
            _loop(key);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            !_iteratorNormalCompletion && _iterator.return && _iterator.return();
          } finally {
            if (_didIteratorError) throw _iteratorError;
          }
        }
      },
      loadSavedData: function loadSavedData() {
        this.userData.loadData();
      },
      saveDataToLocal: function saveDataToLocal() {
        this.userData.saveData();
      }
    });
    cc._RF.pop();
  }, {
    "./BgColorData": "BgColorData",
    "./CoinsUpData": "CoinsUpData",
    "./DataBase": "DataBase",
    "./EnemyAttrData": "EnemyAttrData",
    "./HpUpData": "HpUpData",
    "./LevelsData": "LevelsData",
    "./LevelsEnemyWaveData": "LevelsEnemyWaveData",
    "./TurretAttrData": "TurretAttrData",
    "./TurretData": "TurretData",
    "./TurretPriceData": "TurretPriceData",
    "./TurretSecondData": "TurretSecondData",
    "./UpStarGotData": "UpStarGotData",
    "./UpStarNeedData": "UpStarNeedData",
    "./UserData": "UserData"
  } ],
  DebugPop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cc370fUVNhEQaYOTe7seOky", "DebugPop");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        normalEffPF: cc.Prefab,
        p1: cc.Node,
        p2: cc.Node
      },
      start: function start() {
        this.pp1 = this.p1.getComponent("ProgressBar");
        this.pp2 = this.p2.getComponent("ProgressCircle");
      },
      btnCb: function btnCb(sender, name) {
        switch (name) {
         case "d1":
          zy.ui.alert.show({
            okText: i18n.t("btn_ok"),
            cancleText: i18n.t("btn_cancle"),
            okCb: function okCb() {
              zy.ui.tip.show("ok");
            },
            cancleCb: function cancleCb() {
              zy.ui.tip.show("cancle");
            },
            text: "\u8fd9\u662f\u5355\u884c\u6587\u672c\u6837\u5f0f"
          });
          break;

         case "d2":
          zy.ui.alert.show({
            okText: i18n.t("btn_ok"),
            okCb: function okCb() {
              zy.ui.tip.show("ok");
            },
            cancleCb: function cancleCb() {
              zy.ui.tip.show("cancle");
            },
            text: "\u8fd9\u662f\u591a\u884c\u6587\u672c\u663e\u793a\u6837\u5f0f\u8fd9\u662f\u591a\u884c\u6587\u672c\u663e\u793a\u6837\u5f0f\u8fd9\u662f\u591a\u884c\u6587\u672c\u663e\u793a\u6837\u5f0f\u8fd9\u662f\u591a\u884c\u6587\u672c\u663e\u793a\u6837\u5f0f\u8fd9\u662f\u591a\u884c\u6587\u672c"
          });
          break;

         case "d3":
          zy.ui.tip.show("\u6211\u662ftips\uff0c\u6211\u662ftips");
          break;

         case "d4":
          this.pp1.progress = 0;
          this.pp1.setProgressBarToPercent(1, 1, function() {
            zy.ui.tip.show("\u5b8c\u6210");
          });
          break;

         case "d5":
          this.pp2.progress = 0;
          this.pp2.setProgressBarToPercent(1, 1, function() {
            zy.ui.tip.show("\u5b8c\u6210");
          });
        }
      },
      closeCallback: function closeCallback() {
        zy.director.closePop(this.popName);
      }
    });
    cc._RF.pop();
  }, {} ],
  Device: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fa52e/qG61Knro2fTFzJpmm", "Device");
    "use strict";
    var PACKAGENAME = "com/zygame/utils/PlatformUtils";
    cc.Class({
      extends: cc.Component,
      statics: {
        model: "unknown",
        mac: "00:00:00:00:00:00",
        openudid: "",
        deviceToken: "",
        osName: "",
        osVersion: "",
        ssid: "",
        language: "cn",
        region: "unknown",
        odin: "",
        idfa: "",
        idfaEnable: "",
        advertisingId: "",
        androidId: "",
        locationInfo: {},
        ipAddress: "0.0.0.0",
        init: function init() {
          var PROCUDT_ID = "com.game.test";
          this.osName = cc.sys.os;
          this.osVersion = cc.sys.osVersion;
          this.language = cc.sys.language;
          this.openudid = PROCUDT_ID;
          var info = "{}";
          if (cc.sys.isNative) {
            cc.sys.os === cc.sys.OS_ANDROID ? info = jsb.reflection.callStaticMethod(PACKAGENAME, "getDeviceInfo", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS && (info = jsb.reflection.callStaticMethod("PlatformUtils", "getDeviceInfo"));
            this.initNative(JSON.parse(info));
          } else this.initHtml();
        },
        initHtml: function initHtml() {},
        initNative: function initNative(deviceInfo) {
          for (var key in deviceInfo) this[key] = deviceInfo[key];
          cc.log(JSON.stringify(deviceInfo));
        },
        vibratorShort: function vibratorShort() {
          getVibrator(25);
        },
        vibratorLong: function vibratorLong() {
          getVibrator(100);
        },
        getVibrator: function getVibrator(t) {
          if (!zy.dataMng.userData.vibOn) return;
          cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAME, "vibrator", "(I)V", t) : cc.sys.os == cc.sys.OS_IOS;
        },
        clean: function clean() {
          cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT && wx.hideAllNonBaseMenuItem();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Director: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a2a55RhwyZHfo0GMcF0EnW3", "Director");
    "use strict";
    cc.Class({
      extends: cc.Component,
      statics: {
        scene: null,
        sceneCanvas: null,
        sceneComponent: null,
        isBackground: null,
        toBackgroundOSTime: null,
        activePops: null,
        EventType: {
          ALL_SINGLE_POP_CLOSE: "ALL_SINGLE_POP_CLOSE"
        },
        init: function init(initComponent) {
          this.scene = null;
          this.sceneCanvas = null;
          this.sceneComponent = null;
          this.sceneName = null;
          this.uiRoot = null;
          this.isBackground = false;
          this.activePops = [];
          this.persistRootNodeList = [];
          cc.game.on(cc.game.EVENT_HIDE, this.onEventHide, this);
          cc.game.on(cc.game.EVENT_SHOW, this.onEventShow, this);
          if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.onShow(this.onWXGShow.bind(this));
            wx.onHide(this.onWXGHide.bind(this));
          }
          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          cc.director.on(cc.Director.EVENT_AFTER_DRAW, this.onAfterDraw, this);
          cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
          cc.view.setResizeCallback(function() {
            cc.log("setResizeCallback");
          }.bind(this));
        },
        onEventHide: function onEventHide() {
          if (!this.isBackground) {
            this.isBackground = true;
            this.toBackgroundOSTime = zy.utils.time();
            cc.log("\u8fdb\u5165\u540e\u53f0:", this.toBackgroundOSTime);
            zy.dataMng.saveDataToLocal();
          }
        },
        onEventShow: function onEventShow() {
          if (this.isBackground) {
            this.isBackground = false;
            var toForegroundOSTime = zy.utils.time();
            var interval = toForegroundOSTime - this.toBackgroundOSTime;
            cc.log("\u8fdb\u5165\u524d\u53f0-interval:", interval);
          }
        },
        onWXGHide: function onWXGHide(res) {
          cc.log("onWXGHide", res);
        },
        onWXGShow: function onWXGShow(res) {
          cc.log("onWXGShow", res);
        },
        onKeyDown: function onKeyDown(event) {
          cc.log("onKeyDown", event.keyCode);
          switch (event.keyCode) {
           case cc.KEY.back:
          }
        },
        onAfterDraw: function onAfterDraw() {},
        preloadScene: function preloadScene(sceneName, onProgress, onLoad) {
          cc.director.preloadScene(sceneName, onProgress, onLoad);
        },
        loadScene: function loadScene(sceneName, params, onLaunched) {
          zy.director.closeAllPops();
          window[this.sceneName + "Scene"] = null;
          cc.director.loadScene(sceneName, function() {
            cc.log("loadScene:", sceneName);
            this.scene = cc.director.getScene();
            this.sceneCanvas = this.scene.getChildByName("Canvas");
            this.uiRoot = this.sceneCanvas.getChildByName("UIRoot") || this.sceneCanvas;
            this.sceneName = sceneName;
            this.sceneComponent = this.sceneCanvas.getComponent(sceneName + "Scene");
            if (this.sceneComponent) {
              this.sceneComponent.sceneName = sceneName + "Scene";
              this.sceneComponent.init && this.sceneComponent.init(params);
            }
            window[this.sceneName + "Scene"] = this.sceneComponent;
            onLaunched && onLaunched(this.scene, this.sceneCanvas, this.sceneComponent);
          }.bind(this));
        },
        getSceneName: function getSceneName() {
          return this.sceneName ? this.sceneName : "";
        },
        getSceneComponent: function getSceneComponent() {
          return this.sceneComponent;
        },
        getScene: function getScene() {
          return this.scene;
        },
        getSceneCanvas: function getSceneCanvas() {
          return this.sceneCanvas;
        },
        getUiRoot: function getUiRoot() {
          return this.uiRoot;
        },
        createPop: function createPop(popName, params, prefab) {
          params = params || {};
          var componentName = "";
          var popNameSpArr = popName.split("/");
          popNameSpArr.length > 0 && (componentName = popNameSpArr[popNameSpArr.length - 1]);
          cc.log("createPop:" + popName, componentName);
          if (this.isPopActive(popName)) {
            cc.log("\u5f53\u524dPOP\u5df2\u5b58\u5728:" + popName);
            return;
          }
          var initFunc = function(prefab) {
            var popNode = cc.instantiate(prefab);
            popNode.position = cc.v2(0, 0);
            popNode.zIndex = this.getTopPopZIndex() + 10;
            popNode.parent = this.uiRoot;
            var popData = {
              popName: popName,
              popNode: popNode
            };
            this.activePops.push(popData);
            var popBase = popNode.getComponent("PopBase");
            popData.popBase = popBase;
            popBase.initBase(params, popName);
            popData.popComponent = popBase.component;
          }.bind(this);
          prefab ? initFunc(prefab) : cc.loader.loadRes(popName, cc.Prefab, null, function(err, prefab) {
            if (err) {
              cc.log(popName + "\u52a0\u8f7d\u5931\u8d25", err);
              return;
            }
            initFunc(prefab);
          }.bind(this));
        },
        getTopPopData: function getTopPopData(_topIndex) {
          var topIndex = _topIndex || 1;
          return this.activePops[this.activePops.length - topIndex];
        },
        getTopPopZIndex: function getTopPopZIndex() {
          var topPop = this.getTopPopData();
          if (topPop) return topPop.popNode.zIndex;
          return zy.constData.ZIndex.POP_BASE;
        },
        getPopData: function getPopData(popName) {
          for (var i in this.activePops) {
            var popData = this.activePops[i];
            if (popData.popName == popName) return popData;
          }
        },
        getPop: function getPop(popName) {
          var popData = this.getPopData(popName);
          if (popData) return popData.popComponent;
        },
        isPopActive: function isPopActive(popName) {
          if (this.getPopData(popName)) return true;
          return false;
        },
        getActivePops: function getActivePops() {
          return this.activePops;
        },
        closePop: function closePop(popName) {
          cc.log("closePop:" + popName);
          var popData = this.getPopData(popName);
          if (popData) {
            for (var i in this.activePops) {
              var _popData = this.activePops[i];
              if (popData == _popData) {
                this.activePops.splice(i, 1);
                break;
              }
            }
            var popBase = popData.popBase;
            popBase.cleanBase();
            0 != this.activePops.length || popBase.onClosedCallback || zy.event.emit(zy.director.EventType.ALL_SINGLE_POP_CLOSE);
          }
        },
        closeAllPops: function closeAllPops() {
          while (this.activePops.length > 0) {
            var idx = this.activePops.length - 1;
            var popData = this.activePops[idx];
            var popName = popData.popName;
            cc.log("closeAllPops:" + popName);
            this.activePops.splice(idx, 1);
            var popBase = popData.popBase;
            popBase.cleanBase();
          }
          this.activePops = [];
        },
        addPersistRootNode: function addPersistRootNode(node) {
          cc.game.addPersistRootNode(node);
          this.persistRootNodeList.push(node);
        },
        cleanPersistRootNode: function cleanPersistRootNode() {
          for (var index in this.persistRootNodeList) {
            var node = this.persistRootNodeList[index];
            cc.game.removePersistRootNode(node);
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Encrypt: [ function(require, module, exports) {
    (function(Buffer) {
      "use strict";
      cc._RF.push(module, "d01c6ZTO/VDm45rxncbJpPQ", "Encrypt");
      "use strict";
      var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      (function(name, definition) {
        "undefined" !== typeof exports && "undefined" !== typeof module ? module.exports = definition() : "function" === typeof define && "object" === _typeof(define.amd) ? define(definition) : "function" === typeof define && "object" === _typeof(define.petal) ? define(name, [], definition) : this[name] = definition();
      })("encryptjs", function(encryptjs) {
        var rl = void 0;
        encryptjs = {
          version: "1.0.0"
        };
        encryptjs.init = function() {
          console.log("--------------------Applying Encryption Algorithm------------------ ");
        };
        var Algo = null;
        "undefined" != typeof module && module.exports && (Algo = require("./Algo"));
        encryptjs.encrypt = function(plaintext, password, nBits) {
          var blockSize = 16;
          if (!(128 == nBits || 192 == nBits || 256 == nBits)) return "";
          plaintext = String(plaintext).utf8Encode();
          password = String(password).utf8Encode();
          var nBytes = nBits / 8;
          var pwBytes = new Array(nBytes);
          for (var i = 0; i < nBytes; i++) pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
          var key = Algo.cipher(pwBytes, Algo.keyExpansion(pwBytes));
          key = key.concat(key.slice(0, nBytes - 16));
          var counterBlock = new Array(blockSize);
          var nonce = new Date().getTime();
          var nonceMs = nonce % 1e3;
          var nonceSec = Math.floor(nonce / 1e3);
          var nonceRnd = Math.floor(65535 * Math.random());
          for (var _i = 0; _i < 2; _i++) counterBlock[_i] = nonceMs >>> 8 * _i & 255;
          for (var _i2 = 0; _i2 < 2; _i2++) counterBlock[_i2 + 2] = nonceRnd >>> 8 * _i2 & 255;
          for (var _i3 = 0; _i3 < 4; _i3++) counterBlock[_i3 + 4] = nonceSec >>> 8 * _i3 & 255;
          var ctrTxt = "";
          for (var _i4 = 0; _i4 < 8; _i4++) ctrTxt += String.fromCharCode(counterBlock[_i4]);
          var keySchedule = Algo.keyExpansion(key);
          var blockCount = Math.ceil(plaintext.length / blockSize);
          var ciphertxt = new Array(blockCount);
          for (var b = 0; b < blockCount; b++) {
            for (var c = 0; c < 4; c++) counterBlock[15 - c] = b >>> 8 * c & 255;
            for (var _c = 0; _c < 4; _c++) counterBlock[15 - _c - 4] = b / 4294967296 >>> 8 * _c;
            var cipherCntr = Algo.cipher(counterBlock, keySchedule);
            var blockLength = b < blockCount - 1 ? blockSize : (plaintext.length - 1) % blockSize + 1;
            var cipherChar = new Array(blockLength);
            for (var _i5 = 0; _i5 < blockLength; _i5++) {
              cipherChar[_i5] = cipherCntr[_i5] ^ plaintext.charCodeAt(b * blockSize + _i5);
              cipherChar[_i5] = String.fromCharCode(cipherChar[_i5]);
            }
            ciphertxt[b] = cipherChar.join("");
          }
          var ciphertext = ctrTxt + ciphertxt.join("");
          ciphertext = encryptjs.base64Encode(ciphertext);
          return ciphertext;
        };
        encryptjs.decrypt = function(ciphertext, password, nBits) {
          var blockSize = 16;
          if (!(128 == nBits || 192 == nBits || 256 == nBits)) return "";
          ciphertext = encryptjs.base64Decode(String(ciphertext));
          password = String(password).utf8Encode();
          var nBytes = nBits / 8;
          var pwBytes = new Array(nBytes);
          for (var i = 0; i < nBytes; i++) pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
          var key = Algo.cipher(pwBytes, Algo.keyExpansion(pwBytes));
          key = key.concat(key.slice(0, nBytes - 16));
          var counterBlock = new Array(8);
          var ctrTxt = ciphertext.slice(0, 8);
          for (var _i6 = 0; _i6 < 8; _i6++) counterBlock[_i6] = ctrTxt.charCodeAt(_i6);
          var keySchedule = Algo.keyExpansion(key);
          var nBlocks = Math.ceil((ciphertext.length - 8) / blockSize);
          var ct = new Array(nBlocks);
          for (var b = 0; b < nBlocks; b++) ct[b] = ciphertext.slice(8 + b * blockSize, 8 + b * blockSize + blockSize);
          ciphertext = ct;
          var plaintxt = new Array(ciphertext.length);
          for (var _b = 0; _b < nBlocks; _b++) {
            for (var c = 0; c < 4; c++) counterBlock[15 - c] = _b >>> 8 * c & 255;
            for (var _c2 = 0; _c2 < 4; _c2++) counterBlock[15 - _c2 - 4] = (_b + 1) / 4294967296 - 1 >>> 8 * _c2 & 255;
            var cipherCntr = Algo.cipher(counterBlock, keySchedule);
            var plaintxtByte = new Array(ciphertext[_b].length);
            for (var _i7 = 0; _i7 < ciphertext[_b].length; _i7++) {
              plaintxtByte[_i7] = cipherCntr[_i7] ^ ciphertext[_b].charCodeAt(_i7);
              plaintxtByte[_i7] = String.fromCharCode(plaintxtByte[_i7]);
            }
            plaintxt[_b] = plaintxtByte.join("");
          }
          var plaintext = plaintxt.join("");
          plaintext = plaintext.utf8Decode();
          return plaintext;
        };
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        encryptjs.base64Encode = function(input) {
          var output = "";
          var chr1 = void 0, chr2 = void 0, chr3 = void 0, enc1 = void 0, enc2 = void 0, enc3 = void 0, enc4 = void 0;
          var i = 0;
          input = encryptjs._utf8_encode(input);
          while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = (3 & chr1) << 4 | chr2 >> 4;
            enc3 = (15 & chr2) << 2 | chr3 >> 6;
            enc4 = 63 & chr3;
            isNaN(chr2) ? enc3 = enc4 = 64 : isNaN(chr3) && (enc4 = 64);
            output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
          }
          return output;
        };
        encryptjs.base64Decode = function(input) {
          var output = "";
          var chr1 = void 0, chr2 = void 0, chr3 = void 0;
          var enc1 = void 0, enc2 = void 0, enc3 = void 0, enc4 = void 0;
          var i = 0;
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
          while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (15 & enc2) << 4 | enc3 >> 2;
            chr3 = (3 & enc3) << 6 | enc4;
            output += String.fromCharCode(chr1);
            64 != enc3 && (output += String.fromCharCode(chr2));
            64 != enc4 && (output += String.fromCharCode(chr3));
          }
          output = encryptjs._utf8_decode(output);
          return output;
        };
        encryptjs._utf8_encode = function(string) {
          string = string.replace(/\r\n/g, "\n");
          var utftext = "";
          for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) utftext += String.fromCharCode(c); else if (c > 127 && c < 2048) {
              utftext += String.fromCharCode(c >> 6 | 192);
              utftext += String.fromCharCode(63 & c | 128);
            } else {
              utftext += String.fromCharCode(c >> 12 | 224);
              utftext += String.fromCharCode(c >> 6 & 63 | 128);
              utftext += String.fromCharCode(63 & c | 128);
            }
          }
          return utftext;
        };
        encryptjs._utf8_decode = function(utftext) {
          var string = "";
          var i = 0;
          var c = 0;
          var c1 = 0;
          var c2 = 0;
          var c3 = 0;
          while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
              string += String.fromCharCode(c);
              i++;
            } else if (c > 191 && c < 224) {
              c2 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode((31 & c) << 6 | 63 & c2);
              i += 2;
            } else {
              c2 = utftext.charCodeAt(i + 1);
              c3 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode((15 & c) << 12 | (63 & c2) << 6 | 63 & c3);
              i += 3;
            }
          }
          return string;
        };
        encryptjs.getTextEncryptAndSaveToTextFile = function(filePath, password, nBits) {
          if (!rl) throw Error("Command line not supported on this platform");
          rl.question("Enter the text to be encrypted: ", function(answer) {
            console.log("'" + answer + "' This text will be encrypted and stored in a text file 'encrypted.txt'");
            var cipherText = encryptjs.encrypt(answer, password, nBits);
            rl.close();
          });
        };
        encryptjs.getTextEncryptAndSaveToJSONFile = function(filePath, password, nBits) {
          if (!rl) throw Error("Command line not supported on this platform");
          rl.question("Enter the text to be encrypted: ", function(answer) {
            console.log("'" + answer + "' This text will be encrypted and stored in a text file 'encrypted.txt'");
            var cipherText = encryptjs.encrypt(answer, password, nBits);
            encryptjs.writeCipherTextToJSON(filePath, {
              EncryptedText: cipherText
            }, function() {
              console.log("'encryptedText.JSON' File created in your local directory, if not present refresh your project");
            });
            rl.close();
          });
        };
        encryptjs.writeCipherTextToJSON = function(file, obj, options, callback) {
          if (null == callback) {
            callback = options;
            options = {};
          }
          var spaces = "object" === ("undefined" === typeof options ? "undefined" : _typeof(options)) && null !== options && "spaces" in options ? options.spaces : this.spaces;
          var str = "";
          try {
            str = JSON.stringify(obj, options ? options.replacer : null, spaces) + "\n";
          } catch (err) {
            if (callback) return callback(err, null);
          }
        };
        "undefined" == typeof String.prototype.utf8Encode && (String.prototype.utf8Encode = function() {
          return unescape(encodeURIComponent(this));
        });
        "undefined" == typeof String.prototype.utf8Decode && (String.prototype.utf8Decode = function() {
          try {
            return decodeURIComponent(escape(this));
          } catch (e) {
            return this;
          }
        });
        "undefined" == typeof String.prototype.base64Encode && (String.prototype.base64Encode = function() {
          if ("undefined" != typeof btoa) return btoa(this);
          if ("undefined" != typeof Buffer) return new Buffer(this, "utf8").toString("base64");
          throw new Error("No Base64 Encode");
        });
        "undefined" == typeof String.prototype.base64Decode && (String.prototype.base64Decode = function() {
          if ("undefined" != typeof atob) return atob(this);
          if ("undefined" != typeof Buffer) return new Buffer(this, "base64").toString("utf8");
          throw new Error("No Base64 Decode");
        });
        encryptjs.init();
        return encryptjs;
      });
      cc._RF.pop();
    }).call(this, require("buffer").Buffer);
  }, {
    "./Algo": "Algo",
    buffer: 2
  } ],
  EnemyAttrData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "13c2ayStb1OxKw43gQsFz9u", "EnemyAttrData");
    "use strict";
    var Utils = require("./../framework/common/UtilsOther");
    var DataBase = require("./DataBase");
    cc.Class({
      extends: DataBase,
      ctor: function ctor() {
        this.fileDir = "config/enemyAttrData";
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
        this.dataLen = data.length;
        this.dataObj = Utils.arrayToDict(this.dataObj, "id");
      },
      getTurretAttr: function getTurretAttr(id) {
        var data = this.dataObj[id];
        return data;
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/common/UtilsOther": "UtilsOther",
    "./DataBase": "DataBase"
  } ],
  FBLogger: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dce77Wl/ahBRrf7Vl0Wh2d/", "FBLogger");
    "use strict";
    var PACKAGENAMEFB = "com/zygame/utils/FBHelper";
    cc.Class({
      statics: {
        logEventLevel: function logEventLevel(level) {
          if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "logEventLevel", "(I)V", level);
          cc.sys.os == cc.sys.OS_IOS;
        },
        logEventWatchAds: function logEventWatchAds(adName) {
          if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "logEventWatchAD", "(Ljava/lang/String;)V", adName);
          cc.sys.os == cc.sys.OS_IOS;
        },
        logEventClickButton: function logEventClickButton(btName) {
          if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "logEventClickButton", "(Ljava/lang/String;)V", btName);
          cc.sys.os == cc.sys.OS_IOS;
        },
        logEvent: function logEvent(eventName, key, value) {
          if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "logEvent", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", eventName, key, value);
          cc.sys.os == cc.sys.OS_IOS;
        },
        logEventName: function logEventName(eventName) {
          if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "logEventName", "(Ljava/lang/String;)V", eventName);
          cc.sys.os == cc.sys.OS_IOS;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  GameHttp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8afc1m51YpB/YM/mIkdgeO+", "GameHttp");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var DEFAULT_HTTP_TIMEOUT = 5e3;
    var HttpError = {
      TIMEOUT: "timeout",
      ERROR: "error",
      ABORT: "abort"
    };
    var HttpResponse = cc.Class({
      ctor: function ctor() {
        this.xhr_ = null;
        this.error_ = null;
      },
      init: function init(xhr) {
        this.xhr_ = xhr;
      },
      isOk: function isOk() {
        var xhr = this.xhr_;
        return 4 == xhr.readyState && xhr.status >= 200 && xhr.status <= 207;
      },
      getBody: function getBody() {
        return this.xhr_.response;
      },
      setError: function setError(error) {
        this.error_ = error;
      },
      getError: function getError() {
        return this.error_;
      },
      getHeaders: function getHeaders() {},
      getHeader: function getHeader(name) {}
    });
    var registerEventsForXmlHttpRequest_ = function registerEventsForXmlHttpRequest_(xhr, callback) {
      var r = new HttpResponse();
      r.init(xhr);
      xhr.onreadystatechange = function(evt) {
        4 == xhr.readyState && callback(r);
      };
      xhr.ontimeout = function(evt) {
        r.setError(HttpError.TIMEOUT);
        callback(r);
      };
      xhr.onerror = function(evt) {
        r.setError(HttpError.ERROR);
        callback(r);
      };
      xhr.onabort = function(evt) {
        r.setError(HttpError.ABORT);
        callback(r);
      };
    };
    var httpGet = function httpGet(url, callback, opt_timeout) {
      var xhr = cc.loader.getXMLHttpRequest();
      xhr.timeout = opt_timeout || DEFAULT_HTTP_TIMEOUT;
      callback && registerEventsForXmlHttpRequest_(xhr, callback);
      xhr.open("GET", url, true);
      xhr.send();
    };
    var httpPost = function httpPost(url, data, callback, opt_timeout) {
      var xhr = cc.loader.getXMLHttpRequest();
      xhr.timeout = opt_timeout || DEFAULT_HTTP_TIMEOUT;
      callback && registerEventsForXmlHttpRequest_(xhr, callback);
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      cc.log("===>httpPost: " + ("undefined" === typeof data ? "undefined" : _typeof(data)) + " | " + JSON.stringify(data));
      xhr.send(data);
    };
    module.exports = {
      httpGet: httpGet,
      httpPost: httpPost
    };
    cc._RF.pop();
  }, {} ],
  GameNetwork: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6d3b90F1ltPQqEXXz0L8FEx", "GameNetwork");
    "use strict";
    var GameWebSocket = require("./GameWebSocket");
    var GameProtocols = require("./GameProtocols");
    var response_state = {
      ERROR_OK: "0"
    };
    var NetworkCallback = cc.Class({
      properties: {
        request: null,
        callback: null
      },
      init: function init(request, callback) {
        this.request = request;
        this.callback = callback;
      }
    });
    var GameNetwork = cc.Class({
      extends: GameWebSocket.GameWebSocketDelegate,
      ctor: function ctor() {
        this._socket = null;
        this._delegate = null;
        this._requestSequenceId = 0;
        this.pushResponseCallback = {};
        this._networkCallbacks = {};
      },
      setDelegate: function setDelegate(delegate) {
        this._delegate = delegate;
      },
      registerPushResponseCallback: function registerPushResponseCallback(act, callback) {
        this.pushResponseCallback[act] = callback;
      },
      isSocketOpened: function isSocketOpened() {
        return this._socket && this._socket.getState() == GameWebSocket.GameWebSocketState.OPEN;
      },
      isSocketClosed: function isSocketClosed() {
        return null == this._socket;
      },
      connect: function connect(url) {
        cc.log("webSocketUrls=" + url);
        this._requestSequenceId = 0;
        this._socket = new GameWebSocket.GameWebSocket();
        this._socket.init(url, this);
        this._socket.connect();
      },
      closeConnect: function closeConnect() {
        this._socket && this._socket.close();
      },
      onSocketOpen: function onSocketOpen() {
        cc.log("Socket:onOpen");
        this._delegate && this._delegate.onNetworkOpen && this._delegate.onNetworkOpen();
      },
      onSocketError: function onSocketError() {
        cc.log("Socket:onError");
      },
      onSocketClosed: function onSocketClosed(reason) {
        cc.log("Socket:onClose", reason);
        this._socket && this._socket.close();
        this._socket = null;
        this._delegate && this._delegate.onNetworkClose && this._delegate.onNetworkClose();
      },
      onSocketMessage: function onSocketMessage(msg) {
        this._onResponse(msg);
      },
      _onResponse: function _onResponse(responseData) {
        cc.log("response->resp:", responseData);
        var responseJson = JSON.parse(responseData);
        var responseClass = GameProtocols.response_classes[responseJson.act];
        var response = new responseClass();
        response.loadData(responseJson.data);
        response.act = responseJson.act;
        response.seq = responseJson.seq;
        response.err = responseJson.err;
        response.ts = responseJson.ts;
        var ignoreError = false;
        if (-1 != response.seq) {
          var pushCallback = this.pushResponseCallback[response.act];
          pushCallback && pushCallback(response);
          var callbackObj = this._networkCallbacks[response.seq];
          callbackObj && (ignoreError = callbackObj.callback(response));
        }
        if (response.err && response.err != response_state.ERROR_OK && !ignoreError) if (response.is_async) ; else {
          var msg = responseJson.msg;
          cc.log("server err " + msg);
        }
      },
      sendRequest: function sendRequest(request, opt_callback) {
        request.seq = ++this._requestSequenceId;
        if (opt_callback) {
          this._networkCallbacks[request.seq] = new NetworkCallback();
          this._networkCallbacks[request.seq].init(request, opt_callback);
        }
        this._sendSocketRequest(false, request);
      },
      sendRequestNoData: function sendRequestNoData(request, opt_callback) {
        request.seq = ++this._requestSequenceId;
        if (opt_callback) {
          this._networkCallbacks[request.seq] = new NetworkCallback();
          this._networkCallbacks[request.seq].init(request, opt_callback);
        }
        this._sendSocketRequest(true, request);
      },
      _sendSocketRequest: function _sendSocketRequest(isNoData, req) {
        cc.assert(this._socket);
        if (this.isSocketOpened()) {
          var msg = null;
          msg = isNoData ? JSON.stringify({
            seq: req.seq,
            act: req.act
          }) : JSON.stringify({
            seq: req.seq,
            act: req.act,
            data: req
          });
          cc.log("WebSocketDelegate::send->" + msg);
          this._socket.send(msg);
        }
      }
    });
    module.exports = GameNetwork;
    cc._RF.pop();
  }, {
    "./GameProtocols": "GameProtocols",
    "./GameWebSocket": "GameWebSocket"
  } ],
  GameProtocols: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ee9afyHSeJGaahOsOe7M5FZ", "GameProtocols");
    "use strict";
    var BaseProtocol = cc.Class({
      ctor: function ctor() {
        this.act = "";
        this.seq = 0;
        this.err = 0;
        this.is_async = false;
      }
    });
    var BaseRequest = cc.Class({
      extends: BaseProtocol
    });
    var BaseResponse = cc.Class({
      extends: BaseProtocol,
      loadData: function loadData(data) {
        var key;
        for (key in data) {
          if (!this.hasOwnProperty(key)) continue;
          void 0 !== data[key] && null !== data[key] && (this[key] = data[key]);
        }
      }
    });
    var HeartRequest = cc.Class({
      extends: BaseRequest,
      ctor: function ctor() {
        this.act = "heart";
        this.t = -1;
      }
    });
    var HeartResponse = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "heart";
        this.t = -1;
      }
    });
    var RandomMatchRequest = cc.Class({
      extends: BaseRequest,
      ctor: function ctor() {
        this.act = "rmatch";
        this.uid = 0;
      }
    });
    var RandomMatchResponse = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "rmatch";
        this.rid = 0;
        this.black = 0;
        this.other = 0;
        this.order = 0;
      }
    });
    var CreateRoomRequest = cc.Class({
      extends: BaseRequest,
      ctor: function ctor() {
        this.act = "createRoom";
      }
    });
    var CreateRoomResponse = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "createRoom";
        this.rid = 0;
      }
    });
    var JoinRoomRequest = cc.Class({
      extends: BaseRequest,
      ctor: function ctor() {
        this.act = "joinRoom";
        this.rid = 0;
      }
    });
    var PlayChessRequest = cc.Class({
      extends: BaseRequest,
      ctor: function ctor() {
        this.act = "playChess";
        this.cid = 0;
        this.lastBedIndex = 0;
        this.dest = {
          index: 0,
          x: 0,
          y: 0
        };
      }
    });
    var PushPlayChess = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.order = 0;
        this.act = "playChess";
        this.uid = 0;
        this.cid = 0;
        this.winner = 0;
        this.dest = {
          index: 0,
          x: 0,
          y: 0
        };
      }
    });
    var ChatRequest = cc.Class({
      extends: BaseRequest,
      ctor: function ctor() {
        this.act = "chat";
        this.msg = "";
        this.uid = "";
      }
    });
    var PushChat = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "chat";
        this.msg = "";
        this.uid = "";
      }
    });
    var SelectChessRequest = cc.Class({
      extends: BaseRequest,
      ctor: function ctor() {
        this.act = "selectChess";
        this.cid = 0;
      }
    });
    var PushSelectChess = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "selectChess";
        this.cid = 0;
      }
    });
    var LoginRequest = cc.Class({
      extends: BaseRequest,
      ctor: function ctor() {
        this.act = "login";
        this.token = "";
        this.origin = 0;
        this.os = "";
        this.osVersion = "";
        this.deviceModel = "";
        this.channelId = 0;
        this.idfa = "";
        this.androidId = "";
        this.googleAid = "";
        this.appVersion = "";
        this.packName = "";
        this.language = "";
        this.locale = "";
        this.uid = 0;
      }
    });
    var LoginResponse = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "login";
        this.token = "";
        this.self = {
          isBlack: false,
          chessDic: {}
        };
        this.other = {
          isBlack: false,
          chessDic: {},
          uid: 0
        };
        this.order = 0;
        this.rid = 0;
        this.isReconn = false;
      }
    });
    var LogoutRequest = cc.Class({
      extends: BaseRequest,
      ctor: function ctor() {
        this.act = "logout";
      }
    });
    var LogoutResponse = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "logout";
      }
    });
    var BindFacebookRequest = cc.Class({
      extends: BaseRequest,
      ctor: function ctor() {
        this.act = "bindFb";
        this.token = "";
      }
    });
    var BindFacebookResponse = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "bindFb";
        this.me = 0;
        this.friends = 0;
      }
    });
    var RankRequest = cc.Class({
      extends: BaseRequest,
      ctor: function ctor() {
        this.act = "rankboard";
        this.type = 0;
      }
    });
    var RankResponse = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "rankboard";
        this.myRank = 0;
        this.men = [];
      }
    });
    var PushExitRoom = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "exitRoom";
        this.uid = 0;
      }
    });
    var PushSendSpResponse = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "sendSpNotify";
        this.friend = null;
      }
    });
    var PushTakeSpResponse = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "takeSpNotify";
        this.friend = null;
      }
    });
    var PushSyncFriendInfo = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "friendInfoSync";
        this.friend = null;
      }
    });
    var DebugChangeMeRequest = cc.Class({
      extends: BaseRequest,
      ctor: function ctor() {
        this.act = "cmdTest";
        this.cmd = "";
      }
    });
    var DebugChangeMeResponse = cc.Class({
      extends: BaseResponse,
      ctor: function ctor() {
        this.act = "cmdTest";
        this.me = {};
        this.spInterval = null;
        this.spStepLeftTime = null;
        this.farmDailyOut = null;
        this.farmCoins = null;
        this.farmInterval = null;
        this.buildings = null;
      }
    });
    var response_classes = {
      login: LoginResponse,
      logout: LogoutResponse,
      bindFb: BindFacebookResponse,
      rankboard: RankResponse,
      heart: HeartResponse,
      rmatch: RandomMatchResponse,
      createRoom: CreateRoomResponse,
      chat: PushChat,
      exitRoom: PushExitRoom,
      playChess: PushPlayChess,
      selectChess: PushSelectChess,
      sendSpNotify: PushSendSpResponse,
      takeSpNotify: PushTakeSpResponse,
      friendInfoSync: PushSyncFriendInfo,
      cmdTest: DebugChangeMeResponse
    };
    module.exports = {
      LoginRequest: LoginRequest,
      LoginResponse: LoginResponse,
      LogoutRequest: LogoutRequest,
      LogoutResponse: LogoutResponse,
      BindFacebookRequest: BindFacebookRequest,
      BindFacebookResponse: BindFacebookResponse,
      RankRequest: RankRequest,
      RankResponse: RankResponse,
      HeartRequest: HeartRequest,
      HeartResponse: HeartResponse,
      ChatRequest: ChatRequest,
      RandomMatchRequest: RandomMatchRequest,
      RandomMatchResponse: RandomMatchResponse,
      PlayChessRequest: PlayChessRequest,
      SelectChessRequest: SelectChessRequest,
      CreateRoomRequest: CreateRoomRequest,
      CreateRoomResponse: CreateRoomResponse,
      JoinRoomRequest: JoinRoomRequest,
      DebugChangeMeRequest: DebugChangeMeRequest,
      DebugChangeMeResponse: DebugChangeMeResponse,
      PushChat: PushChat,
      PushExitRoom: PushExitRoom,
      PushPlayChess: PushPlayChess,
      PushSendSpResponse: PushSendSpResponse,
      PushTakeSpResponse: PushTakeSpResponse,
      PushSyncFriendInfo: PushSyncFriendInfo,
      response_classes: response_classes
    };
    cc._RF.pop();
  }, {} ],
  GameScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4611nzBqVO8YKrPLXLp1Ox", "GameScene");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        debugBtn: cc.Node
      },
      init: function init() {},
      start: function start() {
        this.debugBtn.active = DEBUG_OPEN;
        zy.audio.playBGM(zy.audio.BGM.MAIN);
      },
      debugCall: function debugCall() {
        zy.director.createPop("prefabs/pop/DebugPop");
      },
      settingCall: function settingCall() {
        zy.director.createPop("prefabs/pop/SettingPop");
      }
    });
    cc._RF.pop();
  }, {} ],
  GameWebSocket: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7ba25vCzDxHGK1L/2U83Qx/", "GameWebSocket");
    "use strict";
    var GameWebSocketState = cc.Enum({
      CONNECTING: 1,
      OPEN: 2,
      CLOSING: 3,
      CLOSED: 4
    });
    var GameWebSocketDelegate = cc.Class({
      onSocketOpen: function onSocketOpen() {},
      onSocketMessage: function onSocketMessage(data) {},
      onSocketError: function onSocketError() {},
      onSocketClosed: function onSocketClosed(reason) {}
    });
    var GameWebSocketInterface = cc.Class({
      connect: function connect() {},
      send: function send() {},
      close: function close() {},
      getState: function getState() {}
    });
    var GameWebSocket = cc.Class({
      extends: GameWebSocketInterface,
      properties: {
        _address: null,
        _delegate: null,
        _webSocket: null
      },
      init: function init(address, delegate) {
        this._address = address;
        this._delegate = delegate;
        this._webSocket = null;
      },
      connect: function connect() {
        cc.log("connect to " + this._address);
        var ws = this._webSocket = new WebSocket(this._address);
        ws.onopen = this._delegate.onSocketOpen.bind(this._delegate);
        ws.onmessage = function(param) {
          this._delegate.onSocketMessage(param.data);
        }.bind(this);
        ws.onerror = this._delegate.onSocketError.bind(this._delegate);
        ws.onclose = function(param) {
          this._delegate.onSocketClosed(param.reason);
        }.bind(this);
      },
      send: function send(stringOrBinary) {
        this._webSocket.send(stringOrBinary);
      },
      close: function close() {
        if (!this._webSocket) return;
        try {
          this._webSocket.close();
        } catch (err) {
          cc.log("error while closing webSocket", err.toString());
        }
        this._webSocket = null;
      },
      getState: function getState() {
        if (this._webSocket) switch (this._webSocket.readyState) {
         case WebSocket.OPEN:
          return GameWebSocketState.OPEN;

         case WebSocket.CONNECTING:
          return GameWebSocketState.CONNECTING;

         case WebSocket.CLOSING:
          return GameWebSocketState.CLOSING;

         case WebSocket.CLOSED:
          return GameWebSocketState.CLOSED;
        }
        return GameWebSocketState.CLOSED;
      }
    });
    module.exports = {
      GameWebSocketState: GameWebSocketState,
      GameWebSocketDelegate: GameWebSocketDelegate,
      GameWebSocketInterface: GameWebSocketInterface,
      GameWebSocket: GameWebSocket
    };
    cc._RF.pop();
  }, {} ],
  Guide: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "758846ZgwpGZLjqN2ZhXxS8", "Guide");
    "use strict";
    var OPEN_GUIDE = true;
    var RENEW = {
      0: [ 1001, 1002 ],
      1: [ 1001, 1003, 1004 ],
      2: [ 1005, 1006, 1007, 1008, 1009 ],
      3: [ 1010, 1011 ],
      4: [ 1012, 1013 ]
    };
    var CFG = {};
    CFG[1001] = function() {
      zy.guide.hit({
        name: "guide_button2",
        showMask: true,
        click: function click() {
          zy.guide.showNext();
        }
      });
    };
    CFG[1002] = function() {
      zy.guide.slideTower({
        name: "guide_weapon_2",
        showMask: true,
        click: function click() {
          zy.guide.showNext();
        }
      });
    };
    CFG[1003] = function() {
      zy.guide.hit({
        name: "guide_weapon_0",
        showMask: true,
        click: function click() {
          zy.guide.showNext();
        }
      });
    };
    CFG[1004] = function() {
      zy.guide.hit({
        name: "guide_upgradeBtn",
        showMask: true,
        click: function click() {
          zy.guide.showNext();
        }
      });
    };
    CFG[1005] = function() {
      zy.guide.hit({
        name: "guide_skill_1",
        showMask: true,
        click: function click() {
          zy.guide.showNext();
        }
      });
    };
    CFG[1006] = function() {
      zy.guide.hit({
        name: "guide_skill_2",
        showMask: true,
        click: function click() {
          setTimeout(function() {
            zy.guide.showNext();
          }, 500);
        }
      });
    };
    CFG[1007] = function() {
      zy.guide.hit({
        name: "guide_skill_3",
        showMask: true,
        click: function click() {
          setTimeout(function() {
            zy.guide.showNext();
          }, 500);
        }
      });
    };
    CFG[1008] = function() {
      zy.guide.hit({
        name: "guide_button_add_time",
        showMask: true,
        click: function click() {
          setTimeout(function() {
            zy.guide.showNext();
          }, 500);
        }
      });
    };
    CFG[1009] = function() {
      zy.guide.look({
        name: "guide_skill_progressBar",
        showMask: true,
        click: function click() {
          zy.guide.showNext();
        }
      });
    };
    CFG[1010] = function() {
      zy.guide.hit({
        name: "guide_button1",
        showMask: true,
        click: function click() {
          zy.guide.showNext();
        }
      });
    };
    CFG[1011] = function() {
      zy.guide.hit({
        name: "guide_upgrade_hp",
        showMask: true,
        click: function click() {
          zy.guide.showNext();
        }
      });
    };
    CFG[1012] = function() {
      zy.guide.hit({
        name: "guide_button3",
        showMask: true,
        click: function click() {
          zy.guide.showNext();
        }
      });
    };
    CFG[1013] = function() {
      zy.guide.hit({
        name: "guide_free_coins",
        showMask: true,
        click: function click() {
          setTimeout(function() {
            zy.guide.showNext();
          }, 500);
        }
      });
    };
    cc.Class({
      extends: cc.Component,
      statics: {
        OPEN_GUIDE: OPEN_GUIDE,
        CFG: CFG,
        init: function init(params) {
          cc.log("===init guide: ", params);
          this.step = params.step;
          this.stepList = [];
          this.cb = null;
          1001 == this.step && (this.step = 0);
          this.OPEN_GUIDE ? this.openStatus = true : this.openStatus = false;
          this.node = null;
          this.maskNode = null;
        },
        setStep: function setStep(step) {
          this.step = step;
        },
        setOpenStatus: function setOpenStatus(status) {
          this.openStatus = status;
        },
        getOpenStatus: function getOpenStatus() {
          return this.openStatus;
        },
        getNextStep: function getNextStep() {
          if (!zy.guide.getOpenStatus() || !OPEN_GUIDE) return;
          return this.stepList[0];
        },
        addStep: function addStep(step) {
          0 == this.stepList.length && this.stepList.push(step);
        },
        checkGuide: function checkGuide() {
          var data = RENEW[this.step];
          if (data) {
            this.stepList = zy.utils.clone(data);
            zy.guide.showNext();
          }
        },
        showNext: function showNext(step, node) {
          if (!zy.guide.getOpenStatus() || !OPEN_GUIDE) return;
          if (step) this.CFG[step](node); else {
            var _step = this.stepList.shift();
            if (null == _step) zy.guide.clean(); else {
              this.step = _step;
              cc.log("zy.guide.show", _step);
              this.CFG[this.step]();
            }
          }
        },
        hit: function hit(params) {
          var _this = this;
          this.hideMask();
          var name = params.name;
          var hitNode = zy.ui.seekChildByName(zy.director.getSceneCanvas(), name);
          if (!hitNode) {
            var seq = cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
              _this.hit(params);
            }));
            this.node.runAction(seq);
            return;
          }
          var lastScale = hitNode.scale;
          var lastPos = hitNode.position;
          var lastParent = hitNode.parent;
          var lastZIndex = hitNode.zIndex;
          var worldPos = lastParent.convertToWorldSpaceAR(lastPos);
          hitNode.parent = this.node;
          hitNode.position = this.node.convertToNodeSpaceAR(worldPos);
          hitNode.zIndex = 1;
          hitNode.scale = lastScale;
          var animation = hitNode.getComponent(cc.Animation);
          animation && animation.play("guide_shake", 0);
          cc.log("===oriPos:" + JSON.stringify(lastPos));
          cc.log("===newPos:" + JSON.stringify(hitNode.position));
          var maskNode = null;
          params.showMask && (maskNode = this.createMaskNode(hitNode, this.node, params.digging));
          var hitClick = function hitClick() {
            cc.log("===click guide hit node");
            hitNode.off(cc.Node.EventType.TOUCH_START, hitClick, _this, true);
            hitNode.parent = lastParent;
            hitNode.position = lastPos;
            hitNode.zIndex = lastZIndex;
            if (animation) {
              animation.setCurrentTime(0, "guide_shake");
              animation.stop("guide_shake");
            }
            cc.isValid(maskNode) && maskNode.destroy();
            params.click && params.click();
          };
          hitNode.on(cc.Node.EventType.TOUCH_START, hitClick, this, true);
        },
        slideTower: function slideTower(params) {
          var _this2 = this;
          this.hideMask();
          var name = params.name;
          var hitNode = zy.ui.seekChildByName(zy.director.getSceneCanvas(), name);
          if (!hitNode) {
            var seq = cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
              _this2.slideTower(params);
            }));
            this.node.runAction(seq);
            return;
          }
          var lastScale = hitNode.scale;
          var lastPos = hitNode.position;
          var lastParent = hitNode.parent;
          var lastZIndex = hitNode.zIndex;
          var worldPos = lastParent.convertToWorldSpaceAR(lastPos);
          hitNode.parent = this.node;
          hitNode.position = this.node.convertToNodeSpaceAR(worldPos);
          hitNode.zIndex = 1;
          hitNode.scale = lastScale;
          var maskNode = null;
          params.showMask && (maskNode = this.createMaskNode(hitNode, this.node, params.digging));
          var hitClick = function hitClick() {
            _this2.node.off(cc.Node.EventType.TOUCH_START, hitClick, _this2, true);
            hitNode.parent = lastParent;
            hitNode.position = lastPos;
            hitNode.zIndex = lastZIndex;
            _this2.slideAniNode.destroy();
            cc.isValid(maskNode) && maskNode.destroy();
            params.click && params.click();
          };
          cc.loader.loadRes("MainGame/Ui/gun_drag", cc.Prefab, function(err, pf) {
            if (err) cc.log(err); else {
              var aniNode = _this2.slideAniNode = cc.instantiate(pf);
              aniNode.zIndex = 2;
              aniNode.parent = _this2.node;
              aniNode.position = _this2.node.convertToNodeSpaceAR(hitNode.parent.convertToWorldSpaceAR(hitNode.position));
              aniNode.getComponent(cc.Animation).play("guide_drag", 0);
              _this2.node.on(cc.Node.EventType.TOUCH_START, hitClick, _this2, true);
            }
          });
        },
        look: function look(params) {
          var _this3 = this;
          this.hideMask();
          var name = params.name;
          var hitNode = zy.ui.seekChildByName(zy.director.getSceneCanvas(), name);
          if (!hitNode) {
            var seq = cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
              _this3.hit(params);
            }));
            this.node.runAction(seq);
            return;
          }
          var lastScale = hitNode.scale;
          var lastPos = hitNode.position;
          var lastParent = hitNode.parent;
          var lastZIndex = hitNode.zIndex;
          var worldPos = lastParent.convertToWorldSpaceAR(lastPos);
          hitNode.parent = this.node;
          hitNode.position = this.node.convertToNodeSpaceAR(worldPos);
          hitNode.zIndex = 1;
          hitNode.scale = lastScale;
          cc.log("===oriPos:" + JSON.stringify(lastPos));
          cc.log("===newPos:" + JSON.stringify(hitNode.position));
          var maskNode = null;
          params.showMask && (maskNode = this.createMaskNode(hitNode, this.node, params.digging));
          var hitClick = function hitClick() {
            cc.log("===click guide look node");
            _this3.node.off(cc.Node.EventType.TOUCH_START, hitClick, _this3, true);
            hitNode.parent = lastParent;
            hitNode.position = lastPos;
            hitNode.zIndex = lastZIndex;
            cc.isValid(maskNode) && maskNode.destroy();
            params.click && params.click();
          };
          this.node.on(cc.Node.EventType.TOUCH_START, hitClick, this, true);
        },
        createMaskNode: function createMaskNode(hitNode, parent, digging) {
          var maskNode = zy.Node.createNode({
            name: "guideMaskNode",
            parent: parent,
            position: cc.v2(0, 0)
          });
          if (digging) {
            var cr = Math.max(hitNode.width, hitNode.height);
            var hitPos = hitNode.parent.convertToWorldSpaceAR(hitNode.position);
            var pos = maskNode.convertToNodeSpaceAR(hitPos);
            var mask = maskNode.addComponent(cc.Mask);
            mask.type = cc.Mask.Type.RECT;
            mask.inverted = true;
            mask._graphics.lineWidth = 1;
            mask._graphics.strokeColor = cc.color(255, 0, 0);
            mask._graphics.fillColor = cc.color(0, 255, 0);
            mask._graphics.circle(pos.x, pos.y, .5 * cr);
            mask._graphics.fill();
            mask._graphics.stroke();
          }
          var blackNode = zy.Node.createNode({
            parent: maskNode,
            position: cc.v2(0, 0)
          });
          blackNode.addComponent(zy.Sprite);
          zy.Sprite.updateNode(blackNode, {
            url: "textures/common/guide/guide_mask",
            width: 1.5 * zy.constData.DesignSize.width,
            height: 1.5 * zy.constData.DesignSize.height
          });
          return maskNode;
        },
        checkStatus: function checkStatus() {
          if (!this.openStatus) return;
          cc.isValid(this.node) || (this.node = zy.Button.createNode({
            name: "guideNode",
            zIndex: zy.constData.ZIndex.GUIDE,
            parent: zy.director.getUiRoot(),
            touchAction: false,
            width: 2 * zy.constData.DesignSize.width,
            height: 2 * zy.constData.DesignSize.height
          }));
        },
        hideMask: function hideMask() {
          cc.isValid(this.maskNode) && (this.maskNode.active = false);
        },
        showMask: function showMask() {
          if (!this.openStatus) return;
          this.maskNode.active = true;
        },
        isShowMask: function isShowMask() {
          return !(!cc.isValid(this.node) || !cc.isValid(this.maskNode)) && (this.node.active && this.maskNode.active);
        },
        clean: function clean() {
          this.openStatus = false;
          this.step = -1;
          if (cc.isValid(this.node)) {
            this.node.destroy();
            this.node = null;
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  HotUpdate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d989cs4cdZFtq7PriQKE9uC", "HotUpdate");
    "use strict";
    var UpdatePanel = require("./UpdatePanel");
    cc.Class({
      extends: cc.Component,
      properties: {
        panel: UpdatePanel,
        manifestUrl: {
          url: cc.RawAsset,
          default: null
        },
        versionUrl: {
          url: cc.RawAsset,
          default: null
        },
        updateUI: cc.Node,
        _updating: false,
        _canRetry: false,
        _storagePath: ""
      },
      checkCb: function checkCb(event) {
        cc.log("Code: " + event.getEventCode());
        var hasNew = false;
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          cc.log("No local manifest file found, hot update skipped.");
          cc.director.loadScene("InitScene");
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          cc.log("Fail to download manifest file, hot update skipped.");
          cc.director.loadScene("InitScene");
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          cc.log("Already up to date with the latest remote version.");
          cc.director.loadScene("InitScene");
          break;

         case jsb.EventAssetsManager.NEW_VERSION_FOUND:
          this.panel.fileProgress.progress = 0;
          this.panel.byteProgress.progress = 0;
          hasNew = true;
          break;

         default:
          return;
        }
        this._am.setEventCallback(null);
        this._checkListener = null;
        this._updating = false;
        hasNew && this.show();
      },
      updateCb: function updateCb(event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          this.panel.info.string = "No local manifest file found, hot update skipped.";
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_PROGRESSION:
          this.panel.byteProgress.progress = event.getPercent();
          this.panel.fileProgress.progress = event.getPercentByFile();
          this.panel.fileLabel.string = event.getDownloadedFiles() + " / " + event.getTotalFiles();
          this.panel.byteLabel.string = event.getDownloadedBytes() + " / " + event.getTotalBytes();
          var msg = event.getMessage();
          msg && (this.panel.info.string = "Updated file: " + msg);
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          this.panel.info.string = "Fail to download manifest file, hot update skipped.";
          failed = true;
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          this.panel.info.string = "Already up to date with the latest remote version.";
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FINISHED:
          this.panel.info.string = "Update finished. " + event.getMessage();
          needRestart = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FAILED:
          this.panel.info.string = "Update failed. " + event.getMessage();
          this.panel.retryBtn.active = true;
          this._updating = false;
          this._canRetry = true;
          break;

         case jsb.EventAssetsManager.ERROR_UPDATING:
          this.panel.info.string = "Asset update error: " + event.getAssetId() + ", " + event.getMessage();
          break;

         case jsb.EventAssetsManager.ERROR_DECOMPRESS:
          this.panel.info.string = event.getMessage();
        }
        if (failed) {
          this._am.setEventCallback(null);
          this._updateListener = null;
          this._updating = false;
        }
        if (needRestart) {
          this._am.setEventCallback(null);
          this._updateListener = null;
          var searchPaths = jsb.fileUtils.getSearchPaths();
          var newPaths = this._am.getLocalManifest().getSearchPaths();
          console.log(JSON.stringify(newPaths));
          Array.prototype.unshift.apply(searchPaths, newPaths);
          cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(searchPaths));
          cc.log("seachPaths: " + JSON.stringify(searchPaths));
          jsb.fileUtils.setSearchPaths(searchPaths);
          cc.audioEngine.stopAll();
          cc.game.restart();
        }
      },
      loadCustomManifest: function loadCustomManifest() {
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
          var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
          this._am.loadLocalManifest(manifest, this._storagePath);
          this.panel.info.string = "Using custom manifest";
        }
      },
      retry: function retry() {
        if (!this._updating && this._canRetry) {
          this.panel.retryBtn.active = false;
          this._canRetry = false;
          this.panel.info.string = "Retry failed Assets...";
          this._am.downloadFailedAssets();
        }
      },
      checkUpdate: function checkUpdate() {
        if (this._updating) {
          this.panel.info.string = "Checking or updating ...";
          return;
        }
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
          var url = this.manifestUrl;
          cc.loader.md5Pipe && (url = cc.loader.md5Pipe.transformURL(url));
          this._am.loadLocalManifest(url);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
          this.panel.info.string = "Failed to load local manifest ...";
          return;
        }
        this._am.setEventCallback(this.checkCb.bind(this));
        this._am.checkUpdate();
        this._updating = true;
      },
      hotUpdate: function hotUpdate() {
        cc.log("111111");
        cc.log(this._am);
        cc.log(this._updating);
        if (this._am && !this._updating) {
          this._am.setEventCallback(this.updateCb.bind(this));
          cc.log("2222222");
          if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            var url = this.manifestUrl.nativeUrl;
            cc.loader.md5Pipe && (url = cc.loader.md5Pipe.transformURL(url));
            this._am.loadLocalManifest(url);
            cc.log("33333");
          }
          cc.log("4444");
          this._failCount = 0;
          this._am.update();
          this._updating = true;
        }
      },
      show: function show() {
        if (false == this.updateUI.active) {
          this.updateUI.active = true;
          this.hotUpdate();
        }
      },
      onLoad: function onLoad() {
        if (!cc.sys.isNative) return;
        this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + HOT_UPDATE_SUB_PATH;
        cc.log("Storage path for remote asset : " + this._storagePath);
        this.versionCompareHandle = function(versionA, versionB) {
          cc.log("JS Custom Version Compare: version A is " + versionA + ", version B is " + versionB);
          var vA = versionA.split(".");
          var vB = versionB.split(".");
          for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]);
            var b = parseInt(vB[i] || 0);
            if (a === b) continue;
            return a - b;
          }
          return vB.length > vA.length ? -1 : 0;
        };
        this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
        var panel = this.panel;
        this._am.setVerifyCallback(function(path, asset) {
          var compressed = asset.compressed;
          var expectedMD5 = asset.md5;
          var relativePath = asset.path;
          var size = asset.size;
          if (compressed) {
            panel.info.string = "Verification passed : " + relativePath;
            return true;
          }
          panel.info.string = "Verification passed : " + relativePath + " (" + expectedMD5 + ")";
          return true;
        });
        cc.log("Hot update is ready, please check or directly update.");
        if (cc.sys.os === cc.sys.OS_ANDROID) {
          this._am.setMaxConcurrentTask(2);
          cc.log("android: Max concurrent tasks count have been limited to 2");
        }
        this.panel.fileProgress.progress = 0;
        this.panel.byteProgress.progress = 0;
      },
      start: function start() {
        if (!cc.sys.isNative) {
          cc.director.loadScene("InitScene");
          return;
        }
        this.checkUpdate();
        var PlatformUtils = require("./../framework/platform/PlatformUtils");
        PlatformUtils.rmSplash();
      },
      onDestroy: function onDestroy() {
        if (this._updateListener) {
          this._am.setEventCallback(null);
          this._updateListener = null;
        }
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/platform/PlatformUtils": "PlatformUtils",
    "./UpdatePanel": "UpdatePanel"
  } ],
  HpUpData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0c591uChmhPFbCt4ZZxWwpb", "HpUpData");
    "use strict";
    var Utils = require("./../framework/common/UtilsOther");
    var DataBase = require("./DataBase");
    cc.Class({
      extends: DataBase,
      ctor: function ctor() {
        this.fileDir = "config/hpUpData";
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
        this.dataLen = data.length;
        this.dataObj = Utils.arrayToDict(this.dataObj, "level");
      },
      getHP: function getHP(level) {
        var data = this.dataObj[level];
        var gold = data["hp"];
        return gold;
      },
      getPrice: function getPrice(level) {
        var data = this.dataObj[level];
        var price = data["price"];
        return price;
      },
      getMaxLevel: function getMaxLevel() {
        return this.dataLen;
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/common/UtilsOther": "UtilsOther",
    "./DataBase": "DataBase"
  } ],
  HttpProxy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ae20cwKtwdBMZtY6Ie6ZibZ", "HttpProxy");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var GameHttp = require("./GameHttp");
    var Md5 = require("./../encrypt/Md5").md5_hex_hmac;
    var UtilsCross = require("./../platform/PlatformUtils");
    var UCRETRY = 5;
    var LOGINRETRY = 5;
    var port = [ 8010, 8011, 8012, 8015, 8016, 8017 ][Math.round(5 * Math.random())];
    var urlroot = "http://mini-game.zhanyougame.com:" + port + "/zc_game?m=";
    var encryptKey = "zygame";
    var HttpProxy = cc.Class({
      statics: {
        instance: null,
        getInstance: function getInstance() {
          this.instance || (this.instance = new HttpProxy());
          return this.instance;
        }
      },
      sendDataEventZCUC: function sendDataEventZCUC(params, suc, fail) {
        var _this = this;
        if (!cc.sys.isNative) return;
        var eventname = params.eventname;
        var data = {
          appid: "",
          product: ZC_TRACK_CFG.product,
          mac: zy.device.mac,
          idfa: zy.device.idfa,
          channel: CHANNEL_ID,
          device_name: zy.device.model,
          os_name: zy.device.osName,
          os_version: zy.device.osVersion,
          jailbreak: zy.device.jailbreak,
          ssid: zy.device.ssid,
          android_id: UtilsCross.getMobilePhoneID(),
          advertising_id: zy.device.advertisingId,
          sign: ""
        };
        var appkey = "";
        var httpUrl = "";
        if (cc.sys.os === cc.sys.OS_ANDROID) {
          appkey = ZC_TRACK_CFG.android.appkey;
          data.appid = ZC_TRACK_CFG.android.appid;
          httpUrl = ZC_TRACK_API + "c=android_track";
        } else {
          appkey = ZC_TRACK_CFG.ios.appkey;
          data.appid = ZC_TRACK_CFG.ios.appid;
          httpUrl = ZC_TRACK_API + "c=iostrack";
        }
        "Active" == eventname ? httpUrl += "&m=index" : "Account" == eventname && (httpUrl += "&m=reg");
        var md5 = require("./../../Lib/encrypt/Md5").md5_hex;
        var signStr = data.android_id + data.appid + data.channel + data.device_name + data.idfa + data.jailbreak + data.level + data.mac + data.money + data.os_name + data.os_version + data.product + data.ssid + appkey;
        data.sign = md5(signStr);
        cc.log("===> send zcapi: " + httpUrl);
        cc.log("===> send zcapi: data=" + JSON.stringify(data));
        GameHttp.httpPost(httpUrl, "data=" + JSON.stringify(data), function(rep) {
          cc.log("===>response:" + rep.getBody());
          if (rep.isOk()) {
            cc.log("===>requrest: " + httpUrl + " \u6210\u529f\u3002");
            suc && suc();
          } else {
            cc.log("===>requrest: " + httpUrl + " \u5931\u8d25\u3002");
            fail && fail();
            if (UCRETRY > 0) {
              UCRETRY -= 1;
              setTimeout(function() {
                _this.sendDataEventZCUC({
                  eventname: "Active"
                });
              }, 5e3);
            }
          }
        });
      },
      login: function login(onSuc, onFailed) {
        var _this2 = this;
        cc.log("===urlroot:" + urlroot);
        var data = {
          energy: 1,
          otherpassplies: 1,
          loginday: 1,
          diamond: 10,
          allautoatt: 10,
          normalpassplies: 1,
          cversion: UtilsCross.getAppVersion(),
          healthlevel: zy.dataMng.userData.hpLevel,
          goldrewardlevel: zy.dataMng.userData.freeCoinsLevel,
          stamina: zy.dataMng.userData.phPower,
          channel: CHANNEL_ID,
          macaddress: zy.device.mac,
          idfa: zy.device.idfa
        };
        var url = urlroot + "user_join_game";
        var failCb = function failCb() {
          onFailed && onFailed();
          if (LOGINRETRY > 0) {
            LOGINRETRY -= 1;
            setTimeout(function() {
              _this2.login();
            }, 5e3);
          }
        };
        this.serverRequest(url, data, onSuc, failCb);
      },
      updateBase: function updateBase(id, value, onSuc, onFailed) {
        var data = {
          baseinfoid: id,
          value: value
        };
        var url = urlroot + "base_info_change";
        this.serverRequest(url, data, onSuc, onFailed);
      },
      updateTurret: function updateTurret(id, level, star, lock, onSuc, onFailed) {
        var data = {
          level: level,
          turretid: id,
          star: star,
          lock: lock
        };
        var url = urlroot + "turret_info";
        this.serverRequest(url, data, onSuc, onFailed);
      },
      updateBuilding: function updateBuilding(id, lock, onSuc, onFailed) {
        var data = {
          buildingid: id,
          lock: lock
        };
        var url = urlroot + "building_info";
        this.serverRequest(url, data, onSuc, onFailed);
      },
      updateTreasure: function updateTreasure(id, lock, onSuc, onFailed) {
        var data = {
          treasureid: id,
          lock: lock
        };
        var url = urlroot + "treasure_info";
        this.serverRequest(url, data, onSuc, onFailed);
      },
      watchAds: function watchAds(placeId, onSuc, onFailed) {
        var data = {
          adstationid: placeId
        };
        var url = urlroot + "watch_advertisement";
        this.serverRequest(url, data, onSuc, onFailed);
      },
      clickButton: function clickButton(btnId, onSuc, onFailed) {
        var data = {
          buttonid: btnId
        };
        var url = urlroot + "click_button";
        this.serverRequest(url, data, onSuc, onFailed);
      },
      getServerTime: function getServerTime(onSuc, onFailed) {
        var data = {};
        var url = urlroot + "request_unixtime";
        this.serverRequest(url, data, onSuc, onFailed);
      },
      serverRequest: function serverRequest(url, data, onSuc, onFailed) {
        cc.log("===>serverRequest: " + ("undefined" === typeof data ? "undefined" : _typeof(data)) + " | " + JSON.stringify(data));
        data = "string" == typeof data ? data : JSON.stringify(data);
        var encryptStr = Md5(encryptKey, data);
        var uid = UtilsCross.getMobilePhoneID();
        uid = void 0 == uid ? "" : uid;
        cc.log("uid=" + uid);
        var newData = {
          data: JSON.parse(data),
          encrypt: encryptStr,
          roleid: uid,
          token: ""
        };
        newData = JSON.stringify(newData);
        GameHttp.httpPost(url, newData, function(rep) {
          cc.log("===>response:" + rep.getBody());
          if (rep.isOk()) {
            cc.log("===>requrest: " + url + " \u6210\u529f\u3002");
            onSuc && onSuc(JSON.parse(rep.getBody()));
          } else {
            cc.log("===>requrest: " + url + " \u5931\u8d25\u3002");
            onFailed && onFailed(rep.getError() || rep.getBody());
          }
        });
      }
    });
    cc._RF.pop();
  }, {
    "./../../Lib/encrypt/Md5": void 0,
    "./../encrypt/Md5": "Md5",
    "./../platform/PlatformUtils": "PlatformUtils",
    "./GameHttp": "GameHttp"
  } ],
  ImageLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bc14cw8w1BD+YXEJ8wOFpD2", "ImageLoader");
    "use strict";
    function __loadImage(url, callback) {
      cc.loader.load({
        url: url,
        type: "jpeg"
      }, function(err, tex) {
        err ? cc.error(err) : callback(tex);
      });
    }
    function loadImage(url, callback) {
      if (!cc.sys.isNative) {
        __loadImage(url, callback);
        return;
      }
      var dirpath = jsb.fileUtils.getWritablePath() + "TclGameImg/";
      cc.log("dirpath: " + dirpath);
      var md5 = require("./../encrypt/Md5");
      var md5Url = md5.md5_hex(url);
      var filePath = dirpath + md5Url + ".jpg";
      cc.log("filepath: " + filePath);
      function loadEnd() {
        cc.loader.load(filePath, function(err, tex) {
          err ? cc.error(err) : callback(tex);
        });
      }
      if (jsb.fileUtils.isFileExist(filePath)) {
        cc.log("Remote img is find: " + filePath);
        loadEnd();
        return;
      }
      var saveFile = function saveFile(data) {
        if (data && "undefined" !== typeof data) {
          jsb.fileUtils.isDirectoryExist(dirpath) ? cc.log("\u8def\u5f84 " + dirpath + "\u5df2\u7ecf\u5b58\u5728\u3002") : jsb.fileUtils.createDirectory(dirpath);
          if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filePath)) {
            cc.log("Remote img save succeed.");
            loadEnd();
          } else cc.log("Remote img save failed.");
        } else cc.log("Remote img download failed.");
      };
      var xhr = cc.loader.getXMLHttpRequest();
      xhr.onreadystatechange = function() {
        cc.log("xhr.readyState: " + xhr.readyState);
        cc.log("xhr.status: " + xhr.status);
        4 === xhr.readyState && (200 === xhr.status ? saveFile(xhr.response) : saveFile(null));
      }.bind(this);
      xhr.responseType = "arraybuffer";
      xhr.open("GET", url, true);
      xhr.send();
    }
    module.exports = {
      loadImage: loadImage
    };
    cc._RF.pop();
  }, {
    "./../encrypt/Md5": "Md5"
  } ],
  InitScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "be329An/tdHbbITHsY2sOVj", "InitScene");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        if (cc.sys.isNative) {
          var baseLocalVersion = cc.sys.localStorage.getItem("BASE_LOCAL_VERSION");
          cc.sys.localStorage.setItem("BASE_LOCAL_VERSION", BASE_LOCAL_VERSION);
          if ("" != baseLocalVersion && baseLocalVersion != BASE_LOCAL_VERSION) {
            var path = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + HOT_UPDATE_SUB_PATH;
            jsb.fileUtils.removeDirectory(path);
            cc.log("\u5927\u7248\u672c\u66f4\u65b0\uff0cpath: " + path);
            cc.game.restart();
          } else this.init();
        } else this.init();
        cc.debug.setDisplayStats(DEBUG_OPEN);
      },
      init: function init() {
        window.i18n = require("./../framework/i18n/i18n");
        zy.event = new cc.EventTarget();
        zy.utils = require("./../framework/common/UtilsOther");
        var HttpProxy = require("./../framework/net/HttpProxy");
        zy.httpProxy = new HttpProxy();
        zy.constData = require("./../data/ConstData");
        zy.constData.init();
        zy.shaderUtils = require("./../framework/common/ShaderUtils");
        zy.shaderUtils.init();
        zy.ui = require("./../framework/common/UI");
        zy.ui.init();
        zy.cornerMng = require("./../framework/common/CornerMng");
        zy.cornerMng.init([]);
        zy.device = require("./../framework/common/Device");
        zy.device.init();
        zy.audio = require("./../framework/common/Audio");
        zy.audio.init();
        zy.director = require("./../framework/common/Director");
        zy.director.init();
        var DataMng = require("./../data/DataMng");
        zy.dataMng = new DataMng();
        zy.dataMng.loadDataFromLocalFile(function(c, t) {
          cc.log("load local cfg: %d/%d", c, t);
        }, function() {
          zy.director.loadScene("GameScene");
        });
      }
    });
    cc._RF.pop();
  }, {
    "./../data/ConstData": "ConstData",
    "./../data/DataMng": "DataMng",
    "./../framework/common/Audio": "Audio",
    "./../framework/common/CornerMng": "CornerMng",
    "./../framework/common/Device": "Device",
    "./../framework/common/Director": "Director",
    "./../framework/common/ShaderUtils": "ShaderUtils",
    "./../framework/common/UI": "UI",
    "./../framework/common/UtilsOther": "UtilsOther",
    "./../framework/i18n/i18n": "i18n",
    "./../framework/net/HttpProxy": "HttpProxy"
  } ],
  LabelInteger: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f674fOMBSpIZLaQSTfJ+Irg", "LabelInteger");
    "use strict";
    var UtilsOther = require("UtilsOther");
    var LabelFormType = cc.Enum({
      None: 0,
      ThousandSeparator: 1,
      FormatTime: 2
    });
    var formatTime = function formatTime(s) {
      var t = void 0;
      if (s >= 0) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        var day = parseInt(hour / 24);
        if (1 == day) return day + " day";
        if (day > 1) return day + " days";
        if (day > 0) {
          hour -= 24 * day;
          t = day + "day " + ("00" + hour).slice(-2) + ":";
        } else t = hour > 0 ? ("00" + hour).slice(-2) + ":" : "";
        min < 10 && (t += "0");
        t += min + ":";
        sec < 10 && (t += "0");
        t += parseInt(sec);
      }
      return t;
    };
    cc.Class({
      extends: cc.Label,
      properties: {
        formType: {
          tooltip: "None: \u4e0d\u505a\u683c\u5f0f\u5316\nThousandSeparator: 3\u4f4d\u9017\u53f7\u5206\u9694\nFormatTime: \u683c\u5f0f\u5316\u65f6\u95f4",
          type: LabelFormType,
          default: LabelFormType.None,
          notify: function notify(oldValue) {
            this.setValue(this.string);
          }
        },
        animationDuration: {
          tooltip: "\u52a8\u753b\u65f6\u95f4",
          default: .5
        },
        _textKey: 0,
        string: {
          override: true,
          tooltip: "\u5fc5\u987b\u662f\u6570\u5b57",
          get: function get() {
            return this._textKey;
          },
          set: function set(value) {
            this._textKey = Number(value);
            if (this._sgNode) {
              switch (this.formType) {
               case LabelFormType.ThousandSeparator:
                value = value.toString().split("").reverse().join("").replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, "$1,").split("").reverse().join("");
                break;

               case LabelFormType.FormatTime:
                value = formatTime(value);
              }
              this._sgNode.setString(value);
              this._updateNodeSize();
            }
          }
        },
        _curValue: 0,
        _toValue: 0,
        _delta: 0
      },
      setValue: function setValue(value, animate) {
        ("" === value || null === value || isNaN(value)) && cc.assert(false, "The value of LabelInteger must be a Number!");
        if (animate) this._toValue = value; else {
          this._toValue = value;
          this._curValue = value;
          this.string = value;
        }
        this._delta = 0;
      },
      setFormString: function setFormString(value) {
        switch (this.formType) {
         case LabelFormType.None:
          this.string = value;
          break;

         case LabelFormType.ThousandSeparator:
          this.string = value.split("").reverse().join("").replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, "$1,").split("").reverse().join("");
          break;

         case LabelFormType.FormatTime:
          this.string = formatTime(value);
        }
      },
      update: function update(dt) {
        if (this._toValue != this._curValue) {
          0 == this._delta && (this._delta = this._toValue - this._curValue);
          var step = dt / this.animationDuration * this._delta;
          if (this._delta > 0) {
            step = parseInt(step);
            0 == step && (step = 1);
            this._curValue += step;
            this._curValue = Math.min(this._curValue, this._toValue);
          } else {
            step = -step;
            step = parseInt(step);
            0 == step && (step = 1);
            this._curValue -= step;
            this._curValue = Math.max(this._curValue, this._toValue);
          }
          this.string = this._curValue;
          this._toValue == this._curValue && (this._delta = 0);
        }
      },
      onLoad: function onLoad() {
        this.setValue(this.string);
      }
    });
    cc._RF.pop();
  }, {
    UtilsOther: "UtilsOther"
  } ],
  Label: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "64cd4KWD1hGiZ4uUhNcZKVY", "Label");
    "use strict";
    var i18n = require("i18n");
    var Label = cc.Class({
      extends: cc.Label,
      statics: {
        createNode: function createNode(params) {
          var node = new cc.Node();
          node.addComponent(zy.Label);
          zy.Label.updateNode(node, params);
          return node;
        },
        updateNode: function updateNode(node, params) {
          var label = node.getComponent(zy.Label);
          label || (label = node.getComponent(cc.Label));
          var font = params.font ? params.font : zy.constData.Font.FONT_NORMAL;
          var loadCallback = params.loadCallback;
          var systemFont = params.systemFont;
          var updateFunc = function() {
            params.overflow && (label.overflow = params.overflow);
            params.hasOwnProperty("string") && (label.string = params.string);
            params.hasOwnProperty("verticalAlign") && (label.verticalAlign = params.verticalAlign);
            params.fontSize && (label.fontSize = params.fontSize);
            if (params.outlineWidth || params.outlineColor) {
              var outline = node.getComponent(cc.LabelOutline);
              outline || (outline = node.addComponent(cc.LabelOutline));
              params.outlineWidth && (outline.width = params.outlineWidth);
              params.outlineColor && (outline.color = params.outlineColor);
            }
          }.bind(this);
          if (systemFont) {
            updateFunc();
            loadCallback && loadCallback(null, node);
          } else cc.loader.loadRes(font, cc.Font, null, function(err, _font) {
            if (err) cc.log("zy.Label.updateLabel err:", err); else if (cc.isValid(node)) {
              label.font = _font;
              updateFunc();
            }
            loadCallback && loadCallback(err, node);
          }.bind(this));
          zy.Node.updateNode(node, params);
        },
        createAttrNode: function createAttrNode(attrs, params) {
          var attrNode = zy.Node.createNode(params);
          var layout = attrNode.addComponent(cc.Layout);
          layout.type = cc.Layout.Type.HORIZONTAL;
          layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
          var subNodes = [];
          for (var i in attrs) {
            var subNode = null;
            var attr = attrs[i];
            attr.anchor = attr.anchor ? attr.anchor : cc.v2(0, .5);
            attr.parent = attrNode;
            if ("text" == attr.type) {
              subNode = zy.Label.createNode(attr);
              attr.color && (subNode.color = attr.color);
            }
            subNode.__type = attr.type;
            subNodes.push(subNode);
          }
          attrNode.subNodes = subNodes;
          return attrNode;
        },
        updateAttrNode: function updateAttrNode(node, attrs, params) {
          var subNodes = node.subNodes;
          for (var i in attrs) {
            var attr = attrs[i];
            var subNode = subNodes[i];
            var __type = subNode.__type;
            "text" == __type && zy.Label.updateNode(subNode, attr);
          }
        }
      },
      properties: {
        textKey: {
          override: true,
          default: "",
          multiline: true,
          tooltip: "Enter i18n key here",
          notify: function notify() {
            this.string = this.localizedString;
          }
        },
        textValueOption: {
          override: true,
          default: "",
          multiline: true,
          tooltip: "Enter textValueOption here",
          notify: function notify(oldValue) {
            this.string = this.localizedString;
          }
        },
        localizedString: {
          override: true,
          tooltip: "Here shows the localized string of Text Key",
          get: function get() {
            var _textKeyOption = void 0;
            if (this.textValueOption && "" != this.textValueOption) try {
              _textKeyOption = JSON.parse(this.textValueOption);
            } catch (error) {}
            return i18n.t(this.textKey, _textKeyOption);
          },
          set: function set(value) {
            this.textKey = value;
            false;
          }
        }
      },
      onLoad: function onLoad() {
        this.localizedString && (this.string = this.localizedString);
      }
    });
    zy.Label = module.exports = Label;
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  LevelsData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fded9nRaVhPTLr/I3IC6Thc", "LevelsData");
    "use strict";
    var Utils = require("./../framework/common/UtilsOther");
    var DataBase = require("./DataBase");
    cc.Class({
      extends: DataBase,
      ctor: function ctor() {
        this.fileDir = "config/levelsData";
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
        this.dataLen = data.length;
        this.dataObj = Utils.arrayToDict(this.dataObj, "id");
      },
      getLevelsDatar: function getLevelsDatar(id) {
        var data = this.dataObj[id];
        return data;
      },
      getLevelsTotalNum: function getLevelsTotalNum() {
        return this.dataLen;
      },
      getLevelCoins: function getLevelCoins(level) {
        level >= this.dataLen - 1 && (level = this.dataLen - 1);
        var id = level + 1e4;
        var data = this.dataObj[id];
        return data["gold"];
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/common/UtilsOther": "UtilsOther",
    "./DataBase": "DataBase"
  } ],
  LevelsEnemyWaveData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8da8anROtBGbb1e2ojgIJTC", "LevelsEnemyWaveData");
    "use strict";
    var Utils = require("./../framework/common/UtilsOther");
    var DataBase = require("./DataBase");
    cc.Class({
      extends: DataBase,
      ctor: function ctor() {
        this.fileDir = "config/levelsEnemyWaveData";
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
        this.dataLen = data.length;
        this.getDataObjToArr();
      },
      getDataObjToArr: function getDataObjToArr() {
        var array = [];
        for (var i = 0; i < this.dataLen; i++) {
          var dataObj = this.dictToArray(this.dataObj[i]);
          array.push(dataObj);
        }
        return array;
      },
      dictToArray: function dictToArray(dict) {
        var array = [];
        for (var key in dict) dict.hasOwnProperty(key) && dict[key] && array.push(Number(dict[key]));
        return array;
      },
      getLevelsEnemyWaveDatar: function getLevelsEnemyWaveDatar(id) {
        var array = [];
        var data = this.getDataObjToArr();
        for (var i = 0; i < data.length; i++) id == data[i][0] && array.push(data[i]);
        return array;
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/common/UtilsOther": "UtilsOther",
    "./DataBase": "DataBase"
  } ],
  ListView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0a6b1zwRINNuZP6KVs0lXLD", "ListView");
    "use strict";
    var ListAdapter = cc.Class({
      ctor: function ctor() {
        this.dataSet = [];
      },
      setItemComponent: function setItemComponent(itemComponent) {
        this.itemComponent = itemComponent;
      },
      getComponentType: function getComponentType() {
        return this.itemComponent;
      },
      setDataSet: function setDataSet(data) {
        this.dataSet = data;
      },
      getCount: function getCount() {
        return this.dataSet.length;
      },
      getItem: function getItem(posIndex) {
        return this.dataSet[posIndex];
      },
      _getView: function _getView(item, posIndex) {
        var itemComp = item.getComponent(this.itemComponent);
        itemComp ? this.updateView(itemComp, posIndex) : cc.warn("item \u4e0d\u5305\u542b\u7ec4\u4ef6:", this.itemComponent);
        return item;
      },
      updateView: function updateView(item, posIndex) {}
    });
    var ListView = cc.Class({
      extends: cc.Component,
      properties: {
        itemTemplate: {
          type: cc.Prefab,
          default: null
        },
        spacing: {
          type: cc.Float,
          default: 1
        },
        spawnCount: {
          type: cc.Integer,
          default: 3
        },
        scrollView: {
          type: cc.ScrollView,
          default: null
        },
        content: {
          type: cc.Node,
          default: null,
          visible: false
        },
        adapter: {
          type: ListAdapter,
          default: null,
          visible: false,
          serializable: false
        },
        _items: {
          type: cc.NodePool,
          default: null,
          visible: false
        },
        _filledIds: {
          type: Object,
          default: {},
          visible: false
        },
        horizontal: {
          default: false,
          visible: false
        },
        _itemHeight: 1,
        _itemWidth: 1,
        _itmesVisble: 1,
        lastStartIndex: {
          type: cc.Integer,
          default: -1,
          visible: false
        },
        scrollTopNotifyed: {
          default: false,
          visible: false
        },
        scrollBottomNofityed: {
          default: false,
          visible: false
        },
        pullDownCallback: {
          type: Object,
          default: null,
          visible: false
        },
        pullUpCallback: {
          type: Object,
          default: null,
          visible: false
        }
      },
      onLoad: function onLoad() {
        if (this.scrollView) {
          this.content = this.scrollView.content;
          this.horizontal = this.scrollView.horizontal;
          if (this.horizontal) {
            this.scrollView.vertical = false;
            this.content.anchorX = 0;
            this.content.x = this.content.getParent().width * this.content.getParent().anchorX;
          } else {
            this.scrollView.vertical = true;
            this.content.anchorY = 1;
            this.content.y = this.content.getParent().height * this.content.getParent().anchorY;
          }
        } else console.error("ListView need a scrollView for showing.");
        this._items = this._items || new cc.NodePool();
        var itemOne = this._items.get() || cc.instantiate(this.itemTemplate);
        this._items.put(itemOne);
        this._itemHeight = itemOne.height || 10;
        this._itemWidth = itemOne.width || 10;
        this.horizontal ? this._itemsVisible = Math.ceil(this.content.getParent().width / this._itemWidth) : this._itemsVisible = Math.ceil(this.content.getParent().height / this._itemHeight);
        console.log("\u53ef\u89c1\u533a\u57df\u7684item\u6570\u91cf\u4e3a:", this._itemsVisible);
        this.adjustEvent();
      },
      setAdapter: function setAdapter(adapter) {
        this.adapter = adapter;
        if (null == this.adapter) {
          cc.warn("adapter \u4e3a\u7a7a.");
          return;
        }
        if (null == this.itemTemplate) {
          cc.error("Listview \u672a\u8bbe\u7f6e\u5f85\u663e\u793a\u7684Item\u6a21\u677f.");
          return;
        }
        this._items.poolHandlerComp = this.adapter.getComponentType();
        this.notifyUpdate();
      },
      getItemIndex: function getItemIndex(height) {
        return Math.floor(Math.abs(height / (this._itemHeight + this.spacing)));
      },
      getPositionInView: function getPositionInView(item) {
        var worldPos = item.getParent().convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
      },
      notifyUpdate: function notifyUpdate(updateIndex) {
        var _this = this;
        if (null == this.adapter) return;
        updateIndex && updateIndex.length > 0 ? updateIndex.forEach(function(i) {
          _this._filledIds.hasOwnProperty(i) && delete _this._filledIds[i];
        }) : Object.keys(this._filledIds).forEach(function(key) {
          delete _this._filledIds[key];
        });
        this.lastStartIndex = -1;
        this.horizontal ? this.content.width = this.adapter.getCount() * (this._itemWidth + this.spacing) + this.spacing : this.content.height = this.adapter.getCount() * (this._itemHeight + this.spacing) + this.spacing;
        this.scrollView.scrollToTop();
      },
      scrollToTop: function scrollToTop(anim) {
        this.scrollView.scrollToTop(anim ? 1 : 0);
      },
      scrollToBottom: function scrollToBottom(anim) {
        this.scrollView.scrollToBottom(anim ? 1 : 0);
      },
      scrollToLeft: function scrollToLeft(anim) {
        this.scrollView.scrollToLeft(anim ? 1 : 0);
      },
      scrollToRight: function scrollToRight(anim) {
        this.scrollView.scrollToRight(anim ? 1 : 0);
      },
      pullDown: function pullDown(callback) {
        this.pullDownCallback = callback;
      },
      pullUp: function pullUp(callback) {
        this.pullUpCallback = callback;
      },
      update: function update(dt) {
        var startIndex = this.checkNeedUpdate();
        startIndex >= 0 && this.updateView(startIndex);
      },
      _layoutVertical: function _layoutVertical(child, posIndex) {
        this.content.addChild(child);
        child["_tag"] = posIndex;
        this._filledIds[posIndex] = posIndex;
        child.setPosition(0, -child.height * (.5 + posIndex) - this.spacing * (posIndex + 1));
      },
      _layoutHorizontal: function _layoutHorizontal(child, posIndex) {
        this.content.addChild(child);
        child["_tag"] = posIndex;
        this._filledIds[posIndex] = posIndex;
        child.setPosition(-child.width * (.5 + posIndex) - this.spacing * (posIndex + 1), 0);
      },
      getRecycleItems: function getRecycleItems(beginIndex, endIndex) {
        var _this2 = this;
        var children = this.content.children;
        var recycles = [];
        children.forEach(function(item) {
          if (item["_tag"] < beginIndex || item["_tag"] > endIndex) {
            recycles.push(item);
            delete _this2._filledIds[item["_tag"]];
          }
        });
        return recycles;
      },
      updateView: function updateView(startIndex) {
        var _this3 = this;
        var itemStartIndex = startIndex;
        var itemEndIndex = itemStartIndex + this._itemsVisible + (this.spawnCount || 2);
        var totalCount = this.adapter.getCount();
        if (itemStartIndex >= totalCount) return;
        if (itemEndIndex > totalCount) {
          itemEndIndex = totalCount;
          if (!this.scrollBottomNotifyed) {
            this.notifyScrollToBottom();
            this.scrollBottomNotifyed = true;
          }
        } else this.scrollBottomNotifyed = false;
        var recyles = this.getRecycleItems(itemStartIndex - (this.spawnCount || 2), itemEndIndex);
        recyles.forEach(function(item) {
          _this3._items.put(item);
        });
        var updates = this.findUpdateIndex(itemStartIndex, itemEndIndex);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = updates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var index = _step.value;
            var child = this.adapter._getView(this._items.get() || cc.instantiate(this.itemTemplate), index);
            this.horizontal ? this._layoutHorizontal(child, index) : this._layoutVertical(child, index);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            !_iteratorNormalCompletion && _iterator.return && _iterator.return();
          } finally {
            if (_didIteratorError) throw _iteratorError;
          }
        }
      },
      checkNeedUpdate: function checkNeedUpdate() {
        if (null == this.adapter) return -1;
        var scroll = this.horizontal ? this.content.x - this.content.getParent().width * this.content.getParent().anchorX : this.content.y - this.content.getParent().height * this.content.getParent().anchorY;
        var itemStartIndex = Math.floor(scroll / ((this.horizontal ? this._itemWidth : this._itemHeight) + this.spacing));
        if (itemStartIndex < 0 && !this.scrollTopNotifyed) {
          this.notifyScrollToTop();
          this.scrollTopNotifyed = true;
          return itemStartIndex;
        }
        itemStartIndex > 0 && (this.scrollTopNotifyed = false);
        if (this.lastStartIndex != itemStartIndex) {
          this.lastStartIndex = itemStartIndex;
          return itemStartIndex;
        }
        return -1;
      },
      findUpdateIndex: function findUpdateIndex(itemStartIndex, itemEndIndex) {
        var d = [];
        for (var i = itemStartIndex; i < itemEndIndex; i++) {
          if (this._filledIds.hasOwnProperty(i)) continue;
          d.push(i);
        }
        return d;
      },
      notifyScrollToTop: function notifyScrollToTop() {
        if (!this.adapter || this.adapter.getCount() <= 0) return;
        this.pullDownCallback && this.pullDownCallback();
      },
      notifyScrollToBottom: function notifyScrollToBottom() {
        if (!this.adapter || this.adapter.getCount() <= 0) return;
        this.pullUpCallback && this.pullUpCallback();
      },
      adjustEvent: function adjustEvent() {
        var _this4 = this;
        this.content.on(this.isMobile() ? cc.Node.EventType.TOUCH_END : cc.Node.EventType.MOUSE_UP, function() {
          _this4.scrollTopNotifyed = false;
          _this4.scrollBottomNotifyed = false;
        }, this);
        this.content.on(this.isMobile() ? cc.Node.EventType.TOUCH_CANCEL : cc.Node.EventType.MOUSE_LEAVE, function() {
          _this4.scrollTopNotifyed = false;
          _this4.scrollBottomNotifyed = false;
        }, this);
      },
      isMobile: function isMobile() {
        return cc.sys.isMobile || cc.sys.platform === cc.sys.WECHAT_GAME || cc.sys.platform === cc.sys.QQ_PLAY;
      }
    });
    module.exports = {
      ListAdapter: ListAdapter,
      ListView: ListView
    };
    cc._RF.pop();
  }, {} ],
  Loading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0e26giQ25CbryNSYfouOEG", "Loading");
    "use strict";
    var Loading = cc.Class({
      extends: cc.Component,
      statics: {
        loadingNode: null,
        loadingComponent: null,
        show: function show(loadingName) {
          if (!cc.isValid(this.loadingNode)) {
            this.loadingNode = zy.Node.createNode({
              name: "loading",
              width: 2 * zy.constData.DesignSize.width,
              height: 2 * zy.constData.DesignSize.width,
              zIndex: zy.constData.ZIndex.LOADING,
              parent: zy.director.getUiRoot()
            });
            this.loadingComponent = this.loadingNode.addComponent("Loading");
            this.loadingComponent.init();
          }
          this.loadingComponent.show(loadingName);
        },
        hide: function hide(loadingName) {
          cc.isValid(this.loadingNode) && this.loadingComponent.hide(loadingName);
        }
      },
      properties: {},
      init: function init() {
        this.loadingList = [];
        this.node.width = 2 * zy.constData.DesignSize.width;
        this.node.height = 2 * zy.constData.DesignSize.height;
        this.node.addComponent(cc.BlockInputEvents);
        this.maskNode = zy.Sprite.createNode({
          name: "maskNode",
          url: "textures/common/mask",
          parent: this.node,
          size: cc.size(2 * zy.constData.DesignSize.width, 2 * zy.constData.DesignSize.height),
          loadCallback: function(err, node) {
            node.width = 2 * zy.constData.DesignSize.width;
            node.height = 2 * zy.constData.DesignSize.height;
          }.bind(this)
        });
        zy.Label.createNode({
          string: "Loading...",
          parent: this.maskNode,
          systemFont: false
        });
        this.maskNode.active = false;
      },
      show: function show(name) {
        -1 == this.loadingList.indexOf(name) && this.loadingList.push(name);
        this.node.active = true;
        this.node.stopAllActions();
        var delaySeq = cc.sequence(cc.delayTime(1), cc.callFunc(function() {
          this.delaySeq = null;
          this.maskNode.active = true;
        }.bind(this)));
        this.node.runAction(delaySeq);
      },
      hide: function hide(name) {
        var index = this.loadingList.indexOf(name);
        index > -1 && this.loadingList.splice(index, 1);
        if (0 == this.loadingList.length) {
          this.node.active = false;
          this.maskNode.active = false;
        }
      },
      clean: function clean() {
        this.node.active = false;
        this.loadingList = [];
      }
    });
    cc._RF.pop();
  }, {} ],
  LoggerHelper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6635fCdo61II6O7HUaipHsk", "LoggerHelper");
    "use strict";
    var AFLogger = require("./AFLogger");
    var FBLogger = require("./FBLogger");
    var TrackingLogger = require("./TrackingLogger");
    var RangerLogger = require("./RangerLogger");
    var LogHelper = cc.Class({
      statics: {
        logEventWatchAds: function logEventWatchAds(placeId) {
          if (101 == CHANNEL_ID || 102 == CHANNEL_ID) {
            AFLogger.logEventWatchAds(placeId);
            FBLogger.logEventWatchAds(placeId);
          } else if (201 == CHANNEL_ID || 201 == CHANNEL_ID) {
            TrackingLogger.logEventWatchAds(placeId);
            RangerLogger.logEventWatchAds(placeId);
          }
        },
        logEventLogin: function logEventLogin(uid) {
          if (101 == CHANNEL_ID) ; else if (102 == CHANNEL_ID) ; else if (201 == CHANNEL_ID || 202 == CHANNEL_ID) {
            TrackingLogger.logEventLogin(uid);
            RangerLogger.logEventLogin(uid);
          }
        }
      }
    });
    zy.LogHelper = LogHelper;
    cc._RF.pop();
  }, {
    "./AFLogger": "AFLogger",
    "./FBLogger": "FBLogger",
    "./RangerLogger": "RangerLogger",
    "./TrackingLogger": "TrackingLogger"
  } ],
  Md5: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "df9553a0RtFNZ/mf3UeoRp9", "Md5");
    "use strict";
    var hexcase = 0;
    var b64pad = "";
    var chrsz = 8;
    function hex_md5(s) {
      return binl2hex(core_md5(str2binl(s), s.length * chrsz));
    }
    function b64_md5(s) {
      return binl2b64(core_md5(str2binl(s), s.length * chrsz));
    }
    function str_md5(s) {
      return binl2str(core_md5(str2binl(s), s.length * chrsz));
    }
    function hex_hmac_md5(key, data) {
      return binl2hex(core_hmac_md5(key, data));
    }
    function b64_hmac_md5(key, data) {
      return binl2b64(core_hmac_md5(key, data));
    }
    function str_hmac_md5(key, data) {
      return binl2str(core_hmac_md5(key, data));
    }
    function md5_vm_test() {
      return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc");
    }
    function core_md5(x, len) {
      x[len >> 5] |= 128 << len % 32;
      x[14 + (len + 64 >>> 9 << 4)] = len;
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
      for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return Array(a, b, c, d);
    }
    function md5_cmn(q, a, b, x, s, t) {
      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
      return md5_cmn(b & c | ~b & d, a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
      return md5_cmn(b & d | c & ~d, a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
      return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    function core_hmac_md5(key, data) {
      var bkey = str2binl(key);
      bkey.length > 16 && (bkey = core_md5(bkey, key.length * chrsz));
      var ipad = Array(16), opad = Array(16);
      for (var i = 0; i < 16; i++) {
        ipad[i] = 909522486 ^ bkey[i];
        opad[i] = 1549556828 ^ bkey[i];
      }
      var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
      return core_md5(opad.concat(hash), 640);
    }
    function safe_add(x, y) {
      var lsw = (65535 & x) + (65535 & y);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | 65535 & lsw;
    }
    function bit_rol(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
    function str2binl(str) {
      var bin = Array();
      var mask = (1 << chrsz) - 1;
      for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
      return bin;
    }
    function binl2str(bin) {
      var str = "";
      var mask = (1 << chrsz) - 1;
      for (var i = 0; i < 32 * bin.length; i += chrsz) str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
      return str;
    }
    function binl2hex(binarray) {
      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var str = "";
      for (var i = 0; i < 4 * binarray.length; i++) str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 15);
      return str;
    }
    function binl2b64(binarray) {
      var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var str = "";
      for (var i = 0; i < 4 * binarray.length; i += 3) {
        var triplet = (binarray[i >> 2] >> i % 4 * 8 & 255) << 16 | (binarray[i + 1 >> 2] >> (i + 1) % 4 * 8 & 255) << 8 | binarray[i + 2 >> 2] >> (i + 2) % 4 * 8 & 255;
        for (var j = 0; j < 4; j++) 8 * i + 6 * j > 32 * binarray.length ? str += b64pad : str += tab.charAt(triplet >> 6 * (3 - j) & 63);
      }
      return str;
    }
    module.exports = {
      md5_hex: hex_md5,
      md5_b64: b64_md5,
      md5_str: str_md5,
      md5_hex_hmac: hex_hmac_md5,
      md5_b64_hmac: b64_hmac_md5,
      md5_str_hmac: str_hmac_md5
    };
    cc._RF.pop();
  }, {} ],
  NetProxy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5c22dewAxJE+aRwAPMkEflJ", "NetProxy");
    "use strict";
    var GameNetwork = require("./GameNetwork");
    var GameProtocols = require("./GameProtocols");
    var GAME_SERVER_URL = "ws://127.0.0.1:3005";
    var NetProxy = cc.Class({
      ctor: function ctor() {
        this.network = null;
        this._cachePushCallback = [];
      },
      init: function init() {
        this.network = new GameNetwork();
        this.network.setDelegate(this);
        this.initPushCallback();
      },
      connect: function connect() {
        this.network.connect(GAME_SERVER_URL);
      },
      closeConnect: function closeConnect() {
        this.network.closeConnect();
      },
      isNetworkOpened: function isNetworkOpened() {
        return this.network.isSocketOpened();
      },
      isNetworkClosed: function isNetworkClosed() {
        return this.network.isSocketClosed();
      },
      onNetworkOpen: function onNetworkOpen() {
        Global.eventMgr.emit(Global.config.EVENT_NETWORK_OPENED);
      },
      onNetworkClose: function onNetworkClose() {
        Global.eventMgr.emit(Global.config.EVENT_NETWORK_CLOSED);
      },
      initPushCallback: function initPushCallback() {
        var self = this;
        var pushCallback = function pushCallback(resp) {
          self.pushCallback(resp);
        };
        this.network.registerPushResponseCallback("chat", pushCallback);
        this.network.registerPushResponseCallback("exitRoom", pushCallback);
        this.network.registerPushResponseCallback("playChess", pushCallback);
      },
      registerPush: function registerPush(key, cb, target) {
        var self = this;
        cb && target && (cb = cb.bind(target));
        var pushCallback = function pushCallback(resp) {
          cb && cb(resp);
          Global.eventMgr.emit(resp.act, resp);
        };
        this.network.registerPushResponseCallback(key, pushCallback);
      },
      dealCachePush: function dealCachePush() {},
      beatHeart: function beatHeart(callback) {
        var req = new GameProtocols.HeartRequest();
        req.t = Date.now();
        this.network.sendRequest(req, callback);
      },
      chat: function chat(msg) {
        var req = new GameProtocols.ChatRequest();
        var uid = "";
        req.uid = uid;
        req.msg = msg;
        this.network.sendRequest(req);
      },
      randomMatch: function randomMatch() {
        var req = new GameProtocols.RandomMatchRequest();
        var uid = "";
        req.uid = uid;
        this.network.sendRequest(req);
      },
      playChess: function playChess(msg) {
        var req = new GameProtocols.PlayChessRequest();
        var uid = "";
        req.uid = uid;
        req.lastBedIndex = msg.lastBedIndex;
        req.cid = msg.cid;
        req.dest = msg.dest;
        this.network.sendRequest(req);
      },
      selectChess: function selectChess(msg) {
        var req = new GameProtocols.SelectChessRequest();
        req.cid = msg.cid;
        this.network.sendRequest(req);
      },
      createRoom: function createRoom(cb) {
        var req = new GameProtocols.CreateRoomRequest();
        this.network.sendRequest(req, cb);
      },
      joinRoom: function joinRoom(rid) {
        var req = new GameProtocols.JoinRoomRequest();
        req.rid = rid;
        this.network.sendRequest(req);
      },
      login: function login(origin, token) {
        var req = new GameProtocols.LoginRequest();
        token && (req.token = token);
        req.origin = origin;
        req.os = cc.sys.os;
        req.osVersion = cc.sys.osVersion;
        var uid = "";
        req.uid = uid;
        var callback = function callback(resp) {
          if (0 != resp.err) {
            Global.eventMgr.emit(Global.config.EVENT_LOGIN_FAILED, resp);
            return;
          }
          Global.eventMgr.emit(Global.config.EVENT_LOGIN_SUC, resp);
        };
        this.network.sendRequest(req, callback);
      },
      logout: function logout() {},
      bindFacebook: function bindFacebook(token) {},
      getRank: function getRank(rankType) {},
      pushCallback: function pushCallback(response) {
        switch (response.act) {
         case "friendInfoSync":
          this.pushFriendSendTakeSp(response);
          break;

         case "playChess":
          this.pushPlayChess(response);
          break;

         case "chat":
          this.pushChat(response);
          break;

         case "exitRoom":
          this.pushExitRoom(response);
        }
      },
      pushFriendSendTakeSp: function pushFriendSendTakeSp(resp) {},
      pushChat: function pushChat(resp) {
        Global.eventMgr.emit(Global.config.EVENT_CHAT, resp);
      },
      pushExitRoom: function pushExitRoom(resp) {
        Global.eventMgr.emit(Global.config.EVENT_EXITROOM, resp);
      },
      pushPlayChess: function pushPlayChess(resp) {
        Global.eventMgr.emit(Global.config.EVENT_PLAYCHESS, resp);
      },
      debug_addCoins: function debug_addCoins(name) {
        var req = new GameProtocols.DebugChangeMeRequest();
        req.cmd = "btnAddCoins" === name ? "player coins add 100000000" : "btnClearCoins" === name ? "player coins 0" : "btnAddEnergy" === name ? "player sp add 10" : "btnClearEnergy" === name ? "player sp 0" : "btnAddWp" == name ? "player wp add 10" : "btnClearWp" == name ? "player wp 0" : "btnUnwrap" == name ? "player fbuid null" : "btnWizard1" == name ? "player wizard1 0" : "btnWizard2" == name ? "player wizard2 0" : "btnClearShield" == name ? "player shield 0" : "btnSpEc" == name ? "SpEc stepInterval 60000" : "btnFarmEc" == name ? "FarmEc stepInterval 60000" : "btnSpEcBack" == name ? "SpEc stepInterval 3600000" : "btnFarmBack" == name ? "FarmEc stepInterval 86400000" : "btnUpdateBuild" == name ? "Building lv 5" : name;
      }
    });
    module.exports = NetProxy;
    cc._RF.pop();
  }, {
    "./GameNetwork": "GameNetwork",
    "./GameProtocols": "GameProtocols"
  } ],
  NodePoolMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "670dbVclHRF+YTksSd2vsqs", "NodePoolMng");
    "use strict";
    var SHOWLOG = false;
    var myLog = function myLog(arg) {
      SHOWLOG && cc.log.apply(cc.log, arguments);
    };
    var NodePoolMng = cc.Class({
      extends: cc.Component,
      properties: {
        bulletPFList: [ cc.Prefab ],
        enemyPFList: [ cc.Prefab ],
        normalEffectPF: cc.Prefab,
        bloodDecreasePF: cc.Prefab,
        warningEnemy2PF: cc.Prefab,
        bulletCounts: 30,
        enemyCounts: 40,
        normalEffectCounts: 30,
        warningEnemy2Counts: 10
      },
      onLoad: function onLoad() {
        zy.nodePoolMng = this;
        this.bulletPoolDic = {};
        this.bulletPFDic = {};
        this.enemyPoolDic = {};
        this.enemyPFDic = {};
        this.normalEffPool = null;
        this.bloodDecPool = null;
        this.warningEnemy2Pool = null;
        this.init();
      },
      init: function init() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = this.bulletPFList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var p = _step.value;
            var pool = new cc.NodePool();
            this.bulletPoolDic[p._name] = pool;
            this.bulletPFDic[p._name] = p;
            for (var _i3 = 0; _i3 < this.bulletCounts; _i3++) {
              var _b = cc.instantiate(p);
              pool.put(_b);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            !_iteratorNormalCompletion && _iterator.return && _iterator.return();
          } finally {
            if (_didIteratorError) throw _iteratorError;
          }
        }
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = void 0;
        try {
          for (var _iterator2 = this.enemyPFList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _p = _step2.value;
            var pool = new cc.NodePool();
            this.enemyPoolDic[_p._name] = pool;
            this.enemyPFDic[_p._name] = _p;
            var num = this.enemyCounts;
            "enemy7" == _p._name && (num = 1);
            for (var _i4 = 0; _i4 < num; _i4++) {
              var _e = cc.instantiate(_p);
              pool.put(_e);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            !_iteratorNormalCompletion2 && _iterator2.return && _iterator2.return();
          } finally {
            if (_didIteratorError2) throw _iteratorError2;
          }
        }
        this.normalEffPool = new cc.NodePool("NormalEffect");
        for (var i = 0; i < this.normalEffectCounts; i++) {
          var e = cc.instantiate(this.normalEffectPF);
          this.normalEffPool.put(e);
        }
        this.bloodDecPool = new cc.NodePool();
        for (var _i = 0; _i < this.normalEffectCounts; _i++) {
          var b = cc.instantiate(this.bloodDecreasePF);
          this.bloodDecPool.put(b);
        }
        this.warningEnemy2Pool = new cc.NodePool();
        for (var _i2 = 0; _i2 < this.warningEnemy2Counts; _i2++) {
          var w = cc.instantiate(this.warningEnemy2PF);
          this.warningEnemy2Pool.put(w);
        }
      },
      getBullet: function getBullet(name) {
        cc.assert(this.bulletPoolDic[name], "\u9519\u8bef\u7684Bullet name: " + name + "\uff0c\u627e\u4e0d\u5230\u5bf9\u5e94\u7684pool");
        var size = this.bulletPoolDic[name].size();
        if (size <= 0) {
          var b = cc.instantiate(this.bulletPFDic[name]);
          return b;
        }
        myLog(name + " pool size =" + size);
        return this.bulletPoolDic[name].get();
      },
      putBullet: function putBullet(node) {
        var name = node.name;
        cc.assert(this.bulletPoolDic[name], "\u9519\u8bef\u7684Bullet, name: " + name + "\uff0c\u627e\u4e0d\u5230\u5bf9\u5e94\u7684pool");
        this.bulletPoolDic[name].put(node);
        var size = this.bulletPoolDic[name].size();
        myLog(name + " pool size =" + size);
      },
      getEnmey: function getEnmey(name) {
        cc.assert(this.enemyPoolDic[name], "\u9519\u8bef\u7684Enemy name: " + name + "\uff0c\u627e\u4e0d\u5230\u5bf9\u5e94\u7684pool");
        var size = this.enemyPoolDic[name].size();
        if (size <= 0) {
          var e = cc.instantiate(this.enemyPFDic[name]);
          return e;
        }
        myLog(name + " pool size =" + size);
        return this.enemyPoolDic[name].get();
      },
      putEnemy: function putEnemy(node) {
        var name = node.name;
        cc.assert(this.enemyPoolDic[name], "\u9519\u8bef\u7684Enemy, name: " + name + "\uff0c\u627e\u4e0d\u5230\u5bf9\u5e94\u7684pool");
        this.enemyPoolDic[name].put(node);
        var size = this.enemyPoolDic[name].size();
        myLog(name + " pool size =" + size);
      },
      getNormalEffect: function getNormalEffect() {
        var size = this.normalEffPool.size();
        if (size <= 0) {
          var e = cc.instantiate(this.normalEffectPF);
          return e;
        }
        return this.normalEffPool.get();
      },
      putNormalEffect: function putNormalEffect(node) {
        this.normalEffPool.put(node);
      },
      getBloodDecNode: function getBloodDecNode() {
        var size = this.bloodDecPool.size();
        if (size <= 0) {
          var b = cc.instantiate(this.bloodDecreasePF);
          return b;
        }
        myLog("bloodDecPool size =" + size);
        return this.bloodDecPool.get();
      },
      putBloodDecNode: function putBloodDecNode(node) {
        this.bloodDecPool.put(node);
        myLog("bloodDecPool size =" + this.bloodDecPool.size());
      },
      getWarningEnemy2DecNode: function getWarningEnemy2DecNode() {
        var size = this.warningEnemy2Pool.size();
        if (size <= 0) {
          var b = cc.instantiate(this.warningEnemy2PF);
          return b;
        }
        return this.warningEnemy2Pool.get();
      },
      putWarningEnemy2DecNode: function putWarningEnemy2DecNode(node) {
        this.warningEnemy2Pool.put(node);
      }
    });
    cc._RF.pop();
  }, {} ],
  Node: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cc309AO5opH8r5fSzJ5OlUL", "Node");
    "use strict";
    var Node = cc.Class({
      extends: cc.Node,
      statics: {
        createNode: function createNode(params) {
          var node = new zy.Node();
          zy.Node.updateNode(node, params);
          return node;
        },
        updateNode: function updateNode(node, params) {
          params.name && (node.name = params.name);
          params.anchor && node.setAnchorPoint(params.anchor);
          "number" == typeof params.x && (node.x = params.x);
          "number" == typeof params.y && (node.y = params.y);
          params.position && (node.position = params.position);
          "number" == typeof params.width && (node.width = params.width);
          "number" == typeof params.height && (node.height = params.height);
          if (params.size) {
            node.width = params.size.x;
            node.height = params.size.y;
          }
          "number" == typeof params.opacity && (node.opacity = params.opacity);
          params.color && (node.color = params.color);
          "number" == typeof params.zIndex && (node.zIndex = params.zIndex);
          "number" == typeof params.rotation && (node.rotation = params.rotation);
          "number" == typeof params.scale && (node.scale = params.scale);
          "number" == typeof params.scaleX && (node.scaleX = params.scaleX);
          "number" == typeof params.scaleY && (node.scaleY = params.scaleY);
          params.hasOwnProperty("flipX") && (params.flipX ? node.scaleX = -1 * Math.abs(node.getScaleX()) : node.scaleX = 1 * Math.abs(node.getScaleX()));
          params.hasOwnProperty("flipY") && (params.flipY ? node.scaleY = -1 * Math.abs(node.getScaleY()) : node.scaleY = 1 * Math.abs(node.getScaleY()));
          params.hasOwnProperty("active") && (node.active = params.active);
          params.parent && (node.parent = params.parent);
        }
      },
      properties: {}
    });
    zy.Node = module.exports = Node;
    cc._RF.pop();
  }, {} ],
  NormalEffect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2aa43sDH+1KEJccQRsqe8BX", "NormalEffect");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      play: function play(name, cb) {
        var _this = this;
        var ske = this.node.getComponent(sp.Skeleton);
        ske.setCompleteListener(function(trackEntry, t) {
          cb && cb();
          ske.setCompleteListener(null);
          _this.node.angle = 0;
          _this.node.scale = 1;
          _this.node.destroy();
        });
        ske.setAnimation(0, name, true);
      },
      unuse: function unuse() {},
      reuse: function reuse() {}
    });
    cc._RF.pop();
  }, {} ],
  OpenAdsHelper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a863aVTl61ElbDQnfX6cWdV", "OpenAdsHelper");
    "use strict";
    var PACKAGENAMEFB = "com/zygame/utils/OpenAdsHelper";
    var CLASSNAME = "BuAdHelper";
    var OpenAdsHelper = cc.Class({
      statics: {
        showInterstitialAds: function showInterstitialAds(placeId) {
          if (cc.sys.os == cc.sys.OS_ANDROID) {
            placeId = zy.constData.OpenAdsKey[placeId];
            return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "showInteractionAds", "(Ljava/lang/String;)V", placeId);
          }
          if (cc.sys.os == cc.sys.OS_IOS) {
            placeId = zy.constData.OpenAdsKeyIOS[placeId];
            return jsb.reflection.callStaticMethod(CLASSNAME, "showInteractionAds:", placeId);
          }
        },
        isIntersitialReady: function isIntersitialReady(placeId) {
          if (cc.sys.os == cc.sys.OS_ANDROID) {
            placeId = zy.constData.OpenAdsKey[placeId];
            return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "isInteractionReady", "(Ljava/lang/String;)Z", placeId);
          }
          if (cc.sys.os == cc.sys.OS_IOS) {
            placeId = zy.constData.OpenAdsKeyIOS[placeId];
            return jsb.reflection.callStaticMethod(CLASSNAME, "isInteractionReady:", placeId);
          }
        },
        loadIntersitialAds: function loadIntersitialAds(placeId) {
          if (cc.sys.os == cc.sys.OS_ANDROID) {
            placeId = zy.constData.OpenAdsKey[placeId];
            return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "loadExpressAd", "(Ljava/lang/String;)V", placeId);
          }
          if (cc.sys.os == cc.sys.OS_IOS) {
            placeId = zy.constData.OpenAdsKeyIOS[placeId];
            return jsb.reflection.callStaticMethod(CLASSNAME, "loadExpressAd:", placeId);
          }
        },
        isRdAdsReady: function isRdAdsReady(placeId) {
          if (cc.sys.os == cc.sys.OS_ANDROID) {
            placeId = zy.constData.OpenAdsKey[placeId];
            return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "isRewardAdsReady", "(Ljava/lang/String;)Z", placeId);
          }
          if (cc.sys.os == cc.sys.OS_IOS) {
            placeId = zy.constData.OpenAdsKeyIOS[placeId];
            return jsb.reflection.callStaticMethod(CLASSNAME, "isRewardAdsReady:", placeId);
          }
          return false;
        },
        loadRdAds: function loadRdAds(placeId) {
          if (cc.sys.os == cc.sys.OS_ANDROID) {
            placeId = zy.constData.OpenAdsKey[placeId];
            return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "loadRewardAds", "(Ljava/lang/String;)V", placeId);
          }
          if (cc.sys.os == cc.sys.OS_IOS) {
            placeId = zy.constData.OpenAdsKeyIOS[placeId];
            return jsb.reflection.callStaticMethod(CLASSNAME, "loadRewardAds:", placeId);
          }
        },
        showRdAds: function showRdAds(placeId) {
          if (cc.sys.os == cc.sys.OS_ANDROID) {
            placeId = zy.constData.OpenAdsKey[placeId];
            return jsb.reflection.callStaticMethod(PACKAGENAMEFB, "showRewardAds", "(Ljava/lang/String;)V", placeId);
          }
          if (cc.sys.os == cc.sys.OS_IOS) {
            placeId = zy.constData.OpenAdsKeyIOS[placeId];
            return jsb.reflection.callStaticMethod(CLASSNAME, "showRewardAds:", placeId);
          }
        }
      }
    });
    zy.OpenAdsHelper = OpenAdsHelper;
    cc._RF.pop();
  }, {} ],
  PlatformUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6bf91lbppKyJvy6Qf7TX6P", "PlatformUtils");
    "use strict";
    var PACKAGENAME = "com/zygame/utils/PlatformUtils";
    function vibratorShort() {
      if (!zy.dataMng.userData.vibOn) return;
      cc.sys.os == cc.sys.OS_ANDROID ? getVibrator(25) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("PlatformUtils", "vibratorShort");
    }
    function vibratorLong() {
      if (!zy.dataMng.userData.vibOn) return;
      cc.sys.os == cc.sys.OS_ANDROID ? getVibrator(100) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("PlatformUtils", "vibratorLong");
    }
    function getVibrator(t) {
      cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAME, "vibrator", "(I)V", t) : cc.sys.os == cc.sys.OS_IOS;
    }
    function getMobilePhoneID() {
      return cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAME, "getDeviceID", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("PlatformUtils", "getIdfa") : "";
    }
    function getMobileMac() {
      return getMobilePhoneID();
    }
    function getMobileIdfa() {
      return getMobilePhoneID();
    }
    function getAppVersion() {
      return cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAME, "getPackageVersion", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("PlatformUtils", "getAppVersion") : "1.0.0w";
    }
    function rmSplash() {
      cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAME, "rmSplashView", "()V") : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("RootViewController", "removeSplashView");
    }
    module.exports = {
      getVibrator: getVibrator,
      getMobilePhoneID: getMobilePhoneID,
      getAppVersion: getAppVersion,
      vibratorShort: vibratorShort,
      vibratorLong: vibratorLong,
      rmSplash: rmSplash,
      getMobileIdfa: getMobileIdfa,
      getMobileMac: getMobileMac
    };
    cc._RF.pop();
  }, {} ],
  PopBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0214dGdWP5Aqaga6UmWOdvS", "PopBase");
    "use strict";
    var PopBase = cc.Class({
      extends: cc.Component,
      properties: {
        maskOpacity: 255,
        touchClose: true
      },
      initBase: function initBase(params, popName) {
        false;
        this.popName = popName;
        this.componentName = null;
        this.component = null;
        var popNameSpArr = this.popName.split("/");
        if (popNameSpArr.length > 0) {
          this.componentName = popNameSpArr[popNameSpArr.length - 1];
          this.component = this.node.getComponent(this.componentName);
        }
        this.onLaunchedCallback = params.onLaunchedCallback;
        this.onClosedCallback = params.onClosedCallback;
        zy.Button.createNode({
          name: "maskBtn",
          zIndex: zy.constData.ZIndex.POP_MASK,
          parent: this.node,
          url: "textures/common/mask",
          touchAction: false,
          commonClickAudio: false,
          opacity: this.maskOpacity,
          width: 5 * zy.constData.DesignSize.width,
          height: 5 * zy.constData.DesignSize.height,
          eventHandler: {
            target: this.node,
            component: this.componentName,
            customEventData: this.componentName,
            handler: this.touchClose ? "closeCallback" : null
          }
        });
        this.onLaunchedCallback && this.onLaunchedCallback();
        this.component.popName = this.popName;
        this.component.init && this.component.init(params);
      },
      cleanBase: function cleanBase() {
        this.component && this.component.clean && this.component.clean();
        cc.isValid(this.node) && this.node.destroy();
        this.onClosedCallback && this.onClosedCallback();
      }
    });
    zy.PopBase = module.exports = PopBase;
    cc._RF.pop();
  }, {} ],
  ProgressBar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7781cgsMwdAWZJB8Vw/YTXI", "ProgressBar");
    "use strict";
    cc.Class({
      extends: cc.ProgressBar,
      setProgressBarToPercent: function setProgressBarToPercent(t, p, cb) {
        if (t <= 0) {
          this.progress = p;
          cb && cb();
          return;
        }
        this.unscheduleAllCallbacks();
        this.speed = (p - this.progress) / t;
        this.desProgress = p;
        this.progressCb = cb;
        this.schedule(this.updateProgressBar.bind(this), 0);
      },
      updateProgressBar: function updateProgressBar(dt) {
        if (this.speed > 0 && this.progress < this.desProgress || this.speed < 0 && this.progress > this.desProgress) this.progress += this.speed * dt; else {
          this.progress = this.desProgress;
          this.unscheduleAllCallbacks();
          this.progressCb && this.progressCb();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  ProgressCircle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84313JeWl9JKJA3YMCZTbFD", "ProgressCircle");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bar: cc.Sprite,
        progress: {
          default: 0,
          min: 0,
          max: 1,
          notify: function notify() {
            this._updateProgress();
          }
        }
      },
      _updateProgress: function _updateProgress() {
        if (!this.bar || this.bar.type != cc.Sprite.Type.FILLED) {
          cc.log("\u5706\u5f62\u8fdb\u5ea6\u6761\u7684bar\u5fc5\u987b\u8bbe\u4e3afilled\u6a21\u5f0f\u3002");
          return;
        }
        this.bar.fillRange = this.progress;
      },
      setProgressBarToPercent: function setProgressBarToPercent(t, p, cb) {
        if (t <= 0) {
          this.progress = p;
          cb && cb();
          return;
        }
        this.unscheduleAllCallbacks();
        this.speed = (p - this.progress) / t;
        this.desProgress = p;
        this.progressCb = cb;
        this.schedule(this.updateProgressBar.bind(this), 0);
      },
      updateProgressBar: function updateProgressBar(dt) {
        if (this.speed > 0 && this.progress < this.desProgress || this.speed < 0 && this.progress > this.desProgress) this.progress += this.speed * dt; else {
          this.progress = this.desProgress;
          this.unscheduleAllCallbacks();
          this.progressCb && this.progressCb();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  RangerLogger: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "972dd3so6xBQbKfwz5fE+GK", "RangerLogger");
    "use strict";
    var PACKAGENAME = "com/zygame/utils/RangerAppLogHelper";
    cc.Class({
      statics: {
        logEventWatchAds: function logEventWatchAds(placeId) {
          if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(PACKAGENAME, "logEvent", "(Ljava/lang/String;)V", placeId);
          cc.sys.os == cc.sys.OS_IOS;
        },
        logEventLogin: function logEventLogin(uid) {
          if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(PACKAGENAME, "logLogin", "(Ljava/lang/String;)V", uid);
          cc.sys.os == cc.sys.OS_IOS;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  SettingPop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa366UT5FBP96nc5xY90RAT", "SettingPop");
    "use strict";
    var PlatformUtils = require("./../framework/platform/PlatformUtils");
    cc.Class({
      extends: cc.Component,
      properties: {
        vibNode: cc.Node,
        soundsNode: cc.Node,
        soudsVolume: cc.Node,
        versionLabel: cc.Label
      },
      init: function init(params) {
        this.soundsNode.getComponent("SwitchControl").setIsOn(zy.audio.getBGMEnabled(), false);
        this.soudsVolume.getComponent(cc.Slider).progress = zy.audio.getBGMVomue();
        this.versionLabel.string = "v" + PlatformUtils.getAppVersion() + "  c" + CHANNEL_ID;
      },
      onVibCall: function onVibCall() {
        zy.audioMng.playButtonAudio();
        zy.dataMng.userData.vibOn = !zy.dataMng.userData.vibOn;
      },
      onSoundsCall: function onSoundsCall(sc) {
        zy.audio.playEffect(zy.audio.Effect.CommonClick);
        zy.audio.setBGMEnabled(sc.isOn);
        zy.audio.setEffectsEnabled(sc.isOn);
      },
      sliderCallback: function sliderCallback(slider) {
        zy.audio.setBGMVolume(slider.progress);
        zy.audio.setEffectsVolume(slider.progress);
      },
      closeCallback: function closeCallback() {
        zy.director.closePop(this.popName);
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/platform/PlatformUtils": "PlatformUtils"
  } ],
  ShaderUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4a0d1DD3flJtKMaQ07c8zdn", "ShaderUtils");
    "use strict";
    var Effect = {
      Gray: "Gray",
      Normal: "Normal",
      Bright: "Bright"
    };
    cc.Class({
      extends: cc.Component,
      statics: {
        Effect: Effect,
        Shader: {
          Normal: {
            vert_web: "Default_noMVP_vert",
            vert_native: "Default_noMVP_vert",
            frag: "Normal_frag"
          },
          Gray: {
            vert_web: "Default_noMVP_vert",
            vert_native: "Default_noMVP_vert",
            frag: "Gray_frag"
          },
          Bright: {
            vert_web: "Default_noMVP_vert",
            vert_native: "Default_noMVP_vert",
            frag: "Bright_frag"
          }
        },
        init: function init() {
          this.shaderPrograms = {};
        },
        setShader: function setShader(renderComp, shaderName) {
          if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) return;
          var materialName = "";
          shaderName == Effect.Normal ? materialName = "2d-sprite" : shaderName == Effect.Gray ? materialName = "2d-gray-sprite" : shaderName == Effect.Bright && (materialName = "2d-bright-sprite");
          var material = cc.Material.getBuiltinMaterial(materialName);
          if (material) {
            material = cc.Material.getInstantiatedMaterial(material, renderComp);
            renderComp.setMaterial(0, material);
          } else cc.log("ShaderUtils: matrial: " + shaderName + " is not exsit");
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Sprite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6143cwQ3s5Gq5QJ4PeOZFhZ", "Sprite");
    "use strict";
    var Sprite = cc.Class({
      extends: cc.Sprite,
      statics: {
        createNode: function createNode(params) {
          var node = new cc.Node();
          node.addComponent(zy.Sprite);
          zy.Sprite.updateNode(node, params);
          return node;
        },
        updateNode: function updateNode(node, params) {
          var sprite = node.getComponent(cc.Sprite);
          var url = params.url;
          var spriteFrame = params.spriteFrame;
          var loadCallback = params.loadCallback;
          var updateFunc = function updateFunc(_spriteFrame) {
            _spriteFrame && (sprite.spriteFrame = _spriteFrame);
            params.hasOwnProperty("state") && sprite.setState(params.state);
            params.srcBlendFactor && (sprite.srcBlendFactor = params.srcBlendFactor);
            params.dstBlendFactor && (sprite.dstBlendFactor = params.dstBlendFactor);
            params.hasOwnProperty("parent") && !cc.isValid(params.parent) || zy.Node.updateNode(node, params);
          };
          if (url) {
            sprite.url = url;
            cc.loader.loadRes(url, cc.SpriteFrame, null, function(err, spriteFrame) {
              if (err) cc.error("load: " + url + " error."); else if (cc.isValid(node) && sprite.url == url) {
                sprite.spriteFrame = spriteFrame;
                updateFunc();
              }
              loadCallback && loadCallback(err, node);
            });
          } else spriteFrame ? updateFunc(spriteFrame) : updateFunc();
        }
      }
    });
    zy.Sprite = module.exports = Sprite;
    cc._RF.pop();
  }, {} ],
  SwitchControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5c214EcPrdAlL5yW61AqZqh", "SwitchControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        _isOn: true,
        isOn: {
          set: function set(v) {
            this.setIsOn(v, true);
          },
          get: function get() {
            return this._isOn;
          }
        },
        interactable: true,
        bgOnSp: cc.Sprite,
        bgOffSp: cc.Sprite,
        barSp: cc.Sprite,
        switchEvents: {
          default: [],
          type: cc.Component.EventHandler
        }
      },
      setIsOn: function setIsOn(isOn) {
        var ani = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        this._isOn = isOn;
        this._updateState(ani);
      },
      _updateState: function _updateState(ani) {
        var posX = this.isOn ? this.bgOffSp.node.x : this.bgOnSp.node.x;
        if (false, ani) {
          this.barSp.node.stopAllActions();
          this.barSp.node.runAction(cc.moveTo(.1, cc.v2(posX, this.barSp.node.y)));
        } else this.barSp.node.x = posX;
      },
      onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      },
      onClick: function onClick(event) {
        if (!this.interactable) return;
        this.isOn = !this.isOn;
        this.switchEvents && cc.Component.EventHandler.emitEvents(this.switchEvents, this);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Tip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6fc55rUrPFDxLyLc2cpq/Zh", "Tip");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        tipLabel: cc.Label,
        tipBg: cc.Node
      },
      statics: {
        tipNode: null,
        show: function show(text) {
          cc.loader.loadRes("prefabs/common/Tip", cc.Prefab, function(err, prefab) {
            if (!err) {
              cc.isValid(this.tipNode) && this.tipNode.destroy();
              this.tipNode = cc.instantiate(prefab);
              this.tipNode.zIndex = zy.constData.ZIndex.TIP;
              this.tipNode.parent = zy.director.getUiRoot();
              this.tipNode.getComponent("Tip").init(text);
            }
          }.bind(this));
        }
      },
      onLoad: function onLoad() {
        this.originalWidth = this.tipBg.width;
        this.originalHeight = this.tipBg.height;
        this.tipBg.opacity = 0;
        this.tipLabel.string = "";
      },
      init: function init(text) {
        this.text = text;
        this.node.y = 0;
        this.tipLabel.string = this.text;
        this.tipLabel.node.height > this.originalHeight && (this.tipBg.height = this.tipLabel.node.height + 50);
        var seq = cc.sequence(cc.spawn(cc.moveBy(.25, cc.v2(0, 100)), cc.fadeIn(.25)), cc.delayTime(1.25), cc.spawn(cc.moveBy(.25, cc.v2(0, 100)), cc.fadeOut(.25)), cc.callFunc(function() {
          this.node.destroy();
        }.bind(this)));
        this.tipBg.runAction(seq);
      }
    });
    cc._RF.pop();
  }, {} ],
  TrackingLogger: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6f7dejhclFBULHAZ3Q42UcD", "TrackingLogger");
    "use strict";
    var PACKAGENAME = "com/zygame/utils/TrackingHelper";
    var CLASSNAME = "AppController";
    cc.Class({
      statics: {
        logEventWatchAds: function logEventWatchAds(placeId) {
          var eventName = "event_" + placeId[placeId.length - 1];
          if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(PACKAGENAME, "logEvent", "(Ljava/lang/String;)V", eventName);
          if (cc.sys.os == cc.sys.OS_IOS) return jsb.reflection.callStaticMethod(CLASSNAME, "logEvent:", eventName);
        },
        logEventLogin: function logEventLogin(uid) {
          if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(PACKAGENAME, "logLogin", "(Ljava/lang/String;)V", uid);
          if (cc.sys.os == cc.sys.OS_IOS) return jsb.reflection.callStaticMethod(CLASSNAME, "logLogin:", uid);
        },
        logEventRegister: function logEventRegister(uid) {
          if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(PACKAGENAME, "logRegister", "(Ljava/lang/String;)V", uid);
          if (cc.sys.os == cc.sys.OS_IOS) return jsb.reflection.callStaticMethod(CLASSNAME, "logRegister:", uid);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Turning: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4a8ecMKHTROFaHFa4n4S+VV", "Turning");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        turn: cc.Sprite
      },
      prepare: function prepare() {
        this.turnStatus = 0;
        this.curSpeed = 0;
        this.spinTime = 0;
        this.gearNum = 8;
        this.gearAngle = 360 / this.gearNum;
        this.defaultAngle = 180;
        this.finalAngle = 0;
        this.decAngle = 360;
        this.springback = false;
        this.targetId = 6;
        this.maxSpeed = 10;
        this.duration = 2;
        this.acc = .1;
      },
      init: function init() {
        this.prepare();
      },
      loadRewardItem: function loadRewardItem() {},
      startTurn: function startTurn(retId) {
        if (0 != this.turnStatus) return;
        this.caculateFinalAngle(retId);
        this.turnStatus = 1;
        this.curSpeed = 0;
        this.spinTime = 0;
      },
      forceStopTurn: function forceStopTurn() {
        this.turnStatus = 0;
        this.turn.node.rotation = this.finalAngle;
      },
      caculateFinalAngle: function caculateFinalAngle(targetId) {
        if (targetId <= 0) {
          cc.log("targetId must be big than 0");
          targetId = 1;
        }
        this.targetId = targetId;
        cc.log("====targetId:" + this.targetId);
        this.finalAngle = 360 - (this.targetId - 1) * this.gearAngle + this.defaultAngle;
        this.springback && (this.finalAngle += this.gearAngle);
      },
      showRes: function showRes() {
        this.forceStopTurn();
        cc.log("show res: " + this.targetId);
      },
      update: function update(dt) {
        if (0 == this.turnStatus) return;
        if (1 == this.turnStatus) {
          this.spinTime += dt;
          this.turn.node.rotation += this.curSpeed;
          if (this.curSpeed < this.maxSpeed) this.curSpeed += this.acc; else {
            if (this.spinTime < this.duration) return;
            this.turn.node.rotation = this.finalAngle;
            this.turnStatus = 2;
          }
        } else if (2 == this.turnStatus) {
          var curRo = this.turn.node.rotation;
          var hadRo = curRo - this.finalAngle;
          this.curSpeed = this.maxSpeed * ((this.decAngle - hadRo) / this.decAngle) + .2;
          this.turn.node.rotation = curRo + this.curSpeed;
          if (this.decAngle - hadRo <= 0) {
            this.turnStatus = 0;
            this.turn.node.rotation = this.finalAngle;
            if (this.springback) {
              var act = cc.rotateBy(.5, -this.gearAngle);
              var seq = cc.sequence(cc.delayTime(.2), act, cc.callFunc(this.showRes, this));
              this.turn.node.runAction(seq);
            } else this.showRes();
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  TurretAttrData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9932fs7721PH7offA2qsG3P", "TurretAttrData");
    "use strict";
    var Utils = require("./../framework/common/UtilsOther");
    var DataBase = require("./DataBase");
    cc.Class({
      extends: DataBase,
      ctor: function ctor() {
        this.fileDir = "config/turretAttrData";
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
        this.dataLen = data.length;
        this.dataObj = Utils.arrayToDict(this.dataObj, "id");
      },
      getTurretAttr: function getTurretAttr(id) {
        var data = this.dataObj[id];
        return data;
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/common/UtilsOther": "UtilsOther",
    "./DataBase": "DataBase"
  } ],
  TurretData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d37da0C6ppCwb3kOifmdpwV", "TurretData");
    "use strict";
    var Utils = require("./../framework/common/UtilsOther");
    var DataBase = require("./DataBase");
    cc.Class({
      extends: DataBase,
      ctor: function ctor() {
        this.fileDir = "config/turretData";
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
        this.dataObj = Utils.arrayToDict(this.dataObj, "id");
      },
      getTurretDataById: function getTurretDataById(id, type) {
        type = type > 9 ? type : "0" + type;
        var key = "player" + id + type;
        var data = this.dataObj[key];
        return data;
      },
      getTurretAttack: function getTurretAttack(id, type, level) {
        var data = this.getTurretDataById(id, type);
        var attack = data["level" + level];
        return attack;
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/common/UtilsOther": "UtilsOther",
    "./DataBase": "DataBase"
  } ],
  TurretPriceData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fef97U8T+RCgKLaTujKtDS+", "TurretPriceData");
    "use strict";
    var Utils = require("./../framework/common/UtilsOther");
    var DataBase = require("./DataBase");
    cc.Class({
      extends: DataBase,
      ctor: function ctor() {
        this.fileDir = "config/turretPriceData";
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
        this.len = this.dataObj.length;
        this.dataObj = Utils.arrayToDict(this.dataObj, "level");
      },
      getTurretUpdatePrice: function getTurretUpdatePrice(level) {
        var data = this.dataObj[level];
        var price = data["price"];
        return price;
      },
      getTurretMaxLevel: function getTurretMaxLevel() {
        return this.len || 0;
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/common/UtilsOther": "UtilsOther",
    "./DataBase": "DataBase"
  } ],
  TurretSecondData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bfb510NO09K1IJyliUWpcSd", "TurretSecondData");
    "use strict";
    var Utils = require("./../framework/common/UtilsOther");
    var DataBase = require("./DataBase");
    cc.Class({
      extends: DataBase,
      ctor: function ctor() {
        this.fileDir = "config/turretSecondData";
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
        this.dataObj = Utils.arrayToDict(this.dataObj, "level");
      },
      getTurretSecondAttack: function getTurretSecondAttack(level) {
        var data = this.dataObj[level];
        var attack = data["attack"];
        return attack;
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/common/UtilsOther": "UtilsOther",
    "./DataBase": "DataBase"
  } ],
  UI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3d0d8pVBVlMerkrdm4ogFdE", "UI");
    "use strict";
    cc.Class({
      extends: cc.Component,
      statics: {
        init: function init() {
          this.alert = require("Alert");
          this.loading = require("Loading");
          this.tip = require("Tip");
        },
        seekChildByName: function seekChildByName(node, name) {
          if (node.name == name) return node;
          for (var i in node.children) {
            var child = node.children[i];
            if (child) {
              var res = zy.ui.seekChildByName(child, name);
              if (res) return res;
            }
          }
        },
        bgScaleAction: function bgScaleAction(node) {
          var params = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          node.scale = .5;
          var seq = cc.sequence(cc.scaleTo(.2, 1).easing(cc.easeSineOut()), cc.callFunc(function() {
            params.callback && params.callback();
          }));
          node.runAction(seq);
        },
        numScaleAction: function numScaleAction(node, params) {
          node.stopAllActions();
          var seq = cc.sequence(cc.scaleTo(.1, 1.2).easing(cc.easeSineOut()), cc.scaleTo(.1, .8).easing(cc.easeSineInOut()), cc.scaleTo(.1, 1.1).easing(cc.easeSineInOut()), cc.scaleTo(.1, .95).easing(cc.easeSineInOut()), cc.scaleTo(.1, 1).easing(cc.easeSineInOut()));
          node.runAction(seq);
        },
        btnScaleActoin: function btnScaleActoin(btnList) {
          for (var i in btnList) {
            var btn = btnList[i];
            var btnScale = btn.scale;
            btn.stopAllActions();
            btn.scale = btnScale / 4;
            btn.runAction(cc.sequence(cc.scaleTo(.12, btnScale + .1), cc.scaleTo(.08, btnScale - .1), cc.scaleTo(.08, btnScale)));
          }
        },
        shakeScreen: function shakeScreen(params) {
          var node = params.node;
          var times = params.times ? params.times : 1;
          var offsetX = params.hasOwnProperty("offsetX") ? params.offsetX : 20;
          var offsetY = params.hasOwnProperty("offsetY") ? params.offsetY : 20;
          var ratio = params.ratio ? params.ratio : 1;
          var rate = params.rate ? params.rate : 1 / 15;
          var basePosition = node.basePosition ? node.basePosition : node.position;
          node.stopAllActions();
          node.setPosition(basePosition);
          node.basePosition = basePosition;
          var actArray = [];
          var moveAction = cc.moveBy(rate, cc.v2(offsetX, offsetY)).easing(cc.easeOut(1));
          actArray.push(moveAction);
          for (var i = 0; i < times - 1; i++) {
            var moveAction_1 = cc.moveBy(rate, cc.v2(2 * -offsetX, 2 * -offsetY)).easing(cc.easeOut(1));
            actArray.push(moveAction_1);
            var moveAction_2 = cc.moveBy(rate, cc.v2(3 * offsetX / 2, 3 * offsetY / 2)).easing(cc.easeOut(1));
            actArray.push(moveAction_2);
            offsetX /= ratio;
            offsetY /= ratio;
          }
          var backAction = cc.moveTo(rate, basePosition).easing(cc.easeOut(1));
          actArray.push(backAction);
          node.runAction(cc.sequence(actArray));
        },
        flyNode: function flyNode(node, parent, startPos, endPos, num, cb) {
          if (num <= 0) return;
          startPos = parent.convertToNodeSpaceAR(startPos);
          endPos = parent.convertToNodeSpaceAR(endPos);
          var count = 0;
          var _loop = function _loop(i) {
            var flyNode = cc.instantiate(node);
            flyNode.position = startPos;
            flyNode.parent = parent;
            var midPos = startPos.add(endPos).div(2);
            var midPosVec = midPos.sub(startPos);
            var rotate = 5 * Math.round(10 * Math.random()) * (Math.random() > .5 ? 1 : -1);
            var desPosVec = midPosVec.rotate(rotate * Math.PI / 180);
            var desPos = startPos.add(desPosVec);
            var distance = Math.sqrt(Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2));
            var bezierList = [ desPos, desPos, endPos ];
            var bezier = cc.bezierTo(distance / 3e3 + .5 * Math.random(), bezierList);
            var seq = cc.sequence(bezier, cc.callFunc(function() {
              count++;
              cb && cb(count >= num);
              flyNode.destroy();
            }));
            flyNode.runAction(seq);
          };
          for (var i = 0; i < num; i++) _loop(i);
        }
      }
    });
    cc._RF.pop();
  }, {
    Alert: "Alert",
    Loading: "Loading",
    Tip: "Tip"
  } ],
  UPLTVAndroid: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a8defv/RNBAp70l9SJpqyMU", "UPLTVAndroid");
    "use strict";
    var classJavaName = "com/up/ads/cocosjs/JsProxy";
    var showLog = false;
    var upltva = upltva || {
      setShowLog: function setShowLog(print) {
        void 0 != print && null != print && (showLog = print);
      },
      printJsLog: function printJsLog(msg) {
        showLog && void 0 != msg && null != msg && jsb.reflection.callStaticMethod("android/util/Log", "i", "(Ljava/lang/String;Ljava/lang/String;)I", "cocos2dx-js", msg);
      },
      initAndroidSDK: function initAndroidSDK(androidAppKey, vokecall, callname) {
        jsb.reflection.callStaticMethod(classJavaName, "initSDK", "(Ljava/lang/String;Ljava/lang/String;)V", androidAppKey, callname);
        jsb.reflection.callStaticMethod(classJavaName, "setInvokeDelegate", "(Ljava/lang/String;)V", vokecall);
      },
      initAndroidAbtConfigJson: function initAndroidAbtConfigJson(gameAccountId, isCompleteTask, isPaid, promotionChannelName, gender, age, tagstring) {
        jsb.reflection.callStaticMethod(classJavaName, "initAbtConfigJsonForJs", "(Ljava/lang/String;ZILjava/lang/String;Ljava/lang/String;ILjava/lang/String;)V", gameAccountId, isCompleteTask, isPaid, promotionChannelName, gender, age, tagstring);
      },
      getAndroidAbtConfig: function getAndroidAbtConfig(cpPlaceId) {
        return jsb.reflection.callStaticMethod(classJavaName, "getAbtConfig", "(Ljava/lang/String;)Ljava/lang/String;", cpPlaceId);
      },
      showAndroidRewardDebugUI: function showAndroidRewardDebugUI() {
        jsb.reflection.callStaticMethod(classJavaName, "showRewardDebugActivity", "()V");
      },
      setAndroidRewardVideoLoadCallback: function setAndroidRewardVideoLoadCallback() {
        jsb.reflection.callStaticMethod(classJavaName, "setRewardVideoLoadCallback", "()V");
      },
      isAndroidRewardReady: function isAndroidRewardReady() {
        return jsb.reflection.callStaticMethod(classJavaName, "isRewardReady", "()Z");
      },
      showAndroidRewardVideo: function showAndroidRewardVideo(cpPlaceId) {
        null == cpPlaceId && (cpPlaceId = "reward_video");
        jsb.reflection.callStaticMethod(classJavaName, "showRewardVideo", "(Ljava/lang/String;)V", cpPlaceId);
      },
      setAndroidInterstitialLoadCallback: function setAndroidInterstitialLoadCallback(cpPlaceId) {
        jsb.reflection.callStaticMethod(classJavaName, "setInterstitialCallbackAt", "(Ljava/lang/String;)V", cpPlaceId);
      },
      isAndroidInterstitialReadyAsyn: function isAndroidInterstitialReadyAsyn(cpPlaceId, call) {
        jsb.reflection.callStaticMethod(classJavaName, "isInterstitialReadyForJs", "(Ljava/lang/String;Ljava/lang/String;)V", cpPlaceId, call);
      },
      isAndroidInterstitialReady: function isAndroidInterstitialReady(cpPlaceId) {
        return jsb.reflection.callStaticMethod(classJavaName, "isInterstitialReady", "(Ljava/lang/String;)Z", cpPlaceId);
      },
      showAndroidInterstitialAd: function showAndroidInterstitialAd(cpPlaceId) {
        jsb.reflection.callStaticMethod(classJavaName, "showInterstitialForJs", "(Ljava/lang/String;)V", cpPlaceId);
      },
      showAndroidInterstitialDebugUI: function showAndroidInterstitialDebugUI() {
        jsb.reflection.callStaticMethod(classJavaName, "showInterstitialDebugActivityForJs", "()V");
      },
      removeAndroidBannerAdAt: function removeAndroidBannerAdAt(cpPlaceId) {
        jsb.reflection.callStaticMethod(classJavaName, "removeBanner", "(Ljava/lang/String;)V", cpPlaceId);
      },
      showAndroidBannerAdAtTop: function showAndroidBannerAdAtTop(cpPlaceId) {
        jsb.reflection.callStaticMethod(classJavaName, "showTopBanner", "(Ljava/lang/String;)V", cpPlaceId);
      },
      showAndroidBannerAdAtBottom: function showAndroidBannerAdAtBottom(cpPlaceId) {
        jsb.reflection.callStaticMethod(classJavaName, "showBottomBanner", "(Ljava/lang/String;)V", cpPlaceId);
      },
      hideAndroidBannerAdAtTop: function hideAndroidBannerAdAtTop() {
        jsb.reflection.callStaticMethod(classJavaName, "hideTopBanner", "()V");
      },
      hideAndroidBannerAdAtBottom: function hideAndroidBannerAdAtBottom() {
        jsb.reflection.callStaticMethod(classJavaName, "hideBottomBanner", "()V");
      },
      showAndroidIconAdAt: function showAndroidIconAdAt(x, y, width, height, rotationAngle, cpPlaceId) {
        jsb.reflection.callStaticMethod(classJavaName, "showIconAd", "(IIIIILjava/lang/String;)V", x, y, width, height, rotationAngle, cpPlaceId);
      },
      removeAndroidIconAdAt: function removeAndroidIconAdAt(cpPlaceId) {
        jsb.reflection.callStaticMethod(classJavaName, "removeIconAd", "(Ljava/lang/String;)V", cpPlaceId);
      },
      loadAndroidAdsByManual: function loadAndroidAdsByManual() {
        jsb.reflection.callStaticMethod(classJavaName, "loadAnroidAdsByManual", "()V");
      },
      exitAndroidApp: function exitAndroidApp() {
        jsb.reflection.callStaticMethod(classJavaName, "exitAndroidApp", "()V");
      },
      setAndroidManifestPackageName: function setAndroidManifestPackageName(pkg) {
        jsb.reflection.callStaticMethod(classJavaName, "setManifestPackageName", "(Ljava/lang/String;)V", pkg);
      },
      onAndroidBackPressed: function onAndroidBackPressed() {
        jsb.reflection.callStaticMethod(classJavaName, "onBackPressed", "()V");
      },
      setAndroidCustomerId: function setAndroidCustomerId(androidid) {
        jsb.reflection.callStaticMethod(classJavaName, "setCustomerIdForJs", "(Ljava/lang/String;)V", androidid);
      },
      updateAndroidAccessPrivacyInfoStatus: function updateAndroidAccessPrivacyInfoStatus(gdprPermissionEnumValue) {
        jsb.reflection.callStaticMethod(classJavaName, "updateAccessPrivacyInfoStatus", "(I)V", gdprPermissionEnumValue);
      },
      getAndroidAccessPrivacyInfoStatus: function getAndroidAccessPrivacyInfoStatus() {
        return jsb.reflection.callStaticMethod(classJavaName, "getAccessPrivacyInfoStatus", "()I");
      },
      notifyAndroidAccessPrivacyInfoStatus: function notifyAndroidAccessPrivacyInfoStatus(callback, callId) {
        jsb.reflection.callStaticMethod(classJavaName, "notifyAccessPrivacyInfoStatus", "(Ljava/lang/String;I)V", callback, callId);
      },
      isAndroidEuropeanUnionUser: function isAndroidEuropeanUnionUser(callback, callId) {
        jsb.reflection.callStaticMethod(classJavaName, "isEuropeanUnionUser", "(Ljava/lang/String;I)V", callback, callId);
      },
      reportIvokePluginMethodReceive: function reportIvokePluginMethodReceive(msg) {
        jsb.reflection.callStaticMethod(classJavaName, "reportIvokePluginMethodReceive", "(Ljava/lang/String;)V", msg);
      },
      reportRDRewardClose: function reportRDRewardClose(msg) {
        jsb.reflection.callStaticMethod(classJavaName, "reportRDRewardClose", "(Ljava/lang/String;)V", msg);
      },
      reportRDRewardClick: function reportRDRewardClick(msg) {
        jsb.reflection.callStaticMethod(classJavaName, "reportRDRewardClick", "(Ljava/lang/String;)V", msg);
      },
      reportRDRewardGiven: function reportRDRewardGiven(msg) {
        jsb.reflection.callStaticMethod(classJavaName, "reportRDRewardGiven", "(Ljava/lang/String;)V", msg);
      },
      reportRDShowDid: function reportRDShowDid(msg) {
        jsb.reflection.callStaticMethod(classJavaName, "reportRDShowDid", "(Ljava/lang/String;)V", msg);
      },
      reportRDRewardCancel: function reportRDRewardCancel(msg) {
        jsb.reflection.callStaticMethod(classJavaName, "reportRDRewardCancel", "(Ljava/lang/String;)V", msg);
      },
      reportILClose: function reportILClose(msg, cpid) {
        jsb.reflection.callStaticMethod(classJavaName, "reportILClose", "(Ljava/lang/String;Ljava/lang/String;)V", void 0 == cpid ? "" : cpid, msg);
      },
      reportILClick: function reportILClick(msg, cpid) {
        jsb.reflection.callStaticMethod(classJavaName, "reportILClick", "(Ljava/lang/String;Ljava/lang/String;)V", void 0 == cpid ? "" : cpid, msg);
      },
      reportILShowDid: function reportILShowDid(msg, cpid) {
        jsb.reflection.callStaticMethod(classJavaName, "reportILShowDid", "(Ljava/lang/String;Ljava/lang/String;)V", void 0 == cpid ? "" : cpid, msg);
      },
      isOnlineDebugReportEnable: function isOnlineDebugReportEnable() {
        return jsb.reflection.callStaticMethod(classJavaName, "isReportOnlineEnable", "()Z");
      },
      isAndroidLogOpened: function isAndroidLogOpened() {
        return jsb.reflection.callStaticMethod(classJavaName, "isLogOpened", "()Z");
      },
      setAndroidIsChild: function setAndroidIsChild(isChild) {
        jsb.reflection.callStaticMethod(classJavaName, "setIsChild", "(Z)V", isChild);
      },
      setAndroidBirthday: function setAndroidBirthday(year, month) {
        jsb.reflection.callStaticMethod(classJavaName, "setBirthday", "(II)V", year, month);
      },
      autoOneKeyInspectByAndroid: function autoOneKeyInspectByAndroid() {
        jsb.reflection.callStaticMethod(classJavaName, "autoOneKeyInspect", "()V");
      },
      tellToDoctorByAndroid: function tellToDoctorByAndroid(action, placeid, msg) {
        jsb.reflection.callStaticMethod(classJavaName, "tellToDoctor", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", action, placeid, msg);
      },
      setAppsFlyerUIDByAndroid: function setAppsFlyerUIDByAndroid(uid) {
        jsb.reflection.callStaticMethod(classJavaName, "setAppsflyerUID", "(Ljava/lang/String;)V", uid);
      },
      setAdjustIdByAndroid: function setAdjustIdByAndroid(ajid) {
        jsb.reflection.callStaticMethod(classJavaName, "setAdjustID", "(Ljava/lang/String;)V", ajid);
      }
    };
    module.exports = upltva;
    cc._RF.pop();
  }, {} ],
  UPLTVIos: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "56bf2BM76RD3pMS97NjxIwH", "UPLTVIos");
    "use strict";
    var classIosName = "UpAdsBrigeJs";
    var showLog = false;
    var upltvoc = upltvoc || {
      setShowLog: function setShowLog(print) {
        void 0 != print && null != print && (showLog = print);
      },
      printJsLog: function printJsLog(msg) {
        showLog && void 0 != msg && null != msg && jsb.reflection.callStaticMethod(classIosName, "printJsLog:", msg);
      },
      initIosSDK: function initIosSDK(appkey, zone, invokecallback, callback) {
        void 0 != callback && null != callback ? jsb.reflection.callStaticMethod(classIosName, "initSdkByJsWithAppKey:zone:withCallback:", appkey, zone, callback) : jsb.reflection.callStaticMethod(classIosName, "initSdkByJsWithAppKey:zone:", appkey, zone);
        jsb.reflection.callStaticMethod(classIosName, "setVokeMethod:", invokecallback);
      },
      initIosAbtConfigJson: function initIosAbtConfigJson(gameAccountId, isCompleteTask, isPaid, promotionChannelName, gender, age, tagstring) {
        jsb.reflection.callStaticMethod(classIosName, "initAbtConfigJsonByJs:complete:paid:channel:gender:age:tags:", gameAccountId, isCompleteTask, isPaid, promotionChannelName, gender, age, tagstring);
      },
      getIosAbtConfig: function getIosAbtConfig(cpPlaceId) {
        var r = jsb.reflection.callStaticMethod(classIosName, "getIosAbtConfigByJs:", cpPlaceId);
        return r;
      },
      showIosRewardDebugUI: function showIosRewardDebugUI() {
        jsb.reflection.callStaticMethod(classIosName, "showRewardDebugActivityByJs");
      },
      setIosRewardVideoLoadCallback: function setIosRewardVideoLoadCallback() {
        jsb.reflection.callStaticMethod(classIosName, "setRewardVideoLoadCallbackByJs");
      },
      isIosRewardReady: function isIosRewardReady() {
        return jsb.reflection.callStaticMethod(classIosName, "isIosRewardReadyByJs");
      },
      showIosRewardVideo: function showIosRewardVideo(cpPlaceId) {
        jsb.reflection.callStaticMethod(classIosName, "showIosRewardVideoByJs:", cpPlaceId);
      },
      isIosInterstitialReadyAsyn: function isIosInterstitialReadyAsyn(cpPlaceId, callback) {
        jsb.reflection.callStaticMethod(classIosName, "isInterstitialReadyAsynByJs:callback:", cpPlaceId, callback);
      },
      isIosInterstitialReady: function isIosInterstitialReady(cpPlaceId) {
        return jsb.reflection.callStaticMethod(classIosName, "isInterstitialReadyByJs:", cpPlaceId);
      },
      showIosInterstitialAd: function showIosInterstitialAd(cpPlaceId) {
        jsb.reflection.callStaticMethod(classIosName, "showInterstitialByJs:", cpPlaceId);
      },
      setIosInterstitialLoadCallback: function setIosInterstitialLoadCallback(cpPlaceId) {
        jsb.reflection.callStaticMethod(classIosName, "setInterstitialCallbackByJs:", cpPlaceId);
      },
      showIosInterstitialDebugUI: function showIosInterstitialDebugUI() {
        jsb.reflection.callStaticMethod(classIosName, "showInterstitialDebugActivityByJs");
      },
      removeIosBannerAdAt: function removeIosBannerAdAt(cpPlaceId) {
        jsb.reflection.callStaticMethod(classIosName, "removeBannerByJs:", cpPlaceId);
      },
      showIosBannerAdAtTop: function showIosBannerAdAtTop(cpPlaceId) {
        jsb.reflection.callStaticMethod(classIosName, "showTopBannerByJs:", cpPlaceId);
      },
      showIosBannerAdAtBottom: function showIosBannerAdAtBottom(cpPlaceId) {
        jsb.reflection.callStaticMethod(classIosName, "showBottomBannerByJs:", cpPlaceId);
      },
      hideIosBannerAdAtTop: function hideIosBannerAdAtTop() {
        jsb.reflection.callStaticMethod(classIosName, "hideTopBannerByJs");
      },
      hideIosBannerAdAtBottom: function hideIosBannerAdAtBottom() {
        jsb.reflection.callStaticMethod(classIosName, "hideBottomBannerByJs");
      },
      setIosTopBannerPading: function setIosTopBannerPading(padding) {
        var strPading = "0";
        "number" == typeof padding ? strPading = String(padding) : "string" == typeof padding && (strPading = padding);
        jsb.reflection.callStaticMethod(classIosName, "setTopBannerPadingForIphonexByJs:", strPading);
      },
      showIosIconAdAt: function showIosIconAdAt(x, y, width, height, rotationAngle, cpPlaceId) {
        jsb.reflection.callStaticMethod(classIosName, "showIconX:y:width:height:rotationAngle:placementId:", x, y, width, height, rotationAngle, cpPlaceId);
      },
      removeIosIconAdAt: function removeIosIconAdAt(cpPlaceId) {
        jsb.reflection.callStaticMethod(classIosName, "removeIcon:", cpPlaceId);
      },
      loadIosAdsByManual: function loadIosAdsByManual() {
        jsb.reflection.callStaticMethod(classIosName, "loadIosAdsByManualByJs");
      },
      exitIosApp: function exitIosApp() {
        jsb.reflection.callStaticMethod(classIosName, "exitIosAppByJs");
      },
      updateIosAccessPrivacyInfoStatus: function updateIosAccessPrivacyInfoStatus(gdprPermissionEnumValue) {
        jsb.reflection.callStaticMethod(classIosName, "updateAccessPrivacyInfoStatusByJs:", gdprPermissionEnumValue);
      },
      getIosAccessPrivacyInfoStatus: function getIosAccessPrivacyInfoStatus() {
        return jsb.reflection.callStaticMethod(classIosName, "getAccessPrivacyInfoStatusByJs");
      },
      notifyIosAccessPrivacyInfoStatus: function notifyIosAccessPrivacyInfoStatus(callback, callId) {
        jsb.reflection.callStaticMethod(classIosName, "notifyAccessPrivacyInfoStatusByJs:callId:", callback, callId);
      },
      isIosEuropeanUnionUser: function isIosEuropeanUnionUser(callback, callId) {
        jsb.reflection.callStaticMethod(classIosName, "isEuropeanUnionUserByJs:callId:", callback, callId);
      },
      reportIvokePluginMethodReceive: function reportIvokePluginMethodReceive(msg) {
        jsb.reflection.callStaticMethod(classIosName, "reportIvokePluginMethodReceiveByJs:", msg);
      },
      reportRDRewardClose: function reportRDRewardClose(msg) {
        jsb.reflection.callStaticMethod(classIosName, "reportRDRewardCloseByJs:", msg);
      },
      reportRDRewardClick: function reportRDRewardClick(msg) {
        jsb.reflection.callStaticMethod(classIosName, "reportRDRewardClickByJs:", msg);
      },
      reportRDRewardGiven: function reportRDRewardGiven(msg) {
        jsb.reflection.callStaticMethod(classIosName, "reportRDRewardGivenByJs:", msg);
      },
      reportRDShowDid: function reportRDShowDid(msg) {
        jsb.reflection.callStaticMethod(classIosName, "reportRDShowDidByJs:", msg);
      },
      reportRDRewardCancel: function reportRDRewardCancel(msg) {
        jsb.reflection.callStaticMethod(classIosName, "reportRDRewardCancelByJs:", msg);
      },
      reportILClose: function reportILClose(msg, cpid) {
        jsb.reflection.callStaticMethod(classIosName, "reportILCloseByJs:msg:", void 0 == cpid ? "" : cpid, msg);
      },
      reportILClick: function reportILClick(msg, cpid) {
        jsb.reflection.callStaticMethod(classIosName, "reportILClickByJs:msg:", void 0 == cpid ? "" : cpid, msg);
      },
      reportILShowDid: function reportILShowDid(msg, cpid) {
        jsb.reflection.callStaticMethod(classIosName, "reportILShowDidByJs:msg:", void 0 == cpid ? "" : cpid, msg);
      },
      isOnlineDebugReportEnable: function isOnlineDebugReportEnable() {
        return jsb.reflection.callStaticMethod(classIosName, "isReportOnlineEnableByJs");
      },
      isIosLogOpened: function isIosLogOpened() {
        return jsb.reflection.callStaticMethod(classIosName, "isIosLogOpenedByJs");
      },
      autoOneKeyInspectByIos: function autoOneKeyInspectByIos() {
        jsb.reflection.callStaticMethod(classIosName, "autoOneKeyInspectByJs");
      },
      tellToDoctorByIos: function tellToDoctorByIos(action, placeid, msg) {
        jsb.reflection.callStaticMethod(classIosName, "tellToDoctorByJs:adid:msg:", action, placeid, msg);
      },
      setAppsFlyerUIDByIos: function setAppsFlyerUIDByIos(uid) {
        jsb.reflection.callStaticMethod(classIosName, "setAppsFlyerUIDByJs:", uid);
      },
      setAdjustIdByIos: function setAdjustIdByIos(ajid) {
        jsb.reflection.callStaticMethod(classIosName, "setAdjustIdByJs:", ajid);
      }
    };
    module.exports = upltvoc;
    cc._RF.pop();
  }, {} ],
  UPLTV: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1262dOfvABFVJ1EwXaOwcQh", "UPLTV");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var upltvoc = require("UPLTVIos");
    var upltva = require("UPLTVAndroid");
    var isShowLog = true;
    var doctorWorking = false;
    var printLog = function printLog(msg) {
      void 0 != msg && null != msg && isShowLog && void 0 != upltv && null != upltv.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? upltv.upltvbridge.printJsLog(msg) : cc.sys.os === cc.sys.OS_IOS && upltv.upltvbridge.printJsLog(msg));
    };
    var isOnlineReportEnable = function isOnlineReportEnable() {
      return void 0 != upltv && upltv.isOnlineDebugReportEnable();
    };
    var onlineReportCall = function onlineReportCall(name, msg, cpid) {
      void 0 != upltv && (void 0 != cpid ? upltv.onlineDebugReport(name, msg, cpid) : upltv.onlineDebugReport(name, msg));
    };
    var doctorOnDuty = function doctorOnDuty() {
      doctorWorking = true;
    };
    var doctorOffDuty = function doctorOffDuty() {
      doctorWorking = false;
    };
    var tellToDoctor = function tellToDoctor(action, placeid, msg) {
      void 0 != upltv && void 0 != upltv.upltvbridge && null != upltv.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? upltv.upltvbridge.tellToDoctorByAndroid(action, placeid, msg) : cc.sys.os === cc.sys.OS_IOS && upltv.upltvbridge.tellToDoctorByIos(action, null == placeid ? "" : placeid, null == msg ? "" : msg));
    };
    var functionNames = {
      handleVokeParams: function handleVokeParams(params) {
        if (void 0 == params || null == params || "string" != typeof params) return;
        var startpos = params.indexOf(":");
        var substr = null;
        if (startpos <= 0) return;
        substr = params.substr(startpos + 1);
        var endpos = substr.indexOf(",");
        var callname = substr.substring(0, endpos);
        substr = substr.substr(endpos + 1);
        var cpadid = null;
        var message = null;
        startpos = substr.indexOf(":");
        if (startpos > 0) {
          substr = substr.substr(startpos + 1);
          endpos = substr.indexOf(",");
          if (endpos > 0) {
            cpadid = substr.substring(0, endpos);
            substr = substr.substr(endpos + 1);
            if (null != substr) {
              startpos = substr.indexOf(":");
              startpos > 0 && (message = substr.substr(startpos + 1));
            }
          }
        }
        if (isShowLog) {
          printLog("===> js handleVokeParams callname: " + callname);
          printLog("===> js handleVokeParams   cpadid: " + cpadid);
          printLog("===> js handleVokeParams  message: " + message);
        }
        var canreport = isOnlineReportEnable();
        canreport && onlineReportCall(functionNames.Function_Receive_Callback, "CocosJs Receive message, callname:" + callname + ", cpadid:" + cpadid);
        if (functionNames.Action_Doctor_ON_DUTY == callname) canreport && doctorOnDuty(); else if (functionNames.Action_Doctor_OFF_DUTY == callname) canreport && doctorOffDuty(); else if (functionNames.Function_Doctor_IL_Load_Request == callname) canreport && true == doctorWorking && upltv.setInterstitialLoadCallback(functionNames.Function_Doctor_IL_Show_AdId, function(cpid, msg) {
          tellToDoctor(functionNames.Action_Doctor_Ad_IL_LoadOk_Reply, functionNames.Function_Doctor_IL_Show_AdId, "cocoscreator js il load ok");
        }, function(cpid, msg) {
          tellToDoctor(functionNames.Action_Doctor_Ad_IL_LoadFail_Reply, functionNames.Function_Doctor_IL_Show_AdId, msg);
        }); else if (functionNames.Function_Doctor_RD_Load_Request == callname) canreport && true == doctorWorking && upltv.setRewardVideoLoadCallback(function(cpid, msg) {
          tellToDoctor(functionNames.Action_Doctor_Ad_RD_LoadOk_Reply, functionNames.Function_Doctor_RD_Show_AdId, "cocoscreator js rd load ok");
        }, function(cpid, msg) {
          tellToDoctor(functionNames.Action_Doctor_Ad_RD_LoadFail_Reply, functionNames.Function_Doctor_RD_Show_AdId, msg);
        }); else if (functionNames.Function_Doctor_RD_Show_Request == callname) upltv.showRewardVideo(functionNames.Function_Doctor_RD_Show_AdId); else if (functionNames.Function_Doctor_IL_Show_Request == callname) upltv.showInterstitialAd(functionNames.Function_Doctor_IL_Show_AdId); else if (functionNames.Function_Reward_DidLoadFail == callname) if (null != ltvMap.rewardLoadFailCall && "function" == typeof ltvMap.rewardLoadFailCall) {
          ltvMap.rewardLoadFailCall(cpadid, message);
          ltvMap.resetRewardLoadCallback();
        } else printLog("===> js rewardLoadFailCall is null or not function"); else if (functionNames.Function_Reward_DidLoadSuccess == callname) if (null != ltvMap.rewardLoadSuccessCall && "function" == typeof ltvMap.rewardLoadSuccessCall) {
          ltvMap.rewardLoadSuccessCall(cpadid, message);
          ltvMap.resetRewardLoadCallback();
        } else printLog("===> rewardLoadSuccessCall is null or not function"); else if (functionNames.Function_Reward_WillOpen == callname) {
          if (canreport && true == doctorWorking) {
            onlineReportCall(callname, "CocosJs did run callback on video willopen event.");
            tellToDoctor(functionNames.Action_Doctor_Ad_RD_WillShow_Reply, functionNames.Function_Doctor_RD_Show_AdId, "tell the rd willshow event to doctor.");
            return;
          }
          var call = ltvMap.rewardShowCall;
          if (null != call && "function" == typeof call) {
            call(upltv.AdEventType.VIDEO_EVENT_WILL_SHOW, cpadid);
            canreport && onlineReportCall(callname, "CocosJs did run callback on video willopen event.");
          } else canreport && onlineReportCall(callname, "CocosJs not run callback on video willopen event.");
        } else if (functionNames.Function_Reward_DidOpen == callname) {
          if (canreport && true == doctorWorking) {
            onlineReportCall(callname, "CocosJs did run callback on video shown event.");
            tellToDoctor(functionNames.Action_Doctor_Ad_RD_DidShow_Reply, functionNames.Function_Doctor_RD_Show_AdId, "tell the rd didopen event to doctor.");
            return;
          }
          var call = ltvMap.rewardShowCall;
          if (null != call && "function" == typeof call) {
            call(upltv.AdEventType.VIDEO_EVENT_DID_SHOW, cpadid);
            canreport && onlineReportCall(callname, "CocosJs did run callback on video shown event.");
          } else canreport && onlineReportCall(callname, "CocosJs not run callback on video shown event.");
        } else if (functionNames.Function_Reward_DidClick == callname) {
          if (canreport && true == doctorWorking) {
            onlineReportCall(callname, "CocosJs did run callback on video clicked event.");
            tellToDoctor(functionNames.Action_Doctor_Ad_RD_DidClick_Reply, functionNames.Function_Doctor_RD_Show_AdId, "tell the rd didclick event to doctor.");
            return;
          }
          var call = ltvMap.rewardShowCall;
          if (null != call && "function" == typeof call) {
            call(upltv.AdEventType.VIDEO_EVENT_DID_CLICK, cpadid);
            canreport && onlineReportCall(callname, "CocosJs did run callback on video clicked event.");
          } else canreport && onlineReportCall(callname, "CocosJs not run callback on video clicked event.");
        } else if (functionNames.Function_Reward_DidClose == callname) {
          if (canreport && true == doctorWorking) {
            onlineReportCall(callname, "CocosJs did run callback on video closed event.");
            tellToDoctor(functionNames.Action_Doctor_Ad_RD_DidClose_Reply, functionNames.Function_Doctor_RD_Show_AdId, "tell the rd didclose event to doctor.");
            return;
          }
          var call = ltvMap.rewardShowCall;
          if (null != call && "function" == typeof call) {
            call(upltv.AdEventType.VIDEO_EVENT_DID_CLOSE, cpadid);
            canreport && onlineReportCall(callname, "CocosJs did run callback on video closed event.");
          } else canreport && onlineReportCall(callname, "CocosJs not run callback on video closed event.");
        } else if (functionNames.Function_Reward_DidGivien == callname) {
          if (canreport && true == doctorWorking) {
            onlineReportCall(callname, "CocosJs did run callback on video reward given event.");
            tellToDoctor(functionNames.Action_Doctor_Ad_RD_Given_Reply, functionNames.Function_Doctor_RD_Show_AdId, "tell the rd givenreward event to doctor.");
            return;
          }
          var call = ltvMap.rewardShowCall;
          if (null != call && "function" == typeof call) {
            call(upltv.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD, cpadid);
            canreport && onlineReportCall(callname, "CocosJs did run callback on video reward given event.");
          } else canreport && onlineReportCall(callname, "CocosJs not run callback on video reward given event.");
        } else if (functionNames.Function_Reward_DidAbandon == callname) {
          if (canreport && true == doctorWorking) {
            onlineReportCall(callname, "CocosJs did run callback on video reward cancel event.");
            tellToDoctor(functionNames.Action_Doctor_Ad_RD_Cancel_Reply, functionNames.Function_Doctor_RD_Show_AdId, "tell the noreward event to doctor.");
            return;
          }
          var call = ltvMap.rewardShowCall;
          if (null != call && "function" == typeof call) {
            call(upltv.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD, cpadid);
            canreport && onlineReportCall(callname, "CocosJs did run callback on video reward cancel event.");
          } else canreport && onlineReportCall(callname, "CocosJs not run callback on video reward cancel event.");
        } else if (functionNames.Function_Interstitial_DidLoadFail == callname) {
          var k = cpadid + "_Interstitial";
          var v = ltvMap.get(k);
          if (null != v) {
            var call = v.interstitialLoadFailCall;
            null != call && "function" == typeof call && call(cpadid, message);
            ltvMap.remove(k);
            printLog("===> Interstitial_DidLoadFail at key:" + k);
          }
        } else if (functionNames.Function_Interstitial_DidLoadSuccess == callname) {
          var k = cpadid + "_Interstitial";
          var v = ltvMap.get(k);
          if (null != v) {
            var call = v.interstitialLoadSuccessCall;
            null != call && "function" == typeof call ? call(cpadid, message) : printLog("===> interstitial_didloadsuccess call is null or non-function type at key:" + k);
            ltvMap.remove(k);
          } else printLog("===> interstitial_didloadsuccess v is null at key:" + k);
        } else if (functionNames.Function_Interstitial_Willshow == callname) {
          if (canreport && true == doctorWorking) {
            onlineReportCall(callname, "CocosJs did run callback on il ad willshown event.", functionNames.Function_Doctor_IL_Show_AdId);
            tellToDoctor(functionNames.Action_Doctor_Ad_IL_WillShow_Reply, functionNames.Function_Doctor_IL_Show_AdId, "tell the il willshow event to doctor.");
            return;
          }
          var v = ltvMap.get(cpadid);
          var callReport = false;
          if (null != v) {
            var call = v.interstitialShowCall;
            if (null != call && "function" == typeof call) {
              call(upltv.AdEventType.INTERSTITIAL_EVENT_WILL_SHOW, cpadid);
              if (canreport) {
                callReport = true;
                onlineReportCall(callname, "CocosJs did run callback on il ad willshown event at " + cpadid, cpadid);
              }
            }
          }
          canreport && false == callReport && onlineReportCall(callname, "CocosJs not run callback on il ad willshown event at " + cpadid, cpadid);
        } else if (functionNames.Function_Interstitial_Didshow == callname) {
          if (canreport && true == doctorWorking) {
            onlineReportCall(callname, "CocosJs did run callback on il ad shown event.", functionNames.Function_Doctor_IL_Show_AdId);
            tellToDoctor(functionNames.Action_Doctor_Ad_IL_DidShow_Reply, functionNames.Function_Doctor_IL_Show_AdId, "tell the il didshow event to doctor.");
            return;
          }
          var v = ltvMap.get(cpadid);
          var callReport = false;
          if (null != v) {
            var call = v.interstitialShowCall;
            if (null != call && "function" == typeof call) {
              call(upltv.AdEventType.INTERSTITIAL_EVENT_DID_SHOW, cpadid);
              if (canreport) {
                callReport = true;
                onlineReportCall(callname, "CocosJs did run callback on il ad shown event at " + cpadid, cpadid);
              }
            }
          }
          canreport && false == callReport && onlineReportCall(callname, "CocosJs not run callback on il ad shown event at " + cpadid, cpadid);
        } else if (functionNames.Function_Interstitial_Didclose == callname) {
          if (canreport && true == doctorWorking) {
            onlineReportCall(callname, "CocosJs did run callback on il ad closed event.", functionNames.Function_Doctor_IL_Show_AdId);
            tellToDoctor(functionNames.Action_Doctor_Ad_IL_DidClose_Reply, functionNames.Function_Doctor_IL_Show_AdId, "tell the il didclose event to doctor.");
            return;
          }
          var v = ltvMap.get(cpadid);
          var callReport = false;
          if (null != v) {
            var call = v.interstitialShowCall;
            if (null != call && "function" == typeof call) {
              call(upltv.AdEventType.INTERSTITIAL_EVENT_DID_CLOSE, cpadid);
              if (canreport) {
                callReport = true;
                onlineReportCall(callname, "CocosJs did run callback on il ad closed event at " + cpadid, cpadid);
              }
            }
          }
          canreport && false == callReport && onlineReportCall(callname, "CocosJs not run callback on il ad closed event at " + cpadid, cpadid);
        } else if (functionNames.Function_Interstitial_Didclick == callname) {
          if (canreport && true == doctorWorking) {
            onlineReportCall(callname, "CocosJs did run callback on il ad clicked event.", functionNames.Function_Doctor_IL_Show_AdId);
            tellToDoctor(functionNames.Action_Doctor_Ad_IL_DidClick_Reply, functionNames.Function_Doctor_IL_Show_AdId, "tell the il didclick event to doctor.");
            return;
          }
          var v = ltvMap.get(cpadid);
          var callReport = false;
          if (null != v) {
            var call = v.interstitialShowCall;
            if (null != call && "function" == typeof call) {
              call(upltv.AdEventType.INTERSTITIAL_EVENT_DID_CLICK, cpadid);
              if (canreport) {
                callReport = true;
                onlineReportCall(callname, "CocosJs did run callback on il ad clicked event at " + cpadid, cpadid);
              }
            }
          }
          canreport && false == callReport && onlineReportCall(callname, "CocosJs not run callback on il ad clicked event at " + cpadid, cpadid);
        } else if (functionNames.Function_Banner_DidRemove == callname) {
          var v = ltvMap.get(cpadid);
          if (null != v) {
            var call = v.bannerEventCall;
            null != call && "function" == typeof call && call(upltv.AdEventType.BANNER_EVENT_DID_REMOVED, cpadid);
          }
          ltvMap.remove(cpadid);
        } else if (functionNames.Function_Banner_DidClick == callname) {
          var v = ltvMap.get(cpadid);
          if (null != v) {
            var call = v.bannerEventCall;
            null != call && "function" == typeof call && call(upltv.AdEventType.BANNER_EVENT_DID_CLICK, cpadid);
          }
        } else if (functionNames.Function_Banner_DidShow == callname) {
          var v = ltvMap.get(cpadid);
          if (null != v) {
            var call = v.bannerEventCall;
            null != call && "function" == typeof call && call(upltv.AdEventType.BANNER_EVENT_DID_SHOW, cpadid);
          }
        } else if (functionNames.Function_Icon_DidLoad == callname) {
          var v = ltvMap.get(cpadid);
          if (null != v) {
            var call = v.iconEventCall;
            null != call && "function" == typeof call && call(upltv.AdEventType.ICON_EVENT_DID_LOAD, cpadid);
          }
        } else if (functionNames.Function_Icon_DidLoadFail == callname) {
          var v = ltvMap.get(cpadid);
          if (null != v) {
            var call = v.iconEventCall;
            null != call && "function" == typeof call && call(upltv.AdEventType.ICON_EVENT_DID_LOADFAIL, cpadid);
          }
        } else if (functionNames.Function_Icon_DidShow == callname) {
          var v = ltvMap.get(cpadid);
          if (null != v) {
            var call = v.iconEventCall;
            null != call && "function" == typeof call && call(upltv.AdEventType.ICON_EVENT_DID_SHOW, cpadid);
          }
        } else if (functionNames.Function_Icon_DidClick == callname) {
          var v = ltvMap.get(cpadid);
          if (null != v) {
            var call = v.iconEventCall;
            null != call && "function" == typeof call && call(upltv.AdEventType.ICON_EVENT_DID_CLICK, cpadid);
          }
        }
      }
    };
    functionNames.Function_Receive_Callback = "receive_callback";
    functionNames.Function_Reward_WillOpen = "reward_willopen";
    functionNames.Function_Reward_DidOpen = "reward_didopen";
    functionNames.Function_Reward_DidClick = "reward_didclick";
    functionNames.Function_Reward_DidClose = "reward_didclose";
    functionNames.Function_Reward_DidGivien = "reward_didgiven";
    functionNames.Function_Reward_DidAbandon = "reward_didabandon";
    functionNames.Function_Interstitial_Willshow = "interstitial_willshow";
    functionNames.Function_Interstitial_Didshow = "interstitial_didshow";
    functionNames.Function_Interstitial_Didclose = "interstitial_didclose";
    functionNames.Function_Interstitial_Didclick = "interstitial_didclick";
    functionNames.Function_Banner_DidShow = "banner_didshow";
    functionNames.Function_Banner_DidClick = "banner_didclick";
    functionNames.Function_Banner_DidRemove = "banner_didremove";
    functionNames.Function_Reward_DidLoadFail = "reward_didloadfail";
    functionNames.Function_Reward_DidLoadSuccess = "reward_didloadsuccess";
    functionNames.Function_Interstitial_DidLoadFail = "interstitial_didloadfail";
    functionNames.Function_Interstitial_DidLoadSuccess = "interstitial_didloadsuccess";
    functionNames.Function_Icon_DidLoad = "icon_didload";
    functionNames.Function_Icon_DidLoadFail = "icon_didloadfail";
    functionNames.Function_Icon_DidShow = "icon_didshow";
    functionNames.Function_Icon_DidClick = "icon_didclick";
    functionNames.Action_Doctor_ON_DUTY = "auto_ad_checking_doctor_on_duty";
    functionNames.Action_Doctor_OFF_DUTY = "auto_ad_checking_doctor_off_duty";
    functionNames.Action_Doctor_Ad_IL_LoadOk_Reply = "auto_ad_il_load_ok_reply";
    functionNames.Action_Doctor_Ad_IL_LoadFail_Reply = "auto_ad_il_load_fail_reply";
    functionNames.Action_Doctor_Ad_IL_WillShow_Reply = "auto_ad_il_willshow_reply";
    functionNames.Action_Doctor_Ad_IL_DidShow_Reply = "auto_ad_il_didshow_reply";
    functionNames.Action_Doctor_Ad_IL_DidClick_Reply = "auto_ad_il_didclick_reply";
    functionNames.Action_Doctor_Ad_IL_DidClose_Reply = "auto_ad_il_didclose_reply";
    functionNames.Action_Doctor_Ad_RD_LoadOk_Reply = "auto_ad_rd_load_ok_reply";
    functionNames.Action_Doctor_Ad_RD_LoadFail_Reply = "auto_ad_rd_load_fail_reply";
    functionNames.Action_Doctor_Ad_RD_WillShow_Reply = "auto_ad_rd_willshow_reply";
    functionNames.Action_Doctor_Ad_RD_DidShow_Reply = "auto_ad_rd_didshow_reply";
    functionNames.Action_Doctor_Ad_RD_DidClick_Reply = "auto_ad_rd_didclick_reply";
    functionNames.Action_Doctor_Ad_RD_DidClose_Reply = "auto_ad_rd_didclose_reply";
    functionNames.Action_Doctor_Ad_RD_Given_Reply = "auto_ad_rd_reward_given_reply";
    functionNames.Action_Doctor_Ad_RD_Cancel_Reply = "auto_ad_rd_reward_cancel_reply";
    functionNames.Function_Doctor_IL_Show_AdId = "auto_sample_ad_il_show_placeid";
    functionNames.Function_Doctor_RD_Show_AdId = "auto_sample_ad_rd_show_placeid";
    functionNames.Function_Doctor_IL_Show_Request = "invoke_plugin_ad_il_show_request";
    functionNames.Function_Doctor_RD_Show_Request = "invoke_plugin_ad_rd_show_request";
    functionNames.Function_Doctor_IL_Load_Request = "invoke_plugin_ad_il_load_request";
    functionNames.Function_Doctor_RD_Load_Request = "invoke_plugin_ad_rd_load_request";
    var ltvMap = {
      map: new Object(),
      length: 0,
      rewardLoadFailCall: null,
      rewardLoadSuccessCall: null,
      rewardShowCall: null,
      backPressedCall: null,
      resetRewardLoadCallback: function resetRewardLoadCallback() {
        this.rewardLoadFailCall = null;
        this.rewardLoadSuccessCall = null;
      },
      size: function size() {
        return this.length;
      },
      put: function put(key, value) {
        this.map["_" + key] || ++this.length;
        this.map["_" + key] = value;
      },
      remove: function remove(key) {
        if (this.map["_" + key]) {
          --this.length;
          return delete this.map["_" + key];
        }
        return false;
      },
      exist: function exist(key) {
        return !!this.map["_" + key];
      },
      get: function get(key) {
        return this.map["_" + key] ? this.map["_" + key] : null;
      },
      print: function print() {
        var str = "";
        for (var each in this.map) str += "/n" + each + "  Value:" + this.map[each];
        printLog("===> js map : " + str);
        return str;
      },
      test: function test() {
        this.put("1", function() {});
        this.put("2", function(v) {
          cc.log("===> js map function call at 2, v type: %s", "undefined" === typeof v ? "undefined" : _typeof(v));
        });
        this.put("4", function() {});
        printLog("===> js map exist 1: " + this.exist("1"));
        printLog("===> js map exist 2: " + this.exist("3"));
        var value = this.get("2");
        value && value("========================");
        this.print();
        this.remove("1");
        this.remove("3");
        printLog("===> js map size: " + this.size());
      }
    };
    var loadJsBridgeObject = function loadJsBridgeObject() {
      cc.sys.os === cc.sys.OS_IOS && null != upltv ? void 0 != upltv.upltvbridge && null != upltv.upltvbridge || (upltv.upltvbridge = upltvoc) : cc.sys.os === cc.sys.OS_ANDROID && null != upltv && (void 0 != upltv.upltvbridge && null != upltv.upltvbridge || (upltv.upltvbridge = upltva));
    };
    var bridgeInterface = {
      initSdkSuccessed: false,
      initVokeCall: null,
      initSdkCallback: function initSdkCallback(msg1) {
        "true" != msg1 && true != msg1 || (this.initSdkSuccessed = true);
        cc.log("===> js initSdkCallback..., %s", msg1);
        void 0 != this.initVokeCall && null != this.initVokeCall && "function" == typeof this.initVokeCall && this.initVokeCall(this.initSdkSuccessed);
        void 0 != this.initVokeCall && (this.initVokeCall = null);
      },
      vokeMethod: function vokeMethod(params) {
        functionNames.handleVokeParams(params);
      },
      vokeILReadyMethod: function vokeILReadyMethod(cpPlaceId, r) {
        this.handleILReadyMethod(cpPlaceId, r);
      },
      handleILReadyMethod: function handleILReadyMethod(cpPlaceId, r) {
        var key = "ILReady_" + cpPlaceId;
        var call = ltvMap.get(key);
        if (null != call) {
          ltvMap.remove(key);
          if ("function" == typeof call) {
            var rr = false;
            "true" != r && true != r || (rr = true);
            call(rr);
          }
        }
      }
    };
    var upltv = upltv || {
      upltvbridge: null,
      initSdk: function initSdk(androidAppKey, iosAppKey, iosZone, callback) {
        if (true == cc.bridgeInterface.initSdkSuccessed) {
          printLog("===> js initSdk don't called again ");
          return;
        }
        if (void 0 != callback && null != callback && "function" == typeof callback) {
          printLog("===> js set initVokeCall...");
          cc.bridgeInterface.initVokeCall = callback;
        }
        var vokecall = "cc.bridgeInterface.vokeMethod";
        var callname = "cc.bridgeInterface.initSdkCallback";
        loadJsBridgeObject();
        if (cc.sys.os === cc.sys.OS_IOS) {
          if (void 0 != this.upltvbridge && null != this.upltvbridge) {
            if (void 0 == iosAppKey || "" == iosAppKey) {
              cc.log("===> js initSdk failed, iosAppKey is undefined or empty.");
              return;
            }
            if ("string" != typeof iosAppKey) {
              cc.log("===> js initSdk failed, iosAppKey is not string type.");
              return;
            }
            if (void 0 == iosZone || 0 != iosZone && 1 != iosZone && 2 != iosZone) {
              cc.log("===> js initSdk WARNING: iosZone iswrong value, will be setted to 0");
              iosZone = 0;
            }
            this.upltvbridge.setShowLog(isShowLog);
            this.upltvbridge.initIosSDK(iosAppKey, iosZone, vokecall, callname);
          }
        } else if (cc.sys.os === cc.sys.OS_ANDROID) {
          if (void 0 == androidAppKey && "" == androidAppKey) {
            printLog("please set correct androidAppKey for initializing upsdk");
            return;
          }
          if (void 0 != this.upltvbridge && null != this.upltvbridge) {
            this.upltvbridge.setShowLog(isShowLog);
            this.upltvbridge.initAndroidSDK(androidAppKey, vokecall, callname);
          }
        }
      },
      initAbtConfigJson: function initAbtConfigJson(gameAccountId, isCompleteTask, isPaid, promotionChannelName, gender, age, tags) {
        var tagstring = null;
        if (void 0 != tags && null != tags && tags instanceof Array) {
          var count = tags.length;
          tagstring = '{"array":[';
          for (var i = 0; i < count; i++) {
            tagstring += '"' + tags[i];
            tagstring += i < count - 1 ? '",' : '"]}';
          }
        }
        void 0 == isCompleteTask && (isCompleteTask = false);
        void 0 == isPaid && (isPaid = 0);
        void 0 == promotionChannelName && (promotionChannelName = "");
        void 0 == gender && (gender = "");
        void 0 == age && (age = -1);
        cc.sys.os === cc.sys.OS_IOS ? void 0 != this.upltvbridge && null != this.upltvbridge && this.upltvbridge.initIosAbtConfigJson(gameAccountId, isCompleteTask, isPaid, promotionChannelName, gender, age, tagstring) : cc.sys.os === cc.sys.OS_ANDROID && void 0 != this.upltvbridge && null != this.upltvbridge && this.upltvbridge.initAndroidAbtConfigJson(gameAccountId, isCompleteTask, isPaid, promotionChannelName, gender, age, tagstring);
      },
      getAbtConfig: function getAbtConfig(cpPlaceId) {
        if (void 0 != cpPlaceId && null != cpPlaceId && "string" == typeof cpPlaceId) if (cc.sys.os === cc.sys.OS_IOS) {
          if (void 0 != this.upltvbridge && null != this.upltvbridge) {
            var r = this.upltvbridge.getIosAbtConfig(cpPlaceId);
            return "" == r ? null : r;
          }
        } else if (cc.sys.os === cc.sys.OS_ANDROID && void 0 != this.upltvbridge && null != this.upltvbridge) {
          var r = this.upltvbridge.getAndroidAbtConfig(cpPlaceId);
          return "" == r ? null : r;
        }
        return null;
      },
      showRewardDebugUI: function showRewardDebugUI() {
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.showIosRewardDebugUI() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidRewardDebugUI());
      },
      setRewardVideoLoadCallback: function setRewardVideoLoadCallback(loadsuccess, locadfail) {
        if (void 0 == loadsuccess || null == loadsuccess || "function" != typeof loadsuccess) {
          printLog("===> setRewardVideoLoadCallback(), the loadsuccess can't be undefined or null or non-function type.");
          return;
        }
        if (void 0 == locadfail || null == locadfail || "function" != typeof locadfail) {
          printLog("===> setRewardVideoLoadCallback(), the locadfail can't be undefined or null or non-function type.");
          return;
        }
        ltvMap.rewardLoadFailCall = void 0 == locadfail ? null : locadfail;
        ltvMap.rewardLoadSuccessCall = void 0 == loadsuccess ? null : loadsuccess;
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.setIosRewardVideoLoadCallback() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.setAndroidRewardVideoLoadCallback());
      },
      setRewardVideoShowCallback: function setRewardVideoShowCallback(showCall) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == showCall || null == showCall || "function" != typeof showCall) {
            printLog("===> setRewardVideoShowCallback(), the showCall can't be undefined or null or non-function type.");
            return;
          }
          ltvMap.rewardShowCall = showCall;
        }
      },
      isRewardReady: function isRewardReady() {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (cc.sys.os === cc.sys.OS_IOS) return this.upltvbridge.isIosRewardReady();
          if (cc.sys.os === cc.sys.OS_ANDROID) return this.upltvbridge.isAndroidRewardReady();
        }
        return false;
      },
      showRewardVideo: function showRewardVideo(cpPlaceId) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          void 0 == cpPlaceId && (cpPlaceId = null);
          cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.showIosRewardVideo(cpPlaceId) : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidRewardVideo(cpPlaceId);
        }
      },
      isInterstitialReadyAsyn: function isInterstitialReadyAsyn(cpPlaceId, callback) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == cpPlaceId || null == cpPlaceId) {
            printLog("Please set the Paramer cpPlaceId's value in function isInterstitialReadyAsyn()");
            return;
          }
          if (callback == cpPlaceId || null == callback) {
            printLog("Please set the Paramer callback's value in function isInterstitialReadyAsyn()");
            return;
          }
          if ("function" != typeof callback) {
            printLog("The Paramer 'callback' is  non-function type in function isInterstitialReadyAsyn()");
            return;
          }
          var key = "ILReady_" + cpPlaceId;
          ltvMap.put(key, callback);
          cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.isIosInterstitialReadyAsyn(cpPlaceId, "cc.bridgeInterface.vokeILReadyMethod") : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.isAndroidInterstitialReadyAsyn(cpPlaceId, "cc.bridgeInterface.vokeILReadyMethod");
        }
      },
      isInterstitialReady: function isInterstitialReady(cpPlaceId) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == cpPlaceId || null == cpPlaceId) {
            printLog("===> isInterstitialReady(), the cpPlaceId can't be undefined or null.");
            return;
          }
          if (cc.sys.os === cc.sys.OS_IOS) return this.upltvbridge.isIosInterstitialReady(cpPlaceId);
          if (cc.sys.os === cc.sys.OS_ANDROID) return this.upltvbridge.isAndroidInterstitialReady(cpPlaceId);
        }
        return false;
      },
      showInterstitialAd: function showInterstitialAd(cpPlaceId) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == cpPlaceId || null == cpPlaceId) {
            printLog("Please set the Paramer cpPlaceId's value in function showInterstitialAd()");
            return;
          }
          cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.showIosInterstitialAd(cpPlaceId) : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidInterstitialAd(cpPlaceId);
        }
      },
      setInterstitialLoadCallback: function setInterstitialLoadCallback(cpPlaceId, loadsuccess, locadfail) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == cpPlaceId || null == cpPlaceId) {
            printLog("===> setIntersitialLoadCall(), the cpPlaceId can't be undefined or null.");
            return;
          }
          if (void 0 == loadsuccess || null == loadsuccess || "function" != typeof loadsuccess) {
            printLog("===> setIntersitialLoadCall(), the loadsuccess can't be undefined or null or null or non-function type.");
            return;
          }
          if (void 0 == locadfail || null == locadfail || "function" != typeof locadfail) {
            printLog("===> setIntersitialLoadCall(), the locadfail can't be undefined or null or null or non-function type.");
            return;
          }
          var k = cpPlaceId + "_Interstitial";
          var v = ltvMap.get(k) || {};
          v.interstitialLoadSuccessCall = loadsuccess;
          v.interstitialLoadFailCall = locadfail;
          ltvMap.put(k, v);
          printLog("===> setIntersitialLoadCall() ltvMap size: " + ltvMap.size());
          cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.setIosInterstitialLoadCallback(cpPlaceId) : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.setAndroidInterstitialLoadCallback(cpPlaceId);
        }
      },
      setInterstitialShowCallback: function setInterstitialShowCallback(cpPlaceId, showCall) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == cpPlaceId || null == cpPlaceId) {
            printLog("===> setInterstitialShowCallback(), the cpPlaceId can't be undefined or null.");
            return;
          }
          if (void 0 == showCall || null == showCall || "function" != typeof showCall) {
            printLog("===> setInterstitialShowCallback(), the showCall can't be undefined or null or non-function type.");
            return;
          }
          var k = cpPlaceId;
          var v = ltvMap.get(k) || {};
          v.interstitialShowCall = showCall;
          ltvMap.put(k, v);
        }
      },
      showInterstitialDebugUI: function showInterstitialDebugUI() {
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.showIosInterstitialDebugUI() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidInterstitialDebugUI());
      },
      removeBannerAdAt: function removeBannerAdAt(cpPlaceId) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == cpPlaceId || null == cpPlaceId) {
            printLog("===> removeBannerAdAt(), the cpPlaceId can't be undefined or null.");
            return;
          }
          cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.removeIosBannerAdAt(cpPlaceId) : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.removeAndroidBannerAdAt(cpPlaceId);
        }
      },
      showBannerAdAtTop: function showBannerAdAtTop(cpPlaceId) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == cpPlaceId || null == cpPlaceId) {
            printLog("===> showBannerAdAtTop(), the cpPlaceId can't be undefined or null.");
            return;
          }
          cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.showIosBannerAdAtTop(cpPlaceId) : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidBannerAdAtTop(cpPlaceId);
        }
      },
      showBannerAdAtBottom: function showBannerAdAtBottom(cpPlaceId) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == cpPlaceId || null == cpPlaceId) {
            printLog("===> showBannerAdAtBottom(), the cpPlaceId can't be undefined or null.");
            return;
          }
          cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.showIosBannerAdAtBottom(cpPlaceId) : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidBannerAdAtBottom(cpPlaceId);
        }
      },
      hideBannerAdAtTop: function hideBannerAdAtTop() {
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.hideIosBannerAdAtTop() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.hideAndroidBannerAdAtTop());
      },
      hideBannerAdAtBottom: function hideBannerAdAtBottom() {
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.hideIosBannerAdAtBottom() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.hideAndroidBannerAdAtBottom());
      },
      setTopBannerPadingForIphoneX: function setTopBannerPadingForIphoneX(padding) {
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.setIosTopBannerPading(padding) : cc.sys.os === cc.sys.OS_ANDROID);
      },
      setBannerShowCallback: function setBannerShowCallback(cpPlaceId, bannerCall) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == cpPlaceId || null == cpPlaceId) {
            printLog("===> setBannerShowCallback(), the cpPlaceId can't be undefined or null.");
            return;
          }
          if (void 0 == bannerCall || null == bannerCall || "function" != typeof bannerCall) {
            printLog("===> setBannerShowCallback(), the bannerCall can't be undefined or null or non-function type.");
            return;
          }
          var v = ltvMap.get(cpPlaceId) || {};
          v.bannerEventCall = bannerCall;
          ltvMap.put(cpPlaceId, v);
        }
      },
      setIconCallback: function setIconCallback(cpPlaceId, iconCall) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == cpPlaceId || null == cpPlaceId) {
            printLog("===> setIconCallback(), the cpPlaceId can't be undefined or null.");
            return;
          }
          if (void 0 == iconCall || null == iconCall || "function" != typeof iconCall) {
            printLog("===> setIconCallback(), the iconCall can't be undefined or null or non-function type.");
            return;
          }
          var v = ltvMap.get(cpPlaceId) || {};
          v.iconEventCall = iconCall;
          ltvMap.put(cpPlaceId, v);
        }
      },
      showIconAd: function showIconAd(x, y, width, height, rotationAngle, cpPlaceId) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == cpPlaceId || null == cpPlaceId) {
            printLog("===> showIconAd(), the cpPlaceId can't be undefined or null.");
            return;
          }
          cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidIconAdAt(x, y, width, height, rotationAngle, cpPlaceId);
          cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.showIosIconAdAt(x, y, width, height, rotationAngle, cpPlaceId);
        }
      },
      removeIconAd: function removeIconAd(cpPlaceId) {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (void 0 == cpPlaceId || null == cpPlaceId) {
            printLog("===> removeIconAd(), the cpPlaceId can't be undefined or null.");
            return;
          }
          cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.removeAndroidIconAdAt(cpPlaceId);
          cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.removeIosIconAdAt(cpPlaceId);
        }
      },
      loadAdsByManual: function loadAdsByManual() {
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.loadIosAdsByManual() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.loadAndroidAdsByManual());
      },
      exitApp: function exitApp() {
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.exitIosApp() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.exitAndroidApp());
      },
      setManifestPackageName: function setManifestPackageName(pkg) {
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.setAndroidManifestPackageName(pkg) : cc.sys.os === cc.sys.OS_ANDROID);
      },
      onBackPressed: function onBackPressed() {
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.onAndroidBackPressed() : cc.sys.os === cc.sys.OS_IOS);
      },
      setCustomerId: function setCustomerId(androidid) {
        loadJsBridgeObject();
        if (void 0 != this.upltvbridge && null != this.upltvbridge) if (cc.sys.os === cc.sys.OS_ANDROID) {
          if (void 0 == androidid || null == androidid) {
            printLog("===> setCustomerId(), the anroidid can't be null");
            return;
          }
          this.upltvbridge.setAndroidCustomerId(androidid);
        } else cc.sys.os === cc.sys.OS_IOS;
      },
      updateAccessPrivacyInfoStatus: function updateAccessPrivacyInfoStatus(gdprPermissionEnumValue) {
        loadJsBridgeObject();
        if (void 0 == gdprPermissionEnumValue || null == gdprPermissionEnumValue) {
          printLog("===> updateAccessPrivacyInfoStatus(), the gdprPermissionEnumValue can't be null");
          return;
        }
        if (gdprPermissionEnumValue != upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown && gdprPermissionEnumValue != upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusAccepted && gdprPermissionEnumValue != upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusDefined) {
          printLog("===> updateAccessPrivacyInfoStatus(), the gdprPermissionEnumValue is a wrong type.");
          return;
        }
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.updateAndroidAccessPrivacyInfoStatus(gdprPermissionEnumValue) : cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.updateIosAccessPrivacyInfoStatus(gdprPermissionEnumValue));
      },
      getAccessPrivacyInfoStatus: function getAccessPrivacyInfoStatus() {
        loadJsBridgeObject();
        var status = 0;
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? status = this.upltvbridge.getAndroidAccessPrivacyInfoStatus() : cc.sys.os === cc.sys.OS_IOS && (status = this.upltvbridge.getIosAccessPrivacyInfoStatus()));
        return 1 == status ? upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusAccepted : 2 == status ? upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusDefined : upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown;
      },
      notifyAccessPrivacyInfoStatus: function notifyAccessPrivacyInfoStatus(callback) {
        loadJsBridgeObject();
        if (void 0 == callback || null == callback) {
          printLog("===> notifyAccessPrivacyInfoStatus(), the callback can't be null.");
          return;
        }
        if ("function" != typeof callback) {
          printLog("===> notifyAccessPrivacyInfoStatus(), the callback must be function.");
          return;
        }
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          upltv.GDPRPermissionEnum.functionId = upltv.GDPRPermissionEnum.functionId + 1;
          var callId = upltv.GDPRPermissionEnum.functionId;
          var key = "" + callId;
          ltvMap.put(key, callback);
          var call = "upltv.GDPRPermissionEnum.javaCall";
          cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.notifyAndroidAccessPrivacyInfoStatus(call, callId) : cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.notifyIosAccessPrivacyInfoStatus(call, key);
        }
      },
      isEuropeanUnionUser: function isEuropeanUnionUser(callback) {
        loadJsBridgeObject();
        if (void 0 == callback || null == callback) {
          printLog("===> isEuropeanUnionUser(), the callback can't be null.");
          return;
        }
        if ("function" != typeof callback) {
          printLog("===> isEuropeanUnionUser(), the callback must be function.");
          return;
        }
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          upltv.GDPRPermissionEnum.functionId = upltv.GDPRPermissionEnum.functionId + 1;
          var callId = upltv.GDPRPermissionEnum.functionId;
          var key = "" + callId;
          ltvMap.put(key, callback);
          var call = "upltv.GDPRPermissionEnum.javaCall";
          cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.isAndroidEuropeanUnionUser(call, callId) : cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.isIosEuropeanUnionUser(call, key);
        }
      },
      isOnlineDebugReportEnable: function isOnlineDebugReportEnable() {
        return (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os === cc.sys.OS_IOS) && this.upltvbridge.isOnlineDebugReportEnable();
      },
      onlineDebugReport: function onlineDebugReport(callname, msg, cpid) {
        cc.sys.os !== cc.sys.OS_ANDROID && cc.sys.os !== cc.sys.OS_IOS || (functionNames.Function_Receive_Callback == callname ? this.upltvbridge.reportIvokePluginMethodReceive(msg) : functionNames.Function_Reward_WillOpen == callname || (functionNames.Function_Reward_DidOpen == callname ? this.upltvbridge.reportRDShowDid(msg) : functionNames.Function_Reward_DidClick == callname ? this.upltvbridge.reportRDRewardClick(msg) : functionNames.Function_Reward_DidClose == callname ? this.upltvbridge.reportRDRewardClose(msg) : functionNames.Function_Reward_DidGivien == callname ? this.upltvbridge.reportRDRewardGiven(msg) : functionNames.Function_Reward_DidAbandon == callname ? this.upltvbridge.reportRDRewardCancel(msg) : functionNames.Function_Interstitial_Willshow == callname || (functionNames.Function_Interstitial_Didshow == callname ? this.upltvbridge.reportILShowDid(msg, cpid) : functionNames.Function_Interstitial_Didclick == callname ? this.upltvbridge.reportILClick(msg, cpid) : functionNames.Function_Interstitial_Didclose == callname && this.upltvbridge.reportILClose(msg, cpid))));
      },
      isLogOpened: function isLogOpened() {
        if (void 0 != this.upltvbridge && null != this.upltvbridge) {
          if (cc.sys.os === cc.sys.OS_IOS) return this.upltvbridge.isIosLogOpened();
          if (cc.sys.os === cc.sys.OS_ANDROID) return this.upltvbridge.isAndroidLogOpened();
        }
        return false;
      },
      autoOneKeyInspect: function autoOneKeyInspect() {
        printLog("===> called autoOneKeyInspect");
        void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.autoOneKeyInspectByAndroid() : cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.autoOneKeyInspectByIos());
      },
      setAppsFlyerUID: function setAppsFlyerUID(uid) {
        loadJsBridgeObject();
        if (0 == arguments.length || void 0 == uid) {
          printLog("===> setAppsFlyerUID(), the uid can't be nil.");
          return;
        }
        if ("string" != typeof uid) {
          printLog("===> setAppsFlyerUID(), the uid must be string type");
          return;
        }
        if ("" == uid) {
          printLog("===> setAppsFlyerUID(), the uid can't be empty");
          return;
        }
        void 0 != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.setAppsFlyerUIDByAndroid(uid) : cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.setAppsFlyerUIDByIos(uid));
      },
      setAdjustId: function setAdjustId(ajid) {
        loadJsBridgeObject();
        if (0 == arguments.length || void 0 == ajid) {
          printLog("===> setAdjustId(), the ajid can't be nil.");
          return;
        }
        if ("string" != typeof ajid) {
          printLog("===> setAdjustId(), the ajid must be string type");
          return;
        }
        if ("" == ajid) {
          printLog("===> setAdjustId(), the ajid can't be empty");
          return;
        }
        void 0 != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.setAdjustIdByAndroid(ajid) : cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.setAdjustIdByIos(ajid));
      }
    };
    upltv.GDPRPermissionEnum = {
      functionId: 0,
      javaCall: function javaCall(callId, value) {
        var key = "" + callId;
        var call = ltvMap.get(key);
        if (null != call) {
          null != call && "function" == typeof call && call(value);
          ltvMap.remove(key);
        }
      }
    };
    upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown = 0;
    upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusAccepted = 1;
    upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusDefined = 2;
    upltv.AdEventType = {};
    upltv.AdEventType.VIDEO_EVENT_DID_SHOW = 0;
    upltv.AdEventType.VIDEO_EVENT_DID_CLICK = 1;
    upltv.AdEventType.VIDEO_EVENT_DID_CLOSE = 2;
    upltv.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD = 3;
    upltv.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD = 4;
    upltv.AdEventType.INTERSTITIAL_EVENT_DID_SHOW = 5;
    upltv.AdEventType.INTERSTITIAL_EVENT_DID_CLICK = 6;
    upltv.AdEventType.INTERSTITIAL_EVENT_DID_CLOSE = 7;
    upltv.AdEventType.BANNER_EVENT_DID_SHOW = 8;
    upltv.AdEventType.BANNER_EVENT_DID_CLICK = 9;
    upltv.AdEventType.BANNER_EVENT_DID_REMOVED = 10;
    upltv.AdEventType.ICON_EVENT_DID_LOAD = 16;
    upltv.AdEventType.ICON_EVENT_DID_LOADFAIL = 17;
    upltv.AdEventType.ICON_EVENT_DID_SHOW = 18;
    upltv.AdEventType.ICON_EVENT_DID_CLICK = 19;
    upltv.AdEventType.VIDEO_EVENT_WILL_SHOW = 20;
    upltv.AdEventType.INTERSTITIAL_EVENT_WILL_SHOW = 21;
    module.exports.upltv = upltv;
    module.exports.bridgeInterface = bridgeInterface;
    cc._RF.pop();
  }, {
    UPLTVAndroid: "UPLTVAndroid",
    UPLTVIos: "UPLTVIos"
  } ],
  UpStarGotData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a9efxl13tC3Y5YUzEP97Qd", "UpStarGotData");
    "use strict";
    var Utils = require("./../framework/common/UtilsOther");
    var DataBase = require("./DataBase");
    cc.Class({
      extends: DataBase,
      ctor: function ctor() {
        this.fileDir = "config/upStarGotData";
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
        this.dataObj = Utils.arrayToDict(this.dataObj, "level");
      },
      getUpStarGotExp: function getUpStarGotExp(level) {
        var data = this.dataObj[level];
        var exp = data["evolutionExp"];
        return exp;
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/common/UtilsOther": "UtilsOther",
    "./DataBase": "DataBase"
  } ],
  UpStarNeedData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "88221sfy7dCn7po4FlELoKp", "UpStarNeedData");
    "use strict";
    var Utils = require("./../framework/common/UtilsOther");
    var DataBase = require("./DataBase");
    cc.Class({
      extends: DataBase,
      ctor: function ctor() {
        this.fileDir = "config/upStarNeedData";
      },
      initData: function initData(data) {
        if (!data) return;
        this.dataObj = data;
        this.len = this.dataObj.length;
        this.dataObj = Utils.arrayToDict(this.dataObj, "level");
      },
      getUpStarNeedExp: function getUpStarNeedExp(level) {
        var data = this.dataObj[level];
        var exp = data["evolutionMaxExp"];
        return exp;
      },
      getMaxLevel: function getMaxLevel() {
        return this.len;
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/common/UtilsOther": "UtilsOther",
    "./DataBase": "DataBase"
  } ],
  UpdatePanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0b25x2RTFJZob6meKh/2YN", "UpdatePanel");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        progressBar: require("./../framework/ui/ProgressBar"),
        fileProgress: require("./../framework/ui/ProgressBar"),
        byteProgress: require("./../framework/ui/ProgressBar"),
        fileLabel: cc.Label,
        byteLabel: cc.Label,
        info: cc.Label
      }
    });
    cc._RF.pop();
  }, {
    "./../framework/ui/ProgressBar": "ProgressBar"
  } ],
  UpltvHelper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "41a16DjJLVAI7JimL0iu4o/", "UpltvHelper");
    "use strict";
    var upltv = require("UPLTV").upltv;
    cc.bridgeInterface = require("UPLTV").bridgeInterface;
    var UpltvHelper = cc.Class({
      statics: {
        initUpltv: function initUpltv(cb) {
          var iosZone = 2;
          upltv.initSdk(UPLTV_ANDROID_APPKEY, UPLTV_IOS_APPKEY, iosZone, function(r) {
            cc.log("===> js upltv intSdk result:, %s", r);
            cb && cb(r);
          });
        },
        setloadRdADCb: function setloadRdADCb() {
          upltv.setRewardVideoLoadCallback(function(cpid, msg) {
            cc.log("===> js RewardVideo LoadCallback Success at: %s", cpid);
          }, function(cpid, msg) {
            cc.log("===> js RewardVideo LoadCallback Fail at: %s", cpid);
          });
        },
        loadAndroidAdsByManual: function loadAndroidAdsByManual() {
          cc.bridgeInterface.loadAndroidAdsByManual();
        },
        rdADIsReady: function rdADIsReady() {
          var r = upltv.isRewardReady();
          cc.log("===> js isRewardReady r: %s", r.toString());
          return r;
        },
        rdAdShow: function rdAdShow(rewardPlaceId) {
          upltv.setRewardVideoShowCallback(function(type, cpid) {
            var event = "unkown";
            if (type == upltv.AdEventType.VIDEO_EVENT_DID_SHOW) event = "Did_Show"; else if (type == upltv.AdEventType.VIDEO_EVENT_DID_CLICK) event = "Did_Click"; else if (type == upltv.AdEventType.VIDEO_EVENT_DID_CLOSE) {
              event = "Did_Close";
              zy.AdHelper.resumeGame();
            } else if (type == upltv.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD) {
              event = "Did_Given_Reward";
              zy.httpProxy.watchAds(rewardPlaceId);
              zy.AdHelper.onOpenAdsReward(rewardPlaceId, true);
            } else if (type == upltv.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD) {
              event = "Did_Abandon_Reward";
              zy.AdHelper.onOpenAdsReward(rewardPlaceId, false);
            }
            cc.log("===> js RewardVideo Show Callback, event: %s, at: %s", event, cpid);
          });
          var r = upltv.isRewardReady();
          cc.log("===> js isRewardReady r: %s", r);
          if (true == r) {
            cc.log("===> js showRewardVideo call");
            upltv.showRewardVideo(rewardPlaceId);
          }
        },
        showRewardDebugUI: function showRewardDebugUI() {
          upltv.showRewardDebugUI();
        },
        setInterstitialLoadCallback: function setInterstitialLoadCallback(placeId, suc, fail) {
          upltv.setInterstitialLoadCallback(placeId, suc, fail);
        },
        isInterstitialReady: function isInterstitialReady(placeId) {
          var ret = upltv.isInterstitialReady(placeId);
          cc.log("===> js isInterstitialReady ret: %s", ret.toString());
          return ret;
        },
        showInterstitial: function showInterstitial(placeId, cb) {
          upltv.setInterstitialShowCallback(placeId, cb);
          upltv.showInterstitialAd(placeId);
        },
        showInterstitialDebugUI: function showInterstitialDebugUI() {
          upltv.showInterstitialDebugUI();
        }
      }
    });
    zy.UpltvHelper = UpltvHelper;
    cc._RF.pop();
  }, {
    UPLTV: "UPLTV"
  } ],
  UserData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7336dHaZ0xCkJME+CeR/q9i", "UserData");
    "use strict";
    cc.Class({
      ctor: function ctor() {
        this.lastGotCoinTime = zy.utils.time();
        this.freeCoinsLevel = 1;
        this.hpLevel = 1;
        this.preInterAdLevel = 0;
        this.phPower = zy.constData.PhDefault;
        this.phPowerCounts = zy.constData.MaxPhCounts1Day;
        this.phPowerTime = 0;
        this.phLowTime = 0;
        this.vibOn = true;
        this.guide = 0;
        this.freeCoinsLastTime = zy.utils.time() - zy.constData.FreeCoinsCooling;
        this.freeCoinsNum = zy.constData.FreeCoinsMaxNum;
        this.freeCoinsNum2 = 0;
        this.freeWatchNum = 0;
      },
      saveData: function saveData() {
        var obj = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = Object.keys(this)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;
            obj[key] = this[key];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            !_iteratorNormalCompletion && _iterator.return && _iterator.return();
          } finally {
            if (_didIteratorError) throw _iteratorError;
          }
        }
        var data = JSON.stringify(obj);
        cc.sys.localStorage.setItem(zy.constData.StaticKey.PlayerDataKey + zy.constData.StaticKey.SaveDataVersion, data);
      },
      loadData: function loadData() {
        var data = cc.sys.localStorage.getItem(zy.constData.StaticKey.PlayerDataKey + zy.constData.StaticKey.SaveDataVersion);
        if (data) {
          data = JSON.parse(data);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = void 0;
          try {
            for (var _iterator2 = Object.keys(data)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var key = _step2.value;
              this.hasOwnProperty(key) && (this[key] = data[key]);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              !_iteratorNormalCompletion2 && _iterator2.return && _iterator2.return();
            } finally {
              if (_didIteratorError2) throw _iteratorError2;
            }
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  UtilsOther: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2c591y/+FA+qi5S+TkWGGf", "UtilsOther");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var Md5 = require("./../encrypt/Md5");
    var CSVParser = require("./CSVParser");
    var UtilsOther = UtilsOther || {};
    UtilsOther.arrayRmObj = function(arr, obj) {
      var index = arr.indexOf(obj);
      arr.splice(index, 1);
    };
    UtilsOther.arrayPopByIdx = function(array, idx) {
      var item = array[idx];
      array.splice(idx, 1);
      return item;
    };
    UtilsOther.valueInArray = function(arr, value) {
      var len = arr.length;
      for (var i = 0; i < len; i++) if (arr[i] == value) return true;
      return false;
    };
    UtilsOther.arrayRandomValue = function(arr) {
      var num = arr.length;
      if (num <= 0) return null;
      var idx = UtilsOther.randomInteger(0, num - 1);
      return arr[idx];
    };
    UtilsOther.shuffle = function(arr) {
      var i = void 0, j = void 0, temp = void 0;
      for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    };
    UtilsOther.clearArrayValue = function(array, length, value) {
      for (var i = 0; i < length; i++) array[i] = value;
    };
    UtilsOther.createObjectWithArray = function(array, value) {
      var object = {};
      for (var i in array) object[array[i]] = value;
      return object;
    };
    UtilsOther.arrayToDict = function(array, key) {
      var dict = {};
      var data = null;
      for (var i in array) {
        data = array[i];
        dict[data[key]] = data;
      }
      return dict;
    };
    UtilsOther.dictToArray = function(dict) {
      var array = [];
      for (var key in dict) dict.hasOwnProperty(key) && dict[key] && array.push(dict[key]);
      return array;
    };
    UtilsOther.objectToArrayExcludeNumber = function(obj, opt_arr, opt_exclude) {
      var tempArr = void 0;
      tempArr = isArray(opt_arr) ? opt_arr : [];
      var key = void 0;
      if (isNumber(opt_exclude)) {
        var temp = opt_exclude.toString();
        for (key in obj) obj.hasOwnProperty(key) && obj[key] && temp != key && tempArr.push(obj[key]);
      } else for (key in obj) obj.hasOwnProperty(key) && obj[key] && tempArr.push(obj[key]);
      return tempArr;
    };
    UtilsOther.splitWithValueType = function(str, valueType, separator) {
      void 0 === separator && (separator = ",");
      var arr = str.split(separator);
      arr.forEach(function(currentValue, index, array) {
        try {
          array[index] = valueType(currentValue);
        } catch (e) {
          array[index] = null;
        }
      });
      return arr;
    };
    UtilsOther.time = function() {
      return parseInt(Date.now() / 1e3);
    };
    UtilsOther.time2second = function(year, month, day, hour, minute, second) {
      var date = new Date(year, month - 1, day, hour, minute, second);
      var n = date.getTime();
      return parseInt(n / 1e3);
    };
    UtilsOther.getTimeAfterDays = function(time, days) {
      cc.assert(time, "getTimeForDayAfterDays:time is null!");
      var date = null;
      date = cc.isNumber(time) ? new Date(1e3 * time) : new Date(time);
      return new Date(date.getTime() + 24 * days * 60 * 60 * 1e3);
    };
    UtilsOther.getDaysDiff = function(dateStart, dateEnd) {
      cc.assert(dateStart && dateEnd, "getDaysDiff: date must be not null!");
      var iDays;
      dateStart = UtilsOther.isNumber(dateStart) ? new Date(1e3 * dateStart) : new Date(dateStart);
      dateEnd = UtilsOther.isNumber(dateEnd) ? new Date(1e3 * dateEnd) : new Date(dateEnd);
      var strDateS = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate());
      var strDateE = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate());
      iDays = parseInt(Math.abs(strDateE - strDateS) / 1e3 / 60 / 60 / 24);
      iDays *= strDateE >= strDateS ? 1 : -1;
      return iDays;
    };
    UtilsOther.getTimeForDay = function(date) {
      date = date ? cc.isNumber(date) ? new Date(1e3 * date) : new Date(date) : new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var dateStr = year + "-" + month + "-" + day;
      return dateStr;
    };
    UtilsOther.formatTime = function(s) {
      var t = void 0;
      if (s >= 0) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        var day = parseInt(hour / 24);
        if (1 == day) return day + " day";
        if (day > 1) return day + " days";
        if (day > 0) {
          hour -= 24 * day;
          t = day + "day " + ("00" + hour).slice(-2) + ":";
        } else t = hour > 0 ? ("00" + hour).slice(-2) + ":" : "";
        min < 10 && (t += "0");
        t += min + ":";
        sec < 10 && (t += "0");
        t += parseInt(sec);
      }
      return t;
    };
    UtilsOther.getThousandSeparatorString = function(number) {
      var str = number.toString().split("").reverse().join("").replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, "$1,").split("").reverse().join("");
      var dot = str.indexOf(".");
      dot >= 0 && (str = str.substring(0, dot + 2));
      return str;
    };
    UtilsOther.getKMBString = function(number) {
      if (!this.isNumber(number)) return number;
      if (number / 1e9 >= 1) return this.getThousandSeparatorString(number / 1e9) + "B";
      if (number / 1e6 >= 1) return this.getThousandSeparatorString(number / 1e6) + "M";
      if (number / 1e4 >= 1) return this.getThousandSeparatorString(number / 1e3) + "K";
      return this.getThousandSeparatorString(number);
    };
    UtilsOther.getLastCutOffDay = function(current, cutOff) {
      var time = cutOff - current;
      if (time < 0) return -1;
      time = parseInt(time / 86400);
      return time;
    };
    UtilsOther._dumpObject = function(prefix, o, depth, extraBlank, _ignore_function_member, max_depth) {
      if (UtilsOther.D(max_depth) && depth > max_depth) return;
      function printWithDepth(txt, depth, extraBlank) {
        while (depth > 0) {
          txt = "  " + txt;
          --depth;
        }
        if (extraBlank > 0) {
          var _blanks = "";
          var i = void 0;
          for (i = 0; i < extraBlank; ++i) _blanks += " ";
          txt = _blanks + txt;
        }
        cc.log(txt);
      }
      function getFuncDescriptor(f) {
        return f.toString().replace(/function\s?/im, "").split(")")[0] + ")";
      }
      var type = Object.prototype.toString.call(o).slice(8, -1);
      var t = void 0;
      var neb = void 0;
      var npfx = void 0;
      var len = void 0;
      var blanks = void 0;
      switch (type) {
       case "Number":
       case "String":
        t = '"' + o.toString() + '"';
        prefix && (t = prefix + t);
        printWithDepth(t, depth, extraBlank);
        break;

       case "Undefined":
        t = "UNDEFINED!";
        prefix && (t = prefix + t);
        printWithDepth(t, depth, extraBlank);
        break;

       case "Boolean":
        t = o.toString();
        prefix && (t = prefix + t);
        printWithDepth(t, depth, extraBlank);
        break;

       case "Object":
        t = "{";
        prefix && (t = prefix + t);
        printWithDepth(t, depth, extraBlank);
        var prop = void 0;
        for (prop in o) {
          if (!o.hasOwnProperty(prop)) continue;
          npfx = '"' + prop + '" : ';
          neb = (prefix ? prefix.length : 0) - 2 + extraBlank;
          _dumpObject(npfx, o[prop], depth + 1, neb, _ignore_function_member, max_depth);
        }
        len = prefix ? prefix.length : 0;
        t = "}";
        if (len > 0) {
          blanks = "";
          var i1 = void 0;
          for (i1 = 0; i1 < len; ++i1) blanks += " ";
          t = blanks + t;
        }
        printWithDepth(t, depth, extraBlank);
        break;

       case "Array":
        t = "[";
        prefix && (t = prefix + t);
        printWithDepth(t, depth, extraBlank);
        var i2 = void 0;
        for (i2 = 0; i2 < o.length; ++i2) {
          npfx = i2 + " : ";
          neb = (prefix ? prefix.length : 0) - 2 + extraBlank;
          _dumpObject(npfx, o[i2], depth + 1, neb, _ignore_function_member, max_depth);
        }
        len = prefix ? prefix.length : 0;
        t = "]";
        if (len > 0) {
          blanks = "";
          var i = void 0;
          for (i = 0; i < len; ++i) blanks += " ";
          t = blanks + t;
        }
        printWithDepth(t, depth, extraBlank);
        break;

       case "Function":
        if (!_ignore_function_member) {
          t = getFuncDescriptor(o);
          prefix && (t = prefix + t);
          printWithDepth(t, depth, extraBlank);
        }
      }
    };
    UtilsOther.dumpObject = function(o, _ignore_function_member, max_depth) {
      UtilsOther._dumpObject(void 0, o, 0, 0, _ignore_function_member || false, max_depth);
    };
    UtilsOther.D = function(obj) {
      return void 0 !== obj;
    };
    UtilsOther.DNN = function(obj) {
      return void 0 !== obj && null !== obj;
    };
    UtilsOther.isFunction = function(obj) {
      return "function" === typeof obj;
    };
    UtilsOther.isNumber = function(obj) {
      return "number" === typeof obj || "[object Number]" === Object.prototype.toString.call(obj);
    };
    UtilsOther.isString = function(obj) {
      return "string" === typeof obj || "[object String]" === Object.prototype.toString.call(obj);
    };
    UtilsOther.isArray = function(obj) {
      return Array.isArray(obj) || "object" === ("undefined" === typeof obj ? "undefined" : _typeof(obj)) && "[object Array]" === Object.prototype.toString.call(obj);
    };
    UtilsOther.isUndefined = function(obj) {
      return void 0 === obj;
    };
    UtilsOther.isObject = function(obj) {
      return "object" === ("undefined" === typeof obj ? "undefined" : _typeof(obj)) && "[object Object]" === Object.prototype.toString.call(obj);
    };
    UtilsOther.isEmpty = function(obj) {
      return Array.isArray(obj) && 0 === obj.length || Object.prototype.isPrototypeOf(obj) && 0 === Object.keys(obj).length;
    };
    UtilsOther.isBoolean = function(obj) {
      return true === obj || false === obj || "[object Boolean]" === Object.prototype.toString.call(obj);
    };
    UtilsOther.clone = function(obj, newObj) {
      newObj || (newObj = obj.constructor ? new obj.constructor() : {});
      var key = void 0;
      var copy = void 0;
      for (key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        copy = obj[key];
        "object" === ("undefined" === typeof copy ? "undefined" : _typeof(copy)) && copy ? newObj[key] = UtilsOther.clone(copy, null) : newObj[key] = copy;
      }
      return newObj;
    };
    UtilsOther.getStringFromFile = function(fileName) {
      if (cc.sys.isNative) return jsb.fileUtils.getStringFromFile(fileName);
      var _loadTxtSync = function(url) {
        if (cc._isNodeJs) {
          var fs = require("fs");
          return fs.readFileSync(url).toString();
        }
        var xhr = this.getXMLHttpRequest();
        xhr.timeout = 0;
        xhr.open("GET", url, false);
        /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ? xhr.setRequestHeader("Accept-Charset", "utf-8") : xhr.overrideMimeType && xhr.overrideMimeType("text/plain; charset=utf-8");
        xhr.send(null);
        if (4 === !xhr.readyState || 200 !== xhr.status) return null;
        return xhr.responseText;
      }.bind(cc.loader);
      return _loadTxtSync(fileName);
    };
    UtilsOther.getSegmentsInter = function(a, b, c, d) {
      var nx1 = b.y - a.y, ny1 = a.x - b.x;
      var nx2 = d.y - c.y, ny2 = c.x - d.x;
      var denominator = nx1 * ny2 - ny1 * nx2;
      if (0 == denominator) return false;
      var distC_N2 = nx2 * c.x + ny2 * c.y;
      var distA_N2 = nx2 * a.x + ny2 * a.y - distC_N2;
      var distB_N2 = nx2 * b.x + ny2 * b.y - distC_N2;
      if (distA_N2 * distB_N2 >= 0) return false;
      var distA_N1 = nx1 * a.x + ny1 * a.y;
      var distC_N1 = nx1 * c.x + ny1 * c.y - distA_N1;
      var distD_N1 = nx1 * d.x + ny1 * d.y - distA_N1;
      if (distC_N1 * distD_N1 >= 0) return false;
      var fraction = distA_N2 / denominator;
      var dx = fraction * ny1, dy = -fraction * nx1;
      return {
        x: a.x + dx,
        y: a.y + dy
      };
    };
    UtilsOther.getDistance = function(vec1, vec2) {
      var d = Math.sqrt(Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2));
      return d;
    };
    UtilsOther.loadRemoteImg = function(url, callback) {
      if (cc.sys.isBrowser) {
        cc.log("Remote img load web");
        cc.loader.load(url, function(progress) {
          cc.log("Remote img load progress:" + progress);
        }, function(error, tex) {
          if (error) {
            cc.log("Remote img load error:" + error);
            return;
          }
          cc.log("Remote img load success.");
          callback(tex);
        });
        return;
      }
      cc.log("Remote img load: native");
      var dirpath = jsb.fileUtils.getWritablePath() + "img/";
      var filepath = dirpath + Md5.md5_hex(url) + ".png";
      function loadEnd() {
        cc.loader.load(filepath, function(err, tex) {
          err ? cc.error(err) : callback(tex);
        });
      }
      if (jsb.fileUtils.isFileExist(filepath)) {
        cc.log("Remote is find" + filepath);
        loadEnd();
        return;
      }
      var saveFile = function saveFile(data) {
        cc.log("undefined" === typeof data ? "undefined" : _typeof(data));
        cc.log(data);
        var b = new Uint8Array(data);
        cc.log("undefined" === typeof b ? "undefined" : _typeof(b));
        cc.log(b.length);
        if ("undefined" !== typeof data) {
          jsb.fileUtils.isDirectoryExist(dirpath) || jsb.fileUtils.createDirectory(dirpath);
          cc.log("111111" + filepath);
          if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
            cc.log("Remote img save succeed.");
            cc.log("22222");
            loadEnd();
          } else cc.log("Remote img save failed.");
        } else cc.log("Remote img download failed.");
      };
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        cc.log("xhr.readyState  " + xhr.readyState);
        cc.log("xhr.status  " + xhr.status);
        if (4 === xhr.readyState) if (200 === xhr.status) {
          xhr.responseType = "arraybuffer";
          saveFile(xhr.response);
        } else saveFile(null);
      }.bind(this);
      xhr.open("GET", url, true);
      xhr.send();
    };
    UtilsOther.checkTouchIsHit = function(touchPoint, node) {
      return cc.rectContainsPoint(node.getBoundingBoxToWorld(), touchPoint);
    };
    UtilsOther.createCliper = function(spriteName) {
      var stencil = new cc.Sprite(spriteName);
      var clippingNode = new cc.ClippingNode();
      clippingNode.attr({
        stencil: stencil,
        anchorX: .5,
        anchorY: .5,
        alphaThreshold: .8
      });
      return clippingNode;
    };
    UtilsOther.convertBoundingBoxToWorld = function(node) {
      if (!node) return cc.rect();
      var leftBottom = node.convertToWorldSpace(cc.p());
      var rightTop = node.convertToWorldSpace(cc.pFromSize(node.getContentSize()));
      return cc.rect(leftBottom.x, leftBottom.y, rightTop.x - leftBottom.x, rightTop.y - leftBottom.y);
    };
    UtilsOther.getPositionByAnchor = function(node, anchorPoint) {
      if (!node) return cc.p();
      var bounding = node.getBoundingBox();
      bounding.x += bounding.width * anchorPoint.x;
      bounding.y += bounding.height * anchorPoint.y;
      return cc.p(bounding.x, bounding.y);
    };
    UtilsOther.runShakeAction = function(node, range, times) {
      node.runAction(cc.repeat(cc.sequence(cc.moveBy(.02, cc.p(0, range)), cc.moveBy(.04, cc.p(0, 2 * -range)), cc.moveBy(.02, cc.p(0, range))), times));
    };
    UtilsOther.randomByWeight = function(array, keyForWeight) {
      if (!UtilsOther.isArray(array) || !UtilsOther.isString(keyForWeight)) return null;
      var sumWeight = 0;
      sumWeight = array.reduce(function(sumSoFar, item) {
        sumSoFar += item[keyForWeight];
        return sumSoFar;
      }, sumWeight);
      cc.log("sumWeight:" + sumWeight);
      var tempWeight = 0;
      var randomValue = Math.random() * sumWeight;
      var value = null;
      for (var i in array) {
        value = array[i];
        tempWeight += value[keyForWeight];
        if (randomValue < tempWeight) return value;
      }
      return value;
    };
    UtilsOther.randomInteger = function(min, max) {
      var range = Math.round((max - min) * Math.random());
      return min + range;
    };
    UtilsOther.parse = function(str, options) {
      var parser = new CSVParser(str, options);
      var all = [];
      while (parser.hasNext()) {
        var ar = parser.nextRow();
        all.push(ar);
      }
      return all;
    };
    UtilsOther.parseOneLine = function(str, options) {
      var parser = new CSVParser(str, options);
      var all = [];
      while (parser.hasNext()) {
        var ar = parser.nextRow();
        all.push(ar);
      }
      if (all.length <= 1) return all[0];
      return all;
    };
    UtilsOther.bindColumns = function(rows, colnames, isParseNumber) {
      colnames || (colnames = rows.shift());
      return rows.map(function(row) {
        var obj = {};
        for (var i = 0; i < row.length; i++) obj[colnames[i]] = isParseNumber ? isNaN(row[i]) ? row[i] : Number(row[i]) : row[i];
        return obj;
      });
    };
    UtilsOther.bindColumnsSimple = function(rows, colnames) {
      colnames || (colnames = rows.shift());
      return rows.map(function(row) {
        var obj = {};
        for (var i = 0; i < row.length; i++) obj[colnames[i]] = CSV.parseOneSimple(row[i]);
        return obj;
      });
    };
    module.exports = UtilsOther;
    cc._RF.pop();
  }, {
    "./../encrypt/Md5": "Md5",
    "./CSVParser": "CSVParser",
    fs: void 0
  } ],
  en: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "920c5VLzJxKjYCAoIUwUHym", "en");
    "use strict";
    module.exports = {
      short_coins: "Shortage of starcores",
      no_ad: "No advertising",
      time_error: "Local time error",
      max_counts: "Insufficient number of collections",
      max_level: "Already maximum level",
      net_error: "Network Error",
      start: "START",
      up_star: "Turret Evolution",
      dmg: "DMG",
      need_two: "Please build two new weapons, use oh",
      short_time: "Insufficient time",
      counts_remain: "Remaining today: ",
      sound: "Sounds",
      vibrate: "Vibration",
      ph_get: "Get",
      collect: "Collect",
      revive: "Revive",
      tip_free_coins_max: "Reached max number",
      btn_ok: "OK",
      btn_cancle: "Cancle"
    };
    cc._RF.pop();
  }, {} ],
  i18n: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93789C/shtIL6entYsZPjee", "i18n");
    "use strict";
    var Polyglot = require("polyglot");
    var lang = cc.sys.language;
    cc.log("====lang: ", lang);
    "zh" !== lang && (lang = "en");
    var data = require(lang);
    var polyglot = new Polyglot({
      phrases: data,
      allowMissing: true
    });
    module.exports = {
      init: function init(language) {
        lang = language;
        data = require(lang);
        polyglot.replace(data);
      },
      t: function t(key, opt) {
        return polyglot.t(key, opt);
      }
    };
    cc._RF.pop();
  }, {
    polyglot: "polyglot"
  } ],
  polyglot: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      cc._RF.push(module, "69decSgpRlE1rzEKp0RzG3V", "polyglot");
      "use strict";
      var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      (function(root, factory) {
        "function" === typeof define && define.amd ? define([], function() {
          return factory(root);
        }) : "object" === ("undefined" === typeof exports ? "undefined" : _typeof(exports)) ? module.exports = factory(root) : root.Polyglot = factory(root);
      })("undefined" !== typeof global ? global : void 0, function(root) {
        var replace = String.prototype.replace;
        function Polyglot(options) {
          options = options || {};
          this.phrases = {};
          this.extend(options.phrases || {});
          this.currentLocale = options.locale || "en";
          this.allowMissing = !!options.allowMissing;
          this.warn = options.warn || warn;
        }
        Polyglot.VERSION = "1.0.0";
        Polyglot.prototype.locale = function(newLocale) {
          newLocale && (this.currentLocale = newLocale);
          return this.currentLocale;
        };
        Polyglot.prototype.extend = function(morePhrases, prefix) {
          var phrase;
          for (var key in morePhrases) if (morePhrases.hasOwnProperty(key)) {
            phrase = morePhrases[key];
            prefix && (key = prefix + "." + key);
            "object" === ("undefined" === typeof phrase ? "undefined" : _typeof(phrase)) ? this.extend(phrase, key) : this.phrases[key] = phrase;
          }
        };
        Polyglot.prototype.unset = function(morePhrases, prefix) {
          var phrase;
          if ("string" === typeof morePhrases) delete this.phrases[morePhrases]; else for (var key in morePhrases) if (morePhrases.hasOwnProperty(key)) {
            phrase = morePhrases[key];
            prefix && (key = prefix + "." + key);
            "object" === ("undefined" === typeof phrase ? "undefined" : _typeof(phrase)) ? this.unset(phrase, key) : delete this.phrases[key];
          }
        };
        Polyglot.prototype.clear = function() {
          this.phrases = {};
        };
        Polyglot.prototype.replace = function(newPhrases) {
          this.clear();
          this.extend(newPhrases);
        };
        Polyglot.prototype.t = function(key, options) {
          var phrase, result;
          options = null == options ? {} : options;
          "number" === typeof options && (options = {
            smart_count: options
          });
          if ("string" === typeof this.phrases[key]) phrase = this.phrases[key]; else if ("string" === typeof options._) phrase = options._; else if (this.allowMissing) phrase = key; else {
            this.warn('Missing translation for key: "' + key + '"');
            result = key;
          }
          if ("string" === typeof phrase) {
            options = clone(options);
            result = choosePluralForm(phrase, this.currentLocale, options.smart_count);
            result = interpolate(result, options);
          }
          return result;
        };
        Polyglot.prototype.has = function(key) {
          return key in this.phrases;
        };
        var delimeter = "||||";
        var pluralTypes = {
          chinese: function chinese(n) {
            return 0;
          },
          german: function german(n) {
            return 1 !== n ? 1 : 0;
          },
          french: function french(n) {
            return n > 1 ? 1 : 0;
          },
          russian: function russian(n) {
            return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
          },
          czech: function czech(n) {
            return 1 === n ? 0 : n >= 2 && n <= 4 ? 1 : 2;
          },
          polish: function polish(n) {
            return 1 === n ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
          },
          icelandic: function icelandic(n) {
            return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
          }
        };
        var pluralTypeToLanguages = {
          chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
          german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
          french: [ "fr", "tl", "pt-br" ],
          russian: [ "hr", "ru" ],
          czech: [ "cs", "sk" ],
          polish: [ "pl" ],
          icelandic: [ "is" ]
        };
        function langToTypeMap(mapping) {
          var type, langs, l, ret = {};
          for (type in mapping) if (mapping.hasOwnProperty(type)) {
            langs = mapping[type];
            for (l in langs) ret[langs[l]] = type;
          }
          return ret;
        }
        var trimRe = /^\s+|\s+$/g;
        function trim(str) {
          return replace.call(str, trimRe, "");
        }
        function choosePluralForm(text, locale, count) {
          var ret, texts, chosenText;
          if (null != count && text) {
            texts = text.split(delimeter);
            chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
            ret = trim(chosenText);
          } else ret = text;
          return ret;
        }
        function pluralTypeName(locale) {
          var langToPluralType = langToTypeMap(pluralTypeToLanguages);
          return langToPluralType[locale] || langToPluralType.en;
        }
        function pluralTypeIndex(locale, count) {
          return pluralTypes[pluralTypeName(locale)](count);
        }
        var dollarRegex = /\$/g;
        var dollarBillsYall = "$$$$";
        function interpolate(phrase, options) {
          for (var arg in options) if ("_" !== arg && options.hasOwnProperty(arg)) {
            var replacement = options[arg];
            "string" === typeof replacement && (replacement = replace.call(options[arg], dollarRegex, dollarBillsYall));
            phrase = replace.call(phrase, new RegExp("%\\{" + arg + "\\}", "g"), replacement);
          }
          return phrase;
        }
        function warn(message) {
          root.console && root.console.warn && root.console.warn("WARNING: " + message);
        }
        function clone(source) {
          var ret = {};
          for (var prop in source) ret[prop] = source[prop];
          return ret;
        }
        return Polyglot;
      });
      cc._RF.pop();
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {} ],
  zh: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "87f1fs0gohHDIfNg4aePXbt", "zh");
    "use strict";
    module.exports = {
      hero_yoke_heroInfo: "\u540c\u65f6\u4e0a\u9635\u6b66\u5c06\u5747\u8fbe\u5230%{num}\u661f",
      hero_yoke_treasureInfo_1: "%{num}\u661f%{hero}",
      hero_yoke_treasureInfo_3: "%{star}\u661f%{treasure}",
      conquest_level_node_tips: "\u5173\u5361%{level}\u672a\u89e3\u9501",
      conquest_tower_unlock: "\u901a\u8fc7\u5173\u5361%{level}\u5f00\u542f\u70fd\u706b\u53f0",
      short_coins: "\u91d1\u5e01\u4e0d\u8db3",
      no_ad: "\u6ca1\u6709\u53ef\u7528\u5e7f\u544a",
      time_error: "\u672c\u673a\u65f6\u95f4\u9519\u8bef",
      max_counts: "\u9886\u53d6\u6b21\u6570\u6700\u5927\u503c",
      max_level: "\u5df2\u8fbe\u5230\u6700\u5927\u7b49\u7ea7",
      net_error: "\u7f51\u7edc\u9519\u8bef",
      start: "\u5f00\u59cb\u6e38\u620f",
      up_star: "\u70ae\u5854\u5347\u661f",
      dmg: "\u706b\u529b",
      need_two: "\u8bf7\u8fd4\u56de\u4e3b\u754c\u9762\u518d\u5efa\u9020\u4e00\u4e2a\u70ae\u5854",
      short_time: "\u5269\u4f59\u53ef\u7528\u65f6\u95f4\u4e0d\u8db3",
      counts_remain: "\u4eca\u65e5\u5269\u4f59\u6b21\u6570: ",
      sound: "\u97f3\u4e50\u97f3\u6548",
      vibrate: "\u5c04\u51fb\u9707\u52a8",
      ph_get: "\u514d\u8d39",
      collect: "\u6536\u96c6",
      revive: "\u590d\u6d3b\u7ee7\u7eed",
      tip_free_coins_max: "\u5f53\u65e5\u9886\u53d6\u5df2\u8fbe\u6700\u5927\u6b21\u6570",
      btn_ok: "\u786e\u5b9a",
      btn_cancle: "\u53d6\u6d88"
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "ClientConfig", "NodePoolMng", "NormalEffect", "BgColorData", "CoinsUpData", "ConstData", "DataBase", "DataMng", "EnemyAttrData", "HpUpData", "LevelsData", "LevelsEnemyWaveData", "TurretAttrData", "TurretData", "TurretPriceData", "TurretSecondData", "UpStarGotData", "UpStarNeedData", "UserData", "Alert", "Audio", "ButtonSafe", "CSVParser", "CornerMng", "Device", "Director", "Guide", "ImageLoader", "Loading", "ShaderUtils", "Tip", "Turning", "UI", "UtilsOther", "Algo", "Encrypt", "Md5", "en", "zh", "i18n", "polyglot", "GameHttp", "HttpProxy", "GameNetwork", "GameProtocols", "GameWebSocket", "NetProxy", "AFLogger", "AdHelper", "FBLogger", "LoggerHelper", "OpenAdsHelper", "PlatformUtils", "RangerLogger", "TrackingLogger", "UPLTV", "UPLTVAndroid", "UPLTVIos", "UpltvHelper", "Button", "Label", "LabelInteger", "ListView", "Node", "PopBase", "ProgressBar", "ProgressCircle", "Sprite", "SwitchControl", "HotUpdate", "UpdatePanel", "DebugPop", "SettingPop", "GameScene", "InitScene" ]);
//# sourceMappingURL=project.dev.js.map