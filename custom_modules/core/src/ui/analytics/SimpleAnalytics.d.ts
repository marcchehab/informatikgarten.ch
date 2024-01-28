/// <reference types="react" />
export interface SimpleAnalyticsProps {
    src?: string;
}
export declare const SimpleAnalytics: ({ src, }: SimpleAnalyticsProps) => JSX.Element;
export declare const logEvent: (eventName: any, callback: any) => void | undefined;
