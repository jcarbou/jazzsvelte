<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import { CheckIcon } from '@jazzsvelte/check_icon'
    import { PencilIcon } from '@jazzsvelte/pencil_icon'
    import { SearchIcon } from '@jazzsvelte/search_icon'
    import { StarIcon } from '@jazzsvelte/star_icon'
    import { CalendarIcon } from '@jazzsvelte/calendar_icon'
    import { EyeIcon } from '@jazzsvelte/eye_icon'
    import { TimesIcon } from '@jazzsvelte/times_icon'
    import type { ComponentDocProps } from '../common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Button icon={CheckIcon} aria-label="Filter" />
<Button icon={PencilIcon} severity="secondary" aria-label="Bookmark" />
<Button icon={SearchIcon} severity="success" aria-label="Search" />
<Button icon={StarIcon} severity="info" aria-label="User" />
<Button icon={CalendarIcon} severity="warning" aria-label="Notification" />
<Button icon={EyeIcon} severity="help" aria-label="Favorite" />
<Button icon={TimesIcon} severity="danger" aria-label="Cancel" />

<Button icon={CheckIcon} rounded aria-label="Filter" />
<Button icon={PencilIcon} rounded severity="secondary" aria-label="Bookmark" />
<Button icon={SearchIcon} rounded severity="success" aria-label="Search" />
<Button icon={StarIcon} rounded severity="info" aria-label="User" />
<Button icon={CalendarIcon} rounded severity="warning" aria-label="Notification" />
<Button icon={EyeIcon} rounded severity="help" aria-label="Favorite" />
<Button icon={TimesIcon} rounded severity="danger" aria-label="Cancel" />

<Button icon={CheckIcon} rounded outlined aria-label="Filter" />
<Button icon={PencilIcon} rounded outlined severity="secondary" aria-label="Bookmark" />
<Button icon={SearchIcon} rounded outlined severity="success" aria-label="Search" />
<Button icon={StarIcon} rounded outlined severity="info" aria-label="User" />
<Button icon={CalendarIcon} rounded outlined severity="warning" aria-label="Notification" />
<Button icon={EyeIcon} rounded outlined severity="help" aria-label="Favorite" />
<Button icon={TimesIcon} rounded outlined severity="danger" aria-label="Cancel" />

<Button icon={CheckIcon} rounded text raised aria-label="Filter" />
<Button icon={PencilIcon} rounded text raised severity="secondary" aria-label="Bookmark" />
<Button icon={SearchIcon} rounded text raised severity="success" aria-label="Search" />
<Button icon={StarIcon} rounded text raised severity="info" aria-label="User" />
<Button icon={CalendarIcon} rounded text raised severity="warning" aria-label="Notification" />
<Button icon={EyeIcon} rounded text raised severity="help" aria-label="Favorite" />
<Button icon={TimesIcon} rounded text raised severity="danger" aria-label="Cancel" />

<Button icon={CheckIcon} rounded text aria-label="Filter" />
<Button icon={PencilIcon} rounded text severity="secondary" aria-label="Bookmark" />
<Button icon={SearchIcon} rounded text severity="success" aria-label="Search" />
<Button icon={StarIcon} rounded text severity="info" aria-label="User" />
<Button icon={CalendarIcon} rounded text severity="warning" aria-label="Notification" />
<Button icon={EyeIcon} rounded text severity="help" aria-label="Favorite" />
<Button icon={TimesIcon} rounded text severity="danger" aria-label="Cancel" />
        `,
        javascript: `
${importJS('Button')}

<div class="card">
    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon={CheckIcon} aria-label="Filter" />
        <Button icon={PencilIcon} severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} severity="success" aria-label="Search" />
        <Button icon={StarIcon} severity="info" aria-label="User" />
        <Button icon={CalendarIcon} severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon={CheckIcon} rounded aria-label="Filter" />
        <Button icon={PencilIcon} rounded severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} rounded severity="success" aria-label="Search" />
        <Button icon={StarIcon} rounded severity="info" aria-label="User" />
        <Button icon={CalendarIcon} rounded severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} rounded severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} rounded severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon={CheckIcon} rounded outlined aria-label="Filter" />
        <Button icon={PencilIcon} rounded outlined severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} rounded outlined severity="success" aria-label="Search" />
        <Button icon={StarIcon} rounded outlined severity="info" aria-label="User" />
        <Button icon={CalendarIcon} rounded outlined severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} rounded outlined severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} rounded outlined severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon={CheckIcon} rounded text raised aria-label="Filter" />
        <Button icon={PencilIcon} rounded text raised severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} rounded text raised severity="success" aria-label="Search" />
        <Button icon={StarIcon} rounded text raised severity="info" aria-label="User" />
        <Button icon={CalendarIcon} rounded text raised severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} rounded text raised severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} rounded text raised severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3">
        <Button icon={CheckIcon} rounded text aria-label="Filter" />
        <Button icon={PencilIcon} rounded text severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} rounded text severity="success" aria-label="Search" />
        <Button icon={StarIcon} rounded text severity="info" aria-label="User" />
        <Button icon={CalendarIcon} rounded text severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} rounded text severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} rounded text severity="danger" aria-label="Cancel" />
    </div>
