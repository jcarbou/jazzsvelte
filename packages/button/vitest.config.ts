import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
    plugins: [svelte()],
    test: {
        environment: 'jsdom',
        globals: true,
        include: ['src/**/*.test.{ts,js}', 'src/**/*.test.svelte.ts'],
        coverage: {
            reporter: ['text', 'html']
        }
    }
})
