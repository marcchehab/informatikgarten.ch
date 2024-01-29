/// <reference types="react" />
interface CardProps extends React.PropsWithChildren {
    as?: React.ElementType;
    className?: string;
}
interface CardLinkProps extends React.PropsWithChildren {
    href?: string;
    className?: string;
}
interface CardTitleProps extends React.PropsWithChildren {
    as?: React.ElementType;
    href?: string;
    className?: string;
}
interface CardDescriptionProps extends React.PropsWithChildren {
    className?: string;
}
interface CardCtaProps extends React.PropsWithChildren {
    className?: string;
}
interface CardEyebrowProps extends React.PropsWithChildren {
    as?: React.ElementType;
    decorate?: boolean;
    className?: string;
    [x: string]: unknown;
}
type Card = React.FC<CardProps> & {
    Link: React.FC<CardLinkProps>;
} & {
    Title: React.FC<CardTitleProps>;
} & {
    Description: React.FC<CardDescriptionProps>;
} & {
    Cta: React.FC<CardCtaProps>;
} & {
    Eyebrow: React.FC<CardEyebrowProps>;
};
export declare const Card: Card;
export {};
