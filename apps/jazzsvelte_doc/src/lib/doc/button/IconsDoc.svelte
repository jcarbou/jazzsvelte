<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '../common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'
    import { CheckIcon } from '@jazzsvelte/check_icon'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Button icon={CheckIcon} />
<Button label="Submit" icon={CheckIcon} />
<Button label="Submit" icon={CheckIcon} iconPos="right" />
        `,
        javascript: `
${importJS(['Button', 'CheckIcon'])}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button icon={CheckIcon} />
    <Button label="Submit" icon={CheckIcon} />
    <Button label="Submit" icon={CheckIcon} iconPos="right" />
</div>
         `,
        typescript: `
${importTS(['Button', 'CheckIcon'])}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button icon={CheckIcon} />
    <Button label="Submit" icon={CheckIcon} />
    <Button label="Submit" icon={CheckIcon} iconPos="right" />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Icon of a button is specified with <i>icon</i> property and position is configured using <i>iconPos</i> attribute.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <Button icon={CheckIcon} />
    <Button label="Submit" icon={CheckIcon} />
    <Button label="Submit" icon={CheckIcon} iconPos="right" />
</div>
<DocSectionCode {code} />
