import { RefObject } from "react";
interface TweetConfig {
    theme: string;
}
declare global {
    interface Window {
        twttr: {
            widgets: {
                createTweet: (id: string, ref: RefObject<HTMLDivElement>, options: TweetConfig) => Promise<any>;
                load: (ref: RefObject<HTMLDivElement>) => void;
            };
        };
    }
}
export default function TwitterEmbed({ url, ...props }: {
    [x: string]: any;
    url: any;
}): JSX.Element;
export {};
