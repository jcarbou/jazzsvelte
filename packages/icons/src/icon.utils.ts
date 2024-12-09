import { mergeCssClasses } from '@jazzsvelte/api'
import { isEmpty } from '@jazzsvelte/object'
import { SvgProps } from './icon.types'

export function getSvgProps(label: string | null, spin: boolean, cmpClasses: string | null): SvgProps {
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
