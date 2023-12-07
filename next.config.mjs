import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export default {
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config) => {
        config.infrastructureLogging = {
            level: "error",
        };

        // Add the copy-webpack-plugin
        config.plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: "node_modules/stackframe/stackframe.js",
                        to: path.resolve(
                            process.cwd(),
                            "public",
                            "stackframe.js"
                        ),
                    },
                ],
            })
        );

        return config;
    },
};
