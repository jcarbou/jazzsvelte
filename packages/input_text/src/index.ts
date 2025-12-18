import type { ApiDocData } from '@jazzsvelte/api'
import inputTextApi from './inputText.api.json'

export { default as InputText } from './InputText.svelte'

export * from './inputText.types'
export * from './inputText.config'

export const inputTextApiData: ApiDocData = inputTextApi
