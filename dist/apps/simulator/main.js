var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// node_modules/geojson-bbox/geojson-bbox.js
var require_geojson_bbox = __commonJS({
  "node_modules/geojson-bbox/geojson-bbox.js"(exports, module) {
    module.exports = function(gj) {
      var coords, bbox;
      if (!gj.hasOwnProperty("type"))
        return;
      coords = getCoordinatesDump(gj);
      bbox = [
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY
      ];
      return coords.reduce(function(prev, coord) {
        return [
          Math.min(coord[0], prev[0]),
          Math.min(coord[1], prev[1]),
          Math.max(coord[0], prev[2]),
          Math.max(coord[1], prev[3])
        ];
      }, bbox);
    };
    function getCoordinatesDump(gj) {
      var coords;
      if (gj.type == "Point") {
        coords = [gj.coordinates];
      } else if (gj.type == "LineString" || gj.type == "MultiPoint") {
        coords = gj.coordinates;
      } else if (gj.type == "Polygon" || gj.type == "MultiLineString") {
        coords = gj.coordinates.reduce(function(dump, part) {
          return dump.concat(part);
        }, []);
      } else if (gj.type == "MultiPolygon") {
        coords = gj.coordinates.reduce(function(dump, poly) {
          return dump.concat(poly.reduce(function(points, part) {
            return points.concat(part);
          }, []));
        }, []);
      } else if (gj.type == "Feature") {
        coords = getCoordinatesDump(gj.geometry);
      } else if (gj.type == "GeometryCollection") {
        coords = gj.geometries.reduce(function(dump, g3) {
          return dump.concat(getCoordinatesDump(g3));
        }, []);
      } else if (gj.type == "FeatureCollection") {
        coords = gj.features.reduce(function(dump, f3) {
          return dump.concat(getCoordinatesDump(f3));
        }, []);
      }
      return coords;
    }
  }
});

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports, module) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject = function isPlainObject2(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    };
    module.exports = function extend() {
      var options, name, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i4 = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i4 = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i4 < length; ++i4) {
        options = arguments[i4];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// node_modules/multigeojson/index.js
var require_multigeojson = __commonJS({
  "node_modules/multigeojson/index.js"(exports, module) {
    (function() {
      var singles = ["Point", "LineString", "Polygon"];
      var multies = ["MultiPoint", "MultiLineString", "MultiPolygon"];
      function explode(g3) {
        if (multies.indexOf(g3.type) > -1) {
          return g3.coordinates.map(function(part) {
            var single = {};
            single.type = g3.type.replace("Multi", "");
            single.coordinates = part;
            if (g3.crs)
              single.crs = g3.crs;
            return single;
          });
        } else {
          return false;
        }
      }
      function implode(gs) {
        var sameType = gs.every(function(g3) {
          return singles.indexOf(g3.type) > -1;
        });
        var crs = gs[0].crs || 0;
        var sameCrs = gs.every(function(g3) {
          var gcrs = g3.crs || 0;
          return gcrs == crs;
        });
        if (sameType && sameCrs) {
          var multi = {};
          multi.type = "Multi" + gs[0].type;
          multi.coordinates = [];
          if (crs != 0)
            multi.crs = crs;
          gs.forEach(function(g3) {
            multi.coordinates.push(g3.coordinates);
          });
          return multi;
        } else {
          return false;
        }
      }
      ;
      var multigeojson = {
        explode,
        implode
      };
      if (typeof module !== "undefined" && module.exports) {
        module.exports = multigeojson;
      } else if (window) {
        window.multigeojson = multigeojson;
      }
    })();
  }
});

// node_modules/geojson2svg/src/converter.js
var require_converter = __commonJS({
  "node_modules/geojson2svg/src/converter.js"(exports, module) {
    var multi = require_multigeojson();
    function getCoordString(coords, res, origin, precision, opt) {
      var convertedCoords = coords.map(function(coord) {
        if (opt.coordinateConverter) {
          coord = opt.coordinateConverter(coord);
        }
        return [(coord[0] - origin.x) / res, (origin.y - coord[1]) / res];
      });
      var coordStr = convertedCoords.map(function(coord) {
        if (precision) {
          return coord[0].toFixed(precision) + "," + coord[1].toFixed(precision);
        } else {
          return coord[0] + "," + coord[1];
        }
      });
      return coordStr.join(" ");
    }
    function point(geom, res, origin, opt) {
      var r6 = opt && opt.r ? opt.r : 1;
      var pointAsCircle = opt && opt.hasOwnProperty("pointAsCircle") ? opt.pointAsCircle : false;
      var coords = getCoordString([geom.coordinates], res, origin, opt.precision, opt);
      if (pointAsCircle) {
        return [coords];
      } else {
        return [
          "M" + coords + " m" + -r6 + ",0 a" + r6 + "," + r6 + " 0 1,1 " + 2 * r6 + ",0 a" + r6 + "," + r6 + " 0 1,1 " + -2 * r6 + ",0"
        ];
      }
    }
    function multiPoint(geom, res, origin, opt) {
      var explode = opt && opt.hasOwnProperty("explode") ? opt.explode : false;
      var paths = multi.explode(geom).map(function(single) {
        return point(single, res, origin, opt)[0];
      });
      if (!explode)
        return [paths.join(" ")];
      return paths;
    }
    function lineString(geom, res, origin, opt) {
      var coords = getCoordString(geom.coordinates, res, origin, opt.precision, opt);
      var path = "M" + coords;
      return [path];
    }
    function multiLineString(geom, res, origin, opt) {
      var explode = opt && opt.hasOwnProperty("explode") ? opt.explode : false;
      var paths = multi.explode(geom).map(function(single) {
        return lineString(single, res, origin, opt)[0];
      });
      if (!explode)
        return [paths.join(" ")];
      return paths;
    }
    function polygon(geom, res, origin, opt) {
      var mainStr, holes, holeStr;
      mainStr = getCoordString(geom.coordinates[0], res, origin, opt.precision, opt);
      if (geom.coordinates.length > 1) {
        holes = geom.coordinates.slice(1, geom.coordinates.length);
      }
      var path = "M" + mainStr;
      if (holes) {
        for (var i4 = 0; i4 < holes.length; i4++) {
          path += " M" + getCoordString(holes[i4], res, origin, opt.precision, opt);
        }
      }
      path += "Z";
      return [path];
    }
    function multiPolygon(geom, res, origin, opt) {
      var explode = opt.hasOwnProperty("explode") ? opt.explode : false;
      var paths = multi.explode(geom).map(function(single) {
        return polygon(single, res, origin, opt)[0];
      });
      if (!explode)
        return [paths.join(" ").replace(/Z/g, "") + "Z"];
      return paths;
    }
    module.exports = {
      Point: point,
      MultiPoint: multiPoint,
      LineString: lineString,
      MultiLineString: multiLineString,
      Polygon: polygon,
      MultiPolygon: multiPolygon
    };
  }
});

// node_modules/geojson2svg/src/index.js
var require_src = __commonJS({
  "node_modules/geojson2svg/src/index.js"(exports, module) {
    var bbox = require_geojson_bbox();
    var extend = require_extend();
    var converter = require_converter();
    var GeoJSON2SVG2 = function(options = {}) {
      if (!options.mapExtent) {
        this.mapExtentFromGeojson = true;
      } else {
        this.mapExtentFromGeojson = options.mapExtentFromGeojson;
      }
      if (options.fitTo && !/^(width|height)$/i.test(options.fitTo)) {
        throw new Error('"fitTo" option should be "width" or "height" ');
      }
      this.options = options;
      this.viewportSize = options.viewportSize || { width: 256, height: 256 };
      if (options.coordinateCoverter && typeof options.coordinateConverter != "function") {
        throw new Error('"coordinateConverter" option should be function');
      }
      this.coordinateConverter = options.coordinateConverter;
      if (options.mapExtent && this.coordinateConverter) {
        var rightTop = this.coordinateConverter(
          [options.mapExtent.right, options.mapExtent.top]
        );
        var leftBottom = this.coordinateConverter(
          [options.mapExtent.left, options.mapExtent.bottom]
        );
        this.mapExtent = {
          left: leftBottom[0],
          bottom: leftBottom[1],
          right: rightTop[0],
          top: rightTop[1]
        };
      } else {
        this.mapExtent = options.mapExtent;
      }
      if (this.mapExtent) {
        this.res = this.calResolution(
          this.mapExtent,
          this.viewportSize,
          this.options.fitTo
        );
      }
    };
    function convertExtent(extent, converter2) {
      var leftBottom = converter2([extent[0], extent[1]]);
      var rightTop = converter2([extent[2], extent[3]]);
      return [...leftBottom, ...rightTop];
    }
    GeoJSON2SVG2.prototype.calResolution = function(extent, size, fitTo) {
      var xres = (extent.right - extent.left) / size.width;
      var yres = (extent.top - extent.bottom) / size.height;
      if (fitTo) {
        if (fitTo.toLowerCase() === "width") {
          return xres;
        } else if (fitTo.toLowerCase() === "height") {
          return yres;
        } else {
          throw new Error('"fitTo" option should be "width" or "height" ');
        }
      } else {
        return Math.max(xres, yres);
      }
    };
    GeoJSON2SVG2.prototype.convert = function(geojson2, options) {
      var resetExtent = false;
      if (!this.res && this.mapExtentFromGeojson) {
        var resetExtent = true;
        var extent = bbox(geojson2);
        if (this.coordinateConverter) {
          extent = convertExtent(extent, this.coordinateConverter);
        }
        this.mapExtent = {
          left: extent[0],
          bottom: extent[1],
          right: extent[2],
          top: extent[3]
        };
        this.res = this.calResolution(
          this.mapExtent,
          this.viewportSize,
          this.options.fitTo
        );
      }
      var opt = extend(true, {}, this.options, options || {});
      var multiGeometries = ["MultiPoint", "MultiLineString", "MultiPolygon"];
      var geometries = ["Point", "LineString", "Polygon"];
      var svgElements = [];
      if (geojson2.type == "FeatureCollection") {
        for (var i4 = 0; i4 < geojson2.features.length; i4++) {
          svgElements = svgElements.concat(
            this.convertFeature(geojson2.features[i4], opt)
          );
        }
      } else if (geojson2.type == "Feature") {
        svgElements = this.convertFeature(geojson2, opt);
      } else if (geojson2.type == "GeometryCollection") {
        for (var i4 = 0; i4 < geojson2.geometries.length; i4++) {
          svgElements = svgElements.concat(
            this.convertGeometry(geojson2.geometries[i4], opt)
          );
        }
      } else if (converter[geojson2.type]) {
        svgElements = this.convertGeometry(geojson2, opt);
      } else {
        throw new Error("Geojson type not supported.");
      }
      if (resetExtent) {
        this.res = null;
        this.mapExtent = null;
      }
      if (opt.callback)
        opt.callback.call(this, svgElements);
      return svgElements;
    };
    GeoJSON2SVG2.prototype.convertFeature = function(feature, options) {
      if (!feature && !feature.geometry)
        return;
      var opt = extend(true, {}, this.options, options || {});
      if (opt.attributes && opt.attributes instanceof Array) {
        var arr = opt.attributes;
        opt.attributes = arr.reduce(function(sum, property) {
          if (typeof property === "string") {
            var val, key = property.split(".").pop();
            try {
              val = valueAt(feature, property);
            } catch (e6) {
              val = false;
            }
            if (val)
              sum[key] = val;
          } else if (typeof property === "object" && property.type && property.property) {
            if (property.type === "dynamic") {
              var val, key = property.key ? property.key : property.property.split(".").pop();
              try {
                val = valueAt(feature, property.property);
              } catch (e6) {
                val = false;
              }
              if (val)
                sum[key] = val;
            } else if (property.type === "static" && property.value) {
              sum[property.property] = property.value;
            }
          }
          return sum;
        }, {});
      } else {
        opt.attributes = opt.attributes || {};
      }
      var id = opt.attributes.id || feature.id || (feature.properties && feature.properties.id ? feature.properties.id : null);
      if (id)
        opt.attributes.id = id;
      return this.convertGeometry(feature.geometry, opt);
    };
    GeoJSON2SVG2.prototype.convertGeometry = function(geom, options) {
      if (converter[geom.type]) {
        var opt = extend(true, {}, this.options, options || {});
        var output = opt.output || "svg";
        var paths = converter[geom.type].call(
          this,
          geom,
          this.res,
          { x: this.mapExtent.left, y: this.mapExtent.top },
          opt
        );
        var svgJsons, svgEles;
        if (output.toLowerCase() == "svg") {
          svgJsons = paths.map(function(path) {
            return pathToSvgJson(path, geom.type, opt.attributes, opt);
          });
          svgEles = svgJsons.map(function(json) {
            return jsonToSvgElement(json, geom.type, opt);
          });
          return svgEles;
        } else {
          return paths;
        }
      } else {
        throw new Error("Geojson type not supported.");
      }
    };
    function pathToSvgJson(path, type, attributes2, opt) {
      var svg = {};
      var pointAsCircle = opt && opt.hasOwnProperty("pointAsCircle") ? opt.pointAsCircle : false;
      if ((type == "Point" || type == "MultiPoint") && pointAsCircle) {
        svg["cx"] = path.split(",")[0];
        svg["cy"] = path.split(",")[1];
        svg["r"] = opt && opt.r ? opt.r : "1";
      } else {
        svg = { d: path };
        if (type == "Polygon" || type == "MultiPolygon") {
          svg["fill-rule"] == "evenodd";
        }
      }
      for (var key in attributes2) {
        svg[key] = attributes2[key];
      }
      return svg;
    }
    function jsonToSvgElement(json, type, opt) {
      var pointAsCircle = opt && opt.hasOwnProperty("pointAsCircle") ? opt.pointAsCircle : false;
      var ele = "<path";
      if ((type == "Point" || type == "MultiPoint") && pointAsCircle) {
        ele = "<circle";
      }
      for (var key in json) {
        ele += " " + key + '="' + json[key] + '"';
      }
      ele += "/>";
      return ele;
    }
    function valueAt(obj, path) {
      function index(prev, cur, i4, arr) {
        if (prev.hasOwnProperty(cur)) {
          return prev[cur];
        } else {
          throw new Error(arr.slice(0, i4 + 1).join(".") + " is not a valid property path");
        }
      }
      return path.split(".").reduce(index, obj);
    }
    module.exports = { GeoJSON2SVG: GeoJSON2SVG2 };
  }
});

// libs/simulator/engine/src/lib/simulator-engine.ts
function simulatorEngine(flights2) {
  for (const flight of flights2) {
    flight.left += 10;
  }
}

// node_modules/@lit-labs/ssr-dom-shim/lib/element-internals.js
var ElementInternalsShim = class ElementInternals {
  get shadowRoot() {
    return this.__host.__shadowRoot;
  }
  constructor(_host) {
    this.ariaAtomic = "";
    this.ariaAutoComplete = "";
    this.ariaBraileLabel = "";
    this.ariaBraileRoleDescription = "";
    this.ariaBusy = "";
    this.ariaChecked = "";
    this.ariaColCount = "";
    this.ariaColIndex = "";
    this.ariaColSpan = "";
    this.ariaCurrent = "";
    this.ariaDescription = "";
    this.ariaDisabled = "";
    this.ariaExpanded = "";
    this.ariaHasPopup = "";
    this.ariaHidden = "";
    this.ariaInvalid = "";
    this.ariaKeyShortcuts = "";
    this.ariaLabel = "";
    this.ariaLevel = "";
    this.ariaLive = "";
    this.ariaModal = "";
    this.ariaMultiLine = "";
    this.ariaMultiSelectable = "";
    this.ariaOrientation = "";
    this.ariaPlaceholder = "";
    this.ariaPosInSet = "";
    this.ariaPressed = "";
    this.ariaReadOnly = "";
    this.ariaRequired = "";
    this.ariaRoleDescription = "";
    this.ariaRowCount = "";
    this.ariaRowIndex = "";
    this.ariaRowSpan = "";
    this.ariaSelected = "";
    this.ariaSetSize = "";
    this.ariaSort = "";
    this.ariaValueMax = "";
    this.ariaValueMin = "";
    this.ariaValueNow = "";
    this.ariaValueText = "";
    this.role = "";
    this.form = null;
    this.labels = [];
    this.states = /* @__PURE__ */ new Set();
    this.validationMessage = "";
    this.validity = {};
    this.willValidate = true;
    this.__host = _host;
  }
  checkValidity() {
    console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true.");
    return true;
  }
  reportValidity() {
    return true;
  }
  setFormValue() {
  }
  setValidity() {
  }
};

// node_modules/@lit-labs/ssr-dom-shim/index.js
var attributes = /* @__PURE__ */ new WeakMap();
var attributesForElement = (element) => {
  let attrs = attributes.get(element);
  if (attrs === void 0) {
    attributes.set(element, attrs = /* @__PURE__ */ new Map());
  }
  return attrs;
};
var ElementShim = class Element {
  constructor() {
    this.__shadowRootMode = null;
    this.__shadowRoot = null;
    this.__internals = null;
  }
  get attributes() {
    return Array.from(attributesForElement(this)).map(([name, value]) => ({
      name,
      value
    }));
  }
  get shadowRoot() {
    if (this.__shadowRootMode === "closed") {
      return null;
    }
    return this.__shadowRoot;
  }
  setAttribute(name, value) {
    attributesForElement(this).set(name, String(value));
  }
  removeAttribute(name) {
    attributesForElement(this).delete(name);
  }
  toggleAttribute(name, force) {
    if (this.hasAttribute(name)) {
      if (force === void 0 || !force) {
        this.removeAttribute(name);
        return false;
      }
    } else {
      if (force === void 0 || force) {
        this.setAttribute(name, "");
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
  hasAttribute(name) {
    return attributesForElement(this).has(name);
  }
  attachShadow(init) {
    const shadowRoot = { host: this };
    this.__shadowRootMode = init.mode;
    if (init && init.mode === "open") {
      this.__shadowRoot = shadowRoot;
    }
    return shadowRoot;
  }
  attachInternals() {
    if (this.__internals !== null) {
      throw new Error(`Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.`);
    }
    const internals = new ElementInternalsShim(this);
    this.__internals = internals;
    return internals;
  }
  getAttribute(name) {
    const value = attributesForElement(this).get(name);
    return value ?? null;
  }
};
var HTMLElementShim = class HTMLElement extends ElementShim {
};
var HTMLElementShimWithRealType = HTMLElementShim;
var CustomElementRegistryShim = class CustomElementRegistry {
  constructor() {
    this.__definitions = /* @__PURE__ */ new Map();
  }
  define(name, ctor) {
    if (this.__definitions.has(name)) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`'CustomElementRegistry' already has "${name}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);
      } else {
        throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${name}" has already been used with this registry`);
      }
    }
    this.__definitions.set(name, {
      ctor,
      // Note it's important we read `observedAttributes` in case it is a getter
      // with side-effects, as is the case in Lit, where it triggers class
      // finalization.
      //
      // TODO(aomarks) To be spec compliant, we should also capture the
      // registration-time lifecycle methods like `connectedCallback`. For them
      // to be actually accessible to e.g. the Lit SSR element renderer, though,
      // we'd need to introduce a new API for accessing them (since `get` only
      // returns the constructor).
      observedAttributes: ctor.observedAttributes ?? []
    });
  }
  get(name) {
    const definition = this.__definitions.get(name);
    return definition?.ctor;
  }
};
var CustomElementRegistryShimWithRealType = CustomElementRegistryShim;
var customElements2 = new CustomElementRegistryShimWithRealType();

// node_modules/@lit/reactive-element/node/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t6, e6, o7) {
    if (this._$cssResult$ = true, o7 !== s)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t6, this.t = e6;
  }
  get styleSheet() {
    let t6 = this.o;
    const s4 = this.t;
    if (e && void 0 === t6) {
      const e6 = void 0 !== s4 && 1 === s4.length;
      e6 && (t6 = o.get(s4)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e6 && o.set(s4, t6));
    }
    return t6;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t6) => new n("string" == typeof t6 ? t6 : t6 + "", void 0, s);
