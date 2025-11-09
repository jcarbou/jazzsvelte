import { defineConfig } from "vite";
//import { sveltekit } from '@sveltejs/kit/vite';
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  //plugins: [sveltekit()],
  plugins: [svelte()],
  test: {
    globals: true,
    environment: "jsdom",
   include: ['src/**/*.test.{ts,js}', 'src/**/*.test.svelte.ts'],
   // setupFiles: ["../../setupTest.js"]
  },
  resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});