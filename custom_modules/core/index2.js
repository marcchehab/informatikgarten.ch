import { useTheme } from 'next-themes';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.search.js';
import { jsx, jsxs, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { forwardRef, useState, useEffect, useRef, Fragment, useCallback } from 'react';
import Link from 'next/link.js';
import 'core-js/modules/es.string.starts-with.js';
import 'core-js/modules/es.array.reduce.js';
import { offset, autoPlacement, shift, arrow, inline } from '@floating-ui/react-dom';
import { useFloating, useInteractions, useHover, useFocus, useRole, useDismiss, FloatingPortal } from '@floating-ui/react-dom-interactions';
import { AnimatePresence, motion } from 'framer-motion';
import 'core-js/modules/es.promise.js';
import dynamic from 'next/dynamic.js';
import { Dialog, Menu, Disclosure, Transition } from '@headlessui/react';
import { useRouter } from 'next/router.js';
import Head from 'next/head.js';
import clsx from 'clsx';
import 'core-js/modules/es.array.flat-map.js';
import 'core-js/modules/es.array.unscopables.flat-map.js';
import 'core-js/modules/es.parse-float.js';
import 'core-js/modules/es.array.sort.js';
import '@giscus/react';
import 'disqus-react';
import 'core-js/modules/es.symbol.description.js';
import Script from 'next/script.js';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var BaseLink = /*#__PURE__*/forwardRef(function (props, ref) {
  var href = props.href,
    children = props.children,
    rest = __rest(props, ["href", "children"]);
  return jsx(Link, __assign({
    href: href,
    ref: ref
  }, rest, {
    children: children
  }));
});
BaseLink.displayName = "BaseLink";

var ThemeSelector = function ThemeSelector(_a) {
  var defaultTheme = _a.defaultTheme,
    toggleIcon = _a.toggleIcon;
  var _b = useState(false),
    mounted = _b[0],
    setMounted = _b[1];
  var _c = useTheme(),
    theme = _c.theme,
    setTheme = _c.setTheme;
  useEffect(function () {
    return setMounted(true);
  }, []);
  /** Avoid Hydration Mismatch
   *  https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
   */
  if (!mounted) return null;
  // TODO why?
  if (!defaultTheme) return null;
  return jsx("button", __assign({
    type: "button",
    className: "\n        min-w-fit transition duration-500\n        ".concat(theme === "dark" ? "grayscale opacity-70" : "", "\n      "),
    onClick: function () {
      return setTheme(theme === "dark" ? "light" : "dark");
    }
  }, {
    children: jsx("img", {
      src: toggleIcon,
      alt: "toggle theme",
      width: 24,
      height: 24,
      className: "max-w-24 max-h-24"
    })
  }));
};

var tooltipBoxStyle = function tooltipBoxStyle(theme) {
  return {
    height: "auto",
    maxWidth: "40rem",
    padding: "1rem",
    background: theme === "light" ? "#fff" : "#000",
    color: theme === "light" ? "rgb(99, 98, 98)" : "#A8A8A8",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.55) 0px 0px 16px -3px"
  };
};
var tooltipBodyStyle = function tooltipBodyStyle(theme) {
  return {
    maxHeight: "4.8rem",
    position: "relative",
    lineHeight: "1.2rem",
    overflow: "hidden"
  };
};
var tooltipArrowStyle = function tooltipArrowStyle(_a) {
  var _b;
  var theme = _a.theme,
    x = _a.x,
    y = _a.y,
    side = _a.side;
  return _b = {
    position: "absolute",
    left: x != null ? "".concat(x, "px") : "",
    top: y != null ? "".concat(y, "px") : "",
    right: "",
    bottom: ""
  }, _b[side] = "-4px", _b.height = "8px", _b.width = "8px", _b.background = theme === "light" ? "#fff" : "#000", _b.transform = "rotate(45deg)", _b;
};
var Tooltip = function Tooltip(_a) {
  var _b;
  var render = _a.render,
    data = _a.data,
    usehook = _a.usehook,
    props = __rest(_a, ["render", "data", "usehook"]);
  var theme = "light"; // temporarily hard-coded; light theme tbd in next PR
  var arrowRef = useRef(null);
  var _c = useState(false),
    showTooltip = _c[0],
    setShowTooltip = _c[1];
  var _d = useState({
      content: jsx(Fragment, {}),
      image: ""
    }),
    tooltipData = _d[0],
    setTooltipData = _d[1];
  var _e = useState(false),
    tooltipContentLoaded = _e[0],
    setTooltipContentLoaded = _e[1];
  // floating-ui hook
  var _f = useFloating({
      open: showTooltip,
      onOpenChange: setShowTooltip,
      middleware: [offset(5), autoPlacement({
        padding: 5
      }), shift({
        padding: 5
      }), arrow({
        element: arrowRef,
        padding: 4
      }), inline() // correct position for multiline anchor tags
      ]
    }),
    x = _f.x,
    y = _f.y,
    reference = _f.reference,
    // trigger element back ref
    floating = _f.floating,
    // tooltip back ref
    placement = _f.placement,
    // default: 'bottom'
    strategy = _f.strategy,
    // default: 'absolute'
    context = _f.context,
    _g = _f.middlewareData.arrow,
    _h = _g === void 0 ? {} : _g,
    _j = _h.x,
    arrowX = _j === void 0 ? 0 : _j,
    _k = _h.y,
    arrowY = _k === void 0 ? 0 : _k;
  // floating-ui hook
  var _l = useInteractions([useHover(context, {
      delay: 100
    }), useFocus(context), useRole(context, {
      role: "tooltip"
    }), useDismiss(context, {
      ancestorScroll: true
    })]),
    getReferenceProps = _l.getReferenceProps,
    getFloatingProps = _l.getFloatingProps;
  var triggerElementProps = getReferenceProps(__assign(__assign({}, props), {
    ref: reference
  }));
  var tooltipProps = getFloatingProps({
    ref: floating,
    style: {
      position: strategy,
      left: x !== null && x !== void 0 ? x : "",
      top: y !== null && y !== void 0 ? y : ""
    }
  });
  var arrowPlacement = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[placement.split("-")[0]];
  // get tooltip data
  var image;
  var PageContent;
  var filePath = props.href.slice(1); // remove slash from the beginning
  var page = data.find(function (p) {
    return p._raw.flattenedPath === filePath;
  });
  if (page && page.body.code.length > 0) {
    var Component = usehook(page.body.code);
    PageContent = Component;
    image = (_b = page.image) !== null && _b !== void 0 ? _b : "";
  }
  var fetchTooltipContent = function fetchTooltipContent() {
    setTooltipContentLoaded(false);
    var Body = jsx(Fragment, {});
    // strip out all other elements from tooltip content
    // since we only need the paragraph
    var elems = ["h1", "h2", "h3", "div", "img", "pre", "blockquote"].reduce(function (acc, elem) {
      var _a;
      return __assign(__assign({}, acc), (_a = {}, _a[elem] = function () {
        return jsx(Fragment, {});
      }, _a));
    }, {});
    if (PageContent) {
      Body = jsx(PageContent, {
        components: __assign(__assign({}, elems), {
          p: function (props) {
            return jsx(Fragment, __assign({}, props));
          },
          wrapper: function (props) {
            return jsx("div", __assign({
              className: "line-clamp-3"
            }, props));
          }
        })
      });
      setTooltipData({
        content: Body,
        image: image
      });
      setTooltipContentLoaded(true);
    }
  };
  useEffect(function () {
    if (showTooltip) {
      fetchTooltipContent();
    }
  }, [showTooltip]);
  return jsxs(Fragment, {
    children: [render === null || render === void 0 ? void 0 : render(triggerElementProps), jsx(FloatingPortal, {
      children: jsx(AnimatePresence, {
        children: showTooltip && tooltipContentLoaded && jsxs(motion.div, __assign({}, tooltipProps, {
          initial: {
            opacity: 0,
            scale: 0.85
          },
          animate: {
            opacity: 1,
            scale: 1
          },
          exit: {
            opacity: 0
          },
          transition: {
            type: "spring",
            damping: 20,
            stiffness: 300
          }
        }, {
          children: [jsxs("div", __assign({
            className: "tooltip-box flex items-center space-x-2",
            style: tooltipBoxStyle(theme)
          }, {
            children: [tooltipData.image && jsx("img", {
              src: tooltipData.image,
              alt: "",
              width: 100,
              height: 100
            }), tooltipData.content && jsx("div", __assign({
              className: "tooltip-body",
              style: tooltipBodyStyle()
            }, {
              children: tooltipData.content
            }))]
          })), jsx("div", {
            ref: arrowRef,
            className: "tooltip-arrow",
            style: tooltipArrowStyle({
              theme: theme,
              x: arrowX,
              y: arrowY,
              side: arrowPlacement
            })
          })]
        }))
      })
    })]
  });
};

