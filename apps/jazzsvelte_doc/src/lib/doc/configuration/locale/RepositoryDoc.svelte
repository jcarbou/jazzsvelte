<script lang="ts">
    import { importJS, importTS } from '../../common/doc.utils'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText {docSection}>
    <p>
        Ready to use settings for locales are available at the community supported <a
            href="https://github.com/primefaces/primelocale">PrimeLocale</a
        > repository. We'd appreciate if you could contribute to this repository with pull requests and share it with the rest of the
        community.
    </p>
</DocSectionText>
