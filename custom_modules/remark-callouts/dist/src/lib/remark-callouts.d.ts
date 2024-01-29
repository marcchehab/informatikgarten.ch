import type { Plugin } from "unified";
import type { Data } from "unist";
export declare const callouts: Plugin;
export interface Config {
    classNameMaps: {
        block: ClassNameMap;
        title: ClassNameMap;
    };
    dataMaps: {
        block: (data: Data) => Data;
        title: (data: Data) => Data;
    };
    types: {
        [index: string]: string | object;
    };
}
export declare const defaultConfig: Config;
type ClassNames = string | string[];
type ClassNameMap = ClassNames | ((title: string) => ClassNames);
export default callouts;
