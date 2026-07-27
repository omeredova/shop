import { defineConfig } from 'vitest/config'
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(
    fileURLToPath(import.meta.url)
);

export default defineConfig({
    plugins: [
        svgr({
            include: '**/*.svg',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.ts',
    },
})