/// <reference types="react" />
export interface PlausibleProps {
    plausibleDataDomain: string;
    dataApi?: string;
    src?: string;
}
/**
 * Plausible analytics component.
 * To proxy the requests through your own domain, you can use the dataApi and src attribute.
 * See [Plausible docs](https://plausible.io/docs/proxy/guides/nextjs#step-2-adjust-your-deployed-script)
 * for more information.
 *
 */
export declare const Plausible: ({ plausibleDataDomain, dataApi, src, }: PlausibleProps) => JSX.Element;
export declare const logEvent: (eventName: any, ...rest: any[]) => void | undefined;
