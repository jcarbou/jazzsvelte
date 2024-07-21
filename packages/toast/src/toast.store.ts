import { writable } from 'svelte/store'
import type { StoreToastMessage, ShowToastProps, ToastMessageStatus } from './toastMessage.types'

let ID = 1

export const toastMessages = writable<StoreToastMessage[]>([])

/**
 * Show toast message
 * @param toastMessage - toast message  configuration
 * @param append - append toast message or replace all
 * @returns message status
 */
export function showToast(toastMessage: ShowToastProps, append?: boolean): ToastMessageStatus {
    return _update([toastMessage], append)[0]
}

/**
 * Show a listtof toast messages
 * @param toastMessage - toast message  configuration
 * @param append - append toast message or replace all
 * @param toastGroupId - toast group id
 * @returns message status list
 */
export function showToastList(toastList: ShowToastProps[], append: boolean = true): ToastMessageStatus[] {
    return _update(toastList, append)
}

function _update(messages: ShowToastProps[], append: boolean = true): ToastMessageStatus[] {
    const storeMessages = messages.map((message): StoreToastMessage => {
        const id = `toast_msg_${ID++}`

        // Setup some sensible defaults for a toast.
        const defaults: StoreToastMessage = {
            id,
            toastId: 'default',
            severity: 'info',
            closable: true,
            life: 3000,
            status: {
                id,
                isClosed: false
            }
        }
        const storeMessage: StoreToastMessage = { ...defaults, ...message }
        const { life, sticky } = storeMessage
        if (life && !sticky) {
            storeMessage.timerId = setTimeout(() => closeToast(storeMessage.status), life)
        }

        return { ...defaults, ...message }
    })

    toastMessages.update((all) => (append ? [...storeMessages, ...all] : storeMessages))

    return storeMessages.map((message) => message.status)
}

/**
 * Close toast message with the given id
 * @param id - id
 */
export function closeToast(status: ToastMessageStatus | null | undefined) {
    if (!status) return
    toastMessages.update((all) => {
        const message = all.find((t) => t.id === status.id)
        if (!message) return all
        clearTimeout(message.timerId)
        status.isClosed = true
        return all.filter((t) => t !== message)
    })
}

/**
 * Clear all toast message of the given group, or all toast messages if group is not given
 * @param toastGroupId - toast group id
 * @returns
 */
export function closeAllToasts(toastGroupId?: string | null) {
    toastMessages.update((all) => {
        const newList = []
        for (const message of all) {
            if (!toastGroupId || toastGroupId === message.toastId) {
                clearTimeout(message.timerId)
                message.status.isClosed = true
            } else {
                newList.push(message)
            }
        }
        return newList
    })
}
