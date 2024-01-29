/// <reference types="react" />
import { AuthorConfig, NavLink } from "../types";
interface Props {
    author: AuthorConfig;
    links?: Array<NavLink>;
}
export declare const Footer: React.FC<Props>;
export {};
