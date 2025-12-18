import { classNames } from '@jazzsvelte/api'
import { tagPT } from '@jazzsvelte/tag'

tagPT({
    root: ({ props }) => ({
        class: classNames(
            'inline-flex items-center justify-center',
            'bg-blue-500 text-white text-xs font-semibold px-2 py-1 ',
            {
                'bg-gray-500 ': props.severity == 'secondary',
                'bg-green-500 ': props.severity == 'success',
                'bg-blue-500 ': props.severity == 'info',
                'bg-orange-500 ': props.severity == 'warning',
                'bg-red-500 ': props.severity == 'danger'
            },
            {
                'rounded-md': !props.rounded,
                'rounded-full': props.rounded
            }
        )
    }),
    value: 'leading-6',
    icon: 'mr-1 text-sm'
})
