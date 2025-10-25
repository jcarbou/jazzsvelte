import { defineConfig } from "vite";
import { sveltekit } from '@sveltejs/kit/vite';
//import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [sveltekit()],
  test: {
    globals: true,
    environment: "jsdom",
   // include: ['**/*.test.ts}'],
   // setupFiles: ["../../setupTest.js"]
  },
  resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});