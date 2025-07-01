import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
    const baseConfig = {
        root: "public",
        server: {
            port: 3001,
            proxy: {
                "/api": {
                    target: "http://localhost:3000",
                    changeOrigin: true,
                },
            },
        },
    };

    if (command === "build") {
        return {
            ...baseConfig,
            build: {
                outDir: "../dist/public",
                emptyOutDir: true,
                rollupOptions: {
                    input: "public/index.html",
                },
            },
        };
    }

    return baseConfig;
});
