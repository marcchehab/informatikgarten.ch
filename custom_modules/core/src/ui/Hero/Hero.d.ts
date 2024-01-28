/// <reference types="react" />
interface Button {
    title: string;
    href: string;
    type: 'filled' | 'text';
}
export interface HeroProps {
    title: string;
    subtitle?: string;
    announcement?: {
        title: string;
        href?: string;
    };
    buttons?: Array<Button>;
}
export declare const Hero: React.FC<HeroProps>;
export {};
