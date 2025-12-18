import { classNames } from '@jazzsvelte/api'
import { messagePT } from '@jazzsvelte/message'

messagePT({
    root: ({ props }) => ({
        class: classNames('inline-flex items-center justify-center align-top', 'p-3 m-0 rounded-md', {
            'bg-blue-100 border-0 text-blue-700': props.severity == 'info',
            'bg-green-100 border-0 text-green-700': props.severity == 'success',
            'bg-orange-100 border-0 text-orange-700': props.severity == 'warn',
            'bg-red-100 border-0 text-red-700': props.severity == 'error'
        })
    }),
    icon: 'text-base mr-2'
})
