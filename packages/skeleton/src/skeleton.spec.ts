import Skeleton from './Skeleton.svelte'
import { snapshot } from '@jazzsvelte/test'

describe('Skeleton', () => {
    snapshot('when default', Skeleton, {})
    snapshot('when shape circle', Skeleton, { shape: 'circle' })
    snapshot('when shape rectangle', Skeleton, { shape: 'rectangle' })
    snapshot('when animation none', Skeleton, { animation: 'none' })
    snapshot('when animation wave', Skeleton, { animation: 'wave' })
    snapshot('when border radius', Skeleton, { borderRadius: '16px' })
    snapshot('when border radius', Skeleton, { borderRadius: '16px' })
    snapshot('when size width and height', Skeleton, { width: '100%', height: '2rem' })
    snapshot('when size in pixels', Skeleton, { size: '50px' })
})
