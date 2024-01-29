/// <reference types="react" />
export interface UtterancesConfig {
    provider: "utterances";
    pages?: Array<string>;
    config: {
        theme?: string;
        repo: string;
        label: string;
        issueTerm: string;
    };
}
export type UtterancesProps = UtterancesConfig["config"];
export declare const Utterances: React.FC<UtterancesProps>;
