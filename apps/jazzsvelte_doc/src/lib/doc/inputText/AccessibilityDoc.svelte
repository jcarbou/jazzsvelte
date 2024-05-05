<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<label htmlFor="firstname">Firstname</label>
<InputText id="firstname" />

<span id="lastname">Lastname</span>
<InputText aria-labelledby="lastname" />

<InputText aria-label="Age"/>
    `
    }
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        InputText component renders a native input element that implicitly includes any passed prop. Value to describe the
        component can either be provided via <i>label</i> tag combined with <i>id</i> prop or using <i>aria-labelledby</i>,{' '}
        <i>aria-label</i> props.
    </p>

    <DocSectionCode {code} hideToggleCode toImport hideStackBlitz />

    <h3>Keyboard Support</h3>
    <DocSimpleTable headers={['Key', 'Function']} rows={[['<i>tab</i>', 'Moves focus to the input.']]} />
</DocSectionText>
