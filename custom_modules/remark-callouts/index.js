import { visit } from 'unist-util-visit';
import { parse } from 'svg-parser';
import { jsx } from 'react/jsx-runtime';
import { useRef } from 'react';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var calloutTypes = {
  // aliases
  summary: "abstract",
  tldr: "abstract",
  hint: "tip",
  important: "tip",
  check: "success",
  done: "success",
  help: "question",
  faq: "question",
  caution: "warning",
  attention: "warning",
  fail: "failure",
  missing: "failure",
  error: "danger",
  cite: "quote",
  // base types
  note: {
    keyword: "note",
    color: "#448aff",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-pencil"><line x1="18" y1="2" x2="22" y2="6"></line><path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path></svg>'
  },
  tip: {
    keyword: "tip",
    color: "#00bfa6",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>'
  },
  warning: {
    keyword: "warning",
    color: "#ff9100",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-alert-triangle"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
  },
  "abstract": {
    keyword: "abstract",
    color: "#00aeff",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-clipboard-list"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>'
  },
  info: {
    keyword: "info",
    color: "#00b8d4",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
  },
  todo: {
    keyword: "todo",
    color: "#00b8d4",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>'
  },
  success: {
    keyword: "success",
    color: "#00c853",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-check"><polyline points="20 6 9 17 4 12"></polyline></svg>'
  },
  question: {
    keyword: "question",
    color: "#63dd17",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
  },
  failure: {
    keyword: "failure",
    color: "#ff5252",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
  },
  danger: {
    keyword: "danger",
    color: "#ff1745",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>'
  },
  bug: {
    keyword: "bug",
    color: "#f50057",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-bug"><rect x="8" y="6" width="8" height="14" rx="4"></rect><path d="m19 7-3 2"></path><path d="m5 7 3 2"></path><path d="m19 19-3-2"></path><path d="m5 19 3-2"></path><path d="M20 13h-4"></path><path d="M4 13h4"></path><path d="m10 4 1 2"></path><path d="m14 4-1 2"></path></svg>'
  },
  example: {
    keyword: "example",
    color: "#7c4dff",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>'
  },
  quote: {
    keyword: "quote",
    color: "#9e9e9e",
    svg: '<svg viewBox="0 0 100 100" class="quote-glyph" width="16" height="16"><path fill="currentColor" stroke="currentColor" d="M16.7,13.3c-3.7,0-6.7,3-6.7,6.7v26.7c0,3.7,3,6.7,6.7,6.7h13.5c0.1,6-0.5,18.7-6.3,28.2c0,0,0,0,0,0 c-0.9,1.4-0.7,3.1,0.5,4.2c1.2,1.1,3,1.2,4.3,0.2c0,0,14.7-11.2,14.7-32.7V20c0-3.7-3-6.7-6.7-6.7L16.7,13.3z M63.3,13.3 c-3.7,0-6.7,3-6.7,6.7v26.7c0,3.7,3,6.7,6.7,6.7h13.5c0.1,6-0.5,18.7-6.3,28.2h0c-0.9,1.4-0.7,3.1,0.5,4.2c1.2,1.1,3,1.2,4.3,0.2 c0,0,14.7-11.2,14.7-32.7V20c0-3.7-3-6.7-6.7-6.7L63.3,13.3z"></path></svg>'
  }
};

