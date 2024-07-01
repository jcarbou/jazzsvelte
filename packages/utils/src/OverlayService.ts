import EventBus from './EventBus'

/**
 * Overlay service event.
 */
export interface OverlayServiceEvent {
    /**
     * Original event that triggered the overlay.
     */
    originalEvent: Event
    /**
     * Target element that the overlay is bound to.
     */
    target: HTMLElement
}

export const OverlayService = EventBus<OverlayServiceEvent>()