var i = (t6, ...e6) => {
  const o7 = 1 === t6.length ? t6[0] : e6.reduce((e7, s4, o8) => e7 + ((t7) => {
    if (true === t7._$cssResult$)
      return t7.cssText;
    if ("number" == typeof t7)
      return t7;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t6[o8 + 1], t6[0]);
  return new n(o7, t6, s);
};
var S = (s4, o7) => {
  if (e)
    s4.adoptedStyleSheets = o7.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet);
  else
    for (const e6 of o7) {
      const o8 = document.createElement("style"), n5 = t.litNonce;
      void 0 !== n5 && o8.setAttribute("nonce", n5), o8.textContent = e6.cssText, s4.appendChild(o8);
    }
};
var c = e || void 0 === t.CSSStyleSheet ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
  let e6 = "";
  for (const s4 of t7.cssRules)
    e6 += s4.cssText;
  return r(e6);
})(t6) : t6;

// node_modules/@lit/reactive-element/node/reactive-element.js
var { is: r2, defineProperty: h, getOwnPropertyDescriptor: o2, getOwnPropertyNames: n2, getOwnPropertySymbols: a, getPrototypeOf: c2 } = Object;
var l = globalThis;
l.customElements ??= customElements2;
var p = l.trustedTypes;
var d = p ? p.emptyScript : "";
var u = l.reactiveElementPolyfillSupport;
var f = (t6, s4) => t6;
var b = { toAttribute(t6, s4) {
  switch (s4) {
    case Boolean:
      t6 = t6 ? d : null;
      break;
    case Object:
    case Array:
      t6 = null == t6 ? t6 : JSON.stringify(t6);
  }
  return t6;
}, fromAttribute(t6, s4) {
  let i4 = t6;
  switch (s4) {
    case Boolean:
      i4 = null !== t6;
      break;
    case Number:
      i4 = null === t6 ? null : Number(t6);
      break;
    case Object:
    case Array:
      try {
        i4 = JSON.parse(t6);
      } catch (t7) {
        i4 = null;
      }
  }
  return i4;
} };
var y = (t6, s4) => !r2(t6, s4);
var m = { attribute: true, type: String, converter: b, reflect: false, hasChanged: y };
Symbol.metadata ??= Symbol("metadata"), l.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var g = class extends (globalThis.HTMLElement ?? HTMLElementShimWithRealType) {
  static addInitializer(t6) {
    this._$Ei(), (this.l ??= []).push(t6);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t6, s4 = m) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.elementProperties.set(t6, s4), !s4.noAccessor) {
      const i4 = Symbol(), e6 = this.getPropertyDescriptor(t6, i4, s4);
      void 0 !== e6 && h(this.prototype, t6, e6);
    }
  }
  static getPropertyDescriptor(t6, s4, i4) {
    const { get: e6, set: r6 } = o2(this.prototype, t6) ?? { get() {
      return this[s4];
    }, set(t7) {
      this[s4] = t7;
    } };
    return { get() {
      return e6?.call(this);
    }, set(s5) {
      const h3 = e6?.call(this);
      r6.call(this, s5), this.requestUpdate(t6, h3, i4);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t6) {
    return this.elementProperties.get(t6) ?? m;
  }
  static _$Ei() {
    if (this.hasOwnProperty(f("elementProperties")))
      return;
    const t6 = c2(this);
    t6.finalize(), void 0 !== t6.l && (this.l = [...t6.l]), this.elementProperties = new Map(t6.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(f("finalized")))
      return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(f("properties"))) {
      const t7 = this.properties, s4 = [...n2(t7), ...a(t7)];
      for (const i4 of s4)
        this.createProperty(i4, t7[i4]);
    }
    const t6 = this[Symbol.metadata];
    if (null !== t6) {
      const s4 = litPropertyMetadata.get(t6);
      if (void 0 !== s4)
        for (const [t7, i4] of s4)
          this.elementProperties.set(t7, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t7, s4] of this.elementProperties) {
      const i4 = this._$Eu(t7, s4);
      void 0 !== i4 && this._$Eh.set(i4, t7);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t6) {
    const s4 = [];
    if (Array.isArray(t6)) {
      const e6 = new Set(t6.flat(1 / 0).reverse());
      for (const t7 of e6)
        s4.unshift(c(t7));
    } else
      void 0 !== t6 && s4.push(c(t6));
    return s4;
  }
  static _$Eu(t6, s4) {
    const i4 = s4.attribute;
    return false === i4 ? void 0 : "string" == typeof i4 ? i4 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t6) => t6(this));
  }
  addController(t6) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t6), void 0 !== this.renderRoot && this.isConnected && t6.hostConnected?.();
  }
  removeController(t6) {
    this._$EO?.delete(t6);
  }
  _$E_() {
    const t6 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i4 of s4.keys())
      this.hasOwnProperty(i4) && (t6.set(i4, this[i4]), delete this[i4]);
    t6.size > 0 && (this._$Ep = t6);
  }
  createRenderRoot() {
    const t6 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t6, this.constructor.elementStyles), t6;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t6) => t6.hostConnected?.());
  }
  enableUpdating(t6) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t6) => t6.hostDisconnected?.());
  }
  attributeChangedCallback(t6, s4, i4) {
    this._$AK(t6, i4);
  }
  _$EC(t6, s4) {
    const i4 = this.constructor.elementProperties.get(t6), e6 = this.constructor._$Eu(t6, i4);
    if (void 0 !== e6 && true === i4.reflect) {
      const r6 = (void 0 !== i4.converter?.toAttribute ? i4.converter : b).toAttribute(s4, i4.type);
      this._$Em = t6, null == r6 ? this.removeAttribute(e6) : this.setAttribute(e6, r6), this._$Em = null;
    }
  }
  _$AK(t6, s4) {
    const i4 = this.constructor, e6 = i4._$Eh.get(t6);
    if (void 0 !== e6 && this._$Em !== e6) {
      const t7 = i4.getPropertyOptions(e6), r6 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== t7.converter?.fromAttribute ? t7.converter : b;
      this._$Em = e6, this[e6] = r6.fromAttribute(s4, t7.type), this._$Em = null;
    }
  }
  requestUpdate(t6, s4, i4) {
    if (void 0 !== t6) {
      if (i4 ??= this.constructor.getPropertyOptions(t6), !(i4.hasChanged ?? y)(this[t6], s4))
        return;
      this.P(t6, s4, i4);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t6, s4, i4) {
    this._$AL.has(t6) || this._$AL.set(t6, s4), true === i4.reflect && this._$Em !== t6 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t6);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t7) {
      Promise.reject(t7);
    }
    const t6 = this.scheduleUpdate();
    return null != t6 && await t6, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t8, s5] of this._$Ep)
          this[t8] = s5;
        this._$Ep = void 0;
      }
      const t7 = this.constructor.elementProperties;
      if (t7.size > 0)
        for (const [s5, i4] of t7)
          true !== i4.wrapped || this._$AL.has(s5) || void 0 === this[s5] || this.P(s5, this[s5], i4);
    }
    let t6 = false;
    const s4 = this._$AL;
    try {
      t6 = this.shouldUpdate(s4), t6 ? (this.willUpdate(s4), this._$EO?.forEach((t7) => t7.hostUpdate?.()), this.update(s4)) : this._$EU();
    } catch (s5) {
      throw t6 = false, this._$EU(), s5;
    }
    t6 && this._$AE(s4);
  }
  willUpdate(t6) {
  }
  _$AE(t6) {
    this._$EO?.forEach((t7) => t7.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t6) {
    return true;
  }
  update(t6) {
    this._$Ej &&= this._$Ej.forEach((t7) => this._$EC(t7, this[t7])), this._$EU();
  }
  updated(t6) {
  }
  firstUpdated(t6) {
  }
};
g.elementStyles = [], g.shadowRootOptions = { mode: "open" }, g[f("elementProperties")] = /* @__PURE__ */ new Map(), g[f("finalized")] = /* @__PURE__ */ new Map(), u?.({ ReactiveElement: g }), (l.reactiveElementVersions ??= []).push("2.0.4");

