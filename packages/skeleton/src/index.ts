import type { ApiDocData } from '@jazzsvelte/api'
export * from './skeleton.types'
export * from './skeleton.config'
export { default as Skeleton } from './Skeleton.svelte'
import skeletonApi from './skeleton.api.json'
export const skeletonApiData: ApiDocData = skeletonApi
