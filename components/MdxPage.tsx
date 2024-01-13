import React, { useRef } from "react";

import { MDXRemote } from "next-mdx-remote";
import { Mermaid, Pre } from "@portaljs/core";
import TurtleEditor from "./TurtleEditor";
import { Callout } from "@portaljs/remark-callouts";

import layouts from "../layouts";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.

function extractTextFromChildren(children: React.ReactNode): string {
    if (typeof children === "string") {
        return children;
    }

    if (Array.isArray(children)) {
        return children.map(extractTextFromChildren).join("");
    }

    if (
        React.isValidElement(children) &&
        (children as React.ReactElement).props.children
    ) {
        return extractTextFromChildren(
            (children as React.ReactElement).props.children
        );
    }

    return "";
}

const TurtleEditorWrapper = ({ className, children }) => {
    // If it's not Turtle, use Pre
    if (!className || !className.includes("language-turtle")) {
        return <Pre className={className}>{children}</Pre>;
    }
    // If we're here, it's Turtle
    return (
        <TurtleEditor className={className}>
            {extractTextFromChildren(children)}
        </TurtleEditor>
    );
};

const components = {
    mermaid: Mermaid,
    pre: TurtleEditorWrapper,
    TurtleEditor: TurtleEditor,
    blockquote: Callout,
};

export default function MdxPage({ source, frontMatter }) {
    const Layout = ({ children }) => {
        if (frontMatter.layout) {
            const LayoutComponent = layouts[frontMatter.layout];
            return (
                <LayoutComponent {...frontMatter}>{children}</LayoutComponent>
            );
        }
        return <>{children}</>;
    };

    return (
        <main id="mdxpage" className="prose mx-auto">
            <Layout>
                <MDXRemote {...source} components={components} />
            </Layout>
        </main>
    );
}
