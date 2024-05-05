<script lang="ts">
    import { JAZZ_SVELTE } from '@jazzsvelte/api'
    import FeaturesSection from '$lib/landing/FeaturesSection.svelte'
    import './landingLayoutLight.css'

    const { darkMode } = JAZZ_SVELTE
</script>

<div class="landing" class:layout-light={!$darkMode} class:layout-dark={$darkMode}>
    <!-- <HeroSection /> -->
    <FeaturesSection />

    <!--<UsersSection />
<ThemeSection />
<BlockSection />
<TemplateSection />
<FooterSection />-->
</div>

<style>
    .landing {
        scroll-behavior: smooth;
        padding-top: 4rem;
    }
</style>
