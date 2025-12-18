import { classNames } from '@jazzsvelte/api'
import { splitButtonPT } from '@jazzsvelte/split_button'

const TRANSITIONS = {
    enterFromClass: 'opacity-0 scale-75',
    enterActiveClass: 'transition-transform transition-opacity duration-150 ease-in',
    leaveActiveClass: 'transition-opacity duration-150 ease-linear',
    leaveToClass: 'opacity-0'
}

splitButtonPT({
    root: ({ props }) => ({
        class: classNames('inline-flex relative', 'rounded-md', { 'shadow-lg': props.raised })
    }),
    button: {
        root: ({ parentPtContext }) => ({
            class: classNames('rounded-r-none border-r-0', { 'rounded-l-full': parentPtContext?.props.rounded })
        }),
        icon: 'mr-2'
    },
    menu: {
        root: {
            class: classNames('outline-none', 'm-0 p-0 list-none')
        }
    },
    /// menulist: 'relative',
    menuButton: {
        root: ({ parentPtContext }) => ({
            class: classNames('rounded-l-none', { 'rounded-r-full': parentPtContext?.props.rounded })
        })
    }
})
