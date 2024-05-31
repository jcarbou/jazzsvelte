<script lang="ts">
import { importJS, importTS} from '../common/doc.utils'
import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'


    import type { DocSection } from '$lib/doc/common/doc.types'
    
    export let docSection: DocSection
</script>
<DocSectionText docSection={docSection}>
                <p>List of class names used in the styled mode.</p>
            </DocSectionText>
<DocSimpleTable headers={['Name','Element']} rows={[
   ['p-speeddial','Container element.'],
   ['p-speeddial-button','Button element of speeddial.'],
   ['p-speeddial-mask','Mask element of speeddial.'],
   ['p-speeddial-list','List of the actions.'],
   ['p-speeddial-item','Each action item of list.']
]}/>




