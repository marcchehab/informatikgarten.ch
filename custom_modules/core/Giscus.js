import { jsx } from 'react/jsx-runtime';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

var GiscusReactComponent = function GiscusReactComponent(_a) {
  var repo = _a.repo,
    repositoryId = _a.repositoryId,
    category = _a.category,
    categoryId = _a.categoryId,
    _b = _a.reactions,
    reactions = _b === void 0 ? "0" : _b,
    _c = _a.metadata,
    metadata = _c === void 0 ? "0" : _c,
    _d = _a.mapping,
    mapping = _d === void 0 ? "pathname" : _d,
    _e = _a.theme,
    theme = _e === void 0 ? "light" : _e;
  var _f = useTheme(),
    nextTheme = _f.theme,
    resolvedTheme = _f.resolvedTheme;
  var commentsTheme = nextTheme === "dark" || resolvedTheme === "dark" ? "transparent_dark" : theme;
  return jsx(Giscus, {
    repo: repo,
    repoId: repositoryId,
    category: category,
    categoryId: categoryId,
    mapping: mapping,
    inputPosition: "top",
    reactionsEnabled: reactions,
    emitMetadata: metadata,
    // TODO: remove transparent_dark after theme toggle fix
    theme: nextTheme ? commentsTheme : "transparent_dark"
  });
};

export { GiscusReactComponent };
