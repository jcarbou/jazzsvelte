import type { ApiDocData } from '@jazzsvelte/api'
export * from './panel.types'
export * from './panel.config'
export { default as Panel } from './Panel.svelte'
export { default as PanelToggler } from './PanelToggler.svelte'
export { default as PanelHeader } from './PanelHeader.svelte'
export { default as PanelFooter } from './PanelFooter.svelte'
import panelApi from './panel.api.json'
export const panelApiData: ApiDocData = panelApi
