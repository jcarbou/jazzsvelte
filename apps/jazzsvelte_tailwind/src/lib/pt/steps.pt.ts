import { classNames } from '@jazzsvelte/api'
import { stepsPT } from '@jazzsvelte/steps'

stepsPT({
    root: 'relative',
    menu: 'p-0 m-0 list-none flex',
    menuitem: {
        class: classNames(
            'relative flex justify-center flex-1 overflow-hidden',
            'before:border-t before:border-gray-300 before:dark:border-blue-900/40 before:w-full before:absolute before:top-1/4 before:left-0 before:transform before:-translate-y-1/2'
        )
    },
    action: {
        class: classNames(
            'inline-flex flex-col items-center overflow-hidden',
            'transition-shadow rounded-md bg-white dark:bg-transparent',
            'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]'
        )
    },
    step: {
        class: classNames(
            'flex items-center justify-center',
            'text-gray-700 dark:text-white/80 border border-gray-300 dark:border-blue-900/40  bg-white dark:bg-gray-900 w-[2rem] h-[2rem] leading-2rem text-sm z-10 rounded-full'
        )
    },
    label: {
        class: classNames(
            'block',
            'whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full',
            'mt-2 text-gray-500 dark:text-white/60'
        )
    }
})
