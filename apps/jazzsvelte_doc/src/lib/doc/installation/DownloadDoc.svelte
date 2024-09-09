<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { DocSection } from '../common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
// with npm
npm install -dev jazzsvelte

// with yarn
yarn add jazzsvelte -D

// with pnpm
pnpm i jazzsvelte -D
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        JazzSvelte is available for download at <a href="https://www.npmjs.com/package/jazzsvelte">npm</a>.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode hideStackBlitz />
