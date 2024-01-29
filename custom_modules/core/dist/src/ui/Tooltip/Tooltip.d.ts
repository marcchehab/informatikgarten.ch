import React from "react";
interface Props extends React.PropsWithChildren {
    render: (t: any) => React.ReactNode;
    href: string;
    data: any;
    usehook?: any;
    className?: string;
}
export declare const Tooltip: React.FC<Props>;
export {};
