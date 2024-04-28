<script lang="ts">
    import { SvelteComponent, getContext } from 'svelte'
    import JAZZ_SVELTE from '../api/JazzSvelte'
    import { resolvePT } from '../utils/ptUtils'
    import type { CssStyle, HTMLDivAttributes } from '../utils/utils.types'
    import ToastMessage from './ToastMessage.svelte'
    import type { ToastPassThroughMethodOptions, ToastPassThroughOptions, ToastPosition } from './toast.types'
    import { toastMessages } from './toastr.store'
    import type { JazzSvelteOptions } from '../api/JazzSvelte.types'
    import { mergeCssStsyles } from '../utils/cssStyles'

    export let id: string = 'default'
    export let position: ToastPosition | null = 'bottom-right'
    let className: string | null = null
    export { className as class }
    export let content: typeof SvelteComponent | undefined = undefined
    export let pt: Omit<ToastPassThroughOptions, 'message'> | null = null
    export let ptOptions: ToastPassThroughMethodOptions | null = null
    export let unstyled: boolean = false
    export let style: CssStyle = null

    const { inputStyle, ripple } = JAZZ_SVELTE
    const context = getContext<Partial<JazzSvelteOptions>>('jazzSvelte')

    // "roor" element
    $: rootAttributes = resolvePT(
        {
            class: [
                className,
                'p-toast',
                'p-component',
                'p-toast-' + position,
                {
                    'p-input-filled': context?.inputStyle === 'filled' || $inputStyle === 'filled',
                    'p-ripple-disabled': context?.ripple === false || $ripple === false
                }
            ],
            style: mergeCssStsyles([
                style,
                {
                    position: 'fixed',
                    top:
                        position === 'top-right' || position === 'top-left' || position === 'top-center'
                            ? '20px'
                            : position === 'center'
                              ? '50%'
                              : null,
                    right: position === 'top-right' || position === 'bottom-right' ? '20px' : null,
                    bottom:
                        position === 'bottom-left' || position === 'bottom-right' || position === 'bottom-center' ? '20px' : null,
                    left:
                        position === 'top-left' || position === 'bottom-left'
                            ? '20px'
                            : position === 'center' || position === 'top-center' || position === 'bottom-center'
                              ? '50%'
                              : null
                }
            ])
        },
        pt?.root,
        JAZZ_SVELTE.pt?.toast?.root,
        ptOptions,
        unstyled
    ) satisfies HTMLDivAttributes
</script>

<div {...rootAttributes}>
    {#each $toastMessages.filter((m) => m.toastId === id) as toastMessage (toastMessage.id)}
        <ToastMessage {content} {...toastMessage} />
    {/each}
</div>

<style>
    @layer primereact {
        .p-toast {
            width: calc(100% - var(--toast-indent, 0px));
            max-width: 25rem;
        }

        .p-toast-top-center {
            transform: translateX(-50%);
        }

        .p-toast-bottom-center {
            transform: translateX(-50%);
        }

        .p-toast-center {
            min-width: 20vw;
            transform: translate(-50%, -50%);
        }

        /* Animations */
        /*.p-toast-message-enter {
        opacity: 0;
        transform: translateY(50%);
    }
    
    .p-toast-message-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: transform 0.3s, opacity 0.3s;
    }
    
    .p-toast-message-enter-done {
        transform: none;
    }
    
    .p-toast-message-exit {
        opacity: 1;
        max-height: 1000px;
    }
    
    .p-toast .p-toast-message.p-toast-message-exit-active {
        opacity: 0;
        max-height: 0;
        margin-bottom: 0;
        overflow: hidden;
        transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin-bottom 0.3s;
    }*/
    }
</style>
