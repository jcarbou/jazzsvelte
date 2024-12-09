<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'jazzsvelte/api';
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Configuration is managed by the <a href="/configuration/#api.API.LocaleOptions">Locale API</a> imported from
        <i>jazzsvelte/api</i>.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />
