import { classNames } from '@jazzsvelte/api'
import { messagesPT } from '@jazzsvelte/messages'

messagesPT({
    root: ({ context }) => ({
        class: classNames('my-4 rounded-md', {
            'bg-blue-100 border-solid border-0 border-l-4 border-blue-500 text-blue-700': context?.severity == 'info',
            'bg-green-100 border-solid border-0 border-l-4 border-green-500 text-green-700': context?.severity == 'success',
            'bg-orange-100 border-solid border-0 border-l-4 border-orange-500 text-orange-700': context?.severity == 'warn',
            'bg-red-100 border-solid border-0 border-l-4 border-red-500 text-red-700': context?.severity == 'error'
        })
    }),

    wrapper: 'flex items-center py-5 px-7',
    icon: {
        class: classNames('w-6 h-6', 'text-lg mr-2')
    },
    summary: 'text-base font-normal',
    button: {
        class: classNames(
            'w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out',
            'ml-auto overflow-hidden relative',
            'flex items-center justify-center',
            'hover:bg-white/30'
        )
    }
})
