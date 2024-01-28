/// <reference types="react" />
import type { NavConfig, ThemeConfig } from "./Nav";
interface Props extends NavConfig, ThemeConfig, React.PropsWithChildren {
}
export declare const NavMobile: React.FC<Props>;
export {};
