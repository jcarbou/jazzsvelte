const BUTTON_CLASSES = [
    'flex', // Prettier format hack
    'flex-shrink-0',
    'px-link',
    'border-1',
    'border-solid',
    'h-2rem',
    'surface-border',
    'border-round',
    'surface-card',
    'align-items-center',
    'justify-content-center',
    'transition-all',
    'transition-duration-300',
    'hover:border-primary'
]

const ICON_BUTTON_CLASSES = [...BUTTON_CLASSES, 'w-2rem']

export const buttonClasses = BUTTON_CLASSES.join(' ')
export const iconButtonClasses = ICON_BUTTON_CLASSES.join(' ')
