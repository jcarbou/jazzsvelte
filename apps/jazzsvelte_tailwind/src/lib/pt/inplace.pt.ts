import { classNames } from '@jazzsvelte/api'
import { inplacePT } from '@jazzsvelte/inplace'

inplacePT({
    display: {
        class: classNames(
            'p-3 rounded-md transition duration-200 text-gray-700 dark:text-white/80',
            'inline cursor-pointer',
            'hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-800/80 dark:hover:text-white/80'
        )
    }
})
