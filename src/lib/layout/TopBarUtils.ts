const BUTTON_CLASSES = [
    'flex', // Prettier format hack
    'shrink-0',
    'px-link',
    'border',
    'border-solid',
    'h-8',
    'surface-border',
    'rounded',
    'surface-card',
    'items-center',
    'justify-center',
    'transition-all',
    'duration-300',
    'hover:border-primary'
]

const ICON_BUTTON_CLASSES = [...BUTTON_CLASSES, 'w-8']

export const buttonClasses = BUTTON_CLASSES.join(' ')
export const iconButtonClasses = ICON_BUTTON_CLASSES.join(' ')
