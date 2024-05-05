import { get, writable } from 'svelte/store'
import type { ToastMessage } from './toast.types'

let ID = 1
type StoreToastMessage = ToastMessage & { timerId?: ReturnType<typeof setTimeout> }

export const toastMessages = writable<StoreToastMessage[]>([])

/**
 * Show toast message
 * @param toastMessage - toast message  configuration
 * @param append - append toast message or replace all
 * @param toastGroupId - toast group id
 * @returns message id
 */
export function showToast<CUSTOM>(toastMessage: Partial<ToastMessage & CUSTOM>, append: boolean = true): string {
    return _update([toastMessage], append)[0]
}

/**
 * Show a listtof toast messages
 * @param toastMessage - toast message  configuration
 * @param append - append toast message or replace all
 * @param toastGroupId - toast group id
 * @returns message id list
 */
export function showToastList<CUSTOM>(toastList: Partial<ToastMessage & CUSTOM>[], append: boolean = true): string[] {
    return _update(toastList, append)
}

function _update(messages: Partial<ToastMessage>[], append: boolean = true): string[] {
    const storeMessages = messages.map((message): StoreToastMessage => {
        // Setup some sensible defaults for a toast.
        const defaults: StoreToastMessage = {
            id: `toast_msg_${ID++}`,
            toastId: 'default',
            severity: 'info',
            closable: true,
            life: 3000
        }
        const storeMessage: StoreToastMessage = { ...defaults, ...message }
        const { id, life, sticky } = storeMessage
        if (life && !sticky) {
            storeMessage.timerId = setTimeout(() => closeToast(id), life)
        }

        return { ...defaults, ...message }
    })

    toastMessages.update((all) => (append ? [...storeMessages, ...all] : storeMessages))

    return storeMessages.map((message) => message.id)
}

/**
 * Close toast message with the given id
 * @param id - id
 */
export function closeToast(id: string | null | undefined) {
    if (!id) return
    clearCloseToastTimer(id)
    toastMessages.update((all) => all.filter((t) => t.id !== id))
}

/**
 * Clear all toast messae of group, or all toast messages if group is not given
 * @param toastGroupId - toast group id
 * @returns
 */
export function closeAllToasts(toastGroupId?: string | null) {
    if (!toastGroupId) {
        toastMessages.update(() => [])
        return
    }
    toastMessages.update((all) => all.filter((m) => m.toastId != toastGroupId))
}

/**
 * Clear close timer of toast message. This message will not be close automaticly
 * @param id
 */
export function clearCloseToastTimer(id: string | null | undefined) {
    if (!id) return
    const message = get(toastMessages).find((t) => t.id !== id)
    message && clearTimeout(message.timerId)
}

/**
 * Return true if toast message with the given id is displayed
 * @param id
 */
export function isToastMessageAlive(id: string | null | undefined): boolean {
    return !!id && !!get(toastMessages).find((t) => t.id !== id)
}
