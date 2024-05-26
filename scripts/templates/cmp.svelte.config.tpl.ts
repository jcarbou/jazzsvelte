import { CmpContext, ScriptOptions } from '../scripts.types'
import { generateCmpFile } from '../scripts.utils'

export function render(): string {
    return `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const config = {
	preprocess: vitePreprocess()
}

export default config;`
}

export function generateCmpSvelteConfig(context: CmpContext, options: ScriptOptions) {
    generateCmpFile(context, 'svelteConfigPath', render, options)
}
