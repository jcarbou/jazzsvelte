<script lang="ts">
    import type { JazzSvelteContext, PassThroughOptions } from '@jazzsvelte/api'
    import type { ToastPassThroughMethodOptions, ToastProps } from './toast.types'

    import { getContext } from 'svelte'
    import { mergeCssStyles, resolveDivPt, zIndex } from '@jazzsvelte/api'
    import ToastMessage from './ToastMessage.svelte'
    import { toastMessages } from './toast.store'
    import { fade, fly } from 'svelte/transition'
    import { defaultToastProps as DEFAULT, globalToastPT as globalPt } from './toast.config'

    let _props = $props()
    let {
        class: className = DEFAULT.class,
        id = DEFAULT.id,
        position = DEFAULT.position,
        pt = null,
        ptOptions = null,
        style = DEFAULT.style,
        unstyled = DEFAULT.unstyled,
        ..._restProps
    }: ToastProps = _props

    export const displayName = 'Toast'

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
    const { inputStyle, ripple } = jazzSvelteContext

    let ptContext: ToastPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    } = $derived({
        props: { ...DEFAULT, ..._props },
        ptOptions,
        unstyled
    })

    // "roor" elements
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    className,
                    'p-toast',
                    'p-component',
                    'p-toast-' + position,
                    {
                        'p-input-filled': $inputStyle === 'filled',
                        'p-ripple-disabled': $ripple === false
                    }
                ],
                style: mergeCssStyles([
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
                            position === 'bottom-left' || position === 'bottom-right' || position === 'bottom-center'
                                ? '20px'
                                : null,
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
            globalPt?.root,
            ptContext
        )
    )
</script>

<div {...rootAttributes} {..._restProps} use:zIndex={{ key: 'toast', jazzSvelteContext }}>
    {#each $toastMessages.filter((m) => m.toastId === id) as toastMessage (toastMessage.id)}
        <div in:fly={{ y: 100, duration: 650 }} out:fade={{ duration: 300 }}>
            <ToastMessage {...toastMessage} />
        </div>
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
