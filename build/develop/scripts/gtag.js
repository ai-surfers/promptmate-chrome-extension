// Copyright 2012 Google Inc. All rights reserved.

(function () {
    var data = {
        resource: {
            version: "1",

            macros: [],
            tags: [],
            predicates: [],
            rules: [],
        },
        runtime: [],

        blob: { 1: "1" },
    };

    var aa,
        ba = function (a) {
            var b = 0;
            return function () {
                return b < a.length
                    ? { done: !1, value: a[b++] }
                    : { done: !0 };
            };
        },
        da =
            typeof Object.defineProperties == "function"
                ? Object.defineProperty
                : function (a, b, c) {
                      if (a == Array.prototype || a == Object.prototype)
                          return a;
                      a[b] = c.value;
                      return a;
                  },
        ea = function (a) {
            for (
                var b = [
                        "object" == typeof globalThis && globalThis,
                        a,
                        "object" == typeof window && window,
                        "object" == typeof self && self,
                        "object" == typeof global && global,
                    ],
                    c = 0;
                c < b.length;
                ++c
            ) {
                var d = b[c];
                if (d && d.Math == Math) return d;
            }
            throw Error("Cannot find global object");
        },
        fa = ea(this),
        ha = function (a, b) {
            if (b)
                a: {
                    for (
                        var c = fa, d = a.split("."), e = 0;
                        e < d.length - 1;
                        e++
                    ) {
                        var f = d[e];
                        if (!(f in c)) break a;
                        c = c[f];
                    }
                    var h = d[d.length - 1],
                        l = c[h],
                        m = b(l);
                    m != l &&
                        m != null &&
                        da(c, h, { configurable: !0, writable: !0, value: m });
                }
        };
    ha("Symbol", function (a) {
        if (a) return a;
        var b = function (f, h) {
            this.j = f;
            da(this, "description", {
                configurable: !0,
                writable: !0,
                value: h,
            });
        };
        b.prototype.toString = function () {
            return this.j;
        };
        var c = "jscomp_symbol_" + ((Math.random() * 1e9) >>> 0) + "_",
            d = 0,
            e = function (f) {
                if (this instanceof e)
                    throw new TypeError("Symbol is not a constructor");
                return new b(c + (f || "") + "_" + d++, f);
            };
        return e;
    });
    var g = function (a) {
            var b =
                typeof Symbol != "undefined" &&
                Symbol.iterator &&
                a[Symbol.iterator];
            if (b) return b.call(a);
            if (typeof a.length == "number") return { next: ba(a) };
            throw Error(String(a) + " is not an iterable or ArrayLike");
        },
        ja = function (a) {
            for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
            return c;
        },
        ka = function (a) {
            return a instanceof Array ? a : ja(g(a));
        },
        la =
            typeof Object.assign == "function"
                ? Object.assign
                : function (a, b) {
                      for (var c = 1; c < arguments.length; c++) {
                          var d = arguments[c];
                          if (d)
                              for (var e in d)
                                  Object.prototype.hasOwnProperty.call(d, e) &&
                                      (a[e] = d[e]);
                      }
                      return a;
                  };
    ha("Object.assign", function (a) {
        return a || la;
    });
    var ma =
            typeof Object.create == "function"
                ? Object.create
                : function (a) {
                      var b = function () {};
                      b.prototype = a;
                      return new b();
                  },
        na;
    if (typeof Object.setPrototypeOf == "function") na = Object.setPrototypeOf;
    else {
        var oa;
        a: {
            var qa = { a: !0 },
                ra = {};
            try {
                ra.__proto__ = qa;
                oa = ra.a;
                break a;
            } catch (a) {}
            oa = !1;
        }
        na = oa
            ? function (a, b) {
                  a.__proto__ = b;
                  if (a.__proto__ !== b)
                      throw new TypeError(a + " is not extensible");
                  return a;
              }
            : null;
    }
    var sa = na,
        ua = function (a, b) {
            a.prototype = ma(b.prototype);
            a.prototype.constructor = a;
            if (sa) sa(a, b);
            else
                for (var c in b)
                    if (c != "prototype")
                        if (Object.defineProperties) {
                            var d = Object.getOwnPropertyDescriptor(b, c);
                            d && Object.defineProperty(a, c, d);
                        } else a[c] = b[c];
            a.Vm = b.prototype;
        },
        va = function () {
            for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
                b[c - a] = arguments[c];
            return b;
        }; /*
    
     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var wa = this || self; /*
     jQuery (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license.
    */
    var xa = /\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,
        ya = function (a) {
            if (a == null) return String(a);
            var b = xa.exec(Object.prototype.toString.call(Object(a)));
            return b ? b[1].toLowerCase() : "object";
        },
        za = function (a, b) {
            return Object.prototype.hasOwnProperty.call(Object(a), b);
        },
        Aa = function (a) {
            if (!a || ya(a) != "object" || a.nodeType || a == a.window)
                return !1;
            try {
                if (
                    a.constructor &&
                    !za(a, "constructor") &&
                    !za(a.constructor.prototype, "isPrototypeOf")
                )
                    return !1;
            } catch (c) {
                return !1;
            }
            for (var b in a);
            return b === void 0 || za(a, b);
        },
        Ba = function (a, b) {
            var c = b || (ya(a) == "array" ? [] : {}),
                d;
            for (d in a)
                if (za(a, d)) {
                    var e = a[d];
                    ya(e) == "array"
                        ? (ya(c[d]) != "array" && (c[d] = []),
                          (c[d] = Ba(e, c[d])))
                        : Aa(e)
                        ? (Aa(c[d]) || (c[d] = {}), (c[d] = Ba(e, c[d])))
                        : (c[d] = e);
                }
            return c;
        };
    function Da() {
        for (var a = Fa, b = {}, c = 0; c < a.length; ++c) b[a[c]] = c;
        return b;
    }
    function Ga() {
        var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        a += a.toLowerCase() + "0123456789-_";
        return a + ".";
    }
    var Fa, Ha;
    function Ia(a) {
        Fa = Fa || Ga();
        Ha = Ha || Da();
        for (var b = [], c = 0; c < a.length; c += 3) {
            var d = c + 1 < a.length,
                e = c + 2 < a.length,
                f = a.charCodeAt(c),
                h = d ? a.charCodeAt(c + 1) : 0,
                l = e ? a.charCodeAt(c + 2) : 0,
                m = f >> 2,
                n = ((f & 3) << 4) | (h >> 4),
                p = ((h & 15) << 2) | (l >> 6),
                q = l & 63;
            e || ((q = 64), d || (p = 64));
            b.push(Fa[m], Fa[n], Fa[p], Fa[q]);
        }
        return b.join("");
    }
    function Ka(a) {
        function b(m) {
            for (; d < a.length; ) {
                var n = a.charAt(d++),
                    p = Ha[n];
                if (p != null) return p;
                if (!/^[\s\xa0]*$/.test(n))
                    throw Error("Unknown base64 encoding at char: " + n);
            }
            return m;
        }
        Fa = Fa || Ga();
        Ha = Ha || Da();
        for (var c = "", d = 0; ; ) {
            var e = b(-1),
                f = b(0),
                h = b(64),
                l = b(64);
            if (l === 64 && e === -1) return c;
            c += String.fromCharCode((e << 2) | (f >> 4));
            h !== 64 &&
                ((c += String.fromCharCode(((f << 4) & 240) | (h >> 2))),
                l !== 64 && (c += String.fromCharCode(((h << 6) & 192) | l)));
        }
    }
    var La = {};
    function Ma(a, b) {
        La[a] = La[a] || [];
        La[a][b] = !0;
    }
    function Na(a) {
        var b = La[a];
        if (!b || b.length === 0) return "";
        for (var c = [], d = 0, e = 0; e < b.length; e++)
            e % 8 === 0 && e > 0 && (c.push(String.fromCharCode(d)), (d = 0)),
                b[e] && (d |= 1 << e % 8);
        d > 0 && c.push(String.fromCharCode(d));
        return Ia(c.join("")).replace(/\.+$/, "");
    }
    function Oa() {
        for (var a = [], b = La.fdr || [], c = 0; c < b.length; c++)
            b[c] && a.push(c);
        return a.length > 0 ? a : void 0;
    }
    var Pa = [],
        Qa = {};
    function Ra(a) {
        return Pa[a] === void 0 ? !1 : Pa[a];
    }
    function Sa() {}
    function Ta(a) {
        return typeof a === "function";
    }
    function k(a) {
        return typeof a === "string";
    }
    function Ua(a) {
        return typeof a === "number" && !isNaN(a);
    }
    function Va(a) {
        return Array.isArray(a) ? a : [a];
    }
    function Wa(a, b) {
        if (a && Array.isArray(a))
            for (var c = 0; c < a.length; c++) if (a[c] && b(a[c])) return a[c];
    }
    function Xa(a, b) {
        if (!Ua(a) || !Ua(b) || a > b) (a = 0), (b = 2147483647);
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
    function Ya(a, b) {
        for (var c = new Za(), d = 0; d < a.length; d++) c.set(a[d], !0);
        for (var e = 0; e < b.length; e++) if (c.get(b[e])) return !0;
        return !1;
    }
    function z(a, b) {
        for (var c in a)
            Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c]);
    }
    function $a(a) {
        return (
            !!a &&
            (Object.prototype.toString.call(a) === "[object Arguments]" ||
                Object.prototype.hasOwnProperty.call(a, "callee"))
        );
    }
    function ab(a) {
        return Math.round(Number(a)) || 0;
    }
    function bb(a) {
        return "false" === String(a).toLowerCase() ? !1 : !!a;
    }
    function cb(a) {
        var b = [];
        if (Array.isArray(a))
            for (var c = 0; c < a.length; c++) b.push(String(a[c]));
        return b;
    }
    function db(a) {
        return a ? a.replace(/^\s+|\s+$/g, "") : "";
    }
    function eb() {
        return new Date(Date.now());
    }
    function fb() {
        return eb().getTime();
    }
    var Za = function () {
        this.prefix = "gtm.";
        this.values = {};
    };
    Za.prototype.set = function (a, b) {
        this.values[this.prefix + a] = b;
    };
    Za.prototype.get = function (a) {
        return this.values[this.prefix + a];
    };
    Za.prototype.contains = function (a) {
        return this.get(a) !== void 0;
    };
    function gb(a, b) {
        return a && a.hasOwnProperty("currencyCode") ? a.currencyCode : b;
    }
    function hb(a) {
        var b = a;
        return function () {
            if (b) {
                var c = b;
                b = void 0;
                try {
                    c();
                } catch (d) {}
            }
        };
    }
    function ib(a, b) {
        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
    }
    function jb(a, b) {
        for (var c = [], d = 0; d < a.length; d++)
            c.push(a[d]), c.push.apply(c, b[a[d]] || []);
        return c;
    }
    function kb(a, b) {
        return a.length >= b.length && a.substring(0, b.length) === b;
    }
    function lb(a, b) {
        return (
            a.length >= b.length &&
            a.substring(a.length - b.length, a.length) === b
        );
    }
    function mb(a, b) {
        for (var c = {}, d = c, e = a.split("."), f = 0; f < e.length - 1; f++)
            d = d[e[f]] = {};
        d[e[e.length - 1]] = b;
        return c;
    }
    var nb = /^\w{1,9}$/;
    function ob(a, b) {
        a = a || {};
        b = b || ",";
        var c = [];
        z(a, function (d, e) {
            nb.test(d) && e && c.push(d);
        });
        return c.join(b);
    }
    function pb(a, b) {
        function c() {
            e && ++d === b && (e(), (e = null), (c.done = !0));
        }
        var d = 0,
            e = a;
        c.done = !1;
        return c;
    }
    function qb(a) {
        if (!a) return a;
        var b = a;
        if (Ra(3))
            try {
                b = decodeURIComponent(a);
            } catch (d) {}
        var c = b.split(",");
        return c.length === 2 && c[0] === c[1] ? c[0] : a;
    } /*
    
     Copyright Google LLC
     SPDX-License-Identifier: Apache-2.0
    */
    var rb = globalThis.trustedTypes,
        sb;
    function tb() {
        var a = null;
        if (!rb) return a;
        try {
            var b = function (c) {
                return c;
            };
            a = rb.createPolicy("goog#html", {
                createHTML: b,
                createScript: b,
                createScriptURL: b,
            });
        } catch (c) {}
        return a;
    }
    function ub() {
        sb === void 0 && (sb = tb());
        return sb;
    }
    var vb = function (a) {
        this.j = a;
    };
    vb.prototype.toString = function () {
        return this.j + "";
    };
    var wb = /^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i;
    var xb = function (a) {
        this.j = a;
    };
    xb.prototype.toString = function () {
        return this.j + "";
    };
    var yb = Array.prototype.indexOf
        ? function (a, b) {
              return Array.prototype.indexOf.call(a, b, void 0);
          }
        : function (a, b) {
              if (typeof a === "string")
                  return typeof b !== "string" || b.length != 1
                      ? -1
                      : a.indexOf(b, 0);
              for (var c = 0; c < a.length; c++)
                  if (c in a && a[c] === b) return c;
              return -1;
          };
    function zb(a) {
        return a === null ? "null" : a === void 0 ? "undefined" : a;
    }
    var C = window,
        E = document,
        Ab = navigator;
    function Bb() {
        var a;
        try {
            a = Ab.serviceWorker;
        } catch (b) {
            return;
        }
        return a;
    }
    var Cb = E.currentScript,
        Db = Cb && Cb.src;
    function Eb(a, b) {
        var c = C[a];
        C[a] = c === void 0 ? b : c;
        return C[a];
    }
    function Fb(a) {
        return (Ab.userAgent || "").indexOf(a) !== -1;
    }
    var Gb = { async: 1, nonce: 1, onerror: 1, onload: 1, src: 1, type: 1 },
        Hb = { onload: 1, src: 1, width: 1, height: 1, style: 1 };
    function Ib(a, b, c) {
        b &&
            z(b, function (d, e) {
                d = d.toLowerCase();
                c.hasOwnProperty(d) || a.setAttribute(d, e);
            });
    }
    function Jb(a, b, c, d, e) {
        var f = E.createElement("script");
        Ib(f, d, Gb);
        f.type = "text/javascript";
        f.async = d && d.async === !1 ? !1 : !0;
        var h,
            l = zb(a),
            m = ub();
        h = new vb(m ? m.createScriptURL(l) : l);
        var n;
        if (h instanceof vb) n = h.j;
        else throw Error("");
        f.src = n;
        var p,
            q = (f.ownerDocument && f.ownerDocument.defaultView) || window;
        q = q === void 0 ? document : q;
        var r,
            t,
            v =
                (t = (r = "document" in q ? q.document : q).querySelector) ==
                null
                    ? void 0
                    : t.call(r, "script[nonce]");
        (p = v == null ? "" : v.nonce || v.getAttribute("nonce") || "") &&
            f.setAttribute("nonce", p);
        b && (f.onload = b);
        c && (f.onerror = c);
        if (e) e.appendChild(f);
        else {
            var u = E.getElementsByTagName("script")[0] || E.body || E.head;
            u.parentNode.insertBefore(f, u);
        }
        return f;
    }
    function Kb() {
        if (Db) {
            var a = Db.toLowerCase();
            if (a.indexOf("https://") === 0) return 2;
            if (a.indexOf("http://") === 0) return 3;
        }
        return 1;
    }
    function Lb(a, b, c, d, e) {
        var f;
        f = f === void 0 ? !0 : f;
        var h = e,
            l = !1;
        h || ((h = E.createElement("iframe")), (l = !0));
        Ib(h, c, Hb);
        d &&
            z(d, function (n, p) {
                h.dataset[n] = p;
            });
        f &&
            ((h.height = "0"),
            (h.width = "0"),
            (h.style.display = "none"),
            (h.style.visibility = "hidden"));
        a !== void 0 && (h.src = a);
        if (l) {
            var m = (E.body && E.body.lastChild) || E.body || E.head;
            m.parentNode.insertBefore(h, m);
        }
        b && (h.onload = b);
        return h;
    }
    var Mb = function (a, b, c, d) {
        var e = new Image(1, 1);
        Ib(e, d, {});
        e.onload = function () {
            e.onload = null;
            b && b();
        };
        e.onerror = function () {
            e.onerror = null;
            c && c();
        };
        e.src = a;
        return e;
    };
    function Nb(a, b, c, d) {
        a.addEventListener
            ? a.addEventListener(b, c, !!d)
            : a.attachEvent && a.attachEvent("on" + b, c);
    }
    function Ob(a, b) {
        E.removeEventListener
            ? E.removeEventListener(a, b, !1)
            : E.detachEvent && E.detachEvent("on" + a, b);
    }
    function G(a) {
        C.setTimeout(a, 0);
    }
    function Pb(a, b) {
        return a && b && a.attributes && a.attributes[b]
            ? a.attributes[b].value
            : null;
    }
    function Qb(a) {
        var b = a.innerText || a.textContent || "";
        b &&
            b !== " " &&
            ((b = b.replace(/^[\s\xa0]+/g, "")),
            (b = b.replace(/[\s\xa0]+$/g, "")));
        b && (b = b.replace(/(\xa0+|\s{2,}|\n|\r\t)/g, " "));
        return b;
    }
    function Rb(a) {
        var b = E.createElement("div"),
            c = b,
            d,
            e = zb("A<div>" + a + "</div>"),
            f = ub();
        d = new xb(f ? f.createHTML(e) : e);
        if (c.nodeType === 1 && /^(script|style)$/i.test(c.tagName))
            throw Error("");
        var h;
        if (d instanceof xb) h = d.j;
        else throw Error("");
        c.innerHTML = h;
        b = b.lastChild;
        for (var l = []; b && b.firstChild; )
            l.push(b.removeChild(b.firstChild));
        return l;
    }
    function Sb(a) {
        var b;
        try {
            b = Ab.sendBeacon && Ab.sendBeacon(a);
        } catch (c) {
            Ma("TAGGING", 15);
        }
        b || Mb(a);
    }
    function Tb(a, b) {
        try {
            return Ab.sendBeacon(a, b);
        } catch (c) {
            Ma("TAGGING", 15);
        }
        return !1;
    }
    var Ub = {
        cache: "no-store",
        credentials: "include",
        keepalive: !0,
        method: "POST",
        mode: "no-cors",
        redirect: "follow",
    };
    function Vb(a, b, c) {
        if (Wb()) {
            var d = Object.assign({}, Ub);
            b && (d.body = b);
            c &&
                (c.attributionReporting &&
                    (d.attributionReporting = c.attributionReporting),
                c.browsingTopics && (d.browsingTopics = c.browsingTopics));
            try {
                var e = C.fetch(a, d);
                e && e.catch(Sa);
                return !0;
            } catch (f) {}
        }
        if (c && c.noFallback) return !1;
        if (b) return Tb(a, b);
        Sb(a);
        return !0;
    }
    function Wb() {
        return typeof C.fetch === "function";
    }
    function Xb(a, b) {
        var c = a[b];
        c && typeof c.animVal === "string" && (c = c.animVal);
        return c;
    }
    function Yb() {
        var a = C.performance;
        if (a && Ta(a.now)) return a.now();
    }
    function Zb() {
        return C.performance || void 0;
    }
    var $b = function (a) {
        this.message = a;
    };
    function ac(a) {
        var b =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
                a
            ];
        return b === void 0
            ? new $b(
                  "Value " +
                      a +
                      " can not be encoded in web-safe base64 dictionary."
              )
            : b;
    }
    function bc(a) {
        switch (a) {
            case 1:
                return "1";
            case 2:
            case 4:
                return "0";
            default:
                return "-";
        }
    }
    var cc = /^[1-9a-zA-Z_-][1-9a-c][1-9a-v]\d$/;
    function dc(a, b) {
        for (var c = "", d = !0; a > 7; ) {
            var e = a & 31;
            a >>= 5;
            d ? (d = !1) : (e |= 32);
            c = "" + ac(e) + c;
        }
        a <<= 2;
        d || (a |= 32);
        return (c = "" + ac(a | b) + c);
    }
    var ec = (function () {
        function a(b) {
            return {
                toString: function () {
                    return b;
                },
            };
        }
        return {
            Xi: a("consent"),
            Eg: a("convert_case_to"),
            Fg: a("convert_false_to"),
            Gg: a("convert_null_to"),
            Hg: a("convert_true_to"),
            Ig: a("convert_undefined_to"),
            km: a("debug_mode_metadata"),
            ja: a("function"),
            Ff: a("instance_name"),
            Wj: a("live_only"),
            Xj: a("malware_disabled"),
            METADATA: a("metadata"),
            bk: a("original_activity_id"),
            ym: a("original_vendor_template_id"),
            xm: a("once_on_load"),
            Zj: a("once_per_event"),
            Xh: a("once_per_load"),
            Am: a("priority_override"),
            Bm: a("respected_consent_types"),
            hi: a("setup_tags"),
            yd: a("tag_id"),
            ni: a("teardown_tags"),
        };
    })();
    var Bc;
    var Cc = [],
        Dc = [],
        Ec = [],
        Fc = [],
        Gc = [],
        Hc = {},
        Ic,
        Jc;
    function Kc(a) {
        Jc = Jc || a;
    }
    function Mc(a) {}
    var Nc,
        Oc = [],
        Pc = [];
    function Qc(a, b, c) {
        try {
            return Ic(Rc(a, b, c));
        } catch (d) {
            JSON.stringify(a);
        }
        return 2;
    }
    function Sc(a) {
        var b = a[ec.ja];
        if (!b) throw Error("Error: No function name given for function call.");
        return !!Hc[b];
    }
    var Rc = function (a, b, c) {
            c = c || [];
            var d = {},
                e;
            for (e in a) a.hasOwnProperty(e) && (d[e] = Tc(a[e], b, c));
            return d;
        },
        Tc = function (a, b, c) {
            if (Array.isArray(a)) {
                var d;
                switch (a[0]) {
                    case "function_id":
                        return a[1];
                    case "list":
                        d = [];
                        for (var e = 1; e < a.length; e++)
                            d.push(Tc(a[e], b, c));
                        return d;
                    case "macro":
                        var f = a[1];
                        if (c[f]) return;
                        var h = Cc[f];
                        if (!h || b.isBlocked(h)) return;
                        c[f] = !0;
                        var l = String(h[ec.Ff]);
                        try {
                            var m = Rc(h, b, c);
                            m.vtp_gtmEventId = b.id;
                            b.priorityId &&
                                (m.vtp_gtmPriorityId = b.priorityId);
                            d = Uc(m, { event: b, index: f, type: 2, name: l });
                            Nc && (d = Nc.wk(d, m));
                        } catch (y) {
                            b.logMacroError && b.logMacroError(y, Number(f), l),
                                (d = !1);
                        }
                        c[f] = !1;
                        return d;
                    case "map":
                        d = {};
                        for (var n = 1; n < a.length; n += 2)
                            d[Tc(a[n], b, c)] = Tc(a[n + 1], b, c);
                        return d;
                    case "template":
                        d = [];
                        for (var p = !1, q = 1; q < a.length; q++) {
                            var r = Tc(a[q], b, c);
                            Jc && (p = p || Jc.kl(r));
                            d.push(r);
                        }
                        return Jc && p ? Jc.zk(d) : d.join("");
                    case "escape":
                        d = Tc(a[1], b, c);
                        if (
                            Jc &&
                            Array.isArray(a[1]) &&
                            a[1][0] === "macro" &&
                            Jc.ml(a)
                        )
                            return Jc.Fl(d);
                        d = String(d);
                        for (var t = 2; t < a.length; t++)
                            lc[a[t]] && (d = lc[a[t]](d));
                        return d;
                    case "tag":
                        var v = a[1];
                        if (!Fc[v])
                            throw Error(
                                "Unable to resolve tag reference " + v + "."
                            );
                        return { vi: a[2], index: v };
                    case "zb":
                        var u = { arg0: a[2], arg1: a[3], ignore_case: a[5] };
                        u[ec.ja] = a[1];
                        var w = Qc(u, b, c),
                            x = !!a[4];
                        return x || w !== 2 ? x !== (w === 1) : null;
                    default:
                        throw Error(
                            "Attempting to expand unknown Value type: " +
                                a[0] +
                                "."
                        );
                }
            }
            return a;
        },
        Uc = function (a, b) {
            var c = a[ec.ja],
                d = b && b.event;
            if (!c)
                throw Error("Error: No function name given for function call.");
            var e = Hc[c],
                f =
                    b &&
                    b.type === 2 &&
                    (d == null ? void 0 : d.reportMacroDiscrepancy) &&
                    e &&
                    Oc.indexOf(c) !== -1,
                h = {},
                l;
            for (l in a)
                a.hasOwnProperty(l) && kb(l, "vtp_") && e && (h[l] = a[l]);
            e &&
                d &&
                d.cachedModelValues &&
                (h.vtp_gtmCachedValues = d.cachedModelValues);
            if (b) {
                if (b.name == null) {
                    var m;
                    a: {
                        var n = b.type,
                            p = b.index;
                        if (p == null) m = "";
                        else {
                            var q;
                            switch (n) {
                                case 2:
                                    q = Cc[p];
                                    break;
                                case 1:
                                    q = Fc[p];
                                    break;
                                default:
                                    m = "";
                                    break a;
                            }
                            var r = q && q[ec.Ff];
                            m = r ? String(r) : "";
                        }
                    }
                    b.name = m;
                }
                e &&
                    ((h.vtp_gtmEntityIndex = b.index),
                    (h.vtp_gtmEntityName = b.name));
            }
            var t, v, u;
            if (f && Pc.indexOf(c) === -1) {
                Pc.push(c);
                var w = fb();
                t = e(h);
                var x = fb() - w,
                    y = fb();
                v = Bc(c, b);
                u = x - (fb() - y);
            } else if ((e && (t = e(h)), !e || f)) v = Bc(c, b);
            if (f && d) {
                d.reportMacroDiscrepancy(d.id, c, void 0, !0);
                var A;
                a: {
                    var B = t;
                    if (B == void 0 || Array.isArray(B) || Aa(B)) A = !0;
                    else {
                        switch (typeof B) {
                            case "boolean":
                            case "number":
                            case "string":
                            case "function":
                                A = !0;
                                break a;
                        }
                        A = !1;
                    }
                }
                A
                    ? (Array.isArray(t)
                          ? Array.isArray(v)
                          : Aa(t)
                          ? Aa(v)
                          : typeof t === "function"
                          ? typeof v === "function"
                          : t === v) || d.reportMacroDiscrepancy(d.id, c)
                    : t !== v && d.reportMacroDiscrepancy(d.id, c);
                u !== void 0 && d.reportMacroDiscrepancy(d.id, c, u);
            }
            return e ? t : v;
        };
    var Vc = function (a, b, c) {
        var d;
        d = Error.call(this, c);
        this.message = d.message;
        "stack" in d && (this.stack = d.stack);
        this.permissionId = a;
        this.parameters = b;
        this.name = "PermissionError";
    };
    ua(Vc, Error);
    Vc.prototype.getMessage = function () {
        return this.message;
    };
    function Wc(a) {
        function b(r) {
            for (var t = 0; t < r.length; t++) d[r[t]] = !0;
        }
        for (var c = [], d = [], e = Xc(a), f = 0; f < Dc.length; f++) {
            var h = Dc[f],
                l = Yc(h, e);
            if (l) {
                for (var m = h.add || [], n = 0; n < m.length; n++)
                    c[m[n]] = !0;
                b(h.block || []);
            } else l === null && b(h.block || []);
        }
        for (var p = [], q = 0; q < Fc.length; q++)
            c[q] && !d[q] && (p[q] = !0);
        return p;
    }
    function Yc(a, b) {
        for (var c = a["if"] || [], d = 0; d < c.length; d++) {
            var e = b(c[d]);
            if (e === 0) return !1;
            if (e === 2) return null;
        }
        for (var f = a.unless || [], h = 0; h < f.length; h++) {
            var l = b(f[h]);
            if (l === 2) return null;
            if (l === 1) return !1;
        }
        return !0;
    }
    function Xc(a) {
        var b = [];
        return function (c) {
            b[c] === void 0 && (b[c] = Qc(Ec[c], a));
            return b[c];
        };
    }
    var Zc = {
        wk: function (a, b) {
            b[ec.Eg] &&
                typeof a === "string" &&
                (a = b[ec.Eg] === 1 ? a.toLowerCase() : a.toUpperCase());
            b.hasOwnProperty(ec.Gg) && a === null && (a = b[ec.Gg]);
            b.hasOwnProperty(ec.Ig) && a === void 0 && (a = b[ec.Ig]);
            b.hasOwnProperty(ec.Hg) && a === !0 && (a = b[ec.Hg]);
            b.hasOwnProperty(ec.Fg) && a === !1 && (a = b[ec.Fg]);
            return a;
        },
    };
    function $c(a, b, c) {
        if (a)
            for (var d = 0; d < a.length; d++) {
                var e = void 0,
                    f = "A policy function denied the permission request";
                try {
                    (e = a[d]("", b, c)), (f += ".");
                } catch (h) {
                    f =
                        typeof h === "string"
                            ? f + (": " + h)
                            : h instanceof Error
                            ? f + (": " + h.message)
                            : f + ".";
                }
                if (!e) throw new Vc(b, c, f);
            }
    }
    function ad(a) {
        var b = (void 0).Om();
        return function () {
            var c = arguments[0];
            if (c) {
                var d = b.j(c),
                    e = b.j("all");
                if (d || e) {
                    var f = a.apply(
                        void 0,
                        Array.prototype.slice.call(arguments, 0)
                    );
                    $c(d, c, f);
                    $c(e, c, f);
                }
            }
        };
    }
    var gd = {},
        hd =
            ((gd.uaa = !0),
            (gd.uab = !0),
            (gd.uafvl = !0),
            (gd.uamb = !0),
            (gd.uam = !0),
            (gd.uap = !0),
            (gd.uapv = !0),
            (gd.uaw = !0),
            gd);
    var qd = [
            "matches",
            "webkitMatchesSelector",
            "mozMatchesSelector",
            "msMatchesSelector",
            "oMatchesSelector",
        ],
        rd = new Za();
    var K = {
            g: {
                ka: "ad_personalization",
                M: "ad_storage",
                K: "ad_user_data",
                P: "analytics_storage",
                Wd: "region",
                Ib: "consent_updated",
                zg: "wait_for_update",
                aj: "app_remove",
                bj: "app_store_refund",
                cj: "app_store_subscription_cancel",
                dj: "app_store_subscription_convert",
                ej: "app_store_subscription_renew",
                fj: "consent_update",
                Lg: "add_payment_info",
                Mg: "add_shipping_info",
                ic: "add_to_cart",
                jc: "remove_from_cart",
                Ng: "view_cart",
                Jb: "begin_checkout",
                kc: "select_item",
                Za: "view_item_list",
                vb: "select_promotion",
                ab: "view_promotion",
                Da: "purchase",
                mc: "refund",
                Ja: "view_item",
                Og: "add_to_wishlist",
                gj: "exception",
                ij: "first_open",
                jj: "first_visit",
                W: "gtag.config",
                Na: "gtag.get",
                kj: "in_app_purchase",
                Kb: "page_view",
                lj: "screen_view",
                mj: "session_start",
                nj: "timing_complete",
                oj: "track_social",
                Oc: "user_engagement",
                pj: "user_id_update",
                Pc: "gclid_link_decoration_source",
                Qc: "gclid_storage_source",
                cb: "gclgb",
                Oa: "gclid",
                Xd: "gclgs",
                Yd: "gcllp",
                Zd: "gclst",
                aa: "ads_data_redaction",
                Pg: "gad_source",
                Qg: "gad_source_src",
                Rc: "gclid_url",
                Rg: "gclsrc",
                ef: "gbraid",
                ae: "wbraid",
                da: "allow_ad_personalization_signals",
                ff: "allow_custom_scripts",
                Sc: "allow_direct_google_requests",
                hf: "allow_display_features",
                be: "allow_enhanced_conversions",
                eb: "allow_google_signals",
                ya: "allow_interest_groups",
                qj: "app_id",
                rj: "app_installer_id",
                sj: "app_name",
                tj: "app_version",
                wb: "auid",
                uj: "auto_detection_enabled",
                Lb: "aw_remarketing",
                jf: "aw_remarketing_only",
                ce: "discount",
                de: "aw_feed_country",
                ee: "aw_feed_language",
                X: "items",
                fe: "aw_merchant_id",
                Sg: "aw_basket_type",
                Tc: "campaign_content",
                Uc: "campaign_id",
                Vc: "campaign_medium",
                Wc: "campaign_name",
                Xc: "campaign",
                Yc: "campaign_source",
                Zc: "campaign_term",
                fb: "client_id",
                Tg: "rnd",
                kf: "consent_update_type",
                vj: "content_group",
                wj: "content_type",
                Sa: "conversion_cookie_prefix",
                bd: "conversion_id",
                la: "conversion_linker",
                Ug: "conversion_linker_disabled",
                Mb: "conversion_api",
                he: "cookie_deprecation",
                Ka: "cookie_domain",
                La: "cookie_expires",
                Pa: "cookie_flags",
                nc: "cookie_name",
                ib: "cookie_path",
                Ea: "cookie_prefix",
                Nb: "cookie_update",
                oc: "country",
                qa: "currency",
                ie: "customer_lifetime_value",
                dd: "custom_map",
                lf: "gcldc",
                ed: "dclid",
                xj: "debug_mode",
                ba: "developer_id",
                yj: "disable_merchant_reported_purchases",
                fd: "dc_custom_params",
                zj: "dc_natural_search",
                Vg: "dynamic_event_settings",
                Wg: "affiliation",
                je: "checkout_option",
                nf: "checkout_step",
                Xg: "coupon",
                gd: "item_list_name",
                pf: "list_name",
                Aj: "promotions",
                hd: "shipping",
                qf: "tax",
                ke: "engagement_time_msec",
                me: "enhanced_client_id",
                ne: "enhanced_conversions",
                Yg: "enhanced_conversions_automatic_settings",
                oe: "estimated_delivery_date",
                rf: "euid_logged_in_state",
                jd: "event_callback",
                Bj: "event_category",
                jb: "event_developer_id_string",
                Cj: "event_label",
                qc: "event",
                pe: "event_settings",
                qe: "event_timeout",
                Dj: "description",
                Ej: "fatal",
                Fj: "experiments",
                tf: "firebase_id",
                rc: "first_party_collection",
                se: "_x_20",
                kb: "_x_19",
                Zg: "fledge_drop_reason",
                ah: "fledge",
                bh: "flight_error_code",
                eh: "flight_error_message",
                fh: "fl_activity_category",
                gh: "fl_activity_group",
                uf: "fl_advertiser_id",
                hh: "fl_ar_dedupe",
                vf: "match_id",
                ih: "fl_random_number",
                jh: "tran",
                kh: "u",
                te: "gac_gclid",
                sc: "gac_wbraid",
                lh: "gac_wbraid_multiple_conversions",
                mh: "ga_restrict_domain",
                nh: "ga_temp_client_id",
                Gj: "ga_temp_ecid",
                uc: "gdpr_applies",
                oh: "geo_granularity",
                xb: "value_callback",
                lb: "value_key",
                vc: "_google_ng",
                wc: "google_signals",
                ph: "google_tld",
                ue: "groups",
                qh: "gsa_experiment_id",
                rh: "gtm_up",
                yb: "iframe_state",
                kd: "ignore_referrer",
                wf: "internal_traffic_results",
                zb: "is_legacy_converted",
                Ab: "is_legacy_loaded",
                ve: "is_passthrough",
                xc: "_lps",
                Ma: "language",
                we: "legacy_developer_id_string",
                ma: "linker",
                yc: "accept_incoming",
                ob: "decorate_forms",
                R: "domains",
                Bb: "url_position",
                Hj: "merchant_feed_label",
                Ij: "merchant_feed_language",
                Jj: "merchant_id",
                sh: "method",
                Kj: "name",
                ld: "new_customer",
                th: "non_interaction",
                Lj: "optimize_id",
                uh: "page_hostname",
                md: "page_path",
                za: "page_referrer",
                Ta: "page_title",
                vh: "passengers",
                wh: "phone_conversion_callback",
                Mj: "phone_conversion_country_code",
                xh: "phone_conversion_css_class",
                Nj: "phone_conversion_ids",
                yh: "phone_conversion_number",
                zh: "phone_conversion_options",
                xf: "_protected_audience_enabled",
                nd: "quantity",
                xe: "redact_device_info",
                yf: "referral_exclusion_definition",
                Ob: "restricted_data_processing",
                Oj: "retoken",
                Pj: "sample_rate",
                zf: "screen_name",
                Cb: "screen_resolution",
                Ah: "_script_source",
                Qj: "search_term",
                Fa: "send_page_view",
                Pb: "send_to",
                zc: "server_container_url",
                od: "session_duration",
                ye: "session_engaged",
                Af: "session_engaged_time",
                pb: "session_id",
                ze: "session_number",
                Ae: "_shared_user_id",
                pd: "delivery_postal_code",
                mm: "temporary_client_id",
                Bf: "topmost_url",
                Rj: "tracking_id",
                Cf: "traffic_type",
                ra: "transaction_id",
                Db: "transport_url",
                Bh: "trip_type",
                Qb: "update",
                Qa: "url_passthrough",
                Be: "_user_agent_architecture",
                Ce: "_user_agent_bitness",
                De: "_user_agent_full_version_list",
                Ee: "_user_agent_mobile",
                Fe: "_user_agent_model",
                Ge: "_user_agent_platform",
                He: "_user_agent_platform_version",
                Ie: "_user_agent_wow64",
                Aa: "user_data",
                Ch: "user_data_auto_latency",
                Dh: "user_data_auto_meta",
                Eh: "user_data_auto_multi",
                Fh: "user_data_auto_selectors",
                Gh: "user_data_auto_status",
                qd: "user_data_mode",
                Je: "user_data_settings",
                sa: "user_id",
                Ua: "user_properties",
                Hh: "_user_region",
                Ke: "us_privacy_string",
                fa: "value",
                Ih: "wbraid_multiple_conversions",
                Bc: "_fpm_parameters",
                Ph: "_host_name",
                Qh: "_in_page_command",
                Rh: "_ip_override",
                Sh: "_is_passthrough_cid",
                qb: "non_personalized_ads",
                xd: "_sst_parameters",
                hb: "conversion_label",
                na: "page_location",
                nb: "global_developer_id_string",
                Ac: "tc_privacy_string",
            },
        },
        yd = {},
        zd = Object.freeze(
            ((yd[K.g.da] = 1),
            (yd[K.g.hf] = 1),
            (yd[K.g.be] = 1),
            (yd[K.g.eb] = 1),
            (yd[K.g.X] = 1),
            (yd[K.g.Ka] = 1),
            (yd[K.g.La] = 1),
            (yd[K.g.Pa] = 1),
            (yd[K.g.nc] = 1),
            (yd[K.g.ib] = 1),
            (yd[K.g.Ea] = 1),
            (yd[K.g.Nb] = 1),
            (yd[K.g.dd] = 1),
            (yd[K.g.ba] = 1),
            (yd[K.g.Vg] = 1),
            (yd[K.g.jd] = 1),
            (yd[K.g.pe] = 1),
            (yd[K.g.qe] = 1),
            (yd[K.g.rc] = 1),
            (yd[K.g.mh] = 1),
            (yd[K.g.wc] = 1),
            (yd[K.g.ph] = 1),
            (yd[K.g.ue] = 1),
            (yd[K.g.wf] = 1),
            (yd[K.g.zb] = 1),
            (yd[K.g.Ab] = 1),
            (yd[K.g.ma] = 1),
            (yd[K.g.yf] = 1),
            (yd[K.g.Ob] = 1),
            (yd[K.g.Fa] = 1),
            (yd[K.g.Pb] = 1),
            (yd[K.g.zc] = 1),
            (yd[K.g.od] = 1),
            (yd[K.g.Af] = 1),
            (yd[K.g.pd] = 1),
            (yd[K.g.Db] = 1),
            (yd[K.g.Qb] = 1),
            (yd[K.g.Je] = 1),
            (yd[K.g.Ua] = 1),
            (yd[K.g.xd] = 1),
            yd)
        );
    Object.freeze([
        K.g.na,
        K.g.za,
        K.g.Ta,
        K.g.Ma,
        K.g.zf,
        K.g.sa,
        K.g.tf,
        K.g.vj,
    ]);
    var Ad = {},
        Bd = Object.freeze(
            ((Ad[K.g.aj] = 1),
            (Ad[K.g.bj] = 1),
            (Ad[K.g.cj] = 1),
            (Ad[K.g.dj] = 1),
            (Ad[K.g.ej] = 1),
            (Ad[K.g.ij] = 1),
            (Ad[K.g.jj] = 1),
            (Ad[K.g.kj] = 1),
            (Ad[K.g.mj] = 1),
            (Ad[K.g.Oc] = 1),
            Ad)
        ),
        Cd = {},
        Dd = Object.freeze(
            ((Cd[K.g.Lg] = 1),
            (Cd[K.g.Mg] = 1),
            (Cd[K.g.ic] = 1),
            (Cd[K.g.jc] = 1),
            (Cd[K.g.Ng] = 1),
            (Cd[K.g.Jb] = 1),
            (Cd[K.g.kc] = 1),
            (Cd[K.g.Za] = 1),
            (Cd[K.g.vb] = 1),
            (Cd[K.g.ab] = 1),
            (Cd[K.g.Da] = 1),
            (Cd[K.g.mc] = 1),
            (Cd[K.g.Ja] = 1),
            (Cd[K.g.Og] = 1),
            Cd)
        ),
        Ed = Object.freeze([
            K.g.da,
            K.g.Sc,
            K.g.eb,
            K.g.Nb,
            K.g.rc,
            K.g.kd,
            K.g.Fa,
            K.g.Qb,
        ]),
        Fd = Object.freeze([].concat(ka(Ed))),
        Gd = Object.freeze([K.g.La, K.g.qe, K.g.od, K.g.Af, K.g.ke]),
        Hd = Object.freeze([].concat(ka(Gd))),
        Id = {},
        Jd =
            ((Id[K.g.M] = "1"),
            (Id[K.g.P] = "2"),
            (Id[K.g.K] = "3"),
            (Id[K.g.ka] = "4"),
            Id),
        Kd = {},
        Ld = Object.freeze(
            ((Kd[K.g.Pc] = 1),
            (Kd[K.g.Qc] = 1),
            (Kd[K.g.da] = 1),
            (Kd[K.g.Sc] = 1),
            (Kd[K.g.be] = 1),
            (Kd[K.g.ya] = 1),
            (Kd[K.g.Lb] = 1),
            (Kd[K.g.jf] = 1),
            (Kd[K.g.ce] = 1),
            (Kd[K.g.de] = 1),
            (Kd[K.g.ee] = 1),
            (Kd[K.g.X] = 1),
            (Kd[K.g.fe] = 1),
            (Kd[K.g.Sa] = 1),
            (Kd[K.g.la] = 1),
            (Kd[K.g.Ka] = 1),
            (Kd[K.g.La] = 1),
            (Kd[K.g.Pa] = 1),
            (Kd[K.g.Ea] = 1),
            (Kd[K.g.qa] = 1),
            (Kd[K.g.ie] = 1),
            (Kd[K.g.ba] = 1),
            (Kd[K.g.yj] = 1),
            (Kd[K.g.ne] = 1),
            (Kd[K.g.oe] = 1),
            (Kd[K.g.tf] = 1),
            (Kd[K.g.rc] = 1),
            (Kd[K.g.zb] = 1),
            (Kd[K.g.Ab] = 1),
            (Kd[K.g.Ma] = 1),
            (Kd[K.g.Hj] = 1),
            (Kd[K.g.Ij] = 1),
            (Kd[K.g.Jj] = 1),
            (Kd[K.g.ld] = 1),
            (Kd[K.g.na] = 1),
            (Kd[K.g.za] = 1),
            (Kd[K.g.wh] = 1),
            (Kd[K.g.xh] = 1),
            (Kd[K.g.yh] = 1),
            (Kd[K.g.zh] = 1),
            (Kd[K.g.Ob] = 1),
            (Kd[K.g.Fa] = 1),
            (Kd[K.g.Pb] = 1),
            (Kd[K.g.zc] = 1),
            (Kd[K.g.pd] = 1),
            (Kd[K.g.ra] = 1),
            (Kd[K.g.Db] = 1),
            (Kd[K.g.Qb] = 1),
            (Kd[K.g.Qa] = 1),
            (Kd[K.g.Aa] = 1),
            (Kd[K.g.sa] = 1),
            (Kd[K.g.fa] = 1),
            Kd)
        ),
        Md = {},
        Nd = Object.freeze(
            ((Md.search = "s"),
            (Md.youtube = "y"),
            (Md.playstore = "p"),
            (Md.shopping = "h"),
            (Md.ads = "a"),
            (Md.maps = "m"),
            Md)
        );
    Object.freeze(K.g);
    var L = {},
        Od =
            ((L[K.g.Ib] = "gcu"),
            (L[K.g.cb] = "gclgb"),
            (L[K.g.Oa] = "gclaw"),
            (L[K.g.Xd] = "gclgs"),
            (L[K.g.Yd] = "gcllp"),
            (L[K.g.Zd] = "gclst"),
            (L[K.g.wb] = "auid"),
            (L[K.g.ce] = "dscnt"),
            (L[K.g.de] = "fcntr"),
            (L[K.g.ee] = "flng"),
            (L[K.g.fe] = "mid"),
            (L[K.g.Sg] = "bttype"),
            (L[K.g.hb] = "label"),
            (L[K.g.Mb] = "capi"),
            (L[K.g.he] = "pscdl"),
            (L[K.g.qa] = "currency_code"),
            (L[K.g.ie] = "vdltv"),
            (L[K.g.xj] = "_dbg"),
            (L[K.g.oe] = "oedeld"),
            (L[K.g.jb] = "edid"),
            (L[K.g.Zg] = "fdr"),
            (L[K.g.ah] = "fledge"),
            (L[K.g.te] = "gac"),
            (L[K.g.sc] = "gacgb"),
            (L[K.g.lh] = "gacmcov"),
            (L[K.g.uc] = "gdpr"),
            (L[K.g.nb] = "gdid"),
            (L[K.g.vc] = "_ng"),
            (L[K.g.qh] = "gsaexp"),
            (L[K.g.yb] = "frm"),
            (L[K.g.ve] = "gtm_up"),
            (L[K.g.xc] = "lps"),
            (L[K.g.we] = "did"),
            (L[K.g.ld] = void 0),
            (L[K.g.Ta] = "tiba"),
            (L[K.g.Ob] = "rdp"),
            (L[K.g.pb] = "ecsid"),
            (L[K.g.Ae] = "ga_uid"),
            (L[K.g.pd] = "delopc"),
            (L[K.g.Ac] = "gdpr_consent"),
            (L[K.g.ra] = "oid"),
            (L[K.g.Be] = "uaa"),
            (L[K.g.Ce] = "uab"),
            (L[K.g.De] = "uafvl"),
            (L[K.g.Ee] = "uamb"),
            (L[K.g.Fe] = "uam"),
            (L[K.g.Ge] = "uap"),
            (L[K.g.He] = "uapv"),
            (L[K.g.Ie] = "uaw"),
            (L[K.g.Ch] = "ec_lat"),
            (L[K.g.Dh] = "ec_meta"),
            (L[K.g.Eh] = "ec_m"),
            (L[K.g.Fh] = "ec_sel"),
            (L[K.g.Gh] = "ec_s"),
            (L[K.g.qd] = "ec_mode"),
            (L[K.g.sa] = "userId"),
            (L[K.g.Ke] = "us_privacy"),
            (L[K.g.fa] = "value"),
            (L[K.g.Ih] = "mcov"),
            (L[K.g.Ph] = "hn"),
            (L[K.g.Qh] = "gtm_ee"),
            (L[K.g.qb] = "npa"),
            (L[K.g.bd] = null),
            (L[K.g.Cb] = null),
            (L[K.g.Ma] = null),
            (L[K.g.X] = null),
            (L[K.g.na] = null),
            (L[K.g.za] = null),
            (L[K.g.Bf] = null),
            (L[K.g.Bc] = null),
            (L[K.g.Pc] = null),
            (L[K.g.Qc] = null),
            L);
    function Pd(a, b) {
        if (a) {
            var c = a.split("x");
            c.length === 2 && ((b.u_w = c[0]), (b.u_h = c[1]));
        }
    }
    function Qd(a, b) {
        a &&
            (a.length === 2
                ? (b.hl = a)
                : a.length === 5 &&
                  ((b.hl = a.substring(0, 2)), (b.gl = a.substring(3, 5))));
    }
    function Rd(a) {
        var b = Sd;
        b = b === void 0 ? Td : b;
        var c;
        var d = b;
        if (a && a.length) {
            for (var e = [], f = 0; f < a.length; ++f) {
                var h = a[f];
                h &&
                    e.push({
                        item_id: d(h),
                        quantity: h.quantity,
                        value: h.price,
                        start_date: h.start_date,
                        end_date: h.end_date,
                    });
            }
            c = e;
        } else c = [];
        var l;
        var m = c;
        if (m) {
            for (var n = [], p = 0; p < m.length; p++) {
                var q = m[p],
                    r = [];
                q &&
                    (r.push(Ud(q.value)),
                    r.push(Ud(q.quantity)),
                    r.push(Ud(q.item_id)),
                    r.push(Ud(q.start_date)),
                    r.push(Ud(q.end_date)),
                    n.push("(" + r.join("*") + ")"));
            }
            l = n.length > 0 ? n.join("") : "";
        } else l = "";
        return l;
    }
    function Td(a) {
        return Vd(a.item_id, a.id, a.item_name);
    }
    function Vd() {
        for (
            var a = g(va.apply(0, arguments)), b = a.next();
            !b.done;
            b = a.next()
        ) {
            var c = b.value;
            if (c !== null && c !== void 0) return c;
        }
    }
    function Wd(a) {
        if (a && a.length) {
            for (var b = [], c = 0; c < a.length; ++c) {
                var d = a[c];
                d && d.estimated_delivery_date
                    ? b.push("" + d.estimated_delivery_date)
                    : b.push("");
            }
            return b.join(",");
        }
    }
    function Ud(a) {
        return typeof a !== "number" && typeof a !== "string"
            ? ""
            : a.toString();
    }
    function Xd(a) {
        return Yd ? E.querySelectorAll(a) : null;
    }
    function Zd(a, b) {
        if (!Yd) return null;
        if (Element.prototype.closest)
            try {
                return a.closest(b);
            } catch (e) {
                return null;
            }
        var c =
                Element.prototype.matches ||
                Element.prototype.webkitMatchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector,
            d = a;
        if (!E.documentElement.contains(d)) return null;
        do {
            try {
                if (c.call(d, b)) return d;
            } catch (e) {
                break;
            }
            d = d.parentElement || d.parentNode;
        } while (d !== null && d.nodeType === 1);
        return null;
    }
    var $d = !1;
    if (E.querySelectorAll)
        try {
            var ae = E.querySelectorAll(":root");
            ae && ae.length == 1 && ae[0] == E.documentElement && ($d = !0);
        } catch (a) {}
    var Yd = $d;
    var be = /^[0-9A-Fa-f]{64}$/;
    function ce(a) {
        try {
            return new TextEncoder().encode(a);
        } catch (e) {
            for (var b = [], c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                d < 128
                    ? b.push(d)
                    : d < 2048
                    ? b.push(192 | (d >> 6), 128 | (d & 63))
                    : d < 55296 || d >= 57344
                    ? b.push(
                          224 | (d >> 12),
                          128 | ((d >> 6) & 63),
                          128 | (d & 63)
                      )
                    : ((d =
                          65536 +
                          (((d & 1023) << 10) | (a.charCodeAt(++c) & 1023))),
                      b.push(
                          240 | (d >> 18),
                          128 | ((d >> 12) & 63),
                          128 | ((d >> 6) & 63),
                          128 | (d & 63)
                      ));
            }
            return new Uint8Array(b);
        }
    }
    function de(a) {
        if (a === "" || a === "e0") return Promise.resolve(a);
        var b;
        if ((b = C.crypto) == null ? 0 : b.subtle) {
            if (be.test(a)) return Promise.resolve(a);
            try {
                var c = ce(a);
                return C.crypto.subtle
                    .digest("SHA-256", c)
                    .then(function (d) {
                        var e = Array.from(new Uint8Array(d))
                            .map(function (f) {
                                return String.fromCharCode(f);
                            })
                            .join("");
                        return C.btoa(e)
                            .replace(/\+/g, "-")
                            .replace(/\//g, "_")
                            .replace(/=+$/, "");
                    })
                    .catch(function () {
                        return "e2";
                    });
            } catch (d) {
                return Promise.resolve("e2");
            }
        } else return Promise.resolve("e1");
    }
    function ee(a, b) {
        if (a === "") return b;
        var c = Number(a);
        return isNaN(c) ? b : c;
    }
    var fe = [];
    function ge(a) {
        switch (a) {
            case 0:
                return 0;
            case 43:
                return 1;
            case 44:
                return 2;
            case 45:
                return 11;
            case 51:
                return 3;
            case 62:
                return 4;
            case 74:
                return 7;
            case 87:
                return 5;
            case 101:
                return 6;
            case 102:
                return 13;
            case 103:
                return 10;
            case 105:
                return 8;
            case 106:
                return 9;
        }
    }
    function O(a) {
        fe[a] = !0;
        var b = ge(a);
        b !== void 0 && (Pa[b] = !0);
    }
    O(33);
    O(29);
    O(30);
    O(31);
    O(32);
    O(46);
    O(78);
    O(16);
    O(112);
    O(15);
    O(117);
    O(111);
    O(63);
    O(88);
    O(7);
    O(47);
    O(4);
    O(82);
    O(108);
    O(73);
    O(69);
    O(71);
    O(86);
    O(122);
    O(97);

    O(118);
    O(87);
    O(5);
    O(74);
    O(101);
    Qa[1] = ee("1", 6e4);
    Qa[3] = ee("10", 1);
    Qa[2] = ee("", 50);
    O(25);
    O(13);
    O(68);
    O(109);
    O(9);
    O(89);

    O(54);
    O(24);
    O(105);
    O(106);
    O(103);
    O(100);
    O(92);
    O(49);
    O(51);
    O(64);
    O(66);
    O(75);
    O(102);
    O(70);
    O(6);
    O(58);
    function P(a) {
        return !!fe[a];
    }
    function R(a) {
        Ma("GTM", a);
    }
    var Je = {},
        Ke = (C.google_tag_manager = C.google_tag_manager || {});
    Je.Gf = "4a70";
    Je.wd = Number("0") || 0;
    Je.ub = "dataLayer";
    Je.jm =
        "ChEI8NOYuAYQ26THof7WrJ3mARIZAOSJzxcxUJPCZ2frCv+DvV84B7ZrQRTi7BoCptY\x3d";
    var Le = {
            __cl: 1,
            __ecl: 1,
            __ehl: 1,
            __evl: 1,
            __fal: 1,
            __fil: 1,
            __fsl: 1,
            __hl: 1,
            __jel: 1,
            __lcl: 1,
            __sdl: 1,
            __tl: 1,
            __ytl: 1,
        },
        Me = { __paused: 1, __tg: 1 },
        Ne;
    for (Ne in Le) Le.hasOwnProperty(Ne) && (Me[Ne] = 1);
    var Oe = bb(""),
        Pe,
        Qe = !1;
    Qe = !0;
    Pe = Qe;
    var Se,
        Te = !1;
    Se = Te;
    var Ue,
        Ve = !1;
    Ue = Ve;
    Je.Mc = "www.googletagmanager.com";
    var We = "" + Je.Mc + (Pe ? "/gtag/js" : "/gtm.js"),
        Xe = null,
        Ye = null,
        Ze = {},
        $e = {};
    function af() {
        var a = Ke.sequence || 1;
        Ke.sequence = a + 1;
        return a;
    }
    Je.Yi = "";
    var bf = "";
    Je.Hf = bf;
    var cf = new (function () {
        this.j = "";
        this.D = !1;
        this.C = 0;
        this.N = this.T = this.Ga = this.H = "";
    })();
    function df() {
        var a = cf.H.length;
        return cf.H[a - 1] === "/" ? cf.H.substring(0, a - 1) : cf.H;
    }
    function ef() {
        return cf.D && cf.C !== 1;
    }
    function ff(a) {
        for (
            var b = {}, c = g(a.split("|")), d = c.next();
            !d.done;
            d = c.next()
        )
            b[d.value] = !0;
        return b;
    }
    var gf = new Za(),
        hf = {},
        jf = {},
        mf = {
            name: Je.ub,
            set: function (a, b) {
                Ba(mb(a, b), hf);
                kf();
            },
            get: function (a) {
                return lf(a, 2);
            },
            reset: function () {
                gf = new Za();
                hf = {};
                kf();
            },
        };
    function lf(a, b) {
        return b != 2 ? gf.get(a) : nf(a);
    }
    function nf(a) {
        var b,
            c = a.split(".");
        b = b || [];
        for (var d = hf, e = 0; e < c.length; e++) {
            if (d === null) return !1;
            if (d === void 0) break;
            d = d[c[e]];
            if (b.indexOf(d) !== -1) return;
        }
        return d;
    }
    function of(a, b) {
        jf.hasOwnProperty(a) || (gf.set(a, b), Ba(mb(a, b), hf), kf());
    }
    function kf(a) {
        z(jf, function (b, c) {
            gf.set(b, c);
            Ba(mb(b), hf);
            Ba(mb(b, c), hf);
            a && delete jf[b];
        });
    }
    function pf(a, b) {
        var c,
            d = (b === void 0 ? 2 : b) !== 1 ? nf(a) : gf.get(a);
        ya(d) === "array" || ya(d) === "object" ? (c = Ba(d)) : (c = d);
        return c;
    }
    var uf = /:[0-9]+$/,
        vf = /^\d+\.fls\.doubleclick\.net$/;
    function wf(a, b, c) {
        for (var d = g(a.split("&")), e = d.next(); !e.done; e = d.next()) {
            var f = g(e.value.split("=")),
                h = f.next().value,
                l = ja(f);
            if (decodeURIComponent(h.replace(/\+/g, " ")) === b) {
                var m = l.join("=");
                return c ? m : decodeURIComponent(m.replace(/\+/g, " "));
            }
        }
    }
    function xf(a, b, c, d, e) {
        b && (b = String(b).toLowerCase());
        if (b === "protocol" || b === "port")
            a.protocol = yf(a.protocol) || yf(C.location.protocol);
        b === "port"
            ? (a.port = String(
                  Number(a.hostname ? a.port : C.location.port) ||
                      (a.protocol === "http"
                          ? 80
                          : a.protocol === "https"
                          ? 443
                          : "")
              ))
            : b === "host" &&
              (a.hostname = (a.hostname || C.location.hostname)
                  .replace(uf, "")
                  .toLowerCase());
        return zf(a, b, c, d, e);
    }
    function zf(a, b, c, d, e) {
        var f,
            h = yf(a.protocol);
        b && (b = String(b).toLowerCase());
        switch (b) {
            case "url_no_fragment":
                f = Af(a);
                break;
            case "protocol":
                f = h;
                break;
            case "host":
                f = a.hostname.replace(uf, "").toLowerCase();
                if (c) {
                    var l = /^www\d*\./.exec(f);
                    l && l[0] && (f = f.substring(l[0].length));
                }
                break;
            case "port":
                f = String(
                    Number(a.port) ||
                        (h === "http" ? 80 : h === "https" ? 443 : "")
                );
                break;
            case "path":
                a.pathname || a.hostname || Ma("TAGGING", 1);
                f =
                    a.pathname.substring(0, 1) === "/"
                        ? a.pathname
                        : "/" + a.pathname;
                var m = f.split("/");
                (d || []).indexOf(m[m.length - 1]) >= 0 &&
                    (m[m.length - 1] = "");
                f = m.join("/");
                break;
            case "query":
                f = a.search.replace("?", "");
                e && (f = wf(f, e));
                break;
            case "extension":
                var n = a.pathname.split(".");
                f = n.length > 1 ? n[n.length - 1] : "";
                f = f.split("/")[0];
                break;
            case "fragment":
                f = a.hash.replace("#", "");
                break;
            default:
                f = a && a.href;
        }
        return f;
    }
    function yf(a) {
        return a ? a.replace(":", "").toLowerCase() : "";
    }
    function Af(a) {
        var b = "";
        if (a && a.href) {
            var c = a.href.indexOf("#");
            b = c < 0 ? a.href : a.href.substring(0, c);
        }
        return b;
    }
    var Bf = {},
        Cf = 0;
    function Df(a) {
        var b = Bf[a];
        if (!b) {
            var c = E.createElement("a");
            a && (c.href = a);
            var d = c.pathname;
            d[0] !== "/" && (a || Ma("TAGGING", 1), (d = "/" + d));
            var e = c.hostname.replace(uf, "");
            b = {
                href: c.href,
                protocol: c.protocol,
                host: c.host,
                hostname: e,
                pathname: d,
                search: c.search,
                hash: c.hash,
                port: c.port,
            };
            Cf < 5 && ((Bf[a] = b), Cf++);
        }
        return b;
    }
    function Ef(a) {
        function b(n) {
            var p = n.split("=")[0];
            return d.indexOf(p) < 0 ? n : p + "=0";
        }
        function c(n) {
            return n
                .split("&")
                .map(b)
                .filter(function (p) {
                    return p !== void 0;
                })
                .join("&");
        }
        var d =
                "gclid dclid gbraid wbraid gclaw gcldc gclha gclgf gclgb _gl".split(
                    " "
                ),
            e = Df(a),
            f = a.split(/[?#]/)[0],
            h = e.search,
            l = e.hash;
        h[0] === "?" && (h = h.substring(1));
        l[0] === "#" && (l = l.substring(1));
        h = c(h);
        l = c(l);
        h !== "" && (h = "?" + h);
        l !== "" && (l = "#" + l);
        var m = "" + f + h + l;
        m[m.length - 1] === "/" && (m = m.substring(0, m.length - 1));
        return m;
    }
    function Ff(a) {
        var b = Df(C.location.href),
            c = xf(b, "host", !1);
        if (c && c.match(vf)) {
            var d = xf(b, "path");
            if (d) {
                var e = d.split(a + "=");
                if (e.length > 1) return e[1].split(";")[0].split("?")[0];
            }
        }
    }
    function Gf(a) {
        for (var b = 0; b < 3; ++b)
            try {
                var c = decodeURIComponent(a).replace(/\+/g, " ");
                if (c === a) break;
                a = c;
            } catch (d) {
                return "";
            }
        return a;
    }
    var Hf = {
        "https://www.google.com": "/g",
        "https://www.googleadservices.com": "/as",
        "https://pagead2.googlesyndication.com": "/gs",
    };
    function If(a, b) {
        if (a) {
            var c = "" + a;
            c.indexOf("http://") !== 0 &&
                c.indexOf("https://") !== 0 &&
                (c = "https://" + c);
            c[c.length - 1] === "/" && (c = c.substring(0, c.length - 1));
            return Df("" + c + b).href;
        }
    }
    function Jf(a, b) {
        if (ef() || Se) return If(a, b);
    }
    function Kf() {
        return !!Je.Hf && Je.Hf.split("@@").join("") !== "SGTM_TOKEN";
    }
    function Lf(a) {
        for (var b = g([K.g.zc, K.g.Db]), c = b.next(); !c.done; c = b.next()) {
            var d = U(a, c.value);
            if (d) return d;
        }
    }
    function Mf(a, b) {
        return ef() ? "" + df() + (b ? Hf[a] || "" : "") : a;
    }
    function Nf(a) {
        var b = String(a[ec.ja] || "").replace(/_/g, "");
        return kb(b, "cvt") ? "cvt" : b;
    }
    var Of =
        C.location.search.indexOf("?gtm_latency=") >= 0 ||
        C.location.search.indexOf("&gtm_latency=") >= 0;
    var Pf = { sampleRate: "0.005000", Ui: "", hm: "0.01" },
        Qf = Math.random(),
        Rf;
    if (!(Rf = Of)) {
        var Sf = Pf.sampleRate;
        Rf = Qf < Number(Sf);
    }
    var Tf = Rf,
        Uf =
            (Db == null ? void 0 : Db.includes("gtm_debug=d")) ||
            Of ||
            Qf >= 1 - Number(Pf.hm);
    var Vf = /gtag[.\/]js/,
        Wf = /gtm[.\/]js/,
        Xf = !1;
    function Yf(a) {
        if (Xf) return "1";
        var b = a.scriptSource;
        if (b) {
            if (Vf.test(b)) return "3";
            if (Wf.test(b)) return "2";
        }
        return "0";
    }
    function Zf(a) {
        var b = $f();
        b.pending || (b.pending = []);
        Wa(b.pending, function (c) {
            return (
                c.target.ctid === a.ctid &&
                c.target.isDestination === a.isDestination
            );
        }) || b.pending.push({ target: a, onLoad: void 0 });
    }
    function ag() {
        var a = C.google_tags_first_party;
        Array.isArray(a) || (a = []);
        for (var b = {}, c = g(a), d = c.next(); !d.done; d = c.next())
            b[d.value] = !0;
        return Object.freeze(b);
    }
    var bg = function () {
        this.container = {};
        this.destination = {};
        this.canonical = {};
        this.pending = [];
        this.siloed = [];
        this.injectedFirstPartyContainers = {};
        this.injectedFirstPartyContainers = ag();
    };
    function $f() {
        var a = Eb("google_tag_data", {}),
            b = a.tidr;
        (b && typeof b === "object") || ((b = new bg()), (a.tidr = b));
        var c = b;
        c.container || (c.container = {});
        c.destination || (c.destination = {});
        c.canonical || (c.canonical = {});
        c.pending || (c.pending = []);
        c.siloed || (c.siloed = []);
        c.injectedFirstPartyContainers ||
            (c.injectedFirstPartyContainers = ag());
        return c;
    }
    var cg = {},
        dg = !1,
        eg = { ctid: "", canonicalContainerId: "", Fi: "", Gi: "" };
    cg.ud = bb("");
    function fg() {
        var a = gg();
        return dg ? a.map(hg) : a;
    }
    function ig() {
        var a = jg();
        return dg ? a.map(hg) : a;
    }
    function kg() {
        return lg(eg.ctid);
    }
    function mg() {
        return lg(eg.canonicalContainerId || "_" + eg.ctid);
    }
    function gg() {
        return eg.Fi ? eg.Fi.split("|") : [eg.ctid];
    }
    function jg() {
        return eg.Gi ? eg.Gi.split("|") : [];
    }
    function ng() {
        var a = og(pg()),
            b = a && a.parent;
        if (b) return og(b);
    }
    function og(a) {
        var b = $f();
        return a.isDestination ? b.destination[a.ctid] : b.container[a.ctid];
    }
    function lg(a) {
        return dg ? hg(a) : a;
    }
    function hg(a) {
        return "siloed_" + a;
    }
    function qg(a) {
        return dg ? rg(a) : a;
    }
    function rg(a) {
        a = String(a);
        return kb(a, "siloed_") ? a.substring(7) : a;
    }
    function sg() {
        var a = !1;
        if (a) {
            var b = $f();
            if (b.siloed) {
                for (
                    var c = [],
                        d = gg().map(hg),
                        e = jg().map(hg),
                        f = {},
                        h = 0;
                    h < b.siloed.length;
                    f = { Se: void 0 }, h++
                )
                    (f.Se = b.siloed[h]),
                        !dg &&
                        Wa(
                            f.Se.isDestination ? e : d,
                            (function (l) {
                                return function (m) {
                                    return m === l.Se.ctid;
                                };
                            })(f)
                        )
                            ? (dg = !0)
                            : c.push(f.Se);
                b.siloed = c;
            }
        }
    }
    function tg() {
        var a = $f();
        if (a.pending) {
            for (
                var b, c = [], d = !1, e = fg(), f = ig(), h = {}, l = 0;
                l < a.pending.length;
                h = { Rd: void 0 }, l++
            )
                (h.Rd = a.pending[l]),
                    Wa(
                        h.Rd.target.isDestination ? f : e,
                        (function (m) {
                            return function (n) {
                                return n === m.Rd.target.ctid;
                            };
                        })(h)
                    )
                        ? d || ((b = h.Rd.onLoad), (d = !0))
                        : c.push(h.Rd);
            a.pending = c;
            if (b)
                try {
                    b(mg());
                } catch (m) {}
        }
    }
    function ug() {
        for (
            var a = eg.ctid,
                b = fg(),
                c = ig(),
                d = function (n, p) {
                    var q = {
                        canonicalContainerId: eg.canonicalContainerId,
                        scriptContainerId: a,
                        state: 2,
                        containers: b.slice(),
                        destinations: c.slice(),
                    };
                    Cb && (q.scriptElement = Cb);
                    Db && (q.scriptSource = Db);
                    if (ng() === void 0) {
                        var r;
                        a: {
                            if (
                                (q.scriptContainerId || "").indexOf("GTM-") >= 0
                            ) {
                                var t;
                                b: {
                                    if (q.scriptSource) {
                                        for (
                                            var v = cf.D,
                                                u = Df(q.scriptSource),
                                                w = v
                                                    ? u.pathname
                                                    : "" +
                                                      u.hostname +
                                                      u.pathname,
                                                x = E.scripts,
                                                y = "",
                                                A = 0;
                                            A < x.length;
                                            ++A
                                        ) {
                                            var B = x[A];
                                            if (
                                                !(
                                                    B.innerHTML.length === 0 ||
                                                    (!v &&
                                                        B.innerHTML.indexOf(
                                                            q.scriptContainerId ||
                                                                "SHOULD_NOT_BE_SET"
                                                        ) < 0) ||
                                                    B.innerHTML.indexOf(w) < 0
                                                )
                                            ) {
                                                if (
                                                    B.innerHTML.indexOf(
                                                        "(function(w,d,s,l,i)"
                                                    ) >= 0
                                                ) {
                                                    t = String(A);
                                                    break b;
                                                }
                                                y = String(A);
                                            }
                                        }
                                        if (y) {
                                            t = y;
                                            break b;
                                        }
                                    }
                                    t = void 0;
                                }
                                var D = t;
                                if (D) {
                                    Xf = !0;
                                    r = D;
                                    break a;
                                }
                            }
                            var J = [].slice.call(document.scripts);
                            r = q.scriptElement
                                ? String(J.indexOf(q.scriptElement))
                                : "-1";
                        }
                        q.htmlLoadOrder = r;
                        q.loadScriptType = Yf(q);
                    }
                    var I = p ? e.destination : e.container,
                        F = I[n];
                    F
                        ? (p && F.state === 0 && R(93), Object.assign(F, q))
                        : (I[n] = q);
                },
                e = $f(),
                f = g(b),
                h = f.next();
            !h.done;
            h = f.next()
        )
            d(h.value, !1);
        for (var l = g(c), m = l.next(); !m.done; m = l.next()) d(m.value, !0);
        e.canonical[mg()] = {};
        tg();
    }
    function pg() {
        return { ctid: kg(), isDestination: cg.ud };
    }
    function vg(a) {
        var b = $f();
        (b.siloed = b.siloed || []).push(a);
    }
    function wg() {
        var a = $f().container,
            b;
        for (b in a) if (a.hasOwnProperty(b) && a[b].state === 1) return !0;
        return !1;
    }
    function xg() {
        var a = {};
        z($f().destination, function (b, c) {
            c.state === 0 && (a[rg(b)] = c);
        });
        return a;
    }
    function yg(a) {
        return !!(
            a &&
            a.parent &&
            a.context &&
            a.context.source === 1 &&
            a.parent.ctid.indexOf("GTM-") !== 0
        );
    }
    var zg = "/td?id=" + eg.ctid,
        Ag = ["v", "t", "pid", "dl", "tdp"],
        Bg = ["mcc"],
        Cg = {},
        Dg = {};
    function Eg(a, b, c) {
        Dg[a] = b;
        (c === void 0 || c) && Fg(a);
    }
    function Fg(a, b) {
        if (Cg[a] === void 0 || (b === void 0 ? 0 : b)) Cg[a] = !0;
    }
    function Gg(a) {
        a = a === void 0 ? !1 : a;
        var b = Object.keys(Cg)
            .filter(function (c) {
                return (
                    Cg[c] === !0 && Dg[c] !== void 0 && (a || !Bg.includes(c))
                );
            })
            .map(function (c) {
                var d = Dg[c];
                typeof d === "function" && (d = d());
                return d ? "&" + c + "=" + d : "";
            })
            .join("");
        return (
            "" + Mf("https://www.googletagmanager.com") + zg + ("" + b + "&z=0")
        );
    }
    function Hg() {
        Object.keys(Cg).forEach(function (a) {
            Ag.indexOf(a) < 0 && (Cg[a] = !1);
        });
    }
    function Ig(a) {
        a = a === void 0 ? !1 : a;
        if (Uf && eg.ctid) {
            var b = Gg(a);
            a ? Vb(b) : Mb(b);
            Hg();
        }
    }
    function Jg() {
        Object.keys(Cg).filter(function (a) {
            return Cg[a] && !Ag.includes(a);
        }).length > 0 && Ig(!0);
    }
    var Kg = Xa();
    function Lg() {
        Kg = Xa();
    }
    function Mg() {
        Eg("v", "3");
        Eg("t", "t");
        Eg("pid", function () {
            return String(Kg);
        });
        Nb(C, "pagehide", Jg);
        C.setInterval(Lg, 864e5);
    }
    function Ng() {
        var a = Eb("google_tag_data", {});
        return (a.ics = a.ics || new Og());
    }
    var Og = function () {
        this.entries = {};
        this.waitPeriodTimedOut =
            this.wasSetLate =
            this.accessedAny =
            this.accessedDefault =
            this.usedImplicit =
            this.usedUpdate =
            this.usedDefault =
            this.usedDeclare =
            this.active =
                !1;
        this.j = [];
    };
    Og.prototype.default = function (a, b, c, d, e, f, h) {
        this.usedDefault ||
            this.usedDeclare ||
            (!this.accessedDefault && !this.accessedAny) ||
            (this.wasSetLate = !0);
        this.usedDefault = this.active = !0;
        Ma("TAGGING", 19);
        b == null
            ? Ma("TAGGING", 18)
            : Pg(this, a, b === "granted", c, d, e, f, h);
    };
    Og.prototype.waitForUpdate = function (a, b, c) {
        for (var d = 0; d < a.length; d++)
            Pg(this, a[d], void 0, void 0, "", "", b, c);
    };
    var Pg = function (a, b, c, d, e, f, h, l) {
        var m = a.entries,
            n = m[b] || {},
            p = n.region,
            q = d && k(d) ? d.toUpperCase() : void 0;
        e = e.toUpperCase();
        f = f.toUpperCase();
        if (e === "" || q === f || (q === e ? p !== f : !q && !p)) {
            var r = !!(h && h > 0 && n.update === void 0),
                t = {
                    region: q,
                    declare_region: n.declare_region,
                    implicit: n.implicit,
                    default: c !== void 0 ? c : n.default,
                    declare: n.declare,
                    update: n.update,
                    quiet: r,
                };
            if (e !== "" || n.default !== !1) m[b] = t;
            r &&
                C.setTimeout(function () {
                    m[b] === t &&
                        t.quiet &&
                        (Ma("TAGGING", 2),
                        (a.waitPeriodTimedOut = !0),
                        a.clearTimeout(b, void 0, l),
                        a.notifyListeners());
                }, h);
        }
    };
    aa = Og.prototype;
    aa.clearTimeout = function (a, b, c) {
        var d = [a],
            e = c.delegatedConsentTypes,
            f;
        for (f in e) e.hasOwnProperty(f) && e[f] === a && d.push(f);
        var h = this.entries[a] || {},
            l = this.getConsentState(a, c);
        if (h.quiet) {
            h.quiet = !1;
            for (var m = g(d), n = m.next(); !n.done; n = m.next())
                Qg(this, n.value);
        } else if (b !== void 0 && l !== b)
            for (var p = g(d), q = p.next(); !q.done; q = p.next())
                Qg(this, q.value);
    };
    aa.update = function (a, b, c) {
        this.usedDefault ||
            this.usedDeclare ||
            this.usedUpdate ||
            !this.accessedAny ||
            (this.wasSetLate = !0);
        this.usedUpdate = this.active = !0;
        if (b != null) {
            var d = this.getConsentState(a, c),
                e = this.entries;
            (e[a] = e[a] || {}).update = b === "granted";
            this.clearTimeout(a, d, c);
        }
    };
    aa.declare = function (a, b, c, d, e) {
        this.usedDeclare = this.active = !0;
        var f = this.entries,
            h = f[a] || {},
            l = h.declare_region,
            m = c && k(c) ? c.toUpperCase() : void 0;
        d = d.toUpperCase();
        e = e.toUpperCase();
        if (d === "" || m === e || (m === d ? l !== e : !m && !l)) {
            var n = {
                region: h.region,
                declare_region: m,
                declare: b === "granted",
                implicit: h.implicit,
                default: h.default,
                update: h.update,
                quiet: h.quiet,
            };
            if (d !== "" || h.declare !== !1) f[a] = n;
        }
    };
    aa.implicit = function (a, b) {
        this.usedImplicit = !0;
        var c = this.entries,
            d = (c[a] = c[a] || {});
        d.implicit !== !1 && (d.implicit = b === "granted");
    };
    aa.getConsentState = function (a, b) {
        var c = this.entries,
            d = c[a] || {},
            e = d.update;
        if (e !== void 0) return e ? 1 : 2;
        if (Ra(8) && b.usedContainerScopedDefaults) {
            var f = b.containerScopedDefaults[a];
            if (f === 3) return 1;
            if (f === 2) return 2;
        } else if (((e = d.default), e !== void 0)) return e ? 1 : 2;
        if (b == null ? 0 : b.delegatedConsentTypes.hasOwnProperty(a)) {
            var h = b.delegatedConsentTypes[a],
                l = c[h] || {};
            e = l.update;
            if (e !== void 0) return e ? 1 : 2;
            if (Ra(8) && b.usedContainerScopedDefaults) {
                var m = b.containerScopedDefaults[h];
                if (m === 3) return 1;
                if (m === 2) return 2;
            } else if (((e = l.default), e !== void 0)) return e ? 1 : 2;
        }
        e = d.declare;
        if (e !== void 0) return e ? 1 : 2;
        e = d.implicit;
        return e !== void 0 ? (e ? 3 : 4) : 0;
    };
    aa.addListener = function (a, b) {
        this.j.push({ consentTypes: a, Fk: b });
    };
    var Qg = function (a, b) {
        for (var c = 0; c < a.j.length; ++c) {
            var d = a.j[c];
            Array.isArray(d.consentTypes) &&
                d.consentTypes.indexOf(b) !== -1 &&
                (d.Hi = !0);
        }
    };
    Og.prototype.notifyListeners = function (a, b) {
        for (var c = 0; c < this.j.length; ++c) {
            var d = this.j[c];
            if (d.Hi) {
                d.Hi = !1;
                try {
                    d.Fk({ consentEventId: a, consentPriorityId: b });
                } catch (e) {}
            }
        }
    };
    var Rg = !1,
        Sg = !1,
        Tg = {},
        Ug = {
            delegatedConsentTypes: {},
            corePlatformServices: {},
            usedCorePlatformServices: !1,
            selectedAllCorePlatformServices: !1,
            containerScopedDefaults:
                ((Tg.ad_storage = 1),
                (Tg.analytics_storage = 1),
                (Tg.ad_user_data = 1),
                (Tg.ad_personalization = 1),
                Tg),
            usedContainerScopedDefaults: !1,
        };
    function Vg(a) {
        var b = Ng();
        b.accessedAny = !0;
        return (k(a) ? [a] : a).every(function (c) {
            switch (b.getConsentState(c, Ug)) {
                case 1:
                case 3:
                    return !0;
                case 2:
                case 4:
                    return !1;
                default:
                    return !0;
            }
        });
    }
    function Wg(a) {
        var b = Ng();
        b.accessedAny = !0;
        return b.getConsentState(a, Ug);
    }
    function Xg(a) {
        for (var b = {}, c = g(a), d = c.next(); !d.done; d = c.next()) {
            var e = d.value;
            b[e] = Ug.corePlatformServices[e] !== !1;
        }
        return b;
    }
    function Yg(a) {
        var b = Ng();
        b.accessedAny = !0;
        return !(b.entries[a] || {}).quiet;
    }
    function Zg() {
        if (!Ra(12)) return !1;
        var a = Ng();
        a.accessedAny = !0;
        if (a.active) return !0;
        if (!Ra(8) || !Ug.usedContainerScopedDefaults) return !1;
        for (
            var b = g(Object.keys(Ug.containerScopedDefaults)), c = b.next();
            !c.done;
            c = b.next()
        )
            if (Ug.containerScopedDefaults[c.value] !== 1) return !0;
        return !1;
    }
    function $g(a, b) {
        Ng().addListener(a, b);
    }
    function ah(a, b) {
        Ng().notifyListeners(a, b);
    }
    function bh(a, b) {
        function c() {
            for (var e = 0; e < b.length; e++) if (!Yg(b[e])) return !0;
            return !1;
        }
        if (c()) {
            var d = !1;
            $g(b, function (e) {
                d || c() || ((d = !0), a(e));
            });
        } else a({});
    }
    function ch(a, b) {
        function c() {
            for (var l = [], m = 0; m < e.length; m++) {
                var n = e[m];
                Vg(n) && !f[n] && l.push(n);
            }
            return l;
        }
        function d(l) {
            for (var m = 0; m < l.length; m++) f[l[m]] = !0;
        }
        var e = k(b) ? [b] : b,
            f = {},
            h = c();
        h.length !== e.length &&
            (d(h),
            $g(e, function (l) {
                function m(q) {
                    q.length !== 0 && (d(q), (l.consentTypes = q), a(l));
                }
                var n = c();
                if (n.length !== 0) {
                    var p = Object.keys(f).length;
                    n.length + p >= e.length
                        ? m(n)
                        : C.setTimeout(function () {
                              m(c());
                          }, 500);
                }
            }));
    }
    var dh = [
            "ad_storage",
            "analytics_storage",
            "ad_user_data",
            "ad_personalization",
        ],
        eh = !1,
        fh = !1;
    function gh() {
        P(49) &&
            !fh &&
            eh &&
            (dh.some(function (a) {
                return Ug.containerScopedDefaults[a] !== 1;
            }) ||
                hh("mbc"));
        fh = !0;
    }
    function hh(a) {
        Uf && (Eg(a, "1"), Ig());
    }
    function ih(a) {
        Ma("HEALTH", a);
    }
    var jh;
    try {
        jh = JSON.parse(
            Ka(
                "eyIwIjoiS1IiLCIxIjoiS1ItNDEiLCIyIjpmYWxzZSwiMyI6Imdvb2dsZS5jby5rciIsIjQiOiIiLCI1Ijp0cnVlLCI2IjpmYWxzZSwiNyI6ImFkX3N0b3JhZ2V8YW5hbHl0aWNzX3N0b3JhZ2V8YWRfdXNlcl9kYXRhfGFkX3BlcnNvbmFsaXphdGlvbiJ9"
            )
        );
    } catch (a) {
        R(123), ih(2), (jh = {});
    }
    function kh() {
        return jh["1"] || "";
    }
    function lh() {
        var a = !1;
        return a;
    }
    function mh() {
        var a = "";
        return a;
    }
    function nh() {
        var a = !1;
        return a;
    }
    function oh() {
        var a = "";
        return a;
    }
    var ph = [K.g.M, K.g.P, K.g.K, K.g.ka],
        qh,
        rh;
    function sh(a) {
        for (
            var b = a[K.g.Wd], c = Array.isArray(b) ? b : [b], d = { Hd: 0 };
            d.Hd < c.length;
            d = { Hd: d.Hd }, ++d.Hd
        )
            z(
                a,
                (function (e) {
                    return function (f, h) {
                        if (f !== K.g.Wd) {
                            var l = c[e.Hd],
                                m = jh["0"] || "",
                                n = kh();
                            Sg = !0;
                            Rg && Ma("TAGGING", 20);
                            Ng().declare(f, h, l, m, n);
                        }
                    };
                })(d)
            );
    }
    function th(a) {
        gh();
        !rh && qh && hh("crc");
        rh = !0;
        var b = a[K.g.Wd];
        b && R(40);
        var c = a[K.g.zg];
        c && R(41);
        for (
            var d = Array.isArray(b) ? b : [b], e = { Id: 0 };
            e.Id < d.length;
            e = { Id: e.Id }, ++e.Id
        )
            z(
                a,
                (function (f) {
                    return function (h, l) {
                        if (h !== K.g.Wd && h !== K.g.zg) {
                            var m = d[f.Id],
                                n = Number(c),
                                p = jh["0"] || "",
                                q = kh();
                            n = n === void 0 ? 0 : n;
                            Rg = !0;
                            Sg && Ma("TAGGING", 20);
                            Ng().default(h, l, m, p, q, n, Ug);
                        }
                    };
                })(e)
            );
    }
    function uh(a, b) {
        gh();
        qh = !0;
        z(a, function (c, d) {
            Rg = !0;
            Sg && Ma("TAGGING", 20);
            Ng().update(c, d, Ug);
        });
        ah(b.eventId, b.priorityId);
    }
    function W(a) {
        Array.isArray(a) || (a = [a]);
        return a.every(function (b) {
            return Vg(b);
        });
    }
    function vh(a, b) {
        $g(a, b);
    }
    function wh(a, b) {
        ch(a, b);
    }
    function xh(a, b) {
        bh(a, b);
    }
    function yh() {
        var a = [K.g.M, K.g.ka, K.g.K];
        Ng().waitForUpdate(a, 500, Ug);
    }
    function zh(a) {
        for (var b = g(a), c = b.next(); !c.done; c = b.next()) {
            var d = c.value;
            Ng().clearTimeout(d, void 0, Ug);
        }
        ah();
    }
    function Ah() {
        if (Ke.pscdl === void 0) {
            var a = function (c) {
                    Ke.pscdl = c;
                },
                b = function () {
                    a("error");
                };
            try {
                Ab.cookieDeprecationLabel
                    ? (a("pending"),
                      Ab.cookieDeprecationLabel.getValue().then(a).catch(b))
                    : a("noapi");
            } catch (c) {
                b(c);
            }
        }
    }
    function Bh(a, b) {
        b &&
            z(b, function (c, d) {
                typeof d !== "object" &&
                    d !== void 0 &&
                    (a["1p." + c] = String(d));
            });
    }
    var Ch = /[A-Z]+/,
        Dh = /\s/;
    function Eh(a, b) {
        if (k(a)) {
            a = db(a);
            var c = a.indexOf("-");
            if (!(c < 0)) {
                var d = a.substring(0, c);
                if (Ch.test(d)) {
                    var e = a.substring(c + 1),
                        f;
                    if (b) {
                        var h = function (n) {
                            var p = n.indexOf("/");
                            return p < 0
                                ? [n]
                                : [n.substring(0, p), n.substring(p + 1)];
                        };
                        f = h(e);
                        if (d === "DC" && f.length === 2) {
                            var l = h(f[1]);
                            l.length === 2 && ((f[1] = l[0]), f.push(l[1]));
                        }
                    } else {
                        f = e.split("/");
                        for (var m = 0; m < f.length; m++)
                            if (
                                !f[m] ||
                                (Dh.test(f[m]) && (d !== "AW" || m !== 1))
                            )
                                return;
                    }
                    return {
                        id: a,
                        prefix: d,
                        destinationId: d + "-" + f[0],
                        ids: f,
                    };
                }
            }
        }
    }
    function Fh(a, b) {
        for (var c = {}, d = 0; d < a.length; ++d) {
            var e = Eh(a[d], b);
            e && (c[e.id] = e);
        }
        Gh(c);
        var f = [];
        z(c, function (h, l) {
            f.push(l);
        });
        return f;
    }
    function Gh(a) {
        var b = [],
            c;
        for (c in a)
            if (a.hasOwnProperty(c)) {
                var d = a[c];
                d.prefix === "AW" && d.ids[Hh[2]] && b.push(d.destinationId);
            }
        for (var e = 0; e < b.length; ++e) delete a[b[e]];
    }
    var Ih = {},
        Hh =
            ((Ih[0] = 0),
            (Ih[1] = 0),
            (Ih[2] = 1),
            (Ih[3] = 0),
            (Ih[4] = 1),
            (Ih[5] = 2),
            (Ih[6] = 0),
            (Ih[7] = 0),
            (Ih[8] = 0),
            Ih);
    var Jh = Number("") || 500,
        Kh = {},
        Lh = {},
        Mh = { initialized: 11, complete: 12, interactive: 13 },
        Nh = {},
        Oh = Object.freeze(((Nh[K.g.Fa] = !0), Nh)),
        Ph =
            E.location.search.indexOf("?gtm_diagnostics=") >= 0 ||
            E.location.search.indexOf("&gtm_diagnostics=") >= 0,
        Qh = void 0;
    function Rh(a, b) {
        if (b.length && Uf) {
            var c;
            (c = Kh)[a] != null || (c[a] = []);
            Lh[a] != null || (Lh[a] = []);
            var d = b.filter(function (e) {
                return !Lh[a].includes(e);
            });
            Kh[a].push.apply(Kh[a], ka(d));
            Lh[a].push.apply(Lh[a], ka(d));
            !Qh &&
                d.length > 0 &&
                (Fg("tdc", !0),
                (Qh = C.setTimeout(function () {
                    Ig();
                    Kh = {};
                    Qh = void 0;
                }, Jh)));
        }
    }
    function Sh(a, b, c) {
        if (Uf && a === "config") {
            var d,
                e = (d = Eh(b)) == null ? void 0 : d.ids;
            if (!(e && e.length > 1)) {
                var f,
                    h = Eb("google_tag_data", {});
                h.td || (h.td = {});
                f = h.td;
                var l = Ba(c.H);
                Ba(c.j, l);
                var m = [],
                    n;
                for (n in f)
                    if (f.hasOwnProperty(n)) {
                        var p = Th(f[n], l);
                        p.length && (Ph && console.log(p), m.push(n));
                    }
                m.length && (Rh(b, m), Ma("TAGGING", Mh[E.readyState] || 14));
                f[b] = l;
            }
        }
    }
    function Uh(a, b) {
        var c = {},
            d;
        for (d in b) b.hasOwnProperty(d) && (c[d] = !0);
        for (var e in a) a.hasOwnProperty(e) && (c[e] = !0);
        return c;
    }
    function Th(a, b, c, d) {
        c = c === void 0 ? {} : c;
        d = d === void 0 ? "" : d;
        if (a === b) return [];
        var e = function (r, t) {
                var v;
                ya(t) === "object"
                    ? (v = t[r])
                    : ya(t) === "array" && (v = t[r]);
                return v === void 0 ? Oh[r] : v;
            },
            f = Uh(a, b),
            h;
        for (h in f)
            if (f.hasOwnProperty(h)) {
                var l = (d ? d + "." : "") + h,
                    m = e(h, a),
                    n = e(h, b),
                    p = ya(m) === "object" || ya(m) === "array",
                    q = ya(n) === "object" || ya(n) === "array";
                if (p && q) Th(m, n, c, l);
                else if (p || q || m !== n) c[l] = !0;
            }
        return Object.keys(c);
    }
    function Vh() {
        Eg(
            "tdc",
            function () {
                Qh && (C.clearTimeout(Qh), (Qh = void 0));
                var a = [],
                    b;
                for (b in Kh)
                    Kh.hasOwnProperty(b) && a.push(b + "*" + Kh[b].join("."));
                return a.length ? a.join("!") : void 0;
            },
            !1
        );
    }
    var Wh = function (a, b, c, d, e, f, h, l, m, n, p) {
            this.eventId = a;
            this.priorityId = b;
            this.j = c;
            this.N = d;
            this.D = e;
            this.H = f;
            this.C = h;
            this.eventMetadata = l;
            this.onSuccess = m;
            this.onFailure = n;
            this.isGtmEvent = p;
        },
        Xh = function (a, b) {
            var c = [];
            switch (b) {
                case 3:
                    c.push(a.j);
                    c.push(a.N);
                    c.push(a.D);
                    c.push(a.H);
                    c.push(a.C);
                    break;
                case 2:
                    c.push(a.j);
                    break;
                case 1:
                    c.push(a.N);
                    c.push(a.D);
                    c.push(a.H);
                    c.push(a.C);
                    break;
                case 4:
                    c.push(a.j), c.push(a.N), c.push(a.D), c.push(a.H);
            }
            return c;
        },
        U = function (a, b, c, d) {
            for (
                var e = g(Xh(a, d === void 0 ? 3 : d)), f = e.next();
                !f.done;
                f = e.next()
            ) {
                var h = f.value;
                if (h[b] !== void 0) return h[b];
            }
            return c;
        },
        Yh = function (a) {
            for (
                var b = {}, c = Xh(a, 4), d = g(c), e = d.next();
                !e.done;
                e = d.next()
            )
                for (
                    var f = Object.keys(e.value), h = g(f), l = h.next();
                    !l.done;
                    l = h.next()
                )
                    b[l.value] = 1;
            return Object.keys(b);
        },
        Zh = function (a, b, c) {
            function d(n) {
                Aa(n) &&
                    z(n, function (p, q) {
                        f = !0;
                        e[p] = q;
                    });
            }
            var e = {},
                f = !1,
                h = Xh(a, c === void 0 ? 3 : c);
            h.reverse();
            for (var l = g(h), m = l.next(); !m.done; m = l.next())
                d(m.value[b]);
            return f ? e : void 0;
        },
        $h = function (a) {
            for (
                var b = [
                        K.g.Xc,
                        K.g.Tc,
                        K.g.Uc,
                        K.g.Vc,
                        K.g.Wc,
                        K.g.Yc,
                        K.g.Zc,
                    ],
                    c = Xh(a, 3),
                    d = g(c),
                    e = d.next();
                !e.done;
                e = d.next()
            ) {
                for (
                    var f = e.value, h = {}, l = !1, m = g(b), n = m.next();
                    !n.done;
                    n = m.next()
                ) {
                    var p = n.value;
                    f[p] !== void 0 && ((h[p] = f[p]), (l = !0));
                }
                var q = l ? h : void 0;
                if (q) return q;
            }
            return {};
        },
        ai = function (a, b) {
            this.eventId = a;
            this.priorityId = b;
            this.C = {};
            this.N = {};
            this.j = {};
            this.D = {};
            this.T = {};
            this.H = {};
            this.eventMetadata = {};
            this.isGtmEvent = !1;
            this.onSuccess = function () {};
            this.onFailure = function () {};
        },
        bi = function (a, b) {
            a.C = b;
            return a;
        },
        ci = function (a, b) {
            a.N = b;
            return a;
        },
        di = function (a, b) {
            a.j = b;
            return a;
        },
        ei = function (a, b) {
            a.D = b;
            return a;
        },
        fi = function (a, b) {
            a.T = b;
            return a;
        },
        gi = function (a, b) {
            a.H = b;
            return a;
        },
        hi = function (a, b) {
            a.eventMetadata = b || {};
            return a;
        },
        ii = function (a, b) {
            a.onSuccess = b;
            return a;
        },
        ji = function (a, b) {
            a.onFailure = b;
            return a;
        },
        ki = function (a, b) {
            a.isGtmEvent = b;
            return a;
        },
        li = function (a) {
            return new Wh(
                a.eventId,
                a.priorityId,
                a.C,
                a.N,
                a.j,
                a.D,
                a.H,
                a.eventMetadata,
                a.onSuccess,
                a.onFailure,
                a.isGtmEvent
            );
        };
    var mi = { Ti: Number("5"), Wm: Number("") },
        ni = [];
    function oi(a) {
        ni.push(a);
    }
    var pi = "?id=" + eg.ctid,
        qi = void 0,
        ri = {},
        si = void 0,
        ti = new (function () {
            var a = 5;
            mi.Ti > 0 && (a = mi.Ti);
            this.C = a;
            this.j = 0;
            this.D = [];
        })(),
        ui = 1e3;
    function vi(a, b) {
        var c = qi;
        if (c === void 0)
            if (b) c = af();
            else return "";
        for (
            var d = [Mf("https://www.googletagmanager.com"), "/a", pi],
                e = g(ni),
                f = e.next();
            !f.done;
            f = e.next()
        )
            for (
                var h = f.value,
                    l = h({ eventId: c, Hb: !!a }),
                    m = g(l),
                    n = m.next();
                !n.done;
                n = m.next()
            ) {
                var p = g(n.value),
                    q = p.next().value,
                    r = p.next().value;
                d.push("&" + q + "=" + r);
            }
        d.push("&z=0");
        return d.join("");
    }
    function wi() {
        si && (C.clearTimeout(si), (si = void 0));
        if (qi !== void 0 && xi) {
            var a;
            (a = ri[qi]) ||
                (a = ti.j < ti.C ? !1 : fb() - ti.D[ti.j % ti.C] < 1e3);
            if (a || ui-- <= 0) R(1), (ri[qi] = !0);
            else {
                var b = ti.j++ % ti.C;
                ti.D[b] = fb();
                var c = vi(!0);
                Mb(c);
                xi = !1;
            }
        }
    }
    var xi = !1;
    function yi(a) {
        ri[a] ||
            (a !== qi && (wi(), (qi = a)),
            (xi = !0),
            si || (si = C.setTimeout(wi, 500)),
            vi().length >= 2022 && wi());
    }
    var zi = Xa();
    function Ai() {
        zi = Xa();
    }
    function Bi() {
        return [
            ["v", "3"],
            ["t", "t"],
            ["pid", String(zi)],
        ];
    }
    var Ci = {};
    function Di(a, b, c) {
        Tf && a !== void 0 && ((Ci[a] = Ci[a] || []), Ci[a].push(c + b), yi(a));
    }
    function Ei(a) {
        var b = a.eventId,
            c = a.Hb,
            d = [],
            e = Ci[b] || [];
        e.length && d.push(["epr", e.join(".")]);
        c && delete Ci[b];
        return d;
    }
    function Fi(a, b, c, d) {
        var e = Eh(c, d.isGtmEvent);
        e &&
            (P(48) && P(48) && !dg && (d.deferrable = !0),
            Gi.push("event", [b, a], e, d));
    }
    function Hi(a, b, c, d) {
        var e = Eh(c, d.isGtmEvent);
        e && Gi.push("get", [a, b], e, d);
    }
    var Ii = function () {
            this.H = {};
            this.j = {};
            this.N = {};
            this.T = null;
            this.D = {};
            this.C = !1;
            this.status = 1;
        },
        Ji = function (a, b, c, d) {
            this.C = fb();
            this.j = b;
            this.args = c;
            this.messageContext = d;
            this.type = a;
        },
        Ki = function () {
            this.destinations = {};
            this.j = {};
            this.commands = [];
        },
        Li = function (a, b) {
            var c = b.destinationId;
            return (a.destinations[c] = a.destinations[c] || new Ii());
        },
        Mi = function (a, b, c, d) {
            if (d.j) {
                var e = Li(a, d.j),
                    f = e.T;
                if (f) {
                    var h = Ba(c, null),
                        l = Ba(e.H[d.j.id], null),
                        m = Ba(e.D, null),
                        n = Ba(e.j, null),
                        p = Ba(a.j, null),
                        q = {};
                    if (Tf)
                        try {
                            q = Ba(hf);
                        } catch (u) {
                            R(72);
                        }
                    var r = d.j.prefix,
                        t = function (u) {
                            Di(d.messageContext.eventId, r, u);
                        },
                        v = li(
                            ki(
                                ji(
                                    ii(
                                        hi(
                                            fi(
                                                ei(
                                                    gi(
                                                        di(
                                                            ci(
                                                                bi(
                                                                    new ai(
                                                                        d.messageContext.eventId,
                                                                        d.messageContext.priorityId
                                                                    ),
                                                                    h
                                                                ),
                                                                l
                                                            ),
                                                            m
                                                        ),
                                                        n
                                                    ),
                                                    p
                                                ),
                                                q
                                            ),
                                            d.messageContext.eventMetadata
                                        ),
                                        function () {
                                            if (t) {
                                                var u = t;
                                                t = void 0;
                                                u("2");
                                                if (d.messageContext.onSuccess)
                                                    d.messageContext.onSuccess();
                                            }
                                        }
                                    ),
                                    function () {
                                        if (t) {
                                            var u = t;
                                            t = void 0;
                                            u("3");
                                            if (d.messageContext.onFailure)
                                                d.messageContext.onFailure();
                                        }
                                    }
                                ),
                                !!d.messageContext.isGtmEvent
                            )
                        );
                    try {
                        Di(d.messageContext.eventId, r, "1"),
                            Sh(d.type, d.j.id, v),
                            f(d.j.id, b, d.C, v);
                    } catch (u) {
                        Di(d.messageContext.eventId, r, "4");
                    }
                }
            }
        };
    Ki.prototype.register = function (a, b, c) {
        var d = Li(this, a);
        d.status !== 3 &&
            ((d.T = b),
            (d.status = 3),
            c && (Ba(d.j, c), (d.j = c)),
            this.flush());
    };
    Ki.prototype.push = function (a, b, c, d) {
        c !== void 0 &&
            (Li(this, c).status === 1 &&
                ((Li(this, c).status = 2), this.push("require", [{}], c, {})),
            Li(this, c).C && (d.deferrable = !1));
        this.commands.push(new Ji(a, c, b, d));
        d.deferrable || this.flush();
    };
    Ki.prototype.flush = function (a) {
        for (
            var b = this, c = [], d = !1, e = {};
            this.commands.length;
            e = { Tb: void 0, Uf: void 0 }
        ) {
            var f = this.commands[0],
                h = f.j;
            if (f.messageContext.deferrable)
                !h || Li(this, h).C
                    ? ((f.messageContext.deferrable = !1),
                      this.commands.push(f))
                    : c.push(f),
                    this.commands.shift();
            else {
                switch (f.type) {
                    case "require":
                        if (Li(this, h).status !== 3 && !a) {
                            this.commands.push.apply(this.commands, c);
                            return;
                        }
                        break;
                    case "set":
                        z(f.args[0], function (r, t) {
                            Ba(mb(r, t), b.j);
                        });
                        break;
                    case "config":
                        var l = Li(this, h);
                        e.Tb = {};
                        z(
                            f.args[0],
                            (function (r) {
                                return function (t, v) {
                                    Ba(mb(t, v), r.Tb);
                                };
                            })(e)
                        );
                        var m = !!e.Tb[K.g.Qb];
                        delete e.Tb[K.g.Qb];
                        var n = h.destinationId === h.id;
                        m || (n ? (l.D = {}) : (l.H[h.id] = {}));
                        (l.C && m) || Mi(this, K.g.W, e.Tb, f);
                        l.C = !0;
                        n ? Ba(e.Tb, l.D) : (Ba(e.Tb, l.H[h.id]), R(70));
                        d = !0;
                        break;
                    case "event":
                        e.Uf = {};
                        z(
                            f.args[0],
                            (function (r) {
                                return function (t, v) {
                                    Ba(mb(t, v), r.Uf);
                                };
                            })(e)
                        );
                        Mi(this, f.args[1], e.Uf, f);
                        break;
                    case "get":
                        var p = {},
                            q =
                                ((p[K.g.lb] = f.args[0]),
                                (p[K.g.xb] = f.args[1]),
                                p);
                        Mi(this, K.g.Na, q, f);
                }
                this.commands.shift();
                Ni(this, f);
            }
        }
        this.commands.push.apply(this.commands, c);
        d && this.flush();
    };
    var Ni = function (a, b) {
            if (b.type !== "require")
                if (b.j)
                    for (
                        var c = Li(a, b.j).N[b.type] || [], d = 0;
                        d < c.length;
                        d++
                    )
                        c[d]();
                else
                    for (var e in a.destinations)
                        if (a.destinations.hasOwnProperty(e)) {
                            var f = a.destinations[e];
                            if (f && f.N)
                                for (
                                    var h = f.N[b.type] || [], l = 0;
                                    l < h.length;
                                    l++
                                )
                                    h[l]();
                        }
        },
        Oi = function (a, b) {
            var c = Gi,
                d = Ba(b, null);
            Ba(Li(c, a).j, d);
            Li(c, a).j = d;
        },
        Gi = new Ki();
    var Pi = function (a, b) {
            var c = function () {};
            c.prototype = a.prototype;
            var d = new c();
            a.apply(d, Array.prototype.slice.call(arguments, 1));
            return d;
        },
        Qi = function (a) {
            var b = a;
            return function () {
                if (b) {
                    var c = b;
                    b = null;
                    c();
                }
            };
        };
    var Ri = function (a, b, c) {
            a.addEventListener && a.addEventListener(b, c, !1);
        },
        Si = function (a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1);
        };
    var Ti, Ui;
    a: {
        for (var Vi = ["CLOSURE_FLAGS"], Wi = wa, Xi = 0; Xi < Vi.length; Xi++)
            if (((Wi = Wi[Vi[Xi]]), Wi == null)) {
                Ui = null;
                break a;
            }
        Ui = Wi;
    }
    var Yi = Ui && Ui[610401301];
    Ti = Yi != null ? Yi : !1;
    var Zi,
        $i = wa.navigator;
    Zi = $i ? $i.userAgentData || null : null;
    function aj(a) {
        return Ti
            ? Zi
                ? Zi.brands.some(function (b) {
                      var c;
                      return (c = b.brand) && c.indexOf(a) != -1;
                  })
                : !1
            : !1;
    }
    function bj(a) {
        var b;
        a: {
            var c = wa.navigator;
            if (c) {
                var d = c.userAgent;
                if (d) {
                    b = d;
                    break a;
                }
            }
            b = "";
        }
        return b.indexOf(a) != -1;
    }
    function cj() {
        return Ti ? !!Zi && Zi.brands.length > 0 : !1;
    }
    function dj() {
        return cj()
            ? aj("Chromium")
            : ((bj("Chrome") || bj("CriOS")) && !(cj() ? 0 : bj("Edge"))) ||
                  bj("Silk");
    }
    var ej = function (a) {
        ej[" "](a);
        return a;
    };
    ej[" "] = function () {};
    var fj = function (a, b, c, d) {
            for (
                var e = b, f = c.length;
                (e = a.indexOf(c, e)) >= 0 && e < d;

            ) {
                var h = a.charCodeAt(e - 1);
                if (h == 38 || h == 63) {
                    var l = a.charCodeAt(e + f);
                    if (!l || l == 61 || l == 38 || l == 35) return e;
                }
                e += f + 1;
            }
            return -1;
        },
        gj = /#|$/,
        hj = function (a, b) {
            var c = a.search(gj),
                d = fj(a, 0, b, c);
            if (d < 0) return null;
            var e = a.indexOf("&", d);
            if (e < 0 || e > c) e = c;
            d += b.length + 1;
            return decodeURIComponent(
                a.slice(d, e !== -1 ? e : 0).replace(/\+/g, " ")
            );
        },
        ij = /[?&]($|#)/,
        jj = function (a, b, c) {
            for (
                var d, e = a.search(gj), f = 0, h, l = [];
                (h = fj(a, f, b, e)) >= 0;

            )
                l.push(a.substring(f, h)),
                    (f = Math.min(a.indexOf("&", h) + 1 || e, e));
            l.push(a.slice(f));
            d = l.join("").replace(ij, "$1");
            var m,
                n = c != null ? "=" + encodeURIComponent(String(c)) : "";
            var p = b + n;
            if (p) {
                var q,
                    r = d.indexOf("#");
                r < 0 && (r = d.length);
                var t = d.indexOf("?"),
                    v;
                t < 0 || t > r
                    ? ((t = r), (v = ""))
                    : (v = d.substring(t + 1, r));
                q = [d.slice(0, t), v, d.slice(r)];
                var u = q[1];
                q[1] = p ? (u ? u + "&" + p : p) : u;
                m = q[0] + (q[1] ? "?" + q[1] : "") + q[2];
            } else m = d;
            return m;
        };
    var kj = function (a) {
            try {
                var b;
                if ((b = !!a && a.location.href != null))
                    a: {
                        try {
                            ej(a.foo);
                            b = !0;
                            break a;
                        } catch (c) {}
                        b = !1;
                    }
                return b;
            } catch (c) {
                return !1;
            }
        },
        lj = function (a, b) {
            if (a)
                for (var c in a)
                    Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a);
        },
        mj = function (a) {
            if (C.top == C) return 0;
            if (a === void 0 ? 0 : a) {
                var b = C.location.ancestorOrigins;
                if (b) return b[b.length - 1] == C.location.origin ? 1 : 2;
            }
            return kj(C.top) ? 1 : 2;
        },
        nj = function (a) {
            a = a === void 0 ? document : a;
            return a.createElement("img");
        };
    function oj(a, b, c, d) {
        d = d === void 0 ? !1 : d;
        a.google_image_requests || (a.google_image_requests = []);
        var e = nj(a.document);
        if (c) {
            var f = function () {
                if (c) {
                    var h = a.google_image_requests,
                        l = yb(h, e);
                    l >= 0 && Array.prototype.splice.call(h, l, 1);
                }
                Si(e, "load", f);
                Si(e, "error", f);
            };
            Ri(e, "load", f);
            Ri(e, "error", f);
        }
        d && (e.attributionSrc = "");
        e.src = b;
        a.google_image_requests.push(e);
    }
    var qj = function (a) {
            var b;
            b = b === void 0 ? !1 : b;
            var c =
                "https://pagead2.googlesyndication.com/pagead/gen_204?id=tcfe";
            lj(a, function (d, e) {
                if (d || d === 0)
                    c += "&" + e + "=" + encodeURIComponent("" + d);
            });
            pj(c, b);
        },
        pj = function (a, b) {
            var c = window,
                d;
            b = b === void 0 ? !1 : b;
            d = d === void 0 ? !1 : d;
            if (c.fetch) {
                var e = {
                    keepalive: !0,
                    credentials: "include",
                    redirect: "follow",
                    method: "get",
                    mode: "no-cors",
                };
                d &&
                    ((e.mode = "cors"),
                    "setAttributionReporting" in XMLHttpRequest.prototype
                        ? (e.attributionReporting = {
                              eventSourceEligible: "true",
                              triggerEligible: "false",
                          })
                        : (e.headers = {
                              "Attribution-Reporting-Eligible": "event-source",
                          }));
                c.fetch(a, e);
            } else oj(c, a, b === void 0 ? !1 : b, d === void 0 ? !1 : d);
        };
    var rj = function () {
        this.N = this.N;
        this.C = this.C;
    };
    rj.prototype.N = !1;
    rj.prototype.dispose = function () {
        this.N || ((this.N = !0), this.Ga());
    };
    rj.prototype[Symbol.dispose] = function () {
        this.dispose();
    };
    rj.prototype.addOnDisposeCallback = function (a, b) {
        this.N
            ? b !== void 0
                ? a.call(b)
                : a()
            : (this.C || (this.C = []), b && (a = a.bind(b)), this.C.push(a));
    };
    rj.prototype.Ga = function () {
        if (this.C) for (; this.C.length; ) this.C.shift()();
    };
    var sj = function (a) {
            a.addtlConsent !== void 0 &&
                typeof a.addtlConsent !== "string" &&
                (a.addtlConsent = void 0);
            a.gdprApplies !== void 0 &&
                typeof a.gdprApplies !== "boolean" &&
                (a.gdprApplies = void 0);
            return (a.tcString !== void 0 && typeof a.tcString !== "string") ||
                (a.listenerId !== void 0 && typeof a.listenerId !== "number")
                ? 2
                : a.cmpStatus && a.cmpStatus !== "error"
                ? 0
                : 3;
        },
        tj = function (a, b) {
            b = b === void 0 ? {} : b;
            rj.call(this);
            this.D = a;
            this.j = null;
            this.T = {};
            this.Me = 0;
            var c;
            this.sd = (c = b.am) != null ? c : 500;
            var d;
            this.Rb = (d = b.Jm) != null ? d : !1;
            this.H = null;
        };
    ua(tj, rj);
    tj.prototype.Ga = function () {
        this.T = {};
        this.H && (Si(this.D, "message", this.H), delete this.H);
        delete this.T;
        delete this.D;
        delete this.j;
        rj.prototype.Ga.call(this);
    };
    var vj = function (a) {
        return typeof a.D.__tcfapi === "function" || uj(a) != null;
    };
    tj.prototype.addEventListener = function (a) {
        var b = this,
            c = { internalBlockOnErrors: this.Rb },
            d = Qi(function () {
                return a(c);
            }),
            e = 0;
        this.sd !== -1 &&
            (e = setTimeout(function () {
                c.tcString = "tcunavailable";
                c.internalErrorState = 1;
                d();
            }, this.sd));
        var f = function (h, l) {
            clearTimeout(e);
            h
                ? ((c = h),
                  (c.internalErrorState = sj(c)),
                  (c.internalBlockOnErrors = b.Rb),
                  (l && c.internalErrorState === 0) ||
                      ((c.tcString = "tcunavailable"),
                      l || (c.internalErrorState = 3)))
                : ((c.tcString = "tcunavailable"), (c.internalErrorState = 3));
            a(c);
        };
        try {
            wj(this, "addEventListener", f);
        } catch (h) {
            (c.tcString = "tcunavailable"),
                (c.internalErrorState = 3),
                e && (clearTimeout(e), (e = 0)),
                d();
        }
    };
    tj.prototype.removeEventListener = function (a) {
        a &&
            a.listenerId &&
            wj(this, "removeEventListener", null, a.listenerId);
    };
    var yj = function (a, b, c) {
            var d;
            d = d === void 0 ? "755" : d;
            var e;
            a: {
                if (a.publisher && a.publisher.restrictions) {
                    var f = a.publisher.restrictions[b];
                    if (f !== void 0) {
                        e = f[d === void 0 ? "755" : d];
                        break a;
                    }
                }
                e = void 0;
            }
            var h = e;
            if (h === 0) return !1;
            var l = c;
            c === 2
                ? ((l = 0), h === 2 && (l = 1))
                : c === 3 && ((l = 1), h === 1 && (l = 0));
            var m;
            if (l === 0)
                if (a.purpose && a.vendor) {
                    var n = xj(a.vendor.consents, d === void 0 ? "755" : d);
                    m =
                        n &&
                        b === "1" &&
                        a.purposeOneTreatment &&
                        a.publisherCC === "CH"
                            ? !0
                            : n && xj(a.purpose.consents, b);
                } else m = !0;
            else
                m =
                    l === 1
                        ? a.purpose && a.vendor
                            ? xj(a.purpose.legitimateInterests, b) &&
                              xj(
                                  a.vendor.legitimateInterests,
                                  d === void 0 ? "755" : d
                              )
                            : !0
                        : !0;
            return m;
        },
        xj = function (a, b) {
            return !(!a || !a[b]);
        },
        wj = function (a, b, c, d) {
            c || (c = function () {});
            if (typeof a.D.__tcfapi === "function") {
                var e = a.D.__tcfapi;
                e(b, 2, c, d);
            } else if (uj(a)) {
                zj(a);
                var f = ++a.Me;
                a.T[f] = c;
                if (a.j) {
                    var h = {};
                    a.j.postMessage(
                        ((h.__tcfapiCall = {
                            command: b,
                            version: 2,
                            callId: f,
                            parameter: d,
                        }),
                        h),
                        "*"
                    );
                }
            } else c({}, !1);
        },
        uj = function (a) {
            if (a.j) return a.j;
            var b;
            a: {
                for (var c = a.D, d = 0; d < 50; ++d) {
                    var e;
                    try {
                        e = !(!c.frames || !c.frames.__tcfapiLocator);
                    } catch (l) {
                        e = !1;
                    }
                    if (e) {
                        b = c;
                        break a;
                    }
                    var f;
                    b: {
                        try {
                            var h = c.parent;
                            if (h && h != c) {
                                f = h;
                                break b;
                            }
                        } catch (l) {}
                        f = null;
                    }
                    if (!(c = f)) break;
                }
                b = null;
            }
            a.j = b;
            return a.j;
        },
        zj = function (a) {
            a.H ||
                ((a.H = function (b) {
                    try {
                        var c;
                        c = (
                            typeof b.data === "string"
                                ? JSON.parse(b.data)
                                : b.data
                        ).__tcfapiReturn;
                        a.T[c.callId](c.returnValue, c.success);
                    } catch (d) {}
                }),
                Ri(a.D, "message", a.H));
        },
        Aj = function (a) {
            if (a.gdprApplies === !1) return !0;
            a.internalErrorState === void 0 && (a.internalErrorState = sj(a));
            return a.cmpStatus === "error" || a.internalErrorState !== 0
                ? a.internalBlockOnErrors
                    ? (qj({ e: String(a.internalErrorState) }), !1)
                    : !0
                : a.cmpStatus !== "loaded" ||
                  (a.eventStatus !== "tcloaded" &&
                      a.eventStatus !== "useractioncomplete")
                ? !1
                : !0;
        };
    var Bj = { 1: 0, 3: 0, 4: 0, 7: 3, 9: 3, 10: 3 };
    function Cj() {
        var a = Ke.tcf || {};
        return (Ke.tcf = a);
    }
    var Dj = function () {
        return new tj(C, { am: -1 });
    };
    function Ej() {
        var a = Cj(),
            b = Dj();
        vj(b) && !Fj() && !Gj() && R(124);
        if (!a.active && vj(b)) {
            Fj() &&
                ((a.active = !0),
                (a.Gb = {}),
                (a.cmpId = 0),
                (a.tcfPolicyVersion = 0),
                (Ng().active = !0),
                (a.tcString = "tcunavailable"));
            yh();
            try {
                b.addEventListener(function (c) {
                    if (c.internalErrorState !== 0)
                        Hj(a), zh([K.g.M, K.g.ka, K.g.K]), (Ng().active = !0);
                    else if (
                        ((a.gdprApplies = c.gdprApplies),
                        (a.cmpId = c.cmpId),
                        (a.enableAdvertiserConsentMode =
                            c.enableAdvertiserConsentMode),
                        Gj() && (a.active = !0),
                        !Ij(c) || Fj() || Gj())
                    ) {
                        a.tcfPolicyVersion = c.tcfPolicyVersion;
                        var d;
                        if (c.gdprApplies === !1) {
                            var e = {},
                                f;
                            for (f in Bj) Bj.hasOwnProperty(f) && (e[f] = !0);
                            d = e;
                            b.removeEventListener(c);
                        } else if (Ij(c)) {
                            var h = {},
                                l;
                            for (l in Bj)
                                if (Bj.hasOwnProperty(l))
                                    if (l === "1") {
                                        var m,
                                            n = c,
                                            p = { Jk: !0 };
                                        p = p === void 0 ? {} : p;
                                        m = Aj(n)
                                            ? n.gdprApplies === !1
                                                ? !0
                                                : n.tcString === "tcunavailable"
                                                ? !p.Bi
                                                : (p.Bi ||
                                                      n.gdprApplies !==
                                                          void 0 ||
                                                      p.Jk) &&
                                                  (p.Bi ||
                                                      (typeof n.tcString ===
                                                          "string" &&
                                                          n.tcString.length))
                                                ? yj(n, "1", 0)
                                                : !0
                                            : !1;
                                        h["1"] = m;
                                    } else h[l] = yj(c, l, Bj[l]);
                            d = h;
                        }
                        if (d) {
                            a.tcString = c.tcString || "tcempty";
                            a.Gb = d;
                            var q = {},
                                r =
                                    ((q[K.g.M] = a.Gb["1"]
                                        ? "granted"
                                        : "denied"),
                                    q);
                            a.gdprApplies !== !0
                                ? (zh([K.g.M, K.g.ka, K.g.K]),
                                  (Ng().active = !0))
                                : ((r[K.g.ka] =
                                      a.Gb["3"] && a.Gb["4"]
                                          ? "granted"
                                          : "denied"),
                                  typeof a.tcfPolicyVersion === "number" &&
                                  a.tcfPolicyVersion >= 4
                                      ? (r[K.g.K] =
                                            a.Gb["1"] && a.Gb["7"]
                                                ? "granted"
                                                : "denied")
                                      : zh([K.g.K]),
                                  uh(
                                      r,
                                      { eventId: 0 },
                                      {
                                          gdprApplies: a
                                              ? a.gdprApplies
                                              : void 0,
                                          tcString: Jj() || "",
                                      }
                                  ));
                        }
                    } else zh([K.g.M, K.g.ka, K.g.K]);
                });
            } catch (c) {
                Hj(a), zh([K.g.M, K.g.ka, K.g.K]), (Ng().active = !0);
            }
        }
    }
    function Hj(a) {
        a.type = "e";
        a.tcString = "tcunavailable";
    }
    function Ij(a) {
        return (
            a.eventStatus === "tcloaded" ||
            a.eventStatus === "useractioncomplete" ||
            a.eventStatus === "cmpuishown"
        );
    }
    function Fj() {
        return C.gtag_enable_tcf_support === !0;
    }
    function Gj() {
        return Cj().enableAdvertiserConsentMode === !0;
    }
    function Jj() {
        var a = Cj();
        if (a.active) return a.tcString;
    }
    function Kj() {
        var a = Cj();
        if (a.active && a.gdprApplies !== void 0)
            return a.gdprApplies ? "1" : "0";
    }
    function Lj(a) {
        if (!Bj.hasOwnProperty(String(a))) return !0;
        var b = Cj();
        return b.active && b.Gb ? !!b.Gb[String(a)] : !0;
    }
    var Mj = [K.g.M, K.g.P, K.g.K, K.g.ka],
        Nj = {},
        Oj = ((Nj[K.g.M] = 1), (Nj[K.g.P] = 2), Nj);
    function Pj(a) {
        if (a === void 0) return 0;
        switch (U(a, K.g.da)) {
            case void 0:
                return 1;
            case !1:
                return 3;
            default:
                return 2;
        }
    }
    function Qj(a) {
        if (kh() === "US-CO" && Ab.globalPrivacyControl === !0) return !1;
        var b = Pj(a);
        if (b === 3) return !1;
        switch (Wg(K.g.ka)) {
            case 1:
            case 3:
                return !0;
            case 2:
                return !1;
            case 4:
                return b === 2;
            case 0:
                return !0;
            default:
                return !1;
        }
    }
    function Rj() {
        return Zg() || !Vg(K.g.M) || !Vg(K.g.P);
    }
    function Sj() {
        var a = {},
            b;
        for (b in Oj) Oj.hasOwnProperty(b) && (a[Oj[b]] = Wg(b));
        return "G1" + bc(a[1] || 0) + bc(a[2] || 0);
    }
    var Tj = {},
        Uj =
            ((Tj[K.g.M] = 0),
            (Tj[K.g.P] = 1),
            (Tj[K.g.K] = 2),
            (Tj[K.g.ka] = 3),
            Tj);
    function Vj(a) {
        switch (a) {
            case void 0:
                return 1;
            case !0:
                return 3;
            case !1:
                return 2;
            default:
                return 0;
        }
    }
    function Wj(a) {
        for (var b = "1", c = 0; c < Mj.length; c++) {
            var d = b,
                e,
                f = Mj[c],
                h = Ug.delegatedConsentTypes[f];
            e = h === void 0 ? 0 : Uj.hasOwnProperty(h) ? 12 | Uj[h] : 8;
            var l = Ng();
            l.accessedAny = !0;
            var m = l.entries[f] || {};
            e = (e << 2) | Vj(m.implicit);
            b =
                d +
                ("" +
                    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
                        e
                    ] +
                    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
                        (Vj(m.declare) << 4) |
                            (Vj(m.default) << 2) |
                            Vj(m.update)
                    ]);
        }
        var n = b,
            p =
                (kh() === "US-CO" && Ab.globalPrivacyControl === !0 ? 1 : 0) <<
                3,
            q = (Zg() ? 1 : 0) << 2,
            r = Pj(a);
        b =
            n +
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
                p | q | r
            ];
        P(106) &&
            (b +=
                "" +
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
                    (Ug.containerScopedDefaults.ad_storage << 4) |
                        (Ug.containerScopedDefaults.analytics_storage << 2) |
                        Ug.containerScopedDefaults.ad_user_data
                ] +
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
                    ((Ra(8) && Ug.usedContainerScopedDefaults ? 1 : 0) << 2) |
                        Ug.containerScopedDefaults.ad_personalization
                ]);
        return b;
    }
    function Xj() {
        if (!Vg(K.g.K)) return "-";
        for (
            var a = Object.keys(Nd), b = Xg(a), c = "", d = g(a), e = d.next();
            !e.done;
            e = d.next()
        ) {
            var f = e.value;
            b[f] && (c += Nd[f]);
        }
        (Ug.usedCorePlatformServices
            ? Ug.selectedAllCorePlatformServices
            : 1) && (c += "o");
        return c || "-";
    }
    function Yj() {
        return jh["6"] !== !1 || ((Fj() || Gj()) && Kj() === "1") ? "1" : "0";
    }
    function Zj() {
        return (
            (jh["6"] !== !1 ? !0 : !(!Fj() && !Gj()) && Kj() === "1") ||
            !Vg(K.g.K)
        );
    }
    function ak() {
        var a = "0",
            b = "0",
            c;
        var d = Cj();
        c = d.active ? d.cmpId : void 0;
        typeof c === "number" &&
            c >= 0 &&
            c <= 4095 &&
            ((a =
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
                    (c >> 6) & 63
                ]),
            (b =
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
                    c & 63
                ]));
        var e = "0",
            f;
        var h = Cj();
        f = h.active ? h.tcfPolicyVersion : void 0;
        typeof f === "number" &&
            f >= 0 &&
            f <= 63 &&
            (e =
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
                    f
                ]);
        var l = 0;
        jh["6"] !== !1 && (l |= 1);
        Kj() === "1" && (l |= 2);
        Fj() && (l |= 4);
        var m;
        var n = Cj();
        m =
            n.enableAdvertiserConsentMode !== void 0
                ? n.enableAdvertiserConsentMode
                    ? "1"
                    : "0"
                : void 0;
        m === "1" && (l |= 8);
        Ng().waitPeriodTimedOut && (l |= 16);
        return (
            "1" +
            a +
            b +
            e +
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
                l
            ]
        );
    }
    function bk() {
        return kh() === "US-CO";
    }
    function ck() {
        var a = !1;
        return a;
    }
    var dk = {
        UA: 1,
        AW: 2,
        DC: 3,
        G: 4,
        GF: 5,
        GT: 12,
        GTM: 14,
        HA: 6,
        MC: 7,
    };
    function ek(a) {
        a = a === void 0 ? {} : a;
        var b = eg.ctid.split("-")[0].toUpperCase(),
            c = {};
        c.ctid = eg.ctid;
        c.Ml = Je.wd;
        c.Ql = Je.Gf;
        c.pl = cg.ud ? 2 : 1;
        c.Vl = a.Oi;
        c.ri = eg.canonicalContainerId;
        c.ri !== a.oa && (c.oa = a.oa);
        var d = ng();
        c.zl = d ? d.canonicalContainerId : void 0;
        Pe ? ((c.Ze = dk[b]), c.Ze || (c.Ze = 0)) : (c.Ze = Ue ? 13 : 10);
        cf.D
            ? ((c.Xe = 0), (c.pk = 2))
            : Se
            ? (c.Xe = 1)
            : ck()
            ? (c.Xe = 2)
            : (c.Xe = 3);
        var e = {};
        e[6] = dg;
        cf.C === 2 ? (e[7] = !0) : cf.C === 1 && (e[2] = !0);
        c.vk = e;
        var f = a.Kf,
            h;
        var l = c.Ze,
            m = c.Xe;
        l === void 0
            ? (h = "")
            : (m || (m = 0), (h = "" + dc(1, 1) + ac((l << 2) | m)));
        var n = c.pk,
            p = "4" + h + (n ? "" + dc(2, 1) + ac(n) : ""),
            q,
            r = c.Ql;
        q = r && cc.test(r) ? "" + dc(3, 2) + r : "";
        var t,
            v = c.Ml;
        t = v ? "" + dc(4, 1) + ac(v) : "";
        var u;
        var w = c.ctid;
        if (w && f) {
            var x = w.split("-"),
                y = x[0].toUpperCase();
            if (y !== "GTM" && y !== "OPT") u = "";
            else {
                var A = x[1];
                u = "" + dc(5, 3) + ac(1 + A.length) + (c.pl || 0) + A;
            }
        } else u = "";
        var B = c.Vl,
            D = c.ri,
            J = c.oa,
            I = c.Um,
            F =
                p +
                q +
                t +
                u +
                (B ? "" + dc(6, 1) + ac(B) : "") +
                (D ? "" + dc(7, 3) + ac(D.length) + D : "") +
                (J ? "" + dc(8, 3) + ac(J.length) + J : "") +
                (I ? "" + dc(9, 3) + ac(I.length) + I : ""),
            M;
        var H = c.vk;
        H = H === void 0 ? {} : H;
        for (
            var Q = [], V = g(Object.keys(H)), T = V.next();
            !T.done;
            T = V.next()
        ) {
            var S = T.value;
            Q[Number(S)] = H[S];
        }
        if (Q.length) {
            var N = dc(10, 3),
                ia;
            if (Q.length === 0) ia = ac(0);
            else {
                for (var ca = [], Z = 0, pa = !1, Ea = 0; Ea < Q.length; Ea++) {
                    pa = !0;
                    var ta = Ea % 6;
                    Q[Ea] && (Z |= 1 << ta);
                    ta === 5 && (ca.push(ac(Z)), (Z = 0), (pa = !1));
                }
                pa && ca.push(ac(Z));
                ia = ca.join("");
            }
            var Ca = ia;
            M = "" + N + ac(Ca.length) + Ca;
        } else M = "";
        var Ja = c.zl;
        return F + M + (Ja ? "" + dc(11, 3) + ac(Ja.length) + Ja : "");
    }
    var fk = {
            gi: "service_worker_endpoint",
            ii: "shared_user_id",
            ek: "shared_user_id_requested",
            Qe: "shared_user_id_source",
        },
        gk;
    function hk(a) {
        if (!gk) {
            gk = {};
            for (
                var b = g(Object.keys(fk)), c = b.next();
                !c.done;
                c = b.next()
            )
                gk[fk[c.value]] = !0;
        }
        return !!gk[a];
    }
    function ik(a, b) {
        b = b === void 0 ? !1 : b;
        if (hk(a)) {
            var c,
                d,
                e =
                    (d = (c = Eb("google_tag_data", {})).xcd) != null
                        ? d
                        : (c.xcd = {});
            if (e[a]) return e[a];
            if (b) {
                var f = void 0,
                    h = 1,
                    l = {},
                    m = {
                        set: function (n) {
                            f = n;
                            m.notify();
                        },
                        get: function () {
                            return f;
                        },
                        subscribe: function (n) {
                            l[String(h)] = n;
                            return h++;
                        },
                        unsubscribe: function (n) {
                            var p = String(n);
                            return l.hasOwnProperty(p) ? (delete l[p], !0) : !1;
                        },
                        notify: function () {
                            for (
                                var n = g(Object.keys(l)), p = n.next();
                                !p.done;
                                p = n.next()
                            ) {
                                var q = p.value;
                                try {
                                    l[q](a, f);
                                } catch (r) {}
                            }
                        },
                    };
                return (e[a] = m);
            }
        }
    }
    function jk() {
        var a = ik(fk.ek, !0);
        a && a.set(!0);
    }
    function kk(a) {
        var b;
        return (b = ik(a)) == null ? void 0 : b.get();
    }
    function lk(a) {
        var b = fk.Qe;
        if (typeof a === "function") {
            var c;
            return (c = ik(b, !0)) == null ? void 0 : c.subscribe(a);
        }
    }
    function mk(a) {
        var b = ik(fk.Qe);
        b && b.unsubscribe(a);
    }
    function nk(a) {
        var b = 1,
            c,
            d,
            e;
        if (a)
            for (b = 0, d = a.length - 1; d >= 0; d--)
                (e = a.charCodeAt(d)),
                    (b = ((b << 6) & 268435455) + e + (e << 14)),
                    (c = b & 266338304),
                    (b = c !== 0 ? b ^ (c >> 21) : b);
        return b;
    }
    function ok(a) {
        return a.origin !== "null";
    }
    function pk(a, b, c, d) {
        var e;
        if (qk(d)) {
            for (
                var f = [], h = String(b || rk()).split(";"), l = 0;
                l < h.length;
                l++
            ) {
                var m = h[l].split("="),
                    n = m[0].replace(/^\s*|\s*$/g, "");
                if (n && n === a) {
                    var p = m
                        .slice(1)
                        .join("=")
                        .replace(/^\s*|\s*$/g, "");
                    p && c && (p = decodeURIComponent(p));
                    f.push(p);
                }
            }
            e = f;
        } else e = [];
        return e;
    }
    function sk(a, b, c, d, e) {
        if (qk(e)) {
            var f = tk(a, d, e);
            if (f.length === 1) return f[0].id;
            if (f.length !== 0) {
                f = uk(
                    f,
                    function (h) {
                        return h.Ck;
                    },
                    b
                );
                if (f.length === 1) return f[0].id;
                f = uk(
                    f,
                    function (h) {
                        return h.Bl;
                    },
                    c
                );
                return f[0] ? f[0].id : void 0;
            }
        }
    }
    function vk(a, b, c, d) {
        var e = rk(),
            f = window;
        ok(f) && (f.document.cookie = a);
        var h = rk();
        return e !== h || (c !== void 0 && pk(b, h, !1, d).indexOf(c) >= 0);
    }
    function wk(a, b, c) {
        function d(t, v, u) {
            if (u == null) return delete h[v], t;
            h[v] = u;
            return t + "; " + v + "=" + u;
        }
        function e(t, v) {
            if (v == null) return t;
            h[v] = !0;
            return t + "; " + v;
        }
        if (!qk(c.Ya)) return 2;
        var f;
        b == null
            ? (f = a + "=deleted; expires=" + new Date(0).toUTCString())
            : (c.encode && (b = encodeURIComponent(b)),
              (b = xk(b)),
              (f = a + "=" + b));
        var h = {};
        f = d(f, "path", c.path);
        var l;
        c.expires instanceof Date
            ? (l = c.expires.toUTCString())
            : c.expires != null && (l = "" + c.expires);
        f = d(f, "expires", l);
        f = d(f, "max-age", c.Qm);
        f = d(f, "samesite", c.Tm);
        c.secure && (f = e(f, "secure"));
        var m = c.domain;
        if (m && m.toLowerCase() === "auto") {
            for (var n = yk(), p = 0; p < n.length; ++p) {
                var q = n[p] !== "none" ? n[p] : void 0,
                    r = d(f, "domain", q);
                r = e(r, c.flags);
                if (!zk(q, c.path) && vk(r, a, b, c.Ya)) return 0;
            }
            return 1;
        }
        m && m.toLowerCase() !== "none" && (f = d(f, "domain", m));
        f = e(f, c.flags);
        return zk(m, c.path) ? 1 : vk(f, a, b, c.Ya) ? 0 : 1;
    }
    function Ak(a, b, c) {
        c.path == null && (c.path = "/");
        c.domain || (c.domain = "auto");
        return wk(a, b, c);
    }
    function uk(a, b, c) {
        for (var d = [], e = [], f, h = 0; h < a.length; h++) {
            var l = a[h],
                m = b(l);
            m === c
                ? d.push(l)
                : f === void 0 || m < f
                ? ((e = [l]), (f = m))
                : m === f && e.push(l);
        }
        return d.length > 0 ? d : e;
    }
    function tk(a, b, c) {
        for (
            var d = [], e = pk(a, void 0, void 0, c), f = 0;
            f < e.length;
            f++
        ) {
            var h = e[f].split("."),
                l = h.shift();
            if (!b || !l || b.indexOf(l) !== -1) {
                var m = h.shift();
                if (m) {
                    var n = m.split("-");
                    d.push({
                        id: h.join("."),
                        Ck: Number(n[0]) || 1,
                        Bl: Number(n[1]) || 1,
                    });
                }
            }
        }
        return d;
    }
    function xk(a) {
        a && a.length > 1200 && (a = a.substring(0, 1200));
        return a;
    }
    var Bk = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
        Ck = /(^|\.)doubleclick\.net$/i;
    function zk(a, b) {
        return (
            a !== void 0 &&
            (Ck.test(window.document.location.hostname) ||
                (b === "/" && Bk.test(a)))
        );
    }
    function Dk(a) {
        if (!a) return 1;
        var b = a;
        Ra(11) && a === "none" && (b = window.document.location.hostname);
        b = b.indexOf(".") === 0 ? b.substring(1) : b;
        return b.split(".").length;
    }
    function Ek(a) {
        if (!a || a === "/") return 1;
        a[0] !== "/" && (a = "/" + a);
        a[a.length - 1] !== "/" && (a += "/");
        return a.split("/").length - 1;
    }
    function Fk(a, b) {
        var c = "" + Dk(a),
            d = Ek(b);
        d > 1 && (c += "-" + d);
        return c;
    }
    var rk = function () {
            return ok(window) ? window.document.cookie : "";
        },
        qk = function (a) {
            return a && Ra(12)
                ? (Array.isArray(a) ? a : [a]).every(function (b) {
                      return Yg(b) && Vg(b);
                  })
                : !0;
        },
        yk = function () {
            var a = [],
                b = window.document.location.hostname.split(".");
            if (b.length === 4) {
                var c = b[b.length - 1];
                if (Number(c).toString() === c) return ["none"];
            }
            for (var d = b.length - 2; d >= 0; d--)
                a.push(b.slice(d).join("."));
            var e = window.document.location.hostname;
            Ck.test(e) || Bk.test(e) || a.push("none");
            return a;
        };
    function Gk(a) {
        var b = Math.round(Math.random() * 2147483647);
        return a ? String(b ^ (nk(a) & 2147483647)) : String(b);
    }
    function Hk(a) {
        return [Gk(a), Math.round(fb() / 1e3)].join(".");
    }
    function Ik(a, b, c, d) {
        var e,
            f = Number(a.Xa != null ? a.Xa : void 0);
        f !== 0 && (e = new Date((b || fb()) + 1e3 * (f || 7776e3)));
        return {
            path: a.path,
            domain: a.domain,
            flags: a.flags,
            encode: !!c,
            expires: e,
            Ya: d,
        };
    }
    var Jk;
    function Kk() {
        function a(h) {
            c(h.target || h.srcElement || {});
        }
        function b(h) {
            d(h.target || h.srcElement || {});
        }
        var c = Lk,
            d = Mk,
            e = Nk();
        if (!e.init) {
            Nb(E, "mousedown", a);
            Nb(E, "keyup", a);
            Nb(E, "submit", b);
            var f = HTMLFormElement.prototype.submit;
            HTMLFormElement.prototype.submit = function () {
                d(this);
                f.call(this);
            };
            e.init = !0;
        }
    }
    function Ok(a, b, c, d, e) {
        var f = {
            callback: a,
            domains: b,
            fragment: c === 2,
            placement: c,
            forms: d,
            sameHost: e,
        };
        Nk().decorators.push(f);
    }
    function Pk(a, b, c) {
        for (var d = Nk().decorators, e = {}, f = 0; f < d.length; ++f) {
            var h = d[f],
                l;
            if ((l = !c || h.forms))
                a: {
                    var m = h.domains,
                        n = a,
                        p = !!h.sameHost;
                    if (m && (p || n !== E.location.hostname))
                        for (var q = 0; q < m.length; q++)
                            if (m[q] instanceof RegExp) {
                                if (m[q].test(n)) {
                                    l = !0;
                                    break a;
                                }
                            } else if (
                                n.indexOf(m[q]) >= 0 ||
                                (p && m[q].indexOf(n) >= 0)
                            ) {
                                l = !0;
                                break a;
                            }
                    l = !1;
                }
            if (l) {
                var r = h.placement;
                r === void 0 && (r = h.fragment ? 2 : 1);
                r === b && ib(e, h.callback());
            }
        }
        return e;
    }
    function Nk() {
        var a = Eb("google_tag_data", {}),
            b = a.gl;
        (b && b.decorators) || ((b = { decorators: [] }), (a.gl = b));
        return b;
    }
    var Qk = /(.*?)\*(.*?)\*(.*)/,
        Rk = /^https?:\/\/([^\/]*?)\.?cdn\.ampproject\.org\/?(.*)/,
        Sk = /^(?:www\.|m\.|amp\.)+/,
        Tk = /([^?#]+)(\?[^#]*)?(#.*)?/;
    function Uk(a) {
        var b = Tk.exec(a);
        if (b) return { ng: b[1], query: b[2], fragment: b[3] };
    }
    function Vk(a, b) {
        var c = [
                Ab.userAgent,
                new Date().getTimezoneOffset(),
                Ab.userLanguage || Ab.language,
                Math.floor(fb() / 60 / 1e3) - (b === void 0 ? 0 : b),
                a,
            ].join("*"),
            d;
        if (!(d = Jk)) {
            for (var e = Array(256), f = 0; f < 256; f++) {
                for (var h = f, l = 0; l < 8; l++)
                    h = h & 1 ? (h >>> 1) ^ 3988292384 : h >>> 1;
                e[f] = h;
            }
            d = e;
        }
        Jk = d;
        for (var m = 4294967295, n = 0; n < c.length; n++)
            m = (m >>> 8) ^ Jk[(m ^ c.charCodeAt(n)) & 255];
        return ((m ^ -1) >>> 0).toString(36);
    }
    function Wk() {
        return function (a) {
            var b = Df(C.location.href),
                c = b.search.replace("?", ""),
                d = wf(c, "_gl", !0) || "";
            a.query = Xk(d) || {};
            var e = xf(b, "fragment"),
                f;
            var h = -1;
            if (kb(e, "_gl=")) h = 4;
            else {
                var l = e.indexOf("&_gl=");
                l > 0 && (h = l + 3 + 2);
            }
            if (h < 0) f = void 0;
            else {
                var m = e.indexOf("&", h);
                f = m < 0 ? e.substring(h) : e.substring(h, m);
            }
            a.fragment = Xk(f || "") || {};
        };
    }
    function Yk(a) {
        var b = Wk(),
            c = Nk();
        c.data || ((c.data = { query: {}, fragment: {} }), b(c.data));
        var d = {},
            e = c.data;
        e && (ib(d, e.query), a && ib(d, e.fragment));
        return d;
    }
    var Xk = function (a) {
        try {
            var b = Zk(a, 3);
            if (b !== void 0) {
                for (
                    var c = {}, d = b ? b.split("*") : [], e = 0;
                    e + 1 < d.length;
                    e += 2
                ) {
                    var f = d[e],
                        h = Ka(d[e + 1]);
                    c[f] = h;
                }
                Ma("TAGGING", 6);
                return c;
            }
        } catch (l) {
            Ma("TAGGING", 8);
        }
    };
    function Zk(a, b) {
        if (a) {
            var c;
            a: {
                for (var d = a, e = 0; e < 3; ++e) {
                    var f = Qk.exec(d);
                    if (f) {
                        c = f;
                        break a;
                    }
                    d = decodeURIComponent(d);
                }
                c = void 0;
            }
            var h = c;
            if (h && h[1] === "1") {
                var l = h[3],
                    m;
                a: {
                    for (var n = h[2], p = 0; p < b; ++p)
                        if (n === Vk(l, p)) {
                            m = !0;
                            break a;
                        }
                    m = !1;
                }
                if (m) return l;
                Ma("TAGGING", 7);
            }
        }
    }
    function $k(a, b, c, d, e) {
        function f(p) {
            var q = p,
                r = new RegExp("(.*?)(^|&)" + a + "=([^&]*)&?(.*)").exec(q),
                t = q;
            if (r) {
                var v = r[2],
                    u = r[4];
                t = r[1];
                u && (t = t + v + u);
            }
            p = t;
            var w = p.charAt(p.length - 1);
            p && w !== "&" && (p += "&");
            return p + n;
        }
        d = d === void 0 ? !1 : d;
        e = e === void 0 ? !1 : e;
        var h = Uk(c);
        if (!h) return "";
        var l = h.query || "",
            m = h.fragment || "",
            n = a + "=" + b;
        d
            ? (m.substring(1).length !== 0 && e) ||
              (m = "#" + f(m.substring(1)))
            : (l = "?" + f(l.substring(1)));
        return "" + h.ng + l + m;
    }
    function al(a, b) {
        function c(n, p, q) {
            var r;
            a: {
                for (var t in n)
                    if (n.hasOwnProperty(t)) {
                        r = !0;
                        break a;
                    }
                r = !1;
            }
            if (r) {
                var v,
                    u = [],
                    w;
                for (w in n)
                    if (n.hasOwnProperty(w)) {
                        var x = n[w];
                        x !== void 0 &&
                            x === x &&
                            x !== null &&
                            x.toString() !== "[object Object]" &&
                            (u.push(w), u.push(Ia(String(x))));
                    }
                var y = u.join("*");
                v = ["1", Vk(y), y].join("*");
                d
                    ? (Ra(4) || Ra(1) || !p) && bl("_gl", v, a, p, q)
                    : cl("_gl", v, a, p, q);
            }
        }
        var d = (a.tagName || "").toUpperCase() === "FORM",
            e = Pk(b, 1, d),
            f = Pk(b, 2, d),
            h = Pk(b, 4, d),
            l = Pk(b, 3, d);
        c(e, !1, !1);
        c(f, !0, !1);
        Ra(1) && c(h, !0, !0);
        for (var m in l) l.hasOwnProperty(m) && dl(m, l[m], a);
    }
    function dl(a, b, c) {
        c.tagName.toLowerCase() === "a"
            ? cl(a, b, c)
            : c.tagName.toLowerCase() === "form" && bl(a, b, c);
    }
    function cl(a, b, c, d, e) {
        d = d === void 0 ? !1 : d;
        e = e === void 0 ? !1 : e;
        var f;
        if ((f = c.href)) {
            var h;
            if (!(h = !Ra(5) || d)) {
                var l = C.location.href,
                    m = Uk(c.href),
                    n = Uk(l);
                h = !(
                    m &&
                    n &&
                    m.ng === n.ng &&
                    m.query === n.query &&
                    m.fragment
                );
            }
            f = h;
        }
        if (f) {
            var p = $k(a, b, c.href, d, e);
            wb.test(p) && (c.href = p);
        }
    }
    function bl(a, b, c, d, e) {
        d = d === void 0 ? !1 : d;
        e = e === void 0 ? !1 : e;
        if (c && c.action) {
            var f = (c.method || "").toLowerCase();
            if (f !== "get" || d) {
                if (f === "get" || f === "post") {
                    var h = $k(a, b, c.action, d, e);
                    wb.test(h) && (c.action = h);
                }
            } else {
                for (
                    var l = c.childNodes || [], m = !1, n = 0;
                    n < l.length;
                    n++
                ) {
                    var p = l[n];
                    if (p.name === a) {
                        p.setAttribute("value", b);
                        m = !0;
                        break;
                    }
                }
                if (!m) {
                    var q = E.createElement("input");
                    q.setAttribute("type", "hidden");
                    q.setAttribute("name", a);
                    q.setAttribute("value", b);
                    c.appendChild(q);
                }
            }
        }
    }
    function Lk(a) {
        try {
            var b;
            a: {
                for (var c = a, d = 100; c && d > 0; ) {
                    if (c.href && c.nodeName.match(/^a(?:rea)?$/i)) {
                        b = c;
                        break a;
                    }
                    c = c.parentNode;
                    d--;
                }
                b = null;
            }
            var e = b;
            if (e) {
                var f = e.protocol;
                (f !== "http:" && f !== "https:") || al(e, e.hostname);
            }
        } catch (h) {}
    }
    function Mk(a) {
        try {
            if (a.action) {
                var b = xf(Df(a.action), "host");
                al(a, b);
            }
        } catch (c) {}
    }
    function el(a, b, c, d) {
        Kk();
        var e = c === "fragment" ? 2 : 1;
        d = !!d;
        Ok(a, b, e, d, !1);
        e === 2 && Ma("TAGGING", 23);
        d && Ma("TAGGING", 24);
    }
    function fl(a, b) {
        Kk();
        Ok(a, [zf(C.location, "host", !0)], b, !0, !0);
    }
    function gl() {
        var a = E.location.hostname,
            b = Rk.exec(E.referrer);
        if (!b) return !1;
        var c = b[2],
            d = b[1],
            e = "";
        if (c) {
            var f = c.split("/"),
                h = f[1];
            e = h === "s" ? decodeURIComponent(f[2]) : decodeURIComponent(h);
        } else if (d) {
            if (d.indexOf("xn--") === 0) return !1;
            e = d.replace(/-/g, ".").replace(/\.\./g, "-");
        }
        var l = a.replace(Sk, ""),
            m = e.replace(Sk, "");
        return l === m || lb(l, "." + m);
    }
    function hl(a, b) {
        return a === !1 ? !1 : a || b || gl();
    }
    var il = ["1"],
        jl = {},
        kl = {};
    function ll(a, b) {
        b = b === void 0 ? !0 : b;
        var c = ml(a.prefix);
        if (!jl[c])
            if (nl(c, a.path, a.domain)) {
                var d = kl[ml(a.prefix)];
                ol(a, d ? d.id : void 0, d ? d.jg : void 0);
            } else {
                var e = Ff("auiddc");
                e
                    ? (Ma("TAGGING", 17), (jl[c] = e))
                    : b && (pl(ml(a.prefix), Hk(), a), nl(c, a.path, a.domain));
            }
    }
    function ol(a, b, c) {
        var d = ml(a.prefix),
            e = jl[d];
        if (e) {
            var f = e.split(".");
            if (f.length === 2) {
                var h = Number(f[1]) || 0;
                if (h) {
                    var l = e;
                    b &&
                        (l =
                            e +
                            "." +
                            b +
                            "." +
                            (c ? c : Math.floor(fb() / 1e3)));
                    pl(d, l, a, h * 1e3);
                }
            }
        }
    }
    function pl(a, b, c, d) {
        var e = ["1", Fk(c.domain, c.path), b].join("."),
            f = Ik(c, d);
        f.Ya = ql();
        Ak(a, e, f);
    }
    function nl(a, b, c) {
        var d = sk(a, Dk(b), Ek(c), il, ql());
        if (!d) return !1;
        rl(a, d);
        return !0;
    }
    function rl(a, b) {
        var c = b.split(".");
        c.length === 5
            ? ((jl[a] = c.slice(0, 2).join(".")),
              (kl[a] = { id: c.slice(2, 4).join("."), jg: Number(c[4]) || 0 }))
            : c.length === 3
            ? (kl[a] = { id: c.slice(0, 2).join("."), jg: Number(c[2]) || 0 })
            : (jl[a] = b);
    }
    function ml(a) {
        return (a || "_gcl") + "_au";
    }
    function sl(a) {
        function b() {
            Vg(c) && a();
        }
        var c = ql();
        bh(function () {
            b();
            Vg(c) || ch(b, c);
        }, c);
    }
    function tl(a) {
        var b = Yk(!0),
            c = ml(a.prefix);
        sl(function () {
            var d = b[c];
            if (d) {
                rl(c, d);
                var e = Number(jl[c].split(".")[1]) * 1e3;
                if (e) {
                    Ma("TAGGING", 16);
                    var f = Ik(a, e);
                    f.Ya = ql();
                    Ak(c, ["1", Fk(a.domain, a.path), d].join("."), f);
                }
            }
        });
    }
    function ul(a, b, c, d, e) {
        e = e || {};
        var f = function () {
            var h = {},
                l = sk(a, Dk(e.path), Ek(e.domain), il, ql());
            l && (h[a] = l);
            return h;
        };
        sl(function () {
            el(f, b, c, d);
        });
    }
    function ql() {
        return ["ad_storage", "ad_user_data"];
    }
    var vl = {},
        wl =
            ((vl.k = { xa: /^[\w-]+$/ }),
            (vl.b = { xa: /^[\w-]+$/, rg: !0 }),
            (vl.i = { xa: /^[1-9]\d*$/ }),
            (vl.u = { xa: /^[1-9]\d*$/ }),
            vl);
    var xl = {},
        Al =
            ((xl[5] = { Vi: { 2: yl }, Mf: ["k", "i", "b", "u"] }),
            (xl[4] = { Vi: { 2: yl, GCL: zl }, Mf: ["k", "i", "b"] }),
            xl);
    function Bl(a) {
        var b = Al[5];
        if (b) {
            var c = a.split(".")[0];
            if (c) {
                var d = b.Vi[c];
                if (d) return d(a, 5);
            }
        }
    }
    function yl(a, b) {
        var c = a.split(".");
        if (c.length === 3) {
            var d = {},
                e = Al[b];
            if (e) {
                for (
                    var f = e.Mf, h = g(c[2].split("$")), l = h.next();
                    !l.done;
                    l = h.next()
                ) {
                    var m = l.value,
                        n = m[0];
                    if (f.indexOf(n) !== -1)
                        try {
                            var p = decodeURIComponent(m.substring(1)),
                                q = wl[n];
                            q &&
                                (q.rg
                                    ? ((d[n] = d[n] || []), d[n].push(p))
                                    : (d[n] = p));
                        } catch (r) {}
                }
                return d;
            }
        }
    }
    function Cl(a, b) {
        var c = Al[5];
        if (c) {
            for (var d = [], e = g(c.Mf), f = e.next(); !f.done; f = e.next()) {
                var h = f.value,
                    l = wl[h];
                if (l) {
                    var m = a[h];
                    if (m !== void 0)
                        if (l.rg && Array.isArray(m))
                            for (
                                var n = g(m), p = n.next();
                                !p.done;
                                p = n.next()
                            )
                                d.push(encodeURIComponent("" + h + p.value));
                        else d.push(encodeURIComponent("" + h + m));
                }
            }
            return ["2", b || "1", d.join("$")].join(".");
        }
    }
    function zl(a) {
        var b = a.split(".");
        b.shift();
        var c = b.shift(),
            d = b.shift(),
            e = {};
        return (e.k = d), (e.i = c), (e.b = b), e;
    }
    var Dl = new Map([
        [5, "ad_storage"],
        [4, ["ad_storage", "ad_user_data"]],
    ]);
    function El(a) {
        if (Al[5]) {
            for (
                var b = [],
                    c = pk(a, void 0, void 0, Dl.get(5)),
                    d = g(c),
                    e = d.next();
                !e.done;
                e = d.next()
            ) {
                var f = Bl(e.value);
                f && (Fl(f), b.push(f));
            }
            return b;
        }
    }
    function Gl(a, b, c, d) {
        c = c || {};
        var e = Cl(b, Fk(c.domain, c.path));
        if (e) {
            var f = Ik(c, d, void 0, Dl.get(5));
            Ak(a, e, f);
        }
    }
    function Hl(a, b) {
        var c = b.xa;
        return typeof c === "function" ? c(a) : c.test(a);
    }
    function Fl(a) {
        for (
            var b = g(Object.keys(a)), c = b.next(), d = {};
            !c.done;
            d = { Cd: void 0 }, c = b.next()
        ) {
            var e = c.value,
                f = a[e];
            d.Cd = wl[e];
            d.Cd
                ? d.Cd.rg
                    ? (a[e] = Array.isArray(f)
                          ? f.filter(
                                (function (h) {
                                    return function (l) {
                                        return Hl(l, h.Cd);
                                    };
                                })(d)
                            )
                          : void 0)
                    : (typeof f === "string" && Hl(f, d.Cd)) || (a[e] = void 0)
                : (a[e] = void 0);
        }
    }
    function Il(a) {
        for (
            var b = [],
                c = E.cookie.split(";"),
                d = new RegExp(
                    "^\\s*" + (a || "_gac") + "_(UA-\\d+-\\d+)=\\s*(.+?)\\s*$"
                ),
                e = 0;
            e < c.length;
            e++
        ) {
            var f = c[e].match(d);
            f &&
                b.push({
                    wg: f[1],
                    value: f[2],
                    timestamp: Number(f[2].split(".")[1]) || 0,
                });
        }
        b.sort(function (h, l) {
            return l.timestamp - h.timestamp;
        });
        return b;
    }
    function Jl(a, b) {
        var c = Il(a),
            d = {};
        if (!c || !c.length) return d;
        for (var e = 0; e < c.length; e++) {
            var f = c[e].value.split(".");
            if (
                !(
                    f[0] !== "1" ||
                    (b && f.length < 3) ||
                    (!b && f.length !== 3)
                ) &&
                Number(f[1])
            ) {
                d[c[e].wg] || (d[c[e].wg] = []);
                var h = {
                    version: f[0],
                    timestamp: Number(f[1]) * 1e3,
                    O: f[2],
                };
                b && f.length > 3 && (h.labels = f.slice(3));
                d[c[e].wg].push(h);
            }
        }
        return d;
    }
    var Kl = ["ad_storage", "ad_user_data"];
    function Ll() {
        var a = Ml();
        if (a.error) return a;
        if (!a.value) return { error: 2 };
        var b;
        try {
            b = a.value.gclid;
        } catch (c) {
            return { error: 11 };
        }
        return b ? { value: b } : { value: void 0 };
    }
    function Ml() {
        if (!Vg(Kl)) return { error: 3 };
        if (!C.localStorage) return { error: 1 };
        var a = { schema: "gcl", version: 1 },
            b = void 0;
        try {
            b = C.localStorage.getItem("_gcl_ls");
        } catch (d) {
            return { error: 13 };
        }
        try {
            if (b) {
                var c = JSON.parse(b);
                if (c && typeof c === "object") a = c;
                else return { error: 12 };
            }
        } catch (d) {
            return { error: 8 };
        }
        if (a.schema !== "gcl") return { error: 4 };
        if (a.version !== 1) return { error: 5 };
        try {
            Nl(a);
        } catch (d) {
            return { error: 8 };
        }
        return { value: a, error: 0 };
    }
    function Nl(a) {
        if (a && typeof a === "object")
            if ("expires" in a && "value" in a)
                Date.now() > a.expires && ((a.value = null), (a.error = 9));
            else
                for (
                    var b = g(Object.keys(a)), c = b.next();
                    !c.done;
                    c = b.next()
                )
                    Nl(a[c.value]);
    }
    var Ol = /^\w+$/,
        Pl = /^[\w-]+$/,
        Ql = {},
        Rl =
            ((Ql.aw = "_aw"),
            (Ql.dc = "_dc"),
            (Ql.gf = "_gf"),
            (Ql.gp = "_gp"),
            (Ql.gs = "_gs"),
            (Ql.ha = "_ha"),
            (Ql.ag = "_ag"),
            (Ql.gb = "_gb"),
            Ql);
    function Sl() {
        return ["ad_storage", "ad_user_data"];
    }
    function Tl(a) {
        return !Ra(12) || Vg(a);
    }
    function Ul(a, b) {
        function c() {
            var d = Tl(b);
            d && a();
            return d;
        }
        bh(function () {
            c() || ch(c, b);
        }, b);
    }
    function Vl(a) {
        return Wl(a).map(function (b) {
            return b.O;
        });
    }
    function Xl(a) {
        return Yl(a)
            .filter(function (b) {
                return b.O;
            })
            .map(function (b) {
                return b.O;
            });
    }
    function Yl(a) {
        var b = Zl(a.prefix),
            c = $l("gb", b),
            d = $l("ag", b);
        if (!d || !c) return [];
        var e = function (l) {
                return function (m) {
                    m.type = l;
                    return m;
                };
            },
            f = Wl(c).map(e("gb")),
            h = (Ra(7) ? am(d) : []).map(e("ag"));
        return f.concat(h).sort(function (l, m) {
            return m.timestamp - l.timestamp;
        });
    }
    function bm(a, b, c, d, e, f) {
        var h = Wa(a, function (l) {
            return l.O === c;
        });
        h
            ? (h.timestamp < d && ((h.timestamp = d), (h.Gc = f)),
              (h.labels = cm(h.labels || [], e || [])))
            : a.push({ version: b, O: c, timestamp: d, labels: e, Gc: f });
    }
    function am(a) {
        for (
            var b = El(a) || [], c = [], d = g(b), e = d.next();
            !e.done;
            e = d.next()
        ) {
            var f = e.value,
                h = f,
                l = h.k,
                m = h.b,
                n = dm(f);
            if (n) {
                var p = void 0;
                Ra(13) && (p = f.u);
                bm(c, "2", l, n, m || [], p);
            }
        }
        return c.sort(function (q, r) {
            return r.timestamp - q.timestamp;
        });
    }
    function Wl(a) {
        for (
            var b = [],
                c = pk(a, E.cookie, void 0, Sl()),
                d = g(c),
                e = d.next();
            !e.done;
            e = d.next()
        ) {
            var f = em(e.value);
            if (f != null) {
                var h = f;
                bm(b, h.version, h.O, h.timestamp, h.labels);
            }
        }
        b.sort(function (l, m) {
            return m.timestamp - l.timestamp;
        });
        return fm(b);
    }
    function gm(a, b) {
        for (var c = [], d = g(a), e = d.next(); !e.done; e = d.next()) {
            var f = e.value;
            c.includes(f) || c.push(f);
        }
        for (var h = g(b), l = h.next(); !l.done; l = h.next()) {
            var m = l.value;
            c.includes(m) || c.push(m);
        }
        return c;
    }
    function hm(a, b) {
        var c = Wa(a, function (d) {
            return d.O === b.O;
        });
        c
            ? (c.timestamp < b.timestamp &&
                  ((c.timestamp = b.timestamp), (c.Gc = b.Gc)),
              (c.Ca = c.Ca
                  ? b.Ca
                      ? c.timestamp < b.timestamp
                          ? b.Ca
                          : c.Ca
                      : c.Ca || 0
                  : b.Ca || 0),
              (c.labels = gm(c.labels || [], b.labels || [])),
              (c.hc = gm(c.hc || [], b.hc || [])))
            : a.push(b);
    }
    function im() {
        var a = Ll();
        if (!a || a.error || !a.value || typeof a.value !== "object")
            return null;
        var b = a.value;
        try {
            if (!("value" in b && b.value) || typeof b.value !== "object")
                return null;
            var c = b.value,
                d = c.value;
            return d && d.match(Pl)
                ? {
                      version: "",
                      O: d,
                      timestamp: Number(c.creationTimeMs) || 0,
                      labels: [],
                      Ca: c.linkDecorationSource || 0,
                      hc: [2],
                  }
                : null;
        } catch (e) {
            return null;
        }
    }
    function jm(a) {
        for (
            var b = [],
                c = pk(a, E.cookie, void 0, Sl()),
                d = g(c),
                e = d.next();
            !e.done;
            e = d.next()
        ) {
            var f = em(e.value);
            f != null && ((f.Gc = void 0), (f.Ca = 0), (f.hc = [1]), hm(b, f));
        }
        var h = im();
        h &&
            ((h.Gc = void 0),
            (h.Ca = h.Ca || 0),
            (h.hc = h.hc || [2]),
            hm(b, h));
        b.sort(function (l, m) {
            return m.timestamp - l.timestamp;
        });
        return fm(b);
    }
    function cm(a, b) {
        if (!a.length) return b;
        if (!b.length) return a;
        var c = {};
        return a.concat(b).filter(function (d) {
            return c.hasOwnProperty(d) ? !1 : (c[d] = !0);
        });
    }
    function Zl(a) {
        return a && typeof a === "string" && a.match(Ol) ? a : "_gcl";
    }
    function km(a, b, c) {
        var d = Df(a),
            e = { value: xf(d, "query", !1, void 0, "gclid"), Ca: c ? 4 : 2 };
        if (b && !e.value) {
            var f = d.hash.replace("#", "");
            e.value = wf(f, "gclid");
            e.Ca = 3;
        }
        return e.value ? [e] : [];
    }
    function lm(a, b) {
        var c = Ra(7),
            d = Df(a),
            e = xf(d, "query", !1, void 0, "gclid"),
            f = xf(d, "query", !1, void 0, "gclsrc"),
            h = xf(d, "query", !1, void 0, "wbraid");
        h = qb(h);
        var l;
        c && (l = xf(d, "query", !1, void 0, "gbraid"));
        var m = xf(d, "query", !1, void 0, "gad_source"),
            n = xf(d, "query", !1, void 0, "dclid");
        if (b && (!e || !f || !h || (c && !l))) {
            var p = d.hash.replace("#", "");
            e = e || wf(p, "gclid");
            f = f || wf(p, "gclsrc");
            h = h || wf(p, "wbraid");
            c && (l = l || wf(p, "gbraid"));
            m = m || wf(p, "gad_source");
        }
        return mm(e, f, n, h, l, m);
    }
    function nm() {
        return lm(C.location.href, !0);
    }
    function mm(a, b, c, d, e, f) {
        var h = {},
            l = function (m, n) {
                h[n] || (h[n] = []);
                h[n].push(m);
            };
        h.gclid = a;
        h.gclsrc = b;
        h.dclid = c;
        if (a !== void 0 && a.match(Pl))
            switch (b) {
                case void 0:
                    l(a, "aw");
                    break;
                case "aw.ds":
                    l(a, "aw");
                    l(a, "dc");
                    break;
                case "ds":
                    l(a, "dc");
                    break;
                case "3p.ds":
                    l(a, "dc");
                    break;
                case "gf":
                    l(a, "gf");
                    break;
                case "ha":
                    l(a, "ha");
            }
        c && l(c, "dc");
        d !== void 0 && Pl.test(d) && ((h.wbraid = d), l(d, "gb"));
        Ra(7) && e !== void 0 && Pl.test(e) && ((h.gbraid = e), l(e, "ag"));
        f !== void 0 && Pl.test(f) && ((h.gad_source = f), l(f, "gs"));
        return h;
    }
    function om(a) {
        var b = nm();
        if (Ra(6)) {
            for (
                var c = !0, d = g(Object.keys(b)), e = d.next();
                !e.done;
                e = d.next()
            )
                if (b[e.value] !== void 0) {
                    c = !1;
                    break;
                }
            c && ((b = lm(C.document.referrer, !1)), (b.gad_source = void 0));
        }
        pm(b, !1, a);
    }
    function qm(a) {
        om(a);
        var b = km(C.location.href, !0, !1);
        Ra(6) && !b.length && (b = km(C.document.referrer, !1, !0));
        if (b.length) {
            var c = b[0];
            a = a || {};
            var d = fb(),
                e = Ik(a, d, !0),
                f = Sl(),
                h = function () {
                    if (Tl(f) && e.expires !== void 0) {
                        var l = {
                                value: {
                                    value: c.value,
                                    creationTimeMs: d,
                                    linkDecorationSource: c.Ca,
                                },
                                expires: Number(e.expires),
                            },
                            m = Ml();
                        if (!m.error && m.value)
                            a: if (((m.value.gclid = l), !m.error && m.value)) {
                                var n = m.value,
                                    p;
                                try {
                                    p = JSON.stringify(n);
                                } catch (q) {
                                    break a;
                                }
                                try {
                                    C.localStorage.setItem("_gcl_ls", p);
                                } catch (q) {}
                            }
                    }
                };
            bh(function () {
                h();
                Tl(f) || ch(h, f);
            }, f);
        }
    }
    function pm(a, b, c, d, e) {
        c = c || {};
        e = e || [];
        var f = Zl(c.prefix),
            h = d || fb(),
            l = Math.round(h / 1e3),
            m = Sl(),
            n = !1,
            p = !1,
            q = function () {
                if (Tl(m)) {
                    var r = Ik(c, h, !0);
                    r.Ya = m;
                    for (
                        var t = function (F, M) {
                                var H = $l(F, f);
                                H && (Ak(H, M, r), F !== "gb" && (n = !0));
                            },
                            v = function (F) {
                                var M = ["GCL", l, F];
                                e.length > 0 && M.push(e.join("."));
                                return M.join(".");
                            },
                            u = g(["aw", "dc", "gf", "ha", "gp"]),
                            w = u.next();
                        !w.done;
                        w = u.next()
                    ) {
                        var x = w.value;
                        a[x] && t(x, v(a[x][0]));
                    }
                    if (!n && a.gb) {
                        var y = a.gb[0],
                            A = $l("gb", f);
                        (!b &&
                            Wl(A).some(function (F) {
                                return (
                                    F.O === y && F.labels && F.labels.length > 0
                                );
                            })) ||
                            t("gb", v(y));
                    }
                }
                if (
                    !p &&
                    Ra(7) &&
                    a.gbraid &&
                    Tl("ad_storage") &&
                    ((p = !0), !n)
                ) {
                    var B = a.gbraid,
                        D = $l("ag", f);
                    if (
                        b ||
                        !(Ra(7) ? am(D) : []).some(function (F) {
                            return F.O === B && F.labels && F.labels.length > 0;
                        })
                    ) {
                        var J = {},
                            I = ((J.k = B), (J.i = "" + l), (J.b = e), J);
                        Gl(D, I, c, h);
                    }
                }
                rm(a, f, h, c);
            };
        bh(function () {
            q();
            Tl(m) || ch(q, m);
        }, m);
    }
    function rm(a, b, c, d) {
        if (a.gad_source !== void 0 && Tl("ad_storage")) {
            var e = a.gad_source,
                f = $l("gs", b);
            if (f) {
                var h = Math.round((fb() - (Yb() || 0)) / 1e3),
                    l;
                if (Ra(13)) {
                    var m,
                        n = String,
                        p = C.location.hostname,
                        q = C.location.pathname,
                        r = (p = Gf(p));
                    r.split(".").length > 2 &&
                        (r = r.replace(
                            /^(www[0-9]*|web|ftp|wap|home|m|w|amp|mobile)\./,
                            ""
                        ));
                    p = r;
                    q = Gf(q);
                    var t = q.split(";")[0];
                    t = t.replace(/\/(ar|slp|web|index)?\/?$/, "");
                    m = n(nk(("" + p + t).toLowerCase()));
                    var v = {};
                    l = ((v.k = e), (v.i = "" + h), (v.u = m), v);
                } else {
                    var u = {};
                    l = ((u.k = e), (u.i = "" + h), u);
                }
                Gl(f, l, d, c);
            }
        }
    }
    function sm(a, b) {
        var c = Yk(!0);
        Ul(function () {
            for (var d = Zl(b.prefix), e = 0; e < a.length; ++e) {
                var f = a[e];
                if (Rl[f] !== void 0) {
                    var h = $l(f, d),
                        l = c[h];
                    if (l) {
                        var m = Math.min(tm(l), fb()),
                            n;
                        b: {
                            for (
                                var p = m,
                                    q = pk(h, E.cookie, void 0, Sl()),
                                    r = 0;
                                r < q.length;
                                ++r
                            )
                                if (tm(q[r]) > p) {
                                    n = !0;
                                    break b;
                                }
                            n = !1;
                        }
                        if (!n) {
                            var t = Ik(b, m, !0);
                            t.Ya = Sl();
                            Ak(h, l, t);
                        }
                    }
                }
            }
            pm(mm(c.gclid, c.gclsrc), !1, b);
        }, Sl());
    }
    function um(a) {
        var b = [];
        Ra(7) && b.push("ag");
        if (b.length !== 0) {
            var c = Yk(!0),
                d = Zl(a.prefix);
            Ul(
                function () {
                    for (var e = 0; e < b.length; ++e) {
                        var f = $l(b[e], d);
                        if (f) {
                            var h = c[f];
                            if (h) {
                                var l = Bl(h);
                                if (l) {
                                    var m = dm(l);
                                    m || (m = fb());
                                    var n;
                                    a: {
                                        for (
                                            var p = m, q = El(f), r = 0;
                                            r < q.length;
                                            ++r
                                        )
                                            if (dm(q[r]) > p) {
                                                n = !0;
                                                break a;
                                            }
                                        n = !1;
                                    }
                                    if (n) break;
                                    l.i = "" + Math.round(m / 1e3);
                                    Gl(f, l, a, m);
                                }
                            }
                        }
                    }
                },
                ["ad_storage"]
            );
        }
    }
    function $l(a, b) {
        var c = Rl[a];
        if (c !== void 0) return b + c;
    }
    function tm(a) {
        return vm(a.split(".")).length !== 0
            ? (Number(a.split(".")[1]) || 0) * 1e3
            : 0;
    }
    function dm(a) {
        return a ? (Number(a.i) || 0) * 1e3 : 0;
    }
    function em(a) {
        var b = vm(a.split("."));
        return b.length === 0
            ? null
            : {
                  version: b[0],
                  O: b[2],
                  timestamp: (Number(b[1]) || 0) * 1e3,
                  labels: b.slice(3),
              };
    }
    function vm(a) {
        return a.length < 3 ||
            (a[0] !== "GCL" && a[0] !== "1") ||
            !/^\d+$/.test(a[1]) ||
            !Pl.test(a[2])
            ? []
            : a;
    }
    function wm(a, b, c, d, e) {
        if (Array.isArray(b) && ok(C)) {
            var f = Zl(e),
                h = function () {
                    for (var l = {}, m = 0; m < a.length; ++m) {
                        var n = $l(a[m], f);
                        if (n) {
                            var p = pk(n, E.cookie, void 0, Sl());
                            p.length && (l[n] = p.sort()[p.length - 1]);
                        }
                    }
                    return l;
                };
            Ul(function () {
                el(h, b, c, d);
            }, Sl());
        }
    }
    function xm(a, b, c, d) {
        if (Array.isArray(a) && ok(C)) {
            var e = [];
            Ra(7) && e.push("ag");
            if (e.length !== 0) {
                var f = Zl(d),
                    h = function () {
                        for (var l = {}, m = 0; m < e.length; ++m) {
                            var n = $l(e[m], f);
                            if (!n) return {};
                            var p = El(n);
                            if (p.length) {
                                var q = p.sort(function (r, t) {
                                    return dm(t) - dm(r);
                                })[0];
                                l[n] = Cl(q);
                            }
                        }
                        return l;
                    };
                Ul(
                    function () {
                        el(h, a, b, c);
                    },
                    ["ad_storage"]
                );
            }
        }
    }
    function fm(a) {
        return a.filter(function (b) {
            return Pl.test(b.O);
        });
    }
    function ym(a, b) {
        if (ok(C)) {
            for (var c = Zl(b.prefix), d = {}, e = 0; e < a.length; e++)
                Rl[a[e]] && (d[a[e]] = Rl[a[e]]);
            Ul(function () {
                z(d, function (f, h) {
                    var l = pk(c + h, E.cookie, void 0, Sl());
                    l.sort(function (t, v) {
                        return tm(v) - tm(t);
                    });
                    if (l.length) {
                        var m = l[0],
                            n = tm(m),
                            p =
                                vm(m.split(".")).length !== 0
                                    ? m.split(".").slice(3)
                                    : [],
                            q = {},
                            r;
                        r =
                            vm(m.split(".")).length !== 0
                                ? m.split(".")[2]
                                : void 0;
                        q[f] = [r];
                        pm(q, !0, b, n, p);
                    }
                });
            }, Sl());
        }
    }
    function zm(a) {
        var b = [],
            c = [];
        Ra(7) && (b.push("ag"), c.push("gbraid"));
        b.length !== 0 &&
            Ul(
                function () {
                    for (var d = Zl(a.prefix), e = 0; e < b.length; ++e) {
                        var f = $l(b[e], d);
                        if (!f) break;
                        var h = El(f);
                        if (h.length) {
                            var l = h.sort(function (q, r) {
                                    return dm(r) - dm(q);
                                })[0],
                                m = dm(l),
                                n = l.b,
                                p = {};
                            p[c[e]] = l.k;
                            pm(p, !0, a, m, n);
                        }
                    }
                },
                ["ad_storage"]
            );
    }
    function Am(a, b) {
        for (var c = 0; c < b.length; ++c) if (a[b[c]]) return !0;
        return !1;
    }
    function Bm(a) {
        function b(e, f, h) {
            h && (e[f] = h);
        }
        if (Zg()) {
            var c = nm();
            if (Am(c, a)) {
                var d = {};
                b(d, "gclid", c.gclid);
                b(d, "dclid", c.dclid);
                b(d, "gclsrc", c.gclsrc);
                b(d, "wbraid", c.wbraid);
                Ra(7) && b(d, "gbraid", c.gbraid);
                fl(function () {
                    return d;
                }, 3);
                fl(function () {
                    var e = {};
                    return (e._up = "1"), e;
                }, 1);
            }
        }
    }
    function Cm(a) {
        if (!Ra(1)) return null;
        var b = Yk(!0).gad_source;
        if (b != null) return (C.location.hash = ""), b;
        if (Ra(2)) {
            var c = Df(C.location.href);
            b = xf(c, "query", !1, void 0, "gad_source");
            if (b != null) return b;
            var d = nm();
            if (Am(d, a)) return "0";
        }
        return null;
    }
    function Dm(a) {
        var b = Cm(a);
        b != null &&
            fl(function () {
                var c = {};
                return (c.gad_source = b), c;
            }, 4);
    }
    function Em(a, b, c) {
        var d = [];
        if (b.length === 0) return d;
        for (var e = {}, f = 0; f < b.length; f++) {
            var h = b[f],
                l = h.type ? h.type : "gcl";
            (h.labels || []).indexOf(c) === -1
                ? (a.push(0), e[l] || d.push(h))
                : a.push(1);
            e[l] = !0;
        }
        return d;
    }
    function Fm(a, b, c, d) {
        var e = [];
        c = c || {};
        if (!Tl(Sl())) return e;
        var f = Wl(a),
            h = Em(e, f, b);
        if (h.length && !d)
            for (var l = g(h), m = l.next(); !m.done; m = l.next()) {
                var n = m.value,
                    p = n.timestamp,
                    q = [n.version, Math.round(p / 1e3), n.O]
                        .concat(n.labels || [], [b])
                        .join("."),
                    r = Ik(c, p, !0);
                r.Ya = Sl();
                Ak(a, q, r);
            }
        return e;
    }
    function Gm(a, b) {
        var c = [];
        b = b || {};
        var d = Yl(b),
            e = Em(c, d, a);
        if (e.length)
            for (var f = g(e), h = f.next(); !h.done; h = f.next()) {
                var l = h.value,
                    m = Zl(b.prefix),
                    n = $l(l.type, m);
                if (!n) break;
                var p = l,
                    q = p.version,
                    r = p.O,
                    t = p.labels,
                    v = p.timestamp,
                    u = Math.round(v / 1e3);
                if (l.type === "ag") {
                    var w = {},
                        x =
                            ((w.k = r),
                            (w.i = "" + u),
                            (w.b = (t || []).concat([a])),
                            w);
                    Gl(n, x, b, v);
                } else if (l.type === "gb") {
                    var y = [q, u, r].concat(t || [], [a]).join("."),
                        A = Ik(b, v, !0);
                    A.Ya = Sl();
                    Ak(n, y, A);
                }
            }
        return c;
    }
    function Hm(a, b) {
        var c = Zl(b),
            d = $l(a, c);
        if (!d) return 0;
        var e;
        e = a === "ag" ? (Ra(7) ? am(d) : []) : Wl(d);
        for (var f = 0, h = 0; h < e.length; h++)
            f = Math.max(f, e[h].timestamp);
        return f;
    }
    function Im(a) {
        for (
            var b = 0, c = g(Object.keys(a)), d = c.next();
            !d.done;
            d = c.next()
        )
            for (var e = a[d.value], f = 0; f < e.length; f++)
                b = Math.max(b, Number(e[f].timestamp));
        return b;
    }
    function Jm(a, b) {
        var c = Math.max(Hm("aw", a), Im(Tl(Sl()) ? Jl() : {})),
            d = Math.max(Hm("gb", a), Im(Tl(Sl()) ? Jl("_gac_gb", !0) : {}));
        Ra(7) && b && (d = Math.max(d, Hm("ag", a)));
        return d > c;
    }
    function $m() {
        Ke.dedupe_gclid || (Ke.dedupe_gclid = Hk());
        return Ke.dedupe_gclid;
    }
    var an = /^(www\.)?google(\.com?)?(\.[a-z]{2}t?)?$/,
        bn = /^www.googleadservices.com$/;
    function cn(a) {
        a || (a = dn());
        return a.fm
            ? !1
            : a.Tk || a.Uk || a.Xk || a.Vk || a.Fd || a.Ik || a.Wk || a.Lk
            ? !0
            : !1;
    }
    function dn() {
        var a = {},
            b = Yk(!0);
        a.fm = !!b._up;
        var c = nm();
        a.Tk = c.aw !== void 0;
        a.Uk = c.dc !== void 0;
        a.Xk = c.wbraid !== void 0;
        a.Vk = c.gbraid !== void 0;
        a.Wk = c.gclsrc === "aw.ds";
        a.Fd = Lm().Fd;
        var d = E.referrer ? xf(Df(E.referrer), "host") : "";
        a.Lk = an.test(d);
        a.Ik = bn.test(d);
        return a;
    }
    var en = RegExp(
            "^UA-\\d+-\\d+%3A[\\w-]+(?:%2C[\\w-]+)*(?:%3BUA-\\d+-\\d+%3A[\\w-]+(?:%2C[\\w-]+)*)*$"
        ),
        fn = /^~?[\w-]+(?:\.~?[\w-]+)*$/,
        gn = /^\d+\.fls\.doubleclick\.net$/,
        hn = /;gac=([^;?]+)/,
        jn = /;gacgb=([^;?]+)/;
    function kn(a, b) {
        if (gn.test(E.location.host)) {
            var c = E.location.href.match(b);
            return c && c.length === 2 && c[1].match(en)
                ? decodeURIComponent(c[1])
                : "";
        }
        for (
            var d = [], e = g(Object.keys(a)), f = e.next();
            !f.done;
            f = e.next()
        ) {
            for (var h = f.value, l = [], m = a[h], n = 0; n < m.length; n++)
                l.push(m[n].O);
            d.push(h + ":" + l.join(","));
        }
        return d.length > 0 ? d.join(";") : "";
    }
    function ln(a, b, c) {
        for (
            var d = Tl(Sl()) ? Jl("_gac_gb", !0) : {},
                e = [],
                f = !1,
                h = g(Object.keys(d)),
                l = h.next();
            !l.done;
            l = h.next()
        ) {
            var m = l.value,
                n = Fm("_gac_gb_" + m, a, b, c);
            f =
                f ||
                (n.length !== 0 &&
                    n.some(function (p) {
                        return p === 1;
                    }));
            e.push(m + ":" + n.join(","));
        }
        return { Hk: f ? e.join(";") : "", Gk: kn(d, jn) };
    }
    function mn(a) {
        var b = E.location.href.match(new RegExp(";" + a + "=([^;?]+)"));
        return b && b.length === 2 && b[1].match(fn) ? b[1] : void 0;
    }
    function nn(a) {
        var b = Ra(13),
            c = {},
            d,
            e,
            f;
        gn.test(E.location.host) &&
            ((d = mn("gclgs")), (e = mn("gclst")), b && (f = mn("gcllp")));
        if (d && e && (!b || f)) (c.Wf = d), (c.Yf = e), (c.Xf = f);
        else {
            var h = fb(),
                l = am((a || "_gcl") + "_gs"),
                m = l.map(function (q) {
                    return q.O;
                }),
                n = l.map(function (q) {
                    return h - q.timestamp;
                }),
                p = [];
            b &&
                (p = l.map(function (q) {
                    return q.Gc;
                }));
            m.length > 0 &&
                n.length > 0 &&
                (!b || p.length > 0) &&
                ((c.Wf = m.join(".")),
                (c.Yf = n.join(".")),
                b && p.length > 0 && (c.Xf = p.join(".")));
        }
        return c;
    }
    function on(a, b, c, d) {
        d = d === void 0 ? !1 : d;
        if (gn.test(E.location.host)) {
            var e = mn(c);
            if (e) return [{ O: e }];
        } else {
            if (b === "gclid") {
                var f = (a || "_gcl") + "_aw";
                return d ? jm(f) : Wl(f);
            }
            if (b === "wbraid") return Wl((a || "_gcl") + "_gb");
            if (b === "braids") return Yl({ prefix: a });
        }
        return [];
    }
    function pn(a) {
        return on(a, "gclid", "gclaw")
            .map(function (b) {
                return b.O;
            })
            .join(".");
    }
    function qn(a) {
        var b = on(a, "gclid", "gclaw", !0),
            c = b
                .map(function (f) {
                    return f.O;
                })
                .join("."),
            d = b
                .map(function (f) {
                    return f.Ca || 0;
                })
                .join("."),
            e = b
                .map(function (f) {
                    for (
                        var h = 0, l = g(f.hc || []), m = l.next();
                        !m.done;
                        m = l.next()
                    ) {
                        var n = m.value;
                        n === 1 && (h |= 1);
                        n === 2 && (h |= 2);
                    }
                    return h.toString();
                })
                .join(".");
        return { O: c, yi: d, zi: e };
    }
    function rn(a) {
        return on(a, "wbraid", "gclgb")
            .map(function (b) {
                return b.O;
            })
            .join(".");
    }
    function sn(a) {
        return on(a, "braids", "gclgb")
            .map(function (b) {
                return b.O;
            })
            .join(".");
    }
    function tn(a, b) {
        return gn.test(E.location.host)
            ? !(mn("gclaw") || mn("gac"))
            : Jm(a, b);
    }
    function un(a, b, c) {
        var d;
        d = c ? Gm(a, b) : Fm(((b && b.prefix) || "_gcl") + "_gb", a, b);
        return d.length === 0 ||
            d.every(function (e) {
                return e === 0;
            })
            ? ""
            : d.join(".");
    }
    function vn() {
        var a = C.__uspapi;
        if (Ta(a)) {
            var b = "";
            try {
                a("getUSPData", 1, function (c, d) {
                    if (d && c) {
                        var e = c.uspString;
                        e && RegExp("^[\\da-zA-Z-]{1,20}$").test(e) && (b = e);
                    }
                });
            } catch (c) {}
            return b;
        }
    }
    function En(a) {
        var b = U(a.m, K.g.Ab),
            c = U(a.m, K.g.zb);
        b && !c
            ? (a.eventName !== K.g.W && a.eventName !== K.g.Oc && R(131),
              (a.isAborted = !0))
            : !b && c && (R(132), (a.isAborted = !0));
    }
    function Fn(a) {
        var b = W(K.g.M) ? Ke.pscdl : "denied";
        b != null && (a.j[K.g.he] = b);
    }
    function Gn(a) {
        var b = mj(!0);
        a.j[K.g.yb] = b;
    }
    function Hn(a) {
        bk() && (a.j[K.g.vc] = 1);
    }
    function yn() {
        var a = E.title;
        if (a === void 0 || a === "") return "";
        var b = function (d) {
            try {
                return decodeURIComponent(d), !0;
            } catch (e) {
                return !1;
            }
        };
        a = encodeURIComponent(a);
        for (var c = 256; c > 0 && !b(a.substring(0, c)); ) c--;
        return decodeURIComponent(a.substring(0, c));
    }
    function In(a) {
        Jn(a, "ce", U(a.m, K.g.La));
    }
    function Jn(a, b, c) {
        a.j[K.g.Bc] || (a.j[K.g.Bc] = {});
        a.j[K.g.Bc][b] = c;
    }
    function Pn(a, b, c, d) {
        var e = Kb(),
            f;
        if (e === 1)
            a: {
                var h = We;
                h = h.toLowerCase();
                for (
                    var l = "https://" + h,
                        m = "http://" + h,
                        n = 1,
                        p = E.getElementsByTagName("script"),
                        q = 0;
                    q < p.length && q < 100;
                    q++
                ) {
                    var r = p[q].src;
                    if (r) {
                        r = r.toLowerCase();
                        if (r.indexOf(m) === 0) {
                            f = 3;
                            break a;
                        }
                        n === 1 && r.indexOf(l) === 0 && (n = 2);
                    }
                }
                f = n;
            }
        else f = e;
        return (f === 2 || d || "http:" !== C.location.protocol ? a : b) + c;
    }
    function ao(a) {
        return {
            getDestinationId: function () {
                return a.target.destinationId;
            },
            getEventName: function () {
                return a.eventName;
            },
            setEventName: function (b) {
                a.eventName = b;
            },
            getHitData: function (b) {
                return a.j[b];
            },
            setHitData: function (b, c) {
                a.j[b] = c;
            },
            setHitDataIfNotDefined: function (b, c) {
                a.j[b] === void 0 && (a.j[b] = c);
            },
            copyToHitData: function (b, c) {
                a.copyToHitData(b, c);
            },
            getMetadata: function (b) {
                return a.metadata[b];
            },
            setMetadata: function (b, c) {
                a.metadata[b] = c;
            },
            isAborted: function () {
                return a.isAborted;
            },
            abort: function () {
                a.isAborted = !0;
            },
            getFromEventContext: function (b) {
                return U(a.m, b);
            },
            Pm: function () {
                return a;
            },
            getHitKeys: function () {
                return Object.keys(a.j);
            },
        };
    }
    var ho,
        io = !1;
    function jo(a) {
        if (!io) {
            io = !0;
            ho = ho || {};
        }
        return ho[a];
    }
    function ko() {
        var a = C.screen;
        return { width: a ? a.width : 0, height: a ? a.height : 0 };
    }
    function lo(a) {
        if (E.hidden) return !0;
        var b = a.getBoundingClientRect();
        if (b.top === b.bottom || b.left === b.right || !C.getComputedStyle)
            return !0;
        var c = C.getComputedStyle(a, null);
        if (c.visibility === "hidden") return !0;
        for (var d = a, e = c; d; ) {
            if (e.display === "none") return !0;
            var f = e.opacity,
                h = e.filter;
            if (h) {
                var l = h.indexOf("opacity(");
                l >= 0 &&
                    ((h = h.substring(l + 8, h.indexOf(")", l))),
                    h.charAt(h.length - 1) === "%" &&
                        (h = h.substring(0, h.length - 1)),
                    (f = String(Math.min(Number(h), Number(f)))));
            }
            if (f !== void 0 && Number(f) <= 0) return !0;
            (d = d.parentElement) && (e = C.getComputedStyle(d, null));
        }
        return !1;
    }
    var fp = Number("") || 5,
        gp = Number("") || 50,
        hp = Xa();
    var mp = {
        ik: Number("") || 500,
        Tj: Number("") || 5e3,
        Uh: Number("20") || 10,
        Zi: Number("") || 5e3,
    };
    function np(a) {
        return (a.performance && a.performance.now()) || Date.now();
    }
    var op = function (a, b) {
        var c;
        return c;
    };
    var pp;
    function vp() {
        var a = ad(function () {
            return {};
        });
        try {
            return a("internal_sw_allowed"), !0;
        } catch (b) {
            return !1;
        }
    }
    function wp(a, b) {}
    var xp = function (a, b, c, d) {};
    function yp(a, b, c, d) {}
    function zp(a, b, c, d) {}
    var Ap = void 0;
    function Bp(a) {
        var b = [];
        return b;
    }
    !bj("Android") || dj();
    dj();
    bj("Safari") &&
        (dj() ||
            (cj() ? 0 : bj("Coast")) ||
            (cj() ? 0 : bj("Opera")) ||
            (cj() ? 0 : bj("Edge")) ||
            (cj() ? aj("Microsoft Edge") : bj("Edg/")) ||
            (cj() && aj("Opera")));
    var Cp = {},
        Dp = null,
        Ep = function (a) {
            for (var b = [], c = 0, d = 0; d < a.length; d++) {
                var e = a.charCodeAt(d);
                e > 255 && ((b[c++] = e & 255), (e >>= 8));
                b[c++] = e;
            }
            var f = 4;
            f === void 0 && (f = 0);
            if (!Dp) {
                Dp = {};
                for (
                    var h =
                            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
                                ""
                            ),
                        l = ["+/=", "+/", "-_=", "-_.", "-_"],
                        m = 0;
                    m < 5;
                    m++
                ) {
                    var n = h.concat(l[m].split(""));
                    Cp[m] = n;
                    for (var p = 0; p < n.length; p++) {
                        var q = n[p];
                        Dp[q] === void 0 && (Dp[q] = p);
                    }
                }
            }
            for (
                var r = Cp[f],
                    t = Array(Math.floor(b.length / 3)),
                    v = r[64] || "",
                    u = 0,
                    w = 0;
                u < b.length - 2;
                u += 3
            ) {
                var x = b[u],
                    y = b[u + 1],
                    A = b[u + 2],
                    B = r[x >> 2],
                    D = r[((x & 3) << 4) | (y >> 4)],
                    J = r[((y & 15) << 2) | (A >> 6)],
                    I = r[A & 63];
                t[w++] = "" + B + D + J + I;
            }
            var F = 0,
                M = v;
            switch (b.length - u) {
                case 2:
                    (F = b[u + 1]), (M = r[(F & 15) << 2] || v);
                case 1:
                    var H = b[u];
                    t[w] =
                        "" + r[H >> 2] + r[((H & 3) << 4) | (F >> 4)] + M + v;
            }
            return t.join("");
        };
    var Fp =
        "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(
            " "
        );
    function Gp() {
        var a;
        return (a = C.google_tag_data) != null ? a : (C.google_tag_data = {});
    }
    function Hp() {
        var a = C.google_tag_data,
            b;
        if (a != null && a.uach) {
            var c = a.uach,
                d = Object.assign({}, c);
            c.fullVersionList &&
                (d.fullVersionList = c.fullVersionList.slice(0));
            b = d;
        } else b = null;
        return b;
    }
    function Ip() {
        var a, b;
        return (b =
            (a = C.google_tag_data) == null ? void 0 : a.uach_promise) != null
            ? b
            : null;
    }
    function Jp() {
        var a, b;
        return (
            typeof ((a = C.navigator) == null
                ? void 0
                : (b = a.userAgentData) == null
                ? void 0
                : b.getHighEntropyValues) === "function"
        );
    }
    function Kp() {
        if (!Jp()) return null;
        var a = Gp();
        if (a.uach_promise) return a.uach_promise;
        var b = C.navigator.userAgentData
            .getHighEntropyValues(Fp)
            .then(function (c) {
                a.uach != null || (a.uach = c);
                return c;
            });
        return (a.uach_promise = b);
    }
    function Qp(a) {
        var b;
        b = b === void 0 ? document : b;
        var c;
        return !(
            (c = b.featurePolicy) == null || !c.allowedFeatures().includes(a)
        );
    }
    function Rp() {
        return Qp("join-ad-interest-group") && Ta(Ab.joinAdInterestGroup);
    }
    function Sp(a, b) {
        var c = Qa[3] === void 0 ? 1 : Qa[3],
            d = 'iframe[data-tagging-id="' + b + '"]',
            e = [];
        try {
            if (c === 1) {
                var f = E.querySelector(d);
                f && (e = [f]);
            } else e = Array.from(E.querySelectorAll(d));
        } catch (q) {}
        var h;
        a: {
            try {
                h = E.querySelectorAll(
                    'iframe[allow="join-ad-interest-group"][data-tagging-id*="-"]'
                );
                break a;
            } catch (q) {}
            h = void 0;
        }
        var l = h,
            m =
                ((l == null ? void 0 : l.length) || 0) >=
                (Qa[2] === void 0 ? 50 : Qa[2]),
            n;
        if ((n = e.length >= 1)) {
            var p = Number(e[e.length - 1].dataset.loadTime);
            p !== void 0 && fb() - p < (Qa[1] === void 0 ? 6e4 : Qa[1])
                ? (Ma("TAGGING", 9), (n = !0))
                : (n = !1);
        }
        if (!n) {
            if (c === 1)
                if (e.length >= 1) Tp(e[0]);
                else {
                    if (m) {
                        Ma("TAGGING", 10);
                        return;
                    }
                }
            else e.length >= c ? Tp(e[0]) : m && Tp(l[0]);
            Lb(
                a,
                void 0,
                { allow: "join-ad-interest-group" },
                { taggingId: b, loadTime: fb() }
            );
        }
    }
    function Tp(a) {
        try {
            a.parentNode.removeChild(a);
        } catch (b) {}
    }
    function Up() {
        return "https://td.doubleclick.net";
    }
    var Mq = {
        F: {
            yg: "ads_conversion_hit",
            Lc: "container_execute_start",
            Cg: "container_setup_end",
            bf: "container_setup_start",
            Ag: "container_blocking_end",
            Bg: "container_execute_end",
            Dg: "container_yield_end",
            cf: "container_yield_start",
            Kh: "event_execute_end",
            Jh: "event_evaluation_end",
            Df: "event_evaluation_start",
            Lh: "event_setup_end",
            rd: "event_setup_start",
            Nh: "ga4_conversion_hit",
            vd: "page_load",
            zm: "pageview",
            Eb: "snippet_load",
            ji: "tag_callback_error",
            ki: "tag_callback_failure",
            li: "tag_callback_success",
            mi: "tag_execute_end",
            Cc: "tag_execute_start",
        },
    };
    function Nq() {
        function a(c, d) {
            var e = Na(d);
            e && b.push([c, e]);
        }
        var b = [];
        a("u", "GTM");
        a("ut", "TAGGING");
        a("h", "HEALTH");
        return b;
    }
    var Oq = !1;
    function yr(a, b) {}
    function zr(a, b) {}
    function Ar(a, b) {}
    function Br(a, b) {}
    function Cr() {
        var a = {};
        return a;
    }
    function qr(a) {
        a = a === void 0 ? !0 : a;
        var b = {};
        return b;
    }
    function Dr() {}
    function Er(a, b) {}
    function Fr(a, b, c) {}
    function Gr(a, b) {
        var c,
            d = C.GooglebQhCsO;
        d || ((d = {}), (C.GooglebQhCsO = d));
        c = d;
        if (c[a]) return !1;
        c[a] = [];
        c[a][0] = b;
        return !0;
    }
    function Hr(a, b, c, d) {
        var e = hj(a, "fmt");
        if (b) {
            var f = hj(a, "random"),
                h = hj(a, "label") || "";
            if (!f) return !1;
            var l = Ep(
                decodeURIComponent(h.replace(/\+/g, " ")) +
                    ":" +
                    decodeURIComponent(f.replace(/\+/g, " "))
            );
            if (!Gr(l, b)) return !1;
        }
        e && Number(e) !== 4 && (a = jj(a, "rfmt", e));
        var m = jj(a, "fmt", 4);
        Jb(
            m,
            function () {
                C.google_noFurtherRedirects &&
                    b &&
                    ((C.google_noFurtherRedirects = null), b());
            },
            c,
            d,
            E.getElementsByTagName("script")[0].parentElement || void 0
        );
        return !0;
    }
    function Vr(a, b) {
        if (data.entities) {
            var c = data.entities[a];
            if (c) return c[b];
        }
    }
    function Wr(a) {
        var b = mg(),
            c;
        c = c === void 0 ? !1 : c;
        Xr().addRestriction(0, b, a, c);
    }
    function Yr(a) {
        var b = mg(),
            c;
        c = c === void 0 ? !1 : c;
        Xr().addRestriction(1, b, a, c);
    }
    function Zr() {
        var a = mg();
        return Xr().getRestrictions(1, a);
    }
    var $r = function () {
            this.container = {};
            this.j = {};
        },
        as = function (a, b) {
            var c = a.container[b];
            c ||
                ((c = {
                    _entity: { internal: [], external: [] },
                    _event: { internal: [], external: [] },
                }),
                (a.container[b] = c));
            return c;
        };
    $r.prototype.addRestriction = function (a, b, c, d) {
        d = d === void 0 ? !1 : d;
        if (!d || !this.j[b]) {
            var e = as(this, b);
            a === 0
                ? d
                    ? e._entity.external.push(c)
                    : e._entity.internal.push(c)
                : a === 1 &&
                  (d ? e._event.external.push(c) : e._event.internal.push(c));
        }
    };
    $r.prototype.getRestrictions = function (a, b) {
        var c = as(this, b);
        if (a === 0) {
            var d, e;
            return [].concat(
                ka(
                    (c == null
                        ? void 0
                        : (d = c._entity) == null
                        ? void 0
                        : d.internal) || []
                ),
                ka(
                    (c == null
                        ? void 0
                        : (e = c._entity) == null
                        ? void 0
                        : e.external) || []
                )
            );
        }
        if (a === 1) {
            var f, h;
            return [].concat(
                ka(
                    (c == null
                        ? void 0
                        : (f = c._event) == null
                        ? void 0
                        : f.internal) || []
                ),
                ka(
                    (c == null
                        ? void 0
                        : (h = c._event) == null
                        ? void 0
                        : h.external) || []
                )
            );
        }
        return [];
    };
    $r.prototype.getExternalRestrictions = function (a, b) {
        var c = as(this, b),
            d,
            e;
        return a === 0
            ? (c == null
                  ? void 0
                  : (d = c._entity) == null
                  ? void 0
                  : d.external) || []
            : (c == null
                  ? void 0
                  : (e = c._event) == null
                  ? void 0
                  : e.external) || [];
    };
    $r.prototype.removeExternalRestrictions = function (a) {
        var b = as(this, a);
        b._event && (b._event.external = []);
        b._entity && (b._entity.external = []);
        this.j[a] = !0;
    };
    function Xr() {
        var a = Ke.r;
        a || ((a = new $r()), (Ke.r = a));
        return a;
    }
    var bs = new RegExp(
            /^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/
        ),
        cs = {
            cl: ["ecl"],
            customPixels: ["nonGooglePixels"],
            ecl: ["cl"],
            ehl: ["hl"],
            gaawc: ["googtag"],
            hl: ["ehl"],
            html: [
                "customScripts",
                "customPixels",
                "nonGooglePixels",
                "nonGoogleScripts",
                "nonGoogleIframes",
            ],
            customScripts: [
                "html",
                "customPixels",
                "nonGooglePixels",
                "nonGoogleScripts",
                "nonGoogleIframes",
            ],
            nonGooglePixels: [],
            nonGoogleScripts: ["nonGooglePixels"],
            nonGoogleIframes: ["nonGooglePixels"],
        },
        ds = {
            cl: ["ecl"],
            customPixels: ["customScripts", "html"],
            ecl: ["cl"],
            ehl: ["hl"],
            gaawc: ["googtag"],
            hl: ["ehl"],
            html: ["customScripts"],
            customScripts: ["html"],
            nonGooglePixels: [
                "customPixels",
                "customScripts",
                "html",
                "nonGoogleScripts",
                "nonGoogleIframes",
            ],
            nonGoogleScripts: ["customScripts", "html"],
            nonGoogleIframes: ["customScripts", "html", "nonGoogleScripts"],
        },
        es =
            "google customPixels customScripts html nonGooglePixels nonGoogleScripts nonGoogleIframes".split(
                " "
            );
    function fs() {
        var a = lf("gtm.allowlist") || lf("gtm.whitelist");
        a && R(9);
        Pe && (a = ["google", "gtagfl", "lcl", "zone"]);
        bs.test(C.location && C.location.hostname) &&
            (Pe
                ? R(116)
                : (R(117),
                  gs &&
                      ((a = []),
                      window.console &&
                          window.console.log &&
                          window.console.log(
                              "GTM blocked. See go/13687728."
                          ))));
        var b = a && jb(cb(a), cs),
            c = lf("gtm.blocklist") || lf("gtm.blacklist");
        c || ((c = lf("tagTypeBlacklist")) && R(3));
        c ? R(8) : (c = []);
        bs.test(C.location && C.location.hostname) &&
            ((c = cb(c)),
            c.push("nonGooglePixels", "nonGoogleScripts", "sandboxedScripts"));
        cb(c).indexOf("google") >= 0 && R(2);
        var d = c && jb(cb(c), ds),
            e = {};
        return function (f) {
            var h = f && f[ec.ja];
            if (!h || typeof h !== "string") return !0;
            h = h.replace(/^_*/, "");
            if (e[h] !== void 0) return e[h];
            var l = $e[h] || [],
                m = !0;
            if (a) {
                var n;
                if ((n = m))
                    a: {
                        if (b.indexOf(h) < 0)
                            if (l && l.length > 0)
                                for (var p = 0; p < l.length; p++) {
                                    if (b.indexOf(l[p]) < 0) {
                                        R(11);
                                        n = !1;
                                        break a;
                                    }
                                }
                            else {
                                n = !1;
                                break a;
                            }
                        n = !0;
                    }
                m = n;
            }
            var q = !1;
            if (c) {
                var r = d.indexOf(h) >= 0;
                if (r) q = r;
                else {
                    var t = Ya(d, l || []);
                    t && R(10);
                    q = t;
                }
            }
            var v = !m || q;
            v ||
                !(l.indexOf("sandboxedScripts") >= 0) ||
                (b && b.indexOf("sandboxedScripts") !== -1) ||
                (v = Ya(d, es));
            return (e[h] = v);
        };
    }
    var gs = !1;
    gs = !0;
    function hs() {
        dg &&
            Wr(function (a) {
                var b = {};
                b[ec.ja] = "__" + a.entityId;
                for (var c in void 0)
                    (void 0).hasOwnProperty(c) && (b["vtp_" + c] = (void 0)[c]);
                var d;
                if (Sc(b)) {
                    var e = b[ec.ja];
                    if (!e)
                        throw Error(
                            "Error: No function name given for function call."
                        );
                    var f = Hc[e];
                    d = !!f && !!f.runInSiloedMode;
                } else d = !!Vr(b[ec.ja], 4);
                return d;
            });
    }
    function is(a, b, c, d) {
        if (!js()) {
            var e = d.siloed ? hg(a) : a;
            if (!$f().container[e]) {
                var f = ks(a),
                    h = kb(a, "GTM-"),
                    l = Kf(),
                    m = c ? "/gtag/js" : "/gtm.js",
                    n = Jf(b, m + f);
                if (!n) {
                    var p = Je.Mc + m;
                    if (l && Db && h)
                        (p = Db.replace(/^(?:https?:\/\/)?/i, "").split(
                            /[?#]/
                        )[0]),
                            (n = Pn("https://", "http://", p + f));
                    else if (ef()) {
                        var q = m;
                        P(64) && (q = "/");
                        n = df() + q + f;
                    } else n = Pn("https://", "http://", p + f);
                }
                d.siloed && vg({ ctid: e, isDestination: !1 });
                var r = pg();
                $f().container[e] = { state: 1, context: d, parent: r };
                Zf({ ctid: e, isDestination: !1 });
                Jb(n);
            }
        }
    }
    function ls(a, b, c) {
        if (!js()) {
            var d = c.siloed ? hg(a) : a,
                e = $f().destination[d];
            if (!e || !e.state)
                if (!c.siloed && wg())
                    ($f().destination[d] = {
                        state: 0,
                        transportUrl: b,
                        context: c,
                        parent: pg(),
                    }),
                        Zf({ ctid: d, isDestination: !0 }),
                        R(91);
                else {
                    var f = "/gtag/destination" + ks(a, !0),
                        h = Jf(b, f);
                    h ||
                        (ef()
                            ? (P(64) && (f = "/gtd" + ks(a, !0)),
                              (h = df() + f))
                            : (h = Pn("https://", "http://", Je.Mc + f)));
                    c.siloed && vg({ ctid: d, isDestination: !0 });
                    $f().destination[d] = {
                        state: 1,
                        context: c,
                        parent: pg(),
                    };
                    Zf({ ctid: d, isDestination: !0 });
                    Jb(h);
                }
        }
    }
    function ks(a, b) {
        b = b === void 0 ? !1 : b;
        var c = "?id=" + encodeURIComponent(a) + "&l=" + Je.ub;
        if (!kb(a, "GTM-") || b) c += "&cx=c";
        P(76) && (c += "&gtm=" + ek());
        Kf() && (c += "&sign=" + Je.Hf);
        var d = cf.C;
        d === 1 ? (c += "&fps=fc") : d === 2 && (c += "&fps=fe");
        return c;
    }
    function js() {
        if (ck()) {
            return !0;
        }
        return !1;
    }
    var ms = [];
    function ns() {
        var a = eg.ctid;
        if (a) {
            var b = cg.ud ? 1 : 0,
                c,
                d = og(pg());
            c = d && d.context;
            return (
                a +
                ";" +
                eg.canonicalContainerId +
                ";" +
                (c && c.fromContainerExecution ? 1 : 0) +
                ";" +
                ((c && c.source) || 0) +
                ";" +
                b
            );
        }
    }
    function os() {
        var a = Df(C.location.href);
        return a.hostname + a.pathname;
    }
    function ps() {
        var a = os();
        a && Eg("dl", encodeURIComponent(a));
        if (P(100)) {
            var b = ns();
            b && Eg("tdp", b);
        } else
            Eg("tdp", function () {
                return ms.length > 0 ? ms.join(".") : void 0;
            });
        var c = mj(!0);
        c !== void 0 && Eg("frm", String(c));
    }
    var qs = !1,
        rs = 0,
        ss = [];
    function ts(a) {
        if (!qs) {
            var b = E.createEventObject,
                c = E.readyState === "complete",
                d = E.readyState === "interactive";
            if (!a || a.type !== "readystatechange" || c || (!b && d)) {
                qs = !0;
                for (var e = 0; e < ss.length; e++) G(ss[e]);
            }
            ss.push = function () {
                for (var f = va.apply(0, arguments), h = 0; h < f.length; h++)
                    G(f[h]);
                return 0;
            };
        }
    }
    function us() {
        if (!qs && rs < 140) {
            rs++;
            try {
                var a, b;
                (b = (a = E.documentElement).doScroll) == null ||
                    b.call(a, "left");
                ts();
            } catch (c) {
                C.setTimeout(us, 50);
            }
        }
    }
    function vs(a) {
        qs ? a() : ss.push(a);
    }
    function ws(a, b) {
        return {
            entityType: 1,
            indexInOriginContainer: a,
            nameInOriginContainer: b,
            originContainerId: kg(),
        };
    }
    var ys = function (a, b) {
            this.j = !1;
            this.H = [];
            this.eventData = { tags: [] };
            this.N = !1;
            this.C = this.D = 0;
            xs(this, a, b);
        },
        zs = function (a, b, c, d) {
            if (Me.hasOwnProperty(b) || b === "__zone") return -1;
            var e = {};
            Aa(d) && (e = Ba(d, e));
            e.id = c;
            e.status = "timeout";
            return a.eventData.tags.push(e) - 1;
        },
        As = function (a, b, c, d) {
            var e = a.eventData.tags[b];
            e && ((e.status = c), (e.executionTime = d));
        },
        Bs = function (a) {
            if (!a.j) {
                for (var b = a.H, c = 0; c < b.length; c++) b[c]();
                a.j = !0;
                a.H.length = 0;
            }
        },
        xs = function (a, b, c) {
            b !== void 0 && Cs(a, b);
            c &&
                C.setTimeout(function () {
                    Bs(a);
                }, Number(c));
        },
        Cs = function (a, b) {
            var c = hb(function () {
                G(function () {
                    b(kg(), a.eventData);
                });
            });
            a.j ? c() : a.H.push(c);
        },
        Ds = function (a) {
            a.D++;
            return hb(function () {
                a.C++;
                a.N && a.C >= a.D && Bs(a);
            });
        },
        Es = function (a) {
            a.N = !0;
            a.C >= a.D && Bs(a);
        };
    var Fs = {};
    function Gs() {
        return C[Hs()];
    }
    function Hs() {
        return C.GoogleAnalyticsObject || "ga";
    }
    function Ks() {
        var a = kg();
    }
    function Ls(a, b) {
        return function () {
            var c = Gs(),
                d = c && c.getByName && c.getByName(a);
            if (d) {
                var e = d.get("sendHitTask");
                d.set("sendHitTask", function (f) {
                    var h = f.get("hitPayload"),
                        l = f.get("hitCallback"),
                        m = h.indexOf("&tid=" + b) < 0;
                    m &&
                        (f.set(
                            "hitPayload",
                            h.replace(/&tid=UA-[0-9]+-[0-9]+/, "&tid=" + b),
                            !0
                        ),
                        f.set("hitCallback", void 0, !0));
                    e(f);
                    m &&
                        (f.set("hitPayload", h, !0),
                        f.set("hitCallback", l, !0),
                        f.set("_x_19", void 0, !0),
                        e(f));
                });
            }
        };
    }
    var Qs = ["es", "1"],
        Rs = {},
        Ss = {};
    function Ts(a, b) {
        if (Tf) {
            var c;
            c = b.match(/^(gtm|gtag)\./) ? encodeURIComponent(b) : "*";
            Rs[a] = [
                ["e", c],
                ["eid", a],
            ];
            yi(a);
        }
    }
    function Us(a) {
        var b = a.eventId,
            c = a.Hb;
        if (!Rs[b]) return [];
        var d = [];
        Ss[b] || d.push(Qs);
        d.push.apply(d, ka(Rs[b]));
        c && (Ss[b] = !0);
        return d;
    }
    var Vs = {},
        Ws = {},
        Xs = {};
    function Ys(a, b, c, d) {
        Tf &&
            P(88) &&
            ((d === void 0 ? 0 : d)
                ? ((Xs[b] = Xs[b] || 0), ++Xs[b])
                : c !== void 0
                ? ((Ws[a] = Ws[a] || {}), (Ws[a][b] = Math.round(c)))
                : ((Vs[a] = Vs[a] || {}), (Vs[a][b] = (Vs[a][b] || 0) + 1)));
    }
    function Zs(a) {
        var b = a.eventId,
            c = a.Hb,
            d = Vs[b] || {},
            e = [],
            f;
        for (f in d) d.hasOwnProperty(f) && e.push("" + f + d[f]);
        c && delete Vs[b];
        return e.length ? [["md", e.join(".")]] : [];
    }
    function $s(a) {
        var b = a.eventId,
            c = a.Hb,
            d = Ws[b] || {},
            e = [],
            f;
        for (f in d) d.hasOwnProperty(f) && e.push("" + f + d[f]);
        c && delete Ws[b];
        return e.length ? [["mtd", e.join(".")]] : [];
    }
    function at() {
        for (
            var a = [], b = g(Object.keys(Xs)), c = b.next();
            !c.done;
            c = b.next()
        ) {
            var d = c.value;
            a.push("" + d + Xs[d]);
        }
        return a.length ? [["mec", a.join(".")]] : [];
    }
    var bt = {},
        ct = {};
    function dt(a, b, c) {
        if (Tf && b) {
            var d = Nf(b);
            bt[a] = bt[a] || [];
            bt[a].push(c + d);
            var e = (Sc(b) ? "1" : "2") + d;
            ct[a] = ct[a] || [];
            ct[a].push(e);
            yi(a);
        }
    }
    function et(a) {
        var b = a.eventId,
            c = a.Hb,
            d = [],
            e = bt[b] || [];
        e.length && d.push(["tr", e.join(".")]);
        var f = ct[b] || [];
        f.length && d.push(["ti", f.join(".")]);
        c && (delete bt[b], delete ct[b]);
        return d;
    }
    function ft(a, b, c, d) {
        var e = Fc[a],
            f = gt(a, b, c, d);
        if (!f) return null;
        var h = Tc(e[ec.hi], c, []);
        if (h && h.length) {
            var l = h[0];
            f = ft(
                l.index,
                {
                    onSuccess: f,
                    onFailure: l.vi === 1 ? b.terminate : f,
                    terminate: b.terminate,
                },
                c,
                d
            );
        }
        return f;
    }
    function gt(a, b, c, d) {
        function e() {
            function w() {
                ih(3);
                var I = fb() - J;
                dt(c.id, f, "7");
                As(c.Sb, B, "exception", I);
                P(77) && Fr(c, f, Mq.F.ji);
                D || ((D = !0), l());
            }
            if (f[ec.Xj]) l();
            else {
                var x = Rc(f, c, []),
                    y = x[ec.Xi];
                if (y != null)
                    for (var A = 0; A < y.length; A++)
                        if (!W(y[A])) {
                            l();
                            return;
                        }
                var B = zs(
                        c.Sb,
                        String(f[ec.ja]),
                        Number(f[ec.yd]),
                        x[ec.METADATA]
                    ),
                    D = !1;
                x.vtp_gtmOnSuccess = function () {
                    if (!D) {
                        D = !0;
                        var I = fb() - J;
                        dt(c.id, Fc[a], "5");
                        As(c.Sb, B, "success", I);
                        P(77) && Fr(c, f, Mq.F.li);
                        h();
                    }
                };
                x.vtp_gtmOnFailure = function () {
                    if (!D) {
                        D = !0;
                        var I = fb() - J;
                        dt(c.id, Fc[a], "6");
                        As(c.Sb, B, "failure", I);
                        P(77) && Fr(c, f, Mq.F.ki);
                        l();
                    }
                };
                x.vtp_gtmTagId = f.tag_id;
                x.vtp_gtmEventId = c.id;
                c.priorityId && (x.vtp_gtmPriorityId = c.priorityId);
                dt(c.id, f, "1");
                P(77) && Er(c, f);
                var J = fb();
                try {
                    Uc(x, { event: c, index: a, type: 1 });
                } catch (I) {
                    w(I);
                }
                P(77) && Fr(c, f, Mq.F.mi);
            }
        }
        var f = Fc[a],
            h = b.onSuccess,
            l = b.onFailure,
            m = b.terminate;
        if (c.isBlocked(f)) return null;
        var n = Tc(f[ec.ni], c, []);
        if (n && n.length) {
            var p = n[0],
                q = ft(
                    p.index,
                    { onSuccess: h, onFailure: l, terminate: m },
                    c,
                    d
                );
            if (!q) return null;
            h = q;
            l = p.vi === 2 ? m : q;
        }
        if (f[ec.Xh] || f[ec.Zj]) {
            var r = f[ec.Xh] ? Gc : c.Wl,
                t = h,
                v = l;
            if (!r[a]) {
                var u = ht(a, r, hb(e));
                h = u.onSuccess;
                l = u.onFailure;
            }
            return function () {
                r[a](t, v);
            };
        }
        return e;
    }
    function ht(a, b, c) {
        var d = [],
            e = [];
        b[a] = it(d, e, c);
        return {
            onSuccess: function () {
                b[a] = jt;
                for (var f = 0; f < d.length; f++) d[f]();
            },
            onFailure: function () {
                b[a] = kt;
                for (var f = 0; f < e.length; f++) e[f]();
            },
        };
    }
    function it(a, b, c) {
        return function (d, e) {
            a.push(d);
            b.push(e);
            c();
        };
    }
    function jt(a) {
        a();
    }
    function kt(a, b) {
        b();
    }
    var nt = function (a, b) {
        for (var c = [], d = 0; d < Fc.length; d++)
            if (a[d]) {
                var e = Fc[d];
                var f = Ds(b.Sb);
                try {
                    var h = ft(
                        d,
                        { onSuccess: f, onFailure: f, terminate: f },
                        b,
                        d
                    );
                    if (h) {
                        var l = e[ec.ja];
                        if (!l)
                            throw Error(
                                "Error: No function name given for function call."
                            );
                        var m = Hc[l];
                        c.push({
                            Pi: d,
                            Ii:
                                (m ? m.priorityOverride || 0 : 0) ||
                                Vr(e[ec.ja], 1) ||
                                0,
                            execute: h,
                        });
                    } else lt(d, b), f();
                } catch (p) {
                    f();
                }
            }
        c.sort(mt);
        for (var n = 0; n < c.length; n++) c[n].execute();
        return c.length > 0;
    };
    function mt(a, b) {
        var c,
            d = b.Ii,
            e = a.Ii;
        c = d > e ? 1 : d < e ? -1 : 0;
        var f;
        if (c !== 0) f = c;
        else {
            var h = a.Pi,
                l = b.Pi;
            f = h > l ? 1 : h < l ? -1 : 0;
        }
        return f;
    }
    function lt(a, b) {
        if (Tf) {
            var c = function (d) {
                var e = b.isBlocked(Fc[d]) ? "3" : "4",
                    f = Tc(Fc[d][ec.hi], b, []);
                f && f.length && c(f[0].index);
                dt(b.id, Fc[d], e);
                var h = Tc(Fc[d][ec.ni], b, []);
                h && h.length && c(h[0].index);
            };
            c(a);
        }
    }
    var qt = !1,
        ot;
    function rt(a) {
        var b = a["gtm.uniqueEventId"],
            c = a["gtm.priorityId"],
            d = a.event;
        if (P(77)) {
        }
        if (d === "gtm.js") {
            if (qt) return !1;
            qt = !0;
        }
        var e = !1,
            f = Zr(),
            h = Ba(a, null);
        if (
            !f.every(function (t) {
                return t({ originalEventData: h });
            })
        ) {
            if (d !== "gtm.js" && d !== "gtm.init" && d !== "gtm.init_consent")
                return !1;
            e = !0;
        }
        Ts(b, d);
        var l = a.eventCallback,
            m = a.eventTimeout,
            n = {
                id: b,
                priorityId: c,
                name: d,
                isBlocked: st(h, e),
                Wl: [],
                logMacroError: function () {
                    R(6);
                    ih(0);
                },
                cachedModelValues: tt(),
                Sb: new ys(function () {
                    if (P(77)) {
                    }
                    l && l.apply(l, Array.prototype.slice.call(arguments, 0));
                }, m),
                originalEventData: h,
            };
        P(88) && Tf && (n.reportMacroDiscrepancy = Ys);
        P(77) && Ar(n.id, n.name);
        var p = Wc(n);
        P(77) && Br(n.id, n.name);
        e && (p = ut(p));
        if (P(77)) {
        }
        var q = nt(p, n),
            r = !1;
        Es(n.Sb);
        (d !== "gtm.js" && d !== "gtm.sync") || Ks();
        return vt(p, q) || r;
    }
    function tt() {
        var a = {};
        a.event = pf("event", 1);
        a.ecommerce = pf("ecommerce", 1);
        a.gtm = pf("gtm");
        a.eventModel = pf("eventModel");
        return a;
    }
    function st(a, b) {
        var c = fs();
        return function (d) {
            if (c(d)) return !0;
            var e = d && d[ec.ja];
            if (!e || typeof e !== "string") return !0;
            e = e.replace(/^_*/, "");
            var f,
                h = mg();
            f = Xr().getRestrictions(0, h);
            var l = a;
            b &&
                ((l = Ba(a, null)),
                (l["gtm.uniqueEventId"] = Number.MAX_SAFE_INTEGER));
            for (
                var m = $e[e] || [], n = g(f), p = n.next();
                !p.done;
                p = n.next()
            ) {
                var q = p.value;
                try {
                    if (
                        !q({
                            entityId: e,
                            securityGroups: m,
                            originalEventData: l,
                        })
                    )
                        return !0;
                } catch (r) {
                    return !0;
                }
            }
            return !1;
        };
    }
    function ut(a) {
        for (var b = [], c = 0; c < a.length; c++)
            if (a[c]) {
                var d = String(Fc[c][ec.ja]);
                if (Le[d] || Fc[c][ec.bk] !== void 0 || Vr(d, 2)) b[c] = !0;
            }
        return b;
    }
    function vt(a, b) {
        if (!b) return b;
        for (var c = 0; c < a.length; c++)
            if (a[c] && Fc[c] && !Me[String(Fc[c][ec.ja])]) return !0;
        return !1;
    }
    var wt = 0;
    function xt(a, b) {
        return arguments.length === 1 ? zt("config", a) : zt("config", a, b);
    }
    function At(a, b, c) {
        c = c || {};
        c[K.g.Pb] = a;
        return zt("event", b, c);
    }
    function zt() {
        return arguments;
    }
    var Bt = function () {
        this.messages = [];
        this.j = [];
    };
    Bt.prototype.enqueue = function (a, b, c) {
        var d = this.messages.length + 1;
        a["gtm.uniqueEventId"] = b;
        a["gtm.priorityId"] = d;
        var e = Object.assign({}, c, {
                eventId: b,
                priorityId: d,
                fromContainerExecution: !0,
            }),
            f = {
                message: a,
                notBeforeEventId: b,
                priorityId: d,
                messageContext: e,
            };
        this.messages.push(f);
        for (var h = 0; h < this.j.length; h++)
            try {
                this.j[h](f);
            } catch (l) {}
    };
    Bt.prototype.listen = function (a) {
        this.j.push(a);
    };
    Bt.prototype.get = function () {
        for (var a = {}, b = 0; b < this.messages.length; b++) {
            var c = this.messages[b],
                d = a[c.notBeforeEventId];
            d || ((d = []), (a[c.notBeforeEventId] = d));
            d.push(c);
        }
        return a;
    };
    Bt.prototype.prune = function (a) {
        for (var b = [], c = [], d = 0; d < this.messages.length; d++) {
            var e = this.messages[d];
            e.notBeforeEventId === a ? b.push(e) : c.push(e);
        }
        this.messages = c;
        return b;
    };
    function Ct(a, b, c) {
        c.eventMetadata = c.eventMetadata || {};
        c.eventMetadata.source_canonical_id = eg.canonicalContainerId;
        Dt().enqueue(a, b, c);
    }
    function Et() {
        var a = Ft;
        Dt().listen(a);
    }
    function Dt() {
        var a = Ke.mb;
        a || ((a = new Bt()), (Ke.mb = a));
        return a;
    }
    var Gt = {},
        Ht = {};
    function It(a, b) {
        for (
            var c = [], d = [], e = {}, f = 0;
            f < a.length;
            e = { pg: void 0, cg: void 0 }, f++
        ) {
            var h = a[f];
            if (h.indexOf("-") >= 0) {
                if (((e.pg = Eh(h, b)), e.pg)) {
                    var l = ig();
                    Wa(
                        l,
                        (function (r) {
                            return function (t) {
                                return r.pg.destinationId === t;
                            };
                        })(e)
                    )
                        ? c.push(h)
                        : d.push(h);
                }
            } else {
                var m = Gt[h] || [];
                e.cg = {};
                m.forEach(
                    (function (r) {
                        return function (t) {
                            r.cg[t] = !0;
                        };
                    })(e)
                );
                for (var n = fg(), p = 0; p < n.length; p++)
                    if (e.cg[n[p]]) {
                        c = c.concat(ig());
                        break;
                    }
                var q = Ht[h] || [];
                q.length && (c = c.concat(q));
            }
        }
        return { rl: c, tl: d };
    }
    function Jt(a) {
        z(Gt, function (b, c) {
            var d = c.indexOf(a);
            d >= 0 && c.splice(d, 1);
        });
    }
    function Kt(a) {
        z(Ht, function (b, c) {
            var d = c.indexOf(a);
            d >= 0 && c.splice(d, 1);
        });
    }
    var Lt = "HA GF G UA AW DC MC".split(" "),
        Mt = !1,
        Nt = !1,
        Ot = !1,
        Pt = !1;
    function Qt(a, b) {
        a.hasOwnProperty("gtm.uniqueEventId") ||
            Object.defineProperty(a, "gtm.uniqueEventId", { value: af() });
        b.eventId = a["gtm.uniqueEventId"];
        b.priorityId = a["gtm.priorityId"];
        return { eventId: b.eventId, priorityId: b.priorityId };
    }
    var Rt = void 0,
        St = void 0;
    function Tt(a, b, c) {
        var d = Ba(a, null);
        d.eventId = void 0;
        d.inheritParentConfig = void 0;
        Object.keys(b).some(function (f) {
            return b[f] !== void 0;
        }) && R(136);
        var e = Ba(b, null);
        Ba(c, e);
        Ct(xt(fg()[0], e), a.eventId, d);
    }
    function Ut(a) {
        for (var b = g([K.g.zc, K.g.Db]), c = b.next(); !c.done; c = b.next()) {
            var d = c.value,
                e = (a && a[d]) || Gi.j[d];
            if (e) return e;
        }
    }
    var Vt = [
            K.g.zc,
            K.g.Db,
            K.g.rc,
            K.g.fb,
            K.g.pb,
            K.g.sa,
            K.g.ma,
            K.g.Ea,
            K.g.Ka,
            K.g.ib,
        ],
        Wt = {
            config: function (a, b) {
                var c = Qt(a, b);
                if (!(a.length < 2) && k(a[1])) {
                    var d = {};
                    if (a.length > 2) {
                        if ((a[2] !== void 0 && !Aa(a[2])) || a.length > 3)
                            return;
                        d = a[2];
                    }
                    var e = Eh(a[1], b.isGtmEvent);
                    if (e) {
                        var f, h, l;
                        a: {
                            if (!cg.ud) {
                                var m = og(pg());
                                if (yg(m)) {
                                    var n = m.parent,
                                        p = n.isDestination;
                                    l = { Al: og(n), ql: p };
                                    break a;
                                }
                            }
                            l = void 0;
                        }
                        var q = l;
                        q && ((f = q.Al), (h = q.ql));
                        Ts(c.eventId, "gtag.config");
                        var r = e.destinationId,
                            t = e.id !== r;
                        if (
                            t ? ig().indexOf(r) === -1 : fg().indexOf(r) === -1
                        ) {
                            if (!b.inheritParentConfig && !d[K.g.Ab]) {
                                var v = Ut(d);
                                if (t)
                                    ls(r, v, {
                                        source: 2,
                                        fromContainerExecution:
                                            b.fromContainerExecution,
                                    });
                                else if (
                                    f !== void 0 &&
                                    f.containers.indexOf(r) !== -1
                                ) {
                                    var u = d;
                                    Rt
                                        ? Tt(b, u, Rt)
                                        : St || (St = Ba(u, null));
                                } else
                                    is(r, v, !0, {
                                        source: 2,
                                        fromContainerExecution:
                                            b.fromContainerExecution,
                                    });
                            }
                        } else {
                            if (
                                f &&
                                (R(128), h && R(130), b.inheritParentConfig)
                            ) {
                                var w = d;
                                St
                                    ? Tt(b, St, w)
                                    : (!w[K.g.Qb] && Oe && Rt) ||
                                      (Rt = Ba(w, null));
                                return;
                            }
                            var x = d;
                            if (!Ot && ((Ot = !0), Nt))
                                for (
                                    var y = g(Vt), A = y.next();
                                    !A.done;
                                    A = y.next()
                                )
                                    if (x.hasOwnProperty(A.value)) {
                                        hh("erc");
                                        break;
                                    }
                            Uf && !dg && (wt === 1 && (Cg.mcc = !1), (wt = 2));
                            eh = !0;
                            if (Oe && !t && !d[K.g.Qb]) {
                                var B = Pt;
                                Pt = !0;
                                if (B) return;
                            }
                            Mt || R(43);
                            if (!b.noTargetGroup)
                                if (t) {
                                    Kt(e.id);
                                    var D = e.id,
                                        J = d[K.g.ue] || "default";
                                    J = String(J).split(",");
                                    for (var I = 0; I < J.length; I++) {
                                        var F = Ht[J[I]] || [];
                                        Ht[J[I]] = F;
                                        F.indexOf(D) < 0 && F.push(D);
                                    }
                                } else {
                                    Jt(e.id);
                                    var M = e.id,
                                        H = d[K.g.ue] || "default";
                                    H = H.toString().split(",");
                                    for (var Q = 0; Q < H.length; Q++) {
                                        var V = Gt[H[Q]] || [];
                                        Gt[H[Q]] = V;
                                        V.indexOf(M) < 0 && V.push(M);
                                    }
                                }
                            delete d[K.g.ue];
                            var T = b.eventMetadata || {};
                            T.hasOwnProperty("is_external_event") ||
                                (T.is_external_event =
                                    !b.fromContainerExecution);
                            b.eventMetadata = T;
                            delete d[K.g.jd];
                            for (
                                var S = t ? [e.id] : ig(), N = 0;
                                N < S.length;
                                N++
                            ) {
                                var ia = d,
                                    ca = S[N],
                                    Z = Ba(b, null),
                                    pa = Eh(ca, Z.isGtmEvent);
                                pa && Gi.push("config", [ia], pa, Z);
                            }
                        }
                    }
                }
            },
            consent: function (a, b) {
                if (a.length === 3) {
                    R(39);
                    var c = Qt(a, b),
                        d = a[1],
                        e = a[2];
                    b.fromContainerExecution ||
                        (e[K.g.K] && R(139), e[K.g.ka] && R(140));
                    d === "default"
                        ? th(e)
                        : d === "update"
                        ? uh(e, c)
                        : d === "declare" && b.fromContainerExecution && sh(e);
                }
            },
            event: function (a, b) {
                var c = a[1];
                if (!(a.length < 2) && k(c)) {
                    var d = void 0;
                    if (a.length > 2) {
                        if ((!Aa(a[2]) && a[2] !== void 0) || a.length > 3)
                            return;
                        d = a[2];
                    }
                    var e = d,
                        f = {},
                        h = ((f.event = c), f);
                    e &&
                        ((h.eventModel = Ba(e, null)),
                        e[K.g.jd] && (h.eventCallback = e[K.g.jd]),
                        e[K.g.qe] && (h.eventTimeout = e[K.g.qe]));
                    var l = Qt(a, b),
                        m = l.eventId,
                        n = l.priorityId;
                    h["gtm.uniqueEventId"] = m;
                    n && (h["gtm.priorityId"] = n);
                    if (c === "optimize.callback")
                        return (h.eventModel = h.eventModel || {}), h;
                    var p;
                    var q = d,
                        r = q && q[K.g.Pb];
                    r === void 0 &&
                        ((r = lf(K.g.Pb, 2)), r === void 0 && (r = "default"));
                    if (k(r) || Array.isArray(r)) {
                        var t;
                        t = b.isGtmEvent
                            ? k(r)
                                ? [r]
                                : r
                            : r.toString().replace(/\s+/g, "").split(",");
                        var v = It(t, b.isGtmEvent),
                            u = v.rl,
                            w = v.tl;
                        if (w.length)
                            for (var x = Ut(q), y = 0; y < w.length; y++) {
                                var A = Eh(w[y], b.isGtmEvent);
                                A &&
                                    ls(A.destinationId, x, {
                                        source: 3,
                                        fromContainerExecution:
                                            b.fromContainerExecution,
                                    });
                            }
                        p = Fh(u, b.isGtmEvent);
                    } else p = void 0;
                    var B = p;
                    if (B) {
                        var D;
                        !B.length ||
                            ((D = b.eventMetadata) == null ? 0 : D.em_event) ||
                            (Nt = !0);
                        Ts(m, c);
                        for (var J = [], I = 0; I < B.length; I++) {
                            var F = B[I],
                                M = Ba(b, null);
                            if (Lt.indexOf(qg(F.prefix)) !== -1) {
                                var H = Ba(d, null),
                                    Q = M.eventMetadata || {};
                                Q.hasOwnProperty("is_external_event") ||
                                    (Q.is_external_event =
                                        !M.fromContainerExecution);
                                M.eventMetadata = Q;
                                delete H[K.g.jd];
                                Fi(c, H, F.id, M);
                                Uf &&
                                    !dg &&
                                    wt === 0 &&
                                    (Eg("mcc", "1"), (wt = 1));
                                eh = !0;
                            }
                            J.push(F.id);
                        }
                        h.eventModel = h.eventModel || {};
                        B.length > 0
                            ? (h.eventModel[K.g.Pb] = J.join())
                            : delete h.eventModel[K.g.Pb];
                        Mt || R(43);
                        b.noGtmEvent === void 0 &&
                            b.eventMetadata &&
                            b.eventMetadata.syn_or_mod &&
                            (b.noGtmEvent = !0);
                        h.eventModel[K.g.zb] && (b.noGtmEvent = !0);
                        return b.noGtmEvent ? void 0 : h;
                    }
                }
            },
            get: function (a, b) {
                R(53);
                if (a.length === 4 && k(a[1]) && k(a[2]) && Ta(a[3])) {
                    var c = Eh(a[1], b.isGtmEvent),
                        d = String(a[2]),
                        e = a[3];
                    if (c) {
                        Mt || R(43);
                        var f = Ut();
                        if (
                            !Wa(ig(), function (l) {
                                return c.destinationId === l;
                            })
                        )
                            ls(c.destinationId, f, {
                                source: 4,
                                fromContainerExecution:
                                    b.fromContainerExecution,
                            });
                        else if (Lt.indexOf(qg(c.prefix)) !== -1) {
                            eh = !0;
                            Qt(a, b);
                            var h = {};
                            Ba(((h[K.g.lb] = d), (h[K.g.xb] = e), h), null);
                            Hi(
                                d,
                                function (l) {
                                    G(function () {
                                        e(l);
                                    });
                                },
                                c.id,
                                b
                            );
                        }
                    }
                }
            },
            js: function (a, b) {
                if (a.length === 2 && a[1].getTime) {
                    Mt = !0;
                    var c = Qt(a, b),
                        d = c.eventId,
                        e = c.priorityId,
                        f = {};
                    return (
                        (f.event = "gtm.js"),
                        (f["gtm.start"] = a[1].getTime()),
                        (f["gtm.uniqueEventId"] = d),
                        (f["gtm.priorityId"] = e),
                        f
                    );
                }
            },
            policy: function () {},
            set: function (a, b) {
                var c = void 0;
                a.length === 2 && Aa(a[1])
                    ? (c = Ba(a[1], null))
                    : a.length === 3 &&
                      k(a[1]) &&
                      ((c = {}),
                      Aa(a[2]) || Array.isArray(a[2])
                          ? (c[a[1]] = Ba(a[2], null))
                          : (c[a[1]] = a[2]));
                if (c) {
                    var d = Qt(a, b),
                        e = d.eventId,
                        f = d.priorityId;
                    Ba(c, null);
                    var h = Ba(c, null);
                    Gi.push("set", [h], void 0, b);
                    c["gtm.uniqueEventId"] = e;
                    f && (c["gtm.priorityId"] = f);
                    delete c.event;
                    b.overwriteModelFields = !0;
                    return c;
                }
            },
        },
        Xt = { policy: !0 };
    var Zt = function (a) {
        if (Yt(a)) return a;
        this.value = a;
    };
    Zt.prototype.getUntrustedMessageValue = function () {
        return this.value;
    };
    var Yt = function (a) {
        return !a || ya(a) !== "object" || Aa(a)
            ? !1
            : "getUntrustedMessageValue" in a;
    };
    Zt.prototype.getUntrustedMessageValue =
        Zt.prototype.getUntrustedMessageValue;
    var $t = !1,
        au = [];
    function bu() {
        if (!$t) {
            $t = !0;
            for (var a = 0; a < au.length; a++) G(au[a]);
        }
    }
    function cu(a) {
        $t ? G(a) : au.push(a);
    }
    var du = 0,
        eu = {},
        fu = [],
        gu = [],
        hu = !1,
        iu = !1;
    function ju(a, b) {
        return (
            a.messageContext.eventId - b.messageContext.eventId ||
            a.messageContext.priorityId - b.messageContext.priorityId
        );
    }
    function ku(a, b) {
        var c = a._clear || b.overwriteModelFields;
        z(a, function (e, f) {
            e !== "_clear" && (c && of(e), of(e, f));
        });
        Xe || (Xe = a["gtm.start"]);
        var d = a["gtm.uniqueEventId"];
        if (!a.event) return !1;
        typeof d !== "number" &&
            ((d = af()),
            (a["gtm.uniqueEventId"] = d),
            of("gtm.uniqueEventId", d));
        return rt(a);
    }
    function lu(a) {
        if (a == null || typeof a !== "object") return !1;
        if (a.event) return !0;
        if ($a(a)) {
            var b = a[0];
            if (b === "config" || b === "event" || b === "js" || b === "get")
                return !0;
        }
        return !1;
    }
    function mu() {
        var a;
        if (gu.length) a = gu.shift();
        else if (fu.length) a = fu.shift();
        else return;
        var b;
        var c = a;
        if (hu || !lu(c.message)) b = c;
        else {
            hu = !0;
            var d = c.message["gtm.uniqueEventId"];
            typeof d !== "number" &&
                (d = c.message["gtm.uniqueEventId"] = af());
            var e = {},
                f = {
                    message:
                        ((e.event = "gtm.init_consent"),
                        (e["gtm.uniqueEventId"] = d - 2),
                        e),
                    messageContext: { eventId: d - 2 },
                },
                h = {},
                l = {
                    message:
                        ((h.event = "gtm.init"),
                        (h["gtm.uniqueEventId"] = d - 1),
                        h),
                    messageContext: { eventId: d - 1 },
                };
            fu.unshift(l, c);
            if (Uf) {
                if (!P(100)) {
                    var m = ns();
                    m && ms.push(m);
                }
                Ig();
            }
            b = f;
        }
        return b;
    }
    function nu() {
        for (var a = !1, b; !iu && (b = mu()); ) {
            iu = !0;
            delete hf.eventModel;
            kf();
            var c = b,
                d = c.message,
                e = c.messageContext;
            if (d == null) iu = !1;
            else {
                if (e.fromContainerExecution)
                    for (
                        var f = [
                                "gtm.allowlist",
                                "gtm.blocklist",
                                "gtm.whitelist",
                                "gtm.blacklist",
                                "tagTypeBlacklist",
                            ],
                            h = 0;
                        h < f.length;
                        h++
                    ) {
                        var l = f[h],
                            m = lf(l, 1);
                        if (Array.isArray(m) || Aa(m)) m = Ba(m);
                        jf[l] = m;
                    }
                try {
                    if (Ta(d))
                        try {
                            d.call(mf);
                        } catch (y) {}
                    else if (Array.isArray(d)) {
                        if (k(d[0])) {
                            var n = d[0].split("."),
                                p = n.pop(),
                                q = d.slice(1),
                                r = lf(n.join("."), 2);
                            if (r != null)
                                try {
                                    r[p].apply(r, q);
                                } catch (y) {}
                        }
                    } else {
                        var t = void 0;
                        if ($a(d))
                            a: {
                                if (d.length && k(d[0])) {
                                    var v = Wt[d[0]];
                                    if (
                                        v &&
                                        (!e.fromContainerExecution || !Xt[d[0]])
                                    ) {
                                        t = v(d, e);
                                        break a;
                                    }
                                }
                                t = void 0;
                            }
                        else t = d;
                        t && (a = ku(t, e) || a);
                    }
                } finally {
                    e.fromContainerExecution && kf(!0);
                    var u = d["gtm.uniqueEventId"];
                    if (typeof u === "number") {
                        for (
                            var w = eu[String(u)] || [], x = 0;
                            x < w.length;
                            x++
                        )
                            gu.push(ou(w[x]));
                        w.length && gu.sort(ju);
                        delete eu[String(u)];
                        u > du && (du = u);
                    }
                    iu = !1;
                }
            }
        }
        return !a;
    }
    function pu() {
        if (P(77)) {
            var a = qu();
        }
        var b = nu();
        if (P(77)) {
        }
        try {
            var c = kg(),
                d = C[Je.ub].hide;
            if (d && d[c] !== void 0 && d.end) {
                d[c] = !1;
                var e = !0,
                    f;
                for (f in d)
                    if (d.hasOwnProperty(f) && d[f] === !0) {
                        e = !1;
                        break;
                    }
                e && (d.end(), (d.end = null));
            }
        } catch (h) {}
        return b;
    }
    function Ft(a) {
        if (du < a.notBeforeEventId) {
            var b = String(a.notBeforeEventId);
            eu[b] = eu[b] || [];
            eu[b].push(a);
        } else
            gu.push(ou(a)),
                gu.sort(ju),
                G(function () {
                    iu || nu();
                });
    }
    function ou(a) {
        return { message: a.message, messageContext: a.messageContext };
    }
    function ru() {
        function a(f) {
            var h = {};
            if (Yt(f)) {
                var l = f;
                f = Yt(l) ? l.getUntrustedMessageValue() : void 0;
                h.fromContainerExecution = !0;
            }
            return { message: f, messageContext: h };
        }
        var b = Eb(Je.ub, []),
            c = (Ke[Je.ub] = Ke[Je.ub] || {});
        c.pruned === !0 && R(83);
        eu = Dt().get();
        Et();
        vs(function () {
            if (!c.gtmDom) {
                c.gtmDom = !0;
                var f = {};
                b.push(((f.event = "gtm.dom"), f));
            }
        });
        cu(function () {
            if (!c.gtmLoad) {
                c.gtmLoad = !0;
                var f = {};
                b.push(((f.event = "gtm.load"), f));
            }
        });
        c.subscribers = (c.subscribers || 0) + 1;
        var d = b.push;
        b.push = function () {
            var f;
            if (Ke.SANDBOXED_JS_SEMAPHORE > 0) {
                f = [];
                for (var h = 0; h < arguments.length; h++)
                    f[h] = new Zt(arguments[h]);
            } else f = [].slice.call(arguments, 0);
            var l = f.map(function (q) {
                return a(q);
            });
            fu.push.apply(fu, l);
            var m = d.apply(b, f),
                n = Math.max(100, Number("1000") || 300);
            if (this.length > n)
                for (R(4), c.pruned = !0; this.length > n; ) this.shift();
            var p = typeof m !== "boolean" || m;
            return nu() && p;
        };
        var e = b.slice(0).map(function (f) {
            return a(f);
        });
        fu.push.apply(fu, e);
        if (qu()) {
            if (P(77)) {
            }
            G(pu);
        }
    }
    var qu = function () {
            var a = !0;
            return a;
        },
        su = function (a) {
            C[Je.ub].push(a);
        };
    function tu(a) {
        if (a == null || a.length === 0) return !1;
        var b = Number(a),
            c = fb();
        return b < c + 3e5 && b > c - 9e5;
    }
    function Ou() {}
    var Pu = function () {};
    Pu.prototype.toString = function () {
        return "undefined";
    };
    var Qu = new Pu();
    function Xu(a, b) {
        function c(h) {
            var l = Df(h),
                m = xf(l, "protocol"),
                n = xf(l, "host", !0),
                p = xf(l, "port"),
                q = xf(l, "path").toLowerCase().replace(/\/$/, "");
            if (
                m === void 0 ||
                (m === "http" && p === "80") ||
                (m === "https" && p === "443")
            )
                (m = "web"), (p = "default");
            return [m, n, p, q];
        }
        for (var d = c(String(a)), e = c(String(b)), f = 0; f < d.length; f++)
            if (d[f] !== e[f]) return !1;
        return !0;
    }
    function Yu(a) {
        return Zu(a) ? 1 : 0;
    }
    function Zu(a) {
        var b = a.arg0,
            c = a.arg1;
        if (a.any_of && Array.isArray(c)) {
            for (var d = 0; d < c.length; d++) {
                var e = Ba(a, {});
                Ba({ arg1: c[d], any_of: void 0 }, e);
                if (Yu(e)) return !0;
            }
            return !1;
        }
        switch (a["function"]) {
            case "_cn":
                return String(b).indexOf(String(c)) >= 0;
            case "_css":
                var f;
                a: {
                    if (b)
                        try {
                            for (var h = 0; h < qd.length; h++) {
                                var l = qd[h];
                                if (b[l] != null) {
                                    f = b[l](c);
                                    break a;
                                }
                            }
                        } catch (u) {}
                    f = !1;
                }
                return f;
            case "_ew":
                var m = String(b),
                    n = String(c),
                    p = m.length - n.length;
                return p >= 0 && m.indexOf(n, p) === p;
            case "_eq":
                return String(b) === String(c);
            case "_ge":
                return Number(b) >= Number(c);
            case "_gt":
                return Number(b) > Number(c);
            case "_lc":
                return String(b).split(",").indexOf(String(c)) >= 0;
            case "_le":
                return Number(b) <= Number(c);
            case "_lt":
                return Number(b) < Number(c);
            case "_re":
                var q;
                a: {
                    var r = a.ignore_case ? "i" : void 0;
                    try {
                        var t = String(c) + String(r),
                            v = rd.get(t);
                        v || ((v = new RegExp(c, r)), rd.set(t, v));
                        q = v.test(b);
                        break a;
                    } catch (u) {
                        q = !1;
                        break a;
                    }
                }
                return q;
            case "_sw":
                return kb(String(b), String(c));
            case "_um":
                return Xu(b, c);
        }
        return !1;
    }
    function $u() {
        var a;
        a = a === void 0 ? "" : a;
        var b, c;
        return (
            (b = data) == null
                ? 0
                : (c = b.blob) == null
                ? 0
                : c.hasOwnProperty(1)
        )
            ? String(data.blob[1])
            : a;
    }
    function av() {
        var a = [
            ["cv", P(109) ? $u() : "1"],
            ["rv", Je.Gf],
            [
                "tc",
                Fc.filter(function (b) {
                    return b;
                }).length,
            ],
        ];
        Je.wd && a.push(["x", Je.wd]);
        cf.j && a.push(["tag_exp", cf.j]);
        return a;
    }
    var bv = {},
        cv = {};
    function dv() {
        var a = 0;
        return function (b) {
            switch (b) {
                case 1:
                    a |= 1;
                    break;
                case 2:
                    a |= 2;
                    break;
                case 3:
                    a |= 4;
            }
            return a;
        };
    }
    function ev(a, b, c) {
        if (Tf) {
            var d = String(c) + b;
            bv[a] = bv[a] || [];
            bv[a].push(d);
            cv[a] = cv[a] || [];
            cv[a].push("j" + b);
        }
    }
    function fv(a) {
        var b = a.eventId,
            c = a.Hb,
            d = [],
            e = bv[b] || [];
        e.length && d.push(["hf", e.join(".")]);
        var f = cv[b] || [];
        f.length && d.push(["ht", f.join(".")]);
        c && (delete bv[b], delete cv[b]);
        return d;
    }
    function pv(a) {
        var b = Ke.zones;
        return b
            ? b.getIsAllowedFn(fg(), a)
            : function () {
                  return !0;
              };
    }
    function qv() {
        Yr(function (a) {
            var b = a.originalEventData["gtm.uniqueEventId"],
                c = Ke.zones;
            return c ? c.isActive(fg(), b) : !0;
        });
        Wr(function (a) {
            var b, c;
            b = a.entityId;
            c = a.securityGroups;
            return pv(Number(a.originalEventData["gtm.uniqueEventId"]))(b, c);
        });
    }
    var rv = function (a, b, c) {
        this.eventName = b;
        this.m = c;
        this.j = {};
        this.isAborted = !1;
        this.target = a;
        this.metadata = Ba(c.eventMetadata || {}, {});
    };
    rv.prototype.copyToHitData = function (a, b, c) {
        var d = U(this.m, a);
        d === void 0 && (d = b);
        if (d !== void 0 && c !== void 0 && k(d) && P(69))
            try {
                d = c(d);
            } catch (e) {}
        d !== void 0 && (this.j[a] = d);
    };
    var ap = function (a, b, c) {
        var d = jo(a.target.destinationId);
        return d && d[b] !== void 0 ? d[b] : c;
    };
    function cw() {
        return Lj(7) && Lj(9) && Lj(10);
    }
    nh();
    function ex() {
        return (C.gaGlobal = C.gaGlobal || {});
    }
    function fx() {
        var a = ex();
        a.hid = a.hid || Xa();
        return a.hid;
    }
    function gx(a, b) {
        var c = ex();
        if (c.vid === void 0 || (b && !c.from_cookie))
            (c.vid = a), (c.from_cookie = b);
    }
    function Cx(a) {
        if (dp(a) || ef()) a.j[K.g.Hh] = kh() || jh["0"] || "";
        P(66) && !dp(a) && ef() && (a.j[K.g.Rh] = "::");
    }
    function Dx(a) {
        if (P(65) && ef()) {
            In(a);
            Jn(a, "cpf", U(a.m, K.g.Ea));
            var b = U(a.m, K.g.Nb);
            Jn(a, "cu", b === !0 ? 1 : b === !1 ? 0 : void 0);
            Jn(a, "cf", U(a.m, K.g.Pa));
            Jn(a, "cd", Fk(U(a.m, K.g.Ka), U(a.m, K.g.ib)));
        }
    }
    var Tx = function (a) {
            this.D = a;
            this.j = "";
        },
        Ux = function (a, b) {
            a.C = b;
            return a;
        },
        Vx = function (a, b) {
            b = a.j + b;
            for (var c = b.indexOf("\n\n"); c !== -1; ) {
                var d = a,
                    e;
                a: {
                    var f = g(b.substring(0, c).split("\n")),
                        h = f.next().value,
                        l = f.next().value;
                    if (
                        h.indexOf("event: message") === 0 &&
                        l.indexOf("data: ") === 0
                    )
                        try {
                            e = JSON.parse(l.substring(l.indexOf(":") + 1));
                            break a;
                        } catch (F) {}
                    e = void 0;
                }
                var m = d,
                    n = e;
                if (n) {
                    var p = n.send_pixel,
                        q = n.options,
                        r = m.D;
                    if (p) {
                        var t = p || [];
                        if (Array.isArray(t))
                            for (
                                var v = Aa(q) ? q : {}, u = g(t), w = u.next();
                                !w.done;
                                w = u.next()
                            )
                                r(w.value, v);
                    }
                    var x = n.create_iframe,
                        y = n.options,
                        A = m.C;
                    if (x && A) {
                        var B = x || [];
                        if (Array.isArray(B))
                            for (
                                var D = Aa(y) ? y : {}, J = g(B), I = J.next();
                                !I.done;
                                I = J.next()
                            )
                                A(I.value, D);
                    }
                }
                b = b.substring(c + 2);
                c = b.indexOf("\n\n");
            }
            a.j = b;
        };
    function Wx(a) {
        var b = a.search;
        return (
            a.protocol +
            "//" +
            a.hostname +
            a.pathname +
            (b ? b + "&richsstsse" : "?richsstsse")
        );
    }
    var Hy = window,
        Iy = document,
        Jy = function (a) {
            var b = Hy._gaUserPrefs;
            if (
                (b && b.ioo && b.ioo()) ||
                Iy.documentElement.hasAttribute(
                    "data-google-analytics-opt-out"
                ) ||
                (a && Hy["ga-disable-" + a] === !0)
            )
                return !0;
            try {
                var c = Hy.external;
                if (c && c._gaUserPrefs && c._gaUserPrefs == "oo") return !0;
            } catch (p) {}
            for (
                var d = [], e = String(Iy.cookie).split(";"), f = 0;
                f < e.length;
                f++
            ) {
                var h = e[f].split("="),
                    l = h[0].replace(/^\s*|\s*$/g, "");
                if (l && l == "AMP_TOKEN") {
                    var m = h
                        .slice(1)
                        .join("=")
                        .replace(/^\s*|\s*$/g, "");
                    m && (m = decodeURIComponent(m));
                    d.push(m);
                }
            }
            for (var n = 0; n < d.length; n++)
                if (d[n] == "$OPT_OUT") return !0;
            return Iy.getElementById("__gaOptOutExtension") ? !0 : !1;
        };
    function Uy(a) {
        z(a, function (c) {
            c.charAt(0) === "_" && delete a[c];
        });
        var b = a[K.g.Ua] || {};
        z(b, function (c) {
            c.charAt(0) === "_" && delete b[c];
        });
    }
    function xz(a, b) {}
    function yz(a, b) {
        var c = function () {};
        return c;
    }
    function zz(a, b, c) {}
    var Az = yz;
    var Cz = Array.isArray;
    function Dz(a, b) {
        return Ba(a, b || null);
    }
    function X(a) {
        return window.encodeURIComponent(a);
    }
    function Ez(a, b, c) {
        Mb(a, b, c);
    }
    function Fz(a, b) {
        if (!a) return !1;
        var c = xf(Df(a), "host");
        if (!c) return !1;
        for (var d = 0; b && d < b.length; d++) {
            var e = b[d] && b[d].toLowerCase();
            if (e) {
                var f = c.length - e.length;
                f > 0 && e.charAt(0) !== "." && (f--, (e = "." + e));
                if (f >= 0 && c.indexOf(e, f) === f) return !0;
            }
        }
        return !1;
    }
    function Gz(a, b, c) {
        for (var d = {}, e = !1, f = 0; a && f < a.length; f++)
            a[f] &&
                a[f].hasOwnProperty(b) &&
                a[f].hasOwnProperty(c) &&
                ((d[a[f][b]] = a[f][c]), (e = !0));
        return e ? d : null;
    }
    var Pz = C.clearTimeout,
        Qz = C.setTimeout;
    function Rz(a, b, c) {
        if (ck()) {
            b && G(b);
        } else return Jb(a, b, c);
    }
    function Sz() {
        return C.location.href;
    }
    function Tz(a, b) {
        return lf(a, b || 2);
    }
    function Uz(a, b) {
        C[a] = b;
    }
    function Vz(a, b, c) {
        b && (C[a] === void 0 || (c && !C[a])) && (C[a] = b);
        return C[a];
    }
    function Wz(a, b) {
        if (ck()) {
            b && G(b);
        } else Lb(a, b);
    }
    var Xz = {};
    var Y = { securityGroups: {} };

    (Y.securityGroups.v = ["google"]),
        (Y.__v = function (a) {
            var b = a.vtp_name;
            if (!b || !b.replace) return !1;
            var c = Tz(b.replace(/\\\./g, "."), a.vtp_dataLayerVersion || 1);
            return c !== void 0 ? c : a.vtp_defaultValue;
        }),
        (Y.__v.o = "v"),
        (Y.__v.isVendorTemplate = !0),
        (Y.__v.priorityOverride = 0),
        (Y.__v.isInfrastructure = !0),
        (Y.__v.runInSiloedMode = !1);

    (Y.securityGroups.get = ["google"]),
        (Y.__get = function (a) {
            var b = a.vtp_settings,
                c = b.eventParameters || {},
                d = String(a.vtp_eventName),
                e = {};
            e.eventId = a.vtp_gtmEventId;
            e.priorityId = a.vtp_gtmPriorityId;
            a.vtp_deferrable && (e.deferrable = !0);
            var f = At(String(b.streamId), d, c);
            Ct(f, e.eventId, e);
            a.vtp_gtmOnSuccess();
        }),
        (Y.__get.o = "get"),
        (Y.__get.isVendorTemplate = !0),
        (Y.__get.priorityOverride = 0),
        (Y.__get.isInfrastructure = !1),
        (Y.__get.runInSiloedMode = !1);

    var Yz = {};
    Yz.dataLayer = mf;
    Yz.callback = function (a) {
        Ze.hasOwnProperty(a) && Ta(Ze[a]) && Ze[a]();
        delete Ze[a];
    };
    Yz.bootstrap = 0;
    Yz._spx = !1;
    function Zz() {
        Ke[kg()] = Ke[kg()] || Yz;
        ug();
        wg() ||
            z(xg(), function (d, e) {
                ls(d, e.transportUrl, e.context);
                R(92);
            });
        ib($e, Y.securityGroups);
        var a = og(pg()),
            b,
            c =
                a == null
                    ? void 0
                    : (b = a.context) == null
                    ? void 0
                    : b.source;
        (c !== 2 && c !== 4 && c !== 3) || R(142);
        Nc = Zc;
    }
    var $z = !1;
    (function (a) {
        function b() {
            n = E.documentElement.getAttribute("data-tag-assistant-present");
            tu(n) && (m = l.Mh);
        }
        function c() {
            m && Db ? h(m) : a();
        }
        if (!C["__TAGGY_INSTALLED"]) {
            var d = !1;
            if (E.referrer) {
                var e = Df(E.referrer);
                d = zf(e, "host") === "cct.google";
            }
            if (!d) {
                var f = pk("googTaggyReferrer");
                d = !(!f.length || !f[0].length);
            }
            d &&
                ((C["__TAGGY_INSTALLED"] = !0),
                Jb("https://cct.google/taggy/agent.js"));
        }
        var h = function (v) {
                var u = "GTM",
                    w = "GTM";
                Pe && ((u = "OGT"), (w = "GTAG"));
                var x = C["google.tagmanager.debugui2.queue"];
                x ||
                    ((x = []),
                    (C["google.tagmanager.debugui2.queue"] = x),
                    Jb(
                        "https://" +
                            Je.Mc +
                            "/debug/bootstrap?id=" +
                            eg.ctid +
                            "&src=" +
                            w +
                            "&cond=" +
                            v +
                            "&gtm=" +
                            ek()
                    ));
                var y = {
                    messageType: "CONTAINER_STARTING",
                    data: {
                        scriptSource: Db,
                        containerProduct: u,
                        debug: !1,
                        id: eg.ctid,
                        targetRef: { ctid: eg.ctid, isDestination: cg.ud },
                        aliases: gg(),
                        destinations: jg(),
                    },
                };
                y.data.resume = function () {
                    a();
                };
                Je.Yi && (y.data.initialPublish = !0);
                x.push(y);
            },
            l = { Sj: 1, Oh: 2, ei: 3, Jg: 4, Mh: 5 };
        l[l.Sj] = "GTM_DEBUG_LEGACY_PARAM";
        l[l.Oh] = "GTM_DEBUG_PARAM";
        l[l.ei] = "REFERRER";
        l[l.Jg] = "COOKIE";
        l[l.Mh] = "EXTENSION_PARAM";
        var m = void 0,
            n = void 0,
            p = xf(C.location, "query", !1, void 0, "gtm_debug");
        tu(p) && (m = l.Oh);
        if (!m && E.referrer) {
            var q = Df(E.referrer);
            zf(q, "host") === "tagassistant.google.com" && (m = l.ei);
        }
        if (!m) {
            var r = pk("__TAG_ASSISTANT");
            r.length && r[0].length && (m = l.Jg);
        }
        m || b();
        if (!m && n && n.indexOf("pending:") === 0 && tu(n.substr(8))) {
            var t = !1;
            Nb(
                E,
                "TADebugSignal",
                function () {
                    t || ((t = !0), b(), c());
                },
                !1
            );
            C.setTimeout(function () {
                t || ((t = !0), b(), c());
            }, 200);
        } else c();
    })(function () {
        try {
            var a;
            if (!(a = !P(59))) {
                var b;
                if (!(b = $z)) {
                    var c;
                    a: {
                        for (
                            var d = $f(), e = g(fg()), f = e.next();
                            !f.done;
                            f = e.next()
                        )
                            if (d.injectedFirstPartyContainers[f.value]) {
                                c = !0;
                                break a;
                            }
                        c = !1;
                    }
                    b = !c;
                }
                a = b;
            }
            if (a) {
                sg();
                if (P(77)) {
                }
                Pa[12] = !0;
                Ej();
                Ah();
                var h = mg();
                if ($f().canonical[h]) {
                    var l = Ke.zones;
                    l && l.unregisterChild(fg());
                    Xr().removeExternalRestrictions(mg());
                } else {
                    cf.j = "101671035~101747727";
                    cf.H = "";
                    cf.Ga =
                        "ad_storage|analytics_storage|ad_user_data|ad_personalization";
                    cf.T = "ad_storage|analytics_storage|ad_user_data";
                    cf.N = "4a10";
                    cf.N = "4a30";
                    hs();
                    for (
                        var m = data.resource || {}, n = m.macros || [], p = 0;
                        p < n.length;
                        p++
                    )
                        Cc.push(n[p]);
                    for (var q = m.tags || [], r = 0; r < q.length; r++)
                        Fc.push(q[r]);
                    for (var t = m.predicates || [], v = 0; v < t.length; v++)
                        Ec.push(t[v]);
                    for (var u = m.rules || [], w = 0; w < u.length; w++) {
                        for (var x = u[w], y = {}, A = 0; A < x.length; A++) {
                            var B = x[A][0];
                            y[B] = Array.prototype.slice.call(x[A], 1);
                            (B !== "if" && B !== "unless") || Mc(y[B]);
                        }
                        Dc.push(y);
                    }
                    Hc = Y;
                    Ic = Yu;
                    Zz();
                    if (!Ue)
                        for (
                            var D = jh["6"] !== !1 ? ff(cf.T) : ff(cf.Ga),
                                J = 0;
                            J < ph.length;
                            J++
                        ) {
                            var I = ph[J],
                                F = I,
                                M = D[I] ? "granted" : "denied";
                            Ng().implicit(F, M);
                        }
                    ru();
                    qs = !1;
                    rs = 0;
                    if (
                        (E.readyState === "interactive" &&
                            !E.createEventObject) ||
                        E.readyState === "complete"
                    )
                        ts();
                    else {
                        Nb(E, "DOMContentLoaded", ts);
                        Nb(E, "readystatechange", ts);
                        if (E.createEventObject && E.documentElement.doScroll) {
                            var H = !0;
                            try {
                                H = !C.frameElement;
                            } catch (Xq) {}
                            H && us();
                        }
                        Nb(C, "load", ts);
                    }
                    $t = !1;
                    E.readyState === "complete" ? bu() : Nb(C, "load", bu);
                    Tf &&
                        (oi(Bi),
                        C.setInterval(Ai, 864e5),
                        oi(av),
                        oi(Us),
                        oi(Nq),
                        oi(Ei),
                        oi(fv),
                        oi(et),
                        oi(Bp),
                        P(88) && (oi(Zs), oi($s), oi(at)));
                    if (Uf) {
                        Mg();
                        Vh();
                        ps();
                        var V;
                        var T = og(pg());
                        if (T) {
                            for (; T.parent; ) {
                                var S = og(T.parent);
                                if (!S) break;
                                T = S;
                            }
                            V = T;
                        } else V = void 0;
                        var N = V;
                        if (!N) R(144);
                        else if (N.canonicalContainerId) {
                            var ia;
                            a: {
                                if (N.scriptSource) {
                                    var ca;
                                    try {
                                        var Z;
                                        ca =
                                            (Z = Zb()) == null
                                                ? void 0
                                                : Z.getEntriesByType(
                                                      "resource"
                                                  );
                                    } catch (Xq) {}
                                    if (ca) {
                                        for (
                                            var pa = {}, Ea = 0;
                                            Ea < ca.length;
                                            ++Ea
                                        ) {
                                            var ta = ca[Ea],
                                                Ca = ta.initiatorType;
                                            if (
                                                Ca === "script" &&
                                                ta.name === N.scriptSource
                                            ) {
                                                ia = { Ol: Ea, Pl: pa };
                                                break a;
                                            }
                                            pa[Ca] = 1 + (pa[Ca] || 0);
                                        }
                                        R(146);
                                    } else R(145);
                                }
                                ia = void 0;
                            }
                            var Ja = ia;
                            Ja &&
                                (Eg("rtg", String(N.canonicalContainerId)),
                                Eg("rlo", String(Ja.Ol)),
                                Eg("slo", String(Ja.Pl.script || "0")),
                                Eg("hlo", N.htmlLoadOrder || "-1"),
                                Eg("lst", String(N.loadScriptType || "0")));
                        }
                        var Lc;
                        var qc = ng();
                        if (qc) {
                            var Re;
                            Lc =
                                qc.canonicalContainerId ||
                                "_" +
                                    (qc.scriptContainerId ||
                                        ((Re = qc.destinations) == null
                                            ? void 0
                                            : Re[0]));
                        } else Lc = void 0;
                        var Yq = Lc;
                        Yq && Eg("pcid", Yq);
                        P(34) &&
                            (Eg("bt", String(cf.D ? 2 : Se ? 1 : 0)),
                            Eg("ct", String(cf.D ? 0 : Se ? 1 : ck() ? 2 : 3)));
                    }
                    Ou();
                    ih(1);
                    qv();
                    Ye = fb();
                    Yz.bootstrap = Ye;
                    if (P(77)) {
                    }
                }
            }
        } catch (Xq) {
            if ((ih(4), Tf)) {
                var aA = vi(!0, !0);
                Mb(aA);
            }
        }
    });
})();
