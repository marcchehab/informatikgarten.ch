import { toMarkdown } from 'mdast-util-wiki-link';
import { codes } from 'micromark-util-symbol/codes.js';
import fs from 'fs';
import path from 'path';

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
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
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
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
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
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

function isEndOfLineOrFile(code) {
  return code === codes.carriageReturnLineFeed || code === codes.carriageReturn || code === codes.lineFeed || code === codes.eof;
}
/**
 * Token types:
 * - `wikiLink`:
 * - `wikiLinkMarker`: The opening and closing brackets
 * - `wikiLinkData`: The data between the brackets
 * - `wikiLinkTarget`: The target of the link (the part before the alias divider)
 * - `wikiLinkAliasMarker`: The alias divider
 * - `wikiLinkAlias`: The alias of the link (the part after the alias divider)
 * */
function wikiLink() {
  var _text;
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var aliasDivider = opts.aliasDivider || "|";
  var aliasMarker = aliasDivider.charCodeAt(0);
  var startMarker = codes.leftSquareBracket;
  var embedStartMarker = codes.exclamationMark;
  var endMarker = codes.rightSquareBracket;
  function tokenize(effects, ok, nok) {
    var data = false;
    var alias = false;
    var startMarkerCount = 0;
    var endMarkerCount = 0;
    return start;
    // recognize the start of a wiki link
    function start(code) {
      if (code === startMarker) {
        effects.enter("wikiLink");
        effects.enter("wikiLinkMarker");
        return consumeStart(code);
      } else if (code === embedStartMarker) {
        effects.enter("wikiLink", {
          isType: "embed"
        });
        effects.enter("wikiLinkMarker", {
          isType: "embed"
        });
        return consumeStart(code);
      } else {
        return nok(code);
      }
    }
    function consumeStart(code) {
      // when coursor is at the first character after the start marker `[[`
      if (startMarkerCount === 2) {
        effects.exit("wikiLinkMarker");
        return consumeData(code);
      }
      if (code === startMarker || code === embedStartMarker) {
        if (code === startMarker) {
          startMarkerCount++;
        }
        effects.consume(code);
        return consumeStart;
      } else {
        return nok(code);
      }
    }
    function consumeData(code) {
      if (isEndOfLineOrFile(code)) {
        return nok(code);
      }
      effects.enter("wikiLinkData");
      effects.enter("wikiLinkTarget");
      return consumeTarget(code);
    }
    function consumeTarget(code) {
      if (code === aliasMarker) {
        if (!data) return nok(code);
        effects.exit("wikiLinkTarget");
        effects.enter("wikiLinkAliasMarker");
        return consumeAliasMarker(code);
      }
      if (code === endMarker) {
        if (!data) return nok(code);
        effects.exit("wikiLinkTarget");
        effects.exit("wikiLinkData");
        effects.enter("wikiLinkMarker");
        return consumeEnd(code);
      }
      if (isEndOfLineOrFile(code)) {
        return nok(code);
      }
      data = true;
      effects.consume(code);
      return consumeTarget;
    }
    function consumeAliasMarker(code) {
      effects.consume(code);
      effects.exit("wikiLinkAliasMarker");
      effects.enter("wikiLinkAlias");
      return consumeAlias(code);
    }
    function consumeAlias(code) {
      if (code === endMarker) {
        if (!alias) return nok(code);
        effects.exit("wikiLinkAlias");
        effects.exit("wikiLinkData");
        effects.enter("wikiLinkMarker");
        return consumeEnd(code);
      }
      if (isEndOfLineOrFile(code)) {
        return nok(code);
      }
      alias = true;
      effects.consume(code);
      return consumeAlias;
    }
    function consumeEnd(code) {
      if (endMarkerCount === 2) {
        effects.exit("wikiLinkMarker");
        effects.exit("wikiLink");
        return ok(code);
      }
      if (code !== endMarker) {
        return nok(code);
      }
      effects.consume(code);
      endMarkerCount++;
      return consumeEnd;
    }
  }
  var wikiLinkConstruct = {
    tokenize: tokenize
  };
  return {
    text: (_text = {}, _defineProperty(_text, codes.leftSquareBracket, wikiLinkConstruct), _defineProperty(_text, codes.exclamationMark, wikiLinkConstruct), _text)
  };
}

// TODO why only these?
var supportedFileFormats = ["webp", "jpg", "jpeg", "gif", "bmp", "svg", "apng", "png", "avif", "ico", "pdf", "mp4", "webm", "ogv", "mov", "mkv", "excalidraw"];
var isSupportedFileFormat = function isSupportedFileFormat(filePath) {
  var fileExtensionPattern = /\.([0-9a-z]{1,10})$/i;
  var match = filePath.match(fileExtensionPattern);
  if (!match) {
    return [false, null];
  }
  var _match = _slicedToArray(match, 2),
    extension = _match[1];
  var isSupported = supportedFileFormats.includes(extension);
  return [isSupported, extension];
};

