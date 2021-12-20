<script lang="ts">
    import { goto, url } from "@roxi/routify";
    import type Episode from "../objects/Episode";

    export let episode: Episode;
    function handleClick() {
        $goto($url(`/episode/${episode.id}`))
    }
</script>

<button on:click={handleClick} class="p-2 mb-2 w-full border-pink-400 border-1 rounded-md">
    {episode.index}. {episode.title || 'Brak tytułu'}
</button>