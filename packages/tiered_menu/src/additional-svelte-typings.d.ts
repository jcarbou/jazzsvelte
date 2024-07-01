declare namespace svelteHTML {
    interface HTMLAttributes {
        'on:clickoutside'?: (event: CustomEvent) => void
        'on:windowresize'?: (event: CustomEvent) => void
    }
}
