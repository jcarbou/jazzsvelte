export * from './splitButton.types'
export * from './splitButton.config'
export { default as SplitButton } from './SplitButton.svelte'
import type { ApiDocData } from '@jazzsvelte/api'
import splitButtonApi from './splitButton.api.json'
export const splitButtonApiData: ApiDocData = splitButtonApi
