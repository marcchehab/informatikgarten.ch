/// <reference types="react" />
import { NavItem, NavGroup } from "../SiteToc";
import { CommentsConfig } from "../Comments";
import { NavConfig, ThemeConfig } from "../Nav";
import { AuthorConfig } from "../types";
interface Props extends React.PropsWithChildren {
    showComments: boolean;
    showEditLink: boolean;
    showSidebar: boolean;
    showToc: boolean;
    nav: NavConfig;
    author: AuthorConfig;
    theme: ThemeConfig;
    urlPath: string;
    commentsConfig: CommentsConfig;
    siteMap: Array<NavItem | NavGroup>;
    editUrl?: string;
}
export declare const Layout: React.FC<Props>;
export {};
