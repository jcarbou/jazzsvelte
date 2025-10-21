type Handler<EVENT> = (evt: EVENT) => void

export default function EventBus<EVENT>() {
    const allHandlers = new Map<string, Handler<EVENT>[]>()

    return {
        on(type: string, handler: Handler<EVENT>) {
            let handlers = allHandlers.get(type)

            if (!handlers) handlers = [handler]
            else handlers.push(handler)

            allHandlers.set(type, handlers)
        },
        off(type: string, handler: Handler<EVENT>) {
            const handlers = allHandlers.get(type)

            handlers && handlers.splice(handlers.indexOf(handler) >>> 0, 1)
        },
        emit(type: string, evt: EVENT) {
            const handlers = allHandlers.get(type)

            handlers && handlers.slice().forEach((handler) => handler(evt))
        }
    }
}
