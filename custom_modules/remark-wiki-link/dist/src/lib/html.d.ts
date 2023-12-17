export interface HtmlOptions {
    pathFormat?: "raw" | "obsidian-absolute" | "obsidian-short";
    permalinks?: string[];
    wikiLinkResolver?: (name: string) => string[];
    newClassName?: string;
    wikiLinkClassName?: string;
    hrefTemplate?: (permalink: string) => string;
}
declare function html(opts?: HtmlOptions): {
    enter: {
        wikiLink: () => void;
    };
    exit: {
        wikiLinkTarget: (token: any) => void;
        wikiLinkAlias: (token: any) => void;
        wikiLink: (token: any) => void;
    };
};
export { html };
