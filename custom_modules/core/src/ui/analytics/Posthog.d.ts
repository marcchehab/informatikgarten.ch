/// <reference types="react" />
export interface PosthogProps {
    posthogProjectApiKey: string;
    apiHost?: string;
}
/**
 * Posthog analytics component.
 * See [Posthog docs](https://posthog.com/docs/libraries/js#option-1-add-javascript-snippet-to-your-html-badgerecommendedbadge) for more information.
 *
 */
export declare const Posthog: ({ posthogProjectApiKey, apiHost, }: PosthogProps) => JSX.Element;
