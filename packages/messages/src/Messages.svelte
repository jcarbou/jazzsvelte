<script lang="ts">
    import type { MessagesMessage, MessagesMessageState, MessagesProps, MessagesPtContext } from './messages.types'
    import { resolveDivPt } from '@jazzsvelte/api'
    import { defaultMessagesProps as DEFAULT, globalMessagesPT as globalPt } from './messages.config'
    import UIMessage from './UIMessage.svelte'

    let {
        transition = DEFAULT.transition,
        pt = null,
        ptOptions = null,
        class: className = DEFAULT.class,
        style = DEFAULT.style,
        onClick = null,
        onRemove = null,
        unstyled = DEFAULT.unstyled,
        ..._restProps
    }: MessagesProps = $props()

    let _props: MessagesProps = $derived({
        pt,
        ptOptions,
        style,
        transition,
        class: className,
        onClick,
        onRemove
    })

    export const displayName = 'Messages'
    export function getElement(): HTMLDivElement {
        return rootEl
    }

    export function show(newMessage: MessagesMessage): MessagesMessageState {
        const newMessageState = messageToMessageState(newMessage)
        messagesState.push(newMessageState)
        return newMessageState
    }

    export function showList(newMessageList: MessagesMessage[]) {
        const newMessageStateList = newMessageList.map(messageToMessageState)
        messagesState.push(...newMessageStateList)
        return newMessageStateList
    }

    export function clear() {
        messagesState = []
    }

    export function replace(newMessage: MessagesMessage): MessagesMessageState {
        const newMessageState = messageToMessageState(newMessage)
        messagesState = [newMessageState]
        return newMessageState
    }

    export function replaceByList(newMessageList: MessagesMessage[]) {
        const newMessageStateList = newMessageList.map(messageToMessageState)
        messagesState = newMessageStateList
        return newMessageStateList
    }

    export function remove({ id }: MessagesMessageState) {
        const toRemoveMessageState = messagesState.find((messageState) => messageState.id === id)
        if (!toRemoveMessageState) return

        messagesState = messagesState.filter((messageState) => messageState.id !== id)
        onRemove && onRemove(toRemoveMessageState)
    }

    export function removeList(list: MessagesMessageState[]) {
        const idList = messagesState.map((messageState) => messageState.id)
        const toRemoveMessageStateList = messagesState.filter((messageState) => idList.includes(messageState.id))
        if (!toRemoveMessageStateList) return

        messagesState = messagesState.filter((messageState) => !idList.includes(messageState.id))
        onRemove && toRemoveMessageStateList.forEach((messageState) => onRemove(messageState))
    }

    export function onClose(messageState: MessagesMessageState) {
        remove(messageState)
    }

    let rootEl: HTMLDivElement
    let messageIdx = 0

    let messagesState: MessagesMessageState[] = $state([])

    let ptContext: MessagesPtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: {},
        ptOptions,
        unstyled
    })

    function messageToMessageState(message: MessagesMessage): MessagesMessageState {
        return { id: messageIdx++, message }
    }

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: [className],
                style,
                'data-pc-name': 'messages',
                'data-pc-section': 'root'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )
</script>

<div bind:this={rootEl} {...rootAttributes} {..._restProps}>
    {#if messagesState}
        {#each messagesState as messageState}
            <UIMessage {transition} {messageState} {onClick} {onClose} {pt} {ptOptions} {unstyled} />
        {/each}
    {/if}
</div>
