<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import DocTableWrapper from '../common/DocTableWrapper.svelte'

    export let docSection: DocSection

    const code = {
        basic: `
<Button icon="pi pi-check" aria-label="Submit" />

<Button icon="pi pi-check" label="Submit" />

<Button class="youtube p-0" aria-label="Youtube">
    <i class="pi pi-youtube px-2"></i>
    <span class="px-3">Youtube</span>
</Button>
    `
    }
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        Button component renders a native button element that implicitly includes any passed prop. Text to describe the button is
        defined with the <i>aria-label</i> prop, if not present <i>label</i> prop is used as the value. If the button is icon only
        or custom templating is used, it is recommended to use <i>aria-label</i> so that screen readers would be able to read the element
        properly.
    </p>

    <DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

    <h3>Keyboard Support</h3>
    <DocTableWrapper keyStyle="button">
        <tr slot="thead">
            <th>Key</th>
            <th>Function</th>
        </tr>
        <svelte:fragment slot="tbody">
            <tr>
                <td>
                    <i>tab</i>
                </td>
                <td>Moves focus to the button.</td>
            </tr>
            <tr>
                <td>
                    <i>enter</i>
                </td>
                <td>Activates the button.</td>
            </tr>
            <tr>
                <td>
                    <i>space</i>
                </td>
                <td>Activates the button.</td>
            </tr>
        </svelte:fragment>
    </DocTableWrapper>
</DocSectionText>
