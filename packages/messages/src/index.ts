import type { ApiDocData } from '@jazzsvelte/api'
export * from './messages.types'
export * from './messages.config'
export { default as Messages } from './Messages.svelte'
import messagesApi from './messages.api.json'
export const messagesApiData: ApiDocData = messagesApi
