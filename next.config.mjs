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
        return config;
    },
};
