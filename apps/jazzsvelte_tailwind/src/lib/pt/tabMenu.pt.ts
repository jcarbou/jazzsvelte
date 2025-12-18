import { classNames } from '@jazzsvelte/api'
import { tabMenuPT } from '@jazzsvelte/tab_menu'

tabMenuPT({
    root: 'overflow-x-auto',
    menu: {
        class: classNames(
            'flex m-0 p-0 list-none flex-nowrap',
            'bg-white border-solid border-gray-300 border-b-2',
            'outline-none no-underline text-base list-none'
        )
    },
    menuitem: 'mr-0',
    action: ({ context, state }) => ({
        class: classNames(
            'cursor-pointer select-none flex items-center relative no-underline overflow-hidden',
            'border-b-2 p-5 font-bold rounded-t-lg ',
            'focus:outline-none focus:outline-offset-0 focus:shadow-[inset_0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]',
            {
                'border-gray-300 bg-white text-gray-700 hover:bg-white hover:border-gray-400 hover:text-gray-600 dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 dark:hover:bg-gray-800/80':
                    state.activeIndex !== context?.index, // Condition-based hover styles.
                'bg-white border-blue-500 text-blue-500 dark:bg-gray-900 dark:border-blue-300 dark:text-blue-300':
                    state.activeIndex === context?.index // Condition-based active styles.
            }
        ),
        style: { top: '2px' }
    }),
    icon: 'mr-2'
})
