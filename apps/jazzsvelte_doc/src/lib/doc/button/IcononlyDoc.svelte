<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
<Button icon="pi pi-check" aria-label="Filter" />
<Button icon="pi pi-bookmark" severity="secondary" aria-label="Bookmark" />
<Button icon="pi pi-search" severity="success" aria-label="Search" />
<Button icon="pi pi-user" severity="info" aria-label="User" />
<Button icon="pi pi-bell" severity="warning" aria-label="Notification" />
<Button icon="pi pi-heart" severity="help" aria-label="Favorite" />
<Button icon="pi pi-times" severity="danger" aria-label="Cancel" />

<Button icon="pi pi-check" rounded aria-label="Filter" />
<Button icon="pi pi-bookmark" rounded severity="secondary" aria-label="Bookmark" />
<Button icon="pi pi-search" rounded severity="success" aria-label="Search" />
<Button icon="pi pi-user" rounded severity="info" aria-label="User" />
<Button icon="pi pi-bell" rounded severity="warning" aria-label="Notification" />
<Button icon="pi pi-heart" rounded severity="help" aria-label="Favorite" />
<Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" />

<Button icon="pi pi-check" rounded outlined aria-label="Filter" />
<Button icon="pi pi-bookmark" rounded outlined severity="secondary" aria-label="Bookmark" />
<Button icon="pi pi-search" rounded outlined severity="success" aria-label="Search" />
<Button icon="pi pi-user" rounded outlined severity="info" aria-label="User" />
<Button icon="pi pi-bell" rounded outlined severity="warning" aria-label="Notification" />
<Button icon="pi pi-heart" rounded outlined severity="help" aria-label="Favorite" />
<Button icon="pi pi-times" rounded outlined severity="danger" aria-label="Cancel" />

<Button icon="pi pi-check" rounded text raised aria-label="Filter" />
<Button icon="pi pi-bookmark" rounded text raised severity="secondary" aria-label="Bookmark" />
<Button icon="pi pi-search" rounded text raised severity="success" aria-label="Search" />
<Button icon="pi pi-user" rounded text raised severity="info" aria-label="User" />
<Button icon="pi pi-bell" rounded text raised severity="warning" aria-label="Notification" />
<Button icon="pi pi-heart" rounded text raised severity="help" aria-label="Favorite" />
<Button icon="pi pi-times" rounded text raised severity="danger" aria-label="Cancel" />

<Button icon="pi pi-check" rounded text aria-label="Filter" />
<Button icon="pi pi-bookmark" rounded text severity="secondary" aria-label="Bookmark" />
<Button icon="pi pi-search" rounded text severity="success" aria-label="Search" />
<Button icon="pi pi-user" rounded text severity="info" aria-label="User" />
<Button icon="pi pi-bell" rounded text severity="warning" aria-label="Notification" />
<Button icon="pi pi-heart" rounded text severity="help" aria-label="Favorite" />
<Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" />
        `,
        javascript: `
${importJS('Button')}

<div class="card">
    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon="pi pi-check" aria-label="Filter" />
        <Button icon="pi pi-bookmark" severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" severity="success" aria-label="Search" />
        <Button icon="pi pi-user" severity="info" aria-label="User" />
        <Button icon="pi pi-bell" severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon="pi pi-check" rounded aria-label="Filter" />
        <Button icon="pi pi-bookmark" rounded severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" rounded severity="success" aria-label="Search" />
        <Button icon="pi pi-user" rounded severity="info" aria-label="User" />
        <Button icon="pi pi-bell" rounded severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" rounded severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon="pi pi-check" rounded outlined aria-label="Filter" />
        <Button icon="pi pi-bookmark" rounded outlined severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" rounded outlined severity="success" aria-label="Search" />
        <Button icon="pi pi-user" rounded outlined severity="info" aria-label="User" />
        <Button icon="pi pi-bell" rounded outlined severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" rounded outlined severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" rounded outlined severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon="pi pi-check" rounded text raised aria-label="Filter" />
        <Button icon="pi pi-bookmark" rounded text raised severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" rounded text raised severity="success" aria-label="Search" />
        <Button icon="pi pi-user" rounded text raised severity="info" aria-label="User" />
        <Button icon="pi pi-bell" rounded text raised severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" rounded text raised severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" rounded text raised severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3">
        <Button icon="pi pi-check" rounded text aria-label="Filter" />
        <Button icon="pi pi-bookmark" rounded text severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" rounded text severity="success" aria-label="Search" />
        <Button icon="pi pi-user" rounded text severity="info" aria-label="User" />
        <Button icon="pi pi-bell" rounded text severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" rounded text severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" />
    </div>
