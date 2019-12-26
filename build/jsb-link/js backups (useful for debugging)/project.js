window.__require = function e(t, i, n) {
function a(s, r) {
if (!i[s]) {
if (!t[s]) {
var l = s.split("/");
l = l[l.length - 1];
if (!t[l]) {
var c = "function" == typeof __require && __require;
if (!r && c) return c(l, !0);
if (o) return o(l, !0);
throw new Error("Cannot find module '" + s + "'");
}
}
var h = i[s] = {
exports: {}
};
t[s][0].call(h.exports, function(e) {
return a(t[s][1][e] || e);
}, h, h.exports, e, t, i, n);
}
return i[s].exports;
}
for (var o = "function" == typeof __require && __require, s = 0; s < n.length; s++) a(n[s]);
return a;
}({
1: [ function(e, t, i) {
"use strict";
i.byteLength = function(e) {
var t = c(e), i = t[0], n = t[1];
return 3 * (i + n) / 4 - n;
};
i.toByteArray = function(e) {
var t, i, n = c(e), s = n[0], r = n[1], l = new o(h(e, s, r)), u = 0, d = r > 0 ? s - 4 : s;
for (i = 0; i < d; i += 4) {
t = a[e.charCodeAt(i)] << 18 | a[e.charCodeAt(i + 1)] << 12 | a[e.charCodeAt(i + 2)] << 6 | a[e.charCodeAt(i + 3)];
l[u++] = t >> 16 & 255;
l[u++] = t >> 8 & 255;
l[u++] = 255 & t;
}
if (2 === r) {
t = a[e.charCodeAt(i)] << 2 | a[e.charCodeAt(i + 1)] >> 4;
l[u++] = 255 & t;
}
if (1 === r) {
t = a[e.charCodeAt(i)] << 10 | a[e.charCodeAt(i + 1)] << 4 | a[e.charCodeAt(i + 2)] >> 2;
l[u++] = t >> 8 & 255;
l[u++] = 255 & t;
}
return l;
};
i.fromByteArray = function(e) {
for (var t, i = e.length, a = i % 3, o = [], s = 0, r = i - a; s < r; s += 16383) o.push(d(e, s, s + 16383 > r ? r : s + 16383));
if (1 === a) {
t = e[i - 1];
o.push(n[t >> 2] + n[t << 4 & 63] + "==");
} else if (2 === a) {
t = (e[i - 2] << 8) + e[i - 1];
o.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "=");
}
return o.join("");
};
for (var n = [], a = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = 0, l = s.length; r < l; ++r) {
n[r] = s[r];
a[s.charCodeAt(r)] = r;
}
a["-".charCodeAt(0)] = 62;
a["_".charCodeAt(0)] = 63;
function c(e) {
var t = e.length;
if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
var i = e.indexOf("=");
-1 === i && (i = t);
return [ i, i === t ? 0 : 4 - i % 4 ];
}
function h(e, t, i) {
return 3 * (t + i) / 4 - i;
}
function u(e) {
return n[e >> 18 & 63] + n[e >> 12 & 63] + n[e >> 6 & 63] + n[63 & e];
}
function d(e, t, i) {
for (var n, a = [], o = t; o < i; o += 3) {
n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]);
a.push(u(n));
}
return a.join("");
}
}, {} ],
2: [ function(e, t, i) {
(function(t) {
"use strict";
var n = e("base64-js"), a = e("ieee754"), o = e("isarray");
i.Buffer = l;
i.SlowBuffer = function(e) {
+e != e && (e = 0);
return l.alloc(+e);
};
i.INSPECT_MAX_BYTES = 50;
l.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
try {
var e = new Uint8Array(1);
e.__proto__ = {
__proto__: Uint8Array.prototype,
foo: function() {
return 42;
}
};
return 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
} catch (e) {
return !1;
}
}();
i.kMaxLength = s();
function s() {
return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function r(e, t) {
if (s() < t) throw new RangeError("Invalid typed array length");
if (l.TYPED_ARRAY_SUPPORT) (e = new Uint8Array(t)).__proto__ = l.prototype; else {
null === e && (e = new l(t));
e.length = t;
}
return e;
}
function l(e, t, i) {
if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l)) return new l(e, t, i);
if ("number" == typeof e) {
if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
return d(this, e);
}
return c(this, e, t, i);
}
l.poolSize = 8192;
l._augment = function(e) {
e.__proto__ = l.prototype;
return e;
};
function c(e, t, i, n) {
if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? m(e, t, i, n) : "string" == typeof t ? g(e, t, i) : y(e, t);
}
l.from = function(e, t, i) {
return c(null, e, t, i);
};
if (l.TYPED_ARRAY_SUPPORT) {
l.prototype.__proto__ = Uint8Array.prototype;
l.__proto__ = Uint8Array;
"undefined" != typeof Symbol && Symbol.species && l[Symbol.species] === l && Object.defineProperty(l, Symbol.species, {
value: null,
configurable: !0
});
}
function h(e) {
if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
if (e < 0) throw new RangeError('"size" argument must not be negative');
}
function u(e, t, i, n) {
h(t);
return t <= 0 ? r(e, t) : void 0 !== i ? "string" == typeof n ? r(e, t).fill(i, n) : r(e, t).fill(i) : r(e, t);
}
l.alloc = function(e, t, i) {
return u(null, e, t, i);
};
function d(e, t) {
h(t);
e = r(e, t < 0 ? 0 : 0 | f(t));
if (!l.TYPED_ARRAY_SUPPORT) for (var i = 0; i < t; ++i) e[i] = 0;
return e;
}
l.allocUnsafe = function(e) {
return d(null, e);
};
l.allocUnsafeSlow = function(e) {
return d(null, e);
};
function g(e, t, i) {
"string" == typeof i && "" !== i || (i = "utf8");
if (!l.isEncoding(i)) throw new TypeError('"encoding" must be a valid string encoding');
var n = 0 | _(t, i), a = (e = r(e, n)).write(t, i);
a !== n && (e = e.slice(0, a));
return e;
}
function p(e, t) {
var i = t.length < 0 ? 0 : 0 | f(t.length);
e = r(e, i);
for (var n = 0; n < i; n += 1) e[n] = 255 & t[n];
return e;
}
function m(e, t, i, n) {
t.byteLength;
if (i < 0 || t.byteLength < i) throw new RangeError("'offset' is out of bounds");
if (t.byteLength < i + (n || 0)) throw new RangeError("'length' is out of bounds");
t = void 0 === i && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, i) : new Uint8Array(t, i, n);
l.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = l.prototype : e = p(e, t);
return e;
}
function y(e, t) {
if (l.isBuffer(t)) {
var i = 0 | f(t.length);
if (0 === (e = r(e, i)).length) return e;
t.copy(e, 0, 0, i);
return e;
}
if (t) {
if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || $(t.length) ? r(e, 0) : p(e, t);
if ("Buffer" === t.type && o(t.data)) return p(e, t.data);
}
throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function f(e) {
if (e >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
return 0 | e;
}
l.isBuffer = function(e) {
return !(null == e || !e._isBuffer);
};
l.compare = function(e, t) {
if (!l.isBuffer(e) || !l.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
if (e === t) return 0;
for (var i = e.length, n = t.length, a = 0, o = Math.min(i, n); a < o; ++a) if (e[a] !== t[a]) {
i = e[a];
n = t[a];
break;
}
return i < n ? -1 : n < i ? 1 : 0;
};
l.isEncoding = function(e) {
switch (String(e).toLowerCase()) {
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
return !0;

default:
return !1;
}
};
l.concat = function(e, t) {
if (!o(e)) throw new TypeError('"list" argument must be an Array of Buffers');
if (0 === e.length) return l.alloc(0);
var i;
if (void 0 === t) {
t = 0;
for (i = 0; i < e.length; ++i) t += e[i].length;
}
var n = l.allocUnsafe(t), a = 0;
for (i = 0; i < e.length; ++i) {
var s = e[i];
if (!l.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
s.copy(n, a);
a += s.length;
}
return n;
};
function _(e, t) {
if (l.isBuffer(e)) return e.length;
if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
"string" != typeof e && (e = "" + e);
var i = e.length;
if (0 === i) return 0;
for (var n = !1; ;) switch (t) {
case "ascii":
case "latin1":
case "binary":
return i;

case "utf8":
case "utf-8":
case void 0:
return X(e).length;

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return 2 * i;

case "hex":
return i >>> 1;

case "base64":
return q(e).length;

default:
if (n) return X(e).length;
t = ("" + t).toLowerCase();
n = !0;
}
}
l.byteLength = _;
function A(e, t, i) {
var n = !1;
(void 0 === t || t < 0) && (t = 0);
if (t > this.length) return "";
(void 0 === i || i > this.length) && (i = this.length);
if (i <= 0) return "";
if ((i >>>= 0) <= (t >>>= 0)) return "";
e || (e = "utf8");
for (;;) switch (e) {
case "hex":
return W(this, t, i);

case "utf8":
case "utf-8":
return D(this, t, i);

case "ascii":
return O(this, t, i);

case "latin1":
case "binary":
return k(this, t, i);

case "base64":
return T(this, t, i);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return M(this, t, i);

default:
if (n) throw new TypeError("Unknown encoding: " + e);
e = (e + "").toLowerCase();
n = !0;
}
}
l.prototype._isBuffer = !0;
function C(e, t, i) {
var n = e[t];
e[t] = e[i];
e[i] = n;
}
l.prototype.swap16 = function() {
var e = this.length;
if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
for (var t = 0; t < e; t += 2) C(this, t, t + 1);
return this;
};
l.prototype.swap32 = function() {
var e = this.length;
if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
for (var t = 0; t < e; t += 4) {
C(this, t, t + 3);
C(this, t + 1, t + 2);
}
return this;
};
l.prototype.swap64 = function() {
var e = this.length;
if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
for (var t = 0; t < e; t += 8) {
C(this, t, t + 7);
C(this, t + 1, t + 6);
C(this, t + 2, t + 5);
C(this, t + 3, t + 4);
}
return this;
};
l.prototype.toString = function() {
var e = 0 | this.length;
return 0 === e ? "" : 0 === arguments.length ? D(this, 0, e) : A.apply(this, arguments);
};
l.prototype.equals = function(e) {
if (!l.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
return this === e || 0 === l.compare(this, e);
};
l.prototype.inspect = function() {
var e = "", t = i.INSPECT_MAX_BYTES;
if (this.length > 0) {
e = this.toString("hex", 0, t).match(/.{2}/g).join(" ");
this.length > t && (e += " ... ");
}
return "<Buffer " + e + ">";
};
l.prototype.compare = function(e, t, i, n, a) {
if (!l.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
void 0 === t && (t = 0);
void 0 === i && (i = e ? e.length : 0);
void 0 === n && (n = 0);
void 0 === a && (a = this.length);
if (t < 0 || i > e.length || n < 0 || a > this.length) throw new RangeError("out of range index");
if (n >= a && t >= i) return 0;
if (n >= a) return -1;
if (t >= i) return 1;
t >>>= 0;
i >>>= 0;
n >>>= 0;
a >>>= 0;
if (this === e) return 0;
for (var o = a - n, s = i - t, r = Math.min(o, s), c = this.slice(n, a), h = e.slice(t, i), u = 0; u < r; ++u) if (c[u] !== h[u]) {
o = c[u];
s = h[u];
break;
}
return o < s ? -1 : s < o ? 1 : 0;
};
function v(e, t, i, n, a) {
if (0 === e.length) return -1;
if ("string" == typeof i) {
n = i;
i = 0;
} else i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648);
i = +i;
isNaN(i) && (i = a ? 0 : e.length - 1);
i < 0 && (i = e.length + i);
if (i >= e.length) {
if (a) return -1;
i = e.length - 1;
} else if (i < 0) {
if (!a) return -1;
i = 0;
}
"string" == typeof t && (t = l.from(t, n));
if (l.isBuffer(t)) return 0 === t.length ? -1 : P(e, t, i, n, a);
if ("number" == typeof t) {
t &= 255;
return l.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? a ? Uint8Array.prototype.indexOf.call(e, t, i) : Uint8Array.prototype.lastIndexOf.call(e, t, i) : P(e, [ t ], i, n, a);
}
throw new TypeError("val must be string, number or Buffer");
}
function P(e, t, i, n, a) {
var o, s = 1, r = e.length, l = t.length;
if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
if (e.length < 2 || t.length < 2) return -1;
s = 2;
r /= 2;
l /= 2;
i /= 2;
}
function c(e, t) {
return 1 === s ? e[t] : e.readUInt16BE(t * s);
}
if (a) {
var h = -1;
for (o = i; o < r; o++) if (c(e, o) === c(t, -1 === h ? 0 : o - h)) {
-1 === h && (h = o);
if (o - h + 1 === l) return h * s;
} else {
-1 !== h && (o -= o - h);
h = -1;
}
} else {
i + l > r && (i = r - l);
for (o = i; o >= 0; o--) {
for (var u = !0, d = 0; d < l; d++) if (c(e, o + d) !== c(t, d)) {
u = !1;
break;
}
if (u) return o;
}
}
return -1;
}
l.prototype.includes = function(e, t, i) {
return -1 !== this.indexOf(e, t, i);
};
l.prototype.indexOf = function(e, t, i) {
return v(this, e, t, i, !0);
};
l.prototype.lastIndexOf = function(e, t, i) {
return v(this, e, t, i, !1);
};
function b(e, t, i, n) {
i = Number(i) || 0;
var a = e.length - i;
n ? (n = Number(n)) > a && (n = a) : n = a;
var o = t.length;
if (o % 2 != 0) throw new TypeError("Invalid hex string");
n > o / 2 && (n = o / 2);
for (var s = 0; s < n; ++s) {
var r = parseInt(t.substr(2 * s, 2), 16);
if (isNaN(r)) return s;
e[i + s] = r;
}
return s;
}
function L(e, t, i, n) {
return Q(X(t, e.length - i), e, i, n);
}
function I(e, t, i, n) {
return Q(J(t), e, i, n);
}
function B(e, t, i, n) {
return I(e, t, i, n);
}
function E(e, t, i, n) {
return Q(q(t), e, i, n);
}
function N(e, t, i, n) {
return Q(Z(t, e.length - i), e, i, n);
}
l.prototype.write = function(e, t, i, n) {
if (void 0 === t) {
n = "utf8";
i = this.length;
t = 0;
} else if (void 0 === i && "string" == typeof t) {
n = t;
i = this.length;
t = 0;
} else {
if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
t |= 0;
if (isFinite(i)) {
i |= 0;
void 0 === n && (n = "utf8");
} else {
n = i;
i = void 0;
}
}
var a = this.length - t;
(void 0 === i || i > a) && (i = a);
if (e.length > 0 && (i < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
n || (n = "utf8");
for (var o = !1; ;) switch (n) {
case "hex":
return b(this, e, t, i);

case "utf8":
case "utf-8":
return L(this, e, t, i);

case "ascii":
return I(this, e, t, i);

case "latin1":
case "binary":
return B(this, e, t, i);

case "base64":
return E(this, e, t, i);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return N(this, e, t, i);

default:
if (o) throw new TypeError("Unknown encoding: " + n);
n = ("" + n).toLowerCase();
o = !0;
}
};
l.prototype.toJSON = function() {
return {
type: "Buffer",
data: Array.prototype.slice.call(this._arr || this, 0)
};
};
function T(e, t, i) {
return 0 === t && i === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, i));
}
function D(e, t, i) {
i = Math.min(e.length, i);
for (var n = [], a = t; a < i; ) {
var o = e[a], s = null, r = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
if (a + r <= i) {
var l, c, h, u;
switch (r) {
case 1:
o < 128 && (s = o);
break;

case 2:
128 == (192 & (l = e[a + 1])) && (u = (31 & o) << 6 | 63 & l) > 127 && (s = u);
break;

case 3:
l = e[a + 1];
c = e[a + 2];
128 == (192 & l) && 128 == (192 & c) && (u = (15 & o) << 12 | (63 & l) << 6 | 63 & c) > 2047 && (u < 55296 || u > 57343) && (s = u);
break;

case 4:
l = e[a + 1];
c = e[a + 2];
h = e[a + 3];
128 == (192 & l) && 128 == (192 & c) && 128 == (192 & h) && (u = (15 & o) << 18 | (63 & l) << 12 | (63 & c) << 6 | 63 & h) > 65535 && u < 1114112 && (s = u);
}
}
if (null === s) {
s = 65533;
r = 1;
} else if (s > 65535) {
s -= 65536;
n.push(s >>> 10 & 1023 | 55296);
s = 56320 | 1023 & s;
}
n.push(s);
a += r;
}
return w(n);
}
var S = 4096;
function w(e) {
var t = e.length;
if (t <= S) return String.fromCharCode.apply(String, e);
for (var i = "", n = 0; n < t; ) i += String.fromCharCode.apply(String, e.slice(n, n += S));
return i;
}
function O(e, t, i) {
var n = "";
i = Math.min(e.length, i);
for (var a = t; a < i; ++a) n += String.fromCharCode(127 & e[a]);
return n;
}
function k(e, t, i) {
var n = "";
i = Math.min(e.length, i);
for (var a = t; a < i; ++a) n += String.fromCharCode(e[a]);
return n;
}
function W(e, t, i) {
var n = e.length;
(!t || t < 0) && (t = 0);
(!i || i < 0 || i > n) && (i = n);
for (var a = "", o = t; o < i; ++o) a += Y(e[o]);
return a;
}
function M(e, t, i) {
for (var n = e.slice(t, i), a = "", o = 0; o < n.length; o += 2) a += String.fromCharCode(n[o] + 256 * n[o + 1]);
return a;
}
l.prototype.slice = function(e, t) {
var i, n = this.length;
e = ~~e;
t = void 0 === t ? n : ~~t;
e < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n);
t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n);
t < e && (t = e);
if (l.TYPED_ARRAY_SUPPORT) (i = this.subarray(e, t)).__proto__ = l.prototype; else {
var a = t - e;
i = new l(a, void 0);
for (var o = 0; o < a; ++o) i[o] = this[o + e];
}
return i;
};
function R(e, t, i) {
if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
if (e + t > i) throw new RangeError("Trying to access beyond buffer length");
}
l.prototype.readUIntLE = function(e, t, i) {
e |= 0;
t |= 0;
i || R(e, t, this.length);
for (var n = this[e], a = 1, o = 0; ++o < t && (a *= 256); ) n += this[e + o] * a;
return n;
};
l.prototype.readUIntBE = function(e, t, i) {
e |= 0;
t |= 0;
i || R(e, t, this.length);
for (var n = this[e + --t], a = 1; t > 0 && (a *= 256); ) n += this[e + --t] * a;
return n;
};
l.prototype.readUInt8 = function(e, t) {
t || R(e, 1, this.length);
return this[e];
};
l.prototype.readUInt16LE = function(e, t) {
t || R(e, 2, this.length);
return this[e] | this[e + 1] << 8;
};
l.prototype.readUInt16BE = function(e, t) {
t || R(e, 2, this.length);
return this[e] << 8 | this[e + 1];
};
l.prototype.readUInt32LE = function(e, t) {
t || R(e, 4, this.length);
return (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
};
l.prototype.readUInt32BE = function(e, t) {
t || R(e, 4, this.length);
return 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
};
l.prototype.readIntLE = function(e, t, i) {
e |= 0;
t |= 0;
i || R(e, t, this.length);
for (var n = this[e], a = 1, o = 0; ++o < t && (a *= 256); ) n += this[e + o] * a;
n >= (a *= 128) && (n -= Math.pow(2, 8 * t));
return n;
};
l.prototype.readIntBE = function(e, t, i) {
e |= 0;
t |= 0;
i || R(e, t, this.length);
for (var n = t, a = 1, o = this[e + --n]; n > 0 && (a *= 256); ) o += this[e + --n] * a;
o >= (a *= 128) && (o -= Math.pow(2, 8 * t));
return o;
};
l.prototype.readInt8 = function(e, t) {
t || R(e, 1, this.length);
return 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
};
l.prototype.readInt16LE = function(e, t) {
t || R(e, 2, this.length);
var i = this[e] | this[e + 1] << 8;
return 32768 & i ? 4294901760 | i : i;
};
l.prototype.readInt16BE = function(e, t) {
t || R(e, 2, this.length);
var i = this[e + 1] | this[e] << 8;
return 32768 & i ? 4294901760 | i : i;
};
l.prototype.readInt32LE = function(e, t) {
t || R(e, 4, this.length);
return this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
};
l.prototype.readInt32BE = function(e, t) {
t || R(e, 4, this.length);
return this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
};
l.prototype.readFloatLE = function(e, t) {
t || R(e, 4, this.length);
return a.read(this, e, !0, 23, 4);
};
l.prototype.readFloatBE = function(e, t) {
t || R(e, 4, this.length);
return a.read(this, e, !1, 23, 4);
};
l.prototype.readDoubleLE = function(e, t) {
t || R(e, 8, this.length);
return a.read(this, e, !0, 52, 8);
};
l.prototype.readDoubleBE = function(e, t) {
t || R(e, 8, this.length);
return a.read(this, e, !1, 52, 8);
};
function U(e, t, i, n, a, o) {
if (!l.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
if (t > a || t < o) throw new RangeError('"value" argument is out of bounds');
if (i + n > e.length) throw new RangeError("Index out of range");
}
l.prototype.writeUIntLE = function(e, t, i, n) {
e = +e;
t |= 0;
i |= 0;
if (!n) {
U(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
}
var a = 1, o = 0;
this[t] = 255 & e;
for (;++o < i && (a *= 256); ) this[t + o] = e / a & 255;
return t + i;
};
l.prototype.writeUIntBE = function(e, t, i, n) {
e = +e;
t |= 0;
i |= 0;
if (!n) {
U(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
}
var a = i - 1, o = 1;
this[t + a] = 255 & e;
for (;--a >= 0 && (o *= 256); ) this[t + a] = e / o & 255;
return t + i;
};
l.prototype.writeUInt8 = function(e, t, i) {
e = +e;
t |= 0;
i || U(this, e, t, 1, 255, 0);
l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e));
this[t] = 255 & e;
return t + 1;
};
function G(e, t, i, n) {
t < 0 && (t = 65535 + t + 1);
for (var a = 0, o = Math.min(e.length - i, 2); a < o; ++a) e[i + a] = (t & 255 << 8 * (n ? a : 1 - a)) >>> 8 * (n ? a : 1 - a);
}
l.prototype.writeUInt16LE = function(e, t, i) {
e = +e;
t |= 0;
i || U(this, e, t, 2, 65535, 0);
if (l.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
} else G(this, e, t, !0);
return t + 2;
};
l.prototype.writeUInt16BE = function(e, t, i) {
e = +e;
t |= 0;
i || U(this, e, t, 2, 65535, 0);
if (l.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 8;
this[t + 1] = 255 & e;
} else G(this, e, t, !1);
return t + 2;
};
function F(e, t, i, n) {
t < 0 && (t = 4294967295 + t + 1);
for (var a = 0, o = Math.min(e.length - i, 4); a < o; ++a) e[i + a] = t >>> 8 * (n ? a : 3 - a) & 255;
}
l.prototype.writeUInt32LE = function(e, t, i) {
e = +e;
t |= 0;
i || U(this, e, t, 4, 4294967295, 0);
if (l.TYPED_ARRAY_SUPPORT) {
this[t + 3] = e >>> 24;
this[t + 2] = e >>> 16;
this[t + 1] = e >>> 8;
this[t] = 255 & e;
} else F(this, e, t, !0);
return t + 4;
};
l.prototype.writeUInt32BE = function(e, t, i) {
e = +e;
t |= 0;
i || U(this, e, t, 4, 4294967295, 0);
if (l.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 24;
this[t + 1] = e >>> 16;
this[t + 2] = e >>> 8;
this[t + 3] = 255 & e;
} else F(this, e, t, !1);
return t + 4;
};
l.prototype.writeIntLE = function(e, t, i, n) {
e = +e;
t |= 0;
if (!n) {
var a = Math.pow(2, 8 * i - 1);
U(this, e, t, i, a - 1, -a);
}
var o = 0, s = 1, r = 0;
this[t] = 255 & e;
for (;++o < i && (s *= 256); ) {
e < 0 && 0 === r && 0 !== this[t + o - 1] && (r = 1);
this[t + o] = (e / s >> 0) - r & 255;
}
return t + i;
};
l.prototype.writeIntBE = function(e, t, i, n) {
e = +e;
t |= 0;
if (!n) {
var a = Math.pow(2, 8 * i - 1);
U(this, e, t, i, a - 1, -a);
}
var o = i - 1, s = 1, r = 0;
this[t + o] = 255 & e;
for (;--o >= 0 && (s *= 256); ) {
e < 0 && 0 === r && 0 !== this[t + o + 1] && (r = 1);
this[t + o] = (e / s >> 0) - r & 255;
}
return t + i;
};
l.prototype.writeInt8 = function(e, t, i) {
e = +e;
t |= 0;
i || U(this, e, t, 1, 127, -128);
l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e));
e < 0 && (e = 255 + e + 1);
this[t] = 255 & e;
return t + 1;
};
l.prototype.writeInt16LE = function(e, t, i) {
e = +e;
t |= 0;
i || U(this, e, t, 2, 32767, -32768);
if (l.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
} else G(this, e, t, !0);
return t + 2;
};
l.prototype.writeInt16BE = function(e, t, i) {
e = +e;
t |= 0;
i || U(this, e, t, 2, 32767, -32768);
if (l.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 8;
this[t + 1] = 255 & e;
} else G(this, e, t, !1);
return t + 2;
};
l.prototype.writeInt32LE = function(e, t, i) {
e = +e;
t |= 0;
i || U(this, e, t, 4, 2147483647, -2147483648);
if (l.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
this[t + 2] = e >>> 16;
this[t + 3] = e >>> 24;
} else F(this, e, t, !0);
return t + 4;
};
l.prototype.writeInt32BE = function(e, t, i) {
e = +e;
t |= 0;
i || U(this, e, t, 4, 2147483647, -2147483648);
e < 0 && (e = 4294967295 + e + 1);
if (l.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 24;
this[t + 1] = e >>> 16;
this[t + 2] = e >>> 8;
this[t + 3] = 255 & e;
} else F(this, e, t, !1);
return t + 4;
};
function x(e, t, i, n, a, o) {
if (i + n > e.length) throw new RangeError("Index out of range");
if (i < 0) throw new RangeError("Index out of range");
}
function z(e, t, i, n, o) {
o || x(e, 0, i, 4);
a.write(e, t, i, n, 23, 4);
return i + 4;
}
l.prototype.writeFloatLE = function(e, t, i) {
return z(this, e, t, !0, i);
};
l.prototype.writeFloatBE = function(e, t, i) {
return z(this, e, t, !1, i);
};
function V(e, t, i, n, o) {
o || x(e, 0, i, 8);
a.write(e, t, i, n, 52, 8);
return i + 8;
}
l.prototype.writeDoubleLE = function(e, t, i) {
return V(this, e, t, !0, i);
};
l.prototype.writeDoubleBE = function(e, t, i) {
return V(this, e, t, !1, i);
};
l.prototype.copy = function(e, t, i, n) {
i || (i = 0);
n || 0 === n || (n = this.length);
t >= e.length && (t = e.length);
t || (t = 0);
n > 0 && n < i && (n = i);
if (n === i) return 0;
if (0 === e.length || 0 === this.length) return 0;
if (t < 0) throw new RangeError("targetStart out of bounds");
if (i < 0 || i >= this.length) throw new RangeError("sourceStart out of bounds");
if (n < 0) throw new RangeError("sourceEnd out of bounds");
n > this.length && (n = this.length);
e.length - t < n - i && (n = e.length - t + i);
var a, o = n - i;
if (this === e && i < t && t < n) for (a = o - 1; a >= 0; --a) e[a + t] = this[a + i]; else if (o < 1e3 || !l.TYPED_ARRAY_SUPPORT) for (a = 0; a < o; ++a) e[a + t] = this[a + i]; else Uint8Array.prototype.set.call(e, this.subarray(i, i + o), t);
return o;
};
l.prototype.fill = function(e, t, i, n) {
if ("string" == typeof e) {
if ("string" == typeof t) {
n = t;
t = 0;
i = this.length;
} else if ("string" == typeof i) {
n = i;
i = this.length;
}
if (1 === e.length) {
var a = e.charCodeAt(0);
a < 256 && (e = a);
}
if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
if ("string" == typeof n && !l.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
} else "number" == typeof e && (e &= 255);
if (t < 0 || this.length < t || this.length < i) throw new RangeError("Out of range index");
if (i <= t) return this;
t >>>= 0;
i = void 0 === i ? this.length : i >>> 0;
e || (e = 0);
var o;
if ("number" == typeof e) for (o = t; o < i; ++o) this[o] = e; else {
var s = l.isBuffer(e) ? e : X(new l(e, n).toString()), r = s.length;
for (o = 0; o < i - t; ++o) this[o + t] = s[o % r];
}
return this;
};
var H = /[^+\/0-9A-Za-z-_]/g;
function K(e) {
if ((e = j(e).replace(H, "")).length < 2) return "";
for (;e.length % 4 != 0; ) e += "=";
return e;
}
function j(e) {
return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function Y(e) {
return e < 16 ? "0" + e.toString(16) : e.toString(16);
}
function X(e, t) {
t = t || Infinity;
for (var i, n = e.length, a = null, o = [], s = 0; s < n; ++s) {
if ((i = e.charCodeAt(s)) > 55295 && i < 57344) {
if (!a) {
if (i > 56319) {
(t -= 3) > -1 && o.push(239, 191, 189);
continue;
}
if (s + 1 === n) {
(t -= 3) > -1 && o.push(239, 191, 189);
continue;
}
a = i;
continue;
}
if (i < 56320) {
(t -= 3) > -1 && o.push(239, 191, 189);
a = i;
continue;
}
i = 65536 + (a - 55296 << 10 | i - 56320);
} else a && (t -= 3) > -1 && o.push(239, 191, 189);
a = null;
if (i < 128) {
if ((t -= 1) < 0) break;
o.push(i);
} else if (i < 2048) {
if ((t -= 2) < 0) break;
o.push(i >> 6 | 192, 63 & i | 128);
} else if (i < 65536) {
if ((t -= 3) < 0) break;
o.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128);
} else {
if (!(i < 1114112)) throw new Error("Invalid code point");
if ((t -= 4) < 0) break;
o.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128);
}
}
return o;
}
function J(e) {
for (var t = [], i = 0; i < e.length; ++i) t.push(255 & e.charCodeAt(i));
return t;
}
function Z(e, t) {
for (var i, n, a, o = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) {
n = (i = e.charCodeAt(s)) >> 8;
a = i % 256;
o.push(a);
o.push(n);
}
return o;
}
function q(e) {
return n.toByteArray(K(e));
}
function Q(e, t, i, n) {
for (var a = 0; a < n && !(a + i >= t.length || a >= e.length); ++a) t[a + i] = e[a];
return a;
}
function $(e) {
return e != e;
}
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"base64-js": 1,
ieee754: 4,
isarray: 3
} ],
3: [ function(e, t, i) {
var n = {}.toString;
t.exports = Array.isArray || function(e) {
return "[object Array]" == n.call(e);
};
}, {} ],
4: [ function(e, t, i) {
i.read = function(e, t, i, n, a) {
var o, s, r = 8 * a - n - 1, l = (1 << r) - 1, c = l >> 1, h = -7, u = i ? a - 1 : 0, d = i ? -1 : 1, g = e[t + u];
u += d;
o = g & (1 << -h) - 1;
g >>= -h;
h += r;
for (;h > 0; o = 256 * o + e[t + u], u += d, h -= 8) ;
s = o & (1 << -h) - 1;
o >>= -h;
h += n;
for (;h > 0; s = 256 * s + e[t + u], u += d, h -= 8) ;
if (0 === o) o = 1 - c; else {
if (o === l) return s ? NaN : Infinity * (g ? -1 : 1);
s += Math.pow(2, n);
o -= c;
}
return (g ? -1 : 1) * s * Math.pow(2, o - n);
};
i.write = function(e, t, i, n, a, o) {
var s, r, l, c = 8 * o - a - 1, h = (1 << c) - 1, u = h >> 1, d = 23 === a ? Math.pow(2, -24) - Math.pow(2, -77) : 0, g = n ? 0 : o - 1, p = n ? 1 : -1, m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
t = Math.abs(t);
if (isNaN(t) || Infinity === t) {
r = isNaN(t) ? 1 : 0;
s = h;
} else {
s = Math.floor(Math.log(t) / Math.LN2);
if (t * (l = Math.pow(2, -s)) < 1) {
s--;
l *= 2;
}
if ((t += s + u >= 1 ? d / l : d * Math.pow(2, 1 - u)) * l >= 2) {
s++;
l /= 2;
}
if (s + u >= h) {
r = 0;
s = h;
} else if (s + u >= 1) {
r = (t * l - 1) * Math.pow(2, a);
s += u;
} else {
r = t * Math.pow(2, u - 1) * Math.pow(2, a);
s = 0;
}
}
for (;a >= 8; e[i + g] = 255 & r, g += p, r /= 256, a -= 8) ;
s = s << a | r;
c += a;
for (;c > 0; e[i + g] = 255 & s, g += p, s /= 256, c -= 8) ;
e[i + g - p] |= 128 * m;
};
}, {} ],
AFLogger: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "25e69AZ0/xDH7MCLjFyNBxu", "AFLogger");
var n = "com/zygame/utils/AFHelper";
cc.Class({
statics: {
logEventLevel: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(n, "trackEventLevel", "(I)V", e);
cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AppsFlyerHelper", "trackEventLevel", e);
},
logEventWatchAds: function(e) {
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(n, "trackEventWatchAD", "(Ljava/lang/String;)V", e) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AppsFlyerHelper", "trackEventWatchAds", e);
},
logEventClickButton: function(e) {
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(n, "trackEventClickButton", "(Ljava/lang/String;)V", e) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AppsFlyerHelper", "trackEventClickButton", e);
},
logEvent: function(e, t) {
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(n, "trackEvent", "(Ljava/lang/String;Ljava/lang/String;)V", e, t) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AppsFlyerHelper", "trackEvent:withValue:", e, t);
}
}
});
cc._RF.pop();
}, {} ],
AdHelper: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "68c65uC/Q5J/qrAibYnfzMi", "AdHelper");
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = e("GameManager"), o = cc.Class({
statics: {
initAdSdk: function() {
101 == CHANNEL_ID || 102 == CHANNEL_ID ? zy.UpltvHelper.initUpltv(function(e) {
cc.log("===upltv init: " + e);
e && zy.UpltvHelper.setloadRdADCb();
}) : 201 == CHANNEL_ID || CHANNEL_ID;
},
isInterstitialReady: function(e) {
return 101 == CHANNEL_ID || 102 == CHANNEL_ID ? zy.UpltvHelper.isInterstitialReady(e) : 201 == CHANNEL_ID || 202 == CHANNEL_ID ? zy.OpenAdsHelper.isIntersitialReady(e) : void 0;
},
showInterstitialAds: function(e) {
if (101 == CHANNEL_ID || 102 == CHANNEL_ID) {
zy.UpltvHelper.showInterstitial(e, null);
zy.LogHelper.logEventWatchAds(e);
} else if (201 == CHANNEL_ID || 202 == CHANNEL_ID) {
zy.OpenAdsHelper.showInterstitialAds(e);
zy.LogHelper.logEventWatchAds(e);
}
},
isRdAdsReady: function(e) {
return 101 == CHANNEL_ID || 102 == CHANNEL_ID ? zy.UpltvHelper.rdADIsReady() : 201 == CHANNEL_ID || 202 == CHANNEL_ID ? zy.OpenAdsHelper.isRdAdsReady(e) : void 0;
},
showRdAds: function(e, t) {
this.gotRdCall = t;
101 == CHANNEL_ID || 102 == CHANNEL_ID ? zy.UpltvHelper.rdAdShow(e) : 201 != CHANNEL_ID && 202 != CHANNEL_ID || zy.OpenAdsHelper.showRdAds(e);
zy.AdHelper.pauseGame();
},
onOpenAdsReward: function(e, t) {
cc.log("===>js收到视频激励回调:" + e + ", " + t);
cc.log("===> typeof ret: " + ("undefined" == typeof t ? "undefined" : n(t)));
if (this.gotRdCall) {
this.gotRdCall(t);
this.gotRdCall = null;
}
t && zy.LogHelper.logEventWatchAds(e);
zy.AdHelper.resumeGame();
},
pauseGame: function() {
cc.game.pause();
a.setGamePaused(!0);
zy.audioMng.pauseMusic();
},
resumeGame: function() {
cc.game.resume();
a.setGamePaused(!1);
zy.audioMng.resumeMusic();
}
}
});
zy.AdHelper = o;
cc._RF.pop();
}, {
GameManager: "GameManager"
} ],
AimCallBack: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "67a3fE9+21G8a1IUlzZ5Nzm", "AimCallBack");
cc.Class({
extends: cc.Component,
onLoad: function() {
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
},
aniAttackAimClose1: function() {
this.gridmaps && this.gridmaps.getPlayAni_attack_aim3();
},
aniAttackAimClose2: function() {
this.gridmaps && this.gridmaps.hideAimNode();
}
});
cc._RF.pop();
}, {} ],
Algo: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d18ccVTPSlPKasd+dtGaYsS", "Algo");
var n = {
cipher: function(e, t) {
for (var i = t.length / 4 - 1, a = [ [], [], [], [] ], o = 0; o < 16; o++) a[o % 4][Math.floor(o / 4)] = e[o];
a = n.addRoundKey(a, t, 0, 4);
for (var s = 1; s < i; s++) {
a = n.subBytes(a, 4);
a = n.shiftRows(a, 4);
a = n.mixColumns(a, 4);
a = n.addRoundKey(a, t, s, 4);
}
a = n.subBytes(a, 4);
a = n.shiftRows(a, 4);
a = n.addRoundKey(a, t, i, 4);
for (var r = new Array(16), l = 0; l < 16; l++) r[l] = a[l % 4][Math.floor(l / 4)];
return r;
},
keyExpansion: function(e) {
for (var t = e.length / 4, i = t + 6, a = new Array(4 * (i + 1)), o = new Array(4), s = 0; s < t; s++) {
var r = [ e[4 * s], e[4 * s + 1], e[4 * s + 2], e[4 * s + 3] ];
a[s] = r;
}
for (var l = t; l < 4 * (i + 1); l++) {
a[l] = new Array(4);
for (var c = 0; c < 4; c++) o[c] = a[l - 1][c];
if (l % t == 0) {
o = n.subWord(n.rotWord(o));
for (var h = 0; h < 4; h++) o[h] ^= n.rCon[l / t][h];
} else t > 6 && l % t == 4 && (o = n.subWord(o));
for (var u = 0; u < 4; u++) a[l][u] = a[l - t][u] ^ o[u];
}
return a;
},
subBytes: function(e, t) {
for (var i = 0; i < 4; i++) for (var a = 0; a < t; a++) e[i][a] = n.sBox[e[i][a]];
return e;
},
shiftRows: function(e, t) {
for (var i = new Array(4), n = 1; n < 4; n++) {
for (var a = 0; a < 4; a++) i[a] = e[n][(a + n) % t];
for (var o = 0; o < 4; o++) e[n][o] = i[o];
}
return e;
},
mixColumns: function(e, t) {
for (var i = 0; i < 4; i++) {
for (var n = new Array(4), a = new Array(4), o = 0; o < 4; o++) {
n[o] = e[o][i];
a[o] = 128 & e[o][i] ? e[o][i] << 1 ^ 283 : e[o][i] << 1;
}
e[0][i] = a[0] ^ n[1] ^ a[1] ^ n[2] ^ n[3];
e[1][i] = n[0] ^ a[1] ^ n[2] ^ a[2] ^ n[3];
e[2][i] = n[0] ^ n[1] ^ a[2] ^ n[3] ^ a[3];
e[3][i] = n[0] ^ a[0] ^ n[1] ^ n[2] ^ a[3];
}
return e;
},
addRoundKey: function(e, t, i, n) {
for (var a = 0; a < 4; a++) for (var o = 0; o < n; o++) e[a][o] ^= t[4 * i + o][a];
return e;
},
subWord: function(e) {
for (var t = 0; t < 4; t++) e[t] = n.sBox[e[t]];
return e;
},
rotWord: function(e) {
for (var t = e[0], i = 0; i < 3; i++) e[i] = e[i + 1];
e[3] = t;
return e;
},
sBox: [ 99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22 ],
rCon: [ [ 0, 0, 0, 0 ], [ 1, 0, 0, 0 ], [ 2, 0, 0, 0 ], [ 4, 0, 0, 0 ], [ 8, 0, 0, 0 ], [ 16, 0, 0, 0 ], [ 32, 0, 0, 0 ], [ 64, 0, 0, 0 ], [ 128, 0, 0, 0 ], [ 27, 0, 0, 0 ], [ 54, 0, 0, 0 ] ]
};
"undefined" != typeof t && t.exports && (t.exports = n);
"function" == typeof define && define.amd && define([], function() {
return n;
});
cc._RF.pop();
}, {} ],
AniCallBack: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "74923uo2R5EBJfAJulLbWuF", "AniCallBack");
var n = e("GameManager");
cc.Class({
extends: cc.Component,
onLoad: function() {
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
this.audioMng = cc.find("Canvas/AudioMng").getComponent("AudioMng");
},
ui_3_go: function() {
this.gridmaps.stopAniComplete_UI_button2();
},
enemy_hitClose: function() {
this.node.destroy();
},
boomClose: function() {
this.node.destroy();
},
bullet_hitClose: function() {
this.node.destroy();
},
upgrade_chooseClose: function() {
n.isAniCallBack = !0;
},
upgrade_starshow1Close: function() {
n.isAniCallBack = !0;
},
upgrade_starshow2Close: function() {
n.isAniCallBack = !0;
},
tipsClose: function() {
this.node = null;
cc.isValid(this.node) && this.node.destroy();
},
complete_UIshowClose: function() {
n.isStartSkillCountdown = !1;
},
gun2_1_attack: function() {
this.audioMng && this.audioMng.playLaunchgun2_1Audio();
},
gun2_2_attack: function() {
this.audioMng && this.audioMng.playLaunchgun2_2Audio();
},
gun2_3_attack: function() {
this.audioMng && this.audioMng.playLaunchgun2_3Audio();
},
gun3_Launch: function() {
this.gridmaps && this.gridmaps.set_FlamesbulletLeve_To_launchbullet();
},
gun3_bullet_go: function() {},
gun_3_bullet_1_2: function() {
zy.nodePoolMng.putBullet(this.node);
},
gun_3_bullet_3_2: function() {
zy.nodePoolMng.putBullet(this.node);
},
gun_3_bullet_2Attack: function(e) {
n.isGun_3_bullet_2Attack = e;
},
gun_4_bullet_2: function() {
zy.nodePoolMng.putBullet(this.node);
},
gun5_1_2Launch: function() {
this.gridmaps && this.gridmaps.set_HowitzerbulletLeve_To_launchbullet();
},
gun5_bullet5_1_2: function() {
this.playerData8 = n.getPlayersData(8);
3 == this.playerData8.player_StarLevel ? this.node.destroy() : zy.nodePoolMng.putBullet(this.node);
},
gun5_3_attack1Launch: function() {
this.gridmaps && this.gridmaps.set_HowitzerbulletLeve_To_launchbullet();
},
gun5_bullet5_3_2: function() {
this.node.destroy();
},
gun5_bullet_3: function() {
this.gridmaps && this.gridmaps.set_ani_Gun5_3(!1);
zy.audioMng.playEffect(zy.audioMng.launchgun5_3Audio);
},
ani_enemy_boss_show: function() {
this.gridmaps && this.gridmaps.initBossLevelNodePos(n.bossLevelFollowingCameraDeviationY);
},
warning_enemy2: function() {
zy.nodePoolMng.putWarningEnemy2DecNode(this.node);
},
warning_boss: function() {
this.node.destroy();
},
warning_normal: function() {}
});
cc._RF.pop();
}, {
GameManager: "GameManager"
} ],
AttackModeCallBack: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f50d3sZ/LpBI62RdvNiyTtk", "AttackModeCallBack");
cc.Class({
extends: cc.Component,
onLoad: function() {
this.attackMode_On_Off = 0;
},
onClose: function() {
this.attackMode_On_Off = 1;
},
offClose: function() {
this.attackMode_On_Off = 0;
},
getAttackMode_On_Off: function() {
return this.attackMode_On_Off;
}
});
cc._RF.pop();
}, {} ],
AttackModeLayer: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "01f61ES5IxHdrPreiWVPI+d", "AttackModeLayer");
var n = e("GameManager");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.initGetComponent();
this.initUI();
this.initData();
this.showView();
},
initGetComponent: function() {
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
this.gridmaps && (this.m_plist = this.gridmaps.getMainPlist());
},
initUI: function() {
this.mask = this.node.getChildByName("mask");
this.mode_button_bg = this.node.getChildByName("switch2345").getChildByName("mode_bg2").getChildByName("mode_button_bg");
this.notime = this.mode_button_bg.getChildByName("notime");
this.ani_attack_mode_button = this.node.getChildByName("switch2345").getComponent(cc.Animation);
this.mode_icon = this.mode_button_bg.getChildByName("mode_button1").getChildByName("mode_icon").getComponent(cc.Sprite);
this.progressBar = this.mode_button_bg.getChildByName("progressBar").getComponent(cc.ProgressBar);
this.enemy = this.node.getChildByName("enemy");
this.ani_enemys = this.enemy.getComponent(cc.Animation);
this.attack_aim = this.node.getChildByName("attack_aim");
this.ani_attack_aims = this.attack_aim.getComponent(cc.Animation);
},
initData: function() {
this.on_off = [ 0, 1, 0, 0, 0 ];
this.newestAttackModeID = -1;
this.beforeAttackModeID = -1;
},
showView: function() {
var e = this;
this.btn = this.node.getChildByName("choose_button");
this.setAttackMode(1);
this.setCurrAttackModeUI(2);
var t = this.node.getComponent(cc.Animation);
t.play("uni_opacity1");
var i = t.getAnimationState("uni_opacity1");
i && i.on("stop", function(t) {
e.initButtonEvent();
}, this);
},
hideView: function() {
var e = this, t = this.node.getComponent(cc.Animation);
t.play("uni_opacity2");
var i = t.getAnimationState("uni_opacity2");
i && i.on("stop", function(t) {
e.node.active = !1;
}, this);
},
initButtonEvent: function() {
for (var e = this, t = e.btn.children.length, i = 0; i < t; i++) {
var n = e.btn.getChildByName("button" + (i + 1)), a = new cc.Component.EventHandler();
a.target = this.node;
a.component = "AttackModeLayer";
a.handler = "clickCallback";
n.getComponent(cc.Button).clickEvents.push(a);
}
e.mask && e.mask.on(cc.Node.EventType.TOUCH_END, function(t) {
e.node.active = !1;
e.gridmaps && e.gridmaps.resetFollowingsCamera();
});
e.setAttackModeOn_Off();
},
clickCallback: function(e) {
switch (e.target.name) {
case "button1":
this.setAttackMode(0);
break;

case "button2":
this.setAttackMode(1);
break;

case "button3":
this.setAttackMode(2);
break;

case "button4":
this.setAttackMode(3);
break;

case "button5":
this.setAttackMode(4);
}
},
setAttackMode: function(e) {
var t = e;
this.newestAttackModeID = t;
if (this.beforeAttackModeID != this.newestAttackModeID) {
this.mode_icon && (this.mode_icon.spriteFrame = this.m_plist.getSpriteFrame("mode_icon" + (t + 1)));
this.beforeAttackModeID;
this.beforeAttackModeID = this.newestAttackModeID;
if (0 == t) this.on_off[0] = 0; else if (1 == t) {
this.on_off[1] = 1;
this.on_off[2] = 0;
this.on_off[3] = 0;
this.on_off[4] = 0;
this.gridmaps.setAttackModes(n.AUTOMATICATTACK);
}
if (0 == t || 1 == t) {
if (0 == t) this.play_Ani(this.ani_attack_mode_button, "attack_mode_button_off1", 10); else if (1 == t) {
this.play_Ani(this.ani_attack_mode_button, "attack_mode_button_on1", 10);
this.on_off[1] = 1;
this.on_off[2] = 0;
this.on_off[3] = 0;
this.on_off[4] = 0;
this.gridmaps.setAttackModes(n.AUTOMATICATTACK);
this.gridmaps.setUIbottomnew_btIcon(2);
this.setCurrAttackModeUI(2);
}
} else 0 == this.on_off[this.newestAttackModeID] ? this.play_Ani(this.ani_attack_mode_button, "attack_mode_button_off1", 10) : this.play_Ani(this.ani_attack_mode_button, "attack_mode_button_on1", 10);
}
},
setAttackModeOn_Off: function() {
var e = this;
e.attackModeCallBack = e.node.getChildByName("switch2345").getComponent("AttackModeCallBack");
e.mode_button_bg.on(cc.Node.EventType.TOUCH_START, function(t) {
if (-1 != e.newestAttackModeID && 0 != e.newestAttackModeID && 1 != e.newestAttackModeID) {
e.attackMode_On_Off = e.attackModeCallBack.getAttackMode_On_Off();
cc.log("self.attackMode_On_Off == " + e.attackMode_On_Off);
if (e.ani_attack_mode_button) {
if (0 == e.newestAttackModeID) e.on_off[0] = 0; else if (1 == e.newestAttackModeID) {
e.on_off[1] = 1;
e.on_off[2] = 0;
e.on_off[3] = 0;
e.on_off[4] = 0;
} else if (2 == e.newestAttackModeID) if (1 == e.on_off[2]) {
e.on_off[1] = 0;
e.on_off[3] = 0;
e.on_off[4] = 0;
} else {
e.on_off[1] = 1;
e.on_off[2] = 0;
e.on_off[3] = 0;
e.on_off[4] = 0;
} else if (3 == e.newestAttackModeID) if (1 == e.on_off[3]) {
e.on_off[1] = 0;
e.on_off[2] = 0;
e.on_off[4] = 0;
} else {
e.on_off[1] = 1;
e.on_off[2] = 0;
e.on_off[3] = 0;
e.on_off[4] = 0;
} else if (4 == e.newestAttackModeID) if (1 == e.on_off[4]) {
e.on_off[1] = 0;
e.on_off[2] = 0;
e.on_off[3] = 0;
} else {
e.on_off[1] = 1;
e.on_off[2] = 0;
e.on_off[3] = 0;
e.on_off[4] = 0;
}
if (0 == e.on_off[e.newestAttackModeID]) {
e.on_off[e.newestAttackModeID] = 1;
e.play_Ani(e.ani_attack_mode_button, "attack_mode_button_on1", 0);
2 == e.newestAttackModeID ? e.gridmaps.setAttackModes(n.COLLABORATIVEATTACK, n.COLLABORATIVEATTACK_LEVEL_1) : 3 == e.newestAttackModeID ? e.gridmaps.setAttackModes(n.COLLABORATIVEATTACK, n.COLLABORATIVEATTACK_LEVEL_3) : 4 == e.newestAttackModeID && e.gridmaps.setAttackModes(n.COLLABORATIVEATTACK, n.COLLABORATIVEATTACK_LEVEL_2);
e.gridmaps.setUIbottomnew_btIcon(e.newestAttackModeID + 1);
e.setCurrAttackModeUI(e.newestAttackModeID + 1);
} else {
e.on_off[e.newestAttackModeID] = 0;
e.play_Ani(e.ani_attack_mode_button, "attack_mode_button_off1", 0);
e.gridmaps.setAttackModes(n.AUTOMATICATTACK);
e.gridmaps.setUIbottomnew_btIcon(2);
e.setCurrAttackModeUI(2);
}
}
}
});
},
play_Ani: function(e, t, i) {
e.play(t, i);
},
setCurrAttackModeUI: function(e) {
for (var t = this.btn.children.length, i = null, n = null, a = 2; a <= t; a++) {
n = (i = this.btn.getChildByName("button" + a)).getChildByName("mode_icon1");
if (a == e) {
i.color = cc.color(75, 211, 161, 255);
n.color = cc.color(255, 255, 255, 255);
} else {
i.color = cc.color(255, 255, 255, 255);
n.color = cc.color(71, 80, 89, 255);
}
}
},
start: function() {},
update: function(e) {}
});
cc._RF.pop();
}, {
GameManager: "GameManager"
} ],
AudioMng: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6152eDqqJRLo5ZT5TwlWNTF", "AudioMng");
cc.Class({
extends: cc.Component,
properties: {
bgm: {
default: null,
type: cc.AudioClip
},
buttonAudio: {
default: null,
type: cc.AudioClip
},
enemy_dieAudio: {
default: null,
type: cc.AudioClip
},
switchPlayerAudio: {
default: null,
type: cc.AudioClip
},
bossBgm: {
default: null,
type: cc.AudioClip
},
effUpgradeLevel: {
default: null,
type: cc.AudioClip
},
effUpgradeStar: {
default: null,
type: cc.AudioClip
},
effWarning: {
default: null,
type: cc.AudioClip
},
effBuildSuc: {
default: null,
type: cc.AudioClip
},
effBuildFail: {
default: null,
type: cc.AudioClip
},
effGotNew: {
default: null,
type: cc.AudioClip
},
effFreeCoins: {
default: null,
type: cc.AudioClip
},
effOver: {
default: null,
type: cc.AudioClip
},
effSelectTower: {
default: null,
type: cc.AudioClip
},
launchgun0Audio: {
default: null,
type: cc.AudioClip
},
launchgun1Audio: {
default: null,
type: cc.AudioClip
},
launchgun2_1Audio: {
default: null,
type: cc.AudioClip
},
launchgun2_2Audio: {
default: null,
type: cc.AudioClip
},
launchgun2_3Audio: {
default: null,
type: cc.AudioClip
},
launchgun3_1Audio: {
default: null,
type: cc.AudioClip
},
gun3_1blastAudio: {
default: null,
type: cc.AudioClip
},
launchgun3_2Audio: {
default: null,
type: cc.AudioClip
},
launchgun3_3Audio: {
default: null,
type: cc.AudioClip
},
gun3_3blastAudio: {
default: null,
type: cc.AudioClip
},
launchgun4Audio: {
default: null,
type: cc.AudioClip
},
launchgun5_1_2Audio: {
default: null,
type: cc.AudioClip
},
gun5_1blastAudio: {
default: null,
type: cc.AudioClip
},
gun5_2blastAudio: {
default: null,
type: cc.AudioClip
},
launchgun5_3Audio: {
default: null,
type: cc.AudioClip
},
gun5_3blastAudio: {
default: null,
type: cc.AudioClip
},
boss_blastAudio: {
default: null,
type: cc.AudioClip
}
},
onLoad: function() {
zy.audioMng = this;
this.bgClip = null;
},
playMusic: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.bgm;
this.bgClip = e;
zy.dataMng.userData.soundOn && cc.audioEngine.playMusic(e, !0);
},
pauseMusic: function() {
cc.audioEngine.pauseMusic();
},
resumeMusic: function() {
this.bgClip && this.playMusic(this.bgClip);
},
playEffect: function(e) {
zy.dataMng.userData.soundOn && cc.audioEngine.playEffect(e, !1);
},
pauseAllEffects: function() {
cc.audioEngine.pauseAllEffects();
},
resumeAllEffects: function() {
cc.audioEngine.resumeAllEffects();
},
_playSFX: function(e) {
zy.dataMng.userData.soundOn && cc.audioEngine.playEffect(e, !1);
},
playButtonAudio: function() {
this._playSFX(this.buttonAudio);
},
playEnemy_dieAudio: function() {
this._playSFX(this.enemy_dieAudio);
},
playSwitchPlayerAudio: function() {
this._playSFX(this.switchPlayerAudio);
},
playLaunchgun0Audio: function() {
this._playSFX(this.launchgun0Audio);
},
playLaunchgun1Audio: function() {
this._playSFX(this.launchgun1Audio);
},
playLaunchgun2_1Audio: function() {
this._playSFX(this.launchgun2_1Audio);
},
playLaunchgun2_2Audio: function() {
this._playSFX(this.launchgun2_2Audio);
},
playLaunchgun2_3Audio: function() {
this._playSFX(this.launchgun2_3Audio);
}
});
cc._RF.pop();
}, {} ],
BgColorData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "73fc8Zfy+RL0IYz9HD/hGyA", "BgColorData");
var n = e("./../Lib/common/UtilsOther"), a = e("./DataBase");
cc.Class({
extends: a,
ctor: function() {
this.fileDir = "data/bgColorData";
this.lastLevel = 1;
},
initData: function(e) {
if (e) {
this.dataObj = e;
this.dataObj = n.arrayToDict(this.dataObj, "id");
}
},
getBgTopColor: function(e) {
return "#" + this.getBgColorData(e).top;
},
getBgDownColor: function(e) {
return "#" + this.getBgColorData(e).down;
},
getBgColorData: function(e) {
var t = this.getBgColorId(e);
return this.dataObj[t];
},
getBgColorId: function(e) {
var t = e % 10;
return t = 0 == t ? 10 : t;
}
});
cc._RF.pop();
}, {
"./../Lib/common/UtilsOther": "UtilsOther",
"./DataBase": "DataBase"
} ],
Bullets: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7cecbsqGxBMTLqU1lAirfSx", "Bullets");
var n = e("Helpers"), a = e("GameManager");
cc.Class({
extends: cc.Component,
properties: {
bulletId: -1,
bulletSpeed: 0,
bulletAngle: 0,
bulletAttack: 0,
bulletLeve: 0,
bulletAttackRange: 0,
bulletAngleBy: 0,
bulletdartrevolutionID: -1
},
initdata: function(e) {
this.enemygenerator = cc.find("Canvas/Enemygenerators/Enemygenerator").getComponent("Enemygenerator");
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
if (0 == this.bulletId) this.node.angle = this.bulletAngle; else if (1 == this.bulletId) {
this.currBulletSpeed = 0;
this.currBulletSpeed2 = 0;
this.curr_bulletSpeed = 0;
this.node.angle = this.bulletAngle;
} else if (2 == this.bulletId) {
this.bullet = this.node.getChildByName("Bullet");
this.playerData2 = a.getPlayersData(this.bulletId);
} else if (3 == this.bulletId) {
this.currBulletSpeed = 0;
this.currBulletSpeed2 = 0;
this.curr_bulletSpeed = 0;
this.node.angle = this.bulletAngle;
} else if (4 == this.bulletId) {
this.playerData4_1 = a.getPlayersData(this.bulletId);
this.node.angle = this.bulletAngle;
} else if (5 == this.bulletId) {
this.currBulletSpeed = 0;
this.currBulletSpeed2 = 0;
this.curr_bulletSpeed = 0;
this.node.angle = this.bulletAngle;
} else if (6 == this.bulletId) {
a.dartsRevolutionArray[this.bulletdartrevolutionID] = this.bulletHudu;
this.bulletOrbitRadius = this.orbitRadius;
this.bulletDartSpeed = this.dartSpeed;
this.playerData6 = a.getPlayersData(this.bulletId);
} else if (66 == this.bulletId) {
this.bulletRadian = this.bulletHudu;
this.bulletOrbitRadius = this.orbitRadius;
this.bulletDartSpeed = this.dartSpeed;
this.playerData66 = a.getPlayersData(6);
} else if (7 == this.bulletId) {
this.currBulletSpeed = 0;
this.currBulletSpeed2 = 0;
this.curr_bulletSpeed = 0;
this.node.angle = this.bulletAngle;
} else if (8 == this.bulletId) {
this.playerData8 = a.getPlayersData(this.bulletId);
this.node.angle = this.bulletAngle;
} else 44 == this.bulletId && (this.playerData4_2 = a.getPlayersData(4));
},
setBulletAttribute: function(e, t, i, n) {
this.bulletHudu = e;
this.orbitRadius = t;
this.dartSpeed = i;
this.bulletdartrevolutionID = n;
},
setBulletId: function(e) {
this.bulletId = e;
},
getBulletId: function() {
return this.bulletId;
},
setBulletSpeed: function(e) {
this.bulletSpeed = e;
},
getBulletSpeed: function() {
return this.bulletSpeed;
},
setBulletAngle: function(e) {
this.bulletAngle = e;
},
getBulletAngle: function() {
return this.bulletAngle;
},
setBulletAttack: function(e) {
this.bulletAttack = e;
},
getBulletAttack: function() {
return this.bulletAttack;
},
setBulletLeve: function(e) {
this.bulletLeve = e;
},
getBulletLeve: function() {
return this.bulletLeve;
},
setBulletAttackRange: function(e) {
a.isBossLevel && (e = e += 500);
this.bulletAttackRange = e;
},
getBulletAttackRange: function() {
return this.bulletAttackRange;
},
setBulletAngleBy: function(e) {
this.bulletAngleBy = e;
},
getBulletAngleBy: function() {
return this.bulletAngleBy;
},
setBulletHudu: function(e) {
this.bulletHudu = e;
},
getBulletHudu: function() {
return this.bulletHudu;
},
getBullet_playerData: function(e) {
this.playerData = a.getPlayersData(e);
if (null != this.playerData) return this.playerData;
},
bulletAttackInjury: function(e, t, i, a) {
e.setEnemyBlood(t - this.bulletAttack);
if (this.enemygenerator) if (e.getEnemyBlood() < 0) {
var o = this.bulletAttack + e.getEnemyBlood();
if (o > 0) {
this.enemygenerator.getCurrDieEnemyBloodNums(i, o);
this.enemygenerator.addEnemyHitEffects(i, a, this.getBulletAngleBy(), this.getBulletId(), this.getBulletAttack());
e.setEnemy_hp(n.toPercentInteger(e.getEnemyBlood() - o, e.getEnemyInitBlood()));
}
} else {
this.enemygenerator.getCurrDieEnemyBloodNums(i, this.bulletAttack);
this.enemygenerator.addEnemyHitEffects(i, a, this.getBulletAngleBy(), this.getBulletId(), this.getBulletAttack());
e.setEnemy_hp(n.toPercentInteger(e.getEnemyBlood(), e.getEnemyInitBlood()));
}
},
onCollisionEnter: function(e, t) {
if ("enemy" == e.node.group && "enemy" == e.node.group) {
var i = e.node.getComponent("Enemys");
if (i) {
var n = i.getEnemyBlood();
i.getEnemyBlood() > 0 && (2 == this.bulletId || (4 == this.bulletId ? 2 != this.playerData4_1.player_StarLevel && this.bulletAttackInjury(i, n, e.node, t.node) : 8 == this.bulletId ? this.bulletAttackInjury(i, n, e.node, t.node) : 6 == this.bulletId ? this.bulletAttackInjury(i, n, e.node, t.node) : 66 == this.bulletId ? this.bulletAttackInjury(i, n, e.node, t.node) : 44 == this.bulletId || (this.bulletId, 
this.bulletAttackInjury(i, n, e.node, t.node))));
if (i.getEnemyBlood() <= 0 && this.enemygenerator) {
this.enemygenerator.removeEnemy(e.node, this.getBulletAngleBy(), !0);
i.setEnemyNodeOpacity();
}
}
}
},
onCollisionStay: function(e, t) {
if ("enemy" == e.node.group && "enemy" == e.node.group) {
var i = e.node.getComponent("Enemys");
if (i) {
var n = i.getEnemyBlood();
if (i.getEnemyBlood() > 0) {
if (2 == this.bulletId) {
var o = this.node.getComponent(cc.Animation);
if (1 == this.playerData2.player_StarLevel) {
.7 == o.getAnimationState("gun2_1_attack").time.toFixed(2) && this.bulletAttackInjury(i, n, e.node, t.node);
}
if (2 == this.playerData2.player_StarLevel) {
var s = o.getAnimationState("gun2_2_attack").time.toFixed(2);
.8 != s && 1 != s && 1.2 != s && 1.4 != s && 1.6 != s && 1.8 != s && 2 != s && 2.2 != s && 2.4 != s && 2.8 != s || this.bulletAttackInjury(i, n, e.node, t.node);
}
if (3 == this.playerData2.player_StarLevel) {
var r = o.getAnimationState("gun2_3_attack").time.toFixed(2);
1.3 != r && 1.4 != r && 1.5 != r && 1.6 != r && 1.7 != r && 1.8 != r && 1.9 != r && 2 != r && 2.1 != r && 2.2 != r && 2.3 != r && 2.4 != r && 2.5 != r && 2.6 != r && 2.7 != r && 2.8 != r && 2.9 != r && 3 != r && 3.1 != r && 3.2 != r && 3.3 != r && 3.4 != r && 3.5 != r && 3.6 != r && 3.7 != r && 3.8 != r && 3.9 != r && 4 != r && 4.1 != r && 4.4 != r || this.bulletAttackInjury(i, n, e.node, t.node);
}
}
if (4 == this.bulletId) {
var l = this.node.getChildByName("Bullet").getComponent(cc.Animation);
if (2 == this.playerData4_1.player_StarLevel) {
l.getAnimationState("gun_3_bullet_2_1").time.toFixed(2);
a.isGun_3_bullet_2Attack && this.bulletAttackInjury(i, n, e.node, t.node);
}
}
if (44 == this.bulletId) {
var c = this.node.getComponent(cc.Animation);
if (1 == this.playerData4_2.player_StarLevel) {
var h = c.getAnimationState("gun_3_bullet_1_2").time.toFixed(2);
.3 != h && .6 != h && .9 != h || this.bulletAttackInjury(i, n, e.node, t.node);
}
this.playerData4_2.player_StarLevel;
if (3 == this.playerData4_2.player_StarLevel) {
var u = c.getAnimationState("gun_3_bullet_3_2").time.toFixed(2);
.3 != u && .6 != u && .9 != u && 1.2 != u && 1.5 != u && 1.8 != u && 2.1 != u && 2.4 != u && 2.7 != u && 3 != u && 3.3 != u && 3.6 != u && 3.9 != u || this.bulletAttackInjury(i, n, e.node, t.node);
}
}
}
if (i.getEnemyBlood() <= 0 && this.enemygenerator) {
this.enemygenerator.removeEnemy(e.node, this.getBulletAngleBy(), !0);
i.setEnemyNodeOpacity();
}
}
}
},
start: function() {},
update: function(e) {
a.getGamePaused() || -1 != this.bulletId && this.updateBulletOperationtrack(e);
},
updateBulletOperationtrack: function(e) {
0 == this.bulletId ? this.updateBullet0(e) : 1 == this.bulletId ? this.updateBullet1(e) : 2 == this.bulletId || (3 == this.bulletId ? this.updateBullet3(e) : 4 == this.bulletId ? this.updateBullet4(e) : 5 == this.bulletId ? this.updateBullet5(e) : 6 == this.bulletId ? this.updateBullet6(e) : 66 == this.bulletId ? this.updateBullet66(e) : 7 == this.bulletId ? this.updateBullet7(e) : 8 == this.bulletId ? this.updateBullet8(e) : this.bulletId);
},
updateBullet0: function(e) {
this.node.angle = this.bulletAngle;
var t = this.node.x, i = this.node.y, n = Math.PI / 180 * -this.bulletAngle;
this.setBulletAngleBy(-this.bulletAngle);
t += e * this.bulletSpeed * Math.sin(n);
i += e * this.bulletSpeed * Math.cos(n);
this.node.x = t;
this.node.y = i;
a.isBossLevel, (this.node.x > this.bulletAttackRange || this.node.x < -this.bulletAttackRange || this.node.y > this.bulletAttackRange || this.node.y < -this.bulletAttackRange) && zy.nodePoolMng.putBullet(this.node);
},
updateBullet1: function(e) {
this.node.angle = this.bulletAngle;
var t = this.node.x, i = this.node.y, n = Math.PI / 180 * -this.bulletAngle;
this.setBulletAngleBy(-this.bulletAngle);
t += e * this.currBulletSpeed * Math.sin(n);
i += e * this.currBulletSpeed * Math.cos(n);
if (this.currBulletSpeed <= this.bulletSpeed) {
this.currBulletSpeed2 += 5;
this.curr_bulletSpeed += this.currBulletSpeed2;
} else this.curr_bulletSpeed = this.bulletSpeed;
this.currBulletSpeed = this.curr_bulletSpeed;
this.node.x = t;
this.node.y = i;
(this.node.x > this.bulletAttackRange || this.node.x < -this.bulletAttackRange || this.node.y > this.bulletAttackRange || this.node.y < -this.bulletAttackRange) && zy.nodePoolMng.putBullet(this.node);
},
updateBullet3: function(e) {
this.node.angle = this.bulletAngle;
var t = this.node.x, i = this.node.y, n = Math.PI / 180 * -this.bulletAngle;
this.setBulletAngleBy(-this.bulletAngle);
t += e * this.currBulletSpeed * Math.sin(n);
i += e * this.currBulletSpeed * Math.cos(n);
if (this.currBulletSpeed <= this.bulletSpeed) {
this.currBulletSpeed2 += 5;
this.curr_bulletSpeed += this.currBulletSpeed2;
} else this.curr_bulletSpeed = this.bulletSpeed;
this.currBulletSpeed = this.curr_bulletSpeed;
this.node.x = t;
this.node.y = i;
(this.node.x > this.bulletAttackRange || this.node.x < -this.bulletAttackRange || this.node.y > this.bulletAttackRange || this.node.y < -this.bulletAttackRange) && zy.nodePoolMng.putBullet(this.node);
},
updateBullet5: function(e) {
this.node.angle = this.bulletAngle;
var t = this.node.x, i = this.node.y, n = Math.PI / 180 * -this.bulletAngle;
this.setBulletAngleBy(-this.bulletAngle);
t += e * this.currBulletSpeed * Math.sin(n);
i += e * this.currBulletSpeed * Math.cos(n);
if (this.currBulletSpeed <= this.bulletSpeed) {
this.currBulletSpeed2 += 5;
this.curr_bulletSpeed += this.currBulletSpeed2;
} else this.curr_bulletSpeed = this.bulletSpeed;
this.currBulletSpeed = this.curr_bulletSpeed;
this.node.x = t;
this.node.y = i;
(this.node.x > this.bulletAttackRange || this.node.x < -this.bulletAttackRange || this.node.y > this.bulletAttackRange || this.node.y < -this.bulletAttackRange) && zy.nodePoolMng.putBullet(this.node);
},
updateBullet7: function(e) {
this.node.angle = this.bulletAngle;
var t = this.node.x, i = this.node.y, n = Math.PI / 180 * -this.bulletAngle;
this.setBulletAngleBy(-this.bulletAngle);
t += e * this.currBulletSpeed * Math.sin(n);
i += e * this.currBulletSpeed * Math.cos(n);
if (this.currBulletSpeed <= this.bulletSpeed) {
this.currBulletSpeed2 += 5;
this.curr_bulletSpeed += this.currBulletSpeed2;
} else this.curr_bulletSpeed = this.bulletSpeed;
this.currBulletSpeed = this.curr_bulletSpeed;
this.node.x = t;
this.node.y = i;
(this.node.x > this.bulletAttackRange || this.node.x < -this.bulletAttackRange || this.node.y > this.bulletAttackRange || this.node.y < -this.bulletAttackRange) && zy.nodePoolMng.putBullet(this.node);
},
updateBullet4: function(e) {
this.node.angle = this.bulletAngle;
var t = this.node.x, i = this.node.y, n = Math.PI / 180 * -this.bulletAngle;
this.setBulletAngleBy(-this.bulletAngle);
t += e * this.bulletSpeed * Math.sin(n);
i += e * this.bulletSpeed * Math.cos(n);
this.node.x = t;
this.node.y = i;
if (Math.sqrt(Math.pow(this.node.x - this.gridmaps.getWeaponFlamesNode().position.x, 2) + Math.pow(this.node.y - this.gridmaps.getWeaponFlamesNode().position.y, 2)) >= this.bulletAttackRange) {
2 != this.playerData4_1.player_StarLevel && this.gridmaps && this.gridmaps.createFlamesBullet3_2(this.node);
zy.nodePoolMng.putBullet(this.node);
return !0;
}
},
updateBullet6: function(e) {
if (a.isAutoDartsAttack) {
a.dartsRevolutionArray[this.bulletdartrevolutionID] += e * (this.bulletDartSpeed / 100);
var t = this.bulletOrbitRadius * Math.cos(a.dartsRevolutionArray[this.bulletdartrevolutionID]) + 0, i = this.bulletOrbitRadius * Math.sin(a.dartsRevolutionArray[this.bulletdartrevolutionID]) + 0;
this.node.position = cc.v2(t, i);
}
a.isCreateDartsRevolution && this.gridmaps && -1 != this.bulletdartrevolutionID && this.gridmaps && this.gridmaps.set_RailBulletDartsRevolution(a.dartsRevolutionArray);
},
updateBullet66: function(e) {
this.bulletRadian += e * (this.bulletDartSpeed / 100);
var t = this.bulletOrbitRadius * Math.cos(this.bulletRadian) + 0, i = this.bulletOrbitRadius * Math.sin(this.bulletRadian) + 0;
this.node.position = cc.v2(t, i);
},
updateBullet8: function(e) {
if (3 == this.playerData8.player_StarLevel) ; else {
this.node.angle = this.bulletAngle;
var t = this.node.x, i = this.node.y, n = Math.PI / 180 * -this.bulletAngle;
this.setBulletAngleBy(-this.bulletAngle);
t += e * this.bulletSpeed * Math.sin(n);
i += e * this.bulletSpeed * Math.cos(n);
this.node.x = t;
this.node.y = i;
}
if (Math.sqrt(Math.pow(this.node.x - this.gridmaps.getWeaponHowitzerNode().position.x, 2) + Math.pow(this.node.y - this.gridmaps.getWeaponHowitzerNode().position.y, 2)) >= this.bulletAttackRange) {
this.gridmaps && this.gridmaps && this.gridmaps.createHowitzerBullet5_1_2(this.node);
3 == this.playerData8.player_StarLevel ? this.node.destroy() : zy.nodePoolMng.putBullet(this.node);
return !0;
}
}
});
cc._RF.pop();
}, {
GameManager: "GameManager",
Helpers: "Helpers"
} ],
ButtonSafe: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8e42eou+C1Nna+T44ZKvKRT", "ButtonSafe");
cc.Class({
extends: cc.Component,
properties: {
safeTime: {
default: .5,
tooltip: "按钮保护时间，指定间隔内只能点击一次."
}
},
start: function() {
var e = this, t = this.getComponent(cc.Button);
if (t) {
this.clickEvents = t.clickEvents;
this.node.on("click", function() {
t.clickEvents = [];
e.scheduleOnce(function(i) {
t.clickEvents = e.clickEvents;
}, e.safeTime);
}, this);
}
}
});
cc._RF.pop();
}, {} ],
Button: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "cab9bUXOXBDk6Oo/t2eesSG", "Button");
var n;
function a(e, t, i) {
t in e ? Object.defineProperty(e, t, {
value: i,
enumerable: !0,
configurable: !0,
writable: !0
}) : e[t] = i;
return e;
}
var o = {}, s = function(e, t, i, n, a, o, s, r, l, c, h, u, d, g, p, m) {
this.m00 = e;
this.m01 = t;
this.m02 = i;
this.m03 = n;
this.m04 = a;
this.m05 = o;
this.m06 = s;
this.m07 = r;
this.m08 = l;
this.m09 = c;
this.m10 = h;
this.m11 = u;
this.m12 = d;
this.m13 = g;
this.m14 = p;
this.m15 = m;
};
o.create = function() {
return new s(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
};
o.invert = function(e, t) {
var i = t.m00, n = t.m01, a = t.m02, o = t.m03, s = t.m04, r = t.m05, l = t.m06, c = t.m07, h = t.m08, u = t.m09, d = t.m10, g = t.m11, p = t.m12, m = t.m13, y = t.m14, f = t.m15, _ = i * r - n * s, A = i * l - a * s, C = i * c - o * s, v = n * l - a * r, P = n * c - o * r, b = a * c - o * l, L = h * m - u * p, I = h * y - d * p, B = h * f - g * p, E = u * y - d * m, N = u * f - g * m, T = d * f - g * y, D = _ * T - A * N + C * E + v * B - P * I + b * L;
if (!D) return null;
D = 1 / D;
e.m00 = (r * T - l * N + c * E) * D;
e.m01 = (a * N - n * T - o * E) * D;
e.m02 = (m * b - y * P + f * v) * D;
e.m03 = (d * P - u * b - g * v) * D;
e.m04 = (l * B - s * T - c * I) * D;
e.m05 = (i * T - a * B + o * I) * D;
e.m06 = (y * C - p * b - f * A) * D;
e.m07 = (h * b - d * C + g * A) * D;
e.m08 = (s * N - r * B + c * L) * D;
e.m09 = (n * B - i * N - o * L) * D;
e.m10 = (p * P - m * C + f * _) * D;
e.m11 = (u * C - h * P - g * _) * D;
e.m12 = (r * I - s * E - l * L) * D;
e.m13 = (i * E - n * I + a * L) * D;
e.m14 = (m * A - p * v - y * _) * D;
e.m15 = (h * v - u * A + d * _) * D;
return e;
};
var r = {
transformMat4: function(e, t, i) {
var n = t.x, a = t.y;
e.x = i.m00 * n + i.m04 * a + i.m12;
e.y = i.m01 * n + i.m05 * a + i.m13;
return e;
}
}, l = {
mat4: o,
vec2: r
}, c = l.mat4.create(), h = cc.Class({
extends: cc.Button,
statics: {
createNode: function(e) {
var t = new cc.Node();
t.addComponent(zy.Sprite);
zy.Sprite.updateNode(t, e);
t.addComponent(zy.Button);
zy.Button.updateNode(t, e);
return t;
},
updateNode: function(e, t) {
var i = e.getComponent(zy.Button);
i || (i = e.getComponent(cc.Button));
var n = t.eventHandler;
t.hasOwnProperty("touchAction") && (i.touchAction = t.touchAction);
t.hasOwnProperty("commonClickAudio") && (i.commonClickAudio = t.commonClickAudio);
if (n) {
var a = new cc.Component.EventHandler();
a.target = n.target;
a.component = n.component;
a.customEventData = n.customEventData;
a.handler = n.handler;
i.clickEvents.push(a);
}
t.hasOwnProperty("enableAutoGrayEffect") && (i.enableAutoGrayEffect = t.enableAutoGrayEffect);
t.hasOwnProperty("interactable") && (i.interactable = t.interactable);
zy.Node.updateNode(e, t);
}
},
properties: {
touchAction: {
override: !0,
default: !0,
tooltip: "display custom action"
},
commonClickAudio: {
default: !0,
tooltip: "common click audio"
},
isPolygonCollider: {
default: !1,
tooltip: "is polygon collider"
},
polygonPoints: {
visible: function() {
return !0 === this.isPolygonCollider;
},
tooltip: !1,
default: function() {
return [];
},
type: [ cc.Vec2 ]
},
brightTargets: (n = {
default: !1
}, a(n, "default", function() {
return [];
}), a(n, "type", [ cc.Node ]), n)
},
onLoad: function() {
this.touchScaleAction = null;
this.touchScaleRatio = .8;
this.node.__hitTest = this.node._hitTest;
this.node._hitTest = this._hitTest;
},
_polygonCheckRect: function(e) {
var t = this.node.convertToNodeSpaceAR(e);
if (t.x < -this.node.width / 2 || t.x > this.node.width / 2 || t.y < -this.node.height / 2 || t.y > this.node.height / 2) return !1;
var i = void 0, n = void 0, a = !1, o = this.polygonPoints.length;
for (i = 0, n = o - 1; i < o; n = i++) this.polygonPoints[i].y > t.y != this.polygonPoints[n].y > t.y && t.x < (this.polygonPoints[n].x - this.polygonPoints[i].x) * (t.y - this.polygonPoints[i].y) / (this.polygonPoints[n].y - this.polygonPoints[i].y) + this.polygonPoints[i].x && (a = !a);
return a;
},
_polygonCheckIn: function(e) {
return !this.isPolygonCollider || this.polygonPoints.length <= 2 || this._polygonCheckRect(e);
},
_hitTest: function(e, t) {
var i = this._contentSize.width, n = this._contentSize.height, a = cc.v2(), o = cc.v2(), s = cc.Camera.findCamera(this);
s ? s.getScreenToWorldPoint(e, a) : a.set(e);
this._updateWorldMatrix();
l.mat4.invert(c, this._worldMatrix);
l.vec2.transformMat4(o, a, c);
o.x += this._anchorPoint.x * i;
o.y += this._anchorPoint.y * n;
var r = 0, h = 0, u = this.getComponent(cc.Button);
if (u && u.touchAction && u._pressed) {
var d = i * u.nodeScaleX * (1 - u.touchScaleRatio) / 2, g = n * u.nodeScaleY * (1 - u.touchScaleRatio) / 2;
r -= d;
h -= g;
i += d;
n += g;
}
if (o.x >= r && o.y >= h && o.x <= i && o.y <= n) {
if (t && t.mask) {
for (var p = t.mask, m = this, y = 0; m && y < p.index; ++y, m = m.parent) ;
if (m === p.node) {
var f = m.getComponent(cc.Mask);
return !f || !f.enabledInHierarchy || f._hitTest(a);
}
t.mask = null;
return !0;
}
return !0;
}
return !1;
},
_onTouchBegan: function(e) {
this._super(e);
if (this.interactable && this.enabledInHierarchy) {
this._setBrightEffect(!0);
if (this.touchAction) {
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
}
}
},
_onTouchMove: function(e) {
this._super(e);
this.interactable && this.enabledInHierarchy && this._pressed;
},
_onTouchEnded: function(e) {
this.commonClickAudio;
if (this.interactable && this.enabledInHierarchy) {
this._setBrightEffect(!1);
if (this._pressed) {
cc.Component.EventHandler.emitEvents(this.clickEvents, e);
this.node.emit("click", this);
}
this._pressed = !1;
this._updateState();
e.stopPropagation();
this._endTouchScaleAction();
} else this._resetScale();
},
_onTouchCancel: function() {
this._setBrightEffect(!1);
this._super();
this.interactable && this.enabledInHierarchy ? this._endTouchScaleAction() : this._resetScale();
},
_resetScale: function() {
if (this.touchAction) {
if (this.touchScaleAction) {
this.node.stopAction(this.touchScaleAction);
this.touchScaleAction = null;
}
if (this.nodeScaleX && this.nodeScaleY) {
this.node.scaleX = this.nodeScaleX;
this.node.scaleY = this.nodeScaleY;
}
}
},
_endTouchScaleAction: function() {
if (this.touchAction) {
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
}
},
_setBrightEffect: function(e) {
if (0 != this.brightTargets.length) {
var t = e ? zy.shaderUtils.Effect.Bright : zy.shaderUtils.Effect.Normal;
for (var i in this.brightTargets) {
var n = this.brightTargets[i];
if (n.getComponent(cc.Sprite)) {
var a = n.getComponent(cc.Sprite), o = a.getState();
e && 1 != o ? zy.shaderUtils.setShader(a, t) : a.setState(o);
} else if (n.getComponent(sp.Skeleton)) {
var s = n.getComponent(sp.Skeleton);
zy.shaderUtils.setShader(s, t);
}
}
}
},
onDisable: function() {
this._super();
this.touchAction && this._resetScale();
}
});
zy.Button = t.exports = h;
cc._RF.pop();
}, {} ],
BuyEnergyPop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "26dcaMph+xErLiq5UepfHRM", "BuyEnergyPop");
cc.Class({
extends: cc.Component,
properties: {
numLabel: cc.Label
},
init: function(e) {
var t = zy.dataMng.userData.phPowerCounts, i = zy.dataMng.userData.phPowerTime, n = zy.utils.time();
(0 == i || zy.utils.getDaysDiff(i, n) >= 1) && (t = zy.dataMng.userData.phPowerCounts = zy.constData.MaxPhCounts1Day);
this.numLabel.string = t;
},
getClick: function() {
var e = this;
zy.audioMng.playButtonAudio();
zy.dataMng.userData.phPowerCounts <= 0 ? zy.ui.tip.show(i18n.t("max_counts")) : zy.AdHelper.isRdAdsReady(zy.constData.AdKey.VdFreePh) ? zy.AdHelper.showRdAds(zy.constData.AdKey.VdFreePh, function(t) {
if (t) {
zy.dataMng.userData.phPowerCounts--;
zy.dataMng.userData.phPowerTime = zy.utils.time();
zy.dataMng.userData.phPower += zy.constData.PhAdReward;
zy.director.sceneCanvas.getComponentInChildren("Gridmaps").updatePhPower();
e.closeCallback();
}
}) : zy.ui.tip.show(i18n.t("no_ad"));
},
closeCallback: function() {
zy.director.closePop(this.popName);
}
});
cc._RF.pop();
}, {} ],
CSVParser: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "aab19B0yLhC7JV+rBaX1XJH", "CSVParser");
var n = {
DefaultOptions: {
delim: ",",
quote: '"',
rowdelim: "\n"
}
};
function a(e) {
this.message = e;
Error.captureStackTrace && Error.captureStackTrace(this, arguments.callee);
}
a.prototype = new Error();
a.prototype.constructor = a;
a.prototype.name = "CSVSyntaxError";
"[object Error]" == new Error().toString() && (a.prototype.toString = function() {
return this.name + ": " + this.message;
});
function o(e, t) {
this.str = e;
this.options = n.DefaultOptions;
if (t) {
t.delim = t.delim || n.DefaultOptions.delim;
t.quote = t.quote || n.DefaultOptions.quote;
if (1 != t.quote.length) throw new RangeError("options.quote should be only 1 char");
t.rowdelim = t.rowdelim || n.DefaultOptions.rowdelim;
this.options = t;
}
this.pos = 0;
this.endpos = e.length;
this.lineNo = 1;
}
o.prototype.next = function(e) {
if (this.pos < this.endpos) {
var t = e.length;
if (this.str.substring(this.pos, this.pos + t) == e) {
this.pos += t;
return !0;
}
}
return !1;
};
o.prototype.ahead = function(e) {
if (this.pos < this.endpos) {
if (!e) return !0;
var t = e.length;
if (this.str.substring(this.pos, this.pos + t) == e) return !0;
}
return !1;
};
function s(e, t) {
for (var i = 0, n = e.indexOf(t); n > 0; ) {
i++;
n = e.indexOf(t, n + t.length);
}
return i;
}
o.prototype.quotedField = function() {
var e = this.pos;
if (!this.next(this.options.quote)) {
this.pos = e;
return null;
}
for (var t = [], i = this.pos; i < this.endpos; ) {
var n = this.str.indexOf(this.options.quote, i);
if (n < 0) throw new a("line " + this.lineNo + ": missing close quote");
var o = this.str.substring(i, n);
this.lineNo += s(o, "\n");
t.push(o);
if (!(n + 1 < this.endpos && this.str.charAt(n + 1) == this.options.quote)) {
this.pos = n + 1;
break;
}
i = n + 2;
n = this.str.indexOf(this.options.quote, i);
}
return t.join(this.options.quote);
};
o.prototype.normalField = function() {
var e = this.pos, t = this.str.indexOf(this.options.delim, e);
t < 0 && (t = this.endpos);
var i = this.str.indexOf(this.options.rowdelim, e);
i < 0 && (i = this.endpos);
this.pos = Math.min(t, i);
return this.str.substring(e, this.pos);
};
o.prototype.nextField = function() {
var e = this.quotedField();
return null !== e ? e : this.normalField();
};
o.prototype.nextRow_0 = function() {
var e = this.pos;
if (!this.next(this.options.delim)) {
this.pos = e;
return null;
}
var t = this.nextField();
if (null === t) {
this.pos = e;
return null;
}
return t;
};
o.prototype.nextRow = function() {
var e = [], t = this.pos, i = this.nextField();
if (null === i) {
this.pos = t;
return null;
}
e.push(i);
i = this.nextRow_0();
for (;null !== i; ) {
e.push(i);
i = this.nextRow_0();
}
if (!this.next(this.options.rowdelim) && this.ahead()) throw new a("line " + this.lineNo + ": " + this.str.substring(Math.max(this.pos - 5, 0), this.pos + 5));
"\n" == this.str.charAt(this.pos - 1) && this.lineNo++;
return e;
};
o.prototype.nextRowSimple = function() {
var e = [], t = this.pos, i = this.nextField();
if (null === i) {
this.pos = t;
return null;
}
e.push(i);
i = this.nextRow_0();
for (;null !== i; ) {
e.push(i);
i = this.nextRow_0();
}
if (!this.next(this.options.rowdelim) && this.ahead()) throw new a("line " + this.lineNo + ": " + this.str.substring(Math.max(this.pos - 5, 0), this.pos + 5));
"\n" == this.str.charAt(this.pos - 1) && this.lineNo++;
return 1 === e.length ? e[0] : e;
};
o.prototype.hasNext = function() {
return this.ahead();
};
n.CSVSyntaxError = a;
n.CSVParser = o;
n.parseOne = function(e, t) {
var i = new o(e, t);
return i.hasNext() ? i.nextRow() : null;
};
n.parseOneSimple = function(e, t) {
var i = new o(e, t);
return i.hasNext() ? i.nextRowSimple() : null;
};
Array.prototype.map || (Array.prototype.map = function(e, t) {
var i, n, a;
if (null === this) throw new TypeError(" this is null or not defined");
var o = Object(this), s = o.length >>> 0;
if ("[object Function]" != {}.toString.call(e)) throw new TypeError(e + " is not a function");
t && (i = t);
n = new Array(s);
a = 0;
for (;a < s; ) {
var r, l;
if (a in o) {
r = o[a];
l = e.call(i, r, a, o);
n[a] = l;
}
a++;
}
return n;
});
t.exports = o;
cc._RF.pop();
}, {} ],
CoinsUpData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "98fe7nljxtJe5pNcVWhv+/4", "CoinsUpData");
var n = e("./../Lib/common/UtilsOther"), a = e("./DataBase");
cc.Class({
extends: a,
ctor: function() {
this.fileDir = "data/coinsUpData";
},
initData: function(e) {
if (e) {
this.dataObj = e;
this.dataLen = e.length;
this.dataObj = n.arrayToDict(this.dataObj, "level");
}
},
getCoins: function(e) {
return this.dataObj[e].gold;
},
getPrice: function(e) {
return this.dataObj[e].price;
},
getMaxLevel: function() {
return this.dataLen;
}
});
cc._RF.pop();
}, {
"./../Lib/common/UtilsOther": "UtilsOther",
"./DataBase": "DataBase"
} ],
CompleteUI: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d7105We1ExEJ5Pj7gtvg+9D", "CompleteUI");
e("GameManager");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.initGetComponent();
},
initGetComponent: function() {
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
},
ani_main_UI_go: function() {},
start: function() {},
update: function(e) {}
});
cc._RF.pop();
}, {
GameManager: "GameManager"
} ],
ConstData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "14638K9xV1Mg4d0HwW7hmJE", "ConstData");
var n = cc.size(750, 1334);
cc.Class({
statics: {
ZIndex: {
POP_BASE: 1,
LOADING: 888,
TIP: 999,
POP_MASK: -999,
GUIDE: 9999
},
DesignSize: n,
StaticKey: {
SaveDataVersion: "V2",
PlayerDataKey: "playerDataKey"
},
AdKey: {
VdFreePh: "video_reward_1",
VdOfflineCoins: "video_reward_2",
VdAddTime: "video_reward_3",
VdLevelCoins: "video_reward_5",
VdREVIVE: "video_reward_4",
InterLevel: "interstitial_1",
FreeCoins: "video_reward_6"
},
OpenAdsKey: {
video_reward_1: "941627716",
video_reward_2: "942161521",
video_reward_3: "941627750",
video_reward_4: "941627756",
video_reward_5: "941627759",
video_reward_6: "941630566",
interstitial_1: "941627740"
},
OpenAdsKeyIOS: {
video_reward_1: "942341544",
video_reward_2: "942341562",
video_reward_3: "942341570",
video_reward_4: "942341573",
video_reward_5: "942341577",
video_reward_6: "942341579",
interstitial_1: "942341589"
},
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
Font: {
FONT_NORMAL: "font/Montserrat-Bold"
},
init: function(e) {},
clean: function() {}
}
});
cc._RF.pop();
}, {} ],
CornerData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6c983lyghFOKIgWUG57EOje", "CornerData");
var n;
function a(e, t, i) {
t in e ? Object.defineProperty(e, t, {
value: i,
enumerable: !0,
configurable: !0,
writable: !0
}) : e[t] = i;
return e;
}
var o = cc.Enum({
CORNER_ID_UPGRADE_OTHER: 1001,
CORNER_ID_UPGRADE_TOWER: 1010,
CORNER_ID_FREE_COINS: 1020
}), s = {}, r = (a(n = {}, o.CORNER_ID_UPGRADE_OTHER, {
offset: cc.v2(-10, -10)
}), a(n, o.CORNER_ID_UPGRADE_TOWER, {
offset: cc.v2(-10, -10)
}), a(n, o.CORNER_ID_FREE_COINS, {
offset: cc.v2(-10, -10)
}), n), l = cc.Enum({
NORMAL: 0,
NEW: 1,
UPDATE: 2,
DELETE: 3
});
cc.Class({
extends: cc.Component,
statics: {
CornerType: o,
CornerConfig: s,
UI_CONFIG: r,
prepare: function() {
this.cornerList = {};
this.cornerUI = {};
},
init: function(e) {
this.prepare();
this.initData(e);
},
initData: function(e) {
this.updateCorner(e);
},
registOn: function(e, t) {
if (e && cc.isValid(e)) {
this.cornerUI[t] || (this.cornerUI[t] = []);
this.cornerUI[t].push(e);
}
this.updateNode(t);
},
registOff: function(e) {
this.cornerUI[e] && delete this.cornerUI[e];
},
addClientCorner: function(e) {
this.updateCorner([ {
id: e,
flag: l.NEW
} ]);
},
deleteClientCorner: function(e) {
this.updateCorner([ {
id: e,
flag: l.DELETE
} ]);
},
getCornerData: function(e) {
return this.cornerList[e];
},
updateCorner: function(e) {
var t = !0, i = !1, n = void 0;
try {
for (var a, o = e[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value, r = s.id || 0;
s.flag == l.DELETE ? delete this.cornerList[r] : this.cornerList[r] = 1;
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
e && e.length > 0 && this.updateAllCorner();
},
updateAllCorner: function() {
for (var e in this.cornerUI) this.updateNode(e);
},
updateNode: function(e) {
var t = this.cornerUI[e];
if (t) {
var i = function(e, t) {
var i = e.getAnchorPoint(), n = e.width * (1 - i.x), a = e.height * (1 - i.y);
if (t) {
n += t.offset.x;
a += t.offset.y;
}
return cc.v2(n, a);
}, n = this.checkCorner(e), a = !0, o = !1, s = void 0;
try {
for (var l, c = t[Symbol.iterator](); !(a = (l = c.next()).done); a = !0) {
var h = l.value;
if (h && cc.isValid(h)) if (n) {
var u = h.getChildByName("CORNER_NODE_UI");
if (!u) {
var d = r[e], g = d && d.src || "textures/common/red_dot", p = d && d.scale || 1;
(u = zy.Node.createNode({
zIndex: 9999,
name: "CORNER_NODE_UI",
parent: h
})).addComponent(zy.Sprite);
zy.Sprite.updateNode(u, {
url: g,
scale: p
});
if (cc.isValid(u)) {
var m = i(h, d);
u.position = m;
}
}
cc.isValid(u) && (u.active = !0);
} else {
var y = h.getChildByName("CORNER_NODE_UI");
y && cc.isValid(y) && (y.active = !1);
}
}
} catch (e) {
o = !0;
s = e;
} finally {
try {
!a && c.return && c.return();
} finally {
if (o) throw s;
}
}
}
},
checkCorner: function(e) {
if (this.cornerList[e]) return !0;
var t = s[e] || [], i = !0, n = !1, a = void 0;
try {
for (var o, r = t[Symbol.iterator](); !(i = (o = r.next()).done); i = !0) {
var l = o.value;
if (this.cornerList[l]) return !0;
if (s[l] && this.checkCorner(l)) return !0;
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && r.return && r.return();
} finally {
if (n) throw a;
}
}
return !1;
},
clean: function() {
this.prepare();
}
}
});
cc._RF.pop();
}, {} ],
DataBase: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4bc8dkqHTBMcaHi1VJ5zUzI", "DataBase");
cc.Class({
ctor: function() {
this.dataObj = null;
this.fileDir = "";
},
initData: function(e) {
e && (this.dataObj = e);
}
});
cc._RF.pop();
}, {} ],
DataMng: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "935052anXpNNrnw1ueUkI/J", "DataMng");
var n = e("./TurretData"), a = e("./TurretSecondData"), o = e("./TurretPriceData"), s = e("./UpStarGotData"), r = e("./UpStarNeedData"), l = e("./CoinsUpData"), c = e("./HpUpData"), h = e("./TurretAttrData"), u = e("./EnemyAttrData"), d = e("./LevelsData"), g = e("./LevelsEnemyWaveData"), p = e("./BgColorData"), m = e("./UserData"), y = e("./DataBase");
cc.Class({
ctor: function() {
this.loadCounts = 0;
this.turretData = new n();
this.turretSecondData = new a();
this.turretPriceData = new o();
this.upStarGotData = new s();
this.upStarNeedData = new r();
this.coinsUpData = new l();
this.hpUpData = new c();
this.turretAttrData = new h();
this.enemyAttrData = new u();
this.levelsData = new d();
this.levelsEnemyWaveData = new g();
this.bgColorData = new p();
this.userData = new m();
},
loadDataFromLocalFile: function(e, t) {
var i = this;
this.loadSavedData();
var n = Object.keys(this);
cc.log("====keys11: %s", JSON.stringify(n));
n = n.filter(function(e) {
return i.hasOwnProperty(e) && i[e] instanceof y;
});
cc.log("====keys22: %s", JSON.stringify(n));
var a = function(a) {
var o = i[a], s = o.fileDir;
cc.loader.loadRes(s, cc.JsonAsset, function(a, r) {
a ? cc.error("load local data: " + s + ", error: " + a) : o.initData && o.initData.call(o, r.json);
i.loadCounts++;
e && e(i.loadCounts, n.length);
i.loadCounts >= n.length && t && t();
});
}, o = !0, s = !1, r = void 0;
try {
for (var l, c = n[Symbol.iterator](); !(o = (l = c.next()).done); o = !0) {
a(l.value);
}
} catch (e) {
s = !0;
r = e;
} finally {
try {
!o && c.return && c.return();
} finally {
if (s) throw r;
}
}
},
loadSavedData: function() {
this.userData.loadData();
},
saveDataToLocal: function() {
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
Device: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "fa52e/qG61Knro2fTFzJpmm", "Device");
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
init: function() {
this.osName = cc.sys.os;
this.osVersion = cc.sys.osVersion;
this.language = cc.sys.language;
this.openudid = "com.zhanyou.towerdefensegame";
var e = "{}";
if (cc.sys.isNative) {
e = cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAME, "getDeviceInfo", "()Ljava/lang/String;") : jsb.reflection.callStaticMethod("PlatformUtils", "getDeviceInfo");
this.initNative(JSON.parse(e));
} else this.initHtml();
},
initHtml: function() {},
initNative: function(e) {
for (var t in e) this[t] = e[t];
cc.log(JSON.stringify(e));
},
vibratorShort: function() {
getVibrator(25);
},
vibratorLong: function() {
getVibrator(100);
},
getVibrator: function(e) {
zy.dataMng.userData.vibOn && (cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAME, "vibrator", "(I)V", e) : (cc.sys.os, 
cc.sys.OS_IOS));
},
clean: function() {
cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT && wx.hideAllNonBaseMenuItem();
}
}
});
cc._RF.pop();
}, {} ],
Director: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a2a55RhwyZHfo0GMcF0EnW3", "Director");
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
init: function(e) {
this.scene = null;
this.sceneCanvas = null;
this.sceneComponent = null;
this.sceneName = null;
this.uiRoot = null;
this.isBackground = !1;
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
onEventHide: function() {
if (!this.isBackground) {
this.isBackground = !0;
this.toBackgroundOSTime = zy.utils.time();
cc.log("进入后台:", this.toBackgroundOSTime);
zy.dataMng.saveDataToLocal();
}
},
onEventShow: function() {
if (this.isBackground) {
this.isBackground = !1;
var e = zy.utils.time() - this.toBackgroundOSTime;
cc.log("进入前台-interval:", e);
}
},
onWXGHide: function(e) {
cc.log("onWXGHide", e);
},
onWXGShow: function(e) {
cc.log("onWXGShow", e);
},
onKeyDown: function(e) {
cc.log("onKeyDown", e.keyCode);
switch (e.keyCode) {
case cc.KEY.back:
}
},
onAfterDraw: function() {},
loadScene: function(e, t, i) {
zy.director.closeAllPops();
window[this.sceneName + "Scene"] = null;
cc.director.loadScene(e, function() {
cc.log("loadScene:", e);
this.scene = cc.director.getScene();
this.sceneCanvas = this.scene.getChildByName("Canvas");
this.uiRoot = this.sceneCanvas.getChildByName("UInode") || this.sceneCanvas;
this.sceneName = e;
this.sceneComponent = this.sceneCanvas.getComponent(e + "Scene");
if (this.sceneComponent) {
this.sceneComponent.sceneName = e + "Scene";
this.sceneComponent.init && this.sceneComponent.init(t);
}
window[this.sceneName + "Scene"] = this.sceneComponent;
i && i(this.scene, this.sceneCanvas, this.sceneComponent);
}.bind(this));
},
getSceneName: function() {
return this.sceneName ? this.sceneName : "";
},
getSceneComponent: function() {
return this.sceneComponent;
},
getScene: function() {
return this.scene;
},
getSceneCanvas: function() {
return this.sceneCanvas;
},
getUiRoot: function() {
return this.uiRoot;
},
createPop: function(e, t, i) {
t = t || {};
var n = "", a = e.split("/");
a.length > 0 && (n = a[a.length - 1]);
cc.log("createPop:" + e, n);
if (this.isPopActive(e)) cc.log("当前POP已存在:" + e); else {
var o = function(i) {
var n = cc.instantiate(i);
n.position = cc.v2(0, 0);
n.zIndex = this.getTopPopZIndex() + 10;
n.parent = this.uiRoot;
var a = {
popName: e,
popNode: n
};
this.activePops.push(a);
var o = n.getComponent("PopBase");
a.popBase = o;
o.initBase(t, e);
a.popComponent = o.component;
}.bind(this);
i ? o(i) : cc.loader.loadRes(e, cc.Prefab, null, function(t, i) {
t ? cc.log(e + "加载失败", t) : o(i);
}.bind(this));
}
},
getTopPopData: function(e) {
var t = e || 1;
return this.activePops[this.activePops.length - t];
},
getTopPopZIndex: function() {
var e = this.getTopPopData();
return e ? e.popNode.zIndex : zy.constData.ZIndex.POP_BASE;
},
getPopData: function(e) {
for (var t in this.activePops) {
var i = this.activePops[t];
if (i.popName == e) return i;
}
},
getPop: function(e) {
var t = this.getPopData(e);
if (t) return t.popComponent;
},
isPopActive: function(e) {
return !!this.getPopData(e);
},
getActivePops: function() {
return this.activePops;
},
closePop: function(e) {
cc.log("closePop:" + e);
var t = this.getPopData(e);
if (t) {
for (var i in this.activePops) {
if (t == this.activePops[i]) {
this.activePops.splice(i, 1);
break;
}
}
var n = t.popBase;
n.cleanBase();
0 != this.activePops.length || n.onClosedCallback || zy.event.emit(zy.director.EventType.ALL_SINGLE_POP_CLOSE);
}
},
closeAllPops: function() {
for (;this.activePops.length > 0; ) {
var e = this.activePops.length - 1, t = this.activePops[e], i = t.popName;
cc.log("closeAllPops:" + i);
this.activePops.splice(e, 1);
t.popBase.cleanBase();
}
this.activePops = [];
},
addPersistRootNode: function(e) {
cc.game.addPersistRootNode(e);
this.persistRootNodeList.push(e);
},
cleanPersistRootNode: function() {
for (var e in this.persistRootNodeList) {
var t = this.persistRootNodeList[e];
cc.game.removePersistRootNode(t);
}
}
}
});
cc._RF.pop();
}, {} ],
EffectMng: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "35195UW08VA0JX5nTRyJZXn", "EffectMng");
var n = e("./NormalEffect"), a = cc.Class({
statics: {
Effect: {
NormalHit: "play1",
MissileHit: "play2",
EnemyDieBomb: "play3",
BossDieBomb: "play4",
EnemyDieParticle: "play5",
Grenade2Bomb: "play6",
Grenade3Bomb: "play7",
SwitchTower: "play8",
BuildSuc: "play9",
Coordination: "play10",
UpgradeTower: "play11"
},
playNormalEffect: function(e, t, i, a) {
var o = zy.nodePoolMng.getNormalEffect();
o.parent = e;
o.position = t;
(o = o.getComponent(n)).play(i, a);
return o.node;
},
showBloodDecreaseNode: function(e, t, i) {
var n = zy.nodePoolMng.getBloodDecNode();
n.parent = t;
n.getComponentInChildren(cc.Label).string = "-" + zy.utils.getKMBString(e);
n.position = i;
var a = n.getComponent(cc.Animation);
a.once("finished", function() {
zy.nodePoolMng.putBloodDecNode(n);
}, this);
a.play("ani_dmg_font1", 0);
return n;
},
flyNode: function(e, t, i, n, a) {
var o = zy.director.getUiRoot();
zy.ui.flyNode(e, o, i, n, t, a);
}
}
});
zy.effectMng = a;
cc._RF.pop();
}, {
"./NormalEffect": "NormalEffect"
} ],
Encrypt: [ function(e, t, i) {
(function(n) {
"use strict";
cc._RF.push(t, "d01c6ZTO/VDm45rxncbJpPQ", "Encrypt");
var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
(function(e, n) {
"undefined" != typeof i && "undefined" != typeof t ? t.exports = n() : "function" == typeof define && "object" === a(define.amd) ? define(n) : "function" == typeof define && "object" === a(define.petal) ? define("encryptjs", [], n) : this.encryptjs = n();
})(0, function(i) {
(i = {
version: "1.0.0"
}).init = function() {
console.log("--------------------Applying Encryption Algorithm------------------ ");
};
var o = null;
"undefined" != typeof t && t.exports && (o = e("./Algo"));
i.encrypt = function(e, t, n) {
if (128 != n && 192 != n && 256 != n) return "";
e = String(e).utf8Encode();
t = String(t).utf8Encode();
for (var a = n / 8, s = new Array(a), r = 0; r < a; r++) s[r] = isNaN(t.charCodeAt(r)) ? 0 : t.charCodeAt(r);
var l = o.cipher(s, o.keyExpansion(s));
l = l.concat(l.slice(0, a - 16));
for (var c = new Array(16), h = new Date().getTime(), u = h % 1e3, d = Math.floor(h / 1e3), g = Math.floor(65535 * Math.random()), p = 0; p < 2; p++) c[p] = u >>> 8 * p & 255;
for (var m = 0; m < 2; m++) c[m + 2] = g >>> 8 * m & 255;
for (var y = 0; y < 4; y++) c[y + 4] = d >>> 8 * y & 255;
for (var f = "", _ = 0; _ < 8; _++) f += String.fromCharCode(c[_]);
for (var A = o.keyExpansion(l), C = Math.ceil(e.length / 16), v = new Array(C), P = 0; P < C; P++) {
for (var b = 0; b < 4; b++) c[15 - b] = P >>> 8 * b & 255;
for (var L = 0; L < 4; L++) c[15 - L - 4] = P / 4294967296 >>> 8 * L;
for (var I = o.cipher(c, A), B = P < C - 1 ? 16 : (e.length - 1) % 16 + 1, E = new Array(B), N = 0; N < B; N++) {
E[N] = I[N] ^ e.charCodeAt(16 * P + N);
E[N] = String.fromCharCode(E[N]);
}
v[P] = E.join("");
}
var T = f + v.join("");
return T = i.base64Encode(T);
};
i.decrypt = function(e, t, n) {
if (128 != n && 192 != n && 256 != n) return "";
e = i.base64Decode(String(e));
t = String(t).utf8Encode();
for (var a = n / 8, s = new Array(a), r = 0; r < a; r++) s[r] = isNaN(t.charCodeAt(r)) ? 0 : t.charCodeAt(r);
var l = o.cipher(s, o.keyExpansion(s));
l = l.concat(l.slice(0, a - 16));
for (var c = new Array(8), h = e.slice(0, 8), u = 0; u < 8; u++) c[u] = h.charCodeAt(u);
for (var d = o.keyExpansion(l), g = Math.ceil((e.length - 8) / 16), p = new Array(g), m = 0; m < g; m++) p[m] = e.slice(8 + 16 * m, 8 + 16 * m + 16);
e = p;
for (var y = new Array(e.length), f = 0; f < g; f++) {
for (var _ = 0; _ < 4; _++) c[15 - _] = f >>> 8 * _ & 255;
for (var A = 0; A < 4; A++) c[15 - A - 4] = (f + 1) / 4294967296 - 1 >>> 8 * A & 255;
for (var C = o.cipher(c, d), v = new Array(e[f].length), P = 0; P < e[f].length; P++) {
v[P] = C[P] ^ e[f].charCodeAt(P);
v[P] = String.fromCharCode(v[P]);
}
y[f] = v.join("");
}
var b = y.join("");
return b = b.utf8Decode();
};
var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
i.base64Encode = function(e) {
var t = "", n = void 0, a = void 0, o = void 0, r = void 0, l = void 0, c = void 0, h = void 0, u = 0;
e = i._utf8_encode(e);
for (;u < e.length; ) {
n = e.charCodeAt(u++);
a = e.charCodeAt(u++);
o = e.charCodeAt(u++);
r = n >> 2;
l = (3 & n) << 4 | a >> 4;
c = (15 & a) << 2 | o >> 6;
h = 63 & o;
isNaN(a) ? c = h = 64 : isNaN(o) && (h = 64);
t = t + s.charAt(r) + s.charAt(l) + s.charAt(c) + s.charAt(h);
}
return t;
};
i.base64Decode = function(e) {
var t = "", n = void 0, a = void 0, o = void 0, r = void 0, l = void 0, c = void 0, h = void 0, u = 0;
e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
for (;u < e.length; ) {
r = s.indexOf(e.charAt(u++));
l = s.indexOf(e.charAt(u++));
c = s.indexOf(e.charAt(u++));
h = s.indexOf(e.charAt(u++));
n = r << 2 | l >> 4;
a = (15 & l) << 4 | c >> 2;
o = (3 & c) << 6 | h;
t += String.fromCharCode(n);
64 != c && (t += String.fromCharCode(a));
64 != h && (t += String.fromCharCode(o));
}
return t = i._utf8_decode(t);
};
i._utf8_encode = function(e) {
e = e.replace(/\r\n/g, "\n");
for (var t = "", i = 0; i < e.length; i++) {
var n = e.charCodeAt(i);
if (n < 128) t += String.fromCharCode(n); else if (n > 127 && n < 2048) {
t += String.fromCharCode(n >> 6 | 192);
t += String.fromCharCode(63 & n | 128);
} else {
t += String.fromCharCode(n >> 12 | 224);
t += String.fromCharCode(n >> 6 & 63 | 128);
t += String.fromCharCode(63 & n | 128);
}
}
return t;
};
i._utf8_decode = function(e) {
for (var t = "", i = 0, n = 0, a = 0, o = 0; i < e.length; ) if ((n = e.charCodeAt(i)) < 128) {
t += String.fromCharCode(n);
i++;
} else if (n > 191 && n < 224) {
a = e.charCodeAt(i + 1);
t += String.fromCharCode((31 & n) << 6 | 63 & a);
i += 2;
} else {
a = e.charCodeAt(i + 1);
o = e.charCodeAt(i + 2);
t += String.fromCharCode((15 & n) << 12 | (63 & a) << 6 | 63 & o);
i += 3;
}
return t;
};
i.getTextEncryptAndSaveToTextFile = function(e, t, i) {
throw Error("Command line not supported on this platform");
};
i.getTextEncryptAndSaveToJSONFile = function(e, t, i) {
throw Error("Command line not supported on this platform");
};
i.writeCipherTextToJSON = function(e, t, i, n) {
if (null == n) {
n = i;
i = {};
}
var o = "object" === ("undefined" == typeof i ? "undefined" : a(i)) && null !== i && "spaces" in i ? i.spaces : this.spaces;
try {
JSON.stringify(t, i ? i.replacer : null, o) + "\n";
} catch (e) {
if (n) return n(e, null);
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
if ("undefined" != typeof n) return new n(this, "utf8").toString("base64");
throw new Error("No Base64 Encode");
});
"undefined" == typeof String.prototype.base64Decode && (String.prototype.base64Decode = function() {
if ("undefined" != typeof atob) return atob(this);
if ("undefined" != typeof n) return new n(this, "base64").toString("utf8");
throw new Error("No Base64 Decode");
});
i.init();
return i;
});
cc._RF.pop();
}).call(this, e("buffer").Buffer);
}, {
"./Algo": "Algo",
buffer: 2
} ],
EnemyAttrData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "13c2ayStb1OxKw43gQsFz9u", "EnemyAttrData");
var n = e("./../Lib/common/UtilsOther"), a = e("./DataBase");
cc.Class({
extends: a,
ctor: function() {
this.fileDir = "data/enemyAttrData";
},
initData: function(e) {
if (e) {
this.dataObj = e;
this.dataLen = e.length;
this.dataObj = n.arrayToDict(this.dataObj, "id");
}
},
getTurretAttr: function(e) {
return this.dataObj[e];
}
});
cc._RF.pop();
}, {
"./../Lib/common/UtilsOther": "UtilsOther",
"./DataBase": "DataBase"
} ],
EnemyData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "9d79dGYnsNJoowrGzdhrAC1", "EnemyData");
t.exports = {
EnemyData: [ {
enemy_Name: "enemy_0",
enemy_ID: 0,
enemy_Movingspeed: 70,
enemy_Attack: 1,
enemy_Blood: 0
}, {
enemy_Name: "enemy_1",
enemy_ID: 1,
enemy_Movingspeed: 50,
enemy_Attack: 1,
enemy_Blood: 0
}, {
enemy_Name: "enemy_2",
enemy_ID: 2,
enemy_Movingspeed: 300,
enemy_Attack: 1,
enemy_Blood: 0
}, {
enemy_Name: "enemy_3",
enemy_ID: 3,
enemy_Movingspeed: 50,
enemy_Attack: 2,
enemy_Blood: 0
}, {
enemy_Name: "enemy_4",
enemy_ID: 4,
enemy_Movingspeed: 30,
enemy_Attack: 4,
enemy_Blood: 0
} ]
};
cc._RF.pop();
}, {} ],
Enemygenerator: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "af771959f1MH5KelYj275HY", "Enemygenerator");
var n = e("GameManager"), a = e("Helpers"), o = e("MKSystem");
cc.Class({
extends: cc.Component,
properties: {
enemysPrefabArray: {
default: [],
type: cc.Prefab
},
bloodlossPosPrefab: null,
bullet_fontPrefab: null,
bullet_HitPrefab: null,
boomPrefab: null,
warning_enemy2Prefab: null,
warning_UI_finalwavePrefab: null,
warning_UI_normalPrefab: null,
reviveWaveAniPrefab: null,
warning_UI_finalwaveNode: null,
warning_UI_normalNode: null,
reviveWaveAniNode: null,
currGroupCreateEnemyCount: 0,
currGroupCreateEnemySum: 0,
currDieEnemyBloodNums: 0,
currLevelDieEnemySum: 0,
currLevelDieBloodNums: 0,
currGroupCreateEnemyCountPos: 0,
currEnemyCountPosindex: 0,
currDivisionEnemyCount: 0,
currDivisionEnemySum: 0,
currBossLevelDieBloodNums: 0,
updateFollowingCamera: !1
},
initEnemyData: function() {
this._urls = {
Enemy: "MainGame/Enemy",
BloodlossPos: "MainGame/BulletEffects/BloodlossPos",
Bullet_font: "MainGame/BulletEffects/bullet_font",
Bullet_hit: "MainGame/BulletEffects/bullet_hit",
Boom: "MainGame/EnemyEffects/boom",
Warning_enemy2: "MainGame/Ui/warning_enemy2",
Warning_UI_finalwave: "MainGame/Ui/Warning_UI_finalwave",
Warning_UI_normal: "MainGame/Ui/Warning_UI_normal",
ReviveWaveAni: "MainGame/Ui/reviveWaveAni"
};
this.initGetComponent();
this.initProduceEnemyPos();
this.initBloodlossPos();
},
initGetComponent: function() {
this.enemyNode = this.node.getChildByName("enemyNode");
this.enemy_bullet_fontlabelNode = this.node.getChildByName("enemy_bullet_fontlabelNode");
this.UInode = cc.find("Canvas/UInode");
this.pagodabastion = cc.find("Canvas/Pagodabastion");
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
this.gridmaps && (this.enemy_plist = this.gridmaps.getEnemy_plist());
this.gridmaps && (this.main_plist = this.gridmaps.getMainPlist());
this.audioMng = cc.find("Canvas/AudioMng").getComponent("AudioMng");
},
initProduceEnemyPos: function() {
for (var e = n.GRIDMAP_WIDTH + 11, t = n.GRIDMAP_HEIGHT + 11, i = cc.v2(0, 0), a = 0; a < 56; a++) {
a < 15 ? i = cc.v2(-7 * e + a * e, 7 * t) : a < 29 && a >= 15 ? i = cc.v2(7 * e, 6 * t - (a - 15) * t) : a < 43 && a >= 29 ? i = cc.v2(6 * e - (a - 29) * e, -7 * t) : a < 56 && a >= 43 && (i = cc.v2(-7 * e, -6 * t + (a - 43) * t));
n.produceEnemyPos.push(i);
}
var o = cc.view.getVisibleSize();
cc.log("windowSize == " + o);
var s = cc.v2(-o.width / 2, o.height / 2), r = cc.v2(-o.width / 2, -o.height / 2), l = cc.v2(o.width / 2, o.height / 2), c = cc.v2(o.width / 2, -o.height / 2);
n.screen4ArrPos.push(s);
n.screen4ArrPos.push(r);
n.screen4ArrPos.push(l);
n.screen4ArrPos.push(c);
cc.log("GameManager.produceEnemyPos ===== " + n.produceEnemyPos.length);
},
setEnemysPos: function(e, t, i, o, s) {
var r = n.produceEnemyPos.slice(0), l = [];
if (1 == t) {
if (o < s) l = r.slice(o, s + 1); else if (o > s) {
for (var c = n.produceEnemyPos.slice(0).slice(s + 1, o), h = 0; h < r.length; h++) for (var u = 0; u < c.length; u++) r[h] == c[u] && this.remove(r, r[h]);
for (var d = [], g = 0; g < r.length; g++) g <= s && d.push(r[g]);
for (var p = 0; p < r.length; p++) for (var m = 0; m < d.length; m++) r[p] == d[m] && this.remove(r, r[p]);
l = r.concat(d);
}
this.setPos(e, l, t, i, o, s);
} else if (0 == t) {
if (o > s) (l = r.slice(s, o + 1)).reverse(); else if (o < s) {
for (var y = n.produceEnemyPos.slice(0).slice(o + 1, s), f = 0; f < r.length; f++) for (var _ = 0; _ < y.length; _++) r[f] == y[_] && this.remove(r, r[f]);
for (var A = [], C = 0; C < r.length; C++) C <= o && A.push(r[C]);
for (var v = 0; v < r.length; v++) for (var P = 0; P < A.length; P++) r[v] == A[P] && this.remove(r, r[v]);
(l = r.concat(A)).reverse();
}
this.setPos(e, l, t, i, o, s);
} else if (o > s) {
var b = r[a.getRandomInt(s, o)];
e.setPosition(b);
} else if (o < s) {
var L = r[a.getRandomInt(o, s)];
e.setPosition(L);
} else e.setPosition(r[0]);
},
setPos: function(e, t, i, o, s, r) {
if (0 == o) {
var l = this.currGroupCreateEnemySum, c = t.length;
if (s == r) e.setPosition(n.produceEnemyPos[s]); else if (l >= c) if (l % c == 0) {
if (this.currGroupCreateEnemyCountPos == l / c) {
this.currEnemyCountPosindex++;
this.currGroupCreateEnemyCountPos = 0;
}
if (this.currGroupCreateEnemyCountPos < l / c) {
var h = this.currEnemyCountPosindex;
e.setPosition(t[h]);
this.currGroupCreateEnemyCountPos++;
}
} else if (this.currGroupCreateEnemyCount <= this.currGroupCreateEnemySum - Math.floor(l / c + l % c)) {
if (this.currGroupCreateEnemyCountPos == Math.floor(l / c)) {
this.currEnemyCountPosindex++;
this.currGroupCreateEnemyCountPos = 0;
}
if (this.currGroupCreateEnemyCountPos < Math.floor(l / c)) {
var u = this.currEnemyCountPosindex;
e.setPosition(t[u]);
this.currGroupCreateEnemyCountPos++;
}
} else e.setPosition(t[c - 1]); else {
if (this.currGroupCreateEnemyCountPos == Math.floor(c / l)) {
this.currEnemyCountPosindex += Math.floor(c / l);
this.currGroupCreateEnemyCountPos = 0;
}
if (this.currGroupCreateEnemyCountPos < Math.floor(c / l)) {
var d = this.currEnemyCountPosindex;
e.setPosition(t[d]);
this.currGroupCreateEnemyCountPos++;
}
}
} else if (s == r) e.setPosition(n.produceEnemyPos[s]); else {
var g = a.getRandomInt(0, t.length - 1);
e.setPosition(t[g]);
}
},
initBloodlossPos: function() {
this.bloodlossPosPrefab || cc.loader.loadRes(this._urls.BloodlossPos, this.loadBloodlossPosCallBack.bind(this));
},
loadBloodlossPosCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.bloodlossPosPrefab = t;
if (this.bloodlossPosPrefab) {
console.log("BloodlossPos initOK");
this.initBullet_font();
}
}
},
createBloodlossPos: function() {
return cc.instantiate(this.bloodlossPosPrefab);
},
initBullet_font: function() {
this.bullet_fontPrefab || cc.loader.loadRes(this._urls.Bullet_font, this.loadBullet_fontCallBack.bind(this));
},
loadBullet_fontCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.bullet_fontPrefab = t;
if (this.bullet_fontPrefab) {
console.log("Bullet_font initOK");
this.initBullet_Hit();
}
}
},
createBullet_font: function() {
return cc.instantiate(this.bullet_fontPrefab);
},
initBullet_Hit: function() {
this.bullet_HitPrefab || cc.loader.loadRes(this._urls.Bullet_hit, this.loadBullet_HitCallBack.bind(this));
},
loadBullet_HitCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.bullet_HitPrefab = t;
if (this.bullet_HitPrefab) {
console.log("Bullet_Hit initOK");
this.initBoom();
}
}
},
createBullet_Hit: function() {
return cc.instantiate(this.bullet_HitPrefab);
},
initBoom: function() {
this.boomPrefab || cc.loader.loadRes(this._urls.Boom, this.loadBoomCallBack.bind(this));
},
loadBoomCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.boomPrefab = t;
if (this.boomPrefab) {
console.log("Boom initOK");
this.initWarning_enemy2();
}
}
},
createBoom: function() {
return cc.instantiate(this.boomPrefab);
},
initWarning_enemy2: function() {
this.warning_enemy2Prefab || cc.loader.loadRes(this._urls.Warning_enemy2, this.loadWarning_enemy2CallBack.bind(this));
},
loadWarning_enemy2CallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.warning_enemy2Prefab = t;
if (this.warning_enemy2Prefab) {
console.log("warning_enemy2Prefab initOK");
this.initWarning_UI_finalwave();
}
}
},
createWarning_enemy2: function() {
return cc.instantiate(this.warning_enemy2Prefab);
},
initWarning_UI_finalwave: function() {
this.warning_UI_finalwavePrefab || cc.loader.loadRes(this._urls.Warning_UI_finalwave, this.loadWarning_UI_finalwaveCallBack.bind(this));
},
loadWarning_UI_finalwaveCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.warning_UI_finalwavePrefab = t;
if (this.warning_UI_finalwavePrefab) {
console.log("warning_UI_finalwavePrefab initOK");
this.initWarning_UI_normal();
}
}
},
createWarning_UI_finalwave: function() {
return cc.instantiate(this.warning_UI_finalwavePrefab);
},
initWarning_UI_normal: function() {
this.warning_UI_normalPrefab || cc.loader.loadRes(this._urls.Warning_UI_normal, this.loadWarning_UI_normalCallBack.bind(this));
},
loadWarning_UI_normalCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.warning_UI_normalPrefab = t;
if (this.warning_UI_normalPrefab) {
console.log("warning_UI_normalPrefab initOK");
this.initReviveWaveAni();
}
}
},
createWarning_UI_normal: function() {
return cc.instantiate(this.warning_UI_normalPrefab);
},
initReviveWaveAni: function() {
this.reviveWaveAniPrefab || cc.loader.loadRes(this._urls.ReviveWaveAni, this.loadReviveWaveAniCallBack.bind(this));
},
loadReviveWaveAniCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.reviveWaveAniPrefab = t;
if (this.reviveWaveAniPrefab) {
console.log("reviveWaveAniPrefab initOK");
this.initEnemys();
}
}
},
createReviveWaveAni: function() {
return cc.instantiate(this.reviveWaveAniPrefab);
},
initEnemys: function() {
cc.loader.loadResDir(this._urls.Enemy, this.loadEnemysCallBack.bind(this));
},
loadEnemysCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.enemysPrefabArray = t;
if (this.enemysPrefabArray.length >= n.ENEMY_TOTALNUM) {
console.log("Enemys initOK");
n.produceEnemyPos.length >= n.produceEnemyPosNums && this.getLevelDate(n.getLevel());
}
}
},
createEnemys: function(e) {
if (null != e) {
var t = zy.nodePoolMng.getEnmey("enemy" + e);
this.setEnemyData(n.getLevel(), e);
return t;
}
},
setEnemyData: function(e, t) {
var i = e + 1, n = t + 1e4, o = zy.dataMng.enemyAttrData;
if (o) {
this.basisMoveSpeed = a.ToNumber(o.getTurretAttr(n).basisMoveSpeed);
this.additionMoveSpeed = a.ToNumber(o.getTurretAttr(n).additionMoveSpeed);
this.basisAttack = a.ToNumber(o.getTurretAttr(n).basisAttack);
this.additionAttack = a.ToNumber(o.getTurretAttr(n).additionAttack);
this.enemyMoveSpeed = this.basisMoveSpeed + (i < 10 ? 0 : Math.floor(i / 10)) * this.additionMoveSpeed;
this.enemyAttack = Math.floor(this.basisAttack + (i < 10 ? 0 : Math.floor(i / 10)) * this.additionAttack);
this.ordinaryEnemySample = 1 + .05 * (i < 10 ? 0 : Math.floor(i / 10));
this.ordinaryEnemySample >= 2.5 && (this.ordinaryEnemySample = 2.5);
if (1 == t || 5 == t) {
this.basisSpiralSpeed = a.ToNumber(o.getTurretAttr(n).basisSpiralSpeed);
this.additionSpiralSpeed = a.ToNumber(o.getTurretAttr(n).additionSpiralSpeed);
this.enemySpiralSpeed = this.basisSpiralSpeed + (i < 10 ? 0 : Math.floor(i / 10)) * this.additionSpiralSpeed;
} else if (6 == t) {
this.basisWavelSpeed = a.ToNumber(o.getTurretAttr(n).basisWavelSpeed);
this.additionWavelSpeed = a.ToNumber(o.getTurretAttr(n).additionWavelSpeed);
this.enemyWavelSpeed = this.basisWavelSpeed + (i < 10 ? 0 : Math.floor(i / 10)) * this.additionWavelSpeed;
}
}
},
getLevelDate: function(e) {
e >= n.getLevelTotalNum() && (e = n.getLevelTotalNum());
n.load_LevelData_new(e);
this.enemySkinWeight = this.getEnemySkinWeight_new();
n.currBulletPool = [];
this.currLevelDieBloodNums = 0;
this.currBossLevelDieBloodNums = 0;
this.loadNextGroupEnemy();
n.isBossLevel && this.createBoss(7);
this.setSurplusEnemyTotalBloodPercentage(this.getSurplusEnemyTotalBloodPercentage(), this.getDieEnemyTotalBloodPercentage());
},
loadNextGroupEnemy: function() {
if (1 != n.getIsOver()) {
cc.log("GameManager.getGroup() == " + n.getGroup());
cc.log("GameManager.getMaxGroup() == " + n.getMaxGroup());
this.createFinalWaveTip();
this.eachWaveEnemyPos = [];
if (n.getGroup() > n.getMaxGroup()) cc.log("loadNextGroupEnemy : 怪物添加完毕"); else {
n.currEnemyDataPool = n.popNextMonsterGroupData_new();
n.currEnemyPool[n.getGroup() - 1] = [];
this.currGroupCreateEnemyCount = 0;
this.currGroupCreateEnemyCountPos = 0;
this.currEnemyCountPosindex = 0;
this.currGroupCreateEnemySum = n.getCurrGroupEnemySum_new();
var e = n.getEnemyTotalBlood(), t = n.getCurrGroupEnemyBloodPercentage_new();
this.enemyBloodNums = e * t;
this.enemyiDWeight = this.getEnemyiDWeight_new();
this.swEnemyAtt = this.getSmallWaveEnemyAttribute_new();
this.currDieEnemyBloodNums = 0;
this.enemyBloodPool = this.assignEnemyBlood(this.enemyBloodNums, this.currGroupCreateEnemySum);
var i = cc.delayTime(n.getEnemyInterval() / 2), a = cc.callFunc(this.randoms_create_Enemys.bind(this)), o = cc.repeat(cc.sequence(i.clone(), a), this.currGroupCreateEnemySum), s = cc.sequence(i, o);
this.enemyNode.runAction(s);
}
}
},
isNeedLoadNextGroup: function() {
var e = !1;
if (n.getGroup() > n.getMaxGroup()) e = !1; else {
if (this.enemyBloodNums - this.currDieEnemyBloodNums < 5 * this.enemyBloodNums / 100 || n.currEnemyPool[n.group - 1].length - 1 == 0 && this.currGroupCreateEnemyCount == this.currGroupCreateEnemySum) {
this.currDieEnemyBloodNums = 0;
e = !0;
}
}
return e;
},
randoms_create_Enemys: function() {
if (1 != n.getIsOver()) {
n.currEnemyDataPool[0];
var e = this.getRandomsEnemysID(), t = this.createEnemys(e);
if (null != t) {
var i = t.getComponent("Enemys");
if (i) {
var a = 0;
if (0 == e) a = this.enemyBloodPool[this.currGroupCreateEnemyCount]; else if (1 == e) {
a = this.enemyBloodPool[this.currGroupCreateEnemyCount];
i.setEnemySpiralSpeed(this.enemySpiralSpeed);
} else if (2 == e) {
a = this.enemyBloodPool[this.currGroupCreateEnemyCount];
i.setEnemyId2StartMoveTime(0);
} else if (3 == e) a = this.enemyBloodPool[this.currGroupCreateEnemyCount]; else if (4 == e) a = this.enemyBloodPool[this.currGroupCreateEnemyCount] / 5; else if (5 == e) {
a = this.enemyBloodPool[this.currGroupCreateEnemyCount];
i.setEnemySpiralSpeed(this.enemySpiralSpeed);
} else if (6 == e) {
a = this.enemyBloodPool[this.currGroupCreateEnemyCount];
i.setEnemyWavelSpeed(this.enemyWavelSpeed);
}
i.setEnemyId(e);
i.setEnemyBlood(a);
i.setEnemyInitBlood(a);
i.setEnemySpeed(this.enemyMoveSpeed);
i.setEnemyAttack(this.enemyAttack);
i.setEnemyOrdinaryEnemySample(this.ordinaryEnemySample);
var o = i.getEnemyInitBlood() / n.getEnemyTotalBlood() * n.getGold();
if (o >= 1) {
var s = Math.floor(n.getGold() / n.getEnemyTotal()), r = Math.ceil(o / s), l = s * r;
i.setEnemyDropGold(l);
i.setEnemyFlyDropGold(r);
}
}
var c = this.swEnemyAtt;
this.setEnemysPos(t, c[0], c[1], c[2], c[3]);
this.enemyNode.addChild(t);
this.setEnemySkin(e, t);
n.currEnemyPool[n.getGroup() - 1].push(t);
this.currGroupCreateEnemyCount++;
this.eachWaveEnemyPos.push(cc.v2(t.position.x, t.position.y));
this.currGroupCreateEnemyCount >= this.currGroupCreateEnemySum && this.createEachWaveTip();
i.initEnemy();
n.currEnemyDataPool.splice(0, 1);
}
}
},
loadDivisionEnemy: function(e, t) {
if (1 != n.getIsOver() && null != e) {
this.currDivisionEnemy = e;
var i = this.currDivisionEnemy.getComponent("Enemys");
if (4 == i.getEnemyId()) {
this.currDivisionEnemySum = 4;
this.currDivisionEnemyPosArray = [];
this.currDivisionEnemyCount = 0;
this.currDivisionEnemyPos = cc.v2(i.getPositions().x, i.getPositions().y);
this.initBlood = 0;
this.initBlood = i.getEnemyInitBlood();
this.currDivisionEnemyPosArray = this.getDivisionEnemysPos(this.currDivisionEnemyPos, t);
if (this.currDivisionEnemyPosArray.length == this.currDivisionEnemySum) for (var a = 0; a < this.currDivisionEnemySum; a++) this.createDivisionEnemy(i);
}
}
},
createDivisionEnemy: function(e) {
if (1 != n.getIsOver()) {
if (null != this.currDivisionEnemy) {
var t = e.getEnemyId();
if (0 != t) {
var i = 0;
4 == t && (i = 0);
var a = this.createEnemys(i);
if (null != a) {
var o = a.getComponent("Enemys");
if (o) {
o.setEnemyId(i);
o.setEnemyBlood(this.initBlood);
o.setEnemyInitBlood(this.initBlood);
o.setIsDivisionEnemy(!0);
o.setEnemySpeed(this.enemyMoveSpeed);
o.setEnemyAttack(this.enemyAttack);
o.setEnemyOrdinaryEnemySample(this.ordinaryEnemySample);
}
a.setPosition(this.currDivisionEnemyPos);
this.enemyNode.addChild(a);
this.setEnemySkin(i, a);
n.currEnemyPool[n.getGroup() - 1].push(a);
o.initEnemy();
var s = cc.v2(this.currDivisionEnemyPosArray[this.currDivisionEnemyCount].x, this.currDivisionEnemyPosArray[this.currDivisionEnemyCount].y), r = zy.utils.getDistance(a.position, s), l = cc.moveTo(r / 1100, s).easing(cc.easeIn(1));
a.runAction(l);
this.currDivisionEnemyCount++;
var c = n.getEnemyTotal();
c++;
n.setEnemyTotal(c);
}
}
} else cc.log("this.currDivisionEnemy == null l l ");
}
},
getDivisionEnemysPos: function(e, t) {
var i = [], n = cc.v2(0, 0), o = cc.v2(0, 0), s = cc.v2(0, 0);
if (0 == t) {
o = cc.v2(0, 0);
s = cc.v2(e.x, e.y);
t = -this.change_angle(o, s);
} else {
o = cc.v2(a.getRandomInt(20, 80), a.getRandomInt(20, 80));
s = cc.v2(-e.x, -e.y);
}
for (var r = s.sub(o).mag(), l = 0; l < this.currDivisionEnemySum; l++) {
r += 0 == t ? a.getRandomInt(120, 180) : a.getRandomInt(50, 200);
var c = Math.PI / 180 * (t + a.getRandomInt(-30, 30)), h = r * Math.sin(c), u = r * Math.cos(c);
n = cc.v2(h, u);
i.push(n);
}
return i;
},
setEnemySkin: function(e, t) {
var i = t.getChildByName("enemy").getComponent(cc.Sprite);
i && (i.spriteFrame = this.enemy_plist.getSpriteFrame("enemy_" + (this.getRandomsEnemysSkinID() + 1) + "_" + (e + 1)));
},
removeEnemy: function(e, t, i) {
for (var a = 0; a < n.currEnemyPool.length; a++) for (var o = 0; o < n.currEnemyPool[a].length; o++) if (n.currEnemyPool[a][o] == e) {
this.AddEnemyDeathEffect(e, t, i);
this.removeMonsterByIndex(a, o);
}
},
removeMonsterByIndex: function(e, t) {
n.currEnemyPool[e].splice(t, 1);
},
removeAllEnemys: function() {
this.enemyNode && this.enemyNode.stopAllActions();
for (var e = 0; e < n.currEnemyPool.length; e++) for (;0 != n.currEnemyPool[e].length; ) {
var t = n.currEnemyPool[e].pop();
cc.isValid(t) && zy.nodePoolMng.putEnemy(t);
}
},
spikeKillAllEnemys: function() {
this.removeAllBullet();
this.enemyNode && this.enemyNode.stopAllActions();
for (var e = 0; e < n.currEnemyPool.length; e++) for (;0 != n.currEnemyPool[e].length; ) {
var t = n.currEnemyPool[e].pop();
cc.isValid(t) && zy.nodePoolMng.putEnemy(t);
}
this.currDivisionEnemySum = 0;
this.currGroupCreateEnemySum = 0;
n.setIsOver(!0);
this.currLevelDieEnemySum = n.getEnemyTotal();
this.isGameOver();
n.currEnemyDataPool = [];
n.currEnemyPool[n.getGroup() - 1] = [];
},
AddEnemyDeathEffect: function(e, t, i) {
var a = this;
if (cc.isValid(e)) {
if (null == e) return;
var s = e.getComponent("Enemys"), r = s.getEnemyId(), l = .8;
0 == r && (l = .6);
1 == r && (l = .5);
2 == r && (l = .5);
3 == r && (l = 1);
4 == r && (l = 1.3);
var c = zy.effectMng.Effect.EnemyDieBomb;
if (7 == r) {
c = zy.effectMng.Effect.BossDieBomb;
zy.audioMng.playEffect(zy.audioMng.boss_blastAudio);
} else zy.audioMng.playEffect(zy.audioMng.enemy_dieAudio);
o.vibratorShort();
if (i && s.getEnemyDropGold() > 0) {
n.enemyDropGold += s.getEnemyDropGold();
s.getEnemyDropGold(), s.getEnemyFlyDropGold();
this.gridmaps.getGame_UITopGoldNode().getComponent(cc.Animation).play("uni_scale3");
this.gridmaps.setGoldTotal(n.enemyDropGold);
}
if (7 == r) {
var h = Math.floor((n.getEnemyTotalBlood() - this.currBossLevelDieBloodNums) / n.getEnemyTotalBlood() * n.getGold());
n.enemyDropGold += h;
n.isBossDie = !0;
}
var u = zy.effectMng.playNormalEffect(e, cc.v2(0, 0), c, function() {
cc.log("----enemy eff play end");
zy.nodePoolMng.putEnemy(e);
7 != r && a.currLevelDieEnemySum++;
a.setSurplusEnemyTotalBloodPercentage(a.getSurplusEnemyTotalBloodPercentage(), a.getDieEnemyTotalBloodPercentage());
n.isBossLevel && n.isBossDie ? 7 == r && a.isGameOver() : a.isGameOver();
});
this.loadDivisionEnemy(e, t);
u.setScale(l);
}
},
addEnemyHitEffects: function(e, t, i, n, o) {
if (null != e) {
var s = e.getComponent("Enemys"), r = cc.v2(s.getPositions().x, s.getPositions().y);
if (-1 == t) ; else {
var l = cc.v2(r.x + a.getRandomInt(-40, 40), r.y + a.getRandomInt(-10, 10)), c = (zy.effectMng.showBloodDecreaseNode(o, this.enemy_bullet_fontlabelNode, l), 
zy.effectMng.Effect.NormalHit);
1 != n && 3 != n && 5 != n && 7 != n || (c = zy.effectMng.Effect.MissileHit);
var h = cc.v2(t.getPosition().x, t.getPosition().y), u = this.change_angle(r, h), d = Math.PI / 180 * -u, g = s.getNodeContentSize().width / 2 * Math.sin(d), p = s.getNodeContentSize().height / 2 * Math.cos(d);
zy.effectMng.playNormalEffect(e, cc.v2(g, p), c, function() {}).angle = a.getRandomInt(0, 360);
}
}
},
getCurrDieEnemyBloodNums: function(e, t) {
if (null != e) {
var i = e.getComponent("Enemys").getEnemyId();
if (n.isBossLevel) {
7 == i && (this.currLevelDieBloodNums += t);
if (7 != i) {
this.currDieEnemyBloodNums += t;
this.currBossLevelDieBloodNums += t;
}
} else {
this.currLevelDieBloodNums += t;
this.currDieEnemyBloodNums += t;
}
this.setSurplusEnemyTotalBloodPercentage(this.getSurplusEnemyTotalBloodPercentage(), this.getDieEnemyTotalBloodPercentage());
}
},
getSurplusEnemyTotalBloodPercentage: function() {
if (n.isBossLevel) {
var e = 100 * (n.getEnemyBossTotalBlood() - this.currLevelDieBloodNums) / n.getEnemyBossTotalBlood() / 100;
e >= 1 && (e = 1);
e <= 0 && (e = 0);
return e;
}
var t = 100 * (n.getEnemyTotalBlood() - this.currLevelDieBloodNums) / n.getEnemyTotalBlood() / 100;
t >= 1 && (t = 1);
t <= 0 && (t = 0);
return t;
},
getDieEnemyTotalBloodPercentage: function() {
if (n.isBossLevel) {
var e = 100 * this.currLevelDieBloodNums / n.getEnemyBossTotalBlood() / 100;
e >= 1 && (e = 1);
e <= 0 && (e = 0);
var t = Math.floor(100 * e);
t >= 100 && (t = 99);
t <= 0 && (t = 0);
return t;
}
var i = 100 * this.currLevelDieBloodNums / n.getEnemyTotalBlood() / 100;
i >= 1 && (i = 1);
i <= 0 && (i = 0);
var a = Math.floor(100 * i);
a >= 100 && (a = 99);
a <= 0 && (a = 0);
return a;
},
setSurplusEnemyTotalBloodPercentage: function(e, t) {
if (this.gridmaps) {
this.gridmaps.setEnemyTotalBloodPercentage(e);
this.gridmaps.setLevelBloodProportion(t);
}
},
isGameOver: function() {
var e = n.getPlayerLifes();
if (e >= 0) if (this.currLevelDieEnemySum >= n.getEnemyTotal() || n.isBossLevel && this.currLevelDieBloodNums >= n.getEnemyBossTotalBlood()) {
n.setIsOver(!0);
n.isBossLevel && this.currLevelDieBloodNums >= n.getEnemyBossTotalBlood() && n.setIsFirstBoss(0);
if (0 == n.getIsGameOver()) {
cc.log("哈哈哈过关了。。。");
n.setIsGameOver(!0);
zy.dataMng.userData.phPower += zy.constData.PhLevelReward;
this.gridmaps.updatePhPower();
var t = n.getLevel();
t++;
n.setLevel(t);
n.passCurLevel = !0;
this.showSettlementView();
}
} else 0 == e && this.isResurrectionOrSettlement(); else this.isResurrectionOrSettlement();
this.isNeedLoadNextGroup() && this.loadNextGroupEnemy();
},
isResurrectionOrSettlement: function() {
if (0 == n.gameResurrectionIndex) if (n.isBossLevel) if (n.isBossDie) {
if (0 == n.getIsGameOver()) {
n.setIsGameOver(!0);
this.showSettlementView();
}
} else this.showRevivalinterfaceView(); else this.showRevivalinterfaceView(); else if (0 == n.getIsGameOver()) {
n.setIsGameOver(!0);
this.showSettlementView();
}
},
showRevivalinterfaceView: function() {
var e = this;
if (0 == n.getIsGameOver()) {
n.gameResurrectionIndex = 1;
cc.log("很不幸死了 ");
n.setGamePauseLogic(!0);
zy.director.createPop("MainGame/Ui/RevivePop", {
cb: function(t) {
if (t) {
cc.log("复活");
e.revivalinterfaceSuccess();
} else {
cc.log("死亡");
n.setIsGameOver(!0);
n.setGamePaused(!1);
e.showSettlementView();
}
}.bind(this)
});
}
},
revivalinterfaceSuccess: function() {
var e = this;
n.setPlayerLifes(Number(zy.dataMng.hpUpData.getHP(zy.dataMng.userData.hpLevel)));
this.gridmaps.setSelfHeartLifes(n.getPlayerLifes());
for (var t = [], i = 0, a = 0; a < n.currEnemyPool.length; a++) for (var o = 0; o < n.currEnemyPool[a].length; o++) {
var s = n.currEnemyPool[a][o], r = s.getComponent("Enemys");
s && 0 != r.opacity && t.push(s);
}
cc.log("count1 == " + t.length);
if (null == this.reviveWaveAniNode) {
this.reviveWaveAniNode = this.createReviveWaveAni();
this.pagodabastion.addChild(this.reviveWaveAniNode);
}
this.reviveWaveAniNode && this.reviveWaveAniNode.getComponent(cc.Animation).play("revive_wave");
var l = !0, c = !1, h = void 0;
try {
for (var u, d = t[Symbol.iterator](); !(l = (u = d.next()).done); l = !0) {
var g = u.value;
g && function() {
var a = g.getComponent("Enemys"), o = a.getMoveToPos(), s = g.position, r = e.change_angle(o, s), l = Math.PI / 180 * -r, c = 500 * Math.sin(l), h = 500 * Math.cos(l);
if (0 == c && 0 == h) {
c = 250;
h = 250;
}
var u = cc.v2(s.x + c, s.y + h), d = s.sub(u).mag(), p = cc.moveTo(d / 2500, u).easing(cc.easeIn(1)), m = cc.sequence(p, cc.callFunc(function() {
if (1 == a.getEnemyId() || 5 == a.getEnemyId() || 6 == a.getEnemyId()) {
var s = e.change_angle(u, o) - 90, r = Math.PI / 180 * s, l = o.sub(u).mag();
a.getEnemyDistance(l);
a.getEnemyRadian(r);
}
if (++i >= t.length) {
cc.log("count2 == " + i);
n.setGamePauseLogic(!1);
}
}));
g.runAction(m);
}();
}
} catch (e) {
c = !0;
h = e;
} finally {
try {
!l && d.return && d.return();
} finally {
if (c) throw h;
}
}
},
showSettlementView: function() {
zy.audioMng.playEffect(zy.audioMng.effOver);
n.gameResetData(!1);
n.clickCurrWEAPON_zIndex = 5;
this.currLevelDieEnemySum = 0;
this.setSurplusEnemyTotalBloodPercentage(0, 100);
this.removeAllBullet();
this.removeAllEnemys();
if (this.gridmaps) {
this.gridmaps.startAni_Game_UI("ui_2_go");
if (n.isBossLevel) {
n.isBossLevel = !1;
this.gridmaps.resetOrdinaryLevel();
}
this.currFollowingCamera = this.gridmaps.getFollowingCamera();
this.updateFollowingCamera = !0;
this.gridmaps.resetFollowingsCamera4();
this.gridmaps.resetWeapon();
this.playersBuild_okArray = this.gridmaps.getPlayers();
}
},
update: function(e) {
if (this.updateFollowingCamera && this.currFollowingCamera) {
this.currFollowingCamera.zoomRatio = cc.misc.lerp(this.currFollowingCamera.zoomRatio, 1, .2);
var t = !0, i = !1, a = void 0;
try {
for (var o, s = this.playersBuild_okArray[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
var r = o.value;
if (r) {
Math.abs(r.angle) > 360 && (r.angle = r.angle % 360);
r.angle = cc.misc.lerp(r.angle, 0, .2);
}
}
} catch (e) {
i = !0;
a = e;
} finally {
try {
!t && s.return && s.return();
} finally {
if (i) throw a;
}
}
if (this.currFollowingCamera.zoomRatio >= .99) {
this.currFollowingCamera.zoomRatio = 1;
var l = !0, c = !1, h = void 0;
try {
for (var u, d = this.playersBuild_okArray[Symbol.iterator](); !(l = (u = d.next()).done); l = !0) {
var g = u.value;
g && (g.angle = 0);
}
} catch (e) {
c = !0;
h = e;
} finally {
try {
!l && d.return && d.return();
} finally {
if (c) throw h;
}
}
this.gridmaps.AddComplete_UI();
this.gridmaps.setCurrLevelRewardGold(n.enemyDropGold);
this.gridmaps.setComplete_UIGoldTotal(n.getPlayerGold());
this.gridmaps.setComplete_UILevelNum(n.getLevel(), n.getLevel() + 1, n.getLevel() + 2);
n.passCurLevel && this.gridmaps.phPowerFlyAni();
this.updateFollowingCamera = !1;
}
}
},
removeBullet: function(e) {
for (var t = null, i = 0; i < n.currBulletPool.length; i++) if ((t = n.currBulletPool[i]) == e) {
zy.nodePoolMng.putBullet(t);
this.removeBulletByIndex(i);
}
},
removeBulletByIndex: function(e) {
n.currBulletPool.splice(e, 1);
},
removeAllBullet: function() {
for (;0 != n.currBulletPool.length; ) {
var e = n.currBulletPool.pop();
cc.isValid(e) && ("Bullet5_3_1" == e._name || "Bullet5_3_2" == e._name ? e.destroy() : zy.nodePoolMng.putBullet(e));
}
},
getBossNodeActive: function() {
this.bossNode = this.node.getChildByName("bossNode");
n.isBossLevel ? this.bossNode.active = !0 : this.bossNode.active = !1;
return this.bossNode.active;
},
createBoss: function(e) {
if (this.bossNode) {
cc.log("Boss init Pos = " + this.bossNode.position);
if (null == e) return;
if (1 == n.getIsOver()) return;
var t = this.createEnemys(e);
if (null == t) return;
var i = t.getComponent("Enemys");
if (i) {
i.setEnemyId(e);
i.setEnemyBlood(n.getEnemyBossTotalBlood());
i.setEnemyInitBlood(n.getEnemyBossTotalBlood());
i.setEnemySpeed(this.enemyMoveSpeed);
i.setEnemyAttack(this.enemyAttack);
i.setEnemyOrdinaryEnemySample(this.ordinaryEnemySample);
}
t.setPosition(this.bossNode.position);
this.enemyNode.addChild(t);
this.setBossNodeSjinSpriteFrame2(t.getChildByName("enemy"));
i.initEnemy();
n.currEnemyPool[n.getGroup() - 1].push(t);
this.bossNode.active = !1;
}
},
setBossNodeSjinSpriteFrame1: function() {
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
this.setBossNodeSjinSpriteFrame(this.bossNode);
},
setBossNodeSjinSpriteFrame2: function(e) {
this.setBossNodeSjinSpriteFrame(e);
},
setBossNodeSjinSpriteFrame: function(e) {
if (e) {
var t = this.getBossSjinTypeID(), i = t[0], n = t[1];
e.getComponent(cc.Sprite).spriteFrame = this.gridmaps.getEnemy_plist().getSpriteFrame("enemy_" + i + "_boss_" + n);
}
},
getBossSjinTypeID: function() {
var e = n.getLevel(), t = e + 1, i = [], o = 0, s = 0;
if (e <= 70) {
o = Number(t / 10);
s = 1;
} else if (e <= 140) {
o = Number((t - 70) / 10);
s = 2;
} else if (e <= 210) {
o = Number((t - 140) / 10);
s = 1;
} else if (e <= 280) {
o = Number((t - 210) / 10);
s = 2;
} else if (e <= 350) {
o = Number((t - 280) / 10);
s = 1;
} else if (e <= 420) {
o = Number((t - 350) / 10);
s = 2;
} else if (e <= 490) {
o = Number((t - 420) / 10);
s = 1;
} else if (e <= 560) {
o = Number((t - 490) / 10);
s = 2;
} else if (e <= 630) {
o = Number((t - 560) / 10);
s = 1;
} else if (e <= 700) {
o = Number((t - 630) / 10);
s = 2;
} else {
o = a.getRandomInt(1, 7);
s = a.getRandomInt(1, 2);
}
o < 1 && (o = 1);
o > 7 && (o = 7);
i.push(parseInt(o));
i.push(parseInt(s));
return i;
},
getBossBlood: function() {
if (n.isBossLevel) {
if (0 == n.getIsFirstBoss()) {
n.setIsFirstBoss(1);
for (var e = zy.dataMng.turretSecondData, t = 0, i = 0; i < n.WEAPON_TOTALNUM; i++) {
var o = n.getPlayersData(i), s = o.player_PosID, r = o.player_Level;
if (3 == o.player_State && -1 != s && e) {
t += a.ToNumber(e.getTurretSecondAttack(r));
}
}
0 == t ? t = 999999999 : t *= n.getIsBossLevelToMultiple();
n.setBossHp(t);
}
return n.getBossHp();
}
},
createEnemy2WarningTip: function(e) {
if (this.UInode) {
var t = zy.nodePoolMng.getWarningEnemy2DecNode();
this.UInode.addChild(t);
e.x < 0 && (e.x += t.getContentSize().width / 8);
e.x > 0 && (e.x -= t.getContentSize().width / 8);
e.y < 0 && (e.y += t.getContentSize().height / 8);
e.y > 0 && (e.y -= t.getContentSize().height / 8);
t.setPosition(e.x, e.y);
t.getComponent(cc.Animation).play("warning_enemy2");
zy.audioMng.playEffect(zy.audioMng.effWarning);
}
},
createFinalWaveTip: function() {
if (n.getGroup() == n.getMaxGroup() && this.UInode) {
cc.log("最后一波敌人。。。");
if (null == this.warning_UI_finalwaveNode) {
this.warning_UI_finalwaveNode = this.createWarning_UI_finalwave();
this.UInode.addChild(this.warning_UI_finalwaveNode);
}
this.warning_UI_finalwaveNode && this.warning_UI_finalwaveNode.getComponent(cc.Animation).play("warning_finalwave");
}
},
createEachWaveTip: function() {
if (this.UInode) {
if (null == this.warning_UI_normalNode) {
this.warning_UI_normalNode = this.createWarning_UI_normal();
this.UInode.addChild(this.warning_UI_normalNode);
var e = this.warning_UI_normalNode.getChildByName("edge");
this.edge1 = e.getChildByName("edge1");
this.edge2 = e.getChildByName("edge2");
this.edge3 = e.getChildByName("edge3");
this.edge4 = e.getChildByName("edge4");
}
this.edge1.active = !1;
this.edge2.active = !1;
this.edge3.active = !1;
this.edge4.active = !1;
for (var t = 0; t < this.eachWaveEnemyPos.length; t++) this.eachWaveEnemyPos[t];
for (var i = 0; i < 15; i++) for (var a = 0; a < this.eachWaveEnemyPos.length; a++) if (n.produceEnemyPos[i].equals(this.eachWaveEnemyPos[a])) {
0 == this.edge2.active && (this.edge2.active = !0);
break;
}
for (var o = 15; o < 29; o++) for (var s = 0; s < this.eachWaveEnemyPos.length; s++) if (n.produceEnemyPos[o].equals(this.eachWaveEnemyPos[s])) {
0 == this.edge4.active && (this.edge4.active = !0);
break;
}
for (var r = 29; r < 43; r++) for (var l = 0; l < this.eachWaveEnemyPos.length; l++) if (n.produceEnemyPos[r].equals(this.eachWaveEnemyPos[l])) {
0 == this.edge1.active && (this.edge1.active = !0);
break;
}
for (var c = 43; c < 56; c++) for (var h = 0; h < this.eachWaveEnemyPos.length; h++) if (n.produceEnemyPos[c].equals(this.eachWaveEnemyPos[h])) {
0 == this.edge3.active && (this.edge3.active = !0);
break;
}
this.warning_UI_normalNode && this.warning_UI_normalNode.getComponent(cc.Animation).play("warning_normal");
}
},
getRandomsEnemysID: function() {
var e = this.enemyiDWeight, t = (e = this.arrOverAdd(e))[e.length - 1], i = Math.random() * t, n = this.getArrIndex(i, e);
null == n && (n = 0);
return n;
},
getRandomsEnemysSkinID: function() {
var e = this.enemySkinWeight, t = (e = this.arrOverAdd(e))[e.length - 1], i = Math.random() * t, n = this.getArrIndex(i, e);
null == n && (n = 0);
return n;
},
getSmallWaveEnemyAttribute: function() {
return n.getSmallWaveEnemyAttribute();
},
getEnemyiDWeight: function() {
return n.getEnemyiDWeight();
},
getSmallWaveEnemyAttribute_new: function() {
return n.getSmallWaveEnemyAttribute_new();
},
getEnemyiDWeight_new: function() {
return n.getEnemyiDWeight_new();
},
getEnemySkinWeight_new: function() {
return n.getEnemySkinWeight_new();
},
getRandomUpsetArray: function(e) {
if (null != e) {
var t = e;
t.sort(function() {
return .5 - Math.random();
});
return t;
}
},
indexOf: function(e, t) {
for (var i = 0; i < e.length; i++) if (e[i] == t) return i;
return -1;
},
remove: function(e, t) {
var i = this.indexOf(e, t);
i > -1 && e.splice(i, 1);
},
arrOverAdd: function(e) {
if (!e || e.length <= 0) return [];
for (var t = [], i = 0; i < e.length; i++) t[i] = 0 == i ? parseInt(e[i]) : t[i - 1] + parseInt(e[i]);
return t;
},
getArrIndex: function(e, t) {
var i = 0;
if (e <= t[0]) return 0;
if (e >= t[t.length - 1]) return i = t.length - 1;
for (var n = 0; n < t.length; n++) if (e <= t[n]) i = n; else {
if (e > t[n] && e <= t[n + 1]) {
i = n + 1;
break;
}
if (e > t[n] && e <= t[n + 1]) {
i = n + 1;
break;
}
}
return i;
},
assignEnemyBlood: function(e, t) {
for (var i = +e, n = +t, a = []; n > 0; ) {
var o = this.scramble(i, n);
i -= o;
n--;
a.push(o);
}
return a;
},
scramble: function(e, t) {
if (1 === t) return +e.toFixed(2);
var i = (e / t * 2 - 1).toFixed(2) - 1, n = Math.random();
return 1 + Math.round(n * i);
},
change_angle: function(e, t) {
var i = t.x - e.x, n = t.y - e.y, a = cc.v2(i, n).signAngle(cc.v2(0, 1)) / Math.PI * 180;
a <= 0 && (a = 360 + a);
return -a;
}
});
cc._RF.pop();
}, {
GameManager: "GameManager",
Helpers: "Helpers",
MKSystem: "MKSystem"
} ],
Enemys: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4740etCUXxBnYRwFeNcrL7j", "Enemys");
var n = e("Helpers"), a = e("GameManager"), o = e("./../../Lib/common/UtilsOther");
cc.Class({
extends: cc.Component,
properties: {
targetPoint: {
default: null,
type: cc.Prefab
},
enemySpeed: 0,
enemyName: "",
enemyId: 0,
enemyAttack: 0,
enemyBlood: 0,
enemyOrdinaryEnemySample: 0,
enemyDropGold: 0,
enemyFlyDropGold: 0,
enemySpiralSpeed: 0,
enemyWavelSpeed: 0,
isShowEnemyBlood: -1,
isDivisionEnemy: !1,
enemyInitBlood: 0,
divisionEnemy: null,
enemyId2StartMoveTime: 0
},
initEnemy: function() {
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
this.enemygenerator = cc.find("Canvas/Enemygenerators/Enemygenerator").getComponent("Enemygenerator");
this.gridmaps && (this.enemy_plist = this.gridmaps.getEnemy_plist());
this.moveToPos = cc.v2(this.targetPoint.x, this.targetPoint.y);
this.enemyNode = this.node.getChildByName("enemy");
this.enemyEffects = this.node.getChildByName("enemyEffects");
this.enemy_hp_barNode = this.enemyEffects.getChildByName("enemy_hp_bar");
this.enemy_hp_ani = this.enemy_hp_barNode.getComponent(cc.Animation);
this.ani = this.enemy_hp_barNode.getChildByName("ani");
this.ani_ani = this.ani.getComponent(cc.Animation);
this.progressBar = this.ani.getChildByName("progressBar");
this.enemy_hp_progressBar = this.ani.getChildByName("progressBar").getComponent(cc.ProgressBar);
this.enemy_hp_labelnum_b = this.ani.getChildByName("label").getChildByName("b");
this.enemy_hp_labelnum_s = this.ani.getChildByName("label").getChildByName("s");
this.enemy_hp_labelnum_g = this.ani.getChildByName("label").getChildByName("g");
this.num_b = this.enemy_hp_labelnum_b.getComponent(cc.Sprite);
this.num_s = this.enemy_hp_labelnum_s.getComponent(cc.Sprite);
this.num_g = this.enemy_hp_labelnum_g.getComponent(cc.Sprite);
this.updateTimer = 0;
this.updateInterval = 1;
this.setEnemy_hp(100);
this.enemyNode && (this.enemyNode.opacity = 255);
if (1 == this.enemyId || 5 == this.enemyId) {
var e = this.change_angle(this.node.position, this.moveToPos) - 90, t = Math.PI / 180 * e;
this.radian = t;
this.distance = this.moveToPos.sub(this.node.position).mag();
}
if (2 == this.enemyId) {
this.node.angle = this.change_angle(this.node.position, this.moveToPos) - 90;
this.enemygenerator && this.enemygenerator.createEnemy2WarningTip(cc.v2(Math.round(this.getEnemy2Pos().x), Math.round(this.getEnemy2Pos().y)));
this.enemyId2IntervalTime = 1;
}
if (2 != this.enemyId || 7 != this.enemyId) {
this.ani_node = this.node.getChildByName("enemy").getComponent(cc.Animation);
var i = "ani_enemy_angle" + n.getRandomInt(1, 8), a = this.ani_node.getAnimationState(i);
if (a) {
a.speed = this.enemyOrdinaryEnemySample;
this.ani_node.play(i);
}
}
if (6 == this.enemyId) {
this.jiaodu = this.change_angle(this.node.position, this.moveToPos) - 90;
var o = Math.PI / 180 * this.jiaodu;
this.radian = o;
this.distance = this.moveToPos.sub(this.node.position).mag();
this.argument0 = -this.enemyWavelSpeed;
this.argument1 = this.enemyWavelSpeed;
this.argument2 = .125;
this.argument3 = 0;
this.a4 = .5 * (this.argument1 - this.argument0);
this.radian6 = 0;
}
if (7 == this.enemyId) {
this.enemyNode && this.enemyNode.getComponent(cc.Animation).play("ani_enemy_boss_1");
this.ani_uni_scale1 = this.node.getComponent(cc.Animation);
}
},
update: function(e) {
if (null != this.moveToPos) if (a.getGamePaused()) this.ani_node && this.ani_node.pause(); else {
this.ani_node && this.ani_node.resume();
if (1 == this.enemyId || 5 == this.enemyId) this.enemyCircleMove(e); else if (2 == this.enemyId) {
this.enemyId2StartMoveTime += e;
this.enemyId2StartMoveTime >= this.enemyId2IntervalTime && this.enemyOrientationCenterMove(e);
} else 6 == this.enemyId ? this.enemySMove(e) : this.enemyOrientationCenterMove(e);
1 == this.isShowEnemyBlood && this.isShowEnemyBloodupdate(e);
}
},
enemyOrientationCenterMove: function(e) {
var t = this.node.position, i = this.moveToPos.sub(t).normalize(), n = t.add(i.mul(this.enemySpeed * e));
this.node.setPosition(n);
},
enemyCircleMove: function(e) {
if (0 != this.enemyNode.opacity) {
var t = this.distance * Math.cos(this.radian) + this.moveToPos.x, i = this.distance * Math.sin(this.radian) + this.moveToPos.y, n = 360 - 180 / Math.PI * this.radian;
this.enemyNode.angle = n;
this.node.position = cc.v2(t, i);
this.distance -= this.enemySpeed;
this.radian += e * this.enemySpiralSpeed;
}
},
enemySMove: function(e) {
if (0 != this.enemyNode.opacity) {
var t = this.distance * Math.cos(this.radian) + this.moveToPos.x, i = this.distance * Math.sin(this.radian) + this.moveToPos.y, n = 360 - 180 / Math.PI * this.radian;
this.enemyNode.angle = n;
this.node.position = cc.v2(t, i);
this.radian6 += 60 * e;
this.radian = Math.PI / 180 * (this.argument0 + this.a4 + Math.sin((.001 * this.radian6 + this.argument2 * this.argument3) / this.argument2 * (2 * Math.PI)) * this.a4 + this.jiaodu);
this.distance -= 3;
}
},
setEnemy_hp: function(e) {
e < 0 && (e = 0);
if (0 == isFinite(e) || isNaN(e)) {
cc.log("数据异常");
e = 100;
}
this.enemy_hp_progressBar && (this.enemy_hp_progressBar.progress = e / 100);
if (this.enemy_plist) {
parseInt(e / 100);
var t = parseInt(e % 100 / 10), i = parseInt(e % 10);
if (100 == e) {
this.enemy_hp_labelnum_b.active = !0;
this.enemy_hp_labelnum_s.active = !0;
this.enemy_hp_labelnum_g.active = !0;
this.num_b.spriteFrame = this.enemy_plist.getSpriteFrame("1");
this.num_s.spriteFrame = this.enemy_plist.getSpriteFrame("0");
this.num_g.spriteFrame = this.enemy_plist.getSpriteFrame("0");
} else if (e >= 10 && e <= 99) {
this.enemy_hp_labelnum_b.active = !1;
this.enemy_hp_labelnum_s.active = !0;
this.enemy_hp_labelnum_g.active = !0;
this.num_s.spriteFrame = this.enemy_plist.getSpriteFrame("" + t);
this.num_g.spriteFrame = this.enemy_plist.getSpriteFrame("" + i);
} else if (e >= 0 && e <= 9) {
this.enemy_hp_labelnum_b.active = !1;
this.enemy_hp_labelnum_s.active = !1;
this.enemy_hp_labelnum_g.active = !0;
this.num_g.spriteFrame = this.enemy_plist.getSpriteFrame("" + i);
} else {
this.enemy_hp_labelnum_b.active = !1;
this.enemy_hp_labelnum_s.active = !1;
this.enemy_hp_labelnum_g.active = !0;
this.num_g.spriteFrame = this.enemy_plist.getSpriteFrame("0");
}
}
},
isShowEnemyBloodupdate: function(e) {
this.updateTimer += e;
if (this.updateTimer < this.updateInterval) ; else {
this.updateTimer = 0;
this.isShowEnemyBlood = 2;
this.playEnemy_hp_ani(2);
this.node.zIndex = 0;
}
},
playEnemy_hp_ani: function(e) {
if (7 != this.enemyId && this.enemy_hp_ani) {
1 == e && this.enemy_hp_ani.play("uni_opacity1");
2 == e && this.enemy_hp_ani.play("uni_opacity2");
}
},
playHitEnemy_hp_ani: function() {
0 == this.enemySpeed ? this.enemy_hp_barNode.active = !1 : this.enemy_hp_barNode.active = !0;
this.isShowEnemyBlood = 1;
if (1 == this.isShowEnemyBlood) {
7 == this.enemyId && this.ani_uni_scale1.play("uni_scale2");
if (this.enemy_hp_barNode.opacity > 0) {
this.updateTimer = 0;
7 != this.enemyId && this.ani_ani.play("uni_scale1");
} else this.playEnemy_hp_ani(1);
}
},
setEnemyNodeOpacity: function() {
this.enemyNode && (this.enemyNode.opacity = 0);
this.enemy_hp_barNode && (this.enemy_hp_barNode.active = !1);
this.enemySpeed = 0;
this.enemyId2StartMoveTime = 0;
},
getEnemylifes: function(e) {
return this.enemyBlood += e;
},
getPositions: function() {
return this.node.getPosition();
},
getNodeContentSize: function() {
return this.node.getContentSize();
},
getMoveToPos: function() {
if (this.moveToPos) return this.moveToPos;
},
getEnemyDistance: function(e) {
return this.distance = e;
},
getEnemyRadian: function(e) {
return this.radian = e;
},
change_angle: function(e, t) {
var i = t.x - e.x, n = t.y - e.y, a = cc.v2(i, n).signAngle(cc.v2(0, 1)) / Math.PI * 180;
a <= 0 && (a = 360 + a);
return -a;
},
getEnemy2Pos: function() {
var e = cc.v2(0, 0);
if (a.screen4ArrPos.length >= 4) {
if (e = o.getSegmentsInter(this.node.position, this.moveToPos, a.screen4ArrPos[0], a.screen4ArrPos[1])) return e;
if (e = o.getSegmentsInter(this.node.position, this.moveToPos, a.screen4ArrPos[1], a.screen4ArrPos[3])) return e;
if (e = o.getSegmentsInter(this.node.position, this.moveToPos, a.screen4ArrPos[2], a.screen4ArrPos[3])) return e;
if (e = o.getSegmentsInter(this.node.position, this.moveToPos, a.screen4ArrPos[0], a.screen4ArrPos[2])) return e;
}
return e;
},
onCollisionEnter: function(e, t) {
if ("bullet" == e.node.group && "bullet" == e.node.group) {
var i = e.node.getComponent("Bullets");
if (i) if (2 == i.getBulletId()) ; else if (4 == i.getBulletId()) {
if (0 != this.enemyNode.opacity && 2 != i.getBullet_playerData(4).player_StarLevel) {
zy.nodePoolMng.putBullet(e.node);
this.gridmaps && this.gridmaps && this.gridmaps.createFlamesBullet3_2(e.node);
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
}
} else if (8 == i.getBulletId()) {
3 == i.getBullet_playerData(8).player_StarLevel ? e.node.destroy() : zy.nodePoolMng.putBullet(e.node);
this.gridmaps && this.gridmaps && this.gridmaps.createHowitzerBullet5_1_2(e.node);
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
} else if (6 == i.getBulletId()) {
if (0 != this.enemyNode.opacity) {
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
}
} else if (66 == i.getBulletId()) {
if (0 != this.enemyNode.opacity) {
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
}
} else if (44 == i.getBulletId()) ; else if (55 == i.getBulletId()) {
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
} else if (0 == i.getBulletId()) {
0 != this.enemyNode.opacity && zy.nodePoolMng.putBullet(e.node);
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
} else if (1 == i.getBulletId() || 3 == i.getBulletId() || 5 == i.getBulletId() || 7 == i.getBulletId()) {
0 != this.enemyNode.opacity && zy.nodePoolMng.putBullet(e.node);
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
} else {
0 != this.enemyNode.opacity && e.node.destroy();
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
}
}
},
onCollisionStay: function(e, t) {
if ("bullet" == e.node.group && "bullet" == e.node.group) {
var i = e.node.getComponent("Bullets");
if (i) {
if (2 == i.getBulletId()) {
var n = e.node.getComponent(cc.Animation);
if (1 == i.getBullet_playerData(2).player_StarLevel) {
if (.7 == n.getAnimationState("gun2_1_attack").time.toFixed(2)) {
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
}
}
if (2 == i.getBullet_playerData(2).player_StarLevel) {
var o = n.getAnimationState("gun2_2_attack").time.toFixed(2);
if (.8 == o || 1 == o || 1.2 == o || 1.4 == o || 1.6 == o || 1.8 == o || 2 == o || 2.1 == o || 2.2 == o || 2.4 == o) {
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
}
}
if (3 == i.getBullet_playerData(2).player_StarLevel) {
var s = n.getAnimationState("gun2_3_attack").time.toFixed(2);
if (1.3 == s || 1.4 == s || 1.5 == s || 1.6 == s || 1.7 == s || 1.8 == s || 1.9 == s || 2 == s || 2.1 == s || 2.2 == s || 2.3 == s || 2.4 == s || 2.5 == s || 2.6 == s || 2.7 == s || 2.8 == s || 2.9 == s || 3 == s || 3.1 == s || 3.2 == s || 3.3 == s || 3.4 == s || 3.5 == s || 3.6 == s || 3.7 == s || 3.8 == s || 3.9 == s || 4 == s || 4.1 == s || 4.4 == s) {
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
}
}
}
if (4 == i.getBulletId()) {
var r = e.node.getChildByName("Bullet").getComponent(cc.Animation);
if (2 == i.getBullet_playerData(4).player_StarLevel) {
r.getAnimationState("gun_3_bullet_2_1").time.toFixed(2);
if (a.isGun_3_bullet_2Attack) {
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
}
}
}
if (44 == i.getBulletId()) {
var l = e.node.getComponent(cc.Animation);
if (1 == i.getBullet_playerData(4).player_StarLevel) {
var c = l.getAnimationState("gun_3_bullet_1_2").time.toFixed(2);
if (.3 == c || .6 == c || .9 == c) {
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
}
}
i.getBullet_playerData(4).player_StarLevel;
if (3 == i.getBullet_playerData(4).player_StarLevel) {
var h = l.getAnimationState("gun_3_bullet_3_2").time.toFixed(2);
if (.3 == h || .6 == h || .9 == h || 1.2 == h || 1.5 == h || 1.8 == h || 2.1 == h || 2.4 == h || 2.7 == h || 3 == h || 3.3 == h || 3.6 == h || 3.9 == h) {
this.playHitEnemy_hp_ani();
t.node.zIndex = 1;
}
}
}
}
}
},
setEnemySpeed: function(e) {
this.enemySpeed = e;
},
setEnemyName: function(e) {
this.enemyName = e;
},
setEnemyId: function(e) {
this.enemyId = e;
},
setEnemyAttack: function(e) {
this.enemyAttack = e;
},
setEnemyBlood: function(e) {
this.enemyBlood = e;
},
setEnemySpiralSpeed: function(e) {
this.enemySpiralSpeed = e;
},
setEnemyWavelSpeed: function(e) {
this.enemyWavelSpeed = e;
},
setEnemyOrdinaryEnemySample: function(e) {
this.enemyOrdinaryEnemySample = e;
},
setEnemyDropGold: function(e) {
this.enemyDropGold = e;
},
setEnemyFlyDropGold: function(e) {
this.enemyFlyDropGold = e;
},
setIsDivisionEnemy: function(e) {
this.isDivisionEnemy = e;
},
setIsShowEnemyBlood: function(e) {
this.isShowEnemyBlood = e;
},
setEnemyInitBlood: function(e) {
this.enemyInitBlood = e;
},
setEnemyId2StartMoveTime: function(e) {
this.enemyId2StartMoveTime = e;
},
getEnemySpeed: function() {
return this.enemySpeed;
},
getEnemyName: function() {
return this.enemyName;
},
getEnemyId: function() {
return this.enemyId;
},
getEnemyAttack: function() {
return this.enemyAttack;
},
getEnemyBlood: function() {
return this.enemyBlood;
},
getEnemySpiralSpeed: function() {
return this.enemySpiralSpeed;
},
getEnemyWavelSpeed: function() {
return this.enemyWavelSpeed;
},
getEnemyOrdinaryEnemySample: function() {
return this.enemyOrdinaryEnemySample;
},
getEnemyDropGold: function() {
return this.enemyDropGold;
},
getEnemyFlyDropGold: function() {
return this.enemyFlyDropGold;
},
getIsDivisionEnemy: function() {
return this.isDivisionEnemy;
},
getIsShowEnemyBlood: function() {
return this.isShowEnemyBlood;
},
getEnemyInitBlood: function() {
return this.enemyInitBlood;
},
getEnemyId2StartMoveTime: function() {
return this.enemyId2StartMoveTime;
}
});
cc._RF.pop();
}, {
"./../../Lib/common/UtilsOther": "UtilsOther",
GameManager: "GameManager",
Helpers: "Helpers"
} ],
FBLogger: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "dce77Wl/ahBRrf7Vl0Wh2d/", "FBLogger");
var n = "com/zygame/utils/FBHelper";
cc.Class({
statics: {
logEventLevel: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(n, "logEventLevel", "(I)V", e);
cc.sys.os, cc.sys.OS_IOS;
},
logEventWatchAds: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(n, "logEventWatchAD", "(Ljava/lang/String;)V", e);
cc.sys.os, cc.sys.OS_IOS;
},
logEventClickButton: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(n, "logEventClickButton", "(Ljava/lang/String;)V", e);
cc.sys.os, cc.sys.OS_IOS;
},
logEvent: function(e, t, i) {
if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(n, "logEvent", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", e, t, i);
cc.sys.os, cc.sys.OS_IOS;
},
logEventName: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(n, "logEventName", "(Ljava/lang/String;)V", e);
cc.sys.os, cc.sys.OS_IOS;
}
}
});
cc._RF.pop();
}, {} ],
GameConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "34fa3Y2N3BP16tOF4Nv4fU0", "GameConfig");
window.zy = window.zy || {};
window.CHANNEL_ID = 101;
window.PACKAGENAME = "com/zygame/utils/PlatformUtils";
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
cc._RF.pop();
}, {} ],
GameHttp: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8afc1m51YpB/YM/mIkdgeO+", "GameHttp");
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = "timeout", o = "error", s = "abort", r = cc.Class({
ctor: function() {
this.xhr_ = null;
this.error_ = null;
},
init: function(e) {
this.xhr_ = e;
},
isOk: function() {
var e = this.xhr_;
return 4 == e.readyState && e.status >= 200 && e.status <= 207;
},
getBody: function() {
return this.xhr_.response;
},
setError: function(e) {
this.error_ = e;
},
getError: function() {
return this.error_;
},
getHeaders: function() {},
getHeader: function(e) {}
}), l = function(e, t) {
var i = new r();
i.init(e);
e.onreadystatechange = function(n) {
4 == e.readyState && t(i);
};
e.ontimeout = function(e) {
i.setError(a);
t(i);
};
e.onerror = function(e) {
i.setError(o);
t(i);
};
e.onabort = function(e) {
i.setError(s);
t(i);
};
};
t.exports = {
httpGet: function(e, t, i) {
var n = cc.loader.getXMLHttpRequest();
n.timeout = i || 5e3;
t && l(n, t);
n.open("GET", e, !0);
n.send();
},
httpPost: function(e, t, i, a) {
var o = cc.loader.getXMLHttpRequest();
o.timeout = a || 5e3;
i && l(o, i);
o.open("POST", e, !0);
o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
cc.log("===>httpPost: " + ("undefined" == typeof t ? "undefined" : n(t)) + " | " + JSON.stringify(t));
o.send(t);
}
};
cc._RF.pop();
}, {} ],
GameManager: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6db96I6UQtM04KqHsxFfgWj", "GameManager");
var n = e("../Datas/LevelData"), a = e("../Datas/EnemyData"), o = e("../Datas/PlayerData"), s = e("Encrypt"), r = e("MKSystem");
t.exports = {
playerUid: null,
playerLifes: 0,
playerGold: 200,
playerDiamond: 0,
playerPower: 0,
playerLevel: 1,
playerSkillTotalTime: 0,
playerSkillUseTime: 0,
playerAttack: {
attackModes: 1,
attackLevel: 1
},
passCurLevel: !1,
secretkey: "androidTowerDefenseGame",
userData: {},
GRIDMAP_TOTALNUM: 9,
GRIDMAP_WIDTH: 139,
GRIDMAP_HEIGHT: 139,
screen4ArrPos: [],
isZoomRatio: !1,
ENEMY_TOTALNUM: 8,
produceEnemyPosNums: 56,
produceEnemyPos: [],
enemyDropGold: 0,
WEAPON_TOTALNUM: 9,
WEAPON_ID: -1,
WEAPON_GATLING: 0,
WEAPON_LASERCANNON_1: 1,
WEAPON_ICEGUN: 2,
WEAPON_LASERCANNON_3: 3,
WEAPON_FLAMES: 4,
WEAPON_LASERCANNON_5: 5,
WEAPON_RAILGUN: 6,
WEAPON_LASERCANNON_7: 7,
WEAPON_HOWITZER: 8,
WEAPON_zIndex: 5,
BULLET_zIndex: 5,
BULLET_SPECIAL_zIndex: 4,
clickCurrWEAPON_zIndex: 5,
player_StarLevelArray: [],
player_StarLevelNeedArray: [],
player_UpgradeprogressBarIndex: 0,
player_UpgradeprogressNum: 0,
isTrackingAttack: !1,
isStartGenZong: !1,
isAutoDartsAttack: !0,
isCreateDartsRevolution: !1,
dartsRevolutionArray: [],
operationLastTaID: -1,
ATTACKMODES: 0,
MANUALATTACK: 0,
COLLABORATIVEATTACK: 1,
AUTOMATICATTACK: 2,
COLLABORATIVEATTACK_LEVEL: -1,
COLLABORATIVEATTACK_LEVEL_1: 1,
COLLABORATIVEATTACK_LEVEL_2: 2,
COLLABORATIVEATTACK_LEVEL_3: 3,
cooperativeAttack_Level_3_Angle: 0,
isGun_3_bullet_2Attack: !1,
isStartSkillCountdown: !1,
isAniCallBack: !1,
startOperatePlayer: !1,
weaponTotalNums: -1,
gamePaused: !1,
gameResurrectionIndex: 0,
isFirstBoss: 0,
bossHp: 0,
isBossLevel: !1,
isBossDie: !1,
bossLevelFollowingCameraDeviationY: 250,
levelDataStr: "",
levelEnemyWaveDataStr: "",
levelDataArrays: [],
levelEnemyWaveDataArrays: [],
levelDataArray: [],
levelEnemyWaveDataArray: [],
level: 0,
levelData: [],
levelName: 0,
themeID: 0,
enemyTotal: 0,
enemyTotalBlood: 0,
enemyBossTotalBlood: 0,
enemyInterval: 0,
gold: 0,
enemyGroup: [],
group: 0,
maxGroup: 0,
_groupIndex: 0,
_teamIndex: 0,
_teamCount: 0,
_teamEnemyCount: 0,
_teamEnemyIndex: 0,
isEnemyGetFinish: !1,
_enemyDataArray: [],
currEnemyDataPool: [],
currEnemyPool: [],
currBulletPool: [],
isOver: !1,
isGameOver: !1,
load_LevelData: function(e) {
this.level = e;
this.levelData = n.LevelData[e];
this.levelName = this.levelData.levelName;
this.themeID = this.levelData.themeID;
this.enemyTotal = this.levelData.enemyTotal;
this.enemyTotalBlood = this.levelData.enemyTotalBlood;
this.enemyInterval = this.levelData.enemyInterval;
this.gold = this.levelData.gold;
this.enemyGroup = this.levelData.enemyGroup;
this.group = 0;
this.maxGroup = this.enemyGroup.length - 1;
this._groupIndex = 0;
this._teamIndex = 0;
this._teamCount = this.enemyGroup[0].team.length - 1;
this._teamEnemyIndex = 0;
this._teamEnemyCount = this.enemyGroup[0].team[0].count - 1;
this.isEnemyGetFinish = !1;
this._enemyDataArray = [];
this.currEnemyDataPool = [];
this.currEnemyPool = [];
this.currBulletPool = [];
this.isOver = !1;
this.isGameOver = !1;
this._loadEnemyData();
},
_loadEnemyData: function() {
var e = void 0, t = void 0, i = void 0, n = {};
this._enemyDataArray = [];
for (e = 0; e < this.enemyGroup.length; e++) {
this._enemyDataArray[e] = [];
for (t = 0; t < this.enemyGroup[e].team.length; t++) for (i = 0; i < this.enemyGroup[e].team[t].count; i++) {
n = this._getNextEnemyData();
this._enemyDataArray[e].push(n);
}
}
},
_getNextEnemyData: function() {
if (1 != this.isEnemyGetFinish) {
var e = this.enemyGroup[this._groupIndex].team[this._teamIndex], t = {};
t.group = this._groupIndex;
t.count = e.count;
t.enemyBloodPercentage = e.enemyBloodPercentage;
t.index = this._teamEnemyIndex;
this._teamEnemyIndex++;
this._teamEnemyIndex > this._teamEnemyCount && this._enterNextTeam();
return t;
}
cc.log("GameManager._getNextEnemyData() : 所有怪物数据已经获取完毕！");
},
_enterNextTeam: function() {
this._teamEnemyIndex = 0;
this._teamIndex++;
this._teamIndex > this._teamCount ? this._enterNextGroup() : this._teamEnemyCount = this.enemyGroup[this._groupIndex].team[this._teamIndex].count - 1;
},
popNextMonsterGroupData: function() {
var e = [];
if (this.group <= this.maxGroup) {
this.group++;
e = this._enemyDataArray[0];
this._enemyDataArray.splice(0, 1);
} else e = [];
return e;
},
_enterNextGroup: function() {
this._groupIndex++;
if (this._groupIndex > this.maxGroup) this.isEnemyGetFinish = !0; else {
this._teamIndex = 0;
this._teamCount = this.enemyGroup[this._groupIndex].team.length - 1;
this._teamEnemyIndex = 0;
this._teamEnemyCount = this.enemyGroup[this._groupIndex].team[this._teamIndex].count - 1;
}
},
getCurrGroupEnemySum: function() {
for (var e = 0, t = this.enemyGroup[this.group - 1].team, i = 0; i < t.length; i++) e += t[i].count;
return e;
},
getCurrGroupEnemyBloodPercentage: function() {
for (var e = 0, t = this.enemyGroup[this.group - 1].team, i = 0; i < t.length; i++) e += t[i].enemyBloodPercentage;
return e;
},
getEnemyiDWeight: function() {
for (var e = [], t = 0; t < this.enemyGroup[this.group - 1].enemyiDWeight.length; t++) e.push(this.enemyGroup[this.group - 1].enemyiDWeight[t]);
if (0 == e.length || null == e) {
for (var i = 0; i < 5; i++) e.push(20);
return e;
}
return e;
},
getSmallWaveEnemyAttribute: function() {
for (var e = [], t = 0; t < this.enemyGroup[this.group - 1].teamGeneratingrule.length; t++) e.push(this.enemyGroup[this.group - 1].teamGeneratingrule[t]);
if (0 == e.length || null == e) {
for (var i = 0, n = 0; n < 4; n++) {
0 == n ? i = 1 : 1 == n ? i = 1 : 2 == n ? i = 0 : 3 == n && (i = 55);
e.push(i);
}
return e;
}
return e;
},
getLevelTotalNum: function() {
var e = zy.dataMng.levelsData;
if (e) return e.getLevelsTotalNum() - 1;
var t = 50;
null == this.levelDataStr && "" == this.levelDataStr || (t = this.levelDataStr.split(";").length - 1);
return t - 1;
},
initLevelData: function() {
this.getLocalLevelData();
this.getLocalLevelEnemyWaveData();
},
getLocalLevelData: function() {
this.levelDataArrays = [];
null == this.levelDataStr && "" == this.levelDataStr || (this.levelDataArrays = this.levelDataStr.split(";"));
},
getLocalLevelEnemyWaveData: function() {
this.levelEnemyWaveDataArrays = [];
null == this.levelEnemyWaveDataStr && "" == this.levelEnemyWaveDataStr || (this.levelEnemyWaveDataArrays = this.levelEnemyWaveDataStr.split(";"));
},
getCurrSkillTime: function() {
var e = this.getPlayerSkillTotalTime() - this.getPlayerSkillUseTime();
e <= 0 && (e = 0);
return e;
},
load_LevelData_new: function(e) {
var t = e + 1e4, i = zy.dataMng.levelsData.getLevelsDatar(t);
if (i) {
this.wave = parseInt(i.wave);
this.hp = parseInt(i.hp);
this.number = parseInt(i.number);
this.goldreward = parseInt(i.gold);
var n = zy.dataMng.levelsEnemyWaveData.getLevelsEnemyWaveDatar(t);
this.level = e;
this.themeID = t;
this.maxGroup = this.wave - 1;
this.enemyTotalBlood = this.hp;
this.enemyTotal = this.number;
this.gold = this.goldreward;
this.enemyInterval = .1;
this.enemyGroup = n;
this.group = 0;
this._groupIndex = 0;
this._teamIndex = 0;
this._teamCount = 0;
this._teamEnemyIndex = 0;
this._teamEnemyCount = parseInt(this.enemyGroup[0][2]) - 1;
this.isEnemyGetFinish = !1;
this._enemyDataArray = [];
this.currEnemyDataPool = [];
this.currEnemyPool = [];
this.currBulletPool = [];
this.isOver = !1;
this.isGameOver = !1;
this._loadEnemyData_new();
} else {
this.levelDataArray = [];
this.levelEnemyWaveDataArray = [];
for (var a = this.levelDataArrays[e].split(","), o = 0; o < a.length; o++) this.levelDataArray.push(a[o]);
for (var s = this.levelDataArray[0], r = 0; r < this.levelEnemyWaveDataArrays.length; r++) {
var l = this.levelEnemyWaveDataArrays[r].split(",");
parseInt(s) == parseInt(l[0]) && this.levelEnemyWaveDataArray.push(l);
}
this.level = e;
this.levelData = this.levelDataArray;
this.themeID = parseInt(this.levelData[0]);
this.maxGroup = parseInt(this.levelData[1]) - 1;
this.enemyTotalBlood = parseInt(this.levelData[2]);
this.enemyTotal = parseInt(this.levelData[3]);
this.gold = parseInt(this.levelData[4]);
this.enemyInterval = .1;
this.enemyGroup = this.levelEnemyWaveDataArray;
this.group = 0;
this._groupIndex = 0;
this._teamIndex = 0;
this._teamCount = 0;
this._teamEnemyIndex = 0;
this._teamEnemyCount = parseInt(this.enemyGroup[0][2]) - 1;
this.isEnemyGetFinish = !1;
this._enemyDataArray = [];
this.currEnemyDataPool = [];
this.currEnemyPool = [];
this.currBulletPool = [];
this.isOver = !1;
this.isGameOver = !1;
this._loadEnemyData_new();
}
},
_loadEnemyData_new: function() {
var e = void 0, t = void 0, i = void 0, n = {};
this._enemyDataArray = [];
for (e = 0; e < this.enemyGroup.length; e++) {
this._enemyDataArray[e] = [];
for (t = 0; t < 1; t++) for (i = 0; i < parseInt(this.enemyGroup[e][2]); i++) {
n = this._getNextEnemyData_new();
this._enemyDataArray[e].push(n);
}
}
},
_getNextEnemyData_new: function() {
if (1 != this.isEnemyGetFinish) {
var e = {};
e.group = this._groupIndex;
e.count = parseInt(this.enemyGroup[this._groupIndex][2]);
e.enemyBloodPercentage = parseInt(this.enemyGroup[this._groupIndex][3]) / 100;
e.index = this._teamEnemyIndex;
this._teamEnemyIndex++;
this._teamEnemyIndex > this._teamEnemyCount && this._enterNextTeam_new();
return e;
}
cc.log("GameManager._getNextEnemyData() : 所有怪物数据已经获取完毕！");
},
_enterNextTeam_new: function() {
this._teamEnemyIndex = 0;
this._teamIndex++;
this._teamIndex > this._teamCount ? this._enterNextGroup_new() : this._teamEnemyCount = parseInt(this.enemyGroup[this._groupIndex][2]) - 1;
},
popNextMonsterGroupData_new: function() {
var e = [];
if (this.group <= this.maxGroup) {
this.group++;
e = this._enemyDataArray[0];
this._enemyDataArray.splice(0, 1);
} else e = [];
return e;
},
_enterNextGroup_new: function() {
this._groupIndex++;
if (this._groupIndex > this.maxGroup) this.isEnemyGetFinish = !0; else {
this._teamIndex = 0;
this._teamCount = 0;
this._teamEnemyIndex = 0;
this._teamEnemyCount = parseInt(this.enemyGroup[this._groupIndex][2]) - 1;
}
},
getCurrGroupEnemySum_new: function() {
return parseInt(this.enemyGroup[this.group - 1][2]);
},
getCurrGroupEnemyBloodPercentage_new: function() {
return parseInt(this.enemyGroup[this.group - 1][3]) / 100;
},
getEnemyiDWeight_new: function() {
for (var e = [], t = 9; t <= 21; t += 2) e.push(parseInt(this.enemyGroup[this.group - 1][t]));
if (0 == e.length || null == e) {
for (var i = 0; i < 5; i++) e.push(20);
return e;
}
return e;
},
getEnemySkinWeight_new: function() {
var e = [];
if (this.level > 699) {
for (var t = 0; t < 7; t++) e.push(15);
return e;
}
var i = this.level + 1e4, n = zy.dataMng.levelsData.getLevelsDatar(i);
if (n) {
var a = Number(n.weights1), o = Number(n.weights2), s = Number(n.weights3), r = Number(n.weights4), l = Number(n.weights5), c = Number(n.weights6), h = Number(n.weights7);
e.push(a);
e.push(o);
e.push(s);
e.push(r);
e.push(l);
e.push(c);
e.push(h);
return e;
}
if (0 == e.length || null == e) {
for (var u = 0; u < 7; u++) e.push(15);
return e;
}
},
getSmallWaveEnemyAttribute_new: function() {
for (var e = [], t = 4; t <= 7; t++) e.push(parseInt(this.enemyGroup[this.group - 1][t]));
if (0 == e.length || null == e) {
for (var i = 0, n = 0; n < 4; n++) {
0 == n ? i = 1 : 1 == n ? i = 1 : 2 == n ? i = 0 : 3 == n && (i = 55);
e.push(i);
}
return e;
}
return e;
},
getEnemy_Movingspeed: function(e) {
return a.EnemyData[e].enemy_Movingspeed;
},
getEnemy_Attack: function(e) {
return a.EnemyData[e].enemy_Attack;
},
getPlayersData: function(e) {
return this.getlocalStorageJsonData(this.secretkey, s, "PlayerData" + e);
},
setPlayersData: function(e, t) {
this.setlocalStorageJsonData(this.secretkey, s, "PlayerData" + e, t);
},
getIsBossLevelToMultiple: function() {
var e = zy.dataMng.levelsData.getLevelsDatar(this.getLevel() + 1e4);
if (e) {
return Number(e.multiple);
}
return 0;
},
setGamePauseLogic: function(e) {
if (e) {
this.setIsGameOver(!0);
this.setGamePaused(!0);
this.gameResetData(!1);
} else {
this.setIsGameOver(!1);
this.setGamePaused(!1);
this.gameResetData(!0);
}
return e;
},
gameResetData: function(e) {
this.isTrackingAttack = e;
this.isCreateDartsRevolution = e;
this.startOperatePlayer = e;
this.isStartSkillCountdown = e;
},
getLevelDataStr: function() {
return this.levelDataStr;
},
setLevelDataStr: function(e) {
this.levelDataStr = e;
},
getLevelEnemyWaveDataStr: function() {
return this.levelEnemyWaveDataStr;
},
setLevelEnemyWaveDataStr: function(e) {
this.levelEnemyWaveDataStr = e;
},
getPlayerUid: function() {
return this.getlocalStorageData(this.secretkey, s, "PlayerUid");
},
setPlayerUid: function(e) {
this.playerUid = e;
this.setlocalStorageData(this.secretkey, s, "PlayerUid", this.playerUid);
},
getPlayerLifes: function() {
return this.playerLifes;
},
setPlayerLifes: function(e) {
this.playerLifes = e;
},
getPlayerGold: function() {
var e = this.getlocalStorageData(this.secretkey, s, "PlayerGold");
return parseInt(e);
},
setPlayerGold: function(e) {
this.playerGold = e;
this.setlocalStorageData(this.secretkey, s, "PlayerGold", this.playerGold);
},
getPlayerDiamond: function() {
var e = this.getlocalStorageData(this.secretkey, s, "PlayerDiamond");
return parseInt(e);
},
setPlayerDiamond: function(e) {
this.playerDiamond = e;
this.setlocalStorageData(this.secretkey, s, "PlayerDiamond", this.playerDiamond);
},
getPlayerPower: function() {
var e = this.getlocalStorageData(this.secretkey, s, "PlayerPower");
return parseInt(e);
},
setPlayerPower: function(e) {
this.playerPower = e;
this.setlocalStorageData(this.secretkey, s, "PlayerPower", this.playerPower);
},
getPlayerLevel: function() {
var e = this.getlocalStorageData(this.secretkey, s, "PlayerLevel");
return parseInt(e);
},
setPlayerLevel: function(e) {
this.playerLevel = e;
this.setlocalStorageData(this.secretkey, s, "PlayerLevel", this.playerLevel);
},
getPlayerSkillTotalTime: function() {
var e = this.getlocalStorageData(this.secretkey, s, "PlayerSkillTotalTime");
return parseInt(e);
},
setPlayerSkillTotalTime: function(e) {
this.playerSkillTotalTime = e;
this.setlocalStorageData(this.secretkey, s, "PlayerSkillTotalTime", this.playerSkillTotalTime);
},
getPlayerSkillUseTime: function() {
var e = this.getlocalStorageData(this.secretkey, s, "PlayerSkillUseTime");
return parseInt(e);
},
setPlayerSkillUseTime: function(e) {
this.playerSkillUseTime = e;
this.setlocalStorageData(this.secretkey, s, "PlayerSkillUseTime", this.playerSkillUseTime);
},
getPlayer_UpgradeprogressBarIndex: function() {
var e = this.getlocalStorageData(this.secretkey, s, "Player_UpgradeprogressBarIndex");
return parseInt(e);
},
setPlayer_UpgradeprogressBarIndex: function(e) {
this.player_UpgradeprogressBarIndex = e;
this.setlocalStorageData(this.secretkey, s, "Player_UpgradeprogressBarIndex", this.player_UpgradeprogressBarIndex);
},
getPlayer_UpgradeprogressNum: function() {
var e = this.getlocalStorageData(this.secretkey, s, "Player_UpgradeprogressNum");
return parseInt(e);
},
setPlayer_UpgradeprogressNum: function(e) {
this.player_UpgradeprogressNum = e;
this.setlocalStorageData(this.secretkey, s, "Player_UpgradeprogressNum", this.player_UpgradeprogressNum);
},
getOperationLastTaID: function() {
var e = this.getlocalStorageData(this.secretkey, s, "OperationLastTaID");
return parseInt(e);
},
setOperationLastTaID: function(e) {
this.operationLastTaID = e;
this.setlocalStorageData(this.secretkey, s, "OperationLastTaID", this.operationLastTaID);
},
getLevel: function() {
var e = this.getlocalStorageData(this.secretkey, s, "Level");
return parseInt(e);
},
setLevel: function(e) {
this.level = e;
this.setlocalStorageData(this.secretkey, s, "Level", this.level);
},
getIsFirstBoss: function() {
var e = this.getlocalStorageData(this.secretkey, s, "IsFirstBoss");
return parseInt(e);
},
setIsFirstBoss: function(e) {
this.isFirstBoss = e;
this.setlocalStorageData(this.secretkey, s, "IsFirstBoss", this.isFirstBoss);
},
getBossHp: function() {
var e = this.getlocalStorageData(this.secretkey, s, "BossHp");
return parseInt(e);
},
setBossHp: function(e) {
this.bossHp = e;
this.setlocalStorageData(this.secretkey, s, "BossHp", this.bossHp);
},
getPlayerAttack: function() {
return this.getlocalStorageJsonData(this.secretkey, s, "PlayerAttack");
},
setPlayerAttack: function(e) {
this.playerAttack = e;
this.setlocalStorageJsonData(this.secretkey, s, "PlayerAttack", this.playerAttack);
},
getUserData: function() {
return this.getlocalStorageJsonData(this.secretkey, s, "UserData");
},
setUserData: function(e) {
this.userData = e;
this.setlocalStorageJsonData(this.secretkey, s, "UserData", this.userData);
},
getLevelName: function() {
return this.levelName;
},
setLevelName: function(e) {
this.levelName = e;
},
getLevelData: function() {
return this.levelData;
},
setLevelData: function(e) {
this.levelData = e;
},
getThemeID: function() {
return this.themeID;
},
setThemeID: function(e) {
this.themeID = e;
},
getEnemyTotal: function() {
return this.enemyTotal;
},
setEnemyTotal: function(e) {
this.enemyTotal = e;
},
getEnemyTotalBlood: function() {
return this.enemyTotalBlood;
},
setEnemyTotalBlood: function(e) {
this.enemyTotalBlood = e;
},
getEnemyBossTotalBlood: function() {
return this.enemyBossTotalBlood;
},
setEnemyBossTotalBlood: function(e) {
this.enemyBossTotalBlood = e;
},
getEnemyInterval: function() {
return this.enemyInterval;
},
setEnemyInterval: function(e) {
this.enemyInterval = e;
},
getGold: function() {
return this.gold;
},
setGold: function(e) {
this.gold = e;
},
getEnemyGroup: function() {
return this.enemyGroup;
},
setEnemyGroup: function(e) {
this.enemyGroup = e;
},
getGroup: function() {
return this.group;
},
setGroup: function(e) {
this.group = e;
},
getMaxGroup: function() {
return this.maxGroup;
},
setMaxGroup: function(e) {
this.maxGroup = e;
},
getIsOver: function() {
return this.isOver;
},
setIsOver: function(e) {
this.isOver = e;
},
getIsGameOver: function() {
return this.isGameOver;
},
setIsGameOver: function(e) {
this.isGameOver = e;
},
getGamePaused: function() {
return this.gamePaused;
},
setGamePaused: function(e) {
this.gamePaused = e;
},
getCurrEnemyDataPool: function() {
return this.currEnemyDataPool;
},
setlocalStorageData: function(e, t, i, n) {
cc.sys.localStorage.setItem(i + zy.constData.StaticKey.SaveDataVersion, n);
},
getlocalStorageData: function(e, t, i) {
return cc.sys.localStorage.getItem(i + zy.constData.StaticKey.SaveDataVersion);
},
setlocalStorageJsonData: function(e, t, i, n) {
var a = JSON.stringify(n);
cc.sys.localStorage.setItem(i + zy.constData.StaticKey.SaveDataVersion, a);
},
getlocalStorageJsonData: function(e, t, i) {
var n = cc.sys.localStorage.getItem(i + zy.constData.StaticKey.SaveDataVersion);
return JSON.parse(n);
},
initPlayerUid: function() {
this.setlocalStorageData(this.secretkey, s, "PlayerUid", this.playerUid);
this.setPlayerUid(r.getMobilePhoneID());
},
initPlayerGold: function() {
this.setlocalStorageData(this.secretkey, s, "PlayerGold", this.playerGold);
},
initPlayerDiamond: function() {
this.setlocalStorageData(this.secretkey, s, "PlayerDiamond", this.playerDiamond);
},
initPlayerPower: function() {
this.setlocalStorageData(this.secretkey, s, "PlayerPower", this.playerPower);
},
initPlayerLevel: function() {
this.setlocalStorageData(this.secretkey, s, "PlayerLevel", this.playerLevel);
},
initPlayerSkillTotalTime: function() {
this.setlocalStorageData(this.secretkey, s, "PlayerSkillTotalTime", this.playerSkillTotalTime);
},
initPlayerSkillUseTime: function() {
this.setlocalStorageData(this.secretkey, s, "PlayerSkillUseTime", this.playerSkillUseTime);
},
initPlayer_UpgradeprogressBarIndex: function() {
this.setlocalStorageData(this.secretkey, s, "Player_UpgradeprogressBarIndex", this.player_UpgradeprogressBarIndex);
},
initPlayer_UpgradeprogressNum: function() {
this.setlocalStorageData(this.secretkey, s, "Player_UpgradeprogressNum", this.player_UpgradeprogressNum);
},
initOperationLastTaID: function() {
this.setlocalStorageData(this.secretkey, s, "OperationLastTaID", this.operationLastTaID);
},
initGetLevel: function() {
this.setlocalStorageData(this.secretkey, s, "Level", this.level);
},
initGetIsFirstBoss: function() {
this.setlocalStorageData(this.secretkey, s, "IsFirstBoss", this.isFirstBoss);
},
initGetBossHp: function() {
this.setlocalStorageData(this.secretkey, s, "BossHp", this.bossHp);
},
initPlayerAttack: function() {
this.setlocalStorageJsonData(this.secretkey, s, "PlayerAttack", this.playerAttack);
},
initUserData: function() {
this.setlocalStorageJsonData(this.secretkey, s, "UserData", this.userData);
},
initPlayersData: function() {
for (var e = 0; e < this.WEAPON_TOTALNUM; e++) this.setlocalStorageJsonData(this.secretkey, s, "PlayerData" + e, o.PlayerData[e]);
},
initPlayersAttack: function() {
var e = zy.dataMng.turretData;
if (e) for (var t = 0; t < this.WEAPON_TOTALNUM; t++) {
var i = this.getPlayersData(t);
i.player_Attack = Number(e.getTurretAttack(t + 1, 1, 1));
this.setPlayersData(t, i);
}
},
initData: function() {
this.initPlayerUid();
this.initPlayerGold();
this.initPlayerDiamond();
this.initPlayerPower();
this.initPlayerLevel();
this.initGetIsFirstBoss();
this.initGetBossHp();
this.initPlayerSkillTotalTime();
this.initPlayerSkillUseTime();
this.initPlayer_UpgradeprogressBarIndex();
this.initPlayer_UpgradeprogressNum();
this.initOperationLastTaID();
this.initGetLevel();
this.initPlayerAttack();
this.initPlayersData();
this.initPlayersAttack();
}
};
cc._RF.pop();
}, {
"../Datas/EnemyData": "EnemyData",
"../Datas/LevelData": "LevelData",
"../Datas/PlayerData": "PlayerData",
Encrypt: "Encrypt",
MKSystem: "MKSystem"
} ],
GameUI: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "512a1QmhldPZ6tbBUYQ28Pm", "GameUI");
e("GameManager");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
onShow: function() {
cc.log("on game ui show ani complete.");
}
});
cc._RF.pop();
}, {
GameManager: "GameManager"
} ],
Gridmaps: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d58fcdegrdGtalX9umg4DNM", "Gridmaps");
var n = cc.Enum({
Build_null: 0,
Build_ok: 1
}), a = e("Helpers"), o = e("GameManager"), s = e("MKSystem");
cc.Class({
extends: cc.Component,
properties: {
maps: {
default: null,
type: cc.Node
},
UINode: {
default: null,
type: cc.Node
},
gridmaps: {
default: null,
type: cc.Node
},
gridmapsNode: {
default: [],
type: cc.Node
},
gridMapsPos: {
default: [],
type: cc.Vec2
},
buildType: {
default: n.Build_null,
type: n
},
playerPrefabArray: {
default: [],
type: cc.Prefab
},
upgradePre: cc.Prefab,
upgradePreNode: null,
currentPlayerArray: [],
gridId: -1,
gridIdBuild_ok: -1,
gridisHavePlayer: [],
playersBuild_okArray: [],
playersAutoAttackArray: [],
gridmapTotal: 0,
weaponTotal: 0,
followingCamera: {
default: null,
type: cc.Camera
},
isFollowingCamera: !1,
followingCameraSpeed: 200,
followingTargetpoint: -1,
lerpratio: .1,
_updateProgress_bar: !1,
build_grid_mask_AnimationPrefab: null,
build_grid_mask_AnimationNode: null,
upgrade_barPrefab: null,
upgrade_barNode: null,
upgrade_choosePrefab: null,
upgrade_chooseNode: null,
upgrade_star_uiPrefab: null,
upgrade_star_uiNode: null,
tipsPrefab: null,
tipsNode: null,
upgrade_Build_BarPrefab: null,
upgrade_Build_BarNode: null,
initAttack_modePrefab: null,
initAttack_modeNode: null,
initAimPrefab: null,
initAimNode: null,
WeaponGatlingNode: null,
WeaponLaserCannonNode: null,
WeaponIcegunNode: null,
WeaponFlamesNode: null,
WeaponRailgunNode: null,
WeaponHowitzerNode: null,
WeaponLaserCannonNode3: null,
WeaponLaserCannonNode5: null,
WeaponLaserCannonNode7: null,
currPlayer: null,
main_plist: null,
gun_plist: null,
enemy_plist: null,
mask_UI_Prefab: null,
mask_UI_Node: null,
main_UI_Prefab: null,
main_UI_Node: null,
game_UI_Prefab: null,
game_UI_Node: null,
complete_UI_Prefab: null,
complete_UI_Node: null,
warning_UI_bossPrefab: null,
skillBtn1: null,
skillBtn2: null,
skillBtn3: null,
skillBtn4: null
},
onLoad: function() {
this.gridmapTotal = o.GRIDMAP_TOTALNUM;
this.weaponTotal = o.WEAPON_TOTALNUM;
this._urls = {
Main: "MainGame/Atlas/main",
Gun: "MainGame/Atlas/gun",
Enemy: "MainGame/Atlas/enemy",
Players: "MainGame/Players",
Build: "MainGame/Build/build",
Upgrade_bar: "MainGame/Build/upgrade_bar",
Upgrade_build_bar: "MainGame/Build/upgrade_build_bar",
Upgrade_choose: "MainGame/Build/upgrade_choose",
Upgrade_star_ui: "MainGame/Build/upgrade_star_ui",
Attack_mode: "MainGame/Ui/attack_mode",
Aim: "MainGame/Ui/aim",
Mask: "MainGame/Ui/mask",
Main_ui: "MainGame/Ui/main_ui",
Game_ui: "MainGame/Ui/game_ui",
Complete_ui: "MainGame/Ui/complete_ui",
Tips: "MainGame/Ui/tips",
Warning_UI_boss: "MainGame/Ui/Warning_UI_boss"
};
this.audioMng = cc.find("Canvas/AudioMng").getComponent("AudioMng");
this.initUI();
},
start: function() {
zy.AdHelper.initAdSdk();
zy.httpProxy.login();
zy.httpProxy.sendDataEventZCUC({
eventname: "Active"
});
zy.LogHelper.logEventLogin(s.getMobilePhoneID());
},
initUI: function() {
this.Enemygenerator = cc.find("Canvas/Enemygenerators/Enemygenerator").getComponent("Enemygenerator");
console.log("initUI initOK");
this.initGun_plist();
},
initGun_plist: function() {
this.gun_plist || cc.loader.loadRes(this._urls.Gun, cc.SpriteAtlas, this.loadGun_plistCallBack.bind(this));
},
loadGun_plistCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.gun_plist = t;
if (this.gun_plist) {
console.log("gun_plist initOK");
this.initEnemy_plist();
this.initMainPlist();
this.initMask_UI();
this.initBuild_grid_mask_Animation();
this.initUpgrade_bar();
this.initUpgrade_choose();
this.initUpgrade_star_ui();
this.initTips();
this.initUpgrade_Build_Bar();
this.initWarning_UI_boss();
}
}
},
initEnemy_plist: function() {
this.enemy_plist || cc.loader.loadRes(this._urls.Enemy, cc.SpriteAtlas, this.loadEnemy_plistCallBack.bind(this));
},
loadEnemy_plistCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.enemy_plist = t;
this.enemy_plist && console.log("enemy_plist initOK");
}
},
initMainPlist: function() {
this.main_plist || cc.loader.loadRes(this._urls.Main, cc.SpriteAtlas, this.loadMainPlistCallBack.bind(this));
},
loadMainPlistCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.main_plist = t;
if (this.main_plist) {
console.log("main_plist initOK");
this.initunlockingWeapons_By_Level();
this.initCollaborativeAttack_Level_3_DataArray();
this.initfollowingCamera();
this.initGridmap();
this.initPlayers();
o.initLevelData();
}
}
},
initMask_UI: function() {
this.mask_UI_Prefab || cc.loader.loadRes(this._urls.Mask, this.loadMask_UICallBack.bind(this));
},
loadMask_UICallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.mask_UI_Prefab = t;
this.mask_UI_Prefab && console.log("Mask_UI initOK");
}
},
createMask_UI: function() {
return cc.instantiate(this.mask_UI_Prefab);
},
initMain_UI: function() {
this.main_UI_Prefab || cc.loader.loadRes(this._urls.Main_ui, this.loadMain_UICallBack.bind(this));
},
loadMain_UICallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.main_UI_Prefab = t;
if (this.main_UI_Prefab) {
console.log("Main_UI initOK");
if (null == this.main_UI_Node) {
this.main_UI_Node = this.createMain_UI();
this.UINode.addChild(this.main_UI_Node);
if (this.main_UI_Node) {
this.initMain_UIGetComponent();
this.initMain_UI_Btn();
this.startAni_Main_UI("ui_1_show");
}
}
}
}
},
createMain_UI: function() {
return cc.instantiate(this.main_UI_Prefab);
},
initMain_UIGetComponent: function() {
var e = this.main_UI_Node.getChildByName("top");
this.Main_UI_level = e.getChildByName("level");
this.Main_UI_level1 = this.Main_UI_level.getChildByName("1").getChildByName("label1").getComponent(cc.Label);
this.Main_UI_level2 = this.Main_UI_level.getChildByName("2").getChildByName("label2").getComponent(cc.Label);
this.Main_UI_level3 = this.Main_UI_level.getChildByName("3").getChildByName("label3").getComponent(cc.Label);
this.Main_UI_top_level = e.getChildByName("top_level").getChildByName("ui_power_icon").getChildByName("label").getComponent(cc.Label);
this.Main_UI_top_level_num = e.getChildByName("top_level").getChildByName("num").getComponent(cc.Label);
this.Main_UI_top_level_Progress_bar = e.getChildByName("top_level").getComponent("ProgressBar");
this.Main_UI_top_power = e.getChildByName("top_power").getChildByName("label").getComponent(cc.Label);
this.Main_UI_top_gold = e.getChildByName("top_gold").getChildByName("label").getComponent(cc.Label);
this.Main_UI_top_diamond = e.getChildByName("top_diamond").getChildByName("label").getComponent(cc.Label);
this.Main_UI_top_power_time = e.getChildByName("top_power").getChildByName("alarm").getComponent(cc.Label);
},
initMain_UI_Btn: function() {
this.start_game = this.main_UI_Node.getChildByName("start_game");
var e = this.main_UI_Node.getChildByName("top");
this.top_level = e.getChildByName("top_level");
this.top_power = e.getChildByName("top_power");
this.top_gold = e.getChildByName("top_gold");
this.top_diamond = e.getChildByName("top_diamond");
this.set = e.getChildByName("set");
console.log("initMain_UI_Btn initMain_UIOK");
this.initMain_UI_BtnEvent();
},
initMain_UI_BtnEvent: function() {
var e = this;
e.initTowerbuilding();
e.start_game.on(cc.Node.EventType.TOUCH_END, function(t) {
zy.audioMng.playButtonAudio();
if (o.getLevel() > o.getLevelTotalNum()) cc.log("通关了哈哈"); else {
cc.log("开始游戏按钮");
o.passCurLevel = !1;
if (zy.dataMng.userData.phPower < zy.constData.PhCost) zy.director.createPop("MainGame/Ui/BuyEnergyPop"); else {
o.enemyDropGold = 0;
o.setPlayerLifes(Number(zy.dataMng.hpUpData.getHP(zy.dataMng.userData.hpLevel)));
o.gameResurrectionIndex = 0;
e.map.translateBg();
e.start_game.active = !1;
zy.dataMng.userData.phPower -= zy.constData.PhCost;
e.updatePhPower();
e.startAni_Main_UI("ui_1_go");
e.initAttack_mode();
o.setIsOver(!1);
o.isZoomRatio = !0;
0 == o.getIsBossLevelToMultiple() ? o.isBossLevel = !1 : o.isBossLevel = !0;
if (e.Enemygenerator && e.Enemygenerator.getBossNodeActive()) {
e.Enemygenerator.setBossNodeSjinSpriteFrame1();
var i = e.Enemygenerator.getBossBlood();
o.setEnemyBossTotalBlood(i);
cc.log("Boss 血量 == " + o.getEnemyBossTotalBlood());
o.isBossDie = !1;
}
o.isBossLevel || e.initStartGameLastTa();
}
}
});
e.top_level.on(cc.Node.EventType.TOUCH_END, function(e) {
cc.log("等级界面");
});
e.top_power.on(cc.Node.EventType.TOUCH_END, function(e) {
cc.log("体力界面");
zy.audioMng.playButtonAudio();
zy.director.createPop("MainGame/Ui/BuyEnergyPop");
});
e.top_gold.on(cc.Node.EventType.TOUCH_END, function(e) {
cc.log("金币界面");
});
e.top_diamond.on(cc.Node.EventType.TOUCH_END, function(e) {
cc.log("钻石界面");
});
e.set.on(cc.Node.EventType.TOUCH_END, function(t) {
zy.audioMng.playButtonAudio();
cc.log("设置界面");
var i = o.getPlayerGold();
i += 999999999999;
o.setPlayerGold(i);
e.setMain_UIGoldNum(o.getPlayerGold());
});
},
closeBuildUpgradeView: function() {
this.buildUpgradeViewClose();
this.upgradePreNode = null;
},
buildUpgradeView: function(t) {
var i = this;
this.buildUpgradeViewClose = t;
if (null == this.upgradePreNode || !cc.isValid(this.upgradePreNode)) {
this.upgradePreNode = cc.instantiate(this.upgradePre);
this.main_UI_Node.getChildByName("otherRoot").addChild(this.upgradePreNode);
this.mask_UI_Node = this.createMask_UI();
this.upgradePreNode.getChildByName("root").addChild(this.mask_UI_Node);
this.mask_UI_Node.on(cc.Node.EventType.TOUCH_END, function(e) {
i.closeBuildUpgradeView();
});
this.mask_UI_Node && (this.mask_UI_Node.active = !0);
this.build_grid_mask_AnimationNode = this.createBuild_grid_mask_Animation();
this.upgradePreNode.getChildByName("root").addChild(this.build_grid_mask_AnimationNode, 112, "build_grid_mask_AnimationNode");
this.ani_build_grid_mask_AnimationNode = this.build_grid_mask_AnimationNode.getComponent(cc.Animation);
this.build_grid_mask = this.build_grid_mask_AnimationNode.getChildByName("build_grid_mask_node").getChildByName("build_grid_mask");
this.build_tip = this.build_grid_mask_AnimationNode.getChildByName("build_tip");
this.build_tip.active = !1;
this.build_grid_mask_AnimationNode.active = !0;
this.upgrade_Build_BarNode = this.createUpgrade_Build_Bar();
this.upgradePreNode.getChildByName("root").addChild(this.upgrade_Build_BarNode);
this.content = this.upgrade_Build_BarNode.getChildByName("upgrade_bar").getChildByName("view").getChildByName("content");
this.content && (this.WeaponsLayer = this.content.getComponent("WeaponsLayer"));
this.WeaponsLayer.init();
this.getitemList = this.WeaponsLayer.getTtemList();
this.upgrade_barNode = this.createUpgrade_bar();
this.upgradePreNode.getChildByName("root").addChild(this.upgrade_barNode);
this.initUpgrade_barGetComponent();
this.setUpgrade_bar(o.getPlayersData(0));
for (var n = !1, a = (zy.dataMng.turretPriceData, e("./../../MainGame/Datas/PlayerData").PlayerData), s = 0; s < a.length; s++) {
if (2 == o.getPlayersData(s).player_State) {
n = !0;
break;
}
}
n || zy.cornerData.deleteClientCorner(zy.cornerData.CornerType.CORNER_ID_UPGRADE_TOWER);
}
this.upgradePreNode.getComponent(cc.Animation).play("mining_pop_show", 0);
return this.upgradePreNode;
},
weaponsNew: function(e, t) {
if (2 == o.getPlayersData(e).player_State) {
var i = 0;
e == o.WEAPON_LASERCANNON_1 || e == o.WEAPON_LASERCANNON_3 || e == o.WEAPON_LASERCANNON_5 || e == o.WEAPON_LASERCANNON_7 ? i = 1 : e == o.WEAPON_GATLING ? i = 0 : e == o.WEAPON_ICEGUN ? i = 2 : e == o.WEAPON_FLAMES ? i = 3 : e == o.WEAPON_RAILGUN ? i = 4 : e == o.WEAPON_HOWITZER && (i = 5);
var n = this.weaponsitembtn = new cc.Node();
n.addComponent(cc.Sprite).spriteFrame = 5 == i ? this.gun_plist.getSpriteFrame("gun" + i + "_1level_1") : this.gun_plist.getSpriteFrame("gun" + i + "_level_1");
this.UINode.addChild(n);
n.zIndex = 112;
var a = this.UINode.convertToNodeSpaceAR(t);
n.position = a;
n.opacity = 255;
this.ani_build_grid_mask_AnimationNode.play("ani_build_show");
this.build_grid_mask.setPosition(n.position);
}
},
weaponsTouchMove: function(e, t) {
if (this.weaponsitembtn) {
var i = this.weaponsitembtn.position;
this.weaponsitembtn.position = cc.v2(i.x + t.x, i.y + t.y);
this.build_grid_mask.setPosition(this.weaponsitembtn.position);
var n = this.gridPos_To_gridId(this.weaponsitembtn.position);
this.gridnode = this.gridId_To_grid(n);
this.gridId_To_gridsState(n);
}
},
weaponsTouchEnd: function(e) {
if (this.weaponsitembtn) {
this.weaponsTouchEndAndCancle(e);
this.weaponsitembtn.destroy();
this.weaponsitembtn = null;
}
},
weaponsTouchCancle: function(e) {
if (this.weaponsitembtn) {
this.weaponsTouchEndAndCancle(e);
this.weaponsitembtn.destroy();
this.weaponsitembtn = null;
}
},
weaponsTouchEndAndCancle: function(e) {
this.build_tip.active = !1;
this.weaponsitembtn.opacity = 0;
this.ani_build_grid_mask_AnimationNode.play("ani_build_go");
var t = this.gridPos_To_gridId(this.weaponsitembtn.position);
this.gridnode = this.gridId_To_grid(t);
if (this.gridnode) {
if (this.checkGridsIsHavePlayer(t) === t) {
zy.audioMng.playEffect(zy.audioMng.effBuildFail);
return;
}
this.gridIdBuild_ok = t;
this.gridIsHavePlayer(this.gridIdBuild_ok);
s.vibratorShort();
var i = new cc.Node();
i.position = this.gridMapsPos[t];
i.addComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun1_base_1");
this.gridmapsNode[t].parent.addChild(i);
var n = this.createPlayers(e, t);
n.position = this.gridMapsPos[t];
this.gridmapsNode[t].parent.addChild(n, o.WEAPON_zIndex, "Player" + e);
var a = o.getPlayersData(e);
if (2 == a.player_State) {
a.player_State = 3;
a.player_PosID = t;
o.setPlayersData(e, a);
}
this.closeBuildUpgradeView();
zy.audioMng.playEffect(zy.audioMng.effBuildSuc);
zy.effectMng.playNormalEffect(this.gridmapsNode[t].parent, n.position, zy.effectMng.Effect.BuildSuc).zIndex = n.zIndex - 1;
this.main_UI_Node.getComponent("MainUI").checkUpgradeTowerCorner();
} else zy.audioMng.playEffect(zy.audioMng.effBuildFail);
},
hideUpgrade_Build_BarNode: function() {
if (this.upgrade_Build_BarNode) {
this.upgrade_Build_BarNode.destroy();
this.upgrade_Build_BarNode = null;
}
this.upgrade_barNode && (this.upgrade_barNode.active = !1);
},
unlockLevelByPlayerId: function(e) {
var t = 0;
e == o.WEAPON_GATLING ? t = 1e4 : e == o.WEAPON_LASERCANNON_1 ? t = 2e4 : e == o.WEAPON_ICEGUN ? t = 3e4 : e == o.WEAPON_LASERCANNON_3 ? t = 20001 : e == o.WEAPON_FLAMES ? t = 4e4 : e == o.WEAPON_LASERCANNON_5 ? t = 20002 : e == o.WEAPON_RAILGUN ? t = 5e4 : e == o.WEAPON_LASERCANNON_7 ? t = 20003 : e == o.WEAPON_HOWITZER && (t = 6e4);
var i = zy.dataMng.turretAttrData.getTurretAttr(t);
if (i) {
return a.ToNumber(i.unlockLevel);
}
},
unlockingCondition: function(e) {
this.showTips(this.unlockLevelByPlayerId(e.player_ID));
},
showTips: function(e) {
if (null == this.tipsNode) {
this.tipsNode = this.createTips();
this.UINode.addChild(this.tipsNode);
}
if (this.tipsNode) {
var t = this.tipsNode.getComponent(cc.Animation), i = this.tipsNode.getChildByName("number").getComponent(cc.Label);
i && (i.string = e);
t && t.play("tips");
}
},
initunlockingWeapons_By_Level: function() {
var e = o.getLevel(), t = 0;
e == this.unlockLevelByPlayerId(o.WEAPON_GATLING) ? t = o.WEAPON_GATLING : e == this.unlockLevelByPlayerId(o.WEAPON_LASERCANNON_1) ? t = o.WEAPON_LASERCANNON_1 : e == this.unlockLevelByPlayerId(o.WEAPON_ICEGUN) ? t = o.WEAPON_ICEGUN : e == this.unlockLevelByPlayerId(o.WEAPON_LASERCANNON_3) ? t = o.WEAPON_LASERCANNON_3 : e == this.unlockLevelByPlayerId(o.WEAPON_FLAMES) ? t = o.WEAPON_FLAMES : e == this.unlockLevelByPlayerId(o.WEAPON_LASERCANNON_5) ? t = o.WEAPON_LASERCANNON_5 : e == this.unlockLevelByPlayerId(o.WEAPON_RAILGUN) ? t = o.WEAPON_RAILGUN : e == this.unlockLevelByPlayerId(o.WEAPON_LASERCANNON_7) ? t = o.WEAPON_LASERCANNON_7 : e == this.unlockLevelByPlayerId(o.WEAPON_HOWITZER) && (t = o.WEAPON_HOWITZER);
var i = o.getPlayersData(t);
if (1 == i.player_State) {
zy.httpProxy.updateTurret(t, i.player_Level, i.player_StarLevel, 1);
i.player_State = 2;
o.setPlayersData(t, i);
}
},
unlockingWeapons_By_Level: function() {
var e = o.getLevel(), t = 0;
e == this.unlockLevelByPlayerId(o.WEAPON_GATLING) ? t = o.WEAPON_GATLING : e == this.unlockLevelByPlayerId(o.WEAPON_LASERCANNON_1) ? t = o.WEAPON_LASERCANNON_1 : e == this.unlockLevelByPlayerId(o.WEAPON_ICEGUN) ? t = o.WEAPON_ICEGUN : e == this.unlockLevelByPlayerId(o.WEAPON_LASERCANNON_3) ? t = o.WEAPON_LASERCANNON_3 : e == this.unlockLevelByPlayerId(o.WEAPON_FLAMES) ? t = o.WEAPON_FLAMES : e == this.unlockLevelByPlayerId(o.WEAPON_LASERCANNON_5) ? t = o.WEAPON_LASERCANNON_5 : e == this.unlockLevelByPlayerId(o.WEAPON_RAILGUN) ? t = o.WEAPON_RAILGUN : e == this.unlockLevelByPlayerId(o.WEAPON_LASERCANNON_7) ? t = o.WEAPON_LASERCANNON_7 : e == this.unlockLevelByPlayerId(o.WEAPON_HOWITZER) && (t = o.WEAPON_HOWITZER);
var i = o.getPlayersData(t);
if (1 == i.player_State) {
s.vibratorShort();
zy.director.createPop("MainGame/Build/newBuildEffectPop", {
pid: t
});
zy.httpProxy.updateTurret(t, i.player_Level, i.player_StarLevel, 1);
i.player_State = 2;
o.setPlayersData(t, i);
}
},
updateItemPlayer: function(e) {
cc.log("点点点中了 " + e.player_ID + "来升级");
var t = e.player_ID, i = o.getPlayersData(t);
i.player_StarLevel++;
o.setPlayersData(t, i);
var n = o.getPlayersData(t);
this.WeaponsLayer.updateItemPlayer(n);
var a = o.getPlayerLevel();
a++;
o.setPlayerLevel(a);
this.setMain_UISelfLevelNum(o.getPlayerLevel());
var s = o.getPlayer_UpgradeprogressBarIndex();
s >= 9 ? s = 9 : s++;
var r = o.getPlayer_UpgradeprogressNum();
this.setMain_UISelfLevelExNum(zy.utils.getKMBString(r) + "/" + zy.utils.getKMBString(o.player_StarLevelArray[s]));
var l = o.getPlayer_UpgradeprogressNum() - o.player_StarLevelArray[s - 1];
o.setPlayer_UpgradeprogressNum(l);
o.setPlayer_UpgradeprogressBarIndex(s);
zy.httpProxy.updateTurret(t, n.player_Level, n.player_StarLevel, 1);
zy.httpProxy.updateBase(2, o.getPlayerLevel());
this.setUpgrade_barData(n);
this.updateWeaponStateUI(n);
if (this.upgrade_Build_BarNode) {
this.upgrade_Build_BarNode.destroy();
this.upgrade_Build_BarNode = null;
}
this.start_game.active = !0;
this.hideUpgrade_Build_BarNode();
this.closeBuildUpgradeView();
},
initUpdateWeaponStateUI: function(e) {
var t = e.player_ID, i = e.player_StarLevel;
if (o.WEAPON_GATLING == t) {
this.WeaponGatlingNode.getChildByName("WeaponGatling").getComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun0_level_" + i);
} else if (o.WEAPON_ICEGUN == t) {
this.WeaponIcegunNode.getChildByName("WeaponIcegun").getComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun2_level_" + i);
} else if (o.WEAPON_FLAMES == t) {
this.WeaponFlamesNode.getChildByName("WeaponFlames").getComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun3_level_" + i);
} else if (o.WEAPON_RAILGUN == t) {
this.WeaponRailgunNode.getChildByName("WeaponRailgun").getComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun4_level_" + i);
this.WeaponRailgunNode.getChildByName("WeaponRailgun").getChildByName("gun4_level_1_effect1").getComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun4_level_" + i + "_effect1");
this.WeaponRailgunNode.getChildByName("WeaponRailgun").getChildByName("gun4_level_1_effect2").getComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun4_level_" + i + "_effect2");
} else o.WEAPON_HOWITZER;
},
updateWeaponStateUI: function(e) {
var t = e.player_ID, i = e.player_StarLevel, n = zy.dataMng.turretData;
if (n) {
var a = o.getPlayersData(t);
a.player_Attack = Number(n.getTurretAttack(t + 1, i, a.player_Level));
o.setPlayersData(t, a);
}
if (o.WEAPON_GATLING == t) {
this.WeaponGatlingNode.getChildByName("WeaponGatling").getComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun0_level_" + i);
this.WeaponGatlingNode.getChildByName("WeaponGatling").getComponent("WeaponGatling").set_BulletLeve(i);
} else if (o.WEAPON_ICEGUN == t) {
this.WeaponIcegunNode.getChildByName("WeaponIcegun").getComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun2_level_" + i);
this.WeaponIcegunNode.getChildByName("WeaponIcegun").getComponent("WeaponIcegun").set_BulletLeve(i);
} else if (o.WEAPON_FLAMES == t) {
this.WeaponFlamesNode.getChildByName("WeaponFlames").getComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun3_level_" + i);
this.WeaponFlamesNode.getChildByName("WeaponFlames").getComponent("WeaponFlames").set_BulletLeve(i);
} else if (o.WEAPON_RAILGUN == t) {
this.WeaponRailgunNode.getChildByName("WeaponRailgun").getComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun4_level_" + i);
this.WeaponRailgunNode.getChildByName("WeaponRailgun").getChildByName("gun4_level_1_effect1").getComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun4_level_" + i + "_effect1");
this.WeaponRailgunNode.getChildByName("WeaponRailgun").getChildByName("gun4_level_1_effect2").getComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun4_level_" + i + "_effect2");
this.WeaponRailgunNode.getChildByName("WeaponRailgun").getComponent("WeaponRailgun").set_BulletLeve(i);
} else o.WEAPON_HOWITZER == t && this.WeaponHowitzerNode.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer").set_BulletLeve(i);
},
setUpgrade_bar: function(e) {
this.upgrade_barNode.active = !0;
this.playerData = e;
this.setFireLevelNeedLableColor(this.playerData);
this.setUpgrade_barData(e);
},
initUpgrade_barGetComponent: function() {
if (this.upgrade_barNode) {
this.fireLevelName = this.upgrade_barNode.getChildByName("level").getChildByName("number").getComponent(cc.Label);
this.fireLevelNum = this.upgrade_barNode.getChildByName("label").getComponent(cc.Label);
this.upgrade_barBtn = this.upgrade_barNode.getChildByName("guide_upgradeBtn");
this.fireLevelNeedGoldNum = this.upgrade_barNode.getChildByName("guide_upgradeBtn").getChildByName("label").getComponent(cc.Label);
this.fireLevelNeed = this.upgrade_barNode.getChildByName("guide_upgradeBtn").getChildByName("label");
this.setFireLevelNeedLableColor(o.getPlayersData(o.WEAPON_GATLING));
this.initUpgrade_barBtn_Event();
}
},
setFireLevelNeedLableColor: function(e) {
var t = zy.dataMng.turretPriceData;
if (t) {
var i = a.ToNumber(t.getTurretUpdatePrice(e.player_Level));
o.getPlayerGold() < i ? this.fireLevelNeed && (this.fireLevelNeed.color = cc.color(255, 71, 87, 255)) : this.fireLevelNeed && (this.fireLevelNeed.color = cc.color(37, 81, 83, 255));
}
},
initUpgrade_barBtn_Event: function() {
var e = this;
this.upgrade_barBtn.on(cc.Node.EventType.TOUCH_END, function(t) {
zy.audioMng.playButtonAudio();
cc.log("升级。。。");
e.upgradeUpdateData();
});
},
upgradeUpdateData: function() {
if (this.playerData) {
var e = zy.dataMng.turretPriceData;
if (e) {
var t = o.getPlayer_UpgradeprogressBarIndex();
if (o.getPlayer_UpgradeprogressNum() >= o.player_StarLevelArray[t]) {
for (var i = 0; i < this.weaponTotal; i += 2) {
var n = o.getPlayersData(i);
if (3 == n.player_State) {
if (n.player_StarLevel < 3) {
cc.log("升星力啊哈 动画界面");
this.setUpgrade_choose();
break;
}
cc.log("所有的解锁的炮塔升星ok");
}
}
return;
}
this.turretUpdatePrice = a.ToNumber(e.getTurretUpdatePrice(this.playerData.player_Level));
if (o.getPlayerGold() < this.turretUpdatePrice) {
cc.log("金币不足。。。当前金币 %d 所需本次升级金币 %d", o.getPlayerGold(), this.turretUpdatePrice);
zy.ui.tip.show(i18n.t("short_coins"));
return;
}
var s = o.getPlayerGold();
s -= this.turretUpdatePrice;
o.setPlayerGold(s);
this.setMain_UIGoldNum(o.getPlayerGold());
zy.audioMng.playEffect(zy.audioMng.effUpgradeLevel);
zy.httpProxy.updateBase(0, o.getPlayerGold());
var r = this.getPlayerByPlayerId(this.playerData.player_ID);
zy.effectMng.playNormalEffect(r, cc.v2(0, 0), zy.effectMng.Effect.UpgradeTower);
var l = new cc.Node();
l.addComponent(cc.Sprite).spriteFrame = this.main_plist.getSpriteFrame("effect_upgrade_bar_energy");
var c = this.main_UI_Node.getChildByName("top").getChildByName("top_level").getChildByName("ui_power_icon");
zy.effectMng.flyNode(l, 10, this.upgrade_barBtn.parent.convertToWorldSpaceAR(this.upgrade_barBtn.position), c.parent.convertToWorldSpaceAR(c.position), function(e) {
c.getComponent(cc.Animation).play("uni_scale3", 0);
});
this.fireLevelName.node.parent.getComponent(cc.Animation).play("uni_scale3", 0);
this.fireLevelNum.node.getComponent(cc.Animation).play("uni_scale3", 0);
var h = zy.dataMng.turretData, u = zy.dataMng.upStarGotData;
if (h) {
var d = this.playerData.player_ID, g = a.ToNumber(u.getUpStarGotExp(this.playerData.player_Level));
this.playerData.player_Level >= 300 ? this.playerData.player_Level = 300 : this.playerData.player_Level++;
this.playerData.player_Attack = a.ToNumber(h.getTurretAttack(d + 1, this.playerData.player_StarLevel, this.playerData.player_Level));
o.setPlayersData(d, this.playerData);
var p = o.getPlayer_UpgradeprogressBarIndex(), m = o.getPlayer_UpgradeprogressNum();
m += g;
o.setPlayer_UpgradeprogressNum(m);
this.setUpgrade_barData(this.playerData);
if (o.getPlayer_UpgradeprogressNum() >= o.player_StarLevelArray[p]) for (var y = 0; y < this.weaponTotal; y += 2) {
var f = o.getPlayersData(y);
if (3 == f.player_State) {
if (f.player_StarLevel < 3) {
cc.log("升星力啊哈 动画界面");
this.setUpgrade_choose();
break;
}
cc.log("所有的解锁的炮塔升星ok");
}
}
}
this.setFireLevelNeedLableColor(this.playerData);
}
}
},
setUpgrade_choose: function() {
zy.audioMng.playEffect(zy.audioMng.effGotNew);
s.vibratorShort();
this.upgrade_Build_BarNode && (this.upgrade_Build_BarNode.active = !1);
this.upgrade_barNode && (this.upgrade_barNode.active = !1);
this.mask_UI_Node.active && (this.mask_UI_Node.active = !1);
this.build_grid_mask_AnimationNode && (this.build_grid_mask_AnimationNode.active = !1);
this.upgradePreNode && (this.upgradePreNode.active = !1);
if (null == this.upgrade_chooseNode) {
this.upgrade_chooseNode = this.createUpgrade_choose();
this.UINode.addChild(this.upgrade_chooseNode);
cc.log("添加一次");
this.initUpgrade_chooseGetComponent();
}
},
initUpgrade_chooseGetComponent: function() {
if (this.upgrade_chooseNode) {
this.Upgrade_choose_ani = this.upgrade_chooseNode.getComponent(cc.Animation);
this.Upgrade_choose_mask = this.upgrade_chooseNode.getChildByName("mask");
this.getIsUpgrade();
}
},
getIsUpgrade: function() {
var e = this, t = this, i = 0;
if (!(this.getitemList.length <= 0)) {
for (var n = [], a = 0; a < this.getitemList.length; a++) {
var s = o.getPlayersData(a);
0 != s.player_ID && 2 != s.player_ID && 4 != s.player_ID && 6 != s.player_ID && 8 != s.player_ID || n.push(s);
}
for (var r = function(a) {
0 == a ? i = 0 : 2 == a ? i = 1 : 4 == a ? i = 2 : 6 == a ? i = 3 : 8 == a && (i = 4);
var s = n[i];
if (1 == s.player_State || 2 == s.player_State) {
cc.log("加锁的UI显示 === " + a);
var r = e.upgrade_chooseNode.getChildByName("uni_effect" + a);
r.getChildByName("bg").getChildByName("state1").active = !1;
r.getChildByName("bg").getChildByName("state3").active = !0;
r.getChildByName("light1").active = !1;
r.getChildByName("light2").active = !1;
r.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = e.main_plist.getSpriteFrame("upgrade_bg3");
var l = r.getChildByName("bg").getChildByName("state3").getChildByName("build_sprite").getComponent(cc.Sprite);
l && (s.player_ID == o.WEAPON_GATLING ? l.spriteFrame = e.gun_plist.getSpriteFrame("gun0_level_1_build") : s.player_ID == o.WEAPON_ICEGUN ? l.spriteFrame = e.gun_plist.getSpriteFrame("gun2_level_1_build") : s.player_ID == o.WEAPON_FLAMES ? l.spriteFrame = e.gun_plist.getSpriteFrame("gun3_level_1_build") : s.player_ID == o.WEAPON_RAILGUN ? l.spriteFrame = e.gun_plist.getSpriteFrame("gun4_level_1_build") : s.player_ID == o.WEAPON_HOWITZER && (l.spriteFrame = e.gun_plist.getSpriteFrame("gun5_level_1_build")));
} else {
cc.log("可以升级的 === " + a);
cc.log("可以升级的 playerData.player_StarLevel=== " + s.player_StarLevel);
var c = e.upgrade_chooseNode.getChildByName("uni_effect" + a), h = c.getComponent(cc.Animation);
s.player_StarLevel < 3 && h.play("upgrade_star_level_item_shake");
c.getChildByName("bg").getChildByName("state3").active = !1;
var u = c.getChildByName("bg").getComponent(cc.Sprite);
if (s.player_StarLevel < 3) {
c.getChildByName("light1").active = !0;
c.getChildByName("light2").active = !0;
u.spriteFrame = e.main_plist.getSpriteFrame("upgrade_bg4");
} else {
c.getChildByName("light1").active = !1;
c.getChildByName("light2").active = !1;
u.spriteFrame = e.main_plist.getSpriteFrame("upgrade_bg3");
}
var d = c.getChildByName("bg").getChildByName("state1");
d.active = !0;
var g = d.getChildByName("build").getChildByName("build_sprite").getComponent(cc.Sprite);
g && (s.player_ID == o.WEAPON_GATLING ? g.spriteFrame = e.gun_plist.getSpriteFrame("gun0_level_" + s.player_StarLevel) : s.player_ID == o.WEAPON_ICEGUN ? g.spriteFrame = e.gun_plist.getSpriteFrame("gun2_level_" + s.player_StarLevel) : s.player_ID == o.WEAPON_FLAMES ? g.spriteFrame = e.gun_plist.getSpriteFrame("gun3_level_" + s.player_StarLevel) : s.player_ID == o.WEAPON_RAILGUN ? g.spriteFrame = e.gun_plist.getSpriteFrame("gun4_level_" + s.player_StarLevel) : s.player_ID == o.WEAPON_HOWITZER && (g.spriteFrame = e.gun_plist.getSpriteFrame("gun5_1level_" + s.player_StarLevel)));
var p = d.getChildByName("star").getChildByName("star1").getComponent(cc.Sprite), m = d.getChildByName("star").getChildByName("star2").getComponent(cc.Sprite), y = d.getChildByName("star").getChildByName("star3").getComponent(cc.Sprite);
if (1 == s.player_StarLevel) {
p.spriteFrame = e.main_plist.getSpriteFrame("upgrade_star1");
m.spriteFrame = e.main_plist.getSpriteFrame("upgrade_star2");
y.spriteFrame = e.main_plist.getSpriteFrame("upgrade_star2");
}
if (2 == s.player_StarLevel) {
p.spriteFrame = e.main_plist.getSpriteFrame("upgrade_star1");
m.spriteFrame = e.main_plist.getSpriteFrame("upgrade_star1");
y.spriteFrame = e.main_plist.getSpriteFrame("upgrade_star2");
}
if (3 == s.player_StarLevel) {
p.spriteFrame = e.main_plist.getSpriteFrame("upgrade_star1");
m.spriteFrame = e.main_plist.getSpriteFrame("upgrade_star1");
y.spriteFrame = e.main_plist.getSpriteFrame("upgrade_star1");
}
c.on(cc.Node.EventType.TOUCH_END, function(e) {
if (o.isAniCallBack && s.player_StarLevel < 3) {
t.setItemUpgradeState(s);
o.isAniCallBack = !1;
}
});
}
}, l = 0; l < this.getitemList.length; l += 2) r(l);
this.Upgrade_choose_ani.play("upgrade_choose_show");
}
},
setItemUpgradeState: function(e) {
if (null == this.upgrade_star_uiNode) {
this.upgrade_star_uiNode = this.createUpgrade_star_ui();
this.UINode.addChild(this.upgrade_star_uiNode);
cc.log("添加一次");
this.initUpgrade_star_uiGetComponent(e);
zy.audioMng.playEffect(zy.audioMng.effUpgradeStar);
s.vibratorShort();
}
if (this.upgrade_chooseNode) {
this.upgrade_chooseNode.destroy();
this.upgrade_chooseNode = null;
}
},
initUpgrade_star_uiGetComponent: function(e) {
if (this.upgrade_star_uiNode) {
this.Upgrade_star_ui_ani = this.upgrade_star_uiNode.getComponent(cc.Animation);
this.Upgrade_star_ui_mask = this.upgrade_star_uiNode.getChildByName("mask1");
var t = this.upgrade_star_uiNode.getChildByName("uni_effect1").getChildByName("bg").getChildByName("state1"), i = t.getChildByName("build").getChildByName("build_sprite").getComponent(cc.Sprite), n = t.getChildByName("build").getChildByName("build_sprite2").getComponent(cc.Sprite);
if (e.player_ID == o.WEAPON_GATLING) {
i.spriteFrame = this.gun_plist.getSpriteFrame("gun0_level_" + e.player_StarLevel);
n.spriteFrame = this.gun_plist.getSpriteFrame("gun0_level_" + (e.player_StarLevel + 1));
} else if (e.player_ID == o.WEAPON_ICEGUN) {
i.spriteFrame = this.gun_plist.getSpriteFrame("gun2_level_" + e.player_StarLevel);
n.spriteFrame = this.gun_plist.getSpriteFrame("gun2_level_" + (e.player_StarLevel + 1));
} else if (e.player_ID == o.WEAPON_FLAMES) {
i.spriteFrame = this.gun_plist.getSpriteFrame("gun3_level_" + e.player_StarLevel);
n.spriteFrame = this.gun_plist.getSpriteFrame("gun3_level_" + (e.player_StarLevel + 1));
} else if (e.player_ID == o.WEAPON_RAILGUN) {
i.spriteFrame = this.gun_plist.getSpriteFrame("gun4_level_" + e.player_StarLevel);
n.spriteFrame = this.gun_plist.getSpriteFrame("gun4_level_" + (e.player_StarLevel + 1));
} else if (e.player_ID == o.WEAPON_HOWITZER) {
i.spriteFrame = this.gun_plist.getSpriteFrame("gun5_1level_" + e.player_StarLevel);
n.spriteFrame = this.gun_plist.getSpriteFrame("gun5_1level_" + (e.player_StarLevel + 1));
}
var a = t.getChildByName("star").getChildByName("star2").getComponent(cc.Sprite), s = t.getChildByName("star").getChildByName("star4");
this.initUpgrade_star_uiBtn_Event(e);
if (1 == e.player_StarLevel) this.Upgrade_star_ui_ani.play("upgrade_star_effect_show1"); else if (2 == e.player_StarLevel) {
a.spriteFrame = this.main_plist.getSpriteFrame("upgrade_star1");
s.active = !1;
this.Upgrade_star_ui_ani.play("upgrade_star_effect_show2");
}
}
},
initUpgrade_star_uiBtn_Event: function(e) {
var t = this;
this.Upgrade_star_ui_mask.on(cc.Node.EventType.TOUCH_END, function(i) {
if (o.isAniCallBack && t.upgrade_star_uiNode) {
t.upgrade_star_uiNode.destroy();
t.upgrade_star_uiNode = null;
t.updateItemPlayer(e);
o.isAniCallBack = !1;
}
});
},
updateProgress_bar: function(e, t) {
this._updateProgress_bar = !0;
if (this.Main_UI_top_level_Progress_bar) {
var i = this.Main_UI_top_level_Progress_bar.progress;
i < t ? i += 2 * e : this._updateProgress_bar = !1;
this.Main_UI_top_level_Progress_bar.progress = i;
}
},
setFireLevelName: function(e) {
this.fireLevelName && (this.fireLevelName.string = zy.utils.getKMBString(e));
},
setFireLevelNum: function(e) {
this.fireLevelNum && (this.fireLevelNum.string = zy.utils.getKMBString(e));
},
setFireLevelNeedGoldNum: function(e) {
this.fireLevelNeedGoldNum && (this.fireLevelNeedGoldNum.string = zy.utils.getKMBString(e));
},
setUpgrade_barData: function(e) {
var t = zy.dataMng.turretPriceData;
this.turretUpdatePrice = a.ToNumber(t.getTurretUpdatePrice(e.player_Level));
var i = o.getPlayer_UpgradeprogressBarIndex();
this.setFireLevelName(e.player_Level);
this.setFireLevelNum(e.player_Attack);
this.setFireLevelNeedGoldNum(this.turretUpdatePrice);
var n = o.getPlayer_UpgradeprogressNum();
this.setMain_UI_top_level_Progress_bar(this.getUpgradeExperienceprogress());
this.setMain_UISelfLevelExNum(zy.utils.getKMBString(n) + "/" + zy.utils.getKMBString(o.player_StarLevelArray[i]));
},
getUpgradeExperienceprogress: function() {
var e = o.getPlayer_UpgradeprogressBarIndex();
return o.getPlayer_UpgradeprogressNum() / o.player_StarLevelArray[e];
},
setMain_UILevelNum: function(e, t, i) {
this.Main_UI_level1 && (this.Main_UI_level1.string = t);
this.Main_UI_level2 && (this.Main_UI_level2.string = e);
this.Main_UI_level3 && (this.Main_UI_level3.string = i);
},
setMain_UISelfLevelNum: function(e) {
this.Main_UI_top_level && (this.Main_UI_top_level.string = e);
},
setMain_UI_top_level_Progress_bar: function(e) {
this.Main_UI_top_level_Progress_bar && this.Main_UI_top_level_Progress_bar.setProgressBarToPercent(.3, e);
},
setMain_UISelfLevelExNum: function(e) {
this.Main_UI_top_level_num && (this.Main_UI_top_level_num.string = e);
},
setMain_UIPowerNum: function(e) {
this.Main_UI_top_power && (this.Main_UI_top_power.string = e);
},
setMain_UIGoldNum: function(e) {
this.Main_UI_top_gold && (this.Main_UI_top_gold.string = zy.utils.getKMBString(e));
},
setMain_UIDiamondNum: function(e) {
this.Main_UI_top_diamond && (this.Main_UI_top_diamond.string = zy.utils.getKMBString(e));
},
setMain_UIData: function() {
0 == o.getLevel() ? this.setMain_UILevelNum("", o.getLevel() + 1, o.getLevel() + 2) : this.setMain_UILevelNum(o.getLevel(), o.getLevel() + 1, o.getLevel() + 2);
var e = o.getPlayer_UpgradeprogressBarIndex(), t = o.getPlayer_UpgradeprogressNum();
this.setMain_UISelfLevelExNum(zy.utils.getKMBString(t) + "/" + zy.utils.getKMBString(o.player_StarLevelArray[e]));
this.setMain_UISelfLevelNum(o.getPlayerLevel());
this.setMain_UI_top_level_Progress_bar(this.getUpgradeExperienceprogress());
this.setMain_UIPowerNum(o.getPlayerPower());
this.setMain_UIGoldNum(o.getPlayerGold());
this.setMain_UIDiamondNum(o.getPlayerDiamond());
this.updatePhPower();
this.start_game.active = !0;
},
startAni_Main_UI: function(e) {
this.ani_main_UI = this.main_UI_Node.getComponent(cc.Animation);
this.ani_main_UI && this.ani_main_UI.play(e);
},
initGame_UI: function() {
this.game_UI_Prefab || cc.loader.loadRes(this._urls.Game_ui, this.loadGame_UICallBack.bind(this));
},
loadGame_UICallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.game_UI_Prefab = t;
console.log("Game_UI initOK");
}
},
createGame_UI: function() {
return cc.instantiate(this.game_UI_Prefab);
},
AddGame_UI_Node: function() {
if (null == this.game_UI_Node) {
this.game_UI_Node = this.createGame_UI();
this.UINode.addChild(this.game_UI_Node);
this.initGame_UIGetComment();
this.initStartGame();
} else this.Enemygenerator && this.Enemygenerator.getLevelDate(o.getLevel());
this.initGame_UITop();
o.startOperatePlayer = !0;
o.isCreateDartsRevolution = !0;
o.isTrackingAttack = !0;
this.startAni_Game_UI("ui_2_show");
this.initSkillState();
o.getLevel() < 1 ? this.newhome && (this.newhome.active = !1) : this.newhome && (this.newhome.active = !0);
},
initGame_UITop: function() {
this.setCurrLevelNum(o.getLevel() + 1);
this.setGoldTotal(o.enemyDropGold);
this.setSelfHeartLifes(o.getPlayerLifes());
},
initSkillState: function() {
this.newestAttackModeID = -1;
this.beforeAttackModeID = -1;
this.intervalTime = 1;
this.playerSkillSurplusTime = o.getPlayerSkillTotalTime() - o.getPlayerSkillUseTime();
this.playerSkillSurplusTime;
this.updateSkillState();
},
resetDefaultSkillState: function() {
if (o.ATTACKMODES == o.AUTOMATICATTACK) {
o.isStartSkillCountdown = !1;
this.setCurrAttackModeUI(1);
this.setAttackModes(o.COLLABORATIVEATTACK, 1);
this.setTimeSkillprogressBar(0);
this.setTimeSkillNum(0);
}
},
updateSkillState: function() {
var e = o.getPlayerAttack();
this.setCurrAttackModeUI(e.attackLevel);
this.setAttackModes(e.attackModes, e.attackLevel);
var t = a.toPercentInteger(this.playerSkillSurplusTime, 1800);
this.setTimeSkillprogressBar(t / 100);
this.setTimeSkillNum(this.playerSkillSurplusTime);
0 == e.attackLevel ? o.isStartSkillCountdown = !0 : o.isStartSkillCountdown = !1;
},
initGame_UIGetComment: function() {
this.top = this.game_UI_Node.getChildByName("top");
this.topGoldNode = this.top.getChildByName("gold");
this.topGoldNodeIcon = this.top.getChildByName("gold").getChildByName("icon");
this.level_progress_bar = this.top.getChildByName("level_progress_bar").getComponent(cc.ProgressBar);
this.heart = this.top.getChildByName("heart").getChildByName("label").getComponent(cc.Label);
this.gold = this.top.getChildByName("gold").getChildByName("label").getComponent(cc.Label);
this.levelNum = this.top.getChildByName("level").getComponent(cc.Label);
this.newhome = this.game_UI_Node.getChildByName("bottom").getChildByName("guide_newhome");
this.choose_button = this.newhome.getChildByName("choose_button");
for (var e = 0; e < 4; e++) this["skillBtn" + e] = this.choose_button.getChildByName("guide_skill_" + e);
this.button_add_time = this.choose_button.getChildByName("guide_button_add_time");
this.buy_button = this.newhome.getChildByName("buy_button");
this.buy_button1 = this.buy_button.getChildByName("buy_button1");
this.buy_button2 = this.buy_button.getChildByName("buy_button2");
this.timeSkillprogressBars = this.newhome.getChildByName("guide_skill_progressBar");
this.timeSkillprogressBar2 = this.timeSkillprogressBars.getComponent(cc.ProgressBar);
this.timeSkillNum = this.newhome.getChildByName("guide_skill_progressBar").getChildByName("label").getComponent(cc.Label);
},
getGame_UITopGoldNode: function() {
if (this.topGoldNode) return this.topGoldNode;
},
getGame_UITopGoldIconNode: function() {
if (this.topGoldNodeIcon) return this.topGoldNodeIcon;
},
updatePhPower: function() {
if (zy.dataMng.userData.phPower < zy.constData.PhDefault) {
if (zy.dataMng.userData.phLowTime > 0) {
var e = zy.utils.time() - zy.dataMng.userData.phLowTime, t = Math.floor(e / zy.constData.PhRecoverTime);
if (t > 0) {
zy.dataMng.userData.phLowTime = zy.utils.time();
zy.dataMng.userData.phPower += t;
}
}
zy.dataMng.userData.phLowTime <= 0 && (zy.dataMng.userData.phLowTime = zy.utils.time());
if (zy.dataMng.userData.phPower < zy.constData.PhDefault) {
this.updatePh(0);
this.unschedule(this.updatePh);
this.schedule(this.updatePh, 1);
this.Main_UI_top_power_time.node.active = !0;
} else {
zy.dataMng.userData.phLowTime = 0;
this.unschedule(this.updatePh);
this.Main_UI_top_power_time.node.active = !1;
}
} else {
zy.dataMng.userData.phLowTime = 0;
this.unschedule(this.updatePh);
this.Main_UI_top_power_time.node.active = !1;
}
this.top_power.getComponentInChildren(cc.Label).string = zy.dataMng.userData.phPower;
cc.log("体力值：" + zy.dataMng.userData.phPower);
},
updatePh: function(e) {
if (zy.dataMng.userData.phLowTime > 0) {
var t = zy.dataMng.userData.phLowTime + zy.constData.PhRecoverTime - zy.utils.time();
t <= 0 && this.updatePhPower();
this.Main_UI_top_power_time.string = zy.utils.formatTime(Math.max(0, t));
}
},
phPowerFlyAni: function() {
var e = new cc.Node();
e.addComponent(cc.Sprite).spriteFrame = this.main_plist.getSpriteFrame("ui_power_icon");
zy.effectMng.flyNode(e, 5, this.node.parent.convertToWorldSpaceAR(this.node.position), this.node.parent.convertToWorldSpaceAR(cc.v2(this.node.position.x, this.node.position.y + 1e3)), function(e) {});
},
setEnemyTotalBloodPercentage: function(e) {
this.level_progress_bar && (this.level_progress_bar.progress = e);
},
setSelfHeartLifes: function(e) {
this.heart && (this.heart.string = e);
},
setGoldTotal: function(e) {
this.gold && (this.gold.string = zy.utils.getKMBString(e));
},
setLevelBloodProportion: function(e) {},
setCurrLevelNum: function(e) {
this.levelNum && (this.levelNum.string = e);
},
setTimeSkillprogressBar: function(e) {
this.timeSkillprogressBar2 && (this.timeSkillprogressBar2.progress = e);
},
setTimeSkillNum: function(e) {
this.timeSkillNum && (this.timeSkillNum.string = a.formatTimes(e));
},
showSkillList: function() {
this.choose_button.active = !0;
this.buy_button.active = !1;
this.timeSkillprogressBars.active = !0;
},
showBuySkillList: function() {
this.choose_button.active = !1;
this.buy_button.active = !0;
this.timeSkillprogressBars.active = !0;
},
updateSkillCountdown: function() {
this.playerSkillSurplusTime--;
var e = o.getPlayerSkillUseTime();
e++;
o.setPlayerSkillUseTime(e);
var t = a.toPercentInteger(this.playerSkillSurplusTime, 1800);
this.setTimeSkillprogressBar(t / 100);
this.setTimeSkillNum(this.playerSkillSurplusTime);
this.playerSkillSurplusTime = o.getPlayerSkillTotalTime() - o.getPlayerSkillUseTime();
if (this.playerSkillSurplusTime > 0) {
0 == o.getPlayerAttack().attackLevel ? o.isStartSkillCountdown = !0 : o.isStartSkillCountdown = !1;
} else this.resetDefaultSkillState();
},
initGame_UI_Event: function() {
var e = this;
e.button_add_time && e.button_add_time.on(cc.Node.EventType.TOUCH_END, function(t) {
e.addSkillSurplusTime();
});
e.buy_button1 && e.buy_button1.on(cc.Node.EventType.TOUCH_END, function(e) {});
e.buy_button2 && e.buy_button2.on(cc.Node.EventType.TOUCH_END, function(e) {});
for (var t = 0; t < 4; t++) {
var i = e["skillBtn" + t], n = new cc.Component.EventHandler();
n.target = this.node;
n.component = "Gridmaps";
n.handler = "clickPlayerAttackcallback";
i.getComponent(cc.Button).clickEvents.push(n);
}
},
addSkillSurplusTime: function() {
var e = this;
if (!zy.guide.getOpenStatus() || cc.sys.localStorage.getItem("freeTime" + zy.constData.StaticKey.SaveDataVersion)) zy.AdHelper.isRdAdsReady(zy.constData.AdKey.VdAddTime) ? zy.AdHelper.showRdAds(zy.constData.AdKey.VdAddTime, function(t) {
if (t) {
var i = o.getPlayerSkillTotalTime();
if ((i += 60) >= 1800) {
i = 1800;
if (o.getPlayerSkillTotalTime() - o.getPlayerSkillUseTime() >= 1740) o.setPlayerSkillUseTime(0); else {
var n = o.getPlayerSkillUseTime();
n -= 60;
o.setPlayerSkillUseTime(n);
}
}
o.setPlayerSkillTotalTime(i);
e.playerSkillSurplusTime = o.getPlayerSkillTotalTime() - o.getPlayerSkillUseTime();
var s = a.toPercentInteger(e.playerSkillSurplusTime, 1800);
e.setTimeSkillprogressBar(s / 100);
e.setTimeSkillNum(e.playerSkillSurplusTime);
if (e.playerSkillSurplusTime > 0) {
0 == o.getPlayerAttack().attackLevel ? o.isStartSkillCountdown = !0 : o.isStartSkillCountdown = !1;
e.setAttackMode(0);
} else o.isStartSkillCountdown = !1;
}
}) : zy.ui.tip.show(i18n.t("no_ad")); else {
cc.sys.localStorage.setItem("freeTime" + zy.constData.StaticKey.SaveDataVersion, 1);
var t = o.getPlayerSkillTotalTime();
if ((t += 60) >= 1800) {
t = 1800;
if (o.getPlayerSkillTotalTime() - o.getPlayerSkillUseTime() >= 1740) o.setPlayerSkillUseTime(0); else {
var i = o.getPlayerSkillUseTime();
i -= 60;
o.setPlayerSkillUseTime(i);
}
}
o.setPlayerSkillTotalTime(t);
e.playerSkillSurplusTime = o.getPlayerSkillTotalTime() - o.getPlayerSkillUseTime();
var n = a.toPercentInteger(e.playerSkillSurplusTime, 1800);
e.setTimeSkillprogressBar(n / 100);
e.setTimeSkillNum(e.playerSkillSurplusTime);
if (e.playerSkillSurplusTime > 0) {
0 == o.getPlayerAttack().attackLevel ? o.isStartSkillCountdown = !0 : o.isStartSkillCountdown = !1;
e.setAttackMode(0);
} else o.isStartSkillCountdown = !1;
}
},
clickPlayerAttackcallback: function(e) {
switch (e.target.name) {
case "guide_skill_0":
this.setAttackMode(0);
break;

case "guide_skill_1":
this.setAttackMode(1);
break;

case "guide_skill_2":
this.setAttackMode(2);
break;

case "guide_skill_3":
this.setAttackMode(3);
}
},
setAttackMode: function(e) {
if (this.getCheckPlayerNum() <= 1) zy.ui.tip.show(i18n.t("need_two")); else {
var t = e;
this.newestAttackModeID = t;
this.playerSkillSurplusTime = o.getPlayerSkillTotalTime() - o.getPlayerSkillUseTime();
if (this.playerSkillSurplusTime <= 0 && 0 == t) {
this.addSkillSurplusTime();
cc.log("弹广告。。。");
} else if (this.beforeAttackModeID != this.newestAttackModeID) {
this.beforeAttackModeID = this.newestAttackModeID;
if (1 == t) {
this.setCurrAttackModeUI(t);
this.setAttackModes(o.COLLABORATIVEATTACK, o.COLLABORATIVEATTACK_LEVEL_1);
this.setCooperativeAttackEffects(o.COLLABORATIVEATTACK_LEVEL_1);
o.isStartSkillCountdown = !1;
} else if (2 == t) {
this.setCurrAttackModeUI(t);
this.setAttackModes(o.COLLABORATIVEATTACK, o.COLLABORATIVEATTACK_LEVEL_2);
this.setCooperativeAttackEffects(o.COLLABORATIVEATTACK_LEVEL_2);
o.isStartSkillCountdown = !1;
} else if (3 == t) {
this.setCurrAttackModeUI(t);
this.setAttackModes(o.COLLABORATIVEATTACK, o.COLLABORATIVEATTACK_LEVEL_3);
this.setCooperativeAttackEffects(o.COLLABORATIVEATTACK_LEVEL_3);
o.isStartSkillCountdown = !1;
}
if (this.playerSkillSurplusTime > 0 && 0 == t) {
this.setCurrAttackModeUI(t);
o.isStartSkillCountdown = !0;
this.setAttackModes(o.AUTOMATICATTACK, 0);
}
}
}
},
setCurrAttackModeUI: function(e) {
for (var t = null, i = null, n = 0; n < 4; n++) {
i = (t = this["skillBtn" + n]).getChildByName("icon");
if (n == e) {
t.color = cc.color(75, 211, 161, 255);
i.color = cc.color(255, 255, 255, 255);
} else {
t.color = cc.color(255, 255, 255, 255);
i.color = cc.color(71, 80, 89, 255);
}
}
},
setUIbottomnew_btIcon: function(e) {
this.icon.spriteFrame = this.main_plist.getSpriteFrame("mode_icon" + e);
},
startAni_Game_UI: function(e) {
this.ani_Game_UI = this.game_UI_Node.getComponent(cc.Animation);
this.ani_Game_UI && this.ani_Game_UI.play(e);
},
initComplete_UI: function() {
this.complete_UI_Prefab || cc.loader.loadRes(this._urls.Complete_ui, this.loadComplete_UICallBack.bind(this));
},
loadComplete_UICallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.complete_UI_Prefab = t;
console.log("Complete_UI initOK");
}
},
createComplete_UI: function() {
return cc.instantiate(this.complete_UI_Prefab);
},
AddComplete_UI: function() {
if (null == this.complete_UI_Node) {
this.complete_UI_Node = this.createComplete_UI();
this.UINode.addChild(this.complete_UI_Node);
this.initComplete_UIGetComment();
}
this.phPowerNode.active = o.passCurLevel;
this.startAni_Complete_UI("ui_3_show");
this.bt2_ani = this.complete_UI_Node.getChildByName("button2").getChildByName("bt2").getComponent(cc.Animation);
this.bt2_ani.play("guide_shake");
o.enemyDropGold > .1 * o.getGold() ? this.complete_UI_Node.getChildByName("button2").active = !0 : this.complete_UI_Node.getChildByName("button2").active = !1;
},
initComplete_UIGetComment: function() {
this.Complete_UI_mask = this.complete_UI_Node.getChildByName("mask");
this.Complete_UI_goldlabel = this.complete_UI_Node.getChildByName("gold").getChildByName("label").getComponent(cc.Label);
this.Complete_UI_goldIcon = this.complete_UI_Node.getChildByName("gold").getChildByName("icon");
this.Complete_UI_level1 = this.complete_UI_Node.getChildByName("level").getChildByName("1").getChildByName("label1").getComponent(cc.Label);
this.Complete_UI_level2 = this.complete_UI_Node.getChildByName("level").getChildByName("2").getChildByName("label2").getComponent(cc.Label);
this.Complete_UI_level3 = this.complete_UI_Node.getChildByName("level").getChildByName("3").getChildByName("label3").getComponent(cc.Label);
this.Complete_UI_button1 = this.complete_UI_Node.getChildByName("button1");
this.levelRewardGoldlabel = this.Complete_UI_button1.getChildByName("ui_complete_button1_2").getChildByName("label").getComponent(cc.Label);
this.levelRewardGoldIcon = this.Complete_UI_button1.getChildByName("ui_complete_button1_2").getChildByName("ui_gold_icon");
this.Complete_UI_button2 = this.complete_UI_Node.getChildByName("button2");
this.phPowerNode = this.complete_UI_Node.getChildByName("ui_power_icon");
this.initComplete_UI_Event();
},
stopAniComplete_UI_button2: function() {
this.bt2_ani && this.bt2_ani.stop();
},
initComplete_UI_Event: function() {
var e = this;
e.Complete_UI_button1 && e.Complete_UI_button1.on(cc.Node.EventType.TOUCH_END, function(t) {
zy.ui.loading.show("gameoverbtn");
e.scheduleOnce(function() {
zy.ui.loading.hide("gameoverbtn");
}, 1);
zy.audioMng.playButtonAudio();
var i = o.enemyDropGold;
if (i > 0) {
var n = new cc.Node();
n.addComponent(cc.Sprite).spriteFrame = e.main_plist.getSpriteFrame("ui_gold_icon");
zy.effectMng.flyNode(n, 10, e.levelRewardGoldIcon.parent.convertToWorldSpaceAR(e.levelRewardGoldIcon.position), e.Complete_UI_goldIcon.parent.convertToWorldSpaceAR(e.Complete_UI_goldIcon.position), function(t) {
if (t) {
var n = o.getPlayerGold();
n += i;
o.setPlayerGold(n);
e.setComplete_UIGoldTotal(n);
e.goToMainView();
e.resetFollowingsCamera4();
}
});
} else {
e.setComplete_UIGoldTotal(o.getPlayerGold());
e.goToMainView();
e.resetFollowingsCamera4();
}
var a = o.getLevel();
if (a >= zy.constData.InterAdLevel) {
if (zy.AdHelper.isInterstitialReady(zy.constData.AdKey.InterLevel)) {
var s = zy.dataMng.userData.preInterAdLevel;
if (a - s >= zy.constData.InterAdDuration || 0 == s) {
zy.dataMng.userData.preInterAdLevel = a;
zy.AdHelper.showInterstitialAds(zy.constData.AdKey.InterLevel);
}
}
}
cc.log("下一关，或者回主界面");
});
e.Complete_UI_button2 && e.Complete_UI_button2.on(cc.Node.EventType.TOUCH_END, function(t) {
zy.ui.loading.show("gameoverbtn");
e.scheduleOnce(function() {
zy.ui.loading.hide("gameoverbtn");
}, 1);
zy.audioMng.playButtonAudio();
zy.AdHelper.isRdAdsReady(zy.constData.AdKey.VdLevelCoins) ? zy.AdHelper.showRdAds(zy.constData.AdKey.VdLevelCoins, function(t) {
if (t) {
var i = new cc.Node();
i.addComponent(cc.Sprite).spriteFrame = e.main_plist.getSpriteFrame("ui_gold_icon");
zy.effectMng.flyNode(i, 10, e.levelRewardGoldIcon.parent.convertToWorldSpaceAR(e.levelRewardGoldIcon.position), e.Complete_UI_goldIcon.parent.convertToWorldSpaceAR(e.Complete_UI_goldIcon.position), function(t) {
if (t) {
var i = o.getPlayerGold(), n = o.enemyDropGold;
i += n *= 3;
o.setPlayerGold(i);
e.setComplete_UIGoldTotal(i);
e.goToMainView();
e.resetFollowingsCamera4();
}
});
}
}) : zy.ui.tip.show(i18n.t("no_ad"));
cc.log("看广告。。。");
});
},
setComplete_UILevelNum: function(e, t, i) {
this.Complete_UI_level1 && (this.Complete_UI_level1.string = t);
this.Complete_UI_level2 && (this.Complete_UI_level2.string = e);
this.Complete_UI_level3 && (this.Complete_UI_level3.string = i);
},
setComplete_UIGoldTotal: function(e) {
this.Complete_UI_goldlabel && (this.Complete_UI_goldlabel.string = zy.utils.getKMBString(e));
},
setCurrLevelRewardGold: function(e) {
this.levelRewardGoldlabel && (this.levelRewardGoldlabel.string = zy.utils.getKMBString(e));
},
startAni_Complete_UI: function(e) {
this.ani_Complete_UI = this.complete_UI_Node.getComponent(cc.Animation);
this.ani_Complete_UI && this.ani_Complete_UI.play(e);
},
initStartGame: function() {
this.initGame_UI_Event();
this.Enemygenerator && this.Enemygenerator.initEnemyData();
this.initAim();
},
goToMainView: function() {
this.startAni_Complete_UI("ui_3_go");
this.startAni_Main_UI("ui_1_show");
this.resetWeapon();
this.resetWeaponAngle0();
this.resetFollowingsCamera4();
zy.httpProxy.updateBase(0, o.getPlayerGold());
this.unlockingWeapons_By_Level();
},
initCollaborativeAttack_Level_3_DataArray: function() {
this.CollaborativeAttackLevel_3_DataArray = [ [ 0, 1, 2, 5, 8, 7, 6, 3, 4 ], [ 1, 2, 5, 8, 7, 6, 3, 0, 4 ], [ 2, 5, 8, 7, 6, 3, 0, 1, 4 ], [ 3, 0, 1, 2, 5, 8, 7, 6, 4 ], [ 4, 5, 8, 7, 6, 3, 0, 1, 2 ], [ 5, 8, 7, 6, 3, 0, 1, 2, 4 ], [ 6, 3, 0, 1, 2, 5, 8, 7, 4 ], [ 7, 6, 3, 0, 1, 2, 5, 8, 4 ], [ 8, 7, 6, 3, 0, 1, 2, 5, 4 ] ];
},
initStartGameCentreTa: function(e) {
this.currPlayer = this.playersBuild_okArray[e];
o.WEAPON_ID = o.WEAPON_GATLING;
this.WeaponGatlingNode = this.currPlayer;
o.clickCurrWEAPON_zIndex++;
this.WeaponGatlingNode.zIndex = o.clickCurrWEAPON_zIndex;
this.playerTogridId = e;
this.isFollowingsCamera(e);
o.COLLABORATIVEATTACK_LEVEL == o.COLLABORATIVEATTACK_LEVEL_3 && this.xtgj3(e);
},
initStartGameLastTa: function() {
var e = o.getOperationLastTaID();
("undefined" == typeof e || isNaN(e) || null == e || -1 == e) && (e = 4);
this.currPlayer = this.playersBuild_okArray[e];
if (this.currPlayer) {
this.WeaponGatlingNode == this.currPlayer ? o.WEAPON_ID = o.WEAPON_GATLING : this.WeaponLaserCannonNode == this.currPlayer ? o.WEAPON_ID = o.WEAPON_LASERCANNON_1 : this.WeaponIcegunNode == this.currPlayer ? o.WEAPON_ID = o.WEAPON_ICEGUN : this.WeaponLaserCannonNode3 == this.currPlayer ? o.WEAPON_ID = o.WEAPON_LASERCANNON_3 : this.WeaponFlamesNode == this.currPlayer ? o.WEAPON_ID = o.WEAPON_FLAMES : this.WeaponLaserCannonNode5 == this.currPlayer ? o.WEAPON_ID = o.WEAPON_LASERCANNON_5 : this.WeaponRailgunNode == this.currPlayer ? o.WEAPON_ID = o.WEAPON_RAILGUN : this.WeaponLaserCannonNode7 == this.currPlayer ? o.WEAPON_ID = o.WEAPON_LASERCANNON_7 : this.WeaponHowitzerNode == this.currPlayer && (o.WEAPON_ID = o.WEAPON_HOWITZER);
o.clickCurrWEAPON_zIndex++;
this.currPlayer.zIndex = o.clickCurrWEAPON_zIndex;
this.playerTogridId = e;
this.isFollowingsCamera(e);
o.COLLABORATIVEATTACK_LEVEL == o.COLLABORATIVEATTACK_LEVEL_3 && this.xtgj3(e);
}
},
setAttackModes: function(e, t) {
if (!(this.getCheckPlayerNum() <= 1)) {
o.ATTACKMODES = e;
t = t || 0;
if (o.ATTACKMODES == o.MANUALATTACK) ; else if (o.ATTACKMODES == o.COLLABORATIVEATTACK) {
o.COLLABORATIVEATTACK_LEVEL = t;
if (o.COLLABORATIVEATTACK_LEVEL == o.COLLABORATIVEATTACK_LEVEL_3) {
o.cooperativeAttack_Level_3_Angle = 360 / o.weaponTotalNums;
this.xtgj3(this.playerTogridId);
} else o.COLLABORATIVEATTACK_LEVEL == o.COLLABORATIVEATTACK_LEVEL_2 || (o.COLLABORATIVEATTACK_LEVEL, 
o.COLLABORATIVEATTACK_LEVEL_1);
} else o.ATTACKMODES, o.AUTOMATICATTACK;
var i = o.getPlayerAttack();
i.attackModes = e;
i.attackLevel = t;
o.setPlayerAttack(i);
cc.log("playerAttack.attackModes == " + i.attackModes);
cc.log("playerAttack.attackLevel == " + i.attackLevel);
}
},
setCooperativeAttackEffects: function(e) {
if (o.ATTACKMODES == o.COLLABORATIVEATTACK) {
var t = this.getPlayerByPlayerId(o.WEAPON_ID), i = this.getOtherPlayerByPlayerId(o.WEAPON_ID);
o.COLLABORATIVEATTACK_LEVEL = e;
if (o.COLLABORATIVEATTACK_LEVEL == o.COLLABORATIVEATTACK_LEVEL_3) {
this.isTa = [];
for (var a = this.searchKeys(this.gridisHavePlayer, n.Build_ok), s = 0; s < this.CollaborativeAttackLevel_3_DataArray[this.playerTogridId].length; s++) for (var r = 0; r < a.length; r++) this.CollaborativeAttackLevel_3_DataArray[this.playerTogridId][s] == a[r] && this.isTa.push(a[r]);
for (var l = 0; l < this.isTa.length; l++) {
var c = this.playersBuild_okArray[this.isTa[l]];
if (this.WeaponGatlingNode == c) {
this.WeaponGatlingNode.angle = t.angle - o.cooperativeAttack_Level_3_Angle * l;
zy.effectMng.playNormalEffect(this.WeaponGatlingNode.parent, this.WeaponGatlingNode.position, zy.effectMng.Effect.Coordination, function() {}).angle = this.WeaponGatlingNode.angle;
}
if (this.WeaponLaserCannonNode == c) {
this.WeaponLaserCannonNode.angle = t.angle - o.cooperativeAttack_Level_3_Angle * l;
zy.effectMng.playNormalEffect(this.WeaponLaserCannonNode.parent, this.WeaponLaserCannonNode.position, zy.effectMng.Effect.Coordination, function() {}).angle = this.WeaponLaserCannonNode.angle;
}
if (this.WeaponIcegunNode == c) {
this.WeaponIcegunNode.angle = t.angle - o.cooperativeAttack_Level_3_Angle * l;
zy.effectMng.playNormalEffect(this.WeaponIcegunNode.parent, this.WeaponIcegunNode.position, zy.effectMng.Effect.Coordination, function() {}).angle = this.WeaponIcegunNode.angle;
}
if (this.WeaponFlamesNode == c) {
this.WeaponFlamesNode.angle = t.angle - o.cooperativeAttack_Level_3_Angle * l;
zy.effectMng.playNormalEffect(this.WeaponFlamesNode.parent, this.WeaponFlamesNode.position, zy.effectMng.Effect.Coordination, function() {}).angle = this.WeaponFlamesNode.angle;
}
this.WeaponRailgunNode;
if (this.WeaponHowitzerNode == c) {
if (3 != o.getPlayersData(o.WEAPON_HOWITZER).player_StarLevel) {
this.WeaponHowitzerNode.angle = t.angle - o.cooperativeAttack_Level_3_Angle * l;
zy.effectMng.playNormalEffect(this.WeaponHowitzerNode.parent, this.WeaponHowitzerNode.position, zy.effectMng.Effect.Coordination, function() {}).angle = this.WeaponHowitzerNode.angle;
}
}
if (this.WeaponLaserCannonNode3 == c) {
this.WeaponLaserCannonNode3.angle = t.angle - o.cooperativeAttack_Level_3_Angle * l;
zy.effectMng.playNormalEffect(this.WeaponLaserCannonNode3.parent, this.WeaponLaserCannonNode3.position, zy.effectMng.Effect.Coordination, function() {}).angle = this.WeaponLaserCannonNode3.angle;
}
if (this.WeaponLaserCannonNode5 == c) {
this.WeaponLaserCannonNode5.angle = t.angle - o.cooperativeAttack_Level_3_Angle * l;
zy.effectMng.playNormalEffect(this.WeaponLaserCannonNode5.parent, this.WeaponLaserCannonNode5.position, zy.effectMng.Effect.Coordination, function() {}).angle = this.WeaponLaserCannonNode5.angle;
}
if (this.WeaponLaserCannonNode7 == c) {
this.WeaponLaserCannonNode7.angle = t.angle - o.cooperativeAttack_Level_3_Angle * l;
zy.effectMng.playNormalEffect(this.WeaponLaserCannonNode7.parent, this.WeaponLaserCannonNode7.position, zy.effectMng.Effect.Coordination, function() {}).angle = this.WeaponLaserCannonNode7.angle;
}
}
} else if (o.COLLABORATIVEATTACK_LEVEL == o.COLLABORATIVEATTACK_LEVEL_2) {
cc.log("curPlayer.position == " + t.position);
this.hudu = Math.PI / 180 * -t.angle;
var h = 500 * Math.sin(this.hudu), u = 500 * Math.cos(this.hudu);
cc.log("x == x" + h);
cc.log("y == y" + u);
var d = cc.v2(h, u), g = cc.v2(0, 0), p = this.getTargetfollowingCameraPos(), m = !0, y = !1, f = void 0;
try {
for (var _, A = i[Symbol.iterator](); !(m = (_ = A.next()).done); m = !0) {
var C = _.value;
if (C) if (C == this.WeaponHowitzerNode) {
if (3 != o.getPlayersData(o.WEAPON_HOWITZER).player_StarLevel) {
(g = C.position).subSelf(p);
var v = this.Enemygenerator.change_angle(g, d);
C.angle = v;
zy.effectMng.playNormalEffect(C.parent, C.position, zy.effectMng.Effect.Coordination, function() {}).angle = C.angle;
}
} else if (C == this.WeaponRailgunNode) ; else {
(g = C.position).subSelf(p);
var P = this.Enemygenerator.change_angle(g, d);
C.angle = P;
cc.log("othPlayer.position == " + C.position);
cc.log("othPlayer.angle == " + C.angle);
zy.effectMng.playNormalEffect(C.parent, C.position, zy.effectMng.Effect.Coordination, function() {}).angle = C.angle;
}
}
} catch (e) {
y = !0;
f = e;
} finally {
try {
!m && A.return && A.return();
} finally {
if (y) throw f;
}
}
zy.effectMng.playNormalEffect(t.parent, t.position, zy.effectMng.Effect.Coordination, function() {}).angle = t.angle;
} else if (o.COLLABORATIVEATTACK_LEVEL == o.COLLABORATIVEATTACK_LEVEL_1) {
var b = !0, L = !1, I = void 0;
try {
for (var B, E = i[Symbol.iterator](); !(b = (B = E.next()).done); b = !0) {
var N = B.value;
if (N) if (N == this.WeaponHowitzerNode) {
if (3 != o.getPlayersData(o.WEAPON_HOWITZER).player_StarLevel) {
N.angle = t.angle;
zy.effectMng.playNormalEffect(N.parent, N.position, zy.effectMng.Effect.Coordination, function() {}).angle = N.angle;
}
} else if (N == this.WeaponRailgunNode) ; else {
N.angle = t.angle;
zy.effectMng.playNormalEffect(N.parent, N.position, zy.effectMng.Effect.Coordination, function() {}).angle = N.angle;
}
}
} catch (e) {
L = !0;
I = e;
} finally {
try {
!b && E.return && E.return();
} finally {
if (L) throw I;
}
}
zy.effectMng.playNormalEffect(t.parent, t.position, zy.effectMng.Effect.Coordination, function() {}).angle = t.angle;
}
}
},
initTowerbuilding: function() {
for (var e = 0; e < this.weaponTotal; e++) {
var t = o.getPlayersData(e), i = t.player_PosID, n = t.player_ID;
if (3 == t.player_State && -1 != i) {
this.followingTargetpoint = i;
this.gridIdBuild_ok = i;
this.gridIsHavePlayer(this.gridIdBuild_ok);
var a = new cc.Node();
a.position = this.gridMapsPos[i];
a.addComponent(cc.Sprite).spriteFrame = this.gun_plist.getSpriteFrame("gun1_base_1");
this.gridmapsNode[i].parent.addChild(a);
var s = this.createPlayers(n, i);
s.position = this.gridMapsPos[i];
this.gridmapsNode[i].parent.addChild(s, o.WEAPON_zIndex, "Player" + n);
this.initUpdateWeaponStateUI(t);
}
}
console.log("Towerbuilding initOK");
},
resetFollowingsCamera: function() {
this.playerTogridId && this.isFollowingsCamera(this.playerTogridId);
o.setGamePaused(!1);
o.startOperatePlayer = !0;
},
resetFollowingsCamera4: function() {
this.isFollowingsCamera(4);
},
initfollowingCamera: function() {
this.followingCameraPos = this.followingCamera.node.getPosition();
this.isFollowingCamera = !1;
this.lerpratio = .1;
this.followingCameraPosX = this.followingCameraPos.x;
this.followingCameraPosY = this.followingCameraPos.y;
console.log("followingCamera initOK");
},
isFollowingsCamera: function(e) {
this.followingTargetpoint = e;
this.isFollowingCamera = !0;
},
initGridmap: function() {
this.map = this.maps.getComponent("Map");
this.pagodabastion = cc.find("Canvas/Pagodabastion");
this.Enemygenerators = cc.find("Canvas/Enemygenerators");
for (var e = 0; e < this.gridmapTotal; e++) {
this.gridmapsNode[e] = this.gridmaps.getChildByName("gridmap" + e);
this.gridMapsPos[e] = cc.v2(this.gridmapsNode[e].x, this.gridmapsNode[e].y);
this.gridisHavePlayer[e] = n.Build_null;
}
console.log("Gridmap initOK");
},
initBossLevel: function() {
if (o.isBossLevel) {
this.StartBossLevelAni();
s.vibratorShort();
zy.audioMng.playMusic(zy.audioMng.bossBgm);
console.log("initBossLevel initOK");
}
},
initBossLevelNodePos: function(e) {
this.node.setPosition(cc.v2(this.node.position.x, -e));
for (var t = 0; t < this.gridmapTotal; t++) {
this.gridmapsNode[t] = this.gridmaps.getChildByName("gridmap" + t);
this.gridMapsPos[t] = cc.v2(this.gridmapsNode[t].x, this.gridmapsNode[t].y);
}
this.updateBossLevelNodePos(e);
this.initStartGameLastTa();
this.AddGame_UI_Node();
},
resetOrdinaryLevel: function() {
if (!o.isBossLevel) {
zy.audioMng.playMusic(zy.audioMng.bgm);
this.node.setPosition(cc.v2(this.node.position.x, 0));
for (var e = 0; e < this.gridmapTotal; e++) {
this.gridmapsNode[e] = this.gridmaps.getChildByName("gridmap" + e);
this.gridMapsPos[e] = cc.v2(this.gridmapsNode[e].x, this.gridmapsNode[e].y);
}
this.updateBossLevelNodePos(-o.bossLevelFollowingCameraDeviationY);
console.log("initOrdinaryLevel initOK");
}
},
updateBossLevelNodePos: function(e) {
cc.log("this.followingCamera.node.getPosition === " + this.followingCamera.node.getPosition());
this.followingCameraPos = this.followingCamera.node.getPosition();
this.followingCameraPosX = this.followingCameraPos.x;
this.followingCameraPosY = this.followingCameraPos.y;
this.pagodabastion.setPosition(cc.v2(this.pagodabastion.position.x, this.pagodabastion.position.y - e));
this.Enemygenerators.setPosition(cc.v2(this.Enemygenerators.position.x, this.Enemygenerators.position.y - e));
},
StartBossLevelAni: function() {
var e = cc.find("Canvas").getComponent(cc.Animation);
e && e.play("ani_enemy_boss_show");
var t = this.createWarning_UI_boss();
this.UINode.addChild(t);
t && t.getComponent(cc.Animation).play("warning_boss");
},
initBuild_grid_mask_Animation: function() {
this.build_grid_mask_AnimationPrefab || cc.loader.loadRes(this._urls.Build, this.loadBuild_grid_mask_AnimationCallBack.bind(this));
},
loadBuild_grid_mask_AnimationCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.build_grid_mask_AnimationPrefab = t;
console.log("build initOK");
}
},
createBuild_grid_mask_Animation: function() {
return cc.instantiate(this.build_grid_mask_AnimationPrefab);
},
initUpgrade_bar: function() {
this.upgrade_barPrefab || cc.loader.loadRes(this._urls.Upgrade_bar, this.loadUpgrade_barCallBack.bind(this));
},
loadUpgrade_barCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.upgrade_barPrefab = t;
console.log("Upgrade_bar initOK");
}
},
createUpgrade_bar: function() {
return cc.instantiate(this.upgrade_barPrefab);
},
initUpgrade_choose: function() {
this.upgrade_choosePrefab || cc.loader.loadRes(this._urls.Upgrade_choose, this.loadUpgrade_chooseCallBack.bind(this));
},
loadUpgrade_chooseCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.upgrade_choosePrefab = t;
console.log("Upgrade_choose initOK");
}
},
createUpgrade_choose: function() {
return cc.instantiate(this.upgrade_choosePrefab);
},
initUpgrade_star_ui: function() {
this.upgrade_star_uiPrefab || cc.loader.loadRes(this._urls.Upgrade_star_ui, this.loadUpgrade_star_uiCallBack.bind(this));
},
loadUpgrade_star_uiCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.upgrade_star_uiPrefab = t;
console.log("Upgrade_star_ui initOK");
}
},
createUpgrade_star_ui: function() {
return cc.instantiate(this.upgrade_star_uiPrefab);
},
initTips: function() {
this.tipsPrefab || cc.loader.loadRes(this._urls.Tips, this.loadTipsCallBack.bind(this));
},
loadTipsCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.tipsPrefab = t;
console.log("Tips initOK");
}
},
createTips: function() {
return cc.instantiate(this.tipsPrefab);
},
initUpgrade_Build_Bar: function() {
this.upgrade_Build_BarPrefab || cc.loader.loadRes(this._urls.Upgrade_build_bar, this.loadUpgrade_Build_BarCallBack.bind(this));
},
loadUpgrade_Build_BarCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.upgrade_Build_BarPrefab = t;
console.log("Upgrade_Build_Bar initOK");
}
},
createUpgrade_Build_Bar: function() {
return cc.instantiate(this.upgrade_Build_BarPrefab);
},
initWarning_UI_boss: function() {
this.warning_UI_bossPrefab || cc.loader.loadRes(this._urls.Warning_UI_boss, this.loadWarning_UI_bossCallBack.bind(this));
},
loadWarning_UI_bossCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.warning_UI_bossPrefab = t;
console.log("warning_UI_bossPrefab initOK");
}
},
createWarning_UI_boss: function() {
return cc.instantiate(this.warning_UI_bossPrefab);
},
initAttack_mode: function() {
this.initAttack_modePrefab || cc.loader.loadRes(this._urls.Attack_mode, this.loadAttack_modeCallBack.bind(this));
},
loadAttack_modeCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.initAttack_modePrefab = t;
console.log("Attack_mode initOK");
}
},
createAttack_mode: function() {
return cc.instantiate(this.initAttack_modePrefab);
},
initAim: function() {
this.initAimPrefab || cc.loader.loadRes(this._urls.Aim, this.loadAimCallBack.bind(this));
},
loadAimCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.initAimPrefab = t;
console.log("Aim initOK");
this.initAimPrefab && this.initTouchEffects();
}
},
createAim: function() {
return cc.instantiate(this.initAimPrefab);
},
initTouchEffects: function() {
var e = this;
if (null == e.initAimNode) {
e.initAimNode = e.createAim();
e.UINode.addChild(e.initAimNode, 9999);
e.initAimNode.active = !1;
e.ani_attack_aim = e.initAimNode.getComponent(cc.Animation);
}
e.maps.on(cc.Node.EventType.TOUCH_START, function(t) {
if (0 != o.startOperatePlayer) {
e.initAimNode.active = !0;
e.ani_attack_aim.play("ani_attack_aim1");
e.ani_attack_aim_local = e.maps.convertToNodeSpaceAR(t.getLocation());
e.initAimNode.setPosition(e.ani_attack_aim_local);
if (2 == o.getLevel() && e.getCheckPlayerNum() >= 2) {
if (!cc.sys.localStorage.getItem("guide_step_2" + zy.constData.StaticKey.SaveDataVersion)) {
cc.sys.localStorage.setItem("guide_step_2" + zy.constData.StaticKey.SaveDataVersion, 1);
e.scheduleOnce(function() {
o.setGamePauseLogic(!0);
zy.guide.setOpenStatus(!0);
zy.guide.checkStatus();
zy.guide.setStep(2);
zy.guide.checkGuide();
}, 1);
}
}
}
});
e.maps.on(cc.Node.EventType.TOUCH_MOVE, function(t) {
if (0 != o.startOperatePlayer) {
var i = t.getTouches();
e.ani_attack_aim_newPos = e.maps.convertToNodeSpaceAR(i[0].getLocation());
e.initAimNode.setPosition(e.ani_attack_aim_newPos);
}
});
e.maps.on(cc.Node.EventType.TOUCH_END, function(t) {
e.ani_attack_aim.play("ani_attack_aim2");
});
},
getPlayAni_attack_aim3: function() {
this.ani_attack_aim && this.ani_attack_aim.play("ani_attack_aim3");
},
hideAimNode: function() {
this.initAimNode && (this.initAimNode.active = !1);
},
initPlayers: function() {
cc.loader.loadResDir(this._urls.Players, this.loadPlayersCallBack.bind(this));
},
loadPlayersCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.playerPrefabArray = t;
if (this.playerPrefabArray) {
this.playerTogridId = null;
console.log("Players initOK");
this.initMain_UI();
this.initGame_UI();
this.initComplete_UI();
}
}
},
createPlayers: function(e, t) {
if (null != e) {
var i = cc.instantiate(this.playerPrefabArray[e]);
if (null != i) {
this.playersBuild_okArray[t] = i;
this.initPlayerclickEvents(e, i, t);
this.playerTogridId = t;
this.currPlayer = i;
i.player_ID = e;
if (o.WEAPON_GATLING == e) {
o.WEAPON_ID = o.WEAPON_GATLING;
this.WeaponGatlingNode = this.currPlayer;
} else if (o.WEAPON_LASERCANNON_1 == e) {
o.WEAPON_ID = o.WEAPON_LASERCANNON_1;
this.WeaponLaserCannonNode = this.currPlayer;
} else if (o.WEAPON_ICEGUN == e) {
o.WEAPON_ID = o.WEAPON_ICEGUN;
this.WeaponIcegunNode = this.currPlayer;
} else if (o.WEAPON_LASERCANNON_3 == e) {
o.WEAPON_ID = o.WEAPON_LASERCANNON_3;
this.WeaponLaserCannonNode3 = this.currPlayer;
} else if (o.WEAPON_FLAMES == e) {
o.WEAPON_ID = o.WEAPON_FLAMES;
this.WeaponFlamesNode = this.currPlayer;
} else if (o.WEAPON_LASERCANNON_5 == e) {
o.WEAPON_ID = o.WEAPON_LASERCANNON_5;
this.WeaponLaserCannonNode5 = this.currPlayer;
} else if (o.WEAPON_RAILGUN == e) {
o.WEAPON_ID = o.WEAPON_RAILGUN;
this.WeaponRailgunNode = this.currPlayer;
} else if (o.WEAPON_LASERCANNON_7 == e) {
o.WEAPON_ID = o.WEAPON_LASERCANNON_7;
this.WeaponLaserCannonNode7 = this.currPlayer;
} else if (o.WEAPON_HOWITZER == e) {
o.WEAPON_ID = o.WEAPON_HOWITZER;
this.WeaponHowitzerNode = this.currPlayer;
}
this.getCheckPlayerNum();
if (o.COLLABORATIVEATTACK_LEVEL == o.COLLABORATIVEATTACK_LEVEL_3) {
o.cooperativeAttack_Level_3_Angle = 360 / o.weaponTotalNums;
this.xtgj3(t);
}
return i;
}
}
},
initPlayerclickEvents: function(e, t, i) {
this.initclickPlayerEventHandler(e, t, i);
},
initclickPlayerEventHandler: function(e, t, i) {
var n = new cc.Component.EventHandler();
n.target = this.node;
n.component = "Gridmaps";
n.handler = "clickPlayercallback";
n.customEventData = i;
this.currentPlayerArray[e] = t.getComponent(cc.Button);
this.currentPlayerArray[e].clickEvents.push(n);
},
clickPlayercallback: function(e, t) {
if (0 != o.startOperatePlayer) if ("Player1" != e.target.name && "Player3" != e.target.name && "Player5" != e.target.name && "Player7" != e.target.name) {
if ("Player8" == e.target.name) {
if (3 == o.getPlayersData(8).player_StarLevel) {
cc.log("不能手动操作的炮塔。。。");
return;
}
}
this.audioMng && this.audioMng.playSwitchPlayerAudio();
this.currPlayer = this.playersBuild_okArray[t];
if ("Player0" == e.target.name) {
o.WEAPON_ID = o.WEAPON_GATLING;
this.WeaponGatlingNode = this.currPlayer;
o.clickCurrWEAPON_zIndex++;
this.currPlayer.zIndex = o.clickCurrWEAPON_zIndex;
} else if ("Player1" == e.target.name) {
o.WEAPON_ID = o.WEAPON_LASERCANNON_1;
this.WeaponLaserCannonNode = this.currPlayer;
} else if ("Player2" == e.target.name) {
o.WEAPON_ID = o.WEAPON_ICEGUN;
this.WeaponIcegunNode = this.currPlayer;
o.clickCurrWEAPON_zIndex++;
this.currPlayer.zIndex = o.clickCurrWEAPON_zIndex;
} else if ("Player3" == e.target.name) {
o.WEAPON_ID = o.WEAPON_LASERCANNON_3;
this.WeaponLaserCannonNode3 = this.currPlayer;
} else if ("Player4" == e.target.name) {
o.WEAPON_ID = o.WEAPON_FLAMES;
this.WeaponFlamesNode = this.currPlayer;
o.clickCurrWEAPON_zIndex++;
this.currPlayer.zIndex = o.clickCurrWEAPON_zIndex;
} else if ("Player5" == e.target.name) {
o.WEAPON_ID = o.WEAPON_LASERCANNON_5;
this.WeaponLaserCannonNode5 = this.currPlayer;
} else if ("Player6" == e.target.name) {
o.WEAPON_ID = o.WEAPON_RAILGUN;
this.WeaponRailgunNode = this.currPlayer;
o.clickCurrWEAPON_zIndex++;
this.currPlayer.zIndex = o.clickCurrWEAPON_zIndex;
} else if ("Player7" == e.target.name) {
o.WEAPON_ID = o.WEAPON_LASERCANNON_7;
this.WeaponLaserCannonNode7 = this.currPlayer;
} else if ("Player8" == e.target.name) {
o.WEAPON_ID = o.WEAPON_HOWITZER;
this.WeaponHowitzerNode = this.currPlayer;
o.clickCurrWEAPON_zIndex++;
this.currPlayer.zIndex = o.clickCurrWEAPON_zIndex;
}
this.playerTogridId = t;
o.setOperationLastTaID(t);
this.isFollowingsCamera(t);
o.COLLABORATIVEATTACK_LEVEL == o.COLLABORATIVEATTACK_LEVEL_3 && this.xtgj3(t);
var i = this.getPlayerByPlayerId(o.WEAPON_ID);
zy.effectMng.playNormalEffect(i.parent, i.position, zy.effectMng.Effect.SwitchTower);
} else cc.log("不能手动操作的炮塔。。。");
},
xtgj3: function(e) {
this.isTa = [];
for (var t = this.searchKeys(this.gridisHavePlayer, n.Build_ok), i = 0; i < this.CollaborativeAttackLevel_3_DataArray[e].length; i++) for (var a = 0; a < t.length; a++) this.CollaborativeAttackLevel_3_DataArray[e][i] == t[a] && this.isTa.push(t[a]);
for (var o = 0; o < this.isTa.length; o++) {
var s = this.playersBuild_okArray[this.isTa[o]];
this.WeaponGatlingNode == s && s.getChildByName("WeaponGatling").getComponent("WeaponGatling").getCollaborativeAttack_Level_3_ratio(o);
this.WeaponLaserCannonNode == s && s.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon").getCollaborativeAttack_Level_3_ratio(o);
this.WeaponIcegunNode == s && s.getChildByName("WeaponIcegun").getComponent("WeaponIcegun").getCollaborativeAttack_Level_3_ratio(o);
this.WeaponFlamesNode == s && s.getChildByName("WeaponFlames").getComponent("WeaponFlames").getCollaborativeAttack_Level_3_ratio(o);
this.WeaponRailgunNode == s && s.getChildByName("WeaponRailgun").getComponent("WeaponRailgun").getCollaborativeAttack_Level_3_ratio(o);
this.WeaponHowitzerNode == s && s.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer").getCollaborativeAttack_Level_3_ratio(o);
this.WeaponLaserCannonNode3 == s && s.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon0").getCollaborativeAttack_Level_3_ratio(o);
this.WeaponLaserCannonNode5 == s && s.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon1").getCollaborativeAttack_Level_3_ratio(o);
this.WeaponLaserCannonNode7 == s && s.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon2").getCollaborativeAttack_Level_3_ratio(o);
}
},
gridPos_To_gridId: function(e) {
for (var t = 0; t < this.gridmapTotal; t++) if (this.gridmapsNode[t].getBoundingBox().contains(e)) {
this.gridId = t;
return this.gridId;
}
},
gridId_To_grid: function(e) {
for (var t = 0; t < this.gridmapTotal; t++) if (e == t) {
return this.gridmapsNode[e];
}
},
gridId_To_gridsState: function(e) {
for (var t = 0; t < this.gridmapTotal; t++) {
if (e === t) {
this.build_tip.active = !0;
this.checkGridsIsHavePlayer(e) === e ? this.build_tip.addComponent(cc.Sprite).spriteFrame = this.main_plist.getSpriteFrame("build_tip_red") : this.build_tip.addComponent(cc.Sprite).spriteFrame = this.main_plist.getSpriteFrame("build_tip_green");
this.build_tip.setPosition(this.gridmapsNode[t].getPosition());
return;
}
this.build_tip.active = !1;
}
},
gridIsHavePlayer: function(e) {
for (var t = 0; t < this.gridmapTotal; t++) t == e && (this.gridisHavePlayer[e] = n.Build_ok);
},
checkGridsIsHavePlayer: function(e) {
var t = this.searchKeys(this.gridisHavePlayer, n.Build_ok);
if (null != t) for (var i = 0; i <= t.length; i++) if (e == t[i]) return e;
},
checkPlayerNofocus: function() {
var e = this.searchKeys(this.gridisHavePlayer, n.Build_ok);
if (null != e) {
this.playersAutoAttackArray = e.slice(0);
for (var t = 0; t <= this.playersAutoAttackArray.length; t++) this.playerTogridId == this.playersAutoAttackArray[t] && this.remove(this.playersAutoAttackArray, this.playersAutoAttackArray[t]);
return this.playersAutoAttackArray;
}
},
screenShake: function(e, t, i) {
var n = cc.shake(e, t, i);
this.node.runAction(n);
},
indexOf: function(e, t) {
for (var i = 0; i < e.length; i++) if (e[i] == t) return i;
return -1;
},
remove: function(e, t) {
var i = this.indexOf(e, t);
i > -1 && e.splice(i, 1);
},
searchKeys: function(e, t) {
var i = [];
for (var n in e) e[n] == t && i.push(n);
return i;
},
abAngle: function(e, t) {
return ((e - t) % 360 + 540) % 360 - 180;
},
update: function(e) {
this.selfdt = e;
if (o.isZoomRatio) {
this.followingCamera.zoomRatio = cc.misc.lerp(this.followingCamera.zoomRatio, .78, .2);
if (this.followingCamera.zoomRatio <= .79) {
this.followingCamera.zoomRatio = .78;
o.isZoomRatio = !1;
}
}
this._updateProgress_bar && this.updateProgress_bar(e, 1);
if (o.isStartSkillCountdown && o.ATTACKMODES == o.AUTOMATICATTACK) if (this.intervalTime >= 0) this.intervalTime -= e; else {
this.intervalTime = 1;
this.updateSkillCountdown();
}
if (!(this.playersBuild_okArray.length <= 0) && this.isFollowingCamera) {
this.followingCameraPosX = cc.misc.lerp(this.followingCameraPosX, this.gridmapsNode[this.followingTargetpoint].position.x, this.lerpratio);
this.followingCameraPosY = cc.misc.lerp(this.followingCameraPosY, this.gridmapsNode[this.followingTargetpoint].position.y, this.lerpratio);
this.followingCamera.node.setPosition(cc.v2(this.followingCameraPosX, this.followingCameraPosY));
if (Math.round(this.followingCameraPosX) == this.gridmapsNode[this.followingTargetpoint].position.x && Math.round(this.followingCameraPosY) == this.gridmapsNode[this.followingTargetpoint].position.y) {
this.isFollowingCamera = !1;
this.followingCamera.node.setPosition(cc.v2(this.gridmapsNode[this.followingTargetpoint].position.x, this.gridmapsNode[this.followingTargetpoint].position.y));
this.getIsAutoAttack() && this.checkPlayerNofocus();
}
}
},
getPlayerByPlayerId: function(e) {
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this.playersBuild_okArray[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
if (s && s.player_ID == e) return s;
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
return null;
},
getOtherPlayerByPlayerId: function(e) {
var t = [], i = !0, n = !1, a = void 0;
try {
for (var o, s = this.playersBuild_okArray[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
var r = o.value;
r && r.player_ID != e && t.push(r);
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && s.return && s.return();
} finally {
if (n) throw a;
}
}
return t;
},
getPlayers: function() {
if (null != this.playersBuild_okArray) return this.playersBuild_okArray;
},
getCurrentPlayerTogridId: function() {
if (null != this.playerTogridId) return this.playerTogridId;
},
getWeaponGatlingNode: function() {
if (null != this.WeaponGatlingNode) return this.WeaponGatlingNode;
},
getWeaponLaserCannonNode: function() {
if (null != this.WeaponLaserCannonNode) return this.WeaponLaserCannonNode;
},
getWeaponIcegunNode: function() {
if (null != this.WeaponIcegunNode) return this.WeaponIcegunNode;
},
getWeaponFlamesNode: function() {
if (null != this.WeaponFlamesNode) return this.WeaponFlamesNode;
},
getWeaponRailgunNode: function() {
if (null != this.WeaponRailgunNode) return this.WeaponRailgunNode;
},
getWeaponHowitzerNode: function() {
if (null != this.WeaponHowitzerNode) return this.WeaponHowitzerNode;
},
getWeaponLaserCannonNode3: function() {
if (null != this.WeaponLaserCannonNode3) return this.WeaponLaserCannonNode3;
},
getWeaponLaserCannonNode5: function() {
if (null != this.WeaponLaserCannonNode5) return this.WeaponLaserCannonNode5;
},
getWeaponLaserCannonNode7: function() {
if (null != this.WeaponLaserCannonNode7) return this.WeaponLaserCannonNode7;
},
getFollowingCamera: function() {
if (null != this.followingCamera) return this.followingCamera;
},
getTargetfollowingCameraPos: function() {
return this.gridmapsNode[this.followingTargetpoint].getPosition();
},
getMainPlist: function() {
if (null != this.main_plist) return this.main_plist;
},
getGunPlist: function() {
if (null != this.gun_plist) return this.gun_plist;
},
getEnemy_plist: function() {
if (null != this.enemy_plist) return this.enemy_plist;
},
getCheckPlayerNum: function() {
var e = this.searchKeys(this.gridisHavePlayer, n.Build_ok);
if (null != e) {
o.weaponTotalNums = e.length;
return e.length;
}
},
getIsAutoAttack: function() {
return this.getCheckPlayerNum() > 1;
},
set_Icegunlerpratio: function(e) {
null != this.WeaponIcegunNode && this.WeaponIcegunNode.getChildByName("WeaponIcegun").getComponent("WeaponIcegun").set_Icegunlerpratio(e);
},
set_FlamesbulletLeve_To_launchbullet: function() {
null != this.WeaponFlamesNode && this.WeaponFlamesNode.getChildByName("WeaponFlames").getComponent("WeaponFlames").set_FlamesbulletLeve_To_launchbullet();
},
createFlamesBullet3_2: function(e) {
null != this.WeaponFlamesNode && this.WeaponFlamesNode.getChildByName("WeaponFlames").getComponent("WeaponFlames").createFlamesBullet3_2(e);
},
set_HowitzerbulletLeve_To_launchbullet: function() {
this.WeaponHowitzerNode && this.WeaponHowitzerNode.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer").set_HowitzerbulletLeve_To_launchbullet();
},
createHowitzerBullet5_1_2: function(e) {
this.WeaponHowitzerNode && this.WeaponHowitzerNode.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer").createHowitzerBullet5_1_2(e);
},
set_ani_Gun5_3: function(e) {
this.WeaponHowitzerNode && this.WeaponHowitzerNode.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer").set_ani_Gun5_3(e);
},
set_RailBulletDartsRevolution: function(e) {
this.WeaponRailgunNode && this.WeaponRailgunNode.getChildByName("WeaponRailgun").getComponent("WeaponRailgun").set_RailBulletDartsRevolution(e);
},
playHitMy: function() {
s.vibratorLong();
if (!o.isBossLevel) {
zy.ui.shakeScreen({
node: this.gridmaps,
times: 2,
offsetX: 5,
offsetY: 5
});
zy.ui.shakeScreen({
node: this.pagodabastion,
times: 2,
offsetX: 5,
offsetY: 5
});
}
this.node.getChildByName("tower_bg").getComponent(cc.Animation).play("hit_white");
},
resetWeapon: function() {
this.hideAimNode();
this.WeaponGatlingNode && this.WeaponGatlingNode.getChildByName("WeaponGatling").getComponent("WeaponGatling").resetWeaponAttack();
this.WeaponIcegunNode && this.WeaponIcegunNode.getChildByName("WeaponIcegun").getComponent("WeaponIcegun").resetWeaponAttack();
this.WeaponHowitzerNode && this.WeaponHowitzerNode.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer").resetWeaponAttack();
},
resetWeaponAngle0: function() {
var e = !0, t = !1, i = void 0;
try {
for (var n, a = this.playersBuild_okArray[Symbol.iterator](); !(e = (n = a.next()).done); e = !0) {
var o = n.value;
o && (o.angle = 0);
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && a.return && a.return();
} finally {
if (t) throw i;
}
}
}
});
cc._RF.pop();
}, {
"./../../MainGame/Datas/PlayerData": "PlayerData",
GameManager: "GameManager",
Helpers: "Helpers",
MKSystem: "MKSystem"
} ],
Guide: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "758846ZgwpGZLjqN2ZhXxS8", "Guide");
var n = {
0: [ 1001, 1002 ],
1: [ 1001, 1003, 1004 ],
2: [ 1005, 1006, 1007, 1008, 1009 ],
3: [ 1010, 1011 ],
4: [ 1012, 1013 ]
}, a = {
1001: function() {
zy.guide.hit({
name: "guide_button2",
showMask: !0,
click: function() {
zy.guide.showNext();
}
});
},
1002: function() {
zy.guide.slideTower({
name: "guide_weapon_2",
showMask: !0,
click: function() {
zy.guide.showNext();
}
});
},
1003: function() {
zy.guide.hit({
name: "guide_weapon_0",
showMask: !0,
click: function() {
zy.guide.showNext();
}
});
},
1004: function() {
zy.guide.hit({
name: "guide_upgradeBtn",
showMask: !0,
click: function() {
zy.guide.showNext();
}
});
},
1005: function() {
zy.guide.hit({
name: "guide_skill_1",
showMask: !0,
click: function() {
zy.guide.showNext();
}
});
},
1006: function() {
zy.guide.hit({
name: "guide_skill_2",
showMask: !0,
click: function() {
setTimeout(function() {
zy.guide.showNext();
}, 500);
}
});
},
1007: function() {
zy.guide.hit({
name: "guide_skill_3",
showMask: !0,
click: function() {
setTimeout(function() {
zy.guide.showNext();
}, 500);
}
});
},
1008: function() {
zy.guide.hit({
name: "guide_button_add_time",
showMask: !0,
click: function() {
setTimeout(function() {
zy.guide.showNext();
}, 500);
}
});
},
1009: function() {
zy.guide.look({
name: "guide_skill_progressBar",
showMask: !0,
click: function() {
zy.guide.showNext();
e("GameManager").setGamePauseLogic(!1);
}
});
},
1010: function() {
zy.guide.hit({
name: "guide_button1",
showMask: !0,
click: function() {
zy.guide.showNext();
}
});
},
1011: function() {
zy.guide.hit({
name: "guide_upgrade_hp",
showMask: !0,
click: function() {
zy.guide.showNext();
}
});
},
1012: function() {
zy.guide.hit({
name: "guide_button3",
showMask: !0,
click: function() {
zy.guide.showNext();
}
});
},
1013: function() {
zy.guide.hit({
name: "guide_free_coins",
showMask: !0,
click: function() {
setTimeout(function() {
zy.guide.showNext();
}, 500);
}
});
}
};
cc.Class({
extends: cc.Component,
statics: {
OPEN_GUIDE: !0,
CFG: a,
init: function(e) {
cc.log("===init guide: ", e);
this.step = e.step;
this.stepList = [];
this.cb = null;
1001 == this.step && (this.step = 0);
this.OPEN_GUIDE ? this.openStatus = !0 : this.openStatus = !1;
this.node = null;
this.maskNode = null;
},
setStep: function(e) {
this.step = e;
},
setOpenStatus: function(e) {
this.openStatus = e;
},
getOpenStatus: function() {
return this.openStatus;
},
getNextStep: function() {
if (zy.guide.getOpenStatus()) return this.stepList[0];
},
addStep: function(e) {
0 == this.stepList.length && this.stepList.push(e);
},
checkGuide: function() {
var e = n[this.step];
if (e) {
this.stepList = zy.utils.clone(e);
zy.guide.showNext();
}
},
showNext: function(e, t) {
if (zy.guide.getOpenStatus()) if (e) this.CFG[e](t); else {
var i = this.stepList.shift();
if (null == i) zy.guide.clean(); else {
this.step = i;
cc.log("zy.guide.show", i);
this.CFG[this.step]();
}
}
},
hit: function(e) {
var t = this;
this.hideMask();
var i = e.name, n = zy.ui.seekChildByName(zy.director.getSceneCanvas(), i);
if (n) {
var a = n.scale, o = n.position, s = n.parent, r = n.zIndex, l = s.convertToWorldSpaceAR(o);
n.parent = this.node;
n.position = this.node.convertToNodeSpaceAR(l);
n.zIndex = 1;
n.scale = a;
var c = n.getComponent(cc.Animation);
c && c.play("guide_shake", 0);
cc.log("===oriPos:" + JSON.stringify(o));
cc.log("===newPos:" + JSON.stringify(n.position));
var h = null;
e.showMask && (h = this.createMaskNode(n, this.node, e.digging));
n.on(cc.Node.EventType.TOUCH_START, function i() {
cc.log("===click guide hit node");
n.off(cc.Node.EventType.TOUCH_START, i, t, !0);
n.parent = s;
n.position = o;
n.zIndex = r;
if (c) {
c.setCurrentTime(0, "guide_shake");
c.stop("guide_shake");
}
cc.isValid(h) && h.destroy();
e.click && e.click();
}, this, !0);
} else {
var u = cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
t.hit(e);
}));
this.node.runAction(u);
}
},
slideTower: function(e) {
var t = this;
this.hideMask();
var i = e.name, n = zy.ui.seekChildByName(zy.director.getSceneCanvas(), i);
if (n) {
var a = n.scale, o = n.position, s = n.parent, r = n.zIndex, l = s.convertToWorldSpaceAR(o);
n.parent = this.node;
n.position = this.node.convertToNodeSpaceAR(l);
n.zIndex = 1;
n.scale = a;
var c = null;
e.showMask && (c = this.createMaskNode(n, this.node, e.digging));
var h = function i() {
t.node.off(cc.Node.EventType.TOUCH_START, i, t, !0);
n.parent = s;
n.position = o;
n.zIndex = r;
t.slideAniNode.destroy();
cc.isValid(c) && c.destroy();
e.click && e.click();
};
cc.loader.loadRes("MainGame/Ui/gun_drag", cc.Prefab, function(e, i) {
if (e) cc.log(e); else {
var a = t.slideAniNode = cc.instantiate(i);
a.zIndex = 2;
a.parent = t.node;
a.position = t.node.convertToNodeSpaceAR(n.parent.convertToWorldSpaceAR(n.position));
a.getComponent(cc.Animation).play("guide_drag", 0);
t.node.on(cc.Node.EventType.TOUCH_START, h, t, !0);
}
});
} else {
var u = cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
t.slideTower(e);
}));
this.node.runAction(u);
}
},
look: function(e) {
var t = this;
this.hideMask();
var i = e.name, n = zy.ui.seekChildByName(zy.director.getSceneCanvas(), i);
if (n) {
var a = n.scale, o = n.position, s = n.parent, r = n.zIndex, l = s.convertToWorldSpaceAR(o);
n.parent = this.node;
n.position = this.node.convertToNodeSpaceAR(l);
n.zIndex = 1;
n.scale = a;
cc.log("===oriPos:" + JSON.stringify(o));
cc.log("===newPos:" + JSON.stringify(n.position));
var c = null;
e.showMask && (c = this.createMaskNode(n, this.node, e.digging));
this.node.on(cc.Node.EventType.TOUCH_START, function i() {
cc.log("===click guide look node");
t.node.off(cc.Node.EventType.TOUCH_START, i, t, !0);
n.parent = s;
n.position = o;
n.zIndex = r;
cc.isValid(c) && c.destroy();
e.click && e.click();
}, this, !0);
} else {
var h = cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
t.hit(e);
}));
this.node.runAction(h);
}
},
createMaskNode: function(e, t, i) {
var n = zy.Node.createNode({
name: "guideMaskNode",
parent: t,
position: cc.v2(0, 0)
});
if (i) {
var a = Math.max(e.width, e.height), o = e.parent.convertToWorldSpaceAR(e.position), s = n.convertToNodeSpaceAR(o), r = n.addComponent(cc.Mask);
r.type = cc.Mask.Type.RECT;
r.inverted = !0;
r._graphics.lineWidth = 1;
r._graphics.strokeColor = cc.color(255, 0, 0);
r._graphics.fillColor = cc.color(0, 255, 0);
r._graphics.circle(s.x, s.y, .5 * a);
r._graphics.fill();
r._graphics.stroke();
}
var l = zy.Node.createNode({
parent: n,
position: cc.v2(0, 0)
});
l.addComponent(zy.Sprite);
zy.Sprite.updateNode(l, {
url: "textures/common/guide/guide_mask",
width: 1.5 * zy.constData.DesignSize.width,
height: 1.5 * zy.constData.DesignSize.height
});
return n;
},
checkStatus: function() {
this.openStatus && (cc.isValid(this.node) || (this.node = zy.Button.createNode({
name: "guideNode",
zIndex: zy.constData.ZIndex.GUIDE,
parent: zy.director.getUiRoot(),
touchAction: !1,
width: 2 * zy.constData.DesignSize.width,
height: 2 * zy.constData.DesignSize.height
})));
},
hideMask: function() {
cc.isValid(this.maskNode) && (this.maskNode.active = !1);
},
showMask: function() {
this.openStatus && (this.maskNode.active = !0);
},
isShowMask: function() {
return !(!cc.isValid(this.node) || !cc.isValid(this.maskNode)) && (this.node.active && this.maskNode.active);
},
clean: function() {
this.openStatus = !1;
this.step = -1;
if (cc.isValid(this.node)) {
this.node.destroy();
this.node = null;
}
}
}
});
cc._RF.pop();
}, {
GameManager: "GameManager"
} ],
Helpers: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2a7e1T6l1ZPjrYdWFdyJTqB", "Helpers");
t.exports = {
addClickEvent: function(e, t, i, n) {
console.log(i + ":" + n);
var a = new cc.Component.EventHandler();
a.target = t;
a.component = i;
a.handler = n;
e.getComponent(cc.Button).clickEvents.push(a);
},
getRandomInt: function(e, t) {
return Math.floor(Math.random() * (t - e)) + e;
},
setlocalStorageData: function(e, t, i, n) {
var a = t.encrypt(n, e, 256);
cc.sys.localStorage.setItem(i, a);
},
getlocalStorageData: function(e, t, i) {
var n = cc.sys.localStorage.getItem(i);
return t.decrypt(n, e, 256);
},
formatTime: function(e) {
var t = e.getFullYear(), i = e.getMonth() + 1, a = e.getDate(), o = e.getHours(), s = e.getMinutes(), r = e.getSeconds();
return [ t, i, a ].map(n).join("/") + " " + [ o, s, r ].map(n).join(":");
},
quickSort: a,
binSearch: function(e, t) {
var i = a(e), n = i.length - 1, o = 0;
for (;o <= n; ) {
var s = Math.floor((n + o) / 2);
if (i[s] < t) o = s + 1; else {
if (!(i[s] > t)) return s;
n = s - 1;
}
}
return -1;
},
countDown: function e() {
var t = new Date();
var i = t.getTime();
var n = new Date(Date.parse("2022-8-20 18:08:21".replace(/-/g, "/"))).getTime();
var a = n - i;
var o = void 0, s = void 0, r = void 0, l = void 0, c = void 0;
if (a >= 0) {
o = Math.floor(a / 1e3 / 60 / 60 / 24);
s = Math.floor(a / 1e3 / 60 / 60 % 24 + 24 * o);
r = Math.floor(a / 1e3 / 60 % 60);
l = Math.floor(a / 1e3 % 60);
(c = Math.floor(a % 1e3)) < 100 && (c = "0" + c);
l < 10 && (l = "0" + l);
r < 10 && (r = "0" + r);
s < 10 && (s = "0" + s);
} else console.log("已截止");
console.log("时 ：= " + s);
console.log("分 ：= " + r);
console.log("秒 ：= " + l);
setTimeout(e, 50);
},
toPercent: function(e, t) {
var i = Math.ceil(e), n = Math.ceil(t);
return (Math.round(i / n * 1e4) / 1e4).toFixed(2);
},
toPercentInteger: function(e, t) {
var i = Math.ceil(e);
i <= 0 && (i = 0);
var n = Math.ceil(t), a = Math.round(i / n * 1e4 / 100);
n <= 0 && (a = 0);
return a;
},
formatTimes: function(e) {
var t = 0, i = 0, n = 0, a = 0, o = 0, s = 1e3 * e;
if (s >= 0) {
t = Math.floor(s / 1e3 / 60 / 60 / 24);
i = Math.floor(s / 1e3 / 60 / 60 % 24 + 24 * t);
n = Math.floor(s / 1e3 / 60 % 60);
a = Math.floor(s / 1e3 % 60);
(o = Math.floor(s % 1e3)) < 100 && (o = "0" + o);
a < 10 && (a = "0" + a);
n < 10 && (n = "0" + n);
i < 10 && (i = "0" + i);
} else console.log("已截止");
n >= 30 && (n = 30);
return e <= 0 ? "00:00" : n + ":" + a;
},
ToNumber: function(e) {
if (null == e) return;
if (e) {
var t = Number(e);
if (t) return t;
}
}
};
function n(e) {
return (e = e.toString())[1] ? e : "0" + e;
}
function a(e) {
if (0 == e.length) return [];
for (var t = [], i = [], n = Math.floor(e.length / 2), o = e.splice(n, 1), s = 1; s < e.length; s++) e[s] < o ? t.push(e[s]) : i.push(e[s]);
return a(t).concat(o, a(i));
}
cc._RF.pop();
}, {} ],
HpUpData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0c591uChmhPFbCt4ZZxWwpb", "HpUpData");
var n = e("./../Lib/common/UtilsOther"), a = e("./DataBase");
cc.Class({
extends: a,
ctor: function() {
this.fileDir = "data/hpUpData";
},
initData: function(e) {
if (e) {
this.dataObj = e;
this.dataLen = e.length;
this.dataObj = n.arrayToDict(this.dataObj, "level");
}
},
getHP: function(e) {
return this.dataObj[e].hp;
},
getPrice: function(e) {
return this.dataObj[e].price;
},
getMaxLevel: function() {
return this.dataLen;
}
});
cc._RF.pop();
}, {
"./../Lib/common/UtilsOther": "UtilsOther",
"./DataBase": "DataBase"
} ],
HttpProxy: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ae20cwKtwdBMZtY6Ie6ZibZ", "HttpProxy");
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = e("./GameHttp"), o = e("./../encrypt/Md5").md5_hex_hmac, s = e("./../../Platform/MKSystem"), r = e("./../../MainGame/Manager/GameManager"), l = e("./../../Platform/MKSystem"), c = 5, h = 5, u = "http://mini-game.zhanyougame.com:" + [ 8010, 8011, 8012, 8015, 8016, 8017 ][Math.round(5 * Math.random())] + "/zc_game?m=", d = cc.Class({
statics: {
instance: null,
getInstance: function() {
this.instance || (this.instance = new d());
return this.instance;
}
},
sendDataEventZCUC: function(t, i, n) {
var o = this;
if (cc.sys.isNative) {
var s = t.eventname, h = {
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
android_id: l.getMobilePhoneID(),
advertising_id: zy.device.advertisingId,
level: r.getLevel(),
money: r.getPlayerGold(),
sign: ""
}, u = "", d = "";
if (cc.sys.os === cc.sys.OS_ANDROID) {
u = ZC_TRACK_CFG.android.appkey;
h.appid = ZC_TRACK_CFG.android.appid;
d = ZC_TRACK_API + "c=android_track";
} else {
u = ZC_TRACK_CFG.ios.appkey;
h.appid = ZC_TRACK_CFG.ios.appid;
d = ZC_TRACK_API + "c=iostrack";
}
"Active" == s ? d += "&m=index" : "Account" == s && (d += "&m=reg");
var g = e("./../../Lib/encrypt/Md5").md5_hex, p = h.android_id + h.appid + h.channel + h.device_name + h.idfa + h.jailbreak + h.level + h.mac + h.money + h.os_name + h.os_version + h.product + h.ssid + u;
h.sign = g(p);
cc.log("===> send zcapi: " + d);
cc.log("===> send zcapi: data=" + JSON.stringify(h));
a.httpPost(d, "data=" + JSON.stringify(h), function(e) {
cc.log("===>response:" + e.getBody());
if (e.isOk()) {
cc.log("===>requrest: " + d + " 成功。");
i && i();
} else {
cc.log("===>requrest: " + d + " 失败。");
n && n();
if (c > 0) {
c -= 1;
setTimeout(function() {
o.sendDataEventZCUC({
eventname: "Active"
});
}, 5e3);
}
}
});
}
},
login: function(e, t) {
var i = this;
cc.log("===urlroot:" + u);
var n = {
energy: 1,
focusingatt: r.getCurrSkillTime(),
vip: r.getPlayerLevel(),
otherpassplies: 1,
kaleidoscopeatt: r.getCurrSkillTime(),
salvoatt: r.getCurrSkillTime(),
loginday: 1,
diamond: 10,
gold: r.getPlayerGold(),
allautoatt: 10,
normalpassplies: 1,
cversion: s.getAppVersion(),
healthlevel: zy.dataMng.userData.hpLevel,
goldrewardlevel: zy.dataMng.userData.freeCoinsLevel,
level: r.getLevel(),
experience: r.getPlayer_UpgradeprogressNum(),
stamina: zy.dataMng.userData.phPower,
channel: CHANNEL_ID,
macaddress: zy.device.mac,
idfa: zy.device.idfa
}, a = u + "user_join_game";
this.serverRequest(a, n, e, function() {
t && t();
if (h > 0) {
h -= 1;
setTimeout(function() {
i.login();
}, 5e3);
}
});
},
updateBase: function(e, t, i, n) {
var a = {
baseinfoid: e,
value: t
}, o = u + "base_info_change";
this.serverRequest(o, a, i, n);
},
updateTurret: function(e, t, i, n, a, o) {
var s = {
level: t,
turretid: e,
star: i,
lock: n
}, r = u + "turret_info";
this.serverRequest(r, s, a, o);
},
updateBuilding: function(e, t, i, n) {
var a = {
buildingid: e,
lock: t
}, o = u + "building_info";
this.serverRequest(o, a, i, n);
},
updateTreasure: function(e, t, i, n) {
var a = {
treasureid: e,
lock: t
}, o = u + "treasure_info";
this.serverRequest(o, a, i, n);
},
watchAds: function(e, t, i) {
var n = {
adstationid: e
}, a = u + "watch_advertisement";
this.serverRequest(a, n, t, i);
},
clickButton: function(e, t, i) {
var n = {
buttonid: e
}, a = u + "click_button";
this.serverRequest(a, n, t, i);
},
getServerTime: function(e, t) {
var i = u + "request_unixtime";
this.serverRequest(i, {}, e, t);
},
serverRequest: function(e, t, i, s) {
cc.log("===>serverRequest: " + ("undefined" == typeof t ? "undefined" : n(t)) + " | " + JSON.stringify(t));
t = "string" == typeof t ? t : JSON.stringify(t);
var r = o("zygame", t), c = l.getMobilePhoneID();
c = void 0 == c ? "" : c;
cc.log("uid=" + c);
var h = {
data: JSON.parse(t),
encrypt: r,
roleid: c,
token: ""
};
h = JSON.stringify(h);
a.httpPost(e, h, function(t) {
cc.log("===>response:" + t.getBody());
if (t.isOk()) {
cc.log("===>requrest: " + e + " 成功。");
i && i(JSON.parse(t.getBody()));
} else {
cc.log("===>requrest: " + e + " 失败。");
s && s(t.getError() || t.getBody());
}
});
}
});
cc._RF.pop();
}, {
"./../../Lib/encrypt/Md5": "Md5",
"./../../MainGame/Manager/GameManager": "GameManager",
"./../../Platform/MKSystem": "MKSystem",
"./../encrypt/Md5": "Md5",
"./GameHttp": "GameHttp"
} ],
InitScene: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "be329An/tdHbbITHsY2sOVj", "InitScene");
cc.Class({
extends: cc.Component,
properties: {
logoAni: sp.Skeleton
},
onLoad: function() {
cc.debug.setDisplayStats(!1);
this.init();
},
start: function() {
var t = this;
e("./Platform/MKSystem").rmSplash();
this.loadComplete = !1;
this.logoAni.setCompleteListener(function() {
t.logoAni.setCompleteListener(null);
t.schedule(t.checkStartGame, .1);
});
this.logoAni.setAnimation(0, "play1", !1);
},
checkStartGame: function(e) {
cc.log("===> check start game");
if (this.loadComplete) {
this.unschedule(this.checkStartGame);
zy.director.loadScene("MainGame");
}
},
init: function() {
var t = this;
window.i18n = e("./Lib/i18n/i18n");
zy.event = new cc.EventTarget();
zy.utils = e("./Lib/common/UtilsOther");
var i = e("./Lib/net/HttpProxy");
zy.httpProxy = new i();
zy.constData = e("./data/ConstData");
zy.constData.init();
zy.shaderUtils = e("./core/ShaderUtils");
zy.shaderUtils.init();
zy.ui = e("./core/UI");
zy.ui.init();
zy.cornerData = e("./data/CornerData");
zy.cornerData.init([]);
zy.device = e("./core/Device");
zy.device.init();
zy.director = e("./core/Director");
zy.director.init();
cc.director.preloadScene("MainGame");
var n = e("./data/DataMng");
zy.dataMng = new n();
zy.dataMng.loadDataFromLocalFile(function(e, t) {
cc.log("load local cfg: %d/%d", e, t);
}, function() {
zy.guide = e("./Lib/common/Guide");
zy.guide.init({
step: zy.dataMng.userData.guide
});
t.loadComplete = !0;
});
}
});
cc._RF.pop();
}, {
"./Lib/common/Guide": "Guide",
"./Lib/common/UtilsOther": "UtilsOther",
"./Lib/i18n/i18n": "i18n",
"./Lib/net/HttpProxy": "HttpProxy",
"./Platform/MKSystem": "MKSystem",
"./core/Device": "Device",
"./core/Director": "Director",
"./core/ShaderUtils": "ShaderUtils",
"./core/UI": "UI",
"./data/ConstData": "ConstData",
"./data/CornerData": "CornerData",
"./data/DataMng": "DataMng"
} ],
LabelInteger: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ac910EiJ9xIX6/aDUGztKZK", "LabelInteger");
e("UtilsOther");
var n = cc.Enum({
None: 0,
ThousandSeparator: 1,
FormatTime: 2
}), a = function(e) {
var t = void 0;
if (e >= 0) {
var i = Math.floor(e / 3600), n = Math.floor(e / 60) % 60, a = e % 60, o = parseInt(i / 24);
if (1 == o) return o + " day";
if (o > 1) return o + " days";
t = o > 0 ? o + "day " + ("00" + (i -= 24 * o)).slice(-2) + ":" : i > 0 ? ("00" + i).slice(-2) + ":" : "";
n < 10 && (t += "0");
t += n + ":";
a < 10 && (t += "0");
t += parseInt(a);
}
return t;
};
cc.Class({
extends: cc.Label,
properties: {
formType: {
tooltip: "None: 不做格式化\nThousandSeparator: 3位逗号分隔\nFormatTime: 格式化时间",
type: n,
default: n.None,
notify: function(e) {
this.setValue(this.string);
}
},
animationDuration: {
tooltip: "动画时间",
default: .5
},
_textKey: 0,
string: {
override: !0,
tooltip: "必须是数字",
get: function() {
return this._textKey;
},
set: function(e) {
this._textKey = Number(e);
if (this._sgNode) {
switch (this.formType) {
case n.ThousandSeparator:
e = e.toString().split("").reverse().join("").replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, "$1,").split("").reverse().join("");
break;

case n.FormatTime:
e = a(e);
}
this._sgNode.setString(e);
this._updateNodeSize();
}
}
},
_curValue: 0,
_toValue: 0,
_delta: 0
},
setValue: function(e, t) {
("" === e || null === e || isNaN(e)) && cc.assert(!1, "The value of LabelInteger must be a Number!");
if (t) this._toValue = e; else {
this._toValue = e;
this._curValue = e;
this.string = e;
}
this._delta = 0;
},
setFormString: function(e) {
switch (this.formType) {
case n.None:
this.string = e;
break;

case n.ThousandSeparator:
this.string = e.split("").reverse().join("").replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, "$1,").split("").reverse().join("");
break;

case n.FormatTime:
this.string = a(e);
}
},
update: function(e) {
if (this._toValue != this._curValue) {
0 == this._delta && (this._delta = this._toValue - this._curValue);
var t = e / this.animationDuration * this._delta;
if (this._delta > 0) {
0 == (t = parseInt(t)) && (t = 1);
this._curValue += t;
this._curValue = Math.min(this._curValue, this._toValue);
} else {
t = -t;
0 == (t = parseInt(t)) && (t = 1);
this._curValue -= t;
this._curValue = Math.max(this._curValue, this._toValue);
}
this.string = this._curValue;
this._toValue == this._curValue && (this._delta = 0);
}
},
onLoad: function() {
this.setValue(this.string);
}
});
cc._RF.pop();
}, {
UtilsOther: "UtilsOther"
} ],
Label: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "64cd4KWD1hGiZ4uUhNcZKVY", "Label");
var n = e("i18n"), a = cc.Class({
extends: cc.Label,
statics: {
createNode: function(e) {
var t = new cc.Node();
t.addComponent(zy.Label);
zy.Label.updateNode(t, e);
return t;
},
updateNode: function(e, t) {
var i = e.getComponent(zy.Label);
i || (i = e.getComponent(cc.Label));
var n = t.font ? t.font : zy.constData.Font.FONT_NORMAL, a = t.loadCallback, o = t.systemFont, s = function() {
t.overflow && (i.overflow = t.overflow);
t.hasOwnProperty("string") && (i.string = t.string);
t.hasOwnProperty("verticalAlign") && (i.verticalAlign = t.verticalAlign);
t.fontSize && (i.fontSize = t.fontSize);
if (t.outlineWidth || t.outlineColor) {
var n = e.getComponent(cc.LabelOutline);
n || (n = e.addComponent(cc.LabelOutline));
t.outlineWidth && (n.width = t.outlineWidth);
t.outlineColor && (n.color = t.outlineColor);
}
}.bind(this);
if (o) {
s();
a && a(null, e);
} else cc.loader.loadRes(n, cc.Font, null, function(t, n) {
if (t) cc.log("zy.Label.updateLabel err:", t); else if (cc.isValid(e)) {
i.font = n;
s();
}
a && a(t, e);
}.bind(this));
zy.Node.updateNode(e, t);
},
createAttrNode: function(e, t) {
var i = zy.Node.createNode(t), n = i.addComponent(cc.Layout);
n.type = cc.Layout.Type.HORIZONTAL;
n.resizeMode = cc.Layout.ResizeMode.CONTAINER;
var a = [];
for (var o in e) {
var s = null, r = e[o];
r.anchor = r.anchor ? r.anchor : cc.v2(0, .5);
r.parent = i;
if ("text" == r.type) {
s = zy.Label.createNode(r);
r.color && (s.color = r.color);
}
s.__type = r.type;
a.push(s);
}
i.subNodes = a;
return i;
},
updateAttrNode: function(e, t, i) {
var n = e.subNodes;
for (var a in t) {
var o = t[a], s = n[a];
"text" == s.__type && zy.Label.updateNode(s, o);
}
}
},
properties: {
textKey: {
override: !0,
default: "",
multiline: !0,
tooltip: "Enter i18n key here",
notify: function() {
this.string = this.localizedString;
}
},
textValueOption: {
override: !0,
default: "",
multiline: !0,
tooltip: "Enter textValueOption here",
notify: function(e) {
this.string = this.localizedString;
}
},
localizedString: {
override: !0,
tooltip: "Here shows the localized string of Text Key",
get: function() {
var e = void 0;
if (this.textValueOption && "" != this.textValueOption) try {
e = JSON.parse(this.textValueOption);
} catch (e) {}
return n.t(this.textKey, e);
},
set: function(e) {
this.textKey = e;
0;
}
}
},
onLoad: function() {
this.localizedString && (this.string = this.localizedString);
}
});
zy.Label = t.exports = a;
cc._RF.pop();
}, {
i18n: "i18n"
} ],
LevelData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6c73cS5lKhHgp464FOIUwV4", "LevelData");
t.exports = {
LevelData: [ {
levelName: "level 0",
themeID: 1e4,
enemyTotal: 50,
enemyTotalBlood: 1600,
enemyInterval: .5,
group: 4,
gold: 40,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 100, 0, 0, 0, 0 ],
teamGeneratingrule: [ 0, 1, 10, 4 ],
team: [ {
count: 12,
enemyBloodPercentage: .25
} ]
}, {
index: 2,
enemyiDWeight: [ 100, 0, 0, 0, 0 ],
teamGeneratingrule: [ 1, 1, 4, 10 ],
team: [ {
count: 12,
enemyBloodPercentage: .25
} ]
}, {
index: 3,
enemyiDWeight: [ 90, 0, 10, 0, 0 ],
teamGeneratingrule: [ 0, 1, 52, 46 ],
team: [ {
count: 13,
enemyBloodPercentage: .25
} ]
}, {
index: 4,
enemyiDWeight: [ 70, 0, 20, 10, 0 ],
teamGeneratingrule: [ 0, 1, 24, 18 ],
team: [ {
count: 13,
enemyBloodPercentage: .25
} ]
} ]
}, {
levelName: "level 1",
themeID: 10001,
enemyTotal: 60,
enemyTotalBlood: 1800,
enemyInterval: .5,
group: 4,
gold: 44,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 80, 0, 10, 10, 0 ],
teamGeneratingrule: [ 1, 1, 52, 4 ],
team: [ {
count: 15,
enemyBloodPercentage: .25
} ]
}, {
index: 2,
enemyiDWeight: [ 60, 0, 20, 20, 0 ],
teamGeneratingrule: [ 1, 1, 10, 18 ],
team: [ {
count: 15,
enemyBloodPercentage: .25
} ]
}, {
index: 3,
enemyiDWeight: [ 60, 10, 10, 10, 10 ],
teamGeneratingrule: [ 1, 1, 24, 32 ],
team: [ {
count: 15,
enemyBloodPercentage: .25
} ]
}, {
index: 4,
enemyiDWeight: [ 40, 30, 10, 10, 10 ],
teamGeneratingrule: [ 1, 1, 38, 46 ],
team: [ {
count: 15,
enemyBloodPercentage: .25
} ]
} ]
}, {
levelName: "level 2",
themeID: 10002,
enemyTotal: 70,
enemyTotalBlood: 2460,
enemyInterval: .5,
group: 5,
gold: 49,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 0, 20, 30, 0, 50 ],
teamGeneratingrule: [ 1, 1, 32, 38 ],
team: [ {
count: 14,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 50, 0, 30, 0, 20 ],
teamGeneratingrule: [ 0, 1, 31, 18 ],
team: [ {
count: 14,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 0, 50, 10, 30, 20 ],
teamGeneratingrule: [ 0, 1, 28, 14 ],
team: [ {
count: 14,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 20, 30, 50 ],
teamGeneratingrule: [ 0, 1, 28, 14 ],
team: [ {
count: 14,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 0, 0, 30, 50, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 14,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 3",
themeID: 10003,
enemyTotal: 80,
enemyTotalBlood: 2760,
enemyInterval: .5,
group: 5,
gold: 54,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 0, 0, 50, 20, 30 ],
teamGeneratingrule: [ 1, 1, 4, 10 ],
team: [ {
count: 16,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 20, 30, 50, 0 ],
teamGeneratingrule: [ 1, 1, 46, 52 ],
team: [ {
count: 16,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 0, 30, 20, 0, 50 ],
teamGeneratingrule: [ 1, 1, 46, 52 ],
team: [ {
count: 16,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 50, 0, 0, 20, 30 ],
teamGeneratingrule: [ 0, 1, 38, 32 ],
team: [ {
count: 16,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 0, 30, 20, 0 ],
teamGeneratingrule: [ 0, 1, 24, 14 ],
team: [ {
count: 16,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 4",
themeID: 10004,
enemyTotal: 90,
enemyTotalBlood: 3180,
enemyInterval: .5,
group: 5,
gold: 60,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 50, 0, 20, 0, 30 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 18,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 20, 0, 0, 50, 30 ],
teamGeneratingrule: [ 1, 1, 4, 17 ],
team: [ {
count: 18,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 0, 20, 20, 20, 40 ],
teamGeneratingrule: [ 0, 1, 0, 42 ],
team: [ {
count: 18,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 1, 1, 4, 10 ],
team: [ {
count: 18,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 0, 0, 20, 30, 50 ],
teamGeneratingrule: [ 1, 1, 28, 42 ],
team: [ {
count: 18,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 5",
themeID: 10005,
enemyTotal: 100,
enemyTotalBlood: 4130,
enemyInterval: .5,
group: 5,
gold: 66,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 0, 0, 20, 50, 30 ],
teamGeneratingrule: [ 1, 1, 28, 38 ],
team: [ {
count: 20,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 30, 0, 20, 0, 50 ],
teamGeneratingrule: [ 1, 1, 32, 45 ],
team: [ {
count: 20,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 0, 0, 50, 30, 20 ],
teamGeneratingrule: [ 0, 1, 31, 18 ],
team: [ {
count: 20,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 50, 30, 0, 20, 0 ],
teamGeneratingrule: [ 1, 1, 4, 17 ],
team: [ {
count: 20,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 30, 0, 20, 0, 50 ],
teamGeneratingrule: [ 0, 1, 24, 14 ],
team: [ {
count: 20,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 6",
themeID: 10006,
enemyTotal: 110,
enemyTotalBlood: 4620,
enemyInterval: .5,
group: 5,
gold: 73,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 0, 20, 40, 20 ],
teamGeneratingrule: [ 0, 1, 42, 28 ],
team: [ {
count: 22,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 20, 30, 50, 0 ],
teamGeneratingrule: [ 1, 1, 32, 38 ],
team: [ {
count: 22,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 0, 20, 0, 30, 50 ],
teamGeneratingrule: [ 1, 1, 4, 17 ],
team: [ {
count: 22,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 30, 0, 0, 20, 50 ],
teamGeneratingrule: [ 0, 1, 42, 28 ],
team: [ {
count: 22,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 0, 50, 30, 0, 20 ],
teamGeneratingrule: [ 0, 1, 0, 42 ],
team: [ {
count: 22,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 7",
themeID: 10007,
enemyTotal: 120,
enemyTotalBlood: 5250,
enemyInterval: .5,
group: 5,
gold: 81,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 0, 20, 20, 40, 20 ],
teamGeneratingrule: [ 0, 1, 45, 32 ],
team: [ {
count: 24,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 20, 20, 20, 20, 20 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 24,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 30, 0, 50, 0 ],
teamGeneratingrule: [ 1, 1, 14, 28 ],
team: [ {
count: 24,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 30, 0, 50, 0, 20 ],
teamGeneratingrule: [ 0, 1, 45, 32 ],
team: [ {
count: 24,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 0, 30, 50, 0, 20 ],
teamGeneratingrule: [ 0, 1, 31, 25 ],
team: [ {
count: 24,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 8",
themeID: 10008,
enemyTotal: 130,
enemyTotalBlood: 6640,
enemyInterval: .5,
group: 5,
gold: 89,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 0, 0, 50, 30, 20 ],
teamGeneratingrule: [ 0, 1, 45, 39 ],
team: [ {
count: 26,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 20, 50, 30, 0 ],
teamGeneratingrule: [ 0, 1, 10, 0 ],
team: [ {
count: 26,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 30, 50, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 42, 0 ],
team: [ {
count: 26,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 30, 20, 0, 50 ],
teamGeneratingrule: [ 0, 1, 10, 0 ],
team: [ {
count: 26,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 0, 50, 30, 20, 0 ],
teamGeneratingrule: [ 1, 1, 14, 28 ],
team: [ {
count: 26,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 9",
themeID: 10009,
enemyTotal: 140,
enemyTotalBlood: 7440,
enemyInterval: .5,
group: 5,
gold: 98,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 28,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 28,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 28,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 28,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 28,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 10",
themeID: 10010,
enemyTotal: 150,
enemyTotalBlood: 9450,
enemyInterval: .5,
group: 5,
gold: 109,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 30, 0, 0, 50 ],
teamGeneratingrule: [ 0, 1, 45, 39 ],
team: [ {
count: 30,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 20, 0, 50, 30, 0 ],
teamGeneratingrule: [ 0, 1, 3, 53 ],
team: [ {
count: 30,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 50, 0, 20, 0, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 30,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 20, 0, 20, 20, 40 ],
teamGeneratingrule: [ 1, 1, 0, 14 ],
team: [ {
count: 30,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 20, 20, 20, 20, 20 ],
teamGeneratingrule: [ 0, 1, 24, 14 ],
team: [ {
count: 30,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 11",
themeID: 10011,
enemyTotal: 160,
enemyTotalBlood: 10260,
enemyInterval: .5,
group: 5,
gold: 120,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 0, 40, 20 ],
teamGeneratingrule: [ 0, 1, 31, 18 ],
team: [ {
count: 32,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 20, 50, 0, 30, 0 ],
teamGeneratingrule: [ 0, 1, 10, 4 ],
team: [ {
count: 32,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 20, 20, 20 ],
teamGeneratingrule: [ 0, 1, 3, 46 ],
team: [ {
count: 32,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 20, 30, 50 ],
teamGeneratingrule: [ 1, 1, 28, 38 ],
team: [ {
count: 32,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 0, 50, 20, 0, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 32,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 12",
themeID: 10012,
enemyTotal: 170,
enemyTotalBlood: 11430,
enemyInterval: .5,
group: 5,
gold: 133,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 0, 30, 50, 0 ],
teamGeneratingrule: [ 0, 1, 0, 42 ],
team: [ {
count: 34,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 0, 50, 30, 20 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 34,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 40, 20, 20, 20, 0 ],
teamGeneratingrule: [ 1, 1, 28, 38 ],
team: [ {
count: 34,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 30, 0, 0, 50, 20 ],
teamGeneratingrule: [ 0, 1, 45, 32 ],
team: [ {
count: 34,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 0, 30, 50, 0, 20 ],
teamGeneratingrule: [ 0, 1, 52, 46 ],
team: [ {
count: 34,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 13",
themeID: 10013,
enemyTotal: 180,
enemyTotalBlood: 12690,
enemyInterval: .5,
group: 5,
gold: 147,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 40, 0, 20, 20, 20 ],
teamGeneratingrule: [ 1, 1, 53, 3 ],
team: [ {
count: 36,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 1, 1, 14, 28 ],
team: [ {
count: 36,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 40, 20, 0, 20, 20 ],
teamGeneratingrule: [ 1, 1, 4, 10 ],
team: [ {
count: 36,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 20, 0, 30, 50 ],
teamGeneratingrule: [ 1, 1, 28, 38 ],
team: [ {
count: 36,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 0, 1, 3, 53 ],
team: [ {
count: 36,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 14",
themeID: 10014,
enemyTotal: 190,
enemyTotalBlood: 15600,
enemyInterval: .5,
group: 5,
gold: 162,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 0, 50, 30, 20, 0 ],
teamGeneratingrule: [ 1, 1, 46, 52 ],
team: [ {
count: 38,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 30, 0, 50, 20 ],
teamGeneratingrule: [ 1, 1, 25, 31 ],
team: [ {
count: 38,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 0, 50, 0, 30, 20 ],
teamGeneratingrule: [ 0, 1, 45, 39 ],
team: [ {
count: 38,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 0, 1, 10, 4 ],
team: [ {
count: 38,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 30, 0, 50, 20, 0 ],
teamGeneratingrule: [ 1, 1, 42, 0 ],
team: [ {
count: 38,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 15",
themeID: 10015,
enemyTotal: 200,
enemyTotalBlood: 17600,
enemyInterval: .5,
group: 5,
gold: 179,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 40, 20, 0, 20, 20 ],
teamGeneratingrule: [ 1, 1, 42, 52 ],
team: [ {
count: 40,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 40, 20, 20, 0, 20 ],
teamGeneratingrule: [ 1, 1, 46, 52 ],
team: [ {
count: 40,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 0, 50, 20, 0, 30 ],
teamGeneratingrule: [ 0, 1, 45, 32 ],
team: [ {
count: 40,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 30, 0, 50, 20 ],
teamGeneratingrule: [ 1, 1, 28, 38 ],
team: [ {
count: 40,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 0, 50, 30, 0, 20 ],
teamGeneratingrule: [ 0, 1, 17, 4 ],
team: [ {
count: 40,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 16",
themeID: 10016,
enemyTotal: 210,
enemyTotalBlood: 18600,
enemyInterval: .5,
group: 5,
gold: 198,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 50, 30, 0, 20, 0 ],
teamGeneratingrule: [ 1, 1, 42, 52 ],
team: [ {
count: 42,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 0, 50, 20, 30 ],
teamGeneratingrule: [ 0, 1, 14, 0 ],
team: [ {
count: 42,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 30, 0, 20, 0, 50 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 42,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 20, 40, 20, 20, 0 ],
teamGeneratingrule: [ 0, 1, 10, 0 ],
team: [ {
count: 42,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 20, 50, 30, 0, 0 ],
teamGeneratingrule: [ 0, 1, 17, 4 ],
team: [ {
count: 42,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 17",
themeID: 10017,
enemyTotal: 220,
enemyTotalBlood: 19700,
enemyInterval: .5,
group: 5,
gold: 219,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 30, 20, 50, 0, 0 ],
teamGeneratingrule: [ 1, 1, 4, 17 ],
team: [ {
count: 44,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 50, 20, 0, 0, 30 ],
teamGeneratingrule: [ 0, 1, 38, 32 ],
team: [ {
count: 44,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 40, 0, 20, 20 ],
teamGeneratingrule: [ 0, 1, 31, 18 ],
team: [ {
count: 44,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 50, 20, 30 ],
teamGeneratingrule: [ 0, 1, 45, 32 ],
team: [ {
count: 44,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 0, 20, 30, 50, 0 ],
teamGeneratingrule: [ 1, 1, 46, 52 ],
team: [ {
count: 44,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 18",
themeID: 10018,
enemyTotal: 230,
enemyTotalBlood: 21200,
enemyInterval: .5,
group: 5,
gold: 242,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 0, 50, 20, 30, 0 ],
teamGeneratingrule: [ 0, 1, 14, 0 ],
team: [ {
count: 46,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 20, 50, 0, 0, 30 ],
teamGeneratingrule: [ 0, 1, 31, 25 ],
team: [ {
count: 46,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 0, 50, 20, 0, 30 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 46,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 20, 0, 30, 0, 50 ],
teamGeneratingrule: [ 0, 1, 14, 0 ],
team: [ {
count: 46,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 0, 20, 40, 20, 20 ],
teamGeneratingrule: [ 1, 1, 46, 52 ],
team: [ {
count: 46,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 19",
themeID: 10019,
enemyTotal: 240,
enemyTotalBlood: 22400,
enemyInterval: .5,
group: 5,
gold: 268,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 48,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 48,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 48,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 48,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 48,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 20",
themeID: 10020,
enemyTotal: 250,
enemyTotalBlood: 23900,
enemyInterval: .5,
group: 5,
gold: 296,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 50,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 50,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 50,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 50,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 50,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 21",
themeID: 10021,
enemyTotal: 260,
enemyTotalBlood: 25600,
enemyInterval: .5,
group: 5,
gold: 327,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 52,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 52,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 52,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 52,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 52,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 22",
themeID: 10022,
enemyTotal: 270,
enemyTotalBlood: 27200,
enemyInterval: .5,
group: 5,
gold: 362,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 54,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 54,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 54,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 54,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 54,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 23",
themeID: 10023,
enemyTotal: 280,
enemyTotalBlood: 28900,
enemyInterval: .5,
group: 5,
gold: 400,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 56,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 56,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 56,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 56,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 56,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 24",
themeID: 10024,
enemyTotal: 290,
enemyTotalBlood: 31100,
enemyInterval: .5,
group: 5,
gold: 442,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 58,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 58,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 58,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 58,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 58,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 25",
themeID: 10025,
enemyTotal: 300,
enemyTotalBlood: 32900,
enemyInterval: .5,
group: 5,
gold: 488,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 60,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 60,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 60,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 60,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 60,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 26",
themeID: 10026,
enemyTotal: 310,
enemyTotalBlood: 35100,
enemyInterval: .5,
group: 5,
gold: 539,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 62,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 62,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 62,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 62,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 62,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 27",
themeID: 10027,
enemyTotal: 320,
enemyTotalBlood: 37400,
enemyInterval: .5,
group: 5,
gold: 596,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 64,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 64,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 64,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 64,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 64,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 28",
themeID: 10028,
enemyTotal: 330,
enemyTotalBlood: 39800,
enemyInterval: .5,
group: 5,
gold: 659,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 66,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 66,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 66,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 66,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 66,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 29",
themeID: 10029,
enemyTotal: 340,
enemyTotalBlood: 42700,
enemyInterval: .5,
group: 5,
gold: 728,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 68,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 68,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 68,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 68,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 68,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 30",
themeID: 10030,
enemyTotal: 350,
enemyTotalBlood: 45100,
enemyInterval: .5,
group: 5,
gold: 805,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 70,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 70,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 70,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 70,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 70,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 31",
themeID: 10031,
enemyTotal: 360,
enemyTotalBlood: 48100,
enemyInterval: .5,
group: 5,
gold: 890,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 72,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 72,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 72,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 72,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 72,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 32",
themeID: 10032,
enemyTotal: 370,
enemyTotalBlood: 51200,
enemyInterval: .5,
group: 5,
gold: 983,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 74,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 74,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 74,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 74,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 74,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 33",
themeID: 10033,
enemyTotal: 380,
enemyTotalBlood: 54800,
enemyInterval: .5,
group: 5,
gold: 1087,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 76,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 76,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 76,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 76,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 76,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 34",
themeID: 10034,
enemyTotal: 390,
enemyTotalBlood: 58e3,
enemyInterval: .5,
group: 5,
gold: 1201,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 78,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 78,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 78,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 78,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 78,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 35",
themeID: 10035,
enemyTotal: 400,
enemyTotalBlood: 61700,
enemyInterval: .5,
group: 5,
gold: 1328,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 80,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 80,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 80,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 80,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 80,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 36",
themeID: 10036,
enemyTotal: 410,
enemyTotalBlood: 65500,
enemyInterval: .5,
group: 5,
gold: 1467,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 82,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 82,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 82,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 82,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 82,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 37",
themeID: 10037,
enemyTotal: 420,
enemyTotalBlood: 69900,
enemyInterval: .5,
group: 5,
gold: 1622,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 84,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 84,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 84,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 84,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 84,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 38",
themeID: 10038,
enemyTotal: 430,
enemyTotalBlood: 74400,
enemyInterval: .5,
group: 5,
gold: 1792,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 86,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 86,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 86,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 86,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 86,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 39",
themeID: 10039,
enemyTotal: 440,
enemyTotalBlood: 79e3,
enemyInterval: .5,
group: 5,
gold: 1981,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 88,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 88,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 88,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 88,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 88,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 40",
themeID: 10040,
enemyTotal: 450,
enemyTotalBlood: 84200,
enemyInterval: .5,
group: 5,
gold: 2189,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 90,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 90,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 90,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 90,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 90,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 41",
themeID: 10041,
enemyTotal: 460,
enemyTotalBlood: 89500,
enemyInterval: .5,
group: 5,
gold: 2420,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 92,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 92,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 92,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 92,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 92,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 42",
themeID: 10042,
enemyTotal: 470,
enemyTotalBlood: 94900,
enemyInterval: .5,
group: 5,
gold: 2675,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 94,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 94,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 94,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 94,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 94,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 43",
themeID: 10043,
enemyTotal: 480,
enemyTotalBlood: 101e3,
enemyInterval: .5,
group: 5,
gold: 2956,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 96,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 96,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 96,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 96,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 96,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 44",
themeID: 10044,
enemyTotal: 490,
enemyTotalBlood: 107200,
enemyInterval: .5,
group: 5,
gold: 3267,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 98,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 98,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 98,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 98,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 98,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 45",
themeID: 10045,
enemyTotal: 500,
enemyTotalBlood: 114e3,
enemyInterval: .5,
group: 5,
gold: 3611,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 46",
themeID: 10046,
enemyTotal: 500,
enemyTotalBlood: 121e3,
enemyInterval: .5,
group: 5,
gold: 3991,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 47",
themeID: 10047,
enemyTotal: 500,
enemyTotalBlood: 128600,
enemyInterval: .5,
group: 5,
gold: 4411,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 48",
themeID: 10048,
enemyTotal: 500,
enemyTotalBlood: 136400,
enemyInterval: .5,
group: 5,
gold: 4875,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
} ]
}, {
levelName: "level 49",
themeID: 10049,
enemyTotal: 500,
enemyTotalBlood: 144900,
enemyInterval: .5,
group: 5,
gold: 5388,
enemyGroup: [ {
index: 1,
enemyiDWeight: [ 20, 20, 20, 40, 0 ],
teamGeneratingrule: [ 0, 1, 17, 11 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 2,
enemyiDWeight: [ 0, 50, 0, 20, 30 ],
teamGeneratingrule: [ 1, 1, 46, 3 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 3,
enemyiDWeight: [ 20, 20, 40, 0, 20 ],
teamGeneratingrule: [ 1, 1, 18, 31 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 4,
enemyiDWeight: [ 0, 0, 30, 20, 50 ],
teamGeneratingrule: [ 0, 1, 52, 42 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
}, {
index: 5,
enemyiDWeight: [ 50, 30, 0, 0, 20 ],
teamGeneratingrule: [ 1, 1, 11, 17 ],
team: [ {
count: 100,
enemyBloodPercentage: .2
} ]
} ]
} ]
};
cc._RF.pop();
}, {} ],
LevelsData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "fded9nRaVhPTLr/I3IC6Thc", "LevelsData");
var n = e("./../Lib/common/UtilsOther"), a = e("./DataBase");
cc.Class({
extends: a,
ctor: function() {
this.fileDir = "data/levelsData";
},
initData: function(e) {
if (e) {
this.dataObj = e;
this.dataLen = e.length;
this.dataObj = n.arrayToDict(this.dataObj, "id");
}
},
getLevelsDatar: function(e) {
return this.dataObj[e];
},
getLevelsTotalNum: function() {
return this.dataLen;
},
getLevelCoins: function(e) {
e >= this.dataLen - 1 && (e = this.dataLen - 1);
var t = e + 1e4;
return this.dataObj[t].gold;
}
});
cc._RF.pop();
}, {
"./../Lib/common/UtilsOther": "UtilsOther",
"./DataBase": "DataBase"
} ],
LevelsEnemyWaveData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8da8anROtBGbb1e2ojgIJTC", "LevelsEnemyWaveData");
e("./../Lib/common/UtilsOther");
var n = e("./DataBase");
cc.Class({
extends: n,
ctor: function() {
this.fileDir = "data/levelsEnemyWaveData";
},
initData: function(e) {
if (e) {
this.dataObj = e;
this.dataLen = e.length;
this.getDataObjToArr();
}
},
getDataObjToArr: function() {
for (var e = [], t = 0; t < this.dataLen; t++) {
var i = this.dictToArray(this.dataObj[t]);
e.push(i);
}
return e;
},
dictToArray: function(e) {
var t = [];
for (var i in e) e.hasOwnProperty(i) && e[i] && t.push(Number(e[i]));
return t;
},
getLevelsEnemyWaveDatar: function(e) {
for (var t = [], i = this.getDataObjToArr(), n = 0; n < i.length; n++) e == i[n][0] && t.push(i[n]);
return t;
}
});
cc._RF.pop();
}, {
"./../Lib/common/UtilsOther": "UtilsOther",
"./DataBase": "DataBase"
} ],
ListView: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0a6b1zwRINNuZP6KVs0lXLD", "ListView");
var n = cc.Class({
ctor: function() {
this.dataSet = [];
},
setItemComponent: function(e) {
this.itemComponent = e;
},
getComponentType: function() {
return this.itemComponent;
},
setDataSet: function(e) {
this.dataSet = e;
},
getCount: function() {
return this.dataSet.length;
},
getItem: function(e) {
return this.dataSet[e];
},
_getView: function(e, t) {
var i = e.getComponent(this.itemComponent);
i ? this.updateView(i, t) : cc.warn("item 不包含组件:", this.itemComponent);
return e;
},
updateView: function(e, t) {}
}), a = cc.Class({
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
visible: !1
},
adapter: {
type: n,
default: null,
visible: !1,
serializable: !1
},
_items: {
type: cc.NodePool,
default: null,
visible: !1
},
_filledIds: {
type: Object,
default: {},
visible: !1
},
horizontal: {
default: !1,
visible: !1
},
_itemHeight: 1,
_itemWidth: 1,
_itmesVisble: 1,
lastStartIndex: {
type: cc.Integer,
default: -1,
visible: !1
},
scrollTopNotifyed: {
default: !1,
visible: !1
},
scrollBottomNofityed: {
default: !1,
visible: !1
},
pullDownCallback: {
type: Object,
default: null,
visible: !1
},
pullUpCallback: {
type: Object,
default: null,
visible: !1
}
},
onLoad: function() {
if (this.scrollView) {
this.content = this.scrollView.content;
this.horizontal = this.scrollView.horizontal;
if (this.horizontal) {
this.scrollView.vertical = !1;
this.content.anchorX = 0;
this.content.x = this.content.getParent().width * this.content.getParent().anchorX;
} else {
this.scrollView.vertical = !0;
this.content.anchorY = 1;
this.content.y = this.content.getParent().height * this.content.getParent().anchorY;
}
} else console.error("ListView need a scrollView for showing.");
this._items = this._items || new cc.NodePool();
var e = this._items.get() || cc.instantiate(this.itemTemplate);
this._items.put(e);
this._itemHeight = e.height || 10;
this._itemWidth = e.width || 10;
this.horizontal ? this._itemsVisible = Math.ceil(this.content.getParent().width / this._itemWidth) : this._itemsVisible = Math.ceil(this.content.getParent().height / this._itemHeight);
console.log("可见区域的item数量为:", this._itemsVisible);
this.adjustEvent();
},
setAdapter: function(e) {
this.adapter = e;
if (null != this.adapter) if (null != this.itemTemplate) {
this._items.poolHandlerComp = this.adapter.getComponentType();
this.notifyUpdate();
} else cc.error("Listview 未设置待显示的Item模板."); else cc.warn("adapter 为空.");
},
getItemIndex: function(e) {
return Math.floor(Math.abs(e / (this._itemHeight + this.spacing)));
},
getPositionInView: function(e) {
var t = e.getParent().convertToWorldSpaceAR(e.position);
return this.scrollView.node.convertToNodeSpaceAR(t);
},
notifyUpdate: function(e) {
var t = this;
if (null != this.adapter) {
e && e.length > 0 ? e.forEach(function(e) {
t._filledIds.hasOwnProperty(e) && delete t._filledIds[e];
}) : Object.keys(this._filledIds).forEach(function(e) {
delete t._filledIds[e];
});
this.lastStartIndex = -1;
this.horizontal ? this.content.width = this.adapter.getCount() * (this._itemWidth + this.spacing) + this.spacing : this.content.height = this.adapter.getCount() * (this._itemHeight + this.spacing) + this.spacing;
this.scrollView.scrollToTop();
}
},
scrollToTop: function(e) {
this.scrollView.scrollToTop(e ? 1 : 0);
},
scrollToBottom: function(e) {
this.scrollView.scrollToBottom(e ? 1 : 0);
},
scrollToLeft: function(e) {
this.scrollView.scrollToLeft(e ? 1 : 0);
},
scrollToRight: function(e) {
this.scrollView.scrollToRight(e ? 1 : 0);
},
pullDown: function(e) {
this.pullDownCallback = e;
},
pullUp: function(e) {
this.pullUpCallback = e;
},
update: function(e) {
var t = this.checkNeedUpdate();
t >= 0 && this.updateView(t);
},
_layoutVertical: function(e, t) {
this.content.addChild(e);
e._tag = t;
this._filledIds[t] = t;
e.setPosition(0, -e.height * (.5 + t) - this.spacing * (t + 1));
},
_layoutHorizontal: function(e, t) {
this.content.addChild(e);
e._tag = t;
this._filledIds[t] = t;
e.setPosition(-e.width * (.5 + t) - this.spacing * (t + 1), 0);
},
getRecycleItems: function(e, t) {
var i = this, n = [];
this.content.children.forEach(function(a) {
if (a._tag < e || a._tag > t) {
n.push(a);
delete i._filledIds[a._tag];
}
});
return n;
},
updateView: function(e) {
var t = this, i = e, n = i + this._itemsVisible + (this.spawnCount || 2), a = this.adapter.getCount();
if (!(i >= a)) {
if (n > a) {
n = a;
if (!this.scrollBottomNotifyed) {
this.notifyScrollToBottom();
this.scrollBottomNotifyed = !0;
}
} else this.scrollBottomNotifyed = !1;
this.getRecycleItems(i - (this.spawnCount || 2), n).forEach(function(e) {
t._items.put(e);
});
var o = this.findUpdateIndex(i, n), s = !0, r = !1, l = void 0;
try {
for (var c, h = o[Symbol.iterator](); !(s = (c = h.next()).done); s = !0) {
var u = c.value, d = this.adapter._getView(this._items.get() || cc.instantiate(this.itemTemplate), u);
this.horizontal ? this._layoutHorizontal(d, u) : this._layoutVertical(d, u);
}
} catch (e) {
r = !0;
l = e;
} finally {
try {
!s && h.return && h.return();
} finally {
if (r) throw l;
}
}
}
},
checkNeedUpdate: function() {
if (null == this.adapter) return -1;
var e = this.horizontal ? this.content.x - this.content.getParent().width * this.content.getParent().anchorX : this.content.y - this.content.getParent().height * this.content.getParent().anchorY, t = Math.floor(e / ((this.horizontal ? this._itemWidth : this._itemHeight) + this.spacing));
if (t < 0 && !this.scrollTopNotifyed) {
this.notifyScrollToTop();
this.scrollTopNotifyed = !0;
return t;
}
t > 0 && (this.scrollTopNotifyed = !1);
if (this.lastStartIndex != t) {
this.lastStartIndex = t;
return t;
}
return -1;
},
findUpdateIndex: function(e, t) {
for (var i = [], n = e; n < t; n++) this._filledIds.hasOwnProperty(n) || i.push(n);
return i;
},
notifyScrollToTop: function() {
!this.adapter || this.adapter.getCount() <= 0 || this.pullDownCallback && this.pullDownCallback();
},
notifyScrollToBottom: function() {
!this.adapter || this.adapter.getCount() <= 0 || this.pullUpCallback && this.pullUpCallback();
},
adjustEvent: function() {
var e = this;
this.content.on(this.isMobile() ? cc.Node.EventType.TOUCH_END : cc.Node.EventType.MOUSE_UP, function() {
e.scrollTopNotifyed = !1;
e.scrollBottomNotifyed = !1;
}, this);
this.content.on(this.isMobile() ? cc.Node.EventType.TOUCH_CANCEL : cc.Node.EventType.MOUSE_LEAVE, function() {
e.scrollTopNotifyed = !1;
e.scrollBottomNotifyed = !1;
}, this);
},
isMobile: function() {
return cc.sys.isMobile || cc.sys.platform === cc.sys.WECHAT_GAME || cc.sys.platform === cc.sys.QQ_PLAY;
}
});
t.exports = {
ListAdapter: n,
ListView: a
};
cc._RF.pop();
}, {} ],
Loading: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a0e26giQ25CbryNSYfouOEG", "Loading");
cc.Class({
extends: cc.Component,
statics: {
loadingNode: null,
loadingComponent: null,
show: function(e) {
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
this.loadingComponent.show(e);
},
hide: function(e) {
cc.isValid(this.loadingNode) && this.loadingComponent.hide(e);
}
},
properties: {},
init: function() {
this.loadingList = [];
this.node.width = 2 * zy.constData.DesignSize.width;
this.node.height = 2 * zy.constData.DesignSize.height;
this.node.addComponent(cc.BlockInputEvents);
this.maskNode = zy.Sprite.createNode({
name: "maskNode",
url: "textures/common/mask",
parent: this.node,
size: cc.size(2 * zy.constData.DesignSize.width, 2 * zy.constData.DesignSize.height),
loadCallback: function(e, t) {
t.width = 2 * zy.constData.DesignSize.width;
t.height = 2 * zy.constData.DesignSize.height;
}.bind(this)
});
this.maskNode.active = !1;
},
show: function(e) {
-1 == this.loadingList.indexOf(e) && this.loadingList.push(e);
this.node.active = !0;
this.node.stopAllActions();
var t = cc.sequence(cc.delayTime(1), cc.callFunc(function() {
this.delaySeq = null;
this.maskNode.active = !0;
}.bind(this)));
this.node.runAction(t);
},
hide: function(e) {
var t = this.loadingList.indexOf(e);
t > -1 && this.loadingList.splice(t, 1);
if (0 == this.loadingList.length) {
this.node.active = !1;
this.maskNode.active = !1;
}
},
clean: function() {
this.node.active = !1;
this.loadingList = [];
}
});
cc._RF.pop();
}, {} ],
LoggerHelper: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6635fCdo61II6O7HUaipHsk", "LoggerHelper");
var n = e("./AFLogger"), a = e("./FBLogger"), o = e("./TrackingLogger"), s = e("./RangerLogger"), r = cc.Class({
statics: {
logEventWatchAds: function(e) {
if (101 == CHANNEL_ID || 102 == CHANNEL_ID) {
n.logEventWatchAds(e);
a.logEventWatchAds(e);
} else if (201 == CHANNEL_ID || 201 == CHANNEL_ID) {
o.logEventWatchAds(e);
s.logEventWatchAds(e);
}
},
logEventLogin: function(e) {
if (101 == CHANNEL_ID) ; else if (102 == CHANNEL_ID) ; else if (201 == CHANNEL_ID || 202 == CHANNEL_ID) {
o.logEventLogin(e);
s.logEventLogin(e);
}
}
}
});
zy.LogHelper = r;
cc._RF.pop();
}, {
"./AFLogger": "AFLogger",
"./FBLogger": "FBLogger",
"./RangerLogger": "RangerLogger",
"./TrackingLogger": "TrackingLogger"
} ],
MKSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e6f30eOsfdDQbHd48iGrgg1", "MKSystem");
function n(e) {
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAME, "vibrator", "(I)V", e) : (cc.sys.os, 
cc.sys.OS_IOS);
}
function a() {
return cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAME, "getDeviceID", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("PlatformUtils", "getIdfa") : "";
}
t.exports = {
getVibrator: n,
getMobilePhoneID: a,
getAppVersion: function() {
return cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAME, "getPackageVersion", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("PlatformUtils", "getAppVersion") : "1.0.0w";
},
vibratorShort: function() {
zy.dataMng.userData.vibOn && (cc.sys.os == cc.sys.OS_ANDROID ? n(25) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("PlatformUtils", "vibratorShort"));
},
vibratorLong: function() {
zy.dataMng.userData.vibOn && (cc.sys.os == cc.sys.OS_ANDROID ? n(100) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("PlatformUtils", "vibratorLong"));
},
rmSplash: function() {
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(PACKAGENAME, "rmSplashView", "()V") : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("RootViewController", "removeSplashView");
},
getMobileIdfa: function() {
return a();
},
getMobileMac: function() {
return a();
}
};
cc._RF.pop();
}, {} ],
MainUI: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2252fKIdGJL0ayO/enwu0WX", "MainUI");
var n = e("GameManager");
cc.Class({
extends: cc.Component,
properties: {
otherRoot: cc.Node,
otherUpPF: cc.Prefab,
freeCoinsPF: cc.Prefab,
startNode: cc.Node,
btnNode1: cc.Node,
btnNode2: cc.Node,
btnNode3: cc.Node,
sideBar: cc.Node,
freeCoinsRoot: cc.Node,
freeBg: cc.Button,
freeNumLabel: cc.Label,
freeTimeLabel: cc.Label,
freeCoins: {
default: 0,
notify: function() {
this.freeNumLabel.string = zy.utils.getKMBString(this.freeCoins);
}
}
},
onLoad: function() {
this.otherUpNode = null;
this.freeCoinsNode = null;
this.upgradeNode = null;
this.showSlider = !1;
this.initGetComponent();
zy.cornerData.registOn(this.btnNode1, zy.cornerData.CornerType.CORNER_ID_UPGRADE_OTHER);
zy.cornerData.registOn(this.btnNode2, zy.cornerData.CornerType.CORNER_ID_UPGRADE_TOWER);
zy.cornerData.registOn(this.btnNode3, zy.cornerData.CornerType.CORNER_ID_FREE_COINS);
},
start: function() {
this.showFreeAni = !1;
this.updateFreeCoins2(0);
this.schedule(this.updateFreeCoins2, 1);
},
checkRedCorner: function() {
this.checkUpgradeOtherCorner();
this.checkUpgradeTowerCorner();
this.checkFreeCoinsCorner();
},
checkUpgradeOtherCorner: function() {
var e = n.getPlayerGold(), t = Number(zy.dataMng.coinsUpData.getMaxLevel()), i = zy.dataMng.userData.freeCoinsLevel;
if (i < t) {
Number(zy.dataMng.coinsUpData.getPrice(i)) <= e && zy.cornerData.addClientCorner(zy.cornerData.CornerType.CORNER_ID_UPGRADE_OTHER);
}
var a = zy.dataMng.userData.hpLevel;
if (a < (t = Number(zy.dataMng.hpUpData.getMaxLevel()))) {
if (Number(zy.dataMng.hpUpData.getPrice(a)) <= e) {
zy.cornerData.addClientCorner(zy.cornerData.CornerType.CORNER_ID_UPGRADE_OTHER);
return !0;
}
}
return !1;
},
checkUpgradeTowerCorner: function() {
for (var t = n.getPlayerGold(), i = !1, a = zy.dataMng.turretPriceData, o = e("./../../MainGame/Datas/PlayerData").PlayerData, s = a.getTurretMaxLevel(), r = 0, l = 0; l < o.length; l++) {
var c = n.getPlayersData(l);
if (2 == c.player_State) {
i = !0;
break;
}
if (3 == c.player_State && Number(c.player_Level) < s) {
var h = Number(a.getTurretUpdatePrice(c.player_Level));
(0 == r || r > h) && (r = h);
}
}
if (i || 0 != r && r <= t) {
zy.cornerData.addClientCorner(zy.cornerData.CornerType.CORNER_ID_UPGRADE_TOWER);
return !0;
}
zy.cornerData.deleteClientCorner(zy.cornerData.CornerType.CORNER_ID_UPGRADE_TOWER);
return !1;
},
checkFreeCoinsCorner: function() {
var e = zy.dataMng.userData.freeCoinsLevel, t = Number(zy.dataMng.coinsUpData.getCoins(e)), i = zy.dataMng.userData.lastGotCoinTime, n = 360 * t, a = zy.utils.time() - i;
if (a > 0) {
var o = Math.floor(a / 10);
if ((o *= t) >= n) {
zy.cornerData.addClientCorner(zy.cornerData.CornerType.CORNER_ID_FREE_COINS);
return !0;
}
}
return !1;
},
onTabBtnCall: function(e, t) {
for (var i = 1; i <= 3; i++) this["btnNode" + i].getChildByName("selec").active = t == i;
if (1 == t) {
this.showPop2(!1);
this.showPop3(!1);
this.showPop1(!0);
} else if (2 == t) {
this.showPop1(!1);
this.showPop3(!1);
this.showPop2(!0);
} else if (3 == t) {
this.showPop1(!1);
this.showPop2(!1);
this.showPop3(!0);
this._hideMap();
}
this._hideStartNode();
zy.audioMng.playButtonAudio();
},
showPop1: function(e) {
var t = this;
if (e) {
if (!this.otherUpNode) {
this.otherUpNode = cc.instantiate(this.otherUpPF);
this.otherUpNode.getComponent("OtherUpgradePop").init({
onClose: function() {
t.showPop1(!1);
}
});
this.otherUpNode.parent = this.otherRoot;
}
this.otherUpNode.getComponent(cc.Animation).play("mining_pop_show", 0);
} else if (this.otherUpNode) {
this.otherUpNode.destroy();
this.otherUpNode = null;
this._showStartNode();
this.btnNode1.getChildByName("selec").active = !1;
}
},
showPop2: function(e) {
var t = this;
if (e) this.upgradeNode = this.gridmaps.buildUpgradeView(function() {
t.showPop2(!1);
}); else if (null != this.upgradeNode) {
this.upgradeNode.destroy();
this.upgradeNode = null;
this._showStartNode();
this.btnNode2.getChildByName("selec").active = !1;
}
},
showPop3: function(e) {
var t = this;
if (e) {
if (!this.freeCoinsNode) {
this.freeCoinsNode = cc.instantiate(this.freeCoinsPF);
this.freeCoinsNode.getComponent("MiningPop").init({
onClose: function() {
t.showPop3(!1);
}
});
this.freeCoinsNode.parent = this.otherRoot;
}
this.freeCoinsNode.getComponent(cc.Animation).play("mining_pop_show", 0);
} else if (this.freeCoinsNode) {
this.freeCoinsNode.destroy();
this.freeCoinsNode = null;
this._showStartNode();
this._showMap();
this.btnNode3.getChildByName("selec").active = !1;
}
},
_showStartNode: function() {
var e = cc.fadeIn(.3 * (255 - this.startNode.opacity) / 255);
this.startNode.stopAllActions();
this.startNode.runAction(e);
},
_hideStartNode: function() {
var e = cc.fadeOut(.3 * this.startNode.opacity / 255);
this.startNode.stopAllActions();
this.startNode.runAction(e);
},
_showMap: function() {
var e = cc.fadeIn(.3 * (255 - this.gridmaps.node.opacity) / 255);
this.gridmaps.node.stopAllActions();
this.gridmaps.node.runAction(e);
e = cc.fadeIn(.3 * (255 - this.freeCoinsRoot.opacity) / 255);
this.freeCoinsRoot.stopAllActions();
this.freeCoinsRoot.runAction(e);
},
_hideMap: function() {
var e = cc.fadeOut(.3 * this.gridmaps.node.opacity / 255);
this.gridmaps.node.stopAllActions();
this.gridmaps.node.runAction(e);
e = cc.fadeOut(.3 * this.freeCoinsRoot.opacity / 255);
this.freeCoinsRoot.stopAllActions();
this.freeCoinsRoot.runAction(e);
},
initGetComponent: function() {
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
},
ani_main_UI_go: function() {
this.gridmaps && (n.isBossLevel ? this.gridmaps.initBossLevel() : this.gridmaps.AddGame_UI_Node());
},
ani_main_UI_show: function() {
this.gridmaps && this.gridmaps.setMain_UIData();
cc.log("====MainUI show====");
this.checkRedCorner();
var e = n.getLevel();
if (2 == e) {
if (!cc.sys.localStorage.getItem("guide_step_1" + zy.constData.StaticKey.SaveDataVersion)) {
cc.sys.localStorage.setItem("guide_step_1" + zy.constData.StaticKey.SaveDataVersion, 1);
this.scheduleOnce(function() {
zy.guide.setOpenStatus(!0);
zy.guide.checkStatus();
zy.guide.setStep(1);
zy.guide.checkGuide();
}, 0);
}
} else if (3 == e) {
if (!cc.sys.localStorage.getItem("guide_step_3" + zy.constData.StaticKey.SaveDataVersion)) {
cc.sys.localStorage.setItem("guide_step_3" + zy.constData.StaticKey.SaveDataVersion, 1);
this.scheduleOnce(function() {
zy.guide.setOpenStatus(!0);
zy.guide.checkStatus();
zy.guide.setStep(3);
zy.guide.checkGuide();
}, 0);
}
}
if (this.checkFreeCoinsCorner()) {
if (!cc.sys.localStorage.getItem("guide_step_4" + zy.constData.StaticKey.SaveDataVersion)) {
cc.sys.localStorage.setItem("guide_step_4" + zy.constData.StaticKey.SaveDataVersion, 1);
this.scheduleOnce(function() {
zy.guide.setOpenStatus(!0);
zy.guide.checkStatus();
zy.guide.setStep(4);
zy.guide.checkGuide();
}, 0);
}
}
},
updateFreeCoins2: function(e) {
var t = Number(zy.dataMng.levelsData.getLevelCoins(n.getLevel()));
this.freeCoins = 5 * t;
var i = zy.utils.time(), a = zy.dataMng.userData.freeCoinsLastTime;
if (zy.utils.getDaysDiff(a, i) > 0) {
zy.dataMng.userData.freeCoinsNum2 = 0;
zy.dataMng.userData.freeWatchNum = 0;
}
this.freeTimeLabel.string = zy.dataMng.userData.freeWatchNum + "/" + zy.constData.FreeCoinsNeedAds;
if (zy.dataMng.userData.freeCoinsNum2 >= zy.constData.FreeCoinsMaxNum2) {
this.freeTimeLabel.node.color = cc.color("#FF0000");
this.freeBg.interactable = !1;
this.freeNumLabel.node.color = cc.Color.GRAY;
this.freeTimeLabel.string = "0";
this.freeNumLabel.node.getComponent(cc.Animation).stop("guide_shake");
this.freeNumLabel.node.getComponent(cc.Animation).setCurrentTime(0);
this.showFreeAni = !1;
} else {
this.freeTimeLabel.node.color = cc.color("#FFFFFF");
this.freeBg.interactable = !0;
if (!this.showFreeAni) {
this.showFreeAni = !0;
this.freeNumLabel.node.getComponent(cc.Animation).play("guide_shake", 0);
this.freeNumLabel.node.color = cc.color("#FAF351");
}
}
},
onSliderBtnCall: function() {
zy.audioMng.playButtonAudio();
this.showSlider = !this.showSlider;
this.showSlider ? this.sideBar.getComponent(cc.Animation).play("sidebar_show", 0) : this.sideBar.getComponent(cc.Animation).play("sidebar_hide", 0);
},
freeCoinsCall2: function() {
var e = this;
if (zy.AdHelper.isRdAdsReady(zy.constData.AdKey.FreeCoins)) {
zy.AdHelper.showRdAds(zy.constData.AdKey.FreeCoins, function(t) {
if (t) {
zy.dataMng.userData.freeCoinsLastTime = zy.utils.time();
zy.dataMng.userData.freeWatchNum++;
if (zy.dataMng.userData.freeWatchNum >= zy.constData.FreeCoinsNeedAds) {
zy.dataMng.userData.freeWatchNum = 0;
zy.dataMng.userData.freeCoinsNum2++;
zy.audioMng.playEffect(zy.audioMng.effFreeCoins);
n.setPlayerGold(n.getPlayerGold() + e.freeCoins);
var i = zy.director.sceneCanvas.getComponentInChildren("Gridmaps"), a = i.main_UI_Node.getChildByName("top").getChildByName("top_gold").getChildByName("ui_gold_icon"), o = a;
zy.effectMng.flyNode(o, 30, e.freeBg.node.parent.convertToWorldSpaceAR(e.freeBg.node.position), a.parent.convertToWorldSpaceAR(a.position), function(e) {
e && i.setMain_UIGoldNum(n.getPlayerGold());
});
}
e.updateFreeCoins2(0);
}
});
} else zy.ui.tip.show(i18n.t("no_ad"));
},
onSetting: function() {
zy.audioMng.playButtonAudio();
zy.director.createPop("MainGame/Ui/SettingPop");
},
update: function(e) {}
});
cc._RF.pop();
}, {
"./../../MainGame/Datas/PlayerData": "PlayerData",
GameManager: "GameManager"
} ],
Maininterface: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "3eef2PVY5xBZ5Vg/XMQymS8", "Maininterface");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.canvas = cc.find("Canvas");
},
start: function() {
this.canvas.on(cc.Node.EventType.TOUCH_START, this.startGame, this);
},
startGame: function() {
cc.director.loadScene("MainGame");
}
});
cc._RF.pop();
}, {} ],
Map: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "fa47a+GiR9Kr7hOEFpeSUOK", "Map");
e("Helpers");
var n = e("GameManager");
cc.Class({
extends: cc.Component,
properties: {
mapTop1: cc.Node,
mapTop2: cc.Node,
mapDown1: cc.Node,
mapDown2: cc.Node
},
onLoad: function() {
zy.audioMng.playMusic(zy.audioMng.bgm);
cc.director.getCollisionManager().enabled = !0;
cc.director.getCollisionManager().enabledDebugDraw = !1;
this.initPlayerData();
this.aniNode = null;
this._newAniNode = null;
this.initBg();
},
initPlayerData: function() {
if (!cc.sys.localStorage.getItem("isFirstEnterGame" + zy.constData.StaticKey.SaveDataVersion)) {
cc.sys.localStorage.setItem("isFirstEnterGame" + zy.constData.StaticKey.SaveDataVersion, 1);
cc.log("===第一次进入游戏");
n.initData();
}
console.log("initPlayerData initOK");
},
initBg: function() {
for (var e = this, t = n.getLevel() + 1, i = 1; i <= 2; i++) {
this["mapTop" + i].color = cc.color(zy.dataMng.bgColorData.getBgTopColor(t));
this["mapDown" + i].color = cc.color(zy.dataMng.bgColorData.getBgDownColor(t));
}
zy.dataMng.bgColorData.lastLevel = t;
var a = zy.dataMng.bgColorData.getBgColorId(t);
cc.log("bg id: %s", a);
cc.loader.loadRes("MainGame/BgAni/bg_ani_" + a, cc.Prefab, function(t, i) {
if (t) cc.error("load pf error: " + t); else {
e.aniNode = cc.instantiate(i);
e.aniNode.parent = e.node;
e.aniNode.getComponent(cc.Animation).play("uni_opacity1");
}
});
},
translateBg: function() {
var e = this, t = n.getLevel() + 1;
if (t > zy.dataMng.bgColorData.lastLevel) {
var i = zy.dataMng.bgColorData.getBgColorId(t - 1), a = zy.dataMng.bgColorData.getBgColorId(t);
if (a != i) {
cc.loader.loadRes("MainGame/BgAni/bg_ani_" + a, cc.Prefab, function(t, i) {
if (t) cc.error("load pf error: " + t); else {
e._newAniNode = cc.instantiate(i);
e._newAniNode.parent = e.node;
var n = e._newAniNode.getComponent(cc.Animation);
n.once("finished", e._newAniFinished, e);
n.play("uni_opacity1");
e.aniNode.getComponent(cc.Animation).play("uni_opacity2");
}
});
var o = this.node.getComponent(cc.Animation).getAnimationState("bg_color_ani");
if (t > 1) {
var s = zy.dataMng.bgColorData.getBgColorId(t - 1);
if (zy.dataMng.bgColorData.getBgColorId(t) != s) {
for (var r = o.curves, l = 0; l < 4; l++) {
var c = r[l];
if ("map" == c.target._name || "map3" == c.target._name) {
c.values[0] = cc.color(zy.dataMng.bgColorData.getBgDownColor(t - 1));
c.values[1] = cc.color(zy.dataMng.bgColorData.getBgDownColor(t));
} else {
c.values[0] = cc.color(zy.dataMng.bgColorData.getBgTopColor(t - 1));
c.values[1] = cc.color(zy.dataMng.bgColorData.getBgTopColor(t));
}
}
o.play();
}
}
}
}
zy.dataMng.bgColorData.lastLevel = t;
},
_newAniFinished: function() {
cc.log("map 移除旧动画节点");
this.aniNode.destroy();
this.aniNode = this._newAniNode;
},
onDisable: function() {
cc.director.getCollisionManager().enabled = !1;
cc.director.getCollisionManager().enabledDebugDraw = !1;
},
start: function() {},
update: function(e) {},
screenShake: function(e, t, i) {
var n = cc.shake(e, t, i);
this.node.runAction(n);
},
setFollowmap: function(e, t) {
var i = cc.moveTo(e, cc.v2(t.x, t.y));
this.node.runAction(i);
},
playMapAnimation: function() {}
});
cc._RF.pop();
}, {
GameManager: "GameManager",
Helpers: "Helpers"
} ],
Md5: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "df9553a0RtFNZ/mf3UeoRp9", "Md5");
var n = 0, a = "", o = 8;
function s(e) {
return _(r(y(e), e.length * o));
}
function r(e, t) {
e[t >> 5] |= 128 << t % 32;
e[14 + (t + 64 >>> 9 << 4)] = t;
for (var i = 1732584193, n = -271733879, a = -1732584194, o = 271733878, s = 0; s < e.length; s += 16) {
var r = i, l = n, g = a, m = o;
n = d(n = d(n = d(n = d(n = u(n = u(n = u(n = u(n = h(n = h(n = h(n = h(n = c(n = c(n = c(n = c(n, a = c(a, o = c(o, i = c(i, n, a, o, e[s + 0], 7, -680876936), n, a, e[s + 1], 12, -389564586), i, n, e[s + 2], 17, 606105819), o, i, e[s + 3], 22, -1044525330), a = c(a, o = c(o, i = c(i, n, a, o, e[s + 4], 7, -176418897), n, a, e[s + 5], 12, 1200080426), i, n, e[s + 6], 17, -1473231341), o, i, e[s + 7], 22, -45705983), a = c(a, o = c(o, i = c(i, n, a, o, e[s + 8], 7, 1770035416), n, a, e[s + 9], 12, -1958414417), i, n, e[s + 10], 17, -42063), o, i, e[s + 11], 22, -1990404162), a = c(a, o = c(o, i = c(i, n, a, o, e[s + 12], 7, 1804603682), n, a, e[s + 13], 12, -40341101), i, n, e[s + 14], 17, -1502002290), o, i, e[s + 15], 22, 1236535329), a = h(a, o = h(o, i = h(i, n, a, o, e[s + 1], 5, -165796510), n, a, e[s + 6], 9, -1069501632), i, n, e[s + 11], 14, 643717713), o, i, e[s + 0], 20, -373897302), a = h(a, o = h(o, i = h(i, n, a, o, e[s + 5], 5, -701558691), n, a, e[s + 10], 9, 38016083), i, n, e[s + 15], 14, -660478335), o, i, e[s + 4], 20, -405537848), a = h(a, o = h(o, i = h(i, n, a, o, e[s + 9], 5, 568446438), n, a, e[s + 14], 9, -1019803690), i, n, e[s + 3], 14, -187363961), o, i, e[s + 8], 20, 1163531501), a = h(a, o = h(o, i = h(i, n, a, o, e[s + 13], 5, -1444681467), n, a, e[s + 2], 9, -51403784), i, n, e[s + 7], 14, 1735328473), o, i, e[s + 12], 20, -1926607734), a = u(a, o = u(o, i = u(i, n, a, o, e[s + 5], 4, -378558), n, a, e[s + 8], 11, -2022574463), i, n, e[s + 11], 16, 1839030562), o, i, e[s + 14], 23, -35309556), a = u(a, o = u(o, i = u(i, n, a, o, e[s + 1], 4, -1530992060), n, a, e[s + 4], 11, 1272893353), i, n, e[s + 7], 16, -155497632), o, i, e[s + 10], 23, -1094730640), a = u(a, o = u(o, i = u(i, n, a, o, e[s + 13], 4, 681279174), n, a, e[s + 0], 11, -358537222), i, n, e[s + 3], 16, -722521979), o, i, e[s + 6], 23, 76029189), a = u(a, o = u(o, i = u(i, n, a, o, e[s + 9], 4, -640364487), n, a, e[s + 12], 11, -421815835), i, n, e[s + 15], 16, 530742520), o, i, e[s + 2], 23, -995338651), a = d(a, o = d(o, i = d(i, n, a, o, e[s + 0], 6, -198630844), n, a, e[s + 7], 10, 1126891415), i, n, e[s + 14], 15, -1416354905), o, i, e[s + 5], 21, -57434055), a = d(a, o = d(o, i = d(i, n, a, o, e[s + 12], 6, 1700485571), n, a, e[s + 3], 10, -1894986606), i, n, e[s + 10], 15, -1051523), o, i, e[s + 1], 21, -2054922799), a = d(a, o = d(o, i = d(i, n, a, o, e[s + 8], 6, 1873313359), n, a, e[s + 15], 10, -30611744), i, n, e[s + 6], 15, -1560198380), o, i, e[s + 13], 21, 1309151649), a = d(a, o = d(o, i = d(i, n, a, o, e[s + 4], 6, -145523070), n, a, e[s + 11], 10, -1120210379), i, n, e[s + 2], 15, 718787259), o, i, e[s + 9], 21, -343485551);
i = p(i, r);
n = p(n, l);
a = p(a, g);
o = p(o, m);
}
return Array(i, n, a, o);
}
function l(e, t, i, n, a, o) {
return p(m(p(p(t, e), p(n, o)), a), i);
}
function c(e, t, i, n, a, o, s) {
return l(t & i | ~t & n, e, t, a, o, s);
}
function h(e, t, i, n, a, o, s) {
return l(t & n | i & ~n, e, t, a, o, s);
}
function u(e, t, i, n, a, o, s) {
return l(t ^ i ^ n, e, t, a, o, s);
}
function d(e, t, i, n, a, o, s) {
return l(i ^ (t | ~n), e, t, a, o, s);
}
function g(e, t) {
var i = y(e);
i.length > 16 && (i = r(i, e.length * o));
for (var n = Array(16), a = Array(16), s = 0; s < 16; s++) {
n[s] = 909522486 ^ i[s];
a[s] = 1549556828 ^ i[s];
}
var l = r(n.concat(y(t)), 512 + t.length * o);
return r(a.concat(l), 640);
}
function p(e, t) {
var i = (65535 & e) + (65535 & t);
return (e >> 16) + (t >> 16) + (i >> 16) << 16 | 65535 & i;
}
function m(e, t) {
return e << t | e >>> 32 - t;
}
function y(e) {
for (var t = Array(), i = (1 << o) - 1, n = 0; n < e.length * o; n += o) t[n >> 5] |= (e.charCodeAt(n / o) & i) << n % 32;
return t;
}
function f(e) {
for (var t = "", i = (1 << o) - 1, n = 0; n < 32 * e.length; n += o) t += String.fromCharCode(e[n >> 5] >>> n % 32 & i);
return t;
}
function _(e) {
for (var t = n ? "0123456789ABCDEF" : "0123456789abcdef", i = "", a = 0; a < 4 * e.length; a++) i += t.charAt(e[a >> 2] >> a % 4 * 8 + 4 & 15) + t.charAt(e[a >> 2] >> a % 4 * 8 & 15);
return i;
}
function A(e) {
for (var t = "", i = 0; i < 4 * e.length; i += 3) for (var n = (e[i >> 2] >> i % 4 * 8 & 255) << 16 | (e[i + 1 >> 2] >> (i + 1) % 4 * 8 & 255) << 8 | e[i + 2 >> 2] >> (i + 2) % 4 * 8 & 255, o = 0; o < 4; o++) 8 * i + 6 * o > 32 * e.length ? t += a : t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >> 6 * (3 - o) & 63);
return t;
}
t.exports = {
md5_hex: s,
md5_b64: function(e) {
return A(r(y(e), e.length * o));
},
md5_str: function(e) {
return f(r(y(e), e.length * o));
},
md5_hex_hmac: function(e, t) {
return _(g(e, t));
},
md5_b64_hmac: function(e, t) {
return A(g(e, t));
},
md5_str_hmac: function(e, t) {
return f(g(e, t));
}
};
cc._RF.pop();
}, {} ],
MiningPop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "cfa23fDJ3dNArkVzibbkbha", "MiningPop");
var n = e("./../Manager/GameManager");
cc.Class({
extends: cc.Component,
properties: {
progressBar: cc.ProgressBar,
coinsLabel: cc.Label,
coins: {
default: 0,
notify: function() {
this.coinsLabel.string = zy.utils.getKMBString(this.coins);
}
},
coinsIcon: cc.Node
},
init: function(e) {
this.updateUI();
cc.game.on(cc.game.EVENT_SHOW, this.updateUI, this);
this.onClose = e.onClose || null;
zy.cornerData.deleteClientCorner(zy.cornerData.CornerType.CORNER_ID_FREE_COINS);
},
updateUI: function() {
this.userData = zy.dataMng.userData;
this._progress = 0;
this._level = this.userData.freeCoinsLevel;
this._coinsUnit = Number(zy.dataMng.coinsUpData.getCoins(this._level));
this._lastTime = this.userData.lastGotCoinTime;
this._maxCoins = 720 * this._coinsUnit;
var e = zy.utils.time() - this._lastTime;
if (e > 0) {
var t = Math.floor(e / 10);
this.coins = t * this._coinsUnit;
this.coins = Math.min(this.coins, this._maxCoins);
this._progress = e % 10 / 10;
} else this.coins = 0;
},
closeCallback: function() {
this.onClose && this.onClose();
},
onClick: function() {
var e = this;
cc.log("on click");
zy.audioMng.playButtonAudio();
if (this.coins > 0) {
zy.ui.loading.show("http");
zy.httpProxy.getServerTime(function(t) {
zy.ui.loading.hide("http");
var i = Number(t.unixtime);
cc.log("===>serverTime:" + i);
var a = zy.utils.time();
if (Math.abs(i - a) > 10) zy.ui.tip.show(i18n.t("time_error")); else {
var o = 360 * e._coinsUnit;
if (e.coins >= o) {
var s = zy.utils.time(), r = function(t) {
e.userData.lastGotCoinTime = s;
e.updateUI();
t = t || 10;
e._flyCoinsAni(t);
};
zy.director.createPop("MainGame/Ui/MiningVideoPop", {
reward: e.coins,
mul: 3,
collectCb: r.bind(e),
rdCb: r.bind(e)
});
} else {
n.setPlayerGold(n.getPlayerGold() + e.coins);
e.coins = e.userData.freeCoins = 0;
e.userData.lastGotCoinTime = zy.utils.time();
e._progress = 0;
e._flyCoinsAni(10);
}
}
}, function() {
zy.ui.loading.hide("http");
zy.ui.tip.show(i18n.t("net_error"));
});
}
},
_flyCoinsAni: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10;
zy.audioMng.playEffect(zy.audioMng.effFreeCoins);
var t = zy.director.sceneCanvas.getComponentInChildren("Gridmaps"), i = t.main_UI_Node.getChildByName("top").getChildByName("top_gold").getChildByName("ui_gold_icon"), a = this.coinsIcon;
zy.effectMng.flyNode(a, e, a.parent.convertToWorldSpaceAR(a.position), i.parent.convertToWorldSpaceAR(i.position), function(e) {
e && t.setMain_UIGoldNum(n.getPlayerGold());
});
},
update: function(e) {
this._progress += .1 * e;
if (this._progress >= 1) {
this._progress = 0;
this.coins += Number(this._coinsUnit);
this.coins = Math.min(this.coins, this._maxCoins);
this.userData.freeCoins = this.coins;
}
this.progressBar.progress = this._progress;
},
onAniShow: function() {},
onAniHide: function() {}
});
cc._RF.pop();
}, {
"./../Manager/GameManager": "GameManager"
} ],
MiningVideoPop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a5e3bJQquVO57fKi3ULqwCy", "MiningVideoPop");
cc.Class({
extends: cc.Component,
properties: {
labelNum: cc.Label,
labelMul: cc.Label,
labelNum2: cc.Label
},
init: function(e) {
this.reward = e.reward || 0;
this.mul = e.mul || 1;
this.labelNum.string = zy.utils.getKMBString(this.reward);
this.labelNum2.string = zy.utils.getKMBString(this.reward * this.mul);
this.labelMul.stirng = this.mul;
this.collectCb = e.collectCb || null;
this.rdCb = e.rdCb || null;
},
collectCallback: function() {
zy.audioMng.playButtonAudio();
this.addReward(this.reward);
this.collectCb && this.collectCb(10);
this.closeCallback();
},
addReward: function(t) {
var i = e("./../Manager/GameManager");
i.setPlayerGold(i.getPlayerGold() + t);
},
watchVideoCallback: function() {
var e = this;
zy.audioMng.playButtonAudio();
zy.AdHelper.isRdAdsReady(zy.constData.AdKey.VdOfflineCoins) ? zy.AdHelper.showRdAds(zy.constData.AdKey.VdOfflineCoins, function(t) {
if (t) {
e.addReward(e.reward * e.mul);
e.rdCb && e.rdCb(30);
e.closeCallback();
}
}) : zy.ui.tip.show(i18n.t("no_ad"));
},
closeCallback: function() {
zy.director.closePop(this.popName);
}
});
cc._RF.pop();
}, {
"./../Manager/GameManager": "GameManager"
} ],
NodePoolMng: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "3d9b9ttNkRBpYk9jX+/IwO9", "NodePoolMng");
var n = function(e) {
0;
};
cc.Class({
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
onLoad: function() {
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
init: function() {
var e = !0, t = !1, i = void 0;
try {
for (var n, a = this.bulletPFList[Symbol.iterator](); !(e = (n = a.next()).done); e = !0) {
var o = n.value, s = new cc.NodePool();
this.bulletPoolDic[o._name] = s;
this.bulletPFDic[o._name] = o;
for (var r = 0; r < this.bulletCounts; r++) {
var l = cc.instantiate(o);
s.put(l);
}
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && a.return && a.return();
} finally {
if (t) throw i;
}
}
var c = !0, h = !1, u = void 0;
try {
for (var d, g = this.enemyPFList[Symbol.iterator](); !(c = (d = g.next()).done); c = !0) {
var p = d.value;
s = new cc.NodePool();
this.enemyPoolDic[p._name] = s;
this.enemyPFDic[p._name] = p;
var m = this.enemyCounts;
"enemy7" == p._name && (m = 1);
for (var y = 0; y < m; y++) {
var f = cc.instantiate(p);
s.put(f);
}
}
} catch (e) {
h = !0;
u = e;
} finally {
try {
!c && g.return && g.return();
} finally {
if (h) throw u;
}
}
this.normalEffPool = new cc.NodePool("NormalEffect");
for (var _ = 0; _ < this.normalEffectCounts; _++) {
var A = cc.instantiate(this.normalEffectPF);
this.normalEffPool.put(A);
}
this.bloodDecPool = new cc.NodePool();
for (var C = 0; C < this.normalEffectCounts; C++) {
var v = cc.instantiate(this.bloodDecreasePF);
this.bloodDecPool.put(v);
}
this.warningEnemy2Pool = new cc.NodePool();
for (var P = 0; P < this.warningEnemy2Counts; P++) {
var b = cc.instantiate(this.warningEnemy2PF);
this.warningEnemy2Pool.put(b);
}
},
getBullet: function(e) {
cc.assert(this.bulletPoolDic[e], "错误的Bullet name: " + e + "，找不到对应的pool");
var t = this.bulletPoolDic[e].size();
if (t <= 0) {
return cc.instantiate(this.bulletPFDic[e]);
}
n(e + " pool size =" + t);
return this.bulletPoolDic[e].get();
},
putBullet: function(e) {
var t = e.name;
cc.assert(this.bulletPoolDic[t], "错误的Bullet, name: " + t + "，找不到对应的pool");
this.bulletPoolDic[t].put(e);
var i = this.bulletPoolDic[t].size();
n(t + " pool size =" + i);
},
getEnmey: function(e) {
cc.assert(this.enemyPoolDic[e], "错误的Enemy name: " + e + "，找不到对应的pool");
var t = this.enemyPoolDic[e].size();
if (t <= 0) {
return cc.instantiate(this.enemyPFDic[e]);
}
n(e + " pool size =" + t);
return this.enemyPoolDic[e].get();
},
putEnemy: function(e) {
var t = e.name;
cc.assert(this.enemyPoolDic[t], "错误的Enemy, name: " + t + "，找不到对应的pool");
this.enemyPoolDic[t].put(e);
var i = this.enemyPoolDic[t].size();
n(t + " pool size =" + i);
},
getNormalEffect: function() {
if (this.normalEffPool.size() <= 0) {
return cc.instantiate(this.normalEffectPF);
}
return this.normalEffPool.get();
},
putNormalEffect: function(e) {
this.normalEffPool.put(e);
},
getBloodDecNode: function() {
var e = this.bloodDecPool.size();
if (e <= 0) {
return cc.instantiate(this.bloodDecreasePF);
}
n("bloodDecPool size =" + e);
return this.bloodDecPool.get();
},
putBloodDecNode: function(e) {
this.bloodDecPool.put(e);
n("bloodDecPool size =" + this.bloodDecPool.size());
},
getWarningEnemy2DecNode: function() {
if (this.warningEnemy2Pool.size() <= 0) {
return cc.instantiate(this.warningEnemy2PF);
}
return this.warningEnemy2Pool.get();
},
putWarningEnemy2DecNode: function(e) {
this.warningEnemy2Pool.put(e);
}
});
cc._RF.pop();
}, {} ],
Node: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "cc309AO5opH8r5fSzJ5OlUL", "Node");
var n = cc.Class({
extends: cc.Node,
statics: {
createNode: function(e) {
var t = new zy.Node();
zy.Node.updateNode(t, e);
return t;
},
updateNode: function(e, t) {
t.name && (e.name = t.name);
t.anchor && e.setAnchorPoint(t.anchor);
"number" == typeof t.x && (e.x = t.x);
"number" == typeof t.y && (e.y = t.y);
t.position && (e.position = t.position);
"number" == typeof t.width && (e.width = t.width);
"number" == typeof t.height && (e.height = t.height);
if (t.size) {
e.width = t.size.x;
e.height = t.size.y;
}
"number" == typeof t.opacity && (e.opacity = t.opacity);
t.color && (e.color = t.color);
"number" == typeof t.zIndex && (e.zIndex = t.zIndex);
"number" == typeof t.rotation && (e.rotation = t.rotation);
"number" == typeof t.scale && (e.scale = t.scale);
"number" == typeof t.scaleX && (e.scaleX = t.scaleX);
"number" == typeof t.scaleY && (e.scaleY = t.scaleY);
t.hasOwnProperty("flipX") && (t.flipX ? e.scaleX = -1 * Math.abs(e.getScaleX()) : e.scaleX = 1 * Math.abs(e.getScaleX()));
t.hasOwnProperty("flipY") && (t.flipY ? e.scaleY = -1 * Math.abs(e.getScaleY()) : e.scaleY = 1 * Math.abs(e.getScaleY()));
t.hasOwnProperty("active") && (e.active = t.active);
t.parent && (e.parent = t.parent);
}
},
properties: {}
});
zy.Node = t.exports = n;
cc._RF.pop();
}, {} ],
NormalEffect: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ef265y4T2xOpboEslSDCvzj", "NormalEffect");
cc.Class({
extends: cc.Component,
properties: {},
play: function(e, t) {
var i = this, n = this.node.getComponent(sp.Skeleton);
n.setCompleteListener(function(e, a) {
t && t();
n.setCompleteListener(null);
i.node.angle = 0;
i.node.scale = 1;
zy.nodePoolMng.putNormalEffect(i.node);
});
n.setAnimation(0, e, !1);
},
unuse: function() {},
reuse: function() {}
});
cc._RF.pop();
}, {} ],
OpenAdsHelper: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a863aVTl61ElbDQnfX6cWdV", "OpenAdsHelper");
var n = "com/zygame/utils/OpenAdsHelper", a = cc.Class({
statics: {
showInterstitialAds: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) {
e = zy.constData.OpenAdsKey[e];
return jsb.reflection.callStaticMethod(n, "showInteractionAds", "(Ljava/lang/String;)V", e);
}
if (cc.sys.os == cc.sys.OS_IOS) {
e = zy.constData.OpenAdsKeyIOS[e];
return jsb.reflection.callStaticMethod("BuAdHelper", "showInteractionAds:", e);
}
},
isIntersitialReady: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) {
e = zy.constData.OpenAdsKey[e];
return jsb.reflection.callStaticMethod(n, "isInteractionReady", "(Ljava/lang/String;)Z", e);
}
if (cc.sys.os == cc.sys.OS_IOS) {
e = zy.constData.OpenAdsKeyIOS[e];
return jsb.reflection.callStaticMethod("BuAdHelper", "isInteractionReady:", e);
}
},
loadIntersitialAds: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) {
e = zy.constData.OpenAdsKey[e];
return jsb.reflection.callStaticMethod(n, "loadExpressAd", "(Ljava/lang/String;)V", e);
}
if (cc.sys.os == cc.sys.OS_IOS) {
e = zy.constData.OpenAdsKeyIOS[e];
return jsb.reflection.callStaticMethod("BuAdHelper", "loadExpressAd:", e);
}
},
isRdAdsReady: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) {
e = zy.constData.OpenAdsKey[e];
return jsb.reflection.callStaticMethod(n, "isRewardAdsReady", "(Ljava/lang/String;)Z", e);
}
if (cc.sys.os == cc.sys.OS_IOS) {
e = zy.constData.OpenAdsKeyIOS[e];
return jsb.reflection.callStaticMethod("BuAdHelper", "isRewardAdsReady:", e);
}
return !1;
},
loadRdAds: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) {
e = zy.constData.OpenAdsKey[e];
return jsb.reflection.callStaticMethod(n, "loadRewardAds", "(Ljava/lang/String;)V", e);
}
if (cc.sys.os == cc.sys.OS_IOS) {
e = zy.constData.OpenAdsKeyIOS[e];
return jsb.reflection.callStaticMethod("BuAdHelper", "loadRewardAds:", e);
}
},
showRdAds: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) {
e = zy.constData.OpenAdsKey[e];
return jsb.reflection.callStaticMethod(n, "showRewardAds", "(Ljava/lang/String;)V", e);
}
if (cc.sys.os == cc.sys.OS_IOS) {
e = zy.constData.OpenAdsKeyIOS[e];
return jsb.reflection.callStaticMethod("BuAdHelper", "showRewardAds:", e);
}
}
}
});
zy.OpenAdsHelper = a;
cc._RF.pop();
}, {} ],
OtherUpgradePop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ad2da1fj1xJmZIyCU6R6MlA", "OtherUpgradePop");
cc.Class({
extends: cc.Component,
properties: {
hpLevelLabel: cc.Label,
hpLabel: cc.Label,
hpCostLabel: cc.Label,
coinsLevelLabel: cc.Label,
coinsLabel: cc.Label,
coinsCostLabel: cc.Label,
hpLevel: {
default: 0,
notify: function() {
this.hpLevelLabel.string = this.hpLevel;
}
},
hp: {
default: 0,
notify: function() {
this.hpLabel.string = zy.utils.getKMBString(this.hp);
}
},
hpCost: {
default: 0,
notify: function() {
this.hpCostLabel.string = zy.utils.getKMBString(this.hpCost);
}
},
coinsLevel: {
default: 0,
notify: function() {
this.coinsLevelLabel.string = this.coinsLevel;
}
},
coins: {
default: 0,
notify: function() {
this.coinsLabel.string = zy.utils.getKMBString(this.coins);
}
},
coinsCost: {
default: 0,
notify: function() {
this.coinsCostLabel.string = zy.utils.getKMBString(this.coinsCost);
}
}
},
init: function(e) {
this.updateHpUI();
this.updateCoinsUI();
this.onClose = e.onClose || null;
zy.cornerData.deleteClientCorner(zy.cornerData.CornerType.CORNER_ID_UPGRADE_OTHER);
},
updateHpUI: function() {
this.hpLevel = zy.dataMng.userData.hpLevel;
this.hp = Number(zy.dataMng.hpUpData.getHP(this.hpLevel));
this.hpCost = Number(zy.dataMng.hpUpData.getPrice(this.hpLevel));
this.updateCostLabelColor();
},
updateCoinsUI: function() {
this.coinsLevel = zy.dataMng.userData.freeCoinsLevel;
this.coins = Number(zy.dataMng.coinsUpData.getCoins(this.coinsLevel));
this.coinsCost = Number(zy.dataMng.coinsUpData.getPrice(this.coinsLevel));
this.updateCostLabelColor();
},
updateCostLabelColor: function() {
var e = cc.color("#275355"), t = cc.color("#ff4757"), i = this._getTotalCoins();
this.coinsCostLabel.node.color = this.coinsCost <= i ? e : t;
this.hpCostLabel.node.color = this.hpCost <= i ? e : t;
},
upgradeHpCallback: function() {
zy.audioMng.playButtonAudio();
var e = Number(zy.dataMng.hpUpData.getMaxLevel()), t = this._getTotalCoins();
if (this.hpLevel >= e) zy.ui.tip.show(i18n.t("max_level")); else if (t < this.hpCost) zy.ui.tip.show(i18n.t("short_coins")); else {
this.hpLevel += 1;
t -= this.hpCost;
zy.dataMng.userData.hpLevel = this.hpLevel;
this._setTotalCoins(t);
this.updateHpUI();
zy.audioMng.playEffect(zy.audioMng.effUpgradeLevel);
}
},
upgradeCoinsCallback: function() {
zy.audioMng.playButtonAudio();
var e = Number(zy.dataMng.coinsUpData.getMaxLevel()), t = this._getTotalCoins();
if (this.coinsLevel >= e) zy.ui.tip.show(i18n.t("max_level")); else if (t < this.coinsCost) zy.ui.tip.show(i18n.t("short_coins")); else {
this.coinsLevel += 1;
t -= this.coinsCost;
zy.dataMng.userData.freeCoinsLevel = this.coinsLevel;
this._setTotalCoins(t);
this.updateCoinsUI();
zy.audioMng.playEffect(zy.audioMng.effUpgradeLevel);
}
},
closeCallback: function() {
this.onClose && this.onClose();
},
_getTotalCoins: function() {
return e("./../Manager/GameManager").getPlayerGold();
},
_setTotalCoins: function(t) {
cc.log("升级后剩余金币：" + t);
var i = e("./../Manager/GameManager");
i.setPlayerGold(t);
zy.director.sceneCanvas.getComponentInChildren("Gridmaps").setMain_UIGoldNum(i.getPlayerGold());
}
});
cc._RF.pop();
}, {
"./../Manager/GameManager": "GameManager"
} ],
Pagodabastion: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d6b9c6MT+VFZ5Gf1dTgV73t", "Pagodabastion");
var n = e("GameManager");
cc.Class({
extends: cc.Component,
properties: {
hitPrefab: null
},
onLoad: function() {
this._urls = {
Hit: "MainGame/Ui/hit"
};
this.initHit();
this.initGetComponent();
this.setSelflife(n.getPlayerLifes());
},
initGetComponent: function() {
this.map = cc.find("Canvas/map").getComponent("Map");
this.enemygenerator = cc.find("Canvas/Enemygenerators/Enemygenerator").getComponent("Enemygenerator");
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
},
start: function() {},
initHit: function() {
this.hitPrefab || cc.loader.loadRes(this._urls.Hit, this.loadHitCallBack.bind(this));
},
loadHitCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
this.hitPrefab = t;
this.hitPrefab && console.log("Hit initOK");
}
},
createHit: function() {
return cc.instantiate(this.hitPrefab);
},
onCollisionEnter: function(e, t) {
if ("enemy" == e.node.group) {
if ("enemy" == e.node.group) {
var i = e.node.getComponent("Enemys");
if (i) {
if (this.enemygenerator) {
if (i.getEnemyBlood() > 0) {
this.enemygenerator.getCurrDieEnemyBloodNums(e.node, i.getEnemyBlood());
this.enemygenerator.addEnemyHitEffects(e.node, -1, 0, -1, -1);
}
i.setEnemyBlood(0);
i.getEnemyBlood() <= 0 && this.enemygenerator.removeEnemy(e.node, 0, !1);
}
var a = n.getPlayerLifes();
if (0 != e.node.getChildByName("enemy").opacity) if (n.isBossLevel) if (n.isBossDie) {
if (7 == i.getEnemyId()) {
a -= i.getEnemyAttack();
this.gridmaps.playHitMy();
}
} else {
a -= i.getEnemyAttack();
this.gridmaps.playHitMy();
} else {
a -= i.getEnemyAttack();
this.gridmaps.playHitMy();
}
n.setPlayerLifes(a);
this.setSelflife(n.getPlayerLifes() <= 0 ? 0 : a);
n.getPlayerLifes() <= 0 ? this.enemygenerator && (n.isBossLevel && n.isBossDie || this.enemygenerator.isGameOver()) : this.playHit(i, t.node, n.getPlayerLifes());
i.getEnemyBlood() <= 0 && i.setEnemyNodeOpacity();
}
}
} else cc.log("ennmy");
},
screenShake: function(e, t, i) {
var n = cc.shake(e, t, i);
this.node.runAction(n);
},
setFollowmap: function(e, t) {
var i = cc.moveTo(e, cc.v2(t.x, t.y));
this.node.runAction(i);
},
setSelflife: function(e) {
this.gridmaps && this.gridmaps.setSelfHeartLifes(e);
},
playHit: function(e, t, i) {
var n = null;
this.gridmaps && (n = this.gridmaps.getMainPlist());
if (null != n) {
var a = this.change_angle(e.getPositions(), cc.v2(0, 0)), o = this.createHit();
t.addChild(o);
var s = o.getChildByName("cover_1").getComponent(cc.Sprite);
i >= 50 ? s && (s.spriteFrame = n.getSpriteFrame("cover_1")) : s && (s.spriteFrame = n.getSpriteFrame("cover_2"));
o.getComponent(cc.Animation).play("enemy_hit");
var r = Math.PI / 180 * -a, l = e.getNodeContentSize().width / 2 * Math.sin(r), c = e.getNodeContentSize().height / 2 * Math.cos(r);
o.setPosition(cc.v2(e.getPositions().x + l, e.getPositions().y + c));
o.angle = a;
}
},
change_angle: function(e, t) {
var i = t.x - e.x, n = t.y - e.y, a = cc.v2(i, n).signAngle(cc.v2(0, 1)) / Math.PI * 180;
a <= 0 && (a = 360 + a);
return -a;
}
});
cc._RF.pop();
}, {
GameManager: "GameManager"
} ],
PlayerData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "95eecHwus5N+ZshnAjDZqAq", "PlayerData");
t.exports = {
PlayerData: [ {
player_Name: "player_0",
player_ID: 0,
player_State: 3,
player_PosID: 4,
player_Attack: 20,
player_Level: 1,
player_StarLevel: 1,
player_UpgradeClicks: -1
}, {
player_Name: "player_1",
player_ID: 1,
player_State: 1,
player_PosID: -1,
player_Attack: 20,
player_Level: 1,
player_StarLevel: 1,
player_UpgradeClicks: -1
}, {
player_Name: "player_2",
player_ID: 2,
player_State: 1,
player_PosID: -1,
player_Attack: 20,
player_Level: 1,
player_StarLevel: 1,
player_UpgradeClicks: -1
}, {
player_Name: "player_3",
player_ID: 3,
player_State: 1,
player_PosID: -1,
player_Attack: 20,
player_Level: 1,
player_StarLevel: 1,
player_UpgradeClicks: -1
}, {
player_Name: "player_4",
player_ID: 4,
player_State: 1,
player_PosID: -1,
player_Attack: 20,
player_Level: 1,
player_StarLevel: 1,
player_UpgradeClicks: -1
}, {
player_Name: "player_5",
player_ID: 5,
player_State: 1,
player_PosID: -1,
player_Attack: 20,
player_Level: 1,
player_StarLevel: 1,
player_UpgradeClicks: -1
}, {
player_Name: "player_6",
player_ID: 6,
player_State: 1,
player_PosID: -1,
player_Attack: 20,
player_Level: 1,
player_StarLevel: 1,
player_UpgradeClicks: -1
}, {
player_Name: "player_7",
player_ID: 7,
player_State: 1,
player_PosID: -1,
player_Attack: 20,
player_Level: 1,
player_StarLevel: 1,
player_UpgradeClicks: -1
}, {
player_Name: "player_8",
player_ID: 8,
player_State: 1,
player_PosID: -1,
player_Attack: 20,
player_Level: 1,
player_StarLevel: 1,
player_UpgradeClicks: -1
} ]
};
cc._RF.pop();
}, {} ],
PopBase: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0214dGdWP5Aqaga6UmWOdvS", "PopBase");
var n = cc.Class({
extends: cc.Component,
properties: {
maskOpacity: 255,
touchClose: !0
},
initBase: function(e, t) {
0;
this.popName = t;
this.componentName = null;
this.component = null;
var i = this.popName.split("/");
if (i.length > 0) {
this.componentName = i[i.length - 1];
this.component = this.node.getComponent(this.componentName);
}
this.onLaunchedCallback = e.onLaunchedCallback;
this.onClosedCallback = e.onClosedCallback;
zy.Button.createNode({
name: "maskBtn",
zIndex: zy.constData.ZIndex.POP_MASK,
parent: this.node,
url: "textures/common/mask",
touchAction: !1,
commonClickAudio: !1,
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
this.component.init && this.component.init(e);
},
cleanBase: function() {
this.component && this.component.clean && this.component.clean();
cc.isValid(this.node) && this.node.destroy();
this.onClosedCallback && this.onClosedCallback();
}
});
zy.PopBase = t.exports = n;
cc._RF.pop();
}, {} ],
ProgressBar: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7781cgsMwdAWZJB8Vw/YTXI", "ProgressBar");
cc.Class({
extends: cc.ProgressBar,
setProgressBarToPercent: function(e, t, i) {
if (e <= 0) {
this.progress = t;
i && i();
} else {
this.speed = (t - this.progress) / e;
this.desProgress = t;
this.progressCb = i;
this.schedule(this.updateProgressBar.bind(this), 0);
}
},
updateProgressBar: function(e) {
if (this.speed > 0 && this.progress < this.desProgress || this.speed < 0 && this.progress > this.desProgress) this.progress += this.speed * e; else {
this.progress = this.desProgress;
this.unscheduleAllCallbacks();
this.progressCb && this.progressCb();
}
}
});
cc._RF.pop();
}, {} ],
RangerLogger: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "972dd3so6xBQbKfwz5fE+GK", "RangerLogger");
var n = "com/zygame/utils/RangerAppLogHelper";
cc.Class({
statics: {
logEventWatchAds: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(n, "logEvent", "(Ljava/lang/String;)V", e);
cc.sys.os, cc.sys.OS_IOS;
},
logEventLogin: function(e) {
if (cc.sys.os == cc.sys.OS_ANDROID) return jsb.reflection.callStaticMethod(n, "logLogin", "(Ljava/lang/String;)V", e);
cc.sys.os, cc.sys.OS_IOS;
}
}
});
cc._RF.pop();
}, {} ],
ReadLocalData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "cc209uckRlHxrO84z49CWCh", "ReadLocalData");
var n = e("GameManager");
cc.Class({
extends: cc.Component,
properties: {
levelDatafile: {
default: null,
type: cc.TextAsset
},
levelEnemyWaveDatafile: {
default: null,
type: cc.TextAsset
}
},
onLoad: function() {
this._urls = {
LevelData: "data/levelData",
LevelEnemyWaveData: "data/levelEnemyWaveData"
};
this.initReadLocalLevelData();
},
initReadLocalLevelData: function() {
cc.loader.loadRes(this._urls.LevelData, this.loadLevelDataCallBack.bind(this));
},
loadLevelDataCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
n.setLevelDataStr(t.text.toString());
console.log("LevelData initOK");
this.initReadLevelEnemyWaveData();
}
},
initReadLevelEnemyWaveData: function() {
cc.loader.loadRes(this._urls.LevelEnemyWaveData, this.loadLevelEnemyWaveDataCallBack.bind(this));
},
loadLevelEnemyWaveDataCallBack: function(e, t) {
if (this.isValid) if (e) cc.log("Error url [" + e + "]"); else {
n.setLevelEnemyWaveDataStr(t.text.toString());
console.log("LevelEnemyWaveData initOK");
var i = zy.dataMng.upStarNeedData;
if (i) for (var a = 0; a < 10; a++) {
var o = Number(i.getUpStarNeedExp(a + 1));
n.player_StarLevelArray.push(o);
} else for (var s = 0; s < 1e3; s++) {
var r = 10 * (s + 1);
n.player_StarLevelArray.push(r);
}
console.log("player_StarLevelArray initOK");
for (var l = 0; l < 1e3; l++) {
var c = l + 1;
n.player_StarLevelNeedArray.push(c);
}
console.log("player_StarLevelNeedArray initOK");
}
}
});
cc._RF.pop();
}, {
GameManager: "GameManager"
} ],
RevivePop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "86053bPGMhDvb/HauxvQ2u4", "RevivePop");
cc.Class({
extends: cc.Component,
properties: {
timeLabel: cc.Label,
duration: {
default: 5,
notify: function() {
this.timeLabel.string = this.duration;
}
}
},
init: function(e) {
this.duration = e.duration || 5;
this.schedule(this.updateTime, 1);
this.cb = e.cb || null;
},
updateTime: function(e) {
this.duration -= e;
this.duration = Math.max(0, Math.round(this.duration));
if (0 == this.duration) {
this.unschedule(this.updateTime);
this.cb && this.cb(!1);
this.closeCallback();
}
},
adClick: function() {
var e = this;
zy.audioMng.playButtonAudio();
if (zy.AdHelper.isRdAdsReady(zy.constData.AdKey.VdREVIVE)) {
this.unschedule(this.updateTime);
zy.AdHelper.showRdAds(zy.constData.AdKey.VdREVIVE, function(t) {
if (t) {
cc.log("看完广告复活了");
e.cb && e.cb(!0);
} else {
cc.log("广告没看完无法复活");
e.cb(!1);
}
e.closeCallback();
});
} else zy.ui.tip.show(i18n.t("no_ad"));
},
closeCallback: function() {
zy.director.closePop(this.popName);
}
});
cc._RF.pop();
}, {} ],
SettingPop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "b78f7hBbLpF44r13Dqx3i8J", "SettingPop");
var n = e("./../../Platform/MKSystem");
cc.Class({
extends: cc.Component,
properties: {
vibNode: cc.Node,
soundsNode: cc.Node,
versionLabel: cc.Label
},
init: function(e) {
zy.dataMng.userData.vibOn ? this.vibNode.getComponent(cc.Animation).play("setBtnOn", 10) : this.vibNode.getComponent(cc.Animation).play("setBtnOff", 10);
zy.dataMng.userData.soundOn ? this.soundsNode.getComponent(cc.Animation).play("setBtnOn", 10) : this.soundsNode.getComponent(cc.Animation).play("setBtnOff", 10);
this.versionLabel.string = "v" + n.getAppVersion() + "  c" + CHANNEL_ID;
},
onVibCall: function() {
zy.audioMng.playButtonAudio();
zy.dataMng.userData.vibOn = !zy.dataMng.userData.vibOn;
if (zy.dataMng.userData.vibOn) {
this.vibNode.getComponent(cc.Animation).play("setBtnOn", 0);
e("./../../Platform/MKSystem").vibratorShort();
} else this.vibNode.getComponent(cc.Animation).play("setBtnOff", 0);
},
onSoundsCall: function() {
zy.audioMng.playButtonAudio();
zy.dataMng.userData.soundOn = !zy.dataMng.userData.soundOn;
if (zy.dataMng.userData.soundOn) {
this.soundsNode.getComponent(cc.Animation).play("setBtnOn", 0);
zy.audioMng.resumeAllEffects();
zy.audioMng.resumeMusic();
} else {
this.soundsNode.getComponent(cc.Animation).play("setBtnOff", 0);
zy.audioMng.pauseAllEffects();
zy.audioMng.pauseMusic();
}
},
closeCallback: function() {
zy.director.closePop(this.popName);
}
});
cc._RF.pop();
}, {
"./../../Platform/MKSystem": "MKSystem"
} ],
ShaderUtils: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4a0d1DD3flJtKMaQ07c8zdn", "ShaderUtils");
var n = {
Gray: "Gray",
Normal: "Normal",
Bright: "Bright"
};
cc.Class({
extends: cc.Component,
statics: {
Effect: n,
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
init: function() {
this.shaderPrograms = {};
},
setShader: function(e, t) {
if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
var i = "";
t == n.Normal ? i = "2d-sprite" : t == n.Gray ? i = "2d-gray-sprite" : t == n.Bright && (i = "2d-bright-sprite");
var a = cc.Material.getBuiltinMaterial(i);
if (a) {
a = cc.Material.getInstantiatedMaterial(a, e);
e.setMaterial(0, a);
} else cc.log("ShaderUtils: matrial: " + t + " is not exsit");
}
}
}
});
cc._RF.pop();
}, {} ],
Sprite: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6143cwQ3s5Gq5QJ4PeOZFhZ", "Sprite");
var n = cc.Class({
extends: cc.Sprite,
statics: {
createNode: function(e) {
var t = new cc.Node();
t.addComponent(zy.Sprite);
zy.Sprite.updateNode(t, e);
return t;
},
updateNode: function(e, t) {
var i = e.getComponent(cc.Sprite), n = t.url, a = t.spriteFrame, o = t.loadCallback, s = function(n) {
n && (i.spriteFrame = n);
t.hasOwnProperty("state") && i.setState(t.state);
t.srcBlendFactor && (i.srcBlendFactor = t.srcBlendFactor);
t.dstBlendFactor && (i.dstBlendFactor = t.dstBlendFactor);
t.hasOwnProperty("parent") && !cc.isValid(t.parent) || zy.Node.updateNode(e, t);
};
if (n) {
i.url = n;
cc.loader.loadRes(n, cc.SpriteFrame, null, function(t, a) {
if (t) cc.error("load: " + n + " error."); else if (cc.isValid(e) && i.url == n) {
i.spriteFrame = a;
s();
}
o && o(t, e);
});
} else a ? s(a) : s();
}
}
});
zy.Sprite = t.exports = n;
cc._RF.pop();
}, {} ],
Test: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7de8dhwphRO5o1OuNwNmv6i", "Test");
var n = e("Helpers");
cc.Class({
extends: cc.Component,
properties: {
_changeChorEn: !1,
defaultlab: {
default: null,
type: cc.Label
},
score: {
default: 0,
displayName: "Score (player)",
tooltip: "The score of player"
},
names: {
default: [],
type: [ cc.String ]
},
enemies: {
default: [],
type: [ cc.Node ]
}
},
onLoad: function() {
n.getRandomInt(0, 10);
alert(n.quickSort([ 13, 24, 12, 2, 211, 3, 455, 90, 41 ]));
if (cc.sys.localStorage.getItem("_changeChorEn")) {
this._changeChorEn = cc.sys.localStorage.getItem("update_changeChorEn");
this.changeChorEn(this._changeChorEn);
} else {
cc.sys.localStorage.setItem("_changeChorEn", !0);
cc.sys.localStorage.setItem("update_changeChorEn", this._changeChorEn);
}
},
onBtnClicked: function(e) {
e.target.name;
e.target.name;
},
initYZBtn: function() {
for (var e = 0; e < 5; e++) {
var t = this.YZ_chip.getChildByName("chip_btn_" + e);
this.YZ_chip.getChildByName("chip_btn_" + e)._children[2].getComponent(cc.Label).string = "";
var i = new cc.Component.EventHandler();
i.target = this.node;
i.component = "BJLLayer";
i.handler = "onYZBtnClicked";
i.customEventData = e;
this.m_YZBtn[e] = t.getComponent(cc.Button);
this.m_YZBtn[e].clickEvents.push(i);
}
},
onYZBtnClicked: function(e, t) {
for (var i = [ "+", "-" ], n = 0; n < 5; n++) {
this.m_chipBtn[n].node.scale = .9;
if (t == n) {
var a = (10 * Number(this.m_tzPlan[n]) + 10 * Number(this.m_tzje)) / 10;
this.m_tzPlan[t] = a;
var o = parseInt(Number(this.m_YZBtn[n].node.width) / 2) - 20, s = parseInt(Number(this.m_YZBtn[n].node.height) / 2) - 20;
i[parseInt(2 * Math.random())] + Number(Math.random() * o);
i[parseInt(2 * Math.random())] + Number(Math.random() * s);
}
}
},
onEnable: function() {
TipsManager.init();
},
start: function() {},
update: function(e) {},
lateUpdate: function(e) {},
onDestroy: function() {},
onDisable: function() {},
shakeScreen: function(e) {
var t = e.node, i = e.times ? e.times : 1, n = e.hasOwnProperty("offsetX") ? e.offsetX : 20, a = e.hasOwnProperty("offsetY") ? e.offsetY : 20, o = e.ratio ? e.ratio : 1, s = e.rate ? e.rate : 1 / 15, r = t.basePosition ? t.basePosition : t.position;
t.stopAllActions();
t.setPosition(r);
t.basePosition = r;
for (var l = [ cc.v2(n, a), cc.v2(2 * -n, 2 * -a) ], c = [], h = 0; h < i - 1; h++) for (var u in l) {
var d = l[u], g = cc.moveBy(s, d).easing(cc.easeOut(1));
c.push(g);
0 == d.x ? d.x = 0 : d.x < 0 && (d.x = d.x / o);
0 == d.y ? d.y = 0 : d.y < 0 && (d.y = d.y / o);
}
var p = cc.moveTo(s, r).easing(cc.easeOut(1));
c.push(p);
t.runAction(cc.sequence(c));
}
});
cc._RF.pop();
}, {
Helpers: "Helpers"
} ],
Tip: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6fc55rUrPFDxLyLc2cpq/Zh", "Tip");
cc.Class({
extends: cc.Component,
properties: {
tipLabel: cc.Label,
tipBg: cc.Node
},
statics: {
tipNode: null,
show: function(e) {
cc.loader.loadRes("prefabs/common/Tip", cc.Prefab, function(t, i) {
if (!t) {
cc.isValid(this.tipNode) && this.tipNode.destroy();
this.tipNode = cc.instantiate(i);
this.tipNode.zIndex = zy.constData.ZIndex.TIP;
this.tipNode.parent = zy.director.getUiRoot();
this.tipNode.getComponent("Tip").init(e);
}
}.bind(this));
}
},
onLoad: function() {
this.originalWidth = this.tipBg.width;
this.originalHeight = this.tipBg.height;
this.tipBg.opacity = 0;
this.tipLabel.string = "";
},
init: function(e) {
this.text = e;
this.node.y = 0;
this.tipLabel.string = this.text;
this.tipLabel.node.height > this.originalHeight && (this.tipBg.height = this.tipLabel.node.height + 50);
var t = cc.sequence(cc.spawn(cc.moveBy(.25, cc.v2(0, 100)), cc.fadeIn(.25)), cc.delayTime(1.25), cc.spawn(cc.moveBy(.25, cc.v2(0, 100)), cc.fadeOut(.25)), cc.callFunc(function() {
this.node.destroy();
}.bind(this)));
this.tipBg.runAction(t);
}
});
cc._RF.pop();
}, {} ],
TrackingLogger: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6f7dejhclFBULHAZ3Q42UcD", "TrackingLogger");
var n = "com/zygame/utils/TrackingHelper";
cc.Class({
statics: {
logEventWatchAds: function(e) {
var t = "event_" + e[e.length - 1];
return cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(n, "logEvent", "(Ljava/lang/String;)V", t) : cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("AppController", "logEvent:", t) : void 0;
},
logEventLogin: function(e) {
return cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(n, "logLogin", "(Ljava/lang/String;)V", e) : cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("AppController", "logLogin:", e) : void 0;
},
logEventRegister: function(e) {
return cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(n, "logRegister", "(Ljava/lang/String;)V", e) : cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("AppController", "logRegister:", e) : void 0;
}
}
});
cc._RF.pop();
}, {} ],
TurretAttrData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "9932fs7721PH7offA2qsG3P", "TurretAttrData");
var n = e("./../Lib/common/UtilsOther"), a = e("./DataBase");
cc.Class({
extends: a,
ctor: function() {
this.fileDir = "data/turretAttrData";
},
initData: function(e) {
if (e) {
this.dataObj = e;
this.dataLen = e.length;
this.dataObj = n.arrayToDict(this.dataObj, "id");
}
},
getTurretAttr: function(e) {
return this.dataObj[e];
}
});
cc._RF.pop();
}, {
"./../Lib/common/UtilsOther": "UtilsOther",
"./DataBase": "DataBase"
} ],
TurretData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d37da0C6ppCwb3kOifmdpwV", "TurretData");
var n = e("./../Lib/common/UtilsOther"), a = e("./DataBase");
cc.Class({
extends: a,
ctor: function() {
this.fileDir = "data/turretData";
},
initData: function(e) {
if (e) {
this.dataObj = e;
this.dataObj = n.arrayToDict(this.dataObj, "id");
}
},
getTurretDataById: function(e, t) {
var i = "player" + e + (t = t > 9 ? t : "0" + t);
return this.dataObj[i];
},
getTurretAttack: function(e, t, i) {
return this.getTurretDataById(e, t)["level" + i];
}
});
cc._RF.pop();
}, {
"./../Lib/common/UtilsOther": "UtilsOther",
"./DataBase": "DataBase"
} ],
TurretPriceData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "fef97U8T+RCgKLaTujKtDS+", "TurretPriceData");
var n = e("./../Lib/common/UtilsOther"), a = e("./DataBase");
cc.Class({
extends: a,
ctor: function() {
this.fileDir = "data/turretPriceData";
},
initData: function(e) {
if (e) {
this.dataObj = e;
this.len = this.dataObj.length;
this.dataObj = n.arrayToDict(this.dataObj, "level");
}
},
getTurretUpdatePrice: function(e) {
return this.dataObj[e].price;
},
getTurretMaxLevel: function() {
return this.len || 0;
}
});
cc._RF.pop();
}, {
"./../Lib/common/UtilsOther": "UtilsOther",
"./DataBase": "DataBase"
} ],
TurretSecondData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "bfb510NO09K1IJyliUWpcSd", "TurretSecondData");
var n = e("./../Lib/common/UtilsOther"), a = e("./DataBase");
cc.Class({
extends: a,
ctor: function() {
this.fileDir = "data/turretSecondData";
},
initData: function(e) {
if (e) {
this.dataObj = e;
this.dataObj = n.arrayToDict(this.dataObj, "level");
}
},
getTurretSecondAttack: function(e) {
return this.dataObj[e].attack;
}
});
cc._RF.pop();
}, {
"./../Lib/common/UtilsOther": "UtilsOther",
"./DataBase": "DataBase"
} ],
UI: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "3d0d8pVBVlMerkrdm4ogFdE", "UI");
cc.Class({
extends: cc.Component,
statics: {
init: function() {
this.loading = e("Loading");
this.tip = e("Tip");
},
seekChildByName: function(e, t) {
if (e.name == t) return e;
for (var i in e.children) {
var n = e.children[i];
if (n) {
var a = zy.ui.seekChildByName(n, t);
if (a) return a;
}
}
},
bgScaleAction: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
e.scale = .5;
var i = cc.sequence(cc.scaleTo(.2, 1).easing(cc.easeSineOut()), cc.callFunc(function() {
t.callback && t.callback();
}));
e.runAction(i);
},
numScaleAction: function(e, t) {
e.stopAllActions();
var i = cc.sequence(cc.scaleTo(.1, 1.2).easing(cc.easeSineOut()), cc.scaleTo(.1, .8).easing(cc.easeSineInOut()), cc.scaleTo(.1, 1.1).easing(cc.easeSineInOut()), cc.scaleTo(.1, .95).easing(cc.easeSineInOut()), cc.scaleTo(.1, 1).easing(cc.easeSineInOut()));
e.runAction(i);
},
btnScaleActoin: function(e) {
for (var t in e) {
var i = e[t], n = i.scale;
i.stopAllActions();
i.scale = n / 4;
i.runAction(cc.sequence(cc.scaleTo(.12, n + .1), cc.scaleTo(.08, n - .1), cc.scaleTo(.08, n)));
}
},
shakeScreen: function(e) {
var t = e.node, i = e.times ? e.times : 1, n = e.hasOwnProperty("offsetX") ? e.offsetX : 20, a = e.hasOwnProperty("offsetY") ? e.offsetY : 20, o = e.ratio ? e.ratio : 1, s = e.rate ? e.rate : 1 / 15, r = t.basePosition ? t.basePosition : t.position;
t.stopAllActions();
t.setPosition(r);
t.basePosition = r;
var l = [], c = cc.moveBy(s, cc.v2(n, a)).easing(cc.easeOut(1));
l.push(c);
for (var h = 0; h < i - 1; h++) {
var u = cc.moveBy(s, cc.v2(2 * -n, 2 * -a)).easing(cc.easeOut(1));
l.push(u);
var d = cc.moveBy(s, cc.v2(3 * n / 2, 3 * a / 2)).easing(cc.easeOut(1));
l.push(d);
n /= o;
a /= o;
}
var g = cc.moveTo(s, r).easing(cc.easeOut(1));
l.push(g);
t.runAction(cc.sequence(l));
},
flyNode: function(e, t, i, n, a, o) {
if (!(a <= 0)) {
i = t.convertToNodeSpaceAR(i);
n = t.convertToNodeSpaceAR(n);
for (var s = 0, r = function(r) {
var l = cc.instantiate(e);
l.position = i;
l.parent = t;
var c = i.add(n).div(2).sub(i), h = 5 * Math.round(10 * Math.random()) * (Math.random() > .5 ? 1 : -1), u = c.rotate(h * Math.PI / 180), d = i.add(u), g = Math.sqrt(Math.pow(n.x - i.x, 2) + Math.pow(n.y - i.y, 2)), p = [ d, d, n ], m = cc.bezierTo(g / 3e3 + .5 * Math.random(), p), y = cc.sequence(m, cc.callFunc(function() {
o && o(++s >= a);
l.destroy();
}));
l.runAction(y);
}, l = 0; l < a; l++) r();
}
}
}
});
cc._RF.pop();
}, {
Loading: "Loading",
Tip: "Tip"
} ],
UPLTVAndroid: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a8defv/RNBAp70l9SJpqyMU", "UPLTVAndroid");
var n = "com/up/ads/cocosjs/JsProxy", a = !1, o = o || {
setShowLog: function(e) {
void 0 != e && null != e && (a = e);
},
printJsLog: function(e) {
a && void 0 != e && null != e && jsb.reflection.callStaticMethod("android/util/Log", "i", "(Ljava/lang/String;Ljava/lang/String;)I", "cocos2dx-js", e);
},
initAndroidSDK: function(e, t, i) {
jsb.reflection.callStaticMethod(n, "initSDK", "(Ljava/lang/String;Ljava/lang/String;)V", e, i);
jsb.reflection.callStaticMethod(n, "setInvokeDelegate", "(Ljava/lang/String;)V", t);
},
initAndroidAbtConfigJson: function(e, t, i, a, o, s, r) {
jsb.reflection.callStaticMethod(n, "initAbtConfigJsonForJs", "(Ljava/lang/String;ZILjava/lang/String;Ljava/lang/String;ILjava/lang/String;)V", e, t, i, a, o, s, r);
},
getAndroidAbtConfig: function(e) {
return jsb.reflection.callStaticMethod(n, "getAbtConfig", "(Ljava/lang/String;)Ljava/lang/String;", e);
},
showAndroidRewardDebugUI: function() {
jsb.reflection.callStaticMethod(n, "showRewardDebugActivity", "()V");
},
setAndroidRewardVideoLoadCallback: function() {
jsb.reflection.callStaticMethod(n, "setRewardVideoLoadCallback", "()V");
},
isAndroidRewardReady: function() {
return jsb.reflection.callStaticMethod(n, "isRewardReady", "()Z");
},
showAndroidRewardVideo: function(e) {
null == e && (e = "reward_video");
jsb.reflection.callStaticMethod(n, "showRewardVideo", "(Ljava/lang/String;)V", e);
},
setAndroidInterstitialLoadCallback: function(e) {
jsb.reflection.callStaticMethod(n, "setInterstitialCallbackAt", "(Ljava/lang/String;)V", e);
},
isAndroidInterstitialReadyAsyn: function(e, t) {
jsb.reflection.callStaticMethod(n, "isInterstitialReadyForJs", "(Ljava/lang/String;Ljava/lang/String;)V", e, t);
},
isAndroidInterstitialReady: function(e) {
return jsb.reflection.callStaticMethod(n, "isInterstitialReady", "(Ljava/lang/String;)Z", e);
},
showAndroidInterstitialAd: function(e) {
jsb.reflection.callStaticMethod(n, "showInterstitialForJs", "(Ljava/lang/String;)V", e);
},
showAndroidInterstitialDebugUI: function() {
jsb.reflection.callStaticMethod(n, "showInterstitialDebugActivityForJs", "()V");
},
removeAndroidBannerAdAt: function(e) {
jsb.reflection.callStaticMethod(n, "removeBanner", "(Ljava/lang/String;)V", e);
},
showAndroidBannerAdAtTop: function(e) {
jsb.reflection.callStaticMethod(n, "showTopBanner", "(Ljava/lang/String;)V", e);
},
showAndroidBannerAdAtBottom: function(e) {
jsb.reflection.callStaticMethod(n, "showBottomBanner", "(Ljava/lang/String;)V", e);
},
hideAndroidBannerAdAtTop: function() {
jsb.reflection.callStaticMethod(n, "hideTopBanner", "()V");
},
hideAndroidBannerAdAtBottom: function() {
jsb.reflection.callStaticMethod(n, "hideBottomBanner", "()V");
},
showAndroidIconAdAt: function(e, t, i, a, o, s) {
jsb.reflection.callStaticMethod(n, "showIconAd", "(IIIIILjava/lang/String;)V", e, t, i, a, o, s);
},
removeAndroidIconAdAt: function(e) {
jsb.reflection.callStaticMethod(n, "removeIconAd", "(Ljava/lang/String;)V", e);
},
loadAndroidAdsByManual: function() {
jsb.reflection.callStaticMethod(n, "loadAnroidAdsByManual", "()V");
},
exitAndroidApp: function() {
jsb.reflection.callStaticMethod(n, "exitAndroidApp", "()V");
},
setAndroidManifestPackageName: function(e) {
jsb.reflection.callStaticMethod(n, "setManifestPackageName", "(Ljava/lang/String;)V", e);
},
onAndroidBackPressed: function() {
jsb.reflection.callStaticMethod(n, "onBackPressed", "()V");
},
setAndroidCustomerId: function(e) {
jsb.reflection.callStaticMethod(n, "setCustomerIdForJs", "(Ljava/lang/String;)V", e);
},
updateAndroidAccessPrivacyInfoStatus: function(e) {
jsb.reflection.callStaticMethod(n, "updateAccessPrivacyInfoStatus", "(I)V", e);
},
getAndroidAccessPrivacyInfoStatus: function() {
return jsb.reflection.callStaticMethod(n, "getAccessPrivacyInfoStatus", "()I");
},
notifyAndroidAccessPrivacyInfoStatus: function(e, t) {
jsb.reflection.callStaticMethod(n, "notifyAccessPrivacyInfoStatus", "(Ljava/lang/String;I)V", e, t);
},
isAndroidEuropeanUnionUser: function(e, t) {
jsb.reflection.callStaticMethod(n, "isEuropeanUnionUser", "(Ljava/lang/String;I)V", e, t);
},
reportIvokePluginMethodReceive: function(e) {
jsb.reflection.callStaticMethod(n, "reportIvokePluginMethodReceive", "(Ljava/lang/String;)V", e);
},
reportRDRewardClose: function(e) {
jsb.reflection.callStaticMethod(n, "reportRDRewardClose", "(Ljava/lang/String;)V", e);
},
reportRDRewardClick: function(e) {
jsb.reflection.callStaticMethod(n, "reportRDRewardClick", "(Ljava/lang/String;)V", e);
},
reportRDRewardGiven: function(e) {
jsb.reflection.callStaticMethod(n, "reportRDRewardGiven", "(Ljava/lang/String;)V", e);
},
reportRDShowDid: function(e) {
jsb.reflection.callStaticMethod(n, "reportRDShowDid", "(Ljava/lang/String;)V", e);
},
reportRDRewardCancel: function(e) {
jsb.reflection.callStaticMethod(n, "reportRDRewardCancel", "(Ljava/lang/String;)V", e);
},
reportILClose: function(e, t) {
jsb.reflection.callStaticMethod(n, "reportILClose", "(Ljava/lang/String;Ljava/lang/String;)V", void 0 == t ? "" : t, e);
},
reportILClick: function(e, t) {
jsb.reflection.callStaticMethod(n, "reportILClick", "(Ljava/lang/String;Ljava/lang/String;)V", void 0 == t ? "" : t, e);
},
reportILShowDid: function(e, t) {
jsb.reflection.callStaticMethod(n, "reportILShowDid", "(Ljava/lang/String;Ljava/lang/String;)V", void 0 == t ? "" : t, e);
},
isOnlineDebugReportEnable: function() {
return jsb.reflection.callStaticMethod(n, "isReportOnlineEnable", "()Z");
},
isAndroidLogOpened: function() {
return jsb.reflection.callStaticMethod(n, "isLogOpened", "()Z");
},
setAndroidIsChild: function(e) {
jsb.reflection.callStaticMethod(n, "setIsChild", "(Z)V", e);
},
setAndroidBirthday: function(e, t) {
jsb.reflection.callStaticMethod(n, "setBirthday", "(II)V", e, t);
},
autoOneKeyInspectByAndroid: function() {
jsb.reflection.callStaticMethod(n, "autoOneKeyInspect", "()V");
},
tellToDoctorByAndroid: function(e, t, i) {
jsb.reflection.callStaticMethod(n, "tellToDoctor", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", e, t, i);
},
setAppsFlyerUIDByAndroid: function(e) {
jsb.reflection.callStaticMethod(n, "setAppsflyerUID", "(Ljava/lang/String;)V", e);
},
setAdjustIdByAndroid: function(e) {
jsb.reflection.callStaticMethod(n, "setAdjustID", "(Ljava/lang/String;)V", e);
}
};
t.exports = o;
cc._RF.pop();
}, {} ],
UPLTVIos: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "56bf2BM76RD3pMS97NjxIwH", "UPLTVIos");
var n = "UpAdsBrigeJs", a = !1, o = o || {
setShowLog: function(e) {
void 0 != e && null != e && (a = e);
},
printJsLog: function(e) {
a && void 0 != e && null != e && jsb.reflection.callStaticMethod(n, "printJsLog:", e);
},
initIosSDK: function(e, t, i, a) {
void 0 != a && null != a ? jsb.reflection.callStaticMethod(n, "initSdkByJsWithAppKey:zone:withCallback:", e, t, a) : jsb.reflection.callStaticMethod(n, "initSdkByJsWithAppKey:zone:", e, t);
jsb.reflection.callStaticMethod(n, "setVokeMethod:", i);
},
initIosAbtConfigJson: function(e, t, i, a, o, s, r) {
jsb.reflection.callStaticMethod(n, "initAbtConfigJsonByJs:complete:paid:channel:gender:age:tags:", e, t, i, a, o, s, r);
},
getIosAbtConfig: function(e) {
return jsb.reflection.callStaticMethod(n, "getIosAbtConfigByJs:", e);
},
showIosRewardDebugUI: function() {
jsb.reflection.callStaticMethod(n, "showRewardDebugActivityByJs");
},
setIosRewardVideoLoadCallback: function() {
jsb.reflection.callStaticMethod(n, "setRewardVideoLoadCallbackByJs");
},
isIosRewardReady: function() {
return jsb.reflection.callStaticMethod(n, "isIosRewardReadyByJs");
},
showIosRewardVideo: function(e) {
jsb.reflection.callStaticMethod(n, "showIosRewardVideoByJs:", e);
},
isIosInterstitialReadyAsyn: function(e, t) {
jsb.reflection.callStaticMethod(n, "isInterstitialReadyAsynByJs:callback:", e, t);
},
isIosInterstitialReady: function(e) {
return jsb.reflection.callStaticMethod(n, "isInterstitialReadyByJs:", e);
},
showIosInterstitialAd: function(e) {
jsb.reflection.callStaticMethod(n, "showInterstitialByJs:", e);
},
setIosInterstitialLoadCallback: function(e) {
jsb.reflection.callStaticMethod(n, "setInterstitialCallbackByJs:", e);
},
showIosInterstitialDebugUI: function() {
jsb.reflection.callStaticMethod(n, "showInterstitialDebugActivityByJs");
},
removeIosBannerAdAt: function(e) {
jsb.reflection.callStaticMethod(n, "removeBannerByJs:", e);
},
showIosBannerAdAtTop: function(e) {
jsb.reflection.callStaticMethod(n, "showTopBannerByJs:", e);
},
showIosBannerAdAtBottom: function(e) {
jsb.reflection.callStaticMethod(n, "showBottomBannerByJs:", e);
},
hideIosBannerAdAtTop: function() {
jsb.reflection.callStaticMethod(n, "hideTopBannerByJs");
},
hideIosBannerAdAtBottom: function() {
jsb.reflection.callStaticMethod(n, "hideBottomBannerByJs");
},
setIosTopBannerPading: function(e) {
var t = "0";
"number" == typeof e ? t = String(e) : "string" == typeof e && (t = e);
jsb.reflection.callStaticMethod(n, "setTopBannerPadingForIphonexByJs:", t);
},
showIosIconAdAt: function(e, t, i, a, o, s) {
jsb.reflection.callStaticMethod(n, "showIconX:y:width:height:rotationAngle:placementId:", e, t, i, a, o, s);
},
removeIosIconAdAt: function(e) {
jsb.reflection.callStaticMethod(n, "removeIcon:", e);
},
loadIosAdsByManual: function() {
jsb.reflection.callStaticMethod(n, "loadIosAdsByManualByJs");
},
exitIosApp: function() {
jsb.reflection.callStaticMethod(n, "exitIosAppByJs");
},
updateIosAccessPrivacyInfoStatus: function(e) {
jsb.reflection.callStaticMethod(n, "updateAccessPrivacyInfoStatusByJs:", e);
},
getIosAccessPrivacyInfoStatus: function() {
return jsb.reflection.callStaticMethod(n, "getAccessPrivacyInfoStatusByJs");
},
notifyIosAccessPrivacyInfoStatus: function(e, t) {
jsb.reflection.callStaticMethod(n, "notifyAccessPrivacyInfoStatusByJs:callId:", e, t);
},
isIosEuropeanUnionUser: function(e, t) {
jsb.reflection.callStaticMethod(n, "isEuropeanUnionUserByJs:callId:", e, t);
},
reportIvokePluginMethodReceive: function(e) {
jsb.reflection.callStaticMethod(n, "reportIvokePluginMethodReceiveByJs:", e);
},
reportRDRewardClose: function(e) {
jsb.reflection.callStaticMethod(n, "reportRDRewardCloseByJs:", e);
},
reportRDRewardClick: function(e) {
jsb.reflection.callStaticMethod(n, "reportRDRewardClickByJs:", e);
},
reportRDRewardGiven: function(e) {
jsb.reflection.callStaticMethod(n, "reportRDRewardGivenByJs:", e);
},
reportRDShowDid: function(e) {
jsb.reflection.callStaticMethod(n, "reportRDShowDidByJs:", e);
},
reportRDRewardCancel: function(e) {
jsb.reflection.callStaticMethod(n, "reportRDRewardCancelByJs:", e);
},
reportILClose: function(e, t) {
jsb.reflection.callStaticMethod(n, "reportILCloseByJs:msg:", void 0 == t ? "" : t, e);
},
reportILClick: function(e, t) {
jsb.reflection.callStaticMethod(n, "reportILClickByJs:msg:", void 0 == t ? "" : t, e);
},
reportILShowDid: function(e, t) {
jsb.reflection.callStaticMethod(n, "reportILShowDidByJs:msg:", void 0 == t ? "" : t, e);
},
isOnlineDebugReportEnable: function() {
return jsb.reflection.callStaticMethod(n, "isReportOnlineEnableByJs");
},
isIosLogOpened: function() {
return jsb.reflection.callStaticMethod(n, "isIosLogOpenedByJs");
},
autoOneKeyInspectByIos: function() {
jsb.reflection.callStaticMethod(n, "autoOneKeyInspectByJs");
},
tellToDoctorByIos: function(e, t, i) {
jsb.reflection.callStaticMethod(n, "tellToDoctorByJs:adid:msg:", e, t, i);
},
setAppsFlyerUIDByIos: function(e) {
jsb.reflection.callStaticMethod(n, "setAppsFlyerUIDByJs:", e);
},
setAdjustIdByIos: function(e) {
jsb.reflection.callStaticMethod(n, "setAdjustIdByJs:", e);
}
};
t.exports = o;
cc._RF.pop();
}, {} ],
UPLTV: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "1262dOfvABFVJ1EwXaOwcQh", "UPLTV");
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = e("UPLTVIos"), o = e("UPLTVAndroid"), s = !1, r = function(e) {
void 0 != e && null != e && void 0 != p && null != p.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? p.upltvbridge.printJsLog(e) : cc.sys.os === cc.sys.OS_IOS && p.upltvbridge.printJsLog(e));
}, l = function(e, t, i) {
void 0 != p && (void 0 != i ? p.onlineDebugReport(e, t, i) : p.onlineDebugReport(e, t));
}, c = function(e, t, i) {
void 0 != p && void 0 != p.upltvbridge && null != p.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? p.upltvbridge.tellToDoctorByAndroid(e, t, i) : cc.sys.os === cc.sys.OS_IOS && p.upltvbridge.tellToDoctorByIos(e, null == t ? "" : t, null == i ? "" : i));
}, h = {
handleVokeParams: function(e) {
if (void 0 != e && null != e && "string" == typeof e) {
var t = e.indexOf(":"), i = null;
if (!(t <= 0)) {
var n = (i = e.substr(t + 1)).indexOf(","), a = i.substring(0, n), o = null, d = null;
if ((t = (i = i.substr(n + 1)).indexOf(":")) > 0 && (n = (i = i.substr(t + 1)).indexOf(",")) > 0) {
o = i.substring(0, n);
null != (i = i.substr(n + 1)) && (t = i.indexOf(":")) > 0 && (d = i.substr(t + 1));
}
r("===> js handleVokeParams callname: " + a);
r("===> js handleVokeParams   cpadid: " + o);
r("===> js handleVokeParams  message: " + d);
var g = void 0 != p && p.isOnlineDebugReportEnable();
g && l(h.Function_Receive_Callback, "CocosJs Receive message, callname:" + a + ", cpadid:" + o);
if (h.Action_Doctor_ON_DUTY == a) g && (s = !0); else if (h.Action_Doctor_OFF_DUTY == a) g && (s = !1); else if (h.Function_Doctor_IL_Load_Request == a) g && 1 == s && p.setInterstitialLoadCallback(h.Function_Doctor_IL_Show_AdId, function(e, t) {
c(h.Action_Doctor_Ad_IL_LoadOk_Reply, h.Function_Doctor_IL_Show_AdId, "cocoscreator js il load ok");
}, function(e, t) {
c(h.Action_Doctor_Ad_IL_LoadFail_Reply, h.Function_Doctor_IL_Show_AdId, t);
}); else if (h.Function_Doctor_RD_Load_Request == a) g && 1 == s && p.setRewardVideoLoadCallback(function(e, t) {
c(h.Action_Doctor_Ad_RD_LoadOk_Reply, h.Function_Doctor_RD_Show_AdId, "cocoscreator js rd load ok");
}, function(e, t) {
c(h.Action_Doctor_Ad_RD_LoadFail_Reply, h.Function_Doctor_RD_Show_AdId, t);
}); else if (h.Function_Doctor_RD_Show_Request == a) p.showRewardVideo(h.Function_Doctor_RD_Show_AdId); else if (h.Function_Doctor_IL_Show_Request == a) p.showInterstitialAd(h.Function_Doctor_IL_Show_AdId); else if (h.Function_Reward_DidLoadFail == a) if (null != u.rewardLoadFailCall && "function" == typeof u.rewardLoadFailCall) {
u.rewardLoadFailCall(o, d);
u.resetRewardLoadCallback();
} else r("===> js rewardLoadFailCall is null or not function"); else if (h.Function_Reward_DidLoadSuccess == a) if (null != u.rewardLoadSuccessCall && "function" == typeof u.rewardLoadSuccessCall) {
u.rewardLoadSuccessCall(o, d);
u.resetRewardLoadCallback();
} else r("===> rewardLoadSuccessCall is null or not function"); else if (h.Function_Reward_WillOpen == a) {
if (g && 1 == s) {
l(a, "CocosJs did run callback on video willopen event.");
c(h.Action_Doctor_Ad_RD_WillShow_Reply, h.Function_Doctor_RD_Show_AdId, "tell the rd willshow event to doctor.");
return;
}
if (null != (_ = u.rewardShowCall) && "function" == typeof _) {
_(p.AdEventType.VIDEO_EVENT_WILL_SHOW, o);
g && l(a, "CocosJs did run callback on video willopen event.");
} else g && l(a, "CocosJs not run callback on video willopen event.");
} else if (h.Function_Reward_DidOpen == a) {
if (g && 1 == s) {
l(a, "CocosJs did run callback on video shown event.");
c(h.Action_Doctor_Ad_RD_DidShow_Reply, h.Function_Doctor_RD_Show_AdId, "tell the rd didopen event to doctor.");
return;
}
if (null != (_ = u.rewardShowCall) && "function" == typeof _) {
_(p.AdEventType.VIDEO_EVENT_DID_SHOW, o);
g && l(a, "CocosJs did run callback on video shown event.");
} else g && l(a, "CocosJs not run callback on video shown event.");
} else if (h.Function_Reward_DidClick == a) {
if (g && 1 == s) {
l(a, "CocosJs did run callback on video clicked event.");
c(h.Action_Doctor_Ad_RD_DidClick_Reply, h.Function_Doctor_RD_Show_AdId, "tell the rd didclick event to doctor.");
return;
}
if (null != (_ = u.rewardShowCall) && "function" == typeof _) {
_(p.AdEventType.VIDEO_EVENT_DID_CLICK, o);
g && l(a, "CocosJs did run callback on video clicked event.");
} else g && l(a, "CocosJs not run callback on video clicked event.");
} else if (h.Function_Reward_DidClose == a) {
if (g && 1 == s) {
l(a, "CocosJs did run callback on video closed event.");
c(h.Action_Doctor_Ad_RD_DidClose_Reply, h.Function_Doctor_RD_Show_AdId, "tell the rd didclose event to doctor.");
return;
}
if (null != (_ = u.rewardShowCall) && "function" == typeof _) {
_(p.AdEventType.VIDEO_EVENT_DID_CLOSE, o);
g && l(a, "CocosJs did run callback on video closed event.");
} else g && l(a, "CocosJs not run callback on video closed event.");
} else if (h.Function_Reward_DidGivien == a) {
if (g && 1 == s) {
l(a, "CocosJs did run callback on video reward given event.");
c(h.Action_Doctor_Ad_RD_Given_Reply, h.Function_Doctor_RD_Show_AdId, "tell the rd givenreward event to doctor.");
return;
}
if (null != (_ = u.rewardShowCall) && "function" == typeof _) {
_(p.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD, o);
g && l(a, "CocosJs did run callback on video reward given event.");
} else g && l(a, "CocosJs not run callback on video reward given event.");
} else if (h.Function_Reward_DidAbandon == a) {
if (g && 1 == s) {
l(a, "CocosJs did run callback on video reward cancel event.");
c(h.Action_Doctor_Ad_RD_Cancel_Reply, h.Function_Doctor_RD_Show_AdId, "tell the noreward event to doctor.");
return;
}
if (null != (_ = u.rewardShowCall) && "function" == typeof _) {
_(p.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD, o);
g && l(a, "CocosJs did run callback on video reward cancel event.");
} else g && l(a, "CocosJs not run callback on video reward cancel event.");
} else if (h.Function_Interstitial_DidLoadFail == a) {
var m = o + "_Interstitial";
if (null != (f = u.get(m))) {
null != (_ = f.interstitialLoadFailCall) && "function" == typeof _ && _(o, d);
u.remove(m);
r("===> Interstitial_DidLoadFail at key:" + m);
}
} else if (h.Function_Interstitial_DidLoadSuccess == a) {
m = o + "_Interstitial";
if (null != (f = u.get(m))) {
null != (_ = f.interstitialLoadSuccessCall) && "function" == typeof _ ? _(o, d) : r("===> interstitial_didloadsuccess call is null or non-function type at key:" + m);
u.remove(m);
} else r("===> interstitial_didloadsuccess v is null at key:" + m);
} else if (h.Function_Interstitial_Willshow == a) {
if (g && 1 == s) {
l(a, "CocosJs did run callback on il ad willshown event.", h.Function_Doctor_IL_Show_AdId);
c(h.Action_Doctor_Ad_IL_WillShow_Reply, h.Function_Doctor_IL_Show_AdId, "tell the il willshow event to doctor.");
return;
}
var y = !1;
if (null != (f = u.get(o))) {
if (null != (_ = f.interstitialShowCall) && "function" == typeof _) {
_(p.AdEventType.INTERSTITIAL_EVENT_WILL_SHOW, o);
if (g) {
y = !0;
l(a, "CocosJs did run callback on il ad willshown event at " + o, o);
}
}
}
g && 0 == y && l(a, "CocosJs not run callback on il ad willshown event at " + o, o);
} else if (h.Function_Interstitial_Didshow == a) {
if (g && 1 == s) {
l(a, "CocosJs did run callback on il ad shown event.", h.Function_Doctor_IL_Show_AdId);
c(h.Action_Doctor_Ad_IL_DidShow_Reply, h.Function_Doctor_IL_Show_AdId, "tell the il didshow event to doctor.");
return;
}
y = !1;
if (null != (f = u.get(o))) {
if (null != (_ = f.interstitialShowCall) && "function" == typeof _) {
_(p.AdEventType.INTERSTITIAL_EVENT_DID_SHOW, o);
if (g) {
y = !0;
l(a, "CocosJs did run callback on il ad shown event at " + o, o);
}
}
}
g && 0 == y && l(a, "CocosJs not run callback on il ad shown event at " + o, o);
} else if (h.Function_Interstitial_Didclose == a) {
if (g && 1 == s) {
l(a, "CocosJs did run callback on il ad closed event.", h.Function_Doctor_IL_Show_AdId);
c(h.Action_Doctor_Ad_IL_DidClose_Reply, h.Function_Doctor_IL_Show_AdId, "tell the il didclose event to doctor.");
return;
}
y = !1;
if (null != (f = u.get(o))) {
if (null != (_ = f.interstitialShowCall) && "function" == typeof _) {
_(p.AdEventType.INTERSTITIAL_EVENT_DID_CLOSE, o);
if (g) {
y = !0;
l(a, "CocosJs did run callback on il ad closed event at " + o, o);
}
}
}
g && 0 == y && l(a, "CocosJs not run callback on il ad closed event at " + o, o);
} else if (h.Function_Interstitial_Didclick == a) {
if (g && 1 == s) {
l(a, "CocosJs did run callback on il ad clicked event.", h.Function_Doctor_IL_Show_AdId);
c(h.Action_Doctor_Ad_IL_DidClick_Reply, h.Function_Doctor_IL_Show_AdId, "tell the il didclick event to doctor.");
return;
}
y = !1;
if (null != (f = u.get(o))) {
if (null != (_ = f.interstitialShowCall) && "function" == typeof _) {
_(p.AdEventType.INTERSTITIAL_EVENT_DID_CLICK, o);
if (g) {
y = !0;
l(a, "CocosJs did run callback on il ad clicked event at " + o, o);
}
}
}
g && 0 == y && l(a, "CocosJs not run callback on il ad clicked event at " + o, o);
} else if (h.Function_Banner_DidRemove == a) {
if (null != (f = u.get(o))) {
null != (_ = f.bannerEventCall) && "function" == typeof _ && _(p.AdEventType.BANNER_EVENT_DID_REMOVED, o);
}
u.remove(o);
} else if (h.Function_Banner_DidClick == a) {
if (null != (f = u.get(o))) {
null != (_ = f.bannerEventCall) && "function" == typeof _ && _(p.AdEventType.BANNER_EVENT_DID_CLICK, o);
}
} else if (h.Function_Banner_DidShow == a) {
if (null != (f = u.get(o))) {
null != (_ = f.bannerEventCall) && "function" == typeof _ && _(p.AdEventType.BANNER_EVENT_DID_SHOW, o);
}
} else if (h.Function_Icon_DidLoad == a) {
if (null != (f = u.get(o))) {
null != (_ = f.iconEventCall) && "function" == typeof _ && _(p.AdEventType.ICON_EVENT_DID_LOAD, o);
}
} else if (h.Function_Icon_DidLoadFail == a) {
if (null != (f = u.get(o))) {
null != (_ = f.iconEventCall) && "function" == typeof _ && _(p.AdEventType.ICON_EVENT_DID_LOADFAIL, o);
}
} else if (h.Function_Icon_DidShow == a) {
if (null != (f = u.get(o))) {
null != (_ = f.iconEventCall) && "function" == typeof _ && _(p.AdEventType.ICON_EVENT_DID_SHOW, o);
}
} else if (h.Function_Icon_DidClick == a) {
var f;
if (null != (f = u.get(o))) {
var _;
null != (_ = f.iconEventCall) && "function" == typeof _ && _(p.AdEventType.ICON_EVENT_DID_CLICK, o);
}
}
}
}
},
Function_Receive_Callback: "receive_callback",
Function_Reward_WillOpen: "reward_willopen",
Function_Reward_DidOpen: "reward_didopen",
Function_Reward_DidClick: "reward_didclick",
Function_Reward_DidClose: "reward_didclose",
Function_Reward_DidGivien: "reward_didgiven",
Function_Reward_DidAbandon: "reward_didabandon",
Function_Interstitial_Willshow: "interstitial_willshow",
Function_Interstitial_Didshow: "interstitial_didshow",
Function_Interstitial_Didclose: "interstitial_didclose",
Function_Interstitial_Didclick: "interstitial_didclick",
Function_Banner_DidShow: "banner_didshow",
Function_Banner_DidClick: "banner_didclick",
Function_Banner_DidRemove: "banner_didremove",
Function_Reward_DidLoadFail: "reward_didloadfail",
Function_Reward_DidLoadSuccess: "reward_didloadsuccess",
Function_Interstitial_DidLoadFail: "interstitial_didloadfail",
Function_Interstitial_DidLoadSuccess: "interstitial_didloadsuccess",
Function_Icon_DidLoad: "icon_didload",
Function_Icon_DidLoadFail: "icon_didloadfail",
Function_Icon_DidShow: "icon_didshow",
Function_Icon_DidClick: "icon_didclick",
Action_Doctor_ON_DUTY: "auto_ad_checking_doctor_on_duty",
Action_Doctor_OFF_DUTY: "auto_ad_checking_doctor_off_duty",
Action_Doctor_Ad_IL_LoadOk_Reply: "auto_ad_il_load_ok_reply",
Action_Doctor_Ad_IL_LoadFail_Reply: "auto_ad_il_load_fail_reply",
Action_Doctor_Ad_IL_WillShow_Reply: "auto_ad_il_willshow_reply",
Action_Doctor_Ad_IL_DidShow_Reply: "auto_ad_il_didshow_reply",
Action_Doctor_Ad_IL_DidClick_Reply: "auto_ad_il_didclick_reply",
Action_Doctor_Ad_IL_DidClose_Reply: "auto_ad_il_didclose_reply",
Action_Doctor_Ad_RD_LoadOk_Reply: "auto_ad_rd_load_ok_reply",
Action_Doctor_Ad_RD_LoadFail_Reply: "auto_ad_rd_load_fail_reply",
Action_Doctor_Ad_RD_WillShow_Reply: "auto_ad_rd_willshow_reply",
Action_Doctor_Ad_RD_DidShow_Reply: "auto_ad_rd_didshow_reply",
Action_Doctor_Ad_RD_DidClick_Reply: "auto_ad_rd_didclick_reply",
Action_Doctor_Ad_RD_DidClose_Reply: "auto_ad_rd_didclose_reply",
Action_Doctor_Ad_RD_Given_Reply: "auto_ad_rd_reward_given_reply",
Action_Doctor_Ad_RD_Cancel_Reply: "auto_ad_rd_reward_cancel_reply",
Function_Doctor_IL_Show_AdId: "auto_sample_ad_il_show_placeid",
Function_Doctor_RD_Show_AdId: "auto_sample_ad_rd_show_placeid",
Function_Doctor_IL_Show_Request: "invoke_plugin_ad_il_show_request",
Function_Doctor_RD_Show_Request: "invoke_plugin_ad_rd_show_request",
Function_Doctor_IL_Load_Request: "invoke_plugin_ad_il_load_request",
Function_Doctor_RD_Load_Request: "invoke_plugin_ad_rd_load_request"
}, u = {
map: new Object(),
length: 0,
rewardLoadFailCall: null,
rewardLoadSuccessCall: null,
rewardShowCall: null,
backPressedCall: null,
resetRewardLoadCallback: function() {
this.rewardLoadFailCall = null;
this.rewardLoadSuccessCall = null;
},
size: function() {
return this.length;
},
put: function(e, t) {
this.map["_" + e] || ++this.length;
this.map["_" + e] = t;
},
remove: function(e) {
if (this.map["_" + e]) {
--this.length;
return delete this.map["_" + e];
}
return !1;
},
exist: function(e) {
return !!this.map["_" + e];
},
get: function(e) {
return this.map["_" + e] ? this.map["_" + e] : null;
},
print: function() {
var e = "";
for (var t in this.map) e += "/n" + t + "  Value:" + this.map[t];
r("===> js map : " + e);
return e;
},
test: function() {
this.put("1", function() {});
this.put("2", function(e) {
cc.log("===> js map function call at 2, v type: %s", "undefined" == typeof e ? "undefined" : n(e));
});
this.put("4", function() {});
r("===> js map exist 1: " + this.exist("1"));
r("===> js map exist 2: " + this.exist("3"));
var e = this.get("2");
e && e("========================");
this.print();
this.remove("1");
this.remove("3");
r("===> js map size: " + this.size());
}
}, d = function() {
cc.sys.os === cc.sys.OS_IOS && null != p ? void 0 != p.upltvbridge && null != p.upltvbridge || (p.upltvbridge = a) : cc.sys.os === cc.sys.OS_ANDROID && null != p && (void 0 != p.upltvbridge && null != p.upltvbridge || (p.upltvbridge = o));
}, g = {
initSdkSuccessed: !1,
initVokeCall: null,
initSdkCallback: function(e) {
"true" != e && 1 != e || (this.initSdkSuccessed = !0);
cc.log("===> js initSdkCallback..., %s", e);
void 0 != this.initVokeCall && null != this.initVokeCall && "function" == typeof this.initVokeCall && this.initVokeCall(this.initSdkSuccessed);
void 0 != this.initVokeCall && (this.initVokeCall = null);
},
vokeMethod: function(e) {
h.handleVokeParams(e);
},
vokeILReadyMethod: function(e, t) {
this.handleILReadyMethod(e, t);
},
handleILReadyMethod: function(e, t) {
var i = "ILReady_" + e, n = u.get(i);
if (null != n) {
u.remove(i);
if ("function" == typeof n) {
var a = !1;
"true" != t && 1 != t || (a = !0);
n(a);
}
}
}
}, p = p || {
upltvbridge: null,
initSdk: function(e, t, i, n) {
if (1 != cc.bridgeInterface.initSdkSuccessed) {
if (void 0 != n && null != n && "function" == typeof n) {
r("===> js set initVokeCall...");
cc.bridgeInterface.initVokeCall = n;
}
var a = "cc.bridgeInterface.vokeMethod", o = "cc.bridgeInterface.initSdkCallback";
d();
if (cc.sys.os === cc.sys.OS_IOS) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == t || "" == t) {
cc.log("===> js initSdk failed, iosAppKey is undefined or empty.");
return;
}
if ("string" != typeof t) {
cc.log("===> js initSdk failed, iosAppKey is not string type.");
return;
}
if (void 0 == i || 0 != i && 1 != i && 2 != i) {
cc.log("===> js initSdk WARNING: iosZone iswrong value, will be setted to 0");
i = 0;
}
this.upltvbridge.setShowLog(!0);
this.upltvbridge.initIosSDK(t, i, a, o);
}
} else if (cc.sys.os === cc.sys.OS_ANDROID) {
if (void 0 == e && "" == e) {
r("please set correct androidAppKey for initializing upsdk");
return;
}
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
this.upltvbridge.setShowLog(!0);
this.upltvbridge.initAndroidSDK(e, a, o);
}
}
} else r("===> js initSdk don't called again ");
},
initAbtConfigJson: function(e, t, i, n, a, o, s) {
var r = null;
if (void 0 != s && null != s && s instanceof Array) {
var l = s.length;
r = '{"array":[';
for (var c = 0; c < l; c++) {
r += '"' + s[c];
r += c < l - 1 ? '",' : '"]}';
}
}
void 0 == t && (t = !1);
void 0 == i && (i = 0);
void 0 == n && (n = "");
void 0 == a && (a = "");
void 0 == o && (o = -1);
cc.sys.os === cc.sys.OS_IOS ? void 0 != this.upltvbridge && null != this.upltvbridge && this.upltvbridge.initIosAbtConfigJson(e, t, i, n, a, o, r) : cc.sys.os === cc.sys.OS_ANDROID && void 0 != this.upltvbridge && null != this.upltvbridge && this.upltvbridge.initAndroidAbtConfigJson(e, t, i, n, a, o, r);
},
getAbtConfig: function(e) {
if (void 0 != e && null != e && "string" == typeof e) if (cc.sys.os === cc.sys.OS_IOS) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
return "" == (t = this.upltvbridge.getIosAbtConfig(e)) ? null : t;
}
} else if (cc.sys.os === cc.sys.OS_ANDROID && void 0 != this.upltvbridge && null != this.upltvbridge) {
var t;
return "" == (t = this.upltvbridge.getAndroidAbtConfig(e)) ? null : t;
}
return null;
},
showRewardDebugUI: function() {
void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.showIosRewardDebugUI() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidRewardDebugUI());
},
setRewardVideoLoadCallback: function(e, t) {
if (void 0 != e && null != e && "function" == typeof e) if (void 0 != t && null != t && "function" == typeof t) {
u.rewardLoadFailCall = void 0 == t ? null : t;
u.rewardLoadSuccessCall = void 0 == e ? null : e;
void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.setIosRewardVideoLoadCallback() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.setAndroidRewardVideoLoadCallback());
} else r("===> setRewardVideoLoadCallback(), the locadfail can't be undefined or null or non-function type."); else r("===> setRewardVideoLoadCallback(), the loadsuccess can't be undefined or null or non-function type.");
},
setRewardVideoShowCallback: function(e) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == e || null == e || "function" != typeof e) {
r("===> setRewardVideoShowCallback(), the showCall can't be undefined or null or non-function type.");
return;
}
u.rewardShowCall = e;
}
},
isRewardReady: function() {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (cc.sys.os === cc.sys.OS_IOS) return this.upltvbridge.isIosRewardReady();
if (cc.sys.os === cc.sys.OS_ANDROID) return this.upltvbridge.isAndroidRewardReady();
}
return !1;
},
showRewardVideo: function(e) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
void 0 == e && (e = null);
cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.showIosRewardVideo(e) : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidRewardVideo(e);
}
},
isInterstitialReadyAsyn: function(e, t) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == e || null == e) {
r("Please set the Paramer cpPlaceId's value in function isInterstitialReadyAsyn()");
return;
}
if (t == e || null == t) {
r("Please set the Paramer callback's value in function isInterstitialReadyAsyn()");
return;
}
if ("function" != typeof t) {
r("The Paramer 'callback' is  non-function type in function isInterstitialReadyAsyn()");
return;
}
var i = "ILReady_" + e;
u.put(i, t);
cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.isIosInterstitialReadyAsyn(e, "cc.bridgeInterface.vokeILReadyMethod") : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.isAndroidInterstitialReadyAsyn(e, "cc.bridgeInterface.vokeILReadyMethod");
}
},
isInterstitialReady: function(e) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == e || null == e) {
r("===> isInterstitialReady(), the cpPlaceId can't be undefined or null.");
return;
}
if (cc.sys.os === cc.sys.OS_IOS) return this.upltvbridge.isIosInterstitialReady(e);
if (cc.sys.os === cc.sys.OS_ANDROID) return this.upltvbridge.isAndroidInterstitialReady(e);
}
return !1;
},
showInterstitialAd: function(e) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == e || null == e) {
r("Please set the Paramer cpPlaceId's value in function showInterstitialAd()");
return;
}
cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.showIosInterstitialAd(e) : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidInterstitialAd(e);
}
},
setInterstitialLoadCallback: function(e, t, i) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == e || null == e) {
r("===> setIntersitialLoadCall(), the cpPlaceId can't be undefined or null.");
return;
}
if (void 0 == t || null == t || "function" != typeof t) {
r("===> setIntersitialLoadCall(), the loadsuccess can't be undefined or null or null or non-function type.");
return;
}
if (void 0 == i || null == i || "function" != typeof i) {
r("===> setIntersitialLoadCall(), the locadfail can't be undefined or null or null or non-function type.");
return;
}
var n = e + "_Interstitial", a = u.get(n) || {};
a.interstitialLoadSuccessCall = t;
a.interstitialLoadFailCall = i;
u.put(n, a);
r("===> setIntersitialLoadCall() ltvMap size: " + u.size());
cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.setIosInterstitialLoadCallback(e) : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.setAndroidInterstitialLoadCallback(e);
}
},
setInterstitialShowCallback: function(e, t) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == e || null == e) {
r("===> setInterstitialShowCallback(), the cpPlaceId can't be undefined or null.");
return;
}
if (void 0 == t || null == t || "function" != typeof t) {
r("===> setInterstitialShowCallback(), the showCall can't be undefined or null or non-function type.");
return;
}
var i = e, n = u.get(i) || {};
n.interstitialShowCall = t;
u.put(i, n);
}
},
showInterstitialDebugUI: function() {
void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.showIosInterstitialDebugUI() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidInterstitialDebugUI());
},
removeBannerAdAt: function(e) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == e || null == e) {
r("===> removeBannerAdAt(), the cpPlaceId can't be undefined or null.");
return;
}
cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.removeIosBannerAdAt(e) : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.removeAndroidBannerAdAt(e);
}
},
showBannerAdAtTop: function(e) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == e || null == e) {
r("===> showBannerAdAtTop(), the cpPlaceId can't be undefined or null.");
return;
}
cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.showIosBannerAdAtTop(e) : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidBannerAdAtTop(e);
}
},
showBannerAdAtBottom: function(e) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == e || null == e) {
r("===> showBannerAdAtBottom(), the cpPlaceId can't be undefined or null.");
return;
}
cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.showIosBannerAdAtBottom(e) : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidBannerAdAtBottom(e);
}
},
hideBannerAdAtTop: function() {
void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.hideIosBannerAdAtTop() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.hideAndroidBannerAdAtTop());
},
hideBannerAdAtBottom: function() {
void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.hideIosBannerAdAtBottom() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.hideAndroidBannerAdAtBottom());
},
setTopBannerPadingForIphoneX: function(e) {
void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.setIosTopBannerPading(e) : (cc.sys.os, 
cc.sys.OS_ANDROID));
},
setBannerShowCallback: function(e, t) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == e || null == e) {
r("===> setBannerShowCallback(), the cpPlaceId can't be undefined or null.");
return;
}
if (void 0 == t || null == t || "function" != typeof t) {
r("===> setBannerShowCallback(), the bannerCall can't be undefined or null or non-function type.");
return;
}
var i = u.get(e) || {};
i.bannerEventCall = t;
u.put(e, i);
}
},
setIconCallback: function(e, t) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == e || null == e) {
r("===> setIconCallback(), the cpPlaceId can't be undefined or null.");
return;
}
if (void 0 == t || null == t || "function" != typeof t) {
r("===> setIconCallback(), the iconCall can't be undefined or null or non-function type.");
return;
}
var i = u.get(e) || {};
i.iconEventCall = t;
u.put(e, i);
}
},
showIconAd: function(e, t, i, n, a, o) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == o || null == o) {
r("===> showIconAd(), the cpPlaceId can't be undefined or null.");
return;
}
cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.showAndroidIconAdAt(e, t, i, n, a, o);
cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.showIosIconAdAt(e, t, i, n, a, o);
}
},
removeIconAd: function(e) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (void 0 == e || null == e) {
r("===> removeIconAd(), the cpPlaceId can't be undefined or null.");
return;
}
cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.removeAndroidIconAdAt(e);
cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.removeIosIconAdAt(e);
}
},
loadAdsByManual: function() {
void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.loadIosAdsByManual() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.loadAndroidAdsByManual());
},
exitApp: function() {
void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_IOS ? this.upltvbridge.exitIosApp() : cc.sys.os === cc.sys.OS_ANDROID && this.upltvbridge.exitAndroidApp());
},
setManifestPackageName: function(e) {
void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.setAndroidManifestPackageName(e) : (cc.sys.os, 
cc.sys.OS_ANDROID));
},
onBackPressed: function() {
void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.onAndroidBackPressed() : (cc.sys.os, 
cc.sys.OS_IOS));
},
setCustomerId: function(e) {
d();
if (void 0 != this.upltvbridge && null != this.upltvbridge) if (cc.sys.os === cc.sys.OS_ANDROID) {
if (void 0 == e || null == e) {
r("===> setCustomerId(), the anroidid can't be null");
return;
}
this.upltvbridge.setAndroidCustomerId(e);
} else cc.sys.os, cc.sys.OS_IOS;
},
updateAccessPrivacyInfoStatus: function(e) {
d();
void 0 != e && null != e ? e == p.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown || e == p.GDPRPermissionEnum.UPAccessPrivacyInfoStatusAccepted || e == p.GDPRPermissionEnum.UPAccessPrivacyInfoStatusDefined ? void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.updateAndroidAccessPrivacyInfoStatus(e) : cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.updateIosAccessPrivacyInfoStatus(e)) : r("===> updateAccessPrivacyInfoStatus(), the gdprPermissionEnumValue is a wrong type.") : r("===> updateAccessPrivacyInfoStatus(), the gdprPermissionEnumValue can't be null");
},
getAccessPrivacyInfoStatus: function() {
d();
var e = 0;
void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? e = this.upltvbridge.getAndroidAccessPrivacyInfoStatus() : cc.sys.os === cc.sys.OS_IOS && (e = this.upltvbridge.getIosAccessPrivacyInfoStatus()));
return 1 == e ? p.GDPRPermissionEnum.UPAccessPrivacyInfoStatusAccepted : 2 == e ? p.GDPRPermissionEnum.UPAccessPrivacyInfoStatusDefined : p.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown;
},
notifyAccessPrivacyInfoStatus: function(e) {
d();
if (void 0 != e && null != e) if ("function" == typeof e) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
p.GDPRPermissionEnum.functionId = p.GDPRPermissionEnum.functionId + 1;
var t = p.GDPRPermissionEnum.functionId, i = "" + t;
u.put(i, e);
var n = "upltv.GDPRPermissionEnum.javaCall";
cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.notifyAndroidAccessPrivacyInfoStatus(n, t) : cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.notifyIosAccessPrivacyInfoStatus(n, i);
}
} else r("===> notifyAccessPrivacyInfoStatus(), the callback must be function."); else r("===> notifyAccessPrivacyInfoStatus(), the callback can't be null.");
},
isEuropeanUnionUser: function(e) {
d();
if (void 0 != e && null != e) if ("function" == typeof e) {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
p.GDPRPermissionEnum.functionId = p.GDPRPermissionEnum.functionId + 1;
var t = p.GDPRPermissionEnum.functionId, i = "" + t;
u.put(i, e);
var n = "upltv.GDPRPermissionEnum.javaCall";
cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.isAndroidEuropeanUnionUser(n, t) : cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.isIosEuropeanUnionUser(n, i);
}
} else r("===> isEuropeanUnionUser(), the callback must be function."); else r("===> isEuropeanUnionUser(), the callback can't be null.");
},
isOnlineDebugReportEnable: function() {
return (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os === cc.sys.OS_IOS) && this.upltvbridge.isOnlineDebugReportEnable();
},
onlineDebugReport: function(e, t, i) {
cc.sys.os !== cc.sys.OS_ANDROID && cc.sys.os !== cc.sys.OS_IOS || (h.Function_Receive_Callback == e ? this.upltvbridge.reportIvokePluginMethodReceive(t) : h.Function_Reward_WillOpen == e || (h.Function_Reward_DidOpen == e ? this.upltvbridge.reportRDShowDid(t) : h.Function_Reward_DidClick == e ? this.upltvbridge.reportRDRewardClick(t) : h.Function_Reward_DidClose == e ? this.upltvbridge.reportRDRewardClose(t) : h.Function_Reward_DidGivien == e ? this.upltvbridge.reportRDRewardGiven(t) : h.Function_Reward_DidAbandon == e ? this.upltvbridge.reportRDRewardCancel(t) : h.Function_Interstitial_Willshow == e || (h.Function_Interstitial_Didshow == e ? this.upltvbridge.reportILShowDid(t, i) : h.Function_Interstitial_Didclick == e ? this.upltvbridge.reportILClick(t, i) : h.Function_Interstitial_Didclose == e && this.upltvbridge.reportILClose(t, i))));
},
isLogOpened: function() {
if (void 0 != this.upltvbridge && null != this.upltvbridge) {
if (cc.sys.os === cc.sys.OS_IOS) return this.upltvbridge.isIosLogOpened();
if (cc.sys.os === cc.sys.OS_ANDROID) return this.upltvbridge.isAndroidLogOpened();
}
return !1;
},
autoOneKeyInspect: function() {
r("===> called autoOneKeyInspect");
void 0 != this.upltvbridge && null != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.autoOneKeyInspectByAndroid() : cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.autoOneKeyInspectByIos());
},
setAppsFlyerUID: function(e) {
d();
0 != arguments.length && void 0 != e ? "string" == typeof e ? "" != e ? void 0 != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.setAppsFlyerUIDByAndroid(e) : cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.setAppsFlyerUIDByIos(e)) : r("===> setAppsFlyerUID(), the uid can't be empty") : r("===> setAppsFlyerUID(), the uid must be string type") : r("===> setAppsFlyerUID(), the uid can't be nil.");
},
setAdjustId: function(e) {
d();
0 != arguments.length && void 0 != e ? "string" == typeof e ? "" != e ? void 0 != this.upltvbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.upltvbridge.setAdjustIdByAndroid(e) : cc.sys.os === cc.sys.OS_IOS && this.upltvbridge.setAdjustIdByIos(e)) : r("===> setAdjustId(), the ajid can't be empty") : r("===> setAdjustId(), the ajid must be string type") : r("===> setAdjustId(), the ajid can't be nil.");
}
};
p.GDPRPermissionEnum = {
functionId: 0,
javaCall: function(e, t) {
var i = "" + e, n = u.get(i);
if (null != n) {
null != n && "function" == typeof n && n(t);
u.remove(i);
}
}
};
p.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown = 0;
p.GDPRPermissionEnum.UPAccessPrivacyInfoStatusAccepted = 1;
p.GDPRPermissionEnum.UPAccessPrivacyInfoStatusDefined = 2;
p.AdEventType = {};
p.AdEventType.VIDEO_EVENT_DID_SHOW = 0;
p.AdEventType.VIDEO_EVENT_DID_CLICK = 1;
p.AdEventType.VIDEO_EVENT_DID_CLOSE = 2;
p.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD = 3;
p.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD = 4;
p.AdEventType.INTERSTITIAL_EVENT_DID_SHOW = 5;
p.AdEventType.INTERSTITIAL_EVENT_DID_CLICK = 6;
p.AdEventType.INTERSTITIAL_EVENT_DID_CLOSE = 7;
p.AdEventType.BANNER_EVENT_DID_SHOW = 8;
p.AdEventType.BANNER_EVENT_DID_CLICK = 9;
p.AdEventType.BANNER_EVENT_DID_REMOVED = 10;
p.AdEventType.ICON_EVENT_DID_LOAD = 16;
p.AdEventType.ICON_EVENT_DID_LOADFAIL = 17;
p.AdEventType.ICON_EVENT_DID_SHOW = 18;
p.AdEventType.ICON_EVENT_DID_CLICK = 19;
p.AdEventType.VIDEO_EVENT_WILL_SHOW = 20;
p.AdEventType.INTERSTITIAL_EVENT_WILL_SHOW = 21;
t.exports.upltv = p;
t.exports.bridgeInterface = g;
cc._RF.pop();
}, {
UPLTVAndroid: "UPLTVAndroid",
UPLTVIos: "UPLTVIos"
} ],
Uigame: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a8ba2nyuHhLnIba9HoneBPa", "Uigame");
cc.Class({
extends: cc.Component,
properties: {}
});
cc._RF.pop();
}, {} ],
UpStarGotData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "1a9efxl13tC3Y5YUzEP97Qd", "UpStarGotData");
var n = e("./../Lib/common/UtilsOther"), a = e("./DataBase");
cc.Class({
extends: a,
ctor: function() {
this.fileDir = "data/upStarGotData";
},
initData: function(e) {
if (e) {
this.dataObj = e;
this.dataObj = n.arrayToDict(this.dataObj, "level");
}
},
getUpStarGotExp: function(e) {
return this.dataObj[e].evolutionExp;
}
});
cc._RF.pop();
}, {
"./../Lib/common/UtilsOther": "UtilsOther",
"./DataBase": "DataBase"
} ],
UpStarNeedData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "88221sfy7dCn7po4FlELoKp", "UpStarNeedData");
var n = e("./../Lib/common/UtilsOther"), a = e("./DataBase");
cc.Class({
extends: a,
ctor: function() {
this.fileDir = "data/upStarNeedData";
},
initData: function(e) {
if (e) {
this.dataObj = e;
this.len = this.dataObj.length;
this.dataObj = n.arrayToDict(this.dataObj, "level");
}
},
getUpStarNeedExp: function(e) {
return this.dataObj[e].evolutionMaxExp;
},
getMaxLevel: function() {
return this.len;
}
});
cc._RF.pop();
}, {
"./../Lib/common/UtilsOther": "UtilsOther",
"./DataBase": "DataBase"
} ],
UpltvHelper: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "41a16DjJLVAI7JimL0iu4o/", "UpltvHelper");
var n = e("UPLTV").upltv;
cc.bridgeInterface = e("UPLTV").bridgeInterface;
var a = cc.Class({
statics: {
initUpltv: function(e) {
n.initSdk(UPLTV_ANDROID_APPKEY, UPLTV_IOS_APPKEY, 2, function(t) {
cc.log("===> js upltv intSdk result:, %s", t);
e && e(t);
});
},
setloadRdADCb: function() {
n.setRewardVideoLoadCallback(function(e, t) {
cc.log("===> js RewardVideo LoadCallback Success at: %s", e);
}, function(e, t) {
cc.log("===> js RewardVideo LoadCallback Fail at: %s", e);
});
},
loadAndroidAdsByManual: function() {
cc.bridgeInterface.loadAndroidAdsByManual();
},
rdADIsReady: function() {
var e = n.isRewardReady();
cc.log("===> js isRewardReady r: %s", e.toString());
return e;
},
rdAdShow: function(e) {
n.setRewardVideoShowCallback(function(t, i) {
var a = "unkown";
if (t == n.AdEventType.VIDEO_EVENT_DID_SHOW) a = "Did_Show"; else if (t == n.AdEventType.VIDEO_EVENT_DID_CLICK) a = "Did_Click"; else if (t == n.AdEventType.VIDEO_EVENT_DID_CLOSE) {
a = "Did_Close";
zy.AdHelper.resumeGame();
} else if (t == n.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD) {
a = "Did_Given_Reward";
zy.httpProxy.watchAds(e);
zy.AdHelper.onOpenAdsReward(e, !0);
} else if (t == n.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD) {
a = "Did_Abandon_Reward";
zy.AdHelper.onOpenAdsReward(e, !1);
}
cc.log("===> js RewardVideo Show Callback, event: %s, at: %s", a, i);
});
var t = n.isRewardReady();
cc.log("===> js isRewardReady r: %s", t);
if (1 == t) {
cc.log("===> js showRewardVideo call");
n.showRewardVideo(e);
}
},
showRewardDebugUI: function() {
n.showRewardDebugUI();
},
setInterstitialLoadCallback: function(e, t, i) {
n.setInterstitialLoadCallback(e, t, i);
},
isInterstitialReady: function(e) {
var t = n.isInterstitialReady(e);
cc.log("===> js isInterstitialReady ret: %s", t.toString());
return t;
},
showInterstitial: function(e, t) {
n.setInterstitialShowCallback(e, t);
n.showInterstitialAd(e);
},
showInterstitialDebugUI: function() {
n.showInterstitialDebugUI();
}
}
});
zy.UpltvHelper = a;
cc._RF.pop();
}, {
UPLTV: "UPLTV"
} ],
UserData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7336dHaZ0xCkJME+CeR/q9i", "UserData");
cc.Class({
ctor: function() {
this.lastGotCoinTime = zy.utils.time();
this.freeCoinsLevel = 1;
this.hpLevel = 1;
this.preInterAdLevel = 0;
this.phPower = zy.constData.PhDefault;
this.phPowerCounts = zy.constData.MaxPhCounts1Day;
this.phPowerTime = 0;
this.phLowTime = 0;
this.vibOn = !0;
this.soundOn = !0;
this.guide = 0;
this.freeCoinsLastTime = zy.utils.time() - zy.constData.FreeCoinsCooling;
this.freeCoinsNum = zy.constData.FreeCoinsMaxNum;
this.freeCoinsNum2 = 0;
this.freeWatchNum = 0;
},
saveData: function() {
var e = {}, t = !0, i = !1, n = void 0;
try {
for (var a, o = Object.keys(this)[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
e[s] = this[s];
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
var r = JSON.stringify(e);
cc.sys.localStorage.setItem(zy.constData.StaticKey.PlayerDataKey + zy.constData.StaticKey.SaveDataVersion, r);
},
loadData: function() {
var e = cc.sys.localStorage.getItem(zy.constData.StaticKey.PlayerDataKey + zy.constData.StaticKey.SaveDataVersion);
if (e) {
e = JSON.parse(e);
var t = !0, i = !1, n = void 0;
try {
for (var a, o = Object.keys(e)[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
this.hasOwnProperty(s) && (this[s] = e[s]);
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
}
}
});
cc._RF.pop();
}, {} ],
UtilsOther: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f2c591y/+FA+qi5S+TkWGGf", "UtilsOther");
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = e("./../encrypt/Md5"), o = e("./CSVParser"), s = s || {};
s.arrayRmObj = function(e, t) {
var i = e.indexOf(t);
e.splice(i, 1);
};
s.arrayPopByIdx = function(e, t) {
var i = e[t];
e.splice(t, 1);
return i;
};
s.valueInArray = function(e, t) {
for (var i = e.length, n = 0; n < i; n++) if (e[n] == t) return !0;
return !1;
};
s.arrayRandomValue = function(e) {
var t = e.length;
return t <= 0 ? null : e[s.randomInteger(0, t - 1)];
};
s.shuffle = function(e) {
var t = void 0, i = void 0, n = void 0;
for (t = e.length - 1; t > 0; t--) {
i = Math.floor(Math.random() * (t + 1));
n = e[t];
e[t] = e[i];
e[i] = n;
}
return e;
};
s.clearArrayValue = function(e, t, i) {
for (var n = 0; n < t; n++) e[n] = i;
};
s.createObjectWithArray = function(e, t) {
var i = {};
for (var n in e) i[e[n]] = t;
return i;
};
s.arrayToDict = function(e, t) {
var i = {}, n = null;
for (var a in e) i[(n = e[a])[t]] = n;
return i;
};
s.dictToArray = function(e) {
var t = [];
for (var i in e) e.hasOwnProperty(i) && e[i] && t.push(e[i]);
return t;
};
s.objectToArrayExcludeNumber = function(e, t, i) {
var n = void 0;
n = isArray(t) ? t : [];
var a = void 0;
if (isNumber(i)) {
var o = i.toString();
for (a in e) e.hasOwnProperty(a) && e[a] && o != a && n.push(e[a]);
} else for (a in e) e.hasOwnProperty(a) && e[a] && n.push(e[a]);
return n;
};
s.splitWithValueType = function(e, t, i) {
void 0 === i && (i = ",");
var n = e.split(i);
n.forEach(function(e, i, n) {
try {
n[i] = t(e);
} catch (e) {
n[i] = null;
}
});
return n;
};
s.time = function() {
return parseInt(Date.now() / 1e3);
};
s.time2second = function(e, t, i, n, a, o) {
var s = new Date(e, t - 1, i, n, a, o).getTime();
return parseInt(s / 1e3);
};
s.getTimeAfterDays = function(e, t) {
cc.assert(e, "getTimeForDayAfterDays:time is null!");
var i = null;
i = cc.isNumber(e) ? new Date(1e3 * e) : new Date(e);
return new Date(i.getTime() + 24 * t * 60 * 60 * 1e3);
};
s.getDaysDiff = function(e, t) {
cc.assert(e && t, "getDaysDiff: date must be not null!");
var i;
e = s.isNumber(e) ? new Date(1e3 * e) : new Date(e);
t = s.isNumber(t) ? new Date(1e3 * t) : new Date(t);
var n = new Date(e.getFullYear(), e.getMonth(), e.getDate()), a = new Date(t.getFullYear(), t.getMonth(), t.getDate());
i = parseInt(Math.abs(a - n) / 1e3 / 60 / 60 / 24);
return i *= a >= n ? 1 : -1;
};
s.getTimeForDay = function(e) {
return (e = e ? cc.isNumber(e) ? new Date(1e3 * e) : new Date(e) : new Date()).getFullYear() + "-" + (e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "-" + (e.getDate() < 10 ? "0" + e.getDate() : e.getDate());
};
s.formatTime = function(e) {
var t = void 0;
if (e >= 0) {
var i = Math.floor(e / 3600), n = Math.floor(e / 60) % 60, a = e % 60, o = parseInt(i / 24);
if (1 == o) return o + " day";
if (o > 1) return o + " days";
t = o > 0 ? o + "day " + ("00" + (i -= 24 * o)).slice(-2) + ":" : i > 0 ? ("00" + i).slice(-2) + ":" : "";
n < 10 && (t += "0");
t += n + ":";
a < 10 && (t += "0");
t += parseInt(a);
}
return t;
};
s.getThousandSeparatorString = function(e) {
var t = e.toString().split("").reverse().join("").replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, "$1,").split("").reverse().join(""), i = t.indexOf(".");
i >= 0 && (t = t.substring(0, i + 2));
return t;
};
s.getKMBString = function(e) {
return this.isNumber(e) ? e / 1e9 >= 1 ? this.getThousandSeparatorString(e / 1e9) + "B" : e / 1e6 >= 1 ? this.getThousandSeparatorString(e / 1e6) + "M" : e / 1e4 >= 1 ? this.getThousandSeparatorString(e / 1e3) + "K" : this.getThousandSeparatorString(e) : e;
};
s.getLastCutOffDay = function(e, t) {
var i = t - e;
return i < 0 ? -1 : i = parseInt(i / 86400);
};
s._dumpObject = function(e, t, i, n, a, o) {
if (!(s.D(o) && i > o)) {
var r = void 0, l = void 0, c = void 0, h = void 0, u = void 0;
switch (Object.prototype.toString.call(t).slice(8, -1)) {
case "Number":
case "String":
r = '"' + t.toString() + '"';
e && (r = e + r);
y(r, i, n);
break;

case "Undefined":
r = "UNDEFINED!";
e && (r = e + r);
y(r, i, n);
break;

case "Boolean":
r = t.toString();
e && (r = e + r);
y(r, i, n);
break;

case "Object":
r = "{";
e && (r = e + r);
y(r, i, n);
var d = void 0;
for (d in t) if (t.hasOwnProperty(d)) {
c = '"' + d + '" : ';
l = (e ? e.length : 0) - 2 + n;
_dumpObject(c, t[d], i + 1, l, a, o);
}
h = e ? e.length : 0;
r = "}";
if (h > 0) {
u = "";
var g = void 0;
for (g = 0; g < h; ++g) u += " ";
r = u + r;
}
y(r, i, n);
break;

case "Array":
r = "[";
e && (r = e + r);
y(r, i, n);
var p = void 0;
for (p = 0; p < t.length; ++p) {
c = p + " : ";
l = (e ? e.length : 0) - 2 + n;
_dumpObject(c, t[p], i + 1, l, a, o);
}
h = e ? e.length : 0;
r = "]";
if (h > 0) {
u = "";
var m = void 0;
for (m = 0; m < h; ++m) u += " ";
r = u + r;
}
y(r, i, n);
break;

case "Function":
if (!a) {
r = function(e) {
return e.toString().replace(/function\s?/im, "").split(")")[0] + ")";
}(t);
e && (r = e + r);
y(r, i, n);
}
}
}
function y(e, t, i) {
for (;t > 0; ) {
e = "  " + e;
--t;
}
if (i > 0) {
var n = "", a = void 0;
for (a = 0; a < i; ++a) n += " ";
e = n + e;
}
cc.log(e);
}
};
s.dumpObject = function(e, t, i) {
s._dumpObject(void 0, e, 0, 0, t || !1, i);
};
s.D = function(e) {
return void 0 !== e;
};
s.DNN = function(e) {
return void 0 !== e && null !== e;
};
s.isFunction = function(e) {
return "function" == typeof e;
};
s.isNumber = function(e) {
return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e);
};
s.isString = function(e) {
return "string" == typeof e || "[object String]" === Object.prototype.toString.call(e);
};
s.isArray = function(e) {
return Array.isArray(e) || "object" === ("undefined" == typeof e ? "undefined" : n(e)) && "[object Array]" === Object.prototype.toString.call(e);
};
s.isUndefined = function(e) {
return void 0 === e;
};
s.isObject = function(e) {
return "object" === ("undefined" == typeof e ? "undefined" : n(e)) && "[object Object]" === Object.prototype.toString.call(e);
};
s.isEmpty = function(e) {
return Array.isArray(e) && 0 === e.length || Object.prototype.isPrototypeOf(e) && 0 === Object.keys(e).length;
};
s.isBoolean = function(e) {
return !0 === e || !1 === e || "[object Boolean]" === Object.prototype.toString.call(e);
};
s.clone = function(e, t) {
t || (t = e.constructor ? new e.constructor() : {});
var i = void 0, a = void 0;
for (i in e) e.hasOwnProperty(i) && ("object" === ("undefined" == typeof (a = e[i]) ? "undefined" : n(a)) && a ? t[i] = s.clone(a, null) : t[i] = a);
return t;
};
s.getStringFromFile = function(t) {
return cc.sys.isNative ? jsb.fileUtils.getStringFromFile(t) : function(t) {
if (cc._isNodeJs) {
return e("fs").readFileSync(t).toString();
}
var i = this.getXMLHttpRequest();
i.timeout = 0;
i.open("GET", t, !1);
/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ? i.setRequestHeader("Accept-Charset", "utf-8") : i.overrideMimeType && i.overrideMimeType("text/plain; charset=utf-8");
i.send(null);
return 4 === !i.readyState || 200 !== i.status ? null : i.responseText;
}.bind(cc.loader)(t);
};
s.getSegmentsInter = function(e, t, i, n) {
var a = t.y - e.y, o = e.x - t.x, s = n.y - i.y, r = i.x - n.x, l = a * r - o * s;
if (0 == l) return !1;
var c = s * i.x + r * i.y, h = s * e.x + r * e.y - c;
if (h * (s * t.x + r * t.y - c) >= 0) return !1;
var u = a * e.x + o * e.y;
if ((a * i.x + o * i.y - u) * (a * n.x + o * n.y - u) >= 0) return !1;
var d = h / l, g = d * o, p = -d * a;
return {
x: e.x + g,
y: e.y + p
};
};
s.getDistance = function(e, t) {
return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
};
s.loadRemoteImg = function(e, t) {
if (cc.sys.isBrowser) {
cc.log("Remote img load web");
cc.loader.load(e, function(e) {
cc.log("Remote img load progress:" + e);
}, function(e, i) {
if (e) cc.log("Remote img load error:" + e); else {
cc.log("Remote img load success.");
t(i);
}
});
} else {
cc.log("Remote img load: native");
var i = jsb.fileUtils.getWritablePath() + "img/", o = i + a.md5_hex(e) + ".png";
if (jsb.fileUtils.isFileExist(o)) {
cc.log("Remote is find" + o);
l();
} else {
var s = function(e) {
cc.log("undefined" == typeof e ? "undefined" : n(e));
cc.log(e);
var t = new Uint8Array(e);
cc.log("undefined" == typeof t ? "undefined" : n(t));
cc.log(t.length);
if ("undefined" != typeof e) {
jsb.fileUtils.isDirectoryExist(i) || jsb.fileUtils.createDirectory(i);
cc.log("111111" + o);
if (jsb.fileUtils.writeDataToFile(new Uint8Array(e), o)) {
cc.log("Remote img save succeed.");
cc.log("22222");
l();
} else cc.log("Remote img save failed.");
} else cc.log("Remote img download failed.");
}, r = new XMLHttpRequest();
r.onreadystatechange = function() {
cc.log("xhr.readyState  " + r.readyState);
cc.log("xhr.status  " + r.status);
if (4 === r.readyState) if (200 === r.status) {
r.responseType = "arraybuffer";
s(r.response);
} else s(null);
}.bind(this);
r.open("GET", e, !0);
r.send();
}
}
function l() {
cc.loader.load(o, function(e, i) {
e ? cc.error(e) : t(i);
});
}
};
s.checkTouchIsHit = function(e, t) {
return cc.rectContainsPoint(t.getBoundingBoxToWorld(), e);
};
s.createCliper = function(e) {
var t = new cc.Sprite(e), i = new cc.ClippingNode();
i.attr({
stencil: t,
anchorX: .5,
anchorY: .5,
alphaThreshold: .8
});
return i;
};
s.convertBoundingBoxToWorld = function(e) {
if (!e) return cc.rect();
var t = e.convertToWorldSpace(cc.p()), i = e.convertToWorldSpace(cc.pFromSize(e.getContentSize()));
return cc.rect(t.x, t.y, i.x - t.x, i.y - t.y);
};
s.getPositionByAnchor = function(e, t) {
if (!e) return cc.p();
var i = e.getBoundingBox();
i.x += i.width * t.x;
i.y += i.height * t.y;
return cc.p(i.x, i.y);
};
s.runShakeAction = function(e, t, i) {
e.runAction(cc.repeat(cc.sequence(cc.moveBy(.02, cc.p(0, t)), cc.moveBy(.04, cc.p(0, 2 * -t)), cc.moveBy(.02, cc.p(0, t))), i));
};
s.randomByWeight = function(e, t) {
if (!s.isArray(e) || !s.isString(t)) return null;
var i = 0;
i = e.reduce(function(e, i) {
return e += i[t];
}, i);
cc.log("sumWeight:" + i);
var n = 0, a = Math.random() * i, o = null;
for (var r in e) if (a < (n += (o = e[r])[t])) return o;
return o;
};
s.randomInteger = function(e, t) {
return e + Math.round((t - e) * Math.random());
};
s.parse = function(e, t) {
for (var i = new o(e, t), n = []; i.hasNext(); ) {
var a = i.nextRow();
n.push(a);
}
return n;
};
s.parseOneLine = function(e, t) {
for (var i = new o(e, t), n = []; i.hasNext(); ) {
var a = i.nextRow();
n.push(a);
}
return n.length <= 1 ? n[0] : n;
};
s.bindColumns = function(e, t, i) {
t || (t = e.shift());
return e.map(function(e) {
for (var n = {}, a = 0; a < e.length; a++) n[t[a]] = i ? isNaN(e[a]) ? e[a] : Number(e[a]) : e[a];
return n;
});
};
s.bindColumnsSimple = function(e, t) {
t || (t = e.shift());
return e.map(function(e) {
for (var i = {}, n = 0; n < e.length; n++) i[t[n]] = CSV.parseOneSimple(e[n]);
return i;
});
};
t.exports = s;
cc._RF.pop();
}, {
"./../encrypt/Md5": "Md5",
"./CSVParser": "CSVParser",
fs: void 0
} ],
WeaponBase: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c1778JRfaNOc7TNEOqNjJDJ", "WeaponBase");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.aaaaa();
},
aaaaa: function() {
console.log("Base aaaaa");
},
start: function() {},
update: function(e) {}
});
cc._RF.pop();
}, {} ],
WeaponFlames: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d2302OnfWNJp5g39oc0/VHn", "WeaponFlames");
var n = e("GameManager"), a = e("Helpers");
cc.Class({
extends: cc.Component,
properties: {
bulletLeve: 0,
oneBulletPos: cc.Vec2,
moreBulletPos: {
default: [],
type: cc.Vec2
},
bulletPrefab: null,
bulletPrefab3_2: null,
selfdt: null,
nearestEnemy: null,
isAutoAttack: !1
},
onLoad: function() {
this.initGetComponent();
this.initFollowingCameraVariable();
this.initFollowingCamera();
this.initCurrentplayer();
this.initCurrentplayerVariable();
this.initTouch();
this.initBullet();
},
initGetComponent: function() {
this.gridmap = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
},
initFollowingCamera: function() {
if (this.gridmap) {
this.currentFollowingCamera = this.gridmap.getFollowingCamera();
this.currentFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.initFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.currentfollowingCameraPosX = this.currentFollowingCameraPos.x;
this.currentfollowingCameraPosY = this.currentFollowingCameraPos.y;
}
},
initFollowingCameraVariable: function() {
this.currentplayerCameranow_time = 0;
this.currentplayerCamerarate = 1;
this.currentplayerCameraspeed = 150;
this.lerpmoveCamera = .5;
this.touchendMoveCamera = !1;
},
initCurrentplayer: function() {
this.gridmap && this.initWeaponJudge() && (this.currentplayer = this.gridmap.getWeaponFlamesNode());
},
initCurrentplayerVariable: function() {
this.currentplayerAngle = 0;
this.offsetAngle = 0;
this.targetAngle = 0;
},
initTouch: function() {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_START, this.getBarbetteLocationAngle_start, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_END, this.resumeBarbetteLocationAngle, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_MOVE, this.getBarbetteLocationAngle_move, this);
},
initBullet: function() {
var e = this, t = n.getPlayersData(n.WEAPON_FLAMES);
this.bulletLeve = t.player_StarLevel;
this.angle = 0;
this.now_time = 0;
this.walk_time = [];
this.setAttackattribute();
this.oneBulletPosOffset = 148;
this.twoBulletPosOffset = 30;
this.threeBulletPos = 130;
this.threeBulletPosOffset = 46;
this.bulletPrefab || cc.loader.loadRes("MainGame/Bullet/Bullet3_1", function(t, i) {
if (e.isValid) if (t) cc.log("Error url [" + t + "]"); else {
e.bulletPrefab = i;
if (e.bulletPrefab) {
console.log("Bullet3_1 initOK");
e.initbulletLeve_To_CreateEffects();
e.initBullet3_2();
}
}
});
},
initBullet3_2: function() {
var e = this;
this.bulletPrefab3_2 || cc.loader.loadRes("MainGame/Bullet/Bullet3_2", function(t, i) {
if (e.isValid) if (t) cc.log("Error url [" + t + "]"); else {
e.bulletPrefab3_2 = i;
e.bulletPrefab3_2 && console.log("Bullet3_2 initOK");
}
});
},
createBullet3_2: function(e) {
var t = zy.nodePoolMng.getBullet("Bullet3_2");
this.currentplayer.parent.addChild(t, n.BULLET_zIndex, "Bullet3_2");
n.currBulletPool.push(t);
t.setPosition(e.getPosition());
if (t) {
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? t.getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : t.getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
t.getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_FLAMES).player_Attack);
t.getComponent("Bullets").setBulletId(44);
t.getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_FLAMES));
if (1 == this.bulletLeve) {
t.getComponent(cc.Animation).play("gun_3_bullet_1_2");
zy.audioMng.playEffect(zy.audioMng.gun3_1blastAudio);
} else if (2 == this.bulletLeve) t.getComponent(cc.Animation).play("gun_3_bullet_1_2"); else if (3 == this.bulletLeve) {
t.getComponent(cc.Animation).play("gun_3_bullet_3_2");
zy.audioMng.playEffect(zy.audioMng.gun3_3blastAudio);
}
}
},
setAttackattribute: function() {
var e = zy.dataMng.turretAttrData.getTurretAttr((this.bulletLeve - 1 + 4e4).toString());
if (e) {
this.attackRange = a.ToNumber(e.attackRange);
this.scope = a.ToNumber(e.autoAttackRange);
this.lerpratio = a.ToNumber(e.rotationSpeed);
this.walk_time[this.bulletLeve - 1] = a.ToNumber(e.cd);
this.bulletMoveSpeed1 = a.ToNumber(e.bulletMoveSpeed1);
this.bulletAttackMultiple = a.ToNumber(e.bulletAttackMultiple);
} else {
this.attackRange = 800;
this.bulletMoveSpeed1 = 300;
this.bulletAttackMultiple = 1;
if (1 == this.bulletLeve) {
this.lerpratio = .4;
this.scope = 600;
this.walk_time[0] = 3;
} else if (2 == this.bulletLeve) {
this.lerpratio = .4;
this.scope = 500;
this.walk_time[1] = 4;
} else if (3 == this.bulletLeve) {
this.lerpratio = .4;
this.scope = 600;
this.walk_time[2] = 3;
}
}
},
initWeaponJudge: function() {
if (n.WEAPON_ID == n.WEAPON_FLAMES) {
if (1 == this.attackmodes) {
this.isAutoAttack = !1;
return !1;
}
this.isAutoAttack = !1;
return !0;
}
this.isAutoAttack = !0;
return !1;
},
getBarbetteLocationAngle_start: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.initFollowingCamera();
this.initCurrentplayer();
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !1;
this.local = cc.find("Canvas/map").convertToNodeSpaceAR(e.getLocation());
this.isTOUCH_ID = 1;
this.touchendMoveCamera = !1;
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatling = this.gridmap.getWeaponGatlingNode();
this.WeaponLaserCannon = this.gridmap.getWeaponLaserCannonNode();
this.WeaponLaserCannon3 = this.gridmap.getWeaponLaserCannonNode3();
this.WeaponLaserCannon5 = this.gridmap.getWeaponLaserCannonNode5();
this.WeaponLaserCannon7 = this.gridmap.getWeaponLaserCannonNode7();
this.WeaponIcegun = this.gridmap.getWeaponIcegunNode();
this.WeaponRailgun = this.gridmap.getWeaponRailgunNode();
this.WeaponHowitzer = this.gridmap.getWeaponHowitzerNode();
this.WeaponGatling && (this.WeaponGatlingAttack = this.WeaponGatling.getChildByName("WeaponGatling").getComponent("WeaponGatling"));
this.WeaponLaserCannon && (this.WeaponLaserCannonAttack = this.WeaponLaserCannon.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon"));
this.WeaponLaserCannon3 && (this.WeaponLaserCannonAttack3 = this.WeaponLaserCannon3.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon0"));
this.WeaponLaserCannon5 && (this.WeaponLaserCannonAttack5 = this.WeaponLaserCannon5.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon1"));
this.WeaponLaserCannon7 && (this.WeaponLaserCannonAttack7 = this.WeaponLaserCannon7.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon2"));
this.WeaponIcegun && (this.WeaponIcegunAttack = this.WeaponIcegun.getChildByName("WeaponIcegun").getComponent("WeaponIcegun"));
this.WeaponRailgun && (this.WeaponRailgunAttack = this.WeaponRailgun.getChildByName("WeaponRailgun").getComponent("WeaponRailgun"));
this.WeaponHowitzer && (this.WeaponHowitzerAttack = this.WeaponHowitzer.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer"));
}
}
},
getBarbetteLocationAngle_move: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !0;
this.isTOUCH_END = !1;
var t = e.getTouches();
this.newPos = cc.find("Canvas/map").convertToNodeSpaceAR(t[0].getLocation());
this.isTOUCH_ID = 2;
this.touchendMoveCamera = !1;
}
},
resumeBarbetteLocationAngle: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.resetAttack();
return;
}
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.resetAttack();
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.touchendMoveCamera = !0;
if (!this.currentplayer) return;
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.initFollowingCameraPosX = this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu);
this.initFollowingCameraPosY = this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu);
}
}
},
initbulletLeve_To_CreateEffects: function() {
this.ani_gun3_attack = this.node.getComponent(cc.Animation);
this.gun3_effect = this.node.getChildByName("gun3_effect").getComponent(cc.Sprite);
this.setBulletLeve_To_Effects();
},
setBulletLeve_To_Effects: function() {
if (this.gun3_effect) {
if (null == this.gridmap.getGunPlist()) return;
this.gun3_effect && (this.gun3_effect.spriteFrame = this.gridmap.getGunPlist().getSpriteFrame("gun3_level_" + this.bulletLeve + "_effect"));
}
},
resetAttack: function() {
if (1 != this.isAutoAttack) {
this.now_time = 0;
if (this.ani_gun3_attack) {
var e = this.ani_gun3_attack.currentClip;
if (e && e.name) {
this.ani_gun3_attack.play(e.name, 0);
this.ani_gun3_attack.sample(e.name);
this.ani_gun3_attack.stop();
}
}
}
},
bulletLeve_To_launchbullet: function() {
1 == this.bulletLeve ? zy.audioMng.playEffect(zy.audioMng.launchgun3_1Audio) : 2 == this.bulletLeve ? zy.audioMng.playEffect(zy.audioMng.launchgun3_2Audio) : 3 == this.bulletLeve && zy.audioMng.playEffect(zy.audioMng.launchgun3_3Audio);
var e = this.currentplayer.x + this.oneBulletPosOffset * Math.sin(this.hudu), t = this.currentplayer.y + this.oneBulletPosOffset * Math.cos(this.hudu);
this.oneBulletPos = cc.v2(e, t);
var i = zy.nodePoolMng.getBullet("Bullet3_1");
this.currentplayer.parent.addChild(i, n.BULLET_zIndex, "Bullet3_1");
n.currBulletPool.push(i);
i.position = this.oneBulletPos;
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? i.getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : i.getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
i.getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_FLAMES).player_Attack * this.bulletAttackMultiple);
i.getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_FLAMES).player_ID);
i.getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
i.getComponent("Bullets").setBulletAttackRange(this.attackRange);
i.getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_FLAMES));
i.getChildByName("Bullet").getComponent(cc.Sprite).spriteFrame = this.gridmap.getGunPlist().getSpriteFrame("gun3_bullet_" + this.bulletLeve);
i.getComponent(cc.Animation).play("gun_3_bullet_2_1_show");
i.getChildByName("Bullet").getComponent(cc.Animation).play("gun_3_bullet_" + this.bulletLeve + "_1");
},
bulletLeve_To_playbullet: function(e) {
this.now_time <= 0 && this.ani_gun3_attack && this.ani_gun3_attack.play("gun3_1_attack");
this.now_time += this.selfdt;
this.now_time >= this.walk_time[this.bulletLeve - 1] && (this.now_time = 0);
},
currentPlayerAngle_To_bulletLeveplaybullet: function(e) {
var t = e;
this.currentplayer.angle = t;
this.hudu = Math.PI / 180 * -t;
this.bulletLeve_To_playbullet(this.hudu);
},
autoAttackOpen: function() {
0 != this.isAutoAttack && this.automaticAttack();
},
currPlayerautoAttackOpen: function() {
0 != this.attackmodes && this.automaticAttack();
},
autoAttackClose: function() {
this.isAutoAttack = !1;
},
automaticAttack: function() {
this.nearestEnemy = this.findNearestEnemy();
if (this.nearestEnemy) {
this.angle = this.change_angle(this.currentplayer.position, this.nearestEnemy.position, -.1, -.1);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
}
},
collaborativeAttack: function(e, t, i, a, o, s) {
this.weaponAngle = a;
if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1) {
this.weaponAngle = a;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2) {
this.A_local = t;
this.A_newPos = i;
var r = e;
this.angle = 1 == r ? this.change_angle(this.currentplayer.position, this.A_local, o, s) : this.change_angle(this.currentplayer.position, this.A_newPos, o, s);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3) {
this.weaponAngle = a - n.cooperativeAttack_Level_3_Angle * this.CollaborativeAttack_Level_3_ratio;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
}
},
findNearestEnemy: function() {
var e = n.currEnemyPool;
if (!(e.length <= 0)) {
for (var t = this.scope, i = null, a = null, o = 0, s = cc.v2(this.currentplayer.x, this.currentplayer.y), r = 0; r < e.length; r++) for (var l = 0; l < e[r].length; l++) {
a = e[r][l];
if ((o = s.sub(a.getPosition()).mag()) < t) {
t = o;
i = a;
}
}
this.nearestEnemy = i;
return i;
}
},
change_angle: function(e, t, i, a) {
i = i || this.currentfollowingCameraPosX;
a = a || this.currentfollowingCameraPosY;
e.x -= i;
e.y -= a;
var o = t.x - e.x, s = 0;
n.isBossLevel && (s = 0 == this.isAutoAttack || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2 ? 188 : 0);
var r = t.y - e.y + s, l = cc.v2(o, r).signAngle(cc.v2(0, 1)) / Math.PI * 180;
l <= 0 && (l = 360 + l);
return -l;
},
abAngle: function(e, t) {
return ((e - t) % 360 + 540) % 360 - 180;
},
update_Camera_and_Bullet: function() {
if ((this.isTOUCH_START || this.touchendMoveCamera) && this.currentplayer && this.currentplayer) {
if (this.isTOUCH_START) {
1 == this.isTOUCH_ID ? this.angle = this.change_angle(this.currentplayer.position, this.local) : this.angle = this.change_angle(this.currentplayer.position, this.newPos);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.currentfollowingCameraPosX = cc.misc.lerp(this.currentfollowingCameraPosX, this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu), .25);
this.currentfollowingCameraPosY = cc.misc.lerp(this.currentfollowingCameraPosY, this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu), .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.currentfollowingCameraPosX, this.currentfollowingCameraPosY));
}
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatlingAttack && this.WeaponGatlingAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack && this.WeaponLaserCannonAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack3 && this.WeaponLaserCannonAttack3.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack5 && this.WeaponLaserCannonAttack5.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack7 && this.WeaponLaserCannonAttack7.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponIcegunAttack && this.WeaponIcegunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponRailgunAttack && this.WeaponRailgunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponHowitzerAttack && this.WeaponHowitzerAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
}
}
if (!this.touchendMoveCamera) return;
if (this.touchendMoveCamera && this.gridmap) {
this.initFollowingCameraPosX = cc.misc.lerp(this.initFollowingCameraPosX, this.initFollowingCameraPos.x, .25);
this.initFollowingCameraPosY = cc.misc.lerp(this.initFollowingCameraPosY, this.initFollowingCameraPos.y, .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPosX, this.initFollowingCameraPosY));
if (Math.round(this.initFollowingCameraPosX) == this.initFollowingCameraPos.x && Math.round(this.initFollowingCameraPosY) == this.initFollowingCameraPos.y) {
this.touchendMoveCamera = !1;
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPos.x, this.initFollowingCameraPos.y));
}
}
}
},
start: function() {},
update: function(e) {
if (!n.getGamePaused() && !n.getIsGameOver()) {
this.selfdt = e;
this.initWeaponJudge() && this.update_Camera_and_Bullet();
n.ATTACKMODES == n.AUTOMATICATTACK && this.autoAttackOpen();
1 == this.attackmodes && this.currPlayerautoAttackOpen();
}
},
getCollaborativeAttack_Level_3_ratio: function(e) {
this.CollaborativeAttack_Level_3_ratio = e;
},
getCurrPlayerAttackModes: function(e) {
this.attackmodes = e;
this.initWeaponJudge();
},
set_BulletLeve: function(e) {
this.bulletLeve = e;
this.setBulletLeve_To_Effects();
this.setAttackattribute();
},
set_FlamesbulletLeve_To_launchbullet: function() {
this.bulletLeve_To_launchbullet();
},
createFlamesBullet3_2: function(e) {
this.createBullet3_2(e);
}
});
cc._RF.pop();
}, {
GameManager: "GameManager",
Helpers: "Helpers"
} ],
WeaponGatling: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2bdc0k1rxtCt49Y4aTsfXfZ", "WeaponGatling");
var n = e("GameManager"), a = e("Helpers");
cc.Class({
extends: cc.Component,
properties: {
bulletLeve: 0,
oneBulletPos: cc.Vec2,
moreBulletPos: {
default: [],
type: cc.Vec2
},
bulletPrefab: null,
selfdt: null,
nearestEnemy: null,
isAutoAttack: !1
},
onLoad: function() {
this.initGetComponent();
this.initFollowingCameraVariable();
this.initFollowingCamera();
this.initCurrentplayer();
this.initCurrentplayerVariable();
this.initTouch();
this.initBullet();
},
initGetComponent: function() {
this.gridmap = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
this.ani_gun_shake = this.node.getComponent(cc.Animation);
this.audioMng = cc.find("Canvas/AudioMng").getComponent("AudioMng");
},
initFollowingCamera: function() {
if (this.gridmap) {
this.currentFollowingCamera = this.gridmap.getFollowingCamera();
this.currentFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.initFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.currentfollowingCameraPosX = this.currentFollowingCameraPos.x;
this.currentfollowingCameraPosY = this.currentFollowingCameraPos.y;
}
},
initFollowingCameraVariable: function() {
this.currentplayerCameranow_time = 0;
this.currentplayerCamerarate = 1;
this.currentplayerCameraspeed = 150;
this.lerpmoveCamera = .5;
this.touchendMoveCamera = !1;
},
initCurrentplayer: function() {
this.gridmap && this.initWeaponJudge() && (this.currentplayer = this.gridmap.getWeaponGatlingNode());
},
initCurrentplayerVariable: function() {
this.currentplayerAngle = 0;
this.offsetAngle = 0;
this.targetAngle = 0;
},
initTouch: function() {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_START, this.getBarbetteLocationAngle_start, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_END, this.resumeBarbetteLocationAngle, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_MOVE, this.getBarbetteLocationAngle_move, this);
},
initBullet: function() {
var e = this, t = n.getPlayersData(n.WEAPON_GATLING);
this.bulletLeve = t.player_StarLevel;
this.angle = 0;
this.now_time = 0;
this.walk_time = [];
this.setAttackattribute();
this.oneBulletPosOffset = 156;
this.twoBulletPosOffset = 30;
this.threeBulletPos = 130;
this.threeBulletPosOffset = 46;
this.bulletPrefab || cc.loader.loadRes("MainGame/Bullet/Bullet0", function(t, i) {
t || (e.bulletPrefab = i);
});
},
setAttackattribute: function() {
var e = zy.dataMng.turretAttrData.getTurretAttr((this.bulletLeve - 1 + 1e4).toString());
if (e) {
this.attackRange = a.ToNumber(e.attackRange);
this.scope = a.ToNumber(e.autoAttackRange);
this.lerpratio = a.ToNumber(e.rotationSpeed);
this.walk_time[this.bulletLeve - 1] = a.ToNumber(e.bulletAttackRate1);
this.bulletMoveSpeed1 = a.ToNumber(e.bulletMoveSpeed1);
this.bulletAttackRotation = a.ToNumber(e.bulletAttackRotation);
this.bulletAttackMultiple = a.ToNumber(e.bulletAttackMultiple);
} else {
this.attackRange = 800;
this.scope = 600;
this.lerpratio = .4;
this.walk_time[this.bulletLeve - 1] = .06;
this.bulletMoveSpeed1 = 1200;
this.bulletAttackRotation = 3;
this.bulletAttackMultiple = 1;
}
},
initWeaponJudge: function() {
if (n.WEAPON_ID == n.WEAPON_GATLING) {
if (1 == this.attackmodes) {
this.isAutoAttack = !1;
return !1;
}
this.isAutoAttack = !1;
return !0;
}
this.isAutoAttack = !0;
return !1;
},
getBarbetteLocationAngle_start: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.initFollowingCamera();
this.initCurrentplayer();
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !1;
this.local = cc.find("Canvas/map").convertToNodeSpaceAR(e.getLocation());
this.isTOUCH_ID = 1;
this.touchendMoveCamera = !1;
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponLaserCannon = this.gridmap.getWeaponLaserCannonNode();
this.WeaponLaserCannon3 = this.gridmap.getWeaponLaserCannonNode3();
this.WeaponLaserCannon5 = this.gridmap.getWeaponLaserCannonNode5();
this.WeaponLaserCannon7 = this.gridmap.getWeaponLaserCannonNode7();
this.WeaponIcegun = this.gridmap.getWeaponIcegunNode();
this.WeaponFlames = this.gridmap.getWeaponFlamesNode();
this.WeaponRailgun = this.gridmap.getWeaponRailgunNode();
this.WeaponHowitzer = this.gridmap.getWeaponHowitzerNode();
this.WeaponLaserCannon && (this.WeaponLaserCannonAttack = this.WeaponLaserCannon.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon"));
this.WeaponLaserCannon3 && (this.WeaponLaserCannonAttack3 = this.WeaponLaserCannon3.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon0"));
this.WeaponLaserCannon5 && (this.WeaponLaserCannonAttack5 = this.WeaponLaserCannon5.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon1"));
this.WeaponLaserCannon7 && (this.WeaponLaserCannonAttack7 = this.WeaponLaserCannon7.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon2"));
this.WeaponIcegun && (this.WeaponIcegunAttack = this.WeaponIcegun.getChildByName("WeaponIcegun").getComponent("WeaponIcegun"));
this.WeaponFlames && (this.WeaponFlamesAttack = this.WeaponFlames.getChildByName("WeaponFlames").getComponent("WeaponFlames"));
this.WeaponRailgun && (this.WeaponRailgunAttack = this.WeaponRailgun.getChildByName("WeaponRailgun").getComponent("WeaponRailgun"));
this.WeaponHowitzer && (this.WeaponHowitzerAttack = this.WeaponHowitzer.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer"));
}
this.ani_gun_shake && this.ani_gun_shake.play("gun0_shake");
}
},
getBarbetteLocationAngle_move: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !0;
this.isTOUCH_END = !1;
var t = e.getTouches();
this.newPos = cc.find("Canvas/map").convertToNodeSpaceAR(t[0].getLocation());
this.isTOUCH_ID = 2;
this.touchendMoveCamera = !1;
}
},
resumeBarbetteLocationAngle: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) {
this.ani_gun_shake && this.ani_gun_shake.stop("gun0_shake");
this.node.setAnchorPoint(cc.v2(.5, .5));
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
return;
}
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.now_time = 0;
this.touchendMoveCamera = !0;
if (!this.currentplayer) return;
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.initFollowingCameraPosX = this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu);
this.initFollowingCameraPosY = this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu);
}
this.ani_gun_shake && this.ani_gun_shake.stop("gun0_shake");
this.node.setAnchorPoint(cc.v2(.5, .5));
}
},
resetWeaponAttack: function() {
this.now_time = 0;
this.ani_gun_shake && this.ani_gun_shake.stop("gun0_shake");
this.node.setAnchorPoint(cc.v2(.5, .5));
},
bulletLeve_To_playbullet: function(e) {
if (this.now_time <= 0) {
this.audioMng && this.audioMng.playLaunchgun0Audio();
if (1 == this.bulletLeve) {
var t = this.currentplayer.x + this.oneBulletPosOffset * Math.sin(e), i = this.currentplayer.y + this.oneBulletPosOffset * Math.cos(e);
this.oneBulletPos = cc.v2(a.getRandomInt(t - 15, t + 15), a.getRandomInt(i - 15, i + 15));
var o = zy.nodePoolMng.getBullet("Bullet0");
this.currentplayer.parent.addChild(o, n.BULLET_zIndex, "Bullet0");
o.position = this.oneBulletPos;
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? o.getComponent("Bullets").setBulletAngle(this.currentplayer.angle + a.getRandomInt(-this.bulletAttackRotation, this.bulletAttackRotation)) : o.getComponent("Bullets").setBulletAngle(this.currentplayerAngle + a.getRandomInt(-this.bulletAttackRotation, this.bulletAttackRotation));
o.getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_GATLING).player_ID);
o.getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_GATLING).player_Attack * this.bulletAttackMultiple);
o.getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
o.getComponent("Bullets").setBulletAttackRange(this.attackRange);
o.getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_GATLING));
} else if (2 == this.bulletLeve) {
var s = cc.v2(this.currentplayer.x + this.oneBulletPosOffset * Math.sin(e), this.currentplayer.y + this.oneBulletPosOffset * Math.cos(e));
this.moreBulletPos[0] = cc.v2(s.x + this.twoBulletPosOffset * Math.sin(e - 90), s.y + this.twoBulletPosOffset * Math.cos(e - 90));
this.moreBulletPos[1] = cc.v2(s.x + this.twoBulletPosOffset * Math.sin(e + 90), s.y + this.twoBulletPosOffset * Math.cos(e + 90));
var r = [];
r[0] = zy.nodePoolMng.getBullet("Bullet0");
this.currentplayer.parent.addChild(r[0], n.BULLET_zIndex, "Bullet0");
r[0].position = this.moreBulletPos[0];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? r[0].getComponent("Bullets").setBulletAngle(this.currentplayer.angle + a.getRandomInt(-this.bulletAttackRotation, this.bulletAttackRotation)) : r[0].getComponent("Bullets").setBulletAngle(this.currentplayerAngle + a.getRandomInt(-this.bulletAttackRotation, this.bulletAttackRotation));
r[0].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_GATLING).player_ID);
r[0].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_GATLING).player_Attack * this.bulletAttackMultiple);
r[0].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
r[0].getComponent("Bullets").setBulletAttackRange(this.attackRange);
r[0].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_GATLING));
r[1] = zy.nodePoolMng.getBullet("Bullet0");
this.currentplayer.parent.addChild(r[1], n.BULLET_zIndex, "Bullet0");
r[1].position = this.moreBulletPos[1];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? r[1].getComponent("Bullets").setBulletAngle(this.currentplayer.angle + a.getRandomInt(-this.bulletAttackRotation, this.bulletAttackRotation)) : r[1].getComponent("Bullets").setBulletAngle(this.currentplayerAngle + a.getRandomInt(-this.bulletAttackRotation, this.bulletAttackRotation));
r[1].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_GATLING).player_ID);
r[1].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_GATLING).player_Attack * this.bulletAttackMultiple);
r[1].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
r[1].getComponent("Bullets").setBulletAttackRange(this.attackRange);
r[1].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_GATLING));
} else if (3 == this.bulletLeve) {
this.moreBulletPos[0] = cc.v2(this.currentplayer.x + this.oneBulletPosOffset * Math.sin(e), this.currentplayer.y + this.oneBulletPosOffset * Math.cos(e));
var l = cc.v2(this.currentplayer.x + this.threeBulletPos * Math.sin(e), this.currentplayer.y + this.threeBulletPos * Math.cos(e));
this.moreBulletPos[1] = cc.v2(l.x + this.threeBulletPosOffset * Math.sin(e - 90), l.y + this.threeBulletPosOffset * Math.cos(e - 90));
this.moreBulletPos[2] = cc.v2(l.x + this.threeBulletPosOffset * Math.sin(e + 90), l.y + this.threeBulletPosOffset * Math.cos(e + 90));
var c = [];
c[0] = zy.nodePoolMng.getBullet("Bullet0");
this.currentplayer.parent.addChild(c[0], n.BULLET_zIndex, "Bullet0");
c[0].position = this.moreBulletPos[0];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? c[0].getComponent("Bullets").setBulletAngle(this.currentplayer.angle + a.getRandomInt(-this.bulletAttackRotation, this.bulletAttackRotation)) : c[0].getComponent("Bullets").setBulletAngle(this.currentplayerAngle + a.getRandomInt(-this.bulletAttackRotation, this.bulletAttackRotation));
c[0].getComponent(cc.Sprite).spriteFrame = this.gridmap.getGunPlist().getSpriteFrame("gun0_bullet_3");
c[0].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_GATLING).player_ID);
c[0].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_GATLING).player_Attack * this.bulletAttackMultiple);
c[0].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
c[0].getComponent("Bullets").setBulletAttackRange(this.attackRange);
c[0].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_GATLING));
c[1] = zy.nodePoolMng.getBullet("Bullet0");
this.currentplayer.parent.addChild(c[1], n.BULLET_zIndex, "Bullet0");
c[1].position = this.moreBulletPos[1];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? c[1].getComponent("Bullets").setBulletAngle(this.currentplayer.angle + a.getRandomInt(-this.bulletAttackRotation, this.bulletAttackRotation)) : c[1].getComponent("Bullets").setBulletAngle(this.currentplayerAngle + a.getRandomInt(-this.bulletAttackRotation, this.bulletAttackRotation));
c[1].getComponent(cc.Sprite).spriteFrame = this.gridmap.getGunPlist().getSpriteFrame("gun0_bullet_3");
c[1].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_GATLING).player_ID);
c[1].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_GATLING).player_Attack * this.bulletAttackMultiple);
c[1].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
c[1].getComponent("Bullets").setBulletAttackRange(this.attackRange);
c[1].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_GATLING));
c[2] = zy.nodePoolMng.getBullet("Bullet0");
this.currentplayer.parent.addChild(c[2], n.BULLET_zIndex, "Bullet0");
c[2].position = this.moreBulletPos[2];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? c[2].getComponent("Bullets").setBulletAngle(this.currentplayer.angle + a.getRandomInt(-this.bulletAttackRotation, this.bulletAttackRotation)) : c[2].getComponent("Bullets").setBulletAngle(this.currentplayerAngle + a.getRandomInt(-this.bulletAttackRotation, this.bulletAttackRotation));
c[2].getComponent(cc.Sprite).spriteFrame = this.gridmap.getGunPlist().getSpriteFrame("gun0_bullet_3");
c[2].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_GATLING).player_ID);
c[2].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_GATLING).player_Attack * this.bulletAttackMultiple);
c[2].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
c[2].getComponent("Bullets").setBulletAttackRange(this.attackRange);
c[2].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_GATLING));
}
}
this.now_time += this.selfdt;
this.now_time >= this.walk_time[this.bulletLeve - 1] && (this.now_time = 0);
},
currentPlayerAngle_To_bulletLeveplaybullet: function(e) {
var t = e;
this.currentplayer.angle = t;
this.hudu = Math.PI / 180 * -t;
this.bulletLeve_To_playbullet(this.hudu);
},
autoAttackOpen: function() {
0 != this.isAutoAttack && this.automaticAttack();
},
currPlayerautoAttackOpen: function() {
0 != this.attackmodes && this.automaticAttack();
},
autoAttackClose: function() {
this.isAutoAttack = !1;
},
automaticAttack: function() {
this.nearestEnemy = this.findNearestEnemy();
if (this.nearestEnemy) {
this.angle = this.change_angle(this.currentplayer.position, this.nearestEnemy.position, -.1, -.1);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
}
},
collaborativeAttack: function(e, t, i, a, o, s) {
this.weaponAngle = a;
if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1) {
this.weaponAngle = a;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2) {
this.A_local = t;
this.A_newPos = i;
var r = e;
this.angle = 1 == r ? this.change_angle(this.currentplayer.position, this.A_local, o, s) : this.change_angle(this.currentplayer.position, this.A_newPos, o, s);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3) {
this.weaponAngle = a - n.cooperativeAttack_Level_3_Angle * this.CollaborativeAttack_Level_3_ratio;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
}
},
findNearestEnemy: function() {
var e = n.currEnemyPool;
if (!(e.length <= 0)) {
for (var t = this.scope, i = null, a = null, o = 0, s = cc.v2(this.currentplayer.x, this.currentplayer.y), r = 0; r < e.length; r++) for (var l = 0; l < e[r].length; l++) {
a = e[r][l];
if ((o = s.sub(a.getPosition()).mag()) < t) {
t = o;
i = a;
}
}
this.nearestEnemy = i;
return i;
}
},
change_angle: function(e, t, i, a) {
i = i || this.currentfollowingCameraPosX;
a = a || this.currentfollowingCameraPosY;
e.x -= i;
e.y -= a;
var o = t.x - e.x, s = 0;
n.isBossLevel && (s = 0 == this.isAutoAttack || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2 ? 188 : 0);
var r = t.y - e.y + s, l = cc.v2(o, r).signAngle(cc.v2(0, 1)) / Math.PI * 180;
l <= 0 && (l = 360 + l);
return -l;
},
abAngle: function(e, t) {
return ((e - t) % 360 + 540) % 360 - 180;
},
update_Camera_and_Bullet: function() {
if ((this.isTOUCH_START || this.touchendMoveCamera) && this.currentplayer && this.currentplayer) {
if (this.isTOUCH_START) {
1 == this.isTOUCH_ID ? this.angle = this.change_angle(this.currentplayer.position, this.local) : this.angle = this.change_angle(this.currentplayer.position, this.newPos);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.currentfollowingCameraPosX = cc.misc.lerp(this.currentfollowingCameraPosX, this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu), .25);
this.currentfollowingCameraPosY = cc.misc.lerp(this.currentfollowingCameraPosY, this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu), .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.currentfollowingCameraPosX, this.currentfollowingCameraPosY));
}
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponLaserCannonAttack && this.WeaponLaserCannonAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack3 && this.WeaponLaserCannonAttack3.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack5 && this.WeaponLaserCannonAttack5.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack7 && this.WeaponLaserCannonAttack7.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponIcegunAttack && this.WeaponIcegunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponFlamesAttack && this.WeaponFlamesAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponRailgunAttack && this.WeaponRailgunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponHowitzerAttack && this.WeaponHowitzerAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
}
}
if (!this.touchendMoveCamera) return;
if (this.touchendMoveCamera && this.gridmap) {
this.initFollowingCameraPosX = cc.misc.lerp(this.initFollowingCameraPosX, this.initFollowingCameraPos.x, .25);
this.initFollowingCameraPosY = cc.misc.lerp(this.initFollowingCameraPosY, this.initFollowingCameraPos.y, .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPosX, this.initFollowingCameraPosY));
if (Math.round(this.initFollowingCameraPosX) == this.initFollowingCameraPos.x && Math.round(this.initFollowingCameraPosY) == this.initFollowingCameraPos.y) {
this.touchendMoveCamera = !1;
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPos.x, this.initFollowingCameraPos.y));
}
}
}
},
start: function() {},
update: function(e) {
if (!n.getGamePaused() && !n.getIsGameOver()) {
this.selfdt = e;
this.initWeaponJudge() && this.update_Camera_and_Bullet();
n.ATTACKMODES == n.AUTOMATICATTACK && this.autoAttackOpen();
1 == this.attackmodes && this.currPlayerautoAttackOpen();
}
},
getCollaborativeAttack_Level_3_ratio: function(e) {
this.CollaborativeAttack_Level_3_ratio = e;
},
getCurrPlayerAttackModes: function(e) {
this.attackmodes = e;
this.initWeaponJudge();
},
set_BulletLeve: function(e) {
this.bulletLeve = e;
this.setAttackattribute();
}
});
cc._RF.pop();
}, {
GameManager: "GameManager",
Helpers: "Helpers"
} ],
WeaponHowitzer: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e188bpQiTpGTK7sexSMC/Qk", "WeaponHowitzer");
var n = e("GameManager"), a = e("Helpers");
cc.Class({
extends: cc.Component,
properties: {
bulletLeve: 0,
oneBulletPos: cc.Vec2,
moreBulletPos: {
default: [],
type: cc.Vec2
},
bulletPrefab5_1_1: null,
bulletPrefab5_1_2: null,
bulletPrefab5_2_1: null,
bulletPrefab5_2_2: null,
bulletPrefab5_3_1: null,
bulletPrefab5_3_2: null,
selfdt: null,
nearestEnemy: null,
isAutoAttack: !1
},
onLoad: function() {
this.initGetComponent();
this.initFollowingCameraVariable();
this.initFollowingCamera();
this.initCurrentplayer();
this.initCurrentplayerVariable();
this.initTouch();
this.initBullet();
},
initGetComponent: function() {
this.gridmap = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
this.gun5_1 = this.node.getChildByName("gun5_1");
this.gun5_2 = this.node.getChildByName("gun5_2");
this.gun5_3 = this.node.getChildByName("gun5_3");
this.ani_gun5_1Attack = this.gun5_1.getComponent(cc.Animation);
this.ani_gun5_2Attack = this.gun5_2.getComponent(cc.Animation);
this.ani_gun5_3Attack = this.gun5_3.getComponent(cc.Animation);
},
initFollowingCamera: function() {
if (this.gridmap) {
this.currentFollowingCamera = this.gridmap.getFollowingCamera();
this.currentFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.initFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.currentfollowingCameraPosX = this.currentFollowingCameraPos.x;
this.currentfollowingCameraPosY = this.currentFollowingCameraPos.y;
}
},
initFollowingCameraVariable: function() {
this.currentplayerCameranow_time = 0;
this.currentplayerCamerarate = 1;
this.currentplayerCameraspeed = 150;
this.lerpmoveCamera = .5;
this.touchendMoveCamera = !1;
},
initCurrentplayer: function() {
this.gridmap && this.initWeaponJudge() && (this.currentplayer = this.gridmap.getWeaponHowitzerNode());
},
initCurrentplayerVariable: function() {
this.currentplayerAngle = 0;
this.offsetAngle = 0;
this.targetAngle = 0;
},
initTouch: function() {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_START, this.getBarbetteLocationAngle_start, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_END, this.resumeBarbetteLocationAngle, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_MOVE, this.getBarbetteLocationAngle_move, this);
},
initBullet: function() {
var e = n.getPlayersData(n.WEAPON_HOWITZER);
this.bulletLeve = e.player_StarLevel;
this.angle = 0;
this.now_time = 0;
this.walk_time = [];
this.bulletLeve_To_BulletNode();
this.setAttackattribute();
this.setLeveAttribute();
this.oneBulletPosOffset = 156;
this.twoBulletPosOffset = 30;
this.threeBulletPos = 130;
this.threeBulletPosOffset = 46;
},
bulletLeve_To_BulletNode: function() {
var e = this;
if (1 == this.bulletLeve) {
if (this.bulletPrefab5_1_1) return;
cc.loader.loadRes("MainGame/Bullet/Bullet5_1_1", function(t, i) {
if (e.isValid) if (t) cc.log("Error url [" + t + "]"); else {
e.bulletPrefab5_1_1 = i;
e.bulletPrefab5_1_1 && e.initBullet5_1_2();
}
});
} else if (2 == this.bulletLeve) {
if (this.bulletPrefab5_2_1) return;
cc.loader.loadRes("MainGame/Bullet/Bullet5_2_1", function(t, i) {
if (e.isValid) if (t) cc.log("Error url [" + t + "]"); else {
e.bulletPrefab5_2_1 = i;
e.bulletPrefab5_2_1 && e.initBullet5_2_2();
}
});
} else if (3 == this.bulletLeve) {
if (this.bulletPrefab5_3_1) return;
cc.loader.loadRes("MainGame/Bullet/Bullet5_3_1", function(t, i) {
if (e.isValid) if (t) cc.log("Error url [" + t + "]"); else {
e.bulletPrefab5_3_1 = i;
e.bulletPrefab5_3_1 && e.initBullet5_3_2();
}
});
}
},
initBullet5_1_2: function() {
var e = this;
this.bulletPrefab5_1_2 || cc.loader.loadRes("MainGame/Bullet/Bullet5_1_2", function(t, i) {
if (e.isValid) if (t) cc.log("Error url [" + t + "]"); else {
e.bulletPrefab5_1_2 = i;
e.bulletPrefab5_1_2;
}
});
},
initBullet5_2_2: function() {
var e = this;
this.bulletPrefab5_2_2 || cc.loader.loadRes("MainGame/Bullet/Bullet5_2_2", function(t, i) {
if (e.isValid) if (t) cc.log("Error url [" + t + "]"); else {
e.bulletPrefab5_2_2 = i;
e.bulletPrefab5_2_2;
}
});
},
initBullet5_3_2: function() {
var e = this;
this.bulletPrefab5_3_2 || cc.loader.loadRes("MainGame/Bullet/Bullet5_3_2", function(t, i) {
if (e.isValid) if (t) cc.log("Error url [" + t + "]"); else {
e.bulletPrefab5_3_2 = i;
e.bulletPrefab5_3_2;
}
});
},
initGetBulletPrefab5_3_1Component: function(e) {
if (this.bulletPrefab5_3_1) {
this.ani_gun_5_bullet_fire1 = e.getComponent(cc.Animation);
this.ani_gun_5_bullet_fire2 = e.getChildByName("ani").getComponent(cc.Animation);
this.ani_gun5_bullet_3 = e.getChildByName("Bullet").getComponent(cc.Animation);
}
},
bullet5_3_1Launch: function() {
this.ani_gun_5_bullet_fire1 && this.ani_gun_5_bullet_fire1.play("gun_5_bullet_fire1");
this.ani_gun_5_bullet_fire2 && this.ani_gun_5_bullet_fire2.play("gun_5_bullet_fire2");
this.ani_gun5_bullet_3 && this.ani_gun5_bullet_3.play("gun5_bullet_3");
},
createBullet5_1_2: function(e) {
if (1 == this.bulletLeve) {
zy.audioMng.playEffect(zy.audioMng.gun5_1blastAudio);
var t = zy.nodePoolMng.getBullet("Bullet5_1_2");
this.currentplayer.parent.addChild(t, n.BULLET_zIndex, "Bullet5_1_2");
n.currBulletPool.push(t);
t.setPosition(e.getPosition());
if (t) {
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? t.getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : t.getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
t.getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_HOWITZER).player_Attack);
t.getComponent("Bullets").setBulletId(55);
t.getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_HOWITZER));
t.getComponent(cc.Animation).play("gun_5_bullet_1_boom");
zy.effectMng.playNormalEffect(t, cc.v2(0, 0), zy.effectMng.Effect.Grenade2Bomb).setScale(.6);
}
} else if (2 == this.bulletLeve) {
zy.audioMng.playEffect(zy.audioMng.gun5_2blastAudio);
var i = zy.nodePoolMng.getBullet("Bullet5_2_2");
this.currentplayer.parent.addChild(i, n.BULLET_zIndex, "Bullet5_2_2");
n.currBulletPool.push(i);
i.setPosition(e.getPosition());
if (i) {
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? i.getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : i.getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
i.getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_HOWITZER).player_Attack);
i.getComponent("Bullets").setBulletId(55);
i.getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_HOWITZER));
i.getComponent(cc.Animation).play("gun_5_bullet_2_boom");
zy.effectMng.playNormalEffect(i, cc.v2(0, 0), zy.effectMng.Effect.Grenade2Bomb);
}
} else if (3 == this.bulletLeve) {
zy.audioMng.playEffect(zy.audioMng.gun5_3blastAudio);
var a = cc.instantiate(this.bulletPrefab5_3_2);
this.currentplayer.parent.addChild(a, n.BULLET_zIndex, "Bullet5_3_2");
n.currBulletPool.push(a);
a.setPosition(e.getPosition());
if (a) {
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? a.getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : a.getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
a.getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_HOWITZER).player_Attack);
a.getComponent("Bullets").setBulletId(55);
a.getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_HOWITZER));
a.getComponent(cc.Animation).play("gun_5_bullet_3_boom2");
zy.effectMng.playNormalEffect(a, cc.v2(0, 0), zy.effectMng.Effect.Grenade3Bomb);
}
}
},
createBullet5_3_1: function() {
this.currentplayer.angle = 0;
this.trackingAttackNow_time = 0;
this.trackingAttackWalk_time = 1;
this.currBulletSpeed = 200;
this.currBulletSpeed2 = 0;
this.bulletSpeed = 0;
this.currentoneBulletAngle = 0;
this.oneBulletoffsetAngle = 0;
this.oneBullettargetAngle = 0;
this.lp = 1;
this.D2 = 0;
this.pos0 = cc.v2(0, 0);
this.pos1 = cc.v2(0, 0);
this.pos2 = cc.v2(0, 0);
this.pos3 = cc.v2(0, 0);
this.oneBulletPos = cc.v2(this.currentplayer.x, this.currentplayer.y);
this.oneBullet = null;
this.oneBullet = cc.instantiate(this.bulletPrefab5_3_1);
if (this.oneBullet) {
this.currentplayer.parent.addChild(this.oneBullet, n.BULLET_zIndex, "Bullet5_3_1");
n.currBulletPool.push(this.oneBullet);
this.oneBullet.position = this.oneBulletPos;
this.initGetBulletPrefab5_3_1Component(this.oneBullet);
this.bullet5_3_1Launch();
}
},
setAttackattribute: function() {
var e = zy.dataMng.turretAttrData.getTurretAttr((this.bulletLeve - 1 + 6e4).toString());
if (e) {
this.attackRange = a.ToNumber(e.attackRange);
this.scope = a.ToNumber(e.autoAttackRange);
this.lerpratio = a.ToNumber(e.rotationSpeed);
this.walk_time[this.bulletLeve - 1] = a.ToNumber(e.cd);
this.bulletMoveSpeed1 = a.ToNumber(e.bulletMoveSpeed1);
this.bulletAttackMultiple = a.ToNumber(e.bulletAttackMultiple);
if (3 == this.bulletLeve) {
this.currentplayer.angle = 0;
this.scope = 2e3;
this.trackingAttackNow_time = 0;
this.trackingAttackWalk_time = 1;
this.currBulletSpeed = 200;
this.currBulletSpeed2 = 0;
this.bulletSpeed = 0;
this.distance = 0;
this.disangle = 0;
this.posX = 0;
this.posY = 0;
this.MaximumRotationSpeed = 360;
this.MaximumVelocity = 2e3;
this.AcceleratedVeocity = 60;
}
} else {
this.attackRange = 800;
this.bulletMoveSpeed1 = 1600;
this.bulletAttackMultiple = 1;
if (1 == this.bulletLeve) {
this.lerpratio = .4;
this.scope = 900;
this.walk_time[0] = 3;
} else if (2 == this.bulletLeve) {
this.lerpratio = .3;
this.scope = 900;
this.walk_time[1] = 4;
} else if (3 == this.bulletLeve) {
this.lerpratio = .5;
this.scope = 1200;
this.walk_time[2] = 10;
this.currentplayer.angle = 0;
this.trackingAttackNow_time = 0;
this.trackingAttackWalk_time = 1;
this.currBulletSpeed = 200;
this.currBulletSpeed2 = 0;
this.bulletSpeed = 0;
this.distance = 0;
this.disangle = 0;
this.posX = 0;
this.posY = 0;
this.MaximumRotationSpeed = 360;
this.MaximumVelocity = 2e3;
this.AcceleratedVeocity = 60;
}
}
},
setLeveAttribute: function() {
if (1 == this.bulletLeve) {
this.gun5_1 && (this.gun5_1.active = !0);
this.gun5_2 && (this.gun5_2.active = !1);
this.gun5_3 && (this.gun5_3.active = !1);
} else if (2 == this.bulletLeve) {
this.gun5_1 && (this.gun5_1.active = !1);
this.gun5_2 && (this.gun5_2.active = !0);
this.gun5_3 && (this.gun5_3.active = !1);
} else if (3 == this.bulletLeve) {
this.gun5_1 && (this.gun5_1.active = !1);
this.gun5_2 && (this.gun5_2.active = !1);
this.gun5_3 && (this.gun5_3.active = !0);
}
},
initWeaponJudge: function() {
if (n.WEAPON_ID == n.WEAPON_HOWITZER) {
if (1 == this.attackmodes) {
this.isAutoAttack = !1;
return !1;
}
this.isAutoAttack = !1;
return !0;
}
this.isAutoAttack = !0;
return !1;
},
getBarbetteLocationAngle_start: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.initFollowingCamera();
this.initCurrentplayer();
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !1;
this.local = cc.find("Canvas/map").convertToNodeSpaceAR(e.getLocation());
this.isTOUCH_ID = 1;
this.touchendMoveCamera = !1;
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatling = this.gridmap.getWeaponGatlingNode();
this.WeaponLaserCannon = this.gridmap.getWeaponLaserCannonNode();
this.WeaponLaserCannon3 = this.gridmap.getWeaponLaserCannonNode3();
this.WeaponLaserCannon5 = this.gridmap.getWeaponLaserCannonNode5();
this.WeaponLaserCannon7 = this.gridmap.getWeaponLaserCannonNode7();
this.WeaponIcegun = this.gridmap.getWeaponIcegunNode();
this.WeaponFlames = this.gridmap.getWeaponFlamesNode();
this.WeaponRailgun = this.gridmap.getWeaponRailgunNode();
this.WeaponGatling && (this.WeaponGatlingAttack = this.WeaponGatling.getChildByName("WeaponGatling").getComponent("WeaponGatling"));
this.WeaponLaserCannon && (this.WeaponLaserCannonAttack = this.WeaponLaserCannon.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon"));
this.WeaponLaserCannon3 && (this.WeaponLaserCannonAttack3 = this.WeaponLaserCannon3.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon0"));
this.WeaponLaserCannon5 && (this.WeaponLaserCannonAttack5 = this.WeaponLaserCannon5.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon1"));
this.WeaponLaserCannon7 && (this.WeaponLaserCannonAttack7 = this.WeaponLaserCannon7.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon2"));
this.WeaponIcegun && (this.WeaponIcegunAttack = this.WeaponIcegun.getChildByName("WeaponIcegun").getComponent("WeaponIcegun"));
this.WeaponFlames && (this.WeaponFlamesAttack = this.WeaponFlames.getChildByName("WeaponFlames").getComponent("WeaponFlames"));
this.WeaponRailgun && (this.WeaponRailgunAttack = this.WeaponRailgun.getChildByName("WeaponRailgun").getComponent("WeaponRailgun"));
}
}
},
getBarbetteLocationAngle_move: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !0;
this.isTOUCH_END = !1;
var t = e.getTouches();
this.newPos = cc.find("Canvas/map").convertToNodeSpaceAR(t[0].getLocation());
this.isTOUCH_ID = 2;
this.touchendMoveCamera = !1;
}
},
resumeBarbetteLocationAngle: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.resetAttack();
return;
}
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.resetAttack();
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.touchendMoveCamera = !0;
if (!this.currentplayer) return;
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.initFollowingCameraPosX = this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu);
this.initFollowingCameraPosY = this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu);
}
}
},
resetAttack: function() {
if (1 != this.isAutoAttack) {
this.now_time = 0;
if (1 == this.bulletLeve) {
if (this.ani_gun5_1Attack) {
var e = this.ani_gun5_1Attack.currentClip;
if (e && e.name) {
this.ani_gun5_1Attack.play(e.name, 0);
this.ani_gun5_1Attack.sample(e.name);
this.ani_gun5_1Attack.stop();
}
}
} else if (2 == this.bulletLeve) {
if (this.ani_gun5_2Attack) {
var t = this.ani_gun5_2Attack.currentClip;
if (t && t.name) {
this.ani_gun5_2Attack.play(t.name, 0);
this.ani_gun5_2Attack.sample(t.name);
this.ani_gun5_2Attack.stop();
}
}
} else if (3 == this.bulletLeve) {
if (this.ani_gun_5_bullet_fire1) {
var i = this.ani_gun_5_bullet_fire1.currentClip;
if (i && i.name) {
this.ani_gun_5_bullet_fire1.play(i.name, 0);
this.ani_gun_5_bullet_fire1.sample(i.name);
this.ani_gun_5_bullet_fire1.stop();
}
}
if (this.ani_gun_5_bullet_fire2) {
var n = this.ani_gun_5_bullet_fire2.currentClip;
if (n && n.name) {
this.ani_gun_5_bullet_fire2.play(n.name, 0);
this.ani_gun_5_bullet_fire2.sample(n.name);
this.ani_gun_5_bullet_fire2.stop();
}
}
if (this.ani_gun5_bullet_3) {
var a = this.ani_gun5_bullet_3.currentClip;
if (a && a.name) {
this.ani_gun5_bullet_3.play(a.name, 0);
this.ani_gun5_bullet_3.sample(a.name);
this.ani_gun5_bullet_3.stop();
}
}
}
}
},
ani_WeaponHowitzerStartGame: function() {
this.ani_gun5_3Attack && this.ani_gun5_3Attack.play("gun5_3_attack1");
},
ani_WeaponHowitzerEndGame: function() {
this.ani_gun5_3Attack && this.ani_gun5_3Attack.play("gun5_3_attack2");
},
resetWeaponAttack: function() {
if (3 == this.bulletLeve && this.ani_gun5_3Attack) {
this.ani_gun5_3Attack.play("gun5_3_attack1", 0);
this.ani_gun5_3Attack.stop();
}
},
bulletLeve_To_playbullet: function(e) {
this.now_time <= 0 && (1 == this.bulletLeve ? this.ani_gun5_1Attack && this.ani_gun5_1Attack.play("gun5_1_attack") : 2 == this.bulletLeve && this.ani_gun5_2Attack && this.ani_gun5_2Attack.play("gun5_2_attack"));
this.now_time += this.selfdt;
this.now_time >= this.walk_time[this.bulletLeve - 1] && (this.now_time = 0);
},
bulletLeve_To_launchbullet: function() {
if (1 == this.bulletLeve) {
zy.audioMng.playEffect(zy.audioMng.launchgun5_1_2Audio);
var e = this.currentplayer.x + this.oneBulletPosOffset * Math.sin(this.hudu), t = this.currentplayer.y + this.oneBulletPosOffset * Math.cos(this.hudu);
this.oneBulletPos = cc.v2(e, t);
var i = zy.nodePoolMng.getBullet("Bullet5_1_1");
this.currentplayer.parent.addChild(i, n.BULLET_zIndex, "Bullet5_1_1");
n.currBulletPool.push(i);
i.position = this.oneBulletPos;
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? i.getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : i.getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
i.getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_HOWITZER).player_Attack * this.bulletAttackMultiple);
i.getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_HOWITZER).player_ID);
i.getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
i.getComponent("Bullets").setBulletAttackRange(this.attackRange);
i.getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_HOWITZER));
} else if (2 == this.bulletLeve) {
zy.audioMng.playEffect(zy.audioMng.launchgun5_1_2Audio);
var a = this.currentplayer.x + this.oneBulletPosOffset * Math.sin(this.hudu), o = this.currentplayer.y + this.oneBulletPosOffset * Math.cos(this.hudu);
this.oneBulletPos = cc.v2(a, o);
var s = zy.nodePoolMng.getBullet("Bullet5_2_1");
this.currentplayer.parent.addChild(s, n.BULLET_zIndex, "Bullet5_2_1");
n.currBulletPool.push(s);
s.position = this.oneBulletPos;
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? s.getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : s.getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
s.getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_HOWITZER).player_Attack * this.bulletAttackMultiple);
s.getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_HOWITZER).player_ID);
s.getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
s.getComponent("Bullets").setBulletAttackRange(this.attackRange);
s.getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_HOWITZER));
} else 3 == this.bulletLeve && this.createBullet5_3_1();
},
currentPlayerAngle_To_bulletLeveplaybullet: function(e) {
if (1 == this.bulletLeve || 2 == this.bulletLeve) {
var t = e;
this.currentplayer.angle = t;
this.hudu = Math.PI / 180 * -t;
this.bulletLeve_To_playbullet(this.hudu);
}
},
autoAttackOpen: function() {
0 != this.isAutoAttack && this.automaticAttack();
},
currPlayerautoAttackOpen: function() {
0 != this.attackmodes && this.automaticAttack();
},
autoAttackClose: function() {
this.isAutoAttack = !1;
},
trackingAttack: function() {
this.nearestEnemy = this.findNearestEnemy();
if (this.nearestEnemy) {
if (3 == this.bulletLeve) {
this.now_time <= 0 && this.set_ani_Gun5_3(!0);
this.now_time += this.selfdt;
this.now_time >= this.walk_time[this.bulletLeve - 1] && (this.now_time = 0);
if (this.oneBullet && cc.isValid(this.oneBullet) && n.isStartGenZong) {
if (0 == this.nearestEnemy.opacity || !cc.isValid(this.nearestEnemy)) {
this.createBullet5_1_2(this.oneBullet);
this.oneBullet.destroy();
return;
}
if (0 == this.pos3.x && 0 == this.pos3.y) {
this.pos3 = cc.v2(this.nearestEnemy.position.x, this.nearestEnemy.position.y);
this.pos0 = cc.v2(this.currentplayer.x, this.currentplayer.y);
this.distance = this.oneBulletPos.sub(this.nearestEnemy.position).mag();
this.disangle = this.change_angle(this.oneBulletPos, this.nearestEnemy.position);
if (this.nearestEnemy.position.x >= this.pos0.x) {
var e = Math.PI / 180 * (-this.disangle - 45), t = 1.414 * this.distance * Math.sin(e), i = 1.414 * this.distance * Math.cos(e);
this.pos1 = cc.v2(0, 1e3);
this.pos2 = cc.v2(t, i);
} else {
var a = Math.PI / 180 * (45 - this.disangle), o = 1.414 * this.distance * Math.sin(a), s = 1.414 * this.distance * Math.cos(a);
this.pos1 = cc.v2(0, 1e3);
this.pos2 = cc.v2(o, s);
}
}
if (0 != this.distance && this.oneBullet && cc.isValid(this.oneBullet)) {
this.D2 += this.selfdt / 2;
if (this.oneBullet.getPosition().sub(this.pos3).mag() <= 1) {
if (this.oneBullet && cc.isValid(this.oneBullet)) {
this.createBullet5_1_2(this.oneBullet);
this.oneBullet.destroy();
}
} else {
this.anglesssX = 3 * this.pos0.x * (1 - this.D2) * (1 - this.D2) * -1 + 3 * this.pos1.x * ((1 - this.D2) * (1 - this.D2) + 2 * this.D2 * (1 - this.D2) * -1) + 3 * this.pos2.x * (2 * this.D2 * (1 - this.D2) + this.D2 * this.D2 * -1) + 3 * this.pos3.x * this.D2 * this.D2;
this.anglesssY = 3 * this.pos0.y * (1 - this.D2) * (1 - this.D2) * -1 + 3 * this.pos1.y * ((1 - this.D2) * (1 - this.D2) + 2 * this.D2 * (1 - this.D2) * -1) + 3 * this.pos2.y * (2 * this.D2 * (1 - this.D2) + this.D2 * this.D2 * -1) + 3 * this.pos3.y * this.D2 * this.D2;
this.anglesss = 90 - 180 * Math.atan2(this.anglesssY, this.anglesssX) / 3.14;
this.oneBullet.angle = -this.anglesss;
this.posX = this.pos0.x * (1 - this.D2) * (1 - this.D2) * (1 - this.D2) + 3 * this.pos1.x * this.D2 * (1 - this.D2) * (1 - this.D2) + 3 * this.pos2.x * this.D2 * this.D2 * (1 - this.D2) + this.pos3.x * this.D2 * this.D2 * this.D2;
this.posY = this.pos0.y * (1 - this.D2) * (1 - this.D2) * (1 - this.D2) + 3 * this.pos1.y * this.D2 * (1 - this.D2) * (1 - this.D2) + 3 * this.pos2.y * this.D2 * this.D2 * (1 - this.D2) + this.pos3.y * this.D2 * this.D2 * this.D2;
this.oneBullet.setPosition(cc.v2(this.posX, this.posY));
}
}
}
}
} else if (this.oneBullet && cc.isValid(this.oneBullet)) {
this.createBullet5_1_2(this.oneBullet);
this.oneBullet.destroy();
this.ani_WeaponHowitzerEndGame();
}
},
automaticAttack: function() {
this.nearestEnemy = this.findNearestEnemy();
if (this.nearestEnemy && (1 == this.bulletLeve || 2 == this.bulletLeve)) {
this.angle = this.change_angle(this.currentplayer.position, this.nearestEnemy.position, -.1, -.1);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
}
},
collaborativeAttack: function(e, t, i, a, o, s) {
this.weaponAngle = a;
if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1) {
this.weaponAngle = a;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2) {
if (1 == this.bulletLeve || 2 == this.bulletLeve) {
this.A_local = t;
this.A_newPos = i;
var r = e;
this.angle = 1 == r ? this.change_angle(this.currentplayer.position, this.A_local, o, s) : this.change_angle(this.currentplayer.position, this.A_newPos, o, s);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
}
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3) {
this.weaponAngle = a - n.cooperativeAttack_Level_3_Angle * this.CollaborativeAttack_Level_3_ratio;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
}
},
findNearestEnemy: function() {
var e = n.currEnemyPool;
if (!(e.length <= 0)) {
for (var t = this.scope, i = null, a = null, o = 0, s = cc.v2(this.currentplayer.x, this.currentplayer.y), r = 0; r < e.length; r++) for (var l = 0; l < e[r].length; l++) {
a = e[r][l];
if ((o = s.sub(a.getPosition()).mag()) < t) {
t = o;
i = a;
}
}
this.nearestEnemy = i;
return i;
}
},
change_angle: function(e, t, i, a) {
i = i || this.currentfollowingCameraPosX;
a = a || this.currentfollowingCameraPosY;
e.x -= i;
e.y -= a;
var o = t.x - e.x, s = 0;
n.isBossLevel && (s = 0 == this.isAutoAttack || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2 ? 188 : 0);
var r = t.y - e.y + s, l = cc.v2(o, r).signAngle(cc.v2(0, 1)) / Math.PI * 180;
l <= 0 && (l = 360 + l);
return -l;
},
abAngle: function(e, t) {
return ((e - t) % 360 + 540) % 360 - 180;
},
update_Camera_and_Bullet: function() {
if ((this.isTOUCH_START || this.touchendMoveCamera) && this.currentplayer && this.currentplayer) {
if (this.isTOUCH_START) {
1 == this.isTOUCH_ID ? this.angle = this.change_angle(this.currentplayer.position, this.local) : this.angle = this.change_angle(this.currentplayer.position, this.newPos);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.currentfollowingCameraPosX = cc.misc.lerp(this.currentfollowingCameraPosX, this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu), .25);
this.currentfollowingCameraPosY = cc.misc.lerp(this.currentfollowingCameraPosY, this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu), .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.currentfollowingCameraPosX, this.currentfollowingCameraPosY));
}
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatlingAttack && this.WeaponGatlingAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack && this.WeaponLaserCannonAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack3 && this.WeaponLaserCannonAttack3.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack5 && this.WeaponLaserCannonAttack5.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack7 && this.WeaponLaserCannonAttack7.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponIcegunAttack && this.WeaponIcegunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponFlamesAttack && this.WeaponFlamesAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponRailgunAttack && this.WeaponRailgunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
}
}
if (!this.touchendMoveCamera) return;
if (this.touchendMoveCamera && this.gridmap) {
this.initFollowingCameraPosX = cc.misc.lerp(this.initFollowingCameraPosX, this.initFollowingCameraPos.x, .25);
this.initFollowingCameraPosY = cc.misc.lerp(this.initFollowingCameraPosY, this.initFollowingCameraPos.y, .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPosX, this.initFollowingCameraPosY));
if (Math.round(this.initFollowingCameraPosX) == this.initFollowingCameraPos.x && Math.round(this.initFollowingCameraPosY) == this.initFollowingCameraPos.y) {
this.touchendMoveCamera = !1;
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPos.x, this.initFollowingCameraPos.y));
}
}
}
},
start: function() {},
update: function(e) {
if (!n.getGamePaused() && !n.getIsGameOver()) {
this.selfdt = e;
this.initWeaponJudge() && this.update_Camera_and_Bullet();
n.ATTACKMODES == n.AUTOMATICATTACK && this.autoAttackOpen();
n.isTrackingAttack && this.trackingAttack();
1 == this.attackmodes && this.currPlayerautoAttackOpen();
}
},
getCollaborativeAttack_Level_3_ratio: function(e) {
this.CollaborativeAttack_Level_3_ratio = e;
},
getCurrPlayerAttackModes: function(e) {
this.attackmodes = e;
this.initWeaponJudge();
},
set_BulletLeve: function(e) {
this.bulletLeve = e;
this.bulletLeve_To_BulletNode();
this.setAttackattribute();
this.setLeveAttribute();
},
set_HowitzerbulletLeve_To_launchbullet: function() {
this.bulletLeve_To_launchbullet();
},
createHowitzerBullet5_1_2: function(e) {
this.createBullet5_1_2(e);
},
set_ani_Gun5_3: function(e) {
if (3 == this.bulletLeve) if (1 == e) {
this.ani_WeaponHowitzerStartGame();
n.isStartGenZong = !1;
this.trackingAttackNow_time = 0;
} else {
this.ani_WeaponHowitzerEndGame();
if (this.oneBullet) {
n.isStartGenZong = !0;
this.oneBullet.getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_HOWITZER).player_Attack * this.bulletAttackMultiple);
this.oneBullet.getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_HOWITZER).player_ID);
this.oneBullet.getComponent("Bullets").setBulletAttackRange(this.attackRange);
this.oneBullet.getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_HOWITZER));
}
}
}
});
cc._RF.pop();
}, {
GameManager: "GameManager",
Helpers: "Helpers"
} ],
WeaponIcegun: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2f0cf+fPthPJK299Ia/I53Q", "WeaponIcegun");
var n = e("GameManager"), a = e("Helpers");
cc.Class({
extends: cc.Component,
properties: {
bulletLeve: 0,
oneBulletPos: cc.Vec2,
moreBulletPos: {
default: [],
type: cc.Vec2
},
bulletPrefab: null,
oneBullet: null,
selfdt: null,
nearestEnemy: null,
isAutoAttack: !1
},
onLoad: function() {
this.initGetComponent();
this.initFollowingCameraVariable();
this.initFollowingCamera();
this.initCurrentplayer();
this.initCurrentplayerVariable();
this.initTouch();
this.initBullet();
},
initGetComponent: function() {
this.gridmap = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
},
initFollowingCamera: function() {
if (this.gridmap) {
this.currentFollowingCamera = this.gridmap.getFollowingCamera();
this.currentFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.initFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.currentfollowingCameraPosX = this.currentFollowingCameraPos.x;
this.currentfollowingCameraPosY = this.currentFollowingCameraPos.y;
}
},
initFollowingCameraVariable: function() {
this.currentplayerCameranow_time = 0;
this.currentplayerCamerarate = 1;
this.currentplayerCameraspeed = 150;
this.lerpmoveCamera = .5;
this.touchendMoveCamera = !1;
},
initCurrentplayer: function() {
this.gridmap && this.initWeaponJudge() && (this.currentplayer = this.gridmap.getWeaponIcegunNode());
},
initCurrentplayerVariable: function() {
this.currentplayerAngle = 0;
this.offsetAngle = 0;
this.targetAngle = 0;
},
initTouch: function() {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_START, this.getBarbetteLocationAngle_start, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_END, this.resumeBarbetteLocationAngle, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_MOVE, this.getBarbetteLocationAngle_move, this);
},
initBullet: function() {
var e = this, t = n.getPlayersData(n.WEAPON_ICEGUN);
this.bulletLeve = t.player_StarLevel;
this.angle = 0;
this.now_time = 0;
this.walk_time = [];
this.setAttackattribute();
this.oneBulletPosOffset = 156;
this.twoBulletPosOffset = 30;
this.threeBulletPos = 130;
this.threeBulletPosOffset = 46;
this.bulletPrefab || cc.loader.loadRes("MainGame/Bullet/Bullet2", function(t, i) {
if (e.isValid) if (t) cc.log("Error url [" + t + "]"); else {
e.bulletPrefab = i;
console.log("Bullet2 initOK");
e.bulletPrefab && e.bulletLeve_To_Createbullet();
}
});
},
setAttackattribute: function() {
var e = zy.dataMng.turretAttrData.getTurretAttr((this.bulletLeve - 1 + 3e4).toString());
if (e) {
this.laserLength = a.ToNumber(e.laserLength);
this.scope = a.ToNumber(e.autoAttackRange);
this.lerpratio = a.ToNumber(e.rotationSpeed);
this.bulletAttackMultiple = a.ToNumber(e.bulletAttackMultiple);
var t = a.ToNumber(e.laserRate), i = a.ToNumber(e.cd);
1 == this.bulletLeve ? this.walk_time[this.bulletLeve - 1] = i + 1.3 : 2 == this.bulletLeve ? this.walk_time[this.bulletLeve - 1] = t + i + 3.3 : 3 == this.bulletLeve && (this.walk_time[this.bulletLeve - 1] = t + i + 4.9);
} else {
this.laserLength = 1e3;
this.bulletAttackMultiple = 1;
if (1 == this.bulletLeve) {
this.lerpratio = .5;
this.scope = 800;
this.walk_time[0] = 2.3;
} else if (2 == this.bulletLeve) {
this.lerpratio = .5;
this.scope = 900;
this.walk_time[1] = 5.3;
} else if (3 == this.bulletLeve) {
this.lerpratio = .5;
this.scope = 900;
this.walk_time[2] = 6.2;
}
}
},
initWeaponJudge: function() {
if (n.WEAPON_ID == n.WEAPON_ICEGUN) {
if (1 == this.attackmodes) {
this.isAutoAttack = !1;
return !1;
}
this.isAutoAttack = !1;
return !0;
}
this.isAutoAttack = !0;
return !1;
},
getBarbetteLocationAngle_start: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.initFollowingCamera();
this.initCurrentplayer();
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !1;
this.local = cc.find("Canvas/map").convertToNodeSpaceAR(e.getLocation());
this.isTOUCH_ID = 1;
this.touchendMoveCamera = !1;
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatling = this.gridmap.getWeaponGatlingNode();
this.WeaponLaserCannon = this.gridmap.getWeaponLaserCannonNode();
this.WeaponLaserCannon3 = this.gridmap.getWeaponLaserCannonNode3();
this.WeaponLaserCannon5 = this.gridmap.getWeaponLaserCannonNode5();
this.WeaponLaserCannon7 = this.gridmap.getWeaponLaserCannonNode7();
this.WeaponFlames = this.gridmap.getWeaponFlamesNode();
this.WeaponRailgun = this.gridmap.getWeaponRailgunNode();
this.WeaponHowitzer = this.gridmap.getWeaponHowitzerNode();
this.WeaponGatling && (this.WeaponGatlingAttack = this.WeaponGatling.getChildByName("WeaponGatling").getComponent("WeaponGatling"));
this.WeaponLaserCannon && (this.WeaponLaserCannonAttack = this.WeaponLaserCannon.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon"));
this.WeaponLaserCannon3 && (this.WeaponLaserCannonAttack3 = this.WeaponLaserCannon3.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon0"));
this.WeaponLaserCannon5 && (this.WeaponLaserCannonAttack5 = this.WeaponLaserCannon5.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon1"));
this.WeaponLaserCannon7 && (this.WeaponLaserCannonAttack7 = this.WeaponLaserCannon7.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon2"));
this.WeaponFlames && (this.WeaponFlamesAttack = this.WeaponFlames.getChildByName("WeaponFlames").getComponent("WeaponFlames"));
this.WeaponRailgun && (this.WeaponRailgunAttack = this.WeaponRailgun.getChildByName("WeaponRailgun").getComponent("WeaponRailgun"));
this.WeaponHowitzer && (this.WeaponHowitzerAttack = this.WeaponHowitzer.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer"));
}
}
},
getBarbetteLocationAngle_move: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !0;
this.isTOUCH_END = !1;
var t = e.getTouches();
this.newPos = cc.find("Canvas/map").convertToNodeSpaceAR(t[0].getLocation());
this.isTOUCH_ID = 2;
this.touchendMoveCamera = !1;
}
},
resumeBarbetteLocationAngle: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.resetAttack();
return;
}
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.resetAttack();
this.touchendMoveCamera = !0;
if (!this.currentplayer) return;
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.initFollowingCameraPosX = this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu);
this.initFollowingCameraPosY = this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu);
}
}
},
resetAttack: function() {
if (1 != this.isAutoAttack) {
this.now_time = 0;
if (this.ani_oneBullet) {
var e = this.ani_oneBullet.currentClip;
if (e && e.name) {
this.ani_oneBullet.play(e.name, 0);
this.ani_oneBullet.sample(e.name);
this.ani_oneBullet.stop();
}
}
}
},
resetWeaponAttack: function() {
this.now_time = 0;
if (this.ani_oneBullet) {
var e = this.ani_oneBullet.currentClip;
if (e && e.name) {
this.ani_oneBullet.play(e.name, 0);
this.ani_oneBullet.sample(e.name);
this.ani_oneBullet.stop();
}
}
},
bulletLeve_To_Createbullet: function() {
if (null == this.oneBullet) {
this.oneBullet = cc.instantiate(this.bulletPrefab);
this.node.addChild(this.oneBullet, n.BULLET_zIndex, "Bullet2");
}
this.setBulletLeve_To_Createbullet();
},
setBulletLeve_To_Createbullet: function() {
if (this.oneBullet) {
this.ani_oneBullet = this.oneBullet.getComponent(cc.Animation);
this.oneBullet.getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_ICEGUN).player_Attack * this.bulletAttackMultiple);
this.oneBullet.getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_ICEGUN).player_ID);
this.oneBullet.getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_ICEGUN));
var e = this.oneBullet.getChildByName("light").getComponent(cc.Sprite), t = this.oneBullet.getChildByName("Bullet").getComponent(cc.Sprite), i = this.oneBullet.getChildByName("Bullet");
if (null == this.gridmap.getGunPlist()) return;
e && (e.spriteFrame = this.gridmap.getGunPlist().getSpriteFrame("gun2_level_" + this.bulletLeve + "_effect"));
t && (t.spriteFrame = this.gridmap.getGunPlist().getSpriteFrame("gun2_bullet_" + this.bulletLeve));
1 == this.bulletLeve ? i.setContentSize(cc.size(93, this.laserLength)) : 2 == this.bulletLeve ? i.setContentSize(cc.size(124, this.laserLength)) : 3 == this.bulletLeve && i.setContentSize(cc.size(213, this.laserLength));
}
},
bulletLeve_To_playbullet: function(e) {
this.now_time <= 0 && (1 == this.bulletLeve ? this.ani_oneBullet && this.ani_oneBullet.play("gun2_1_attack") : 2 == this.bulletLeve ? this.ani_oneBullet && this.ani_oneBullet.play("gun2_2_attack") : 3 == this.bulletLeve && this.ani_oneBullet && this.ani_oneBullet.play("gun2_3_attack"));
this.now_time += this.selfdt;
this.now_time >= this.walk_time[this.bulletLeve - 1] && (this.now_time = 0);
},
currentPlayerAngle_To_bulletLeveplaybullet: function(e) {
var t = e;
this.currentplayer.angle = t;
this.hudu = Math.PI / 180 * -t;
this.bulletLeve_To_playbullet(this.hudu);
},
autoAttackOpen: function() {
0 != this.isAutoAttack && this.automaticAttack();
},
currPlayerautoAttackOpen: function() {
0 != this.attackmodes && this.automaticAttack();
},
autoAttackClose: function() {
this.isAutoAttack = !1;
},
automaticAttack: function() {
this.nearestEnemy = this.findNearestEnemy();
if (this.nearestEnemy) {
this.angle = this.change_angle(this.currentplayer.position, this.nearestEnemy.position, -.1, -.1);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
}
},
collaborativeAttack: function(e, t, i, a, o, s) {
this.weaponAngle = a;
if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1) {
this.weaponAngle = a;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2) {
this.A_local = t;
this.A_newPos = i;
var r = e;
this.angle = 1 == r ? this.change_angle(this.currentplayer.position, this.A_local, o, s) : this.change_angle(this.currentplayer.position, this.A_newPos, o, s);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3) {
this.weaponAngle = a - n.cooperativeAttack_Level_3_Angle * this.CollaborativeAttack_Level_3_ratio;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
}
},
findNearestEnemy: function() {
var e = n.currEnemyPool;
if (!(e.length <= 0)) {
for (var t = this.scope, i = null, a = null, o = 0, s = cc.v2(this.currentplayer.x, this.currentplayer.y), r = 0; r < e.length; r++) for (var l = 0; l < e[r].length; l++) {
a = e[r][l];
if ((o = s.sub(a.getPosition()).mag()) < t) {
t = o;
i = a;
}
}
this.nearestEnemy = i;
return i;
}
},
change_angle: function(e, t, i, a) {
i = i || this.currentfollowingCameraPosX;
a = a || this.currentfollowingCameraPosY;
e.x -= i;
e.y -= a;
var o = t.x - e.x, s = 0;
n.isBossLevel && (s = 0 == this.isAutoAttack || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2 ? 188 : 0);
var r = t.y - e.y + s, l = cc.v2(o, r).signAngle(cc.v2(0, 1)) / Math.PI * 180;
l <= 0 && (l = 360 + l);
return -l;
},
abAngle: function(e, t) {
return ((e - t) % 360 + 540) % 360 - 180;
},
update_Camera_and_Bullet: function() {
if ((this.isTOUCH_START || this.touchendMoveCamera) && this.currentplayer && this.currentplayer) {
if (this.isTOUCH_START) {
1 == this.isTOUCH_ID ? this.angle = this.change_angle(this.currentplayer.position, this.local) : this.angle = this.change_angle(this.currentplayer.position, this.newPos);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.currentfollowingCameraPosX = cc.misc.lerp(this.currentfollowingCameraPosX, this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu), .25);
this.currentfollowingCameraPosY = cc.misc.lerp(this.currentfollowingCameraPosY, this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu), .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.currentfollowingCameraPosX, this.currentfollowingCameraPosY));
}
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatlingAttack && this.WeaponGatlingAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack && this.WeaponLaserCannonAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack3 && this.WeaponLaserCannonAttack3.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack5 && this.WeaponLaserCannonAttack5.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack7 && this.WeaponLaserCannonAttack7.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponFlamesAttack && this.WeaponFlamesAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponRailgunAttack && this.WeaponRailgunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponHowitzerAttack && this.WeaponHowitzerAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
}
}
if (!this.touchendMoveCamera) return;
if (this.touchendMoveCamera && this.gridmap) {
this.initFollowingCameraPosX = cc.misc.lerp(this.initFollowingCameraPosX, this.initFollowingCameraPos.x, .25);
this.initFollowingCameraPosY = cc.misc.lerp(this.initFollowingCameraPosY, this.initFollowingCameraPos.y, .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPosX, this.initFollowingCameraPosY));
if (Math.round(this.initFollowingCameraPosX) == this.initFollowingCameraPos.x && Math.round(this.initFollowingCameraPosY) == this.initFollowingCameraPos.y) {
this.touchendMoveCamera = !1;
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPos.x, this.initFollowingCameraPos.y));
}
}
}
},
start: function() {},
update: function(e) {
if (!n.getGamePaused() && !n.getIsGameOver()) {
this.selfdt = e;
this.initWeaponJudge() && this.update_Camera_and_Bullet();
n.ATTACKMODES == n.AUTOMATICATTACK && this.autoAttackOpen();
1 == this.attackmodes && this.currPlayerautoAttackOpen();
}
},
getCollaborativeAttack_Level_3_ratio: function(e) {
this.CollaborativeAttack_Level_3_ratio = e;
},
getCurrPlayerAttackModes: function(e) {
this.attackmodes = e;
this.initWeaponJudge();
},
set_BulletLeve: function(e) {
this.bulletLeve = e;
this.bulletLeve_To_Createbullet();
this.setAttackattribute();
},
set_Icegunlerpratio: function(e) {
this.lerpratio = e;
}
});
cc._RF.pop();
}, {
GameManager: "GameManager",
Helpers: "Helpers"
} ],
WeaponLaserCannon0: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c0ec0sFPCZNUrL9zcXK2duL", "WeaponLaserCannon0");
var n = e("GameManager"), a = e("Helpers");
cc.Class({
extends: cc.Component,
properties: {
bulletLeve: 0,
oneBulletPos: cc.Vec2,
moreBulletPos: {
default: [],
type: cc.Vec2
},
bulletPrefab: null,
selfdt: null,
nearestEnemy: null,
isAutoAttack: !1
},
onLoad: function() {
this.initGetComponent();
this.initFollowingCameraVariable();
this.initFollowingCamera();
this.initCurrentplayer();
this.initCurrentplayerVariable();
this.initTouch();
this.initBullet();
},
initGetComponent: function() {
this.gridmap = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
this.audioMng = cc.find("Canvas/AudioMng").getComponent("AudioMng");
},
initFollowingCamera: function() {
if (this.gridmap) {
this.currentFollowingCamera = this.gridmap.getFollowingCamera();
this.currentFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.initFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.currentfollowingCameraPosX = this.currentFollowingCameraPos.x;
this.currentfollowingCameraPosY = this.currentFollowingCameraPos.y;
}
},
initFollowingCameraVariable: function() {
this.currentplayerCameranow_time = 0;
this.currentplayerCamerarate = 1;
this.currentplayerCameraspeed = 150;
this.lerpmoveCamera = .5;
this.touchendMoveCamera = !1;
},
initCurrentplayer: function() {
this.gridmap && this.initWeaponJudge() && (this.currentplayer = this.gridmap.getWeaponLaserCannonNode3());
},
initCurrentplayerVariable: function() {
this.currentplayerAngle = 0;
this.offsetAngle = 0;
this.targetAngle = 0;
},
initTouch: function() {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_START, this.getBarbetteLocationAngle_start, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_END, this.resumeBarbetteLocationAngle, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_MOVE, this.getBarbetteLocationAngle_move, this);
},
initBullet: function() {
var e = this;
this.angle = 0;
this.bulletLeve = 1;
this.now_time = 0;
this.setAttackattribute();
this.islaunch = !1, this.oneBulletPosOffset = 25;
this.twoBulletPosOffset = 45;
this.threeBulletPos = 130;
this.threeBulletPosOffset = 46;
this.bulletPrefab || cc.loader.loadRes("MainGame/Bullet/Bullet1", function(t, i) {
t || (e.bulletPrefab = i);
});
},
setAttackattribute: function() {
var e = zy.dataMng.turretAttrData.getTurretAttr("20001");
if (e) {
this.attackRange = a.ToNumber(e.attackRange);
this.scope = a.ToNumber(e.autoAttackRange);
this.lerpratio = a.ToNumber(e.rotationSpeed);
this.walk_time = a.ToNumber(e.bulletAttackRate1);
this.bulletMoveSpeed1 = a.ToNumber(e.bulletMoveSpeed1);
this.bulletAttackMultiple = a.ToNumber(e.bulletAttackMultiple);
} else {
this.attackRange = 800;
this.scope = 600;
this.lerpratio = .5;
this.walk_time = .2;
this.bulletMoveSpeed1 = 2e3;
this.bulletAttackMultiple = 1;
}
},
initWeaponJudge: function() {
if (n.WEAPON_ID == n.WEAPON_LASERCANNON_3) {
if (1 == this.attackmodes) {
this.isAutoAttack = !1;
return !1;
}
this.isAutoAttack = !1;
return !0;
}
this.isAutoAttack = !0;
return !1;
},
getBarbetteLocationAngle_start: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.initFollowingCamera();
this.initCurrentplayer();
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !1;
this.local = cc.find("Canvas/map").convertToNodeSpaceAR(e.getLocation());
this.isTOUCH_ID = 1;
this.touchendMoveCamera = !1;
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatling = this.gridmap.getWeaponGatlingNode();
this.WeaponIcegun = this.gridmap.getWeaponIcegunNode();
this.WeaponFlames = this.gridmap.getWeaponFlamesNode();
this.WeaponRailgun = this.gridmap.getWeaponRailgunNode();
this.WeaponHowitzer = this.gridmap.getWeaponHowitzerNode();
this.WeaponLaserCannon = this.gridmap.getWeaponLaserCannonNode();
this.WeaponLaserCannon5 = this.gridmap.getWeaponLaserCannonNode5();
this.WeaponLaserCannon7 = this.gridmap.getWeaponLaserCannonNode7();
this.WeaponGatling && (this.WeaponGatlingAttack = this.WeaponGatling.getChildByName("WeaponGatling").getComponent("WeaponGatling"));
this.WeaponIcegun && (this.WeaponIcegunAttack = this.WeaponIcegun.getChildByName("WeaponIcegun").getComponent("WeaponIcegun"));
this.WeaponFlames && (this.WeaponFlamesAttack = this.WeaponFlames.getChildByName("WeaponFlames").getComponent("WeaponFlames"));
this.WeaponRailgun && (this.WeaponRailgunAttack = this.WeaponRailgun.getChildByName("WeaponRailgun").getComponent("WeaponRailgun"));
this.WeaponHowitzer && (this.WeaponHowitzerAttack = this.WeaponHowitzer.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer"));
this.WeaponLaserCannon && (this.WeaponLaserCannonAttack = this.WeaponLaserCannon.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon"));
this.WeaponLaserCannonAttack5 && this.WeaponLaserCannonAttack5.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack7 && this.WeaponLaserCannonAttack7.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
}
}
},
getBarbetteLocationAngle_move: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !0;
this.isTOUCH_END = !1;
var t = e.getTouches();
this.newPos = cc.find("Canvas/map").convertToNodeSpaceAR(t[0].getLocation());
this.isTOUCH_ID = 2;
this.touchendMoveCamera = !1;
}
},
resumeBarbetteLocationAngle: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.now_time = 0;
return;
}
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.now_time = 0;
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.touchendMoveCamera = !0;
if (!this.currentplayer) return;
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.initFollowingCameraPosX = this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu);
this.initFollowingCameraPosY = this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu);
}
}
},
bulletLeve_To_playbullet: function(e) {
var t = cc.v2(this.currentplayer.x + this.oneBulletPosOffset * Math.sin(e), this.currentplayer.y + this.oneBulletPosOffset * Math.cos(e));
this.moreBulletPos[0] = cc.v2(t.x + this.twoBulletPosOffset * Math.sin(e - 90), t.y + this.twoBulletPosOffset * Math.cos(e - 90));
this.moreBulletPos[1] = cc.v2(t.x + this.twoBulletPosOffset * Math.sin(e + 90), t.y + this.twoBulletPosOffset * Math.cos(e + 90));
var i = [];
if (this.now_time <= 0) {
this.audioMng && this.audioMng.playLaunchgun1Audio();
if (this.islaunch) {
i[0] = zy.nodePoolMng.getBullet("Bullet1");
this.currentplayer.parent.addChild(i[0], n.BULLET_SPECIAL_zIndex, "Bullet1");
i[0].position = this.moreBulletPos[0];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? i[0].getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : i[0].getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
i[0].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_LASERCANNON_3).player_Attack * this.bulletAttackMultiple);
i[0].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_LASERCANNON_3).player_ID);
i[0].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
i[0].getComponent("Bullets").setBulletAttackRange(this.attackRange);
i[0].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_LASERCANNON_3));
} else {
i[1] = zy.nodePoolMng.getBullet("Bullet1");
this.currentplayer.parent.addChild(i[1], n.BULLET_SPECIAL_zIndex, "Bullet1");
i[1].position = this.moreBulletPos[1];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? i[1].getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : i[1].getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
i[1].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_LASERCANNON_3).player_Attack * this.bulletAttackMultiple);
i[1].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_LASERCANNON_3).player_ID);
i[1].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
i[1].getComponent("Bullets").setBulletAttackRange(this.attackRange);
i[1].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_LASERCANNON_3));
}
}
this.now_time += this.selfdt;
if (this.now_time >= this.walk_time) {
this.now_time = 0;
this.islaunch = !this.islaunch;
}
},
currentPlayerAngle_To_bulletLeveplaybullet: function(e) {
var t = e;
this.currentplayer.angle = t;
this.hudu = Math.PI / 180 * -t;
this.bulletLeve_To_playbullet(this.hudu);
},
autoAttackOpen: function() {
0 != this.isAutoAttack && this.automaticAttack();
},
currPlayerautoAttackOpen: function() {
0 != this.attackmodes && this.automaticAttack();
},
autoAttackClose: function() {
this.isAutoAttack = !1;
},
automaticAttack: function() {
this.nearestEnemy = this.findNearestEnemy();
if (this.nearestEnemy) {
this.angle = this.change_angle(this.currentplayer.position, this.nearestEnemy.position, -.1, -.1);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
}
},
collaborativeAttack: function(e, t, i, a, o, s) {
this.weaponAngle = a;
if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1) {
this.weaponAngle = a;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2) {
this.A_local = t;
this.A_newPos = i;
var r = e;
this.angle = 1 == r ? this.change_angle(this.currentplayer.position, this.A_local, o, s) : this.change_angle(this.currentplayer.position, this.A_newPos, o, s);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3) {
this.weaponAngle = a - n.cooperativeAttack_Level_3_Angle * this.CollaborativeAttack_Level_3_ratio;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
}
},
findNearestEnemy: function() {
var e = n.currEnemyPool;
if (!(e.length <= 0)) {
for (var t = this.scope, i = null, a = null, o = 0, s = cc.v2(this.currentplayer.x, this.currentplayer.y), r = 0; r < e.length; r++) for (var l = 0; l < e[r].length; l++) {
a = e[r][l];
if ((o = s.sub(a.getPosition()).mag()) < t) {
t = o;
i = a;
}
}
this.nearestEnemy = i;
return i;
}
},
change_angle: function(e, t, i, a) {
i = i || this.currentfollowingCameraPosX;
a = a || this.currentfollowingCameraPosY;
e.x -= i;
e.y -= a;
var o = t.x - e.x, s = 0;
n.isBossLevel && (s = 0 == this.isAutoAttack || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2 ? 188 : 0);
var r = t.y - e.y + s, l = cc.v2(o, r).signAngle(cc.v2(0, 1)) / Math.PI * 180;
l <= 0 && (l = 360 + l);
return -l;
},
abAngle: function(e, t) {
return ((e - t) % 360 + 540) % 360 - 180;
},
update_Camera_and_Bullet: function() {
if ((this.isTOUCH_START || this.touchendMoveCamera) && this.currentplayer && this.currentplayer) {
if (this.isTOUCH_START) {
1 == this.isTOUCH_ID ? this.angle = this.change_angle(this.currentplayer.position, this.local) : this.angle = this.change_angle(this.currentplayer.position, this.newPos);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.currentfollowingCameraPosX = cc.misc.lerp(this.currentfollowingCameraPosX, this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu), .25);
this.currentfollowingCameraPosY = cc.misc.lerp(this.currentfollowingCameraPosY, this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu), .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.currentfollowingCameraPosX, this.currentfollowingCameraPosY));
}
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatlingAttack && this.WeaponGatlingAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponIcegunAttack && this.WeaponIcegunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponFlamesAttack && this.WeaponFlamesAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponRailgunAttack && this.WeaponRailgunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponHowitzerAttack && this.WeaponHowitzerAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack && this.WeaponLaserCannonAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack5 && this.WeaponLaserCannonAttack5.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack7 && this.WeaponLaserCannonAttack7.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
}
}
if (!this.touchendMoveCamera) return;
if (this.touchendMoveCamera && this.gridmap) {
this.initFollowingCameraPosX = cc.misc.lerp(this.initFollowingCameraPosX, this.initFollowingCameraPos.x, .25);
this.initFollowingCameraPosY = cc.misc.lerp(this.initFollowingCameraPosY, this.initFollowingCameraPos.y, .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPosX, this.initFollowingCameraPosY));
if (Math.round(this.initFollowingCameraPosX) == this.initFollowingCameraPos.x && Math.round(this.initFollowingCameraPosY) == this.initFollowingCameraPos.y) {
this.touchendMoveCamera = !1;
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPos.x, this.initFollowingCameraPos.y));
}
}
}
},
start: function() {},
update: function(e) {
if (!n.getGamePaused() && !n.getIsGameOver()) {
this.selfdt = e;
this.initWeaponJudge() && this.update_Camera_and_Bullet();
n.ATTACKMODES == n.AUTOMATICATTACK && this.autoAttackOpen();
1 == this.attackmodes && this.currPlayerautoAttackOpen();
}
},
getCollaborativeAttack_Level_3_ratio: function(e) {
this.CollaborativeAttack_Level_3_ratio = e;
},
getCurrPlayerAttackModes: function(e) {
this.attackmodes = e;
this.initWeaponJudge();
},
set_BulletLeve: function(e) {
this.bulletLeve = e;
}
});
cc._RF.pop();
}, {
GameManager: "GameManager",
Helpers: "Helpers"
} ],
WeaponLaserCannon1: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "84a81jp6U9J/JN70coBLcJG", "WeaponLaserCannon1");
var n = e("GameManager"), a = e("Helpers");
cc.Class({
extends: cc.Component,
properties: {
bulletLeve: 0,
oneBulletPos: cc.Vec2,
moreBulletPos: {
default: [],
type: cc.Vec2
},
bulletPrefab: null,
selfdt: null,
nearestEnemy: null,
isAutoAttack: !1
},
onLoad: function() {
this.initGetComponent();
this.initFollowingCameraVariable();
this.initFollowingCamera();
this.initCurrentplayer();
this.initCurrentplayerVariable();
this.initTouch();
this.initBullet();
},
initGetComponent: function() {
this.gridmap = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
this.audioMng = cc.find("Canvas/AudioMng").getComponent("AudioMng");
},
initFollowingCamera: function() {
if (this.gridmap) {
this.currentFollowingCamera = this.gridmap.getFollowingCamera();
this.currentFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.initFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.currentfollowingCameraPosX = this.currentFollowingCameraPos.x;
this.currentfollowingCameraPosY = this.currentFollowingCameraPos.y;
}
},
initFollowingCameraVariable: function() {
this.currentplayerCameranow_time = 0;
this.currentplayerCamerarate = 1;
this.currentplayerCameraspeed = 150;
this.lerpmoveCamera = .5;
this.touchendMoveCamera = !1;
},
initCurrentplayer: function() {
this.gridmap && this.initWeaponJudge() && (this.currentplayer = this.gridmap.getWeaponLaserCannonNode5());
},
initCurrentplayerVariable: function() {
this.currentplayerAngle = 0;
this.offsetAngle = 0;
this.targetAngle = 0;
},
initTouch: function() {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_START, this.getBarbetteLocationAngle_start, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_END, this.resumeBarbetteLocationAngle, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_MOVE, this.getBarbetteLocationAngle_move, this);
},
initBullet: function() {
var e = this;
this.angle = 0;
this.bulletLeve = 1;
this.now_time = 0;
this.setAttackattribute();
this.islaunch = !1, this.oneBulletPosOffset = 25;
this.twoBulletPosOffset = 45;
this.threeBulletPos = 130;
this.threeBulletPosOffset = 46;
this.bulletPrefab || cc.loader.loadRes("MainGame/Bullet/Bullet1", function(t, i) {
t || (e.bulletPrefab = i);
});
},
setAttackattribute: function() {
var e = zy.dataMng.turretAttrData.getTurretAttr("20002");
if (e) {
this.attackRange = a.ToNumber(e.attackRange);
this.scope = a.ToNumber(e.autoAttackRange);
this.lerpratio = a.ToNumber(e.rotationSpeed);
this.walk_time = a.ToNumber(e.bulletAttackRate1);
this.bulletMoveSpeed1 = a.ToNumber(e.bulletMoveSpeed1);
this.bulletAttackMultiple = a.ToNumber(e.bulletAttackMultiple);
} else {
this.attackRange = 800;
this.scope = 600;
this.lerpratio = .5;
this.walk_time = .2;
this.bulletMoveSpeed1 = 2e3;
this.bulletAttackMultiple = 1;
}
},
initWeaponJudge: function() {
if (n.WEAPON_ID == n.WEAPON_LASERCANNON_5) {
if (1 == this.attackmodes) {
this.isAutoAttack = !1;
return !1;
}
this.isAutoAttack = !1;
return !0;
}
this.isAutoAttack = !0;
return !1;
},
getBarbetteLocationAngle_start: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.initFollowingCamera();
this.initCurrentplayer();
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !1;
this.local = cc.find("Canvas/map").convertToNodeSpaceAR(e.getLocation());
this.isTOUCH_ID = 1;
this.touchendMoveCamera = !1;
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatling = this.gridmap.getWeaponGatlingNode();
this.WeaponIcegun = this.gridmap.getWeaponIcegunNode();
this.WeaponFlames = this.gridmap.getWeaponFlamesNode();
this.WeaponRailgun = this.gridmap.getWeaponRailgunNode();
this.WeaponHowitzer = this.gridmap.getWeaponHowitzerNode();
this.WeaponLaserCannon = this.gridmap.getWeaponLaserCannonNode();
this.WeaponLaserCannon3 = this.gridmap.getWeaponLaserCannonNode3();
this.WeaponLaserCannon7 = this.gridmap.getWeaponLaserCannonNode7();
this.WeaponGatling && (this.WeaponGatlingAttack = this.WeaponGatling.getChildByName("WeaponGatling").getComponent("WeaponGatling"));
this.WeaponIcegun && (this.WeaponIcegunAttack = this.WeaponIcegun.getChildByName("WeaponIcegun").getComponent("WeaponIcegun"));
this.WeaponFlames && (this.WeaponFlamesAttack = this.WeaponFlames.getChildByName("WeaponFlames").getComponent("WeaponFlames"));
this.WeaponRailgun && (this.WeaponRailgunAttack = this.WeaponRailgun.getChildByName("WeaponRailgun").getComponent("WeaponRailgun"));
this.WeaponHowitzer && (this.WeaponHowitzerAttack = this.WeaponHowitzer.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer"));
this.WeaponLaserCannon && (this.WeaponLaserCannonAttack = this.WeaponLaserCannon.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon"));
this.WeaponLaserCannon3 && (this.WeaponLaserCannonAttack3 = this.WeaponLaserCannon3.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon0"));
this.WeaponLaserCannon7 && (this.WeaponLaserCannonAttack7 = this.WeaponLaserCannon7.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon2"));
}
}
},
getBarbetteLocationAngle_move: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !0;
this.isTOUCH_END = !1;
var t = e.getTouches();
this.newPos = cc.find("Canvas/map").convertToNodeSpaceAR(t[0].getLocation());
this.isTOUCH_ID = 2;
this.touchendMoveCamera = !1;
}
},
resumeBarbetteLocationAngle: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.now_time = 0;
return;
}
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.now_time = 0;
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.touchendMoveCamera = !0;
if (!this.currentplayer) return;
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.initFollowingCameraPosX = this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu);
this.initFollowingCameraPosY = this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu);
}
}
},
bulletLeve_To_playbullet: function(e) {
var t = cc.v2(this.currentplayer.x + this.oneBulletPosOffset * Math.sin(e), this.currentplayer.y + this.oneBulletPosOffset * Math.cos(e));
this.moreBulletPos[0] = cc.v2(t.x + this.twoBulletPosOffset * Math.sin(e - 90), t.y + this.twoBulletPosOffset * Math.cos(e - 90));
this.moreBulletPos[1] = cc.v2(t.x + this.twoBulletPosOffset * Math.sin(e + 90), t.y + this.twoBulletPosOffset * Math.cos(e + 90));
var i = [];
if (this.now_time <= 0) {
this.audioMng && this.audioMng.playLaunchgun1Audio();
if (this.islaunch) {
i[0] = zy.nodePoolMng.getBullet("Bullet1");
this.currentplayer.parent.addChild(i[0], n.BULLET_SPECIAL_zIndex, "Bullet1");
i[0].position = this.moreBulletPos[0];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? i[0].getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : i[0].getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
i[0].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_LASERCANNON_5).player_Attack * this.bulletAttackMultiple);
i[0].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_LASERCANNON_5).player_ID);
i[0].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
i[0].getComponent("Bullets").setBulletAttackRange(this.attackRange);
i[0].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_LASERCANNON_5));
} else {
i[1] = zy.nodePoolMng.getBullet("Bullet1");
this.currentplayer.parent.addChild(i[1], n.BULLET_SPECIAL_zIndex, "Bullet1");
i[1].position = this.moreBulletPos[1];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? i[1].getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : i[1].getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
i[1].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_LASERCANNON_5).player_Attack * this.bulletAttackMultiple);
i[1].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_LASERCANNON_5).player_ID);
i[1].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
i[1].getComponent("Bullets").setBulletAttackRange(this.attackRange);
i[1].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_LASERCANNON_5));
}
}
this.now_time += this.selfdt;
if (this.now_time >= this.walk_time) {
this.now_time = 0;
this.islaunch = !this.islaunch;
}
},
currentPlayerAngle_To_bulletLeveplaybullet: function(e) {
var t = e;
this.currentplayer.angle = t;
this.hudu = Math.PI / 180 * -t;
this.bulletLeve_To_playbullet(this.hudu);
},
autoAttackOpen: function() {
0 != this.isAutoAttack && this.automaticAttack();
},
currPlayerautoAttackOpen: function() {
0 != this.attackmodes && this.automaticAttack();
},
autoAttackClose: function() {
this.isAutoAttack = !1;
},
automaticAttack: function() {
this.nearestEnemy = this.findNearestEnemy();
if (this.nearestEnemy) {
this.angle = this.change_angle(this.currentplayer.position, this.nearestEnemy.position, -.1, -.1);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
}
},
collaborativeAttack: function(e, t, i, a, o, s) {
this.weaponAngle = a;
if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1) {
this.weaponAngle = a;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2) {
this.A_local = t;
this.A_newPos = i;
var r = e;
this.angle = 1 == r ? this.change_angle(this.currentplayer.position, this.A_local, o, s) : this.change_angle(this.currentplayer.position, this.A_newPos, o, s);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3) {
this.weaponAngle = a - n.cooperativeAttack_Level_3_Angle * this.CollaborativeAttack_Level_3_ratio;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
}
},
findNearestEnemy: function() {
var e = n.currEnemyPool;
if (!(e.length <= 0)) {
for (var t = this.scope, i = null, a = null, o = 0, s = cc.v2(this.currentplayer.x, this.currentplayer.y), r = 0; r < e.length; r++) for (var l = 0; l < e[r].length; l++) {
a = e[r][l];
if ((o = s.sub(a.getPosition()).mag()) < t) {
t = o;
i = a;
}
}
this.nearestEnemy = i;
return i;
}
},
change_angle: function(e, t, i, a) {
i = i || this.currentfollowingCameraPosX;
a = a || this.currentfollowingCameraPosY;
e.x -= i;
e.y -= a;
var o = t.x - e.x, s = 0;
n.isBossLevel && (s = 0 == this.isAutoAttack || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2 ? 188 : 0);
var r = t.y - e.y + s, l = cc.v2(o, r).signAngle(cc.v2(0, 1)) / Math.PI * 180;
l <= 0 && (l = 360 + l);
return -l;
},
abAngle: function(e, t) {
return ((e - t) % 360 + 540) % 360 - 180;
},
update_Camera_and_Bullet: function() {
if ((this.isTOUCH_START || this.touchendMoveCamera) && this.currentplayer && this.currentplayer) {
if (this.isTOUCH_START) {
1 == this.isTOUCH_ID ? this.angle = this.change_angle(this.currentplayer.position, this.local) : this.angle = this.change_angle(this.currentplayer.position, this.newPos);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.currentfollowingCameraPosX = cc.misc.lerp(this.currentfollowingCameraPosX, this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu), .25);
this.currentfollowingCameraPosY = cc.misc.lerp(this.currentfollowingCameraPosY, this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu), .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.currentfollowingCameraPosX, this.currentfollowingCameraPosY));
}
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatlingAttack && this.WeaponGatlingAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponIcegunAttack && this.WeaponIcegunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponFlamesAttack && this.WeaponFlamesAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponRailgunAttack && this.WeaponRailgunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponHowitzerAttack && this.WeaponHowitzerAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack && this.WeaponLaserCannonAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack3 && this.WeaponLaserCannonAttack3.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack7 && this.WeaponLaserCannonAttack7.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
}
}
if (!this.touchendMoveCamera) return;
if (this.touchendMoveCamera && this.gridmap) {
this.initFollowingCameraPosX = cc.misc.lerp(this.initFollowingCameraPosX, this.initFollowingCameraPos.x, .25);
this.initFollowingCameraPosY = cc.misc.lerp(this.initFollowingCameraPosY, this.initFollowingCameraPos.y, .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPosX, this.initFollowingCameraPosY));
if (Math.round(this.initFollowingCameraPosX) == this.initFollowingCameraPos.x && Math.round(this.initFollowingCameraPosY) == this.initFollowingCameraPos.y) {
this.touchendMoveCamera = !1;
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPos.x, this.initFollowingCameraPos.y));
}
}
}
},
start: function() {},
update: function(e) {
if (!n.getGamePaused() && !n.getIsGameOver()) {
this.selfdt = e;
this.initWeaponJudge() && this.update_Camera_and_Bullet();
n.ATTACKMODES == n.AUTOMATICATTACK && this.autoAttackOpen();
1 == this.attackmodes && this.currPlayerautoAttackOpen();
}
},
getCollaborativeAttack_Level_3_ratio: function(e) {
this.CollaborativeAttack_Level_3_ratio = e;
},
getCurrPlayerAttackModes: function(e) {
this.attackmodes = e;
this.initWeaponJudge();
},
set_BulletLeve: function(e) {
this.bulletLeve = e;
}
});
cc._RF.pop();
}, {
GameManager: "GameManager",
Helpers: "Helpers"
} ],
WeaponLaserCannon2: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "3115fAvAVVKor5ZOcIBPXB5", "WeaponLaserCannon2");
var n = e("GameManager"), a = e("Helpers");
cc.Class({
extends: cc.Component,
properties: {
bulletLeve: 0,
oneBulletPos: cc.Vec2,
moreBulletPos: {
default: [],
type: cc.Vec2
},
bulletPrefab: null,
selfdt: null,
nearestEnemy: null,
isAutoAttack: !1
},
onLoad: function() {
this.initGetComponent();
this.initFollowingCameraVariable();
this.initFollowingCamera();
this.initCurrentplayer();
this.initCurrentplayerVariable();
this.initTouch();
this.initBullet();
},
initGetComponent: function() {
this.gridmap = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
this.audioMng = cc.find("Canvas/AudioMng").getComponent("AudioMng");
},
initFollowingCamera: function() {
if (this.gridmap) {
this.currentFollowingCamera = this.gridmap.getFollowingCamera();
this.currentFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.initFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.currentfollowingCameraPosX = this.currentFollowingCameraPos.x;
this.currentfollowingCameraPosY = this.currentFollowingCameraPos.y;
}
},
initFollowingCameraVariable: function() {
this.currentplayerCameranow_time = 0;
this.currentplayerCamerarate = 1;
this.currentplayerCameraspeed = 150;
this.lerpmoveCamera = .5;
this.touchendMoveCamera = !1;
},
initCurrentplayer: function() {
this.gridmap && this.initWeaponJudge() && (this.currentplayer = this.gridmap.getWeaponLaserCannonNode7());
},
initCurrentplayerVariable: function() {
this.currentplayerAngle = 0;
this.offsetAngle = 0;
this.targetAngle = 0;
},
initTouch: function() {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_START, this.getBarbetteLocationAngle_start, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_END, this.resumeBarbetteLocationAngle, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_MOVE, this.getBarbetteLocationAngle_move, this);
},
initBullet: function() {
var e = this;
this.angle = 0;
this.bulletLeve = 1;
this.now_time = 0;
this.setAttackattribute();
this.islaunch = !1, this.oneBulletPosOffset = 25;
this.twoBulletPosOffset = 45;
this.threeBulletPos = 130;
this.threeBulletPosOffset = 46;
this.bulletPrefab || cc.loader.loadRes("MainGame/Bullet/Bullet1", function(t, i) {
t || (e.bulletPrefab = i);
});
},
setAttackattribute: function() {
var e = zy.dataMng.turretAttrData.getTurretAttr("20003");
if (e) {
this.attackRange = a.ToNumber(e.attackRange);
this.scope = a.ToNumber(e.autoAttackRange);
this.lerpratio = a.ToNumber(e.rotationSpeed);
this.walk_time = a.ToNumber(e.bulletAttackRate1);
this.bulletMoveSpeed1 = a.ToNumber(e.bulletMoveSpeed1);
this.bulletAttackMultiple = a.ToNumber(e.bulletAttackMultiple);
} else {
this.attackRange = 800;
this.scope = 600;
this.lerpratio = .5;
this.walk_time = .2;
this.bulletMoveSpeed1 = 2e3;
this.bulletAttackMultiple = 1;
}
},
initWeaponJudge: function() {
if (n.WEAPON_ID == n.WEAPON_LASERCANNON_7) {
if (1 == this.attackmodes) {
this.isAutoAttack = !1;
return !1;
}
this.isAutoAttack = !1;
return !0;
}
this.isAutoAttack = !0;
return !1;
},
getBarbetteLocationAngle_start: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.initFollowingCamera();
this.initCurrentplayer();
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !1;
this.local = cc.find("Canvas/map").convertToNodeSpaceAR(e.getLocation());
this.isTOUCH_ID = 1;
this.touchendMoveCamera = !1;
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatling = this.gridmap.getWeaponGatlingNode();
this.WeaponIcegun = this.gridmap.getWeaponIcegunNode();
this.WeaponFlames = this.gridmap.getWeaponFlamesNode();
this.WeaponRailgun = this.gridmap.getWeaponRailgunNode();
this.WeaponHowitzer = this.gridmap.getWeaponHowitzerNode();
this.WeaponLaserCannon = this.gridmap.getWeaponLaserCannonNode();
this.WeaponLaserCannon3 = this.gridmap.getWeaponLaserCannonNode3();
this.WeaponLaserCannon5 = this.gridmap.getWeaponLaserCannonNode5();
this.WeaponGatling && (this.WeaponGatlingAttack = this.WeaponGatling.getChildByName("WeaponGatling").getComponent("WeaponGatling"));
this.WeaponIcegun && (this.WeaponIcegunAttack = this.WeaponIcegun.getChildByName("WeaponIcegun").getComponent("WeaponIcegun"));
this.WeaponFlames && (this.WeaponFlamesAttack = this.WeaponFlames.getChildByName("WeaponFlames").getComponent("WeaponFlames"));
this.WeaponRailgun && (this.WeaponRailgunAttack = this.WeaponRailgun.getChildByName("WeaponRailgun").getComponent("WeaponRailgun"));
this.WeaponHowitzer && (this.WeaponHowitzerAttack = this.WeaponHowitzer.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer"));
this.WeaponLaserCannon && (this.WeaponLaserCannonAttack = this.WeaponLaserCannon.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon"));
this.WeaponLaserCannon3 && (this.WeaponLaserCannonAttack3 = this.WeaponLaserCannon3.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon0"));
this.WeaponLaserCannon5 && (this.WeaponLaserCannonAttack5 = this.WeaponLaserCannon5.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon1"));
}
}
},
getBarbetteLocationAngle_move: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !0;
this.isTOUCH_END = !1;
var t = e.getTouches();
this.newPos = cc.find("Canvas/map").convertToNodeSpaceAR(t[0].getLocation());
this.isTOUCH_ID = 2;
this.touchendMoveCamera = !1;
}
},
resumeBarbetteLocationAngle: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.now_time = 0;
return;
}
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.now_time = 0;
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.touchendMoveCamera = !0;
if (!this.currentplayer) return;
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.initFollowingCameraPosX = this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu);
this.initFollowingCameraPosY = this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu);
}
}
},
bulletLeve_To_playbullet: function(e) {
var t = cc.v2(this.currentplayer.x + this.oneBulletPosOffset * Math.sin(e), this.currentplayer.y + this.oneBulletPosOffset * Math.cos(e));
this.moreBulletPos[0] = cc.v2(t.x + this.twoBulletPosOffset * Math.sin(e - 90), t.y + this.twoBulletPosOffset * Math.cos(e - 90));
this.moreBulletPos[1] = cc.v2(t.x + this.twoBulletPosOffset * Math.sin(e + 90), t.y + this.twoBulletPosOffset * Math.cos(e + 90));
var i = [];
if (this.now_time <= 0) {
this.audioMng && this.audioMng.playLaunchgun1Audio();
if (this.islaunch) {
i[0] = zy.nodePoolMng.getBullet("Bullet1");
this.currentplayer.parent.addChild(i[0], n.BULLET_SPECIAL_zIndex, "Bullet1");
i[0].position = this.moreBulletPos[0];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? i[0].getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : i[0].getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
i[0].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_LASERCANNON_7).player_Attack * this.bulletAttackMultiple);
i[0].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_LASERCANNON_7).player_ID);
i[0].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
i[0].getComponent("Bullets").setBulletAttackRange(this.attackRange);
i[0].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_LASERCANNON_7));
} else {
i[1] = zy.nodePoolMng.getBullet("Bullet1");
this.currentplayer.parent.addChild(i[1], n.BULLET_SPECIAL_zIndex, "Bullet1");
i[1].position = this.moreBulletPos[1];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? i[1].getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : i[1].getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
i[1].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_LASERCANNON_7).player_Attack * this.bulletAttackMultiple);
i[1].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_LASERCANNON_7).player_ID);
i[1].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
i[1].getComponent("Bullets").setBulletAttackRange(this.attackRange);
i[1].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_LASERCANNON_7));
}
}
this.now_time += this.selfdt;
if (this.now_time >= this.walk_time) {
this.now_time = 0;
this.islaunch = !this.islaunch;
}
},
currentPlayerAngle_To_bulletLeveplaybullet: function(e) {
var t = e;
this.currentplayer.angle = t;
this.hudu = Math.PI / 180 * -t;
this.bulletLeve_To_playbullet(this.hudu);
},
autoAttackOpen: function() {
0 != this.isAutoAttack && this.automaticAttack();
},
currPlayerautoAttackOpen: function() {
0 != this.attackmodes && this.automaticAttack();
},
autoAttackClose: function() {
this.isAutoAttack = !1;
},
automaticAttack: function() {
this.nearestEnemy = this.findNearestEnemy();
if (this.nearestEnemy) {
this.angle = this.change_angle(this.currentplayer.position, this.nearestEnemy.position, -.1, -.1);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
}
},
collaborativeAttack: function(e, t, i, a, o, s) {
this.weaponAngle = a;
if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1) {
this.weaponAngle = a;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2) {
this.A_local = t;
this.A_newPos = i;
var r = e;
this.angle = 1 == r ? this.change_angle(this.currentplayer.position, this.A_local, o, s) : this.change_angle(this.currentplayer.position, this.A_newPos, o, s);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3) {
this.weaponAngle = a - n.cooperativeAttack_Level_3_Angle * this.CollaborativeAttack_Level_3_ratio;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
}
},
findNearestEnemy: function() {
var e = n.currEnemyPool;
if (!(e.length <= 0)) {
for (var t = this.scope, i = null, a = null, o = 0, s = cc.v2(this.currentplayer.x, this.currentplayer.y), r = 0; r < e.length; r++) for (var l = 0; l < e[r].length; l++) {
a = e[r][l];
if ((o = s.sub(a.getPosition()).mag()) < t) {
t = o;
i = a;
}
}
this.nearestEnemy = i;
return i;
}
},
change_angle: function(e, t, i, a) {
i = i || this.currentfollowingCameraPosX;
a = a || this.currentfollowingCameraPosY;
e.x -= i;
e.y -= a;
var o = t.x - e.x, s = 0;
n.isBossLevel && (s = 0 == this.isAutoAttack || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2 ? 188 : 0);
var r = t.y - e.y + s, l = cc.v2(o, r).signAngle(cc.v2(0, 1)) / Math.PI * 180;
l <= 0 && (l = 360 + l);
return -l;
},
abAngle: function(e, t) {
return ((e - t) % 360 + 540) % 360 - 180;
},
update_Camera_and_Bullet: function() {
if ((this.isTOUCH_START || this.touchendMoveCamera) && this.currentplayer && this.currentplayer) {
if (this.isTOUCH_START) {
1 == this.isTOUCH_ID ? this.angle = this.change_angle(this.currentplayer.position, this.local) : this.angle = this.change_angle(this.currentplayer.position, this.newPos);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.currentfollowingCameraPosX = cc.misc.lerp(this.currentfollowingCameraPosX, this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu), .25);
this.currentfollowingCameraPosY = cc.misc.lerp(this.currentfollowingCameraPosY, this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu), .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.currentfollowingCameraPosX, this.currentfollowingCameraPosY));
}
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatlingAttack && this.WeaponGatlingAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponIcegunAttack && this.WeaponIcegunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponFlamesAttack && this.WeaponFlamesAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponRailgunAttack && this.WeaponRailgunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponHowitzerAttack && this.WeaponHowitzerAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack && this.WeaponLaserCannonAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack3 && this.WeaponLaserCannonAttack3.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack5 && this.WeaponLaserCannonAttack5.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
}
}
if (!this.touchendMoveCamera) return;
if (this.touchendMoveCamera && this.gridmap) {
this.initFollowingCameraPosX = cc.misc.lerp(this.initFollowingCameraPosX, this.initFollowingCameraPos.x, .25);
this.initFollowingCameraPosY = cc.misc.lerp(this.initFollowingCameraPosY, this.initFollowingCameraPos.y, .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPosX, this.initFollowingCameraPosY));
if (Math.round(this.initFollowingCameraPosX) == this.initFollowingCameraPos.x && Math.round(this.initFollowingCameraPosY) == this.initFollowingCameraPos.y) {
this.touchendMoveCamera = !1;
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPos.x, this.initFollowingCameraPos.y));
}
}
}
},
start: function() {},
update: function(e) {
if (!n.getGamePaused() && !n.getIsGameOver()) {
this.selfdt = e;
this.initWeaponJudge() && this.update_Camera_and_Bullet();
n.ATTACKMODES == n.AUTOMATICATTACK && this.autoAttackOpen();
1 == this.attackmodes && this.currPlayerautoAttackOpen();
}
},
getCollaborativeAttack_Level_3_ratio: function(e) {
this.CollaborativeAttack_Level_3_ratio = e;
},
getCurrPlayerAttackModes: function(e) {
this.attackmodes = e;
this.initWeaponJudge();
},
set_BulletLeve: function(e) {
this.bulletLeve = e;
}
});
cc._RF.pop();
}, {
GameManager: "GameManager",
Helpers: "Helpers"
} ],
WeaponLaserCannon: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8951ejhg2VBnJlMFlDb7+1q", "WeaponLaserCannon");
var n = e("GameManager"), a = e("Helpers");
cc.Class({
extends: cc.Component,
properties: {
bulletLeve: 0,
oneBulletPos: cc.Vec2,
moreBulletPos: {
default: [],
type: cc.Vec2
},
bulletPrefab: null,
selfdt: null,
nearestEnemy: null,
isAutoAttack: !1
},
onLoad: function() {
this.initGetComponent();
this.initFollowingCameraVariable();
this.initFollowingCamera();
this.initCurrentplayer();
this.initCurrentplayerVariable();
this.initTouch();
this.initBullet();
},
initGetComponent: function() {
this.gridmap = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
this.audioMng = cc.find("Canvas/AudioMng").getComponent("AudioMng");
},
initFollowingCamera: function() {
if (this.gridmap) {
this.currentFollowingCamera = this.gridmap.getFollowingCamera();
this.currentFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.initFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.currentfollowingCameraPosX = this.currentFollowingCameraPos.x;
this.currentfollowingCameraPosY = this.currentFollowingCameraPos.y;
}
},
initFollowingCameraVariable: function() {
this.currentplayerCameranow_time = 0;
this.currentplayerCamerarate = 1;
this.currentplayerCameraspeed = 150;
this.lerpmoveCamera = .5;
this.touchendMoveCamera = !1;
},
initCurrentplayer: function() {
this.gridmap && this.initWeaponJudge() && (this.currentplayer = this.gridmap.getWeaponLaserCannonNode());
},
initCurrentplayerVariable: function() {
this.currentplayerAngle = 0;
this.offsetAngle = 0;
this.targetAngle = 0;
},
initTouch: function() {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_START, this.getBarbetteLocationAngle_start, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_END, this.resumeBarbetteLocationAngle, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_MOVE, this.getBarbetteLocationAngle_move, this);
},
initBullet: function() {
var e = this;
this.angle = 0;
this.bulletLeve = 1;
this.now_time = 0;
this.setAttackattribute();
this.islaunch = !1, this.oneBulletPosOffset = 25;
this.twoBulletPosOffset = 45;
this.threeBulletPos = 130;
this.threeBulletPosOffset = 46;
this.bulletPrefab || cc.loader.loadRes("MainGame/Bullet/Bullet1", function(t, i) {
t || (e.bulletPrefab = i);
});
},
setAttackattribute: function() {
var e = zy.dataMng.turretAttrData.getTurretAttr("20000");
if (e) {
this.attackRange = a.ToNumber(e.attackRange);
this.scope = a.ToNumber(e.autoAttackRange);
this.lerpratio = a.ToNumber(e.rotationSpeed);
this.walk_time = a.ToNumber(e.bulletAttackRate1);
this.bulletMoveSpeed1 = a.ToNumber(e.bulletMoveSpeed1);
this.bulletAttackMultiple = a.ToNumber(e.bulletAttackMultiple);
} else {
this.attackRange = 800;
this.scope = 600;
this.lerpratio = .5;
this.walk_time = .2;
this.bulletMoveSpeed1 = 2e3;
this.bulletAttackMultiple = 1;
}
},
initWeaponJudge: function() {
if (n.WEAPON_ID == n.WEAPON_LASERCANNON_1) {
if (1 == this.attackmodes) {
this.isAutoAttack = !1;
return !1;
}
this.isAutoAttack = !1;
return !0;
}
this.isAutoAttack = !0;
return !1;
},
getBarbetteLocationAngle_start: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.initFollowingCamera();
this.initCurrentplayer();
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !1;
this.local = cc.find("Canvas/map").convertToNodeSpaceAR(e.getLocation());
this.isTOUCH_ID = 1;
this.touchendMoveCamera = !1;
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatling = this.gridmap.getWeaponGatlingNode();
this.WeaponIcegun = this.gridmap.getWeaponIcegunNode();
this.WeaponFlames = this.gridmap.getWeaponFlamesNode();
this.WeaponRailgun = this.gridmap.getWeaponRailgunNode();
this.WeaponHowitzer = this.gridmap.getWeaponHowitzerNode();
this.WeaponLaserCannon3 = this.gridmap.getWeaponLaserCannonNode3();
this.WeaponLaserCannon5 = this.gridmap.getWeaponLaserCannonNode5();
this.WeaponLaserCannon7 = this.gridmap.getWeaponLaserCannonNode7();
this.WeaponLaserCannon3 && (this.WeaponLaserCannonAttack3 = this.WeaponLaserCannon3.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon0"));
this.WeaponLaserCannon5 && (this.WeaponLaserCannonAttack5 = this.WeaponLaserCannon5.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon1"));
this.WeaponLaserCannon7 && (this.WeaponLaserCannonAttack7 = this.WeaponLaserCannon7.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon2"));
this.WeaponGatling && (this.WeaponGatlingAttack = this.WeaponGatling.getChildByName("WeaponGatling").getComponent("WeaponGatling"));
this.WeaponIcegun && (this.WeaponIcegunAttack = this.WeaponIcegun.getChildByName("WeaponIcegun").getComponent("WeaponIcegun"));
this.WeaponFlames && (this.WeaponFlamesAttack = this.WeaponFlames.getChildByName("WeaponFlames").getComponent("WeaponFlames"));
this.WeaponRailgun && (this.WeaponRailgunAttack = this.WeaponRailgun.getChildByName("WeaponRailgun").getComponent("WeaponRailgun"));
this.WeaponHowitzer && (this.WeaponHowitzerAttack = this.WeaponHowitzer.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer"));
}
}
},
getBarbetteLocationAngle_move: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !0;
this.isTOUCH_END = !1;
var t = e.getTouches();
this.newPos = cc.find("Canvas/map").convertToNodeSpaceAR(t[0].getLocation());
this.isTOUCH_ID = 2;
this.touchendMoveCamera = !1;
}
},
resumeBarbetteLocationAngle: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.now_time = 0;
return;
}
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
this.now_time = 0;
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.touchendMoveCamera = !0;
if (!this.currentplayer) return;
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.initFollowingCameraPosX = this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu);
this.initFollowingCameraPosY = this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu);
}
}
},
bulletLeve_To_playbullet: function(e) {
var t = cc.v2(this.currentplayer.x + this.oneBulletPosOffset * Math.sin(e), this.currentplayer.y + this.oneBulletPosOffset * Math.cos(e));
this.moreBulletPos[0] = cc.v2(t.x + this.twoBulletPosOffset * Math.sin(e - 90), t.y + this.twoBulletPosOffset * Math.cos(e - 90));
this.moreBulletPos[1] = cc.v2(t.x + this.twoBulletPosOffset * Math.sin(e + 90), t.y + this.twoBulletPosOffset * Math.cos(e + 90));
var i = [];
if (this.now_time <= 0) {
this.audioMng && this.audioMng.playLaunchgun1Audio();
if (this.islaunch) {
i[0] = zy.nodePoolMng.getBullet("Bullet1");
this.currentplayer.parent.addChild(i[0], n.BULLET_SPECIAL_zIndex, "Bullet1");
i[0].position = this.moreBulletPos[0];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? i[0].getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : i[0].getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
i[0].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_LASERCANNON_1).player_Attack * this.bulletAttackMultiple);
i[0].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_LASERCANNON_1).player_ID);
i[0].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
i[0].getComponent("Bullets").setBulletAttackRange(this.attackRange);
i[0].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_LASERCANNON_1));
} else {
i[1] = zy.nodePoolMng.getBullet("Bullet1");
this.currentplayer.parent.addChild(i[1], n.BULLET_SPECIAL_zIndex, "Bullet1");
i[1].position = this.moreBulletPos[1];
n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1 || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3 ? i[1].getComponent("Bullets").setBulletAngle(this.currentplayer.angle) : i[1].getComponent("Bullets").setBulletAngle(this.currentplayerAngle);
i[1].getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_LASERCANNON_1).player_Attack * this.bulletAttackMultiple);
i[1].getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_LASERCANNON_1).player_ID);
i[1].getComponent("Bullets").setBulletSpeed(this.bulletMoveSpeed1);
i[1].getComponent("Bullets").setBulletAttackRange(this.attackRange);
i[1].getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_LASERCANNON_1));
}
}
this.now_time += this.selfdt;
if (this.now_time >= this.walk_time) {
this.now_time = 0;
this.islaunch = !this.islaunch;
}
},
currentPlayerAngle_To_bulletLeveplaybullet: function(e) {
var t = e;
this.currentplayer.angle = t;
this.hudu = Math.PI / 180 * -t;
this.bulletLeve_To_playbullet(this.hudu);
},
autoAttackOpen: function() {
0 != this.isAutoAttack && this.automaticAttack();
},
currPlayerautoAttackOpen: function() {
0 != this.attackmodes && this.automaticAttack();
},
autoAttackClose: function() {
this.isAutoAttack = !1;
},
automaticAttack: function() {
this.nearestEnemy = this.findNearestEnemy();
if (this.nearestEnemy) {
this.angle = this.change_angle(this.currentplayer.position, this.nearestEnemy.position, -.1, -.1);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
}
},
collaborativeAttack: function(e, t, i, a, o, s) {
this.weaponAngle = a;
if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_1) {
this.weaponAngle = a;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2) {
this.A_local = t;
this.A_newPos = i;
var r = e;
this.angle = 1 == r ? this.change_angle(this.currentplayer.position, this.A_local, o, s) : this.change_angle(this.currentplayer.position, this.A_newPos, o, s);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
} else if (n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_3) {
this.weaponAngle = a - n.cooperativeAttack_Level_3_Angle * this.CollaborativeAttack_Level_3_ratio;
this.currentPlayerAngle_To_bulletLeveplaybullet(this.weaponAngle);
}
},
findNearestEnemy: function() {
var e = n.currEnemyPool;
if (!(e.length <= 0)) {
for (var t = this.scope, i = null, a = null, o = 0, s = cc.v2(this.currentplayer.x, this.currentplayer.y), r = 0; r < e.length; r++) for (var l = 0; l < e[r].length; l++) {
a = e[r][l];
if ((o = s.sub(a.getPosition()).mag()) < t) {
t = o;
i = a;
}
}
this.nearestEnemy = i;
return i;
}
},
change_angle: function(e, t, i, a) {
i = i || this.currentfollowingCameraPosX;
a = a || this.currentfollowingCameraPosY;
e.x -= i;
e.y -= a;
var o = t.x - e.x, s = 0;
n.isBossLevel && (s = 0 == this.isAutoAttack || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2 ? 188 : 0);
var r = t.y - e.y + s, l = cc.v2(o, r).signAngle(cc.v2(0, 1)) / Math.PI * 180;
l <= 0 && (l = 360 + l);
return -l;
},
abAngle: function(e, t) {
return ((e - t) % 360 + 540) % 360 - 180;
},
update_Camera_and_Bullet: function() {
if ((this.isTOUCH_START || this.touchendMoveCamera) && this.currentplayer && this.currentplayer) {
if (this.isTOUCH_START) {
1 == this.isTOUCH_ID ? this.angle = this.change_angle(this.currentplayer.position, this.local) : this.angle = this.change_angle(this.currentplayer.position, this.newPos);
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.currentfollowingCameraPosX = cc.misc.lerp(this.currentfollowingCameraPosX, this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu), .25);
this.currentfollowingCameraPosY = cc.misc.lerp(this.currentfollowingCameraPosY, this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu), .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.currentfollowingCameraPosX, this.currentfollowingCameraPosY));
}
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponLaserCannonAttack3 && this.WeaponLaserCannonAttack3.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack5 && this.WeaponLaserCannonAttack5.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack7 && this.WeaponLaserCannonAttack7.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponGatlingAttack && this.WeaponGatlingAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponIcegunAttack && this.WeaponIcegunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponFlamesAttack && this.WeaponFlamesAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponRailgunAttack && this.WeaponRailgunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponHowitzerAttack && this.WeaponHowitzerAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
}
}
if (!this.touchendMoveCamera) return;
if (this.touchendMoveCamera && this.gridmap) {
this.initFollowingCameraPosX = cc.misc.lerp(this.initFollowingCameraPosX, this.initFollowingCameraPos.x, .25);
this.initFollowingCameraPosY = cc.misc.lerp(this.initFollowingCameraPosY, this.initFollowingCameraPos.y, .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPosX, this.initFollowingCameraPosY));
if (Math.round(this.initFollowingCameraPosX) == this.initFollowingCameraPos.x && Math.round(this.initFollowingCameraPosY) == this.initFollowingCameraPos.y) {
this.touchendMoveCamera = !1;
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPos.x, this.initFollowingCameraPos.y));
}
}
}
},
start: function() {},
update: function(e) {
if (!n.getGamePaused() && !n.getIsGameOver()) {
this.selfdt = e;
this.initWeaponJudge() && this.update_Camera_and_Bullet();
n.ATTACKMODES == n.AUTOMATICATTACK && this.autoAttackOpen();
1 == this.attackmodes && this.currPlayerautoAttackOpen();
}
},
getCollaborativeAttack_Level_3_ratio: function(e) {
this.CollaborativeAttack_Level_3_ratio = e;
},
getCurrPlayerAttackModes: function(e) {
this.attackmodes = e;
this.initWeaponJudge();
},
set_BulletLeve: function(e) {
this.bulletLeve = e;
}
});
cc._RF.pop();
}, {
GameManager: "GameManager",
Helpers: "Helpers"
} ],
WeaponRailgun: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f6a19VV+h5EQJqgLh3GnTRd", "WeaponRailgun");
var n = e("GameManager"), a = e("Helpers");
cc.Class({
extends: cc.Component,
properties: {
bulletLeve: 0,
oneBulletPos: cc.Vec2,
moreBulletPos: {
default: [],
type: cc.Vec2
},
bulletPrefab4_1: null,
bulletPrefab4_2: null,
selfdt: null,
nearestEnemy: null,
isAutoAttack: !1
},
onLoad: function() {
this.initGetComponent();
this.initFollowingCameraVariable();
this.initFollowingCamera();
this.initCurrentplayer();
this.initCurrentplayerVariable();
this.initTouch();
this.initBullet();
},
initGetComponent: function() {
this.gridmap = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
},
initFollowingCamera: function() {
if (this.gridmap) {
this.currentFollowingCamera = this.gridmap.getFollowingCamera();
this.currentFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.initFollowingCameraPos = this.gridmap.getTargetfollowingCameraPos();
this.currentfollowingCameraPosX = this.currentFollowingCameraPos.x;
this.currentfollowingCameraPosY = this.currentFollowingCameraPos.y;
}
},
initFollowingCameraVariable: function() {
this.currentplayerCameranow_time = 0;
this.currentplayerCamerarate = 1;
this.currentplayerCameraspeed = 150;
this.lerpmoveCamera = .5;
this.touchendMoveCamera = !1;
},
initCurrentplayer: function() {
this.gridmap && this.initWeaponJudge() && (this.currentplayer = this.gridmap.getWeaponRailgunNode());
},
initCurrentplayerVariable: function() {
this.currentplayerAngle = 0;
this.offsetAngle = 0;
this.targetAngle = 0;
},
initTouch: function() {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_START, this.getBarbetteLocationAngle_start, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_END, this.resumeBarbetteLocationAngle, this);
cc.find("Canvas/map").on(cc.Node.EventType.TOUCH_MOVE, this.getBarbetteLocationAngle_move, this);
},
initBullet: function() {
var e = this, t = n.getPlayersData(n.WEAPON_RAILGUN);
this.bulletLeve = t.player_StarLevel;
this.angle = 0;
this.now_time = 0;
this.walk_time = [];
this.bulletDarts = [];
this.setAttackattribute();
this.oneBulletPosOffset = 156;
this.twoBulletPosOffset = 30;
this.threeBulletPos = 130;
this.threeBulletPosOffset = 46;
this.bulletPrefab4_1 || cc.loader.loadRes("MainGame/Bullet/Bullet4_1", function(t, i) {
if (e.isValid) if (t) cc.log("Error url [" + t + "]"); else {
e.bulletPrefab4_1 = i;
if (e.bulletPrefab4_1) {
console.log("bulletPrefab4_1 initOK");
e.initBulletPrefab4_2();
}
}
});
},
initBulletPrefab4_2: function() {
var e = this;
this.bulletPrefab4_2 || cc.loader.loadRes("MainGame/Bullet/Bullet4_2", function(t, i) {
if (e.isValid) if (t) cc.log("Error url [" + t + "]"); else {
e.bulletPrefab4_2 = i;
if (e.bulletPrefab4_2) {
console.log("bulletPrefab4_2 initOK");
e.gun_4_ani_1();
}
}
});
},
gun_4_ani_1: function() {
var e = this.node.getComponent(cc.Animation);
e && e.play("gun_4_ani_1");
this.trackCircle = null;
this.bulletLeve_To_createButtet();
},
bulletLeve_To_createButtet: function() {
if (null == this.trackCircle) {
this.trackCircle = new cc.Node();
this.trackCircle.addComponent(cc.Sprite).spriteFrame = this.gridmap.getGunPlist().getSpriteFrame("gun_4_guidao");
this.currentplayer.parent.addChild(this.trackCircle, n.BULLET_zIndex, "Bullet4_Q");
}
1 == this.bulletLeve ? this.trackCircle.setScale(1.01) : 2 == this.bulletLeve ? this.trackCircle.setScale(1.13) : 3 == this.bulletLeve && this.trackCircle.setScale(1.26);
if (this.bulletDarts && this.bulletDarts.length > 0) {
for (var e = 0; e < this.bulletDarts.length; e++) this.bulletDarts[e].destroy();
this.bulletDarts = [];
}
if (this.bulletDarts.length <= 0) for (var t = 0; t < this.dartsNums; t++) {
var i = Math.PI / 180 * (360 * t / this.dartsNums - 30), a = this.orbitRadius * Math.cos(i) + 0, o = this.orbitRadius * Math.sin(i) + 0, s = cc.instantiate(this.bulletPrefab4_1);
this.currentplayer.parent.addChild(s, n.BULLET_zIndex, "Bullet4_1");
this.bulletDarts.push(s);
s.position = cc.v2(a, o);
s.getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_RAILGUN).player_Attack);
s.getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_RAILGUN).player_ID);
s.getComponent("Bullets").setBulletAttribute(i, this.orbitRadius, this.dartSpeed, t);
s.getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_RAILGUN));
s.getChildByName("Bullet").getComponent(cc.Sprite).spriteFrame = this.gridmap.getGunPlist().getSpriteFrame("gun4_bullet_" + this.bulletLeve);
s.getComponent(cc.Animation).play("gun_4_bullet_1");
}
},
bulletDartsRevolution: function(e) {
this.dartsRevolutionArray = e;
},
bulletLeve_To_createButtetrevolution: function() {
if (this.bulletDarts && this.bulletDarts.length >= this.dartsNums) {
this.now_time += this.selfdt;
if (this.now_time >= this.createRevolutionTime) {
this.now_time = 0;
zy.audioMng.playEffect(zy.audioMng.launchgun4Audio);
for (var e = 0; e < this.bulletDarts.length; e++) {
var t = this.dartsRevolutionArray[e], i = this.orbitRadius * Math.cos(t) + 0, a = this.orbitRadius * Math.sin(t) + 0, o = zy.nodePoolMng.getBullet("Bullet4_2");
this.currentplayer.parent.addChild(o, n.BULLET_zIndex - 1, "Bullet4_2");
n.currBulletPool.push(o);
o.position = cc.v2(i, a);
o.getComponent("Bullets").setBulletAttack(n.getPlayersData(n.WEAPON_RAILGUN).player_Attack);
o.getComponent("Bullets").setBulletId(n.getPlayersData(n.WEAPON_RAILGUN).player_ID + 60);
o.getComponent("Bullets").setBulletAttribute(t, this.orbitRadius, this.revolutionSpeed2, -1);
o.getComponent("Bullets").initdata(n.getPlayersData(n.WEAPON_RAILGUN));
o.getChildByName("Bullet").getComponent(cc.Sprite).spriteFrame = this.gridmap.getGunPlist().getSpriteFrame("gun4_bullet_" + this.bulletLeve);
o.getComponent(cc.Animation).play("gun_4_bullet_2");
}
}
}
},
setAttackattribute: function() {
this.dartsangle = 0;
this.dartscurrentplayerAngle = 0;
this.currentdartsangle = 0;
this.dartsoffsetAngle = 0;
this.dartstargetAngle = 0;
var e = zy.dataMng.turretAttrData.getTurretAttr((this.bulletLeve - 1 + 5e4).toString());
if (e) {
this.orbitRadius = a.ToNumber(e.orbitRadius);
this.dartsNums = a.ToNumber(e.dartsNumber);
this.dartSpeed = a.ToNumber(e.revolutionSpeed);
this.revolutionSpeed2 = a.ToNumber(e.shadowRevolutionSpeed);
this.createRevolutionTime = a.ToNumber(e.createCd);
this.createRevolutionNum = a.ToNumber(e.createNumber);
1 == this.bulletLeve ? this.lerpratio = .4 : 2 == this.bulletLeve ? this.lerpratio = .3 : 3 == this.bulletLeve && (this.lerpratio = .5);
} else if (1 == this.bulletLeve) {
this.lerpratio = .4;
this.scope = 900;
this.walk_time[0] = 3;
this.orbitRadius = 400;
this.dartsNums = 3;
this.dartSpeed = 30;
this.revolutionSpeed2 = 20;
this.createRevolutionTime = 4;
this.createRevolutionNum = 1;
} else if (2 == this.bulletLeve) {
this.lerpratio = .3;
this.scope = 900;
this.walk_time[1] = 4;
this.orbitRadius = 450;
this.dartsNums = 6;
this.dartSpeed = 30;
this.revolutionSpeed2 = 20;
this.createRevolutionTime = 3;
this.createRevolutionNum = 1;
} else if (3 == this.bulletLeve) {
this.lerpratio = .5;
this.scope = 900;
this.walk_time[2] = 10;
this.orbitRadius = 500;
this.dartsNums = 9;
this.dartSpeed = 30;
this.revolutionSpeed2 = 20;
this.createRevolutionTime = 2;
this.createRevolutionNum = 1;
}
},
initWeaponJudge: function() {
if (n.WEAPON_ID == n.WEAPON_RAILGUN) {
if (1 == this.attackmodes) {
this.isAutoAttack = !1;
return !1;
}
this.isAutoAttack = !1;
return !0;
}
this.isAutoAttack = !0;
return !1;
},
getBarbetteLocationAngle_start: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
n.isAutoDartsAttack = !1;
this.initFollowingCamera();
this.initCurrentplayer();
this.local = cc.v2(0, 0);
this.newPos = cc.v2(0, 0);
this.A_local = cc.v2(0, 0);
this.A_newPos = cc.v2(0, 0);
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !1;
this.local = cc.find("Canvas/map").convertToNodeSpaceAR(e.getLocation());
this.isTOUCH_ID = 1;
this.touchendMoveCamera = !1;
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatling = this.gridmap.getWeaponGatlingNode();
this.WeaponLaserCannon = this.gridmap.getWeaponLaserCannonNode();
this.WeaponLaserCannon3 = this.gridmap.getWeaponLaserCannonNode3();
this.WeaponLaserCannon5 = this.gridmap.getWeaponLaserCannonNode5();
this.WeaponLaserCannon7 = this.gridmap.getWeaponLaserCannonNode7();
this.WeaponIcegun = this.gridmap.getWeaponIcegunNode();
this.WeaponFlames = this.gridmap.getWeaponFlamesNode();
this.WeaponHowitzer = this.gridmap.getWeaponHowitzerNode();
this.WeaponGatling && (this.WeaponGatlingAttack = this.WeaponGatling.getChildByName("WeaponGatling").getComponent("WeaponGatling"));
this.WeaponLaserCannon && (this.WeaponLaserCannonAttack = this.WeaponLaserCannon.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon"));
this.WeaponLaserCannon3 && (this.WeaponLaserCannonAttack3 = this.WeaponLaserCannon3.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon0"));
this.WeaponLaserCannon5 && (this.WeaponLaserCannonAttack5 = this.WeaponLaserCannon5.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon1"));
this.WeaponLaserCannon7 && (this.WeaponLaserCannonAttack7 = this.WeaponLaserCannon7.getChildByName("WeaponLaserCannon").getComponent("WeaponLaserCannon2"));
this.WeaponIcegun && (this.WeaponIcegunAttack = this.WeaponIcegun.getChildByName("WeaponIcegun").getComponent("WeaponIcegun"));
this.WeaponFlames && (this.WeaponFlamesAttack = this.WeaponFlames.getChildByName("WeaponFlames").getComponent("WeaponFlames"));
this.WeaponHowitzer && (this.WeaponHowitzerAttack = this.WeaponHowitzer.getChildByName("WeaponHowitzer").getComponent("WeaponHowitzer"));
}
}
},
getBarbetteLocationAngle_move: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) return;
this.isTOUCH_START = !0;
this.isTOUCH_MOVE = !0;
this.isTOUCH_END = !1;
var t = e.getTouches();
this.newPos = cc.find("Canvas/map").convertToNodeSpaceAR(t[0].getLocation());
this.isTOUCH_ID = 2;
this.touchendMoveCamera = !1;
}
},
resumeBarbetteLocationAngle: function(e) {
if (this.initWeaponJudge()) {
if (0 == n.startOperatePlayer) {
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
n.isAutoDartsAttack = !0;
return;
}
this.WeaponIcegunAttack && this.WeaponIcegunAttack.resetAttack();
n.isAutoDartsAttack = !0;
this.isTOUCH_START = !1;
this.isTOUCH_MOVE = !1;
this.isTOUCH_END = !0;
this.isTOUCH_ID = -1;
this.touchendMoveCamera = !0;
if (!this.currentplayer) return;
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.initFollowingCameraPosX = this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu);
this.initFollowingCameraPosY = this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu);
}
}
},
bulletLeve_To_playbullet: function(e) {},
dartsManualAttack: function(e) {
if (this.bulletDarts && this.bulletDarts.length >= this.dartsNums) {
this.currentdartsangle = this.change_angle(cc.v2(0, 0), cc.v2(this.bulletDarts[0].position.x, this.bulletDarts[0].position.y));
this.dartscurrentplayerAngle = this.currentdartsangle;
this.dartsoffsetAngle = this.abAngle(this.currentdartsangle, e);
this.dartstargetAngle = this.dartscurrentplayerAngle - this.dartsoffsetAngle;
this.dartscurrentplayerAngle = cc.misc.lerp(this.dartscurrentplayerAngle, this.dartstargetAngle, this.lerpratio);
this.currentdartsangle = this.dartscurrentplayerAngle;
for (var t = 0; t < this.bulletDarts.length; t++) {
var i = Math.PI / 180 * (360 * t / this.dartsNums + e + 90);
this.dartsRevolutionArray[t] = i;
var n = this.orbitRadius * Math.cos(i) + 0, a = this.orbitRadius * Math.sin(i) + 0;
this.bulletDarts[t].setPosition(cc.v2(n, a));
this.bulletDarts[t].getComponent("Bullets").setBulletAttribute(i, this.orbitRadius, this.dartSpeed, t);
}
}
},
currentPlayerAngle_To_bulletLeveplaybullet: function(e) {
var t = e;
this.currentplayer.angle = t;
this.hudu = Math.PI / 180 * -t;
this.bulletLeve_To_playbullet(this.hudu);
},
autoAttackOpen: function() {
0 != this.isAutoAttack && this.automaticAttack();
},
currPlayerautoAttackOpen: function() {
0 != this.attackmodes && this.automaticAttack();
},
autoAttackClose: function() {
this.isAutoAttack = !1;
},
automaticAttack: function() {},
collaborativeAttack: function(e, t, i, n, a, o) {},
findNearestEnemy: function() {},
change_angle: function(e, t, i, a) {
i = i || this.currentfollowingCameraPosX;
a = a || this.currentfollowingCameraPosY;
e.x -= i;
e.y -= a;
var o = t.x - e.x, s = 0;
n.isBossLevel && (s = 0 == this.isAutoAttack || n.COLLABORATIVEATTACK_LEVEL == n.COLLABORATIVEATTACK_LEVEL_2 ? 188 : 0);
var r = t.y - e.y + s, l = cc.v2(o, r).signAngle(cc.v2(0, 1)) / Math.PI * 180;
l <= 0 && (l = 360 + l);
return -l;
},
abAngle: function(e, t) {
return ((e - t) % 360 + 540) % 360 - 180;
},
update_Camera_and_Bullet: function() {
if ((this.isTOUCH_START || this.touchendMoveCamera) && this.currentplayer && this.currentplayer) {
if (this.isTOUCH_START) {
if (1 == this.isTOUCH_ID) {
this.angle = this.change_angle(this.currentplayer.position, this.local);
this.dartsangle = this.change_angle(cc.v2(0, 0), this.local);
} else {
this.angle = this.change_angle(this.currentplayer.position, this.newPos);
this.dartsangle = this.change_angle(cc.v2(0, 0), this.newPos);
}
this.currentplayerAngle = this.currentplayer.angle;
this.offsetAngle = this.abAngle(this.currentplayer.angle, this.angle);
this.targetAngle = this.currentplayerAngle - this.offsetAngle;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, this.targetAngle, this.lerpratio);
this.currentplayer.angle = this.currentplayerAngle;
this.hudu = Math.PI / 180 * -this.currentplayerAngle;
this.bulletLeve_To_playbullet(this.hudu);
this.dartsManualAttack(this.dartsangle);
if (this.gridmap) {
this.attack_hudu = Math.PI / 180 * -this.angle;
this.currentfollowingCameraPosX = cc.misc.lerp(this.currentfollowingCameraPosX, this.initFollowingCameraPos.x + this.currentplayerCameraspeed * Math.sin(this.attack_hudu), .25);
this.currentfollowingCameraPosY = cc.misc.lerp(this.currentfollowingCameraPosY, this.initFollowingCameraPos.y + this.currentplayerCameraspeed * Math.cos(this.attack_hudu), .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.currentfollowingCameraPosX, this.currentfollowingCameraPosY));
}
if (n.ATTACKMODES == n.COLLABORATIVEATTACK) {
this.WeaponGatlingAttack && this.WeaponGatlingAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack && this.WeaponLaserCannonAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack3 && this.WeaponLaserCannonAttack3.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack5 && this.WeaponLaserCannonAttack5.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponLaserCannonAttack7 && this.WeaponLaserCannonAttack7.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponIcegunAttack && this.WeaponIcegunAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponFlamesAttack && this.WeaponFlamesAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
this.WeaponHowitzerAttack && this.WeaponHowitzerAttack.collaborativeAttack(this.isTOUCH_ID, this.local, this.newPos, this.currentplayerAngle, this.currentfollowingCameraPosX, this.currentfollowingCameraPosY);
}
}
if (!this.touchendMoveCamera) return;
if (this.touchendMoveCamera && this.gridmap) {
this.initFollowingCameraPosX = cc.misc.lerp(this.initFollowingCameraPosX, this.initFollowingCameraPos.x, .25);
this.initFollowingCameraPosY = cc.misc.lerp(this.initFollowingCameraPosY, this.initFollowingCameraPos.y, .25);
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPosX, this.initFollowingCameraPosY));
if (Math.round(this.initFollowingCameraPosX) == this.initFollowingCameraPos.x && Math.round(this.initFollowingCameraPosY) == this.initFollowingCameraPos.y) {
this.currentFollowingCamera.node.setPosition(cc.v2(this.initFollowingCameraPos.x, this.initFollowingCameraPos.y));
this.currentplayerAngle = this.currentplayerAngle % 360;
this.currentplayerAngle = cc.misc.lerp(this.currentplayerAngle, 0, .6);
this.currentplayer.angle = this.currentplayerAngle;
0 == this.currentplayer.angle && (this.touchendMoveCamera = !1);
}
}
}
},
start: function() {},
update: function(e) {
if (!n.getGamePaused() && !n.getIsGameOver()) {
this.selfdt = e;
this.initWeaponJudge() && this.update_Camera_and_Bullet();
n.isCreateDartsRevolution && this.bulletLeve_To_createButtetrevolution();
n.ATTACKMODES == n.AUTOMATICATTACK && this.autoAttackOpen();
1 == this.attackmodes && this.currPlayerautoAttackOpen();
}
},
getCollaborativeAttack_Level_3_ratio: function(e) {
this.CollaborativeAttack_Level_3_ratio = e;
},
getCurrPlayerAttackModes: function(e) {
this.attackmodes = e;
this.initWeaponJudge();
},
set_BulletLeve: function(e) {
this.bulletLeve = e;
this.setAttackattribute();
this.bulletLeve_To_createButtet();
},
set_RailBulletDartsRevolution: function(e) {
this.bulletDartsRevolution(e);
}
});
cc._RF.pop();
}, {
GameManager: "GameManager",
Helpers: "Helpers"
} ],
WeaponsItem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "b736f153x1G04z4mVBYyFy3", "WeaponsItem");
var n = e("GameManager");
cc.Class({
extends: cc.Component,
properties: {
bg: cc.Sprite,
state1: cc.Node,
state2: cc.Node,
state3: cc.Node,
playerData: null,
player_Name: "player_0",
player_ID: -1,
player_State: -1,
player_StarLevel: 1
},
init: function(e, t) {
this.initGetComponent();
this.playerData = e;
this.player_Name = e.player_Name;
this.player_ID = e.player_ID;
this.player_State = e.player_State;
this.player_StarLevel = e.player_StarLevel;
this.setItemState(e);
this.bg.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
this.bg.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
this.bg.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
this.bg.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancle, this);
this.delegate = t;
this.rootScrollView = this.delegate.node.parent.parent.getComponent(cc.ScrollView);
},
start: function() {
this._initTouchStatus();
},
touchStart: function(e) {
e.bubbles = !1;
this.startPos = e.getLocation();
return !0;
},
touchMove: function(e) {
var t = e.getLocation();
(Math.abs(t.x - this.startPos.x) > 5 || Math.abs(t.y - this.startPos.y) > 5) && (this.moved = !0);
if (null == this.newItemId && Math.abs(t.x - this.startPos.x) > 15) this.forbidBuild = !0; else {
if (Math.abs(t.y - this.startPos.y) > 15) {
if (this.forbidBuild) return;
this.rootScrollView.horizontal = !1;
if (null == this.newItemId) {
this.newItemId = this.player_ID;
this.gridmaps.weaponsNew.call(this.gridmaps, this.newItemId, t);
}
}
null != this.newItemId && this.gridmaps.weaponsTouchMove.call(this.gridmaps, this.newItemId, e.getDelta());
}
},
touchEnd: function(e) {
if (!this.moved) {
cc.log("click: player_ID == " + this.player_ID);
this.loadItem();
}
this.gridmaps.weaponsTouchEnd.call(this.gridmaps, this.newItemId);
this._initTouchStatus();
},
touchCancle: function(e) {
this.gridmaps.weaponsTouchCancle.call(this.gridmaps, this.newItemId);
this._initTouchStatus();
},
_initTouchStatus: function() {
this.startPos = cc.v2(0, 0);
this.rootScrollView.horizontal = !0;
this.forbidBuild = !1;
this.moved = !1;
this.newItemId = null;
},
initGetComponent: function() {
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
if (this.gridmaps) {
this.m_plist = this.gridmaps.getMainPlist();
this.g_plist = this.gridmaps.getGunPlist();
}
var e = this.state1.getChildByName("build_sprite");
this.star1sp = e.getComponent(cc.Sprite);
var t = this.state2.getChildByName("build").getChildByName("build_sprite");
this.star2sp = t.getComponent(cc.Sprite);
var i = this.state3.getChildByName("build").getChildByName("build_sprite");
this.star3sp = i.getComponent(cc.Sprite);
var n = this.state3.getChildByName("star");
this.star1 = n.getChildByName("star1").getComponent(cc.Sprite);
this.star2 = n.getChildByName("star2").getComponent(cc.Sprite);
this.star3 = n.getChildByName("star3").getComponent(cc.Sprite);
this.build = this.state3.getChildByName("build");
this.star = this.state3.getChildByName("star");
},
loadItem: function() {
zy.audioMng.playEffect(zy.audioMng.effSelectTower);
cc.log("点击了 == " + this.player_Name + " ID " + this.player_ID + " State " + this.player_State + " player_StarLevel " + this.player_StarLevel);
if (1 == this.player_State) {
cc.log("没有解锁");
this.gridmaps && this.gridmaps.unlockingCondition(this.playerData);
}
2 == this.player_State && cc.log("可以建造");
if (3 == this.player_State) {
cc.log("升级状态");
this.gridmaps && this.gridmaps.setUpgrade_bar(this.playerData);
this.delegate.updateItemSelectionbg(this.playerData);
}
},
setItemState: function(e) {
if (1 == e.player_State) {
this.bg && (this.bg.spriteFrame = this.m_plist.getSpriteFrame("upgrade_bg3"));
this.state1.active = !0;
this.state2.active = !1;
this.state3.active = !1;
this.star1sp && (e.player_ID == n.WEAPON_LASERCANNON_1 || e.player_ID == n.WEAPON_LASERCANNON_3 || e.player_ID == n.WEAPON_LASERCANNON_5 || e.player_ID == n.WEAPON_LASERCANNON_7 ? this.star1sp.spriteFrame = this.g_plist.getSpriteFrame("gun1_level_1_build") : e.player_ID == n.WEAPON_GATLING ? this.star1sp.spriteFrame = this.g_plist.getSpriteFrame("gun0_level_1_build") : e.player_ID == n.WEAPON_ICEGUN ? this.star1sp.spriteFrame = this.g_plist.getSpriteFrame("gun2_level_1_build") : e.player_ID == n.WEAPON_FLAMES ? this.star1sp.spriteFrame = this.g_plist.getSpriteFrame("gun3_level_1_build") : e.player_ID == n.WEAPON_RAILGUN ? this.star1sp.spriteFrame = this.g_plist.getSpriteFrame("gun4_level_1_build") : e.player_ID == n.WEAPON_HOWITZER && (this.star1sp.spriteFrame = this.g_plist.getSpriteFrame("gun5_level_1_build")));
} else if (2 == e.player_State) {
this.bg && (this.bg.spriteFrame = this.m_plist.getSpriteFrame("upgrade_bg4"));
this.state1.active = !1;
this.state2.active = !0;
this.state3.active = !1;
this.star2sp && (e.player_ID == n.WEAPON_LASERCANNON_1 || e.player_ID == n.WEAPON_LASERCANNON_3 || e.player_ID == n.WEAPON_LASERCANNON_5 || e.player_ID == n.WEAPON_LASERCANNON_7 ? this.star2sp.spriteFrame = this.g_plist.getSpriteFrame("gun1_level_" + e.player_StarLevel) : e.player_ID == n.WEAPON_GATLING ? this.star2sp.spriteFrame = this.g_plist.getSpriteFrame("gun0_level_" + e.player_StarLevel) : e.player_ID == n.WEAPON_ICEGUN ? this.star2sp.spriteFrame = this.g_plist.getSpriteFrame("gun2_level_" + e.player_StarLevel) : e.player_ID == n.WEAPON_FLAMES ? this.star2sp.spriteFrame = this.g_plist.getSpriteFrame("gun3_level_" + e.player_StarLevel) : e.player_ID == n.WEAPON_RAILGUN ? this.star2sp.spriteFrame = this.g_plist.getSpriteFrame("gun4_level_" + e.player_StarLevel) : e.player_ID == n.WEAPON_HOWITZER && (this.star2sp.spriteFrame = this.g_plist.getSpriteFrame("gun5_1level_" + e.player_StarLevel)));
} else if (3 == e.player_State) {
this.state1.active = !1;
this.state2.active = !1;
this.state3.active = !0;
if (1 == e.player_StarLevel) ; else if (2 == e.player_StarLevel) this.star2 && (this.star2.spriteFrame = this.m_plist.getSpriteFrame("upgrade_star1")); else if (3 == e.player_StarLevel) {
this.star2 && (this.star2.spriteFrame = this.m_plist.getSpriteFrame("upgrade_star1"));
this.star3 && (this.star3.spriteFrame = this.m_plist.getSpriteFrame("upgrade_star1"));
}
if (this.star3sp) if (e.player_ID == n.WEAPON_LASERCANNON_1 || e.player_ID == n.WEAPON_LASERCANNON_3 || e.player_ID == n.WEAPON_LASERCANNON_5 || e.player_ID == n.WEAPON_LASERCANNON_7) {
this.star3sp.spriteFrame = this.g_plist.getSpriteFrame("gun1_level_1");
this.build.setPosition(cc.v2(0, 0));
this.star.active = !1;
} else e.player_ID == n.WEAPON_GATLING ? this.star3sp.spriteFrame = this.g_plist.getSpriteFrame("gun0_level_" + e.player_StarLevel) : e.player_ID == n.WEAPON_ICEGUN ? this.star3sp.spriteFrame = this.g_plist.getSpriteFrame("gun2_level_" + e.player_StarLevel) : e.player_ID == n.WEAPON_FLAMES ? this.star3sp.spriteFrame = this.g_plist.getSpriteFrame("gun3_level_" + e.player_StarLevel) : e.player_ID == n.WEAPON_RAILGUN ? this.star3sp.spriteFrame = this.g_plist.getSpriteFrame("gun4_level_" + e.player_StarLevel) : e.player_ID == n.WEAPON_HOWITZER && (this.star3sp.spriteFrame = this.g_plist.getSpriteFrame("gun5_1level_" + e.player_StarLevel));
this.updateItemSelectionbg(e);
}
},
updateItemPlayer: function(e) {
this.playerData = e;
this.player_Name = e.player_Name;
this.player_ID = e.player_ID;
this.player_State = e.player_State;
this.player_StarLevel = e.player_StarLevel;
if (1 == e.player_StarLevel) ; else if (2 == e.player_StarLevel) {
if (this.star2) {
this.star2.spriteFrame = this.m_plist.getSpriteFrame("upgrade_star1");
cc.log("player_StarLevel。。。。改变UI" + e.player_StarLevel);
}
} else if (3 == e.player_StarLevel) {
this.star2 && (this.star2.spriteFrame = this.m_plist.getSpriteFrame("upgrade_star1"));
this.star3 && (this.star3.spriteFrame = this.m_plist.getSpriteFrame("upgrade_star1"));
}
},
updateItemSelectionbg: function(e) {
e.player_ID == n.WEAPON_GATLING ? this.bg && (this.bg.spriteFrame = this.m_plist.getSpriteFrame("upgrade_bg2")) : this.bg && (this.bg.spriteFrame = this.m_plist.getSpriteFrame("upgrade_bg1"));
}
});
cc._RF.pop();
}, {
GameManager: "GameManager"
} ],
WeaponsLayer: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "82f78B3xZBOopfkYG2CO/BA", "WeaponsLayer");
var n = e("GameManager");
cc.Class({
extends: cc.Component,
properties: {
itemPrefab: {
default: null,
type: cc.Prefab
},
initItemCount: 0,
view: cc.Node
},
init: function() {
this.initItemCount = n.WEAPON_TOTALNUM;
this.itemList = [];
this.initList();
},
initList: function() {
for (var e = [], t = [], i = [], a = 0; a < this.initItemCount; a++) {
var o = n.getPlayersData(a);
1 == o.player_State ? e.push(o) : 2 == o.player_State ? t.push(o) : 3 == o.player_State && i.push(o);
}
this.node.width = 140 * this.initItemCount;
for (var s = [].concat(t, i, e), r = 0; r < this.initItemCount; r++) {
var l = s[r], c = cc.instantiate(this.itemPrefab);
c.player_ID = l.player_ID;
c.player_State = l.player_State;
this.node.addChild(c);
c.x = 70 + 140 * r;
c.name = "guide_weapon_" + l.player_ID;
var h = c.getChildByName("bg").getComponent("WeaponsItem");
h.init(l, this);
this.itemList.push(h);
}
},
getTtemList: function() {
if (null != this.itemList) return this.itemList;
},
updateItemPlayer: function(e) {
var t = this.itemList;
if (!(this.itemList.length <= 0)) {
t[e.player_ID].updateItemPlayer(e);
}
},
updateItemSelectionbg: function(e) {
var t = this.itemList;
if (!(this.itemList.length <= 0)) {
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
if (this.gridmaps) {
this.m_plist = this.gridmaps.getMainPlist();
if (this.m_plist) {
var i = !0, n = !1, a = void 0;
try {
for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
var r = o.value;
r && 3 == r.player_State && (r.player_ID == e.player_ID ? r.getComponent(cc.Sprite).spriteFrame = this.m_plist.getSpriteFrame("upgrade_bg2") : r.getComponent(cc.Sprite).spriteFrame = this.m_plist.getSpriteFrame("upgrade_bg1"));
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && s.return && s.return();
} finally {
if (n) throw a;
}
}
}
}
}
}
});
cc._RF.pop();
}, {
GameManager: "GameManager"
} ],
Wone: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0bc6aXI2tRPkqfesdxDI8D2", "Wone");
cc.Class({
extends: e("WeaponBase"),
properties: {},
onLoad: function() {},
aaaaa: function() {
console.log("Wone aaaaa");
},
start: function() {},
update: function(e) {}
});
cc._RF.pop();
}, {
WeaponBase: "WeaponBase"
} ],
en: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "920c5VLzJxKjYCAoIUwUHym", "en");
t.exports = {
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
tip_free_coins_max: "Reached max number"
};
cc._RF.pop();
}, {} ],
globals: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "49123nIGRxBVZI5HjL/EYAv", "globals");
window.SCREEN_WIDTH = 750;
window.SCREEN_HEIGHT = 1334;
window.ENABLE_NET_DEBUGGER = !0;
cc._RF.pop();
}, {} ],
i18n: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "93789C/shtIL6entYsZPjee", "i18n");
var n = e("polyglot"), a = cc.sys.language;
cc.log("====lang: ", a);
"zh" !== a && (a = "en");
var o = e(a), s = new n({
phrases: o,
allowMissing: !0
});
t.exports = {
init: function(t) {
o = e(a = t);
s.replace(o);
},
t: function(e, t) {
return s.t(e, t);
}
};
cc._RF.pop();
}, {
polyglot: "polyglot"
} ],
newBuildEffectPop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a3dd0al+K1DQauRm64ND2PY", "newBuildEffectPop");
var n = e("./../Manager/GameManager");
cc.Class({
extends: cc.Component,
properties: {
bg: cc.Sprite,
icon: cc.Sprite
},
init: function(e) {
this.gridmaps = cc.find("Canvas/Gridmaps").getComponent("Gridmaps");
this.canClose = !1;
var t = e.pid, i = 0;
t == n.WEAPON_LASERCANNON_1 || t == n.WEAPON_LASERCANNON_3 || t == n.WEAPON_LASERCANNON_5 || t == n.WEAPON_LASERCANNON_7 ? i = 1 : t == n.WEAPON_GATLING ? i = 0 : t == n.WEAPON_ICEGUN ? i = 2 : t == n.WEAPON_FLAMES ? i = 3 : t == n.WEAPON_RAILGUN ? i = 4 : t == n.WEAPON_HOWITZER && (i = 5);
this.icon.spriteFrame = 5 == i ? this.gridmaps.getGunPlist().getSpriteFrame("gun" + i + "_1level_1") : this.gridmaps.getGunPlist().getSpriteFrame("gun" + i + "_level_1");
this.node.getComponent(cc.Animation).play("new_build_ani_show", 0);
},
start: function() {
zy.audioMng.playEffect(zy.audioMng.effGotNew);
},
closeCallback: function() {
if (this.canClose) {
this.canClose = !1;
this.node.getComponent(cc.Animation).play("new_build_ani_go", 0);
}
},
newShow: function() {
this.canClose = !0;
},
newGo: function() {
zy.director.closePop(this.popName);
if (1 == n.getLevel()) {
if (!cc.sys.localStorage.getItem("guide_step_0" + zy.constData.StaticKey.SaveDataVersion)) {
cc.sys.localStorage.setItem("guide_step_0" + zy.constData.StaticKey.SaveDataVersion, 1);
zy.guide.setOpenStatus(!0);
zy.guide.checkStatus();
zy.guide.setStep(0);
zy.guide.checkGuide();
}
}
}
});
cc._RF.pop();
}, {
"./../Manager/GameManager": "GameManager"
} ],
polyglot: [ function(e, t, i) {
(function(e) {
"use strict";
cc._RF.push(t, "69decSgpRlE1rzEKp0RzG3V", "polyglot");
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
(function(e, a) {
"function" == typeof define && define.amd ? define([], function() {
return a(e);
}) : "object" === ("undefined" == typeof i ? "undefined" : n(i)) ? t.exports = a(e) : e.Polyglot = a(e);
})("undefined" != typeof e ? e : void 0, function(e) {
var t = String.prototype.replace;
function i(e) {
e = e || {};
this.phrases = {};
this.extend(e.phrases || {});
this.currentLocale = e.locale || "en";
this.allowMissing = !!e.allowMissing;
this.warn = e.warn || y;
}
i.VERSION = "1.0.0";
i.prototype.locale = function(e) {
e && (this.currentLocale = e);
return this.currentLocale;
};
i.prototype.extend = function(e, t) {
var i;
for (var a in e) if (e.hasOwnProperty(a)) {
i = e[a];
t && (a = t + "." + a);
"object" === ("undefined" == typeof i ? "undefined" : n(i)) ? this.extend(i, a) : this.phrases[a] = i;
}
};
i.prototype.unset = function(e, t) {
var i;
if ("string" == typeof e) delete this.phrases[e]; else for (var a in e) if (e.hasOwnProperty(a)) {
i = e[a];
t && (a = t + "." + a);
"object" === ("undefined" == typeof i ? "undefined" : n(i)) ? this.unset(i, a) : delete this.phrases[a];
}
};
i.prototype.clear = function() {
this.phrases = {};
};
i.prototype.replace = function(e) {
this.clear();
this.extend(e);
};
i.prototype.t = function(e, t) {
var i, n;
"number" == typeof (t = null == t ? {} : t) && (t = {
smart_count: t
});
if ("string" == typeof this.phrases[e]) i = this.phrases[e]; else if ("string" == typeof t._) i = t._; else if (this.allowMissing) i = e; else {
this.warn('Missing translation for key: "' + e + '"');
n = e;
}
if ("string" == typeof i) {
t = f(t);
n = m(n = h(i, this.currentLocale, t.smart_count), t);
}
return n;
};
i.prototype.has = function(e) {
return e in this.phrases;
};
var a = "||||", o = {
chinese: function(e) {
return 0;
},
german: function(e) {
return 1 !== e ? 1 : 0;
},
french: function(e) {
return e > 1 ? 1 : 0;
},
russian: function(e) {
return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
},
czech: function(e) {
return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2;
},
polish: function(e) {
return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
},
icelandic: function(e) {
return e % 10 != 1 || e % 100 == 11 ? 1 : 0;
}
}, s = {
chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
french: [ "fr", "tl", "pt-br" ],
russian: [ "hr", "ru" ],
czech: [ "cs", "sk" ],
polish: [ "pl" ],
icelandic: [ "is" ]
};
function r(e) {
var t, i, n, a = {};
for (t in e) if (e.hasOwnProperty(t)) {
i = e[t];
for (n in i) a[i[n]] = t;
}
return a;
}
var l = /^\s+|\s+$/g;
function c(e) {
return t.call(e, l, "");
}
function h(e, t, i) {
var n;
return null != i && e ? c((n = e.split(a))[d(t, i)] || n[0]) : e;
}
function u(e) {
var t = r(s);
return t[e] || t.en;
}
function d(e, t) {
return o[u(e)](t);
}
var g = /\$/g, p = "$$$$";
function m(e, i) {
for (var n in i) if ("_" !== n && i.hasOwnProperty(n)) {
var a = i[n];
"string" == typeof a && (a = t.call(i[n], g, p));
e = t.call(e, new RegExp("%\\{" + n + "\\}", "g"), a);
}
return e;
}
function y(t) {
e.console && e.console.warn && e.console.warn("WARNING: " + t);
}
function f(e) {
var t = {};
for (var i in e) t[i] = e[i];
return t;
}
return i;
});
cc._RF.pop();
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {} ],
zh: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "87f1fs0gohHDIfNg4aePXbt", "zh");
t.exports = {
hero_yoke_heroInfo: "同时上阵武将均达到%{num}星",
hero_yoke_treasureInfo_1: "%{num}星%{hero}",
hero_yoke_treasureInfo_3: "%{star}星%{treasure}",
conquest_level_node_tips: "关卡%{level}未解锁",
conquest_tower_unlock: "通过关卡%{level}开启烽火台",
short_coins: "金币不足",
no_ad: "没有可用广告",
time_error: "本机时间错误",
max_counts: "领取次数最大值",
max_level: "已达到最大等级",
net_error: "网络错误",
start: "开始游戏",
up_star: "炮塔升星",
dmg: "火力",
need_two: "请返回主界面再建造一个炮塔",
short_time: "剩余可用时间不足",
counts_remain: "今日剩余次数: ",
sound: "音乐音效",
vibrate: "射击震动",
ph_get: "免费",
collect: "收集",
revive: "复活继续",
tip_free_coins_max: "当日领取已达最大次数"
};
cc._RF.pop();
}, {} ]
}, {}, [ "GameConfig", "Helpers", "Test", "globals", "InitScene", "ButtonSafe", "CSVParser", "Guide", "LabelInteger", "Loading", "Tip", "UtilsOther", "Algo", "Encrypt", "Md5", "en", "zh", "i18n", "polyglot", "GameHttp", "HttpProxy", "AniCallBack", "AudioMng", "Bullets", "CompleteUI", "EnemyData", "LevelData", "PlayerData", "ReadLocalData", "EffectMng", "Enemygenerator", "Enemys", "AimCallBack", "AttackModeCallBack", "AttackModeLayer", "WeaponsItem", "WeaponsLayer", "GameUI", "Gridmaps", "MainUI", "GameManager", "Map", "NodePoolMng", "NormalEffect", "Pagodabastion", "WeaponBase", "WeaponFlames", "WeaponGatling", "WeaponHowitzer", "WeaponIcegun", "WeaponLaserCannon", "WeaponLaserCannon0", "WeaponLaserCannon1", "WeaponLaserCannon2", "WeaponRailgun", "Wone", "Uigame", "BuyEnergyPop", "MiningPop", "MiningVideoPop", "OtherUpgradePop", "RevivePop", "SettingPop", "newBuildEffectPop", "Maininterface", "AFLogger", "AdHelper", "FBLogger", "LoggerHelper", "MKSystem", "OpenAdsHelper", "RangerLogger", "TrackingLogger", "UPLTV", "UPLTVAndroid", "UPLTVIos", "UpltvHelper", "Device", "Director", "ShaderUtils", "UI", "Button", "Label", "ListView", "Node", "PopBase", "ProgressBar", "Sprite", "BgColorData", "CoinsUpData", "ConstData", "CornerData", "DataBase", "DataMng", "EnemyAttrData", "HpUpData", "LevelsData", "LevelsEnemyWaveData", "TurretAttrData", "TurretData", "TurretPriceData", "TurretSecondData", "UpStarGotData", "UpStarNeedData", "UserData" ]);