type Handler = (evt: object) => void

export default function EventBus() {
    const allHandlers = new Map<string, Handler[]>()

    return {
        on(type: string, handler: Handler) {
            let handlers = allHandlers.get(type)

            if (!handlers) handlers = [handler]
            else handlers.push(handler)

            allHandlers.set(type, handlers)
        },
        off(type: string, handler: Handler) {
            const handlers = allHandlers.get(type)

            handlers && handlers.splice(handlers.indexOf(handler) >>> 0, 1)
        },
        emit(type: string, evt: object) {
            const handlers = allHandlers.get(type)

            handlers && handlers.slice().forEach((handler) => handler(evt))
        }
    }
}