</div>
        `,
        typescript: `
${importTS('Button')}

<div class="card">
    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon="pi pi-check" aria-label="Filter" />
        <Button icon="pi pi-bookmark" severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" severity="success" aria-label="Search" />
        <Button icon="pi pi-user" severity="info" aria-label="User" />
        <Button icon="pi pi-bell" severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon="pi pi-check" rounded aria-label="Filter" />
        <Button icon="pi pi-bookmark" rounded severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" rounded severity="success" aria-label="Search" />
        <Button icon="pi pi-user" rounded severity="info" aria-label="User" />
        <Button icon="pi pi-bell" rounded severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" rounded severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon="pi pi-check" rounded outlined aria-label="Filter" />
        <Button icon="pi pi-bookmark" rounded outlined severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" rounded outlined severity="success" aria-label="Search" />
        <Button icon="pi pi-user" rounded outlined severity="info" aria-label="User" />
        <Button icon="pi pi-bell" rounded outlined severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" rounded outlined severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" rounded outlined severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon="pi pi-check" rounded text raised aria-label="Filter" />
        <Button icon="pi pi-bookmark" rounded text raised severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" rounded text raised severity="success" aria-label="Search" />
        <Button icon="pi pi-user" rounded text raised severity="info" aria-label="User" />
        <Button icon="pi pi-bell" rounded text raised severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" rounded text raised severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" rounded text raised severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3">
        <Button icon="pi pi-check" rounded text aria-label="Filter" />
        <Button icon="pi pi-bookmark" rounded text severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" rounded text severity="success" aria-label="Search" />
        <Button icon="pi pi-user" rounded text severity="info" aria-label="User" />
        <Button icon="pi pi-bell" rounded text severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" rounded text severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" />
    </div>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>Buttons can have icons without labels.</p>
</DocSectionText>
<div class="card">
    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon="pi pi-check" aria-label="Filter" />
        <Button icon="pi pi-bookmark" severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" severity="success" aria-label="Search" />
        <Button icon="pi pi-user" severity="info" aria-label="User" />
        <Button icon="pi pi-bell" severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon="pi pi-check" rounded aria-label="Filter" />
        <Button icon="pi pi-bookmark" rounded severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" rounded severity="success" aria-label="Search" />
        <Button icon="pi pi-user" rounded severity="info" aria-label="User" />
        <Button icon="pi pi-bell" rounded severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" rounded severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon="pi pi-check" rounded outlined aria-label="Filter" />
        <Button icon="pi pi-bookmark" rounded outlined severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" rounded outlined severity="success" aria-label="Search" />
        <Button icon="pi pi-user" rounded outlined severity="info" aria-label="User" />
        <Button icon="pi pi-bell" rounded outlined severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" rounded outlined severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" rounded outlined severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon="pi pi-check" rounded text raised aria-label="Filter" />
        <Button icon="pi pi-bookmark" rounded text raised severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" rounded text raised severity="success" aria-label="Search" />
        <Button icon="pi pi-user" rounded text raised severity="info" aria-label="User" />
        <Button icon="pi pi-bell" rounded text raised severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" rounded text raised severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" rounded text raised severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3">
        <Button icon="pi pi-check" rounded text aria-label="Filter" />
        <Button icon="pi pi-bookmark" rounded text severity="secondary" aria-label="Bookmark" />
        <Button icon="pi pi-search" rounded text severity="success" aria-label="Search" />
        <Button icon="pi pi-user" rounded text severity="info" aria-label="User" />
        <Button icon="pi pi-bell" rounded text severity="warning" aria-label="Notification" />
        <Button icon="pi pi-heart" rounded text severity="help" aria-label="Favorite" />
        <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" />
    </div>
</div>
<DocSectionCode {code} />
