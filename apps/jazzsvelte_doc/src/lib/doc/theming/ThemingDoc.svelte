<script lang="ts">
    import DocSectionNav from '../common/DocSectionNav.svelte'
    import DocSections from '../common/DocSections.svelte'
    import ArchitectureDoc from './ArchitectureDoc.svelte'
    import BuiltInThemesDoc from './BuiltInThemesDoc.svelte'
    import CSSVariablesDoc from './CSSVariablesDoc.svelte'
    import CustomThemeDoc from './CustomThemeDoc.svelte'
    import PrimeFlexDoc from './PrimeFlexDoc.svelte'
    import ScaleDoc from './ScaleDoc.svelte'
    import CssInJsDoc from './scopedstyling/CSSInJsDoc.svelte'
    import CSSModulesDoc from './scopedstyling/CSSModulesDoc.svelte'
    import NamedClassDoc from './scopedstyling/NamedClassDoc.svelte'
    import SwitchThemesDoc from './SwitchThemesDoc.svelte'
    import UtilsDoc from './UtilsDoc.svelte'

    const docs = [
        {
            id: 'architecture',
            label: 'Architecture',
            component: ArchitectureDoc
        },
        {
            id: 'builtinthemes',
            label: 'Built-in Themes',
            component: BuiltInThemesDoc
        },
        {
            id: 'switchthemes',
            label: 'Switch Themes',
            component: SwitchThemesDoc
        },
        {
            id: 'customtheme',
            label: 'Custom Theme',
            component: CustomThemeDoc
        },
        {
            id: 'scopedstyling',
            label: 'Scoped Styling',
            description: `Designer themes apply a global skin to the library, in case you need to change the style of a particular component, 
                you may use a named class, CSS Modules or a CSS-in-JS solution like styled-jsx. A video tutorial that goes through the alternatives below is available.`,
            /*content: (
                <div class="video-container">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/3pO79DdPpiU" frameBorder="0" allowFullScreen="true" title="Scoped CSS with PrimeReact" />
                </div>
            ),*/
            children: [
                {
                    id: 'namedclass',
                    label: 'Named Class',
                    component: NamedClassDoc
                },
                {
                    id: 'cssmodules',
                    label: 'CSS Modules',
                    component: CSSModulesDoc
                },
                {
                    id: 'cssinjs',
                    label: 'CSS in JS',
                    component: CssInJsDoc
                }
            ]
        },
        {
            id: 'scale',
            label: 'Scale',
            component: ScaleDoc
        },
        {
            id: 'primeflex',
            label: 'PrimeFlex',
            component: PrimeFlexDoc
        },
        {
            id: 'utils',
            label: 'Utils',
            component: UtilsDoc
        },
        {
            id: 'cssvariables',
            label: 'CSS Variables',
            component: CSSVariablesDoc
        }
    ]
</script>

<svelte:head>
    <title>Theming - PrimeReact</title>
    <meta name="description" content="Choose from a variety of themes or develop your own theme easily." />
</svelte:head>
<div class="doc">
    <div class="doc-main">
        <div class="doc-intro">
            <h1>Theming</h1>
            <p>Choose from a variety of themes or develop your own theme easily.</p>
        </div>
        <DocSections {docs} />
    </div>
    <DocSectionNav {docs} />
</div>
