export interface NavLink {
    name: string;
    href: string;
}
export interface AuthorConfig {
    name: string;
    url?: string;
    logo?: string;
}
export type SocialPlatform = "github" | "discord";
export interface SocialLink {
    label: SocialPlatform;
    href: string;
}
export type SearchProvider = "algolia" | "kbar";
export interface SearchProviderConfig {
    provider: SearchProvider;
    config: object;
}
interface SharedFields {
    title?: string;
    description?: string;
    image?: string;
    layout: string;
    showEditLink?: boolean;
    showToc?: boolean;
    showComments?: boolean;
    isDraft?: boolean;
    data: Array<string>;
}
interface ComputedFields {
    urlPath: string;
    editUrl?: string;
    date?: string;
}
export interface Page extends SharedFields, ComputedFields {
}
export interface Blog extends SharedFields, ComputedFields {
    date: string;
    authors?: Array<string>;
    tags?: Array<string>;
}
export {};
