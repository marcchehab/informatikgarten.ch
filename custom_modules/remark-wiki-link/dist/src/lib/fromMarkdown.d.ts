export interface FromMarkdownOptions {
    pathFormat?: "raw" | "obsidian-absolute" | "obsidian-short";
    permalinks?: string[];
    wikiLinkResolver?: (name: string) => string[];
    newClassName?: string;
    wikiLinkClassName?: string;
    hrefTemplate?: (permalink: string) => string;
}
declare function fromMarkdown(opts?: FromMarkdownOptions): {
    enter: {
        wikiLink: (token: any) => void;
    };
    exit: {
        wikiLinkTarget: (token: any) => void;
        wikiLinkAlias: (token: any) => void;
        wikiLink: (token: any) => void;
    };
};
export { fromMarkdown };
