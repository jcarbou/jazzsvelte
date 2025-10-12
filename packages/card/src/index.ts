import type { ApiDocData } from '@jazzsvelte/api'
export * from './card.types'
export * from './card.config'
export { default as Card } from './Card.svelte'
import cardApi from './card.api.json'
export const cardApiData: ApiDocData = cardApi
