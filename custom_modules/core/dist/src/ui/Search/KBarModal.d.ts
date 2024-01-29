/// <reference types="react" />
import { Action } from "kbar";
interface Props extends React.PropsWithChildren {
    searchDocumentsPath: string;
    startingActions?: Action[];
}
export declare const KBarModal: React.FC<Props>;
export {};
