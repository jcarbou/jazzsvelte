<script lang="ts">
    import { onMount } from "svelte";
    import {announcement, setNewsVisible} from '$lib/layout/layoutStore'

    const storageKey = 'jazzsvelte-news'

    onMount( () => {
        const readNews = localStorage.getItem(storageKey) || 'none'

        setNewsVisible(readNews !== ''+$announcement.id)
    })

    function hideNews() {
        setNewsVisible(false)
        const readNews = localStorage.setItem(storageKey, ''+''+$announcement.id)
    }
</script>


<div class="layout-news">
    <div class="layout-news-container">
        <i></i>
        <div class="layout-news-content">
            <span class="layout-news-text">{$announcement.content}</span>
            <a class="layout-news-link" href={$announcement.linkHref}>
                {$announcement.linkText}
            </a>
        </div>
        <button class="layout-news-close" on:click={hideNews}>
            <span class="pi pi-times"></span>
        </button>
    </div>
</div>

<style>
    .layout-news {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1100;
        width: 100%;
        height: 2rem;
        padding: 0 2rem;
        background-color: var(--primary-color);
    }

    .layout-news-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(100% - var(--scrollbar-width, 0px));
        height: 100%;
    }

    .layout-news-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 0%;
    }

    .layout-news-text {
        line-height: 1.5;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        min-width: 0%;
        font-weight: 500;
        color: var(--primary-color-text);
    }

    .layout-news-link {
        margin-left: 0.5rem;
        line-height: 1.5;
        white-space: nowrap;
    }

    .layout-news-link,
    .layout-news-link:visited,
    .layout-news-link:active {
        color:var(--primary-color-text);
        font-weight:700;
    }

    .layout-news-link:hover {
        text-decoration: underline;
    }

    .layout-news-close {
        line-height: 1.5;
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        transition: background-color 0.3s;
        margin-left: 0.5rem;
        color: var(--primary-color-text);        
    }

    .layout-news-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }    
</style>