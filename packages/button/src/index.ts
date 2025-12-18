import type { ApiDocData } from '@jazzsvelte/api'
import buttonApi from './button.api.json'

export { default as Button } from './Button.svelte'

export * from './button.types'
export * from './buttonGroup.types'
export * from './button.config'

export const buttonApiData: ApiDocData = buttonApi
