<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        Chip uses the <i>label</i> property as the default <i>aria-label</i>, since any attribute is passed to the root element
        <i>aria-labelledby</i>
        or <i>aria-label</i> can be used to override the default behavior. Removable chips have a{' '}
        <i>tabIndex</i> and focusable with the tab key.
    </p>

    <h3>Keyboard Support</h3>
    <DocSimpleTable
        headers={['Key', 'Function']}
        rows={[
            ['<i>backspace</i>', 'Hides removable.'],
            ['<i>enter</i>', 'Hides removable.']
        ]}
    />
</DocSectionText>
