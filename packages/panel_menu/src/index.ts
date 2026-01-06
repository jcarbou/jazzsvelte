import type { ApiDocData } from '@jazzsvelte/api'
import panelMenuApi from './panelMenu.api.json'

export { default as PanelMenu } from './PanelMenu.svelte'

export * from './panelMenu.types'
export * from './panelMenu.config'

export const panelMenuApiData: ApiDocData = panelMenuApi
