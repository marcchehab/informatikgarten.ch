export declare const pageview: ({ url, analyticsID, }: {
    url: string;
    analyticsID: string;
}) => void;
export declare const event: ({ action, category, label, value }: {
    action: any;
    category: any;
    label: any;
    value: any;
}) => void;
