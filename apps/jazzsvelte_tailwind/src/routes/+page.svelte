<script lang="ts">
    import { JAZZ_SVELTE } from '@jazzsvelte/api'
    import FeaturesSection from '$lib/landing/FeaturesSection.svelte'
    import './landingLayoutLight.css'

    const { darkMode } = JAZZ_SVELTE
</script>

<div class="landing layout-light">
    <FeaturesSection />
</div>