// node_modules/lit-html/node/lit-html.js
var t2 = globalThis;
var i2 = t2.trustedTypes;
var s2 = i2 ? i2.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
var e2 = "$lit$";
var h2 = `lit$${(Math.random() + "").slice(9)}$`;
var o3 = "?" + h2;
var n3 = `<${o3}>`;
var r3 = void 0 === t2.document ? { createTreeWalker: () => ({}) } : document;
var l2 = () => r3.createComment("");
var c3 = (t6) => null === t6 || "object" != typeof t6 && "function" != typeof t6;
var a2 = Array.isArray;
var u2 = (t6) => a2(t6) || "function" == typeof t6?.[Symbol.iterator];
var d2 = "[ 	\n\f\r]";
var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var _ = />/g;
var m2 = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p2 = /'/g;
var g2 = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var y2 = (t6) => (i4, ...s4) => ({ _$litType$: t6, strings: i4, values: s4 });
var x = y2(1);
var T = y2(2);
var b2 = Symbol.for("lit-noChange");
var w = Symbol.for("lit-nothing");
var A = /* @__PURE__ */ new WeakMap();
var E = r3.createTreeWalker(r3, 129);
function C(t6, i4) {
  if (!Array.isArray(t6) || !t6.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== s2 ? s2.createHTML(i4) : i4;
}
var P = (t6, i4) => {
  const s4 = t6.length - 1, o7 = [];
  let r6, l3 = 2 === i4 ? "<svg>" : "", c4 = f2;
  for (let i5 = 0; i5 < s4; i5++) {
    const s5 = t6[i5];
    let a3, u3, d3 = -1, y3 = 0;
    for (; y3 < s5.length && (c4.lastIndex = y3, u3 = c4.exec(s5), null !== u3); )
      y3 = c4.lastIndex, c4 === f2 ? "!--" === u3[1] ? c4 = v : void 0 !== u3[1] ? c4 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r6 = RegExp("</" + u3[2], "g")), c4 = m2) : void 0 !== u3[3] && (c4 = m2) : c4 === m2 ? ">" === u3[0] ? (c4 = r6 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? m2 : '"' === u3[3] ? g2 : p2) : c4 === g2 || c4 === p2 ? c4 = m2 : c4 === v || c4 === _ ? c4 = f2 : (c4 = m2, r6 = void 0);
    const x2 = c4 === m2 && t6[i5 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === f2 ? s5 + n3 : d3 >= 0 ? (o7.push(a3), s5.slice(0, d3) + e2 + s5.slice(d3) + h2 + x2) : s5 + h2 + (-2 === d3 ? i5 : x2);
  }
  return [C(t6, l3 + (t6[s4] || "<?>") + (2 === i4 ? "</svg>" : "")), o7];
};
var V = class _V {
  constructor({ strings: t6, _$litType$: s4 }, n5) {
    let r6;
    this.parts = [];
    let c4 = 0, a3 = 0;
    const u3 = t6.length - 1, d3 = this.parts, [f3, v2] = P(t6, s4);
    if (this.el = _V.createElement(f3, n5), E.currentNode = this.el.content, 2 === s4) {
      const t7 = this.el.content.firstChild;
      t7.replaceWith(...t7.childNodes);
    }
    for (; null !== (r6 = E.nextNode()) && d3.length < u3; ) {
      if (1 === r6.nodeType) {
        if (r6.hasAttributes())
          for (const t7 of r6.getAttributeNames())
            if (t7.endsWith(e2)) {
              const i4 = v2[a3++], s5 = r6.getAttribute(t7).split(h2), e6 = /([.?@])?(.*)/.exec(i4);
              d3.push({ type: 1, index: c4, name: e6[2], strings: s5, ctor: "." === e6[1] ? R : "?" === e6[1] ? H : "@" === e6[1] ? I : k }), r6.removeAttribute(t7);
            } else
              t7.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r6.removeAttribute(t7));
        if ($.test(r6.tagName)) {
          const t7 = r6.textContent.split(h2), s5 = t7.length - 1;
          if (s5 > 0) {
            r6.textContent = i2 ? i2.emptyScript : "";
            for (let i4 = 0; i4 < s5; i4++)
              r6.append(t7[i4], l2()), E.nextNode(), d3.push({ type: 2, index: ++c4 });
            r6.append(t7[s5], l2());
          }
        }
      } else if (8 === r6.nodeType)
        if (r6.data === o3)
          d3.push({ type: 2, index: c4 });
        else {
          let t7 = -1;
          for (; -1 !== (t7 = r6.data.indexOf(h2, t7 + 1)); )
            d3.push({ type: 7, index: c4 }), t7 += h2.length - 1;
        }
      c4++;
    }
  }
  static createElement(t6, i4) {
    const s4 = r3.createElement("template");
    return s4.innerHTML = t6, s4;
  }
};
function N(t6, i4, s4 = t6, e6) {
  if (i4 === b2)
    return i4;
  let h3 = void 0 !== e6 ? s4._$Co?.[e6] : s4._$Cl;
  const o7 = c3(i4) ? void 0 : i4._$litDirective$;
  return h3?.constructor !== o7 && (h3?._$AO?.(false), void 0 === o7 ? h3 = void 0 : (h3 = new o7(t6), h3._$AT(t6, s4, e6)), void 0 !== e6 ? (s4._$Co ??= [])[e6] = h3 : s4._$Cl = h3), void 0 !== h3 && (i4 = N(t6, h3._$AS(t6, i4.values), h3, e6)), i4;
}
var S2 = class {
  constructor(t6, i4) {
    this._$AV = [], this._$AN = void 0, this._$AD = t6, this._$AM = i4;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t6) {
    const { el: { content: i4 }, parts: s4 } = this._$AD, e6 = (t6?.creationScope ?? r3).importNode(i4, true);
    E.currentNode = e6;
    let h3 = E.nextNode(), o7 = 0, n5 = 0, l3 = s4[0];
    for (; void 0 !== l3; ) {
      if (o7 === l3.index) {
        let i5;
        2 === l3.type ? i5 = new M(h3, h3.nextSibling, this, t6) : 1 === l3.type ? i5 = new l3.ctor(h3, l3.name, l3.strings, this, t6) : 6 === l3.type && (i5 = new L(h3, this, t6)), this._$AV.push(i5), l3 = s4[++n5];
      }
      o7 !== l3?.index && (h3 = E.nextNode(), o7++);
    }
    return E.currentNode = r3, e6;
  }
  p(t6) {
    let i4 = 0;
    for (const s4 of this._$AV)
      void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t6, s4, i4), i4 += s4.strings.length - 2) : s4._$AI(t6[i4])), i4++;
  }
};
var M = class _M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t6, i4, s4, e6) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t6, this._$AB = i4, this._$AM = s4, this.options = e6, this._$Cv = e6?.isConnected ?? true;
  }
  get parentNode() {
    let t6 = this._$AA.parentNode;
    const i4 = this._$AM;
    return void 0 !== i4 && 11 === t6?.nodeType && (t6 = i4.parentNode), t6;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t6, i4 = this) {
    t6 = N(this, t6, i4), c3(t6) ? t6 === w || null == t6 || "" === t6 ? (this._$AH !== w && this._$AR(), this._$AH = w) : t6 !== this._$AH && t6 !== b2 && this._(t6) : void 0 !== t6._$litType$ ? this.$(t6) : void 0 !== t6.nodeType ? this.T(t6) : u2(t6) ? this.k(t6) : this._(t6);
  }
  S(t6) {
    return this._$AA.parentNode.insertBefore(t6, this._$AB);
  }
  T(t6) {
    this._$AH !== t6 && (this._$AR(), this._$AH = this.S(t6));
  }
  _(t6) {
    this._$AH !== w && c3(this._$AH) ? this._$AA.nextSibling.data = t6 : this.T(r3.createTextNode(t6)), this._$AH = t6;
  }
  $(t6) {
    const { values: i4, _$litType$: s4 } = t6, e6 = "number" == typeof s4 ? this._$AC(t6) : (void 0 === s4.el && (s4.el = V.createElement(C(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e6)
      this._$AH.p(i4);
    else {
      const t7 = new S2(e6, this), s5 = t7.u(this.options);
      t7.p(i4), this.T(s5), this._$AH = t7;
    }
  }
  _$AC(t6) {
    let i4 = A.get(t6.strings);
    return void 0 === i4 && A.set(t6.strings, i4 = new V(t6)), i4;
  }
  k(t6) {
    a2(this._$AH) || (this._$AH = [], this._$AR());
    const i4 = this._$AH;
    let s4, e6 = 0;
    for (const h3 of t6)
      e6 === i4.length ? i4.push(s4 = new _M(this.S(l2()), this.S(l2()), this, this.options)) : s4 = i4[e6], s4._$AI(h3), e6++;
    e6 < i4.length && (this._$AR(s4 && s4._$AB.nextSibling, e6), i4.length = e6);
  }
  _$AR(t6 = this._$AA.nextSibling, i4) {
    for (this._$AP?.(false, true, i4); t6 && t6 !== this._$AB; ) {
      const i5 = t6.nextSibling;
      t6.remove(), t6 = i5;
    }
  }
  setConnected(t6) {
    void 0 === this._$AM && (this._$Cv = t6, this._$AP?.(t6));
  }
};
var k = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t6, i4, s4, e6, h3) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t6, this.name = i4, this._$AM = e6, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = w;
  }
  _$AI(t6, i4 = this, s4, e6) {
    const h3 = this.strings;
    let o7 = false;
    if (void 0 === h3)
      t6 = N(this, t6, i4, 0), o7 = !c3(t6) || t6 !== this._$AH && t6 !== b2, o7 && (this._$AH = t6);
    else {
      const e7 = t6;
      let n5, r6;
      for (t6 = h3[0], n5 = 0; n5 < h3.length - 1; n5++)
        r6 = N(this, e7[s4 + n5], i4, n5), r6 === b2 && (r6 = this._$AH[n5]), o7 ||= !c3(r6) || r6 !== this._$AH[n5], r6 === w ? t6 = w : t6 !== w && (t6 += (r6 ?? "") + h3[n5 + 1]), this._$AH[n5] = r6;
    }
    o7 && !e6 && this.j(t6);
  }
  j(t6) {
    t6 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t6 ?? "");
  }
};
var R = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t6) {
    this.element[this.name] = t6 === w ? void 0 : t6;
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t6) {
    this.element.toggleAttribute(this.name, !!t6 && t6 !== w);
  }
};
var I = class extends k {
  constructor(t6, i4, s4, e6, h3) {
    super(t6, i4, s4, e6, h3), this.type = 5;
  }
  _$AI(t6, i4 = this) {
    if ((t6 = N(this, t6, i4, 0) ?? w) === b2)
      return;
    const s4 = this._$AH, e6 = t6 === w && s4 !== w || t6.capture !== s4.capture || t6.once !== s4.once || t6.passive !== s4.passive, h3 = t6 !== w && (s4 === w || e6);
    e6 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
  }
  handleEvent(t6) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t6) : this._$AH.handleEvent(t6);
  }
};
var L = class {
  constructor(t6, i4, s4) {
    this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t6) {
    N(this, t6);
  }
};
var W = t2.litHtmlPolyfillSupport;
W?.(V, M), (t2.litHtmlVersions ??= []).push("3.1.2");
var Z = (t6, i4, s4) => {
  const e6 = s4?.renderBefore ?? i4;
  let h3 = e6._$litPart$;
  if (void 0 === h3) {
    const t7 = s4?.renderBefore ?? null;
    e6._$litPart$ = h3 = new M(i4.insertBefore(l2(), t7), t7, void 0, s4 ?? {});
  }
  return h3._$AI(t6), h3;
};

