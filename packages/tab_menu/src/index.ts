import type { ApiDocData } from '@jazzsvelte/api'
export * from './tabMenu.types'
export * from './tabMenu.config'
export { default as TabMenu } from './TabMenu.svelte'
import tabMenuApi from './tabMenu.api.json'
export const tabMenuApiData: ApiDocData = tabMenuApi
