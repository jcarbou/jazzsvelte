export * from './speedDial.types'
export * from './speedDial.config'
export { default as SpeedDial } from './SpeedDial.svelte'
import { ApiDocData } from '@jazzsvelte/api'
import speedDialApi from './speedDial.api.json'
export const speedDialApiData: ApiDocData = speedDialApi
