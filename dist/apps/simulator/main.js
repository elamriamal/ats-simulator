var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
    if (decorator = decorators[i3])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

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
  attachShadow(init2) {
    const shadowRoot = { host: this };
    this.__shadowRootMode = init2.mode;
    if (init2 && init2.mode === "open") {
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
  constructor(t4, e4, o5) {
    if (this._$cssResult$ = true, o5 !== s)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t4, this.t = e4;
  }
  get styleSheet() {
    let t4 = this.o;
    const s4 = this.t;
    if (e && void 0 === t4) {
      const e4 = void 0 !== s4 && 1 === s4.length;
      e4 && (t4 = o.get(s4)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && o.set(s4, t4));
    }
    return t4;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
var i = (t4, ...e4) => {
  const o5 = 1 === t4.length ? t4[0] : e4.reduce((e5, s4, o6) => e5 + ((t5) => {
    if (true === t5._$cssResult$)
      return t5.cssText;
    if ("number" == typeof t5)
      return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t4[o6 + 1], t4[0]);
  return new n(o5, t4, s);
};
var S = (s4, o5) => {
  if (e)
    s4.adoptedStyleSheets = o5.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
  else
    for (const e4 of o5) {
      const o6 = document.createElement("style"), n5 = t.litNonce;
      void 0 !== n5 && o6.setAttribute("nonce", n5), o6.textContent = e4.cssText, s4.appendChild(o6);
    }
};
var c = e || void 0 === t.CSSStyleSheet ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
  let e4 = "";
  for (const s4 of t5.cssRules)
    e4 += s4.cssText;
  return r(e4);
})(t4) : t4;

// node_modules/@lit/reactive-element/node/reactive-element.js
var { is: r2, defineProperty: h, getOwnPropertyDescriptor: o2, getOwnPropertyNames: n2, getOwnPropertySymbols: a, getPrototypeOf: c2 } = Object;
var l = globalThis;
l.customElements ??= customElements2;
var p = l.trustedTypes;
var d = p ? p.emptyScript : "";
var u = l.reactiveElementPolyfillSupport;
var f = (t4, s4) => t4;
var b = { toAttribute(t4, s4) {
  switch (s4) {
    case Boolean:
      t4 = t4 ? d : null;
      break;
    case Object:
    case Array:
      t4 = null == t4 ? t4 : JSON.stringify(t4);
  }
  return t4;
}, fromAttribute(t4, s4) {
  let i3 = t4;
  switch (s4) {
    case Boolean:
      i3 = null !== t4;
      break;
    case Number:
      i3 = null === t4 ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        i3 = JSON.parse(t4);
      } catch (t5) {
        i3 = null;
      }
  }
  return i3;
} };
var y = (t4, s4) => !r2(t4, s4);
var m = { attribute: true, type: String, converter: b, reflect: false, hasChanged: y };
Symbol.metadata ??= Symbol("metadata"), l.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var g = class extends (globalThis.HTMLElement ?? HTMLElementShimWithRealType) {
  static addInitializer(t4) {
    this._$Ei(), (this.l ??= []).push(t4);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t4, s4 = m) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.elementProperties.set(t4, s4), !s4.noAccessor) {
      const i3 = Symbol(), e4 = this.getPropertyDescriptor(t4, i3, s4);
      void 0 !== e4 && h(this.prototype, t4, e4);
    }
  }
  static getPropertyDescriptor(t4, s4, i3) {
    const { get: e4, set: r6 } = o2(this.prototype, t4) ?? { get() {
      return this[s4];
    }, set(t5) {
      this[s4] = t5;
    } };
    return { get() {
      return e4?.call(this);
    }, set(s5) {
      const h3 = e4?.call(this);
      r6.call(this, s5), this.requestUpdate(t4, h3, i3);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t4) {
    return this.elementProperties.get(t4) ?? m;
  }
  static _$Ei() {
    if (this.hasOwnProperty(f("elementProperties")))
      return;
    const t4 = c2(this);
    t4.finalize(), void 0 !== t4.l && (this.l = [...t4.l]), this.elementProperties = new Map(t4.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(f("finalized")))
      return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(f("properties"))) {
      const t5 = this.properties, s4 = [...n2(t5), ...a(t5)];
      for (const i3 of s4)
        this.createProperty(i3, t5[i3]);
    }
    const t4 = this[Symbol.metadata];
    if (null !== t4) {
      const s4 = litPropertyMetadata.get(t4);
      if (void 0 !== s4)
        for (const [t5, i3] of s4)
          this.elementProperties.set(t5, i3);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t5, s4] of this.elementProperties) {
      const i3 = this._$Eu(t5, s4);
      void 0 !== i3 && this._$Eh.set(i3, t5);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t4) {
    const s4 = [];
    if (Array.isArray(t4)) {
      const e4 = new Set(t4.flat(1 / 0).reverse());
      for (const t5 of e4)
        s4.unshift(c(t5));
    } else
      void 0 !== t4 && s4.push(c(t4));
    return s4;
  }
  static _$Eu(t4, s4) {
    const i3 = s4.attribute;
    return false === i3 ? void 0 : "string" == typeof i3 ? i3 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t4) => t4(this));
  }
  addController(t4) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t4), void 0 !== this.renderRoot && this.isConnected && t4.hostConnected?.();
  }
  removeController(t4) {
    this._$EO?.delete(t4);
  }
  _$E_() {
    const t4 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i3 of s4.keys())
      this.hasOwnProperty(i3) && (t4.set(i3, this[i3]), delete this[i3]);
    t4.size > 0 && (this._$Ep = t4);
  }
  createRenderRoot() {
    const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t4, this.constructor.elementStyles), t4;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t4) => t4.hostConnected?.());
  }
  enableUpdating(t4) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t4) => t4.hostDisconnected?.());
  }
  attributeChangedCallback(t4, s4, i3) {
    this._$AK(t4, i3);
  }
  _$EC(t4, s4) {
    const i3 = this.constructor.elementProperties.get(t4), e4 = this.constructor._$Eu(t4, i3);
    if (void 0 !== e4 && true === i3.reflect) {
      const r6 = (void 0 !== i3.converter?.toAttribute ? i3.converter : b).toAttribute(s4, i3.type);
      this._$Em = t4, null == r6 ? this.removeAttribute(e4) : this.setAttribute(e4, r6), this._$Em = null;
    }
  }
  _$AK(t4, s4) {
    const i3 = this.constructor, e4 = i3._$Eh.get(t4);
    if (void 0 !== e4 && this._$Em !== e4) {
      const t5 = i3.getPropertyOptions(e4), r6 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : b;
      this._$Em = e4, this[e4] = r6.fromAttribute(s4, t5.type), this._$Em = null;
    }
  }
  requestUpdate(t4, s4, i3) {
    if (void 0 !== t4) {
      if (i3 ??= this.constructor.getPropertyOptions(t4), !(i3.hasChanged ?? y)(this[t4], s4))
        return;
      this.P(t4, s4, i3);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t4, s4, i3) {
    this._$AL.has(t4) || this._$AL.set(t4, s4), true === i3.reflect && this._$Em !== t4 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t4);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t5) {
      Promise.reject(t5);
    }
    const t4 = this.scheduleUpdate();
    return null != t4 && await t4, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t6, s5] of this._$Ep)
          this[t6] = s5;
        this._$Ep = void 0;
      }
      const t5 = this.constructor.elementProperties;
      if (t5.size > 0)
        for (const [s5, i3] of t5)
          true !== i3.wrapped || this._$AL.has(s5) || void 0 === this[s5] || this.P(s5, this[s5], i3);
    }
    let t4 = false;
    const s4 = this._$AL;
    try {
      t4 = this.shouldUpdate(s4), t4 ? (this.willUpdate(s4), this._$EO?.forEach((t5) => t5.hostUpdate?.()), this.update(s4)) : this._$EU();
    } catch (s5) {
      throw t4 = false, this._$EU(), s5;
    }
    t4 && this._$AE(s4);
  }
  willUpdate(t4) {
  }
  _$AE(t4) {
    this._$EO?.forEach((t5) => t5.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
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
  shouldUpdate(t4) {
    return true;
  }
  update(t4) {
    this._$Ej &&= this._$Ej.forEach((t5) => this._$EC(t5, this[t5])), this._$EU();
  }
  updated(t4) {
  }
  firstUpdated(t4) {
  }
};
g.elementStyles = [], g.shadowRootOptions = { mode: "open" }, g[f("elementProperties")] = /* @__PURE__ */ new Map(), g[f("finalized")] = /* @__PURE__ */ new Map(), u?.({ ReactiveElement: g }), (l.reactiveElementVersions ??= []).push("2.0.4");

// node_modules/lit-html/node/lit-html.js
var t2 = globalThis;
var i2 = t2.trustedTypes;
var s2 = i2 ? i2.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
var e2 = "$lit$";
var h2 = `lit$${(Math.random() + "").slice(9)}$`;
var o3 = "?" + h2;
var n3 = `<${o3}>`;
var r3 = void 0 === t2.document ? { createTreeWalker: () => ({}) } : document;
var l2 = () => r3.createComment("");
var c3 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
var a2 = Array.isArray;
var u2 = (t4) => a2(t4) || "function" == typeof t4?.[Symbol.iterator];
var d2 = "[ 	\n\f\r]";
var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var _ = />/g;
var m2 = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p2 = /'/g;
var g2 = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var y2 = (t4) => (i3, ...s4) => ({ _$litType$: t4, strings: i3, values: s4 });
var x = y2(1);
var T = y2(2);
var b2 = Symbol.for("lit-noChange");
var w = Symbol.for("lit-nothing");
var A = /* @__PURE__ */ new WeakMap();
var E = r3.createTreeWalker(r3, 129);
function C(t4, i3) {
  if (!Array.isArray(t4) || !t4.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== s2 ? s2.createHTML(i3) : i3;
}
var P = (t4, i3) => {
  const s4 = t4.length - 1, o5 = [];
  let r6, l3 = 2 === i3 ? "<svg>" : "", c4 = f2;
  for (let i4 = 0; i4 < s4; i4++) {
    const s5 = t4[i4];
    let a3, u3, d3 = -1, y3 = 0;
    for (; y3 < s5.length && (c4.lastIndex = y3, u3 = c4.exec(s5), null !== u3); )
      y3 = c4.lastIndex, c4 === f2 ? "!--" === u3[1] ? c4 = v : void 0 !== u3[1] ? c4 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r6 = RegExp("</" + u3[2], "g")), c4 = m2) : void 0 !== u3[3] && (c4 = m2) : c4 === m2 ? ">" === u3[0] ? (c4 = r6 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? m2 : '"' === u3[3] ? g2 : p2) : c4 === g2 || c4 === p2 ? c4 = m2 : c4 === v || c4 === _ ? c4 = f2 : (c4 = m2, r6 = void 0);
    const x2 = c4 === m2 && t4[i4 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === f2 ? s5 + n3 : d3 >= 0 ? (o5.push(a3), s5.slice(0, d3) + e2 + s5.slice(d3) + h2 + x2) : s5 + h2 + (-2 === d3 ? i4 : x2);
  }
  return [C(t4, l3 + (t4[s4] || "<?>") + (2 === i3 ? "</svg>" : "")), o5];
};
var V = class _V {
  constructor({ strings: t4, _$litType$: s4 }, n5) {
    let r6;
    this.parts = [];
    let c4 = 0, a3 = 0;
    const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = P(t4, s4);
    if (this.el = _V.createElement(f3, n5), E.currentNode = this.el.content, 2 === s4) {
      const t5 = this.el.content.firstChild;
      t5.replaceWith(...t5.childNodes);
    }
    for (; null !== (r6 = E.nextNode()) && d3.length < u3; ) {
      if (1 === r6.nodeType) {
        if (r6.hasAttributes())
          for (const t5 of r6.getAttributeNames())
            if (t5.endsWith(e2)) {
              const i3 = v2[a3++], s5 = r6.getAttribute(t5).split(h2), e4 = /([.?@])?(.*)/.exec(i3);
              d3.push({ type: 1, index: c4, name: e4[2], strings: s5, ctor: "." === e4[1] ? R : "?" === e4[1] ? H : "@" === e4[1] ? I : k }), r6.removeAttribute(t5);
            } else
              t5.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r6.removeAttribute(t5));
        if ($.test(r6.tagName)) {
          const t5 = r6.textContent.split(h2), s5 = t5.length - 1;
          if (s5 > 0) {
            r6.textContent = i2 ? i2.emptyScript : "";
            for (let i3 = 0; i3 < s5; i3++)
              r6.append(t5[i3], l2()), E.nextNode(), d3.push({ type: 2, index: ++c4 });
            r6.append(t5[s5], l2());
          }
        }
      } else if (8 === r6.nodeType)
        if (r6.data === o3)
          d3.push({ type: 2, index: c4 });
        else {
          let t5 = -1;
          for (; -1 !== (t5 = r6.data.indexOf(h2, t5 + 1)); )
            d3.push({ type: 7, index: c4 }), t5 += h2.length - 1;
        }
      c4++;
    }
  }
  static createElement(t4, i3) {
    const s4 = r3.createElement("template");
    return s4.innerHTML = t4, s4;
  }
};
function N(t4, i3, s4 = t4, e4) {
  if (i3 === b2)
    return i3;
  let h3 = void 0 !== e4 ? s4._$Co?.[e4] : s4._$Cl;
  const o5 = c3(i3) ? void 0 : i3._$litDirective$;
  return h3?.constructor !== o5 && (h3?._$AO?.(false), void 0 === o5 ? h3 = void 0 : (h3 = new o5(t4), h3._$AT(t4, s4, e4)), void 0 !== e4 ? (s4._$Co ??= [])[e4] = h3 : s4._$Cl = h3), void 0 !== h3 && (i3 = N(t4, h3._$AS(t4, i3.values), h3, e4)), i3;
}
var S2 = class {
  constructor(t4, i3) {
    this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t4) {
    const { el: { content: i3 }, parts: s4 } = this._$AD, e4 = (t4?.creationScope ?? r3).importNode(i3, true);
    E.currentNode = e4;
    let h3 = E.nextNode(), o5 = 0, n5 = 0, l3 = s4[0];
    for (; void 0 !== l3; ) {
      if (o5 === l3.index) {
        let i4;
        2 === l3.type ? i4 = new M(h3, h3.nextSibling, this, t4) : 1 === l3.type ? i4 = new l3.ctor(h3, l3.name, l3.strings, this, t4) : 6 === l3.type && (i4 = new L(h3, this, t4)), this._$AV.push(i4), l3 = s4[++n5];
      }
      o5 !== l3?.index && (h3 = E.nextNode(), o5++);
    }
    return E.currentNode = r3, e4;
  }
  p(t4) {
    let i3 = 0;
    for (const s4 of this._$AV)
      void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t4, s4, i3), i3 += s4.strings.length - 2) : s4._$AI(t4[i3])), i3++;
  }
};
var M = class _M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t4, i3, s4, e4) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t4, this._$AB = i3, this._$AM = s4, this.options = e4, this._$Cv = e4?.isConnected ?? true;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === t4?.nodeType && (t4 = i3.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i3 = this) {
    t4 = N(this, t4, i3), c3(t4) ? t4 === w || null == t4 || "" === t4 ? (this._$AH !== w && this._$AR(), this._$AH = w) : t4 !== this._$AH && t4 !== b2 && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : u2(t4) ? this.k(t4) : this._(t4);
  }
  S(t4) {
    return this._$AA.parentNode.insertBefore(t4, this._$AB);
  }
  T(t4) {
    this._$AH !== t4 && (this._$AR(), this._$AH = this.S(t4));
  }
  _(t4) {
    this._$AH !== w && c3(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(r3.createTextNode(t4)), this._$AH = t4;
  }
  $(t4) {
    const { values: i3, _$litType$: s4 } = t4, e4 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = V.createElement(C(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e4)
      this._$AH.p(i3);
    else {
      const t5 = new S2(e4, this), s5 = t5.u(this.options);
      t5.p(i3), this.T(s5), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i3 = A.get(t4.strings);
    return void 0 === i3 && A.set(t4.strings, i3 = new V(t4)), i3;
  }
  k(t4) {
    a2(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s4, e4 = 0;
    for (const h3 of t4)
      e4 === i3.length ? i3.push(s4 = new _M(this.S(l2()), this.S(l2()), this, this.options)) : s4 = i3[e4], s4._$AI(h3), e4++;
    e4 < i3.length && (this._$AR(s4 && s4._$AB.nextSibling, e4), i3.length = e4);
  }
  _$AR(t4 = this._$AA.nextSibling, i3) {
    for (this._$AP?.(false, true, i3); t4 && t4 !== this._$AB; ) {
      const i4 = t4.nextSibling;
      t4.remove(), t4 = i4;
    }
  }
  setConnected(t4) {
    void 0 === this._$AM && (this._$Cv = t4, this._$AP?.(t4));
  }
};
var k = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t4, i3, s4, e4, h3) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t4, this.name = i3, this._$AM = e4, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = w;
  }
  _$AI(t4, i3 = this, s4, e4) {
    const h3 = this.strings;
    let o5 = false;
    if (void 0 === h3)
      t4 = N(this, t4, i3, 0), o5 = !c3(t4) || t4 !== this._$AH && t4 !== b2, o5 && (this._$AH = t4);
    else {
      const e5 = t4;
      let n5, r6;
      for (t4 = h3[0], n5 = 0; n5 < h3.length - 1; n5++)
        r6 = N(this, e5[s4 + n5], i3, n5), r6 === b2 && (r6 = this._$AH[n5]), o5 ||= !c3(r6) || r6 !== this._$AH[n5], r6 === w ? t4 = w : t4 !== w && (t4 += (r6 ?? "") + h3[n5 + 1]), this._$AH[n5] = r6;
    }
    o5 && !e4 && this.j(t4);
  }
  j(t4) {
    t4 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
  }
};
var R = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t4) {
    this.element[this.name] = t4 === w ? void 0 : t4;
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t4) {
    this.element.toggleAttribute(this.name, !!t4 && t4 !== w);
  }
};
var I = class extends k {
  constructor(t4, i3, s4, e4, h3) {
    super(t4, i3, s4, e4, h3), this.type = 5;
  }
  _$AI(t4, i3 = this) {
    if ((t4 = N(this, t4, i3, 0) ?? w) === b2)
      return;
    const s4 = this._$AH, e4 = t4 === w && s4 !== w || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== w && (s4 === w || e4);
    e4 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var L = class {
  constructor(t4, i3, s4) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4) {
    N(this, t4);
  }
};
var W = t2.litHtmlPolyfillSupport;
W?.(V, M), (t2.litHtmlVersions ??= []).push("3.1.2");
var Z = (t4, i3, s4) => {
  const e4 = s4?.renderBefore ?? i3;
  let h3 = e4._$litPart$;
  if (void 0 === h3) {
    const t5 = s4?.renderBefore ?? null;
    e4._$litPart$ = h3 = new M(i3.insertBefore(l2(), t5), t5, void 0, s4 ?? {});
  }
  return h3._$AI(t4), h3;
};

// node_modules/lit-element/lit-element.js
var s3 = class extends g {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t4 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t4.firstChild, t4;
  }
  update(t4) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = Z(i3, this.renderRoot, this.renderOptions);
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
var t3 = (t4) => (e4, o5) => {
  void 0 !== o5 ? o5.addInitializer(() => {
    customElements.define(t4, e4);
  }) : customElements.define(t4, e4);
};

// node_modules/@lit/reactive-element/node/decorators/property.js
var o4 = { attribute: true, type: String, converter: b, reflect: false, hasChanged: y };
var r5 = (t4 = o4, e4, r6) => {
  const { kind: n5, metadata: i3 } = r6;
  let s4 = globalThis.litPropertyMetadata.get(i3);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i3, s4 = /* @__PURE__ */ new Map()), s4.set(r6.name, t4), "accessor" === n5) {
    const { name: o5 } = r6;
    return { set(r7) {
      const n6 = e4.get.call(this);
      e4.set.call(this, r7), this.requestUpdate(o5, n6, t4);
    }, init(e5) {
      return void 0 !== e5 && this.P(o5, void 0, t4), e5;
    } };
  }
  if ("setter" === n5) {
    const { name: o5 } = r6;
    return function(r7) {
      const n6 = this[o5];
      e4.call(this, r7), this.requestUpdate(o5, n6, t4);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t4) {
  return (e4, o5) => "object" == typeof o5 ? r5(t4, e4, o5) : ((t5, e5, o6) => {
    const r6 = e5.hasOwnProperty(o6);
    return e5.constructor.createProperty(o6, r6 ? { ...t5, wrapped: true } : t5), r6 ? Object.getOwnPropertyDescriptor(e5, o6) : void 0;
  })(t4, e4, o5);
}

// libs/simulator/flight/src/lib/simulator-flight.ts
var FlightElement = class extends s3 {
  render() {
    const longitude2 = (this.longitude ?? 1) % 100;
    const direction = Math.floor((this.longitude ?? 1) / 100) % 2 ? -1 : 1;
    return x`
      <section style="position: absolute; left: ${longitude2 * direction + (direction < 0 ? 100 : 0)}vmin; top: ${this.latitude}vmin;">
        <section class="plane">x</section>

        <div class="card">
          <div class="card-info"><strong>ID:</strong> #${this.fid}</div>
          <div class="card-info"><strong>Latitude:</strong> ${this.latitude}</div>
          <div class="card-info"><strong>Longitude:</strong> ${Math.floor(longitude2 * direction + (direction < 0 ? 100 : 0))}</div>
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

// node_modules/d3-array/src/fsum.js
var Adder = class {
  constructor() {
    this._partials = new Float64Array(32);
    this._n = 0;
  }
  add(x2) {
    const p3 = this._partials;
    let i3 = 0;
    for (let j = 0; j < this._n && j < 32; j++) {
      const y3 = p3[j], hi = x2 + y3, lo = Math.abs(x2) < Math.abs(y3) ? x2 - (hi - y3) : y3 - (hi - x2);
      if (lo)
        p3[i3++] = lo;
      x2 = hi;
    }
    p3[i3] = x2;
    this._n = i3 + 1;
    return this;
  }
  valueOf() {
    const p3 = this._partials;
    let n5 = this._n, x2, y3, lo, hi = 0;
    if (n5 > 0) {
      hi = p3[--n5];
      while (n5 > 0) {
        x2 = hi;
        y3 = p3[--n5];
        hi = x2 + y3;
        lo = y3 - (hi - x2);
        if (lo)
          break;
      }
      if (n5 > 0 && (lo < 0 && p3[n5 - 1] < 0 || lo > 0 && p3[n5 - 1] > 0)) {
        y3 = lo * 2;
        x2 = hi + y3;
        if (y3 == x2 - hi)
          hi = x2;
      }
    }
    return hi;
  }
};

// node_modules/d3-array/src/merge.js
function* flatten(arrays) {
  for (const array2 of arrays) {
    yield* array2;
  }
}
function merge(arrays) {
  return Array.from(flatten(arrays));
}

// node_modules/d3-dispatch/src/dispatch.js
var noop = { value: () => {
} };
function dispatch() {
  for (var i3 = 0, n5 = arguments.length, _2 = {}, t4; i3 < n5; ++i3) {
    if (!(t4 = arguments[i3] + "") || t4 in _2 || /[\s.]/.test(t4))
      throw new Error("illegal type: " + t4);
    _2[t4] = [];
  }
  return new Dispatch(_2);
}
function Dispatch(_2) {
  this._ = _2;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t4) {
    var name = "", i3 = t4.indexOf(".");
    if (i3 >= 0)
      name = t4.slice(i3 + 1), t4 = t4.slice(0, i3);
    if (t4 && !types.hasOwnProperty(t4))
      throw new Error("unknown type: " + t4);
    return { type: t4, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _2 = this._, T2 = parseTypenames(typename + "", _2), t4, i3 = -1, n5 = T2.length;
    if (arguments.length < 2) {
      while (++i3 < n5)
        if ((t4 = (typename = T2[i3]).type) && (t4 = get(_2[t4], typename.name)))
          return t4;
      return;
    }
    if (callback != null && typeof callback !== "function")
      throw new Error("invalid callback: " + callback);
    while (++i3 < n5) {
      if (t4 = (typename = T2[i3]).type)
        _2[t4] = set(_2[t4], typename.name, callback);
      else if (callback == null)
        for (t4 in _2)
          _2[t4] = set(_2[t4], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy = {}, _2 = this._;
    for (var t4 in _2)
      copy[t4] = _2[t4].slice();
    return new Dispatch(copy);
  },
  call: function(type2, that) {
    if ((n5 = arguments.length - 2) > 0)
      for (var args = new Array(n5), i3 = 0, n5, t4; i3 < n5; ++i3)
        args[i3] = arguments[i3 + 2];
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (t4 = this._[type2], i3 = 0, n5 = t4.length; i3 < n5; ++i3)
      t4[i3].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (var t4 = this._[type2], i3 = 0, n5 = t4.length; i3 < n5; ++i3)
      t4[i3].value.apply(that, args);
  }
};
function get(type2, name) {
  for (var i3 = 0, n5 = type2.length, c4; i3 < n5; ++i3) {
    if ((c4 = type2[i3]).name === name) {
      return c4.value;
    }
  }
}
function set(type2, name, callback) {
  for (var i3 = 0, n5 = type2.length; i3 < n5; ++i3) {
    if (type2[i3].name === name) {
      type2[i3] = noop, type2 = type2.slice(0, i3).concat(type2.slice(i3 + 1));
      break;
    }
  }
  if (callback != null)
    type2.push({ name, value: callback });
  return type2;
}
var dispatch_default = dispatch;

// node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i3 = prefix.indexOf(":");
  if (i3 >= 0 && (prefix = name.slice(0, i3)) !== "xmlns")
    name = name.slice(i3 + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
}

// node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

// node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups = this._groups, m3 = groups.length, subgroups = new Array(m3), j = 0; j < m3; ++j) {
    for (var group = groups[j], n5 = group.length, subgroup = subgroups[j] = new Array(n5), node, subnode, i3 = 0; i3 < n5; ++i3) {
      if ((node = group[i3]) && (subnode = select.call(node, node.__data__, i3, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i3] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/array.js
function array(x2) {
  return x2 == null ? [] : Array.isArray(x2) ? x2 : Array.from(x2);
}

// node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}
function selectAll_default(select) {
  if (typeof select === "function")
    select = arrayAll(select);
  else
    select = selectorAll_default(select);
  for (var groups = this._groups, m3 = groups.length, subgroups = [], parents = [], j = 0; j < m3; ++j) {
    for (var group = groups[j], n5 = group.length, node, i3 = 0; i3 < n5; ++i3) {
      if (node = group[i3]) {
        subgroups.push(select.call(node, node.__data__, i3, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}

// node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

// node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups = this._groups, m3 = groups.length, subgroups = new Array(m3), j = 0; j < m3; ++j) {
    for (var group = groups[j], n5 = group.length, subgroup = subgroups[j] = [], node, i3 = 0; i3 < n5; ++i3) {
      if ((node = group[i3]) && match.call(node, node.__data__, i3, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}

// node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

// node_modules/d3-selection/src/constant.js
function constant_default(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group, enter, update, exit, data) {
  var i3 = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i3 < dataLength; ++i3) {
    if (node = group[i3]) {
      node.__data__ = data[i3];
      update[i3] = node;
    } else {
      enter[i3] = new EnterNode(parent, data[i3]);
    }
  }
  for (; i3 < groupLength; ++i3) {
    if (node = group[i3]) {
      exit[i3] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i3, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i3 = 0; i3 < groupLength; ++i3) {
    if (node = group[i3]) {
      keyValues[i3] = keyValue = key.call(node, node.__data__, i3, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i3] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i3 = 0; i3 < dataLength; ++i3) {
    keyValue = key.call(parent, data[i3], i3, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i3] = node;
      node.__data__ = data[i3];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i3] = new EnterNode(parent, data[i3]);
    }
  }
  for (i3 = 0; i3 < groupLength; ++i3) {
    if ((node = group[i3]) && nodeByKeyValue.get(keyValues[i3]) === node) {
      exit[i3] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key) {
  if (!arguments.length)
    return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function")
    value = constant_default(value);
  for (var m3 = groups.length, update = new Array(m3), enter = new Array(m3), exit = new Array(m3), j = 0; j < m3; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1)
          i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength)
          ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}

// node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter)
      enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update)
      update = update.selection();
  }
  if (onexit == null)
    exit.remove();
  else
    onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/d3-selection/src/selection/merge.js
function merge_default(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m3 = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m3; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n5 = group0.length, merge2 = merges[j] = new Array(n5), node, i3 = 0; i3 < n5; ++i3) {
      if (node = group0[i3] || group1[i3]) {
        merge2[i3] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}

// node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups = this._groups, j = -1, m3 = groups.length; ++j < m3; ) {
    for (var group = groups[j], i3 = group.length - 1, next = group[i3], node; --i3 >= 0; ) {
      if (node = group[i3]) {
        if (next && node.compareDocumentPosition(next) ^ 4)
          next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare)
    compare = ascending;
  function compareNode(a3, b3) {
    return a3 && b3 ? compare(a3.__data__, b3.__data__) : !a3 - !b3;
  }
  for (var groups = this._groups, m3 = groups.length, sortgroups = new Array(m3), j = 0; j < m3; ++j) {
    for (var group = groups[j], n5 = group.length, sortgroup = sortgroups[j] = new Array(n5), node, i3 = 0; i3 < n5; ++i3) {
      if (node = group[i3]) {
        sortgroup[i3] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a3, b3) {
  return a3 < b3 ? -1 : a3 > b3 ? 1 : a3 >= b3 ? 0 : NaN;
}

// node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}

// node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups = this._groups, j = 0, m3 = groups.length; j < m3; ++j) {
    for (var group = groups[j], i3 = 0, n5 = group.length; i3 < n5; ++i3) {
      var node = group[i3];
      if (node)
        return node;
    }
  }
  return null;
}

// node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size = 0;
  for (const node of this)
    ++size;
  return size;
}

// node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups = this._groups, j = 0, m3 = groups.length; j < m3; ++j) {
    for (var group = groups[j], i3 = 0, n5 = group.length, node; i3 < n5; ++i3) {
      if (node = group[i3])
        callback.call(node, node.__data__, i3, group);
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/attr.js
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null)
      this.removeAttribute(name);
    else
      this.setAttribute(name, v2);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null)
      this.removeAttributeNS(fullname.space, fullname.local);
    else
      this.setAttributeNS(fullname.space, fullname.local, v2);
  };
}
function attr_default(name, value) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}

// node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null)
      this.style.removeProperty(name);
    else
      this.style.setProperty(name, v2, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null)
      delete this[name];
    else
      this[name] = v2;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}

// node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i3 = this._names.indexOf(name);
    if (i3 < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i3 = this._names.indexOf(name);
    if (i3 >= 0) {
      this._names.splice(i3, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i3 = -1, n5 = names.length;
  while (++i3 < n5)
    list.add(names[i3]);
}
function classedRemove(node, names) {
  var list = classList(node), i3 = -1, n5 = names.length;
  while (++i3 < n5)
    list.remove(names[i3]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i3 = -1, n5 = names.length;
    while (++i3 < n5)
      if (!list.contains(names[i3]))
        return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}

// node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v2 = value.apply(this, arguments);
    this.textContent = v2 == null ? "" : v2;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}

// node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v2 = value.apply(this, arguments);
    this.innerHTML = v2 == null ? "" : v2;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

// node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling)
    this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling)
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create2 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}

// node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent)
    parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

// node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames2(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t4) {
    var name = "", i3 = t4.indexOf(".");
    if (i3 >= 0)
      name = t4.slice(i3 + 1), t4 = t4.slice(0, i3);
    return { type: t4, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on)
      return;
    for (var j = 0, i3 = -1, m3 = on.length, o5; j < m3; ++j) {
      if (o5 = on[j], (!typename.type || o5.type === typename.type) && o5.name === typename.name) {
        this.removeEventListener(o5.type, o5.listener, o5.options);
      } else {
        on[++i3] = o5;
      }
    }
    if (++i3)
      on.length = i3;
    else
      delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o5, listener = contextListener(value);
    if (on)
      for (var j = 0, m3 = on.length; j < m3; ++j) {
        if ((o5 = on[j]).type === typename.type && o5.name === typename.name) {
          this.removeEventListener(o5.type, o5.listener, o5.options);
          this.addEventListener(o5.type, o5.listener = listener, o5.options = options);
          o5.value = value;
          return;
        }
      }
    this.addEventListener(typename.type, listener, options);
    o5 = { type: typename.type, name: typename.name, value, listener, options };
    if (!on)
      this.__on = [o5];
    else
      on.push(o5);
  };
}
function on_default(typename, value, options) {
  var typenames = parseTypenames2(typename + ""), i3, n5 = typenames.length, t4;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on)
      for (var j = 0, m3 = on.length, o5; j < m3; ++j) {
        for (i3 = 0, o5 = on[j]; i3 < n5; ++i3) {
          if ((t4 = typenames[i3]).type === o5.type && t4.name === o5.name) {
            return o5.value;
          }
        }
      }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i3 = 0; i3 < n5; ++i3)
    this.each(on(typenames[i3], value, options));
  return this;
}

// node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params)
      event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else
      event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default2(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}

// node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups = this._groups, j = 0, m3 = groups.length; j < m3; ++j) {
    for (var group = groups[j], i3 = 0, n5 = group.length, node; i3 < n5; ++i3) {
      if (node = group[i3])
        yield node;
    }
  }
}

// node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
  selection: selection_selection,
  order: order_default,
  sort: sort_default,
  call: call_default,
  nodes: nodes_default,
  node: node_default,
  size: size_default,
  empty: empty_default,
  each: each_default,
  attr: attr_default,
  style: style_default,
  property: property_default,
  classed: classed_default,
  text: text_default,
  html: html_default,
  raise: raise_default,
  lower: lower_default,
  append: append_default,
  insert: insert_default,
  remove: remove_default,
  clone: clone_default,
  datum: datum_default,
  on: on_default,
  dispatch: dispatch_default2,
  [Symbol.iterator]: iterator_default
};
var selection_default = selection;

// node_modules/d3-selection/src/select.js
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}

// node_modules/d3-selection/src/sourceEvent.js
function sourceEvent_default(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent)
    event = sourceEvent;
  return event;
}

// node_modules/d3-selection/src/pointer.js
function pointer_default(event, node) {
  event = sourceEvent_default(event);
  if (node === void 0)
    node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

// node_modules/d3-drag/src/noevent.js
var nonpassivecapture = { capture: true, passive: false };
function noevent_default(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// node_modules/d3-drag/src/nodrag.js
function nodrag_default(view) {
  var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", noevent_default, nonpassivecapture);
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", noevent_default, nonpassivecapture);
  } else {
    root2.__noselect = root2.style.MozUserSelect;
    root2.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", null);
  if (noclick) {
    selection2.on("click.drag", noevent_default, nonpassivecapture);
    setTimeout(function() {
      selection2.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", null);
  } else {
    root2.style.MozUserSelect = root2.__noselect;
    delete root2.__noselect;
  }
}

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m3, l3;
  format = (format + "").trim().toLowerCase();
  return (m3 = reHex.exec(format)) ? (l3 = m3[1].length, m3 = parseInt(m3[1], 16), l3 === 6 ? rgbn(m3) : l3 === 3 ? new Rgb(m3 >> 8 & 15 | m3 >> 4 & 240, m3 >> 4 & 15 | m3 & 240, (m3 & 15) << 4 | m3 & 15, 1) : l3 === 8 ? rgba(m3 >> 24 & 255, m3 >> 16 & 255, m3 >> 8 & 255, (m3 & 255) / 255) : l3 === 4 ? rgba(m3 >> 12 & 15 | m3 >> 8 & 240, m3 >> 8 & 15 | m3 >> 4 & 240, m3 >> 4 & 15 | m3 & 240, ((m3 & 15) << 4 | m3 & 15) / 255) : null) : (m3 = reRgbInteger.exec(format)) ? new Rgb(m3[1], m3[2], m3[3], 1) : (m3 = reRgbPercent.exec(format)) ? new Rgb(m3[1] * 255 / 100, m3[2] * 255 / 100, m3[3] * 255 / 100, 1) : (m3 = reRgbaInteger.exec(format)) ? rgba(m3[1], m3[2], m3[3], m3[4]) : (m3 = reRgbaPercent.exec(format)) ? rgba(m3[1] * 255 / 100, m3[2] * 255 / 100, m3[3] * 255 / 100, m3[4]) : (m3 = reHslPercent.exec(format)) ? hsla(m3[1], m3[2] / 100, m3[3] / 100, 1) : (m3 = reHslaPercent.exec(format)) ? hsla(m3[1], m3[2] / 100, m3[3] / 100, m3[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n5) {
  return new Rgb(n5 >> 16 & 255, n5 >> 8 & 255, n5 & 255, 1);
}
function rgba(r6, g3, b3, a3) {
  if (a3 <= 0)
    r6 = g3 = b3 = NaN;
  return new Rgb(r6, g3, b3, a3);
}
function rgbConvert(o5) {
  if (!(o5 instanceof Color))
    o5 = color(o5);
  if (!o5)
    return new Rgb();
  o5 = o5.rgb();
  return new Rgb(o5.r, o5.g, o5.b, o5.opacity);
}
function rgb(r6, g3, b3, opacity) {
  return arguments.length === 1 ? rgbConvert(r6) : new Rgb(r6, g3, b3, opacity == null ? 1 : opacity);
}
function Rgb(r6, g3, b3, opacity) {
  this.r = +r6;
  this.g = +g3;
  this.b = +b3;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a3 = clampa(this.opacity);
  return `${a3 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a3 === 1 ? ")" : `, ${a3})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h3, s4, l3, a3) {
  if (a3 <= 0)
    h3 = s4 = l3 = NaN;
  else if (l3 <= 0 || l3 >= 1)
    h3 = s4 = NaN;
  else if (s4 <= 0)
    h3 = NaN;
  return new Hsl(h3, s4, l3, a3);
}
function hslConvert(o5) {
  if (o5 instanceof Hsl)
    return new Hsl(o5.h, o5.s, o5.l, o5.opacity);
  if (!(o5 instanceof Color))
    o5 = color(o5);
  if (!o5)
    return new Hsl();
  if (o5 instanceof Hsl)
    return o5;
  o5 = o5.rgb();
  var r6 = o5.r / 255, g3 = o5.g / 255, b3 = o5.b / 255, min2 = Math.min(r6, g3, b3), max2 = Math.max(r6, g3, b3), h3 = NaN, s4 = max2 - min2, l3 = (max2 + min2) / 2;
  if (s4) {
    if (r6 === max2)
      h3 = (g3 - b3) / s4 + (g3 < b3) * 6;
    else if (g3 === max2)
      h3 = (b3 - r6) / s4 + 2;
    else
      h3 = (r6 - g3) / s4 + 4;
    s4 /= l3 < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h3 *= 60;
  } else {
    s4 = l3 > 0 && l3 < 1 ? 0 : h3;
  }
  return new Hsl(h3, s4, l3, o5.opacity);
}
function hsl(h3, s4, l3, opacity) {
  return arguments.length === 1 ? hslConvert(h3) : new Hsl(h3, s4, l3, opacity == null ? 1 : opacity);
}
function Hsl(h3, s4, l3, opacity) {
  this.h = +h3;
  this.s = +s4;
  this.l = +l3;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb() {
    var h3 = this.h % 360 + (this.h < 0) * 360, s4 = isNaN(h3) || isNaN(this.s) ? 0 : this.s, l3 = this.l, m22 = l3 + (l3 < 0.5 ? l3 : 1 - l3) * s4, m1 = 2 * l3 - m22;
    return new Rgb(
      hsl2rgb(h3 >= 240 ? h3 - 240 : h3 + 120, m1, m22),
      hsl2rgb(h3, m1, m22),
      hsl2rgb(h3 < 120 ? h3 + 240 : h3 - 120, m1, m22),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a3 = clampa(this.opacity);
    return `${a3 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a3 === 1 ? ")" : `, ${a3})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h3, m1, m22) {
  return (h3 < 60 ? m1 + (m22 - m1) * h3 / 60 : h3 < 180 ? m22 : h3 < 240 ? m1 + (m22 - m1) * (240 - h3) / 60 : m1) * 255;
}

// node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t22 = t1 * t1, t32 = t22 * t1;
  return ((1 - 3 * t1 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t1 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default(values) {
  var n5 = values.length - 1;
  return function(t4) {
    var i3 = t4 <= 0 ? t4 = 0 : t4 >= 1 ? (t4 = 1, n5 - 1) : Math.floor(t4 * n5), v1 = values[i3], v2 = values[i3 + 1], v0 = i3 > 0 ? values[i3 - 1] : 2 * v1 - v2, v3 = i3 < n5 - 1 ? values[i3 + 2] : 2 * v2 - v1;
    return basis((t4 - i3 / n5) * n5, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n5 = values.length;
  return function(t4) {
    var i3 = Math.floor(((t4 %= 1) < 0 ? ++t4 : t4) * n5), v0 = values[(i3 + n5 - 1) % n5], v1 = values[i3 % n5], v2 = values[(i3 + 1) % n5], v3 = values[(i3 + 2) % n5];
    return basis((t4 - i3 / n5) * n5, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default2 = (x2) => () => x2;

// node_modules/d3-interpolate/src/color.js
function linear(a3, d3) {
  return function(t4) {
    return a3 + t4 * d3;
  };
}
function exponential(a3, b3, y3) {
  return a3 = Math.pow(a3, y3), b3 = Math.pow(b3, y3) - a3, y3 = 1 / y3, function(t4) {
    return Math.pow(a3 + t4 * b3, y3);
  };
}
function gamma(y3) {
  return (y3 = +y3) === 1 ? nogamma : function(a3, b3) {
    return b3 - a3 ? exponential(a3, b3, y3) : constant_default2(isNaN(a3) ? b3 : a3);
  };
}
function nogamma(a3, b3) {
  var d3 = b3 - a3;
  return d3 ? linear(a3, d3) : constant_default2(isNaN(a3) ? b3 : a3);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y3) {
  var color2 = gamma(y3);
  function rgb2(start2, end) {
    var r6 = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g3 = color2(start2.g, end.g), b3 = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t4) {
      start2.r = r6(t4);
      start2.g = g3(t4);
      start2.b = b3(t4);
      start2.opacity = opacity(t4);
      return start2 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n5 = colors.length, r6 = new Array(n5), g3 = new Array(n5), b3 = new Array(n5), i3, color2;
    for (i3 = 0; i3 < n5; ++i3) {
      color2 = rgb(colors[i3]);
      r6[i3] = color2.r || 0;
      g3[i3] = color2.g || 0;
      b3[i3] = color2.b || 0;
    }
    r6 = spline(r6);
    g3 = spline(g3);
    b3 = spline(b3);
    color2.opacity = 1;
    return function(t4) {
      color2.r = r6(t4);
      color2.g = g3(t4);
      color2.b = b3(t4);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/number.js
function number_default(a3, b3) {
  return a3 = +a3, b3 = +b3, function(t4) {
    return a3 * (1 - t4) + b3 * t4;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b3) {
  return function() {
    return b3;
  };
}
function one(b3) {
  return function(t4) {
    return b3(t4) + "";
  };
}
function string_default(a3, b3) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i3 = -1, s4 = [], q = [];
  a3 = a3 + "", b3 = b3 + "";
  while ((am = reA.exec(a3)) && (bm = reB.exec(b3))) {
    if ((bs = bm.index) > bi) {
      bs = b3.slice(bi, bs);
      if (s4[i3])
        s4[i3] += bs;
      else
        s4[++i3] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s4[i3])
        s4[i3] += bm;
      else
        s4[++i3] = bm;
    } else {
      s4[++i3] = null;
      q.push({ i: i3, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b3.length) {
    bs = b3.slice(bi);
    if (s4[i3])
      s4[i3] += bs;
    else
      s4[++i3] = bs;
  }
  return s4.length < 2 ? q[0] ? one(q[0].x) : zero(b3) : (b3 = q.length, function(t4) {
    for (var i4 = 0, o5; i4 < b3; ++i4)
      s4[(o5 = q[i4]).i] = o5.x(t4);
    return s4.join("");
  });
}

// node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a3, b3, c4, d3, e4, f3) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a3 * a3 + b3 * b3))
    a3 /= scaleX, b3 /= scaleX;
  if (skewX = a3 * c4 + b3 * d3)
    c4 -= a3 * skewX, d3 -= b3 * skewX;
  if (scaleY = Math.sqrt(c4 * c4 + d3 * d3))
    c4 /= scaleY, d3 /= scaleY, skewX /= scaleY;
  if (a3 * d3 < b3 * c4)
    a3 = -a3, b3 = -b3, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e4,
    translateY: f3,
    rotate: Math.atan2(b3, a3) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}

// node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m3 = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m3.isIdentity ? identity : decompose_default(m3.a, m3.b, m3.c, m3.d, m3.e, m3.f);
}
function parseSvg(value) {
  if (value == null)
    return identity;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate()))
    return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s4) {
    return s4.length ? s4.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s4, q) {
    if (xa !== xb || ya !== yb) {
      var i3 = s4.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i3 - 4, x: number_default(xa, xb) }, { i: i3 - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s4.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a3, b3, s4, q) {
    if (a3 !== b3) {
      if (a3 - b3 > 180)
        b3 += 360;
      else if (b3 - a3 > 180)
        a3 += 360;
      q.push({ i: s4.push(pop(s4) + "rotate(", null, degParen) - 2, x: number_default(a3, b3) });
    } else if (b3) {
      s4.push(pop(s4) + "rotate(" + b3 + degParen);
    }
  }
  function skewX(a3, b3, s4, q) {
    if (a3 !== b3) {
      q.push({ i: s4.push(pop(s4) + "skewX(", null, degParen) - 2, x: number_default(a3, b3) });
    } else if (b3) {
      s4.push(pop(s4) + "skewX(" + b3 + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s4, q) {
    if (xa !== xb || ya !== yb) {
      var i3 = s4.push(pop(s4) + "scale(", null, ",", null, ")");
      q.push({ i: i3 - 4, x: number_default(xa, xb) }, { i: i3 - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s4.push(pop(s4) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a3, b3) {
    var s4 = [], q = [];
    a3 = parse(a3), b3 = parse(b3);
    translate(a3.translateX, a3.translateY, b3.translateX, b3.translateY, s4, q);
    rotate(a3.rotate, b3.rotate, s4, q);
    skewX(a3.skewX, b3.skewX, s4, q);
    scale(a3.scaleX, a3.scaleY, b3.scaleX, b3.scaleY, s4, q);
    a3 = b3 = null;
    return function(t4) {
      var i3 = -1, n5 = q.length, o5;
      while (++i3 < n5)
        s4[(o5 = q[i3]).i] = o5.x(t4);
      return s4.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;
function cosh(x2) {
  return ((x2 = Math.exp(x2)) + 1 / x2) / 2;
}
function sinh(x2) {
  return ((x2 = Math.exp(x2)) - 1 / x2) / 2;
}
function tanh(x2) {
  return ((x2 = Math.exp(2 * x2)) - 1) / (x2 + 1);
}
var zoom_default = function zoomRho(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d22 = dx * dx + dy * dy, i3, S3;
    if (d22 < epsilon2) {
      S3 = Math.log(w1 / w0) / rho;
      i3 = function(t4) {
        return [
          ux0 + t4 * dx,
          uy0 + t4 * dy,
          w0 * Math.exp(rho * t4 * S3)
        ];
      };
    } else {
      var d1 = Math.sqrt(d22), b0 = (w1 * w1 - w0 * w0 + rho4 * d22) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d22) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S3 = (r1 - r0) / rho;
      i3 = function(t4) {
        var s4 = t4 * S3, coshr0 = cosh(r0), u3 = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s4 + r0) - sinh(r0));
        return [
          ux0 + u3 * dx,
          uy0 + u3 * dy,
          w0 * coshr0 / cosh(rho * s4 + r0)
        ];
      };
    }
    i3.duration = S3 * 1e3 * rho / Math.SQRT2;
    return i3;
  }
  zoom.rho = function(_2) {
    var _1 = Math.max(1e-3, +_2), _22 = _1 * _1, _4 = _22 * _22;
    return zoomRho(_1, _22, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);

// node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f3) {
  setTimeout(f3, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail)
        taskTail._next = this;
      else
        taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t4 = new Timer();
  t4.restart(callback, delay, time);
  return t4;
}
function timerFlush() {
  now();
  ++frame;
  var t4 = taskHead, e4;
  while (t4) {
    if ((e4 = clockNow - t4._time) >= 0)
      t4._call.call(void 0, e4);
    t4 = t4._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay)
    clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t22, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time)
        time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t22 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t22 : taskHead = t22;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame)
    return;
  if (timeout)
    timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity)
      timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval)
      interval = clearInterval(interval);
  } else {
    if (!interval)
      clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
  var t4 = new Timer();
  delay = delay == null ? 0 : +delay;
  t4.restart((elapsed) => {
    t4.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t4;
}

// node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name, id2, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules)
    node.__transition = {};
  else if (id2 in schedules)
    return;
  create(node, id2, {
    name,
    index,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > CREATED)
    throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > STARTED)
    throw new Error("too late; already running");
  return schedule;
}
function get2(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2]))
    throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self) {
  var schedules = node.__transition, tween;
  schedules[id2] = self;
  self.timer = timer(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start2, self.delay, self.time);
    if (self.delay <= elapsed)
      start2(elapsed - self.delay);
  }
  function start2(elapsed) {
    var i3, j, n5, o5;
    if (self.state !== SCHEDULED)
      return stop();
    for (i3 in schedules) {
      o5 = schedules[i3];
      if (o5.name !== self.name)
        continue;
      if (o5.state === STARTED)
        return timeout_default(start2);
      if (o5.state === RUNNING) {
        o5.state = ENDED;
        o5.timer.stop();
        o5.on.call("interrupt", node, node.__data__, o5.index, o5.group);
        delete schedules[i3];
      } else if (+i3 < id2) {
        o5.state = ENDED;
        o5.timer.stop();
        o5.on.call("cancel", node, node.__data__, o5.index, o5.group);
        delete schedules[i3];
      }
    }
    timeout_default(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING)
      return;
    self.state = STARTED;
    tween = new Array(n5 = self.tween.length);
    for (i3 = 0, j = -1; i3 < n5; ++i3) {
      if (o5 = self.tween[i3].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o5;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t4 = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i3 = -1, n5 = tween.length;
    while (++i3 < n5) {
      tween[i3].call(node, t4);
    }
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id2];
    for (var i3 in schedules)
      return;
    delete node.__transition;
  }
}

// node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty2 = true, i3;
  if (!schedules)
    return;
  name = name == null ? null : name + "";
  for (i3 in schedules) {
    if ((schedule = schedules[i3]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i3];
  }
  if (empty2)
    delete node.__transition;
}

// node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}

// node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i3 = 0, n5 = tween1.length; i3 < n5; ++i3) {
        if (tween1[i3].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i3, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function")
    throw new Error();
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t4 = { name, value }, i3 = 0, n5 = tween1.length; i3 < n5; ++i3) {
        if (tween1[i3].name === name) {
          tween1[i3] = t4;
          break;
        }
      }
      if (i3 === n5)
        tween1.push(t4);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id2).tween;
    for (var i3 = 0, n5 = tween.length, t4; i3 < n5; ++i3) {
      if ((t4 = tween[i3]).name === name) {
        return t4.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition2, name, value) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set2(this, id2);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id2).value[name];
  };
}

// node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a3, b3) {
  var c4;
  return (typeof b3 === "number" ? number_default : b3 instanceof color ? rgb_default : (c4 = color(b3)) ? (b3 = c4, rgb_default) : string_default)(a3, b3);
}

// node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value) {
  var fullname = namespace_default(name), i3 = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i3, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i3, value));
}

// node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i3) {
  return function(t4) {
    this.setAttribute(name, i3.call(this, t4));
  };
}
function attrInterpolateNS(fullname, i3) {
  return function(t4) {
    this.setAttributeNS(fullname.space, fullname.local, i3.call(this, t4));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i3 = value.apply(this, arguments);
    if (i3 !== i0)
      t0 = (i0 = i3) && attrInterpolateNS(fullname, i3);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i3 = value.apply(this, arguments);
    if (i3 !== i0)
      t0 = (i0 = i3) && attrInterpolate(name, i3);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

// node_modules/d3-transition/src/transition/delay.js
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function delay_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
}

// node_modules/d3-transition/src/transition/duration.js
function durationFunction(id2, value) {
  return function() {
    set2(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set2(this, id2).duration = value;
  };
}
function duration_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
}

// node_modules/d3-transition/src/transition/ease.js
function easeConstant(id2, value) {
  if (typeof value !== "function")
    throw new Error();
  return function() {
    set2(this, id2).ease = value;
  };
}
function ease_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
}

// node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id2, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (typeof v2 !== "function")
      throw new Error();
    set2(this, id2).ease = v2;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function")
    throw new Error();
  return this.each(easeVarying(this._id, value));
}

// node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups = this._groups, m3 = groups.length, subgroups = new Array(m3), j = 0; j < m3; ++j) {
    for (var group = groups[j], n5 = group.length, subgroup = subgroups[j] = [], node, i3 = 0; i3 < n5; ++i3) {
      if ((node = group[i3]) && match.call(node, node.__data__, i3, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition2) {
  if (transition2._id !== this._id)
    throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m3 = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m3; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n5 = group0.length, merge2 = merges[j] = new Array(n5), node, i3 = 0; i3 < n5; ++i3) {
      if (node = group0[i3] || group1[i3]) {
        merge2[i3] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t4) {
    var i3 = t4.indexOf(".");
    if (i3 >= 0)
      t4 = t4.slice(0, i3);
    return !t4 || t4 === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init : set2;
  return function() {
    var schedule = sit(this, id2), on = schedule.on;
    if (on !== on0)
      (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}

// node_modules/d3-transition/src/transition/remove.js
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i3 in this.__transition)
      if (+i3 !== id2)
        return;
    if (parent)
      parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}

// node_modules/d3-transition/src/transition/select.js
function select_default3(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups = this._groups, m3 = groups.length, subgroups = new Array(m3), j = 0; j < m3; ++j) {
    for (var group = groups[j], n5 = group.length, subgroup = subgroups[j] = new Array(n5), node, subnode, i3 = 0; i3 < n5; ++i3) {
      if ((node = group[i3]) && (subnode = select.call(node, node.__data__, i3, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i3] = subnode;
        schedule_default(subgroup[i3], name, id2, i3, subgroup, get2(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}

// node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selectorAll_default(select);
  for (var groups = this._groups, m3 = groups.length, subgroups = [], parents = [], j = 0; j < m3; ++j) {
    for (var group = groups[j], n5 = group.length, node, i3 = 0; i3 < n5; ++i3) {
      if (node = group[i3]) {
        for (var children2 = select.call(node, node.__data__, i3, group), child, inherit2 = get2(node, id2), k2 = 0, l3 = children2.length; k2 < l3; ++k2) {
          if (child = children2[k2]) {
            schedule_default(child, name, id2, k2, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}

// node_modules/d3-transition/src/transition/selection.js
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}

// node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null)
      string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
    if (on !== on0 || listener0 !== listener)
      (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i3 = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i3)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i3, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i3, value), priority).on("end.style." + name, null);
}

// node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i3, priority) {
  return function(t4) {
    this.style.setProperty(name, i3.call(this, t4), priority);
  };
}
function styleTween(name, value, priority) {
  var t4, i0;
  function tween() {
    var i3 = value.apply(this, arguments);
    if (i3 !== i0)
      t4 = (i0 = i3) && styleInterpolate(name, i3, priority);
    return t4;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

// node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}

// node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i3) {
  return function(t4) {
    this.textContent = i3.call(this, t4);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i3 = value.apply(this, arguments);
    if (i3 !== i0)
      t0 = (i0 = i3) && textInterpolate(i3);
    return t0;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key = "text";
  if (arguments.length < 1)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, textTween(value));
}

// node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m3 = groups.length, j = 0; j < m3; ++j) {
    for (var group = groups[j], n5 = group.length, node, i3 = 0; i3 < n5; ++i3) {
      if (node = group[i3]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name, id1, i3, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}

// node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0)
        resolve();
    } };
    that.each(function() {
      var schedule = set2(this, id2), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size === 0)
      resolve();
  });
}

// node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function transition(name) {
  return selection_default().transition(name);
}
function newId() {
  return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: select_default3,
  selectAll: selectAll_default2,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: filter_default2,
  merge: merge_default2,
  selection: selection_default2,
  transition: transition_default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on_default2,
  attr: attr_default2,
  attrTween: attrTween_default,
  style: style_default2,
  styleTween: styleTween_default,
  text: text_default2,
  textTween: textTween_default,
  remove: remove_default2,
  tween: tween_default,
  delay: delay_default,
  duration: duration_default,
  ease: ease_default,
  easeVarying: easeVarying_default,
  end: end_default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

// node_modules/d3-ease/src/cubic.js
function cubicInOut(t4) {
  return ((t4 *= 2) <= 1 ? t4 * t4 * t4 : (t4 -= 2) * t4 * t4 + 2) / 2;
}

// node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m3 = groups.length, j = 0; j < m3; ++j) {
    for (var group = groups[j], n5 = group.length, node, i3 = 0; i3 < n5; ++i3) {
      if (node = group[i3]) {
        schedule_default(node, name, id2, i3, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}

// node_modules/d3-transition/src/selection/index.js
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;

// node_modules/d3-brush/src/brush.js
var { abs, max, min } = Math;
function number1(e4) {
  return [+e4[0], +e4[1]];
}
function number2(e4) {
  return [number1(e4[0]), number1(e4[1])];
}
var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x2, e4) {
    return x2 == null ? null : [[+x2[0], e4[0][1]], [+x2[1], e4[1][1]]];
  },
  output: function(xy) {
    return xy && [xy[0][0], xy[1][0]];
  }
};
var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y3, e4) {
    return y3 == null ? null : [[e4[0][0], +y3[0]], [e4[1][0], +y3[1]]];
  },
  output: function(xy) {
    return xy && [xy[0][1], xy[1][1]];
  }
};
var XY = {
  name: "xy",
  handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
  input: function(xy) {
    return xy == null ? null : number2(xy);
  },
  output: function(xy) {
    return xy;
  }
};
function type(t4) {
  return { type: t4 };
}

// node_modules/d3-geo/src/math.js
var epsilon = 1e-6;
var epsilon22 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;
var degrees2 = 180 / pi;
var radians = pi / 180;
var abs2 = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;
var exp = Math.exp;
var log = Math.log;
var sin = Math.sin;
var sign = Math.sign || function(x2) {
  return x2 > 0 ? 1 : x2 < 0 ? -1 : 0;
};
var sqrt = Math.sqrt;
var tan = Math.tan;
function acos(x2) {
  return x2 > 1 ? 0 : x2 < -1 ? pi : Math.acos(x2);
}
function asin(x2) {
  return x2 > 1 ? halfPi : x2 < -1 ? -halfPi : Math.asin(x2);
}

// node_modules/d3-geo/src/noop.js
function noop2() {
}

// node_modules/d3-geo/src/stream.js
function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}
var streamObjectType = {
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i3 = -1, n5 = features.length;
    while (++i3 < n5)
      streamGeometry(features[i3].geometry, stream);
  }
};
var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i3 = -1, n5 = coordinates.length;
    while (++i3 < n5)
      object = coordinates[i3], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i3 = -1, n5 = coordinates.length;
    while (++i3 < n5)
      streamLine(coordinates[i3], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i3 = -1, n5 = coordinates.length;
    while (++i3 < n5)
      streamPolygon(coordinates[i3], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i3 = -1, n5 = geometries.length;
    while (++i3 < n5)
      streamGeometry(geometries[i3], stream);
  }
};
function streamLine(coordinates, stream, closed) {
  var i3 = -1, n5 = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i3 < n5)
    coordinate = coordinates[i3], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}
function streamPolygon(coordinates, stream) {
  var i3 = -1, n5 = coordinates.length;
  stream.polygonStart();
  while (++i3 < n5)
    streamLine(coordinates[i3], stream, 1);
  stream.polygonEnd();
}
function stream_default(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
}

// node_modules/d3-geo/src/cartesian.js
function spherical(cartesian2) {
  return [atan2(cartesian2[1], cartesian2[0]), asin(cartesian2[2])];
}
function cartesian(spherical2) {
  var lambda = spherical2[0], phi = spherical2[1], cosPhi = cos(phi);
  return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
}
function cartesianDot(a3, b3) {
  return a3[0] * b3[0] + a3[1] * b3[1] + a3[2] * b3[2];
}
function cartesianCross(a3, b3) {
  return [a3[1] * b3[2] - a3[2] * b3[1], a3[2] * b3[0] - a3[0] * b3[2], a3[0] * b3[1] - a3[1] * b3[0]];
}
function cartesianAddInPlace(a3, b3) {
  a3[0] += b3[0], a3[1] += b3[1], a3[2] += b3[2];
}
function cartesianScale(vector, k2) {
  return [vector[0] * k2, vector[1] * k2, vector[2] * k2];
}
function cartesianNormalizeInPlace(d3) {
  var l3 = sqrt(d3[0] * d3[0] + d3[1] * d3[1] + d3[2] * d3[2]);
  d3[0] /= l3, d3[1] /= l3, d3[2] /= l3;
}

// node_modules/d3-geo/src/compose.js
function compose_default(a3, b3) {
  function compose(x2, y3) {
    return x2 = a3(x2, y3), b3(x2[0], x2[1]);
  }
  if (a3.invert && b3.invert)
    compose.invert = function(x2, y3) {
      return x2 = b3.invert(x2, y3), x2 && a3.invert(x2[0], x2[1]);
    };
  return compose;
}

// node_modules/d3-geo/src/rotation.js
function rotationIdentity(lambda, phi) {
  if (abs2(lambda) > pi)
    lambda -= Math.round(lambda / tau) * tau;
  return [lambda, phi];
}
rotationIdentity.invert = rotationIdentity;
function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau) ? deltaPhi || deltaGamma ? compose_default(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
}
function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    lambda += deltaLambda;
    if (abs2(lambda) > pi)
      lambda -= Math.round(lambda / tau) * tau;
    return [lambda, phi];
  };
}
function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}
function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos(deltaPhi), sinDeltaPhi = sin(deltaPhi), cosDeltaGamma = cos(deltaGamma), sinDeltaGamma = sin(deltaGamma);
  function rotation(lambda, phi) {
    var cosPhi = cos(phi), x2 = cos(lambda) * cosPhi, y3 = sin(lambda) * cosPhi, z = sin(phi), k2 = z * cosDeltaPhi + x2 * sinDeltaPhi;
    return [
      atan2(y3 * cosDeltaGamma - k2 * sinDeltaGamma, x2 * cosDeltaPhi - z * sinDeltaPhi),
      asin(k2 * cosDeltaGamma + y3 * sinDeltaGamma)
    ];
  }
  rotation.invert = function(lambda, phi) {
    var cosPhi = cos(phi), x2 = cos(lambda) * cosPhi, y3 = sin(lambda) * cosPhi, z = sin(phi), k2 = z * cosDeltaGamma - y3 * sinDeltaGamma;
    return [
      atan2(y3 * cosDeltaGamma + z * sinDeltaGamma, x2 * cosDeltaPhi + k2 * sinDeltaPhi),
      asin(k2 * cosDeltaPhi - x2 * sinDeltaPhi)
    ];
  };
  return rotation;
}
function rotation_default(rotate) {
  rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);
  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees2, coordinates[1] *= degrees2, coordinates;
  }
  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees2, coordinates[1] *= degrees2, coordinates;
  };
  return forward;
}

// node_modules/d3-geo/src/circle.js
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta)
    return;
  var cosRadius = cos(radius), sinRadius = sin(radius), step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * tau;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1)
      t0 += direction * tau;
  }
  for (var point, t4 = t0; direction > 0 ? t4 > t1 : t4 < t1; t4 -= step) {
    point = spherical([cosRadius, -sinRadius * cos(t4), -sinRadius * sin(t4)]);
    stream.point(point[0], point[1]);
  }
}
function circleRadius(cosRadius, point) {
  point = cartesian(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
}

// node_modules/d3-geo/src/clip/buffer.js
function buffer_default() {
  var lines = [], line;
  return {
    point: function(x2, y3, m3) {
      line.push([x2, y3, m3]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop2,
    rejoin: function() {
      if (lines.length > 1)
        lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}

// node_modules/d3-geo/src/pointEqual.js
function pointEqual_default(a3, b3) {
  return abs2(a3[0] - b3[0]) < epsilon && abs2(a3[1] - b3[1]) < epsilon;
}

// node_modules/d3-geo/src/clip/rejoin.js
function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other;
  this.e = entry;
  this.v = false;
  this.n = this.p = null;
}
function rejoin_default(segments, compareIntersection2, startInside, interpolate, stream) {
  var subject = [], clip = [], i3, n5;
  segments.forEach(function(segment) {
    if ((n6 = segment.length - 1) <= 0)
      return;
    var n6, p0 = segment[0], p1 = segment[n6], x2;
    if (pointEqual_default(p0, p1)) {
      if (!p0[2] && !p1[2]) {
        stream.lineStart();
        for (i3 = 0; i3 < n6; ++i3)
          stream.point((p0 = segment[i3])[0], p0[1]);
        stream.lineEnd();
        return;
      }
      p1[0] += 2 * epsilon;
    }
    subject.push(x2 = new Intersection(p0, segment, null, true));
    clip.push(x2.o = new Intersection(p0, null, x2, false));
    subject.push(x2 = new Intersection(p1, segment, null, false));
    clip.push(x2.o = new Intersection(p1, null, x2, true));
  });
  if (!subject.length)
    return;
  clip.sort(compareIntersection2);
  link(subject);
  link(clip);
  for (i3 = 0, n5 = clip.length; i3 < n5; ++i3) {
    clip[i3].e = startInside = !startInside;
  }
  var start2 = subject[0], points, point;
  while (1) {
    var current = start2, isSubject = true;
    while (current.v)
      if ((current = current.n) === start2)
        return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i3 = 0, n5 = points.length; i3 < n5; ++i3)
            stream.point((point = points[i3])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i3 = points.length - 1; i3 >= 0; --i3)
            stream.point((point = points[i3])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
}
function link(array2) {
  if (!(n5 = array2.length))
    return;
  var n5, i3 = 0, a3 = array2[0], b3;
  while (++i3 < n5) {
    a3.n = b3 = array2[i3];
    b3.p = a3;
    a3 = b3;
  }
  a3.n = b3 = array2[0];
  b3.p = a3;
}

// node_modules/d3-geo/src/polygonContains.js
function longitude(point) {
  return abs2(point[0]) <= pi ? point[0] : sign(point[0]) * ((abs2(point[0]) + pi) % tau - pi);
}
function polygonContains_default(polygon, point) {
  var lambda = longitude(point), phi = point[1], sinPhi = sin(phi), normal = [sin(lambda), -cos(lambda), 0], angle = 0, winding = 0;
  var sum = new Adder();
  if (sinPhi === 1)
    phi = halfPi + epsilon;
  else if (sinPhi === -1)
    phi = -halfPi - epsilon;
  for (var i3 = 0, n5 = polygon.length; i3 < n5; ++i3) {
    if (!(m3 = (ring = polygon[i3]).length))
      continue;
    var ring, m3, point0 = ring[m3 - 1], lambda0 = longitude(point0), phi0 = point0[1] / 2 + quarterPi, sinPhi0 = sin(phi0), cosPhi0 = cos(phi0);
    for (var j = 0; j < m3; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j], lambda1 = longitude(point1), phi1 = point1[1] / 2 + quarterPi, sinPhi1 = sin(phi1), cosPhi1 = cos(phi1), delta = lambda1 - lambda0, sign2 = delta >= 0 ? 1 : -1, absDelta = sign2 * delta, antimeridian = absDelta > pi, k2 = sinPhi0 * sinPhi1;
      sum.add(atan2(k2 * sign2 * sin(absDelta), cosPhi0 * cosPhi1 + k2 * cos(absDelta)));
      angle += antimeridian ? delta + sign2 * tau : delta;
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }
  return (angle < -epsilon || angle < epsilon && sum < -epsilon22) ^ winding & 1;
}

// node_modules/d3-geo/src/clip/index.js
function clip_default(pointVisible, clipLine, interpolate, start2) {
  return function(sink) {
    var line = clipLine(sink), ringBuffer = buffer_default(), ringSink = clipLine(ringBuffer), polygonStarted = false, polygon, segments, ring;
    var clip = {
      point,
      lineStart,
      lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge(segments);
        var startInside = polygonContains_default(polygon, start2);
        if (segments.length) {
          if (!polygonStarted)
            sink.polygonStart(), polygonStarted = true;
          rejoin_default(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted)
            sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted)
          sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };
    function point(lambda, phi) {
      if (pointVisible(lambda, phi))
        sink.point(lambda, phi);
    }
    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }
    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }
    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }
    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }
    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }
    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();
      var clean = ringSink.clean(), ringSegments = ringBuffer.result(), i3, n5 = ringSegments.length, m3, segment, point2;
      ring.pop();
      polygon.push(ring);
      ring = null;
      if (!n5)
        return;
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m3 = segment.length - 1) > 0) {
          if (!polygonStarted)
            sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i3 = 0; i3 < m3; ++i3)
            sink.point((point2 = segment[i3])[0], point2[1]);
          sink.lineEnd();
        }
        return;
      }
      if (n5 > 1 && clean & 2)
        ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
      segments.push(ringSegments.filter(validSegment));
    }
    return clip;
  };
}
function validSegment(segment) {
  return segment.length > 1;
}
function compareIntersection(a3, b3) {
  return ((a3 = a3.x)[0] < 0 ? a3[1] - halfPi - epsilon : halfPi - a3[1]) - ((b3 = b3.x)[0] < 0 ? b3[1] - halfPi - epsilon : halfPi - b3[1]);
}

// node_modules/d3-geo/src/clip/antimeridian.js
var antimeridian_default = clip_default(
  function() {
    return true;
  },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi, -halfPi]
);
function clipAntimeridianLine(stream) {
  var lambda0 = NaN, phi0 = NaN, sign0 = NaN, clean;
  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi : -pi, delta = abs2(lambda1 - lambda0);
      if (abs2(delta - pi) < epsilon) {
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi : -halfPi);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi) {
        if (abs2(lambda0 - sign0) < epsilon)
          lambda0 -= sign0 * epsilon;
        if (abs2(lambda1 - sign1) < epsilon)
          lambda1 -= sign1 * epsilon;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean;
    }
  };
}
function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0, cosPhi1, sinLambda0Lambda1 = sin(lambda0 - lambda1);
  return abs2(sinLambda0Lambda1) > epsilon ? atan((sin(phi0) * (cosPhi1 = cos(phi1)) * sin(lambda1) - sin(phi1) * (cosPhi0 = cos(phi0)) * sin(lambda0)) / (cosPhi0 * cosPhi1 * sinLambda0Lambda1)) : (phi0 + phi1) / 2;
}
function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * halfPi;
    stream.point(-pi, phi);
    stream.point(0, phi);
    stream.point(pi, phi);
    stream.point(pi, 0);
    stream.point(pi, -phi);
    stream.point(0, -phi);
    stream.point(-pi, -phi);
    stream.point(-pi, 0);
    stream.point(-pi, phi);
  } else if (abs2(from[0] - to[0]) > epsilon) {
    var lambda = from[0] < to[0] ? pi : -pi;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}

// node_modules/d3-geo/src/clip/circle.js
function circle_default(radius) {
  var cr = cos(radius), delta = 6 * radians, smallRadius = cr > 0, notHemisphere = abs2(cr) > epsilon;
  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }
  function visible(lambda, phi) {
    return cos(lambda) * cos(phi) > cr;
  }
  function clipLine(stream) {
    var point0, c0, v0, v00, clean;
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi], point2, v2 = visible(lambda, phi), c4 = smallRadius ? v2 ? 0 : code(lambda, phi) : v2 ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
        if (!point0 && (v00 = v0 = v2))
          stream.lineStart();
        if (v2 !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual_default(point0, point2) || pointEqual_default(point1, point2))
            point1[2] = 1;
        }
        if (v2 !== v0) {
          clean = 0;
          if (v2) {
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1], 2);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v2) {
          var t4;
          if (!(c4 & c0) && (t4 = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t4[0][0], t4[0][1]);
              stream.point(t4[1][0], t4[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t4[1][0], t4[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t4[0][0], t4[0][1], 3);
            }
          }
        }
        if (v2 && (!point0 || !pointEqual_default(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v2, c0 = c4;
      },
      lineEnd: function() {
        if (v0)
          stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | (v00 && v0) << 1;
      }
    };
  }
  function intersect(a3, b3, two) {
    var pa = cartesian(a3), pb = cartesian(b3);
    var n1 = [1, 0, 0], n22 = cartesianCross(pa, pb), n2n2 = cartesianDot(n22, n22), n1n2 = n22[0], determinant = n2n2 - n1n2 * n1n2;
    if (!determinant)
      return !two && a3;
    var c1 = cr * n2n2 / determinant, c22 = -cr * n1n2 / determinant, n1xn2 = cartesianCross(n1, n22), A2 = cartesianScale(n1, c1), B = cartesianScale(n22, c22);
    cartesianAddInPlace(A2, B);
    var u3 = n1xn2, w2 = cartesianDot(A2, u3), uu = cartesianDot(u3, u3), t22 = w2 * w2 - uu * (cartesianDot(A2, A2) - 1);
    if (t22 < 0)
      return;
    var t4 = sqrt(t22), q = cartesianScale(u3, (-w2 - t4) / uu);
    cartesianAddInPlace(q, A2);
    q = spherical(q);
    if (!two)
      return q;
    var lambda0 = a3[0], lambda1 = b3[0], phi0 = a3[1], phi1 = b3[1], z;
    if (lambda1 < lambda0)
      z = lambda0, lambda0 = lambda1, lambda1 = z;
    var delta2 = lambda1 - lambda0, polar = abs2(delta2 - pi) < epsilon, meridian = polar || delta2 < epsilon;
    if (!polar && phi1 < phi0)
      z = phi0, phi0 = phi1, phi1 = z;
    if (meridian ? polar ? phi0 + phi1 > 0 ^ q[1] < (abs2(q[0] - lambda0) < epsilon ? phi0 : phi1) : phi0 <= q[1] && q[1] <= phi1 : delta2 > pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale(u3, (-w2 + t4) / uu);
      cartesianAddInPlace(q1, A2);
      return [q, spherical(q1)];
    }
  }
  function code(lambda, phi) {
    var r6 = smallRadius ? radius : pi - radius, code2 = 0;
    if (lambda < -r6)
      code2 |= 1;
    else if (lambda > r6)
      code2 |= 2;
    if (phi < -r6)
      code2 |= 4;
    else if (phi > r6)
      code2 |= 8;
    return code2;
  }
  return clip_default(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi, radius - pi]);
}

// node_modules/d3-geo/src/clip/line.js
function line_default(a3, b3, x05, y05, x12, y12) {
  var ax = a3[0], ay = a3[1], bx = b3[0], by = b3[1], t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay, r6;
  r6 = x05 - ax;
  if (!dx && r6 > 0)
    return;
  r6 /= dx;
  if (dx < 0) {
    if (r6 < t0)
      return;
    if (r6 < t1)
      t1 = r6;
  } else if (dx > 0) {
    if (r6 > t1)
      return;
    if (r6 > t0)
      t0 = r6;
  }
  r6 = x12 - ax;
  if (!dx && r6 < 0)
    return;
  r6 /= dx;
  if (dx < 0) {
    if (r6 > t1)
      return;
    if (r6 > t0)
      t0 = r6;
  } else if (dx > 0) {
    if (r6 < t0)
      return;
    if (r6 < t1)
      t1 = r6;
  }
  r6 = y05 - ay;
  if (!dy && r6 > 0)
    return;
  r6 /= dy;
  if (dy < 0) {
    if (r6 < t0)
      return;
    if (r6 < t1)
      t1 = r6;
  } else if (dy > 0) {
    if (r6 > t1)
      return;
    if (r6 > t0)
      t0 = r6;
  }
  r6 = y12 - ay;
  if (!dy && r6 < 0)
    return;
  r6 /= dy;
  if (dy < 0) {
    if (r6 > t1)
      return;
    if (r6 > t0)
      t0 = r6;
  } else if (dy > 0) {
    if (r6 < t0)
      return;
    if (r6 < t1)
      t1 = r6;
  }
  if (t0 > 0)
    a3[0] = ax + t0 * dx, a3[1] = ay + t0 * dy;
  if (t1 < 1)
    b3[0] = ax + t1 * dx, b3[1] = ay + t1 * dy;
  return true;
}

// node_modules/d3-geo/src/clip/rectangle.js
var clipMax = 1e9;
var clipMin = -clipMax;
function clipRectangle(x05, y05, x12, y12) {
  function visible(x2, y3) {
    return x05 <= x2 && x2 <= x12 && y05 <= y3 && y3 <= y12;
  }
  function interpolate(from, to, direction, stream) {
    var a3 = 0, a1 = 0;
    if (from == null || (a3 = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0) {
      do
        stream.point(a3 === 0 || a3 === 3 ? x05 : x12, a3 > 1 ? y12 : y05);
      while ((a3 = (a3 + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }
  function corner(p3, direction) {
    return abs2(p3[0] - x05) < epsilon ? direction > 0 ? 0 : 3 : abs2(p3[0] - x12) < epsilon ? direction > 0 ? 2 : 1 : abs2(p3[1] - y05) < epsilon ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
  }
  function compareIntersection2(a3, b3) {
    return comparePoint(a3.x, b3.x);
  }
  function comparePoint(a3, b3) {
    var ca = corner(a3, 1), cb = corner(b3, 1);
    return ca !== cb ? ca - cb : ca === 0 ? b3[1] - a3[1] : ca === 1 ? a3[0] - b3[0] : ca === 2 ? a3[1] - b3[1] : b3[0] - a3[0];
  }
  return function(stream) {
    var activeStream = stream, bufferStream = buffer_default(), segments, polygon, ring, x__, y__, v__, x_, y_, v_, first, clean;
    var clipStream = {
      point,
      lineStart,
      lineEnd,
      polygonStart,
      polygonEnd
    };
    function point(x2, y3) {
      if (visible(x2, y3))
        activeStream.point(x2, y3);
    }
    function polygonInside() {
      var winding = 0;
      for (var i3 = 0, n5 = polygon.length; i3 < n5; ++i3) {
        for (var ring2 = polygon[i3], j = 1, m3 = ring2.length, point2 = ring2[0], a0, a1, b0 = point2[0], b1 = point2[1]; j < m3; ++j) {
          a0 = b0, a1 = b1, point2 = ring2[j], b0 = point2[0], b1 = point2[1];
          if (a1 <= y12) {
            if (b1 > y12 && (b0 - a0) * (y12 - a1) > (b1 - a1) * (x05 - a0))
              ++winding;
          } else {
            if (b1 <= y12 && (b0 - a0) * (y12 - a1) < (b1 - a1) * (x05 - a0))
              --winding;
          }
        }
      }
      return winding;
    }
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }
    function polygonEnd() {
      var startInside = polygonInside(), cleanInside = clean && startInside, visible2 = (segments = merge(segments)).length;
      if (cleanInside || visible2) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible2) {
          rejoin_default(segments, compareIntersection2, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }
    function lineStart() {
      clipStream.point = linePoint;
      if (polygon)
        polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_)
          bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_)
        activeStream.lineEnd();
    }
    function linePoint(x2, y3) {
      var v2 = visible(x2, y3);
      if (polygon)
        ring.push([x2, y3]);
      if (first) {
        x__ = x2, y__ = y3, v__ = v2;
        first = false;
        if (v2) {
          activeStream.lineStart();
          activeStream.point(x2, y3);
        }
      } else {
        if (v2 && v_)
          activeStream.point(x2, y3);
        else {
          var a3 = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))], b3 = [x2 = Math.max(clipMin, Math.min(clipMax, x2)), y3 = Math.max(clipMin, Math.min(clipMax, y3))];
          if (line_default(a3, b3, x05, y05, x12, y12)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a3[0], a3[1]);
            }
            activeStream.point(b3[0], b3[1]);
            if (!v2)
              activeStream.lineEnd();
            clean = false;
          } else if (v2) {
            activeStream.lineStart();
            activeStream.point(x2, y3);
            clean = false;
          }
        }
      }
      x_ = x2, y_ = y3, v_ = v2;
    }
    return clipStream;
  };
}

// node_modules/d3-geo/src/identity.js
var identity_default = (x2) => x2;

// node_modules/d3-geo/src/path/area.js
var areaSum = new Adder();
var areaRingSum = new Adder();
var x00;
var y00;
var x0;
var y0;
var areaStream = {
  point: noop2,
  lineStart: noop2,
  lineEnd: noop2,
  polygonStart: function() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop2;
    areaSum.add(abs2(areaRingSum));
    areaRingSum = new Adder();
  },
  result: function() {
    var area = areaSum / 2;
    areaSum = new Adder();
    return area;
  }
};
function areaRingStart() {
  areaStream.point = areaPointFirst;
}
function areaPointFirst(x2, y3) {
  areaStream.point = areaPoint;
  x00 = x0 = x2, y00 = y0 = y3;
}
function areaPoint(x2, y3) {
  areaRingSum.add(y0 * x2 - x0 * y3);
  x0 = x2, y0 = y3;
}
function areaRingEnd() {
  areaPoint(x00, y00);
}
var area_default = areaStream;

// node_modules/d3-geo/src/path/bounds.js
var x02 = Infinity;
var y02 = x02;
var x1 = -x02;
var y1 = x1;
var boundsStream = {
  point: boundsPoint,
  lineStart: noop2,
  lineEnd: noop2,
  polygonStart: noop2,
  polygonEnd: noop2,
  result: function() {
    var bounds = [[x02, y02], [x1, y1]];
    x1 = y1 = -(y02 = x02 = Infinity);
    return bounds;
  }
};
function boundsPoint(x2, y3) {
  if (x2 < x02)
    x02 = x2;
  if (x2 > x1)
    x1 = x2;
  if (y3 < y02)
    y02 = y3;
  if (y3 > y1)
    y1 = y3;
}
var bounds_default = boundsStream;

// node_modules/d3-geo/src/path/centroid.js
var X0 = 0;
var Y0 = 0;
var Z0 = 0;
var X1 = 0;
var Y1 = 0;
var Z1 = 0;
var X2 = 0;
var Y2 = 0;
var Z2 = 0;
var x002;
var y002;
var x03;
var y03;
var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2] : Z1 ? [X1 / Z1, Y1 / Z1] : Z0 ? [X0 / Z0, Y0 / Z0] : [NaN, NaN];
    X0 = Y0 = Z0 = X1 = Y1 = Z1 = X2 = Y2 = Z2 = 0;
    return centroid;
  }
};
function centroidPoint(x2, y3) {
  X0 += x2;
  Y0 += y3;
  ++Z0;
}
function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}
function centroidPointFirstLine(x2, y3) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x03 = x2, y03 = y3);
}
function centroidPointLine(x2, y3) {
  var dx = x2 - x03, dy = y3 - y03, z = sqrt(dx * dx + dy * dy);
  X1 += z * (x03 + x2) / 2;
  Y1 += z * (y03 + y3) / 2;
  Z1 += z;
  centroidPoint(x03 = x2, y03 = y3);
}
function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}
function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}
function centroidRingEnd() {
  centroidPointRing(x002, y002);
}
function centroidPointFirstRing(x2, y3) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x002 = x03 = x2, y002 = y03 = y3);
}
function centroidPointRing(x2, y3) {
  var dx = x2 - x03, dy = y3 - y03, z = sqrt(dx * dx + dy * dy);
  X1 += z * (x03 + x2) / 2;
  Y1 += z * (y03 + y3) / 2;
  Z1 += z;
  z = y03 * x2 - x03 * y3;
  X2 += z * (x03 + x2);
  Y2 += z * (y03 + y3);
  Z2 += z * 3;
  centroidPoint(x03 = x2, y03 = y3);
}
var centroid_default = centroidStream;

// node_modules/d3-geo/src/path/context.js
function PathContext(context) {
  this._context = context;
}
PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_2) {
    return this._radius = _2, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0)
      this._context.closePath();
    this._point = NaN;
  },
  point: function(x2, y3) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x2, y3);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x2, y3);
        break;
      }
      default: {
        this._context.moveTo(x2 + this._radius, y3);
        this._context.arc(x2, y3, this._radius, 0, tau);
        break;
      }
    }
  },
  result: noop2
};

// node_modules/d3-geo/src/path/measure.js
var lengthSum = new Adder();
var lengthRing;
var x003;
var y003;
var x04;
var y04;
var lengthStream = {
  point: noop2,
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    if (lengthRing)
      lengthPoint(x003, y003);
    lengthStream.point = noop2;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum;
    lengthSum = new Adder();
    return length;
  }
};
function lengthPointFirst(x2, y3) {
  lengthStream.point = lengthPoint;
  x003 = x04 = x2, y003 = y04 = y3;
}
function lengthPoint(x2, y3) {
  x04 -= x2, y04 -= y3;
  lengthSum.add(sqrt(x04 * x04 + y04 * y04));
  x04 = x2, y04 = y3;
}
var measure_default = lengthStream;

// node_modules/d3-geo/src/path/string.js
var cacheDigits;
var cacheAppend;
var cacheRadius;
var cacheCircle;
var PathString = class {
  constructor(digits) {
    this._append = digits == null ? append : appendRound(digits);
    this._radius = 4.5;
    this._ = "";
  }
  pointRadius(_2) {
    this._radius = +_2;
    return this;
  }
  polygonStart() {
    this._line = 0;
  }
  polygonEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line === 0)
      this._ += "Z";
    this._point = NaN;
  }
  point(x2, y3) {
    switch (this._point) {
      case 0: {
        this._append`M${x2},${y3}`;
        this._point = 1;
        break;
      }
      case 1: {
        this._append`L${x2},${y3}`;
        break;
      }
      default: {
        this._append`M${x2},${y3}`;
        if (this._radius !== cacheRadius || this._append !== cacheAppend) {
          const r6 = this._radius;
          const s4 = this._;
          this._ = "";
          this._append`m0,${r6}a${r6},${r6} 0 1,1 0,${-2 * r6}a${r6},${r6} 0 1,1 0,${2 * r6}z`;
          cacheRadius = r6;
          cacheAppend = this._append;
          cacheCircle = this._;
          this._ = s4;
        }
        this._ += cacheCircle;
        break;
      }
    }
  }
  result() {
    const result = this._;
    this._ = "";
    return result.length ? result : null;
  }
};
function append(strings) {
  let i3 = 1;
  this._ += strings[0];
  for (const j = strings.length; i3 < j; ++i3) {
    this._ += arguments[i3] + strings[i3];
  }
}
function appendRound(digits) {
  const d3 = Math.floor(digits);
  if (!(d3 >= 0))
    throw new RangeError(`invalid digits: ${digits}`);
  if (d3 > 15)
    return append;
  if (d3 !== cacheDigits) {
    const k2 = 10 ** d3;
    cacheDigits = d3;
    cacheAppend = function append2(strings) {
      let i3 = 1;
      this._ += strings[0];
      for (const j = strings.length; i3 < j; ++i3) {
        this._ += Math.round(arguments[i3] * k2) / k2 + strings[i3];
      }
    };
  }
  return cacheAppend;
}

// node_modules/d3-geo/src/path/index.js
function path_default(projection2, context) {
  let digits = 3, pointRadius = 4.5, projectionStream, contextStream;
  function path(object) {
    if (object) {
      if (typeof pointRadius === "function")
        contextStream.pointRadius(+pointRadius.apply(this, arguments));
      stream_default(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }
  path.area = function(object) {
    stream_default(object, projectionStream(area_default));
    return area_default.result();
  };
  path.measure = function(object) {
    stream_default(object, projectionStream(measure_default));
    return measure_default.result();
  };
  path.bounds = function(object) {
    stream_default(object, projectionStream(bounds_default));
    return bounds_default.result();
  };
  path.centroid = function(object) {
    stream_default(object, projectionStream(centroid_default));
    return centroid_default.result();
  };
  path.projection = function(_2) {
    if (!arguments.length)
      return projection2;
    projectionStream = _2 == null ? (projection2 = null, identity_default) : (projection2 = _2).stream;
    return path;
  };
  path.context = function(_2) {
    if (!arguments.length)
      return context;
    contextStream = _2 == null ? (context = null, new PathString(digits)) : new PathContext(context = _2);
    if (typeof pointRadius !== "function")
      contextStream.pointRadius(pointRadius);
    return path;
  };
  path.pointRadius = function(_2) {
    if (!arguments.length)
      return pointRadius;
    pointRadius = typeof _2 === "function" ? _2 : (contextStream.pointRadius(+_2), +_2);
    return path;
  };
  path.digits = function(_2) {
    if (!arguments.length)
      return digits;
    if (_2 == null)
      digits = null;
    else {
      const d3 = Math.floor(_2);
      if (!(d3 >= 0))
        throw new RangeError(`invalid digits: ${_2}`);
      digits = d3;
    }
    if (context === null)
      contextStream = new PathString(digits);
    return path;
  };
  return path.projection(projection2).digits(digits).context(context);
}

// node_modules/d3-geo/src/transform.js
function transformer(methods) {
  return function(stream) {
    var s4 = new TransformStream();
    for (var key in methods)
      s4[key] = methods[key];
    s4.stream = stream;
    return s4;
  };
}
function TransformStream() {
}
TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x2, y3) {
    this.stream.point(x2, y3);
  },
  sphere: function() {
    this.stream.sphere();
  },
  lineStart: function() {
    this.stream.lineStart();
  },
  lineEnd: function() {
    this.stream.lineEnd();
  },
  polygonStart: function() {
    this.stream.polygonStart();
  },
  polygonEnd: function() {
    this.stream.polygonEnd();
  }
};

// node_modules/d3-geo/src/projection/fit.js
function fit(projection2, fitBounds, object) {
  var clip = projection2.clipExtent && projection2.clipExtent();
  projection2.scale(150).translate([0, 0]);
  if (clip != null)
    projection2.clipExtent(null);
  stream_default(object, projection2.stream(bounds_default));
  fitBounds(bounds_default.result());
  if (clip != null)
    projection2.clipExtent(clip);
  return projection2;
}
function fitExtent(projection2, extent, object) {
  return fit(projection2, function(b3) {
    var w2 = extent[1][0] - extent[0][0], h3 = extent[1][1] - extent[0][1], k2 = Math.min(w2 / (b3[1][0] - b3[0][0]), h3 / (b3[1][1] - b3[0][1])), x2 = +extent[0][0] + (w2 - k2 * (b3[1][0] + b3[0][0])) / 2, y3 = +extent[0][1] + (h3 - k2 * (b3[1][1] + b3[0][1])) / 2;
    projection2.scale(150 * k2).translate([x2, y3]);
  }, object);
}
function fitSize(projection2, size, object) {
  return fitExtent(projection2, [[0, 0], size], object);
}
function fitWidth(projection2, width, object) {
  return fit(projection2, function(b3) {
    var w2 = +width, k2 = w2 / (b3[1][0] - b3[0][0]), x2 = (w2 - k2 * (b3[1][0] + b3[0][0])) / 2, y3 = -k2 * b3[0][1];
    projection2.scale(150 * k2).translate([x2, y3]);
  }, object);
}
function fitHeight(projection2, height, object) {
  return fit(projection2, function(b3) {
    var h3 = +height, k2 = h3 / (b3[1][1] - b3[0][1]), x2 = -k2 * b3[0][0], y3 = (h3 - k2 * (b3[1][1] + b3[0][1])) / 2;
    projection2.scale(150 * k2).translate([x2, y3]);
  }, object);
}

// node_modules/d3-geo/src/projection/resample.js
var maxDepth = 16;
var cosMinDistance = cos(30 * radians);
function resample_default(project, delta2) {
  return +delta2 ? resample(project, delta2) : resampleNone(project);
}
function resampleNone(project) {
  return transformer({
    point: function(x2, y3) {
      x2 = project(x2, y3);
      this.stream.point(x2[0], x2[1]);
    }
  });
}
function resample(project, delta2) {
  function resampleLineTo(x05, y05, lambda0, a0, b0, c0, x12, y12, lambda1, a1, b1, c1, depth, stream) {
    var dx = x12 - x05, dy = y12 - y05, d22 = dx * dx + dy * dy;
    if (d22 > 4 * delta2 && depth--) {
      var a3 = a0 + a1, b3 = b0 + b1, c4 = c0 + c1, m3 = sqrt(a3 * a3 + b3 * b3 + c4 * c4), phi2 = asin(c4 /= m3), lambda2 = abs2(abs2(c4) - 1) < epsilon || abs2(lambda0 - lambda1) < epsilon ? (lambda0 + lambda1) / 2 : atan2(b3, a3), p3 = project(lambda2, phi2), x2 = p3[0], y22 = p3[1], dx2 = x2 - x05, dy2 = y22 - y05, dz = dy * dx2 - dx * dy2;
      if (dz * dz / d22 > delta2 || abs2((dx * dx2 + dy * dy2) / d22 - 0.5) > 0.3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
        resampleLineTo(x05, y05, lambda0, a0, b0, c0, x2, y22, lambda2, a3 /= m3, b3 /= m3, c4, depth, stream);
        stream.point(x2, y22);
        resampleLineTo(x2, y22, lambda2, a3, b3, c4, x12, y12, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x004, y004, a00, b00, c00, lambda0, x05, y05, a0, b0, c0;
    var resampleStream = {
      point,
      lineStart,
      lineEnd,
      polygonStart: function() {
        stream.polygonStart();
        resampleStream.lineStart = ringStart;
      },
      polygonEnd: function() {
        stream.polygonEnd();
        resampleStream.lineStart = lineStart;
      }
    };
    function point(x2, y3) {
      x2 = project(x2, y3);
      stream.point(x2[0], x2[1]);
    }
    function lineStart() {
      x05 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }
    function linePoint(lambda, phi) {
      var c4 = cartesian([lambda, phi]), p3 = project(lambda, phi);
      resampleLineTo(x05, y05, lambda0, a0, b0, c0, x05 = p3[0], y05 = p3[1], lambda0 = lambda, a0 = c4[0], b0 = c4[1], c0 = c4[2], maxDepth, stream);
      stream.point(x05, y05);
    }
    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }
    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }
    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x004 = x05, y004 = y05, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }
    function ringEnd() {
      resampleLineTo(x05, y05, lambda0, a0, b0, c0, x004, y004, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }
    return resampleStream;
  };
}

// node_modules/d3-geo/src/projection/index.js
var transformRadians = transformer({
  point: function(x2, y3) {
    this.stream.point(x2 * radians, y3 * radians);
  }
});
function transformRotate(rotate) {
  return transformer({
    point: function(x2, y3) {
      var r6 = rotate(x2, y3);
      return this.stream.point(r6[0], r6[1]);
    }
  });
}
function scaleTranslate(k2, dx, dy, sx, sy) {
  function transform2(x2, y3) {
    x2 *= sx;
    y3 *= sy;
    return [dx + k2 * x2, dy - k2 * y3];
  }
  transform2.invert = function(x2, y3) {
    return [(x2 - dx) / k2 * sx, (dy - y3) / k2 * sy];
  };
  return transform2;
}
function scaleTranslateRotate(k2, dx, dy, sx, sy, alpha) {
  if (!alpha)
    return scaleTranslate(k2, dx, dy, sx, sy);
  var cosAlpha = cos(alpha), sinAlpha = sin(alpha), a3 = cosAlpha * k2, b3 = sinAlpha * k2, ai = cosAlpha / k2, bi = sinAlpha / k2, ci = (sinAlpha * dy - cosAlpha * dx) / k2, fi = (sinAlpha * dx + cosAlpha * dy) / k2;
  function transform2(x2, y3) {
    x2 *= sx;
    y3 *= sy;
    return [a3 * x2 - b3 * y3 + dx, dy - b3 * x2 - a3 * y3];
  }
  transform2.invert = function(x2, y3) {
    return [sx * (ai * x2 - bi * y3 + ci), sy * (fi - bi * x2 - ai * y3)];
  };
  return transform2;
}
function projection(project) {
  return projectionMutator(function() {
    return project;
  })();
}
function projectionMutator(projectAt) {
  var project, k2 = 150, x2 = 480, y3 = 250, lambda = 0, phi = 0, deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, alpha = 0, sx = 1, sy = 1, theta = null, preclip = antimeridian_default, x05 = null, y05, x12, y12, postclip = identity_default, delta2 = 0.5, projectResample, projectTransform, projectRotateTransform, cache, cacheStream;
  function projection2(point) {
    return projectRotateTransform(point[0] * radians, point[1] * radians);
  }
  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * degrees2, point[1] * degrees2];
  }
  projection2.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };
  projection2.preclip = function(_2) {
    return arguments.length ? (preclip = _2, theta = void 0, reset()) : preclip;
  };
  projection2.postclip = function(_2) {
    return arguments.length ? (postclip = _2, x05 = y05 = x12 = y12 = null, reset()) : postclip;
  };
  projection2.clipAngle = function(_2) {
    return arguments.length ? (preclip = +_2 ? circle_default(theta = _2 * radians) : (theta = null, antimeridian_default), reset()) : theta * degrees2;
  };
  projection2.clipExtent = function(_2) {
    return arguments.length ? (postclip = _2 == null ? (x05 = y05 = x12 = y12 = null, identity_default) : clipRectangle(x05 = +_2[0][0], y05 = +_2[0][1], x12 = +_2[1][0], y12 = +_2[1][1]), reset()) : x05 == null ? null : [[x05, y05], [x12, y12]];
  };
  projection2.scale = function(_2) {
    return arguments.length ? (k2 = +_2, recenter()) : k2;
  };
  projection2.translate = function(_2) {
    return arguments.length ? (x2 = +_2[0], y3 = +_2[1], recenter()) : [x2, y3];
  };
  projection2.center = function(_2) {
    return arguments.length ? (lambda = _2[0] % 360 * radians, phi = _2[1] % 360 * radians, recenter()) : [lambda * degrees2, phi * degrees2];
  };
  projection2.rotate = function(_2) {
    return arguments.length ? (deltaLambda = _2[0] % 360 * radians, deltaPhi = _2[1] % 360 * radians, deltaGamma = _2.length > 2 ? _2[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees2, deltaPhi * degrees2, deltaGamma * degrees2];
  };
  projection2.angle = function(_2) {
    return arguments.length ? (alpha = _2 % 360 * radians, recenter()) : alpha * degrees2;
  };
  projection2.reflectX = function(_2) {
    return arguments.length ? (sx = _2 ? -1 : 1, recenter()) : sx < 0;
  };
  projection2.reflectY = function(_2) {
    return arguments.length ? (sy = _2 ? -1 : 1, recenter()) : sy < 0;
  };
  projection2.precision = function(_2) {
    return arguments.length ? (projectResample = resample_default(projectTransform, delta2 = _2 * _2), reset()) : sqrt(delta2);
  };
  projection2.fitExtent = function(extent, object) {
    return fitExtent(projection2, extent, object);
  };
  projection2.fitSize = function(size, object) {
    return fitSize(projection2, size, object);
  };
  projection2.fitWidth = function(width, object) {
    return fitWidth(projection2, width, object);
  };
  projection2.fitHeight = function(height, object) {
    return fitHeight(projection2, height, object);
  };
  function recenter() {
    var center = scaleTranslateRotate(k2, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)), transform2 = scaleTranslateRotate(k2, x2 - center[0], y3 - center[1], sx, sy, alpha);
    rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = compose_default(project, transform2);
    projectRotateTransform = compose_default(rotate, projectTransform);
    projectResample = resample_default(projectTransform, delta2);
    return reset();
  }
  function reset() {
    cache = cacheStream = null;
    return projection2;
  }
  return function() {
    project = projectAt.apply(this, arguments);
    projection2.invert = project.invert && invert;
    return recenter();
  };
}

// node_modules/d3-geo/src/projection/mercator.js
function mercatorRaw(lambda, phi) {
  return [lambda, log(tan((halfPi + phi) / 2))];
}
mercatorRaw.invert = function(x2, y3) {
  return [x2, 2 * atan(exp(y3)) - halfPi];
};
function mercator_default() {
  return mercatorProjection(mercatorRaw).scale(961 / tau);
}
function mercatorProjection(project) {
  var m3 = projection(project), center = m3.center, scale = m3.scale, translate = m3.translate, clipExtent = m3.clipExtent, x05 = null, y05, x12, y12;
  m3.scale = function(_2) {
    return arguments.length ? (scale(_2), reclip()) : scale();
  };
  m3.translate = function(_2) {
    return arguments.length ? (translate(_2), reclip()) : translate();
  };
  m3.center = function(_2) {
    return arguments.length ? (center(_2), reclip()) : center();
  };
  m3.clipExtent = function(_2) {
    return arguments.length ? (_2 == null ? x05 = y05 = x12 = y12 = null : (x05 = +_2[0][0], y05 = +_2[0][1], x12 = +_2[1][0], y12 = +_2[1][1]), reclip()) : x05 == null ? null : [[x05, y05], [x12, y12]];
  };
  function reclip() {
    var k2 = pi * scale(), t4 = m3(rotation_default(m3.rotate()).invert([0, 0]));
    return clipExtent(x05 == null ? [[t4[0] - k2, t4[1] - k2], [t4[0] + k2, t4[1] + k2]] : project === mercatorRaw ? [[Math.max(t4[0] - k2, x05), y05], [Math.min(t4[0] + k2, x12), y12]] : [[x05, Math.max(t4[1] - k2, y05)], [x12, Math.min(t4[1] + k2, y12)]]);
  }
  return reclip();
}

// node_modules/d3-zoom/src/constant.js
var constant_default4 = (x2) => () => x2;

// node_modules/d3-zoom/src/event.js
function ZoomEvent(type2, {
  sourceEvent,
  target,
  transform: transform2,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type2, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    transform: { value: transform2, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}

// node_modules/d3-zoom/src/transform.js
function Transform(k2, x2, y3) {
  this.k = k2;
  this.x = x2;
  this.y = y3;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k2) {
    return k2 === 1 ? this : new Transform(this.k * k2, this.x, this.y);
  },
  translate: function(x2, y3) {
    return x2 === 0 & y3 === 0 ? this : new Transform(this.k, this.x + this.k * x2, this.y + this.k * y3);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x2) {
    return x2 * this.k + this.x;
  },
  applyY: function(y3) {
    return y3 * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x2) {
    return (x2 - this.x) / this.k;
  },
  invertY: function(y3) {
    return (y3 - this.y) / this.k;
  },
  rescaleX: function(x2) {
    return x2.copy().domain(x2.range().map(this.invertX, this).map(x2.invert, x2));
  },
  rescaleY: function(y3) {
    return y3.copy().domain(y3.range().map(this.invertY, this).map(y3.invert, y3));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity2 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom)
    if (!(node = node.parentNode))
      return identity2;
  return node.__zoom;
}

// node_modules/d3-zoom/src/noevent.js
function nopropagation2(event) {
  event.stopImmediatePropagation();
}
function noevent_default3(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// node_modules/d3-zoom/src/zoom.js
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === "wheel") && !event.button;
}
function defaultExtent() {
  var e4 = this;
  if (e4 instanceof SVGElement) {
    e4 = e4.ownerSVGElement || e4;
    if (e4.hasAttribute("viewBox")) {
      e4 = e4.viewBox.baseVal;
      return [[e4.x, e4.y], [e4.x + e4.width, e4.y + e4.height]];
    }
    return [[0, 0], [e4.width.baseVal.value, e4.height.baseVal.value]];
  }
  return [[0, 0], [e4.clientWidth, e4.clientHeight]];
}
function defaultTransform() {
  return this.__zoom || identity2;
}
function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform2, extent, translateExtent) {
  var dx0 = transform2.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform2.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform2.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform2.invertY(extent[1][1]) - translateExtent[1][1];
  return transform2.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}
function zoom_default2() {
  var filter2 = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = zoom_default, listeners = dispatch_default("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
  function zoom(selection2) {
    selection2.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  zoom.transform = function(collection, transform2, point, event) {
    var selection2 = collection.selection ? collection.selection() : collection;
    selection2.property("__zoom", defaultTransform);
    if (collection !== selection2) {
      schedule(collection, transform2, point, event);
    } else {
      selection2.interrupt().each(function() {
        gesture(this, arguments).event(event).start().zoom(null, typeof transform2 === "function" ? transform2.apply(this, arguments) : transform2).end();
      });
    }
  };
  zoom.scaleBy = function(selection2, k2, p3, event) {
    zoom.scaleTo(selection2, function() {
      var k0 = this.__zoom.k, k1 = typeof k2 === "function" ? k2.apply(this, arguments) : k2;
      return k0 * k1;
    }, p3, event);
  };
  zoom.scaleTo = function(selection2, k2, p3, event) {
    zoom.transform(selection2, function() {
      var e4 = extent.apply(this, arguments), t0 = this.__zoom, p0 = p3 == null ? centroid(e4) : typeof p3 === "function" ? p3.apply(this, arguments) : p3, p1 = t0.invert(p0), k1 = typeof k2 === "function" ? k2.apply(this, arguments) : k2;
      return constrain(translate(scale(t0, k1), p0, p1), e4, translateExtent);
    }, p3, event);
  };
  zoom.translateBy = function(selection2, x2, y3, event) {
    zoom.transform(selection2, function() {
      return constrain(this.__zoom.translate(
        typeof x2 === "function" ? x2.apply(this, arguments) : x2,
        typeof y3 === "function" ? y3.apply(this, arguments) : y3
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };
  zoom.translateTo = function(selection2, x2, y3, p3, event) {
    zoom.transform(selection2, function() {
      var e4 = extent.apply(this, arguments), t4 = this.__zoom, p0 = p3 == null ? centroid(e4) : typeof p3 === "function" ? p3.apply(this, arguments) : p3;
      return constrain(identity2.translate(p0[0], p0[1]).scale(t4.k).translate(
        typeof x2 === "function" ? -x2.apply(this, arguments) : -x2,
        typeof y3 === "function" ? -y3.apply(this, arguments) : -y3
      ), e4, translateExtent);
    }, p3, event);
  };
  function scale(transform2, k2) {
    k2 = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k2));
    return k2 === transform2.k ? transform2 : new Transform(k2, transform2.x, transform2.y);
  }
  function translate(transform2, p0, p1) {
    var x2 = p0[0] - p1[0] * transform2.k, y3 = p0[1] - p1[1] * transform2.k;
    return x2 === transform2.x && y3 === transform2.y ? transform2 : new Transform(transform2.k, x2, y3);
  }
  function centroid(extent2) {
    return [(+extent2[0][0] + +extent2[1][0]) / 2, (+extent2[0][1] + +extent2[1][1]) / 2];
  }
  function schedule(transition2, transform2, point, event) {
    transition2.on("start.zoom", function() {
      gesture(this, arguments).event(event).start();
    }).on("interrupt.zoom end.zoom", function() {
      gesture(this, arguments).event(event).end();
    }).tween("zoom", function() {
      var that = this, args = arguments, g3 = gesture(that, args).event(event), e4 = extent.apply(that, args), p3 = point == null ? centroid(e4) : typeof point === "function" ? point.apply(that, args) : point, w2 = Math.max(e4[1][0] - e4[0][0], e4[1][1] - e4[0][1]), a3 = that.__zoom, b3 = typeof transform2 === "function" ? transform2.apply(that, args) : transform2, i3 = interpolate(a3.invert(p3).concat(w2 / a3.k), b3.invert(p3).concat(w2 / b3.k));
      return function(t4) {
        if (t4 === 1)
          t4 = b3;
        else {
          var l3 = i3(t4), k2 = w2 / l3[2];
          t4 = new Transform(k2, p3[0] - l3[0] * k2, p3[1] - l3[1] * k2);
        }
        g3.zoom(null, t4);
      };
    });
  }
  function gesture(that, args, clean) {
    return !clean && that.__zooming || new Gesture(that, args);
  }
  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }
  Gesture.prototype = {
    event: function(event) {
      if (event)
        this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform2) {
      if (this.mouse && key !== "mouse")
        this.mouse[1] = transform2.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch")
        this.touch0[1] = transform2.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch")
        this.touch1[1] = transform2.invert(this.touch1[0]);
      this.that.__zoom = transform2;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type2) {
      var d3 = select_default2(this.that).datum();
      listeners.call(
        type2,
        this.that,
        new ZoomEvent(type2, {
          sourceEvent: this.sourceEvent,
          target: zoom,
          type: type2,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d3
      );
    }
  };
  function wheeled(event, ...args) {
    if (!filter2.apply(this, arguments))
      return;
    var g3 = gesture(this, args).event(event), t4 = this.__zoom, k2 = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t4.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p3 = pointer_default(event);
    if (g3.wheel) {
      if (g3.mouse[0][0] !== p3[0] || g3.mouse[0][1] !== p3[1]) {
        g3.mouse[1] = t4.invert(g3.mouse[0] = p3);
      }
      clearTimeout(g3.wheel);
    } else if (t4.k === k2)
      return;
    else {
      g3.mouse = [p3, t4.invert(p3)];
      interrupt_default(this);
      g3.start();
    }
    noevent_default3(event);
    g3.wheel = setTimeout(wheelidled, wheelDelay);
    g3.zoom("mouse", constrain(translate(scale(t4, k2), g3.mouse[0], g3.mouse[1]), g3.extent, translateExtent));
    function wheelidled() {
      g3.wheel = null;
      g3.end();
    }
  }
  function mousedowned(event, ...args) {
    if (touchending || !filter2.apply(this, arguments))
      return;
    var currentTarget = event.currentTarget, g3 = gesture(this, args, true).event(event), v2 = select_default2(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p3 = pointer_default(event, currentTarget), x05 = event.clientX, y05 = event.clientY;
    nodrag_default(event.view);
    nopropagation2(event);
    g3.mouse = [p3, this.__zoom.invert(p3)];
    interrupt_default(this);
    g3.start();
    function mousemoved(event2) {
      noevent_default3(event2);
      if (!g3.moved) {
        var dx = event2.clientX - x05, dy = event2.clientY - y05;
        g3.moved = dx * dx + dy * dy > clickDistance2;
      }
      g3.event(event2).zoom("mouse", constrain(translate(g3.that.__zoom, g3.mouse[0] = pointer_default(event2, currentTarget), g3.mouse[1]), g3.extent, translateExtent));
    }
    function mouseupped(event2) {
      v2.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event2.view, g3.moved);
      noevent_default3(event2);
      g3.event(event2).end();
    }
  }
  function dblclicked(event, ...args) {
    if (!filter2.apply(this, arguments))
      return;
    var t0 = this.__zoom, p0 = pointer_default(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? 0.5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
    noevent_default3(event);
    if (duration > 0)
      select_default2(this).transition().duration(duration).call(schedule, t1, p0, event);
    else
      select_default2(this).call(zoom.transform, t1, p0, event);
  }
  function touchstarted(event, ...args) {
    if (!filter2.apply(this, arguments))
      return;
    var touches = event.touches, n5 = touches.length, g3 = gesture(this, args, event.changedTouches.length === n5).event(event), started, i3, t4, p3;
    nopropagation2(event);
    for (i3 = 0; i3 < n5; ++i3) {
      t4 = touches[i3], p3 = pointer_default(t4, this);
      p3 = [p3, this.__zoom.invert(p3), t4.identifier];
      if (!g3.touch0)
        g3.touch0 = p3, started = true, g3.taps = 1 + !!touchstarting;
      else if (!g3.touch1 && g3.touch0[2] !== p3[2])
        g3.touch1 = p3, g3.taps = 0;
    }
    if (touchstarting)
      touchstarting = clearTimeout(touchstarting);
    if (started) {
      if (g3.taps < 2)
        touchfirst = p3[0], touchstarting = setTimeout(function() {
          touchstarting = null;
        }, touchDelay);
      interrupt_default(this);
      g3.start();
    }
  }
  function touchmoved(event, ...args) {
    if (!this.__zooming)
      return;
    var g3 = gesture(this, args).event(event), touches = event.changedTouches, n5 = touches.length, i3, t4, p3, l3;
    noevent_default3(event);
    for (i3 = 0; i3 < n5; ++i3) {
      t4 = touches[i3], p3 = pointer_default(t4, this);
      if (g3.touch0 && g3.touch0[2] === t4.identifier)
        g3.touch0[0] = p3;
      else if (g3.touch1 && g3.touch1[2] === t4.identifier)
        g3.touch1[0] = p3;
    }
    t4 = g3.that.__zoom;
    if (g3.touch1) {
      var p0 = g3.touch0[0], l0 = g3.touch0[1], p1 = g3.touch1[0], l1 = g3.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t4 = scale(t4, Math.sqrt(dp / dl));
      p3 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l3 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    } else if (g3.touch0)
      p3 = g3.touch0[0], l3 = g3.touch0[1];
    else
      return;
    g3.zoom("touch", constrain(translate(t4, p3, l3), g3.extent, translateExtent));
  }
  function touchended(event, ...args) {
    if (!this.__zooming)
      return;
    var g3 = gesture(this, args).event(event), touches = event.changedTouches, n5 = touches.length, i3, t4;
    nopropagation2(event);
    if (touchending)
      clearTimeout(touchending);
    touchending = setTimeout(function() {
      touchending = null;
    }, touchDelay);
    for (i3 = 0; i3 < n5; ++i3) {
      t4 = touches[i3];
      if (g3.touch0 && g3.touch0[2] === t4.identifier)
        delete g3.touch0;
      else if (g3.touch1 && g3.touch1[2] === t4.identifier)
        delete g3.touch1;
    }
    if (g3.touch1 && !g3.touch0)
      g3.touch0 = g3.touch1, delete g3.touch1;
    if (g3.touch0)
      g3.touch0[1] = this.__zoom.invert(g3.touch0[0]);
    else {
      g3.end();
      if (g3.taps === 2) {
        t4 = pointer_default(t4, this);
        if (Math.hypot(touchfirst[0] - t4[0], touchfirst[1] - t4[1]) < tapDistance) {
          var p3 = select_default2(this).on("dblclick.zoom");
          if (p3)
            p3.apply(this, arguments);
        }
      }
    }
  }
  zoom.wheelDelta = function(_2) {
    return arguments.length ? (wheelDelta = typeof _2 === "function" ? _2 : constant_default4(+_2), zoom) : wheelDelta;
  };
  zoom.filter = function(_2) {
    return arguments.length ? (filter2 = typeof _2 === "function" ? _2 : constant_default4(!!_2), zoom) : filter2;
  };
  zoom.touchable = function(_2) {
    return arguments.length ? (touchable = typeof _2 === "function" ? _2 : constant_default4(!!_2), zoom) : touchable;
  };
  zoom.extent = function(_2) {
    return arguments.length ? (extent = typeof _2 === "function" ? _2 : constant_default4([[+_2[0][0], +_2[0][1]], [+_2[1][0], +_2[1][1]]]), zoom) : extent;
  };
  zoom.scaleExtent = function(_2) {
    return arguments.length ? (scaleExtent[0] = +_2[0], scaleExtent[1] = +_2[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };
  zoom.translateExtent = function(_2) {
    return arguments.length ? (translateExtent[0][0] = +_2[0][0], translateExtent[1][0] = +_2[1][0], translateExtent[0][1] = +_2[0][1], translateExtent[1][1] = +_2[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };
  zoom.constrain = function(_2) {
    return arguments.length ? (constrain = _2, zoom) : constrain;
  };
  zoom.duration = function(_2) {
    return arguments.length ? (duration = +_2, zoom) : duration;
  };
  zoom.interpolate = function(_2) {
    return arguments.length ? (interpolate = _2, zoom) : interpolate;
  };
  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };
  zoom.clickDistance = function(_2) {
    return arguments.length ? (clickDistance2 = (_2 = +_2) * _2, zoom) : Math.sqrt(clickDistance2);
  };
  zoom.tapDistance = function(_2) {
    return arguments.length ? (tapDistance = +_2, zoom) : tapDistance;
  };
  return zoom;
}

// libs/simulator/map/src/lib/simulator-map.ts
var MapElement = class extends s3 {
  constructor() {
    super(...arguments);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.flights = [];
  }
  render() {
    return T`
      <!-- Create SVG element for the map -->
      <svg width="${this.width}" height="${this.height}">
        <g></g>
      </svg>
      <!-- Tooltip -->
      <div class="tooltip" style="display: none;"></div>
    `;
  }
  firstUpdated() {
    this.svg = select_default2(this.shadowRoot.querySelector("svg"));
    this.g = this.svg.select("g");
    this.tooltip = this.shadowRoot.querySelector(".tooltip");
    var projection2 = mercator_default().scale(this.width / 6).translate([this.width / 2, this.height / 2]);
    const path = path_default().projection(projection2);
    this.zoom = zoom_default2().scaleExtent([1, 8]).on("zoom", (event) => {
      this.g.attr("transform", event.transform);
    });
    this.svg.call(this.zoom);
    this.renderMap(path);
  }
  renderMap(path) {
    this.g.selectAll("*").remove();
    this.g.selectAll(".country").data(this.geojson.features).enter().append("path").attr("class", "country").attr("d", path).style("fill", "#444").style("stroke", "#666666");
    this.flights.forEach((flight) => {
      const foreignObject = this.g.append("foreignObject").attr("x", flight.left).attr("y", flight.top);
      const tempDiv = foreignObject.append("xhtml:div").attr("xmlns", "http://www.w3.org/1999/xhtml").classed("flight-card", true).style("visibility", "hidden").html(flight.data);
      foreignObject.append("xhtml:section").classed("plane", true).html("x");
      const divWidth = tempDiv.node().getBoundingClientRect().width;
      const divHeight = tempDiv.node().getBoundingClientRect().height;
      const planeWidth = foreignObject.select(".plane").node().getBoundingClientRect().width;
      const planeHeight = foreignObject.select(".plane").node().getBoundingClientRect().height;
      const width = Math.max(divWidth, planeWidth);
      const height = divHeight + planeHeight;
      tempDiv.remove();
      foreignObject.attr("width", width).attr("height", height);
      foreignObject.select(".flight-card").style("visibility", "visible");
      const div = foreignObject.append("xhtml:div").attr("xmlns", "http://www.w3.org/1999/xhtml").classed("flight-card", true);
      div.append("p").html(flight.data);
      foreignObject.on("mouseover", (event) => {
        const flightData = flight.metadata;
        const svgRect = this.svg.node().getBoundingClientRect();
        const x2 = event.clientX - svgRect.left;
        const y3 = event.clientY - svgRect.top;
        this.tooltip.style.left = `${x2}px`;
        this.tooltip.style.top = `${y3}px`;
        this.tooltip.innerHTML = flightData;
        this.tooltip.style.display = "block";
      }).on("mouseout", () => {
        this.tooltip.style.display = "none";
      });
    });
  }
};
MapElement.styles = i`
    :host {
      display: block;
      overflow: hidden; /* Hide overflow content */
    }
    svg {
      display: block;
      background-color: #444; 
    }
    .flight-card {
      position: absolute;
      color: white;
      cursor: pointer;
    }
    .plane {
      color: white;
      border: 1px solid white;
      text-align: center;
      width: 1.4vmin;
      cursor: pointer;
    }
    .tooltip {
      position: absolute;
      color: white;
      z-index: 9999; /* Ensure tooltip appears on top */
      pointer-events: none;
      -webkit-pointer-events: none; /* Safari and Chrome */
      -moz-pointer-events: none; /* Firefox */
      -ms-pointer-events: none; /* Internet Explorer */
      border: 1px solid rgba(248, 241, 241, 0.5);
      background: rgba(0, 0, 0, 0.7);
      border-radius: 3px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.10);
      padding: 8px;
      font-size: 8px;
    }
  `;
__decorateClass([
  n4({ type: Number })
], MapElement.prototype, "width", 2);
__decorateClass([
  n4({ type: Number })
], MapElement.prototype, "height", 2);
__decorateClass([
  n4({ type: Array })
], MapElement.prototype, "flights", 2);
MapElement = __decorateClass([
  t3("ats-simulator-map")
], MapElement);

// apps/simulator/src/data.ts
var flights = [
  {
    "id": "FL066",
    "left": 660,
    "top": 990,
    data: "469<br>zVUo<br>Ra",
    metadata: "469<br>zVUo<br>Ra<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL067",
    "left": 670,
    "top": 100,
    data: "93<br>\u2713VLG 18HA<br>360-<br>XI<br>\u2192DEVRO",
    metadata: "93<br>\u2713VLG 18HA<br>360-<br>XI<br>\u2192DEVRO<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL068",
    "left": 680,
    "top": 200,
    data: "43<br>VRYR60VE<br>360-<br>NILANG",
    metadata: "43<br>VRYR60VE<br>360-<br>NILANG<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL069",
    "left": 690,
    "top": 300,
    data: "63<br>VEZY95KC<br>360-<br>NI RALIX<br>\u27A1TUPAR",
    metadata: "i63<br>VEZY95KC<br>360-<br>NI RALIX<br>\u27A1TUPAR<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL070",
    "left": 700,
    "top": 400,
    data: "47<br>\u2713BEL7AD<br>350-<br>Z3<br>\u279CURUNA",
    metadata: "47<br>\u2713BEL7AD<br>350-<br>Z3<br>\u279CURUNA<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL071",
    "left": 710,
    "top": 500,
    data: "42<br>VRYR219Y<br>360-<br>XI<br>\u27A1BOKNO",
    metadata: "42<br>VRYR219Y<br>360-<br>XI<br>\u27A1BOKNO<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL072",
    "left": 720,
    "top": 600,
    data: "43-5<br>VVLG8830<br>352350<br>R2",
    metadata: "43-5<br>VVLG8830<br>352350<br>R2<br>Z3 t350 PPN p350<br>OSMOB h..m..<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL073",
    "left": 730,
    "top": 700,
    data: "60<br>VIBE3405<br>350-<br>Z3<br>\u27A1BTZ",
    metadata: "60<br>VIBE3405<br>350-<br>Z3<br>\u27A1BTZ<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL074",
    "left": 740,
    "top": 800,
    data: "992<br>XyHsQg<br>QGABBIOP",
    metadata: "992<br>XyHsQg<br>QGABBIOP<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL075",
    "left": 750,
    "top": 900,
    data: "277<br>IrUxcFL<br>Gi",
    metadata: "277<br>IrUxcFL<br>Gi<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL076",
    "left": 760,
    "top": 100,
    data: "223<br>fM<br>HSl",
    metadata: "223<br>fM<br>HSl<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL077",
    "left": 770,
    "top": 200,
    data: "414<br>n<br>SyTnAvgdXy",
    metadata: "414<br>n<br>SyTnAvgdXy<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL078",
    "left": 780,
    "top": 300,
    data: "777<br>qUmDJmNcP<br>CaFoq",
    metadata: "777<br>qUmDJmNcP<br>CaFoq<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL079",
    "left": 790,
    "top": 400,
    data: "588<br>sGC<br>qbGCBlIeR",
    metadata: "588<br>sGC<br>qbGCBlIeR<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL080",
    "left": 800,
    "top": 500,
    data: "711<br>pQOr<br>jeeMt",
    metadata: "711<br>pQOr<br>jeeMt<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL081",
    "left": 810,
    "top": 600,
    data: "428<br>tH<br>d",
    metadata: "428<br>tH<br>d<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL082",
    "left": 820,
    "top": 700,
    data: "334<br>wBT<br>cTUnuAC",
    metadata: "334<br>wBT<br>cTUnuAC<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL083",
    "left": 830,
    "top": 800,
    data: "726<br>eIuRd<br>CZG",
    metadata: "726<br>eIuRd<br>CZG<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL084",
    "left": 840,
    "top": 900,
    data: "328<br>YaLHJyGCUD<br>EZsC",
    metadata: "328<br>YaLHJyGCUD<br>EZsC<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL085",
    "left": 850,
    "top": 100,
    data: "57<br>VXASnmG<br>RYgiULHaU",
    metadata: "57<br>VXASnmG<br>RYgiULHaU<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL086",
    "left": 860,
    "top": 200,
    data: "414<br>rLDFjec<br>IZyDHH",
    metadata: "414<br>rLDFjec<br>IZyDHH<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL087",
    "left": 870,
    "top": 300,
    data: "326<br>ZYWQG<br>nvTeCeYpbG",
    metadata: "326<br>ZYWQG<br>nvTeCeYpbG<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL088",
    "left": 880,
    "top": 400,
    data: "408<br>ND<br>igUuZor",
    metadata: "408<br>ND<br>igUuZor<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL089",
    "left": 890,
    "top": 500,
    data: "334<br>ZGQPndLU<br>fjZ",
    metadata: "334<br>ZGQPndLU<br>fjZ<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL090",
    "left": 900,
    "top": 600,
    data: "781<br>wlXYkdtkvh<br>bTJsGHPV",
    metadata: "781<br>wlXYkdtkvh<br>bTJsGHPV<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL091",
    "left": 910,
    "top": 700,
    data: "318<br>ii<br>LaYuKIgn",
    metadata: "318<br>ii<br>LaYuKIgn<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL092",
    "left": 920,
    "top": 800,
    data: "711<br>THYZUavG<br>m",
    metadata: "711<br>THYZUavG<br>m<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL093",
    "left": 930,
    "top": 900,
    data: "136<br>WmcSvzzsf<br>hAZCQP",
    metadata: "136<br>WmcSvzzsf<br>hAZCQP<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL094",
    "left": 940,
    "top": 100,
    data: "624<br>BCOjDp<br>pzMVBkb",
    metadata: "624<br>BCOjDp<br>pzMVBkb<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL095",
    "left": 950,
    "top": 200,
    data: "705<br>rXVTYCSL<br>xuGMhk",
    metadata: "705<br>rXVTYCSL<br>xuGMhk<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL096",
    "left": 960,
    "top": 300,
    data: "670<br>vaqCbc<br>HIDqI",
    metadata: "670<br>vaqCbc<br>HIDqI<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL097",
    "left": 970,
    "top": 400,
    data: "501<br>VXsesHWB<br>FGRT",
    metadata: "501<br>VXsesHWB<br>FGRT<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL098",
    "left": 980,
    "top": 500,
    data: "1<br>lGZZrDlCs<br>N",
    metadata: "1<br>lGZZrDlCs<br>N<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL099",
    "left": 990,
    "top": 600,
    data: "58<br>RNUZdj<br>XGd",
    metadata: "58<br>RNUZdj<br>XGd<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  },
  {
    "id": "FL100",
    "left": 999,
    "top": 999,
    data: "297<br>wCItqkkr<br>AnamklKJ",
    metadata: "297<br>wCItqkkr<br>AnamklKJ<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36"
  }
];

// apps/simulator/src/sectors.json
var sectors_default = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "FEDE",
        frequency: 129.1
      },
      geometry: {
        coordinates: [
          [
            [
              42.4472,
              28.1667
            ],
            [
              50,
              28.1667
            ],
            [
              50,
              31.8772
            ],
            [
              44.7311,
              37.1736
            ],
            [
              44.6619,
              37.1781
            ],
            [
              44.6667,
              37.1083
            ],
            [
              44.2667,
              36.9417
            ],
            [
              44.1667,
              37.3053
            ],
            [
              43.9553,
              37.2736
            ],
            [
              43.9344,
              37.2403
            ],
            [
              43.6403,
              37.2244
            ],
            [
              43.2167,
              37.35
            ],
            [
              43.1181,
              37.3761
            ],
            [
              42.8236,
              37.3053
            ],
            [
              42.6494,
              37.2486
            ],
            [
              42.3333,
              37.0833
            ],
            [
              42.4472,
              28.1667
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "FEDE",
        frequency: 129.1
      },
      geometry: {
        coordinates: [
          [
            [
              50,
              31.8772
            ],
            [
              50,
              38.7514
            ],
            [
              44.5644,
              39.8769
            ],
            [
              44.5969,
              39.8503
            ],
            [
              44.6014,
              39.8253
            ],
            [
              44.45,
              39.3833
            ],
            [
              44.0864,
              39.3233
            ],
            [
              44.2083,
              38.9094
            ],
            [
              44.5042,
              38.3219
            ],
            [
              44.3636,
              38.1269
            ],
            [
              44.2994,
              38.0486
            ],
            [
              44.2361,
              37.8969
            ],
            [
              44.6264,
              37.7083
            ],
            [
              44.6447,
              37.4322
            ],
            [
              44.8233,
              37.2697
            ],
            [
              44.7311,
              37.1736
            ],
            [
              50,
              31.8772
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "FEDN",
        frequency: 127.6
      },
      geometry: {
        coordinates: [
          [
            [
              50,
              38.7514
            ],
            [
              50,
              46.5
            ],
            [
              39.6517,
              46.5
            ],
            [
              39.2411,
              43.8958
            ],
            [
              41.6047,
              42.2589
            ],
            [
              41.5094,
              41.5347
            ],
            [
              41.5486,
              41.5167
            ],
            [
              41.655,
              41.4836
            ],
            [
              41.7086,
              41.4972
            ],
            [
              41.7217,
              41.4894
            ],
            [
              41.7161,
              41.475
            ],
            [
              41.7817,
              41.4639
            ],
            [
              41.8233,
              41.4344
            ],
            [
              41.8786,
              41.4608
            ],
            [
              41.9078,
              41.5
            ],
            [
              41.9653,
              41.5244
            ],
            [
              41.9769,
              41.5253
            ],
            [
              41.9925,
              41.5061
            ],
            [
              42.0483,
              41.4942
            ],
            [
              42.0869,
              41.5114
            ],
            [
              42.1836,
              41.5139
            ],
            [
              42.2042,
              41.4931
            ],
            [
              42.2886,
              41.4936
            ],
            [
              42.3336,
              41.4711
            ],
            [
              42.4078,
              41.4661
            ],
            [
              42.4389,
              41.4428
            ],
            [
              42.4708,
              41.4389
            ],
            [
              42.5203,
              41.44
            ],
            [
              42.5103,
              41.4681
            ],
            [
              42.5694,
              41.5103
            ],
            [
              42.5778,
              41.5614
            ],
            [
              42.5961,
              41.5758
            ],
            [
              42.7836,
              41.5781
            ],
            [
              42.8181,
              41.5572
            ],
            [
              42.7969,
              41.5167
            ],
            [
              42.8094,
              41.4925
            ],
            [
              42.8514,
              41.4728
            ],
            [
              42.8711,
              41.4994
            ],
            [
              42.9786,
              41.4278
            ],
            [
              43.1986,
              41.3031
            ],
            [
              43.1253,
              41.2531
            ],
            [
              43.1978,
              41.2469
            ],
            [
              43.2269,
              41.1761
            ],
            [
              43.3739,
              41.2019
            ],
            [
              43.4378,
              41.1794
            ],
            [
              43.4667,
              41.1333
            ],
            [
              43.4494,
              41.0919
            ],
            [
              43.4708,
              41.0594
            ],
            [
              43.4719,
              41.0275
            ],
            [
              43.5994,
              40.9853
            ],
            [
              43.6711,
              40.9328
            ],
            [
              43.6761,
              40.8444
            ],
            [
              43.6847,
              40.84
            ],
            [
              43.7133,
              40.8119
            ],
            [
              43.7486,
              40.7361
            ],
            [
              43.7361,
              40.7078
            ],
            [
              43.7489,
              40.6811
            ],
            [
              43.6869,
              40.5875
            ],
            [
              43.6494,
              40.5653
            ],
            [
              43.6469,
              40.5625
            ],
            [
              43.6469,
              40.5275
            ],
            [
              43.6311,
              40.5364
            ],
            [
              43.6353,
              40.5208
            ],
            [
              43.6239,
              40.5269
            ],
            [
              43.5833,
              40.5061
            ],
            [
              43.5472,
              40.4775
            ],
            [
              43.5561,
              40.4569
            ],
            [
              43.6208,
              40.4178
            ],
            [
              43.6094,
              40.3853
            ],
            [
              43.5925,
              40.3453
            ],
            [
              43.6389,
              40.2711
            ],
            [
              43.6817,
              40.2569
            ],
            [
              43.6819,
              40.2244
            ],
            [
              43.6586,
              40.2208
            ],
            [
              43.6611,
              40.1483
            ],
            [
              43.6644,
              40.1153
            ],
            [
              43.7186,
              40.0794
            ],
            [
              43.7694,
              40.0794
            ],
            [
              43.9053,
              40.0181
            ],
            [
              44.1125,
              40.0306
            ],
            [
              44.1711,
              40.0194
            ],
            [
              44.1978,
              40.0347
            ],
            [
              44.2786,
              40.0453
            ],
            [
              44.2986,
              40.0317
            ],
            [
              44.3394,
              40.0286
            ],
            [
              44.3753,
              40
            ],
            [
              44.4192,
              40
            ],
            [
              44.4886,
              39.9644
            ],
            [
              44.5572,
              39.9036
            ],
            [
              44.5644,
              39.8769
            ],
            [
              50,
              38.7514
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "FEDN",
        frequency: 127.6
      },
      geometry: {
        coordinates: [
          [
            [
              41.6047,
              42.2589
            ],
            [
              39.2411,
              43.8958
            ],
            [
              39.6517,
              46.5
            ],
            [
              37.2125,
              46.5
            ],
            [
              36.5,
              42.725
            ],
            [
              36.6167,
              42.7197
            ],
            [
              36.9144,
              42.7086
            ],
            [
              37.1197,
              42.7031
            ],
            [
              37.6667,
              42.6833
            ],
            [
              37.7119,
              42.6819
            ],
            [
              37.8083,
              42.6531
            ],
            [
              39.4028,
              42.1836
            ],
            [
              40.3333,
              41.9
            ],
            [
              40.6561,
              41.7989
            ],
            [
              40.9786,
              41.6972
            ],
            [
              41.2819,
              41.6
            ],
            [
              41.4494,
              41.5486
            ],
            [
              41.5094,
              41.5347
            ],
            [
              41.6047,
              42.2589
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "FEDS",
        frequency: 125.2
      },
      geometry: {
        coordinates: [
          [
            [
              29.3483,
              28.1667
            ],
            [
              42.4472,
              28.1667
            ],
            [
              42.3333,
              37.0833
            ],
            [
              42.25,
              37.2667
            ],
            [
              41.7911,
              37.1031
            ],
            [
              41.5,
              37
            ],
            [
              41.2303,
              37.0719
            ],
            [
              41.1319,
              37.0928
            ],
            [
              40.8333,
              37.0333
            ],
            [
              39.3333,
              36.6667
            ],
            [
              39.0281,
              36.7086
            ],
            [
              38.75,
              36.6667
            ],
            [
              38.3667,
              36.9
            ],
            [
              37.9431,
              36.8036
            ],
            [
              37.3828,
              36.6486
            ],
            [
              37.0636,
              36.65
            ],
            [
              36.6667,
              36.8333
            ],
            [
              36.6411,
              36.7844
            ],
            [
              36.5875,
              36.5
            ],
            [
              36.7,
              36.2333
            ],
            [
              36.3667,
              36.1667
            ],
            [
              36.1833,
              35.8667
            ],
            [
              36.0333,
              35.8833
            ],
            [
              35.6667,
              35.9167
            ],
            [
              34.6644,
              35.9194
            ],
            [
              34.1353,
              35.9169
            ],
            [
              34.0167,
              35.9167
            ],
            [
              33.5494,
              35.9153
            ],
            [
              33.4417,
              35.9233
            ],
            [
              33.3167,
              35.93
            ],
            [
              33.2833,
              35.9333
            ],
            [
              33,
              35.9486
            ],
            [
              32.6131,
              35.9703
            ],
            [
              31.9275,
              36.0028
            ],
            [
              31.5736,
              36.0203
            ],
            [
              30.825,
              36.0417
            ],
            [
              30.7036,
              36.0467
            ],
            [
              29.9994,
              36.0819
            ],
            [
              29.8103,
              36.0758
            ],
            [
              29.3483,
              28.1667
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "FEDS",
        frequency: 125.2
      },
      geometry: {
        coordinates: [
          [
            [
              21,
              43.3728
            ],
            [
              26.3,
              41.7333
            ],
            [
              26.55,
              41.6333
            ],
            [
              26.6,
              41.3333
            ],
            [
              26.3167,
              41.25
            ],
            [
              26.3211,
              41.1253
            ],
            [
              26.2917,
              41.0667
            ],
            [
              26.3167,
              40.95
            ],
            [
              26.2494,
              40.8819
            ],
            [
              26.1556,
              40.8219
            ],
            [
              26.0858,
              40.7811
            ],
            [
              25.95,
              40.6667
            ],
            [
              25.8833,
              40.6167
            ],
            [
              25.8667,
              40.6167
            ],
            [
              25.8667,
              40.6
            ],
            [
              25.8833,
              40.5833
            ],
            [
              25.8833,
              40.5667
            ],
            [
              25.9167,
              40.5167
            ],
            [
              25.9,
              40.4667
            ],
            [
              25.85,
              40.3667
            ],
            [
              25.8333,
              40.3667
            ],
            [
              25.6667,
              40.3167
            ],
            [
              25.6333,
              40.3
            ],
            [
              25.6167,
              40.25
            ],
            [
              25.6,
              40.1833
            ],
            [
              25.5833,
              40.1667
            ],
            [
              25.6,
              40.1
            ],
            [
              25.6167,
              40.05
            ],
            [
              25.6333,
              39.9833
            ],
            [
              25.6667,
              39.85
            ],
            [
              25.6833,
              39.7333
            ],
            [
              25.7167,
              39.6667
            ],
            [
              25.7167,
              39.5833
            ],
            [
              25.7333,
              39.5333
            ],
            [
              25.75,
              39.5167
            ],
            [
              25.85,
              39.4333
            ],
            [
              25.9667,
              39.3667
            ],
            [
              26.0667,
              39.3667
            ],
            [
              26.1167,
              39.3833
            ],
            [
              26.1833,
              39.4
            ],
            [
              26.2333,
              39.4
            ],
            [
              26.3,
              39.4167
            ],
            [
              26.3667,
              39.4167
            ],
            [
              26.4167,
              39.4
            ],
            [
              26.45,
              39.4
            ],
            [
              26.4994,
              39.3325
            ],
            [
              26.5167,
              39.2833
            ],
            [
              26.55,
              39.25
            ],
            [
              26.6,
              39.2
            ],
            [
              26.6167,
              39.1667
            ],
            [
              26.6833,
              39.1333
            ],
            [
              26.6833,
              39.0667
            ],
            [
              26.6833,
              39.0167
            ],
            [
              26.6833,
              38.9833
            ],
            [
              26.6667,
              38.95
            ],
            [
              26.6333,
              38.9333
            ],
            [
              26.6167,
              38.9
            ],
            [
              26.5667,
              38.8667
            ],
            [
              26.5333,
              38.85
            ],
            [
              26.5,
              38.8
            ],
            [
              26.45,
              38.7667
            ],
            [
              26.3667,
              38.7
            ],
            [
              26.3333,
              38.6667
            ],
            [
              26.3,
              38.6333
            ],
            [
              26.3167,
              38.6
            ],
            [
              26.3,
              38.55
            ],
            [
              26.3,
              38.5167
            ],
            [
              26.3,
              38.4667
            ],
            [
              26.2833,
              38.45
            ],
            [
              26.25,
              38.3833
            ],
            [
              26.2333,
              38.3667
            ],
            [
              26.2167,
              38.3333
            ],
            [
              26.2,
              38.3
            ],
            [
              26.2,
              38.2667
            ],
            [
              26.2,
              38.2
            ],
            [
              26.2,
              38.1667
            ],
            [
              26.2167,
              38.15
            ],
            [
              26.25,
              38.1333
            ],
            [
              26.2833,
              38.1167
            ],
            [
              26.3,
              38.1
            ],
            [
              26.3667,
              38.0833
            ],
            [
              26.4333,
              38.05
            ],
            [
              26.5,
              38.0333
            ],
            [
              26.65,
              37.9833
            ],
            [
              26.7167,
              37.95
            ],
            [
              26.85,
              37.9167
            ],
            [
              27,
              37.85
            ],
            [
              27.0333,
              37.85
            ],
            [
              27.05,
              37.8333
            ],
            [
              27.0667,
              37.8
            ],
            [
              27.1,
              37.7833
            ],
            [
              27.1167,
              37.7833
            ],
            [
              27.1167,
              37.7667
            ],
            [
              27.1167,
              37.7333
            ],
            [
              27.1,
              37.7167
            ],
            [
              27.0667,
              37.7
            ],
            [
              27.0167,
              37.7
            ],
            [
              27,
              37.6833
            ],
            [
              26.9833,
              37.6833
            ],
            [
              26.9833,
              37.6667
            ],
            [
              26.9667,
              37.6333
            ],
            [
              26.9833,
              37.6
            ],
            [
              26.9986,
              37.5853
            ],
            [
              21,
              37.5853
            ],
            [
              21,
              43.3728
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "FEDS",
        frequency: 125.2
      },
      geometry: {
        coordinates: [
          [
            [
              21,
              37.5853
            ],
            [
              26.9986,
              37.5853
            ],
            [
              27.0167,
              37.55
            ],
            [
              27.0333,
              37.5333
            ],
            [
              27.0667,
              37.45
            ],
            [
              27.1167,
              37.35
            ],
            [
              27.1333,
              37.3167
            ],
            [
              27.1667,
              37.2833
            ],
            [
              27.1667,
              37.2333
            ],
            [
              27.1667,
              37.15
            ],
            [
              27.15,
              37.1167
            ],
            [
              27.15,
              37.0833
            ],
            [
              27.15,
              37.05
            ],
            [
              27.1667,
              37.0333
            ],
            [
              27.1667,
              37.0167
            ],
            [
              27.1833,
              36.9833
            ],
            [
              27.1833,
              36.9667
            ],
            [
              27.2,
              36.95
            ],
            [
              27.2333,
              36.95
            ],
            [
              27.2667,
              36.9333
            ],
            [
              27.3,
              36.9333
            ],
            [
              27.3333,
              36.9167
            ],
            [
              27.4,
              36.9167
            ],
            [
              27.4,
              36.8833
            ],
            [
              27.3667,
              36.85
            ],
            [
              27.3667,
              36.8333
            ],
            [
              27.3,
              36.7667
            ],
            [
              27.2833,
              36.75
            ],
            [
              27.2833,
              36.7167
            ],
            [
              27.2667,
              36.6833
            ],
            [
              27.2667,
              36.65
            ],
            [
              27.3333,
              36.6167
            ],
            [
              27.4167,
              36.5667
            ],
            [
              27.4833,
              36.5167
            ],
            [
              27.5167,
              36.5167
            ],
            [
              27.5833,
              36.5667
            ],
            [
              27.7,
              36.6167
            ],
            [
              27.7833,
              36.6667
            ],
            [
              27.8333,
              36.7
            ],
            [
              27.85,
              36.7
            ],
            [
              27.85,
              36.6833
            ],
            [
              27.8667,
              36.6667
            ],
            [
              27.9167,
              36.6
            ],
            [
              27.9667,
              36.55
            ],
            [
              28,
              36.5
            ],
            [
              28.0333,
              36.4833
            ],
            [
              28.0833,
              36.4833
            ],
            [
              28.2,
              36.5167
            ],
            [
              28.25,
              36.5167
            ],
            [
              28.2833,
              36.5333
            ],
            [
              28.3833,
              36.5333
            ],
            [
              28.4833,
              36.55
            ],
            [
              28.45,
              36.5
            ],
            [
              28.5167,
              36.4667
            ],
            [
              28.6,
              36.45
            ],
            [
              28.7833,
              36.3667
            ],
            [
              28.95,
              36.3
            ],
            [
              29.0333,
              36.25
            ],
            [
              29.2,
              36.1667
            ],
            [
              29.25,
              36.1333
            ],
            [
              29.3167,
              36.1333
            ],
            [
              29.35,
              36.15
            ],
            [
              29.4,
              36.1667
            ],
            [
              29.5,
              36.1667
            ],
            [
              29.5667,
              36.1667
            ],
            [
              29.6,
              36.15
            ],
            [
              29.6167,
              36.1333
            ],
            [
              29.65,
              36.1167
            ],
            [
              29.6667,
              36.1
            ],
            [
              29.6833,
              36.0833
            ],
            [
              29.7083,
              36.0833
            ],
            [
              29.8103,
              36.0758
            ],
            [
              29.3483,
              28.1667
            ],
            [
              23,
              28.1667
            ],
            [
              23,
              30.5083
            ],
            [
              21,
              30.5083
            ],
            [
              21,
              37.5853
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "FEDW",
        frequency: 134.675
      },
      geometry: {
        coordinates: [
          [
            [
              30.3761,
              46.5
            ],
            [
              21,
              46.5
            ],
            [
              21,
              43.3728
            ],
            [
              26.3,
              41.7333
            ],
            [
              26.5681,
              41.8717
            ],
            [
              26.6167,
              41.9833
            ],
            [
              26.7661,
              41.9711
            ],
            [
              27.0083,
              42.0406
            ],
            [
              27.1333,
              42.0667
            ],
            [
              27.2161,
              42.0656
            ],
            [
              27.2161,
              42.0653
            ],
            [
              27.2833,
              42.0667
            ],
            [
              27.4181,
              41.9886
            ],
            [
              27.5694,
              41.9019
            ],
            [
              27.7769,
              41.9667
            ],
            [
              27.8511,
              41.9967
            ],
            [
              28.0011,
              41.9819
            ],
            [
              28.3167,
              41.9833
            ],
            [
              28.4833,
              42.0167
            ],
            [
              28.7011,
              42.0578
            ],
            [
              28.7661,
              42.0819
            ],
            [
              29,
              42.1167
            ],
            [
              29.1428,
              42.1703
            ],
            [
              29.265,
              42.2097
            ],
            [
              29.3978,
              42.275
            ],
            [
              29.5411,
              42.3319
            ],
            [
              29.6242,
              42.3636
            ],
            [
              29.8703,
              42.4614
            ],
            [
              30.0167,
              42.5167
            ],
            [
              30.0728,
              42.5403
            ],
            [
              30.2644,
              42.6103
            ],
            [
              30.5961,
              42.7386
            ],
            [
              30.75,
              42.8
            ],
            [
              30.3761,
              46.5
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "FEDW",
        frequency: 134.675
      },
      geometry: {
        coordinates: [
          [
            [
              37.2125,
              46.5
            ],
            [
              30.3761,
              46.5
            ],
            [
              30.75,
              42.8
            ],
            [
              31,
              42.8
            ],
            [
              31.9478,
              42.7986
            ],
            [
              33.1811,
              42.7986
            ],
            [
              33.8944,
              42.7853
            ],
            [
              34.0878,
              42.7803
            ],
            [
              35,
              42.75
            ],
            [
              36.2661,
              42.7319
            ],
            [
              36.5,
              42.725
            ],
            [
              37.2125,
              46.5
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "OBS",
        frequency: 999.9
      },
      geometry: {
        coordinates: [
          [
            [
              21,
              30.5083
            ],
            [
              23,
              30.5083
            ],
            [
              23,
              28.1667
            ],
            [
              21,
              28.1667
            ],
            [
              21,
              30.5083
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "1011L",
        frequency: 128.8
      },
      geometry: {
        coordinates: [
          [
            [
              33.355,
              41.5717
            ],
            [
              35.6961,
              40.9011
            ],
            [
              34.7794,
              39.1414
            ],
            [
              34.0978,
              39.4683
            ],
            [
              33.7358,
              40.8997
            ],
            [
              32.2883,
              40.8125
            ],
            [
              31.8928,
              40.9389
            ],
            [
              31.6,
              41.1197
            ],
            [
              31.8292,
              41.2714
            ],
            [
              33.355,
              41.5717
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "1011L",
        frequency: 128.8
      },
      geometry: {
        coordinates: [
          [
            [
              34.0978,
              39.4683
            ],
            [
              34.7794,
              39.1414
            ],
            [
              33.3058,
              38.9089
            ],
            [
              32.4378,
              39.4239
            ],
            [
              32.15,
              39.5619
            ],
            [
              31.8928,
              40.9389
            ],
            [
              32.2883,
              40.8125
            ],
            [
              32.5667,
              39.615
            ],
            [
              34.0978,
              39.4683
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "1011L",
        frequency: 128.8
      },
      geometry: {
        coordinates: [
          [
            [
              32.2883,
              40.8125
            ],
            [
              32.5667,
              39.615
            ],
            [
              34.0978,
              39.4683
            ],
            [
              33.7358,
              40.8997
            ],
            [
              32.2883,
              40.8125
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "1617L",
        frequency: 132.9
      },
      geometry: {
        coordinates: [
          [
            [
              38.0136,
              38.2881
            ],
            [
              39.7739,
              39.2897
            ],
            [
              42.1908,
              38.9475
            ],
            [
              43.8067,
              38.3514
            ],
            [
              44.3636,
              38.1269
            ],
            [
              44.2994,
              38.0486
            ],
            [
              44.2361,
              37.8969
            ],
            [
              44.6264,
              37.7083
            ],
            [
              44.6447,
              37.4322
            ],
            [
              44.8233,
              37.2697
            ],
            [
              44.7311,
              37.1736
            ],
            [
              44.6619,
              37.1781
            ],
            [
              44.6667,
              37.1083
            ],
            [
              44.2667,
              36.9417
            ],
            [
              44.1667,
              37.3053
            ],
            [
              43.9553,
              37.2736
            ],
            [
              43.9344,
              37.2403
            ],
            [
              43.6403,
              37.2244
            ],
            [
              43.2167,
              37.35
            ],
            [
              43.1181,
              37.3761
            ],
            [
              42.8236,
              37.3053
            ],
            [
              42.6494,
              37.2486
            ],
            [
              42.3333,
              37.0833
            ],
            [
              42.25,
              37.2667
            ],
            [
              41.7911,
              37.1031
            ],
            [
              41.5,
              37
            ],
            [
              41.2303,
              37.0719
            ],
            [
              41.1319,
              37.0928
            ],
            [
              40.8333,
              37.0333
            ],
            [
              39.3333,
              36.6667
            ],
            [
              39.0281,
              36.7086
            ],
            [
              38.75,
              36.6667
            ],
            [
              38.3667,
              36.9
            ],
            [
              37.9431,
              36.8036
            ],
            [
              38.0136,
              38.2881
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "1819L",
        frequency: 129.3
      },
      geometry: {
        coordinates: [
          [
            [
              37.7119,
              42.6819
            ],
            [
              37.8083,
              42.6531
            ],
            [
              39.4028,
              42.1836
            ],
            [
              40.3333,
              41.9
            ],
            [
              40.6561,
              41.7989
            ],
            [
              40.9786,
              41.6972
            ],
            [
              41.2819,
              41.6
            ],
            [
              41.4494,
              41.5486
            ],
            [
              41.5094,
              41.5347
            ],
            [
              41.5486,
              41.5167
            ],
            [
              41.655,
              41.4836
            ],
            [
              41.7086,
              41.4972
            ],
            [
              41.7217,
              41.4894
            ],
            [
              41.7161,
              41.475
            ],
            [
              41.7817,
              41.4639
            ],
            [
              41.8233,
              41.4344
            ],
            [
              41.8786,
              41.4608
            ],
            [
              41.9078,
              41.5
            ],
            [
              41.9653,
              41.5244
            ],
            [
              41.9769,
              41.5253
            ],
            [
              41.9925,
              41.5061
            ],
            [
              42.0483,
              41.4942
            ],
            [
              42.0869,
              41.5114
            ],
            [
              42.1836,
              41.5139
            ],
            [
              42.2042,
              41.4931
            ],
            [
              42.2886,
              41.4936
            ],
            [
              42.3336,
              41.4711
            ],
            [
              42.4078,
              41.4661
            ],
            [
              42.4389,
              41.4428
            ],
            [
              42.4708,
              41.4389
            ],
            [
              42.5203,
              41.44
            ],
            [
              42.5103,
              41.4681
            ],
            [
              42.5694,
              41.5103
            ],
            [
              42.5778,
              41.5614
            ],
            [
              42.5961,
              41.5758
            ],
            [
              42.7836,
              41.5781
            ],
            [
              42.8181,
              41.5572
            ],
            [
              42.7969,
              41.5167
            ],
            [
              42.8094,
              41.4925
            ],
            [
              42.8514,
              41.4728
            ],
            [
              42.8711,
              41.4994
            ],
            [
              42.9786,
              41.4278
            ],
            [
              43.1986,
              41.3031
            ],
            [
              43.1253,
              41.2531
            ],
            [
              43.1978,
              41.2469
            ],
            [
              43.2269,
              41.1761
            ],
            [
              43.3739,
              41.2019
            ],
            [
              43.4378,
              41.1794
            ],
            [
              43.4667,
              41.1333
            ],
            [
              43.4494,
              41.0919
            ],
            [
              43.4708,
              41.0594
            ],
            [
              43.4719,
              41.0275
            ],
            [
              43.5994,
              40.9853
            ],
            [
              43.6711,
              40.9328
            ],
            [
              43.6761,
              40.8444
            ],
            [
              43.6847,
              40.84
            ],
            [
              43.7133,
              40.8119
            ],
            [
              43.7486,
              40.7361
            ],
            [
              43.7361,
              40.7078
            ],
            [
              43.7489,
              40.6811
            ],
            [
              43.6869,
              40.5875
            ],
            [
              43.6494,
              40.5653
            ],
            [
              43.6469,
              40.5625
            ],
            [
              43.6469,
              40.5275
            ],
            [
              43.6311,
              40.5364
            ],
            [
              43.6353,
              40.5208
            ],
            [
              43.6239,
              40.5269
            ],
            [
              43.5833,
              40.5061
            ],
            [
              43.5472,
              40.4775
            ],
            [
              43.5561,
              40.4569
            ],
            [
              43.6208,
              40.4178
            ],
            [
              43.6094,
              40.3853
            ],
            [
              43.5925,
              40.3453
            ],
            [
              43.6389,
              40.2711
            ],
            [
              43.6817,
              40.2569
            ],
            [
              43.6819,
              40.2244
            ],
            [
              43.6586,
              40.2208
            ],
            [
              43.6611,
              40.1483
            ],
            [
              43.6644,
              40.1153
            ],
            [
              43.7186,
              40.0794
            ],
            [
              43.7694,
              40.0794
            ],
            [
              43.9053,
              40.0181
            ],
            [
              44.1125,
              40.0306
            ],
            [
              44.1711,
              40.0194
            ],
            [
              44.1978,
              40.0347
            ],
            [
              44.2786,
              40.0453
            ],
            [
              44.2986,
              40.0317
            ],
            [
              44.3394,
              40.0286
            ],
            [
              44.3753,
              40
            ],
            [
              44.4192,
              40
            ],
            [
              44.4886,
              39.9644
            ],
            [
              44.5572,
              39.9036
            ],
            [
              44.5644,
              39.8769
            ],
            [
              42.1797,
              39.9433
            ],
            [
              40.9558,
              40.2844
            ],
            [
              37.5861,
              41.6736
            ],
            [
              37.7119,
              42.6819
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "1819L",
        frequency: 129.3
      },
      geometry: {
        coordinates: [
          [
            [
              44.5969,
              39.8503
            ],
            [
              44.6014,
              39.8253
            ],
            [
              44.45,
              39.3833
            ],
            [
              44.0864,
              39.3233
            ],
            [
              44.2083,
              38.9094
            ],
            [
              44.5042,
              38.3219
            ],
            [
              44.3636,
              38.1269
            ],
            [
              43.8067,
              38.3514
            ],
            [
              42.1908,
              38.9475
            ],
            [
              39.7739,
              39.2897
            ],
            [
              37.3286,
              40.49
            ],
            [
              37.5861,
              41.6736
            ],
            [
              40.9558,
              40.2844
            ],
            [
              42.1797,
              39.9433
            ],
            [
              44.5644,
              39.8769
            ],
            [
              44.5969,
              39.8503
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "ANK",
        frequency: 119.6
      },
      geometry: {
        coordinates: [
          [
            [
              29,
              42.1167
            ],
            [
              29.1428,
              42.1703
            ],
            [
              29.265,
              42.2097
            ],
            [
              29.3978,
              42.275
            ],
            [
              29.5411,
              42.3319
            ],
            [
              29.6242,
              42.3636
            ],
            [
              29.8703,
              42.4614
            ],
            [
              30.0167,
              42.5167
            ],
            [
              30.0728,
              42.5403
            ],
            [
              30.2644,
              42.6103
            ],
            [
              30.5961,
              42.7386
            ],
            [
              30.75,
              42.8
            ],
            [
              31,
              42.8
            ],
            [
              31.9478,
              42.7986
            ],
            [
              33.1811,
              42.7986
            ],
            [
              33.8944,
              42.7853
            ],
            [
              33.355,
              41.5717
            ],
            [
              31.8292,
              41.2714
            ],
            [
              31.6,
              41.1197
            ],
            [
              31.3186,
              41.3156
            ],
            [
              30.6153,
              41.3792
            ],
            [
              29.3011,
              41.2561
            ],
            [
              29.1814,
              41.3011
            ],
            [
              29,
              42.1167
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "ANK",
        frequency: 119.6
      },
      geometry: {
        coordinates: [
          [
            [
              33.8944,
              42.7853
            ],
            [
              34.0878,
              42.7803
            ],
            [
              35,
              42.75
            ],
            [
              36.2661,
              42.7319
            ],
            [
              36.5,
              42.725
            ],
            [
              36.6167,
              42.7197
            ],
            [
              36.9144,
              42.7086
            ],
            [
              37.1197,
              42.7031
            ],
            [
              37.6667,
              42.6833
            ],
            [
              37.7119,
              42.6819
            ],
            [
              37.5861,
              41.6736
            ],
            [
              37.3286,
              40.49
            ],
            [
              35.6961,
              40.9011
            ],
            [
              33.355,
              41.5717
            ],
            [
              33.8944,
              42.7853
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "ANK",
        frequency: 119.6
      },
      geometry: {
        coordinates: [
          [
            [
              35.6961,
              40.9011
            ],
            [
              37.3286,
              40.49
            ],
            [
              39.7739,
              39.2897
            ],
            [
              38.0136,
              38.2881
            ],
            [
              36.0811,
              39.0275
            ],
            [
              34.7794,
              39.1414
            ],
            [
              35.6961,
              40.9011
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "ANK",
        frequency: 119.6
      },
      geometry: {
        coordinates: [
          [
            [
              33.3058,
              38.9089
            ],
            [
              34.7794,
              39.1414
            ],
            [
              36.0811,
              39.0275
            ],
            [
              38.0136,
              38.2881
            ],
            [
              37.9431,
              36.8036
            ],
            [
              37.3828,
              36.6486
            ],
            [
              37.0636,
              36.65
            ],
            [
              36.6667,
              36.8333
            ],
            [
              36.6411,
              36.7844
            ],
            [
              36.5875,
              36.5
            ],
            [
              36.7,
              36.2333
            ],
            [
              36.3667,
              36.1667
            ],
            [
              36.1833,
              35.8667
            ],
            [
              36.0333,
              35.8833
            ],
            [
              35.6667,
              35.9167
            ],
            [
              34.6644,
              35.9194
            ],
            [
              34.5411,
              36.5219
            ],
            [
              34.5203,
              36.6253
            ],
            [
              34.4728,
              36.64
            ],
            [
              34.2486,
              36.8919
            ],
            [
              33.3989,
              37.8617
            ],
            [
              33.3058,
              38.9089
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "IST",
        frequency: 122.675
      },
      geometry: {
        coordinates: [
          [
            [
              28.2717,
              40.6994
            ],
            [
              27.6822,
              40.7683
            ],
            [
              27.0458,
              40.7028
            ],
            [
              26.1556,
              40.8219
            ],
            [
              26.2494,
              40.8819
            ],
            [
              26.3167,
              40.95
            ],
            [
              26.2917,
              41.0667
            ],
            [
              26.3211,
              41.1253
            ],
            [
              26.3167,
              41.25
            ],
            [
              26.6,
              41.3333
            ],
            [
              26.55,
              41.6333
            ],
            [
              26.3,
              41.7333
            ],
            [
              26.5681,
              41.8717
            ],
            [
              26.6167,
              41.9833
            ],
            [
              26.7661,
              41.9711
            ],
            [
              27.0083,
              42.0406
            ],
            [
              27.1333,
              42.0667
            ],
            [
              27.2161,
              42.0656
            ],
            [
              27.2161,
              42.0653
            ],
            [
              27.2833,
              42.0667
            ],
            [
              27.4181,
              41.9886
            ],
            [
              27.5694,
              41.9019
            ],
            [
              27.7769,
              41.9667
            ],
            [
              27.8511,
              41.9967
            ],
            [
              28.0011,
              41.9819
            ],
            [
              28.3167,
              41.9833
            ],
            [
              28.4833,
              42.0167
            ],
            [
              28.7011,
              42.0578
            ],
            [
              28.7661,
              42.0819
            ],
            [
              29,
              42.1167
            ],
            [
              29.1814,
              41.3011
            ],
            [
              29.3119,
              40.6594
            ],
            [
              29.3478,
              40.6308
            ],
            [
              28.2889,
              40.6628
            ],
            [
              28.2717,
              40.6994
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "IST",
        frequency: 122.675
      },
      geometry: {
        coordinates: [
          [
            [
              27.0458,
              40.7028
            ],
            [
              27.6822,
              40.7683
            ],
            [
              28.2717,
              40.6994
            ],
            [
              28.2889,
              40.6628
            ],
            [
              28.9475,
              39.1436
            ],
            [
              27.5625,
              38.98
            ],
            [
              26.6833,
              39.0167
            ],
            [
              26.6833,
              39.0667
            ],
            [
              26.6833,
              39.1333
            ],
            [
              26.6167,
              39.1667
            ],
            [
              26.6,
              39.2
            ],
            [
              26.55,
              39.25
            ],
            [
              26.5167,
              39.2833
            ],
            [
              26.4994,
              39.3325
            ],
            [
              26.45,
              39.4
            ],
            [
              26.4167,
              39.4
            ],
            [
              26.3667,
              39.4167
            ],
            [
              26.3,
              39.4167
            ],
            [
              26.2333,
              39.4
            ],
            [
              26.1833,
              39.4
            ],
            [
              26.1167,
              39.3833
            ],
            [
              26.0667,
              39.3667
            ],
            [
              25.9667,
              39.3667
            ],
            [
              25.85,
              39.4333
            ],
            [
              25.75,
              39.5167
            ],
            [
              25.7333,
              39.5333
            ],
            [
              25.7167,
              39.5833
            ],
            [
              25.7167,
              39.6667
            ],
            [
              25.6833,
              39.7333
            ],
            [
              25.6667,
              39.85
            ],
            [
              25.6333,
              39.9833
            ],
            [
              25.6167,
              40.05
            ],
            [
              25.6,
              40.1
            ],
            [
              25.5833,
              40.1667
            ],
            [
              25.6,
              40.1833
            ],
            [
              25.6167,
              40.25
            ],
            [
              25.6333,
              40.3
            ],
            [
              25.6667,
              40.3167
            ],
            [
              25.8333,
              40.3667
            ],
            [
              25.85,
              40.3667
            ],
            [
              25.9,
              40.4667
            ],
            [
              25.9167,
              40.5167
            ],
            [
              25.8833,
              40.5667
            ],
            [
              25.8833,
              40.5833
            ],
            [
              25.8667,
              40.6
            ],
            [
              25.8667,
              40.6167
            ],
            [
              25.8833,
              40.6167
            ],
            [
              25.95,
              40.6667
            ],
            [
              26.0858,
              40.7811
            ],
            [
              26.1556,
              40.8219
            ],
            [
              27.0458,
              40.7028
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "IST",
        frequency: 122.675
      },
      geometry: {
        coordinates: [
          [
            [
              30.1267,
              40.0058
            ],
            [
              29.3478,
              40.6308
            ],
            [
              29.3119,
              40.6594
            ],
            [
              29.1814,
              41.3011
            ],
            [
              29.3011,
              41.2561
            ],
            [
              30.6153,
              41.3792
            ],
            [
              31.3186,
              41.3156
            ],
            [
              31.6,
              41.1197
            ],
            [
              31.8928,
              40.9389
            ],
            [
              32.15,
              39.5619
            ],
            [
              30.8397,
              39.41
            ],
            [
              30.5617,
              39.3431
            ],
            [
              30.1267,
              40.0058
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "IST",
        frequency: 122.675
      },
      geometry: {
        coordinates: [
          [
            [
              30.1639,
              39.1986
            ],
            [
              29.4292,
              39.0786
            ],
            [
              28.9475,
              39.1436
            ],
            [
              28.2889,
              40.6628
            ],
            [
              29.3478,
              40.6308
            ],
            [
              30.1267,
              40.0058
            ],
            [
              30.5617,
              39.3431
            ],
            [
              30.1639,
              39.1986
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "IZAYT",
        frequency: 134.2
      },
      geometry: {
        coordinates: [
          [
            [
              27.5625,
              38.98
            ],
            [
              28.43,
              37.6603
            ],
            [
              29.7522,
              36.8236
            ],
            [
              29.7611,
              36.7108
            ],
            [
              29.8103,
              36.0758
            ],
            [
              29.7083,
              36.0833
            ],
            [
              29.6833,
              36.0833
            ],
            [
              29.6667,
              36.1
            ],
            [
              29.65,
              36.1167
            ],
            [
              29.6167,
              36.1333
            ],
            [
              29.6,
              36.15
            ],
            [
              29.5667,
              36.1667
            ],
            [
              29.5,
              36.1667
            ],
            [
              29.4,
              36.1667
            ],
            [
              29.35,
              36.15
            ],
            [
              29.3167,
              36.1333
            ],
            [
              29.25,
              36.1333
            ],
            [
              29.2,
              36.1667
            ],
            [
              29.0333,
              36.25
            ],
            [
              28.95,
              36.3
            ],
            [
              28.7833,
              36.3667
            ],
            [
              28.6,
              36.45
            ],
            [
              28.5167,
              36.4667
            ],
            [
              28.45,
              36.5
            ],
            [
              28.4833,
              36.55
            ],
            [
              28.3833,
              36.5333
            ],
            [
              28.2833,
              36.5333
            ],
            [
              28.25,
              36.5167
            ],
            [
              28.2,
              36.5167
            ],
            [
              28.0833,
              36.4833
            ],
            [
              28.0333,
              36.4833
            ],
            [
              28,
              36.5
            ],
            [
              27.9667,
              36.55
            ],
            [
              27.9167,
              36.6
            ],
            [
              27.8667,
              36.6667
            ],
            [
              27.85,
              36.6833
            ],
            [
              27.85,
              36.7
            ],
            [
              27.8333,
              36.7
            ],
            [
              27.7833,
              36.6667
            ],
            [
              27.7,
              36.6167
            ],
            [
              27.5833,
              36.5667
            ],
            [
              27.5167,
              36.5167
            ],
            [
              27.4833,
              36.5167
            ],
            [
              27.4167,
              36.5667
            ],
            [
              27.3333,
              36.6167
            ],
            [
              27.2667,
              36.65
            ],
            [
              27.2667,
              36.6833
            ],
            [
              27.2833,
              36.7167
            ],
            [
              27.2833,
              36.75
            ],
            [
              27.3,
              36.7667
            ],
            [
              27.3667,
              36.8333
            ],
            [
              27.3667,
              36.85
            ],
            [
              27.4,
              36.8833
            ],
            [
              27.4,
              36.9167
            ],
            [
              27.3333,
              36.9167
            ],
            [
              27.3,
              36.9333
            ],
            [
              27.2667,
              36.9333
            ],
            [
              27.2333,
              36.95
            ],
            [
              27.2,
              36.95
            ],
            [
              27.1833,
              36.9667
            ],
            [
              27.1833,
              36.9833
            ],
            [
              27.1667,
              37.0167
            ],
            [
              27.1667,
              37.0333
            ],
            [
              27.15,
              37.05
            ],
            [
              27.15,
              37.0833
            ],
            [
              27.15,
              37.1167
            ],
            [
              27.1667,
              37.15
            ],
            [
              27.1667,
              37.2333
            ],
            [
              27.1667,
              37.2833
            ],
            [
              27.1333,
              37.3167
            ],
            [
              27.1167,
              37.35
            ],
            [
              27.0667,
              37.45
            ],
            [
              27.0333,
              37.5333
            ],
            [
              27.0167,
              37.55
            ],
            [
              26.9986,
              37.5853
            ],
            [
              26.9833,
              37.6
            ],
            [
              26.9667,
              37.6333
            ],
            [
              26.9833,
              37.6667
            ],
            [
              26.9833,
              37.6833
            ],
            [
              27,
              37.6833
            ],
            [
              27.0167,
              37.7
            ],
            [
              27.0667,
              37.7
            ],
            [
              27.1,
              37.7167
            ],
            [
              27.1167,
              37.7333
            ],
            [
              27.1167,
              37.7667
            ],
            [
              27.1167,
              37.7833
            ],
            [
              27.1,
              37.7833
            ],
            [
              27.0667,
              37.8
            ],
            [
              27.05,
              37.8333
            ],
            [
              27.0333,
              37.85
            ],
            [
              27,
              37.85
            ],
            [
              26.85,
              37.9167
            ],
            [
              26.7167,
              37.95
            ],
            [
              26.65,
              37.9833
            ],
            [
              26.5,
              38.0333
            ],
            [
              26.4333,
              38.05
            ],
            [
              26.3667,
              38.0833
            ],
            [
              26.3,
              38.1
            ],
            [
              26.2833,
              38.1167
            ],
            [
              26.25,
              38.1333
            ],
            [
              26.2167,
              38.15
            ],
            [
              26.2,
              38.1667
            ],
            [
              26.2,
              38.2
            ],
            [
              26.2,
              38.2667
            ],
            [
              26.2,
              38.3
            ],
            [
              26.2167,
              38.3333
            ],
            [
              26.2333,
              38.3667
            ],
            [
              26.25,
              38.3833
            ],
            [
              26.2833,
              38.45
            ],
            [
              26.3,
              38.4667
            ],
            [
              26.3,
              38.5167
            ],
            [
              26.3,
              38.55
            ],
            [
              26.3167,
              38.6
            ],
            [
              26.3,
              38.6333
            ],
            [
              26.3333,
              38.6667
            ],
            [
              26.3667,
              38.7
            ],
            [
              26.45,
              38.7667
            ],
            [
              26.5,
              38.8
            ],
            [
              26.5333,
              38.85
            ],
            [
              26.5667,
              38.8667
            ],
            [
              26.6167,
              38.9
            ],
            [
              26.6333,
              38.9333
            ],
            [
              26.6667,
              38.95
            ],
            [
              26.6833,
              38.9833
            ],
            [
              26.6833,
              39.0167
            ],
            [
              27.5625,
              38.98
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "IZAYT",
        frequency: 134.2
      },
      geometry: {
        coordinates: [
          [
            [
              28.9475,
              39.1436
            ],
            [
              29.4292,
              39.0786
            ],
            [
              29.6572,
              38.4839
            ],
            [
              30.0544,
              38.1125
            ],
            [
              30.0536,
              38.1003
            ],
            [
              29.8847,
              37.1453
            ],
            [
              29.7522,
              36.8236
            ],
            [
              28.43,
              37.6603
            ],
            [
              27.5625,
              38.98
            ],
            [
              28.9475,
              39.1436
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "IZAYT",
        frequency: 134.2
      },
      geometry: {
        coordinates: [
          [
            [
              31.5442,
              36.8844
            ],
            [
              31.5736,
              36.0203
            ],
            [
              30.825,
              36.0417
            ],
            [
              30.7036,
              36.0467
            ],
            [
              29.9994,
              36.0819
            ],
            [
              29.8103,
              36.0758
            ],
            [
              29.7611,
              36.7108
            ],
            [
              29.7522,
              36.8236
            ],
            [
              29.8847,
              37.1453
            ],
            [
              30.0536,
              38.1003
            ],
            [
              30.0544,
              38.1125
            ],
            [
              29.6572,
              38.4839
            ],
            [
              29.4292,
              39.0786
            ],
            [
              30.1639,
              39.1986
            ],
            [
              30.5617,
              39.3431
            ],
            [
              30.8397,
              39.41
            ],
            [
              30.9758,
              39.2064
            ],
            [
              31.4644,
              37.4761
            ],
            [
              31.5442,
              36.8844
            ]
          ]
        ],
        type: "Polygon"
      }
    },
    {
      type: "Feature",
      properties: {
        kind: "sector",
        name: "IZAYT",
        frequency: 134.2
      },
      geometry: {
        coordinates: [
          [
            [
              32.15,
              39.5619
            ],
            [
              32.4378,
              39.4239
            ],
            [
              33.3058,
              38.9089
            ],
            [
              33.3989,
              37.8617
            ],
            [
              34.2486,
              36.8919
            ],
            [
              34.4728,
              36.64
            ],
            [
              34.5203,
              36.6253
            ],
            [
              34.5411,
              36.5219
            ],
            [
              34.6644,
              35.9194
            ],
            [
              34.1353,
              35.9169
            ],
            [
              34.0167,
              35.9167
            ],
            [
              33.5494,
              35.9153
            ],
            [
              33.4417,
              35.9233
            ],
            [
              33.3167,
              35.93
            ],
            [
              33.2833,
              35.9333
            ],
            [
              33,
              35.9486
            ],
            [
              32.6131,
              35.9703
            ],
            [
              31.9275,
              36.0028
            ],
            [
              31.5736,
              36.0203
            ],
            [
              31.5442,
              36.8844
            ],
            [
              31.4644,
              37.4761
            ],
            [
              30.9758,
              39.2064
            ],
            [
              30.8397,
              39.41
            ],
            [
              32.15,
              39.5619
            ]
          ]
        ],
        type: "Polygon"
      }
    }
  ]
};

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
    console.log(sectors_default);
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
      <section style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; font-size: 1vmin;">
        <ats-simulator-map .geojson=${sectors_default} .flights=${this.flights}></ats-simulator-map>
      </section>
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
*/
//# sourceMappingURL=main.js.map
