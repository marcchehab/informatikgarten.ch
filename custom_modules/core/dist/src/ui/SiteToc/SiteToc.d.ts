/// <reference types="react" />
export interface NavItem {
    name: string;
    href: string;
}
export interface NavGroup {
    name: string;
    path: string;
    level: number;
    children: Array<NavItem | NavGroup>;
}
interface Props {
    currentPath: string;
    nav: Array<NavItem | NavGroup>;
}
export declare const SiteToc: React.FC<Props>;
export {};
