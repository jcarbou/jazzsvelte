<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { DocSection } from '../common/doc.types'

    export let docSection: DocSection
    const code = {
        basic: `
import { PrimeReactProvider } from "primereact/api";
...
return(
    <PrimeReactProvider value={{ unstyled: true }}>
        <App />
    </PrimeReactProvider>
)
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Unstyled mode is disabled by default for all components. Using the PrimeReactContext during installation, set <i>unstyled</i> as true to enable it globally. Visit the <a href="/unstyled">Unstyled mode</a> documentation for more information and
        examples.
    </p>
    <DocSectionCode {code} hideToggleCode hideStackBlitz />
</DocSectionText>
