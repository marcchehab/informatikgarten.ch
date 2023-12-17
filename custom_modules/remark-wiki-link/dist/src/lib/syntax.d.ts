export interface SyntaxOptions {
    aliasDivider?: string;
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
declare function wikiLink(opts?: SyntaxOptions): {
    text: {
        91: {
            tokenize: (effects: any, ok: any, nok: any) => (code: number) => any;
        };
        33: {
            tokenize: (effects: any, ok: any, nok: any) => (code: number) => any;
        };
    };
};
export { wikiLink as syntax };
