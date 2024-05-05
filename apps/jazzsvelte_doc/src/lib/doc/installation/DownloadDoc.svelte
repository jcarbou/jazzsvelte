<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { DocSection } from '../common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
// with npm
npm install primereact

// with yarn
yarn add primereact
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        PrimeReact is available for download at <a href="https://www.npmjs.com/package/primereact">npm</a>.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode hideStackBlitz />