var twitterWidgetJs = "https://platform.twitter.com/widgets.js";
var TweetState;
(function (TweetState) {
  TweetState[TweetState["LOADING"] = 0] = "LOADING";
  TweetState[TweetState["LOADED"] = 1] = "LOADED";
  TweetState[TweetState["FAILED"] = 2] = "FAILED";
})(TweetState || (TweetState = {}));
function TwitterEmbed(_a) {
  var url = _a.url;
    __rest(_a, ["url"]);
  var ref = useRef(null);
  var _b = useState(TweetState.LOADING),
    tweetState = _b[0],
    setTweetState = _b[1];
  var tweetId = url.split("status/").pop();
  useEffect(function () {
    var renderTweet = function renderTweet() {
      window.twttr.widgets.createTweet(tweetId, ref.current, {
        theme: "dark"
      }).then(function (el) {
        if (el) {
          setTweetState(TweetState.LOADED);
        } else {
          setTweetState(TweetState.FAILED);
        }
      });
      return window.twttr.widgets.load(ref.current);
    };
    if (!window.twttr) {
      var script = document.createElement("script");
      script.src = twitterWidgetJs;
      script.async = true;
      script.onload = function () {
        return renderTweet();
      };
      document.head.appendChild(script);
    } else {
      renderTweet();
    }
  }, [tweetId]);
  return jsxs(Fragment$1, {
    children: [tweetState === TweetState.LOADING && jsxs("div", __assign({
      className: "relative my-4 w-full sm:max-w-xl bg-neutral-900 drop-shadow-md rounded-lg"
    }, {
      children: [jsxs("div", __assign({
        className: "absolute flex flex-col flex-wrap break-all items-center justify-center bg-slate-700/60 w-full h-full px-4 py-2 rounded-lg top-0 left-0 z-10"
      }, {
        children: [jsxs("svg", __assign({
          role: "img",
          viewBox: "0 0 24 24",
          xmlns: "http://www.w3.org/2000/svg",
          className: "w-6 absolute right-4 top-4"
        }, {
          children: [jsx("title", {
            children: "Twitter"
          }), jsx("path", {
            fill: "#1DA1F2",
            d: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
          })]
        })), jsx("div", __assign({
          className: "text-gray-300 font-bold my-2 italic"
        }, {
          children: "Loading tweet..."
        }))]
      })), jsxs("div", __assign({
        className: "p-3 space-y-4 animate-pulse"
      }, {
        children: [jsxs("div", __assign({
          className: "flex items-center"
        }, {
          children: [jsx("div", {
            className: "mr-2 h-10 w-10 rounded-full bg-slate-700"
          }), jsx("div", {
            className: "w-1/3 h-4 bg-slate-700"
          })]
        })), jsxs("div", __assign({
          className: "space-y-2"
        }, {
          children: [jsx("div", {
            className: "w-2/3 h-3 bg-slate-700"
          }), jsx("div", {
            className: "w-2/3 h-3 bg-slate-700"
          })]
        })), jsxs("div", __assign({
          className: "flex space-x-4"
        }, {
          children: [jsx("div", {
            className: "w-1/4 h-3 bg-slate-700"
          }), jsx("div", {
            className: "w-1/4 h-3 bg-slate-700"
          }), jsx("div", {
            className: "w-1/4 h-3 bg-slate-700"
          })]
        }))]
      }))]
    })), jsx("div", {
      className: "twitter-tweet",
      ref: ref
    })]
  });
}

// TODO it's a mess, move twitter embeds support to remark-embed
var TWITTER_REGEX = /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;
var CustomLink = function CustomLink(_a) {
  var data = _a.data,
    usehook = _a.usehook,
    preview = _a.preview,
    props = __rest(_a, ["data", "usehook", "preview"]);
  var href = props.href;
  var isInternalLink = !href.startsWith("http");
  // eslint-disable-next-line no-useless-escape
  var isHeadingLink = href.startsWith("#");
  var isTwitterLink = TWITTER_REGEX.test(href);
  // Use next link for pages within app and <a> for external links.
  // https://nextjs.org/learn/basics/navigate-between-pages/client-side
  if (isInternalLink) {
    if (preview && !isHeadingLink) {
      return jsx(Tooltip, __assign({}, props, {
        data: data,
        usehook: usehook,
        render: function (tooltipTriggerProps) {
          return jsx(Link, __assign({}, tooltipTriggerProps));
        }
      }));
    } else {
      return jsx(Link, __assign({}, props));
    }
  }
  if (isTwitterLink) {
    return jsx(TwitterEmbed, __assign({
      url: href
    }, props));
  }
  return jsx("a", __assign({
    target: "_blank",
    rel: "noopener noreferrer"
  }, props, {
    children: props.children
  }));
};

var GitHubIcon = function GitHubIcon(props) {
  return jsx("svg", __assign({
    "aria-hidden": "true",
    viewBox: "0 0 16 16"
  }, props, {
    children: jsx("path", {
      d: "M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
    })
  }));
};

var DiscordIcon = function DiscordIcon(props) {
  return jsx("svg", __assign({
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16"
  }, props, {
    children: jsx("path", {
      d: "M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"
    })
  }));
};

