import { classNames } from '@jazzsvelte/api'
import { tooltipPT } from '@jazzsvelte/tooltip'

tooltipPT({
    root: ({ context }) => ({
        class: classNames('absolute shadow-md', {
            'py-0 px-1': context.right || context.left || (!context.right && !context.left && !context.top && !context.bottom),
            'py-1 px-0': context.top || context.bottom
        })
    }),

    arrow: ({ context }) => ({
        class: classNames('absolute w-0 h-0 border-transparent border-solid', {
            '-mt-1 border-y-[0.25rem] border-r-[0.25rem] border-l-0 border-r-gray-600': context.right,
            '-mt-1 border-y-[0.25rem] border-l-[0.25rem] border-r-0 border-l-gray-600': context.left,
            '-ml-1 border-x-[0.25rem] border-t-[0.25rem] border-b-0 border-t-gray-600': context.top,
            '-ml-1 border-x-[0.25rem] border-b-[0.25rem] border-t-0 border-b-gray-600': context.bottom
        })
    }),
    text: {
        class: 'p-3 bg-gray-600 text-white rounded-md whitespace-pre-line break-words'
    }
})
