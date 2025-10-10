<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { ScrollTop } from '@jazzsvelte/scroll_top'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<ScrollTop target="parent" threshold={100} class="w-2rem h-2rem border-round-md bg-primary" icon="pi pi-arrow-up text-base" />
        `,
        javascript: `
${importJS('ScrollTop')}

<div class="card">
    <div style="width:250px;height:200px;overflow:auto;">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam. Ultricies mi quis hendrerit dolor magna eget est lorem. Amet consectetur
            adipiscing elit ut. Nam libero justo laoreet sit amet. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Est ultricies integer quis auctor elit sed vulputate. Consequat ac felis donec et. Tellus orci ac auctor
            augue mauris. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Tincidunt arcu non sodales neque sodales. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sodales ut etiam sit amet
            nisl purus. Cursus sit amet dictum sit amet. Tristique senectus et netus et malesuada fames ac turpis egestas. Et tortor consequat id porta nibh venenatis cras sed. Diam maecenas ultricies mi eget mauris. Eget egestas purus
            viverra accumsan in nisl nisi. Suscipit adipiscing bibendum est ultricies integer. Mattis aliquam faucibus purus in massa tempor nec.
        </p>
        <ScrollTop target="parent" threshold={100} class="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
    </div>
</div>
`,
        typescript: `
${importTS('ScrollTop')}

<div class="card">
    <div style="width:250px;height:200px;overflow:auto;">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam. Ultricies mi quis hendrerit dolor magna eget est lorem. Amet consectetur
            adipiscing elit ut. Nam libero justo laoreet sit amet. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Est ultricies integer quis auctor elit sed vulputate. Consequat ac felis donec et. Tellus orci ac auctor
            augue mauris. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Tincidunt arcu non sodales neque sodales. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sodales ut etiam sit amet
            nisl purus. Cursus sit amet dictum sit amet. Tristique senectus et netus et malesuada fames ac turpis egestas. Et tortor consequat id porta nibh venenatis cras sed. Diam maecenas ultricies mi eget mauris. Eget egestas purus
            viverra accumsan in nisl nisi. Suscipit adipiscing bibendum est ultricies integer. Mattis aliquam faucibus purus in massa tempor nec.
        </p>
        <ScrollTop target="parent" threshold={100} class="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
    </div>
</div>
 `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Setting the <i>target</i> property to <i>parent</i> binds ScrollTop to its parent element that has scrolling content.
    </p>
</DocSectionText>
<div class="card">
    <div style="width:250px;height:200px;overflow:auto;">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Vitae et leo duis ut diam. Ultricies mi quis hendrerit dolor magna eget est lorem. Amet consectetur adipiscing
            elit ut. Nam libero justo laoreet sit amet. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Est
            ultricies integer quis auctor elit sed vulputate. Consequat ac felis donec et. Tellus orci ac auctor augue mauris.
            Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Tincidunt arcu non sodales neque sodales. Metus
            aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sodales ut etiam sit amet nisl purus. Cursus sit
            amet dictum sit amet. Tristique senectus et netus et malesuada fames ac turpis egestas. Et tortor consequat id porta
            nibh venenatis cras sed. Diam maecenas ultricies mi eget mauris. Eget egestas purus viverra accumsan in nisl nisi.
            Suscipit adipiscing bibendum est ultricies integer. Mattis aliquam faucibus purus in massa tempor nec.
        </p>
        <ScrollTop
            target="parent"
            threshold={100}
            class="w-2rem h-2rem border-round bg-primary"
            icon="pi pi-arrow-up text-base"
        />
    </div>
</div>
<DocSectionCode {code} />
