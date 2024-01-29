import 'core-js/modules/es.promise.js';
import 'core-js/modules/es.array.iterator.js';
import 'core-js/modules/web.dom-collections.iterator.js';
import 'core-js/modules/es.string.starts-with.js';
import 'core-js/modules/web.url.js';
import 'core-js/modules/web.url-search-params.js';
import { _ as __awaiter, a as __generator, b as __assign } from './index2.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import * as docsearch from '@docsearch/react';
import Head from 'next/head.js';
import Link from 'next/link.js';
import { useRouter } from 'next/router.js';
import { createContext, useState, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import 'next-themes';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.search.js';
import 'core-js/modules/es.array.reduce.js';
import '@floating-ui/react-dom';
import '@floating-ui/react-dom-interactions';
import 'framer-motion';
import 'next/dynamic.js';
import '@headlessui/react';
import 'clsx';
import 'core-js/modules/es.array.flat-map.js';
import 'core-js/modules/es.array.unscopables.flat-map.js';
import 'core-js/modules/es.parse-float.js';
import 'core-js/modules/es.array.sort.js';
import '@giscus/react';
import 'disqus-react';
import 'core-js/modules/es.symbol.description.js';
import 'next/script.js';

var useDocSearchKeyboardEvents = docsearch.useDocSearchKeyboardEvents;
var DocSearchModal = null;
function Hit(_a) {
  var hit = _a.hit,
    children = _a.children;
  return jsx(Link, __assign({
    href: hit.url
  }, {
    children: children
  }));
}
var AlgoliaSearchContext = /*#__PURE__*/createContext({});
function AlgoliaSearchProvider(_a) {
  var _this = this;
  var _b;
  var children = _a.children,
    config = _a.config;
  var router = useRouter();
  var _c = useState(false),
    isOpen = _c[0],
    setIsOpen = _c[1];
  var _d = useState(undefined),
    initialQuery = _d[0],
    setInitialQuery = _d[1];
  var importDocSearchModalIfNeeded = useCallback(function () {
    return __awaiter(_this, void 0, void 0, function () {
      var Modal;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (DocSearchModal) {
              return [2 /*return*/, Promise.resolve()];
            }
            return [4 /*yield*/, Promise.all([docsearch])];
          case 1:
            Modal = _a.sent()[0].DocSearchModal;
            // eslint-disable-next-line
            DocSearchModal = Modal;
            return [2 /*return*/];
        }
      });
    });
  }, [DocSearchModal]);
  var onOpen = useCallback(function () {
    importDocSearchModalIfNeeded().then(function () {
      setIsOpen(true);
    });
  }, [importDocSearchModalIfNeeded, setIsOpen]);
  var onClose = useCallback(function () {
    setIsOpen(false);
  }, [setIsOpen]);
  var onInput = useCallback(function (event) {
    importDocSearchModalIfNeeded().then(function () {
      setIsOpen(true);
      setInitialQuery(event.key);
    });
  }, [importDocSearchModalIfNeeded, setIsOpen, setInitialQuery]);
  // web accessibility
  // https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/keyboard-navigation/
  var navigator = useRef({
    navigate: function (_a) {
      var itemUrl = _a.itemUrl;
      // Algolia results could contain URL's from other domains which cannot
      // be served through history and should navigate with window.location
      var isInternalLink = itemUrl.startsWith("/");
      var isAnchorLink = itemUrl.startsWith("#");
      if (!isInternalLink && !isAnchorLink) {
        window.location.href = itemUrl;
      } else {
        router.push(itemUrl);
      }
    }
  }).current;
  // https://docsearch.algolia.com/docs/api#transformitems
  var transformItems = function transformItems(items) {
    return items.map(function (item) {
      // If Algolia contains a external domain, we should navigate without
      // relative URL
      var isInternalLink = item.url.startsWith("/");
      var isAnchorLink = item.url.startsWith("#");
      if (!isInternalLink && !isAnchorLink) {
        return item;
      }
      // We transform the absolute URL into a relative URL.
      var url = new URL(item.url);
      return __assign(__assign({}, item), {
        // url: withBaseUrl(`${url.pathname}${url.hash}`),
        url: "".concat(url.pathname).concat(url.hash)
      });
    });
  };
  // ).current;
  useDocSearchKeyboardEvents({
    isOpen: isOpen,
    onOpen: onOpen,
    onClose: onClose,
    onInput: onInput
  });
  var providerValue = useMemo(function () {
    return {
      query: {
        setSearch: setInitialQuery,
        toggle: onOpen
      }
    };
  }, [setInitialQuery, onOpen]);
  return jsxs(AlgoliaSearchContext.Provider, __assign({
    value: providerValue
  }, {
    children: [jsx(Head, {
      children: jsx("link", {
        rel: "preconnect",
        href: "https://".concat(config.appId, "-dsn.algolia.net"),
        crossOrigin: "anonymous"
      })
    }), children, isOpen && DocSearchModal && /*#__PURE__*/createPortal(jsx(DocSearchModal, __assign({
      onClose: onClose,
      initialScrollY: window.scrollY,
      initialQuery: initialQuery,
      navigator: navigator,
      transformItems: transformItems,
      hitComponent: Hit,
      placeholder: (_b = config.placeholder) !== null && _b !== void 0 ? _b : "Search"
    }, config)), document.body)]
  }));
}

export { AlgoliaSearchContext, AlgoliaSearchProvider };
