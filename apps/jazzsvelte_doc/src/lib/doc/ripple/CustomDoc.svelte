<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Ripple } from '@jazzsvelte/ripple'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<div class="p-ripple p-5 border-round border-radius-10 shadow-2">
    Green
    <Ripple
        pt={{
            root: { style: { background: 'rgba(75, 175, 80, 0.3)' } }
        }}
    />
</div>
<div class="p-ripple p-5 border-round border-radius-10 shadow-2">
    Orange
    <Ripple
        pt={{
            root: { style: { background: 'rgba(255, 193, 6, 0.3)' } }
        }}
    />
</div>
<div class="p-ripple p-5 border-round border-radius-10 shadow-2">
    Purple
    <Ripple
        pt={{
            root: { style: { background: 'rgba(156, 39, 176, 0.3)' } }
        }}
    />
</div>
        `,
        javascript: `
import React from 'react';
import { Ripple } from 'primereact/ripple';


        <div class="card flex justify-content-center align-items-center gap-2">
            <div class="p-ripple p-5 border-round border-radius-10 shadow-2">
                Green
                <Ripple
                    pt={{
                        root: { style: { background: 'rgba(75, 175, 80, 0.3)' } }
                    }}
                />
            </div>
            <div class="p-ripple p-5 border-round border-radius-10 shadow-2">
                Orange
                <Ripple
                    pt={{
                        root: { style: { background: 'rgba(255, 193, 6, 0.3)' } }
                    }}
                />
            </div>
            <div class="p-ripple p-5 border-round border-radius-10 shadow-2">
                Purple
                <Ripple
                    pt={{
                        root: { style: { background: 'rgba(156, 39, 176, 0.3)' } }
                    }}
                />
            </div>
        </div>


        `,
        typescript: `
import React from 'react';
import { Ripple } from 'primereact/ripple';


        <div class="card flex justify-content-center align-items-center gap-2">
            <div class="p-ripple p-5 border-round border-radius-10 shadow-2">
                Green
                <Ripple
                    pt={{
                        root: { style: { background: 'rgba(75, 175, 80, 0.3)' } }
                    }}
                />
            </div>
            <div class="p-ripple p-5 border-round border-radius-10 shadow-2">
                Orange
                <Ripple
                    pt={{
                        root: { style: { background: 'rgba(255, 193, 6, 0.3)' } }
                    }}
                />
            </div>
            <div class="p-ripple p-5 border-round border-radius-10 shadow-2">
                Purple
                <Ripple
                    pt={{
                        root: { style: { background: 'rgba(156, 39, 176, 0.3)' } }
                    }}
                />
            </div>
        </div>


        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Default styling of the animation adds a shade of white. This can easily be customized using css that changes the color of <i
            >p-ink</i
        > element.
    </p>
</DocSectionText>
<div class="card flex justify-content-center align-items-center gap-2">
    <div class="p-ripple p-5 border-round border-radius-10 shadow-2">
        Green
        <Ripple
            pt={{
                root: { style: { background: 'rgba(75, 175, 80, 0.3)' } }
            }}
        />
    </div>
    <div class="p-ripple p-5 border-round border-radius-10 shadow-2">
        Orange
        <Ripple
            pt={{
                root: { style: { background: 'rgba(255, 193, 6, 0.3)' } }
            }}
        />
    </div>
    <div class="p-ripple p-5 border-round border-radius-10 shadow-2">
        Purple
        <Ripple
            pt={{
                root: { style: { background: 'rgba(156, 39, 176, 0.3)' } }
            }}
        />
    </div>
</div>
<DocSectionCode {code} />
