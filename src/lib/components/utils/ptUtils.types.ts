import type { HTMLAttributes } from 'svelte/elements'

export type HTMLAttr = HTMLAttributes<HTMLElement>

export type PtHTMLAttr = Omit<HTMLAttr, 'style'> & {
    style?: string | { [key: string]: string }
}

export type PassThroughMethodOptions<CP> = {
    props: CP
}
