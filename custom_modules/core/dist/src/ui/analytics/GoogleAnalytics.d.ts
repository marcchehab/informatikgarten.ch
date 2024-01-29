/// <reference types="react" />
export interface GoogleAnalyticsProps {
    googleAnalyticsId: string;
}
export declare const GA: ({ googleAnalyticsId }: GoogleAnalyticsProps) => JSX.Element;
export declare const logEvent: (action: any, category: any, label: any, value: any) => void;