var MenuIcon = function MenuIcon(props) {
  return jsx("svg", __assign({
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, props, {
    children: jsx("path", {
      d: "M4 7h16M4 12h16M4 17h16"
    })
  }));
};

var CloseIcon = function CloseIcon(props) {
  return jsx("svg", __assign({
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, props, {
    children: jsx("path", {
      d: "M5 5l14 14M19 5l-14 14"
    })
  }));
};

var SearchIcon = function SearchIcon(props) {
  return jsx("svg", __assign({
    "aria-hidden": "true",
    viewBox: "0 0 20 20"
  }, props, {
    children: jsx("path", {
      d: "M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z"
    })
  }));
};

var ChevronRightIcon = function ChevronRightIcon(props) {
  return jsx("svg", __assign({
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": "true"
  }, props, {
    children: jsx("path", {
      d: "M6.75 5.75 9.25 8l-2.5 2.25",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  }));
};

// TODO types
var SearchField = function SearchField(props) {
  var modifierKey = props.modifierKey,
    onOpen = props.onOpen,
    mobile = props.mobile;
  return jsxs("button", __assign({
    type: "button",
    className: "\n      group flex h-6 w-6 items-center justify-center \n      ".concat(mobile ? "sm:hidden justify-start min-w-full flex-none rounded-lg px-4 py-5 my-6 text-sm ring-1 ring-slate-200 dark:bg-slate-800/75 dark:ring-inset dark:ring-white/5" : "hidden sm:flex sm:justify-start md:h-auto md:w-auto xl:w-full max-w-[380px] shrink xl:rounded-lg xl:py-2.5 xl:pl-4 xl:pr-3.5 md:text-sm xl:ring-1 xl:ring-slate-200 xl:hover:ring-slate-300 dark:xl:bg-slate-800/75 dark:xl:ring-inset dark:xl:ring-white/5 dark:xl:hover:bg-slate-700/40 dark:xl:hover:ring-slate-500", "\n    "),
    onClick: onOpen
  }, {
    children: [jsx(SearchIcon, {
      className: "h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 md:group-hover:fill-slate-400"
    }), jsx("span", __assign({
      className: "\n        text-slate-500 dark:text-slate-400\n        ".concat(mobile ? "w-full not-sr-only text-left ml-2" : "hidden xl:block sr-only md:not-sr-only md:ml-2", "\n      ")
    }, {
      children: "Search"
    })), modifierKey && jsxs("kbd", __assign({
      className: "\n          ".concat(mobile ? "hidden" : "ml-auto font-medium text-slate-400 dark:text-slate-500 hidden xl:block", "\n        ")
    }, {
      children: [jsx("kbd", __assign({
        className: "font-sans"
      }, {
        children: modifierKey
      })), jsx("kbd", __assign({
        className: "font-sans"
      }, {
        children: "K"
      }))]
    }))]
  }));
};

var AlgoliaSearchProvider = dynamic(function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, import('./Algolia.js').then(function (mod) {
            return mod.AlgoliaSearchProvider;
          })];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
}, {
  ssr: false
});
var AlgoliaSearchContext = dynamic(function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, import('./Algolia.js').then(function (mod) {
            return mod.AlgoliaSearchContext.Consumer;
          })];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
}, {
  ssr: false
});
var KBarProvider = dynamic(function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, import('./KBar.js').then(function (mod) {
            return mod.KBarSearchProvider;
          })];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
}, {
  ssr: false
});
var KBarSearchContext = dynamic(function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, import('kbar').then(function (mod) {
            return mod.KBarContext.Consumer;
          })];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
}, {
  ssr: false
});
var SearchProvider = function SearchProvider(_a) {
  var searchConfig = _a.searchConfig,
    children = _a.children;
  switch (searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.provider) {
    case "algolia":
      return jsx(AlgoliaSearchProvider, __assign({
        config: searchConfig.config
      }, {
        children: children
      }));
    case "kbar":
      return jsx(KBarProvider, __assign({
        config: searchConfig.config
      }, {
        children: children
      }));
    default:
      return jsx(Fragment$1, {
        children: children
      });
  }
};
var SearchContext = function SearchContext(provider) {
  switch (provider) {
    case "algolia":
      return AlgoliaSearchContext;
    case "kbar":
      return KBarSearchContext;
    default:
      return undefined;
  }
};

// TODO: Search doesn't appear
var NavMobile = function NavMobile(_a) {
  var children = _a.children,
    title = _a.title,
    links = _a.links,
    search = _a.search;
  var router = useRouter();
  var _b = useState(false),
    isOpen = _b[0],
    setIsOpen = _b[1];
  var _c = useState(),
    Search = _c[0],
    setSearch = _c[1]; // TODO types
  useEffect(function () {
    if (!isOpen) return;
    function onRouteChange() {
      setIsOpen(false);
    }
    router.events.on("routeChangeComplete", onRouteChange);
    router.events.on("routeChangeError", onRouteChange);
    return function () {
      router.events.off("routeChangeComplete", onRouteChange);
      router.events.off("routeChangeError", onRouteChange);
    };
  }, [router, isOpen]);
  useEffect(function () {
    if (search) {
      setSearch(SearchContext(search.provider));
    }
  }, [search]);
  return jsxs(Fragment$1, {
    children: [jsx("button", __assign({
      type: "button",
      onClick: function () {
        return setIsOpen(true);
      },
      className: "relative",
      "aria-label": "Open navigation"
    }, {
      children: jsx(MenuIcon, {
        className: "h-6 w-6 stroke-slate-500"
      })
    })), jsx(Dialog, __assign({
      open: isOpen,
      onClose: setIsOpen,
      className: "fixed inset-0 z-50 flex items-start overflow-y-auto bg-background-dark/50 pr-10 backdrop-blur lg:hidden",
      "aria-label": "Navigation"
    }, {
      children: jsxs(Dialog.Panel, __assign({
        className: "relative min-h-full w-full max-w-xs bg-background px-4 pt-5 pb-12 dark:bg-background-dark sm:px-6"
      }, {
        children: [jsxs("div", __assign({
          className: "flex items-center mb-6"
        }, {
          children: [jsx("button", __assign({
            type: "button",
            onClick: function () {
              return setIsOpen(false);
            },
            "aria-label": "Close navigation"
          }, {
            children: jsx(CloseIcon, {
              className: "h-6 w-6 stroke-slate-500"
            })
          })), jsx(Link, __assign({
            href: "/",
            className: "ml-6",
            "aria-label": "Home page",
            legacyBehavior: true
          }, {
            children: jsx("div", __assign({
              className: "font-extrabold text-primary dark:text-primary-dark text-lg ml-6"
            }, {
              children: title
            }))
          }))]
        })), Search && jsx(Search, {
          children: function (_a) {
            var query = _a.query;
            return jsx(SearchField, {
              mobile: true,
              onOpen: query.toggle
            });
          }
        }), links && jsx("ul", __assign({
          className: "mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
        }, {
          children: links.map(function (link) {
            return jsx(Menu, __assign({
              as: "div",
              className: "relative"
            }, {
              children: jsx(Menu.Button, {
                children: jsx("li", {
                  children: jsx(Link, __assign({
                    href: link.href,
                    className: "\n                  block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                  }, {
                    children: link.name
                  }))
                }, link.href)
              })
            }), link.name);
          })
        })), jsx("div", __assign({
          className: "pt-6"
        }, {
          children: children
        }))]
      }))
    }))]
  });
};

var NavItem = function NavItem(_a) {
  var link = _a.link;
  return jsx(Menu, __assign({
    as: "div",
    className: "relative"
  }, {
    children: jsx(Link, __assign({
      href: link.href,
      className: "text-slate-500 inline-flex items-center mr-2 px-1 pt-1 text-sm font-medium hover:text-slate-600"
    }, {
      children: link.name
    }))
  }));
};

var NavTitle = function NavTitle(_a) {
  var title = _a.title,
    logo = _a.logo,
    version = _a.version;
  return jsxs(Link, __assign({
    href: "/",
    "aria-label": "Home page",
    className: "flex items-center font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white"
  }, {
    children: [logo && jsx("img", {
      src: logo,
      alt: title,
      className: "nav-logo mr-1 fill-white"
    }), title && jsx("span", {
      children: title
    }), version && jsx("span", __assign({
      className: "inline-flex items-center rounded-full bg-gray-50 ml-2 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
    }, {
      children: version
    }))]
  }));
};

var icons = {
  github: GitHubIcon,
  discord: DiscordIcon
};
var NavSocial = function NavSocial(_a) {
  var links = _a.links;
  return jsx(Fragment$1, {
    children: links.map(function (_a) {
      var label = _a.label,
        href = _a.href;
      var Icon = icons[label];
      return jsx(Link, __assign({
        href: href,
        "aria-label": label,
        className: "group"
      }, {
        children: jsx(Icon, {
          className: "h-6 w-6 dark:fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300"
        })
      }), label);
    })
  });
};

