import { classNames } from '@jazzsvelte/api'
import { chipPT } from '@jazzsvelte/chip'

chipPT({
    root: {
        class: classNames(
            'inline-flex items-center',
            'bg-gray-200 text-gray-800 rounded-[16px] px-3 dark:text-white/80 dark:bg-gray-900'
        )
    },
    label: 'leading-6 mt-1.5 mb-1.5',
    icon: 'leading-6 mr-2',
    image: {
        class: classNames('w-9 h-9 ml-[-0.75rem] mr-2', 'rounded-full')
    },
    removeIcon: {
        class: classNames('ml-2 rounded-md transition duration-200 ease-in-out', 'cursor-pointer leading-6')
    }
})
