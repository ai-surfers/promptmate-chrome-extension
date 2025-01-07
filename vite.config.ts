import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
    const isProduction = mode === "production";

    return {
        plugins: [
            react(),
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
            },
        },

        envDir: "./promptmate-chrome-extension-envs/",

        build: {
            sourcemap: isProduction,
        },
    };
});
