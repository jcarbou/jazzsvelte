import type { ApiDocData } from '@jazzsvelte/api'
export * from './progressSpinner.types'
export * from './progressSpinner.config'
export { default as ProgressSpinner } from './ProgressSpinner.svelte'
import progressSpinnerApi from './progressSpinner.api.json'
export const progressSpinnerApiData: ApiDocData = progressSpinnerApi
