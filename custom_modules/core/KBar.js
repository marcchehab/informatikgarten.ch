import { f as formatDate, b as __assign, _ as __awaiter, a as __generator, c as __spreadArray } from './index2.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import router from 'next/router.js';
import { useRegisterActions, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch, useMatches, KBarResults, KBarProvider } from 'kbar';
import 'core-js/modules/es.promise.js';
import { useState, useEffect } from 'react';
import 'core-js/modules/es.symbol.description.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.replace.js';
import 'next-themes';
import 'core-js/modules/es.string.search.js';
import 'next/link.js';
import 'core-js/modules/es.string.starts-with.js';
import 'core-js/modules/es.array.reduce.js';
import '@floating-ui/react-dom';
import '@floating-ui/react-dom-interactions';
import 'framer-motion';
import 'next/dynamic.js';
import '@headlessui/react';
import 'next/head.js';
import 'clsx';
import 'core-js/modules/es.array.flat-map.js';
import 'core-js/modules/es.array.unscopables.flat-map.js';
import 'core-js/modules/es.parse-float.js';
import 'core-js/modules/es.array.sort.js';
import '@giscus/react';
import 'disqus-react';
import 'next/script.js';

var nameFromUrl = function nameFromUrl(url) {
  var name = url.split("/").slice(-1)[0].replace("-", " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
};

var kbarActionsFromDocuments = function kbarActionsFromDocuments(docs) {
  var _a, _b, _c;
  var actions = [];
  var _loop_1 = function _loop_1(doc) {
    // excluding home path as this is defined in starting actions
    doc.url_path && actions.push({
      id: doc.url_path,
      name: (_a = doc.title) !== null && _a !== void 0 ? _a : nameFromUrl(doc.url_path),
      keywords: (_b = doc.description) !== null && _b !== void 0 ? _b : "",
      section: (_c = doc.sourceDir) !== null && _c !== void 0 ? _c : "Page",
      subtitle: doc.date && formatDate(doc.date, "en-US"),
      perform: function () {
        return router.push("/".concat(doc.url_path));
      }
    });
  };
  for (var _i = 0, docs_1 = docs; _i < docs_1.length; _i++) {
    var doc = docs_1[_i];
    _loop_1(doc);
  }
  return actions;
};

var Portal = function Portal(_a) {
  var searchDocumentsPath = _a.searchDocumentsPath;
  var _b = useState([]),
    searchActions = _b[0],
    setSearchActions = _b[1];
  useEffect(function () {
    var fetchData = function fetchData() {
      return __awaiter(void 0, void 0, void 0, function () {
        var res, json, actions;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, fetch(searchDocumentsPath)];
            case 1:
              res = _a.sent();
              return [4 /*yield*/, res.json()];
            case 2:
              json = _a.sent();
              actions = kbarActionsFromDocuments(json);
              setSearchActions(actions);
              return [2 /*return*/];
          }
        });
      });
    };

    fetchData();
  }, [searchDocumentsPath]);
  useRegisterActions(searchActions, [searchActions]);
  return jsx(KBarPortal, {
    children: jsx(KBarPositioner, __assign({
      className: "bg-gray-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50"
    }, {
      children: jsx(KBarAnimator, __assign({
        className: "w-full max-w-xl"
      }, {
        children: jsxs("div", __assign({
          className: "overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
        }, {
          children: [jsxs("div", __assign({
            className: "flex items-center space-x-4 p-4"
          }, {
            children: [jsx("span", __assign({
              className: "block w-5"
            }, {
              children: jsx("svg", __assign({
                className: "text-gray-400 dark:text-gray-300",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, {
                children: jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                })
              }))
            })), jsx(KBarSearch, {
              defaultPlaceholder: "Search",
              className: "h-8 w-full bg-transparent text-slate-600 placeholder-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder-slate-500"
            }), jsx("span", __assign({
              className: "inline-block whitespace-nowrap rounded border border-slate-400/70 px-1.5 align-middle font-medium leading-4 tracking-wide text-slate-500 [font-size:10px] dark:border-slate-600 dark:text-slate-400"
            }, {
              children: "ESC"
            }))]
          })), jsx(RenderResults, {})]
        }))
      }))
    }))
  });
};
function RenderItem(props) {
  var item = props.item,
    active = props.active;
  return jsx("div", __assign({
    className: typeof item === "string" ? "" : "hover:bg-gray-200 hover:dark:bg-gray-800"
  }, {
    children: typeof item === "string" ? jsx("div", __assign({
      className: "pt-3"
    }, {
      children: jsx("div", __assign({
        className: "text-primary-600 block border-t border-gray-100 px-4 pt-6 pb-2 text-xs font-semibold uppercase dark:border-gray-800"
      }, {
        children: item
      }))
    })) : jsxs("div", __assign({
      className: "block cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-200 ".concat(active ? "bg-primary-600" : "bg-transparent")
    }, {
      children: [(item === null || item === void 0 ? void 0 : item.subtitle) && jsx("div", __assign({
        className: "".concat(active ? "text-gray-200" : "text-gray-400 dark:text-gray-500", " text-xs")
      }, {
        children: item.subtitle
      })), jsx("div", {
        children: item === null || item === void 0 ? void 0 : item.name
      })]
    }))
  }));
}
function RenderResults() {
  var results = useMatches().results;
  if (results.length) {
    return jsx(KBarResults, {
      items: results,
      onRender: RenderItem
    });
  }
  return jsx("div", __assign({
    className: "block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600"
  }, {
    children: "No results for your search..."
  }));
}

var KBarModal = function KBarModal(_a) {
  var searchDocumentsPath = _a.searchDocumentsPath,
    startingActions = _a.startingActions,
    children = _a.children;
  return jsxs(KBarProvider, __assign({
    actions: startingActions
  }, {
    children: [jsx(Portal, {
      searchDocumentsPath: searchDocumentsPath
    }), children]
  }));
};

var KBarSearchProvider = function KBarSearchProvider(_a) {
  var config = _a.config,
    children = _a.children;
  var defaultActions = config === null || config === void 0 ? void 0 : config.defaultActions;
  var searchDocumentsPath = "/search.json";
  var startingActions = [{
    id: "homepage",
    name: "Homepage",
    keywords: "",
    section: "Home",
    perform: function () {
      return router.push("/");
    }
  }];
  if (defaultActions && Array.isArray(defaultActions)) startingActions = __spreadArray(__spreadArray([], startingActions, true), defaultActions, true);
  return KBarModal ? jsx(KBarModal, __assign({
    startingActions: startingActions,
    searchDocumentsPath: searchDocumentsPath
  }, {
    children: children
  })) : children;
};

export { KBarSearchProvider };
