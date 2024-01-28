/// <reference types="react" />
import { GiscusReactComponent, GiscusConfig, GiscusProps } from "./Giscus";
import { Utterances, UtterancesConfig, UtterancesProps } from "./Utterances";
import { Disqus, DisqusConfig, DisqusProps } from "./Disqus";
export type CommentsConfig = GiscusConfig | UtterancesConfig | DisqusConfig;
export interface CommentsProps {
    commentsConfig: CommentsConfig;
    slug?: string;
}
export declare const Comments: ({ commentsConfig, slug }: CommentsProps) => JSX.Element;
export { GiscusReactComponent, Utterances, Disqus };
export type { GiscusConfig, GiscusProps, UtterancesConfig, UtterancesProps, DisqusConfig, DisqusProps, };
