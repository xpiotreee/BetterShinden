<script lang="ts">
    import { goto, url } from "@roxi/routify";
    import type * as Api from '../../Interfaces';

    export let episode: Api.Episode;
    export let anime: number;
    function handleClick() {
        $goto($url(`/series/${anime}/episodes/${episode.id}`))
    }
</script>

<button on:click={handleClick} class="p-2 w-full border-pink-400 border-1 rounded-md max-h-min">
    {episode.index}. {episode.title || 'Brak tytułu'}
</button>