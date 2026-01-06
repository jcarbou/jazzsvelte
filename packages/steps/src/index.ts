import type { ApiDocData } from '@jazzsvelte/api'
import stepsApi from './steps.api.json'

export { default as Steps } from './Steps.svelte'

export * from './steps.types'
export * from './steps.config'

export const stepsApiData: ApiDocData = stepsApi
