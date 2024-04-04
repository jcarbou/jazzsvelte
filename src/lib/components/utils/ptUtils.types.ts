import type { HTMLAttributes } from 'svelte/elements'

type HTMLAttr<ELT extends HTMLElement> = HTMLAttributes<ELT>

export type PtAttr<ELT extends HTMLElement> = Omit<HTMLAttr<ELT>, 'style'> & {
    style?: string | { [key: string]: string }
}

export type PassThroughMethodOptions<CP> = {
    props: CP
}
