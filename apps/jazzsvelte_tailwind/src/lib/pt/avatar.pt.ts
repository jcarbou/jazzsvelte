import { classNames } from '@jazzsvelte/api'
import { avatarPT } from '@jazzsvelte/avatar'

avatarPT({
    root: ({ props, state }) => ({
        class: classNames(
            'flex items-center justify-center',
            'bg-gray-300 dark:bg-gray-800',
            {
                'rounded-lg': props.shape == 'square',
                'rounded-full': props.shape == 'circle'
            },
            {
                'text-base h-8 w-8': props.size == null || props.size == 'normal',
                'w-12 h-12 text-xl': props.size == 'large',
                'w-16 h-16 text-2xl': props.size == 'xlarge'
            },
            {
                '-ml-4 border-2 border-white dark:border-gray-900': state.isNestedInAvatarGroup
            }
        )
    }),
    image: 'h-full w-full'
})
