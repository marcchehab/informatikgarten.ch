/// <reference types="react" />
import { BooleanString, Mapping, Repo } from "@giscus/react";
export interface GiscusConfig {
    provider: "giscus";
    pages?: Array<string>;
    config: {
        theme?: string;
        mapping: Mapping;
        repo: Repo;
        repositoryId: string;
        category: string;
        categoryId: string;
        reactions: BooleanString;
        metadata: BooleanString;
        inputPosition?: string;
        lang?: string;
    };
}
export type GiscusProps = GiscusConfig["config"];
export declare const GiscusReactComponent: React.FC<GiscusProps>;
