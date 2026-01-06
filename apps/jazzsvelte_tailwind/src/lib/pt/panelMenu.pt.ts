import { classNames } from '@jazzsvelte/api'
import { panelMenuPT } from '@jazzsvelte/panel_menu'

panelMenuPT({
    root: 'w-full md:w-[25rem]',
    panel: 'mb-1',
    header: {
        class: classNames(
            'outline-none',
            'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]' // Focus
        )
    },
    headerContent: {
        class: classNames(
            'border border-solid border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-gray-900 rounded-md transition-shadow duration-200',
            'hover:bg-gray-200 dark:hover:bg-gray-800/80  hover:text-gray-700 dark:hover:text-white/80'
        )
    },
    headerAction: {
        class: classNames(
            'flex items-center select-none cursor-pointer relative no-underline',
            'text-gray-700 dark:text-white/80 p-5 font-bold'
        )
    },
    submenuIcon: 'mr-2',
    headerIcon: 'mr-2',
    menuContent:
        'py-1 border border-t-0 border-gray-300 dark:border-blue-900/40 bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 rounded-t-none rounded-br-md rounded-bl-md',
    menu: {
        class: classNames('outline-none', 'm-0 p-0 list-none')
    },
    menuitem: ({ context }) => ({
        class: classNames(
            'text-gray-700 dark:text-white/80 transition-shadow duration-200 border-none rounded-none',
            'hover:bg-gray-200 dark:hover:bg-gray-800/80  hover:text-gray-700 dark:hover:text-white/80', // Hover
            {
                'bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90': context?.focused
            }
        )
    }),
    action: {
        class: classNames(
            'text-gray-700 dark:text-white/80 py-3 px-5 select-none',
            'flex items-center cursor-pointer no-underline relative overflow-hidden'
        )
    },
    icon: 'mr-2',
    submenu: 'p-0 pl-4 m-0 list-none'
})
