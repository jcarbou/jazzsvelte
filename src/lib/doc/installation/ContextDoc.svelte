<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { DocSection } from '../common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        `
    }

    const code2 = {
        basic: `
// _app.js
import { PrimeReactProvider } from 'primereact/api';

export default function MyApp({ Component, pageProps }) {
    return (
        <PrimeReactProvider>
            <Component {...pageProps} />
        </PrimeReactProvider>
    );
}
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Configuration is managed by the <i>PrimeReactProvider</i> and <i>PrimeReactContext</i> imported from <i>primereact/api</i>.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode hideStackBlitz />
<div class="doc-section-description">
    <p>
        The <i>PrimeReactProvider</i> component is used to wrap the application and the <i>PrimeReactContext</i> is used to access the configuration options.
    </p>
</div>
<DocSectionCode code={code2} hideToggleCode hideStackBlitz />
