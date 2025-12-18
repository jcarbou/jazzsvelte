import { classNames } from '@jazzsvelte/api'
import { toastMessagePT } from '@jazzsvelte/toast'

toastMessagePT({
    root: {
        class: classNames('w-96', 'opacity-90')
    },
    message: ({ props }) => ({
        class: classNames('my-4 rounded-md w-full', {
            'bg-blue-100 border-solid border-0 border-l-4 border-blue-500 text-blue-700': props.severity == 'info',
            'bg-green-100 border-solid border-0 border-l-4 border-green-500 text-green-700': props.severity == 'success',
            'bg-orange-100 border-solid border-0 border-l-4 border-orange-500 text-orange-700': props.severity == 'warn',
            'bg-red-100 border-solid border-0 border-l-4 border-red-500 text-red-700': props.severity == 'error'
        })
    }),
    content: 'flex items-center py-5 px-7',
    icon: {
        class: classNames('w-6 h-6', 'text-lg mr-2')
    },
    text: 'text-base font-normal flex flex-col flex-1 grow shrink ml-4',
    summary: 'font-bold block',
    detail: 'mt-1 block',
    closeButton: {
        class: classNames(
            'w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out',
            'ml-auto overflow-hidden relative',
            'flex items-center justify-center',
            'hover:bg-white/30'
        )
    }
})
