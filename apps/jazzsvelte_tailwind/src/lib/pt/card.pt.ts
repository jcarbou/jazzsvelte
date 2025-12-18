import { classNames } from '@jazzsvelte/api'
import { cardPT } from '@jazzsvelte/card'

cardPT({
    root: {
        class: classNames(
            'bg-white text-gray-700 shadow-md rounded-md', // Background, text color, box shadow, and border radius.
            'dark:bg-gray-900 dark:text-white ' //dark
        )
    },
    body: 'p-5', // Padding.
    title: 'text-2xl font-bold mb-2', // Font size, font weight, and margin bottom.
    subTitle: {
        class: classNames(
            'font-normal mb-2 text-gray-600', // Font weight, margin bottom, and text color.
            'dark:text-white/60 ' //dark
        )
    },
    content: 'py-5', // Vertical padding.
    footer: 'pt-5' // Top padding.
})