var Nav = function Nav(_a) {
  var children = _a.children,
    title = _a.title,
    logo = _a.logo,
    version = _a.version,
    links = _a.links,
    search = _a.search,
    social = _a.social,
    defaultTheme = _a.defaultTheme,
    themeToggleIcon = _a.themeToggleIcon;
  var _b = useState(),
    modifierKey = _b[0],
    setModifierKey = _b[1];
  var _c = useState(),
    Search = _c[0],
    setSearch = _c[1]; // TODO types
  useEffect(function () {
    var isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
    setModifierKey(isMac ? "⌘" : "Ctrl ");
  }, []);
  useEffect(function () {
    if (search) {
      setSearch(SearchContext(search.provider));
    }
  }, [search]);
  return jsxs("nav", __assign({
    className: "flex justify-between"
  }, {
    children: [jsx("div", __assign({
      className: "mr-2 sm:mr-4 flex lg:hidden"
    }, {
      children: jsx(NavMobile, __assign({}, {
        title: title,
        links: links,
        social: social,
        search: search,
        defaultTheme: defaultTheme,
        themeToggleIcon: themeToggleIcon
      }, {
        children: children
      }))
    })), jsxs("div", __assign({
      className: "flex flex-none items-center"
    }, {
      children: [jsx(NavTitle, {
        title: title,
        logo: logo,
        version: version
      }), links && jsx("div", __assign({
        className: "hidden lg:flex ml-8 mr-6 sm:mr-8 md:mr-0"
      }, {
        children: links.map(function (link) {
          return jsx(NavItem, {
            link: link
          }, link.name);
        })
      }))]
    })), jsxs("div", __assign({
      className: "relative flex items-center basis-auto justify-end gap-6 xl:gap-8 md:shrink w-full"
    }, {
      children: [Search && jsx(Search, {
        children: function (_a) {
          var query = _a.query;
          return jsx(SearchField, {
            modifierKey: modifierKey,
            onOpen: query === null || query === void 0 ? void 0 : query.toggle
          });
        }
      }), jsx(ThemeSelector, {
        defaultTheme: defaultTheme,
        toggleIcon: themeToggleIcon
      }), social && jsx(NavSocial, {
        links: social
      })]
    }))]
  }));
};

var EditThisPage = function EditThisPage(_a) {
  var url = _a.url;
  return jsx("div", __assign({
    className: "mb-10 prose dark:prose-invert p-6 mx-auto"
  }, {
    children: jsxs("a", __assign({
      className: "flex no-underline font-semibold justify-center",
      href: url,
      target: "_blank",
      rel: "noopener noreferrer"
    }, {
      children: ["Edit this page", jsx("span", __assign({
        className: "mx-1"
      }, {
        children: jsx("svg", __assign({
          xmlns: "http://www.w3.org/2000/svg",
          className: "h-6 w-6",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          strokeWidth: "2"
        }, {
          children: jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          })
        }))
      }))]
    }))
  }));
};

