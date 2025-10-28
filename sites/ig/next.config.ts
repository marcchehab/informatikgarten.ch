import nextra from "nextra";
import {
    rehypeMuxvideo,
    remarkCustomCodeLangs,
    remarkExcalidraw,
    remarkPathCorrections,
    remarkVideo,
    remarkWikiLinks,
    remarkCallouts,
} from "shared/server/remark";
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationFocus } from "@shikijs/transformers"

function isExportNode(node, varName: string) {
    if (node.type !== "mdxjsEsm") return false;
    const [n] = node.data.estree.body;

    if (n.type !== "ExportNamedDeclaration") return false;

    const name = n.declaration?.declarations?.[0].id.name;
    if (!name) return false;

    return name === varName;
}

const DEFAULT_PROPERTY_PROPS = {
    type: "Property",
    kind: "init",
    method: false,
    shorthand: false,
    computed: false,
};

export function createAstObject(obj) {
    return {
        type: "ObjectExpression",
        properties: Object.entries(obj).map(([key, value]) => ({
            ...DEFAULT_PROPERTY_PROPS,
            key: { type: "Identifier", name: key },
            value:
                value && typeof value === "object"
                    ? value
                    : { type: "Literal", value },
        })),
    };
}

// eslint-disable-next-line unicorn/consistent-function-scoping
const rehypeOpenGraphImage = () => (ast) => {
    const frontMatterNode = ast.children.find((node) =>
        isExportNode(node, "metadata")
    );
    if (!frontMatterNode) {
        return;
    }
    const { properties } =
        frontMatterNode.data.estree.body[0].declaration.declarations[0].init;
    const title = properties.find((o) => o.key.value === "title")?.value.value;
    if (!title) {
        return;
    }
    const [prop] = createAstObject({
        openGraph: createAstObject({
            images: `https://informatikgarten.ch/og?title=${title}`,
        }),
    }).properties;
    properties.push(prop);
};

const withNextra = nextra({
    latex: true,
    defaultShowCopyCode: true,
    mdxOptions: {
        format: "mdx",
        remarkPlugins: [
            remarkWikiLinks, // before Excalidraw
            remarkExcalidraw, // before path corrections
            remarkVideo, // before path corrections
            remarkPathCorrections,
            remarkCustomCodeLangs,
            remarkCallouts,
        ],
        rehypePlugins: [
            // Provide only on `build` since turbopack on `dev` supports only serializable values
            ...(process.env.NODE_ENV === "production" ? [rehypeOpenGraphImage] : []),
            rehypeMuxvideo,
        ],
        rehypePrettyCodeOptions: {
            transformers: [transformerNotationDiff(), transformerNotationHighlight(), transformerNotationFocus()]
        }
    },
    whiteListTagsStyling: ["figure", "figcaption"],
});

const nextConfig = withNextra({
    reactStrictMode: true,
    eslint: {
        // ESLint behaves weirdly in this monorepo.
        ignoreDuringBuilds: true,
    },
    outputFileTracingExcludes: {
        "*": [
            "./content/**/*",
            "./content",
        ],
    },
    webpack(config, { isServer }) {

        // Add this rule before other rules to exclude Obsidian files
        config.module.rules.push({
            test: (filePath) => {
                return filePath.includes('.obsidian/');
            },
            use: "null-loader",
        });

        // rule.exclude doesn't work starting from Next.js 15
        const { test: _test, ...imageLoaderOptions } = config.module.rules.find(
            (rule) => rule.test?.test?.(".svg")
        );
        config.module.rules.push({
            test: /\.svg$/,
            oneOf: [
                {
                    resourceQuery: /svgr/,
                    use: ["@svgr/webpack"],
                },
                imageLoaderOptions,
            ],
        });

        config.module.rules.push({
            test: /\.(xlsx|txt|odt|docx|pdf|py|log)$/,
            type: "asset/resource",
        });

        config.module.rules.push({
            test: /\.(tsv|ai|rnote|blend|log|mp4|mov|blend|blend1|backup\.md|excalidraw\.md)$/,
            use: "null-loader",
        });

        // disabling fs and path to avoid the tears
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                path: false,
            };
        }
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.youtube.com",
                port: "",
                pathname: "/vi/**",
            },
        ],
    },
    experimental: {
        turbo: {
            rules: {
                "./components/icons/*.svg": {
                    loaders: ["@svgr/webpack"],
                    as: "*.js",
                },
            },
        },
        optimizePackageImports: ["@components/icons"],
    },
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig);
