<script lang="ts">
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText {docSection}>
    <p>
        Ready to use settings for locales are available at the community supported <a
            href="https://github.com/primefaces/primelocale">PrimeLocale</a
        > repository. We'd appreciate if you could contribute to this repository with pull requests and share it with the rest of the
        community.
    </p>
</DocSectionText>
