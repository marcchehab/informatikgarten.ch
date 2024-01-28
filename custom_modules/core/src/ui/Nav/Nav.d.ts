/// <reference types="react" />
import { NavLink, SocialLink, SearchProviderConfig } from "../types";
export interface ThemeConfig {
    defaultTheme: "dark" | "light";
    themeToggleIcon: string;
}
export interface NavConfig {
    title: string;
    logo?: string;
    version?: string;
    links: Array<NavLink>;
    search?: SearchProviderConfig;
    social?: Array<SocialLink>;
}
interface Props extends NavConfig, ThemeConfig, React.PropsWithChildren {
}
export declare const Nav: React.FC<Props>;
export {};