// escape regex special characters
function escapeRegExp(s) {
  return s.replace(new RegExp("[-[\\]{}()*+?.\\\\^$|/]", "g"), "\\$&");
}
// match breaks
var find = /[\t ]*(?:\r?\n|\r)/g;
var callouts = function callouts(providedConfig) {
  var config = _objectSpread2(_objectSpread2({}, defaultConfig), providedConfig);
  var defaultKeywords = Object.keys(config.types).map(escapeRegExp).join("|");
  return function (tree) {
    visit(tree, function (node, index, parent) {
      var _m$groups, _m$groups2, _parsedSvg, _blockquote$children$;
      // Filter required elems
      if (node.type !== "blockquote") return;
      /** add breaks to text without needing spaces or escapes (turns enters into <br>)
       *  code taken directly from remark-breaks,
       *  see https://github.com/remarkjs/remark-breaks for more info on what this does.
       */
      visit(node, "text", function (node, index, parent) {
        var result = [];
        var start = 0;
        find.lastIndex = 0;
        var match = find.exec(node.value);
        while (match) {
          var position = match.index;
          if (start !== position) {
            result.push({
              type: "text",
              value: node.value.slice(start, position)
            });
          }
          result.push({
            type: "break"
          });
          start = position + match[0].length;
          match = find.exec(node.value);
        }
        if (result.length > 0 && parent && typeof index === "number") {
          var _parent$children;
          if (start < node.value.length) {
            result.push({
              type: "text",
              value: node.value.slice(start)
            });
          }
          (_parent$children = parent.children).splice.apply(_parent$children, [index, 1].concat(result));
          return index + result.length;
        }
      });
      /** add classnames to headings within blockquotes,
       * mainly to identify when using other plugins that
       * might interfere. for eg, rehype-auto-link-headings.
       */
      visit(node, "heading", function (node) {
        var heading = node;
        heading.data = {
          hProperties: {
            className: "blockquote-heading"
          }
        };
      });
      // wrap blockquote in a div
      var wrapper = _objectSpread2(_objectSpread2({}, node), {}, {
        type: "element",
        tagName: "div",
        data: {
          hProperties: {}
        },
        children: [node]
      });
      parent.children.splice(Number(index), 1, wrapper);
      var blockquote = wrapper.children[0];
      blockquote.data = {
        hProperties: {
          className: "blockquote"
        }
      };
      // check for callout syntax starts here
      if (blockquote.children.length <= 0 || blockquote.children[0].type !== "paragraph") return;
      var title_paragraph = blockquote.children[0];
      if (title_paragraph.children.length <= 0 || title_paragraph.children[0].type !== "text") return;
      var _title_paragraph$chil = _toArray(title_paragraph.children),
        firstchild = _title_paragraph$chil[0];
        _title_paragraph$chil.slice(1);
      var regex = new RegExp("^\\[!(?<keyword>(.*?))\\](?<foldChar>[+-]?)", "gi");
      var m = regex.exec(firstchild.value);
      // if no callout syntax, forget about it.
      if (!m) return;
      var key = (_m$groups = m.groups) === null || _m$groups === void 0 ? void 0 : _m$groups.keyword,
        foldChar = (_m$groups2 = m.groups) === null || _m$groups2 === void 0 ? void 0 : _m$groups2.foldChar;
      // if there's nothing inside the brackets, is it really a callout ?
      if (!key) return;
      // now we're going for it, so let's remove the callout syntax from the content
      firstchild.value = firstchild.value.replace(regex, '');
      var keyword = key.toLowerCase();
      var isOneOfKeywords = new RegExp(defaultKeywords).test(keyword);
      var entry = {};
      if (isOneOfKeywords) {
        if (typeof (config === null || config === void 0 ? void 0 : config.types[keyword]) === "string") {
          var e = String(config === null || config === void 0 ? void 0 : config.types[keyword]);
          Object.assign(entry, config === null || config === void 0 ? void 0 : config.types[e]);
        } else {
          Object.assign(entry, config === null || config === void 0 ? void 0 : config.types[keyword]);
        }
      } else {
        Object.assign(entry, config === null || config === void 0 ? void 0 : config.types["note"]);
      }
      var parsedSvg;
      if (entry && entry.svg) {
        parsedSvg = parse(entry.svg);
      }
      // create icon and title node wrapped in div
      var titleNode = {
        type: "element",
        children: [{
          type: "element",
          tagName: "span",
          data: {
            hName: "span",
            hProperties: {
              style: "color:".concat(entry === null || entry === void 0 ? void 0 : entry.color),
              className: "callout-icon"
            },
            hChildren: (_parsedSvg = parsedSvg) !== null && _parsedSvg !== void 0 && _parsedSvg.children ? parsedSvg.children : []
          }
        }, {
          type: "element",
          children: [title_paragraph],
          data: {
            hName: "strong"
          }
        }],
        data: _objectSpread2(_objectSpread2({}, (_blockquote$children$ = blockquote.children[0]) === null || _blockquote$children$ === void 0 ? void 0 : _blockquote$children$.data), {}, {
          hProperties: {
            className: "".concat(formatClassNameMap(config.classNameMaps.title)(keyword), " ").concat(isOneOfKeywords ? keyword : "note"),
            style: "background-color: ".concat(entry === null || entry === void 0 ? void 0 : entry.color, "1a;")
          }
        })
      };
      blockquote.children.shift();
      // wrap blockquote content in div
      var contentNode = {
        type: "element",
        children: blockquote.children,
        data: {
          hProperties: {
            className: "callout-content",
            style: parent.type !== "root" ? "border-right:1px solid ".concat(entry === null || entry === void 0 ? void 0 : entry.color, "33;\n                border-bottom:1px solid ").concat(entry === null || entry === void 0 ? void 0 : entry.color, "33;") : ""
          }
        }
      };
      if (blockquote.children.length > 0) blockquote.children = [contentNode];
      blockquote.children.unshift(titleNode);
      // Add classes for the callout block
      var classList = [formatClassNameMap(config.classNameMaps.block)(keyword.toLowerCase())];
      if (foldChar) {
        classList.push('callout-foldable');
        if (foldChar === '-') {
          classList.push('callout-folded');
        }
      }
      blockquote.data = config.dataMaps.block(_objectSpread2(_objectSpread2({}, blockquote.data), {}, {
        hProperties: {
          className: classList.join(" "),
          style: "border-left-color:".concat(entry === null || entry === void 0 ? void 0 : entry.color, ";")
        }
      }));
    });
  };
};
var defaultConfig = {
  classNameMaps: {
    block: "callout",
    title: "callout-title"
  },
  dataMaps: {
    block: function block(data) {
      return data;
    },
    title: function title(data) {
      return data;
    }
  },
  types: _objectSpread2({}, calloutTypes)
};
function formatClassNameMap(gen) {
  return function (title) {
    var classNames = typeof gen == "function" ? gen(title) : gen;
    return _typeof(classNames) == "object" ? classNames.join(" ") : classNames;
  };
}

var Callout = function Callout(_ref) {
  var className = _ref.className,
    children = _ref.children;
  // If it's not a foldable callout, just render it as a blockquote
  if (!className.includes("callout-foldable")) {
    return jsx("blockquote", {
      className: className,
      children: children
    });
  }
  // If we're here, it's a foldable callout
  var elem = useRef(null);
  var handleClick = function handleClick() {
    elem.current.classList.toggle("callout-folded");
  };
  return jsx("blockquote", {
    className: className,
    ref: elem,
    onClick: handleClick,
    children: children
  });
};

export { Callout, callouts, callouts as default, defaultConfig };