// node_modules/lit-element/lit-element.js
var s3 = class extends g {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t6 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t6.firstChild, t6;
  }
  update(t6) {
    const i4 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t6), this._$Do = Z(i4, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return b2;
  }
};
s3._$litElement$ = true, s3["finalized", "finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s3 });
var r4 = globalThis.litElementPolyfillSupport;
r4?.({ LitElement: s3 });
(globalThis.litElementVersions ??= []).push("4.0.4");

// node_modules/@lit/reactive-element/node/decorators/custom-element.js
var t3 = (t6) => (e6, o7) => {
  void 0 !== o7 ? o7.addInitializer(() => {
    customElements.define(t6, e6);
  }) : customElements.define(t6, e6);
};

// node_modules/@lit/reactive-element/node/decorators/property.js
var o4 = { attribute: true, type: String, converter: b, reflect: false, hasChanged: y };
var r5 = (t6 = o4, e6, r6) => {
  const { kind: n5, metadata: i4 } = r6;
  let s4 = globalThis.litPropertyMetadata.get(i4);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i4, s4 = /* @__PURE__ */ new Map()), s4.set(r6.name, t6), "accessor" === n5) {
    const { name: o7 } = r6;
    return { set(r7) {
      const n6 = e6.get.call(this);
      e6.set.call(this, r7), this.requestUpdate(o7, n6, t6);
    }, init(e7) {
      return void 0 !== e7 && this.P(o7, void 0, t6), e7;
    } };
  }
  if ("setter" === n5) {
    const { name: o7 } = r6;
    return function(r7) {
      const n6 = this[o7];
      e6.call(this, r7), this.requestUpdate(o7, n6, t6);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t6) {
  return (e6, o7) => "object" == typeof o7 ? r5(t6, e6, o7) : ((t7, e7, o8) => {
    const r6 = e7.hasOwnProperty(o8);
    return e7.constructor.createProperty(o8, r6 ? { ...t7, wrapped: true } : t7), r6 ? Object.getOwnPropertyDescriptor(e7, o8) : void 0;
  })(t6, e6, o7);
}

// libs/simulator/flight/src/lib/simulator-flight.ts
var FlightElement = class extends s3 {
  render() {
    const longitude = (this.longitude ?? 1) % 100;
    const direction = Math.floor((this.longitude ?? 1) / 100) % 2 ? -1 : 1;
    return x`
      <section style="position: absolute; left: ${longitude * direction + (direction < 0 ? 100 : 0)}vmin; top: ${this.latitude}vmin;">
        <section class="plane">x</section>

        <div class="card">
          <div class="card-info"><strong>ID:</strong> #${this.fid}</div>
          <div class="card-info"><strong>Latitude:</strong> ${this.latitude}</div>
          <div class="card-info"><strong>Longitude:</strong> ${Math.floor(longitude * direction + (direction < 0 ? 100 : 0))}</div>
          <div class="card-info"><strong>Direction:</strong> ${direction}</div>
        </div>
      </section>
    `;
  }
};
FlightElement.styles = i`
    .card {
      border-radius: 0.8vmin;
      padding: 1vmin;
      box-sizing: border-box;
      margin: 1vmin;
      font-size: 1vmin;
      position: absolute;
      top: -9vmin;
      left: -9vmin;
      width: 11vmin;
      z-index: 1000;
      cursor: pointer;
    }
    .card-info {
      line-height: 1;
      color: rgb(255, 255, 255);
      padding: 0.2vmin 0px;
    }
    strong {
      color: white;
    }

    .card:hover {
      background-color: rgb(255, 255, 255);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0.2vmin 0.4vmin;
      z-index: 1001;
    }
    .card:hover .card-info {
      color: rgb(102, 102, 102);
    }
    .card:hover strong {
      color: #333333;
    }

    .card-info:last-child {
        border-bottom: none;
    }

    .plane {
      color: white;
      border: 1px solid white;
      text-align: center;
      width: 1.4vmin;
    }
  `;
__decorateClass([
  n4()
], FlightElement.prototype, "fid", 2);
__decorateClass([
  n4()
], FlightElement.prototype, "longitude", 2);
__decorateClass([
  n4()
], FlightElement.prototype, "latitude", 2);
FlightElement = __decorateClass([
  t3("ats-simulator-flight")
], FlightElement);

// libs/simulator/map/src/lib/simulator-map.ts
var import_geojson2svg = __toESM(require_src());

// node_modules/lit-html/node/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e4 = (t6) => (...e6) => ({ _$litDirective$: t6, values: e6 });
var i3 = class {
  constructor(t6) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t6, e6, i4) {
    this._$Ct = t6, this._$AM = e6, this._$Ci = i4;
  }
  _$AS(t6, e6) {
    return this.update(t6, e6);
  }
  update(t6, e6) {
    return this.render(...e6);
  }
};