</div>
        `,
        typescript: `
${importTS('Button')}

<div class="card">
    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon={CheckIcon} aria-label="Filter" />
        <Button icon={PencilIcon} severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} severity="success" aria-label="Search" />
        <Button icon={StarIcon} severity="info" aria-label="User" />
        <Button icon={CalendarIcon} severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon={CheckIcon} rounded aria-label="Filter" />
        <Button icon={PencilIcon} rounded severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} rounded severity="success" aria-label="Search" />
        <Button icon={StarIcon} rounded severity="info" aria-label="User" />
        <Button icon={CalendarIcon} rounded severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} rounded severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} rounded severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon={CheckIcon} rounded outlined aria-label="Filter" />
        <Button icon={PencilIcon} rounded outlined severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} rounded outlined severity="success" aria-label="Search" />
        <Button icon={StarIcon} rounded outlined severity="info" aria-label="User" />
        <Button icon={CalendarIcon} rounded outlined severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} rounded outlined severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} rounded outlined severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon={CheckIcon} rounded text raised aria-label="Filter" />
        <Button icon={PencilIcon} rounded text raised severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} rounded text raised severity="success" aria-label="Search" />
        <Button icon={StarIcon} rounded text raised severity="info" aria-label="User" />
        <Button icon={CalendarIcon} rounded text raised severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} rounded text raised severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} rounded text raised severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3">
        <Button icon={CheckIcon} rounded text aria-label="Filter" />
        <Button icon={PencilIcon} rounded text severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} rounded text severity="success" aria-label="Search" />
        <Button icon={StarIcon} rounded text severity="info" aria-label="User" />
        <Button icon={CalendarIcon} rounded text severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} rounded text severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} rounded text severity="danger" aria-label="Cancel" />
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
        <Button icon={CheckIcon} aria-label="Filter" />
        <Button icon={PencilIcon} severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} severity="success" aria-label="Search" />
        <Button icon={StarIcon} severity="info" aria-label="User" />
        <Button icon={CalendarIcon} severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon={CheckIcon} rounded aria-label="Filter" />
        <Button icon={PencilIcon} rounded severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} rounded severity="success" aria-label="Search" />
        <Button icon={StarIcon} rounded severity="info" aria-label="User" />
        <Button icon={CalendarIcon} rounded severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} rounded severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} rounded severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon={CheckIcon} rounded outlined aria-label="Filter" />
        <Button icon={PencilIcon} rounded outlined severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} rounded outlined severity="success" aria-label="Search" />
        <Button icon={StarIcon} rounded outlined severity="info" aria-label="User" />
        <Button icon={CalendarIcon} rounded outlined severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} rounded outlined severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} rounded outlined severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <Button icon={CheckIcon} rounded text raised aria-label="Filter" />
        <Button icon={PencilIcon} rounded text raised severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} rounded text raised severity="success" aria-label="Search" />
        <Button icon={StarIcon} rounded text raised severity="info" aria-label="User" />
        <Button icon={CalendarIcon} rounded text raised severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} rounded text raised severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} rounded text raised severity="danger" aria-label="Cancel" />
    </div>

    <div class="flex flex-wrap justify-content-center gap-3">
        <Button icon={CheckIcon} rounded text aria-label="Filter" />
        <Button icon={PencilIcon} rounded text severity="secondary" aria-label="Bookmark" />
        <Button icon={SearchIcon} rounded text severity="success" aria-label="Search" />
        <Button icon={StarIcon} rounded text severity="info" aria-label="User" />
        <Button icon={CalendarIcon} rounded text severity="warning" aria-label="Notification" />
        <Button icon={EyeIcon} rounded text severity="help" aria-label="Favorite" />
        <Button icon={TimesIcon} rounded text severity="danger" aria-label="Cancel" />
    </div>
</div>
<DocSectionCode {code} />
