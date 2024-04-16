<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'
    // import Knob from '$lib/components/knob/Knob.svelte'
    // import Slider from '$lib/components/slider/Slider.svelte'
    import Tooltip from '$lib/components/tooltip/Tooltip.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Button type="button" label="Save" icon="pi pi-check" tooltip={buttonTooltip} on:click={() => setButtonTooltip('Completed')} />

<Tooltip target=".knob" content={\`\${knobValue}%\`} />
<Knob class="knob" value={knobValue} onChange={(e) => setKnobValue(e.value)} showValue={false} />

<Tooltip target=".slider>.p-slider-handle" content={\`\${sliderValue}%\`} position="top" event="focus" />
<Slider class="slider" value={sliderValue} onChange={(e) => setSliderValue(e.value)} style="width:14rem;" />
        `,
        javascript: `
${importJS(['Button', 'Slider', 'Knob'])}

<div class="card flex flex-wrap align-items-center justify-content-center gap-5">
    <Button type="button" label="Save" icon="pi pi-check" tooltip={buttonTooltip} on:click={() => setButtonTooltip('Completed')} />

    <Tooltip target=".knob" content={\`\${knobValue}%\`} />
    <Knob class="knob" value={knobValue} onChange={(e) => setKnobValue(e.value)} showValue={false} />

    <Tooltip target=".slider>.p-slider-handle" content={\`\${sliderValue}%\`} position="top" event="focus" />
    <Slider class="slider" value={sliderValue} onChange={(e) => setSliderValue(e.value)} style="width:14rem;" />
</div>
        `,
        typescript: `
${importJS(['Button', 'Slider', 'Knob'])}

<div class="card flex flex-wrap align-items-center justify-content-center gap-5">
    <Button type="button" label="Save" icon="pi pi-check" tooltip={buttonTooltip} on:click={() => setButtonTooltip('Completed')} />

    <Tooltip target=".knob" content={\`\${knobValue}%\`} />
    <Knob class="knob" value={knobValue} onChange={(e) => setKnobValue(e.value)} showValue={false} />

    <Tooltip target=".slider>.p-slider-handle" content={\`\${sliderValue}%\`} position="top" event="focus" />
    <Slider class="slider" value={sliderValue} onChange={(e) => setSliderValue(e.value)} style="width:14rem;" />
</div>
        `
    }

    let buttonTooltip: string = 'Click to proceed'
</script>

<DocSectionText {docSection}>
    <p>Tooltip content is reactive to reflect changes related to the target component.</p>
</DocSectionText>
<div class="card flex flex-wrap align-items-center justify-content-center gap-5">
    <Button
        type="button"
        label="Save"
        icon="pi pi-check"
        tooltip={buttonTooltip}
        on:click={() => (buttonTooltip = 'Completed')}
    />

    <!--<Tooltip target=".knob" content={`${knobValue}%`} />
    <Knob class="knob" value={knobValue} onChange={(e) => setKnobValue(e.value)} showValue={false} />

    <Tooltip target=".slider>.p-slider-handle" content={`${sliderValue}%`} position="top" event="focus" />
    <Slider class="slider" value={sliderValue} onChange={(e) => setSliderValue(e.value)} style="width:14rem;" />-->
</div>
<DocSectionCode {code} />
