/// <reference types="react" />
interface Props {
    href: string;
    data: any;
    usehook: any;
    preview: boolean;
    children: React.ReactNode;
    className?: string;
    [x: string]: unknown;
}
export declare const CustomLink: React.FC<Props>;
export {};
