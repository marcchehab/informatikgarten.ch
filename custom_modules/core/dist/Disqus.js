import { jsx } from 'react/jsx-runtime';
import { DiscussionEmbed } from 'disqus-react';

var Disqus = function Disqus(_a) {
  var _b;
  var shortname = _a.shortname,
    slug = _a.slug;
  return jsx(DiscussionEmbed, {
    shortname: shortname,
    config: {
      url: (_b = window === null || window === void 0 ? void 0 : window.location) === null || _b === void 0 ? void 0 : _b.href,
      identifier: slug
    }
  });
};

export { Disqus };