var defaultWikiLinkResolver = function defaultWikiLinkResolver(target) {
  // for [[#heading]] links
  if (!target) {
    return [];
  }
  var permalink = target.replace(/\/index$/, "");
  // TODO what to do with [[index]] link?
  if (permalink.length === 0) {
    permalink = "/";
  }
  return [permalink];
};
// mdas-util-from-markdown extension
// https://github.com/syntax-tree/mdast-util-from-markdown#extension
function fromMarkdown() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var pathFormat = opts.pathFormat || "raw";
  var permalinks = opts.permalinks || [];
  var wikiLinkResolver = opts.wikiLinkResolver || defaultWikiLinkResolver;
  var newClassName = opts.newClassName || "new";
  var wikiLinkClassName = opts.wikiLinkClassName || "internal";
  var defaultHrefTemplate = function defaultHrefTemplate(permalink) {
    return permalink;
  };
  var hrefTemplate = opts.hrefTemplate || defaultHrefTemplate;
  function top(stack) {
    return stack[stack.length - 1];
  }
  function enterWikiLink(token) {
    this.enter({
      type: "wikiLink",
      data: {
        isEmbed: token.isType === "embed",
        target: null,
        alias: null,
        permalink: null,
        exists: null,
        // fields for mdast-util-to-hast (used e.g. by remark-rehype)
        hName: null,
        hProperties: null,
        hChildren: null
      }
    }, token);
  }
  function exitWikiLinkTarget(token) {
    var target = this.sliceSerialize(token);
    var current = top(this.stack);
    current.data.target = target;
  }
  function exitWikiLinkAlias(token) {
    var alias = this.sliceSerialize(token);
    var current = top(this.stack);
    current.data.alias = alias;
  }
  function exitWikiLink(token) {
    var wikiLink = this.exit(token);
    var _wikiLink$data = wikiLink.data,
      isEmbed = _wikiLink$data.isEmbed,
      target = _wikiLink$data.target,
      alias = _wikiLink$data.alias;
    // eslint-disable-next-line no-useless-escape
    var wikiLinkWithHeadingPattern = /^((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?)(#(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/;
    var _target$match = target.match(wikiLinkWithHeadingPattern),
      _target$match2 = _slicedToArray(_target$match, 3),
      path = _target$match2[1],
      _target$match2$ = _target$match2[2],
      heading = _target$match2$ === void 0 ? "" : _target$match2$;
    var possibleWikiLinkPermalinks = wikiLinkResolver(path);
    var matchingPermalink = permalinks.find(function (e) {
      return possibleWikiLinkPermalinks.find(function (p) {
        if (pathFormat === "obsidian-short") {
          if (e === p || e.endsWith(p)) {
            return true;
          }
        } else if (pathFormat === "obsidian-absolute") {
          if (e === "/" + p) {
            return true;
          }
        } else {
          if (e === p) {
            return true;
          }
        }
        return false;
      });
    });
    // TODO this is ugly
    var link = matchingPermalink || (pathFormat === "obsidian-absolute" ? "/" + possibleWikiLinkPermalinks[0] : possibleWikiLinkPermalinks[0]) || "";
    wikiLink.data.exists = !!matchingPermalink;
    wikiLink.data.permalink = link;
    // remove leading # if the target is a heading on the same page
    var displayName = alias || target.replace(/^#/, "");
    var headingId = heading.replace(/\s+/g, "-").toLowerCase();
    var classNames = wikiLinkClassName;
    if (!matchingPermalink) {
      classNames += " " + newClassName;
    }
    if (isEmbed) {
      var _isSupportedFileForma = isSupportedFileFormat(target),
        _isSupportedFileForma2 = _slicedToArray(_isSupportedFileForma, 2),
        isSupportedFormat = _isSupportedFileForma2[0],
        format = _isSupportedFileForma2[1];
      if (!isSupportedFormat) {
        // Temporarily render note transclusion as a regular wiki link
        if (!format) {
          wikiLink.data.hName = "a";
          wikiLink.data.hProperties = {
            className: classNames + " " + "transclusion",
            href: hrefTemplate(link) + headingId
          };
          wikiLink.data.hChildren = [{
            type: "text",
            value: displayName
          }];
        } else {
          wikiLink.data.hName = "p";
          wikiLink.data.hChildren = [{
            type: "text",
            value: "![[".concat(target, "]]")
          }];
        }
      } else if (format === "pdf") {
        wikiLink.data.hName = "iframe";
        wikiLink.data.hProperties = {
          className: classNames,
          width: "100%",
          src: "".concat(hrefTemplate(link), "#toolbar=0")
        };
      } else if (["mp4", "webm", "ogv", "mov", "mkv"].includes(format)) {
        wikiLink.data.hName = "video";
        wikiLink.data.hProperties = {
          className: classNames,
          controls: true,
          alt: displayName
        };
        wikiLink.data.hChildren = [{
          type: "element",
          tagName: "source",
          properties: {
            src: hrefTemplate(link)
          },
          children: []
        }];
      } else if (format === "excalidraw") {
        wikiLink.data.hName = "Excalidraw";
        wikiLink.data.hProperties = {
          alt: link,
          srcDark: "/assets/Excalidraw/".concat(link, ".dark.svg"),
          srcLight: "/assets/Excalidraw/".concat(link, ".light.svg")
        };
      } else {
        var _attributes$width;
        var attributeStrings = displayName.split("|");
        var attributes = {
          name: "",
          width: null,
          invert: false
        };
        var _iterator = _createForOfIteratorHelper(attributeStrings),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var attributeString = _step.value;
            if (attributeString === "invert") {
              attributes.invert = true;
            } else if (!isNaN(attributeString)) {
              attributes.width = attributeString;
            } else {
              attributes.name = attributeString;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        var classes = attributes.invert ? classNames + " iginvert" : classNames;
        var src = link.startsWith("/assets/") ? link : "/assets/".concat(link); // TODO this is ugly
        wikiLink.data.hName = "img";
        wikiLink.data.hProperties = {
          className: classes,
          src: src,
          alt: attributes.name,
          width: (_attributes$width = attributes.width) !== null && _attributes$width !== void 0 ? _attributes$width : ""
        };
      }
    } else {
      wikiLink.data.hName = "a";
      wikiLink.data.hProperties = {
        className: classNames,
        href: hrefTemplate(link) + headingId
      };
      wikiLink.data.hChildren = [{
        type: "text",
        value: displayName
      }];
    }
  }
  return {
    enter: {
      wikiLink: enterWikiLink
    },
    exit: {
      wikiLinkTarget: exitWikiLinkTarget,
      wikiLinkAlias: exitWikiLinkAlias,
      wikiLink: exitWikiLink
    }
  };
}

var warningIssued = false;
function remarkWikiLink() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = this.data(); // this is a reference to the processor
  function add(field, value) {
    if (data[field]) data[field].push(value);else data[field] = [value];
  }
  if (!warningIssued && (this.Parser && this.Parser.prototype && this.Parser.prototype.blockTokenizers || this.Compiler && this.Compiler.prototype && this.Compiler.prototype.visitors)) {
    warningIssued = true;
    console.warn("[remark-wiki-link] Warning: please upgrade to remark 13 to use this plugin");
  }
  // add extensions to packages used by remark-parse
  // micromark extensions
  add("micromarkExtensions", wikiLink(opts));
  // mdast-util-from-markdown extensions
  add("fromMarkdownExtensions", fromMarkdown(opts));
  // mdast-util-to-markdown extensions
  add("toMarkdownExtensions", toMarkdown(opts));
}

// recursively get all files in a directory
var recursiveGetFiles = function recursiveGetFiles(dir) {
  var dirents = fs.readdirSync(dir, {
    withFileTypes: true
  });
  var files = dirents.filter(function (dirent) {
    return dirent.isFile();
  }).map(function (dirent) {
    return path.join(dir, dirent.name);
  });
  var dirs = dirents.filter(function (dirent) {
    return dirent.isDirectory();
  }).map(function (dirent) {
    return path.join(dir, dirent.name);
  });
  var _iterator = _createForOfIteratorHelper(dirs),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var d = _step.value;
      files.push.apply(files, _toConsumableArray(recursiveGetFiles(d)));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return files;
};
var getPermalinks = function getPermalinks(markdownFolder) {
  var ignorePatterns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var func = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultPathToPermalinkFunc;
  var files = recursiveGetFiles(markdownFolder);
  var filesFiltered = files.filter(function (file) {
    return !ignorePatterns.some(function (pattern) {
      return file.match(pattern);
    });
  });
  return filesFiltered.map(function (file) {
    return func(file, markdownFolder);
  });
};
var defaultPathToPermalinkFunc = function defaultPathToPermalinkFunc(filePath, markdownFolder) {
  var permalink = filePath.replace(markdownFolder, "") // make the permalink relative to the markdown folder
  .replace(/\.(mdx|md)/, "").replace(/\\/g, "/") // replace windows backslash with forward slash
  .replace(/\/index$/, ""); // remove index from the end of the permalink
  return permalink.length > 0 ? permalink : "/"; // for home page
};

export { remarkWikiLink as default, getPermalinks, remarkWikiLink };
