<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Column } from '@jazzsvelte/column'
    import { DataTable } from '@jazzsvelte/data_table'
    import { Skeleton } from '@jazzsvelte/skeleton'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items = Array.from({ length: 5 }, (v, i) => i)

    const code = {
        basic: `
<DataTable value={items} class="p-datatable-striped">
    <Column field="code" header="Code" style="width:25%;" body={<Skeleton />}></Column>
    <Column field="name" header="Name" style="width:25%;" body={<Skeleton />}></Column>
    <Column field="category" header="Category" style="width:25%;" body={<Skeleton />}></Column>
    <Column field="quantity" header="Quantity" style="width:25%;" body={<Skeleton />}></Column>
</DataTable>
        `,
        javascript: `
${importJS('Skeleton')}import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

    const items = Array.from({ length: 5 }, (v, i) => i);
        <div class="card">
            <DataTable value={items} class="p-datatable-striped">
                <Column field="code" header="Code" style="width:25%;" body={<Skeleton />}></Column>
                <Column field="name" header="Name" style="width:25%;" body={<Skeleton />}></Column>
                <Column field="category" header="Category" style="width:25%;" body={<Skeleton />}></Column>
                <Column field="quantity" header="Quantity" style="width:25%;" body={<Skeleton />}></Column>
            </DataTable>
        </div>


        `,
        typescript: `
${importTS('Skeleton')}import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

    const items: number[] = Array.from({ length: 5 }, (v, i) => i);
        <div class="card">
            <DataTable value={items} class="p-datatable-striped">
                <Column field="code" header="Code" style="width:25%;" body={<Skeleton />}></Column>
                <Column field="name" header="Name" style="width:25%;" body={<Skeleton />}></Column>
                <Column field="category" header="Category" style="width:25%;" body={<Skeleton />}></Column>
                <Column field="quantity" header="Quantity" style="width:25%;" body={<Skeleton />}></Column>
            </DataTable>
        </div>


        `
    }
</script>

<DocSectionText {docSection}>
    <p>Sample DataTable implementation using different Skeleton components and PrimeFlex CSS utilities.</p>
</DocSectionText>
<div class="card">
    <DataTable value={items} class="p-datatable-striped">
        <Column field="code" header="Code" style="width:25%;" body={(<Skeleton />)} />
        <Column field="name" header="Name" style="width:25%;" body={(<Skeleton />)} />
        <Column field="category" header="Category" style="width:25%;" body={(<Skeleton />)} />
        <Column field="quantity" header="Quantity" style="width:25%;" body={(<Skeleton />)} />
    </DataTable>
</div>
<DocSectionCode {code} />
