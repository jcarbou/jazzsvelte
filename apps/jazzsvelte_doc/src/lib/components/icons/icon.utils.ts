import { mergeCssClasses } from '@jazzsvelte/api'
import { isEmpty } from '@jazzsvelte/object'

/**
 * Default icon atrributes
 */
/*export const DEFAULT_PROPS: IconAttributes = {
    class: null,
    label: undefined,
    spin: false
}

export function getProps(props: IconAttributes | null): IconAttributes {
    if (!props) return DEFAULT_PROPS
    return getMergedProps(props, DEFAULT_PROPS)
}

export function getOtherProps(props: IconAttributes | null): IconAttributes {
    if (!props) return {}
    return getDiffProps(props, DEFAULT_PROPS)
}*/

export function getSvgProps(
    label: string | null,
    spin: boolean,
    cmpClasses: string | null
): {
    class: string
    role?: string
    'aria-label'?: string
    'aria-hidden': boolean
} {
    const isLabelEmpty = isEmpty(label)
    return {
        class:
            '' +
            mergeCssClasses([
                'p-icon',
                {
                    'p-icon-spin': spin
                },
                cmpClasses
            ]),
        role: !isLabelEmpty ? 'img' : undefined,
        'aria-label': !isLabelEmpty ? label || undefined : undefined,
        'aria-hidden': isLabelEmpty
    }
}
