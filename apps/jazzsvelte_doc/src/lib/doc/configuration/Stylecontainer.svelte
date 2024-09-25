<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
//_app.js
import { PrimeReactProvider } from 'primereact/api';

root.attachShadow({ mode: 'open' }); // Open the shadowRoot
const mountHere = root.shadowRoot;

const options = { appendTo: mountHere, styleContainer: mountHere};

ReactDOM.createRoot(mountHere).render(
  <React.StrictMode>
    <PrimeReactProvider value={options}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        This option allows <i>useStyle</i> to insert dynamic CSS styles into a specific container. This is useful when styles need
        to be scoped such as in a{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM" target="_blank">
            Shadow DOM
        </a>
        . By default all dynamic styles are appended to <i>document.head</i>.
    </p>
</DocSectionText>
<DocSectionCode {code} hideToggleCode toImport hideStackBlitz />
