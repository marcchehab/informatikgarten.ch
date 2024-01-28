/// <reference types="react" />
import { SearchProvider as SearchProviderType, SearchProviderConfig } from "../types";
export declare const SearchProvider: ({ searchConfig, children, }: {
    searchConfig: SearchProviderConfig;
    children: React.ReactNode;
}) => JSX.Element;
export declare const SearchContext: (provider: SearchProviderType) => import("react").ComponentType<import("react").ConsumerProps<{}>> | import("react").ComponentType<import("react").ConsumerProps<import("kbar").IKBarContext>> | undefined;
