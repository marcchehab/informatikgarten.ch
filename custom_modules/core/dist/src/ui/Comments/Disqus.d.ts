/// <reference types="react" />
export interface DisqusConfig {
    provider: "disqus";
    pages?: Array<string>;
    config: {
        shortname: string;
    };
}
export type DisqusProps = DisqusConfig["config"] & {
    slug?: string;
};
export declare const Disqus: React.FC<DisqusProps>;
