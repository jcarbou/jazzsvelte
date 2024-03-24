<script lang="ts">
</script>

<div class="doc-tablewrapper">
    <table class="doc-table">
        <thead>
            <slot name="thead" />
        </thead>

        <tbody class="doc-table-body">
            <slot name="tbody" />
        </tbody>
    </table>
</div>

<style lang="scss">
    .doc-tablewrapper {
        overflow: auto;
    }

    .doc-table {
        border-collapse: collapse;
        width: 100%;
        min-width: 960px;
        margin-bottom: 1.5rem;

        :global(th) {
            border-bottom: 1px solid var(--surface-border);
            padding: 0.75rem 1rem;
            text-align: left;
            text-transform: capitalize;
        }
    }
    .doc-table-body {
        :global(tr):hover {
            background-color: var(--surface-hover);
        }
        :global(td) {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--surface-border);
            white-space: pre-line;
            line-height: 1.5;
            scroll-margin-top: 6.5rem;
        }
        :global(td:first-child) {
            color: var(--primary-color);
            font-family:
                ui-monospace,
                SFMono-Regular,
                'SF Mono',
                Menlo,
                Consolas,
                Liberation Mono,
                monospace;
            font-weight: 600;
        }
    }
</style>