// node_modules/lit-html/node/directives/unsafe-html.js
var e5 = class extends i3 {
  constructor(i4) {
    if (super(i4), this.it = w, i4.type !== t4.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r6) {
    if (r6 === w || null == r6)
      return this._t = void 0, this.it = r6;
    if (r6 === b2)
      return r6;
    if ("string" != typeof r6)
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r6 === this.it)
      return this._t;
    this.it = r6;
    const s4 = [r6];
    return s4.raw = s4, this._t = { _$litType$: this.constructor.resultType, strings: s4, values: [] };
  }
};
e5.directiveName = "unsafeHTML", e5.resultType = 1;
var o5 = e4(e5);

// node_modules/lit-html/node/directives/unsafe-svg.js
var t5 = class extends e5 {
};
t5.directiveName = "unsafeSVG", t5.resultType = 2;
var o6 = e4(t5);

// libs/simulator/map/src/lib/simulator-map.ts
var MapElement = class extends s3 {
  constructor() {
    super(...arguments);
    this.svgStrings = [];
  }
  connectedCallback() {
    super.connectedCallback();
    this.convertGeojsonToSvg();
  }
  convertGeojsonToSvg() {
    const options = {
      viewportSize: { width: 1e3, height: 1e3 }
    };
    const converter = new import_geojson2svg.GeoJSON2SVG(options);
    this.svgStrings = converter.convert(this.geojson, options);
  }
  render() {
    return x`
      <svg style="width: 100%; height: 100%;" baseprofile="tiny" fill="#3d3d3d" width="1000" height="1000" viewbox="0 0 1000 1000" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width=".1" version="1.2" xmlns="http://www.w3.org/2000/svg">
        ${this.svgStrings.map((svgString) => T`
          ${o6(svgString)}
        `)}
      </svg>
    `;
  }
};
MapElement.styles = i`
    svg {
      background-color: #464646;
    }
  `;
__decorateClass([
  n4({ type: Object })
], MapElement.prototype, "geojson", 2);
MapElement = __decorateClass([
  t3("ats-simulator-map")
], MapElement);

