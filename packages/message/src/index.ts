import type { ApiDocData } from '@jazzsvelte/api'
export * from './message.types'
export * from './message.config'
export { default as Message } from './Message.svelte'
import messageApi from './message.api.json'
export const messageApiData: ApiDocData = messageApi
