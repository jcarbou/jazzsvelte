<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        Steps component uses the <i>nav</i> element and since any attribute is passed to the root implicitly
        <i>aria-labelledby</i>
        or <i>aria-label</i> can be used to describe the component. Inside an ordered list is used where the current step item
        defines <i>aria-current</i> as "step".
    </p>

    <h3>Keyboard Support</h3>
    <DocSimpleTable
        headers={['Key', 'Function']}
        rows={[
            [
                '<i>tab</i>',
                'Adds focus to the active step when focus moves in to the component, if there is already a focused tab header then moves the focus out of the component based on the page tab sequence.'
            ],
            ['<i>enter</i>', 'Activates the focused step if readonly is not enabled.'],
            ['<i>space</i>', 'Activates the focused step if readonly is not enabled.'],
            ['<i>right arrow</i>', 'Moves focus to the next step if readonly is not enabled.'],
            ['<i>left arrow</i>', 'Moves focus to the previous step if readonly is not enabled.'],
            ['<i>home</i>', 'Moves focus to the first step if readonly is not enabled.'],
            ['<i>end</i>', 'Moves focus to the last step if readonly is not enabled.']
        ]}
    />
</DocSectionText>
