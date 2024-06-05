<script lang="ts">
    import { Button } from '@jazzsvelte/button'
    import Section from './Section.svelte'
</script>

<Section title="Components" detail="Exmples of tailwind configuration fot jazzsvelte.">
    <span class="text-lg font-medium bg-blue-500"> Hello</span>
    <div class="card flex flex-wrap justify-center gap-3">
        <Button label="Primary" />
        <Button label="Secondary" severity="secondary" />
        <Button label="Success" severity="success" />
        <Button label="Info" severity="info" />
        <Button label="Warning" severity="warning" />
        <Button label="Help" severity="help" />
        <Button label="Danger" severity="danger" />
    </div>
</Section>

<style>
    .box {
        box-shadow: var(--home-features-card-shadow);
        border: 1px solid var(--home-border-color);
        border-radius: 10px;
        background-color: var(--home-box-bg);
    }
    .features-container {
        max-width: 1250px !important;
        margin-left: auto !important;
        margin-right: auto !important;
    }
</style>