// apps/simulator/src/data.ts
var flights = [
  {
    "id": "FL066",
    "left": 660,
    "top": 990
  },
  {
    "id": "FL067",
    "left": 670,
    "top": 100
  },
  {
    "id": "FL068",
    "left": 680,
    "top": 200
  },
  {
    "id": "FL069",
    "left": 690,
    "top": 300
  },
  {
    "id": "FL070",
    "left": 700,
    "top": 400
  },
  {
    "id": "FL071",
    "left": 710,
    "top": 500
  },
  {
    "id": "FL072",
    "left": 720,
    "top": 600
  },
  {
    "id": "FL073",
    "left": 730,
    "top": 700
  },
  {
    "id": "FL074",
    "left": 740,
    "top": 800
  },
  {
    "id": "FL075",
    "left": 750,
    "top": 900
  },
  {
    "id": "FL076",
    "left": 760,
    "top": 100
  },
  {
    "id": "FL077",
    "left": 770,
    "top": 200
  },
  {
    "id": "FL078",
    "left": 780,
    "top": 300
  },
  {
    "id": "FL079",
    "left": 790,
    "top": 400
  },
  {
    "id": "FL080",
    "left": 800,
    "top": 500
  },
  {
    "id": "FL081",
    "left": 810,
    "top": 600
  },
  {
    "id": "FL082",
    "left": 820,
    "top": 700
  },
  {
    "id": "FL083",
    "left": 830,
    "top": 800
  },
  {
    "id": "FL084",
    "left": 840,
    "top": 900
  },
  {
    "id": "FL085",
    "left": 850,
    "top": 100
  },
  {
    "id": "FL086",
    "left": 860,
    "top": 200
  },
  {
    "id": "FL087",
    "left": 870,
    "top": 300
  },
  {
    "id": "FL088",
    "left": 880,
    "top": 400
  },
  {
    "id": "FL089",
    "left": 890,
    "top": 500
  },
  {
    "id": "FL090",
    "left": 900,
    "top": 600
  },
  {
    "id": "FL091",
    "left": 910,
    "top": 700
  },
  {
    "id": "FL092",
    "left": 920,
    "top": 800
  },
  {
    "id": "FL093",
    "left": 930,
    "top": 900
  },
  {
    "id": "FL094",
    "left": 940,
    "top": 100
  },
  {
    "id": "FL095",
    "left": 950,
    "top": 200
  },
  {
    "id": "FL096",
    "left": 960,
    "top": 300
  },
  {
    "id": "FL097",
    "left": 970,
    "top": 400
  },
  {
    "id": "FL098",
    "left": 980,
    "top": 500
  },
  {
    "id": "FL099",
    "left": 990,
    "top": 600
  },
  {
    "id": "FL100",
    "left": 999,
    "top": 999
  }
];
var geojson = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [[[-0.24188242349068, 44.778568164248], [-0.22265263439081, 44.78520769964], [-0.20856926431688, 44.78281587613], [-0.20086098500942, 44.775560063702], [-0.18282128405042, 44.770277029996], [-0.166936088431, 44.778593789303], [-0.15260033906569, 44.767066665095], [-0.13990979617486, 44.765715136542], [-0.13063739617984, 44.770862874654], [-0.1223854070524, 44.766763669644], [-0.10898249345911, 44.766737861502], [-0.11025016216822, 44.777238680811], [-0.10342613650756, 44.791112756209], [-0.092602542806777, 44.804353794906], [-0.078748230441346, 44.801400299049], [-0.068605594697269, 44.79450417444], [-0.045217173570587, 44.78507799339], [-0.03519363766651, 44.792131952179], [-0.0080627325605474, 44.785522385074], [0.0028538006892016, 44.780211459273], [0.023461147924103, 44.776353131314], [0.036468592298866, 44.779846079676], [0.051547213495953, 44.772268678251], [0.06452307518187, 44.770007713138], [0.069076854710206, 44.778557384902], [0.086552621191861, 44.779124533072], [0.09171468404904, 44.78773242687], [0.12002700445751, 44.782685163992], [0.13036909716919, 44.776770512449], [0.13060822174515, 44.761677549486], [0.14612007044198, 44.752628756216], [0.16902478999237, 44.753288593165], [0.18043632057113, 44.745495181671], [0.1761170331154, 44.737358325159], [0.16437464319642, 44.735787120442], [0.15300650688512, 44.730478405576], [0.14132400855573, 44.73741784111], [0.13939526267633, 44.723198863501], [0.1333985499063, 44.704635060611], [0.11781050325666, 44.712797670467], [0.10938058387031, 44.710567046765], [0.10058285885421, 44.701166710208], [0.10990509355722, 44.684237827918], [0.13372887707313, 44.682445068839], [0.12997902491486, 44.672922900417], [0.14155378137428, 44.665533720013], [0.16217516115648, 44.670522207234], [0.17725174403444, 44.667337011292], [0.18267131110117, 44.661072863157], [0.1671456092699, 44.643736652511], [0.16521090547081, 44.632857082377], [0.15503219600441, 44.631810031274], [0.13735197971124, 44.636065032992], [0.13926344006112, 44.627142000076], [0.15360179170808, 44.616118295385], [0.15085689358311, 44.60864082157], [0.1373372611031, 44.607840943333], [0.1128359692313, 44.590802448417], [0.08223436773711, 44.58404269552], [0.08613970807219, 44.575792139257], [0.076411026162087, 44.563581490059], [0.070718098981858, 44.549329474287], [0.040571405832228, 44.55305031743], [0.024614259705386, 44.547446705923], [0.020979912029289, 44.54145425276], [0.0037569284895941, 44.550564348949], [-79249578691194e-17, 44.547722784938], [0.01334553500528, 44.537163334695], [0.016481929542729, 44.528534052288], [0.0013468507521223, 44.520759088806], [-0.015451041784187, 44.505060157212], [-0.017062403595954, 44.494903785526], [-0.013787425872077, 44.480606498118], [-0.012959450871031, 44.461397567566], [0.0048804193883298, 44.456825604584], [0.0075287126228942, 44.447142316513], [-0.0039997054231598, 44.439884875461], [-0.010556161472033, 44.418543300826], [-0.0022393758929779, 44.405073205548], [0.018236013333469, 44.389881558425], [0.010450408812354, 44.381757604422], [0.023592604670749, 44.377462953453], [0.014719662755562, 44.366614690633], [-0.0028509397317395, 44.372960212166], [-0.015317067489138, 44.369328607193], [-0.028816675762405, 44.360185597195], [-0.05445031981898, 44.359340828755], [-0.069564374036526, 44.352946676151], [-0.078824287140477, 44.353695916086], [-0.085757092678548, 44.337609909237], [-0.066571544598853, 44.322441599368], [-0.059508198107722, 44.321373644807], [-0.034812310736151, 44.296722165589], [-0.043397497716851, 44.293567041696], [-0.037144435788299, 44.286361634851], [-0.036178032292543, 44.27143072373], [-0.053367001946939, 44.265767485647], [-0.066629618842389, 44.24675515416], [-0.074379548540375, 44.252405291475], [-0.088056000728359, 44.238856352832], [-0.10806059061507, 44.231019627038], [-0.12013349102654, 44.23674944888], [-0.14068987994571, 44.226407410087], [-0.16643741766591, 44.241645590082], [-0.17860760723789, 44.2611943855], [-0.19411725898218, 44.269043048465], [-0.21034767075068, 44.264363706221], [-0.22600423316361, 44.264780559078], [-0.22831083561736, 44.256035609777], [-0.22344689401412, 44.205894666457], [-0.27211613275808, 44.193811119459], [-0.31133583014507, 44.203267204497], [-0.36355937684689, 44.206118084951], [-0.38961480789413, 44.209483805167], [-0.39624532160833, 44.237695069388], [-0.38338244369272, 44.28631351989], [-0.40138354559817, 44.28661085634], [-0.43055425810778, 44.303197247509], [-0.43184427971363, 44.322572401547], [-0.47887406741702, 44.324890920135], [-0.51763677862963, 44.33911198566], [-0.52810065622233, 44.36465502296], [-0.56093019811086, 44.374948937011], [-0.57096912038279, 44.382529698119], [-0.62764253659841, 44.398144928692], [-0.62546864287445, 44.412430951205], [-0.62877226637636, 44.443190607827], [-0.64059457790927, 44.449412230615], [-0.67602939990072, 44.457335453756], [-0.68277930111373, 44.450743200147], [-0.701343302472, 44.454846815878], [-0.70719752501495, 44.458526892052], [-0.69694108083996, 44.468275449033], [-0.69491692055592, 44.481546713597], [-0.70165963521905, 44.485936401071], [-0.7178335032675, 44.489181618536], [-0.73596282822443, 44.502448370778], [-0.73026815323307, 44.511766984432], [-0.71237240408486, 44.512516910486], [-0.65981347714464, 44.507367963862], [-0.62331356510853, 44.512317730758], [-0.60826451256198, 44.522028260954], [-0.60167478459668, 44.552857195536], [-0.58658459572061, 44.548585111446], [-0.56634364448502, 44.546236696657], [-0.55011968666045, 44.559659778349], [-0.54624074751701, 44.571640896835], [-0.53378751177027, 44.569383666523], [-0.50810772153834, 44.569935103839], [-0.48789381088937, 44.57529750593], [-0.48260764202198, 44.589876942513], [-0.4667399303361, 44.605752935957], [-0.48880537173016, 44.612414182284], [-0.48855530966679, 44.626963760354], [-0.47686681277969, 44.626579703839], [-0.45819808357008, 44.63026811029], [-0.44976260589383, 44.639841287064], [-0.44164355953229, 44.654805269631], [-0.4570576972736, 44.668616388203], [-0.43693129487411, 44.688145930316], [-0.43523660785032, 44.700927145565], [-0.41036610810737, 44.707643059016], [-0.40422826059603, 44.705986541851], [-0.38474534534423, 44.718744799881], [-0.35191273929608, 44.721584931921], [-0.34847403025124, 44.738856905738], [-0.33614644163747, 44.744322078568], [-0.32002798406376, 44.736999416443], [-0.31170714056451, 44.735931217184], [-0.29856948365964, 44.743022077293], [-0.2876118462732, 44.755208019445], [-0.26859708756466, 44.755055354349], [-0.26229116956721, 44.768297865543], [-0.2516951187108, 44.767269494598], [-0.24188242349068, 44.778568164248]]] }, "properties": { "code": "33003", "nom": "Langon" } }, { "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [[[-0.31362510377799, 45.137649636987], [-0.30793572307717, 45.14957651168], [-0.27536296309773, 45.141404399887], [-0.27248948660547, 45.135305765658], [-0.25508555252633, 45.114082615598], [-0.24567378372971, 45.10820936272], [-0.23115054546009, 45.109122514539], [-0.21825321623573, 45.106431791317], [-0.20972108355095, 45.100229274355], [-0.18920334297908, 45.094460899135], [-0.16192349951658, 45.092487275945], [-0.15295984730846, 45.088810634907], [-0.13530078778524, 45.094092068749], [-0.12497497516228, 45.106821892717], [-0.11323589772113, 45.115011646159], [-0.087698819507144, 45.121385343046], [-0.083962269829361, 45.115833537322], [-0.058364016937835, 45.09903723166], [-0.047688949706731, 45.097503236881], [-0.040197554246423, 45.102379906641], [-0.020622596045142, 45.115154002497], [-0.0035550868294509, 45.119565426221], [0.021023704339745, 45.118020097877], [0.046062765840233, 45.113225257483], [0.060262257593117, 45.098088622342], [0.064755925305126, 45.082017574721], [0.073291450340814, 45.070124430762], [0.065721176012138, 45.060521385337], [0.054236225192005, 45.039326370258], [0.04364304777729, 45.032727630944], [0.040690903227755, 45.02213705026], [0.035853106594622, 45.011148382915], [0.040107702552529, 44.993500073196], [0.033385476085785, 44.980626698129], [0.027060227717503, 44.975375195215], [0.01765322000624, 44.980541068271], [0.0092278596756798, 44.962772057093], [0.0073841338995166, 44.947297148555], [0.01821427303543, 44.928027514889], [0.034364629036925, 44.915470221895], [0.013321330144365, 44.885523222829], [0.0022608102109646, 44.878505514648], [-0.015443810938192, 44.857712121687], [-0.033078198207228, 44.855598888537], [-0.034209540087703, 44.852109918912], [-0.0038738929006231, 44.846691521098], [0.0088805210557711, 44.845963057545], [0.021068730009597, 44.849764251415], [0.03739904504781, 44.839909766296], [0.039465724707109, 44.827491118364], [0.046918911914787, 44.824577015785], [0.061980823617039, 44.825724847157], [0.075753601678977, 44.819691250591], [0.083027055631579, 44.831222961027], [0.098021195945006, 44.83286857884], [0.10851421483567, 44.828158653021], [0.1126443072455, 44.819064166843], [0.12621182714146, 44.828280775462], [0.17042739802804, 44.826682447294], [0.19289670858098, 44.821030025695], [0.20930247571485, 44.841088001383], [0.22239699370187, 44.844614779064], [0.24175586953546, 44.856896621192], [0.23764871759625, 44.869244743449], [0.24408021243543, 44.871832513417], [0.25542730507554, 44.867493927629], [0.27498244856928, 44.867663151563], [0.28515427203214, 44.864559374292], [0.30800194052489, 44.851728215429], [0.31506020240148, 44.845415778491], [0.30028764362365, 44.83780450023], [0.30072874268204, 44.829865184548], [0.28405377486658, 44.823658404053], [0.26372618640876, 44.826279352937], [0.26597731108046, 44.81259127317], [0.27439801350506, 44.796085877199], [0.27422143591466, 44.783396630933], [0.28204980793737, 44.773092230688], [0.2973266430349, 44.762287404122], [0.28997766936396, 44.757436143357], [0.2557380828744, 44.750109827852], [0.24497879080163, 44.752533581344], [0.23847417869066, 44.763350350246], [0.22648867551785, 44.764390535693], [0.21552946146511, 44.751053988796], [0.2124165944403, 44.7378483172], [0.21679531034635, 44.724068141039], [0.20173077932943, 44.722436212695], [0.19416213999304, 44.743135745847], [0.18043632057113, 44.745495181671], [0.16902478999237, 44.753288593165], [0.14612007044198, 44.752628756216], [0.13060822174515, 44.761677549486], [0.13036909716919, 44.776770512449], [0.12002700445751, 44.782685163992], [0.09171468404904, 44.78773242687], [0.086552621191861, 44.779124533072], [0.069076854710206, 44.778557384902], [0.06452307518187, 44.770007713138], [0.051547213495953, 44.772268678251], [0.036468592298866, 44.779846079676], [0.023461147924103, 44.776353131314], [0.0028538006892016, 44.780211459273], [-0.0080627325605474, 44.785522385074], [-0.03519363766651, 44.792131952179], [-0.045217173570587, 44.78507799339], [-0.068605594697269, 44.79450417444], [-0.078748230441346, 44.801400299049], [-0.092602542806777, 44.804353794906], [-0.10342613650756, 44.791112756209], [-0.11025016216822, 44.777238680811], [-0.10898249345911, 44.766737861502], [-0.1223854070524, 44.766763669644], [-0.13063739617984, 44.770862874654], [-0.13990979617486, 44.765715136542], [-0.15260033906569, 44.767066665095], [-0.166936088431, 44.778593789303], [-0.18282128405042, 44.770277029996], [-0.20086098500942, 44.775560063702], [-0.20856926431688, 44.78281587613], [-0.22265263439081, 44.78520769964], [-0.24188242349068, 44.778568164248], [-0.25209761610642, 44.782252473909], [-0.278053511024, 44.777437256634], [-0.29712158887579, 44.786865555004], [-0.31297626464374, 44.787958816616], [-0.31249351950883, 44.799519168259], [-0.32896031767696, 44.80715933865], [-0.33047901473804, 44.81697652434], [-0.34142459320306, 44.833523614543], [-0.34712264013993, 44.836717545996], [-0.36193578825568, 44.833716566227], [-0.36129583922835, 44.851650787827], [-0.33150786720413, 44.870077369338], [-0.33971832130211, 44.875017583321], [-0.35008311755368, 44.88841806248], [-0.3522523825868, 44.898499618938], [-0.36202165802958, 44.901399761279], [-0.36312013170472, 44.911662330256], [-0.38158669255942, 44.913748320806], [-0.39129569902497, 44.928917503722], [-0.38385469535341, 44.939225968296], [-0.3991307383301, 44.947372392771], [-0.41482260670613, 44.945606169752], [-0.44056535019715, 44.934954591545], [-0.44805573292267, 44.939050915911], [-0.45494590676761, 44.953421365594], [-0.41821403082803, 44.966276531116], [-0.40681564172707, 44.97348102164], [-0.39260223135466, 44.99916016057], [-0.36176435970744, 44.996279053339], [-0.35418705640717, 45.013519568127], [-0.36203133599881, 45.018557490918], [-0.36071355330144, 45.028310398358], [-0.35009618284688, 45.046065045735], [-0.33856153229701, 45.043815247955], [-0.3201786248381, 45.048604232836], [-0.33458187054646, 45.070416963436], [-0.32218177765222, 45.089742318916], [-0.29800092490737, 45.115638086086], [-0.29469132756721, 45.121287278853], [-0.31316238218884, 45.133025815587], [-0.31362510377799, 45.137649636987]]] }, "properties": { "code": "33005", "nom": "Libourne" } }, { "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [[[-0.75267677056313, 45.321765614981], [-0.72330389155964, 45.327001191386], [-0.64430238229481, 45.322043706272], [-0.63524007842555, 45.318180463174], [-0.61254068812542, 45.323483267446], [-0.59448704800865, 45.321142619731], [-0.59384140912013, 45.334752513163], [-0.58715999202323, 45.34284134679], [-0.56896376359337, 45.331518881016], [-0.57387553346356, 45.310853327057], [-0.56766890429358, 45.297602332116], [-0.55951096673761, 45.297707318107], [-0.51359037103072, 45.286335703137], [-0.48621599817858, 45.293567761177], [-0.47115623286141, 45.292085013202], [-0.42920073566456, 45.279476537055], [-0.41865787206374, 45.273412127304], [-0.4160766862435, 45.266934268035], [-0.42378065552637, 45.24780411835], [-0.40743510510465, 45.247110601421], [-0.4051131393976, 45.239822566668], [-0.41307417339743, 45.224872704015], [-0.41750318373793, 45.204015328884], [-0.40530728794629, 45.192687924297], [-0.39736284181851, 45.177932331672], [-0.39406943883391, 45.164782442033], [-0.3834007878771, 45.143333546122], [-0.37970141341998, 45.155350139515], [-0.36356477709128, 45.170262130456], [-0.34234235630155, 45.167553726185], [-0.32063917436396, 45.156167113292], [-0.31362510377799, 45.137649636987], [-0.31316238218884, 45.133025815587], [-0.29469132756721, 45.121287278853], [-0.29800092490737, 45.115638086086], [-0.32218177765222, 45.089742318916], [-0.33458187054646, 45.070416963436], [-0.3201786248381, 45.048604232836], [-0.33856153229701, 45.043815247955], [-0.35009618284688, 45.046065045735], [-0.36071355330144, 45.028310398358], [-0.36203133599881, 45.018557490918], [-0.35418705640717, 45.013519568127], [-0.36176435970744, 44.996279053339], [-0.39260223135466, 44.99916016057], [-0.40681564172707, 44.97348102164], [-0.41821403082803, 44.966276531116], [-0.45494590676761, 44.953421365594], [-0.47215701526511, 44.975019330776], [-0.47434311995683, 44.994234928845], [-0.48002819810089, 45.001569989651], [-0.5147171154703, 45.010312958872], [-0.53680778950846, 45.025791724601], [-0.55584852172572, 45.034031085592], [-0.58823048314538, 45.037245880277], [-0.60233161508152, 45.034555060403], [-0.59523056751509, 45.02434114762], [-0.60907422097969, 45.018717578356], [-0.63696256125102, 45.04107650679], [-0.65375879601074, 45.060201970809], [-0.67221394662511, 45.075082031695], [-0.68349431398535, 45.089106240587], [-0.68569999876672, 45.096022567755], [-0.69180886795427, 45.140299251575], [-0.69844969779135, 45.162686216635], [-0.70563395028275, 45.174922305418], [-0.72358977279145, 45.199167513066], [-0.73796634075448, 45.229037234792], [-0.7358199136878, 45.28304035407], [-0.75267677056313, 45.321765614981]]] }, "properties": { "code": "33001", "nom": "Blaye" } }, { "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [[[-0.63696256125102, 45.04107650679], [-0.60907422097969, 45.018717578356], [-0.59523056751509, 45.02434114762], [-0.60233161508152, 45.034555060403], [-0.58823048314538, 45.037245880277], [-0.55584852172572, 45.034031085592], [-0.53680778950846, 45.025791724601], [-0.5147171154703, 45.010312958872], [-0.48002819810089, 45.001569989651], [-0.47434311995683, 44.994234928845], [-0.47215701526511, 44.975019330776], [-0.45494590676761, 44.953421365594], [-0.44805573292267, 44.939050915911], [-0.44056535019715, 44.934954591545], [-0.41482260670613, 44.945606169752], [-0.3991307383301, 44.947372392771], [-0.38385469535341, 44.939225968296], [-0.39129569902497, 44.928917503722], [-0.38158669255942, 44.913748320806], [-0.36312013170472, 44.911662330256], [-0.36202165802958, 44.901399761279], [-0.3522523825868, 44.898499618938], [-0.35008311755368, 44.88841806248], [-0.33971832130211, 44.875017583321], [-0.33150786720413, 44.870077369338], [-0.36129583922835, 44.851650787827], [-0.36193578825568, 44.833716566227], [-0.34712264013993, 44.836717545996], [-0.34142459320306, 44.833523614543], [-0.33047901473804, 44.81697652434], [-0.32896031767696, 44.80715933865], [-0.31249351950883, 44.799519168259], [-0.31297626464374, 44.787958816616], [-0.29712158887579, 44.786865555004], [-0.278053511024, 44.777437256634], [-0.25209761610642, 44.782252473909], [-0.24188242349068, 44.778568164248], [-0.2516951187108, 44.767269494598], [-0.26229116956721, 44.768297865543], [-0.26859708756466, 44.755055354349], [-0.2876118462732, 44.755208019445], [-0.29856948365964, 44.743022077293], [-0.31170714056451, 44.735931217184], [-0.32002798406376, 44.736999416443], [-0.33614644163747, 44.744322078568], [-0.34847403025124, 44.738856905738], [-0.35191273929608, 44.721584931921], [-0.38474534534423, 44.718744799881], [-0.40422826059603, 44.705986541851], [-0.41036610810737, 44.707643059016], [-0.43523660785032, 44.700927145565], [-0.43693129487411, 44.688145930316], [-0.4570576972736, 44.668616388203], [-0.44164355953229, 44.654805269631], [-0.44976260589383, 44.639841287064], [-0.45819808357008, 44.63026811029], [-0.47686681277969, 44.626579703839], [-0.48855530966679, 44.626963760354], [-0.48880537173016, 44.612414182284], [-0.4667399303361, 44.605752935957], [-0.48260764202198, 44.589876942513], [-0.48789381088937, 44.57529750593], [-0.50810772153834, 44.569935103839], [-0.53378751177027, 44.569383666523], [-0.54624074751701, 44.571640896835], [-0.55011968666045, 44.559659778349], [-0.56634364448502, 44.546236696657], [-0.58658459572061, 44.548585111446], [-0.60167478459668, 44.552857195536], [-0.61593035800592, 44.581985040002], [-0.60900798911041, 44.60364456627], [-0.61826028424372, 44.610929069544], [-0.66190163787941, 44.608757347055], [-0.69412974387468, 44.643488080857], [-0.73027390215028, 44.672521870932], [-0.78367723015458, 44.698959165557], [-0.82238564113765, 44.721366298446], [-0.83766613426634, 44.73748109217], [-0.88135651785153, 44.759996087126], [-0.90492371190621, 44.807835896704], [-0.88470272376607, 44.849738612895], [-0.88099889910563, 44.857272569621], [-0.88394996362594, 44.88542731746], [-0.86614747156631, 44.88434160747], [-0.84275649815839, 44.895613078184], [-0.83231363812075, 44.924944593704], [-0.82183973002933, 44.924596104496], [-0.79844904086089, 44.918753457433], [-0.79466933928104, 44.945100725137], [-0.78644312687948, 44.945324596422], [-0.75454232227768, 44.966663957796], [-0.72583772283894, 44.956353773944], [-0.69717589878017, 44.969935382541], [-0.67350486278258, 44.975640619225], [-0.66009124488077, 44.98255736637], [-0.66101889152922, 44.988257540735], [-0.64934696624579, 44.999590650365], [-0.64401435024022, 44.999500511785], [-0.63481107008046, 45.010585200451], [-0.62454061314904, 45.013371934959], [-0.6221305496478, 45.019602891083], [-0.63657012792692, 45.028820304622], [-0.63696256125102, 45.04107650679]]] }, "properties": { "code": "33002", "nom": "Bordeaux" } }, { "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [[[-1.0257391846007, 45.574691325999], [-1.0090820369018, 45.561520826869], [-0.9265369418124, 45.496125598327], [-0.86478824719039, 45.45340715699], [-0.84106252140245, 45.435085891321], [-0.81701762506686, 45.411475604511], [-0.77402172439234, 45.369205086916], [-0.75267677056313, 45.321765614981], [-0.7358199136878, 45.28304035407], [-0.73796634075448, 45.229037234792], [-0.72358977279145, 45.199167513066], [-0.70563395028275, 45.174922305418], [-0.69844969779135, 45.162686216635], [-0.69180886795427, 45.140299251575], [-0.68569999876672, 45.096022567755], [-0.68349431398535, 45.089106240587], [-0.67221394662511, 45.075082031695], [-0.65375879601074, 45.060201970809], [-0.63696256125102, 45.04107650679], [-0.63657012792692, 45.028820304622], [-0.6221305496478, 45.019602891083], [-0.62454061314904, 45.013371934959], [-0.63481107008046, 45.010585200451], [-0.64401435024022, 44.999500511785], [-0.64934696624579, 44.999590650365], [-0.66101889152922, 44.988257540735], [-0.66009124488077, 44.98255736637], [-0.67350486278258, 44.975640619225], [-0.69717589878017, 44.969935382541], [-0.72583772283894, 44.956353773944], [-0.75454232227768, 44.966663957796], [-0.78644312687948, 44.945324596422], [-0.79466933928104, 44.945100725137], [-0.79844904086089, 44.918753457433], [-0.82183973002933, 44.924596104496], [-0.83231363812075, 44.924944593704], [-0.84275649815839, 44.895613078184], [-0.86614747156631, 44.88434160747], [-0.88394996362594, 44.88542731746], [-0.88099889910563, 44.857272569621], [-0.88470272376607, 44.849738612895], [-0.92660855816159, 44.840729526041], [-0.9442468740155, 44.833608584217], [-0.96216338931899, 44.830221230864], [-1.0067476054032, 44.82984315825], [-1.0408469264544, 44.848125060591], [-1.0505362764776, 44.823205295657], [-1.083649360422, 44.828404788749], [-1.1468898837178, 44.823995283863], [-1.167139642117, 44.813423992811], [-1.2251191647411, 44.808659140588], [-1.232991308846, 44.808935752066], [-1.2229034640823, 44.864823398854], [-1.2041233648852, 44.989780904848], [-1.1942059965634, 45.069162896565], [-1.190236703195, 45.107603378458], [-1.1808856453533, 45.176064250108], [-1.162337441751, 45.297868794558], [-1.1593599360818, 45.35068807983], [-1.1605559384718, 45.41068706862], [-1.1515035839053, 45.439471708886], [-1.1514532239497, 45.451854900963], [-1.1570373594316, 45.470365660883], [-1.1546170989864, 45.480167705968], [-1.1364252810856, 45.51099225066], [-1.1228634483366, 45.520418190565], [-1.1002940973715, 45.541645700905], [-1.0961094287101, 45.55676823678], [-1.0912045614296, 45.562411237009], [-1.0605909878371, 45.571952807583], [-1.0257391846007, 45.574691325999]]] }, "properties": { "code": "33004", "nom": "Lesparre-M\xE9doc" } }, { "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [[[-1.232991308846, 44.808935752066], [-1.2251191647411, 44.808659140588], [-1.167139642117, 44.813423992811], [-1.1468898837178, 44.823995283863], [-1.083649360422, 44.828404788749], [-1.0505362764776, 44.823205295657], [-1.0408469264544, 44.848125060591], [-1.0067476054032, 44.82984315825], [-0.96216338931899, 44.830221230864], [-0.9442468740155, 44.833608584217], [-0.92660855816159, 44.840729526041], [-0.88470272376607, 44.849738612895], [-0.90492371190621, 44.807835896704], [-0.88135651785153, 44.759996087126], [-0.83766613426634, 44.73748109217], [-0.82238564113765, 44.721366298446], [-0.78367723015458, 44.698959165557], [-0.73027390215028, 44.672521870932], [-0.69412974387468, 44.643488080857], [-0.66190163787941, 44.608757347055], [-0.61826028424372, 44.610929069544], [-0.60900798911041, 44.60364456627], [-0.61593035800592, 44.581985040002], [-0.60167478459668, 44.552857195536], [-0.60826451256198, 44.522028260954], [-0.62331356510853, 44.512317730758], [-0.65981347714464, 44.507367963862], [-0.71237240408486, 44.512516910486], [-0.73026815323307, 44.511766984432], [-0.73596282822443, 44.502448370778], [-0.7178335032675, 44.489181618536], [-0.70165963521905, 44.485936401071], [-0.69491692055592, 44.481546713597], [-0.69694108083996, 44.468275449033], [-0.70719752501495, 44.458526892052], [-0.701343302472, 44.454846815878], [-0.68277930111373, 44.450743200147], [-0.68193304268744, 44.44410640147], [-0.69742786925964, 44.442347313001], [-0.73069769860506, 44.446371235394], [-0.77242389124687, 44.440065390557], [-0.7802786587589, 44.428106299184], [-0.79305700578868, 44.42869424449], [-0.81732088301594, 44.420355607201], [-0.84527368904245, 44.418975448762], [-0.91201620353572, 44.436936326703], [-0.91916781947707, 44.44334265377], [-0.96958186494299, 44.429381693784], [-1.0291608887845, 44.422698057254], [-1.0074549340123, 44.437655941822], [-0.98069956650209, 44.482879743899], [-0.98773451899223, 44.50830163679], [-0.99115222944795, 44.511852855415], [-1.0266322776735, 44.507125804732], [-1.0851653037793, 44.532195517275], [-1.1064937386386, 44.502776393766], [-1.1924838562811, 44.481212260344], [-1.253891222702, 44.4676023661], [-1.2514054654401, 44.488888404232], [-1.2517305863129, 44.514867670196], [-1.2602783216327, 44.539507595489], [-1.2586139358279, 44.547133110681], [-1.2461650749779, 44.555849447953], [-1.2273970193025, 44.575752956082], [-1.2121340085435, 44.599510356389], [-1.2035045639686, 44.622709327857], [-1.2041701334268, 44.639985478462], [-1.1915382411984, 44.660725704553], [-1.1812338744214, 44.663558241644], [-1.1617591419762, 44.663377214551], [-1.1451668567782, 44.657629640598], [-1.1407629554469, 44.647227205689], [-1.1249301480769, 44.647338816899], [-1.0807927355826, 44.640599156622], [-1.0660182544594, 44.646890617223], [-1.0512011570705, 44.64425984978], [-1.0446037563356, 44.647779187283], [-1.0053643374777, 44.648038204976], [-1.0053044562958, 44.653801414632], [-1.0185713848822, 44.663911777968], [-1.0233052011919, 44.67502570927], [-1.0311721058558, 44.679029191881], [-1.0500276213214, 44.682042500572], [-1.0581367463265, 44.689048034983], [-1.0363621413125, 44.693561606338], [-1.1066726573125, 44.742647003652], [-1.1172405050661, 44.74399979558], [-1.1253669244585, 44.751000559984], [-1.1459514198999, 44.761417104514], [-1.1605278218204, 44.774666943417], [-1.1685739214819, 44.771765177553], [-1.1781124391023, 44.755804073252], [-1.1722002204463, 44.75098728783], [-1.1900688471739, 44.737019677101], [-1.1907716197354, 44.730920109354], [-1.2044873682995, 44.721540106397], [-1.2043808938438, 44.717662887525], [-1.2229595098338, 44.709573193593], [-1.2374176561525, 44.682509258925], [-1.2389445057575, 44.65778181354], [-1.2462021095773, 44.641862728761], [-1.243112422171, 44.628827562622], [-1.2521476349475, 44.617729855339], [-1.2604466153424, 44.625669343024], [-1.2617334302552, 44.647702967991], [-1.2517253975532, 44.712016422613], [-1.2370231185304, 44.784935738577], [-1.232991308846, 44.808935752066]]] }, "properties": { "code": "33006", "nom": "Arcachon" } }] };

// apps/simulator/src/main.ts
var MyElement = class extends s3 {
  constructor() {
    super(...arguments);
    this.flights = flights;
    this.speed = 250;
    this.interval = 0;
  }
  connectedCallback() {
    super.connectedCallback();
    this.loadDigipair();
  }
  loadDigipair() {
    import("https://chatbot.digipair.ai/index.js");
    this.addEventListener("simulator-start", () => {
      this.startEngine();
    });
    this.addEventListener("simulator-stop", () => {
      this.stopEngine();
    });
    this.addEventListener("simulator-set", ({ detail }) => {
      this.stopEngine();
      this.flights = detail;
      this.requestUpdate();
    });
  }
  startEngine() {
    this.interval = setInterval(() => {
      simulatorEngine(this.flights);
      this.requestUpdate();
    }, this.speed);
  }
  stopEngine() {
    if (!this.interval)
      return;
    clearInterval(this.interval);
    this.interval = 0;
  }
  render() {
    return x`
      <section style="position: fixed; top: 0; left: 0; width: 100vmin; height: 100vmin; font-size: 1vmin;">
        <ats-simulator-map .geojson=${geojson}></ats-simulator-map>

        ${this.flights.map((flight) => x`
          <ats-simulator-flight fid=${flight.id} longitude=${flight.left / 10} latitude=${flight.top / 10}></ats-simulator-flight>
        `)}
      </section>

      <digipair-ai code="65d2075798ed5a093a588ca7"></digipair-ai>
    `;
  }
};
MyElement = __decorateClass([
  t3("ats-simulator")
], MyElement);
export {
  MyElement
};
/*! Bundled license information:

@lit-labs/ssr-dom-shim/lib/element-internals.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/ssr-dom-shim/index.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/directives/unsafe-svg.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=main.js.map
