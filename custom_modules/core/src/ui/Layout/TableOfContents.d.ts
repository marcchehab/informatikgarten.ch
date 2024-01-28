/// <reference types="react" />
export interface TocSection {
    id: string;
    title: string;
    level: string;
    children?: any;
}
interface Props {
    tableOfContents: TocSection[];
    currentSection: string;
}
export declare const TableOfContents: React.FC<Props>;
export {};
