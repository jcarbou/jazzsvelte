import { readText, writeText } from './tasks.utils'

const file = process.argv[2]

let content = readText(file)
/**let content = `
<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Panel } from '@jazzsvelte/panel'
    import panelDemoModule from './paneldemo.module.css'

    import type { DocSection } from '$lib/doc/common/doc.types'

    interface Props {
        docSection: DocSection;
    }

    let { docSection }: Props = $props();


`**/
content = content.replace(
    `
    import type { DocSection } from '$lib/doc/common/doc.types'`,
    "    import type { DocSection } from '$lib/doc/common/doc.types'"
)

content = content.replace(
    "import type { DocSection } from '$lib/doc/common/doc.types'",
    "import type { ComponentDocProps } from '$lib/doc/common/doc.types'"
)

content = content.replace(
    `
    interface Props {
        docSection: DocSection
    }
`,
    ''
)
content = content.replace('let { docSection }: Props = $props()', 'let { docSection }: ComponentDocProps = $props();')

writeText(file, content)
