import type { ApiDocData } from '@jazzsvelte/api'
export * from './inplace.types'
export * from './inplace.config'
export { default as Inplace } from './Inplace.svelte'
import inplaceApi from './inplace.api.json'
export const inplaceApiData: ApiDocData = inplaceApi
