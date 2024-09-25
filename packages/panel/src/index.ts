import type { ApiDocData } from '@jazzsvelte/api'
export * from './panel.types'
export * from './panel.config'
export { default as Panel } from './Panel.svelte'
import panelApi from './panel.api.json'
export const panelApiData: ApiDocData = panelApi
