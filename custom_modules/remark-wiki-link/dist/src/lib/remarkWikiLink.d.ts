import { SyntaxOptions } from "./syntax";
import { FromMarkdownOptions } from "./fromMarkdown";
type RemarkWikiLinkOptions = FromMarkdownOptions & SyntaxOptions;
declare function remarkWikiLink(opts?: RemarkWikiLinkOptions): void;
export default remarkWikiLink;
export { remarkWikiLink };