// TODO types
var useTableOfContents = function useTableOfContents(tableOfContents) {
  var _a;
  var _b = useState((_a = tableOfContents[0]) === null || _a === void 0 ? void 0 : _a.id),
    currentSection = _b[0],
    setCurrentSection = _b[1];
  var getHeadings = useCallback(function (toc) {
    return toc.flatMap(function (node) {
      return __spreadArray([node.id], node.children.flatMap(function (child) {
        return __spreadArray([child.id], child.children.map(function (subChild) {
          return subChild.id;
        }), true);
      }), true);
    }).map(function (id) {
      var el = document.getElementById(id);
      if (!el) return null;
      var style = window.getComputedStyle(el);
      var scrollMt = parseFloat(style.scrollMarginTop);
      var top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
      return {
        id: id,
        top: top
      };
    }).filter(function (el) {
      return !!el;
    });
  }, []);
  useEffect(function () {
    if (tableOfContents.length === 0) return;
    var headings = getHeadings(tableOfContents);
    function onScroll() {
      var top = window.scrollY + 4.5;
      var current = headings[0].id;
      headings.forEach(function (heading) {
        if (top >= heading.top) {
          current = heading.id;
        }
        return current;
      });
      setCurrentSection(current);
    }
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return function () {
      window.removeEventListener("scroll", onScroll);
    };
  }, [getHeadings, tableOfContents]);
  return currentSection;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
var pageview = function pageview(_a) {
  var url = _a.url,
    analyticsID = _a.analyticsID;
  if (typeof window.gtag !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.gtag("config", analyticsID, {
      page_path: url
    });
  }
};

function collectHeadings(nodes) {
  var sections = [];
  Array.from(nodes).forEach(function (node) {
    var _a, _b;
    var id = node.id,
      title = node.innerText,
      level = node.tagName;
    if (!(id && title)) {
      return;
    }
    if (level === "H1") {
      sections.push({
        id: id,
        title: title,
        level: level,
        children: []
      });
    }
    var parentSection = sections[sections.length - 1];
    if (level === "H2") {
      if (parentSection && level > parentSection.level) {
        parentSection.children.push({
          id: id,
          title: title,
          level: level,
          children: []
        });
      } else {
        sections.push({
          id: id,
          title: title,
          level: level,
          children: []
        });
      }
    }
    if (level === "H3") {
      var subSection = parentSection === null || parentSection === void 0 ? void 0 : parentSection.children[((_a = parentSection === null || parentSection === void 0 ? void 0 : parentSection.children) === null || _a === void 0 ? void 0 : _a.length) - 1];
      if (subSection && level > subSection.level) {
        subSection.children.push({
          id: id,
          title: title,
          level: level,
          children: []
        });
      } else if (parentSection && level > parentSection.level) {
        parentSection.children.push({
          id: id,
          title: title,
          level: level,
          children: []
        });
      } else {
        sections.push({
          id: id,
          title: title,
          level: level,
          children: []
        });
      }
    }
    // TODO types
    sections.push.apply(sections, collectHeadings((_b = node.children) !== null && _b !== void 0 ? _b : []));
  });
  return sections;
}

function isNavGroup(item) {
  return item.children !== undefined;
}
function navItemBeforeNavGroup(a, b) {
  if (isNavGroup(a) === isNavGroup(b)) {
    return 0;
  }
  if (isNavGroup(a) && !isNavGroup(b)) {
    return 1;
  }
  return -1;
}
function sortNavGroupChildren(items) {
  return items.sort(function (a, b) {
    return navItemBeforeNavGroup(a, b) || a.name.localeCompare(b.name);
  });
}
var SiteToc = function SiteToc(_a) {
  _a.currentPath;
    var nav = _a.nav;
  return jsx("nav", __assign({
    "data-testid": "lhs-sidebar",
    className: "flex flex-col space-y-3 text-sm"
  }, {
    children: sortNavGroupChildren(nav).map(function (n, index) {
      return jsx(NavComponent, {
        item: n,
        isActive: false
      }, index);
    })
  }));
};
var NavComponent = function NavComponent(_a) {
  var item = _a.item,
    isActive = _a.isActive;
  return !isNavGroup(item) ? jsx(Link, __assign({
    href: item.href,
    className: clsx(isActive ? "text-sky-500" : "font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300", "block")
  }, {
    children: item.name
  }), item.name) : jsx(Disclosure, __assign({
    as: "div",
    className: "flex flex-col space-y-3"
  }, {
    children: function (_a) {
      var open = _a.open;
      return jsxs("div", {
        children: [jsxs(Disclosure.Button, __assign({
          className: "group w-full flex items-center text-left text-md font-medium text-slate-900 dark:text-white"
        }, {
          children: [jsx("svg", __assign({
            className: clsx(open ? "text-slate-400 rotate-90" : "text-slate-300", "h-3 w-3 mr-2 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-slate-400"),
            viewBox: "0 0 20 20",
            "aria-hidden": "true"
          }, {
            children: jsx("path", {
              d: "M6 6L14 10L6 14V6Z",
              fill: "currentColor"
            })
          })), item.name]
        })), jsx(Transition, __assign({
          enter: "transition duration-100 ease-out",
          enterFrom: "transform scale-95 opacity-0",
          enterTo: "transform scale-100 opacity-100",
          leave: "transition duration-75 ease-out",
          leaveFrom: "transform scale-100 opacity-100",
          leaveTo: "transform scale-95 opacity-0"
        }, {
          children: jsx(Disclosure.Panel, __assign({
            className: "flex flex-col space-y-3 pl-5 mt-3"
          }, {
            children: sortNavGroupChildren(item.children).map(function (subItem, index) {
              return jsx(NavComponent, {
                item: subItem,
                isActive: false
              }, index);
            })
          }))
        }))]
      });
    }
  }), item.name);
};

var GiscusComponent = dynamic(function () {
  return import('./Giscus.js').then(function (mod) {
    return mod.GiscusReactComponent;
  });
}, {
  ssr: false
});
var UtterancesComponent = dynamic(function () {
  return import('./Utterances.js').then(function (mod) {
    return mod.Utterances;
  });
}, {
  ssr: false
});
var DisqusComponent = dynamic(function () {
  return import('./Disqus.js').then(function (mod) {
    return mod.Disqus;
  });
}, {
  ssr: false
});
var Comments = function Comments(_a) {
  var commentsConfig = _a.commentsConfig,
    slug = _a.slug;
  switch (commentsConfig.provider) {
    case "giscus":
      return jsx(GiscusComponent, __assign({}, commentsConfig.config));
    case "utterances":
      return jsx(UtterancesComponent, __assign({}, commentsConfig.config));
    case "disqus":
      return jsx(DisqusComponent, __assign({
        slug: slug
      }, commentsConfig.config));
  }
};

// TODO replace this with some nice tailwindui footer
var Footer = function Footer(_a) {
  var links = _a.links,
    author = _a.author;
  return jsxs("footer", __assign({
    className: "bg-background dark:bg-background-dark text-primary dark:text-primary-dark pt-16 pb-20 px-14 flex flex-col items-center justify-center gap-3"
  }, {
    children: [links && jsx("div", __assign({
      className: "flex w-full flex-wrap justify-center mb-2"
    }, {
      children: links.map(function (item) {
        return jsx(Link, __assign({
          href: item.href,
          className: "inline-flex items-center mx-4 px-1 py-1 text-black hover:text-primary dark:text-white hover:dark:text-primary-dark no-underline font-semibold"
        }, {
          children: item.name
        }), item.href);
      })
    })), jsxs("p", __assign({
      className: "flex items-center justify-center gap-2"
    }, {
      children: [jsx("span", {
        children: "Created by"
      }), author.url ? jsxs("a", __assign({
        href: author.url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-1 no-underline font-semibold text-black dark:text-white"
      }, {
        children: [author.logo && jsx("img", {
          src: author.logo,
          alt: "Logo",
          className: "h-6 block"
        }), jsx("span", {
          children: author.name
        })]
      })) : jsxs("span", __assign({
        className: "flex items-center gap-1 no-underline font-semibold text-black dark:text-white"
      }, {
        children: [author.logo && jsx("img", {
          src: author.logo,
          alt: author.name,
          className: "h-6 block"
        }), jsx("span", {
          children: author.name
        })]
      }))]
    })), jsxs("p", __assign({
      className: "flex items-center justify-center gap-1"
    }, {
      children: [jsx("span", {
        children: "Made with"
      }), jsxs("a", __assign({
        href: "https://flowershow.app/",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-1 no-underline font-semibold text-black dark:text-white"
      }, {
        children: [jsx("img", {
          src: "https://flowershow.app/images/logo.svg",
          alt: "Logo",
          className: "h-6 block"
        }), jsx("span", {
          children: "Flowershow"
        })]
      }))]
    }))]
  }));
};

var TableOfContents = function TableOfContents(_a) {
  var tableOfContents = _a.tableOfContents,
    currentSection = _a.currentSection;
  function isActiveSection(section) {
    if (section.id === currentSection) {
      return true;
    }
    if (!section.children) {
      return false;
    }
    return section.children.findIndex(isActiveSection) > -1;
  }
  return jsxs("nav", __assign({
    "aria-labelledby": "on-this-page-title"
  }, {
    children: [jsx("h2", __assign({
      className: "font-display text-md font-medium text-slate-900 dark:text-white"
    }, {
      children: "On this page"
    })), jsx("ol", __assign({
      className: "mt-4 space-y-3 text-sm"
    }, {
      children: tableOfContents.map(function (section) {
        return jsxs("li", {
          children: [jsx("h3", {
            children: jsx(Link, __assign({
              href: "#".concat(section.id),
              className: isActiveSection(section) ? "text-secondary dark:text-secondary-dark" : "font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            }, {
              children: section.title
            }))
          }), section.children && section.children.length > 0 && jsx("ol", __assign({
            className: "mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
          }, {
            children: section.children.map(function (subSection) {
              return jsxs("li", {
                children: [jsx(Link, __assign({
                  href: "#".concat(subSection.id),
                  className: isActiveSection(subSection) ? "text-secondary dark:text-secondary-dark" : "hover:text-slate-600 dark:hover:text-slate-300"
                }, {
                  children: subSection.title
                })), subSection.children && subSection.children.length > 0 && jsx("ol", __assign({
                  className: "mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                }, {
                  children: subSection.children.map(function (thirdSection) {
                    return jsx("li", {
                      children: jsx(Link, __assign({
                        href: "#".concat(thirdSection.id),
                        className: isActiveSection(thirdSection) ? "text-secondary dark:text-secondary-dark" : "hover:text-slate-600 dark:hover:text-slate-300"
                      }, {
                        children: thirdSection.title
                      }))
                    }, thirdSection.id);
                  })
                }))]
              }, subSection.id);
            })
          }))]
        }, section.id);
      })
    }))]
  }));
};

var Layout = function Layout(_a) {
  var children = _a.children,
    nav = _a.nav,
    author = _a.author,
    theme = _a.theme,
    showEditLink = _a.showEditLink,
    showToc = _a.showToc,
    showSidebar = _a.showSidebar,
    urlPath = _a.urlPath,
    showComments = _a.showComments,
    commentsConfig = _a.commentsConfig,
    editUrl = _a.editUrl,
    siteMap = _a.siteMap;
  var _b = useState(false),
    isScrolled = _b[0],
    setIsScrolled = _b[1];
  var _c = useState([]),
    tableOfContents = _c[0],
    setTableOfContents = _c[1];
  var currentSection = useTableOfContents(tableOfContents);
  var router = useRouter();
  useEffect(function () {
    if (!showToc) return;
    var headingNodes = document.querySelectorAll("h1,h2,h3");
    var toc = collectHeadings(headingNodes);
    setTableOfContents(toc !== null && toc !== void 0 ? toc : []);
  }, [router.asPath, showToc]); // update table of contents on route change with next/link
  useEffect(function () {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return function () {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return jsxs(Fragment$1, {
    children: [jsxs(Head, {
      children: [jsx("link", {
        rel: "icon",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>\uD83D\uDC90</text></svg>"
      }), jsx("meta", {
        charSet: "utf-8"
      }), jsx("meta", {
        name: "viewport",
        content: "initial-scale=1.0, width=device-width"
      })]
    }), jsxs("div", __assign({
      className: "min-h-screen bg-background dark:bg-background-dark"
    }, {
      children: [jsx("div", __assign({
        className: clsx("sticky top-0 z-50 w-full", isScrolled ? "dark:bg-background-dark/95 bg-background/95 backdrop-blur [@supports(backdrop-filter:blur(0))]:dark:bg-background-dark/75" : "dark:bg-background-dark bg-background")
      }, {
        children: jsx("div", __assign({
          className: "max-w-8xl mx-auto p-4 md:px-8"
        }, {
          children: jsx(Nav, __assign({
            title: nav.title,
            logo: nav.logo,
            links: nav.links,
            search: nav.search,
            social: nav.social,
            defaultTheme: theme.defaultTheme,
            themeToggleIcon: theme.themeToggleIcon,
            version: nav.version
          }, {
            children: showSidebar && jsx(SiteToc, {
              currentPath: urlPath,
              nav: siteMap
            })
          }))
        }))
      })), jsxs("div", __assign({
        className: clsx("max-w-8xl mx-auto px-4 md:px-8", showSidebar && "lg:ml-[18rem]")
      }, {
        children: [showSidebar && jsx("div", __assign({
          className: "hidden lg:block fixed z-20 w-[18rem] top-[4.6rem] right-auto bottom-0 left-[max(0px,calc(50%-44rem))] pt-8 pl-8 overflow-y-auto"
        }, {
          children: jsx(SiteToc, {
            currentPath: urlPath,
            nav: siteMap
          })
        })), jsxs("main", __assign({
          className: "mx-auto pt-8"
        }, {
          children: [children, showEditLink && editUrl && jsx(EditThisPage, {
            url: editUrl
          }), showComments && jsx("div", __assign({
            className: "prose mx-auto pt-6 pb-6 text-center text-gray-700 dark:text-gray-300",
            id: "comment"
          }, {
            children: jsx(Comments, {
              commentsConfig: commentsConfig,
              slug: urlPath
            })
          }))]
        })), jsx(Footer, {
          links: nav.links,
          author: author
        }), showToc && tableOfContents.length > 0 && jsx("div", __assign({
          className: "hidden xl:block fixed z-20 w-[18rem] top-[4.6rem] bottom-0 right-[max(0px,calc(50%-44rem))] left-auto pt-8 pr-8 overflow-y-auto"
        }, {
          children: jsx(TableOfContents, {
            tableOfContents: tableOfContents,
            currentSection: currentSection
          })
        }))]
      }))]
    }))]
  });
};

var Pre = function Pre(_a) {
  var children = _a.children;
    __rest(_a, ["children"]);
  var ref = useRef(); // TODO type
  var _b = useState(false),
    hovered = _b[0],
    setHovered = _b[1];
  var _c = useState(false),
    copied = _c[0],
    setCopied = _c[1];
  var onEnter = function onEnter() {
    setHovered(true);
  };
  var onExit = function onExit() {
    setHovered(false);
    setCopied(false);
  };
  var onCopy = function onCopy() {
    setCopied(true);
    navigator.clipboard.writeText(ref.current.textContent);
    setTimeout(function () {
      setCopied(false);
    }, 2000);
  };
  return jsxs("div", __assign({
    ref: ref,
    onMouseEnter: onEnter,
    onMouseLeave: onExit,
    className: "relative"
  }, {
    children: [hovered && jsx("button", __assign({
      "aria-label": "Copy code",
      type: "button",
      className: "absolute right-2 top-2 h-6 w-6 rounded border bg-gray-700 p-1 ease-in-out duration-100 ".concat(copied ? "border-green-400 focus:border-green-400 focus:outline-none" : "border-slate-300"),
      onClick: onCopy
    }, {
      children: jsx("svg", __assign({
        "aria-hidden": "true",
        viewBox: "-2 -2 20 20",
        fill: "currentColor",
        className: copied ? "text-green-400" : "text-slate-300"
      }, {
        children: copied ? jsx("path", {
          fillRule: "evenodd",
          d: "M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
        }) : jsxs(Fragment$1, {
          children: [jsx("path", {
            fillRule: "evenodd",
            d: "M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"
          }), jsx("path", {
            fillRule: "evenodd",
            d: "M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"
          })]
        })
      }))
    })), jsx("pre", {
      children: children
    })]
  }));
};

var Card = function Card(_a) {
  var children = _a.children,
    _b = _a.as,
    Component = _b === void 0 ? "div" : _b,
    className = _a.className;
  return jsx(Component, __assign({
    className: clsx(className, "group relative flex flex-col items-start")
  }, {
    children: children
  }));
};
Card.Link = function CardLink(_a) {
  var children = _a.children,
    href = _a.href,
    className = _a.className,
    props = __rest(_a, ["children", "href", "className"]);
  // <Link {...props}>
  //   <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
  //   <span className="relative z-10">{children}</span>
  // </Link>
  return jsxs(Fragment$1, {
    children: [jsx("div", {
      className: "absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-slate-800/75 sm:-inset-x-6 sm:rounded-2xl"
    }), jsxs("a", __assign({
      href: href,
      className: className
    }, props, {
      children: [jsx("span", {
        className: "absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"
      }), jsx("span", __assign({
        className: "relative z-10"
      }, {
        children: children
      }))]
    }))]
  });
};
Card.Title = function CardTitle(_a) {
  var _b = _a.as,
    Component = _b === void 0 ? "h2" : _b,
    href = _a.href,
    children = _a.children,
    className = _a.className;
  return jsx(Component, __assign({
    className: clsx(className, "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100")
  }, {
    children: href ? jsx(Card.Link, __assign({
      href: href
    }, {
      children: children
    })) : children
  }));
};
Card.Description = function CardDescription(_a) {
  var children = _a.children,
    className = _a.className;
  return jsx("p", __assign({
    className: clsx(className, "relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400")
  }, {
    children: children
  }));
};
Card.Cta = function CardCta(_a) {
  var children = _a.children,
    className = _a.className;
  return jsxs("div", __assign({
    "aria-hidden": "true",
    className: clsx(className, "relative z-10 mt-4 flex items-center text-sm font-medium text-secondary dark:text-secondary-dark")
  }, {
    children: [children, jsx(ChevronRightIcon, {
      className: "ml-1 h-4 w-4 stroke-current"
    })]
  }));
};
/* Card.Avatar = function CardAvatar({ name, src, href }) {
 *     return (
 *         <a href={href} className="group block flex-shrink-0 mt-2">
 *             <div className="flex items-center">
 *                 <div>
 *                     {src ? (
 *                         <img
 *                             className="inline-block h-9 w-9 rounded-full"
 *                             src={src}
 *                             alt={name}
 *                         />
 *                     ) : (
 *                         <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500">
 *                             <span className="text-xs font-medium leading-none text-white">
 *                                 {initialsFromName(name)}
 *                             </span>
 *                         </span>
 *                     )}
 *                 </div>
 *                 <div className="ml-3">
 *                     <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
 *                         {name}
 *                     </p>
 *                 </div>
 *             </div>
 *         </a>
 *     );
 * }; */
Card.Eyebrow = function CardEyebrow(_a) {
  var _b = _a.as,
    Component = _b === void 0 ? "p" : _b,
    _c = _a.decorate,
    decorate = _c === void 0 ? false : _c,
    className = _a.className,
    children = _a.children,
    props = __rest(_a, ["as", "decorate", "className", "children"]);
  return jsxs(Component, __assign({
    className: clsx(className, "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500", decorate && "pl-3.5")
  }, props, {
    children: [decorate && jsx("span", __assign({
      className: "absolute inset-y-0 left-0 flex items-center",
      "aria-hidden": "true"
    }, {
      children: jsx("span", {
        className: "h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"
      })
    })), children]
  }));
};

var formatDate = function formatDate(date, locales) {
  if (locales === void 0) {
    locales = "en-US";
  }
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Date(date).toLocaleDateString(locales, options);
};

var BlogItem = function BlogItem(_a) {
  var blog = _a.blog;
  return jsxs("article", __assign({
    className: "blogitem md:grid md:grid-cols-4 md:items-baseline"
  }, {
    children: [jsxs(Card, __assign({
      className: "blogitem-card md:col-span-3"
    }, {
      children: [jsx(Card.Title, __assign({
        className: "blogitem-title",
        href: "".concat(blog.urlPath)
      }, {
        children: blog.title
      })), jsx(Card.Eyebrow, __assign({
        as: "time",
        dateTime: blog.date,
        className: "blogitem-date md:hidden",
        decorate: true
      }, {
        children: formatDate(blog.date)
      })), blog.description && jsx(Card.Description, __assign({
        className: "blogitem-descr"
      }, {
        children: blog.description
      })), jsx(Card.Cta, __assign({
        className: "blogitem-cta"
      }, {
        children: "Read article"
      }))]
    })), jsx(Card.Eyebrow, __assign({
      as: "time",
      dateTime: blog.date,
      className: "blogitem-date mt-1 hidden md:block"
    }, {
      children: formatDate(blog.date)
    }))]
  }));
};

var BLOGS_LOAD_COUNT = 10;
// TODO types
var BlogsList = function BlogsList(_a) {
  var blogs = _a.blogs;
  var _b = useState(BLOGS_LOAD_COUNT),
    blogsCount = _b[0],
    setBlogsCount = _b[1];
  var handleLoadMore = function handleLoadMore() {
    setBlogsCount(function (prevCount) {
      return prevCount + BLOGS_LOAD_COUNT;
    });
  };
  return jsxs(Fragment$1, {
    children: [jsx("div", __assign({
      className: "md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40"
    }, {
      children: jsx("div", __assign({
        className: "flex flex-col space-y-16"
      }, {
        children: blogs.slice(0, blogsCount).map(function (blog) {
          return jsx(BlogItem, {
            blog: blog
          }, blog.urlPath);
        })
      }))
    })), blogs.length > blogsCount && jsx("div", __assign({
      className: "text-center pt-20"
    }, {
      children: jsx("button", __assign({
        onClick: handleLoadMore,
        type: "button",
        className: "inline-flex items-center rounded border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-200 shadow-sm hover:bg-gray-50/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      }, {
        children: "Show more"
      }))
    }))]
  });
};

var OuterContainer = /*#__PURE__*/forwardRef(function (_a, ref) {
  var className = _a.className,
    children = _a.children,
    props = __rest(_a, ["className", "children"]);
  return jsx("div", __assign({
    ref: ref,
    className: clsx("sm:px-8", className)
  }, props, {
    children: jsx("div", __assign({
      className: "mx-auto max-w-5xl lg:px-8"
    }, {
      children: children
    }))
  }));
});
var InnerContainer = /*#__PURE__*/forwardRef(function (_a, ref) {
  var className = _a.className,
    children = _a.children,
    props = __rest(_a, ["className", "children"]);
  return jsx("div", __assign({
    ref: ref,
    className: clsx("relative px-4 sm:px-8 lg:px-12", className)
  }, props, {
    children: jsx("div", __assign({
      className: "mx-auto max-w-2xl lg:max-w-5xl"
    }, {
      children: children
    }))
  }));
});
var Container = /*#__PURE__*/forwardRef(function (_a, ref) {
  var children = _a.children,
    props = __rest(_a, ["children"]);
  return jsx(OuterContainer, __assign({
    ref: ref
  }, props, {
    children: jsx(InnerContainer, {
      children: children
    })
  }));
});

// TODO types
var SimpleLayout = function SimpleLayout(_a) {
  var children = _a.children,
    frontMatter = __rest(_a, ["children"]);
  var title = frontMatter.title,
    description = frontMatter.description;
  return jsxs(Container, __assign({
    className: "my-16 sm:mt-32"
  }, {
    children: [jsxs("header", __assign({
      className: "max-w-2xl"
    }, {
      children: [jsx("h1", __assign({
        className: "text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
      }, {
        children: title
      })), jsx("p", __assign({
        className: "mt-6 text-base text-zinc-600 dark:text-zinc-400"
      }, {
        children: description
      }))]
    })), jsx("div", __assign({
      className: "mt-16 sm:mt-20"
    }, {
      children: children
    }))]
  }));
};

// TODO types
var DocsLayout = function DocsLayout(_a) {
  var children = _a.children,
    frontMatter = __rest(_a, ["children"]);
  var title = frontMatter.title,
    created = frontMatter.created;
  return jsxs("article", __assign({
    className: "docs prose prose-a:text-primary dark:prose-a:text-primary-dark prose-strong:text-primary dark:prose-strong:text-primary-dark prose-code:text-primary dark:prose-code:text-primary-dark prose-headings:text-primary dark:prose-headings:text-primary-dark prose text-primary dark:text-primary-dark dark:prose-invert prose-headings:font-headings prose-a:break-words mx-auto"
  }, {
    children: [jsx("header", {
      children: jsxs("div", __assign({
        className: "mb-6"
      }, {
        children: [created && jsx("p", __assign({
          className: "text-sm text-zinc-400 dark:text-zinc-500"
        }, {
          children: jsx("time", __assign({
            dateTime: created
          }, {
            children: formatDate(created)
          }))
        })), title && jsx("h1", {
          children: title
        })]
      }))
    }), jsx("section", {
      children: children
    })]
  }));
};

/* eslint import/no-default-export: off */
var UnstyledLayout = function UnstyledLayout(_a) {
  var children = _a.children;
  return jsx("div", __assign({
    className: "unstyled dark:text-white"
  }, {
    children: children
  }));
};

var Avatar = function Avatar(_a) {
  var name = _a.name,
    img = _a.img,
    href = _a.href;
  var Component = href ? "a" : "div";
  return jsx(Component, __assign({
    href: href,
    className: "group block flex-shrink-0 mt-2"
  }, {
    children: jsxs("div", __assign({
      className: "flex items-center space-x-2"
    }, {
      children: [jsx("div", {
        children: jsx("img", {
          className: "inline-block h-9 w-9 rounded-full",
          src: img,
          alt: name
        })
      }), jsx("div", __assign({
        className: "ml-3"
      }, {
        children: jsx("p", __assign({
          className: "text-sm font-medium text-primary dark:text-primary-dark"
        }, {
          children: name
        }))
      }))]
    }))
  }));
};

var BlogLayout = function BlogLayout(_a) {
  var children = _a.children,
    frontMatter = __rest(_a, ["children"]);
  var title = frontMatter.title,
    date = frontMatter.date,
    authors = frontMatter.authors;
  return jsxs("article", __assign({
    className: "docs prose prose-a:text-primary dark:prose-a:text-primary-dark prose-strong:text-primary dark:prose-strong:text-primary-dark prose-code:text-primary dark:prose-code:text-primary-dark prose-headings:text-primary dark:prose-headings:text-primary-dark prose text-primary dark:text-primary-dark prose-headings:font-headings dark:prose-invert prose-a:break-words mx-auto p-6"
  }, {
    children: [jsx("header", {
      children: jsxs("div", __assign({
        className: "mb-4 flex-col items-center"
      }, {
        children: [title && jsx("h1", __assign({
          className: "flex justify-center"
        }, {
          children: title
        })), date && jsx("p", __assign({
          className: "text-sm text-zinc-400 dark:text-zinc-500 flex justify-center"
        }, {
          children: jsx("time", __assign({
            dateTime: date
          }, {
            children: formatDate(date)
          }))
        })), authors && jsx("div", __assign({
          className: "flex flex-wrap not-prose items-center space-x-6 space-y-3 justify-center"
        }, {
          children: authors.map(function (_a) {
            var name = _a.name,
              avatar = _a.avatar,
              urlPath = _a.urlPath;
            return jsx(Avatar, {
              name: name,
              img: avatar,
              href: urlPath ? "/".concat(urlPath) : undefined
            }, urlPath || name);
          })
        }))]
      }))
    }), jsx("section", {
      children: children
    })]
  }));
};

// import type { Config } from "mdx-mermaid/lib/config.model";
var MdxMermaid = dynamic(function () {
  return import('mdx-mermaid/lib/Mermaid').then(function (res) {
    return res.Mermaid;
  });
}, {
  ssr: false
});
var Mermaid = function Mermaid(_a) {
  // TODO: add light and dark theme configs
  // currently Mermaid component doesn't render if configs are passed as props.
  var props = __rest(_a, []);
  // const { theme } = useTheme()
  // const config: Config = {
  //   mermaid: {
  //     fontFamily: "inherit",
  //     theme: theme
  //   }
  // }
  return jsx(MdxMermaid, __assign({}, props));
};

var buttonStyle = {
  'filled': "rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  'text': "text-sm font-semibold leading-6"
};
var Hero = function Hero(_a) {
  var title = _a.title,
    subtitle = _a.subtitle,
    announcement = _a.announcement,
    buttons = _a.buttons;
  return jsx("div", __assign({
    className: "text-primary dark:text-primary-dark"
  }, {
    children: jsx("div", __assign({
      className: "relative isolate px-6 pt-14 lg:px-8"
    }, {
      children: jsxs("div", __assign({
        className: "mx-auto max-w-2xl py-16 sm:py-32 lg:py-40"
      }, {
        children: [announcement && jsx("div", __assign({
          className: "hidden sm:mb-8 sm:flex sm:justify-center"
        }, {
          children: jsxs("div", __assign({
            className: "relative rounded-full px-3 py-1 text-sm leading-6 ring-1 ring-primary/20 hover:ring-primary/30 dark:ring-primary-dark/30 dark:hover:ring-primary-dark/40"
          }, {
            children: [announcement.title, ' ', jsxs("a", __assign({
              href: "#",
              className: "font-semibold text-secondary"
            }, {
              children: [jsx("span", {
                className: "absolute inset-0",
                "aria-hidden": "true"
              }), "Read more ", jsx("span", __assign({
                "aria-hidden": "true"
              }, {
                children: "\u2192"
              }))]
            }))]
          }))
        })), jsxs("div", __assign({
          className: "text-center"
        }, {
          children: [jsx("h1", __assign({
            className: "text-4xl font-bold tracking-tight sm:text-6xl"
          }, {
            children: title
          })), subtitle && jsx("p", __assign({
            className: "mt-6 text-lg leading-8 text-primary/90 dark:text-primary-dark/80"
          }, {
            children: subtitle
          })), buttons && buttons.length && jsx("div", __assign({
            className: "mt-10 flex items-center justify-center gap-x-6"
          }, {
            children: buttons.map(function (b) {
              return jsx("a", __assign({
                href: b.href,
                className: buttonStyle[b.type]
              }, {
                children: b.title
              }));
            })
          }))]
        }))]
      }))
    }))
  }));
};

var GA = function GA(_a) {
  var googleAnalyticsId = _a.googleAnalyticsId;
  return jsxs(Fragment$1, {
    children: [jsx(Script, {
      strategy: "afterInteractive",
      src: "https://www.googletagmanager.com/gtag/js?id=".concat(googleAnalyticsId)
    }), jsx(Script, __assign({
      strategy: "afterInteractive",
      id: "ga-script"
    }, {
      children: "\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            gtag('js', new Date());\n            gtag('config', '".concat(googleAnalyticsId, "');\n        ")
    }))]
  });
};

/**
 * Plausible analytics component.
 * To proxy the requests through your own domain, you can use the dataApi and src attribute.
 * See [Plausible docs](https://plausible.io/docs/proxy/guides/nextjs#step-2-adjust-your-deployed-script)
 * for more information.
 *
 */
var Plausible = function Plausible(_a) {
  var plausibleDataDomain = _a.plausibleDataDomain,
    _b = _a.dataApi,
    dataApi = _b === void 0 ? undefined : _b,
    _c = _a.src,
    src = _c === void 0 ? 'https://plausible.io/js/plausible.js' : _c;
  return jsxs(Fragment$1, {
    children: [jsx(Script, {
      strategy: "lazyOnload",
      "data-domain": plausibleDataDomain,
      "data-api": dataApi,
      src: src
    }), jsx(Script, __assign({
      strategy: "lazyOnload",
      id: "plausible-script"
    }, {
      children: "\n            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }\n        "
    }))]
  });
};

var SimpleAnalytics = function SimpleAnalytics(_a) {
  var _b = _a.src,
    src = _b === void 0 ? 'https://scripts.simpleanalyticscdn.com/latest.js' : _b;
  return jsxs(Fragment$1, {
    children: [jsx(Script, __assign({
      strategy: "lazyOnload",
      id: "sa-script"
    }, {
      children: "\n            window.sa_event=window.sa_event||function(){var a=[].slice.call(arguments);window.sa_event.q?window.sa_event.q.push(a):window.sa_event.q=[a]};\n        "
    })), jsx(Script, {
      strategy: "lazyOnload",
      src: src
    })]
  });
};

var Umami = function Umami(_a) {
  var umamiWebsiteId = _a.umamiWebsiteId,
    _b = _a.src,
    src = _b === void 0 ? 'https://analytics.umami.is/script.js' : _b;
  return jsx(Script, {
    async: true,
    defer: true,
    "data-website-id": umamiWebsiteId,
    src: src
  });
};

/**
 * Posthog analytics component.
 * See [Posthog docs](https://posthog.com/docs/libraries/js#option-1-add-javascript-snippet-to-your-html-badgerecommendedbadge) for more information.
 *
 */
var Posthog = function Posthog(_a) {
  var posthogProjectApiKey = _a.posthogProjectApiKey,
    _b = _a.apiHost,
    apiHost = _b === void 0 ? 'https://app.posthog.com' : _b;
  return jsx(Script, __assign({
    strategy: "lazyOnload",
    id: "posthog-script"
  }, {
    children: "\n          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(\".\");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement(\"script\")).type=\"text/javascript\",p.async=!0,p.src=s.api_host+\"/static/array.js\",(r=t.getElementsByTagName(\"script\")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a=\"posthog\",u.people=u.people||[],u.toString=function(t){var e=\"posthog\";return\"posthog\"!==a&&(e+=\".\"+a),t||(e+=\" (stub)\"),e},u.people.toString=function(){return u.toString(1)+\".people (stub)\"},o=\"capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags\".split(\" \"),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);\n          posthog.init('".concat(posthogProjectApiKey, "',{api_host:'").concat(apiHost, "'})\n      ")
  }));
};

/**
 * Supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
 * All components default to the hosted service, but can be configured to use a self-hosted
 * or proxied version of the script by providing the `src` / `apiHost` props.
 *
 * Note: If you want to use an analytics provider you have to add it to the
 * content security policy in the `next.config.js` file.
 * @param {AnalyticsProps} { analytics }
 * @return {*}
 */
var Analytics = function Analytics(_a) {
  var analyticsConfig = _a.analyticsConfig;
  return jsxs(Fragment$1, {
    children: [analyticsConfig.plausibleAnalytics && jsx(Plausible, __assign({}, analyticsConfig.plausibleAnalytics)), analyticsConfig.simpleAnalytics && jsx(SimpleAnalytics, __assign({}, analyticsConfig.simpleAnalytics)), analyticsConfig.posthogAnalytics && jsx(Posthog, __assign({}, analyticsConfig.posthogAnalytics)), analyticsConfig.umamiAnalytics && jsx(Umami, __assign({}, analyticsConfig.umamiAnalytics)), analyticsConfig.googleAnalytics && jsx(GA, __assign({}, analyticsConfig.googleAnalytics))]
  });
};

var defaultConfig = {
  title: "Flowershow",
  description: "",
  showEditLink: false,
  showToc: true,
  showSidebar: false,
  showLinkPreviews: true,
  author: "",
  authorLogo: "",
  domain: "",
  // Google analytics key e.g. G-XXXX
  analytics: "",
  // content source directory for markdown files
  // DO NOT CHANGE THIS VALUE
  // if you have your notes in another (external) directory,
  // /content dir should be a symlink to that directory
  content: "content",
  avatarPlaceholder: "/_flowershow/avatarplaceholder.png",
  contentExclude: [],
  contentInclude: [],
  blogDir: "blog",
  peopleDir: "people",
  // Theme
  theme: {
    "default": "dark",
    toggleIcon: "/_flowershow/theme-button.svg"
  },
  navLinks: [
    // { href: '/about', name: 'About' },
  ]
};

export { Analytics as A, BlogsList as B, CustomLink as C, DocsLayout as D, EditThisPage as E, Footer as F, Hero as H, Layout as L, Mermaid as M, Nav as N, Pre as P, SearchProvider as S, TableOfContents as T, UnstyledLayout as U, __awaiter as _, __generator as a, __assign as b, __spreadArray as c, SimpleLayout as d, BlogLayout as e, formatDate as f, SiteToc as g, Comments as h, collectHeadings as i, defaultConfig as j, pageview as p, useTableOfContents as u };
