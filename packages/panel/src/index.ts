import type { ApiDocData } from '@jazzsvelte/api'
import panelApi from './panel.api.json'

export * from './panel.types'
export * from './panel.config'

export { default as Panel } from './Panel.svelte'
export { default as PanelToggler } from './PanelToggler.svelte'
export const panelApiData: ApiDocData = panelApi
