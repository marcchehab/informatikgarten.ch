import { jsx } from 'react/jsx-runtime';
import { useCallback, useEffect } from 'react';
import { useTheme } from 'next-themes';

var Utterances = function Utterances(_a) {
  var repo = _a.repo,
    _b = _a.label,
    label = _b === void 0 ? "comments" : _b,
    _c = _a.issueTerm,
    issueTerm = _c === void 0 ? "pathname" : _c,
    _d = _a.theme,
    theme = _d === void 0 ? "github-light" : _d;
  var _e = useTheme(),
    nextTheme = _e.theme,
    resolvedTheme = _e.resolvedTheme;
  // TODO: remove preferred-color-scheme after theme toggle fix
  var commentsTheme = nextTheme ? nextTheme === "dark" || resolvedTheme === "dark" ? "github-dark" : theme : "preferred-color-scheme";
  var COMMENTS_ID = "comments-container";
  var LoadComments = useCallback(function () {
    var script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("label", label);
    script.setAttribute("theme", commentsTheme);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    var comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);
    return function () {
      var comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = "";
    };
  }, [commentsTheme, issueTerm]);
  // Reload on theme change
  useEffect(function () {
    LoadComments();
  }, [LoadComments]);
  // Added `relative` to fix a weird bug with `utterances-frame` position
  return jsx("div", {
    className: "utterances-frame relative",
    id: COMMENTS_ID
  });
};

export { Utterances };
