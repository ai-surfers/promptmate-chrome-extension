import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
    const isProduction = mode === "production";

    return {
        plugins: [
            react(),
            tsconfigPaths(),
            ...(isProduction
                ? [
                      sentryVitePlugin({
                          org: "aisurfers",
                          project: "pocket-promopt-extension",
                      }),
                  ]
                : []),
        ],

        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "styled-system": path.resolve(__dirname, "./styled-system"),
            },
        },

        envDir: "./promptmate-chrome-extension-envs/",

        build: {
            sourcemap: isProduction,
        },
    };
});
